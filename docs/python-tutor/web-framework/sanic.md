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
        "docExpansion": "none",  # 或者full  
  
    }  
app.config.SWAGGER_UI_CONFIGURATION = swagger_ui_configuration  
app.config.OAS_UI_DEFAULT="swagger"  
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