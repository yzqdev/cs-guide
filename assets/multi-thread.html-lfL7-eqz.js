import{_ as s,c as a,a as p,o as e}from"./app-B6vXTniy.js";const t={};function l(i,n){return e(),a("div",null,[...n[0]||(n[0]=[p(`<h1 id="多线程编程" tabindex="-1"><a class="header-anchor" href="#多线程编程"><span>多线程编程</span></a></h1><p>其实创建线程之后，线程并不是始终保持一个状态的，其状态大概如下：</p><ul><li>New 创建</li><li>Runnable 就绪。等待调度</li><li>Running 运行</li><li>Blocked 阻塞。阻塞可能在 Wait Locked Sleeping</li><li>Dead 消亡</li></ul><p>线程有着不同的状态，也有不同的类型。大致可分为：</p><ul><li>主线程</li><li>子线程</li><li>守护线程（后台线程）</li><li>前台线程</li></ul><p>简单了解完这些之后，我们开始看看具体的代码使用了。</p><h2 id="_1、线程的创建" tabindex="-1"><a class="header-anchor" href="#_1、线程的创建"><span>1、线程的创建</span></a></h2><p>Python 提供两个模块进行多线程的操作，分别是 <code>thread</code> 和 <code>threading</code></p><p>前者是比较低级的模块，用于更底层的操作，一般应用级别的开发不常用。</p><p>因此，我们使用 <code>threading</code> 来举个例子：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment">#!/usr/bin/env python3</span></span>
<span class="line"><span class="token comment"># -*- coding: UTF-8 -*-</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> time</span>
<span class="line"><span class="token keyword">import</span> threading</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">MyThread</span><span class="token punctuation">(</span>threading<span class="token punctuation">.</span>Thread<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;thread {}, @number: {}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>name<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Start main threading&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 创建三个线程</span></span>
<span class="line">    threads <span class="token operator">=</span> <span class="token punctuation">[</span>MyThread<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token comment"># 启动三个线程</span></span>
<span class="line">    <span class="token keyword">for</span> t <span class="token keyword">in</span> threads<span class="token punctuation">:</span></span>
<span class="line">        t<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;End Main threading&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span></span>
<span class="line">    main<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p><div class="language-txt line-numbers-mode" data-highlighter="prismjs" data-ext="txt"><pre><code class="language-txt"><span class="line">Start main threading</span>
<span class="line">thread Thread-1, @number: 0</span>
<span class="line">thread Thread-2, @number: 0</span>
<span class="line">thread Thread-3, @number: 0</span>
<span class="line">End Main threading</span>
<span class="line">thread Thread-2, @number: 1</span>
<span class="line">thread Thread-1, @number: 1</span>
<span class="line">thread Thread-3, @number: 1</span>
<span class="line">thread Thread-1, @number: 2</span>
<span class="line">thread Thread-3, @number: 2</span>
<span class="line">thread Thread-2, @number: 2</span>
<span class="line">thread Thread-2, @number: 3</span>
<span class="line">thread Thread-3, @number: 3</span>
<span class="line">thread Thread-1, @number: 3</span>
<span class="line">thread Thread-3, @number: 4</span>
<span class="line">thread Thread-2, @number: 4</span>
<span class="line">thread Thread-1, @number: 4</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意喔，这里不同的环境输出的结果肯定是不一样的。</p><h2 id="_2、线程合并-join方法" tabindex="-1"><a class="header-anchor" href="#_2、线程合并-join方法"><span>2、线程合并（join方法）</span></a></h2><p>上面的示例打印出来的结果来看，主线程结束后，子线程还在运行。那么我们需要主线程要等待子线程运行完后，再退出，要怎么办呢？</p><p>这时候，就需要用到 <code>join</code> 方法了。</p><p>在上面的例子，新增一段代码，具体如下：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment">#!/usr/bin/env python3</span></span>
<span class="line"><span class="token comment"># -*- coding: UTF-8 -*-</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> time</span>
<span class="line"><span class="token keyword">import</span> threading</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">MyThread</span><span class="token punctuation">(</span>threading<span class="token punctuation">.</span>Thread<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;thread {}, @number: {}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>name<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Start main threading&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 创建三个线程</span></span>
<span class="line">    threads <span class="token operator">=</span> <span class="token punctuation">[</span>MyThread<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token comment"># 启动三个线程</span></span>
<span class="line">    <span class="token keyword">for</span> t <span class="token keyword">in</span> threads<span class="token punctuation">:</span></span>
<span class="line">        t<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 一次让新创建的线程执行 join</span></span>
<span class="line">    <span class="token keyword">for</span> t <span class="token keyword">in</span> threads<span class="token punctuation">:</span></span>
<span class="line">        t<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;End Main threading&quot;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span></span>
<span class="line">    main<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从打印的结果，可以清楚看到，相比上面示例打印出来的结果，主线程是在等待子线程运行结束后才结束的。</p><div class="language-txt line-numbers-mode" data-highlighter="prismjs" data-ext="txt"><pre><code class="language-txt"><span class="line">Start main threading</span>
<span class="line">thread Thread-1, @number: 0</span>
<span class="line">thread Thread-2, @number: 0</span>
<span class="line">thread Thread-3, @number: 0</span>
<span class="line">thread Thread-1, @number: 1</span>
<span class="line">thread Thread-3, @number: 1</span>
<span class="line">thread Thread-2, @number: 1</span>
<span class="line">thread Thread-2, @number: 2</span>
<span class="line">thread Thread-1, @number: 2</span>
<span class="line">thread Thread-3, @number: 2</span>
<span class="line">thread Thread-2, @number: 3</span>
<span class="line">thread Thread-1, @number: 3</span>
<span class="line">thread Thread-3, @number: 3</span>
<span class="line">thread Thread-3, @number: 4</span>
<span class="line">thread Thread-2, @number: 4</span>
<span class="line">thread Thread-1, @number: 4</span>
<span class="line">End Main threading</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、线程同步与互斥锁" tabindex="-1"><a class="header-anchor" href="#_3、线程同步与互斥锁"><span>3、线程同步与互斥锁</span></a></h2><p>使用线程加载获取数据，通常都会造成数据不同步的情况。当然，这时候我们可以给资源进行加锁，也就是访问资源的线程需要获得锁才能访问。</p><p>其中 <code>threading</code> 模块给我们提供了一个 Lock 功能。</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line">lock <span class="token operator">=</span> threading<span class="token punctuation">.</span>Lock<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>在线程中获取锁</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line">lock<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>使用完成后，我们肯定需要释放锁</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line">lock<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>当然为了支持在同一线程中多次请求同一资源，Python 提供了可重入锁（RLock）。RLock 内部维护着一个 Lock 和一个 counter 变量，counter 记录了 acquire 的次数，从而使得资源可以被多次 require。直到一个线程所有的 acquire 都被 release，其他的线程才能获得资源。</p><p>那么怎么创建重入锁呢？也是一句代码的事情：</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line">r_lock <span class="token operator">=</span> threading<span class="token punctuation">.</span>RLock<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><h2 id="_4、condition-条件变量" tabindex="-1"><a class="header-anchor" href="#_4、condition-条件变量"><span>4、Condition 条件变量</span></a></h2><p>实用锁可以达到线程同步，但是在更复杂的环境，需要针对锁进行一些条件判断。</p><p>Python 提供了 Condition 对象。</p><p><strong>使用 Condition 对象可以在某些事件触发或者达到特定的条件后才处理数据，Condition 除了具有 Lock 对象的 acquire 方法和 release 方法外，还提供了 wait 和 notify 方法。</strong></p><p>线程首先 acquire 一个条件变量锁。如果条件不足，则该线程 wait，如果满足就执行线程，甚至可以 notify 其他线程。其他处于 wait 状态的线程接到通知后会重新判断条件。</p><p>其中条件变量可以看成不同的线程先后 acquire 获得锁，如果不满足条件，可以理解为被扔到一个（ Lock 或 RLock ）的 waiting 池。直到其他线程 notify 之后再重新判断条件。不断的重复这一过程，从而解决复杂的同步问题。</p><p><img src="http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-Condition.png" alt=""></p><p>该模式常用于生产者消费者模式，具体看看下面在线购物买家和卖家的示例：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment">#!/usr/bin/env python3</span></span>
<span class="line"><span class="token comment"># -*- coding: UTF-8 -*-</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> threading<span class="token punctuation">,</span> time</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">Consumer</span><span class="token punctuation">(</span>threading<span class="token punctuation">.</span>Thread<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> cond<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token comment"># 初始化</span></span>
<span class="line">        <span class="token builtin">super</span><span class="token punctuation">(</span>Consumer<span class="token punctuation">,</span> self<span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        self<span class="token punctuation">.</span>cond <span class="token operator">=</span> cond</span>
<span class="line">        self<span class="token punctuation">.</span>name <span class="token operator">=</span> name</span>
<span class="line"></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token comment"># 确保先运行Seeker中的方法</span></span>
<span class="line">        time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">        self<span class="token punctuation">.</span>cond<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&#39;: 我这两件商品一起买，可以便宜点吗&#39;</span><span class="token punctuation">)</span></span>
<span class="line">        self<span class="token punctuation">.</span>cond<span class="token punctuation">.</span>notify<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        self<span class="token punctuation">.</span>cond<span class="token punctuation">.</span>wait<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&#39;: 我已经提交订单了，你修改下价格&#39;</span><span class="token punctuation">)</span></span>
<span class="line">        self<span class="token punctuation">.</span>cond<span class="token punctuation">.</span>notify<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        self<span class="token punctuation">.</span>cond<span class="token punctuation">.</span>wait<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&#39;: 收到，我支付成功了&#39;</span><span class="token punctuation">)</span></span>
<span class="line">        self<span class="token punctuation">.</span>cond<span class="token punctuation">.</span>notify<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        self<span class="token punctuation">.</span>cond<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&#39;: 等待收货&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">Producer</span><span class="token punctuation">(</span>threading<span class="token punctuation">.</span>Thread<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> cond<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token builtin">super</span><span class="token punctuation">(</span>Producer<span class="token punctuation">,</span> self<span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        self<span class="token punctuation">.</span>cond <span class="token operator">=</span> cond</span>
<span class="line">        self<span class="token punctuation">.</span>name <span class="token operator">=</span> name</span>
<span class="line"></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        self<span class="token punctuation">.</span>cond<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token comment"># 释放对琐的占用，同时线程挂起在这里，直到被 notify 并重新占有琐。</span></span>
<span class="line">        self<span class="token punctuation">.</span>cond<span class="token punctuation">.</span>wait<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&#39;: 可以的，你提交订单吧&#39;</span><span class="token punctuation">)</span></span>
<span class="line">        self<span class="token punctuation">.</span>cond<span class="token punctuation">.</span>notify<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        self<span class="token punctuation">.</span>cond<span class="token punctuation">.</span>wait<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&#39;: 好了，已经修改了&#39;</span><span class="token punctuation">)</span></span>
<span class="line">        self<span class="token punctuation">.</span>cond<span class="token punctuation">.</span>notify<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        self<span class="token punctuation">.</span>cond<span class="token punctuation">.</span>wait<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&#39;: 嗯，收款成功，马上给你发货&#39;</span><span class="token punctuation">)</span></span>
<span class="line">        self<span class="token punctuation">.</span>cond<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">&#39;: 发货商品&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line">cond <span class="token operator">=</span> threading<span class="token punctuation">.</span>Condition<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">consumer <span class="token operator">=</span> Consumer<span class="token punctuation">(</span>cond<span class="token punctuation">,</span> <span class="token string">&#39;买家（两点水）&#39;</span><span class="token punctuation">)</span></span>
<span class="line">producer <span class="token operator">=</span> Producer<span class="token punctuation">(</span>cond<span class="token punctuation">,</span> <span class="token string">&#39;卖家（三点水）&#39;</span><span class="token punctuation">)</span></span>
<span class="line">consumer<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">producer<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出的结果如下：</p><div class="language-txt" data-highlighter="prismjs" data-ext="txt"><pre><code class="language-txt"><span class="line">买家（两点水）: 我这两件商品一起买，可以便宜点吗</span>
<span class="line">卖家（三点水）: 可以的，你提交订单吧</span>
<span class="line">买家（两点水）: 我已经提交订单了，你修改下价格</span>
<span class="line">卖家（三点水）: 好了，已经修改了</span>
<span class="line">买家（两点水）: 收到，我支付成功了</span>
<span class="line">买家（两点水）: 等待收货</span>
<span class="line">卖家（三点水）: 嗯，收款成功，马上给你发货</span>
<span class="line">卖家（三点水）: 发货商品</span>
<span class="line"></span></code></pre></div><h2 id="_5、线程间通信" tabindex="-1"><a class="header-anchor" href="#_5、线程间通信"><span>5、线程间通信</span></a></h2><p>如果程序中有多个线程，这些线程避免不了需要相互通信的。那么我们怎样在这些线程之间安全地交换信息或数据呢？</p><p>从一个线程向另一个线程发送数据最安全的方式可能就是使用 queue 库中的队列了。创建一个被多个线程共享的 <code>Queue</code> 对象，这些线程通过使用 <code>put()</code> 和 <code>get()</code> 操作来向队列中添加或者删除元素。</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># -*- coding: UTF-8 -*-</span></span>
<span class="line"><span class="token keyword">from</span> queue <span class="token keyword">import</span> Queue</span>
<span class="line"><span class="token keyword">from</span> threading <span class="token keyword">import</span> Thread</span>
<span class="line"></span>
<span class="line">isRead <span class="token operator">=</span> <span class="token boolean">True</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">write</span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment"># 写数据进程</span></span>
<span class="line">    <span class="token keyword">for</span> value <span class="token keyword">in</span> <span class="token punctuation">[</span><span class="token string">&#39;两点水&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;三点水&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;四点水&#39;</span><span class="token punctuation">]</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;写进 Queue 的值为：{0}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        q<span class="token punctuation">.</span>put<span class="token punctuation">(</span>value<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">read</span><span class="token punctuation">(</span>q<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment"># 读取数据进程</span></span>
<span class="line">    <span class="token keyword">while</span> isRead<span class="token punctuation">:</span></span>
<span class="line">        value <span class="token operator">=</span> q<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token boolean">True</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;从 Queue 读取的值为：{0}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span></span>
<span class="line">    q <span class="token operator">=</span> Queue<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    t1 <span class="token operator">=</span> Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>write<span class="token punctuation">,</span> args<span class="token operator">=</span><span class="token punctuation">(</span>q<span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    t2 <span class="token operator">=</span> Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>read<span class="token punctuation">,</span> args<span class="token operator">=</span><span class="token punctuation">(</span>q<span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    t1<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    t2<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出的结果如下：</p><div class="language-txt" data-highlighter="prismjs" data-ext="txt"><pre><code class="language-txt"><span class="line">写进 Queue 的值为：两点水</span>
<span class="line">写进 Queue 的值为：三点水</span>
<span class="line">从 Queue 读取的值为：两点水</span>
<span class="line">写进 Queue 的值为：四点水</span>
<span class="line">从 Queue 读取的值为：三点水</span>
<span class="line">从 Queue 读取的值为：四点水</span>
<span class="line"></span></code></pre></div><p>Python 还提供了 Event 对象用于线程间通信，它是由线程设置的信号标志，如果信号标志位真，则其他线程等待直到信号接触。</p><p>Event 对象实现了简单的线程通信机制，它提供了设置信号，清楚信号，等待等用于实现线程间的通信。</p><ul><li>设置信号</li></ul><p>使用 Event 的 <code>set()</code> 方法可以设置 Event 对象内部的信号标志为真。Event 对象提供了 <code>isSe()</code> 方法来判断其内部信号标志的状态。当使用 event 对象的 <code>set()</code> 方法后，<code>isSet()</code> 方法返回真</p><ul><li>清除信号</li></ul><p>使用 Event 对象的 <code>clear()</code> 方法可以清除 Event 对象内部的信号标志，即将其设为假，当使用 Event 的 clear 方法后，isSet() 方法返回假</p><ul><li>等待</li></ul><p>Event 对象 wait 的方法只有在内部信号为真的时候才会很快的执行并完成返回。当 Event 对象的内部信号标志位假时，则 wait 方法一直等待到其为真时才返回。</p><p>示例：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># -*- coding: UTF-8 -*-</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> threading</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">mThread</span><span class="token punctuation">(</span>threading<span class="token punctuation">.</span>Thread<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> threadname<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        threading<span class="token punctuation">.</span>Thread<span class="token punctuation">.</span>__init__<span class="token punctuation">(</span>self<span class="token punctuation">,</span> name<span class="token operator">=</span>threadname<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token comment"># 使用全局Event对象</span></span>
<span class="line">        <span class="token keyword">global</span> event</span>
<span class="line">        <span class="token comment"># 判断Event对象内部信号标志</span></span>
<span class="line">        <span class="token keyword">if</span> event<span class="token punctuation">.</span>isSet<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">            event<span class="token punctuation">.</span>clear<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            event<span class="token punctuation">.</span>wait<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">print</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>getName<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">else</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token keyword">print</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>getName<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token comment"># 设置Event对象内部信号标志</span></span>
<span class="line">            event<span class="token punctuation">.</span><span class="token builtin">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 生成Event对象</span></span>
<span class="line">event <span class="token operator">=</span> threading<span class="token punctuation">.</span>Event<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment"># 设置Event对象内部信号标志</span></span>
<span class="line">event<span class="token punctuation">.</span><span class="token builtin">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">t1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    t <span class="token operator">=</span> mThread<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment"># 生成线程列表</span></span>
<span class="line">    t1<span class="token punctuation">.</span>append<span class="token punctuation">(</span>t<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> i <span class="token keyword">in</span> t1<span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment"># 运行线程</span></span>
<span class="line">    i<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出的结果如下：</p><div class="language-txt" data-highlighter="prismjs" data-ext="txt"><pre><code class="language-txt"><span class="line">1</span>
<span class="line">0</span>
<span class="line">3</span>
<span class="line">2</span>
<span class="line">5</span>
<span class="line">4</span>
<span class="line">7</span>
<span class="line">6</span>
<span class="line">9</span>
<span class="line">8</span>
<span class="line"></span></code></pre></div><h2 id="_6、后台线程" tabindex="-1"><a class="header-anchor" href="#_6、后台线程"><span>6、后台线程</span></a></h2><p>默认情况下，主线程退出之后，即使子线程没有 join。那么主线程结束后，子线程也依然会继续执行。如果希望主线程退出后，其子线程也退出而不再执行，则需要设置子线程为后台线程。Python 提供了 <code>setDeamon</code> 方法。</p>`,63)])])}const o=s(t,[["render",l]]),u=JSON.parse('{"path":"/python-tutor/basics/multi-thread.html","title":"多线程编程","lang":"zh-CN","frontmatter":{"description":"多线程编程 其实创建线程之后，线程并不是始终保持一个状态的，其状态大概如下： New 创建 Runnable 就绪。等待调度 Running 运行 Blocked 阻塞。阻塞可能在 Wait Locked Sleeping Dead 消亡 线程有着不同的状态，也有不同的类型。大致可分为： 主线程 子线程 守护线程（后台线程） 前台线程 简单了解完这些之...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"多线程编程\\",\\"image\\":[\\"http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-Condition.png\\"],\\"dateModified\\":\\"2022-05-26T11:39:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/python-tutor/basics/multi-thread.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"多线程编程"}],["meta",{"property":"og:description","content":"多线程编程 其实创建线程之后，线程并不是始终保持一个状态的，其状态大概如下： New 创建 Runnable 就绪。等待调度 Running 运行 Blocked 阻塞。阻塞可能在 Wait Locked Sleeping Dead 消亡 线程有着不同的状态，也有不同的类型。大致可分为： 主线程 子线程 守护线程（后台线程） 前台线程 简单了解完这些之..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-10-14-Condition.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-26T11:39:36.000Z"}],["meta",{"property":"article:modified_time","content":"2022-05-26T11:39:36.000Z"}]]},"git":{"createdTime":1653497324000,"updatedTime":1653565176000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":7.56,"words":2267},"filePathRelative":"python-tutor/basics/multi-thread.md","autoDesc":true}');export{o as comp,u as data};
