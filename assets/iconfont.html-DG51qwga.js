import{_ as n,r as o,c,b as i,d as a,a as t,o as r}from"./app-CbULZrmi.js";const p="/cs-guide/assets/image-D9JfzkM0.png",s={},l=a('<h1 id="iconfont-使用" tabindex="-1"><a class="header-anchor" href="#iconfont-使用"><span>iconfont 使用</span></a></h1><p>在iconfont网站建好自己的项目,配置好前缀<br><img src="'+p+`" alt="image.png"> 把生成的链接引入index.html</p><p>然后写一个<code>Econ.vue</code>文件,</p><pre><code class="language-vue">&lt;template&gt;
  &lt;i
    class=&quot;iconfont&quot;
    :class=&quot;\`\${prefix}-\${name}\`&quot;
    :style=&quot;{ color: color, fontSize: size }&quot;
  &gt;&lt;/i&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  props: {
    name: {
      type: String,
      require: true,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
      default: &quot;20px&quot;,
    },
    prefix: {
      type: String,
      default: &quot;icon&quot;,
    },
  },
};
&lt;/script&gt;
</code></pre><p>然后就可以使用 <code>&lt;icon name=&#39;图标名称&#39; &gt;&lt;/icon&gt;</code>来调用了</p><p>演示如下</p>`,6),d=t("pre",null,[t("code",{class:"language-vue"},`<econ name='python' size='25px' />
`)],-1);function m(u,g){const e=o("econ");return r(),c("div",null,[l,i(e,{name:"python",size:"25px"}),d])}const h=n(s,[["render",m],["__file","iconfont.html.vue"]]),y=JSON.parse(`{"path":"/frontend/framework/vue/iconfont.html","title":"iconfont 使用","lang":"zh-CN","frontmatter":{"description":"iconfont 使用 在iconfont网站建好自己的项目,配置好前缀 image.png 把生成的链接引入index.html 然后写一个Econ.vue文件, 然后就可以使用 <icon name='图标名称' ></icon>来调用了 演示如下","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/vue/iconfont.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"iconfont 使用"}],["meta",{"property":"og:description","content":"iconfont 使用 在iconfont网站建好自己的项目,配置好前缀 image.png 把生成的链接引入index.html 然后写一个Econ.vue文件, 然后就可以使用 <icon name='图标名称' ></icon>来调用了 演示如下"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-15T12:35:10.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-10-15T12:35:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"iconfont 使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-10-15T12:35:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1647861419000,"updatedTime":1697373310000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":0.25,"words":76},"filePathRelative":"frontend/framework/vue/iconfont.md","localizedDate":"2022年3月21日","autoDesc":true}`);export{h as comp,y as data};
