import{_ as t,c as e,o as n,d as l}from"./app-CbULZrmi.js";const o={},a=l(`<h1 id="vue单html" tabindex="-1"><a class="header-anchor" href="#vue单html"><span>vue单html</span></a></h1><h2 id="vue3-element-plus" tabindex="-1"><a class="header-anchor" href="#vue3-element-plus"><span>Vue3 + element-plus</span></a></h2><iframe style="width:100%;border:1px solid cyan;" src="/cs-guide/element.html"></iframe><pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot; /&gt;
    &lt;title&gt;element-plus&lt;/title&gt;
    &lt;link
      rel=&quot;stylesheet&quot;
      href=&quot;https://unpkg.com/element-plus/dist/index.css&quot;
    /&gt;
    &lt;script src=&quot;https://unpkg.com/vue&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;https://unpkg.com/element-plus&quot;&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id=&quot;app&quot;&gt;
      &lt;el-button type=&quot;primary&quot; @click=&quot;showMsg&quot;&gt;element-plus&lt;/el-button&gt;
    &lt;/div&gt;

    &lt;script&gt;
      const app = Vue.createApp({
        data() {
          return {
            msg: &quot;hhhhh&quot;,
          };
        },
        methods: {
          showMsg() {
            ElementPlus.ElMessage(&quot;hhh&quot;);
          },
        },
      });
      app.use(ElementPlus);
      app.mount(&quot;#app&quot;);
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
      // app.mount(&quot;#app&quot;);
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre><h2 id="vue3-element-plus-module-and-setup" tabindex="-1"><a class="header-anchor" href="#vue3-element-plus-module-and-setup"><span>Vue3 + element-plus(module and setup)</span></a></h2><iframe style="width:100%;border:1px solid cyan;" src="/cs-guide/element-module.html"></iframe><pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot; /&gt;
    &lt;title&gt;element-plus&lt;/title&gt;
     
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id=&quot;app&quot;&gt;
      &lt;button type=&quot;primary&quot; @click=&quot;showMsg&quot;&gt;element-plus&lt;/button&gt;
    &lt;/div&gt;

    &lt;script type=&quot;module&quot;&gt;
       
     
         import {  createApp, reactive, toRefs } from &#39;https://unpkg.com/vue@3/dist/vue.esm-browser.js&#39;
         
      // 使用setup
     
      const data = reactive({
        state: 12,
      });
      const app = createApp({
        setup() {
          function showMsg( ) {
            alert(&quot;hhh&quot;)
          }
          return {
showMsg,
            ...toRefs(data),
          };
        },
      });
    
      app.mount(&quot;#app&quot;);
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre><h2 id="naiveui" tabindex="-1"><a class="header-anchor" href="#naiveui"><span>naiveui</span></a></h2><iframe style="width:100%;border:1px solid cyan;" src="/cs-guide/naive.html"></iframe><pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot; /&gt;
    &lt;title&gt;naive&lt;/title&gt;

    &lt;script src=&quot;https://cdn.jsdelivr.net/npm/vue&quot;&gt;&lt;/script&gt;
    
    &lt;script src=&quot;https://unpkg.com/naive-ui&quot;&gt;&lt;/script&gt;  
  &lt;/head&gt;
  &lt;body&gt;
    &lt;div id=&quot;app&quot;&gt;
      &lt;n-button&gt;{{ message }}&lt;/n-button&gt;
    &lt;/div&gt;
    &lt;script type=&quot;module&quot;&gt;
     
      
      const App = {
        setup() {
          return {
            message: &#39;naive&#39;,
          }
        },
      }
      const app =Vue. createApp(App)
       app.use(naive)
      app.mount(&#39;#app&#39;)
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre><h2 id="使用quasar" tabindex="-1"><a class="header-anchor" href="#使用quasar"><span>使用quasar</span></a></h2><p><a href="https://quasar.dev/start/umd" target="_blank" rel="noopener noreferrer">https://quasar.dev/start/umd</a></p><iframe style="width:100%;border:1px solid cyan;" src="/cs-guide/quasar.html"></iframe><pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;!--
    WARNING! Make sure that you match all Quasar related
    tags to the same version! (Below it&#39;s &quot;@2.3.2&quot;)
  --&gt;

  &lt;head&gt;
    &lt;!-- &lt;link
      href=&quot;https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons&quot;
      rel=&quot;stylesheet&quot;
      type=&quot;text/css&quot;
    /&gt; --&gt;
    &lt;link
      href=&quot;https://unpkg.com/quasar/dist/quasar.prod.css&quot;
      rel=&quot;stylesheet&quot;
      type=&quot;text/css&quot;
    /&gt;
  &lt;/head&gt;

  &lt;body&gt;
    &lt;!-- example of injection point where you write your app template --&gt;
    &lt;div id=&quot;q-app&quot;&gt;
      &lt;q-btn&gt;按钮&lt;/q-btn&gt;
      &lt;q-card class=&quot;my-card&quot;&gt;
        &lt;q-card-section&gt; {{ lorem }} &lt;/q-card-section&gt;
      &lt;/q-card&gt;
    &lt;/div&gt;

    &lt;!-- Add the following at the end of your body tag --&gt;
    &lt;script src=&quot;https://unpkg.com/vue&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;https://unpkg.com/quasar/dist/quasar.umd.prod.js&quot;&gt;&lt;/script&gt;
    &lt;script src=&quot;https://unpkg.com/quasar/dist/lang/zh-CN.umd.prod.js&quot;&gt;&lt;/script&gt;

    &lt;script&gt;
      /*
        Example kicking off the UI. Obviously, adapt this to your specific needs.
        Assumes you have a &lt;div id=&quot;q-app&quot;&gt;&lt;/div&gt; in your &lt;body&gt; above
       */
      const app = Vue.createApp({
        setup() {
          return {
            lorem:
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.&quot;,
          };
        },
      });

      app.use(Quasar);
      Quasar.lang.set(Quasar.lang.zhCN);
      app.mount(&quot;#q-app&quot;);
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>`,14),s=[a];function u(r,p){return n(),e("div",null,s)}const c=t(o,[["render",u],["__file","vue-singlehtml.html.vue"]]),d=JSON.parse('{"path":"/frontend/framework/vue/vue-singlehtml.html","title":"vue单html","lang":"zh-CN","frontmatter":{"description":"vue单html Vue3 + element-plus","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/vue/vue-singlehtml.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"vue单html"}],["meta",{"property":"og:description","content":"vue单html Vue3 + element-plus"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vue单html\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"Vue3 + element-plus","slug":"vue3-element-plus","link":"#vue3-element-plus","children":[]},{"level":2,"title":"Vue3 + element-plus(module and setup)","slug":"vue3-element-plus-module-and-setup","link":"#vue3-element-plus-module-and-setup","children":[]},{"level":2,"title":"naiveui","slug":"naiveui","link":"#naiveui","children":[]},{"level":2,"title":"使用quasar","slug":"使用quasar","link":"#使用quasar","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.27,"words":82},"filePathRelative":"frontend/framework/vue/vue-singlehtml.md","localizedDate":"2022年3月21日","autoDesc":true}');export{c as comp,d as data};
