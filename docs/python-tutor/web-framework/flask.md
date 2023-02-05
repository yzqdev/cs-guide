# flask框架

```python
from flask import Flask, Blueprint  
  
app = Flask(__name__)  
  
port = 9877  
  
cat = Blueprint('cat', __name__)  
  
  
@cat.route('/name')  
def index():  
    return 'Hello, cat!'  
  
  
@app.route("/hello", methods=["GET"])  
def hello():  
    """  
    hello get    ---  
  
  
    responses:      200:        description: 返回用户信息  
        examples:            {                code: 0,                msg: "ok",                data:                    {                        name: "Tom",                        uid: 1                    },            }  
    """    return "hello siwadoc"  
  
  
app.register_blueprint(cat, url_prefix='/cat')  
if __name__ == '__main__':  
    print(f"文档地址=>http://localhost:{port}/docs ")  # 注意不要多待杠 /doc/    app.run(port=port, debug=True)
```
