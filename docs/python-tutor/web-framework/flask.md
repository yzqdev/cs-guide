# Flask 框架

> Flask 是一个轻量级 Python Web 框架，被称为"微框架"——核心简单易用，通过扩展实现 ORM、表单、认证等功能。

## 核心特性

- **轻量灵活**：核心只包含路由、模板、请求/响应对象
- **蓝本（Blueprint）**：支持模块化路由组织
- **扩展丰富**：Flask-SQLAlchemy、Flask-Login、Flask-Migrate 等
- **Jinja2 模板**：功能强大的模板引擎

## 快速开始

```bash
pip install flask
```

## 基础示例（含 Blueprint）

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
    hello get
    ---
    responses:
        200:
            description: 返回用户信息
            examples:
                {
                    code: 0,
                    msg: "ok",
                    data:
                        {
                            name: "Tom",
                            uid: 1
                        },
                }
    """
    return "hello siwadoc"


app.register_blueprint(cat, url_prefix='/cat')

if __name__ == '__main__':
    print(f"文档地址=>http://localhost:{port}/docs ")
    app.run(port=port, debug=True)
```

## 路由与请求

```python
# 变量规则
@app.route('/user/<username>')
def show_user(username):
    return f'User: {username}'

# HTTP 方法
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return '登录成功'
    return '请登录'

# JSON 响应
from flask import jsonify

@app.route('/api/data')
def get_data():
    return jsonify({"code": 0, "data": [1, 2, 3]})
```

## 官方文档

- [Flask 官方文档](https://flask.palletsprojects.com/)
- [Flask 中文文档](https://dormousehole.readthedocs.io/)
