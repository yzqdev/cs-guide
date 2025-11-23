import{_ as s,c as a,a as e,o as p}from"./app-B6vXTniy.js";const l={};function i(t,n){return p(),a("div",null,[...n[0]||(n[0]=[e(`<h1 id="正则表达式" tabindex="-1"><a class="header-anchor" href="#正则表达式"><span>正则表达式</span></a></h1><p><img src="http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-一步一步了解正则表达式.png" alt=""></p><h1 id="初识-python-正则表达式" tabindex="-1"><a class="header-anchor" href="#初识-python-正则表达式"><span>初识 Python 正则表达式</span></a></h1><p>正则表达式是一个特殊的字符序列，用于判断一个字符串是否与我们所设定的字符序列是否匹配，也就是说检查一个字符串是否与某种模式匹配。</p><p>Python 自 1.5 版本起增加了re 模块，它提供 Perl 风格的正则表达式模式。re 模块使 Python 语言拥有全部的正则表达式功能。</p><p>下面通过实例，一步一步来初步认识正则表达式。</p><p>比如在一段字符串中寻找是否含有某个字符或某些字符，通常我们使用内置函数来实现，如下：</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># 设定一个常量</span></span>
<span class="line">a <span class="token operator">=</span> <span class="token string">&#39;两点水|twowater|liangdianshui|草根程序员|ReadingWithU&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 判断是否有 “两点水” 这个字符串，使用 PY 自带函数</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;是否含有“两点水”这个字符串：{0}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>index<span class="token punctuation">(</span><span class="token string">&#39;两点水&#39;</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;是否含有“两点水”这个字符串：{0}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token string">&#39;两点水&#39;</span> <span class="token keyword">in</span> a<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>输出的结果如下：</p><div class="language-txt" data-highlighter="prismjs" data-ext="txt"><pre><code class="language-txt"><span class="line">是否含有“两点水”这个字符串：True</span>
<span class="line">是否含有“两点水”这个字符串：True</span>
<span class="line"></span></code></pre></div><p>那么，如果使用正则表达式呢？</p><p>刚刚提到过，Python 给我们提供了 re 模块来实现正则表达式的所有功能，那么我们先使用其中的一个函数：</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line">re<span class="token punctuation">.</span>findall<span class="token punctuation">(</span>pattern<span class="token punctuation">,</span> string<span class="token punctuation">[</span><span class="token punctuation">,</span> flags<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>该函数实现了在字符串中找到正则表达式所匹配的所有子串，并组成一个列表返回,具体操作如下：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"></span>
<span class="line"><span class="token keyword">import</span> re</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设定一个常量</span></span>
<span class="line">a <span class="token operator">=</span> <span class="token string">&#39;两点水|twowater|liangdianshui|草根程序员|ReadingWithU&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 正则表达式</span></span>
<span class="line"></span>
<span class="line">findall <span class="token operator">=</span> re<span class="token punctuation">.</span>findall<span class="token punctuation">(</span><span class="token string">&#39;两点水&#39;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>findall<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>findall<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;a 含有“两点水”这个字符串&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">else</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;a 不含有“两点水”这个字符串&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出的结果：</p><div class="language-txt" data-highlighter="prismjs" data-ext="txt"><pre><code class="language-txt"><span class="line">[&#39;两点水&#39;]</span>
<span class="line">a 含有“两点水”这个字符串</span>
<span class="line"></span></code></pre></div><p>从输出结果可以看到，可以实现和内置函数一样的功能，可是在这里也要强调一点，上面这个例子只是方便我们理解正则表达式，这个正则表达式的写法是毫无意义的。为什么这样说呢？</p><p>因为用 Python 自带函数就能解决的问题，我们就没必要使用正则表达式了，这样做多此一举。而且上面例子中的正则表达式设置成为了一个常量，并不是一个正则表达式的规则，正则表达式的灵魂在于规则，所以这样做意义不大。</p><p>那么正则表达式的规则怎么写呢？先不急，我们一步一步来，先来一个简单的，找出字符串中的所有小写字母。首先我们在 <code>findall</code> 函数中第一个参数写正则表达式的规则，其中 <code>[a-z]</code> 就是匹配任何小写字母，第二个参数只要填写要匹配的字符串就行了。具体如下：</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"></span>
<span class="line"><span class="token keyword">import</span> re</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设定一个常量</span></span>
<span class="line">a <span class="token operator">=</span> <span class="token string">&#39;两点水|twowater|liangdianshui|草根程序员|ReadingWithU&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 选择 a 里面的所有小写英文字母</span></span>
<span class="line"></span>
<span class="line">re_findall <span class="token operator">=</span> re<span class="token punctuation">.</span>findall<span class="token punctuation">(</span><span class="token string">&#39;[a-z]&#39;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>re_findall<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>输出的结果：</p><div class="language-txt" data-highlighter="prismjs" data-ext="txt"><pre><code class="language-txt"><span class="line">[&#39;t&#39;, &#39;w&#39;, &#39;o&#39;, &#39;w&#39;, &#39;a&#39;, &#39;t&#39;, &#39;e&#39;, &#39;r&#39;, &#39;l&#39;, &#39;i&#39;, &#39;a&#39;, &#39;n&#39;, &#39;g&#39;, &#39;d&#39;, &#39;i&#39;, &#39;a&#39;, &#39;n&#39;, &#39;s&#39;, &#39;h&#39;, &#39;u&#39;, &#39;i&#39;, &#39;e&#39;, &#39;a&#39;, &#39;d&#39;, &#39;i&#39;, &#39;n&#39;, &#39;g&#39;, &#39;i&#39;, &#39;t&#39;, &#39;h&#39;]</span>
<span class="line"></span></code></pre></div><p>这样我们就拿到了字符串中的所有小写字母了。</p><h1 id="字符集" tabindex="-1"><a class="header-anchor" href="#字符集"><span>字符集</span></a></h1><p>好了，通过上面的几个实例我们初步认识了 Python 的正则表达式，可能你就会问，正则表达式还有什么规则，什么字母代表什么意思呢？</p><p>其实，这些都不急，在本章后面会给出对应的正则表达式规则列表，而且这些东西在网上随便都能 Google 到。所以现在，我们还是进一步加深对正则表达式的理解，讲一下正则表达式的字符集。</p><p>字符集是由一对方括号 “[]” 括起来的字符集合。使用字符集，可以匹配多个字符中的一个。</p><p>举个例子，比如你使用 <code>C[ET]O</code> 匹配到的是 CEO 或 CTO ，也就是说 <code>[ET]</code> 代表的是一个 E 或者一个 T 。像上面提到的 <code>[a-z]</code> ,就是所有小写字母中的其中一个，这里使用了连字符 “-” 定义一个连续字符的字符范围。当然，像这种写法，里面可以包含多个字符范围的，比如：<code>[0-9a-fA-F]</code> ,匹配单个的十六进制数字，且不分大小写。注意了，字符和范围定义的先后顺序对匹配的结果是没有任何影响的。</p><p>其实说了那么多，只是想证明，字符集一对方括号 “[]” 里面的字符关系是&quot;或（OR）&quot;关系，下面看一个例子：</p><div class="language-Python line-numbers-mode" data-highlighter="prismjs" data-ext="Python"><pre><code class="language-Python"><span class="line"></span>
<span class="line">import re</span>
<span class="line">a = &#39;uav,ubv,ucv,uwv,uzv,ucv,uov&#39;</span>
<span class="line"></span>
<span class="line"># 字符集</span>
<span class="line"></span>
<span class="line"># 取 u 和 v 中间是 a 或 b 或 c 的字符</span>
<span class="line">findall = re.findall(&#39;u[abc]v&#39;, a)</span>
<span class="line">print(findall)</span>
<span class="line"># 如果是连续的字母，数字可以使用 - 来代替</span>
<span class="line">l = re.findall(&#39;u[a-c]v&#39;, a)</span>
<span class="line">print(l)</span>
<span class="line"></span>
<span class="line"># 取 u 和 v 中间不是 a 或 b 或 c 的字符</span>
<span class="line">re_findall = re.findall(&#39;u[^abc]v&#39;, a)</span>
<span class="line">print(re_findall)</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出的结果：</p><div class="language-txt" data-highlighter="prismjs" data-ext="txt"><pre><code class="language-txt"><span class="line">[&#39;uav&#39;, &#39;ubv&#39;, &#39;ucv&#39;, &#39;ucv&#39;]</span>
<span class="line">[&#39;uav&#39;, &#39;ubv&#39;, &#39;ucv&#39;, &#39;ucv&#39;]</span>
<span class="line">[&#39;uwv&#39;, &#39;uzv&#39;, &#39;uov&#39;]</span>
<span class="line"></span></code></pre></div><p>在例子中，使用了取反字符集，也就是在左方括号 “[” 后面紧跟一个尖括号 “^”，就会对字符集取反。需要记住的一点是，取反字符集必须要匹配一个字符。比如：<code>q[^u]</code> 并不意味着：匹配一个 q，后面没有 u 跟着。它意味着：匹配一个 q，后面跟着一个不是 u 的字符。具体可以对比上面例子中输出的结果来理解。</p><p>我们都知道，正则表达式本身就定义了一些规则，比如 <code>\\d</code>,匹配所有数字字符,其实它是等价于 [0-9]，下面也写了个例子，通过字符集的形式解释了这些特殊字符。</p><div class="language-Python line-numbers-mode" data-highlighter="prismjs" data-ext="Python"><pre><code class="language-Python"><span class="line">import re</span>
<span class="line"></span>
<span class="line">a = &#39;uav_ubv_ucv_uwv_uzv_ucv_uov&amp;123-456-789&#39;</span>
<span class="line"></span>
<span class="line"># 概括字符集</span>
<span class="line"></span>
<span class="line"># \\d 相当于 [0-9] ,匹配所有数字字符</span>
<span class="line"># \\D 相当于 [^0-9] ， 匹配所有非数字字符</span>
<span class="line">findall1 = re.findall(&#39;\\d&#39;, a)</span>
<span class="line">findall2 = re.findall(&#39;[0-9]&#39;, a)</span>
<span class="line">findall3 = re.findall(&#39;\\D&#39;, a)</span>
<span class="line">findall4 = re.findall(&#39;[^0-9]&#39;, a)</span>
<span class="line">print(findall1)</span>
<span class="line">print(findall2)</span>
<span class="line">print(findall3)</span>
<span class="line">print(findall4)</span>
<span class="line"></span>
<span class="line"># \\w 匹配包括下划线的任何单词字符，等价于 [A-Za-z0-9_]</span>
<span class="line">findall5 = re.findall(&#39;\\w&#39;, a)</span>
<span class="line">findall6 = re.findall(&#39;[A-Za-z0-9_]&#39;, a)</span>
<span class="line">print(findall5)</span>
<span class="line">print(findall6)</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><div class="language-txt" data-highlighter="prismjs" data-ext="txt"><pre><code class="language-txt"><span class="line">[&#39;1&#39;, &#39;2&#39;, &#39;3&#39;, &#39;4&#39;, &#39;5&#39;, &#39;6&#39;, &#39;7&#39;, &#39;8&#39;, &#39;9&#39;]</span>
<span class="line">[&#39;1&#39;, &#39;2&#39;, &#39;3&#39;, &#39;4&#39;, &#39;5&#39;, &#39;6&#39;, &#39;7&#39;, &#39;8&#39;, &#39;9&#39;]</span>
<span class="line">[&#39;u&#39;, &#39;a&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;b&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;c&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;w&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;z&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;c&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;o&#39;, &#39;v&#39;, &#39;&amp;&#39;, &#39;-&#39;, &#39;-&#39;]</span>
<span class="line">[&#39;u&#39;, &#39;a&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;b&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;c&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;w&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;z&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;c&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;o&#39;, &#39;v&#39;, &#39;&amp;&#39;, &#39;-&#39;, &#39;-&#39;]</span>
<span class="line">[&#39;u&#39;, &#39;a&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;b&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;c&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;w&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;z&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;c&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;o&#39;, &#39;v&#39;, &#39;1&#39;, &#39;2&#39;, &#39;3&#39;, &#39;4&#39;, &#39;5&#39;, &#39;6&#39;, &#39;7&#39;, &#39;8&#39;, &#39;9&#39;]</span>
<span class="line">[&#39;u&#39;, &#39;a&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;b&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;c&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;w&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;z&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;c&#39;, &#39;v&#39;, &#39;_&#39;, &#39;u&#39;, &#39;o&#39;, &#39;v&#39;, &#39;1&#39;, &#39;2&#39;, &#39;3&#39;, &#39;4&#39;, &#39;5&#39;, &#39;6&#39;, &#39;7&#39;, &#39;8&#39;, &#39;9&#39;]</span>
<span class="line"></span></code></pre></div><h1 id="数量词" tabindex="-1"><a class="header-anchor" href="#数量词"><span>数量词</span></a></h1><p>来，继续加深对正则表达式的理解，这部分理解一下数量词，为什么要用数量词，想想都知道，如果你要匹配几十上百的字符时，难道你要一个一个的写，所以就出现了数量词。</p><p>数量词的词法是：{min,max} 。min 和 max 都是非负整数。如果逗号有而 max 被忽略了，则 max 没有限制。如果逗号和 max 都被忽略了，则重复 min 次。比如，<code>\\b[1-9][0-9]{3}\\b</code>,匹配的是 1000 ~ 9999 之间的数字( “\\b” 表示单词边界），而 <code>\\b[1-9][0-9]{2,4}\\b</code>，匹配的是一个在 100 ~ 99999 之间的数字。</p><p>下面看一个实例，匹配出字符串中 4 到 7 个字母的英文</p><div class="language-Python" data-highlighter="prismjs" data-ext="Python"><pre><code class="language-Python"><span class="line">import re</span>
<span class="line"></span>
<span class="line">a = &#39;java*&amp;39android##@@python&#39;</span>
<span class="line"></span>
<span class="line"># 数量词</span>
<span class="line"></span>
<span class="line">findall = re.findall(&#39;[a-z]{4,7}&#39;, a)</span>
<span class="line">print(findall)</span>
<span class="line"></span></code></pre></div><p>输出结果：</p><div class="language-txt" data-highlighter="prismjs" data-ext="txt"><pre><code class="language-txt"><span class="line">[&#39;java&#39;, &#39;android&#39;, &#39;python&#39;]</span>
<span class="line"></span></code></pre></div><p>注意，这里有贪婪和非贪婪之分。那么我们先看下相关的概念：</p><p>贪婪模式：它的特性是一次性地读入整个字符串，如果不匹配就吐掉最右边的一个字符再匹配，直到找到匹配的字符串或字符串的长度为 0 为止。它的宗旨是读尽可能多的字符，所以当读到第一个匹配时就立刻返回。</p><p>懒惰模式：它的特性是从字符串的左边开始，试图不读入字符串中的字符进行匹配，失败，则多读一个字符，再匹配，如此循环，当找到一个匹配时会返回该匹配的字符串，然后再次进行匹配直到字符串结束。</p><p>上面例子中的就是贪婪的，如果要使用非贪婪，也就是懒惰模式，怎么呢？</p><p>如果要使用非贪婪，则加一个 <code>?</code> ，上面的例子修改如下：</p><div class="language-Python" data-highlighter="prismjs" data-ext="Python"><pre><code class="language-Python"><span class="line">import re</span>
<span class="line"></span>
<span class="line">a = &#39;java*&amp;39android##@@python&#39;</span>
<span class="line"></span>
<span class="line"># 贪婪与非贪婪</span>
<span class="line"></span>
<span class="line">re_findall = re.findall(&#39;[a-z]{4,7}?&#39;, a)</span>
<span class="line">print(re_findall)</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>输出结果如下：</p><div class="language-txt" data-highlighter="prismjs" data-ext="txt"><pre><code class="language-txt"><span class="line">[&#39;java&#39;, &#39;andr&#39;, &#39;pyth&#39;]</span>
<span class="line"></span></code></pre></div><p>从输出的结果可以看出，android 只打印除了 andr ，Python 只打印除了 pyth ，因为这里使用的是懒惰模式。</p><p>当然，还有一些特殊字符也是可以表示数量的，比如：</p><blockquote><p><code>?</code>：告诉引擎匹配前导字符 0 次或 1 次</p><p><code>+</code>：告诉引擎匹配前导字符 1 次或多次</p><p><code>*</code>：告诉引擎匹配前导字符 0 次或多次</p></blockquote><p>把这部分的知识点总结一下,就是下面这个表了:</p><table><thead><tr><th>贪 婪</th><th>惰 性</th><th>描 述</th></tr></thead><tbody><tr><td>？</td><td>？？</td><td>零次或一次出现，等价于{0,1}</td></tr><tr><td>+</td><td>+？</td><td>一次或多次出现 ，等价于{1,}</td></tr><tr><td>*</td><td>*？</td><td>零次或多次出现 ，等价于{0,}</td></tr><tr><td>{n}</td><td>{n}？</td><td>恰好 n 次出现</td></tr><tr><td>{n,m}</td><td>{n,m}？</td><td>至少 n 次枝多 m 次出现</td></tr><tr><td>{n,}</td><td>{n,}？</td><td>至少 n 次出现</td></tr></tbody></table><h1 id="边界匹配符和组" tabindex="-1"><a class="header-anchor" href="#边界匹配符和组"><span>边界匹配符和组</span></a></h1><p>将上面几个点，就用了很大的篇幅了，现在介绍一些边界匹配符和组的概念。</p><p>一般的边界匹配符有以下几个：</p><table><thead><tr><th>语法</th><th>描述</th></tr></thead><tbody><tr><td>^</td><td>匹配字符串开头（在有多行的情况中匹配每行的开头）</td></tr><tr><td>$</td><td>匹配字符串的末尾(在有多行的情况中匹配每行的末尾)</td></tr><tr><td>\\A</td><td>仅匹配字符串开头</td></tr><tr><td>\\Z</td><td>仅匹配字符串末尾</td></tr><tr><td>\\b</td><td>匹配 \\w 和 \\W 之间</td></tr><tr><td>\\B</td><td>[^\\b]</td></tr></tbody></table><p>分组，被括号括起来的表达式就是分组。分组表达式 <code>(...)</code> 其实就是把这部分字符作为一个整体，当然，可以有多分组的情况，每遇到一个分组，编号就会加 1 ，而且分组后面也是可以加数量词的。</p><p>此处本应有例子，考虑到篇幅问题，就不贴了</p><h1 id="re-sub" tabindex="-1"><a class="header-anchor" href="#re-sub"><span>re.sub</span></a></h1><p>实战过程中，我们很多时候需要替换字符串中的字符，这时候就可以用到 <code>def sub(pattern, repl, string, count=0, flags=0)</code> 函数了，re.sub 共有五个参数。其中三个必选参数：pattern, repl, string ; 两个可选参数：count, flags .</p><p>具体参数意义如下：</p><table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>pattern</td><td>表示正则中的模式字符串</td></tr><tr><td>repl</td><td>repl，就是replacement，被替换的字符串的意思</td></tr><tr><td>string</td><td>即表示要被处理，要被替换的那个 string 字符串</td></tr><tr><td>count</td><td>对于pattern中匹配到的结果，count可以控制对前几个group进行替换</td></tr><tr><td>flags</td><td>正则表达式修饰符</td></tr></tbody></table><p>具体使用可以看下下面的这个实例，注释都写的很清楚的了，主要是注意一下，第二个参数是可以传递一个函数的，这也是这个方法的强大之处，例如例子里面的函数 <code>convert</code> ,对传递进来要替换的字符进行判断，替换成不同的字符。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment">#!/usr/bin/env python3</span></span>
<span class="line"><span class="token comment"># -*- coding: UTF-8 -*-</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> re</span>
<span class="line"></span>
<span class="line">a <span class="token operator">=</span> <span class="token string">&#39;Python*Android*Java-888&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 把字符串中的 * 字符替换成 &amp; 字符</span></span>
<span class="line">sub1 <span class="token operator">=</span> re<span class="token punctuation">.</span>sub<span class="token punctuation">(</span><span class="token string">&#39;\\*&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&amp;&#39;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>sub1<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 把字符串中的第一个 * 字符替换成 &amp; 字符</span></span>
<span class="line">sub2 <span class="token operator">=</span> re<span class="token punctuation">.</span>sub<span class="token punctuation">(</span><span class="token string">&#39;\\*&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;&amp;&#39;</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>sub2<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 把字符串中的 * 字符替换成 &amp; 字符,把字符 - 换成 |</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 1、先定义一个函数</span></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">convert</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    group <span class="token operator">=</span> value<span class="token punctuation">.</span>group<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>group <span class="token operator">==</span> <span class="token string">&#39;*&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token string">&#39;&amp;&#39;</span></span>
<span class="line">    <span class="token keyword">elif</span> <span class="token punctuation">(</span>group <span class="token operator">==</span> <span class="token string">&#39;-&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token string">&#39;|&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 第二个参数，要替换的字符可以为一个函数</span></span>
<span class="line">sub3 <span class="token operator">=</span> re<span class="token punctuation">.</span>sub<span class="token punctuation">(</span><span class="token string">&#39;[\\*-]&#39;</span><span class="token punctuation">,</span> convert<span class="token punctuation">,</span> a<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>sub3<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出的结果：</p><div class="language-txt" data-highlighter="prismjs" data-ext="txt"><pre><code class="language-txt"><span class="line">Python&amp;Android&amp;Java-888</span>
<span class="line">Python&amp;Android*Java-888</span>
<span class="line">Python&amp;Android&amp;Java|888</span>
<span class="line"></span></code></pre></div><h1 id="re-match-和-re-search" tabindex="-1"><a class="header-anchor" href="#re-match-和-re-search"><span>re.match 和 re.search</span></a></h1><p><strong>re.match 函数</strong></p><p>语法：</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line">re<span class="token punctuation">.</span><span class="token keyword">match</span><span class="token punctuation">(</span>pattern<span class="token punctuation">,</span> string<span class="token punctuation">,</span> flags<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>re.match 尝试从字符串的起始位置匹配一个模式，如果不是起始位置匹配成功的话，match() 就返回 none。</p><p><strong>re.search 函数</strong></p><p>语法：</p><div class="language-Python" data-highlighter="prismjs" data-ext="Python"><pre><code class="language-Python"><span class="line">re.search(pattern, string, flags=0)</span>
<span class="line"></span></code></pre></div><p>re.search 扫描整个字符串并返回第一个成功的匹配。</p><p>re.match 和 re.search 的参数，基本一致的，具体描述如下：</p><table><thead><tr><th>参数</th><th>描述</th></tr></thead><tbody><tr><td>pattern</td><td>匹配的正则表达式</td></tr><tr><td>string</td><td>要匹配的字符串</td></tr><tr><td>flags</td><td>标志位，用于控制正则表达式的匹配方式，如：是否区分大小写</td></tr></tbody></table><p>那么它们之间有什么区别呢？</p><p>re.match 只匹配字符串的开始，如果字符串开始不符合正则表达式，则匹配失败，函数返回 None；而 re.search 匹配整个字符串，直到找到一个匹配。这就是它们之间的区别了。</p><p>re.match 和 re.search 在网上有很多详细的介绍了，可是再个人的使用中，还是喜欢使用 re.findall</p><p>看下下面的实例，可以对比下 re.search 和 re.findall 的区别，还有多分组的使用。具体看下注释，对比一下输出的结果：</p><p>示例：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"></span>
<span class="line"><span class="token comment">#!/usr/bin/env python3</span></span>
<span class="line"><span class="token comment"># -*- coding: UTF-8 -*-</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 提取图片的地址</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> re</span>
<span class="line"></span>
<span class="line">a <span class="token operator">=</span> <span class="token string">&#39;&lt;img src=&quot;https://s-media-cache-ak0.pinimg.com/originals/a8/c4/9e/a8c49ef606e0e1f3ee39a7b219b5c05e.jpg&quot;&gt;&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用 re.search</span></span>
<span class="line">search <span class="token operator">=</span> re<span class="token punctuation">.</span>search<span class="token punctuation">(</span><span class="token string">&#39;&lt;img src=&quot;(.*)&quot;&gt;&#39;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span></span>
<span class="line"><span class="token comment"># group(0) 是一个完整的分组</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>search<span class="token punctuation">.</span>group<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>search<span class="token punctuation">.</span>group<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用 re.findall</span></span>
<span class="line">findall <span class="token operator">=</span> re<span class="token punctuation">.</span>findall<span class="token punctuation">(</span><span class="token string">&#39;&lt;img src=&quot;(.*)&quot;&gt;&#39;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>findall<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 多个分组的使用（比如我们需要提取 img 字段和图片地址字段）</span></span>
<span class="line">re_search <span class="token operator">=</span> re<span class="token punctuation">.</span>search<span class="token punctuation">(</span><span class="token string">&#39;&lt;(.*) src=&quot;(.*)&quot;&gt;&#39;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span></span>
<span class="line"><span class="token comment"># 打印 img</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>re_search<span class="token punctuation">.</span>group<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment"># 打印图片地址</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>re_search<span class="token punctuation">.</span>group<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment"># 打印 img 和图片地址，以元祖的形式</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>re_search<span class="token punctuation">.</span>group<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment"># 或者使用 groups</span></span>
<span class="line"><span class="token keyword">print</span><span class="token punctuation">(</span>re_search<span class="token punctuation">.</span>groups<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出的结果：</p><div class="language-txt" data-highlighter="prismjs" data-ext="txt"><pre><code class="language-txt"><span class="line">&lt;img src=&quot;https://s-media-cache-ak0.pinimg.com/originals/a8/c4/9e/a8c49ef606e0e1f3ee39a7b219b5c05e.jpg&quot;&gt;</span>
<span class="line">https://s-media-cache-ak0.pinimg.com/originals/a8/c4/9e/a8c49ef606e0e1f3ee39a7b219b5c05e.jpg</span>
<span class="line">[&#39;https://s-media-cache-ak0.pinimg.com/originals/a8/c4/9e/a8c49ef606e0e1f3ee39a7b219b5c05e.jpg&#39;]</span>
<span class="line">img</span>
<span class="line">https://s-media-cache-ak0.pinimg.com/originals/a8/c4/9e/a8c49ef606e0e1f3ee39a7b219b5c05e.jpg</span>
<span class="line">(&#39;img&#39;, &#39;https://s-media-cache-ak0.pinimg.com/originals/a8/c4/9e/a8c49ef606e0e1f3ee39a7b219b5c05e.jpg&#39;)</span>
<span class="line">(&#39;img&#39;, &#39;https://s-media-cache-ak0.pinimg.com/originals/a8/c4/9e/a8c49ef606e0e1f3ee39a7b219b5c05e.jpg&#39;)</span>
<span class="line"></span></code></pre></div><p>最后，正则表达式是非常厉害的工具，通常可以用来解决字符串内置函数无法解决的问题，而且正则表达式大部分语言都是有的。python 的用途很多，但在爬虫和数据分析这连个模块中都是离不开正则表达式的。所以正则表达式对于学习 Python 来说，真的很重要。最后，附送一些常用的正则表达式和正则表达式和 Python 支持的正则表达式元字符和语法文档。</p><p>github：<a href="https://github.com/TwoWater/Python/blob/master/python14/%E5%B8%B8%E7%94%A8%E7%9A%84%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F.md" target="_blank" rel="noopener noreferrer">https://github.com/TwoWater/Python/blob/master/python14/常用的正则表达式.md</a></p><p>欢迎大家 start ，<a href="https://github.com/TwoWater/Python" target="_blank" rel="noopener noreferrer">https://github.com/TwoWater/Python</a> 一下，这是草根学 Python 系列博客的库。也可以关注我的微信公众号：</p><p><img src="http://twowater.com.cn/images/20171204192251900.gif" alt="http://twowater.com.cn/images/20171204192251900.gif"></p><h1 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h1><h1 id="常用的正则表达式" tabindex="-1"><a class="header-anchor" href="#常用的正则表达式"><span>常用的正则表达式</span></a></h1><h2 id="校验数字的表达式" tabindex="-1"><a class="header-anchor" href="#校验数字的表达式"><span>校验数字的表达式</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1、  数字：^[0-9]*$</span>
<span class="line">2、  n位的数字：^\\d{n}$</span>
<span class="line">3、  至少n位的数字：^\\d{n,}$</span>
<span class="line">4、  m-n位的数字：^\\d{m,n}$</span>
<span class="line">5、  零和非零开头的数字：^(0|[1-9][0-9]*)$</span>
<span class="line">6、  非零开头的最多带两位小数的数字：^([1-9][0-9]*)+(.[0-9]{1,2})?$</span>
<span class="line">7、  带1-2位小数的正数或负数：^(\\-)?\\d+(\\.\\d{1,2})?$</span>
<span class="line">8、  正数、负数、和小数：^(\\-|\\+)?\\d+(\\.\\d+)?$</span>
<span class="line">9、  有两位小数的正实数：^[0-9]+(.[0-9]{2})?$</span>
<span class="line">10、 有1~3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$</span>
<span class="line">11、 非零的正整数：^[1-9]\\d*$ 或 ^([1-9][0-9]*){1,3}$ 或 ^\\+?[1-9][0-9]*$</span>
<span class="line">12、 非零的负整数：^\\-[1-9][]0-9&quot;*$ 或 ^-[1-9]\\d*$</span>
<span class="line">13、 非负整数：^\\d+$ 或 ^[1-9]\\d*|0$</span>
<span class="line">14、 非正整数：^-[1-9]\\d*|0$ 或 ^((-\\d+)|(0+))$</span>
<span class="line">15、 非负浮点数：^\\d+(\\.\\d+)?$ 或 ^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*|0?\\.0+|0$</span>
<span class="line">16、 非正浮点数：^((-\\d+(\\.\\d+)?)|(0+(\\.0+)?))$ 或 ^(-([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*))|0?\\.0+|0$</span>
<span class="line">17、 正浮点数：^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*$ 或 ^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$</span>
<span class="line">18、 负浮点数：^-([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*)$ 或 ^(-(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*)))$</span>
<span class="line">19、 浮点数：^(-?\\d+)(\\.\\d+)?$ 或 ^-?([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*|0?\\.0+|0)$</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="校验字符的表达式" tabindex="-1"><a class="header-anchor" href="#校验字符的表达式"><span>校验字符的表达式</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1、  汉字：^[\\u4e00-\\u9fa5]{0,}$</span>
<span class="line">2、  英文和数字：^[A-Za-z0-9]+$ 或 ^[A-Za-z0-9]{4,40}$</span>
<span class="line">3、  长度为3-20的所有字符：^.{3,20}$</span>
<span class="line">4、  由26个英文字母组成的字符串：^[A-Za-z]+$</span>
<span class="line">5、  由26个大写英文字母组成的字符串：^[A-Z]+$</span>
<span class="line">6、  由26个小写英文字母组成的字符串：^[a-z]+$</span>
<span class="line">7、  由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$</span>
<span class="line">8、  由数字、26个英文字母或者下划线组成的字符串：^\\w+$ 或 ^\\w{3,20}$</span>
<span class="line">9、  中文、英文、数字包括下划线：^[\\u4E00-\\u9FA5A-Za-z0-9_]+$</span>
<span class="line">10、 中文、英文、数字但不包括下划线等符号：^[\\u4E00-\\u9FA5A-Za-z0-9]+$ 或 ^[\\u4E00-\\u9FA5A-Za-z0-9]{2,20}$</span>
<span class="line">11、 可以输入含有^%&amp;&#39;,;=?$\\&quot;等字符：[^%&amp;&#39;,;=?$\\x22]+</span>
<span class="line">12、 禁止输入含有~的字符：[^~\\x22]+</span>
<span class="line"></span></code></pre></div><h2 id="特殊需求表达式" tabindex="-1"><a class="header-anchor" href="#特殊需求表达式"><span>特殊需求表达式</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">1、  Email地址：^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$</span>
<span class="line">2、  域名：[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?</span>
<span class="line">3、  InternetURL：[a-zA-z]+://[^\\s]* 或 ^http://([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&amp;=]*)?$</span>
<span class="line">4、  手机号码：^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\\d{8}$</span>
<span class="line">5、  电话号码(&quot;XXX-XXXXXXX&quot;、&quot;XXXX-XXXXXXXX&quot;、&quot;XXX-XXXXXXX&quot;、&quot;XXX-XXXXXXXX&quot;、&quot;XXXXXXX&quot;和&quot;XXXXXXXX)：^(\\(\\d{3,4}-)|\\d{3.4}-)?\\d{7,8}$</span>
<span class="line">6、  国内电话号码(0511-4405222、021-87888822)：\\d{3}-\\d{8}|\\d{4}-\\d{7}</span>
<span class="line">7、  18位身份证号码(数字、字母x结尾)：^((\\d{18})|([0-9x]{18})|([0-9X]{18}))$</span>
<span class="line">8、  帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$</span>
<span class="line">9、  密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\\w{5,17}$</span>
<span class="line">10、 强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$  </span>
<span class="line">11、 日期格式：^\\d{4}-\\d{1,2}-\\d{1,2}</span>
<span class="line">12、 一年的12个月(01～09和1～12)：^(0?[1-9]|1[0-2])$</span>
<span class="line">13、 一个月的31天(01～09和1～31)：^((0?[1-9])|((1|2)[0-9])|30|31)$</span>
<span class="line">14、 钱的输入格式：</span>
<span class="line">      a.有四种钱的表示形式我们可以接受:&quot;10000.00&quot; 和 &quot;10,000.00&quot;, 和没有 &quot;分&quot; 的 &quot;10000&quot; 和 &quot;10,000&quot;：^[1-9][0-9]*$</span>
<span class="line">      b.这表示任意一个不以0开头的数字,但是,这也意味着一个字符&quot;0&quot;不通过,所以我们采用下面的形式：^(0|[1-9][0-9]*)$</span>
<span class="line">      c.一个0或者一个不以0开头的数字.我们还可以允许开头有一个负号：^(0|-?[1-9][0-9]*)$</span>
<span class="line">      d.这表示一个0或者一个可能为负的开头不为0的数字.让用户以0开头好了.把负号的也去掉,因为钱总不能是负的吧.下面我们要加的是说明可能的小数部分：^[0-9]+(.[0-9]+)?$</span>
<span class="line">      e.必须说明的是,小数点后面至少应该有1位数,所以&quot;10.&quot;是不通过的,但是 &quot;10&quot; 和 &quot;10.2&quot; 是通过的：^[0-9]+(.[0-9]{2})?$</span>
<span class="line">      f.这样我们规定小数点后面必须有两位,如果你认为太苛刻了,可以这样：^[0-9]+(.[0-9]{1,2})?$</span>
<span class="line">      g.这样就允许用户只写一位小数.下面我们该考虑数字中的逗号了,我们可以这样：^[0-9]{1,3}(,[0-9]{3})*(.[0-9]{1,2})?$</span>
<span class="line">      h.1到3个数字,后面跟着任意个 逗号+3个数字,逗号成为可选,而不是必须：^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$</span>
<span class="line">15、 xml文件：^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\\\.[x|X][m|M][l|L]$</span>
<span class="line">16、 中文字符的正则表达式：[\\u4e00-\\u9fa5]</span>
<span class="line">17、 双字节字符：[^\\x00-\\xff]    (包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1))</span>
<span class="line">18、 空白行的正则表达式：\\n\\s*\\r    (可以用来删除空白行)</span>
<span class="line">19、 HTML标记的正则表达式：&lt;(\\S*?)[^&gt;]*&gt;.*?&lt;/\\1&gt;|&lt;.*? /&gt;    (网上流传的版本太糟糕，上面这个也仅仅能部分，对于复杂的嵌套标记依旧无能为力)</span>
<span class="line">20、 首尾空白字符的正则表达式：^\\s*|\\s*$或(^\\s*)|(\\s*$)    (可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)，非常有用的表达式)</span>
<span class="line">21、 腾讯QQ号：[1-9][0-9]{4,}    (腾讯QQ号从10000开始)</span>
<span class="line">22、 中国邮政编码：[1-9]\\d{5}(?!\\d)    (中国邮政编码为6位数字)</span>
<span class="line">23、 IP地址：\\d+\\.\\d+\\.\\d+\\.\\d+    (提取IP地址时有用)</span>
<span class="line">24、 IP地址：((?:(?:25[0-5]|2[0-4]\\\\d|[01]?\\\\d?\\\\d)\\\\.){3}(?:25[0-5]|2[0-4]\\\\d|[01]?\\\\d?\\\\d))  </span>
<span class="line">25、PV6 地址： (([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\\\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))</span>
<span class="line">26、URL 链接： ((http|ftp|https)://)(([a-zA-Z0-9\\._-]+\\.[a-zA-Z]{2,6})|([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9\\&amp;%_\\./-~-]*)?</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,103)])])}const d=s(l,[["render",i]]),o=JSON.parse('{"path":"/python-tutor/basics/regex.html","title":"正则表达式","lang":"zh-CN","frontmatter":{"description":"正则表达式 初识 Python 正则表达式 正则表达式是一个特殊的字符序列，用于判断一个字符串是否与我们所设定的字符序列是否匹配，也就是说检查一个字符串是否与某种模式匹配。 Python 自 1.5 版本起增加了re 模块，它提供 Perl 风格的正则表达式模式。re 模块使 Python 语言拥有全部的正则表达式功能。 下面通过实例，一步一步来初步认...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"正则表达式\\",\\"image\\":[\\"http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-%E4%B8%80%E6%AD%A5%E4%B8%80%E6%AD%A5%E4%BA%86%E8%A7%A3%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F.png\\",\\"http://twowater.com.cn/images/20171204192251900.gif\\"],\\"dateModified\\":\\"2022-05-26T11:39:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/python-tutor/basics/regex.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"正则表达式"}],["meta",{"property":"og:description","content":"正则表达式 初识 Python 正则表达式 正则表达式是一个特殊的字符序列，用于判断一个字符串是否与我们所设定的字符序列是否匹配，也就是说检查一个字符串是否与某种模式匹配。 Python 自 1.5 版本起增加了re 模块，它提供 Perl 风格的正则表达式模式。re 模块使 Python 语言拥有全部的正则表达式功能。 下面通过实例，一步一步来初步认..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-%E4%B8%80%E6%AD%A5%E4%B8%80%E6%AD%A5%E4%BA%86%E8%A7%A3%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-26T11:39:36.000Z"}],["meta",{"property":"article:modified_time","content":"2022-05-26T11:39:36.000Z"}]]},"git":{"createdTime":1653565176000,"updatedTime":1653565176000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":18.62,"words":5585},"filePathRelative":"python-tutor/basics/regex.md","autoDesc":true}');export{d as comp,o as data};
