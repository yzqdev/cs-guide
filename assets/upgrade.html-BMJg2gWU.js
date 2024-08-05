import{_ as e,c as t,o,d as r}from"./app-CbULZrmi.js";const n={},a=r(`<h1 id="react升级" tabindex="-1"><a class="header-anchor" href="#react升级"><span>react升级</span></a></h1><p><a href="https://www.cnblogs.com/crazycode2/p/10340183.html" target="_blank" rel="noopener noreferrer">react 生命周期 componentWillReceiveProps(nextProps) 的替代方法</a> 例如:</p><pre><code class="language-js">componentWillReceiveProps(nextProps) {
  if (this.props.editInfo.id !== nextProps.editInfo.id) {
    // 请求详情数据
    this.props.getDetail({
      id: nextProps.editInfo.id
    })
  }
}
</code></pre><p>可以写成;</p><pre><code class="language-js">static getDerivedStateFromProps(props, state) {
  if (props.editInfo.id !== state.editInfo.id) {
    return {
      editInfo: props.editInfo
    };
  }
  
  return null;
}



componentDidUpdate(prevProps, prevState) {
  if (this.state.editInfo.id !== prevState.editInfo.id) {
    // 请求详情数据
    this.props.getDetail({
      id: this.state.editInfo.id
    })
  }
}
</code></pre><p>react18</p><pre><code class="language-js">// Before
import { render } from &#39;react-dom&#39;;
const container = document.getElementById(&#39;app&#39;);
render(&lt;App tab=&quot;home&quot; /&gt;, container);

// After
import { createRoot } from &#39;react-dom/client&#39;;
const container = document.getElementById(&#39;app&#39;);
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(&lt;App tab=&quot;home&quot; /&gt;);
</code></pre>`,7),c=[a];function p(i,d){return o(),t("div",null,c)}const m=e(n,[["render",p],["__file","upgrade.html.vue"]]),l=JSON.parse('{"path":"/frontend/framework/react/upgrade.html","title":"react升级","lang":"zh-CN","frontmatter":{"description":"react升级 react 生命周期 componentWillReceiveProps(nextProps) 的替代方法 例如: 可以写成; react18","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/react/upgrade.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"react升级"}],["meta",{"property":"og:description","content":"react升级 react 生命周期 componentWillReceiveProps(nextProps) 的替代方法 例如: 可以写成; react18"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"react升级\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1647861419000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.38,"words":114},"filePathRelative":"frontend/framework/react/upgrade.md","localizedDate":"2022年3月21日","autoDesc":true}');export{m as comp,l as data};
