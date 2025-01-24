import pandas as pd
import spacy
import warnings
import os
import re

nlp = spacy.load('en_core_web_sm')

print("Current working directory:", os.getcwd())
os.chdir(os.path.dirname(__file__))

csv_path = "../datasets/Virus data by regions - Sheet1.csv"

if os.path.exists(csv_path):
    df = pd.read_csv(csv_path, sep=',', on_bad_lines='skip', encoding='utf-8')
    print("CSV file loaded successfully.")
    print("Available columns:", df.columns.tolist())
else:
    print(f"Error: The file at '{csv_path}' was not found.")
    exit()

df['tests'] = df['tests'].replace({',': ''}, regex=True).astype(str).str.strip()
df['detections'] = df['detections'].astype(str).str.strip()

df['tests'] = pd.to_numeric(df['tests'].replace('', '0'), errors='coerce')
df['detections'] = pd.to_numeric(df['detections'].replace('', '0'), errors='coerce')

df.fillna({'tests': 0, 'detections': 0}, inplace=True)

with warnings.catch_warnings(record=True) as w:
    for warning in w:
        print(warning.message)

def parse_conditions(query):
    pattern = r'(\bgreater than|more than|above|less than|below|before|after\b)\s*(\d+)'
    matches = re.findall(pattern, query.lower())
    
    conditions = []
    for match in matches:
        operator, value = match
        if operator in ['greater than', 'more than', 'after', 'above']:
            op = '>'
        elif operator in ['less than', 'below', 'before']:
            op = '<'
        conditions.append((op, value))
    return conditions

def text_to_sql(query, df):
    doc = nlp(query)
    columns = df.columns.tolist()

    select_cols = []
    conditions = []

    parsed_conditions = parse_conditions(query)
    for col in columns:
        if col.lower() in query.lower():
            for op, value in parsed_conditions:
                conditions.append(f"{col} {op} {value}")

    for token in doc:
        if token.text.lower() in [col.lower() for col in columns]:
            select_cols.append(token.text)

    select_cols = ', '.join(select_cols) if select_cols else '*'  
    conditions = ' AND '.join(conditions) if conditions else '1 == 1'

    try:
        query_str = f"df.query('{conditions}')"
        print("Generated query:", query_str)
        result_df = eval(query_str, {"df": df})

        pd.set_option('display.max_columns', None)

        return result_df  
    except Exception as e:
        return f"Error processing query: {e}"

def get_query_results(query, df):
    result_df = text_to_sql(query, df)
    if isinstance(result_df, pd.DataFrame) and not result_df.empty:
        return result_df
    return "Query could not be processed or returned no results."

def main(query):
    results = get_query_results(query, df)
    print(results)
    return results

# Example queries
#query = "show me events where detections are greater than 800"
#query = "show me tests where detections are less than 500"
query = "show events where tests are more than 3000"

main(query)
