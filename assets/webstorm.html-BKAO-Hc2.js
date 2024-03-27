import{_ as e,r as o,o as p,c as i,d as n,e as a,b as t,a as l}from"./app-BO2oONDQ.js";const c={},u=n("h1",{id:"webstorm",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#webstorm"},[n("span",null,"webstorm")])],-1),r=n("h2",{id:"关于webtypes",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#关于webtypes"},[n("span",null,"关于webtypes")])],-1),d={href:"https://juejin.cn/post/6954011748277944333",target:"_blank",rel:"noopener noreferrer"},k=n("h3",{id:"webtypes用法",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#webtypes用法"},[n("span",null,"webtypes用法")])],-1),m={href:"https://github.com/JetBrains/web-types/blob/master/examples/",target:"_blank",rel:"noopener noreferrer"},v=l(`<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;$schema&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http://json.schemastore.org/web-types&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;framework&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;js-types-syntax&quot;</span><span class="token operator">:</span> <span class="token string">&quot;typescript&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;VARLET&quot;</span><span class="token punctuation">,</span>

  <span class="token property">&quot;contributions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;html&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;vue-components&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;el-affix&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;symbol&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ElAffix&quot;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Fix the element to a specific visible area.&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;doc-url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://element-plus.org/en-US/component/affix.html#affix&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;props&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
              <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;offset&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;offset distance.&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;doc-url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://element-plus.org/en-US/component/affix.html#affix-attributes&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">&quot;number&quot;</span>
              <span class="token punctuation">]</span><span class="token punctuation">,</span>
              <span class="token property">&quot;default&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
              <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;position&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;position of affix.&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;doc-url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://element-plus.org/en-US/component/affix.html#affix-attributes&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">&quot;&#39;top&#39; | &#39;bottom&#39;&quot;</span>
              <span class="token punctuation">]</span><span class="token punctuation">,</span>
              <span class="token property">&quot;default&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&#39;top&#39;&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
              <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;target&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;target container. (CSS selector)&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;doc-url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://element-plus.org/en-US/component/affix.html#affix-attributes&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">&quot;string&quot;</span>
              <span class="token punctuation">]</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
              <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;z-index&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\`z-index\` of affix&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;doc-url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://element-plus.org/en-US/component/affix.html#affix-attributes&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">&quot;number&quot;</span>
              <span class="token punctuation">]</span><span class="token punctuation">,</span>
              <span class="token property">&quot;default&quot;</span><span class="token operator">:</span> <span class="token string">&quot;100&quot;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token property">&quot;events&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
              <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;change&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;triggers when fixed state changed.&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;doc-url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://element-plus.org/en-US/component/affix.html#affix-events&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
              <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;scroll&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;triggers when scrolling.&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;doc-url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://element-plus.org/en-US/component/affix.html#affix-events&quot;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token property">&quot;slots&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
              <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;default&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;customize default content.&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;doc-url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://element-plus.org/en-US/component/affix.html#affix-slots&quot;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function q(b,y){const s=o("ExternalLinkIcon");return p(),i("div",null,[u,r,n("p",null,[n("a",d,[a("https://juejin.cn/post/6954011748277944333"),t(s)])]),k,n("p",null,[n("a",m,[a("https://github.com/JetBrains/web-types/blob/master/examples/"),t(s)])]),v])}const h=e(c,[["render",q],["__file","webstorm.html.vue"]]),f=JSON.parse('{"path":"/cs-tips/tool/webstorm.html","title":"webstorm","lang":"zh-CN","frontmatter":{"description":"webstorm 关于webtypes https://juejin.cn/post/6954011748277944333 webtypes用法 https://github.com/JetBrains/web-types/blob/master/examples/","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/tool/webstorm.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"webstorm"}],["meta",{"property":"og:description","content":"webstorm 关于webtypes https://juejin.cn/post/6954011748277944333 webtypes用法 https://github.com/JetBrains/web-types/blob/master/examples/"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"webstorm\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"关于webtypes","slug":"关于webtypes","link":"#关于webtypes","children":[{"level":3,"title":"webtypes用法","slug":"webtypes用法","link":"#webtypes用法","children":[]}]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.58,"words":173},"filePathRelative":"cs-tips/tool/webstorm.md","localizedDate":"2023年5月25日","autoDesc":true}');export{h as comp,f as data};
