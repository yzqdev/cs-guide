import{_ as t,c as e,o,d as a}from"./app-CbULZrmi.js";const n={},r=a(`<h1 id="基本操作" tabindex="-1"><a class="header-anchor" href="#基本操作"><span>基本操作</span></a></h1><p><a href="https://www.mongodb.com/docs/manual/tutorial/insert-documents/" target="_blank" rel="noopener noreferrer">https://www.mongodb.com/docs/manual/tutorial/insert-documents/</a></p><h2 id="添加数据库" tabindex="-1"><a class="header-anchor" href="#添加数据库"><span>添加数据库</span></a></h2><pre><code class="language-shell">use myblog
</code></pre><h2 id="添加数据" tabindex="-1"><a class="header-anchor" href="#添加数据"><span>添加数据</span></a></h2><pre><code class="language-shell">db.postCollection.insertOne({
  &quot;title&quot;:&quot;mongodb tutor&quot;,
  &quot;author&quot;:{
    &quot;name&quot;:&quot;yzq&quot;,
    &quot;avatar&quot;:&quot;http://www.baidu.com&quot;
  },&quot;createdAt&quot;:&quot;2022-01-01&quot;,
  &quot;content&quot;:&quot;mongo 教程&quot;,
  &quot;comments&quot;:[
    {
      &quot;user&quot;:&quot;dog&quot;,
      &quot;comment&quot;:&quot;good&quot;
    },
     {
       &quot;user&quot;: &quot;cat&quot;,
       &quot;comment&quot;: &quot;bad&quot;
     }
  ]
}
)
</code></pre><h2 id="查询数据" tabindex="-1"><a class="header-anchor" href="#查询数据"><span>查询数据</span></a></h2><pre><code class="language-shell"># 查询所有的
db.postCollection.find({})
# 查询author.name=yzq的
db.postCollection.find({&quot;author.name&quot;:&quot;yzq&quot;})
</code></pre><h2 id="更新" tabindex="-1"><a class="header-anchor" href="#更新"><span>更新</span></a></h2><pre><code class="language-shell">db.postCollection.updateOne({&quot;author.name&quot;:&quot;yzq&quot;},{$set:{&quot;author.name&quot;:&quot;qqman&quot;}})
</code></pre><h2 id="删除" tabindex="-1"><a class="header-anchor" href="#删除"><span>删除</span></a></h2><pre><code class="language-shell">db.postCollection.deleteOne({&quot;author.name&quot;:&quot;qqman&quot;})
</code></pre><h2 id="导出数据" tabindex="-1"><a class="header-anchor" href="#导出数据"><span>导出数据</span></a></h2><p>下载mongodb database tools <a href="https://www.mongodb.com/try/download/database-tools" target="_blank" rel="noopener noreferrer">地址</a></p>`,14),s=[r];function l(u,d){return o(),e("div",null,s)}const i=t(n,[["render",l],["__file","basic.html.vue"]]),p=JSON.parse('{"path":"/java-tutor/orm-tutor/mongodb/basic.html","title":"基本操作","lang":"zh-CN","frontmatter":{"description":"基本操作 https://www.mongodb.com/docs/manual/tutorial/insert-documents/ 添加数据库 添加数据 查询数据 更新 删除 导出数据 下载mongodb database tools 地址","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/mongodb/basic.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"基本操作"}],["meta",{"property":"og:description","content":"基本操作 https://www.mongodb.com/docs/manual/tutorial/insert-documents/ 添加数据库 添加数据 查询数据 更新 删除 导出数据 下载mongodb database tools 地址"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-29T06:47:23.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-29T06:47:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"基本操作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-29T06:47:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"添加数据库","slug":"添加数据库","link":"#添加数据库","children":[]},{"level":2,"title":"添加数据","slug":"添加数据","link":"#添加数据","children":[]},{"level":2,"title":"查询数据","slug":"查询数据","link":"#查询数据","children":[]},{"level":2,"title":"更新","slug":"更新","link":"#更新","children":[]},{"level":2,"title":"删除","slug":"删除","link":"#删除","children":[]},{"level":2,"title":"导出数据","slug":"导出数据","link":"#导出数据","children":[]}],"git":{"createdTime":1672632765000,"updatedTime":1711694843000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.32,"words":95},"filePathRelative":"java-tutor/orm-tutor/mongodb/basic.md","localizedDate":"2023年1月2日","autoDesc":true}');export{i as comp,p as data};
