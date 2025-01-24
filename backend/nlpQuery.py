import pandas as pd
import spacy
import warnings
import os

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

df['tests'] = df['tests'].replace({',': ''}, regex=True)
df['tests'] = pd.to_numeric(df['tests'], errors='coerce')

df['detections'] = pd.to_numeric(df['detections'], errors='coerce')

with warnings.catch_warnings(record=True) as w:
    for warning in w:
        print(warning.message)

def text_to_sql(query, df):
    doc = nlp(query)
    columns = df.columns.tolist()

    select_cols = []
    conditions = []

    for token in doc:
        if token.text.lower() in [col.lower() for col in columns]:
            select_cols.append(token.text)
        if token.pos_ == 'ADP' and token.text.lower() in ['before', 'after']:
            adp = token.text.lower()
            adj = [child.text for child in token.children if child.pos_ == 'NUM']
            if adj:
                if adp == 'before':
                    conditions.append(f"{token.head.text} < {''.join(adj)}")
                elif adp == 'after':
                    conditions.append(f"{token.head.text} > {''.join(adj)}")

    select_cols = ', '.join(select_cols) if select_cols else '*'
    conditions = ' AND '.join(conditions) if conditions else '1=1'

    try:
        query_str = f"df.query('{conditions}')"
        print("Generated query:", query_str)
        result_df = eval(query_str, {"df": df})
        
        if select_cols != '*':
            result_df = result_df[select_cols.split(', ')]
        return result_df
    except Exception as e:
        return f"Error processing query: {e}"

def get_query_results(query, df):
    result_df = text_to_sql(query, df)
    if isinstance(result_df, pd.DataFrame) and not result_df.empty:
        return result_df
    return "Query could not be processed."

def main(query):
    results = get_query_results(query, df)
    print(results)
    return results

query = "detections of the events after 700"
main(query)