import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/cpp-tutor/26-namespaces.html","title":"26 - 命名空间","lang":"zh-CN","frontmatter":{"order":27,"description":"26 - 命名空间 基本用法 嵌套命名空间 using 声明 命名空间别名 匿名命名空间 ADL（参数依赖查找） 头文件中的命名空间 下一步:","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"26 - 命名空间\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/cpp-tutor/26-namespaces.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"26 - 命名空间"}],["meta",{"property":"og:description","content":"26 - 命名空间 基本用法 嵌套命名空间 using 声明 命名空间别名 匿名命名空间 ADL（参数依赖查找） 头文件中的命名空间 下一步:"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1,"words":299},"filePathRelative":"windows-tutor/cpp-tutor/26-namespaces.md","autoDesc":true}`),u={name:`26-namespaces.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_26-命名空间" tabindex="-1"><a class="header-anchor" href="#_26-命名空间"><span>26 - 命名空间</span></a></h1><h2 id="基本用法" tabindex="-1"><a class="header-anchor" href="#基本用法"><span>基本用法</span></a></h2><div class="language-cpp" data-highlighter="prismjs" data-ext="cpp"><pre><code class="language-cpp"><span class="line"><span class="token keyword">namespace</span> MyLib <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">class</span> <span class="token class-name">Widget</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span><span class="token operator">:</span></span>
<span class="line">        <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">int</span> <span class="token function">helper</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token number">42</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 使用</span></span>
<span class="line">MyLib<span class="token double-colon punctuation">::</span>Widget w<span class="token punctuation">;</span></span>
<span class="line"><span class="token class-name">MyLib</span><span class="token double-colon punctuation">::</span><span class="token function">helper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h2 id="嵌套命名空间" tabindex="-1"><a class="header-anchor" href="#嵌套命名空间"><span>嵌套命名空间</span></a></h2><div class="language-cpp" data-highlighter="prismjs" data-ext="cpp"><pre><code class="language-cpp"><span class="line"><span class="token keyword">namespace</span> Company <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">namespace</span> Project <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">namespace</span> Module <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">class</span> <span class="token class-name">Service</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// C++17 简写</span></span>
<span class="line"><span class="token keyword">namespace</span> Company<span class="token double-colon punctuation">::</span>Project<span class="token double-colon punctuation">::</span>Module <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">class</span> <span class="token class-name">Service</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h2 id="using-声明" tabindex="-1"><a class="header-anchor" href="#using-声明"><span>using 声明</span></a></h2><div class="language-cpp" data-highlighter="prismjs" data-ext="cpp"><pre><code class="language-cpp"><span class="line"><span class="token keyword">namespace</span> A <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">int</span> value<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// using声明：只引入特定名字</span></span>
<span class="line"><span class="token keyword">using</span> A<span class="token double-colon punctuation">::</span>func<span class="token punctuation">;</span></span>
<span class="line"><span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// OK</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// using指令：引入整个命名空间（避免在头文件中使用）</span></span>
<span class="line"><span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span></span>
<span class="line">cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;hello&quot;</span><span class="token punctuation">;</span>  <span class="token comment">// OK</span></span>
<span class="line"></span></code></pre></div><h2 id="命名空间别名" tabindex="-1"><a class="header-anchor" href="#命名空间别名"><span>命名空间别名</span></a></h2><div class="language-cpp line-numbers-mode" data-highlighter="prismjs" data-ext="cpp"><pre><code class="language-cpp"><span class="line"><span class="token keyword">namespace</span> VeryLongNamespaceName <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">class</span> <span class="token class-name">Widget</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 别名</span></span>
<span class="line"><span class="token keyword">namespace</span> VLN <span class="token operator">=</span> VeryLongNamespaceName<span class="token punctuation">;</span></span>
<span class="line">VLN<span class="token double-colon punctuation">::</span>Widget w<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// C++17 内联命名空间</span></span>
<span class="line"><span class="token keyword">namespace</span> Library <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">inline</span> <span class="token keyword">namespace</span> V2 <span class="token punctuation">{</span>  <span class="token comment">// 默认使用V2</span></span>
<span class="line">        <span class="token keyword">class</span> <span class="token class-name">Widget</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">namespace</span> V1 <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">class</span> <span class="token class-name">OldWidget</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">Library<span class="token double-colon punctuation">::</span>Widget w<span class="token punctuation">;</span>  <span class="token comment">// 使用V2</span></span>
<span class="line">Library<span class="token double-colon punctuation">::</span>V1<span class="token double-colon punctuation">::</span>OldWidget ow<span class="token punctuation">;</span>  <span class="token comment">// 显式使用V1</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="匿名命名空间" tabindex="-1"><a class="header-anchor" href="#匿名命名空间"><span>匿名命名空间</span></a></h2><div class="language-cpp" data-highlighter="prismjs" data-ext="cpp"><pre><code class="language-cpp"><span class="line"><span class="token keyword">namespace</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 只在本文件内可见（内部链接）</span></span>
<span class="line">    <span class="token keyword">int</span> <span class="token function">internalHelper</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token number">42</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">static</span> <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 等价于</span></span>
<span class="line"><span class="token comment">// static int internalHelper() { return 42; }</span></span>
<span class="line"></span></code></pre></div><h2 id="adl-参数依赖查找" tabindex="-1"><a class="header-anchor" href="#adl-参数依赖查找"><span>ADL（参数依赖查找）</span></a></h2><div class="language-cpp" data-highlighter="prismjs" data-ext="cpp"><pre><code class="language-cpp"><span class="line"><span class="token keyword">namespace</span> N <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">struct</span> <span class="token class-name">X</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span>X x<span class="token punctuation">)</span> <span class="token punctuation">{</span> std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;N::func\\n&quot;</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">N<span class="token double-colon punctuation">::</span>X x<span class="token punctuation">;</span></span>
<span class="line"><span class="token function">func</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 通过ADL找到N::func（不需要using）</span></span>
<span class="line"></span></code></pre></div><h2 id="头文件中的命名空间" tabindex="-1"><a class="header-anchor" href="#头文件中的命名空间"><span>头文件中的命名空间</span></a></h2><div class="language-cpp line-numbers-mode" data-highlighter="prismjs" data-ext="cpp"><pre><code class="language-cpp"><span class="line"><span class="token comment">// mylib.h</span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">pragma</span> <span class="token expression">once</span></span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">namespace</span> MyLib <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">class</span> <span class="token class-name">Widget</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span><span class="token operator">:</span></span>
<span class="line">        <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// mylib.cpp</span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;mylib.h&quot;</span></span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">namespace</span> MyLib <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">void</span> <span class="token class-name">Widget</span><span class="token double-colon punctuation">::</span><span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 实现</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>`,16),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/cpp-tutor/27-Lambda%E8%A1%A8%E8%BE%BE%E5%BC%8F.html`},{default:r(()=>[...l[0]||=[e(`27-Lambda表达式`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};