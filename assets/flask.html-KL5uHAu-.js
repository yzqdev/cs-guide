import{_ as t,c as o,o as a,a as e}from"./app-CbULZrmi.js";const n={},r=e("h1",{id:"flask框架",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#flask框架"},[e("span",null,"flask框架")])],-1),l=e("pre",null,[e("code",{class:"language-python"},`from flask import Flask, Blueprint  
  
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
`)],-1),s=[r,l];function p(c,i){return a(),o("div",null,s)}const m=t(n,[["render",p],["__file","flask.html.vue"]]),_=JSON.parse('{"path":"/python-tutor/web-framework/flask.html","title":"flask框架","lang":"zh-CN","frontmatter":{"description":"flask框架","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/python-tutor/web-framework/flask.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"flask框架"}],["meta",{"property":"og:description","content":"flask框架"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-05T14:28:39.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-02-05T14:28:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"flask框架\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-05T14:28:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1653665805000,"updatedTime":1675607319000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":0.28,"words":85},"filePathRelative":"python-tutor/web-framework/flask.md","localizedDate":"2022年5月27日","autoDesc":true}');export{m as comp,_ as data};
