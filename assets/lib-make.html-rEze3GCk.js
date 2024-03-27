import{_ as l,r as t,o as r,c as d,d as n,e,b as a,a as i}from"./app-BO2oONDQ.js";const c={},u=n("h1",{id:"编写自己的代码库-javascript常用实例的实现与封装",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#编写自己的代码库-javascript常用实例的实现与封装"},[n("span",null,"编写自己的代码库（javascript常用实例的实现与封装）")])],-1),o=n("h2",{id:"_1-前言",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-前言"},[n("span",null,"1.前言")])],-1),v={href:"https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FchenhuiYj%2Fec-do",target:"_blank",rel:"noopener noreferrer"},p={href:"https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FchenhuiYj%2Fec-do%2Fblob%2Fmaster%2Fsrc%2Fec-do-2.0.0.js",target:"_blank",rel:"noopener noreferrer"},m=n("p",null,"2.想看完整代码的，或者部分实例的demo，建议去github看！",-1),b=n("p",null,"3.下面的代码，都是封装在ecDo这个对象里面，如果里面有this，除了特别说明的，都是指向ecDo",-1),k=i(`<h2 id="_2-字符串操作" tabindex="-1"><a class="header-anchor" href="#_2-字符串操作"><span>2.字符串操作</span></a></h2><h3 id="_2-1去除字符串空格" tabindex="-1"><a class="header-anchor" href="#_2-1去除字符串空格"><span>2-1去除字符串空格</span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">//去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格</span>
<span class="token comment">//ecDo.trim(&#39;  1235asd&#39;,1)</span>
<span class="token comment">//result：1235asd</span>
<span class="token comment">//这个方法有原生的方案代替，但是考虑到有时候开发PC站需要兼容IE8，所以就还是继续保留</span>
<span class="token function-variable function">trim</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">str<span class="token punctuation">,</span> type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
            <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token char-set class-name">\\s</span><span class="token quantifier number">+</span></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
            <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token group punctuation">(</span><span class="token anchor function">^</span><span class="token char-set class-name">\\s</span><span class="token quantifier number">*</span><span class="token group punctuation">)</span><span class="token alternation keyword">|</span><span class="token group punctuation">(</span><span class="token char-set class-name">\\s</span><span class="token quantifier number">*</span><span class="token anchor function">$</span><span class="token group punctuation">)</span></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span>
            <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token group punctuation">(</span><span class="token anchor function">^</span><span class="token char-set class-name">\\s</span><span class="token quantifier number">*</span><span class="token group punctuation">)</span></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span>
            <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token group punctuation">(</span><span class="token char-set class-name">\\s</span><span class="token quantifier number">*</span><span class="token anchor function">$</span><span class="token group punctuation">)</span></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">return</span> str<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2字母大小写切换" tabindex="-1"><a class="header-anchor" href="#_2-2字母大小写切换"><span>2-2字母大小写切换</span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">/*type
 1:首字母大写
 2：首页母小写
 3：大小写转换
 4：全部大写
 5：全部小写
 * */</span>
<span class="token comment">//ecDo.changeCase(&#39;asdasd&#39;,1)</span>
<span class="token comment">//result：Asdasd</span>
<span class="token function-variable function">changeCase</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">str<span class="token punctuation">,</span> type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token function">ToggleCase</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> itemText <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>
        str<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>
            <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token anchor function">^</span><span class="token group punctuation">(</span><span class="token char-class"><span class="token char-class-punctuation punctuation">[</span><span class="token range">a<span class="token range-punctuation operator">-</span>z</span><span class="token char-class-punctuation punctuation">]</span></span><span class="token quantifier number">+</span><span class="token group punctuation">)</span></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    itemText <span class="token operator">+=</span> item<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token anchor function">^</span><span class="token group punctuation">(</span><span class="token char-class"><span class="token char-class-punctuation punctuation">[</span><span class="token range">A<span class="token range-punctuation operator">-</span>Z</span><span class="token char-class-punctuation punctuation">]</span></span><span class="token quantifier number">+</span><span class="token group punctuation">)</span></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    itemText <span class="token operator">+=</span> item<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    itemText <span class="token operator">+=</span> item<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> itemText<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
            <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token anchor function">\\b</span><span class="token char-set class-name">\\w</span><span class="token quantifier number">+</span><span class="token anchor function">\\b</span></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">word</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> word<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> word<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
            <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token anchor function">\\b</span><span class="token char-set class-name">\\w</span><span class="token quantifier number">+</span><span class="token anchor function">\\b</span></span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">word</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> word<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> word<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token function">ToggleCase</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span>
            <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token number">5</span><span class="token operator">:</span>
            <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">return</span> str<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3字符串循环复制" tabindex="-1"><a class="header-anchor" href="#_2-3字符串循环复制"><span>2-3字符串循环复制</span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">//repeatStr(str-&gt;字符串, count-&gt;次数)</span>
<span class="token comment">//ecDo.repeatStr(&#39;123&#39;,3)</span>
<span class="token comment">//&quot;result：123123123&quot;</span>
<span class="token function-variable function">repeatStr</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">str<span class="token punctuation">,</span> count</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> text <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> count<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        text <span class="token operator">+=</span> str<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> text<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4字符串替换" tabindex="-1"><a class="header-anchor" href="#_2-4字符串替换"><span>2-4字符串替换</span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">//ecDo.replaceAll(&#39;这里是上海，中国第三大城市，广东省省会，简称穗，&#39;,&#39;上海&#39;,&#39;广州&#39;)</span>
<span class="token comment">//result：&quot;这里是广州，中国第三大城市，广东省省会，简称穗，&quot;</span>
<span class="token function-variable function">replaceAll</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">str<span class="token punctuation">,</span> AFindText<span class="token punctuation">,</span> ARepText</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    raRegExp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span>AFindText<span class="token punctuation">,</span> <span class="token string">&quot;g&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>raRegExp<span class="token punctuation">,</span> ARepText<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5替换" tabindex="-1"><a class="header-anchor" href="#_2-5替换"><span>2-5替换*</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//字符替换*
//replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
//ecDo.replaceStr(&#39;18819322663&#39;,[3,5,3],0)
//result：188*****663
//ecDo.replaceStr(&#39;asdasdasdaa&#39;,[3,5,3],1)
//result：***asdas***
//ecDo.replaceStr(&#39;1asd88465asdwqe3&#39;,[5],0)
//result：*****8465asdwqe3
//ecDo.replaceStr(&#39;1asd88465asdwqe3&#39;,[5],1,&#39;+&#39;)
//result：&quot;1asd88465as+++++&quot;
replaceStr: function (str, regArr, type, ARepText) {
    let regtext = &#39;&#39;,
        Reg = null,
        replaceText = ARepText || &#39;*&#39;;
    //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
    if (regArr.length === 3 &amp;&amp; type === 0) {
        regtext = &#39;(\\\\w{&#39; + regArr[0] + &#39;})\\\\w{&#39; + regArr[1] + &#39;}(\\\\w{&#39; + regArr[2] + &#39;})&#39;
        Reg = new RegExp(regtext);
        let replaceCount = this.repeatStr(replaceText, regArr[1]);
        return str.replace(Reg, &#39;$1&#39; + replaceCount + &#39;$2&#39;)
    }
    else if (regArr.length === 3 &amp;&amp; type === 1) {
        regtext = &#39;\\\\w{&#39; + regArr[0] + &#39;}(\\\\w{&#39; + regArr[1] + &#39;})\\\\w{&#39; + regArr[2] + &#39;}&#39;
        Reg = new RegExp(regtext);
        let replaceCount1 = this.repeatStr(replaceText, regArr[0]);
        let replaceCount2 = this.repeatStr(replaceText, regArr[2]);
        return str.replace(Reg, replaceCount1 + &#39;$1&#39; + replaceCount2)
    }
    else if (regArr.length === 1 &amp;&amp; type === 0) {
        regtext = &#39;(^\\\\w{&#39; + regArr[0] + &#39;})&#39;
        Reg = new RegExp(regtext);
        let replaceCount = this.repeatStr(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
    else if (regArr.length === 1 &amp;&amp; type === 1) {
        regtext = &#39;(\\\\w{&#39; + regArr[0] + &#39;}$)&#39;
        Reg = new RegExp(regtext);
        let replaceCount = this.repeatStr(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-6检测字符串" tabindex="-1"><a class="header-anchor" href="#_2-6检测字符串"><span>2-6检测字符串</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//检测字符串
//ecDo.checkType(&#39;165226226326&#39;,&#39;phone&#39;)
//result：false
//大家可以根据需要扩展
checkType: function (str, type) {
    switch (type) {
        case &#39;email&#39;:
            return /^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$/.test(str);
        case &#39;phone&#39;:
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case &#39;tel&#39;:
            return /^(0\\d{2,3}-\\d{7,8})(-\\d{1,4})?$/.test(str);
        case &#39;number&#39;:
            return /^[0-9]$/.test(str);
        case &#39;english&#39;:
            return /^[a-zA-Z]+$/.test(str);
        case &#39;text&#39;:
            return /^\\w+$/.test(str);
        case &#39;chinese&#39;:
            return /^[\\u4E00-\\u9FA5]+$/.test(str);
        case &#39;lower&#39;:
            return /^[a-z]+$/.test(str);
        case &#39;upper&#39;:
            return /^[A-Z]+$/.test(str);
        default:
            return true;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-7-检测密码强度" tabindex="-1"><a class="header-anchor" href="#_2-7-检测密码强度"><span>2-7 检测密码强度</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//ecDo.checkPwd(&#39;12asdASAD&#39;)
//result：3(强度等级为3)
checkPwd: function (str) {
    let nowLv = 0;
    if (str.length &lt; 6) {
        return nowLv
    }
    if (/[0-9]/.test(str)) {
        nowLv++
    }
    if (/[a-z]/.test(str)) {
        nowLv++
    }
    if (/[A-Z]/.test(str)) {
        nowLv++
    }
    if (/[\\.|-|_]/.test(str)) {
        nowLv++
    }
    return nowLv;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-8随机码-tostring详解" tabindex="-1"><a class="header-anchor" href="#_2-8随机码-tostring详解"><span>2-8随机码（toString详解）</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//count取值范围0-36
//ecDo.randomWord(10)
//result：&quot;2584316588472575&quot;
//ecDo.randomWord(14)
//result：&quot;9b405070dd00122640c192caab84537&quot;
//ecDo.randomWord(36)
//result：&quot;83vhdx10rmjkyb9&quot;
randomWord: function (count) {
    return Math.random().toString(count).substring(2);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-9查找字符串" tabindex="-1"><a class="header-anchor" href="#_2-9查找字符串"><span>2-9查找字符串</span></a></h3><p>可能标题会有点误导，下面我就简单说明一个需求，在字符串<code>&#39;sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967&#39;</code>中找出&#39;blog&#39;的出现次数。代码如下</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//let strTest=&#39;sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967&#39;
//ecDo.countStr(strTest,&#39;blog&#39;)
//result：6
countStr: function (str, strSplit) {
    return str.split(strSplit).length - 1
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-10-过滤字符串" tabindex="-1"><a class="header-anchor" href="#_2-10-过滤字符串"><span>2-10 过滤字符串</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//过滤字符串(html标签，表情，特殊字符)
//字符串，替换内容（special-特殊字符,html-html标签,emjoy-emjoy表情,word-小写字母，WORD-大写字母，number-数字,chinese-中文），要替换成什么，默认&#39;&#39;,保留哪些特殊字符
//如果需要过滤多种字符，type参数使用,分割，如下栗子
//过滤字符串的html标签，大写字母，中文，特殊字符，全部替换成*,但是特殊字符&#39;%&#39;，&#39;?&#39;，除了这两个，其他特殊字符全部清除
//let str=&#39;asd    654a大蠢sasdasdASDQWEXZC6d5#%^*^&amp;*^%^&amp;*$\\\\&quot;\\&#39;#@!()*/-())_\\&#39;&quot;:&quot;{}?&lt;div&gt;&lt;/div&gt;&lt;img src=&quot;&quot;/&gt;啊实打实大蠢猪自行车这些课程&#39;;
// ecDo.filterStr(str,&#39;html,WORD,chinese,special&#39;,&#39;*&#39;,&#39;%?&#39;)
//result：&quot;asd    654a**sasdasd*********6d5#%^*^&amp;*^%^&amp;*$\\&quot;&#39;#@!()*/-())_&#39;&quot;:&quot;{}?*****************&quot;
filterStr: function (str, type, restr, spstr) {
    let typeArr = type.split(&#39;,&#39;), _str = str;
    for (let i = 0, len = typeArr.length; i &lt; len; i++) {
        //是否是过滤特殊符号
        if (typeArr[i] === &#39;special&#39;) {
            let pattern, regText = &#39;$()[]{}?\\|^*+./\\&quot;\\&#39;+&#39;;
            //是否有哪些特殊符号需要保留
            if (spstr) {
                let _spstr = spstr.split(&quot;&quot;), _regText = &quot;[^0-9A-Za-z\\\\s&quot;;
                for (let j = 0, len1 = _spstr.length; j &lt; len1; j++) {
                    if (regText.indexOf(_spstr[j]) === -1) {
                        _regText += _spstr[j];
                    }
                    else {
                        _regText += &#39;\\\\&#39; + _spstr[j];
                    }
                }
                _regText += &#39;]&#39;
                pattern = new RegExp(_regText, &#39;g&#39;);
            }
            else {
                pattern = new RegExp(&quot;[^0-9A-Za-z\\\\s]&quot;, &#39;g&#39;)
            }
        }
        let _restr = restr || &#39;&#39;;
        switch (typeArr[i]) {
            case &#39;special&#39;:
                _str = _str.replace(pattern, _restr);
                break;
            case &#39;html&#39;:
                _str = _str.replace(/&lt;\\/?[^&gt;]*&gt;/g, _restr);
                break;
            case &#39;emjoy&#39;:
                _str = _str.replace(/[^\\u4e00-\\u9fa5|\\u0000-\\u00ff|\\u3002|\\uFF1F|\\uFF01|\\uff0c|\\u3001|\\uff1b|\\uff1a|\\u3008-\\u300f|\\u2018|\\u2019|\\u201c|\\u201d|\\uff08|\\uff09|\\u2014|\\u2026|\\u2013|\\uff0e]/g, _restr);
                break;
            case &#39;word&#39;:
                _str = _str.replace(/[a-z]/g, _restr);
                break;
            case &#39;WORD&#39;:
                _str = _str.replace(/[A-Z]/g, _restr);
                break;
            case &#39;number&#39;:
                _str = _str.replace(/[0-9]/g, _restr);
                break;
            case &#39;chinese&#39;:
                _str = _str.replace(/[\\u4E00-\\u9FA5]/g, _restr);
                break;
        }
    }
    return _str;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-11格式化处理字符串" tabindex="-1"><a class="header-anchor" href="#_2-11格式化处理字符串"><span>2-11格式化处理字符串</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//ecDo.formatText(&#39;1234asda567asd890&#39;)
//result：&quot;12,34a,sda,567,asd,890&quot;
//ecDo.formatText(&#39;1234asda567asd890&#39;,4,&#39; &#39;)
//result：&quot;1 234a sda5 67as d890&quot;
//ecDo.formatText(&#39;1234asda567asd890&#39;,4,&#39;-&#39;)
//result：&quot;1-234a-sda5-67as-d890&quot;
formatText: function (str, size, delimiter) {
    let _size = size || 3, _delimiter = delimiter || &#39;,&#39;;
    let regText = &#39;\\\\B(?=(\\\\w{&#39; + _size + &#39;})+(?!\\\\w))&#39;;
    let reg = new RegExp(regText, &#39;g&#39;);
    return str.replace(reg, _delimiter);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-12找出最长单词" tabindex="-1"><a class="header-anchor" href="#_2-12找出最长单词"><span>2-12找出最长单词</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//ecDo.longestWord(&#39;Find the Longest word in a String&#39;)
//result：7
//ecDo.longestWord(&#39;Find|the|Longest|word|in|a|String&#39;,&#39;|&#39;)
//result：7
longestWord: function (str, splitType) {
    let _splitType = splitType || /\\s+/g,
        _max = 0,_item=&#39;&#39;;
    let strArr = str.split(_splitType);
    strArr.forEach(function (item) {
        if (_max &lt; item.length) {
            _max = item.length
            _item=item;
        }
    })
    return {el:_item,max:_max};
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-13句中单词首字母大写" tabindex="-1"><a class="header-anchor" href="#_2-13句中单词首字母大写"><span>2-13句中单词首字母大写</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//这个我也一直在纠结，英文标题，即使是首字母大写，也未必每一个单词的首字母都是大写的，但是又不知道哪些应该大写，哪些不应该大写
//ecDo.titleCaseUp(&#39;this is a title&#39;)
//&quot;This Is A Title&quot;
titleCaseUp: function (str, splitType) {
    let _splitType = splitType || /\\s+/g;
    let strArr = str.split(_splitType),
        result = &quot;&quot;, _this = this
    strArr.forEach(function (item) {
        result += _this.changeCase(item, 1) + &#39; &#39;;
    })
    return this.trim(result, 4)
}  

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-数组操作" tabindex="-1"><a class="header-anchor" href="#_3-数组操作"><span>3.数组操作</span></a></h2><h3 id="_3-1数组去重" tabindex="-1"><a class="header-anchor" href="#_3-1数组去重"><span>3-1数组去重</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>removeRepeatArray: function (arr) {
    return arr.filter(function (item, index, self) {
        return self.indexOf(item) === index;
    });
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2数组顺序打乱" tabindex="-1"><a class="header-anchor" href="#_3-2数组顺序打乱"><span>3-2数组顺序打乱</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>upsetArr: function (arr) {
    return arr.sort(function () {
        return Math.random() - 0.5
    });
},

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3数组最大值最小值" tabindex="-1"><a class="header-anchor" href="#_3-3数组最大值最小值"><span>3-3数组最大值最小值</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//数组最大值
maxArr: function (arr) {
    return Math.max.apply(null, arr);
},
//数组最小值
minArr: function (arr) {
    return Math.min.apply(null, arr);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4数组求和-平均值" tabindex="-1"><a class="header-anchor" href="#_3-4数组求和-平均值"><span>3-4数组求和，平均值</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//这一块的封装，主要是针对数字类型的数组
//求和
sumArr: function (arr) {
    return arr.reduce(function (pre, cur) {
        return pre + cur
    })
}
//数组平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活！
covArr: function (arr) {
    return this.sumArr(arr) / arr.length;
},

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5从数组中随机获取元素" tabindex="-1"><a class="header-anchor" href="#_3-5从数组中随机获取元素"><span>3-5从数组中随机获取元素</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//ecDo.randomOne([1,2,3,6,8,5,4,2,6])
//2
//ecDo.randomOne([1,2,3,6,8,5,4,2,6])
//8
//ecDo.randomOne([1,2,3,6,8,5,4,2,6])
//8
//ecDo.randomOne([1,2,3,6,8,5,4,2,6])
//1
randomOne: function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6返回数组-字符串-一个元素出现的次数" tabindex="-1"><a class="header-anchor" href="#_3-6返回数组-字符串-一个元素出现的次数"><span>3-6返回数组（字符串）一个元素出现的次数</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//ecDo.getEleCount(&#39;asd56+asdasdwqe&#39;,&#39;a&#39;)
//result：3
//ecDo.getEleCount([1,2,3,4,5,66,77,22,55,22],22)
//result：2
getEleCount: function (obj, ele) {
    let num = 0;
    for (let i = 0, len = obj.length; i &lt; len; i++) {
        if (ele === obj[i]) {
            num++;
        }
    }
    return num;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-7返回数组-字符串-出现最多的几次元素和出现次数" tabindex="-1"><a class="header-anchor" href="#_3-7返回数组-字符串-出现最多的几次元素和出现次数"><span>3-7返回数组（字符串）出现最多的几次元素和出现次数</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//arr, rank-&gt;长度，默认为数组长度，ranktype，排序方式，默认降序
//返回值：el-&gt;元素，count-&gt;次数
//ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2])
//默认情况，返回所有元素出现的次数
//result：[{&quot;el&quot;:&quot;2&quot;,&quot;count&quot;:6},{&quot;el&quot;:&quot;1&quot;,&quot;count&quot;:4},{&quot;el&quot;:&quot;3&quot;,&quot;count&quot;:2},{&quot;el&quot;:&quot;4&quot;,&quot;count&quot;:1},{&quot;el&quot;:&quot;5&quot;,&quot;count&quot;:1},{&quot;el&quot;:&quot;6&quot;,&quot;count&quot;:1}]
//ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3)
//传参（rank=3），只返回出现次数排序前三的
//result：[{&quot;el&quot;:&quot;2&quot;,&quot;count&quot;:6},{&quot;el&quot;:&quot;1&quot;,&quot;count&quot;:4},{&quot;el&quot;:&quot;3&quot;,&quot;count&quot;:2}]
//ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],null,1)
//传参（ranktype=1,rank=null），升序返回所有元素出现次数
//result：[{&quot;el&quot;:&quot;6&quot;,&quot;count&quot;:1},{&quot;el&quot;:&quot;5&quot;,&quot;count&quot;:1},{&quot;el&quot;:&quot;4&quot;,&quot;count&quot;:1},{&quot;el&quot;:&quot;3&quot;,&quot;count&quot;:2},{&quot;el&quot;:&quot;1&quot;,&quot;count&quot;:4},{&quot;el&quot;:&quot;2&quot;,&quot;count&quot;:6}]
//ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3,1)
//传参（rank=3，ranktype=1），只返回出现次数排序（升序）前三的
//result：[{&quot;el&quot;:&quot;6&quot;,&quot;count&quot;:1},{&quot;el&quot;:&quot;5&quot;,&quot;count&quot;:1},{&quot;el&quot;:&quot;4&quot;,&quot;count&quot;:1}]
getCount: function (arr, rank, ranktype) {
    let obj = {},
        k, arr1 = []
    //记录每一元素出现的次数
    for (let i = 0, len = arr.length; i &lt; len; i++) {
        k = arr[i];
        if (obj[k]) {
            obj[k]++;
        } else {
            obj[k] = 1;
        }
    }
    //保存结果{el-&#39;元素&#39;，count-出现次数}
    for (let o in obj) {
        arr1.push({el: o, count: obj[o]});
    }
    //排序（降序）
    arr1.sort(function (n1, n2) {
        return n2.count - n1.count
    });
    //如果ranktype为1，则为升序，反转数组
    if (ranktype === 1) {
        arr1 = arr1.reverse();
    }
    let rank1 = rank || arr1.length;
    return arr1.slice(0, rank1);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-8得到n1-n2下标的数组" tabindex="-1"><a class="header-anchor" href="#_3-8得到n1-n2下标的数组"><span>3-8得到n1-n2下标的数组</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//ecDo.getArrayNum([0,1,2,3,4,5,6,7,8,9],5,9)
//result：[5, 6, 7, 8, 9]
//getArrayNum([0,1,2,3,4,5,6,7,8,9],2) //不传第二个参数,默认返回从n1到数组结束的元素
//result：[2, 3, 4, 5, 6, 7, 8, 9]
getArrayNum: function (arr, n1, n2) {
    return arr.slice(n1, n2);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-9筛选数组" tabindex="-1"><a class="header-anchor" href="#_3-9筛选数组"><span>3-9筛选数组</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//删除值为&#39;val&#39;的数组元素
//ecDo.removeArrayForValue([&#39;test&#39;,&#39;test1&#39;,&#39;test2&#39;,&#39;test&#39;,&#39;aaa&#39;],&#39;test&#39;,&#39;)
//result：[&quot;aaa&quot;]   带有&#39;test&#39;的都删除
//ecDo.removeArrayForValue([&#39;test&#39;,&#39;test1&#39;,&#39;test2&#39;,&#39;test&#39;,&#39;aaa&#39;],&#39;test&#39;)
//result：[&quot;test1&quot;, &quot;test2&quot;, &quot;aaa&quot;]  //数组元素的值全等于&#39;test&#39;才被删除
removeArrayForValue: function (arr, val, type) {
    return arr.filter(function (item) {
        return type ? item.indexOf(val) === -1 : item !== val
    })
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-10-获取对象数组某些项" tabindex="-1"><a class="header-anchor" href="#_3-10-获取对象数组某些项"><span>3-10 获取对象数组某些项</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
//ecDo.getOptionArray(arr,&#39;a,c&#39;)
//result：[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]
//ecDo.getOptionArray(arr,&#39;b&#39;)
//result：[2, 3, 9, 2, 5]
getOptionArray: function (arr, keys) {
    let newArr = []
    if (!keys) {
        return arr
    }
    let _keys = keys.split(&#39;,&#39;), newArrOne = {};
    //是否只是需要获取某一项的值
    if (_keys.length === 1) {
        for (let i = 0, len = arr.length; i &lt; len; i++) {
            newArr.push(arr[i][keys])
        }
        return newArr;
    }
    for (let i = 0, len = arr.length; i &lt; len; i++) {
        newArrOne = {};
        for (let j = 0, len1 = _keys.length; j &lt; len1; j++) {
            newArrOne[_keys[j]] = arr[i][_keys[j]]
        }
        newArr.push(newArrOne);
    }
    return newArr
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-11-排除对象数组某些项" tabindex="-1"><a class="header-anchor" href="#_3-11-排除对象数组某些项"><span>3-11 排除对象数组某些项</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
//ecDo.filterOptionArray(arr,&#39;a&#39;)
//result：[{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]
//ecDo.filterOptionArray(arr,&#39;a,c&#39;)
//result：[{b:2},{b:3},{b:9},{b:2},{b:5}]
filterOptionArray: function (arr, keys) {
    let newArr = []
    let _keys = keys.split(&#39;,&#39;), newArrOne = {};
    for (let i = 0, len = arr.length; i &lt; len; i++) {
        newArrOne = {};
        for (let key in arr[i]) {
            //如果key不存在排除keys里面,添加数据
            if (_keys.indexOf(key) === -1) {
                newArrOne[key] = arr[i][key];
            }
        }
        newArr.push(newArrOne);
    }
    return newArr
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-12-对象数组排序" tabindex="-1"><a class="header-anchor" href="#_3-12-对象数组排序"><span>3-12 对象数组排序</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
//ecDo.arraySort(arr,&#39;a,b&#39;)a是第一排序条件，b是第二排序条件
//result：[{&quot;a&quot;:1,&quot;b&quot;:2,&quot;c&quot;:9},{&quot;a&quot;:2,&quot;b&quot;:3,&quot;c&quot;:5},{&quot;a&quot;:4,&quot;b&quot;:2,&quot;c&quot;:5},{&quot;a&quot;:4,&quot;b&quot;:5,&quot;c&quot;:7},{&quot;a&quot;:5,&quot;b&quot;:9}]
arraySort: function (arr, sortText) {
    if (!sortText) {
        return arr
    }
    let _sortText = sortText.split(&#39;,&#39;).reverse(), _arr = arr.slice(0);
    for (let i = 0, len = _sortText.length; i &lt; len; i++) {
        _arr.sort(function (n1, n2) {
            return n1[_sortText[i]] - n2[_sortText[i]]
        })
    }
    return _arr;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-13-数组扁平化" tabindex="-1"><a class="header-anchor" href="#_3-13-数组扁平化"><span>3-13 数组扁平化</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//ecDo.steamroller([1,2,[4,5,[1,23]]])
//[1, 2, 4, 5, 1, 23]
steamroller: function (arr) {
    let newArr = [],_this=this;
    for (let i = 0; i &lt; arr.length; i++) {
        if (Array.isArray(arr[i])) {
            // 如果是数组，调用(递归)steamroller 将其扁平化
            // 然后再 push 到 newArr 中
            newArr.push.apply(newArr, _this.steamroller(arr[i]));
        } else {
            // 不是数组直接 push 到 newArr 中
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-基础dom操作" tabindex="-1"><a class="header-anchor" href="#_4-基础dom操作"><span>4.基础DOM操作</span></a></h2><p>这个部分代码其实参考jquery的一些函数写法，唯一区别就是调用不用，参数一样. 比如下面的栗子</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//设置对象内容
jquery：$(&#39;#xxx&#39;).html(&#39;hello world&#39;);
现在：ecDo.html(document.getElementById(&#39;xxx&#39;),&#39;hello world&#39;)
//获取对象内容
jquery：$(&#39;#xxx&#39;).html();
现在：ecDo.html(document.getElementById(&#39;xxx&#39;))

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-1检测对象是否有哪个类名" tabindex="-1"><a class="header-anchor" href="#_4-1检测对象是否有哪个类名"><span>4-1检测对象是否有哪个类名</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//检测对象是否有哪个类名
hasClass: function (obj, classStr) {
    if (obj.className &amp;&amp; this.trim(obj.className, 1) !== &quot;&quot;) {
        let arr = obj.className.split(/\\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
        return (arr.indexOf(classStr) == -1) ? false : true;
    }
    else {
        return false;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-添加类名" tabindex="-1"><a class="header-anchor" href="#_4-2-添加类名"><span>4-2 添加类名</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>addClass: function (obj, classStr) {
    if ((this.istype(obj, &#39;array&#39;) || this.istype(obj, &#39;elements&#39;)) &amp;&amp; obj.length &gt;= 1) {
        for (let i = 0, len = obj.length; i &lt; len; i++) {
            if (!this.hasClass(obj[i], classStr)) {
                obj[i].className += &quot; &quot; + classStr;
            }
        }
    }
    else {
        if (!this.hasClass(obj, classStr)) {
            obj.className += &quot; &quot; + classStr;
        }
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3删除类名" tabindex="-1"><a class="header-anchor" href="#_4-3删除类名"><span>4-3删除类名</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>removeClass: function (obj, classStr) {
    if ((this.istype(obj, &#39;array&#39;) || this.istype(obj, &#39;elements&#39;)) &amp;&amp; obj.length &gt; 1) {
        for (let i = 0, len = obj.length; i &lt; len; i++) {
            if (this.hasClass(obj[i], classStr)) {
                let reg = new RegExp(&#39;(\\\\s|^)&#39; + classStr + &#39;(\\\\s|$)&#39;);
                obj[i].className = obj[i].className.replace(reg, &#39;&#39;);
            }
        }
    }
    else {
        if (this.hasClass(obj, classStr)) {
            let reg = new RegExp(&#39;(\\\\s|^)&#39; + classStr + &#39;(\\\\s|$)&#39;);
            obj.className = obj.className.replace(reg, &#39;&#39;);
        }
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4替换类名-被替换的类名-替换的类名" tabindex="-1"><a class="header-anchor" href="#_4-4替换类名-被替换的类名-替换的类名"><span>4-4替换类名(&quot;被替换的类名&quot;,&quot;替换的类名&quot;)</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>replaceClass: function (obj, newName, oldName) {
    this.removeClass(obj, oldName);
    this.addClass(obj, newName);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-5获取兄弟节点" tabindex="-1"><a class="header-anchor" href="#_4-5获取兄弟节点"><span>4-5获取兄弟节点</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//ecDo.siblings(obj,&#39;#id&#39;)
siblings: function (obj, opt) {
    let a = []; //定义一个数组，用来存o的兄弟元素
    let p = obj.previousSibling;
    while (p) { //先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling
        if (p.nodeType === 1) {
            a.push(p);
        }
        p = p.previousSibling //最后把上一个节点赋给p
    }
    a.reverse() //把顺序反转一下 这样元素的顺序就是按先后的了
    let n = obj.nextSibling; //再取o的弟弟
    while (n) { //判断有没有下一个弟弟结点 n是nextSibling的意思
        if (n.nodeType === 1) {
            a.push(n);
        }
        n = n.nextSibling;
    }
    if (opt) {
        let _opt = opt.substr(1);
        let b = [];//定义一个数组，用于储存过滤a的数组
        if (opt[0] === &#39;.&#39;) {
            b = a.filter(function (item) {
                return item.className === _opt
            });
        }
        else if (opt[0] === &#39;#&#39;) {
            b = a.filter(function (item) {
                return item.id === _opt
            });
        }
        else {
            b = a.filter(function (item) {
                return item.tagName.toLowerCase() === opt
            });
        }
        return b;
    }
    return a;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-6设置样式" tabindex="-1"><a class="header-anchor" href="#_4-6设置样式"><span>4-6设置样式</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>css: function (obj, json) {
    for (let attr in json) {
        obj.style[attr] = json[attr];
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-7设置文本内容" tabindex="-1"><a class="header-anchor" href="#_4-7设置文本内容"><span>4-7设置文本内容</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>html: function (obj) {
    if (arguments.length === 1) {
        return obj.innerHTML;
    } else if (arguments.length === 2) {
        obj.innerHTML = arguments[1];
    }
}
text: function (obj) {
    if (arguments.length === 1) {
        return obj.innerHTML;
    } else if (arguments.length === 2) {
        obj.innerHTML = this.filterStr(arguments[1],&#39;html&#39;);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-8显示隐藏" tabindex="-1"><a class="header-anchor" href="#_4-8显示隐藏"><span>4-8显示隐藏</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>show: function (obj) {
    let blockArr=[&#39;div&#39;,&#39;li&#39;,&#39;ul&#39;,&#39;ol&#39;,&#39;dl&#39;,&#39;table&#39;,&#39;article&#39;,&#39;h1&#39;,&#39;h2&#39;,&#39;h3&#39;,&#39;h4&#39;,&#39;h5&#39;,&#39;h6&#39;,&#39;p&#39;,&#39;hr&#39;,&#39;header&#39;,&#39;footer&#39;,&#39;details&#39;,&#39;summary&#39;,&#39;section&#39;,&#39;aside&#39;,&#39;&#39;]
    if(blockArr.indexOf(obj.tagName.toLocaleLowerCase())===-1){
        obj.style.display =&#39;inline&#39;;
    }
    else{
        obj.style.display =&#39;block&#39;;
    }
},
hide: function (obj) {
    obj.style.display = &quot;none&quot;;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-其他操作" tabindex="-1"><a class="header-anchor" href="#_5-其他操作"><span>5.其他操作</span></a></h2><h3 id="_5-1cookie" tabindex="-1"><a class="header-anchor" href="#_5-1cookie"><span>5-1cookie</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//cookie
//设置cookie
setCookie: function (name, value, iDay) {
    let oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + &#39;=&#39; + value + &#39;;expires=&#39; + oDate;
},
//获取cookie
getCookie: function (name) {
    let arr = document.cookie.split(&#39;; &#39;);
    for (let i = 0; i &lt; arr.length; i++) {
        let arr2 = arr[i].split(&#39;=&#39;);
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return &#39;&#39;;
},
//删除cookie
removeCookie: function (name) {
    this.setCookie(name, 1, -1);
},

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2清除对象中值为空的属性" tabindex="-1"><a class="header-anchor" href="#_5-2清除对象中值为空的属性"><span>5-2清除对象中值为空的属性</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//ecDo.filterParams({a:&quot;&quot;,b:null,c:&quot;010&quot;,d:123})
//Object {c: &quot;010&quot;, d: 123}
filterParams: function (obj) {
    let _newPar = {};
    for (let key in obj) {
        if ((obj[key] === 0 ||obj[key] === false|| obj[key]) &amp;&amp; obj[key].toString().replace(/(^\\s*)|(\\s*$)/g, &#39;&#39;) !== &#39;&#39;) {
            _newPar[key] = obj[key];
        }
    }
    return _newPar;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3现金额大写转换函数" tabindex="-1"><a class="header-anchor" href="#_5-3现金额大写转换函数"><span>5-3现金额大写转换函数</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//ecDo.upDigit(168752632)
//result：&quot;人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整&quot;
//ecDo.upDigit(1682)
//result：&quot;人民币壹仟陆佰捌拾贰元整&quot;
//ecDo.upDigit(-1693)
//result：&quot;欠人民币壹仟陆佰玖拾叁元整&quot;
upDigit: function (n) {
    let fraction = [&#39;角&#39;, &#39;分&#39;, &#39;厘&#39;];
    let digit = [&#39;零&#39;, &#39;壹&#39;, &#39;贰&#39;, &#39;叁&#39;, &#39;肆&#39;, &#39;伍&#39;, &#39;陆&#39;, &#39;柒&#39;, &#39;捌&#39;, &#39;玖&#39;];
    let unit = [
        [&#39;元&#39;, &#39;万&#39;, &#39;亿&#39;],
        [&#39;&#39;, &#39;拾&#39;, &#39;佰&#39;, &#39;仟&#39;]
    ];
    let head = n &lt; 0 ? &#39;欠人民币&#39; : &#39;人民币&#39;;
    n = Math.abs(n);
    let s = &#39;&#39;;
    for (let i = 0; i &lt; fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, &#39;&#39;);
    }
    s = s || &#39;整&#39;;
    n = Math.floor(n);
    for (let i = 0; i &lt; unit[0].length &amp;&amp; n &gt; 0; i++) {
        let p = &#39;&#39;;
        for (let j = 0; j &lt; unit[1].length &amp;&amp; n &gt; 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, &#39;&#39;).replace(/^$/, &#39;零&#39;) + unit[0][i] + s;
        //s = p + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, &#39;元&#39;).replace(/(零.)+/g, &#39;零&#39;).replace(/^整$/, &#39;零元整&#39;);
} 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4获取-设置url参数" tabindex="-1"><a class="header-anchor" href="#_5-4获取-设置url参数"><span>5-4获取，设置url参数</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//设置url参数
//ecDo.setUrlPrmt({&#39;a&#39;:1,&#39;b&#39;:2})
//result：a=1&amp;b=2
setUrlPrmt: function (obj) {
    let _rs = [];
    for (let p in obj) {
        if (obj[p] != null &amp;&amp; obj[p] != &#39;&#39;) {
            _rs.push(p + &#39;=&#39; + obj[p])
        }
    }
    return _rs.join(&#39;&amp;&#39;);
},
//获取url参数
//ecDo.getUrlPrmt(&#39;test.com/write?draftId=122000011938&#39;)
//result：Object{draftId: &quot;122000011938&quot;}
getUrlPrmt: function (url) {
    url = url ? url : window.location.href;
    let _pa = url.substring(url.indexOf(&#39;?&#39;) + 1),
        _arrS = _pa.split(&#39;&amp;&#39;),
        _rs = {};
    for (let i = 0, _len = _arrS.length; i &lt; _len; i++) {
        let pos = _arrS[i].indexOf(&#39;=&#39;);
        if (pos == -1) {
            continue;
        }
        let name = _arrS[i].substring(0, pos),
            value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
    }
    return _rs;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5随机返回一个范围的数字" tabindex="-1"><a class="header-anchor" href="#_5-5随机返回一个范围的数字"><span>5-5随机返回一个范围的数字</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//ecDo.randomNumber(5,10)
//返回5-10的随机整数，包括5，10
//ecDo.randomNumber(10)
//返回0-10的随机整数，包括0，10
//ecDo.randomNumber()
//返回0-255的随机整数，包括0，255
randomNumber: function (n1, n2) {
    if (arguments.length === 2) {
        return Math.round(n1 + Math.random() * (n2 - n1));
    }
    else if (arguments.length === 1) {
        return Math.round(Math.random() * n1)
    }
    else {
        return Math.round(Math.random() * 255)
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-6随进产生颜色" tabindex="-1"><a class="header-anchor" href="#_5-6随进产生颜色"><span>5-6随进产生颜色</span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token function-variable function">randomColor</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//randomNumber是下面定义的函数</span>
    <span class="token comment">//写法1</span>
    <span class="token comment">//return &#39;rgb(&#39; + this.randomNumber(255) + &#39;,&#39; + this.randomNumber(255) + &#39;,&#39; + this.randomNumber(255) + &#39;)&#39;;</span>
    <span class="token comment">//写法2</span>
    <span class="token keyword">return</span> <span class="token string">&#39;#&#39;</span> <span class="token operator">+</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//写法3</span>
    <span class="token comment">//let color=&#39;#&#39;,_index=this.randomNumber(15);</span>
    <span class="token comment">//for(let i=0;i&lt;6;i++){</span>
    <span class="token comment">//color+=&#39;0123456789abcdef&#39;[_index];</span>
    <span class="token comment">//}</span>
    <span class="token comment">//return color;</span>
<span class="token punctuation">}</span>
<span class="token comment">//这种写法，偶尔会有问题。大家得注意哦</span>
<span class="token comment">//Math.floor(Math.random()*0xffffff).toString(16);</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-7date日期时间部分" tabindex="-1"><a class="header-anchor" href="#_5-7date日期时间部分"><span>5-7Date日期时间部分</span></a></h3><div class="language-javascript line-numbers-mode" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token comment">//到某一个时间的倒计时</span>
<span class="token comment">//ecDo.getEndTime(&#39;2017/7/22 16:0:0&#39;)</span>
<span class="token comment">//result：&quot;剩余时间6天 2小时 28 分钟20 秒&quot;</span>
<span class="token function-variable function">getEndTime</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">endTime</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> startDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//开始时间，当前时间</span>
    <span class="token keyword">let</span> endDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>endTime<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//结束时间，需传入时间参数</span>
    <span class="token keyword">let</span> t <span class="token operator">=</span> endDate<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> startDate<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//时间差的毫秒数</span>
    <span class="token keyword">let</span> d <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
        h <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
        m <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span>
        s <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>t <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        d <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>t <span class="token operator">/</span> <span class="token number">1000</span> <span class="token operator">/</span> <span class="token number">3600</span> <span class="token operator">/</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        h <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>t <span class="token operator">/</span> <span class="token number">1000</span> <span class="token operator">/</span> <span class="token number">60</span> <span class="token operator">/</span> <span class="token number">60</span> <span class="token operator">%</span> <span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        m <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>t <span class="token operator">/</span> <span class="token number">1000</span> <span class="token operator">/</span> <span class="token number">60</span> <span class="token operator">%</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        s <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>t <span class="token operator">/</span> <span class="token number">1000</span> <span class="token operator">%</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token string">&quot;剩余时间&quot;</span> <span class="token operator">+</span> d <span class="token operator">+</span> <span class="token string">&quot;天 &quot;</span> <span class="token operator">+</span> h <span class="token operator">+</span> <span class="token string">&quot;小时 &quot;</span> <span class="token operator">+</span> m <span class="token operator">+</span> <span class="token string">&quot; 分钟&quot;</span> <span class="token operator">+</span> s <span class="token operator">+</span> <span class="token string">&quot; 秒&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-8适配rem" tabindex="-1"><a class="header-anchor" href="#_5-8适配rem"><span>5-8适配rem</span></a></h3>`,90),g={href:"https://link.juejin.im/?target=https%3A%2F%2Fsegmentfault.com%2Fq%2F1010000010179208%2Fa-1020000010179558",target:"_blank",rel:"noopener noreferrer"},h=i(`<div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>getFontSize: function (_client) {
    let doc = document,
        win = window;
    let docEl = doc.documentElement,
        resizeEvt = &#39;orientationchange&#39; in window ? &#39;orientationchange&#39; : &#39;resize&#39;,
        recalc = function () {
            let clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
            if (clientWidth &gt; _client) {
                clientWidth = _client
            }
            //设置根元素font-size大小
            docEl.style.fontSize = 100 * (clientWidth / _client) + &#39;px&#39;;
        };
    //屏幕大小改变，或者横竖屏切换时，触发函数
    win.addEventListener(resizeEvt, recalc, false);
    //文档加载完成时，触发函数
    doc.addEventListener(&#39;DOMContentLoaded&#39;, recalc, false);
}
//ecDo.getFontSize(750)
//使用方式很简单，比如效果图上，有张图片。宽高都是100px;
//750是设计图的宽度
//样式写法就是
img{
    width:1rem;
    height:1rem;
}
//这样的设置，比如在屏幕宽度大于等于750px设备上，1rem=100px；图片显示就是宽高都是100px
//比如在iphone6(屏幕宽度：375)上，375/750*100=50px;就是1rem=50px;图片显示就是宽高都是50px;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-9ajax" tabindex="-1"><a class="header-anchor" href="#_5-9ajax"><span>5-9ajax</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>/* 封装ajax函数
 * @param {string}obj.type http连接的方式，包括POST和GET两种方式
 * @param {string}obj.url 发送请求的url
 * @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}obj.data 发送的参数，格式为对象类型
 * @param {function}obj.success ajax发送并接收成功调用的回调函数
 * @param {function}obj.error ajax发送失败或者接收失败调用的回调函数
 */
//  ecDo.ajax({
//      type:&#39;get&#39;,
//      url:&#39;xxx&#39;,
//      data:{
//          id:&#39;111&#39;
//      },
//      success:function(res){
//          console.log(res)
//      }
//  })
ajax: function (obj) {
    obj = obj || {};
    obj.type = obj.type.toUpperCase() || &#39;POST&#39;;
    obj.url = obj.url || &#39;&#39;;
    obj.async = obj.async || true;
    obj.data = obj.data || null;
    obj.success = obj.success || function () {
        };
    obj.error = obj.error || function () {
        };
    let xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject(&#39;Microsoft.XMLHTTP&#39;);
    }
    let params = [];
    for (let key in obj.data) {
        params.push(key + &#39;=&#39; + obj.data[key]);
    }
    let postData = params.join(&#39;&amp;&#39;);
    if (obj.type.toUpperCase() === &#39;POST&#39;) {
        xmlHttp.open(obj.type, obj.url, obj.async);
        xmlHttp.setRequestHeader(&#39;Content-Type&#39;, &#39;application/x-www-form-urlencoded;charset=utf-8&#39;);
        xmlHttp.send(postData);
    } else if (obj.type.toUpperCase() === &#39;GET&#39;) {
        xmlHttp.open(obj.type, obj.url + &#39;?&#39; + postData, obj.async);
        xmlHttp.send(null);
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 &amp;&amp; xmlHttp.status == 200) {
            obj.success(xmlHttp.responseText);
        } else {
            obj.error(xmlHttp.responseText);
        }
    };
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-10图片懒加载" tabindex="-1"><a class="header-anchor" href="#_5-10图片懒加载"><span>5-10图片懒加载</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//图片没加载出来时用一张图片代替
aftLoadImg: function (obj, url, errorUrl,cb) {
    let oImg = new Image(), _this = this;
    oImg.src = url;
    oImg.onload = function () {
        obj.src = oImg.src;
        if (cb &amp;&amp; _this.istype(cb, &#39;function&#39;)) {
            cb(obj);
        }
    }
    oImg.onerror=function () {
        obj.src=errorUrl;
        if (cb &amp;&amp; _this.istype(cb, &#39;function&#39;)) {
            cb(obj);
        }
    }
},
//图片滚动懒加载
//@className {string} 要遍历图片的类名
//@num {number} 距离多少的时候开始加载 默认 0
//比如，一张图片距离文档顶部3000，num参数设置200，那么在页面滚动到2800的时候，图片加载。不传num参数就滚动，num默认是0，页面滚动到3000就加载
//html代码
//&lt;p&gt;&lt;img data-src=&quot;https://user-gold-cdn.xitu.io/2017/12/7/160319f12631736f&quot; class=&quot;load-img&quot; width=&#39;528&#39; height=&#39;304&#39; /&gt;&lt;/p&gt;
//&lt;p&gt;&lt;img data-src=&quot;https://user-gold-cdn.xitu.io/2017/12/7/160319f12631736f&quot; class=&quot;load-img&quot; width=&#39;528&#39; height=&#39;304&#39; /&gt;&lt;/p&gt;
//&lt;p&gt;&lt;img data-src=&quot;https://user-gold-cdn.xitu.io/2017/12/7/160319f12631736f&quot; class=&quot;load-img&quot; width=&#39;528&#39; height=&#39;304&#39; /&gt;&lt;/p&gt;....
//data-src储存src的数据，到需要加载的时候把data-src的值赋值给src属性，图片就会加载。
//详细可以查看testLoadImg.html
//window.onload = function() {
//    loadImg(&#39;load-img&#39;,100);
//    window.onscroll = function() {
//        ecDo.loadImg(&#39;load-img&#39;,100);
//        }
//}
loadImg: function (className, num, errorUrl) {
    let _className = className || &#39;ec-load-img&#39;, _num = num || 0, _this = this,_errorUrl=errorUrl||null;
    let oImgLoad = document.getElementsByClassName(_className);
    for (let i = 0, len = oImgLoad.length; i &lt; len; i++) {
        //如果图片已经滚动到指定的高度
        if (document.documentElement.clientHeight + document.documentElement.scrollTop &gt; oImgLoad[i].offsetTop - _num &amp;&amp; !oImgLoad[i].isLoad) {
            //记录图片是否已经加载
            oImgLoad[i].isLoad = true;
            //设置过渡，当图片下来的时候有一个图片透明度变化
            oImgLoad[i].style.cssText = &quot;transition: &#39;&#39;; opacity: 0;&quot;
            if (oImgLoad[i].dataset) {
                this.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, _errorUrl, function (o) {
                    //添加定时器，确保图片已经加载完了，再把图片指定的的class，清掉，避免重复编辑
                    setTimeout(function () {
                        if (o.isLoad) {
                            _this.removeClass(o, _className);
                            o.style.cssText = &quot;&quot;;
                        }
                    }, 1000)
                });
            } else {
                this.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute(&quot;data-src&quot;), _errorUrl, function (o) {
                    //添加定时器，确保图片已经加载完了，再把图片指定的的class，清掉，避免重复编辑
                    setTimeout(function () {
                        if (o.isLoad) {
                            _this.removeClass(o, _className);
                            o.style.cssText = &quot;&quot;;
                        }
                    }, 1000)
                });
            }
            (function (i) {
                setTimeout(function () {
                    oImgLoad[i].style.cssText = &quot;transition:all 1s; opacity: 1;&quot;;
                }, 16)
            })(i);
        }
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-11关键词加标签" tabindex="-1"><a class="header-anchor" href="#_5-11关键词加标签"><span>5-11关键词加标签</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//这两个函数多用于搜索的时候，关键词高亮
//创建正则字符
//ecDo.createKeyExp([前端，过来])
//result:(前端|过来)/g
createKeyExp: function (strArr) {
    let str = &quot;&quot;;
    for (let i = 0; i &lt; strArr.length; i++) {
        if (i != strArr.length - 1) {
            str = str + strArr[i] + &quot;|&quot;;
        } else {
            str = str + strArr[i];
        }
    }
    return &quot;(&quot; + str + &quot;)&quot;;
},
//关键字加标签（多个关键词用空格隔开）
//ecDo.findKey(&#39;守侯我oaks接到了来自下次你离开快乐吉祥留在开城侯&#39;,&#39;守侯 开&#39;,&#39;i&#39;)
//&quot;&lt;i&gt;守侯&lt;/i&gt;我oaks接到了来自下次你离&lt;i&gt;开&lt;/i&gt;快乐吉祥留在&lt;i&gt;开&lt;/i&gt;城侯&quot;
findKey: function (str, key, el) {
    let arr = null,
        regStr = null,
        content = null,
        Reg = null,
        _el = el || &#39;span&#39;;
    arr = key.split(/\\s+/);
    //alert(regStr); //    如：(前端|过来)
    regStr = this.createKeyExp(arr);
    content = str;
    //alert(Reg);//        /如：(前端|过来)/g
    Reg = new RegExp(regStr, &quot;g&quot;);
    //过滤html标签 替换标签，往关键字前后加上标签
    content = content.replace(/&lt;\\/?[^&gt;]*&gt;/g, &#39;&#39;)
    return content.replace(Reg, &quot;&lt;&quot; + _el + &quot;&gt;$1&lt;/&quot; + _el + &quot;&gt;&quot;);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-12数据类型判断" tabindex="-1"><a class="header-anchor" href="#_5-12数据类型判断"><span>5-12数据类型判断</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//ecDo.istype([],&#39;array&#39;)
//true
//ecDo.istype([])
//&#39;[object Array]&#39;
istype: function (o, type) {
    if (type) {
        let _type = type.toLowerCase();
    }
    switch (_type) {
        case &#39;string&#39;:
            return Object.prototype.toString.call(o) === &#39;[object String]&#39;;
        case &#39;number&#39;:
            return Object.prototype.toString.call(o) === &#39;[object Number]&#39;;
        case &#39;boolean&#39;:
            return Object.prototype.toString.call(o) === &#39;[object Boolean]&#39;;
        case &#39;undefined&#39;:
            return Object.prototype.toString.call(o) === &#39;[object Undefined]&#39;;
        case &#39;null&#39;:
            return Object.prototype.toString.call(o) === &#39;[object Null]&#39;;
        case &#39;function&#39;:
            return Object.prototype.toString.call(o) === &#39;[object Function]&#39;;
        case &#39;array&#39;:
            return Object.prototype.toString.call(o) === &#39;[object Array]&#39;;
        case &#39;object&#39;:
            return Object.prototype.toString.call(o) === &#39;[object Object]&#39;;
        case &#39;nan&#39;:
            return isNaN(o);
        case &#39;elements&#39;:
            return Object.prototype.toString.call(o).indexOf(&#39;HTML&#39;) !== -1
        default:
            return Object.prototype.toString.call(o)
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-13手机类型判断" tabindex="-1"><a class="header-anchor" href="#_5-13手机类型判断"><span>5-13手机类型判断</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>browserInfo: function (type) {
    switch (type) {
        case &#39;android&#39;:
            return navigator.userAgent.toLowerCase().indexOf(&#39;android&#39;) !== -1
        case &#39;iphone&#39;:
            return navigator.userAgent.toLowerCase().indexOf(&#39;iphone&#39;) !== -1
        case &#39;ipad&#39;:
            return navigator.userAgent.toLowerCase().indexOf(&#39;ipad&#39;) !== -1
        case &#39;weixin&#39;:
            return navigator.userAgent.toLowerCase().indexOf(&#39;micromessenger&#39;) !== -1
        default:
            return navigator.userAgent.toLowerCase()
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-14函数节流" tabindex="-1"><a class="header-anchor" href="#_5-14函数节流"><span>5-14函数节流</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>//多用于鼠标滚动，移动，窗口大小改变等高频率触发事件
// let count=0;
// function fn1(){
//     count++;
//     console.log(count)
// }
// //100ms内连续触发的调用，后一个调用会把前一个调用的等待处理掉，但每隔200ms至少执行一次
// document.onmousemove=ecDo.delayFn(fn1,100,200)
delayFn: function (fn, delay, mustDelay) {
    let timer = null;
    let t_start;
    return function () {
        let context = this, args = arguments, t_cur = +new Date();
        //先清理上一次的调用触发（上一次调用触发事件不执行）
        clearTimeout(timer);
        //如果不存触发时间，那么当前的时间就是触发时间
        if (!t_start) {
            t_start = t_cur;
        }
        //如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数
        if (t_cur - t_start &gt;= mustDelay) {
            fn.apply(context, args);
            t_start = t_cur;
        }
        //否则延迟执行
        else {
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        }
    };
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-封装成形" tabindex="-1"><a class="header-anchor" href="#_6-封装成形"><span>6.封装成形</span></a></h2><blockquote><p>可能有小伙伴会有疑问，这样封装，调用有点麻烦，为什么不直接在原型上面封装，调用方便。比如下面的栗子！</p></blockquote><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String.prototype.trim=function(type){
    switch (type){
        case 1:return this.replace(/\\s+/g,&quot;&quot;);
        case 2:return this.replace(/(^\\s*)|(\\s*$)/g, &quot;&quot;);
        case 3:return this.replace(/(^\\s*)/g, &quot;&quot;);
        case 4:return this.replace(/(\\s*$)/g, &quot;&quot;);
        default:return this;
    }
}
//&#39;  12345 6 8 96  &#39;.trim(1)
//&quot;123456896&quot;
//比这样trim(&#39;  12345 6 8 96  &#39;,1)调用方便。
//但是，这样是不推荐的做法，这样就污染了原生对象String,别人创建的String也会被污染，造成不必要的开销。
//更可怕的是，万一自己命名的跟原生的方法重名了，就被覆盖原来的方法了
//String.prototype.substr=function(){console.log(&#39;asdasd&#39;)}  
//&#39;asdasdwe46546&#39;.substr()
//asdasd 
//substr方法有什么作用，大家应该知道，不知道的可以去w3c看下

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以在原生对象原型的修改很不推荐！至少很多的公司禁止这样操作！</p><p>所以建议的封装姿势是</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>let ecDo={
    trim:function(){..},
    changeCase:function(){..}...
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-小结" tabindex="-1"><a class="header-anchor" href="#_7-小结"><span>7.小结</span></a></h2>`,20),x={href:"https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FchenhuiYj%2Fec-do",target:"_blank",rel:"noopener noreferrer"},f=n("p",null,"1，都是一些常用，但是零散的小实例，网上基本没有插件。",-1),_=n("p",null,"2，因为零散的小实例，涉及到的有字符串，数组，对象等类型，就算找到插件，在项目引入的很有可能不止一个插件。",-1),q=n("p",null,"3.都是简单的代码，封装也不难。维护也简单。",-1),y=n("p",null,[e("其他的不多说了，上面的只是我自己在开发中常用到，希望能帮到小伙伴们，最理想就是这篇文章能起到一个 "),n("strong",null,"抛砖引玉"),e(" 的作用，就是说，如果觉得还有什么操作是常用的，或者觉得我哪里写得不好的，也欢迎指出，让大家相互帮助，相互学习。")],-1),j={href:"https://juejin.im/tag/JavaScript",target:"_blank",rel:"noopener noreferrer"},w={href:"https://juejin.im/tag/%E5%89%8D%E7%AB%AF",target:"_blank",rel:"noopener noreferrer"},A={href:"https://juejin.im/tag/GitHub",target:"_blank",rel:"noopener noreferrer"},D={href:"https://juejin.im/tag/jQuery",target:"_blank",rel:"noopener noreferrer"};function T(S,C){const s=t("ExternalLinkIcon");return r(),d("div",null,[u,o,n("p",null,[e("大家在开发的时候应该知道，有很多常见的实例操作。比如数组去重，关键词高亮，打乱数组等。这些操作，代码一般不会很多，实现的逻辑也不会很难，下面的代码，我解释就不解释太多了，打上注释，相信大家就会懂了。但是，用的地方会比较，如果项目有哪个地方需要用，如果重复写的话，就是代码沉余，开发效率也不用，复用基本就是复制粘贴！这样是一个很不好的习惯，大家可以考虑一下把一些常见的操作封装成函数，调用的时候，直接调用就好！ 源码都放在github上了，大家想以后以后有什么修改或者增加的，欢迎大家来star一下"),n("a",v,[e("ec-do"),a(s)]),e("。")]),n("blockquote",null,[n("p",null,[e("1.下面代码，我放的是es5版本的，如果大家需要看es6版本的，请移步"),n("a",p,[e("ec-do2.0.0.js"),a(s)])]),m,b]),k,n("p",null,[e("这个适配的方法很多，我就写我自己用的方法。大家也可以去我回答过得一个问题那里看更详细的说明！"),n("a",g,[e("移动端适配问题"),a(s)])]),h,n("p",null,[e("这篇文章，写了很久了，几个小时了，因为我写这篇文章，我也是重新改我以前代码的，因为我以前写的代码，功能一样，代码比较多，现在是边想边改边写，还要自己测试（之前的代码for循环很多，现在有很多简洁的写法代替）。加上最近公司比较忙，所以这一篇文章也是花了几天才整理完成。 源码都放在github上了，大家想以后以后有什么修改或者增加的，欢迎大家来star一下"),n("a",x,[e("ec-do"),a(s)]),e("。 我自己封装这个，并不是我有造轮子的习惯，而是：")]),f,_,q,y,n("p",null,[n("a",j,[e("JavaScript"),a(s)])]),n("p",null,[n("a",w,[e("前端"),a(s)])]),n("p",null,[n("a",A,[e("GitHub"),a(s)])]),n("p",null,[n("a",D,[e("jQuery"),a(s)])])])}const L=l(c,[["render",T],["__file","lib-make.html.vue"]]),E=JSON.parse('{"path":"/cs-tips/frontend/others/lib-make.html","title":"编写自己的代码库（javascript常用实例的实现与封装）","lang":"zh-CN","frontmatter":{"description":"编写自己的代码库（javascript常用实例的实现与封装） 1.前言 大家在开发的时候应该知道，有很多常见的实例操作。比如数组去重，关键词高亮，打乱数组等。这些操作，代码一般不会很多，实现的逻辑也不会很难，下面的代码，我解释就不解释太多了，打上注释，相信大家就会懂了。但是，用的地方会比较，如果项目有哪个地方需要用，如果重复写的话，就是代码沉余，开发效...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/others/lib-make.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"编写自己的代码库（javascript常用实例的实现与封装）"}],["meta",{"property":"og:description","content":"编写自己的代码库（javascript常用实例的实现与封装） 1.前言 大家在开发的时候应该知道，有很多常见的实例操作。比如数组去重，关键词高亮，打乱数组等。这些操作，代码一般不会很多，实现的逻辑也不会很难，下面的代码，我解释就不解释太多了，打上注释，相信大家就会懂了。但是，用的地方会比较，如果项目有哪个地方需要用，如果重复写的话，就是代码沉余，开发效..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"编写自己的代码库（javascript常用实例的实现与封装）\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"1.前言","slug":"_1-前言","link":"#_1-前言","children":[]},{"level":2,"title":"2.字符串操作","slug":"_2-字符串操作","link":"#_2-字符串操作","children":[{"level":3,"title":"2-1去除字符串空格","slug":"_2-1去除字符串空格","link":"#_2-1去除字符串空格","children":[]},{"level":3,"title":"2-2字母大小写切换","slug":"_2-2字母大小写切换","link":"#_2-2字母大小写切换","children":[]},{"level":3,"title":"2-3字符串循环复制","slug":"_2-3字符串循环复制","link":"#_2-3字符串循环复制","children":[]},{"level":3,"title":"2-4字符串替换","slug":"_2-4字符串替换","link":"#_2-4字符串替换","children":[]},{"level":3,"title":"2-5替换*","slug":"_2-5替换","link":"#_2-5替换","children":[]},{"level":3,"title":"2-6检测字符串","slug":"_2-6检测字符串","link":"#_2-6检测字符串","children":[]},{"level":3,"title":"2-7 检测密码强度","slug":"_2-7-检测密码强度","link":"#_2-7-检测密码强度","children":[]},{"level":3,"title":"2-8随机码（toString详解）","slug":"_2-8随机码-tostring详解","link":"#_2-8随机码-tostring详解","children":[]},{"level":3,"title":"2-9查找字符串","slug":"_2-9查找字符串","link":"#_2-9查找字符串","children":[]},{"level":3,"title":"2-10 过滤字符串","slug":"_2-10-过滤字符串","link":"#_2-10-过滤字符串","children":[]},{"level":3,"title":"2-11格式化处理字符串","slug":"_2-11格式化处理字符串","link":"#_2-11格式化处理字符串","children":[]},{"level":3,"title":"2-12找出最长单词","slug":"_2-12找出最长单词","link":"#_2-12找出最长单词","children":[]},{"level":3,"title":"2-13句中单词首字母大写","slug":"_2-13句中单词首字母大写","link":"#_2-13句中单词首字母大写","children":[]}]},{"level":2,"title":"3.数组操作","slug":"_3-数组操作","link":"#_3-数组操作","children":[{"level":3,"title":"3-1数组去重","slug":"_3-1数组去重","link":"#_3-1数组去重","children":[]},{"level":3,"title":"3-2数组顺序打乱","slug":"_3-2数组顺序打乱","link":"#_3-2数组顺序打乱","children":[]},{"level":3,"title":"3-3数组最大值最小值","slug":"_3-3数组最大值最小值","link":"#_3-3数组最大值最小值","children":[]},{"level":3,"title":"3-4数组求和，平均值","slug":"_3-4数组求和-平均值","link":"#_3-4数组求和-平均值","children":[]},{"level":3,"title":"3-5从数组中随机获取元素","slug":"_3-5从数组中随机获取元素","link":"#_3-5从数组中随机获取元素","children":[]},{"level":3,"title":"3-6返回数组（字符串）一个元素出现的次数","slug":"_3-6返回数组-字符串-一个元素出现的次数","link":"#_3-6返回数组-字符串-一个元素出现的次数","children":[]},{"level":3,"title":"3-7返回数组（字符串）出现最多的几次元素和出现次数","slug":"_3-7返回数组-字符串-出现最多的几次元素和出现次数","link":"#_3-7返回数组-字符串-出现最多的几次元素和出现次数","children":[]},{"level":3,"title":"3-8得到n1-n2下标的数组","slug":"_3-8得到n1-n2下标的数组","link":"#_3-8得到n1-n2下标的数组","children":[]},{"level":3,"title":"3-9筛选数组","slug":"_3-9筛选数组","link":"#_3-9筛选数组","children":[]},{"level":3,"title":"3-10 获取对象数组某些项","slug":"_3-10-获取对象数组某些项","link":"#_3-10-获取对象数组某些项","children":[]},{"level":3,"title":"3-11 排除对象数组某些项","slug":"_3-11-排除对象数组某些项","link":"#_3-11-排除对象数组某些项","children":[]},{"level":3,"title":"3-12 对象数组排序","slug":"_3-12-对象数组排序","link":"#_3-12-对象数组排序","children":[]},{"level":3,"title":"3-13 数组扁平化","slug":"_3-13-数组扁平化","link":"#_3-13-数组扁平化","children":[]}]},{"level":2,"title":"4.基础DOM操作","slug":"_4-基础dom操作","link":"#_4-基础dom操作","children":[{"level":3,"title":"4-1检测对象是否有哪个类名","slug":"_4-1检测对象是否有哪个类名","link":"#_4-1检测对象是否有哪个类名","children":[]},{"level":3,"title":"4-2 添加类名","slug":"_4-2-添加类名","link":"#_4-2-添加类名","children":[]},{"level":3,"title":"4-3删除类名","slug":"_4-3删除类名","link":"#_4-3删除类名","children":[]},{"level":3,"title":"4-4替换类名(\\"被替换的类名\\",\\"替换的类名\\")","slug":"_4-4替换类名-被替换的类名-替换的类名","link":"#_4-4替换类名-被替换的类名-替换的类名","children":[]},{"level":3,"title":"4-5获取兄弟节点","slug":"_4-5获取兄弟节点","link":"#_4-5获取兄弟节点","children":[]},{"level":3,"title":"4-6设置样式","slug":"_4-6设置样式","link":"#_4-6设置样式","children":[]},{"level":3,"title":"4-7设置文本内容","slug":"_4-7设置文本内容","link":"#_4-7设置文本内容","children":[]},{"level":3,"title":"4-8显示隐藏","slug":"_4-8显示隐藏","link":"#_4-8显示隐藏","children":[]}]},{"level":2,"title":"5.其他操作","slug":"_5-其他操作","link":"#_5-其他操作","children":[{"level":3,"title":"5-1cookie","slug":"_5-1cookie","link":"#_5-1cookie","children":[]},{"level":3,"title":"5-2清除对象中值为空的属性","slug":"_5-2清除对象中值为空的属性","link":"#_5-2清除对象中值为空的属性","children":[]},{"level":3,"title":"5-3现金额大写转换函数","slug":"_5-3现金额大写转换函数","link":"#_5-3现金额大写转换函数","children":[]},{"level":3,"title":"5-4获取，设置url参数","slug":"_5-4获取-设置url参数","link":"#_5-4获取-设置url参数","children":[]},{"level":3,"title":"5-5随机返回一个范围的数字","slug":"_5-5随机返回一个范围的数字","link":"#_5-5随机返回一个范围的数字","children":[]},{"level":3,"title":"5-6随进产生颜色","slug":"_5-6随进产生颜色","link":"#_5-6随进产生颜色","children":[]},{"level":3,"title":"5-7Date日期时间部分","slug":"_5-7date日期时间部分","link":"#_5-7date日期时间部分","children":[]},{"level":3,"title":"5-8适配rem","slug":"_5-8适配rem","link":"#_5-8适配rem","children":[]},{"level":3,"title":"5-9ajax","slug":"_5-9ajax","link":"#_5-9ajax","children":[]},{"level":3,"title":"5-10图片懒加载","slug":"_5-10图片懒加载","link":"#_5-10图片懒加载","children":[]},{"level":3,"title":"5-11关键词加标签","slug":"_5-11关键词加标签","link":"#_5-11关键词加标签","children":[]},{"level":3,"title":"5-12数据类型判断","slug":"_5-12数据类型判断","link":"#_5-12数据类型判断","children":[]},{"level":3,"title":"5-13手机类型判断","slug":"_5-13手机类型判断","link":"#_5-13手机类型判断","children":[]},{"level":3,"title":"5-14函数节流","slug":"_5-14函数节流","link":"#_5-14函数节流","children":[]}]},{"level":2,"title":"6.封装成形","slug":"_6-封装成形","link":"#_6-封装成形","children":[]},{"level":2,"title":"7.小结","slug":"_7-小结","link":"#_7-小结","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":22.56,"words":6767},"filePathRelative":"cs-tips/frontend/others/lib-make.md","localizedDate":"2023年5月25日","autoDesc":true}');export{L as comp,E as data};
