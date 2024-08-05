import{_ as e,c as o,o as t,d as n}from"./app-CbULZrmi.js";const c={},i=n(`<h1 id="一些在控制台好用的js脚本" tabindex="-1"><a class="header-anchor" href="#一些在控制台好用的js脚本"><span>一些在控制台好用的js脚本</span></a></h1><h2 id="在iconfont批量添加图标" tabindex="-1"><a class="header-anchor" href="#在iconfont批量添加图标"><span>在iconfont批量添加图标</span></a></h2><p><a href="https://www.iconfont.cn/collections" target="_blank" rel="noopener noreferrer">https://www.iconfont.cn/collections</a></p><pre><code class="language-js">// 先选择最外层的ul
let ul=document.querySelectorAll(&#39;.block-icon-list.clearfix&#39;)[1].children
// 然后遍历子类li
for (let li of ul){
    li.querySelectorAll(&#39;.cover-item.iconfont.cover-item-line.icon-gouwuche1&#39;)[0].click()
}


</code></pre><p>或者</p><pre><code class="language-js">[...document.querySelectorAll(&#39;.cover-item.iconfont.cover-item-line.icon-gouwuche1&#39;)].forEach(i=&gt;i.click())
//获取所有的iconname
let arr=[];
[...document.querySelectorAll(&#39;.icon-name&#39;)].forEach(i=&gt;arr.push(i.innerText))
</code></pre><h2 id="抖音获取喜欢的列表" tabindex="-1"><a class="header-anchor" href="#抖音获取喜欢的列表"><span>抖音获取喜欢的列表</span></a></h2><pre><code class="language-js">let arr=[];
[...document.querySelectorAll(&#39;.B3AsdZT9.chmb2GX8.UwG3qaZV&#39;)].forEach(i=&gt;{
    console.log(i.href);arr.push(i.href)
    })
</code></pre><h2 id="获取所有的cookie" tabindex="-1"><a class="header-anchor" href="#获取所有的cookie"><span>获取所有的cookie</span></a></h2><pre><code class="language-js">function getCookies() {
  let pairs = document.cookie.split(&quot;;&quot;);
  let cookies = new Map();
  for (let i = 0; i &lt; pairs.length; i++) {
    let pair = pairs[i].split(&quot;=&quot;);
    cookies.set(((pair[0] + &#39;&#39;).trim()),pair[1])
  }
  return cookies;
}


</code></pre><pre><code class="language-js">
var log = console.log.bind(null, &quot;%c[Log]%c %s&quot;, &quot;color:cyan&quot;, &quot;&quot;);
log(&quot;foo&quot;);
log(&quot;%cfoo%c%s&quot;, &quot;color:red&quot;, &quot;&quot;, &quot;=bar&quot;);
</code></pre>`,11),r=[i];function a(l,s){return t(),o("div",null,r)}const d=e(c,[["render",a],["__file","awesome-js-console.html.vue"]]),u=JSON.parse('{"path":"/cs-tips/frontend/snippets/awesome-js-console.html","title":"一些在控制台好用的js脚本","lang":"zh-CN","frontmatter":{"description":"一些在控制台好用的js脚本 在iconfont批量添加图标 https://www.iconfont.cn/collections 或者 抖音获取喜欢的列表 获取所有的cookie","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/snippets/awesome-js-console.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"一些在控制台好用的js脚本"}],["meta",{"property":"og:description","content":"一些在控制台好用的js脚本 在iconfont批量添加图标 https://www.iconfont.cn/collections 或者 抖音获取喜欢的列表 获取所有的cookie"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"一些在控制台好用的js脚本\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"在iconfont批量添加图标","slug":"在iconfont批量添加图标","link":"#在iconfont批量添加图标","children":[]},{"level":2,"title":"抖音获取喜欢的列表","slug":"抖音获取喜欢的列表","link":"#抖音获取喜欢的列表","children":[]},{"level":2,"title":"获取所有的cookie","slug":"获取所有的cookie","link":"#获取所有的cookie","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.56,"words":167},"filePathRelative":"cs-tips/frontend/snippets/awesome-js-console.md","localizedDate":"2023年5月25日","autoDesc":true}');export{d as comp,u as data};
