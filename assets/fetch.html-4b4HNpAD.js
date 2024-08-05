import{_ as n,r as o,c as s,b as a,w as r,d as c,a as e,o as i}from"./app-CbULZrmi.js";const l={},p=c(`<h1 id="使用fetch" tabindex="-1"><a class="header-anchor" href="#使用fetch"><span>使用fetch</span></a></h1><h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法"><span>使用方法</span></a></h2><pre><code class="language-js">// Example POST method implementation:
async function postData(url = &#39;&#39;, data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: &#39;POST&#39;, // *GET, POST, PUT, DELETE, etc.
    mode: &#39;cors&#39;, // no-cors, *cors, same-origin
    cache: &#39;no-cache&#39;, // *default, no-cache, reload, force-cache, only-if-cached
    credentials: &#39;same-origin&#39;, // include, *same-origin, omit
    headers: {
      &#39;Content-Type&#39;: &#39;application/json&#39;
      // &#39;Content-Type&#39;: &#39;application/x-www-form-urlencoded&#39;,
    },
    redirect: &#39;follow&#39;, // manual, *follow, error
    referrerPolicy: &#39;no-referrer&#39;, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match &quot;Content-Type&quot; header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData(&#39;https://example.com/answer&#39;, { answer: 42 })
  .then(data =&gt; {
    console.log(data); // JSON data parsed by \`data.json()\` call
  });

</code></pre>`,3),d=e("pre",null,[e("code",{class:"language-html"},`<button onclick='fun1()'>点击我 1</button>
`)],-1),h=e("pre",null,[e("code",{class:"language-js"},`function fun1(){
    fetch('http://httpbin.org/get',{mode:'no-cors'})
  .then(response => response.json())
  .then(data => console.log(data));

}
`)],-1),m=e("iframe",{style:{width:"100%",border:"1px solid cyan"},src:"/cs-guide/fetch.html"},null,-1),u=e("pre",null,[e("code",{class:"language-html"},`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>element-plus</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/element-plus/dist/index.css"
    />
    <meta http-equiv="Access-Control-Allow-Origin" content="*" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/element-plus/dist/index.css"
    />
    <script src="https://unpkg.com/vue"><\/script>
    <script src="https://unpkg.com/axios"><\/script>
    <script src="https://unpkg.com/element-plus"><\/script>
  </head>
  <body>
    <div id="app">
      <el-button type="primary" @click="showMsg">element-plus</el-button>
      <div>{{msg1}}</div>
      <el-button type="primary" @click="showAxios">获取标签</el-button>
      <div>{{msg2}}</div>
    </div>

    <script>
      axios.defaults.crossDomain = true;
      const app = Vue.createApp({
        data() {
          return {
            msg: "hhhhh",
            msg1: "",
            msg2: "",
          };
        },
        methods: {
          async showAxios() {
            let data = await axios.get(
              "https://www.jianshu.com/shakespeare/v2/notes/recommend",
              {
                headers: {
                  "Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
                  "Access-Control-Allow-Origin": "*",
                },
              }
            );
            this.msg2 = data;
            setTimeout(() => {
              this.msg2 = "";
            }, 5000);
          },
          showMsg() {
            fetch(
              "https://118.89.204.198/resolv?host=www.zhihu.com&os_type=web",
              {
                method: "GET",
                mode: "cors",
                headers: {},
              }
            )
              .then((res) => {
                console.log(res);
                return res.json();
              })
              .then((data) => {
                this.msg1 = data;
                setTimeout(() => {
                  this.msg1 = "";
                }, 4000);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          },
        },
      });
      app.use(ElementPlus);
      app.mount("#app");
      // 使用setup
      // const { createApp, reactive, toRefs } = Vue;
      // const data = reactive({
      //   state: 12,
      // });
      // const app = createApp({
      //   setup() {
      //     return {
      //       ...toRefs(data),
      //     };
      //   },
      // });
      // app.mount("#app");
    <\/script>
  </body>
</html>
`)],-1);function g(f,y){const t=o("CodeDemo");return i(),s("div",null,[p,a(t,{id:"code-demo-7",type:"normal",code:"eJxNjk0OgjAQha/SdFOaIIQtAidhA6X8WWYIHVaEjRvdehzjedRrWCQmzmYm874veQtvaTA85kk5EyEwBGU6dUpFPUPkSZG9z/fn5fG63liUhDuU5cB93lunOUpR57wdX3JgbmpNqvVESzTGYbitsoMApyZsNAl/GbDSsQA8KJysWOVmBdRq8CZtRwSrWZqx3x30FsGTf1RVULERysVodGCw+f6kPOaQw+r6rR8/JkxU"},{default:r(()=>[d,h]),_:1}),m,u])}const v=n(l,[["render",g],["__file","fetch.html.vue"]]),_=JSON.parse('{"path":"/frontend/basic-js/fetch.html","title":"使用fetch","lang":"zh-CN","frontmatter":{"description":"使用fetch 使用方法","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-js/fetch.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"使用fetch"}],["meta",{"property":"og:description","content":"使用fetch 使用方法"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-24T22:42:20.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-24T22:42:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用fetch\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-24T22:42:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"使用方法","slug":"使用方法","link":"#使用方法","children":[]}],"git":{"createdTime":1650201329000,"updatedTime":1653432140000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.63,"words":189},"filePathRelative":"frontend/basic-js/fetch.md","localizedDate":"2022年4月17日","autoDesc":true}');export{v as comp,_ as data};
