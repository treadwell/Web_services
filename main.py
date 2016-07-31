from flask import Flask, request, render_template
import json

app = Flask(__name__) # usually main.py

@app.route('/')  # how you establish routes
def hello():
    return 'Hello!'

@app.route('/myform', methods=['GET', 'POST'])
def form_route():
    # if request.method == 'GET':
    #     if request.args:
    #         data = {}
    #         for k, v in request.args.items():
    #             data[k] = v
    #         return json.dumps(data)
        
    first = request.args.get('firstname', 'Mickey')
    last = request.args.get('lastname', 'Mouse')
    return render_template('index.html', url = '/',
                           first = first, last = last,
                           html = make_html(first, last))


def make_html(first, last):
    if first == 'Mickey':
        return ''
    return 'first name: {}<br>last name: {}'.format(first, last)

@app.route('/myroute')
def hello2():
    # data = json.loads(request.data)
    data = {}
    for k, v in request.args.iteritems():
        data[k] = v

    if not data:
        data = ["empty"]
        
    return json.dumps(data)
    # return str(data.values())


if __name__ == '__main__':
    app.debug = True
    app.run(port = 3000)
