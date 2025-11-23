import{_ as s,c as n,a as e,o as l}from"./app-B6vXTniy.js";const p={};function t(c,a){return l(),n("div",null,[...a[0]||(a[0]=[e(`<h1 id="es6-es2015-到es8" tabindex="-1"><a class="header-anchor" href="#es6-es2015-到es8"><span>ES6 (ES2015)到es8</span></a></h1><p>直接看掘金上的文章不香吗?? <a href="https://juejin.cn/post/6844903775329583112" target="_blank" rel="noopener noreferrer">https://juejin.cn/post/6844903775329583112</a></p><h2 id="es7新特性-2016" tabindex="-1"><a class="header-anchor" href="#es7新特性-2016"><span>ES7新特性（2016）</span></a></h2><p>ES2016添加了两个小的特性来说明标准化过程：</p><ul><li>数组includes()方法，用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回true，否则返回false。</li><li>a ** b指数运算符，它与 Math.pow(a, b)相同。</li></ul><h3 id="_1-array-prototype-includes" tabindex="-1"><a class="header-anchor" href="#_1-array-prototype-includes"><span>1.Array.prototype.includes()</span></a></h3><p><code>includes()</code> 函数用来判断一个数组是否包含一个指定的值，如果包含则返回 <code>true</code>，否则返回<code>false</code>。</p><p><code>includes</code> 函数与 <code>indexOf</code> 函数很相似，下面两个表达式是等价的：</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line">arr<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span></span>
<span class="line">arr<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">0</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>接下来我们来判断数字中是否包含某个元素：</p><blockquote><p>在ES7之前的做法</p></blockquote><p>使用<code>indexOf()</code>验证数组中是否存在某个元素，这时需要根据返回值是否为-1来判断：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let arr = [&#39;react&#39;, &#39;angular&#39;, &#39;vue&#39;];</span>
<span class="line"></span>
<span class="line">if (arr.indexOf(&#39;react&#39;) !== -1)</span>
<span class="line">{</span>
<span class="line">    console.log(&#39;react存在&#39;);</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><blockquote><p>使用ES7的includes()</p></blockquote><p>使用includes()验证数组中是否存在某个元素，这样更加直观简单：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let arr = [&#39;react&#39;, &#39;angular&#39;, &#39;vue&#39;];</span>
<span class="line"></span>
<span class="line">if (arr.includes(&#39;react&#39;))</span>
<span class="line">{</span>
<span class="line">    console.log(&#39;react存在&#39;);</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_2-指数操作符" tabindex="-1"><a class="header-anchor" href="#_2-指数操作符"><span>2.指数操作符</span></a></h3><p>在ES7中引入了指数运算符<code>**</code>，<code>**</code>具有与<code>Math.pow(..)</code>等效的计算结果。</p><blockquote><p>不使用指数操作符</p></blockquote><p>使用自定义的递归函数calculateExponent或者Math.pow()进行指数运算：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">function calculateExponent(base, exponent)</span>
<span class="line">{</span>
<span class="line">    if (exponent === 1)</span>
<span class="line">    {</span>
<span class="line">        return base;</span>
<span class="line">    }</span>
<span class="line">    else</span>
<span class="line">    {</span>
<span class="line">        return base * calculateExponent(base, exponent - 1);</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">console.log(calculateExponent(2, 10)); // 输出1024</span>
<span class="line">console.log(Math.pow(2, 10)); // 输出1024</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>使用指数操作符</p></blockquote><p>使用指数运算符**，就像+、-等操作符一样：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">console.log(2**10);// 输出1024</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="es8新特性-2017" tabindex="-1"><a class="header-anchor" href="#es8新特性-2017"><span>ES8新特性（2017）</span></a></h2><ul><li>async/await</li><li><code>Object.values()</code></li><li><code>Object.entries()</code></li><li>String padding: <code>padStart()</code>和<code>padEnd()</code>，填充字符串达到当前长度</li><li>函数参数列表结尾允许逗号</li><li><code>Object.getOwnPropertyDescriptors()</code></li><li><code>ShareArrayBuffer</code>和<code>Atomics</code>对象，用于从共享内存位置读取和写入</li></ul><h3 id="_1-async-await" tabindex="-1"><a class="header-anchor" href="#_1-async-await"><span>1.async/await</span></a></h3><p>ES2018引入异步迭代器（asynchronous iterators），这就像常规迭代器，除了<code>next()</code>方法返回一个Promise。因此<code>await</code>可以和<code>for...of</code>循环一起使用，以串行的方式运行异步操作。例如：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">async function process(array) {</span>
<span class="line">  for await (let i of array) {</span>
<span class="line">    doSomething(i);</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_2-object-values" tabindex="-1"><a class="header-anchor" href="#_2-object-values"><span>2.Object.values()</span></a></h3><p><code>Object.values()</code>是一个与<code>Object.keys()</code>类似的新函数，但返回的是Object自身属性的所有值，不包括继承的值。</p><p>假设我们要遍历如下对象<code>obj</code>的所有值：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">const obj = {a: 1, b: 2, c: 3};</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><blockquote><p>不使用Object.values() :ES7</p></blockquote><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">const vals=Object.keys(obj).map(key=&gt;obj[key]);</span>
<span class="line">console.log(vals);//[1, 2, 3]</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><blockquote><p>使用Object.values() :ES8</p></blockquote><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">const values=Object.values(obj1);</span>
<span class="line">console.log(values);//[1, 2, 3]</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>从上述代码中可以看出<code>Object.values()</code>为我们省去了遍历key，并根据这些key获取value的步骤。</p><h3 id="_3-object-entries" tabindex="-1"><a class="header-anchor" href="#_3-object-entries"><span>3.Object.entries()</span></a></h3><p><code>Object.entries()</code>函数返回一个给定对象自身可枚举属性的键值对的数组。</p><p>接下来我们来遍历上文中的<code>obj</code>对象的所有属性的key和value：</p><blockquote><p>不使用Object.entries() :ES7</p></blockquote><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Object.keys(obj).forEach(key=&gt;{</span>
<span class="line"> console.log(&#39;key:&#39;+key+&#39; value:&#39;+obj[key]);</span>
<span class="line">})</span>
<span class="line">//key:a value:1</span>
<span class="line">//key:b value:2</span>
<span class="line">//key:c value:3</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><blockquote><p>使用Object.entries() :ES8</p></blockquote><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">for(let [key,value] of Object.entries(obj1)){</span>
<span class="line"> console.log(\`key: \${key} value:\${value}\`)</span>
<span class="line">}</span>
<span class="line">//key:a value:1</span>
<span class="line">//key:b value:2</span>
<span class="line">//key:c value:3</span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_4-string-padding" tabindex="-1"><a class="header-anchor" href="#_4-string-padding"><span>4.String padding</span></a></h3><p>在ES8中String新增了两个实例函数<code>String.prototype.padStart</code>和<code>String.prototype.padEnd</code>，允许将空字符串或其他字符串添加到原始字符串的开头或结尾。</p><blockquote><p>String.padStart(targetLength,[padString])</p></blockquote><ul><li>targetLength:当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。</li><li>padString:(可选)填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断，此参数的缺省值为 &quot; &quot;。</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">console.log(&#39;0.0&#39;.padStart(4,&#39;10&#39;)) //10.0</span>
<span class="line">console.log(&#39;0.0&#39;.padStart(20))// 0.00    </span>
<span class="line"></span>
<span class="line"></span></code></pre></div><blockquote><p>String.padEnd(targetLength,padString])</p></blockquote><ul><li>targetLength:当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。</li><li>padString:(可选) 填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断，此参数的缺省值为 &quot; &quot;；</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">console.log(&#39;0.0&#39;.padEnd(4,&#39;0&#39;)) //0.00    </span>
<span class="line">console.log(&#39;0.0&#39;.padEnd(10,&#39;0&#39;))//0.00000000</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_5-函数参数列表结尾允许逗号" tabindex="-1"><a class="header-anchor" href="#_5-函数参数列表结尾允许逗号"><span>5.函数参数列表结尾允许逗号</span></a></h3><p>主要作用是方便使用git进行多人协作开发时修改同一个函数减少不必要的行变更。</p><h3 id="_6-object-getownpropertydescriptors" tabindex="-1"><a class="header-anchor" href="#_6-object-getownpropertydescriptors"><span>6.Object.getOwnPropertyDescriptors()</span></a></h3><p><code>Object.getOwnPropertyDescriptors()</code>函数用来获取一个对象的所有自身属性的描述符,如果没有任何自身属性，则返回空对象。</p><blockquote><p>函数原型：</p></blockquote><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Object.getOwnPropertyDescriptors(obj)</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>返回<code>obj</code>对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">const obj2 = {</span>
<span class="line"> name: &#39;Jine&#39;,</span>
<span class="line"> get age() { return &#39;18&#39; }</span>
<span class="line">};</span>
<span class="line">Object.getOwnPropertyDescriptors(obj2)</span>
<span class="line">// {</span>
<span class="line">//   age: {</span>
<span class="line">//     configurable: true,</span>
<span class="line">//     enumerable: true,</span>
<span class="line">//     get: function age(){}, //the getter function</span>
<span class="line">//     set: undefined</span>
<span class="line">//   },</span>
<span class="line">//   name: {</span>
<span class="line">//     configurable: true,</span>
<span class="line">//     enumerable: true,</span>
<span class="line">//  value:&quot;Jine&quot;,</span>
<span class="line">//  writable:true</span>
<span class="line">//   }</span>
<span class="line">// }</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-sharedarraybuffer对象" tabindex="-1"><a class="header-anchor" href="#_7-sharedarraybuffer对象"><span>7.SharedArrayBuffer对象</span></a></h3><p>SharedArrayBuffer 对象用来表示一个通用的，固定长度的原始二进制数据缓冲区，类似于 ArrayBuffer 对象，它们都可以用来在共享内存（shared memory）上创建视图。与 ArrayBuffer 不同的是，SharedArrayBuffer 不能被分离。</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/**</span>
<span class="line"> * </span>
<span class="line"> * @param {*} length 所创建的数组缓冲区的大小，以字节(byte)为单位。  </span>
<span class="line"> * @returns {SharedArrayBuffer} 一个大小指定的新 SharedArrayBuffer 对象。其内容被初始化为 0。</span>
<span class="line"> */</span>
<span class="line">new SharedArrayBuffer(length)</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_8-atomics对象" tabindex="-1"><a class="header-anchor" href="#_8-atomics对象"><span>8.Atomics对象</span></a></h3><p>Atomics 对象提供了一组静态方法用来对 SharedArrayBuffer 对象进行原子操作。</p><p>这些原子操作属于 Atomics 模块。与一般的全局对象不同，Atomics 不是构造函数，因此不能使用 new 操作符调用，也不能将其当作函数直接调用。Atomics 的所有属性和方法都是静态的（与 Math  对象一样）。</p><p>多个共享内存的线程能够同时读写同一位置上的数据。原子操作会确保正在读或写的数据的值是符合预期的，即下一个原子操作一定会在上一个原子操作结束后才会开始，其操作过程不会中断。</p><ul><li>Atomics.add()</li></ul><blockquote><p>将指定位置上的数组元素与给定的值相加，并返回相加前该元素的值。</p></blockquote><ul><li>Atomics.and()</li></ul><blockquote><p>将指定位置上的数组元素与给定的值相与，并返回与操作前该元素的值。</p></blockquote><ul><li>Atomics.compareExchange()</li></ul><blockquote><p>如果数组中指定的元素与给定的值相等，则将其更新为新的值，并返回该元素原先的值。</p></blockquote><ul><li>Atomics.exchange()</li></ul><blockquote><p>将数组中指定的元素更新为给定的值，并返回该元素更新前的值。</p></blockquote><ul><li>Atomics.load()</li></ul><blockquote><p>返回数组中指定元素的值。</p></blockquote><ul><li>Atomics.or()</li></ul><blockquote><p>将指定位置上的数组元素与给定的值相或，并返回或操作前该元素的值。</p></blockquote><ul><li>Atomics.store()</li></ul><blockquote><p>将数组中指定的元素设置为给定的值，并返回该值。</p></blockquote><ul><li>Atomics.sub()</li></ul><blockquote><p>将指定位置上的数组元素与给定的值相减，并返回相减前该元素的值。</p></blockquote><ul><li>Atomics.xor()</li></ul><blockquote><p>将指定位置上的数组元素与给定的值相异或，并返回异或操作前该元素的值。</p></blockquote><p>wait() 和 wake() 方法采用的是 Linux 上的 futexes 模型（fast user-space mutex，快速用户空间互斥量），可以让进程一直等待直到某个特定的条件为真，主要用于实现阻塞。</p><ul><li>Atomics.wait()</li></ul><blockquote><p>检测数组中某个指定位置上的值是否仍然是给定值，是则保持挂起直到被唤醒或超时。返回值为 &quot;ok&quot;、&quot;not-equal&quot; 或 &quot;time-out&quot;。调用时，如果当前线程不允许阻塞，则会抛出异常（大多数浏览器都不允许在主线程中调用 wait()）。</p></blockquote><ul><li>Atomics.wake()</li></ul><blockquote><p>唤醒等待队列中正在数组指定位置的元素上等待的线程。返回值为成功唤醒的线程数量。</p></blockquote><ul><li>Atomics.isLockFree(size)</li></ul><blockquote><p>可以用来检测当前系统是否支持硬件级的原子操作。对于指定大小的数组，如果当前系统支持硬件级的原子操作，则返回 true；否则就意味着对于该数组，Atomics 对象中的各原子操作都只能用锁来实现。此函数面向的是技术专家。--&gt;</p></blockquote><h2 id="es9新特性-2018" tabindex="-1"><a class="header-anchor" href="#es9新特性-2018"><span>ES9新特性（2018）</span></a></h2><ul><li>异步迭代</li><li>Promise.finally()</li><li>Rest/Spread 属性</li><li><a href="http://esnext.justjavac.com/proposal/regexp-named-groups.html" target="_blank" rel="noopener noreferrer">正则表达式命名捕获组</a>（Regular Expression Named Capture Groups）</li><li><a href="https://segmentfault.com/a/1190000006824133" target="_blank" rel="noopener noreferrer">正则表达式反向断言</a>（lookbehind）</li><li>正则表达式dotAll模式</li><li><a href="https://juejin.im/post/6844903622870827022#heading-1" target="_blank" rel="noopener noreferrer">正则表达式 Unicode 转义</a></li><li><a href="https://juejin.im/post/6844903622870827022#heading-1" target="_blank" rel="noopener noreferrer">非转义序列的模板字符串</a></li></ul><h3 id="_1-异步迭代" tabindex="-1"><a class="header-anchor" href="#_1-异步迭代"><span>1.异步迭代</span></a></h3><p>在<code>async/await</code>的某些时刻，你可能尝试在同步循环中调用异步函数。例如：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">async function process(array) {</span>
<span class="line">  for (let i of array) {</span>
<span class="line">    await doSomething(i);</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>这段代码不会正常运行，下面这段同样也不会：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">async function process(array) {</span>
<span class="line">  array.forEach(async i =&gt; {</span>
<span class="line">    await doSomething(i);</span>
<span class="line">  });</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>这段代码中，循环本身依旧保持同步，并在在内部异步函数之前全部调用完成。</p><p>ES2018引入异步迭代器（asynchronous iterators），这就像常规迭代器，除了<code>next()</code>方法返回一个Promise。因此<code>await</code>可以和<code>for...of</code>循环一起使用，以串行的方式运行异步操作。例如：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">async function process(array) {</span>
<span class="line">  for await (let i of array) {</span>
<span class="line">    doSomething(i);</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_2-promise-finally" tabindex="-1"><a class="header-anchor" href="#_2-promise-finally"><span>2.Promise.finally()</span></a></h3><p>一个Promise调用链要么成功到达最后一个<code>.then()</code>，要么失败触发<code>.catch()</code>。在某些情况下，你想要在无论Promise运行成功还是失败，运行相同的代码，例如清除，删除对话，关闭数据库连接等。</p><p><code>.finally()</code>允许你指定最终的逻辑：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">function doSomething() {</span>
<span class="line">  doSomething1()</span>
<span class="line">  .then(doSomething2)</span>
<span class="line">  .then(doSomething3)</span>
<span class="line">  .catch(err =&gt; {</span>
<span class="line">    console.log(err);</span>
<span class="line">  })</span>
<span class="line">  .finally(() =&gt; {</span>
<span class="line">    // finish here!</span>
<span class="line">  });</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_3-rest-spread-属性" tabindex="-1"><a class="header-anchor" href="#_3-rest-spread-属性"><span>3.Rest/Spread 属性</span></a></h3><p>ES2015引入了<a href="https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FFunctions%2FRest_parameters" target="_blank" rel="noopener noreferrer">Rest参数</a>和<a href="https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2FSpread_syntax" target="_blank" rel="noopener noreferrer">扩展运算符</a>。三个点（...）仅用于数组。Rest参数语法允许我们将一个不定数量的参数表示为一个数组。</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">restParam(1, 2, 3, 4, 5);</span>
<span class="line"></span>
<span class="line">function restParam(p1, p2, ...p3) {</span>
<span class="line">  // p1 = 1</span>
<span class="line">  // p2 = 2</span>
<span class="line">  // p3 = [3, 4, 5]</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>展开操作符以相反的方式工作，将数组转换成可传递给函数的单独参数。例如<code>Math.max()</code>返回给定数字中的最大值：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">const values = [99, 100, -1, 48, 16];</span>
<span class="line">console.log( Math.max(...values) ); // 100</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>ES2018为对象解构提供了和数组一样的Rest参数（）和展开操作符，一个简单的例子：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">const myObject = {</span>
<span class="line">  a: 1,</span>
<span class="line">  b: 2,</span>
<span class="line">  c: 3</span>
<span class="line">};</span>
<span class="line"></span>
<span class="line">const { a, ...x } = myObject;</span>
<span class="line">// a = 1</span>
<span class="line">// x = { b: 2, c: 3 }</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>或者你可以使用它给函数传递参数：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">restParam({</span>
<span class="line">  a: 1,</span>
<span class="line">  b: 2,</span>
<span class="line">  c: 3</span>
<span class="line">});</span>
<span class="line"></span>
<span class="line">function restParam({ a, ...x }) {</span>
<span class="line">  // a = 1</span>
<span class="line">  // x = { b: 2, c: 3 }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>跟数组一样，Rest参数只能在声明的结尾处使用。此外，它只适用于每个对象的顶层，如果对象中嵌套对象则无法适用。</p><p>扩展运算符可以在其他对象内使用，例如：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">const obj1 = { a: 1, b: 2, c: 3 };</span>
<span class="line">const obj2 = { ...obj1, z: 26 };</span>
<span class="line">// obj2 is { a: 1, b: 2, c: 3, z: 26 }</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>可以使用扩展运算符拷贝一个对象，像是这样<code>obj2 = {...obj1}</code>，但是 <strong>这只是一个对象的浅拷贝</strong>。另外，如果一个对象A的属性是对象B，那么在克隆后的对象cloneB中，该属性指向对象B。</p><h3 id="_4-正则表达式命名捕获组" tabindex="-1"><a class="header-anchor" href="#_4-正则表达式命名捕获组"><span>4.正则表达式命名捕获组</span></a></h3><p>JavaScript正则表达式可以返回一个匹配的对象——一个包含匹配字符串的类数组，例如：以<code>YYYY-MM-DD</code>的格式解析日期：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">const</span>
<span class="line">  reDate = /([0-9]{4})-([0-9]{2})-([0-9]{2})/,</span>
<span class="line">  match  = reDate.exec(&#39;2018-04-30&#39;),</span>
<span class="line">  year   = match[1], // 2018</span>
<span class="line">  month  = match[2], // 04</span>
<span class="line">  day    = match[3]; // 30</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>这样的代码很难读懂，并且改变正则表达式的结构有可能改变匹配对象的索引。</p><p>ES2018允许命名捕获组使用符号<code>?&lt;name&gt;</code>，在打开捕获括号<code>(</code>后立即命名，示例如下：</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js"><pre><code class="language-javascript"><span class="line"><span class="token keyword">const</span></span>
<span class="line">  reDate <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex"><span class="token group punctuation">(?&lt;<span class="token group-name variable">year</span>&gt;</span><span class="token char-class"><span class="token char-class-punctuation punctuation">[</span><span class="token range">0<span class="token range-punctuation operator">-</span>9</span><span class="token char-class-punctuation punctuation">]</span></span><span class="token quantifier number">{4}</span><span class="token group punctuation">)</span>-<span class="token group punctuation">(?&lt;<span class="token group-name variable">month</span>&gt;</span><span class="token char-class"><span class="token char-class-punctuation punctuation">[</span><span class="token range">0<span class="token range-punctuation operator">-</span>9</span><span class="token char-class-punctuation punctuation">]</span></span><span class="token quantifier number">{2}</span><span class="token group punctuation">)</span>-<span class="token group punctuation">(?&lt;<span class="token group-name variable">day</span>&gt;</span><span class="token char-class"><span class="token char-class-punctuation punctuation">[</span><span class="token range">0<span class="token range-punctuation operator">-</span>9</span><span class="token char-class-punctuation punctuation">]</span></span><span class="token quantifier number">{2}</span><span class="token group punctuation">)</span></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span></span>
<span class="line">  match  <span class="token operator">=</span> reDate<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span><span class="token string">&#39;2018-04-30&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  year   <span class="token operator">=</span> match<span class="token punctuation">.</span>groups<span class="token punctuation">.</span>year<span class="token punctuation">,</span>  <span class="token comment">// 2018</span></span>
<span class="line">  month  <span class="token operator">=</span> match<span class="token punctuation">.</span>groups<span class="token punctuation">.</span>month<span class="token punctuation">,</span> <span class="token comment">// 04</span></span>
<span class="line">  day    <span class="token operator">=</span> match<span class="token punctuation">.</span>groups<span class="token punctuation">.</span>day<span class="token punctuation">;</span>   <span class="token comment">// 30</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>任何匹配失败的命名组都将返回<code>undefined</code>。</p><p>命名捕获也可以使用在<code>replace()</code>方法中。例如将日期转换为美国的 MM-DD-YYYY 格式：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">const</span>
<span class="line">  reDate = /(?&lt;year&gt;[0-9]{4})-(?&lt;month&gt;[0-9]{2})-(?&lt;day&gt;[0-9]{2})/,</span>
<span class="line">  d      = &#39;2018-04-30&#39;,</span>
<span class="line">  usDate = d.replace(reDate, &#39;$&lt;month&gt;-$&lt;day&gt;-$&lt;year&gt;&#39;);</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_5-正则表达式反向断言" tabindex="-1"><a class="header-anchor" href="#_5-正则表达式反向断言"><span>5.正则表达式反向断言</span></a></h3><p>目前JavaScript在正则表达式中支持先行断言（lookahead）。这意味着匹配会发生，但不会有任何捕获，并且断言没有包含在整个匹配字段中。例如从价格中捕获货币符号：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">const</span>
<span class="line">  reLookahead = /\\D(?=\\d+)/,</span>
<span class="line">  match       = reLookahead.exec(&#39;$123.89&#39;);</span>
<span class="line"></span>
<span class="line">console.log( match[0] ); // $</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>ES2018引入以相同方式工作但是匹配前面的反向断言（lookbehind），这样我就可以忽略货币符号，单纯的捕获价格的数字：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">const</span>
<span class="line">  reLookbehind = /(?&lt;=\\D)\\d+/,</span>
<span class="line">  match        = reLookbehind.exec(&#39;$123.89&#39;);</span>
<span class="line"></span>
<span class="line">console.log( match[0] ); // 123.89</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>以上是 <strong>肯定反向断言</strong>，非数字<code>\\D</code>必须存在。同样的，还存在 <strong>否定反向断言</strong>，表示一个值必须不存在，例如：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">const</span>
<span class="line">  reLookbehindNeg = /(?&lt;!\\D)\\d+/,</span>
<span class="line">  match           = reLookbehind.exec(&#39;$123.89&#39;);</span>
<span class="line"></span>
<span class="line">console.log( match[0] ); // null</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_6-正则表达式dotall模式" tabindex="-1"><a class="header-anchor" href="#_6-正则表达式dotall模式"><span>6.正则表达式dotAll模式</span></a></h3><p>正则表达式中点<code>.</code>匹配除回车外的任何单字符，标记<code>s</code>改变这种行为，允许行终止符的出现，例如：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/hello.world/.test(&#39;hello\\nworld&#39;);  // false</span>
<span class="line">/hello.world/s.test(&#39;hello\\nworld&#39;); // true</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h3 id="_7-正则表达式-unicode-转义" tabindex="-1"><a class="header-anchor" href="#_7-正则表达式-unicode-转义"><span>7.正则表达式 Unicode 转义</span></a></h3><p>到目前为止，在正则表达式中本地访问 Unicode 字符属性是不被允许的。ES2018添加了 Unicode 属性转义——形式为<code>\\p{...}</code>和<code>\\P{...}</code>，在正则表达式中使用标记 <code>u</code> (unicode) 设置，在<code>\\p</code>块儿内，可以以键值对的方式设置需要匹配的属性而非具体内容。例如：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">const reGreekSymbol = /\\p{Script=Greek}/u;</span>
<span class="line">reGreekSymbol.test(&#39;π&#39;); // true</span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>此特性可以避免使用特定 Unicode 区间来进行内容类型判断，提升可读性和可维护性。</p><h3 id="_8-非转义序列的模板字符串" tabindex="-1"><a class="header-anchor" href="#_8-非转义序列的模板字符串"><span>8.非转义序列的模板字符串</span></a></h3><p>之前，<code>\\u</code>开始一个 unicode 转义，<code>\\x</code>开始一个十六进制转义，<code>\\</code>后跟一个数字开始一个八进制转义。这使得创建特定的字符串变得不可能，例如Windows文件路径 <code>C:\\uuu\\xxx\\111</code>。更多细节参考<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings" target="_blank" rel="noopener noreferrer">模板字符串</a>。</p>`,145)])])}const o=s(p,[["render",t]]),r=JSON.parse('{"path":"/frontend/basic-js/es/es6-es8.html","title":"ES6 (ES2015)到es8","lang":"zh-CN","frontmatter":{"description":"ES6 (ES2015)到es8 直接看掘金上的文章不香吗?? https://juejin.cn/post/6844903775329583112 ES7新特性（2016） ES2016添加了两个小的特性来说明标准化过程： 数组includes()方法，用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回true，否则返回false。 a ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ES6 (ES2015)到es8\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-25T14:57:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/basic-js/es/es6-es8.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"ES6 (ES2015)到es8"}],["meta",{"property":"og:description","content":"ES6 (ES2015)到es8 直接看掘金上的文章不香吗?? https://juejin.cn/post/6844903775329583112 ES7新特性（2016） ES2016添加了两个小的特性来说明标准化过程： 数组includes()方法，用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回true，否则返回false。 a ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-25T14:57:57.000Z"}],["meta",{"property":"article:modified_time","content":"2022-07-25T14:57:57.000Z"}]]},"git":{"createdTime":1647861419000,"updatedTime":1658761077000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":5,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":11.66,"words":3499},"filePathRelative":"frontend/basic-js/es/es6-es8.md","autoDesc":true}');export{o as comp,r as data};
