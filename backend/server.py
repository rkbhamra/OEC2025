from flask import Flask, request, jsonify
import time

app = Flask(__name__)
import queries


@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    # data['type'], data['city'], data['country'], data['user']
    date = time.strftime('%Y-%m-%d %H:%M:%S')
    print(data)

    # add data to database
    queries.report(data['gpslat'], data['gpslong'], data['type'], data['city'], data['prov'], data['country'], data['svSliderSubmit'], date)

    response = {'status': '200'}
    return jsonify(response)


@app.route('/data:<string:city>', methods=['GET'])
def get(city):
    # get data from database

    response = {'data': "PUT DATA HERE"}
    return jsonify(response)



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
