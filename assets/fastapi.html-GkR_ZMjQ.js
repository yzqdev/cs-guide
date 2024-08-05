import{_ as e,c as o,o as a,a as t}from"./app-CbULZrmi.js";const n={},i=t("h1",{id:"fastapi",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#fastapi"},[t("span",null,"fastapi")])],-1),r=t("pre",null,[t("code",{class:"language-python"},`from typing import Union  
  
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
`)],-1),p=[i,r];function s(m,c){return a(),o("div",null,p)}const l=e(n,[["render",s],["__file","fastapi.html.vue"]]),h=JSON.parse('{"path":"/python-tutor/web-framework/fastapi.html","title":"fastapi","lang":"zh-CN","frontmatter":{"description":"fastapi","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/python-tutor/web-framework/fastapi.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"fastapi"}],["meta",{"property":"og:description","content":"fastapi"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-01T05:22:42.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-01T05:22:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"fastapi\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-01T05:22:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1653665805000,"updatedTime":1682918562000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":4}]},"readingTime":{"minutes":0.45,"words":134},"filePathRelative":"python-tutor/web-framework/fastapi.md","localizedDate":"2022年5月27日","autoDesc":true}');export{l as comp,h as data};
