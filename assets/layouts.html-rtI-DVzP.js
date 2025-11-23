import{_ as n,c as a,a as l,o as i}from"./app-B6vXTniy.js";const e={};function t(p,s){return i(),a("div",null,[...s[0]||(s[0]=[l(`<h1 id="前端布局" tabindex="-1"><a class="header-anchor" href="#前端布局"><span>前端布局</span></a></h1><p>前端布局非常重要的一环就是页面框架的搭建，也是最基础的一环。在页面框架的搭建之中，又有居中布局、多列布局以及全局布局，今天我们就来总结总结前端干货中的CSS布局。</p><h2 id="居中布局" tabindex="-1"><a class="header-anchor" href="#居中布局"><span>居中布局</span></a></h2><h3 id="水平居中" tabindex="-1"><a class="header-anchor" href="#水平居中"><span>水平居中</span></a></h3><p>1）使用inline-block+text-align （1）原理、用法</p><ul><li>原理：先将子框由块级元素改变为行内块元素，再通过设置行内块元素居中以达到水平居中。</li><li>用法：对子框设置display:inline-block，对父框设置text-align:center。</li></ul><p>（2）代码实例</p><div class="language-html" data-highlighter="prismjs" data-ext="html"><pre><code class="language-html"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    &lt;div class=&quot;child&gt;DEMO<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">.child{</span>
<span class="line">    display:inline-block;</span>
<span class="line">}</span>
<span class="line">.parent{</span>
<span class="line">    text-align:center;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>（3）优缺点</p><ul><li>优点:兼容性好，甚至可以兼容ie6、ie7</li><li>缺点:child里的文字也会水平居中，可以在.child添加text-align:left;还原</li></ul><p>2）使用table+margin （1）原理、用法</p><ul><li>原理：先将子框设置为块级表格来显示（类似</li><li>用法：对子框设置display:table，再设置margin:0 auto。</li></ul><p>（2）代码实例</p><div class="language-html" data-highlighter="prismjs" data-ext="html"><pre><code class="language-html"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    &lt;div class=&quot;child&gt;DEMO<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">.child {</span>
<span class="line">    display:table;</span>
<span class="line">    margin:0 auto;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>（3）优缺点：</p><ul><li>优点：只设置了child，ie8以上都支持</li><li>缺点：不支持ie6、ie7,将div换成table</li></ul><p>3）使用absolute+transform （1）原理、用法</p><ul><li>原理：将子框设置为绝对定位，移动子框，使子框左侧距离相对框左侧边框的距离为相对框宽度的一半，再通过向左移动子框的一半宽度以达到水平居中。当然，在此之前，我们需要设置父框为相对定位，使父框成为子框的相对框。</li><li>用法：对父框设置position:relative，对子框设置position:absolute，left:50%，transform:translateX(-50%)。</li></ul><p>（2）代码实例</p><div class="language-html" data-highlighter="prismjs" data-ext="html"><pre><code class="language-html"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    &lt;div class=&quot;child&gt;DEMO<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">.parent {</span>
<span class="line">    position:relative;</span>
<span class="line">}</span>
<span class="line">.child {</span>
<span class="line">    position:absolute;</span>
<span class="line">    left:50%;</span>
<span class="line">    transform:translateX(-50%);</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>（3）优缺点</p><ul><li>优点:居中元素不会对其他的产生影响</li><li>缺点:transform属于css3内容，兼容性存在一定问题，高版本浏览器需要添加一些前缀</li></ul><p>4）使用flex+margin （1）原理、用法</p><ul><li>原理：通过CSS3中的布局利器flex将子框转换为flex item，再设置子框居中以达到居中。</li><li>用法：先将父框设置为display:flex，再设置子框margin:0 auto。</li></ul><p>（2）代码实例</p><div class="language-html" data-highlighter="prismjs" data-ext="html"><pre><code class="language-html"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    &lt;div class=&quot;child&gt;DEMO<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">.parent {</span>
<span class="line">    display:flex;</span>
<span class="line">}</span>
<span class="line">.child {</span>
<span class="line">    margin:0 auto;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>（3）优缺点</p><ul><li>缺点:低版本浏览器(ie6 ie7 ie8)不支持</li></ul><p>5）使用flex+justify-content （1）原理、用法</p><ul><li>原理：通过CSS3中的布局利器flex中的justify-content属性来达到水平居中。</li><li>用法：先将父框设置为display:flex，再设置justify-content:center。</li></ul><p>（2）代码实例</p><div class="language-html" data-highlighter="prismjs" data-ext="html"><pre><code class="language-html"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    &lt;div class=&quot;child&gt;DEMO<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">.parent {</span>
<span class="line">    display:flex;</span>
<span class="line">    justify-content:center;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>（3）优缺点</p><ul><li>优点:设置parent即可</li><li>缺点:低版本浏览器(ie6 ie7 ie8)不支持</li></ul><h3 id="垂直居中" tabindex="-1"><a class="header-anchor" href="#垂直居中"><span>垂直居中</span></a></h3><p>1）使用table-cell+vertical-align （1）原理、用法</p><ul><li>原理：通过将父框转化为一个表格单元格显示（类似 和 ），再通过设置属性，使表格单元格内容垂直居中以达到垂直居中。</li><li>用法：先将父框设置为display:table-cell，再设置vertical-align:middle。</li></ul><p>（2）代码实例</p><div class="language-html" data-highlighter="prismjs" data-ext="html"><pre><code class="language-html"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    &lt;div class=&quot;child&gt;DEMO<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">.parent {</span>
<span class="line">    display:table-cell;</span>
<span class="line">    vertical-align:middle;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>（3）优缺点</p><ul><li>优点:兼容性较好，ie8以上均支持</li></ul><p>2）使用absolute+transform （1）原理、用法</p><ul><li>原理：类似于水平居中时的absolute+transform原理。将子框设置为绝对定位，移动子框，使子框上边距离相对框上边边框的距离为相对框高度的一半，再通过向上移动子框的一半高度以达到垂直居中。当然，在此之前，我们需要设置父框为相对定位，使父框成为子框的相对框。</li><li>用法：先将父框设置为position:relative，再设置子框position:absolute，top:50%，transform:translateY(-50%)。</li></ul><p>（2）代码实例</p><div class="language-html" data-highlighter="prismjs" data-ext="html"><pre><code class="language-html"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    &lt;div class=&quot;child&gt;DEMO<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">.parent {</span>
<span class="line">    position:relative;</span>
<span class="line">}</span>
<span class="line">.child {</span>
<span class="line">    position:absolute;</span>
<span class="line">    top:50%;</span>
<span class="line">    transform:translateY(-50%);</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>（3）优缺点</p><ul><li>优点:居中元素不会对其他的产生影响</li><li>缺点:transform属于css3内容，兼容性存在一定问题，高版本浏览器需要添加一些前缀</li></ul><p>3）使用flex+align-items （1）原理、用法</p><ul><li>原理：通过设置CSS3中的布局利器flex中的属性align-times，使子框垂直居中。</li><li>用法：先将父框设置为position:flex，再设置align-items:center。</li></ul><p>（1）代码实例</p><div class="language-html" data-highlighter="prismjs" data-ext="html"><pre><code class="language-html"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    &lt;div class=&quot;child&gt;DEMO<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">.parent {</span>
<span class="line">    position:flex;</span>
<span class="line">    align-items:center;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>（3）优缺点</p><ul><li>优点:只设置parent</li><li>缺点:兼容性存在一定问题</li></ul><h3 id="水平垂直居中" tabindex="-1"><a class="header-anchor" href="#水平垂直居中"><span>水平垂直居中</span></a></h3><p>1）使用absolute+transform （1）原理、用法</p><ul><li>原理：将水平居中时的absolute+transform和垂直居中时的absolute+transform相结合。详见：水平居中的3）和垂直居中的2）。</li><li>见水平居中的3）和垂直居中的2）。</li></ul><p>（2）代码实例</p><div class="language-html" data-highlighter="prismjs" data-ext="html"><pre><code class="language-html"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    &lt;div class=&quot;child&gt;DEMO<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">.parent {</span>
<span class="line">    position:relative;</span>
<span class="line">}</span>
<span class="line">.child {</span>
<span class="line">    position:absolute;</span>
<span class="line">    left:50%;</span>
<span class="line">    top:50%;</span>
<span class="line">    transform:tranplate(-50%,-50%);</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>（3）优缺点</p><ul><li>优点:child元素不会对其他元素产生影响</li><li>缺点:兼容性存在一定问题</li></ul><p>2）使用inline-block+text-align+table-cell+vertical-align （1）原理、用法</p><ul><li>原理：使用inline-block+text-align水平居中，再用table-cell+vertical-align垂直居中，将二者结合起来。详见：水平居中的1）和垂直居中的1）。</li><li>见水平居中的1）和垂直居中的1）。</li></ul><p>（2）代码实例</p><div class="language-html" data-highlighter="prismjs" data-ext="html"><pre><code class="language-html"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    &lt;div class=&quot;child&gt;DEMO<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">.parent {</span>
<span class="line">    text-align:center;</span>
<span class="line">    display:table-cell;</span>
<span class="line">    vertical-align:middle;</span>
<span class="line">}</span>
<span class="line">.child {</span>
<span class="line">    display:inline-block;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>（3）优缺点</p><ul><li>优点:兼容性较好</li></ul><p>3）使用flex+justify-content+align-items （1）原理、用法</p><ul><li>原理：通过设置CSS3布局利器flex中的justify-content和align-items，从而达到水平垂直居中。详见：水平居中的4）和垂直居中的3）。</li><li>见水平居中的4）和垂直居中的3）。</li></ul><p>（2）代码实例</p><div class="language-html" data-highlighter="prismjs" data-ext="html"><pre><code class="language-html"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    &lt;div class=&quot;child&gt;DEMO<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">.parent {</span>
<span class="line">    display:flex;</span>
<span class="line">    justify-content:center;</span>
<span class="line">    align-items:center;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>（3）优缺点</p><ul><li>优点:只设置了parent</li><li>缺点:兼容性存在一定问题</li></ul><h3 id="多列布局" tabindex="-1"><a class="header-anchor" href="#多列布局"><span>多列布局</span></a></h3><h3 id="定宽-自适应" tabindex="-1"><a class="header-anchor" href="#定宽-自适应"><span>定宽+自适应</span></a></h3><p>1）使用float+overflow （1）原理、用法</p><ul><li>原理：通过将左边框脱离文本流，设置右边规定当内容溢出元素框时发生的事情以达到多列布局。</li><li>用法：先将左框设置为float:left、width、margin-left，再设置实际的右框overflow:hidden。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;left&quot;&gt;</span>
<span class="line">        &lt;p&gt;left&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;right&quot;&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">.left {</span>
<span class="line">    float:left;</span>
<span class="line">    width:100px;</span>
<span class="line">    margin-right:20px;</span>
<span class="line">}</span>
<span class="line">.right {</span>
<span class="line">    overflow:hidden;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）优缺点</p><ul><li>优点:简单</li><li>缺点:不支持ie6</li></ul><p>2）使用float+margin （1）原理、用法</p><ul><li>原理：通过将左框脱离文本流，加上右框向右移动一定的距离，以达到视觉上的多列布局。</li><li>用法：先将左框设置为float:left、margin-left，再设置右框margin-left。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;left&quot;&gt;</span>
<span class="line">        &lt;p&gt;left&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;right&quot;&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">.left {</span>
<span class="line">    float:left;</span>
<span class="line">    width:100px;</span>
<span class="line">}</span>
<span class="line">.right {</span>
<span class="line">    margin-left:120px;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）优缺点</p><ul><li>优点:简单，易理解</li><li>缺点:兼容性存在一定问题，ie6下有3px的bug。right下的p清除浮动将产生bug</li></ul><p>3）使用float+margin（改良版） （1）原理、用法</p><ul><li>原理：在1）的基础之上，通过向右框添加一个父框，再加上设置左、右父框属性使之产生BFC以去除bug。</li><li>用法：先将左框设置为float:left、margin-left、position:relative，再设置右父框float:right、width:100%、margin-left，最后设置实际的右框margin-left。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;left&quot;&gt;</span>
<span class="line">        &lt;p&gt;left&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;rigth-fix&quot;&gt;</span>
<span class="line">        &lt;div class=&quot;right&quot;&gt;</span>
<span class="line">            &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">            &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">        &lt;/div&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">.left {</span>
<span class="line">    float:left;</span>
<span class="line">    width:100px;</span>
<span class="line">    position:relative;</span>
<span class="line">}</span>
<span class="line">.right-fix {</span>
<span class="line">    float:right;</span>
<span class="line">    width:100%;</span>
<span class="line">    margin-left:-100px;</span>
<span class="line">}</span>
<span class="line">.right {</span>
<span class="line">    margin-left:120px;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）优缺点</p><ul><li>优点:简单，易理解</li></ul><p>4）使用table （1）原理、用法</p><ul><li>原理：通过将父框设置为表格，将左右边框转化为类似于同一行的td，从而达到多列布局。</li><li>用法：先将父框设置为display:table、width:100%、table-layout:fixed，再设置左右框display:table-cell，最后设置左框width、padding-right。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;left&quot;&gt;</span>
<span class="line">        &lt;p&gt;left&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;right&quot;&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">.parent {</span>
<span class="line">    display:table;</span>
<span class="line">    width:100%;</span>
<span class="line">    table-layout:fixed;</span>
<span class="line">}</span>
<span class="line">.left {</span>
<span class="line">    width:100px;</span>
<span class="line">    padding-right:20px;</span>
<span class="line">}</span>
<span class="line">.right,.left {</span>
<span class="line">    display:table-cell;    </span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5）使用flex （1）原理、用法</p><ul><li>原理：通过设置CSS3布局利器flex中的flex属性以达到多列布局。</li><li>用法：先将父框设置为display:flex，再设置左框flex:1，最后设置左框width、margin-right。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;left&quot;&gt;</span>
<span class="line">        &lt;p&gt;left&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;right&quot;&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">.parent {</span>
<span class="line">    display:flex;</span>
<span class="line">}</span>
<span class="line">.left {</span>
<span class="line">    width:100px;</span>
<span class="line">    margin-right:20px;</span>
<span class="line">}</span>
<span class="line">.right {</span>
<span class="line">    flex:1;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）优缺点</p><ul><li>优点:flex很强大</li><li>缺点:兼容性存在一定问题，性能存在一定问题</li></ul><h3 id="两列定宽-一列自适应" tabindex="-1"><a class="header-anchor" href="#两列定宽-一列自适应"><span>两列定宽+一列自适应</span></a></h3><p>（1）原理、用法</p><ul><li>原理：这种情况与两列定宽查不多。</li><li>用法：先将左、中框设置为float:left、width、margin-right，再设置右框overflow:hidden。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;left&quot;&gt;</span>
<span class="line">        &lt;p&gt;left&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;center&quot;&gt;</span>
<span class="line">        &lt;p&gt;center&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;right&quot;&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">.left,.center {</span>
<span class="line">    float:left;</span>
<span class="line">    width:100px;</span>
<span class="line">    margin-right:20px;</span>
<span class="line">}</span>
<span class="line">.right {</span>
<span class="line">    overflow:hidden;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="不定宽-自适应" tabindex="-1"><a class="header-anchor" href="#不定宽-自适应"><span>不定宽+自适应</span></a></h3><p>1）使用float+overflow （1）原理、用法</p><ul><li>原理：这种情况与两列定宽查不多。</li><li>用法：先将左框设置为float:left、margin-right，再设置右框overflow: hidden，最后设置左框中的内容width。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;left&quot;&gt;</span>
<span class="line">        &lt;p&gt;left&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;right&quot;&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">.left{</span>
<span class="line">        float: left;</span>
<span class="line">        margin-right: 20px;</span>
<span class="line">    }</span>
<span class="line">.right{</span>
<span class="line">    overflow: hidden;</span>
<span class="line">}</span>
<span class="line">.left p{</span>
<span class="line">    width: 200px;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）优缺点</p><ul><li>优点:简单</li><li>缺点:ie6下兼容性存在一定问题</li></ul><p>2）使用table （1）原理、用法</p><ul><li>原理：通过将父框改变为表格，将左右框转换为类似于同一行的td以达到多列布局，设置父框宽度100%，给左框子元素一个固定宽度从而达到自适应。</li><li>用法：先将父框设置为display: table、width: 100%，再设置左、右框display: table-cell，最后设置左框width: 0.1%、padding-right以及左框中的内容width。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;left&quot;&gt;</span>
<span class="line">        &lt;p&gt;left&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;right&quot;&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">.parent{</span>
<span class="line">    display: table; width: 100%;</span>
<span class="line">    }</span>
<span class="line">.left,.right{</span>
<span class="line">    display: table-cell;</span>
<span class="line">}</span>
<span class="line">.left{</span>
<span class="line">    width: 0.1%;</span>
<span class="line">    padding-right: 20px;</span>
<span class="line">}</span>
<span class="line">.left p{</span>
<span class="line">    width:200px;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）优缺点</p><ul><li>缺点:ie6 ie7不支持</li></ul><p>3）使用flex （1）原理、用法</p><ul><li>原理：通过设置CSS3布局利器flex中的flex属性以达到多列布局，加上给左框中的内容定宽、给右框设置flex达到不定款+自适应。</li><li>用法：先将父框设置为display:flex，再设置右框flex:1，最后设置左框margin-right:20px、左框中的内容width。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;left&quot;&gt;</span>
<span class="line">        &lt;p&gt;left&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;right&quot;&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">.parent {</span>
<span class="line">    display:flex;</span>
<span class="line">}</span>
<span class="line">.left {</span>
<span class="line">    margin-right:20px;</span>
<span class="line">}</span>
<span class="line">.right {</span>
<span class="line">    flex:1;</span>
<span class="line">}</span>
<span class="line">.left p{</span>
<span class="line">    width: 200px;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）优缺点</p><ul><li>优点:flex很强大</li><li>缺点:兼容性存在一定问题，性能存在一定问题</li></ul><h3 id="两列不定宽-一列自适应" tabindex="-1"><a class="header-anchor" href="#两列不定宽-一列自适应"><span>两列不定宽+一列自适应</span></a></h3><p>（1）原理、用法</p><ul><li>原理：这个情况与一列不定宽+一列自适应查不多。</li><li>用法：先将左、中框设置为float:left、margin-right，再设置右框overflow:hidden，最后给左中框中的内容设置width。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;left&quot;&gt;</span>
<span class="line">        &lt;p&gt;left&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;center&quot;&gt;</span>
<span class="line">        &lt;p&gt;center&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;right&quot;&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">.left,.center{</span>
<span class="line">    float: left;</span>
<span class="line">    margin-right: 20px;</span>
<span class="line">}</span>
<span class="line">.right{</span>
<span class="line">    overflow: hidden;</span>
<span class="line">}</span>
<span class="line">.left p,.center p{</span>
<span class="line">    width: 100px;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="等分布局" tabindex="-1"><a class="header-anchor" href="#等分布局"><span>等分布局</span></a></h3><p><img src="https://segmentfault.com/img/bV5ioR?w=619&amp;h=362#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;errorMessage=unknown error&amp;id=Filuk&amp;originHeight=362&amp;originWidth=619&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=error&amp;style=none&amp;title=" alt=""></p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">公式转化:</span>
<span class="line">l = w * n + g * (n-1) -&gt; l = w * n + g * n - g -&gt; l + g = （w + g） * n</span>
<span class="line"></span></code></pre></div><p><img src="https://segmentfault.com/img/bV5ioO?w=610&amp;h=375#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=uzu6G&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=uploading&amp;style=none&amp;title=" alt=""></p><p>因此，我们需要解决两个问题：</p><ul><li>如何让总宽度增加g(即：L+g)</li><li>如何让每个宽包含g（即：w+g）</li></ul><p>1）使用float （1）原理、用法</p><ul><li>原理：增大父框的实际宽度后，使用CSS3属性box-sizing进行布局的辅助。</li><li>用法：先将父框设置为margin-left: -*px，再设置子框float: left、width: 25%、padding-left、box-sizing: border-box。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;column&quot;&gt;&lt;p&gt;1&lt;/p&gt;&lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;column&quot;&gt;&lt;p&gt;2&lt;/p&gt;&lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;column&quot;&gt;&lt;p&gt;3&lt;/p&gt;&lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;column&quot;&gt;&lt;p&gt;4&lt;/p&gt;&lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">.parent{</span>
<span class="line">    margin-left: -20px;//l增加g</span>
<span class="line">}</span>
<span class="line">.column{</span>
<span class="line">    float: left;</span>
<span class="line">    width: 25%;</span>
<span class="line">    padding-left: 20px;</span>
<span class="line">    box-sizing: border-box;//包含padding区域 w+g</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）优缺点</p><ul><li>优点：兼容性较好</li><li>缺点：ie6 ie7百分比兼容存在一定问题</li></ul><p>2）使用table （1）原理、用法</p><ul><li>原理：通过增加一个父框的修正框，增大其宽度，并将父框转换为table，将子框转换为tabel-cell进行布局。</li><li>用法：先将父框的修正框设置为margin-left: -*px，再设置父框display: table、width:100%、table-layout: fixed，设置子框display: table-cell、padding-left。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent-fix&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">        &lt;div class=&quot;column&quot;&gt;&lt;p&gt;1&lt;/p&gt;&lt;/div&gt;</span>
<span class="line">        &lt;div class=&quot;column&quot;&gt;&lt;p&gt;2&lt;/p&gt;&lt;/div&gt;</span>
<span class="line">        &lt;div class=&quot;column&quot;&gt;&lt;p&gt;3&lt;/p&gt;&lt;/div&gt;</span>
<span class="line">        &lt;div class=&quot;column&quot;&gt;&lt;p&gt;4&lt;/p&gt;&lt;/div&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">.parent-fix{</span>
<span class="line">    margin-left: -20px;//l+g</span>
<span class="line">}</span>
<span class="line">.parent{</span>
<span class="line">    display: table;</span>
<span class="line">    width:100%;</span>
<span class="line">    table-layout: fixed;</span>
<span class="line">}</span>
<span class="line">.column{</span>
<span class="line">    display: table-cell;</span>
<span class="line">    padding-left: 20px;//w+g</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）优缺点</p><ul><li>优点：结构和块数无关联</li><li>缺点：增加了一层</li></ul><p>3）使用flex （1）原理、用法</p><ul><li>原理：通过设置CSS3布局利器flex中的flex属性以达到等分布局。</li><li>用法：将父框设置为display: flex，再设置子框flex: 1，最后设置子框与子框的间距margin-left。</li></ul><p>（2）代码实例</p><div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html"><pre><code class="language-html"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>column<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>column<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>column<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>column<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">.parent{</span>
<span class="line">    display: flex;</span>
<span class="line">}</span>
<span class="line">.column{</span>
<span class="line">    flex: 1;</span>
<span class="line">}</span>
<span class="line">.column+.column{</span>
<span class="line">    margin-left:20px;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）优缺点</p><ul><li>优点：代码量少，与块数无关</li><li>缺点：兼容性存在一定问题</li></ul><h3 id="定宽-自适应-两块高度一样高" tabindex="-1"><a class="header-anchor" href="#定宽-自适应-两块高度一样高"><span>定宽+自适应+两块高度一样高</span></a></h3><p>1）使用float （1）原理、用法</p><ul><li>原理：通过过分加大左右子框的高度，辅助超出隐藏，以达到视觉上的等高。</li><li>用法：将父框设置overflow: hidden，再设置左右子框padding-bottom: 9999px、margin-bottom: -9999px，最后设置左框float: left、width、margin-right，右框overflow: hidden。</li></ul><p>（2）代码实例</p><div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html"><pre><code class="language-html"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>left<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>left<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>right<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>right<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>right<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">p{</span>
<span class="line">    background: none!important;</span>
<span class="line">}</span>
<span class="line">.left,.right{</span>
<span class="line">    background: #444;</span>
<span class="line">}</span>
<span class="line">.parent{</span>
<span class="line">    overflow: hidden;</span>
<span class="line">}</span>
<span class="line">.left,.right{</span>
<span class="line">    padding-bottom: 9999px;</span>
<span class="line">    margin-bottom: -9999px;</span>
<span class="line">}</span>
<span class="line">.left{</span>
<span class="line">    float: left; </span>
<span class="line">    width: 100px;</span>
<span class="line">    margin-right: 20px;</span>
<span class="line">}</span>
<span class="line">.right{</span>
<span class="line">    overflow: hidden;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(3)优缺点</p><ul><li>优点：兼容性好</li><li>缺点：伪等高，不是真正意义上的等高</li></ul><p>2）使用table （1）原理、用法</p><ul><li>原理：将父框转化为tabel，将子框转化为tabel-cell布局，以达到定宽+自适应+两块高度一样高。</li><li>用法：先将父框设置为display:table、width:100%、table-layout:fixed，再设置左右框为display:table-cell，最后设置左框width、padding-right。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;left&quot;&gt;</span>
<span class="line">        &lt;p&gt;left&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;right&quot;&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">.parent {</span>
<span class="line">    display:table;</span>
<span class="line">    width:100%;</span>
<span class="line">    table-layout:fixed;</span>
<span class="line">}</span>
<span class="line">.left {</span>
<span class="line">    width:100px;</span>
<span class="line">    padding-right:20px;</span>
<span class="line">}</span>
<span class="line">.right,.left {</span>
<span class="line">    display:table-cell;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3）使用flex （1）原理、用法</p><ul><li>原理：通过设置CSS3布局利器flex中的flex属性以达到定宽+自适应+两块高度一样高。</li><li>用法：将父框设置为display: flex，再设置左框width、margin-right，最后设置右框flex:1。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;left&quot;&gt;</span>
<span class="line">        &lt;p&gt;left&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;right&quot;&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">        &lt;p&gt;right&lt;/p&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">.parent {</span>
<span class="line">    display:flex;</span>
<span class="line">}</span>
<span class="line">.left {</span>
<span class="line">    width:100px;</span>
<span class="line">    margin-right:20px;</span>
<span class="line">}</span>
<span class="line">.right {</span>
<span class="line">    flex:1;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）优缺点</p><ul><li>优点:代码少，flex很强大</li><li>缺点:兼容性存在一定问题</li></ul><p>4)使用display （1）原理、用法</p><ul><li>原理：通过设置display中的CSS3的-webkit-box属性以达到定宽+自适应+两块高度一样高。</li><li>用法：将父框设置为display: -webkit-box、width: 100%，再设置左框width、margin-right，最后设置右框-webkit-box-flex: 1。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;left&quot;&gt;left&lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;right&quot;&gt;right &lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">.parent {</span>
<span class="line">    width: 100%;</span>
<span class="line">    display: -webkit-box;</span>
<span class="line">}</span>
<span class="line">.left {</span>
<span class="line">    width:100px;</span>
<span class="line">    margin-right: 20px;</span>
<span class="line">}</span>
<span class="line">.right {</span>
<span class="line">    -webkit-box-flex: 1;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(3)优缺点</p><ul><li>缺点:兼容性存在较大的问题</li></ul><h3 id="全屏布局" tabindex="-1"><a class="header-anchor" href="#全屏布局"><span>全屏布局</span></a></h3><h3 id="全屏布局的特点" tabindex="-1"><a class="header-anchor" href="#全屏布局的特点"><span>全屏布局的特点</span></a></h3><ul><li>滚动条不是全局滚动条，而是出现在内容区域里，往往是主内容区域</li><li>浏览器变大时，撑满窗口</li></ul><h3 id="全屏布局的方法" tabindex="-1"><a class="header-anchor" href="#全屏布局的方法"><span>全屏布局的方法</span></a></h3><p><img src="https://segmentfault.com/img/bV5im3?w=1144&amp;h=776#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=kEZQ5&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=uploading&amp;style=none&amp;title=" alt=""></p><p>1）使用position （1）原理、用法</p><ul><li>原理：将上下部分固定，中间部分使用定宽+自适应+两块高度一样高。</li><li>用法：见实例。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;top&quot;&gt;top&lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;left&quot;&gt;left&lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;right&quot;&gt;</span>
<span class="line">        &lt;div class=&quot;inner&quot;&gt;right&lt;/div&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;bottom&quot;&gt;bottom&lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">html,body,.parent{</span>
<span class="line">    margin:0;</span>
<span class="line">    height:100%;</span>
<span class="line">    overflow:hidden;</span>
<span class="line">}</span>
<span class="line">body{</span>
<span class="line">    color:white;</span>
<span class="line">}</span>
<span class="line">.top{</span>
<span class="line">    position:absolute;</span>
<span class="line">    top:0;</span>
<span class="line">    left:0;</span>
<span class="line">    right:0;</span>
<span class="line">    height:100px;</span>
<span class="line">    background:blue;</span>
<span class="line">}</span>
<span class="line">.left{</span>
<span class="line">    position:absolute;</span>
<span class="line">    left:0;</span>
<span class="line">    top:100px;</span>
<span class="line">    bottom:50px;</span>
<span class="line">    width:200px;</span>
<span class="line">    background:red;</span>
<span class="line">}</span>
<span class="line">.right{</span>
<span class="line">    position:absolute;</span>
<span class="line">    left:200px;</span>
<span class="line">    top:100px;</span>
<span class="line">    bottom:50px;</span>
<span class="line">    right:0;</span>
<span class="line">    background:pink;</span>
<span class="line">    overflow: auto;</span>
<span class="line">}</span>
<span class="line">.right .inner{</span>
<span class="line">    min-height: 1000px;</span>
<span class="line">}</span>
<span class="line">.bottom{</span>
<span class="line">    position:absolute;</span>
<span class="line">    left:0;</span>
<span class="line">    right:0;</span>
<span class="line">    bottom:0;</span>
<span class="line">    height:50px;</span>
<span class="line">    background: black;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(3)优缺点</p><ul><li>优点：兼容性好，ie6下不支持</li></ul><p>2）使用flex （1）原理、用法</p><ul><li>原理：通过灵活使用CSS3布局利器flex中的flex属性和flex-direction属性以达到全屏布局。</li><li>用法：见实例。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;top&quot;&gt;top&lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;middle&quot;&gt;</span>
<span class="line">        &lt;div class=&quot;left&quot;&gt;left&lt;/div&gt;</span>
<span class="line">        &lt;div class=&quot;right&quot;&gt;</span>
<span class="line">            &lt;div class=&quot;inner&quot;&gt;right&lt;/div&gt;</span>
<span class="line">        &lt;/div&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;bottom&quot;&gt;bottom&lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">html,body,.parent{</span>
<span class="line">    margin:0;</span>
<span class="line">    height:100%;</span>
<span class="line">    overflow:hidden;</span>
<span class="line">}</span>
<span class="line">body{</span>
<span class="line">    color: white;</span>
<span class="line">} </span>
<span class="line">.parent{</span>
<span class="line">    display: flex;</span>
<span class="line">    flex-direction: column;</span>
<span class="line">}</span>
<span class="line">.top{</span>
<span class="line">    height:100px;</span>
<span class="line">    background: blue;</span>
<span class="line">}</span>
<span class="line">.bottom{</span>
<span class="line">    height:50px;</span>
<span class="line">    background: black;</span>
<span class="line">}</span>
<span class="line">.middle{</span>
<span class="line">    flex:1;</span>
<span class="line">    display:flex;</span>
<span class="line">}</span>
<span class="line">.left{</span>
<span class="line">    width:200px;</span>
<span class="line">    background: red;</span>
<span class="line">}</span>
<span class="line">.right{</span>
<span class="line">    flex: 1;</span>
<span class="line">    overflow: auto;</span>
<span class="line">    background:pink;</span>
<span class="line">}</span>
<span class="line">.right .inner{</span>
<span class="line">    min-height: 1000px;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(3)优缺点</p><ul><li>缺点：兼容性差，ie9及ie9以下不兼容</li></ul><p><img src="https://segmentfault.com/img/bV5im4?w=1162&amp;h=790#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=IvNos&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=uploading&amp;style=none&amp;title=" alt=""></p><p>1）使用flex （1）原理、用法</p><ul><li>原理：通过灵活使用CSS3布局利器flex中的flex属性和flex-direction属性以达到全屏布局。</li><li>用法：见实例。</li></ul><p>（2）代码实例</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;div class=&quot;parent&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;top&quot;&gt;top&lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;middle&quot;&gt;</span>
<span class="line">        &lt;div class=&quot;left&quot;&gt;left&lt;/div&gt;</span>
<span class="line">        &lt;div class=&quot;right&quot;&gt;</span>
<span class="line">            &lt;div class=&quot;inner&quot;&gt;right&lt;/div&gt;</span>
<span class="line">        &lt;/div&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;bottom&quot;&gt;bottom&lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line">html,body,.parent{</span>
<span class="line">    margin:0;</span>
<span class="line">    height:100%;</span>
<span class="line">    overflow:hidden;</span>
<span class="line">}</span>
<span class="line">body{</span>
<span class="line">    color:white;</span>
<span class="line">} </span>
<span class="line">.parent{</span>
<span class="line">    display:flex;</span>
<span class="line">    flex-direction:column;</span>
<span class="line">}</span>
<span class="line">.top{</span>
<span class="line">    background:blue;</span>
<span class="line">}</span>
<span class="line">.bottom{</span>
<span class="line">    background:black;</span>
<span class="line">}</span>
<span class="line">.middle{</span>
<span class="line">    flex:1;</span>
<span class="line">    display:flex;</span>
<span class="line">}</span>
<span class="line">.left{</span>
<span class="line">    background: red;</span>
<span class="line">}</span>
<span class="line">.right{</span>
<span class="line">    flex:1;</span>
<span class="line">    overflow:auto;</span>
<span class="line">    background: pink;</span>
<span class="line">}</span>
<span class="line">.right .inner{</span>
<span class="line">    min-height:1000px;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="全屏布局相关方案的兼容性、性能和自适应一览表" tabindex="-1"><a class="header-anchor" href="#全屏布局相关方案的兼容性、性能和自适应一览表"><span>全屏布局相关方案的兼容性、性能和自适应一览表</span></a></h3>`,201)])])}const d=n(e,[["render",t]]),u=JSON.parse('{"path":"/frontend/frontend-tips/layouts.html","title":"前端布局","lang":"zh-CN","frontmatter":{"description":"前端布局 前端布局非常重要的一环就是页面框架的搭建，也是最基础的一环。在页面框架的搭建之中，又有居中布局、多列布局以及全局布局，今天我们就来总结总结前端干货中的CSS布局。 居中布局 水平居中 1）使用inline-block+text-align （1）原理、用法 原理：先将子框由块级元素改变为行内块元素，再通过设置行内块元素居中以达到水平居中。 用...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"前端布局\\",\\"image\\":[\\"https://segmentfault.com/img/bV5ioR?w=619&h=362#crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&id=Filuk&originHeight=362&originWidth=619&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&title=\\",\\"https://segmentfault.com/img/bV5ioO?w=610&h=375#crop=0&crop=0&crop=1&crop=1&id=uzu6G&originalType=binary&ratio=1&rotation=0&showTitle=false&status=uploading&style=none&title=\\",\\"https://segmentfault.com/img/bV5im3?w=1144&h=776#crop=0&crop=0&crop=1&crop=1&id=kEZQ5&originalType=binary&ratio=1&rotation=0&showTitle=false&status=uploading&style=none&title=\\",\\"https://segmentfault.com/img/bV5im4?w=1162&h=790#crop=0&crop=0&crop=1&crop=1&id=IvNos&originalType=binary&ratio=1&rotation=0&showTitle=false&status=uploading&style=none&title=\\"],\\"dateModified\\":\\"2022-04-05T15:35:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/frontend-tips/layouts.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"前端布局"}],["meta",{"property":"og:description","content":"前端布局 前端布局非常重要的一环就是页面框架的搭建，也是最基础的一环。在页面框架的搭建之中，又有居中布局、多列布局以及全局布局，今天我们就来总结总结前端干货中的CSS布局。 居中布局 水平居中 1）使用inline-block+text-align （1）原理、用法 原理：先将子框由块级元素改变为行内块元素，再通过设置行内块元素居中以达到水平居中。 用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://segmentfault.com/img/bV5ioR?w=619&h=362#crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&id=Filuk&originHeight=362&originWidth=619&originalType=binary&ratio=1&rotation=0&showTitle=false&status=error&style=none&title="}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-04-05T15:35:38.000Z"}],["meta",{"property":"article:modified_time","content":"2022-04-05T15:35:38.000Z"}]]},"git":{"createdTime":1647861419000,"updatedTime":1649172938000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":15.17,"words":4551},"filePathRelative":"frontend/frontend-tips/layouts.md","autoDesc":true}');export{d as comp,u as data};
