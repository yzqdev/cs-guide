import{_ as e,c as t,o as n,d as o}from"./app-CbULZrmi.js";const s={},r=o(`<h1 id="vue2使用svgicon" tabindex="-1"><a class="header-anchor" href="#vue2使用svgicon"><span>vue2使用svgicon</span></a></h1><p>随着技术的进步,svg和iconfont成了前端图标的趋势,如何在vue中使用svgicon呢,这篇文章告诉你</p><ol><li>配置svg-sprite-loader 在<code>vue.config.js</code>中写入以下内容</li></ol><pre><code class="language-javascript">chainWebpack: (config) =&gt; {
    const svgRule = config.module.rule(&quot;svg&quot;);
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();
    svgRule
      .test(/\\.svg$/)
      .include.add(path.resolve(__dirname, &quot;./src/icons&quot;))
      .end()
      .use(&quot;svg-sprite-loader&quot;)
      .loader(&quot;svg-sprite-loader&quot;)
      .options({
        symbolId: &quot;icon-[name]&quot;,
      });
    const fileRule = config.module.rule(&quot;file&quot;);
    fileRule.uses.clear();//这里不使用fileloader防止被多个loader处理
    fileRule
      .test(/\\.svg$/)
      .exclude.add(path.resolve(__dirname, &quot;./src/icons&quot;))
      .end()
      .use(&quot;file-loader&quot;)
      .loader(&quot;file-loader&quot;);
  },
</code></pre><ol start="2"><li>首先要写一个svg通用组件,通过图标的id来引用图标 <em>代码如下</em></li></ol><pre><code class="language-html">&lt;template&gt;
  &lt;svg :class=&quot;svgClass&quot; aria-hidden=&quot;true&quot;&gt;
    &lt;use :xlink:href=&quot;iconName&quot;&gt;&lt;/use&gt;
  &lt;/svg&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name: &quot;icon-svg&quot;,
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: &quot;&quot;,
    },
  },
  computed: {
    iconName() {
      return \`#icon-\${this.iconClass}\`;
    },
    svgClass() {
      if (this.className) {
        return &quot;svg-icon &quot; + this.className;
      } else {
        return &quot;svg-icon&quot;;
      }
    },
  },
};
&lt;/script&gt;

&lt;style&gt;
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
&lt;/style&gt;
</code></pre><p>这里需要注意,className是svg的样式,iconName是icon的文件名(需要您自己配置) 3. 引入svg图标 在main.js里面引入您的svg图标,比如我的图标在src下的icons目录</p><pre><code class="language-javascript">// requires and returns all modules that match
const requireAll = requireContext =&gt; requireContext.keys().map(requireContext);
const req = require.context(&#39;./icons&#39;, true, /\\.svg$/);
requireAll(req);
//引入svg组件
import IconSvg from &#39;@/components/IconSvg&#39;
//全局注册icon-svg
Vue.component(&#39;icon-svg&#39;, IconSvg)
</code></pre>`,8),i=[r];function c(a,l){return n(),t("div",null,i)}const g=e(s,[["render",c],["__file","vue2-svgicon.html.vue"]]),d=JSON.parse('{"path":"/frontend/framework/vue/vue2-svgicon.html","title":"vue2使用svgicon","lang":"zh-CN","frontmatter":{"description":"vue2使用svgicon 随着技术的进步,svg和iconfont成了前端图标的趋势,如何在vue中使用svgicon呢,这篇文章告诉你 配置svg-sprite-loader 在vue.config.js中写入以下内容 首先要写一个svg通用组件,通过图标的id来引用图标 代码如下 这里需要注意,className是svg的样式,iconName是...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/vue/vue2-svgicon.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"vue2使用svgicon"}],["meta",{"property":"og:description","content":"vue2使用svgicon 随着技术的进步,svg和iconfont成了前端图标的趋势,如何在vue中使用svgicon呢,这篇文章告诉你 配置svg-sprite-loader 在vue.config.js中写入以下内容 首先要写一个svg通用组件,通过图标的id来引用图标 代码如下 这里需要注意,className是svg的样式,iconName是..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vue2使用svgicon\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1647861419000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.16,"words":349},"filePathRelative":"frontend/framework/vue/vue2-svgicon.md","localizedDate":"2022年3月21日","autoDesc":true}');export{g as comp,d as data};
