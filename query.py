import json
import requests

'''Program creates a json file and sends it to a web server.  The server is expected to do something with the json and return a result. In this case it strips the keys and returns the values.'''

'''Process:
1. start server with main.py
2. execute query.py'''

data = {'arg1': 'val1', 'arg2': 'val2'}

data = json.dumps(data)

r = requests.put('http://localhost:3000/myroute', data = data)

print r.text
