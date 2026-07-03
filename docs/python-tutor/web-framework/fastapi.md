# FastAPI

> FastAPI 是一个现代、快速（高性能）的 Python Web 框架，基于 Python 3.6+ 的类型提示（type hints），自动生成 OpenAPI 文档。

## 核心特性

- **自动 API 文档**：内置 Swagger UI（`/docs`）和 ReDoc（`/redoc`）
- **类型校验**：基于 Pydantic 的请求/响应数据校验
- **异步支持**：原生 async/await，高性能
- **依赖注入**：内置 DI 系统，开发体验优秀

## 快速开始

```bash
pip install fastapi uvicorn
```

## 基础示例

```python
from typing import Union  

import uvicorn  
from fastapi import FastAPI  

app = FastAPI()  

port = 9011  


@app.get("/")  
def read_root():  
    return {"Hello": "World"}  


@app.get("/items/{item_id}")  
def read_item(item_id: int, q: Union[str, None] = None):  
    return {"item_id": item_id, "q": q}  


if __name__ == '__main__':  
    # 文档 https://www.cnblogs.com/liuweida/p/14324604.html
    # uvicorn.run(文件名:app)，不然会出现 ERROR: Error loading ASGI app
    # 因为我们这个文件叫做 main.py，所以需要启动 main.py 里面的 app
    # 第一个参数 "main:app" 就表示这个含义
    # 然后是 host 和 port 表示监听的 ip 和端口  
    print(f"http://localhost:{port}/docs")  
    uvicorn.run("fast_demo:app", host="0.0.0.0", port=port)
```

## 运行与访问

```bash
# 启动服务
python main.py

# 浏览器访问
# API:      http://localhost:9011/
# 文档:     http://localhost:9011/docs
# 备用文档: http://localhost:9011/redoc
```

## 官方文档

- [FastAPI 官方文档](https://fastapi.tiangolo.com/)
- [FastAPI 中文文档](https://fastapi.tiangolo.com/zh/)
