import{_ as t,c as e,o,d as n}from"./app-CbULZrmi.js";const a={},r=n(`<h1 id="sanic框架" tabindex="-1"><a class="header-anchor" href="#sanic框架"><span>sanic框架</span></a></h1><pre><code class="language-python">  
from colorama import Back, Fore  
from sanic import Sanic  
from sanic.response import json, text  
  
from sanic_api.cat_api import bp  
  
app = Sanic(&quot;MyHelloWorldApp&quot;)  
app.blueprint(bp)  
swagger_ui_configuration = {  
        &quot;validatorUrl&quot;: None,  # Disable Swagger validator  
        &quot;displayRequestDuration&quot;: True,  
        &quot;docExpansion&quot;: &quot;none&quot;,  # 或者full  
  
    }  
app.config.SWAGGER_UI_CONFIGURATION = swagger_ui_configuration  
app.config.OAS_UI_DEFAULT=&quot;swagger&quot;  
@app.get(&quot;/&quot;)  
async def hello_world(request):  
    return text(&quot;Hello, world.&quot;)  
  
  
@app.get(&quot;/json&quot;)  
async def get_json(request):  
    return json({&quot;code&quot;: 200, &quot;message&quot;: &quot;清清楚楚&quot;, &quot;data&quot;: request.args})  
  
async def handler(request):  
    return text(&quot;OK&quot;)  
  
  
app.add_route(handler, &quot;/test&quot;)  
  
if __name__ == &#39;__main__&#39;:  
    port = 9200  
    print(f&quot;{Fore.RED}http://localhost:{port}&quot;)  
    app.run(host=&quot;0.0.0.0&quot;, port=port)
</code></pre><h2 id="创建定时任务" tabindex="-1"><a class="header-anchor" href="#创建定时任务"><span>创建定时任务</span></a></h2><pre><code class="language-python">async def generate_code(app):

    while True:

        await asyncio.sleep(5)

        print(&quot;Server successfully started!&quot;)
 
app.add_task(generate_code(app))
</code></pre>`,4),i=[r];function p(s,c){return o(),e("div",null,i)}const d=t(a,[["render",p],["__file","sanic.html.vue"]]),l=JSON.parse('{"path":"/python-tutor/web-framework/sanic.html","title":"sanic框架","lang":"zh-CN","frontmatter":{"description":"sanic框架 创建定时任务","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/python-tutor/web-framework/sanic.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"sanic框架"}],["meta",{"property":"og:description","content":"sanic框架 创建定时任务"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-20T18:32:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-09-20T18:32:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"sanic框架\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-20T18:32:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"创建定时任务","slug":"创建定时任务","link":"#创建定时任务","children":[]}],"git":{"createdTime":1674222982000,"updatedTime":1695234758000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":0.4,"words":120},"filePathRelative":"python-tutor/web-framework/sanic.md","localizedDate":"2023年1月20日","autoDesc":true}');export{d as comp,l as data};
