import{_ as s,f as l,r as c,c as d,b as f,h as u,a as o,d as m,o as h}from"./app-CbULZrmi.js";const g={__name:"filter.html",setup(n,{expose:a}){a();let r=l([{filter:"blur(5px)"},{filter:"contrast(200%)"},{filter:"grayscale(80%)"},{filter:"hue-rotate(90deg)"},{filter:"drop-shadow(30px 10px 4px #4444dd)"},{filter:"drop-shadow(16px 16px 20px red) invert(75%)"},{filter:"drop-shadow(0 0 0.75rem crimson)"}]),e=l("https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg");const i={get cssList(){return r},set cssList(t){r=t},get image(){return e},set image(t){e=t},h:u,ref:l};return Object.defineProperty(i,"__isScriptSetup",{enumerable:!1,value:!0}),i}},b=o("h1",{id:"filter",tabindex:"-1"},[o("a",{class:"header-anchor",href:"#filter"},[o("span",null,"filter")])],-1),_=m(`<p>语法</p><pre><code class="language-css">/* URL to SVG filter */
filter: url(&quot;filters.svg#filter-id&quot;);

/* &lt;filter-function&gt; values */
filter: blur(5px);
filter: brightness(0.4);
filter: contrast(200%);
filter: drop-shadow(16px 16px 20px blue);
filter: grayscale(50%);
filter: hue-rotate(90deg);
filter: invert(75%);
filter: opacity(25%);
filter: saturate(30%);
filter: sepia(60%);

/* Multiple filters */
filter: contrast(175%) brightness(3%);

/* Use no filter */
filter: none;

/* Global values */
filter: inherit;
filter: initial;
filter: revert;
filter: revert-layer;
filter: unset;

</code></pre><p><code>&lt;filter-function&gt;</code> 数据类型由下列过滤器函数之一指定的。每个函数需要一个参数，如果参数无效，结果不会被改变，如同没有使用过滤器一样。</p><ul><li><p><code>blur()</code></p><p>模糊图像</p></li><li><p><code>brightness()</code></p><p>让图像更明亮或更暗淡</p></li><li><p><code>contrast()</code></p><p>增加或减少图像的对比度</p></li><li><p><code>drop-shadow()</code></p><p>在图像后方应用投影</p></li><li><p><code>grayscale()</code></p><p>将图像转为灰度图</p></li><li><p><code>hue-rotate()</code></p><p>改变图像的整体色调</p></li><li><p><code>invert()</code></p><p>反转图像颜色</p></li><li><p><code>opacity()</code></p><p>改变图像透明度</p></li><li><p><code>saturate()</code></p><p>超饱和或去饱和输入的图像</p></li><li><p><code>sepia()</code></p><p>将图像转为棕褐色</p></li></ul><h2 id="dropback-filter" tabindex="-1"><a class="header-anchor" href="#dropback-filter"><span>dropback-filter</span></a></h2><pre><code class="language-css">/* Keyword value */
backdrop-filter: none;

/* URL to SVG filter */
backdrop-filter: url(commonfilters.svg#filter);

/* &lt;filter-function&gt; values */
backdrop-filter: blur(2px);
backdrop-filter: brightness(60%);
backdrop-filter: contrast(40%);
backdrop-filter: drop-shadow(4px 4px 10px blue);
backdrop-filter: grayscale(30%);
backdrop-filter: hue-rotate(120deg);
backdrop-filter: invert(70%);
backdrop-filter: opacity(20%);
backdrop-filter: sepia(90%);
backdrop-filter: saturate(80%);

/* Multiple filters */
backdrop-filter: url(filters.svg#filter) blur(4px) saturate(150%);

/* Global values */
backdrop-filter: inherit;
backdrop-filter: initial;
backdrop-filter: revert;
backdrop-filter: revert-layer;
backdrop-filter: unset;
</code></pre>`,6);function v(n,a,r,e,i,t){const p=c("CssDemo");return h(),d("div",null,[b,f(p,{"css-list":e.cssList,image:e.image},null,8,["css-list","image"]),_])}const k=s(g,[["render",v],["__file","filter.html.vue"]]),x=JSON.parse('{"path":"/frontend/basic-css/filter.html","title":"filter","lang":"zh-CN","frontmatter":{"description":"filter","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-css/filter.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"filter"}],["meta",{"property":"og:description","content":"filter"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-18T20:12:43.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-07-18T20:12:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"filter\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-18T20:12:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"dropback-filter","slug":"dropback-filter","link":"#dropback-filter","children":[]}],"git":{"createdTime":1658156029000,"updatedTime":1658175163000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":1.33,"words":400},"filePathRelative":"frontend/basic-css/filter.md","localizedDate":"2022年7月18日","autoDesc":true}');export{k as comp,x as data};
