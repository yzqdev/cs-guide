# Sanic 框架

> Sanic 是一个异步 Python Web 框架，与 Flask 风格相似但完全基于 async/await，适合高吞吐量的 API 服务。

## 核心特性

- **原生异步**：基于 asyncio，非阻塞 I/O
- **类 Flask 风格**：路由、蓝本、请求/响应 API 与 Flask 类似
- **内置 Swagger**：自动生成 OpenAPI 文档
- **支持 WebSocket**：原生 WebSocket 支持
- **高性能**：适合高并发场景

## 快速开始

```bash
pip install sanic
```

## 基础示例

```python
from colorama import Back, Fore
from sanic import Sanic
from sanic.response import json, text

from sanic_api.cat_api import bp

app = Sanic("MyHelloWorldApp")
app.blueprint(bp)

swagger_ui_configuration = {
    "validatorUrl": None,  # Disable Swagger validator
    "displayRequestDuration": True,
    "docExpansion": "none",  # 或者 full
}

app.config.SWAGGER_UI_CONFIGURATION = swagger_ui_configuration
app.config.OAS_UI_DEFAULT = "swagger"

@app.get("/")
async def hello_world(request):
    return text("Hello, world.")

@app.get("/json")
async def get_json(request):
    return json({"code": 200, "message": "清清楚楚", "data": request.args})

async def handler(request):
    return text("OK")

app.add_route(handler, "/test")

if __name__ == '__main__':
    port = 9200
    print(f"{Fore.RED}http://localhost:{port}")
    app.run(host="0.0.0.0", port=port)
```

## 创建定时任务（异步后台任务）

Sanic 支持在服务器启动时注册后台协程任务：

```python
async def generate_code(app):
    while True:
        await asyncio.sleep(5)
        print("Server successfully started!")

app.add_task(generate_code(app))
```

## 路由与请求

```python
# 路径参数
@app.get("/user/<user_id:int>")
async def get_user(request, user_id):
    return json({"user_id": user_id})

# 查询参数
@app.get("/search")
async def search(request):
    keyword = request.args.get("keyword")
    return json({"keyword": keyword})

# POST 请求
@app.post("/user")
async def create_user(request):
    data = request.json
    return json({"created": data}, status=201)
```

## 官方文档

- [Sanic 官方文档](https://sanic.dev/)
- [Sanic GitHub](https://github.com/sanic-org/sanic)