import{_ as n,c as a,a as e,o as l}from"./app-B6vXTniy.js";const i={};function p(c,s){return l(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="编写自己的代码库-javascript常用实例的实现与封装" tabindex="-1"><a class="header-anchor" href="#编写自己的代码库-javascript常用实例的实现与封装"><span>编写自己的代码库（javascript常用实例的实现与封装）</span></a></h1><h2 id="_1-前言" tabindex="-1"><a class="header-anchor" href="#_1-前言"><span>1.前言</span></a></h2><p>大家在开发的时候应该知道，有很多常见的实例操作。比如数组去重，关键词高亮，打乱数组等。这些操作，代码一般不会很多，实现的逻辑也不会很难，下面的代码，我解释就不解释太多了，打上注释，相信大家就会懂了。但是，用的地方会比较，如果项目有哪个地方需要用，如果重复写的话，就是代码沉余，开发效率也不用，复用基本就是复制粘贴！这样是一个很不好的习惯，大家可以考虑一下把一些常见的操作封装成函数，调用的时候，直接调用就好！ 源码都放在github上了，大家想以后以后有什么修改或者增加的，欢迎大家来star一下<a href="https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FchenhuiYj%2Fec-do" target="_blank" rel="noopener noreferrer">ec-do</a>。</p><blockquote><p>1.下面代码，我放的是es5版本的，如果大家需要看es6版本的，请移步<a href="https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FchenhuiYj%2Fec-do%2Fblob%2Fmaster%2Fsrc%2Fec-do-2.0.0.js" target="_blank" rel="noopener noreferrer">ec-do2.0.0.js</a></p><p>2.想看完整代码的，或者部分实例的demo，建议去github看！</p><p>3.下面的代码，都是封装在ecDo这个对象里面，如果里面有this，除了特别说明的，都是指向ecDo</p></blockquote><h2 id="_2-字符串操作" tabindex="-1"><a class="header-anchor" href="#_2-字符串操作"><span>2.字符串操作</span></a></h2><h3 id="_2-1去除字符串空格" tabindex="-1"><a class="header-anchor" href="#_2-1去除字符串空格"><span>2-1去除字符串空格</span></a></h3><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token comment">//去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格</span></span>
<span class="line"><span class="token comment">//ecDo.trim(&#39;  1235asd&#39;,1)</span></span>
<span class="line"><span class="token comment">//result：1235asd</span></span>
<span class="line"><span class="token comment">//这个方法有原生的方案代替，但是考虑到有时候开发PC站需要兼容IE8，所以就还是继续保留</span></span>
<span class="line"><span class="token function-variable function">trim</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">str<span class="token punctuation">,</span> type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span></span>
<span class="line">            <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token char-set class-name">\\s</span><span class="token quantifier number">+</span></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span></span>
<span class="line">            <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token group punctuation">(</span><span class="token anchor function">^</span><span class="token char-set class-name">\\s</span><span class="token quantifier number">*</span><span class="token group punctuation">)</span><span class="token alternation keyword">|</span><span class="token group punctuation">(</span><span class="token char-set class-name">\\s</span><span class="token quantifier number">*</span><span class="token anchor function">$</span><span class="token group punctuation">)</span></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span></span>
<span class="line">            <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token group punctuation">(</span><span class="token anchor function">^</span><span class="token char-set class-name">\\s</span><span class="token quantifier number">*</span><span class="token group punctuation">)</span></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span></span>
<span class="line">            <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token group punctuation">(</span><span class="token char-set class-name">\\s</span><span class="token quantifier number">*</span><span class="token anchor function">$</span><span class="token group punctuation">)</span></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">default</span><span class="token operator">:</span></span>
<span class="line">            <span class="token keyword">return</span> str<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2字母大小写切换" tabindex="-1"><a class="header-anchor" href="#_2-2字母大小写切换"><span>2-2字母大小写切换</span></a></h3><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token comment">/*type</span>
<span class="line"> 1:首字母大写</span>
<span class="line"> 2：首页母小写</span>
<span class="line"> 3：大小写转换</span>
<span class="line"> 4：全部大写</span>
<span class="line"> 5：全部小写</span>
<span class="line"> * */</span></span>
<span class="line"><span class="token comment">//ecDo.changeCase(&#39;asdasd&#39;,1)</span></span>
<span class="line"><span class="token comment">//result：Asdasd</span></span>
<span class="line"><span class="token function-variable function">changeCase</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">str<span class="token punctuation">,</span> type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">ToggleCase</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">let</span> itemText <span class="token operator">=</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">        str<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span></span>
<span class="line">            <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token anchor function">^</span><span class="token group punctuation">(</span><span class="token char-class"><span class="token char-class-punctuation punctuation">[</span><span class="token range">a<span class="token range-punctuation operator">-</span>z</span><span class="token char-class-punctuation punctuation">]</span></span><span class="token quantifier number">+</span><span class="token group punctuation">)</span></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    itemText <span class="token operator">+=</span> item<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token anchor function">^</span><span class="token group punctuation">(</span><span class="token char-class"><span class="token char-class-punctuation punctuation">[</span><span class="token range">A<span class="token range-punctuation operator">-</span>Z</span><span class="token char-class-punctuation punctuation">]</span></span><span class="token quantifier number">+</span><span class="token group punctuation">)</span></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                    itemText <span class="token operator">+=</span> item<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">                    itemText <span class="token operator">+=</span> item<span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span> itemText<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span></span>
<span class="line">            <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token anchor function">\\b</span><span class="token char-set class-name">\\w</span><span class="token quantifier number">+</span><span class="token anchor function">\\b</span></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">word</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">return</span> word<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> word<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span></span>
<span class="line">            <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token anchor function">\\b</span><span class="token char-set class-name">\\w</span><span class="token quantifier number">+</span><span class="token anchor function">\\b</span></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">word</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">return</span> word<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> word<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token function">ToggleCase</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span></span>
<span class="line">            <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token number">5</span><span class="token operator">:</span></span>
<span class="line">            <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">default</span><span class="token operator">:</span></span>
<span class="line">            <span class="token keyword">return</span> str<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3字符串循环复制" tabindex="-1"><a class="header-anchor" href="#_2-3字符串循环复制"><span>2-3字符串循环复制</span></a></h3><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token comment">//repeatStr(str-&gt;字符串, count-&gt;次数)</span></span>
<span class="line"><span class="token comment">//ecDo.repeatStr(&#39;123&#39;,3)</span></span>
<span class="line"><span class="token comment">//&quot;result：123123123&quot;</span></span>
<span class="line"><span class="token function-variable function">repeatStr</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">str<span class="token punctuation">,</span> count</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> text <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> count<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        text <span class="token operator">+=</span> str<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> text<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_2-4字符串替换" tabindex="-1"><a class="header-anchor" href="#_2-4字符串替换"><span>2-4字符串替换</span></a></h3><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token comment">//ecDo.replaceAll(&#39;这里是上海，中国第三大城市，广东省省会，简称穗，&#39;,&#39;上海&#39;,&#39;广州&#39;)</span></span>
<span class="line"><span class="token comment">//result：&quot;这里是广州，中国第三大城市，广东省省会，简称穗，&quot;</span></span>
<span class="line"><span class="token function-variable function">replaceAll</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">str<span class="token punctuation">,</span> AFindText<span class="token punctuation">,</span> ARepText</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    raRegExp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span>AFindText<span class="token punctuation">,</span> <span class="token string">&quot;g&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>raRegExp<span class="token punctuation">,</span> ARepText<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_2-5替换" tabindex="-1"><a class="header-anchor" href="#_2-5替换"><span>2-5替换*</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//字符替换*</span>
<span class="line">//replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)</span>
<span class="line">//ecDo.replaceStr(&#39;18819322663&#39;,[3,5,3],0)</span>
<span class="line">//result：188*****663</span>
<span class="line">//ecDo.replaceStr(&#39;asdasdasdaa&#39;,[3,5,3],1)</span>
<span class="line">//result：***asdas***</span>
<span class="line">//ecDo.replaceStr(&#39;1asd88465asdwqe3&#39;,[5],0)</span>
<span class="line">//result：*****8465asdwqe3</span>
<span class="line">//ecDo.replaceStr(&#39;1asd88465asdwqe3&#39;,[5],1,&#39;+&#39;)</span>
<span class="line">//result：&quot;1asd88465as+++++&quot;</span>
<span class="line">replaceStr: function (str, regArr, type, ARepText) {</span>
<span class="line">    let regtext = &#39;&#39;,</span>
<span class="line">        Reg = null,</span>
<span class="line">        replaceText = ARepText || &#39;*&#39;;</span>
<span class="line">    //repeatStr是在上面定义过的（字符串循环复制），大家注意哦</span>
<span class="line">    if (regArr.length === 3 &amp;&amp; type === 0) {</span>
<span class="line">        regtext = &#39;(\\\\w{&#39; + regArr[0] + &#39;})\\\\w{&#39; + regArr[1] + &#39;}(\\\\w{&#39; + regArr[2] + &#39;})&#39;</span>
<span class="line">        Reg = new RegExp(regtext);</span>
<span class="line">        let replaceCount = this.repeatStr(replaceText, regArr[1]);</span>
<span class="line">        return str.replace(Reg, &#39;$1&#39; + replaceCount + &#39;$2&#39;)</span>
<span class="line">    }</span>
<span class="line">    else if (regArr.length === 3 &amp;&amp; type === 1) {</span>
<span class="line">        regtext = &#39;\\\\w{&#39; + regArr[0] + &#39;}(\\\\w{&#39; + regArr[1] + &#39;})\\\\w{&#39; + regArr[2] + &#39;}&#39;</span>
<span class="line">        Reg = new RegExp(regtext);</span>
<span class="line">        let replaceCount1 = this.repeatStr(replaceText, regArr[0]);</span>
<span class="line">        let replaceCount2 = this.repeatStr(replaceText, regArr[2]);</span>
<span class="line">        return str.replace(Reg, replaceCount1 + &#39;$1&#39; + replaceCount2)</span>
<span class="line">    }</span>
<span class="line">    else if (regArr.length === 1 &amp;&amp; type === 0) {</span>
<span class="line">        regtext = &#39;(^\\\\w{&#39; + regArr[0] + &#39;})&#39;</span>
<span class="line">        Reg = new RegExp(regtext);</span>
<span class="line">        let replaceCount = this.repeatStr(replaceText, regArr[0]);</span>
<span class="line">        return str.replace(Reg, replaceCount)</span>
<span class="line">    }</span>
<span class="line">    else if (regArr.length === 1 &amp;&amp; type === 1) {</span>
<span class="line">        regtext = &#39;(\\\\w{&#39; + regArr[0] + &#39;}$)&#39;</span>
<span class="line">        Reg = new RegExp(regtext);</span>
<span class="line">        let replaceCount = this.repeatStr(replaceText, regArr[0]);</span>
<span class="line">        return str.replace(Reg, replaceCount)</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6检测字符串" tabindex="-1"><a class="header-anchor" href="#_2-6检测字符串"><span>2-6检测字符串</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//检测字符串</span>
<span class="line">//ecDo.checkType(&#39;165226226326&#39;,&#39;phone&#39;)</span>
<span class="line">//result：false</span>
<span class="line">//大家可以根据需要扩展</span>
<span class="line">checkType: function (str, type) {</span>
<span class="line">    switch (type) {</span>
<span class="line">        case &#39;email&#39;:</span>
<span class="line">            return /^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$/.test(str);</span>
<span class="line">        case &#39;phone&#39;:</span>
<span class="line">            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);</span>
<span class="line">        case &#39;tel&#39;:</span>
<span class="line">            return /^(0\\d{2,3}-\\d{7,8})(-\\d{1,4})?$/.test(str);</span>
<span class="line">        case &#39;number&#39;:</span>
<span class="line">            return /^[0-9]$/.test(str);</span>
<span class="line">        case &#39;english&#39;:</span>
<span class="line">            return /^[a-zA-Z]+$/.test(str);</span>
<span class="line">        case &#39;text&#39;:</span>
<span class="line">            return /^\\w+$/.test(str);</span>
<span class="line">        case &#39;chinese&#39;:</span>
<span class="line">            return /^[\\u4E00-\\u9FA5]+$/.test(str);</span>
<span class="line">        case &#39;lower&#39;:</span>
<span class="line">            return /^[a-z]+$/.test(str);</span>
<span class="line">        case &#39;upper&#39;:</span>
<span class="line">            return /^[A-Z]+$/.test(str);</span>
<span class="line">        default:</span>
<span class="line">            return true;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-7-检测密码强度" tabindex="-1"><a class="header-anchor" href="#_2-7-检测密码强度"><span>2-7 检测密码强度</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//ecDo.checkPwd(&#39;12asdASAD&#39;)</span>
<span class="line">//result：3(强度等级为3)</span>
<span class="line">checkPwd: function (str) {</span>
<span class="line">    let nowLv = 0;</span>
<span class="line">    if (str.length &lt; 6) {</span>
<span class="line">        return nowLv</span>
<span class="line">    }</span>
<span class="line">    if (/[0-9]/.test(str)) {</span>
<span class="line">        nowLv++</span>
<span class="line">    }</span>
<span class="line">    if (/[a-z]/.test(str)) {</span>
<span class="line">        nowLv++</span>
<span class="line">    }</span>
<span class="line">    if (/[A-Z]/.test(str)) {</span>
<span class="line">        nowLv++</span>
<span class="line">    }</span>
<span class="line">    if (/[\\.|-|_]/.test(str)) {</span>
<span class="line">        nowLv++</span>
<span class="line">    }</span>
<span class="line">    return nowLv;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-8随机码-tostring详解" tabindex="-1"><a class="header-anchor" href="#_2-8随机码-tostring详解"><span>2-8随机码（toString详解）</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//count取值范围0-36</span>
<span class="line">//ecDo.randomWord(10)</span>
<span class="line">//result：&quot;2584316588472575&quot;</span>
<span class="line">//ecDo.randomWord(14)</span>
<span class="line">//result：&quot;9b405070dd00122640c192caab84537&quot;</span>
<span class="line">//ecDo.randomWord(36)</span>
<span class="line">//result：&quot;83vhdx10rmjkyb9&quot;</span>
<span class="line">randomWord: function (count) {</span>
<span class="line">    return Math.random().toString(count).substring(2);</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_2-9查找字符串" tabindex="-1"><a class="header-anchor" href="#_2-9查找字符串"><span>2-9查找字符串</span></a></h3><p>可能标题会有点误导，下面我就简单说明一个需求，在字符串<code>&#39;sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967&#39;</code>中找出&#39;blog&#39;的出现次数。代码如下</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//let strTest=&#39;sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967&#39;</span>
<span class="line">//ecDo.countStr(strTest,&#39;blog&#39;)</span>
<span class="line">//result：6</span>
<span class="line">countStr: function (str, strSplit) {</span>
<span class="line">    return str.split(strSplit).length - 1</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_2-10-过滤字符串" tabindex="-1"><a class="header-anchor" href="#_2-10-过滤字符串"><span>2-10 过滤字符串</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//过滤字符串(html标签，表情，特殊字符)</span>
<span class="line">//字符串，替换内容（special-特殊字符,html-html标签,emjoy-emjoy表情,word-小写字母，WORD-大写字母，number-数字,chinese-中文），要替换成什么，默认&#39;&#39;,保留哪些特殊字符</span>
<span class="line">//如果需要过滤多种字符，type参数使用,分割，如下栗子</span>
<span class="line">//过滤字符串的html标签，大写字母，中文，特殊字符，全部替换成*,但是特殊字符&#39;%&#39;，&#39;?&#39;，除了这两个，其他特殊字符全部清除</span>
<span class="line">//let str=&#39;asd    654a大蠢sasdasdASDQWEXZC6d5#%^*^&amp;*^%^&amp;*$\\\\&quot;\\&#39;#@!()*/-())_\\&#39;&quot;:&quot;{}?&lt;div&gt;&lt;/div&gt;&lt;img src=&quot;&quot;/&gt;啊实打实大蠢猪自行车这些课程&#39;;</span>
<span class="line">// ecDo.filterStr(str,&#39;html,WORD,chinese,special&#39;,&#39;*&#39;,&#39;%?&#39;)</span>
<span class="line">//result：&quot;asd    654a**sasdasd*********6d5#%^*^&amp;*^%^&amp;*$\\&quot;&#39;#@!()*/-())_&#39;&quot;:&quot;{}?*****************&quot;</span>
<span class="line">filterStr: function (str, type, restr, spstr) {</span>
<span class="line">    let typeArr = type.split(&#39;,&#39;), _str = str;</span>
<span class="line">    for (let i = 0, len = typeArr.length; i &lt; len; i++) {</span>
<span class="line">        //是否是过滤特殊符号</span>
<span class="line">        if (typeArr[i] === &#39;special&#39;) {</span>
<span class="line">            let pattern, regText = &#39;$()[]{}?\\|^*+./\\&quot;\\&#39;+&#39;;</span>
<span class="line">            //是否有哪些特殊符号需要保留</span>
<span class="line">            if (spstr) {</span>
<span class="line">                let _spstr = spstr.split(&quot;&quot;), _regText = &quot;[^0-9A-Za-z\\\\s&quot;;</span>
<span class="line">                for (let j = 0, len1 = _spstr.length; j &lt; len1; j++) {</span>
<span class="line">                    if (regText.indexOf(_spstr[j]) === -1) {</span>
<span class="line">                        _regText += _spstr[j];</span>
<span class="line">                    }</span>
<span class="line">                    else {</span>
<span class="line">                        _regText += &#39;\\\\&#39; + _spstr[j];</span>
<span class="line">                    }</span>
<span class="line">                }</span>
<span class="line">                _regText += &#39;]&#39;</span>
<span class="line">                pattern = new RegExp(_regText, &#39;g&#39;);</span>
<span class="line">            }</span>
<span class="line">            else {</span>
<span class="line">                pattern = new RegExp(&quot;[^0-9A-Za-z\\\\s]&quot;, &#39;g&#39;)</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">        let _restr = restr || &#39;&#39;;</span>
<span class="line">        switch (typeArr[i]) {</span>
<span class="line">            case &#39;special&#39;:</span>
<span class="line">                _str = _str.replace(pattern, _restr);</span>
<span class="line">                break;</span>
<span class="line">            case &#39;html&#39;:</span>
<span class="line">                _str = _str.replace(/&lt;\\/?[^&gt;]*&gt;/g, _restr);</span>
<span class="line">                break;</span>
<span class="line">            case &#39;emjoy&#39;:</span>
<span class="line">                _str = _str.replace(/[^\\u4e00-\\u9fa5|\\u0000-\\u00ff|\\u3002|\\uFF1F|\\uFF01|\\uff0c|\\u3001|\\uff1b|\\uff1a|\\u3008-\\u300f|\\u2018|\\u2019|\\u201c|\\u201d|\\uff08|\\uff09|\\u2014|\\u2026|\\u2013|\\uff0e]/g, _restr);</span>
<span class="line">                break;</span>
<span class="line">            case &#39;word&#39;:</span>
<span class="line">                _str = _str.replace(/[a-z]/g, _restr);</span>
<span class="line">                break;</span>
<span class="line">            case &#39;WORD&#39;:</span>
<span class="line">                _str = _str.replace(/[A-Z]/g, _restr);</span>
<span class="line">                break;</span>
<span class="line">            case &#39;number&#39;:</span>
<span class="line">                _str = _str.replace(/[0-9]/g, _restr);</span>
<span class="line">                break;</span>
<span class="line">            case &#39;chinese&#39;:</span>
<span class="line">                _str = _str.replace(/[\\u4E00-\\u9FA5]/g, _restr);</span>
<span class="line">                break;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    return _str;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-11格式化处理字符串" tabindex="-1"><a class="header-anchor" href="#_2-11格式化处理字符串"><span>2-11格式化处理字符串</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//ecDo.formatText(&#39;1234asda567asd890&#39;)</span>
<span class="line">//result：&quot;12,34a,sda,567,asd,890&quot;</span>
<span class="line">//ecDo.formatText(&#39;1234asda567asd890&#39;,4,&#39; &#39;)</span>
<span class="line">//result：&quot;1 234a sda5 67as d890&quot;</span>
<span class="line">//ecDo.formatText(&#39;1234asda567asd890&#39;,4,&#39;-&#39;)</span>
<span class="line">//result：&quot;1-234a-sda5-67as-d890&quot;</span>
<span class="line">formatText: function (str, size, delimiter) {</span>
<span class="line">    let _size = size || 3, _delimiter = delimiter || &#39;,&#39;;</span>
<span class="line">    let regText = &#39;\\\\B(?=(\\\\w{&#39; + _size + &#39;})+(?!\\\\w))&#39;;</span>
<span class="line">    let reg = new RegExp(regText, &#39;g&#39;);</span>
<span class="line">    return str.replace(reg, _delimiter);</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_2-12找出最长单词" tabindex="-1"><a class="header-anchor" href="#_2-12找出最长单词"><span>2-12找出最长单词</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//ecDo.longestWord(&#39;Find the Longest word in a String&#39;)</span>
<span class="line">//result：7</span>
<span class="line">//ecDo.longestWord(&#39;Find|the|Longest|word|in|a|String&#39;,&#39;|&#39;)</span>
<span class="line">//result：7</span>
<span class="line">longestWord: function (str, splitType) {</span>
<span class="line">    let _splitType = splitType || /\\s+/g,</span>
<span class="line">        _max = 0,_item=&#39;&#39;;</span>
<span class="line">    let strArr = str.split(_splitType);</span>
<span class="line">    strArr.forEach(function (item) {</span>
<span class="line">        if (_max &lt; item.length) {</span>
<span class="line">            _max = item.length</span>
<span class="line">            _item=item;</span>
<span class="line">        }</span>
<span class="line">    })</span>
<span class="line">    return {el:_item,max:_max};</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-13句中单词首字母大写" tabindex="-1"><a class="header-anchor" href="#_2-13句中单词首字母大写"><span>2-13句中单词首字母大写</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//这个我也一直在纠结，英文标题，即使是首字母大写，也未必每一个单词的首字母都是大写的，但是又不知道哪些应该大写，哪些不应该大写</span>
<span class="line">//ecDo.titleCaseUp(&#39;this is a title&#39;)</span>
<span class="line">//&quot;This Is A Title&quot;</span>
<span class="line">titleCaseUp: function (str, splitType) {</span>
<span class="line">    let _splitType = splitType || /\\s+/g;</span>
<span class="line">    let strArr = str.split(_splitType),</span>
<span class="line">        result = &quot;&quot;, _this = this</span>
<span class="line">    strArr.forEach(function (item) {</span>
<span class="line">        result += _this.changeCase(item, 1) + &#39; &#39;;</span>
<span class="line">    })</span>
<span class="line">    return this.trim(result, 4)</span>
<span class="line">}  </span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="_3-数组操作" tabindex="-1"><a class="header-anchor" href="#_3-数组操作"><span>3.数组操作</span></a></h2><h3 id="_3-1数组去重" tabindex="-1"><a class="header-anchor" href="#_3-1数组去重"><span>3-1数组去重</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">removeRepeatArray: function (arr) {</span>
<span class="line">    return arr.filter(function (item, index, self) {</span>
<span class="line">        return self.indexOf(item) === index;</span>
<span class="line">    });</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_3-2数组顺序打乱" tabindex="-1"><a class="header-anchor" href="#_3-2数组顺序打乱"><span>3-2数组顺序打乱</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">upsetArr: function (arr) {</span>
<span class="line">    return arr.sort(function () {</span>
<span class="line">        return Math.random() - 0.5</span>
<span class="line">    });</span>
<span class="line">},</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_3-3数组最大值最小值" tabindex="-1"><a class="header-anchor" href="#_3-3数组最大值最小值"><span>3-3数组最大值最小值</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//数组最大值</span>
<span class="line">maxArr: function (arr) {</span>
<span class="line">    return Math.max.apply(null, arr);</span>
<span class="line">},</span>
<span class="line">//数组最小值</span>
<span class="line">minArr: function (arr) {</span>
<span class="line">    return Math.min.apply(null, arr);</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_3-4数组求和-平均值" tabindex="-1"><a class="header-anchor" href="#_3-4数组求和-平均值"><span>3-4数组求和，平均值</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//这一块的封装，主要是针对数字类型的数组</span>
<span class="line">//求和</span>
<span class="line">sumArr: function (arr) {</span>
<span class="line">    return arr.reduce(function (pre, cur) {</span>
<span class="line">        return pre + cur</span>
<span class="line">    })</span>
<span class="line">}</span>
<span class="line">//数组平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活！</span>
<span class="line">covArr: function (arr) {</span>
<span class="line">    return this.sumArr(arr) / arr.length;</span>
<span class="line">},</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_3-5从数组中随机获取元素" tabindex="-1"><a class="header-anchor" href="#_3-5从数组中随机获取元素"><span>3-5从数组中随机获取元素</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//ecDo.randomOne([1,2,3,6,8,5,4,2,6])</span>
<span class="line">//2</span>
<span class="line">//ecDo.randomOne([1,2,3,6,8,5,4,2,6])</span>
<span class="line">//8</span>
<span class="line">//ecDo.randomOne([1,2,3,6,8,5,4,2,6])</span>
<span class="line">//8</span>
<span class="line">//ecDo.randomOne([1,2,3,6,8,5,4,2,6])</span>
<span class="line">//1</span>
<span class="line">randomOne: function (arr) {</span>
<span class="line">    return arr[Math.floor(Math.random() * arr.length)];</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_3-6返回数组-字符串-一个元素出现的次数" tabindex="-1"><a class="header-anchor" href="#_3-6返回数组-字符串-一个元素出现的次数"><span>3-6返回数组（字符串）一个元素出现的次数</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//ecDo.getEleCount(&#39;asd56+asdasdwqe&#39;,&#39;a&#39;)</span>
<span class="line">//result：3</span>
<span class="line">//ecDo.getEleCount([1,2,3,4,5,66,77,22,55,22],22)</span>
<span class="line">//result：2</span>
<span class="line">getEleCount: function (obj, ele) {</span>
<span class="line">    let num = 0;</span>
<span class="line">    for (let i = 0, len = obj.length; i &lt; len; i++) {</span>
<span class="line">        if (ele === obj[i]) {</span>
<span class="line">            num++;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    return num;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_3-7返回数组-字符串-出现最多的几次元素和出现次数" tabindex="-1"><a class="header-anchor" href="#_3-7返回数组-字符串-出现最多的几次元素和出现次数"><span>3-7返回数组（字符串）出现最多的几次元素和出现次数</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//arr, rank-&gt;长度，默认为数组长度，ranktype，排序方式，默认降序</span>
<span class="line">//返回值：el-&gt;元素，count-&gt;次数</span>
<span class="line">//ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2])</span>
<span class="line">//默认情况，返回所有元素出现的次数</span>
<span class="line">//result：[{&quot;el&quot;:&quot;2&quot;,&quot;count&quot;:6},{&quot;el&quot;:&quot;1&quot;,&quot;count&quot;:4},{&quot;el&quot;:&quot;3&quot;,&quot;count&quot;:2},{&quot;el&quot;:&quot;4&quot;,&quot;count&quot;:1},{&quot;el&quot;:&quot;5&quot;,&quot;count&quot;:1},{&quot;el&quot;:&quot;6&quot;,&quot;count&quot;:1}]</span>
<span class="line">//ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3)</span>
<span class="line">//传参（rank=3），只返回出现次数排序前三的</span>
<span class="line">//result：[{&quot;el&quot;:&quot;2&quot;,&quot;count&quot;:6},{&quot;el&quot;:&quot;1&quot;,&quot;count&quot;:4},{&quot;el&quot;:&quot;3&quot;,&quot;count&quot;:2}]</span>
<span class="line">//ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],null,1)</span>
<span class="line">//传参（ranktype=1,rank=null），升序返回所有元素出现次数</span>
<span class="line">//result：[{&quot;el&quot;:&quot;6&quot;,&quot;count&quot;:1},{&quot;el&quot;:&quot;5&quot;,&quot;count&quot;:1},{&quot;el&quot;:&quot;4&quot;,&quot;count&quot;:1},{&quot;el&quot;:&quot;3&quot;,&quot;count&quot;:2},{&quot;el&quot;:&quot;1&quot;,&quot;count&quot;:4},{&quot;el&quot;:&quot;2&quot;,&quot;count&quot;:6}]</span>
<span class="line">//ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3,1)</span>
<span class="line">//传参（rank=3，ranktype=1），只返回出现次数排序（升序）前三的</span>
<span class="line">//result：[{&quot;el&quot;:&quot;6&quot;,&quot;count&quot;:1},{&quot;el&quot;:&quot;5&quot;,&quot;count&quot;:1},{&quot;el&quot;:&quot;4&quot;,&quot;count&quot;:1}]</span>
<span class="line">getCount: function (arr, rank, ranktype) {</span>
<span class="line">    let obj = {},</span>
<span class="line">        k, arr1 = []</span>
<span class="line">    //记录每一元素出现的次数</span>
<span class="line">    for (let i = 0, len = arr.length; i &lt; len; i++) {</span>
<span class="line">        k = arr[i];</span>
<span class="line">        if (obj[k]) {</span>
<span class="line">            obj[k]++;</span>
<span class="line">        } else {</span>
<span class="line">            obj[k] = 1;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    //保存结果{el-&#39;元素&#39;，count-出现次数}</span>
<span class="line">    for (let o in obj) {</span>
<span class="line">        arr1.push({el: o, count: obj[o]});</span>
<span class="line">    }</span>
<span class="line">    //排序（降序）</span>
<span class="line">    arr1.sort(function (n1, n2) {</span>
<span class="line">        return n2.count - n1.count</span>
<span class="line">    });</span>
<span class="line">    //如果ranktype为1，则为升序，反转数组</span>
<span class="line">    if (ranktype === 1) {</span>
<span class="line">        arr1 = arr1.reverse();</span>
<span class="line">    }</span>
<span class="line">    let rank1 = rank || arr1.length;</span>
<span class="line">    return arr1.slice(0, rank1);</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-8得到n1-n2下标的数组" tabindex="-1"><a class="header-anchor" href="#_3-8得到n1-n2下标的数组"><span>3-8得到n1-n2下标的数组</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//ecDo.getArrayNum([0,1,2,3,4,5,6,7,8,9],5,9)</span>
<span class="line">//result：[5, 6, 7, 8, 9]</span>
<span class="line">//getArrayNum([0,1,2,3,4,5,6,7,8,9],2) //不传第二个参数,默认返回从n1到数组结束的元素</span>
<span class="line">//result：[2, 3, 4, 5, 6, 7, 8, 9]</span>
<span class="line">getArrayNum: function (arr, n1, n2) {</span>
<span class="line">    return arr.slice(n1, n2);</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_3-9筛选数组" tabindex="-1"><a class="header-anchor" href="#_3-9筛选数组"><span>3-9筛选数组</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//删除值为&#39;val&#39;的数组元素</span>
<span class="line">//ecDo.removeArrayForValue([&#39;test&#39;,&#39;test1&#39;,&#39;test2&#39;,&#39;test&#39;,&#39;aaa&#39;],&#39;test&#39;,&#39;)</span>
<span class="line">//result：[&quot;aaa&quot;]   带有&#39;test&#39;的都删除</span>
<span class="line">//ecDo.removeArrayForValue([&#39;test&#39;,&#39;test1&#39;,&#39;test2&#39;,&#39;test&#39;,&#39;aaa&#39;],&#39;test&#39;)</span>
<span class="line">//result：[&quot;test1&quot;, &quot;test2&quot;, &quot;aaa&quot;]  //数组元素的值全等于&#39;test&#39;才被删除</span>
<span class="line">removeArrayForValue: function (arr, val, type) {</span>
<span class="line">    return arr.filter(function (item) {</span>
<span class="line">        return type ? item.indexOf(val) === -1 : item !== val</span>
<span class="line">    })</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_3-10-获取对象数组某些项" tabindex="-1"><a class="header-anchor" href="#_3-10-获取对象数组某些项"><span>3-10 获取对象数组某些项</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]</span>
<span class="line">//ecDo.getOptionArray(arr,&#39;a,c&#39;)</span>
<span class="line">//result：[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]</span>
<span class="line">//ecDo.getOptionArray(arr,&#39;b&#39;)</span>
<span class="line">//result：[2, 3, 9, 2, 5]</span>
<span class="line">getOptionArray: function (arr, keys) {</span>
<span class="line">    let newArr = []</span>
<span class="line">    if (!keys) {</span>
<span class="line">        return arr</span>
<span class="line">    }</span>
<span class="line">    let _keys = keys.split(&#39;,&#39;), newArrOne = {};</span>
<span class="line">    //是否只是需要获取某一项的值</span>
<span class="line">    if (_keys.length === 1) {</span>
<span class="line">        for (let i = 0, len = arr.length; i &lt; len; i++) {</span>
<span class="line">            newArr.push(arr[i][keys])</span>
<span class="line">        }</span>
<span class="line">        return newArr;</span>
<span class="line">    }</span>
<span class="line">    for (let i = 0, len = arr.length; i &lt; len; i++) {</span>
<span class="line">        newArrOne = {};</span>
<span class="line">        for (let j = 0, len1 = _keys.length; j &lt; len1; j++) {</span>
<span class="line">            newArrOne[_keys[j]] = arr[i][_keys[j]]</span>
<span class="line">        }</span>
<span class="line">        newArr.push(newArrOne);</span>
<span class="line">    }</span>
<span class="line">    return newArr</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-11-排除对象数组某些项" tabindex="-1"><a class="header-anchor" href="#_3-11-排除对象数组某些项"><span>3-11 排除对象数组某些项</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]</span>
<span class="line">//ecDo.filterOptionArray(arr,&#39;a&#39;)</span>
<span class="line">//result：[{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]</span>
<span class="line">//ecDo.filterOptionArray(arr,&#39;a,c&#39;)</span>
<span class="line">//result：[{b:2},{b:3},{b:9},{b:2},{b:5}]</span>
<span class="line">filterOptionArray: function (arr, keys) {</span>
<span class="line">    let newArr = []</span>
<span class="line">    let _keys = keys.split(&#39;,&#39;), newArrOne = {};</span>
<span class="line">    for (let i = 0, len = arr.length; i &lt; len; i++) {</span>
<span class="line">        newArrOne = {};</span>
<span class="line">        for (let key in arr[i]) {</span>
<span class="line">            //如果key不存在排除keys里面,添加数据</span>
<span class="line">            if (_keys.indexOf(key) === -1) {</span>
<span class="line">                newArrOne[key] = arr[i][key];</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">        newArr.push(newArrOne);</span>
<span class="line">    }</span>
<span class="line">    return newArr</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-12-对象数组排序" tabindex="-1"><a class="header-anchor" href="#_3-12-对象数组排序"><span>3-12 对象数组排序</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]</span>
<span class="line">//ecDo.arraySort(arr,&#39;a,b&#39;)a是第一排序条件，b是第二排序条件</span>
<span class="line">//result：[{&quot;a&quot;:1,&quot;b&quot;:2,&quot;c&quot;:9},{&quot;a&quot;:2,&quot;b&quot;:3,&quot;c&quot;:5},{&quot;a&quot;:4,&quot;b&quot;:2,&quot;c&quot;:5},{&quot;a&quot;:4,&quot;b&quot;:5,&quot;c&quot;:7},{&quot;a&quot;:5,&quot;b&quot;:9}]</span>
<span class="line">arraySort: function (arr, sortText) {</span>
<span class="line">    if (!sortText) {</span>
<span class="line">        return arr</span>
<span class="line">    }</span>
<span class="line">    let _sortText = sortText.split(&#39;,&#39;).reverse(), _arr = arr.slice(0);</span>
<span class="line">    for (let i = 0, len = _sortText.length; i &lt; len; i++) {</span>
<span class="line">        _arr.sort(function (n1, n2) {</span>
<span class="line">            return n1[_sortText[i]] - n2[_sortText[i]]</span>
<span class="line">        })</span>
<span class="line">    }</span>
<span class="line">    return _arr;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-13-数组扁平化" tabindex="-1"><a class="header-anchor" href="#_3-13-数组扁平化"><span>3-13 数组扁平化</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//ecDo.steamroller([1,2,[4,5,[1,23]]])</span>
<span class="line">//[1, 2, 4, 5, 1, 23]</span>
<span class="line">steamroller: function (arr) {</span>
<span class="line">    let newArr = [],_this=this;</span>
<span class="line">    for (let i = 0; i &lt; arr.length; i++) {</span>
<span class="line">        if (Array.isArray(arr[i])) {</span>
<span class="line">            // 如果是数组，调用(递归)steamroller 将其扁平化</span>
<span class="line">            // 然后再 push 到 newArr 中</span>
<span class="line">            newArr.push.apply(newArr, _this.steamroller(arr[i]));</span>
<span class="line">        } else {</span>
<span class="line">            // 不是数组直接 push 到 newArr 中</span>
<span class="line">            newArr.push(arr[i]);</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    return newArr;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-基础dom操作" tabindex="-1"><a class="header-anchor" href="#_4-基础dom操作"><span>4.基础DOM操作</span></a></h2><p>这个部分代码其实参考jquery的一些函数写法，唯一区别就是调用不用，参数一样. 比如下面的栗子</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//设置对象内容</span>
<span class="line">jquery：$(&#39;#xxx&#39;).html(&#39;hello world&#39;);</span>
<span class="line">现在：ecDo.html(document.getElementById(&#39;xxx&#39;),&#39;hello world&#39;)</span>
<span class="line">//获取对象内容</span>
<span class="line">jquery：$(&#39;#xxx&#39;).html();</span>
<span class="line">现在：ecDo.html(document.getElementById(&#39;xxx&#39;))</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_4-1检测对象是否有哪个类名" tabindex="-1"><a class="header-anchor" href="#_4-1检测对象是否有哪个类名"><span>4-1检测对象是否有哪个类名</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//检测对象是否有哪个类名</span>
<span class="line">hasClass: function (obj, classStr) {</span>
<span class="line">    if (obj.className &amp;&amp; this.trim(obj.className, 1) !== &quot;&quot;) {</span>
<span class="line">        let arr = obj.className.split(/\\s+/); //这个正则表达式是因为class可以有多个,判断是否包含</span>
<span class="line">        return (arr.indexOf(classStr) == -1) ? false : true;</span>
<span class="line">    }</span>
<span class="line">    else {</span>
<span class="line">        return false;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_4-2-添加类名" tabindex="-1"><a class="header-anchor" href="#_4-2-添加类名"><span>4-2 添加类名</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">addClass: function (obj, classStr) {</span>
<span class="line">    if ((this.istype(obj, &#39;array&#39;) || this.istype(obj, &#39;elements&#39;)) &amp;&amp; obj.length &gt;= 1) {</span>
<span class="line">        for (let i = 0, len = obj.length; i &lt; len; i++) {</span>
<span class="line">            if (!this.hasClass(obj[i], classStr)) {</span>
<span class="line">                obj[i].className += &quot; &quot; + classStr;</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    else {</span>
<span class="line">        if (!this.hasClass(obj, classStr)) {</span>
<span class="line">            obj.className += &quot; &quot; + classStr;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3删除类名" tabindex="-1"><a class="header-anchor" href="#_4-3删除类名"><span>4-3删除类名</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">removeClass: function (obj, classStr) {</span>
<span class="line">    if ((this.istype(obj, &#39;array&#39;) || this.istype(obj, &#39;elements&#39;)) &amp;&amp; obj.length &gt; 1) {</span>
<span class="line">        for (let i = 0, len = obj.length; i &lt; len; i++) {</span>
<span class="line">            if (this.hasClass(obj[i], classStr)) {</span>
<span class="line">                let reg = new RegExp(&#39;(\\\\s|^)&#39; + classStr + &#39;(\\\\s|$)&#39;);</span>
<span class="line">                obj[i].className = obj[i].className.replace(reg, &#39;&#39;);</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    else {</span>
<span class="line">        if (this.hasClass(obj, classStr)) {</span>
<span class="line">            let reg = new RegExp(&#39;(\\\\s|^)&#39; + classStr + &#39;(\\\\s|$)&#39;);</span>
<span class="line">            obj.className = obj.className.replace(reg, &#39;&#39;);</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4替换类名-被替换的类名-替换的类名" tabindex="-1"><a class="header-anchor" href="#_4-4替换类名-被替换的类名-替换的类名"><span>4-4替换类名(&quot;被替换的类名&quot;,&quot;替换的类名&quot;)</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">replaceClass: function (obj, newName, oldName) {</span>
<span class="line">    this.removeClass(obj, oldName);</span>
<span class="line">    this.addClass(obj, newName);</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_4-5获取兄弟节点" tabindex="-1"><a class="header-anchor" href="#_4-5获取兄弟节点"><span>4-5获取兄弟节点</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//ecDo.siblings(obj,&#39;#id&#39;)</span>
<span class="line">siblings: function (obj, opt) {</span>
<span class="line">    let a = []; //定义一个数组，用来存o的兄弟元素</span>
<span class="line">    let p = obj.previousSibling;</span>
<span class="line">    while (p) { //先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling</span>
<span class="line">        if (p.nodeType === 1) {</span>
<span class="line">            a.push(p);</span>
<span class="line">        }</span>
<span class="line">        p = p.previousSibling //最后把上一个节点赋给p</span>
<span class="line">    }</span>
<span class="line">    a.reverse() //把顺序反转一下 这样元素的顺序就是按先后的了</span>
<span class="line">    let n = obj.nextSibling; //再取o的弟弟</span>
<span class="line">    while (n) { //判断有没有下一个弟弟结点 n是nextSibling的意思</span>
<span class="line">        if (n.nodeType === 1) {</span>
<span class="line">            a.push(n);</span>
<span class="line">        }</span>
<span class="line">        n = n.nextSibling;</span>
<span class="line">    }</span>
<span class="line">    if (opt) {</span>
<span class="line">        let _opt = opt.substr(1);</span>
<span class="line">        let b = [];//定义一个数组，用于储存过滤a的数组</span>
<span class="line">        if (opt[0] === &#39;.&#39;) {</span>
<span class="line">            b = a.filter(function (item) {</span>
<span class="line">                return item.className === _opt</span>
<span class="line">            });</span>
<span class="line">        }</span>
<span class="line">        else if (opt[0] === &#39;#&#39;) {</span>
<span class="line">            b = a.filter(function (item) {</span>
<span class="line">                return item.id === _opt</span>
<span class="line">            });</span>
<span class="line">        }</span>
<span class="line">        else {</span>
<span class="line">            b = a.filter(function (item) {</span>
<span class="line">                return item.tagName.toLowerCase() === opt</span>
<span class="line">            });</span>
<span class="line">        }</span>
<span class="line">        return b;</span>
<span class="line">    }</span>
<span class="line">    return a;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-6设置样式" tabindex="-1"><a class="header-anchor" href="#_4-6设置样式"><span>4-6设置样式</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">css: function (obj, json) {</span>
<span class="line">    for (let attr in json) {</span>
<span class="line">        obj.style[attr] = json[attr];</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_4-7设置文本内容" tabindex="-1"><a class="header-anchor" href="#_4-7设置文本内容"><span>4-7设置文本内容</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">html: function (obj) {</span>
<span class="line">    if (arguments.length === 1) {</span>
<span class="line">        return obj.innerHTML;</span>
<span class="line">    } else if (arguments.length === 2) {</span>
<span class="line">        obj.innerHTML = arguments[1];</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line">text: function (obj) {</span>
<span class="line">    if (arguments.length === 1) {</span>
<span class="line">        return obj.innerHTML;</span>
<span class="line">    } else if (arguments.length === 2) {</span>
<span class="line">        obj.innerHTML = this.filterStr(arguments[1],&#39;html&#39;);</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-8显示隐藏" tabindex="-1"><a class="header-anchor" href="#_4-8显示隐藏"><span>4-8显示隐藏</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">show: function (obj) {</span>
<span class="line">    let blockArr=[&#39;div&#39;,&#39;li&#39;,&#39;ul&#39;,&#39;ol&#39;,&#39;dl&#39;,&#39;table&#39;,&#39;article&#39;,&#39;h1&#39;,&#39;h2&#39;,&#39;h3&#39;,&#39;h4&#39;,&#39;h5&#39;,&#39;h6&#39;,&#39;p&#39;,&#39;hr&#39;,&#39;header&#39;,&#39;footer&#39;,&#39;details&#39;,&#39;summary&#39;,&#39;section&#39;,&#39;aside&#39;,&#39;&#39;]</span>
<span class="line">    if(blockArr.indexOf(obj.tagName.toLocaleLowerCase())===-1){</span>
<span class="line">        obj.style.display =&#39;inline&#39;;</span>
<span class="line">    }</span>
<span class="line">    else{</span>
<span class="line">        obj.style.display =&#39;block&#39;;</span>
<span class="line">    }</span>
<span class="line">},</span>
<span class="line">hide: function (obj) {</span>
<span class="line">    obj.style.display = &quot;none&quot;;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="_5-其他操作" tabindex="-1"><a class="header-anchor" href="#_5-其他操作"><span>5.其他操作</span></a></h2><h3 id="_5-1cookie" tabindex="-1"><a class="header-anchor" href="#_5-1cookie"><span>5-1cookie</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//cookie</span>
<span class="line">//设置cookie</span>
<span class="line">setCookie: function (name, value, iDay) {</span>
<span class="line">    let oDate = new Date();</span>
<span class="line">    oDate.setDate(oDate.getDate() + iDay);</span>
<span class="line">    document.cookie = name + &#39;=&#39; + value + &#39;;expires=&#39; + oDate;</span>
<span class="line">},</span>
<span class="line">//获取cookie</span>
<span class="line">getCookie: function (name) {</span>
<span class="line">    let arr = document.cookie.split(&#39;; &#39;);</span>
<span class="line">    for (let i = 0; i &lt; arr.length; i++) {</span>
<span class="line">        let arr2 = arr[i].split(&#39;=&#39;);</span>
<span class="line">        if (arr2[0] == name) {</span>
<span class="line">            return arr2[1];</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    return &#39;&#39;;</span>
<span class="line">},</span>
<span class="line">//删除cookie</span>
<span class="line">removeCookie: function (name) {</span>
<span class="line">    this.setCookie(name, 1, -1);</span>
<span class="line">},</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2清除对象中值为空的属性" tabindex="-1"><a class="header-anchor" href="#_5-2清除对象中值为空的属性"><span>5-2清除对象中值为空的属性</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//ecDo.filterParams({a:&quot;&quot;,b:null,c:&quot;010&quot;,d:123})</span>
<span class="line">//Object {c: &quot;010&quot;, d: 123}</span>
<span class="line">filterParams: function (obj) {</span>
<span class="line">    let _newPar = {};</span>
<span class="line">    for (let key in obj) {</span>
<span class="line">        if ((obj[key] === 0 ||obj[key] === false|| obj[key]) &amp;&amp; obj[key].toString().replace(/(^\\s*)|(\\s*$)/g, &#39;&#39;) !== &#39;&#39;) {</span>
<span class="line">            _newPar[key] = obj[key];</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    return _newPar;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_5-3现金额大写转换函数" tabindex="-1"><a class="header-anchor" href="#_5-3现金额大写转换函数"><span>5-3现金额大写转换函数</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//ecDo.upDigit(168752632)</span>
<span class="line">//result：&quot;人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整&quot;</span>
<span class="line">//ecDo.upDigit(1682)</span>
<span class="line">//result：&quot;人民币壹仟陆佰捌拾贰元整&quot;</span>
<span class="line">//ecDo.upDigit(-1693)</span>
<span class="line">//result：&quot;欠人民币壹仟陆佰玖拾叁元整&quot;</span>
<span class="line">upDigit: function (n) {</span>
<span class="line">    let fraction = [&#39;角&#39;, &#39;分&#39;, &#39;厘&#39;];</span>
<span class="line">    let digit = [&#39;零&#39;, &#39;壹&#39;, &#39;贰&#39;, &#39;叁&#39;, &#39;肆&#39;, &#39;伍&#39;, &#39;陆&#39;, &#39;柒&#39;, &#39;捌&#39;, &#39;玖&#39;];</span>
<span class="line">    let unit = [</span>
<span class="line">        [&#39;元&#39;, &#39;万&#39;, &#39;亿&#39;],</span>
<span class="line">        [&#39;&#39;, &#39;拾&#39;, &#39;佰&#39;, &#39;仟&#39;]</span>
<span class="line">    ];</span>
<span class="line">    let head = n &lt; 0 ? &#39;欠人民币&#39; : &#39;人民币&#39;;</span>
<span class="line">    n = Math.abs(n);</span>
<span class="line">    let s = &#39;&#39;;</span>
<span class="line">    for (let i = 0; i &lt; fraction.length; i++) {</span>
<span class="line">        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, &#39;&#39;);</span>
<span class="line">    }</span>
<span class="line">    s = s || &#39;整&#39;;</span>
<span class="line">    n = Math.floor(n);</span>
<span class="line">    for (let i = 0; i &lt; unit[0].length &amp;&amp; n &gt; 0; i++) {</span>
<span class="line">        let p = &#39;&#39;;</span>
<span class="line">        for (let j = 0; j &lt; unit[1].length &amp;&amp; n &gt; 0; j++) {</span>
<span class="line">            p = digit[n % 10] + unit[1][j] + p;</span>
<span class="line">            n = Math.floor(n / 10);</span>
<span class="line">        }</span>
<span class="line">        s = p.replace(/(零.)*零$/, &#39;&#39;).replace(/^$/, &#39;零&#39;) + unit[0][i] + s;</span>
<span class="line">        //s = p + unit[0][i] + s;</span>
<span class="line">    }</span>
<span class="line">    return head + s.replace(/(零.)*零元/, &#39;元&#39;).replace(/(零.)+/g, &#39;零&#39;).replace(/^整$/, &#39;零元整&#39;);</span>
<span class="line">} </span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4获取-设置url参数" tabindex="-1"><a class="header-anchor" href="#_5-4获取-设置url参数"><span>5-4获取，设置url参数</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//设置url参数</span>
<span class="line">//ecDo.setUrlPrmt({&#39;a&#39;:1,&#39;b&#39;:2})</span>
<span class="line">//result：a=1&amp;b=2</span>
<span class="line">setUrlPrmt: function (obj) {</span>
<span class="line">    let _rs = [];</span>
<span class="line">    for (let p in obj) {</span>
<span class="line">        if (obj[p] != null &amp;&amp; obj[p] != &#39;&#39;) {</span>
<span class="line">            _rs.push(p + &#39;=&#39; + obj[p])</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    return _rs.join(&#39;&amp;&#39;);</span>
<span class="line">},</span>
<span class="line">//获取url参数</span>
<span class="line">//ecDo.getUrlPrmt(&#39;test.com/write?draftId=122000011938&#39;)</span>
<span class="line">//result：Object{draftId: &quot;122000011938&quot;}</span>
<span class="line">getUrlPrmt: function (url) {</span>
<span class="line">    url = url ? url : window.location.href;</span>
<span class="line">    let _pa = url.substring(url.indexOf(&#39;?&#39;) + 1),</span>
<span class="line">        _arrS = _pa.split(&#39;&amp;&#39;),</span>
<span class="line">        _rs = {};</span>
<span class="line">    for (let i = 0, _len = _arrS.length; i &lt; _len; i++) {</span>
<span class="line">        let pos = _arrS[i].indexOf(&#39;=&#39;);</span>
<span class="line">        if (pos == -1) {</span>
<span class="line">            continue;</span>
<span class="line">        }</span>
<span class="line">        let name = _arrS[i].substring(0, pos),</span>
<span class="line">            value = window.decodeURIComponent(_arrS[i].substring(pos + 1));</span>
<span class="line">        _rs[name] = value;</span>
<span class="line">    }</span>
<span class="line">    return _rs;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5随机返回一个范围的数字" tabindex="-1"><a class="header-anchor" href="#_5-5随机返回一个范围的数字"><span>5-5随机返回一个范围的数字</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//ecDo.randomNumber(5,10)</span>
<span class="line">//返回5-10的随机整数，包括5，10</span>
<span class="line">//ecDo.randomNumber(10)</span>
<span class="line">//返回0-10的随机整数，包括0，10</span>
<span class="line">//ecDo.randomNumber()</span>
<span class="line">//返回0-255的随机整数，包括0，255</span>
<span class="line">randomNumber: function (n1, n2) {</span>
<span class="line">    if (arguments.length === 2) {</span>
<span class="line">        return Math.round(n1 + Math.random() * (n2 - n1));</span>
<span class="line">    }</span>
<span class="line">    else if (arguments.length === 1) {</span>
<span class="line">        return Math.round(Math.random() * n1)</span>
<span class="line">    }</span>
<span class="line">    else {</span>
<span class="line">        return Math.round(Math.random() * 255)</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-6随进产生颜色" tabindex="-1"><a class="header-anchor" href="#_5-6随进产生颜色"><span>5-6随进产生颜色</span></a></h3><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token function-variable function">randomColor</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">//randomNumber是下面定义的函数</span></span>
<span class="line">    <span class="token comment">//写法1</span></span>
<span class="line">    <span class="token comment">//return &#39;rgb(&#39; + this.randomNumber(255) + &#39;,&#39; + this.randomNumber(255) + &#39;,&#39; + this.randomNumber(255) + &#39;)&#39;;</span></span>
<span class="line">    <span class="token comment">//写法2</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token string">&#39;#&#39;</span> <span class="token operator">+</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">//写法3</span></span>
<span class="line">    <span class="token comment">//let color=&#39;#&#39;,_index=this.randomNumber(15);</span></span>
<span class="line">    <span class="token comment">//for(let i=0;i&lt;6;i++){</span></span>
<span class="line">    <span class="token comment">//color+=&#39;0123456789abcdef&#39;[_index];</span></span>
<span class="line">    <span class="token comment">//}</span></span>
<span class="line">    <span class="token comment">//return color;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">//这种写法，偶尔会有问题。大家得注意哦</span></span>
<span class="line"><span class="token comment">//Math.floor(Math.random()*0xffffff).toString(16);</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-7date日期时间部分" tabindex="-1"><a class="header-anchor" href="#_5-7date日期时间部分"><span>5-7Date日期时间部分</span></a></h3><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token comment">//到某一个时间的倒计时</span></span>
<span class="line"><span class="token comment">//ecDo.getEndTime(&#39;2017/7/22 16:0:0&#39;)</span></span>
<span class="line"><span class="token comment">//result：&quot;剩余时间6天 2小时 28 分钟20 秒&quot;</span></span>
<span class="line"><span class="token function-variable function">getEndTime</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">endTime</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> startDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//开始时间，当前时间</span></span>
<span class="line">    <span class="token keyword">let</span> endDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>endTime<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//结束时间，需传入时间参数</span></span>
<span class="line">    <span class="token keyword">let</span> t <span class="token operator">=</span> endDate<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> startDate<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//时间差的毫秒数</span></span>
<span class="line">    <span class="token keyword">let</span> d <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">        h <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">        m <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">        s <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>t <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        d <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>t <span class="token operator">/</span> <span class="token number">1000</span> <span class="token operator">/</span> <span class="token number">3600</span> <span class="token operator">/</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        h <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>t <span class="token operator">/</span> <span class="token number">1000</span> <span class="token operator">/</span> <span class="token number">60</span> <span class="token operator">/</span> <span class="token number">60</span> <span class="token operator">%</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        m <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>t <span class="token operator">/</span> <span class="token number">1000</span> <span class="token operator">/</span> <span class="token number">60</span> <span class="token operator">%</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        s <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>t <span class="token operator">/</span> <span class="token number">1000</span> <span class="token operator">%</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token string">&quot;剩余时间&quot;</span> <span class="token operator">+</span> d <span class="token operator">+</span> <span class="token string">&quot;天 &quot;</span> <span class="token operator">+</span> h <span class="token operator">+</span> <span class="token string">&quot;小时 &quot;</span> <span class="token operator">+</span> m <span class="token operator">+</span> <span class="token string">&quot; 分钟&quot;</span> <span class="token operator">+</span> s <span class="token operator">+</span> <span class="token string">&quot; 秒&quot;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-8适配rem" tabindex="-1"><a class="header-anchor" href="#_5-8适配rem"><span>5-8适配rem</span></a></h3><p>这个适配的方法很多，我就写我自己用的方法。大家也可以去我回答过得一个问题那里看更详细的说明！<a href="https://link.juejin.im/?target=https%3A%2F%2Fsegmentfault.com%2Fq%2F1010000010179208%2Fa-1020000010179558" target="_blank" rel="noopener noreferrer">移动端适配问题</a></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">getFontSize: function (_client) {</span>
<span class="line">    let doc = document,</span>
<span class="line">        win = window;</span>
<span class="line">    let docEl = doc.documentElement,</span>
<span class="line">        resizeEvt = &#39;orientationchange&#39; in window ? &#39;orientationchange&#39; : &#39;resize&#39;,</span>
<span class="line">        recalc = function () {</span>
<span class="line">            let clientWidth = docEl.clientWidth;</span>
<span class="line">            if (!clientWidth) return;</span>
<span class="line">            //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px</span>
<span class="line">            if (clientWidth &gt; _client) {</span>
<span class="line">                clientWidth = _client</span>
<span class="line">            }</span>
<span class="line">            //设置根元素font-size大小</span>
<span class="line">            docEl.style.fontSize = 100 * (clientWidth / _client) + &#39;px&#39;;</span>
<span class="line">        };</span>
<span class="line">    //屏幕大小改变，或者横竖屏切换时，触发函数</span>
<span class="line">    win.addEventListener(resizeEvt, recalc, false);</span>
<span class="line">    //文档加载完成时，触发函数</span>
<span class="line">    doc.addEventListener(&#39;DOMContentLoaded&#39;, recalc, false);</span>
<span class="line">}</span>
<span class="line">//ecDo.getFontSize(750)</span>
<span class="line">//使用方式很简单，比如效果图上，有张图片。宽高都是100px;</span>
<span class="line">//750是设计图的宽度</span>
<span class="line">//样式写法就是</span>
<span class="line">img{</span>
<span class="line">    width:1rem;</span>
<span class="line">    height:1rem;</span>
<span class="line">}</span>
<span class="line">//这样的设置，比如在屏幕宽度大于等于750px设备上，1rem=100px；图片显示就是宽高都是100px</span>
<span class="line">//比如在iphone6(屏幕宽度：375)上，375/750*100=50px;就是1rem=50px;图片显示就是宽高都是50px;</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-9ajax" tabindex="-1"><a class="header-anchor" href="#_5-9ajax"><span>5-9ajax</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/* 封装ajax函数</span>
<span class="line"> * @param {string}obj.type http连接的方式，包括POST和GET两种方式</span>
<span class="line"> * @param {string}obj.url 发送请求的url</span>
<span class="line"> * @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的</span>
<span class="line"> * @param {object}obj.data 发送的参数，格式为对象类型</span>
<span class="line"> * @param {function}obj.success ajax发送并接收成功调用的回调函数</span>
<span class="line"> * @param {function}obj.error ajax发送失败或者接收失败调用的回调函数</span>
<span class="line"> */</span>
<span class="line">//  ecDo.ajax({</span>
<span class="line">//      type:&#39;get&#39;,</span>
<span class="line">//      url:&#39;xxx&#39;,</span>
<span class="line">//      data:{</span>
<span class="line">//          id:&#39;111&#39;</span>
<span class="line">//      },</span>
<span class="line">//      success:function(res){</span>
<span class="line">//          console.log(res)</span>
<span class="line">//      }</span>
<span class="line">//  })</span>
<span class="line">ajax: function (obj) {</span>
<span class="line">    obj = obj || {};</span>
<span class="line">    obj.type = obj.type.toUpperCase() || &#39;POST&#39;;</span>
<span class="line">    obj.url = obj.url || &#39;&#39;;</span>
<span class="line">    obj.async = obj.async || true;</span>
<span class="line">    obj.data = obj.data || null;</span>
<span class="line">    obj.success = obj.success || function () {</span>
<span class="line">        };</span>
<span class="line">    obj.error = obj.error || function () {</span>
<span class="line">        };</span>
<span class="line">    let xmlHttp = null;</span>
<span class="line">    if (XMLHttpRequest) {</span>
<span class="line">        xmlHttp = new XMLHttpRequest();</span>
<span class="line">    } else {</span>
<span class="line">        xmlHttp = new ActiveXObject(&#39;Microsoft.XMLHTTP&#39;);</span>
<span class="line">    }</span>
<span class="line">    let params = [];</span>
<span class="line">    for (let key in obj.data) {</span>
<span class="line">        params.push(key + &#39;=&#39; + obj.data[key]);</span>
<span class="line">    }</span>
<span class="line">    let postData = params.join(&#39;&amp;&#39;);</span>
<span class="line">    if (obj.type.toUpperCase() === &#39;POST&#39;) {</span>
<span class="line">        xmlHttp.open(obj.type, obj.url, obj.async);</span>
<span class="line">        xmlHttp.setRequestHeader(&#39;Content-Type&#39;, &#39;application/x-www-form-urlencoded;charset=utf-8&#39;);</span>
<span class="line">        xmlHttp.send(postData);</span>
<span class="line">    } else if (obj.type.toUpperCase() === &#39;GET&#39;) {</span>
<span class="line">        xmlHttp.open(obj.type, obj.url + &#39;?&#39; + postData, obj.async);</span>
<span class="line">        xmlHttp.send(null);</span>
<span class="line">    }</span>
<span class="line">    xmlHttp.onreadystatechange = function () {</span>
<span class="line">        if (xmlHttp.readyState == 4 &amp;&amp; xmlHttp.status == 200) {</span>
<span class="line">            obj.success(xmlHttp.responseText);</span>
<span class="line">        } else {</span>
<span class="line">            obj.error(xmlHttp.responseText);</span>
<span class="line">        }</span>
<span class="line">    };</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-10图片懒加载" tabindex="-1"><a class="header-anchor" href="#_5-10图片懒加载"><span>5-10图片懒加载</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//图片没加载出来时用一张图片代替</span>
<span class="line">aftLoadImg: function (obj, url, errorUrl,cb) {</span>
<span class="line">    let oImg = new Image(), _this = this;</span>
<span class="line">    oImg.src = url;</span>
<span class="line">    oImg.onload = function () {</span>
<span class="line">        obj.src = oImg.src;</span>
<span class="line">        if (cb &amp;&amp; _this.istype(cb, &#39;function&#39;)) {</span>
<span class="line">            cb(obj);</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    oImg.onerror=function () {</span>
<span class="line">        obj.src=errorUrl;</span>
<span class="line">        if (cb &amp;&amp; _this.istype(cb, &#39;function&#39;)) {</span>
<span class="line">            cb(obj);</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">},</span>
<span class="line">//图片滚动懒加载</span>
<span class="line">//@className {string} 要遍历图片的类名</span>
<span class="line">//@num {number} 距离多少的时候开始加载 默认 0</span>
<span class="line">//比如，一张图片距离文档顶部3000，num参数设置200，那么在页面滚动到2800的时候，图片加载。不传num参数就滚动，num默认是0，页面滚动到3000就加载</span>
<span class="line">//html代码</span>
<span class="line">//&lt;p&gt;&lt;img data-src=&quot;https://user-gold-cdn.xitu.io/2017/12/7/160319f12631736f&quot; class=&quot;load-img&quot; width=&#39;528&#39; height=&#39;304&#39; /&gt;&lt;/p&gt;</span>
<span class="line">//&lt;p&gt;&lt;img data-src=&quot;https://user-gold-cdn.xitu.io/2017/12/7/160319f12631736f&quot; class=&quot;load-img&quot; width=&#39;528&#39; height=&#39;304&#39; /&gt;&lt;/p&gt;</span>
<span class="line">//&lt;p&gt;&lt;img data-src=&quot;https://user-gold-cdn.xitu.io/2017/12/7/160319f12631736f&quot; class=&quot;load-img&quot; width=&#39;528&#39; height=&#39;304&#39; /&gt;&lt;/p&gt;....</span>
<span class="line">//data-src储存src的数据，到需要加载的时候把data-src的值赋值给src属性，图片就会加载。</span>
<span class="line">//详细可以查看testLoadImg.html</span>
<span class="line">//window.onload = function() {</span>
<span class="line">//    loadImg(&#39;load-img&#39;,100);</span>
<span class="line">//    window.onscroll = function() {</span>
<span class="line">//        ecDo.loadImg(&#39;load-img&#39;,100);</span>
<span class="line">//        }</span>
<span class="line">//}</span>
<span class="line">loadImg: function (className, num, errorUrl) {</span>
<span class="line">    let _className = className || &#39;ec-load-img&#39;, _num = num || 0, _this = this,_errorUrl=errorUrl||null;</span>
<span class="line">    let oImgLoad = document.getElementsByClassName(_className);</span>
<span class="line">    for (let i = 0, len = oImgLoad.length; i &lt; len; i++) {</span>
<span class="line">        //如果图片已经滚动到指定的高度</span>
<span class="line">        if (document.documentElement.clientHeight + document.documentElement.scrollTop &gt; oImgLoad[i].offsetTop - _num &amp;&amp; !oImgLoad[i].isLoad) {</span>
<span class="line">            //记录图片是否已经加载</span>
<span class="line">            oImgLoad[i].isLoad = true;</span>
<span class="line">            //设置过渡，当图片下来的时候有一个图片透明度变化</span>
<span class="line">            oImgLoad[i].style.cssText = &quot;transition: &#39;&#39;; opacity: 0;&quot;</span>
<span class="line">            if (oImgLoad[i].dataset) {</span>
<span class="line">                this.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, _errorUrl, function (o) {</span>
<span class="line">                    //添加定时器，确保图片已经加载完了，再把图片指定的的class，清掉，避免重复编辑</span>
<span class="line">                    setTimeout(function () {</span>
<span class="line">                        if (o.isLoad) {</span>
<span class="line">                            _this.removeClass(o, _className);</span>
<span class="line">                            o.style.cssText = &quot;&quot;;</span>
<span class="line">                        }</span>
<span class="line">                    }, 1000)</span>
<span class="line">                });</span>
<span class="line">            } else {</span>
<span class="line">                this.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute(&quot;data-src&quot;), _errorUrl, function (o) {</span>
<span class="line">                    //添加定时器，确保图片已经加载完了，再把图片指定的的class，清掉，避免重复编辑</span>
<span class="line">                    setTimeout(function () {</span>
<span class="line">                        if (o.isLoad) {</span>
<span class="line">                            _this.removeClass(o, _className);</span>
<span class="line">                            o.style.cssText = &quot;&quot;;</span>
<span class="line">                        }</span>
<span class="line">                    }, 1000)</span>
<span class="line">                });</span>
<span class="line">            }</span>
<span class="line">            (function (i) {</span>
<span class="line">                setTimeout(function () {</span>
<span class="line">                    oImgLoad[i].style.cssText = &quot;transition:all 1s; opacity: 1;&quot;;</span>
<span class="line">                }, 16)</span>
<span class="line">            })(i);</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-11关键词加标签" tabindex="-1"><a class="header-anchor" href="#_5-11关键词加标签"><span>5-11关键词加标签</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//这两个函数多用于搜索的时候，关键词高亮</span>
<span class="line">//创建正则字符</span>
<span class="line">//ecDo.createKeyExp([前端，过来])</span>
<span class="line">//result:(前端|过来)/g</span>
<span class="line">createKeyExp: function (strArr) {</span>
<span class="line">    let str = &quot;&quot;;</span>
<span class="line">    for (let i = 0; i &lt; strArr.length; i++) {</span>
<span class="line">        if (i != strArr.length - 1) {</span>
<span class="line">            str = str + strArr[i] + &quot;|&quot;;</span>
<span class="line">        } else {</span>
<span class="line">            str = str + strArr[i];</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    return &quot;(&quot; + str + &quot;)&quot;;</span>
<span class="line">},</span>
<span class="line">//关键字加标签（多个关键词用空格隔开）</span>
<span class="line">//ecDo.findKey(&#39;守侯我oaks接到了来自下次你离开快乐吉祥留在开城侯&#39;,&#39;守侯 开&#39;,&#39;i&#39;)</span>
<span class="line">//&quot;&lt;i&gt;守侯&lt;/i&gt;我oaks接到了来自下次你离&lt;i&gt;开&lt;/i&gt;快乐吉祥留在&lt;i&gt;开&lt;/i&gt;城侯&quot;</span>
<span class="line">findKey: function (str, key, el) {</span>
<span class="line">    let arr = null,</span>
<span class="line">        regStr = null,</span>
<span class="line">        content = null,</span>
<span class="line">        Reg = null,</span>
<span class="line">        _el = el || &#39;span&#39;;</span>
<span class="line">    arr = key.split(/\\s+/);</span>
<span class="line">    //alert(regStr); //    如：(前端|过来)</span>
<span class="line">    regStr = this.createKeyExp(arr);</span>
<span class="line">    content = str;</span>
<span class="line">    //alert(Reg);//        /如：(前端|过来)/g</span>
<span class="line">    Reg = new RegExp(regStr, &quot;g&quot;);</span>
<span class="line">    //过滤html标签 替换标签，往关键字前后加上标签</span>
<span class="line">    content = content.replace(/&lt;\\/?[^&gt;]*&gt;/g, &#39;&#39;)</span>
<span class="line">    return content.replace(Reg, &quot;&lt;&quot; + _el + &quot;&gt;$1&lt;/&quot; + _el + &quot;&gt;&quot;);</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-12数据类型判断" tabindex="-1"><a class="header-anchor" href="#_5-12数据类型判断"><span>5-12数据类型判断</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//ecDo.istype([],&#39;array&#39;)</span>
<span class="line">//true</span>
<span class="line">//ecDo.istype([])</span>
<span class="line">//&#39;[object Array]&#39;</span>
<span class="line">istype: function (o, type) {</span>
<span class="line">    if (type) {</span>
<span class="line">        let _type = type.toLowerCase();</span>
<span class="line">    }</span>
<span class="line">    switch (_type) {</span>
<span class="line">        case &#39;string&#39;:</span>
<span class="line">            return Object.prototype.toString.call(o) === &#39;[object String]&#39;;</span>
<span class="line">        case &#39;number&#39;:</span>
<span class="line">            return Object.prototype.toString.call(o) === &#39;[object Number]&#39;;</span>
<span class="line">        case &#39;boolean&#39;:</span>
<span class="line">            return Object.prototype.toString.call(o) === &#39;[object Boolean]&#39;;</span>
<span class="line">        case &#39;undefined&#39;:</span>
<span class="line">            return Object.prototype.toString.call(o) === &#39;[object Undefined]&#39;;</span>
<span class="line">        case &#39;null&#39;:</span>
<span class="line">            return Object.prototype.toString.call(o) === &#39;[object Null]&#39;;</span>
<span class="line">        case &#39;function&#39;:</span>
<span class="line">            return Object.prototype.toString.call(o) === &#39;[object Function]&#39;;</span>
<span class="line">        case &#39;array&#39;:</span>
<span class="line">            return Object.prototype.toString.call(o) === &#39;[object Array]&#39;;</span>
<span class="line">        case &#39;object&#39;:</span>
<span class="line">            return Object.prototype.toString.call(o) === &#39;[object Object]&#39;;</span>
<span class="line">        case &#39;nan&#39;:</span>
<span class="line">            return isNaN(o);</span>
<span class="line">        case &#39;elements&#39;:</span>
<span class="line">            return Object.prototype.toString.call(o).indexOf(&#39;HTML&#39;) !== -1</span>
<span class="line">        default:</span>
<span class="line">            return Object.prototype.toString.call(o)</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-13手机类型判断" tabindex="-1"><a class="header-anchor" href="#_5-13手机类型判断"><span>5-13手机类型判断</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">browserInfo: function (type) {</span>
<span class="line">    switch (type) {</span>
<span class="line">        case &#39;android&#39;:</span>
<span class="line">            return navigator.userAgent.toLowerCase().indexOf(&#39;android&#39;) !== -1</span>
<span class="line">        case &#39;iphone&#39;:</span>
<span class="line">            return navigator.userAgent.toLowerCase().indexOf(&#39;iphone&#39;) !== -1</span>
<span class="line">        case &#39;ipad&#39;:</span>
<span class="line">            return navigator.userAgent.toLowerCase().indexOf(&#39;ipad&#39;) !== -1</span>
<span class="line">        case &#39;weixin&#39;:</span>
<span class="line">            return navigator.userAgent.toLowerCase().indexOf(&#39;micromessenger&#39;) !== -1</span>
<span class="line">        default:</span>
<span class="line">            return navigator.userAgent.toLowerCase()</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-14函数节流" tabindex="-1"><a class="header-anchor" href="#_5-14函数节流"><span>5-14函数节流</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//多用于鼠标滚动，移动，窗口大小改变等高频率触发事件</span>
<span class="line">// let count=0;</span>
<span class="line">// function fn1(){</span>
<span class="line">//     count++;</span>
<span class="line">//     console.log(count)</span>
<span class="line">// }</span>
<span class="line">// //100ms内连续触发的调用，后一个调用会把前一个调用的等待处理掉，但每隔200ms至少执行一次</span>
<span class="line">// document.onmousemove=ecDo.delayFn(fn1,100,200)</span>
<span class="line">delayFn: function (fn, delay, mustDelay) {</span>
<span class="line">    let timer = null;</span>
<span class="line">    let t_start;</span>
<span class="line">    return function () {</span>
<span class="line">        let context = this, args = arguments, t_cur = +new Date();</span>
<span class="line">        //先清理上一次的调用触发（上一次调用触发事件不执行）</span>
<span class="line">        clearTimeout(timer);</span>
<span class="line">        //如果不存触发时间，那么当前的时间就是触发时间</span>
<span class="line">        if (!t_start) {</span>
<span class="line">            t_start = t_cur;</span>
<span class="line">        }</span>
<span class="line">        //如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数</span>
<span class="line">        if (t_cur - t_start &gt;= mustDelay) {</span>
<span class="line">            fn.apply(context, args);</span>
<span class="line">            t_start = t_cur;</span>
<span class="line">        }</span>
<span class="line">        //否则延迟执行</span>
<span class="line">        else {</span>
<span class="line">            timer = setTimeout(function () {</span>
<span class="line">                fn.apply(context, args);</span>
<span class="line">            }, delay);</span>
<span class="line">        }</span>
<span class="line">    };</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-封装成形" tabindex="-1"><a class="header-anchor" href="#_6-封装成形"><span>6.封装成形</span></a></h2><blockquote><p>可能有小伙伴会有疑问，这样封装，调用有点麻烦，为什么不直接在原型上面封装，调用方便。比如下面的栗子！</p></blockquote><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">String.prototype.trim=function(type){</span>
<span class="line">    switch (type){</span>
<span class="line">        case 1:return this.replace(/\\s+/g,&quot;&quot;);</span>
<span class="line">        case 2:return this.replace(/(^\\s*)|(\\s*$)/g, &quot;&quot;);</span>
<span class="line">        case 3:return this.replace(/(^\\s*)/g, &quot;&quot;);</span>
<span class="line">        case 4:return this.replace(/(\\s*$)/g, &quot;&quot;);</span>
<span class="line">        default:return this;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line">//&#39;  12345 6 8 96  &#39;.trim(1)</span>
<span class="line">//&quot;123456896&quot;</span>
<span class="line">//比这样trim(&#39;  12345 6 8 96  &#39;,1)调用方便。</span>
<span class="line">//但是，这样是不推荐的做法，这样就污染了原生对象String,别人创建的String也会被污染，造成不必要的开销。</span>
<span class="line">//更可怕的是，万一自己命名的跟原生的方法重名了，就被覆盖原来的方法了</span>
<span class="line">//String.prototype.substr=function(){console.log(&#39;asdasd&#39;)}  </span>
<span class="line">//&#39;asdasdwe46546&#39;.substr()</span>
<span class="line">//asdasd </span>
<span class="line">//substr方法有什么作用，大家应该知道，不知道的可以去w3c看下</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以在原生对象原型的修改很不推荐！至少很多的公司禁止这样操作！</p><p>所以建议的封装姿势是</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let ecDo={</span>
<span class="line">    trim:function(){..},</span>
<span class="line">    changeCase:function(){..}...</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="_7-小结" tabindex="-1"><a class="header-anchor" href="#_7-小结"><span>7.小结</span></a></h2><p>这篇文章，写了很久了，几个小时了，因为我写这篇文章，我也是重新改我以前代码的，因为我以前写的代码，功能一样，代码比较多，现在是边想边改边写，还要自己测试（之前的代码for循环很多，现在有很多简洁的写法代替）。加上最近公司比较忙，所以这一篇文章也是花了几天才整理完成。 源码都放在github上了，大家想以后以后有什么修改或者增加的，欢迎大家来star一下<a href="https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FchenhuiYj%2Fec-do" target="_blank" rel="noopener noreferrer">ec-do</a>。 我自己封装这个，并不是我有造轮子的习惯，而是：</p><p>1，都是一些常用，但是零散的小实例，网上基本没有插件。</p><p>2，因为零散的小实例，涉及到的有字符串，数组，对象等类型，就算找到插件，在项目引入的很有可能不止一个插件。</p><p>3.都是简单的代码，封装也不难。维护也简单。</p><p>其他的不多说了，上面的只是我自己在开发中常用到，希望能帮到小伙伴们，最理想就是这篇文章能起到一个 <strong>抛砖引玉</strong> 的作用，就是说，如果觉得还有什么操作是常用的，或者觉得我哪里写得不好的，也欢迎指出，让大家相互帮助，相互学习。</p><p><a href="https://juejin.im/tag/JavaScript" target="_blank" rel="noopener noreferrer">JavaScript</a></p><p><a href="https://juejin.im/tag/%E5%89%8D%E7%AB%AF" target="_blank" rel="noopener noreferrer">前端</a></p><p><a href="https://juejin.im/tag/GitHub" target="_blank" rel="noopener noreferrer">GitHub</a></p><p><a href="https://juejin.im/tag/jQuery" target="_blank" rel="noopener noreferrer">jQuery</a></p>`,124)])])}const r=n(i,[["render",p]]),d=JSON.parse('{"path":"/cs-tips/frontend/others/lib-make.html","title":"编写自己的代码库（javascript常用实例的实现与封装）","lang":"zh-CN","frontmatter":{"description":"编写自己的代码库（javascript常用实例的实现与封装） 1.前言 大家在开发的时候应该知道，有很多常见的实例操作。比如数组去重，关键词高亮，打乱数组等。这些操作，代码一般不会很多，实现的逻辑也不会很难，下面的代码，我解释就不解释太多了，打上注释，相信大家就会懂了。但是，用的地方会比较，如果项目有哪个地方需要用，如果重复写的话，就是代码沉余，开发效...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"编写自己的代码库（javascript常用实例的实现与封装）\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/others/lib-make.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"编写自己的代码库（javascript常用实例的实现与封装）"}],["meta",{"property":"og:description","content":"编写自己的代码库（javascript常用实例的实现与封装） 1.前言 大家在开发的时候应该知道，有很多常见的实例操作。比如数组去重，关键词高亮，打乱数组等。这些操作，代码一般不会很多，实现的逻辑也不会很难，下面的代码，我解释就不解释太多了，打上注释，相信大家就会懂了。但是，用的地方会比较，如果项目有哪个地方需要用，如果重复写的话，就是代码沉余，开发效..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}]]},"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":22.56,"words":6767},"filePathRelative":"cs-tips/frontend/others/lib-make.md","autoDesc":true}');export{r as comp,d as data};
