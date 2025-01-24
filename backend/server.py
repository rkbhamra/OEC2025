from flask import Flask, request, jsonify
import time

app = Flask(__name__)


@app.route('/test_post', methods=['POST'])
def post():
    data = request.get_json()
    gesture = "aaaa"

    print('gesture :: ', gesture)
    response = {
        'message': 'post test',
        'data': gesture
    }
    return jsonify(response)


@app.route('/test_get', methods=['GET'])
def get():
    response = {
        'message': 'get test',
        'data': time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
    }
    return jsonify(response)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
    # app.get()