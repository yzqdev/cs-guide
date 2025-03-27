import{_ as s,c as a,a as p,o as t}from"./app-C8DxhDIZ.js";const e={};function o(c,n){return t(),a("div",null,n[0]||(n[0]=[p(`<h1 id="替换if" tabindex="-1"><a class="header-anchor" href="#替换if"><span>替换if</span></a></h1><h2 id="使用-array-的-includes-方法" tabindex="-1"><a class="header-anchor" href="#使用-array-的-includes-方法"><span>使用 <code>Array</code> 的 <code>includes</code> 方法</span></a></h2><blockquote><p>场景：多种条件对应相同的处理 修改前：</p></blockquote><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">region</span><span class="token punctuation">(</span><span class="token parameter">province</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span></span>
<span class="line"> <span class="token keyword">if</span> <span class="token punctuation">(</span></span>
<span class="line">   province <span class="token operator">===</span> <span class="token string">&#39;广东&#39;</span> <span class="token operator">||</span></span>
<span class="line">   province <span class="token operator">===</span> <span class="token string">&#39;广西&#39;</span> <span class="token operator">||</span></span>
<span class="line">   province <span class="token operator">===</span> <span class="token string">&#39;福建&#39;</span> <span class="token operator">||</span></span>
<span class="line">   province <span class="token operator">===</span> <span class="token string">&#39;浙江&#39;</span> <span class="token operator">||</span></span>
<span class="line">   province <span class="token operator">===</span> <span class="token string">&#39;云南&#39;</span></span>
<span class="line"> <span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   result <span class="token operator">=</span> <span class="token string">&#39;南方&#39;</span><span class="token punctuation">;</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"> <span class="token keyword">if</span> <span class="token punctuation">(</span></span>
<span class="line">   province <span class="token operator">===</span> <span class="token string">&#39;河北&#39;</span> <span class="token operator">||</span></span>
<span class="line">   province <span class="token operator">===</span> <span class="token string">&#39;黑龙江&#39;</span> <span class="token operator">||</span></span>
<span class="line">   province <span class="token operator">===</span> <span class="token string">&#39;辽宁&#39;</span> <span class="token operator">||</span></span>
<span class="line">   province <span class="token operator">===</span> <span class="token string">&#39;山东&#39;</span> <span class="token operator">||</span></span>
<span class="line">   province <span class="token operator">===</span> <span class="token string">&#39;吉林&#39;</span></span>
<span class="line"> <span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">   result <span class="token operator">=</span> <span class="token string">&#39;北方&#39;</span><span class="token punctuation">;</span></span>
<span class="line"> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">   </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的场景中，我们通过在 <code>if</code> 语句中使用 <code>||</code> 对多种条件进行相同的处理，显而易见，这样的代码很糟糕（尤其是 <code>province === &quot;广东&quot;|| province === &quot;广西&quot;|| province === &quot;福建&quot; || province === &quot;浙江&quot; || province === &quot;云南</code>这一大串） 这种场景我们其实可以通过 <code>Array</code> 的 <code>includes</code> 方法来规避。</p><p>修改后：</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">region</span><span class="token punctuation">(</span><span class="token parameter">province</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span></span>
<span class="line"> <span class="token keyword">let</span> northProvinceArr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;河北&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;黑龙江&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;辽宁&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;山东&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;吉林&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"> <span class="token keyword">let</span> southProvinceArr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;广东&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;广西&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;福建&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;浙江&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;云南&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"> <span class="token keyword">if</span> <span class="token punctuation">(</span>southProvinceArr<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>province<span class="token punctuation">)</span><span class="token punctuation">)</span> result <span class="token operator">=</span> <span class="token string">&#39;南方&#39;</span><span class="token punctuation">;</span></span>
<span class="line"> <span class="token keyword">if</span> <span class="token punctuation">(</span>northProvinceArr<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>province<span class="token punctuation">)</span><span class="token punctuation">)</span> result <span class="token operator">=</span> <span class="token string">&#39;北方&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>通过这样的处理，我们的最终代码变得好看了许多。</p><h2 id="策略模式" tabindex="-1"><a class="header-anchor" href="#策略模式"><span>策略模式</span></a></h2><blockquote><p>场景：并列的多条件判断 修改前：</p></blockquote><div class="language-javascript" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">permission</span><span class="token punctuation">(</span><span class="token parameter">role</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>role <span class="token operator">===</span> <span class="token string">&#39;operations&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">getOperationPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>role <span class="token operator">===</span> <span class="token string">&#39;admin&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">getAdminPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>role <span class="token operator">===</span> <span class="token string">&#39;superAdmin&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">getSuperAdminPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>role <span class="token operator">===</span> <span class="token string">&#39;user&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">getUserPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>这段代码中我们就是采用 <code>if-else</code> 的方式判断多个不同的条件，不过这种多条件的判断你可能会采用 <code>switch</code> 语句：</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">permission</span><span class="token punctuation">(</span><span class="token parameter">role</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">switch</span> <span class="token punctuation">(</span>role<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">&#39;operations&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">getOperationPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">break</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">&#39;admin&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">getAdminPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">break</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">&#39;superAdmin&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">getSuperAdminPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">break</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">&#39;user&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">getUserPermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token keyword">break</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span> </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种写法虽然使代码清晰了许多，但是个人觉得依旧不合格，接下来我们看看采用策略模式后的结果。</p><p>修改后：</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">permission</span><span class="token punctuation">(</span><span class="token parameter">role</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">operations</span><span class="token operator">:</span> getOperationPermission<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">admin</span><span class="token operator">:</span> getAdminPermission<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">superAdmin</span><span class="token operator">:</span> getSuperAdminPermission<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">user</span><span class="token operator">:</span> getUserPermission<span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  actions<span class="token punctuation">[</span>role<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"> </span>
<span class="line"></span></code></pre></div><p>比起前面两种写法，显然采用策略模式要更加优雅。</p><h2 id="对象数组" tabindex="-1"><a class="header-anchor" href="#对象数组"><span>对象数组</span></a></h2><blockquote><p>场景：多条件嵌套多分支判断 当我们遇到需要进行多个条件判断，同时每个条件内又需要判断多个子条件时，代码处理起来是最棘手的。一旦处理不好，代码就会变得无比糟糕。</p></blockquote><p>修改前：</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">getAmount</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> quantity<span class="token punctuation">,</span> price</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token string">&#39;shoe&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>quantity <span class="token operator">&gt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      result <span class="token operator">=</span> price <span class="token operator">*</span> quantity <span class="token operator">*</span> <span class="token number">0.7</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">      result <span class="token operator">=</span> price <span class="token operator">*</span> quantity <span class="token operator">*</span> <span class="token number">0.8</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>quantity <span class="token operator">&gt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      result <span class="token operator">=</span> price <span class="token operator">*</span> quantity <span class="token operator">*</span> <span class="token number">0.9</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">      result <span class="token operator">=</span> price <span class="token operator">*</span> quantity <span class="token operator">*</span> <span class="token number">0.95</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再来一个简单的例子</p><h3 id="使用对象" tabindex="-1"><a class="header-anchor" href="#使用对象"><span>使用对象</span></a></h3><div class="language-javascript" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">let</span> type <span class="token operator">=</span> <span class="token string">&#39;A&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">let</span> tactics <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token string-property property">&#39;A&#39;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">&#39;B&#39;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">&#39;C&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">&#39;D&#39;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token keyword">default</span><span class="token operator">:</span> <span class="token number">0</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>tactics<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 1</span></span>
<span class="line"></span></code></pre></div><h3 id="使用map" tabindex="-1"><a class="header-anchor" href="#使用map"><span>使用map</span></a></h3><div class="language-typescript" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre><code><span class="line"><span class="token comment">// 获取折扣 -- 使用对象配置/策略模式</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">getDiscount</span> <span class="token operator">=</span> <span class="token punctuation">(</span>userKey<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 我们可以根据用户类型来生成我们的折扣对象</span></span>
<span class="line">    <span class="token keyword">let</span> discounts <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">[</span></span>
<span class="line">        <span class="token punctuation">[</span><span class="token string">&#39;普通会员&#39;</span><span class="token punctuation">,</span> <span class="token number">0.9</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">[</span><span class="token string">&#39;年费会员&#39;</span><span class="token punctuation">,</span> <span class="token number">0.85</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">[</span><span class="token string">&#39;超级会员&#39;</span><span class="token punctuation">,</span> <span class="token number">0.8</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">[</span><span class="token string">&#39;default&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> discounts<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>userKey<span class="token punctuation">)</span> <span class="token operator">||</span> discounts<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;default&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">getDiscount</span><span class="token punctuation">(</span><span class="token string">&#39;普通会员&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 0.9</span></span>
<span class="line"></span></code></pre></div><p>当遇到这种情况时，采用对象数组的方式能够得到较好的优化效果。</p><p>修改后：</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">getAmount</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> quantity<span class="token punctuation">,</span> price</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">const</span> isShoe <span class="token operator">=</span> type <span class="token operator">===</span> <span class="token string">&#39;shoe&#39;</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">const</span> greater <span class="token operator">=</span> quantity <span class="token operator">&gt;</span> <span class="token number">5</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">const</span> discountArr <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span> <span class="token literal-property property">isShoe</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">greater</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">amount</span><span class="token operator">:</span> <span class="token number">0.7</span> <span class="token operator">*</span> quantity <span class="token operator">*</span> price <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span> <span class="token literal-property property">isShoe</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">greater</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token literal-property property">amount</span><span class="token operator">:</span> <span class="token number">0.8</span> <span class="token operator">*</span> quantity <span class="token operator">*</span> price <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span> <span class="token literal-property property">isShoe</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token literal-property property">greater</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">amount</span><span class="token operator">:</span> <span class="token number">0.9</span> <span class="token operator">*</span> quantity <span class="token operator">*</span> price <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span> <span class="token literal-property property">isShoe</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token literal-property property">greater</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token literal-property property">amount</span><span class="token operator">:</span> <span class="token number">0.95</span> <span class="token operator">*</span> quantity <span class="token operator">*</span> price <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">  result <span class="token operator">=</span> discountArr<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span></span>
<span class="line">    <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>isShoe <span class="token operator">===</span> isShoe <span class="token operator">&amp;&amp;</span> item<span class="token punctuation">.</span>greater <span class="token operator">===</span> greater</span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>amount<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h2 id="三元表达式" tabindex="-1"><a class="header-anchor" href="#三元表达式"><span>三元表达式</span></a></h2><p>在这里也顺便提一下三元表达式，在某些情境下，使用三元表达式实现条件判断会是个不错的选择，它可以让代码更加简洁（虽然在我看来，它跟 <code>if-else</code> 本质上没太大区别）。</p><p>修改前：</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">    <span class="token keyword">if</span><span class="token punctuation">(</span>a<span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        a<span class="token operator">+=</span><span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span></span>
<span class="line">        a<span class="token operator">-=</span><span class="token number">1</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>修改后：</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">  a<span class="token operator">&gt;</span><span class="token number">0</span><span class="token operator">?</span> a<span class="token operator">+=</span><span class="token number">1</span> <span class="token operator">:</span> a<span class="token operator">-=</span><span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><p>不过，太多复杂的条件判断时，使用三元表达式则会适得其反。</p>`,36)]))}const i=s(e,[["render",o]]),r=JSON.parse('{"path":"/cs-tips/frontend/typescript/replace-if.html","title":"替换if","lang":"zh-CN","frontmatter":{"description":"替换if 使用 Array 的 includes 方法 场景：多种条件对应相同的处理 修改前： 在上面的场景中，我们通过在 if 语句中使用 || 对多种条件进行相同的处理，显而易见，这样的代码很糟糕（尤其是 province === \\"广东\\"|| province === \\"广西\\"|| province === \\"福建\\" || province ==...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/typescript/replace-if.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"替换if"}],["meta",{"property":"og:description","content":"替换if 使用 Array 的 includes 方法 场景：多种条件对应相同的处理 修改前： 在上面的场景中，我们通过在 if 语句中使用 || 对多种条件进行相同的处理，显而易见，这样的代码很糟糕（尤其是 province === \\"广东\\"|| province === \\"广西\\"|| province === \\"福建\\" || province ==..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"替换if\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"使用 Array 的 includes 方法","slug":"使用-array-的-includes-方法","link":"#使用-array-的-includes-方法","children":[]},{"level":2,"title":"策略模式","slug":"策略模式","link":"#策略模式","children":[]},{"level":2,"title":"对象数组","slug":"对象数组","link":"#对象数组","children":[{"level":3,"title":"使用对象","slug":"使用对象","link":"#使用对象","children":[]},{"level":3,"title":"使用map","slug":"使用map","link":"#使用map","children":[]}]},{"level":2,"title":"三元表达式","slug":"三元表达式","link":"#三元表达式","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.84,"words":851},"filePathRelative":"cs-tips/frontend/typescript/replace-if.md","localizedDate":"2023年5月25日","autoDesc":true}');export{i as comp,r as data};
