import datetime

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import time
import queries
from flask_sock import Sock
import nlpQuery
from gemini import generate_content

app = Flask(__name__)
CORS(app)
sock = Sock(app)
clients = []


@sock.route('/socket/alert')
def echo(ws):
    clients.append(ws)
    try:
        while True:
            message = ws.receive()
            message = generate_content(message)
            for client in clients:
                if client != ws:
                    client.send(message)
    finally:
        clients.remove(ws)


@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    # data['type'], data['city'], data['country'], data['user']
    date = time.strftime('%Y-%m-%d %H:%M:%S')
    print(data)
    similar = queries.checkForSimilar(data['type'], data['gpslat'], data['gpslong'])
    print(len(similar))

    if len(similar) > 0:
        print(similar[0][0])
        queries.update(similar[0][0], data['svSliderSubmit'], date)
    else:
    
        # add data to database
        queries.report(data['gpslat'], data['gpslong'], data['type'], data['city'], data['prov'], data['country'], data['svSliderSubmit'], date)

    response = {'status': '200'}
    print(response)

    return jsonify(response)

@app.route('/query', methods=['POST'])
def query():
    data = request.get_json()
    # data['type'], data['city'], data['country'], data['user']
    # print("aalalalla")
    # print(data['query'])

    ret = nlpQuery.main(data['query'])

    response = {'status': '200', 'data': ret.to_json()}
    # print(response)

    return jsonify(response)


@app.route('/data/<city>', methods=['GET'])
def get(city):
    ret = queries.getTopNearMe(city)
    # ret = [(1, 'Hamilton', 'ON', 'Canada', 1, 3, 1, 43.2501, -79.8496, datetime.datetime(2025, 1, 24, 3, 19, 30))]
    print(ret)

    response = {'data': ret}
    return jsonify(response)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
