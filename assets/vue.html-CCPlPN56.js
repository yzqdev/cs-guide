import{_ as e,c as t,o as a,d as n}from"./app-CbULZrmi.js";const o={},r=n(`<h1 id="vue用法" tabindex="-1"><a class="header-anchor" href="#vue用法"><span>vue用法</span></a></h1><h2 id="echarts点击legend报错" tabindex="-1"><a class="header-anchor" href="#echarts点击legend报错"><span>echarts点击legend报错</span></a></h2><p>分析问题：这个问题是在切换series或者resize时报错的，vue3中使用proxy的方式监听响应式，this.chart会被在vue内部转换成响应式对象，从而在resize 的时候获取不到。</p><pre><code>有些值不应该是响应式的，例如复杂的第三方类实例或 Vue 组件对象。
当渲染具有不可变数据源的大列表时，跳过 proxy 转换可以提高性能。
所以在实例化echart时，将其指定为非响应式的即可。
</code></pre><p>解决问题：这里我们可以使用vue3的新API,markRaw，它可以标记一个对象，使其永远不会转换为 proxy，返回对象本身，其实就是将它转换成非响应式数据。现在可以正常点击legend组件也不会报错啦。</p><pre><code>myCharts.value = markRaw(echarts.init(myha.value!));
</code></pre><h2 id="重置reactive" tabindex="-1"><a class="header-anchor" href="#重置reactive"><span>重置reactive</span></a></h2><h3 id="定义重置方法" tabindex="-1"><a class="header-anchor" href="#定义重置方法"><span>定义重置方法</span></a></h3><pre><code class="language-ts">const resetData = () =&gt; {
  const keys = Object.keys(dialogModel)
  let obj: { [name: string]: string } = {}
  keys.forEach((item) =&gt; {
    obj[item] = &quot;&quot;
  })
  Object.assign(dialogModel, obj)
};
</code></pre><pre><code class="language-ts">const initData:AddDeptModel = {
    type: &quot;&quot;,
    id: &quot;&quot;,
    pid: &quot;&quot;,
    parentName: &quot;&quot;,
    manager: &quot;&quot;,
    deptAddress: &quot;&quot;,
    deptPhone: &quot;&quot;,
    name: &quot;&quot;,
    deptCode: &quot;&quot;,
    orderNum: &quot;&quot;,
  }
const dialogModel = reactive&lt;{data:AddDeptModel}&gt;({data:{...initData}});

// 初始化方法
const resetDialogModel = () =&gt;{
    dialogModel.data = {...initData}
}
</code></pre><p>或者</p><pre><code class="language-ts">const initialState = {
  name: &quot;&quot;,
  lastName: &quot;&quot;,
  email: &quot;&quot;
};

const form = reactive({ ...initialState });

function resetForm() {
  Object.assign(form, initialState);
}
</code></pre>`,12),i=[r];function s(c,d){return a(),t("div",null,i)}const p=e(o,[["render",s],["__file","vue.html.vue"]]),u=JSON.parse('{"path":"/cs-tips/frontend/framework/vue.html","title":"vue用法","lang":"zh-CN","frontmatter":{"description":"vue用法 echarts点击legend报错 分析问题：这个问题是在切换series或者resize时报错的，vue3中使用proxy的方式监听响应式，this.chart会被在vue内部转换成响应式对象，从而在resize 的时候获取不到。 解决问题：这里我们可以使用vue3的新API,markRaw，它可以标记一个对象，使其永远不会转换为 pro...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/framework/vue.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"vue用法"}],["meta",{"property":"og:description","content":"vue用法 echarts点击legend报错 分析问题：这个问题是在切换series或者resize时报错的，vue3中使用proxy的方式监听响应式，this.chart会被在vue内部转换成响应式对象，从而在resize 的时候获取不到。 解决问题：这里我们可以使用vue3的新API,markRaw，它可以标记一个对象，使其永远不会转换为 pro..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vue用法\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"echarts点击legend报错","slug":"echarts点击legend报错","link":"#echarts点击legend报错","children":[]},{"level":2,"title":"重置reactive","slug":"重置reactive","link":"#重置reactive","children":[{"level":3,"title":"定义重置方法","slug":"定义重置方法","link":"#定义重置方法","children":[]}]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.99,"words":297},"filePathRelative":"cs-tips/frontend/framework/vue.md","localizedDate":"2023年5月25日","autoDesc":true}');export{p as comp,u as data};
