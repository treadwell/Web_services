from flask import Flask, request
import json

app = Flask(__name__) # usually main.py

@app.route('/')  # how you establish routs
def hello():
    return 'Hello!'

@app.route('/myroute',  methods =['GET', 'PUT'])
def hello2():
    data = json.loads(request.data)
    return str(data.values())
    # return 'Goodbye'

if __name__ == '__main__':
    app.debug = True
    app.run(port = 3000)
