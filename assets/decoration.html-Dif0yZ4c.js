import{_ as s,c as a,a as p,o as t}from"./app-B6vXTniy.js";const e={};function c(l,n){return t(),a("div",null,[...n[0]||(n[0]=[p(`<h1 id="装饰器" tabindex="-1"><a class="header-anchor" href="#装饰器"><span>装饰器</span></a></h1><p>上一篇文章将通过解决一个需求问题来了解了闭包，本文也将一样，通过慢慢演变一个需求，一步一步来了解 python 装饰器。</p><p>首先有这么一个输出员工打卡信息的函数：</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">def</span> <span class="token function">punch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;昵称：两点水  部门：做鸭事业部 上班打卡成功&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">punch<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>输出的结果如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">昵称：两点水  部门：做鸭事业部 上班打卡成功</span>
<span class="line"></span></code></pre></div><p>然后，产品反馈，不行啊，怎么上班打卡没有具体的日期，加上打卡的具体日期吧，这应该很简单，分分钟解决啦。好吧，那就直接添加打印日期的代码吧，如下：</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">import</span> time</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">punch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>strftime<span class="token punctuation">(</span><span class="token string">&#39;%Y-%m-%d&#39;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>localtime<span class="token punctuation">(</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;昵称：两点水  部门：做鸭事业部 上班打卡成功&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">punch<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>输出结果如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">2018-01-09</span>
<span class="line">昵称：两点水  部门：做鸭事业部 上班打卡成功</span>
<span class="line"></span></code></pre></div><p>这样改是可以，可是这样改是改变了函数的功能结构的，本身这个函数定义的时候就是打印某个员工的信息和提示打卡成功，现在增加打印日期的代码，可能会造成很多代码重复的问题。比如，还有一个地方只需要打印员工信息和打卡成功就行了，不需要日期，那么你又要重写一个函数吗？而且打印当前日期的这个功能方法是经常使用的，是可以作为公共函数给各个模块方法调用的。当然，这都是作为一个整体项目来考虑的。</p><p>既然是这样，我们可以使用函数式编程来修改这部分的代码。因为通过之前的学习，我们知道 python 函数有两个特点，函数也是一个对象，而且函数里可以嵌套函数，那么修改一下代码变成下面这个样子：</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">import</span> time</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">punch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;昵称：两点水  部门：做鸭事业部 上班打卡成功&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">add_time</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>strftime<span class="token punctuation">(</span><span class="token string">&#39;%Y-%m-%d&#39;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>localtime<span class="token punctuation">(</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    func<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">add_time<span class="token punctuation">(</span>punch<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>输出结果：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">2018-01-09</span>
<span class="line">昵称：两点水  部门：做鸭事业部 上班打卡成功</span>
<span class="line"></span></code></pre></div><p>这样是不是发现，这样子就没有改动 <code>punch</code> 方法，而且任何需要用到打印当前日期的函数都可以把函数传进 <code>add_time</code> 就可以了，就比如这样：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">import</span> time</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">punch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;昵称：两点水  部门：做鸭事业部 上班打卡成功&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">add_time</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>strftime<span class="token punctuation">(</span><span class="token string">&#39;%Y-%m-%d&#39;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>localtime<span class="token punctuation">(</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    func<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">holiday</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;天气太冷，今天放假&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">add_time<span class="token punctuation">(</span>punch<span class="token punctuation">)</span></span>
<span class="line">add_time<span class="token punctuation">(</span>holiday<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打印结果：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">2018-01-09</span>
<span class="line">昵称：两点水  部门：做鸭事业部 上班打卡成功</span>
<span class="line">2018-01-09</span>
<span class="line">天气太冷，今天放假</span>
<span class="line"></span></code></pre></div><p>使用函数编程是不是很方便，但是，我们每次调用的时候，我们都不得不把原来的函数作为参数传递进去，还能不能有更好的实现方式呢？有的，就是本文要介绍的装饰器，因为装饰器的写法其实跟闭包是差不多的，不过没有了自由变量，那么这里直接给出上面那段代码的装饰器写法，来对比一下，装饰器的写法和函数式编程有啥不同。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">import</span> time</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">decorator</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">punch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>strftime<span class="token punctuation">(</span><span class="token string">&#39;%Y-%m-%d&#39;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>localtime<span class="token punctuation">(</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        func<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> punch</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">punch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;昵称：两点水  部门：做鸭事业部 上班打卡成功&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">f <span class="token operator">=</span> decorator<span class="token punctuation">(</span>punch<span class="token punctuation">)</span></span>
<span class="line">f<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出的结果：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">2018-01-09</span>
<span class="line">昵称：两点水  部门：做鸭事业部 上班打卡成功</span>
<span class="line"></span></code></pre></div><p>通过代码，能知道装饰器函数一般做这三件事：</p><ol><li>接收一个函数作为参数</li><li>嵌套一个包装函数, 包装函数会接收原函数的相同参数，并执行原函数，且还会执行附加功能</li><li>返回嵌套函数</li></ol><p>可是，认真一看这代码，这装饰器的写法怎么比函数式编程还麻烦啊。而且看起来比较复杂，甚至有点多此一举的感觉。</p><p>那是因为我们还没有用到装饰器的 “语法糖” ，我们看上面的代码可以知道， python 在引入装饰器 （Decorator） 的时候，没有引入任何新的语法特性，都是基于函数的语法特性。这也就说明了装饰器不是 python 特有的，而是每个语言通用的一种编程思想。只不过 python 设计出了 <code>@</code> 语法糖，让 定义装饰器，把装饰器调用原函数再把结果赋值为原函数的对象名的过程变得更加简单，方便，易操作，所以 python 装饰器的核心可以说就是它的语法糖。</p><p>那么怎么使用它的语法糖呢？很简单，根据上面的写法写完装饰器函数后，直接在原来的函数上加 <code>@</code> 和装饰器的函数名。如下：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">import</span> time</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">decorator</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">punch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>strftime<span class="token punctuation">(</span><span class="token string">&#39;%Y-%m-%d&#39;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>localtime<span class="token punctuation">(</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        func<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> punch</span>
<span class="line"></span>
<span class="line"><span class="token decorator annotation punctuation">@decorator</span></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">punch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;昵称：两点水  部门：做鸭事业部 上班打卡成功&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">punch<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">2018-01-09</span>
<span class="line">昵称：两点水  部门：做鸭事业部 上班打卡成功</span>
<span class="line"></span></code></pre></div><p>那么这就很方便了，方便在我们的调用上，比如例子中的，使用了装饰器后，直接在原本的函数上加上装饰器的语法糖就可以了，本函数也无虚任何改变，调用的地方也不需修改。</p><p>不过这里一直有个问题，就是输出打卡信息的是固定的，那么我们需要通过参数来传递，装饰器该怎么写呢？装饰器中的函数可以使用 <code>*args</code> 可变参数，可是仅仅使用 <code>*args</code> 是不能完全包括所有参数的情况，比如关键字参数就不能了，为了能兼容关键字参数，我们还需要加上 <code>**kwargs</code> 。</p><p>因此，装饰器的最终形式可以写成这样：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">import</span> time</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">decorator</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">punch</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>strftime<span class="token punctuation">(</span><span class="token string">&#39;%Y-%m-%d&#39;</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>localtime<span class="token punctuation">(</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> punch</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token decorator annotation punctuation">@decorator</span></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">punch</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> department<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;昵称：{0}  部门：{1} 上班打卡成功&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> department<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token decorator annotation punctuation">@decorator</span></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">print_args</span><span class="token punctuation">(</span>reason<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span>kwargs<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">punch<span class="token punctuation">(</span><span class="token string">&#39;两点水&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;做鸭事业部&#39;</span><span class="token punctuation">)</span></span>
<span class="line">print_args<span class="token punctuation">(</span><span class="token string">&#39;两点水&#39;</span><span class="token punctuation">,</span> sex<span class="token operator">=</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span> age<span class="token operator">=</span><span class="token number">99</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">2018-01-09</span>
<span class="line">昵称：两点水  部门：做鸭事业部 上班打卡成功</span>
<span class="line">2018-01-09</span>
<span class="line">两点水</span>
<span class="line">{&#39;sex&#39;: &#39;男&#39;, &#39;age&#39;: 99}</span>
<span class="line"></span></code></pre></div>`,37)])])}const o=s(e,[["render",c]]),u=JSON.parse('{"path":"/python-tutor/basics/decoration.html","title":"装饰器","lang":"zh-CN","frontmatter":{"description":"装饰器 上一篇文章将通过解决一个需求问题来了解了闭包，本文也将一样，通过慢慢演变一个需求，一步一步来了解 python 装饰器。 首先有这么一个输出员工打卡信息的函数： 输出的结果如下： 然后，产品反馈，不行啊，怎么上班打卡没有具体的日期，加上打卡的具体日期吧，这应该很简单，分分钟解决啦。好吧，那就直接添加打印日期的代码吧，如下： 输出结果如下： 这样...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"装饰器\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-01T05:22:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/python-tutor/basics/decoration.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"装饰器"}],["meta",{"property":"og:description","content":"装饰器 上一篇文章将通过解决一个需求问题来了解了闭包，本文也将一样，通过慢慢演变一个需求，一步一步来了解 python 装饰器。 首先有这么一个输出员工打卡信息的函数： 输出的结果如下： 然后，产品反馈，不行啊，怎么上班打卡没有具体的日期，加上打卡的具体日期吧，这应该很简单，分分钟解决啦。好吧，那就直接添加打印日期的代码吧，如下： 输出结果如下： 这样..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-01T05:22:42.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-01T05:22:42.000Z"}]]},"git":{"createdTime":1653497324000,"updatedTime":1682918562000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":4,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":5.39,"words":1616},"filePathRelative":"python-tutor/basics/decoration.md","autoDesc":true}');export{o as comp,u as data};
