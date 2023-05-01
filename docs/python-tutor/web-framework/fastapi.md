# fastapi

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
  
  
# 文档 https://www.cnblogs.com/liuweida/p/14324604.htmlif __name__ == '__main__':  
    # uvicorm.run(文件名:app),不然会出现 ERROR: Error loading ASGI app. Could not import module "main"    # 启动服务，因为我们这个文件叫做 main.py    # 所以需要启动 main.py 里面的 app    # 第一个参数 "main:app" 就表示这个含义  
    # 然后是 host 和 port 表示监听的 ip 和端口  
    print(f"http://localhost:{port}/docs")  
    uvicorn.run("fast_demo:app", host="0.0.0.0", port=port)
```
