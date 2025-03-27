import{_ as n,c as s,a as e,o as t}from"./app-C8DxhDIZ.js";const l="/cs-guide/assets/array01-BubPJcGH.png",p={};function o(r,a){return t(),s("div",null,a[0]||(a[0]=[e(`<h1 id="前端数组" tabindex="-1"><a class="header-anchor" href="#前端数组"><span>前端数组</span></a></h1><p>数组是一种非常重要的数据类型，它语法简单、灵活、高效。 在多数编程语言中，数组都充当着至关重要的角色，以至于很难想象没有数组的编程语言会是什么模样。特别是JavaScript，它天生的灵活性，又进一步发挥了数组的特长，丰富了数组的使用场景。可以毫不夸张地说，不深入地了解数组，不足以写JavaScript。</p><p>截止ES7规范，数组共包含33个标准的API方法和一个非标准的API方法，使用场景和使用方案纷繁复杂，其中有不少浅坑、深坑、甚至神坑。下面将从Array构造器及ES6新特性开始，逐步帮助你掌握数组。</p><p>声明：以下未特别标明的方法均为ES5已实现的方法。</p><h3 id="array构造器" tabindex="-1"><a class="header-anchor" href="#array构造器"><span>Array构造器</span></a></h3><p>Array构造器用于创建一个新的数组。通常，我们推荐使用对象字面量创建数组，这是一个好习惯，但是总有对象字面量乏力的时候，比如说，我想创建一个长度为8的空数组。请比较如下两种方式：</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token comment">// 使用Array构造器</span></span>
<span class="line"><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [undefined × 8]</span></span>
<span class="line"><span class="token comment">// 使用对象字面量</span></span>
<span class="line"><span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">b<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span> <span class="token comment">// [undefined × 8]</span></span>
<span class="line"><span class="token number">12345</span></span>
<span class="line"></span></code></pre></div><p>Array构造器明显要简洁一些，当然你也许会说，对象字面量也不错啊，那么我保持沉默。</p><p>如上，我使用了<code>Array(8)</code>而不是<code>new Array(8)</code>，这会有影响吗？实际上，并没有影响，这得益于Array构造器内部对this指针的判断，<a href="http://ecma262-5.com/ELS5_HTML.htm#Section_15.4.1" target="_blank" rel="noopener noreferrer">ELS5_HTML规范</a>是这么说的：</p><blockquote><p>When <code>Array</code> is called as a function rather than as a constructor, it creates and initialises a new Array object. Thus the function call <code>Array(…)</code> is equivalent to the object creation expression <code>new Array(…)</code> with the same arguments.</p></blockquote><p>从规范来看，浏览器内部大致做了如下类似的实现：</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">Array</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 如果this不是Array的实例，那就重新new一个实例</span></span>
<span class="line">  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">arguments<span class="token punctuation">.</span>callee</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">arguments<span class="token punctuation">.</span>callee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token number">123456</span></span>
<span class="line"></span></code></pre></div><p>上面，我似乎跳过了对Array构造器语法的介绍，没事，接下来我补上。</p><p>Array构造器根据参数长度的不同，有如下两种不同的处理：</p><ul><li>new Array(arg1, arg2,…)，参数长度为0或长度大于等于2时，传入的参数将按照顺序依次成为新数组的第0至N项（参数长度为0时，返回空数组）。</li><li>new Array(len)，当len不是数值时，处理同上，返回一个只包含len元素一项的数组；当len为数值时，根据如下<a href="http://ecma262-5.com/ELS5_HTML.htm#Section_15.4.2.2" target="_blank" rel="noopener noreferrer">规范</a>，len最大不能超过32位无符号整型，即需要小于2的32次方（len最大为<code>Math.pow(2,32) -1</code>或<code>-1&gt;&gt;&gt;0</code>），否则将抛出RangeError。</li></ul><blockquote><p>If the argument <em>len</em> is a Number and ToUint32(<em>len</em>) is equal to <em>len</em>, then the <code>length</code> property of the newly constructed object is set to ToUint32(<em>len</em>). If the argument len is a Number and ToUint32(<em>len</em>) is not equal to <em>len</em>, a <strong>RangeError</strong> exception is thrown.</p></blockquote><p>以上，请注意Array构造器对于单个数值参数的特殊处理，如果仅仅需要使用数组包裹📦 若干参数，不妨使用Array.of，具体请移步下一节。</p><h3 id="es6新增的构造函数方法" tabindex="-1"><a class="header-anchor" href="#es6新增的构造函数方法"><span><strong>ES6新增的构造函数方法</strong></span></a></h3><p>鉴于数组的常用性，ES6专门扩展了数组构造器<code>Array</code> ，新增2个方法：<code>Array.of</code>、<code>Array.from</code>。下面展开来聊。</p><h4 id="array-of" tabindex="-1"><a class="header-anchor" href="#array-of"><span><strong>Array.of</strong></span></a></h4><p>Array.of用于将参数依次转化为数组中的一项，然后返回这个新数组，而不管这个参数是数字还是其它。它基本上与Array构造器功能一致，唯一的区别就在单个数字参数的处理上。如下：</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">Array<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">8.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [8]</span></span>
<span class="line"><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">8.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [empty × 8]</span></span>
<span class="line"><span class="token number">12</span></span>
<span class="line"></span></code></pre></div><p>参数为多个，或单个参数不是数字时，Array.of 与 Array构造器等同。</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">Array<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">8.0</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [8, 5]</span></span>
<span class="line"><span class="token function">Array</span><span class="token punctuation">(</span><span class="token number">8.0</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [8, 5]</span></span>
<span class="line"></span>
<span class="line">Array<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&#39;8&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&quot;8&quot;]</span></span>
<span class="line"><span class="token function">Array</span><span class="token punctuation">(</span><span class="token string">&#39;8&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&quot;8&quot;]</span></span>
<span class="line"><span class="token number">12345</span></span>
<span class="line"></span></code></pre></div><p>因此，若是需要使用数组包裹元素，推荐优先使用Array.of方法。</p><p>目前，以下版本浏览器提供了对Array.of的支持。</p><table><thead><tr><th>Chrome</th><th>Firefox</th><th>Edge</th><th>Safari</th></tr></thead><tbody><tr><td>45+</td><td>25+</td><td>✔️</td><td>9.0+</td></tr></tbody></table><p>即使其他版本浏览器不支持也不必担心，由于Array.of与Array构造器的这种高度相似性，实现一个polyfill十分简单。如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">if (!Array.of){</span>
<span class="line">  Array.of = function(){</span>
<span class="line">    return Array.prototype.slice.call(arguments);</span>
<span class="line">  };</span>
<span class="line">}</span>
<span class="line">12345</span>
<span class="line"></span></code></pre></div><h4 id="array-from" tabindex="-1"><a class="header-anchor" href="#array-from"><span><strong>Array.from</strong></span></a></h4><p>语法：<em>Array.from(arrayLike[, processingFn[, thisArg]])</em></p><p>Array.from的设计初衷是快速便捷的基于其他对象创建新数组，准确来说就是从一个类似数组的可迭代对象创建一个新的数组实例，说人话就是，只要一个对象有迭代器，Array.from就能把它变成一个数组（当然，是返回新的数组，不改变原对象）。</p><p>从语法上看，Array.from拥有3个形参，第一个为类似数组的对象，必选。第二个为加工函数，新生成的数组会经过该函数的加工再返回。第三个为this作用域，表示加工函数执行时this的值。后两个参数都是可选的。我们来看看用法。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let obj = {0: &#39;a&#39;, 1: &#39;b&#39;, 2:&#39;c&#39;, length: 3};</span>
<span class="line">Array.from(obj, function(value, index){</span>
<span class="line">  console.log(value, index, this, arguments.length);</span>
<span class="line">  return value.repeat(3); //必须指定返回值，否则返回undefined</span>
<span class="line">}, obj);</span>
<span class="line">12345</span>
<span class="line"></span></code></pre></div><p>执行结果如下：</p><p><img src="`+l+`" alt=""></p><p>可以看到加工函数的this作用域被obj对象取代，也可以看到加工函数默认拥有两个形参，分别为迭代器当前元素的值和其索引。</p><p>注意，一旦使用加工函数，必须明确指定返回值，否则将隐式返回undefined，最终生成的数组也会变成一个只包含若干个undefined元素的空数组。</p><p>实际上，如果不需要指定this，加工函数完全可以是一个箭头函数。上述代码可以简化如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">Array.from(obj, (value) =&gt; value.repeat(3));</span>
<span class="line">1</span>
<span class="line"></span></code></pre></div><p>除了上述obj对象以外，拥有迭代器的对象还包括这些：<code>String</code>，<code>Set</code>，<code>Map</code>，<code>arguments</code> 等，Array.from统统可以处理。如下所示：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// String</span>
<span class="line">Array.from(&#39;abc&#39;); // [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]</span>
<span class="line">// Set</span>
<span class="line">Array.from(new Set([&#39;abc&#39;, &#39;def&#39;])); // [&quot;abc&quot;, &quot;def&quot;]</span>
<span class="line">// Map</span>
<span class="line">Array.from(new Map([[1, &#39;abc&#39;], [2, &#39;def&#39;]])); // [[1</span>
<span class="line">, &#39;abc&#39;], [2, &#39;def&#39;]]</span>
<span class="line">// 天生的类数组对象arguments</span>
<span class="line">function fn(){</span>
<span class="line">  return Array.from(arguments);</span>
<span class="line">}</span>
<span class="line">fn(1, 2, 3); // [1, 2, 3]</span>
<span class="line">123456789101112</span>
<span class="line"></span></code></pre></div><p>到这你可能以为Array.from就讲完了，实际上还有一个重要的扩展场景必须提下。比如说生成一个从0到指定数字的新数组，Array.from就可以轻易的做到。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">Array.from({length: 10}, (v, i) =&gt; i); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]</span>
<span class="line">1</span>
<span class="line"></span></code></pre></div><p>后面我们将会看到，利用数组的keys方法实现上述功能，可能还要简单一些。</p><p>目前，以下版本浏览器提供了对Array.from的支持。</p><table><thead><tr><th>Chrome</th><th>Firefox</th><th>Edge</th><th>Opera</th><th>Safari</th></tr></thead><tbody><tr><td>45+</td><td>32+</td><td>✔️</td><td>✔️</td><td>9.0+</td></tr></tbody></table><h3 id="array-isarray" tabindex="-1"><a class="header-anchor" href="#array-isarray"><span><strong>Array.isArray</strong></span></a></h3><p>顾名思义，Array.isArray用来判断一个变量是否数组类型。JS的弱类型机制导致判断变量类型是初级前端开发者面试时的必考题，一般我都会将其作为考察候选人第一题，然后基于此展开。在ES5提供该方法之前，我们至少有如下5种方式去判断一个值是否数组：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let a = [];</span>
<span class="line">// 1.基于instanceof</span>
<span class="line">a instanceof Array;</span>
<span class="line">// 2.基于constructor</span>
<span class="line">a.constructor === Array;</span>
<span class="line">// 3.基于Object.prototype.isPrototypeOf</span>
<span class="line">Array.prototype.isPrototypeOf(a);</span>
<span class="line">// 4.基于getPrototypeOf</span>
<span class="line">Object.getPrototypeOf(a) === Array.prototype;</span>
<span class="line">// 5.基于Object.prototype.toString</span>
<span class="line">Object.prototype.toString.apply(a) === &#39;[object Array]&#39;;</span>
<span class="line">1234567891011</span>
<span class="line"></span></code></pre></div><p>以上，除了<code>Object.prototype.toString</code>外，其它方法都不能正确判断变量的类型。</p><p>要知道，代码的运行环境十分复杂，一个变量可能使用浑身解数去迷惑它的创造者。且看：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let a = {</span>
<span class="line">  __proto__: Array.prototype</span>
<span class="line">};</span>
<span class="line">// 分别在控制台试运行以下代码</span>
<span class="line">// 1.基于instanceof</span>
<span class="line">a instanceof Array; // true</span>
<span class="line">// 2.基于constructor</span>
<span class="line">a.constructor === Array; // true</span>
<span class="line">// 3.基于Object.prototype.isPrototypeOf</span>
<span class="line">Array.prototype.isPrototypeOf(a); // true</span>
<span class="line">// 4.基于getPrototypeOf</span>
<span class="line">Object.getPrototypeOf(a) === Array.prototype; // true</span>
<span class="line">123456789101112</span>
<span class="line"></span></code></pre></div><p>以上，4种方法将全部返回<code>true</code>，为什么呢？我们只是手动指定了某个对象的<code>__proto__</code>属性为<code>Array.prototype</code>，便导致了该对象继承了Array对象，这种毫不负责任的继承方式，使得基于继承的判断方案瞬间土崩瓦解。</p><p>不仅如此，我们还知道，Array是堆数据，变量指向的只是它的引用地址，因此每个页面的Array对象引用的地址都是不一样的。iframe中声明的数组，它的构造函数是iframe中的Array对象。如果在iframe声明了一个数组<code>x</code>，将其赋值给父页面的变量<code>y</code>，那么在父页面使用<code>y instanceof Array</code> ，结果一定是<code>false</code>的。而最后一种返回的是字符串，不会存在引用问题。实际上，多页面或系统之间的交互只有字符串能够畅行无阻。</p><p>鉴于上述的两点原因，故笔者推荐使用最后一种方法去撩面试官（别提是我说的），如果你还不信，这里恰好有篇文章跟我持有相同的观点：<a href="http://web.mit.edu/jwalden/www/isArray.html" target="_blank" rel="noopener noreferrer">Determining with absolute accuracy whether or not a JavaScript object is an array</a>。</p><p>相反，使用Array.isArray则非常简单，如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">Array.isArray([]); // true</span>
<span class="line">Array.isArray({0: &#39;a&#39;, length: 1}); // false</span>
<span class="line">12</span>
<span class="line"></span></code></pre></div><p>目前，以下版本浏览器提供了对Array.isArray的支持。</p><table><thead><tr><th>Chrome</th><th>Firefox</th><th>IE</th><th>Opera</th><th>Safari</th></tr></thead><tbody><tr><td>5+</td><td>4+</td><td>9+</td><td>10.5+</td><td>5+</td></tr></tbody></table><p>实际上，通过<code>Object.prototype.toString</code>去判断一个值的类型，也是各大主流库的标准。因此Array.isArray的polyfill通常长这样：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">if (!Array.isArray){</span>
<span class="line">  Array.isArray = function(arg){</span>
<span class="line">    return Object.prototype.toString.call(arg) === &#39;[object Array]&#39;;</span>
<span class="line">  };</span>
<span class="line">}</span>
<span class="line">12345</span>
<span class="line"></span></code></pre></div><h3 id="数组推导" tabindex="-1"><a class="header-anchor" href="#数组推导"><span><strong>数组推导</strong></span></a></h3><p>ES6对数组的增强不止是体现在api上，还包括语法糖。比如说<code>for of</code>，它就是借鉴其它语言而成的语法糖，这种基于原数组使用<code>for of</code>生成新数组的语法糖，叫做<strong>数组推导</strong>。**数组推导最初起早在ES6的草案中，但在第27版（2014年8月）中被移除，目前只有Firefox v30+支持，推导有风险，使用需谨慎。**所幸如今这些语言都还支持推导：CoffeeScript、Python、Haskell、Clojure，我们可以从中一窥端倪。这里我们以python的<code>for in</code>推导打个比方：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line"># python for in 推导</span>
<span class="line">a = [1, 2, 3, 4]</span>
<span class="line">print [i * i for i in a if i == 3] # [9]</span>
<span class="line">123</span>
<span class="line"></span></code></pre></div><p>如下是SpiderMonkey引擎（Firefox）之前基于ES4规范实现的数组推导(与python的推导十分相似)：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">[i * i for (i of a)] // [1, 4, 9, 16]</span>
<span class="line">1</span>
<span class="line"></span></code></pre></div><p>ES6中数组有关的<code>for of</code>在ES4的基础上进一步演化，for关键字居首，in在中间，最后才是运算表达式。如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">[for (i of [1, 2, 3, 4]) i * i] // [1, 4, 9, 16]</span>
<span class="line">1</span>
<span class="line"></span></code></pre></div><p>同python的示例，ES6中数组有关的<code>for of</code>也可以使用if语句：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// 单个if</span>
<span class="line">[for (i of [1, 2, 3, 4]) if (i == 3) i * i] // [9]</span>
<span class="line">// 甚至是多个if</span>
<span class="line">[for (i of [1, 2, 3, 4]) if (i &gt; 2) if (i &lt; 4) i * i] // [9]</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>更为强大的是，ES6数组推导还允许多重<code>for of</code>。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">[for (i of [1, 2, 3]) for (j of [10, 100]) i * j] // [10, 100, 20, 200, 30, 300]</span>
<span class="line">1</span>
<span class="line"></span></code></pre></div><p>甚至，数组推导还能够嵌入另一个数组推导中。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">[for (i of [1, 2, 3]) [for (j of [10, 100]) i * j] ] // [[10, 100], [20, 200], [30, 300]]</span>
<span class="line">1</span>
<span class="line"></span></code></pre></div><p>对于上述两个表达式，前者和后者唯一的区别，就在于后者的第二个推导是先返回数组，然后与外部的推导再进行一次运算。</p><p>除了多个数组推导嵌套外，ES6的数组推导还会为每次迭代分配一个新的作用域（目前Firefox也没有为每次迭代创建新的作用域）：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// ES6规范</span>
<span class="line">[for (x of [0, 1, 2]) () =&gt; x][0]() // 0</span>
<span class="line">// Firefox运行</span>
<span class="line">[for (x of [0, 1, 2]) () =&gt; x][0]() // 2</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>通过上面的实例，我们看到使用数组推导来创建新数组比<code>forEach</code>，<code>map</code>，<code>filter</code>等遍历方法更加简洁，只是非常可惜，它不是标准规范。</p><p>ES6不仅新增了对Array构造器相关API，还新增了8个原型的方法。接下来我会在原型方法的介绍中穿插着ES6相关方法的讲解，请耐心往下读。</p><h3 id="原型" tabindex="-1"><a class="header-anchor" href="#原型"><span><strong>原型</strong></span></a></h3><p>继承的常识告诉我们，js中所有的数组方法均来自于Array.prototype，和其他构造函数一样，你可以通过扩展 <code>Array</code> 的 <code>prototype</code> 属性上的方法来给所有数组实例增加方法。</p><p>值得一说的是，Array.prototype本身就是一个数组。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">Array.isArray(Array.prototype); // true</span>
<span class="line">console.log(Array.prototype.length);// 0</span>
<span class="line">12</span>
<span class="line"></span></code></pre></div><p>以下方法可以进一步验证：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">console.log([].__proto__.length);// 0</span>
<span class="line">console.log([].__proto__);// [Symbol(Symbol.unscopables): Object]</span>
<span class="line">12</span>
<span class="line"></span></code></pre></div><p>有关Symbol(Symbol.unscopables)的知识，这里不做详述，具体请移步后续章节。</p><h3 id="方法" tabindex="-1"><a class="header-anchor" href="#方法"><span><strong>方法</strong></span></a></h3><p>数组原型提供的方法非常之多，主要分为三种，一种是会改变自身值的，一种是不会改变自身值的，另外一种是遍历方法。</p><p>由于 Array.prototype 的某些属性被设置为[[DontEnum]]，因此不能用一般的方法进行遍历，我们可以通过如下方式获取 Array.prototype 的所有方法：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">Object.getOwnPropertyNames(Array.prototype); // [&quot;length&quot;, &quot;constructor&quot;, &quot;toString&quot;, &quot;toLocaleString&quot;, &quot;join&quot;, &quot;pop&quot;, &quot;push&quot;, &quot;reverse&quot;, &quot;shift&quot;, &quot;unshift&quot;, &quot;slice&quot;, &quot;splice&quot;, &quot;sort&quot;, &quot;filter&quot;, &quot;forEach&quot;, &quot;some&quot;, &quot;every&quot;, &quot;map&quot;, &quot;indexOf&quot;, &quot;lastIndexOf&quot;, &quot;reduce&quot;, &quot;reduceRight&quot;, &quot;copyWithin&quot;, &quot;find&quot;, &quot;findIndex&quot;, &quot;fill&quot;, &quot;includes&quot;, &quot;entries&quot;, &quot;keys&quot;, &quot;concat&quot;]</span>
<span class="line">1</span>
<span class="line"></span></code></pre></div><h4 id="改变自身值的方法-9个" tabindex="-1"><a class="header-anchor" href="#改变自身值的方法-9个"><span><strong>改变自身值的方法(9个)</strong></span></a></h4><p>基于ES6，改变自身值的方法一共有9个，分别为pop、push、reverse、shift、sort、splice、unshift，以及两个ES6新增的方法copyWithin 和 fill。</p><p>对于能改变自身值的数组方法，日常开发中需要特别注意，尽量避免在循环遍历中去改变原数组的项。接下来，我们一起来深入地了解这些方法。</p><h5 id="pop" tabindex="-1"><a class="header-anchor" href="#pop"><span><strong>pop</strong></span></a></h5><p>pop() 方法删除一个数组中的最后的一个元素，并且返回这个元素。如果是栈的话，这个过程就是栈顶弹出。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&quot;cat&quot;, &quot;dog&quot;, &quot;cow&quot;, &quot;chicken&quot;, &quot;mouse&quot;];</span>
<span class="line">let item = array.pop();</span>
<span class="line">console.log(array); // [&quot;cat&quot;, &quot;dog&quot;, &quot;cow&quot;, &quot;chicken&quot;]</span>
<span class="line">console.log(item); // mouse</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>由于设计上的巧妙，pop方法可以应用在类数组对象上，即 <code>鸭式辨型</code>. 如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:&quot;cat&quot;, 1:&quot;dog&quot;, 2:&quot;cow&quot;, 3:&quot;chicken&quot;, 4:&quot;mouse&quot;, length:5}</span>
<span class="line">let item = Array.prototype.pop.call(o);</span>
<span class="line">console.log(o); // Object {0: &quot;cat&quot;, 1: &quot;dog&quot;, 2: &quot;cow&quot;, 3: &quot;chicken&quot;, length: 4}</span>
<span class="line">console.log(item); // mouse</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>但如果类数组对象不具有length属性，那么该对象将被创建length属性，length值为0。如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:&quot;cat&quot;, 1:&quot;dog&quot;, 2:&quot;cow&quot;, 3:&quot;chicken&quot;, 4:&quot;mouse&quot;}</span>
<span class="line">let item = Array.prototype.pop.call(o);</span>
<span class="line">console.log(array); // Object {0: &quot;cat&quot;, 1: &quot;dog&quot;, 2: &quot;cow&quot;, 3: &quot;chicken&quot;, 4: &quot;mouse&quot;, length: 0}</span>
<span class="line">console.log(item); // undefined</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><h5 id="push" tabindex="-1"><a class="header-anchor" href="#push"><span><strong>push</strong></span></a></h5><p>push()方法添加一个或者多个元素到数组末尾，并且返回数组新的长度。如果是栈的话，这个过程就是栈顶压入。</p><p>语法：<em>arr.push(element1, …, elementN)</em></p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&quot;football&quot;, &quot;basketball&quot;, &quot;volleyball&quot;, &quot;Table tennis&quot;, &quot;badminton&quot;];</span>
<span class="line">let i = array.push(&quot;golfball&quot;);</span>
<span class="line">console.log(array); // [&quot;football&quot;, &quot;basketball&quot;, &quot;volleyball&quot;, &quot;Table tennis&quot;, &quot;badminton&quot;, &quot;golfball&quot;]</span>
<span class="line">console.log(i); // 6</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>同pop方法一样，push方法也可以应用到类数组对象上，如果length不能被转成一个数值或者不存在length属性时，则插入的元素索引为0，且length属性不存在时，将会创建它。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:&quot;football&quot;, 1:&quot;basketball&quot;};</span>
<span class="line">let i = Array.prototype.push.call(o, &quot;golfball&quot;);</span>
<span class="line">console.log(o); // Object {0: &quot;golfball&quot;, 1: &quot;basketball&quot;, length: 1}</span>
<span class="line">console.log(i); // 1</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>实际上，push方法是根据length属性来决定从哪里开始插入给定的值。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:&quot;football&quot;, 1:&quot;basketball&quot;,length:1};</span>
<span class="line">let i = Array.prototype.push.call(o,&quot;golfball&quot;);</span>
<span class="line">console.log(o); // Object {0: &quot;football&quot;, 1: &quot;golfball&quot;, length: 2}</span>
<span class="line">console.log(i); // 2</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>利用push根据length属性插入元素这个特点，可以实现数组的合并，如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&quot;football&quot;, &quot;basketball&quot;];</span>
<span class="line">let array2 = [&quot;volleyball&quot;, &quot;golfball&quot;];</span>
<span class="line">let i = Array.prototype.push.apply(array,array2);</span>
<span class="line">console.log(array); // [&quot;football&quot;, &quot;basketball&quot;, &quot;volleyball&quot;, &quot;golfball&quot;]</span>
<span class="line">console.log(i); // 4</span>
<span class="line">12345</span>
<span class="line"></span></code></pre></div><h5 id="reverse" tabindex="-1"><a class="header-anchor" href="#reverse"><span><strong>reverse</strong></span></a></h5><p>reverse()方法颠倒数组中元素的位置，第一个会成为最后一个，最后一个会成为第一个，该方法返回对数组的引用。</p><p>语法：<em>arr.reverse()</em></p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [1,2,3,4,5];</span>
<span class="line">let array2 = array.reverse();</span>
<span class="line">console.log(array); // [5,4,3,2,1]</span>
<span class="line">console.log(array2===array); // true</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>同上，reverse 也是鸭式辨型的受益者，颠倒元素的范围受length属性制约。如下:</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:&quot;a&quot;, 1:&quot;b&quot;, 2:&quot;c&quot;, length:2};</span>
<span class="line">let o2 = Array.prototype.reverse.call(o);</span>
<span class="line">console.log(o); // Object {0: &quot;b&quot;, 1: &quot;a&quot;, 2: &quot;c&quot;, length: 2}</span>
<span class="line">console.log(o === o2); // true</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>如果 length 属性小于2 或者 length 属性不为数值，那么原类数组对象将没有变化。即使 length 属性不存在，该对象也不会去创建 length 属性。特别的是，当 length 属性较大时，类数组对象的『索引』会尽可能的向 length 看齐。如下:</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:&quot;a&quot;, 1:&quot;b&quot;, 2:&quot;c&quot;,length:100};</span>
<span class="line">let o2 = Array.prototype.reverse.call(o);</span>
<span class="line">console.log(o); // Object {97: &quot;c&quot;, 98: &quot;b&quot;, 99: &quot;a&quot;, length: 100}</span>
<span class="line">console.log(o === o2); // true</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><h5 id="shift" tabindex="-1"><a class="header-anchor" href="#shift"><span><strong>shift</strong></span></a></h5><p>shift()方法删除数组的第一个元素，并返回这个元素。如果是栈的话，这个过程就是栈底弹出。</p><p>语法：<em>arr.shift()</em></p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [1,2,3,4,5];</span>
<span class="line">let item = array.shift();</span>
<span class="line">console.log(array); // [2,3,4,5]</span>
<span class="line">console.log(item); // 1</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>同样受益于鸭式辨型，对于类数组对象，shift仍然能够处理。如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:&quot;a&quot;, 1:&quot;b&quot;, 2:&quot;c&quot;, length:3};</span>
<span class="line">let item = Array.prototype.shift.call(o);</span>
<span class="line">console.log(o); // Object {0: &quot;b&quot;, 1: &quot;c&quot;, length: 2}</span>
<span class="line">console.log(item); // a</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>如果类数组对象length属性不存在，将添加length属性，并初始化为0。如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:&quot;a&quot;, 1:&quot;b&quot;, 2:&quot;c&quot;};</span>
<span class="line">let item = Array.prototype.shift.call(o);</span>
<span class="line">console.log(o); // Object {0: &quot;a&quot;, 1: &quot;b&quot;, 2:&quot;c&quot; length: 0}</span>
<span class="line">console.log(item); // undefined</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><h5 id="sort" tabindex="-1"><a class="header-anchor" href="#sort"><span><strong>sort</strong></span></a></h5><p>sort()方法对数组元素进行排序，并返回这个数组。sort方法比较复杂，这里我将多花些篇幅来讲这块。</p><p>语法：<em>arr.sort([comparefn])</em></p><p>comparefn是可选的，如果省略，数组元素将按照各自转换为字符串的Unicode(万国码)位点顺序排序，例如”Boy”将排到”apple”之前。当对数字排序的时候，25将会排到8之前，因为转换为字符串后，”25”将比”8”靠前。例如：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&quot;apple&quot;,&quot;Boy&quot;,&quot;Cat&quot;,&quot;dog&quot;];</span>
<span class="line">let array2 = array.sort();</span>
<span class="line">console.log(array); // [&quot;Boy&quot;, &quot;Cat&quot;, &quot;apple&quot;, &quot;dog&quot;]</span>
<span class="line">console.log(array2 == array); // true</span>
<span class="line"></span>
<span class="line">array = [10, 1, 3, 20];</span>
<span class="line">let array3 = array.sort();</span>
<span class="line">console.log(array3); // [1, 10, 20, 3]</span>
<span class="line">12345678</span>
<span class="line"></span></code></pre></div><p>如果指明了comparefn，数组将按照调用该函数的返回值来排序。若 a 和 b 是两个将要比较的元素：</p><ul><li>若 comparefn(a, b) &lt; 0，那么a 将排到 b 前面；</li><li>若 comparefn(a, b) = 0，那么a 和 b 相对位置不变；</li><li>若 comparefn(a, b) &gt; 0，那么a , b 将调换位置；</li></ul><p>如果数组元素为数字，则排序函数comparefn格式如下所示：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">function compare(a, b){</span>
<span class="line">  return a-b;</span>
<span class="line">}</span>
<span class="line">123</span>
<span class="line"></span></code></pre></div><p>如果数组元素为非ASCII字符的字符串(如包含类似 e、é、è、a、ä 或中文字符等非英文字符的字符串)，则需要使用String.localeCompare。下面这个函数将排到正确的顺序。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&#39;互&#39;,&#39;联&#39;,&#39;网&#39;,&#39;改&#39;,&#39;变&#39;,&#39;世&#39;,&#39;界&#39;];</span>
<span class="line">let array2 = array.sort();</span>
<span class="line"></span>
<span class="line">let array = [&#39;互&#39;,&#39;联&#39;,&#39;网&#39;,&#39;改&#39;,&#39;变&#39;,&#39;世&#39;,&#39;界&#39;]; // 重新赋值,避免干扰array2</span>
<span class="line">let array3 = array.sort(function (a, b) {</span>
<span class="line">  return a.localeCompare(b);</span>
<span class="line">});</span>
<span class="line"></span>
<span class="line">console.log(array2); // [&quot;世&quot;, &quot;互&quot;, &quot;变&quot;, &quot;改&quot;, &quot;界&quot;, &quot;网&quot;, &quot;联&quot;]</span>
<span class="line">console.log(array3); // [&quot;变&quot;, &quot;改&quot;, &quot;互&quot;, &quot;界&quot;, &quot;联&quot;, &quot;世&quot;, &quot;网&quot;]</span>
<span class="line">12345678910</span>
<span class="line"></span></code></pre></div><p>如上，『互联网改变世界』这个数组，sort函数默认按照数组元素unicode字符串形式进行排序，然而实际上，我们期望的是按照拼音先后顺序进行排序，显然String.localeCompare 帮助我们达到了这个目的。</p><p>为什么上面测试中需要重新给array赋值呢，这是因为sort每次排序时改变的是数组本身，并且返回数组引用。如果不这么做，经过连续两次排序后，array2 和 array3 将指向同一个数组，最终影响我们测试。array重新赋值后就断开了对原数组的引用。</p><p>同上，sort一样受益于鸭式辨型，比如：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:&#39;互&#39;,1:&#39;联&#39;,2:&#39;网&#39;,3:&#39;改&#39;,4:&#39;变&#39;,5:&#39;世&#39;,6:&#39;界&#39;,length:7};</span>
<span class="line">Array.prototype.sort.call(o,function(a, b){</span>
<span class="line">  return a.localeCompare(b);</span>
<span class="line">});</span>
<span class="line">console.log(o); // Object {0: &quot;变&quot;, 1: &quot;改&quot;, 2: &quot;互&quot;, 3: &quot;界&quot;, 4: &quot;联&quot;, 5: &quot;世&quot;, 6: &quot;网&quot;, length: 7}, 可见同上述排序结果一致</span>
<span class="line">12345</span>
<span class="line"></span></code></pre></div><p>注意：使用sort的鸭式辨型特性时，若类数组对象不具有length属性，它并不会进行排序，也不会为其添加length属性。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:&#39;互&#39;,1:&#39;联&#39;,2:&#39;网&#39;,3:&#39;改&#39;,4:&#39;变&#39;,5:&#39;世&#39;,6:&#39;界&#39;};</span>
<span class="line">Array.prototype.sort.call(o,function(a, b){</span>
<span class="line">  return a.localeCompare(b);</span>
<span class="line">});</span>
<span class="line">console.log(o); // Object {0: &quot;互&quot;, 1: &quot;联&quot;, 2: &quot;网&quot;, 3: &quot;改&quot;, 4: &quot;变&quot;, 5: &quot;世&quot;, 6: &quot;界&quot;}, 可见并未添加length属性</span>
<span class="line">12345</span>
<span class="line"></span></code></pre></div><h6 id="使用映射改善排序" tabindex="-1"><a class="header-anchor" href="#使用映射改善排序"><span><strong>使用映射改善排序</strong></span></a></h6><p>comparefn 如果需要对数组元素多次转换以实现排序，那么使用map辅助排序将是个不错的选择。基本思想就是将数组中的每个元素实际比较的值取出来，排序后再将数组恢复。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// 需要被排序的数组</span>
<span class="line">let array = [&#39;dog&#39;, &#39;Cat&#39;, &#39;Boy&#39;, &#39;apple&#39;];</span>
<span class="line">// 对需要排序的数字和位置的临时存储</span>
<span class="line">let mapped = array.map(function(el, i) {</span>
<span class="line">  return { index: i, value: el.toLowerCase() };</span>
<span class="line">})</span>
<span class="line">// 按照多个值排序数组</span>
<span class="line">mapped.sort(function(a, b) {</span>
<span class="line">  return +(a.value &gt; b.value) || +(a.value === b.value) - 1;</span>
<span class="line">});</span>
<span class="line">// 根据索引得到排序的结果</span>
<span class="line">let result = mapped.map(function(el){</span>
<span class="line">  return array[el.index];</span>
<span class="line">});</span>
<span class="line">console.log(result); // [&quot;apple&quot;, &quot;Boy&quot;, &quot;Cat&quot;, &quot;dog&quot;]</span>
<span class="line">123456789101112131415</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="奇怪的chrome" tabindex="-1"><a class="header-anchor" href="#奇怪的chrome"><span><strong>奇怪的chrome</strong></span></a></h6><p>实际上，ECMAscript规范中并未规定具体的sort算法，这就势必导致各个浏览器不尽相同的sort算法，请看sort方法在Chrome浏览器下表现：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [{ n: &quot;a&quot;, v: 1 }, { n: &quot;b&quot;, v: 1 }, { n: &quot;c&quot;, v: 1 }, { n: &quot;d&quot;, v: 1 }, { n: &quot;e&quot;, v: 1 }, { n: &quot;f&quot;, v: 1 }, { n: &quot;g&quot;, v: 1 }, { n: &quot;h&quot;, v: 1 }, { n: &quot;i&quot;, v: 1 }, { n: &quot;j&quot;, v: 1 }, { n: &quot;k&quot;, v: 1 }, ];</span>
<span class="line">array.sort(function (a, b) {</span>
<span class="line">    return a.v - b.v;</span>
<span class="line">});</span>
<span class="line">for (let i = 0,len = array.length; i &lt; len; i++) {</span>
<span class="line">    console.log(array[i].n);</span>
<span class="line">}</span>
<span class="line">// f a c d e b g h i j k</span>
<span class="line">12345678</span>
<span class="line"></span></code></pre></div><p>由于v值相等，array数组排序前后应该不变，然而Chrome却表现异常，而其他浏览器(如IE 或 Firefox) 表现正常。</p><p>这是因为v8引擎为了高效排序(采用了不稳定排序)。即数组长度超过10条时，会调用另一种排序方法(快速排序)；而10条及以下采用的是插入排序，此时结果将是稳定的，如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [{ n: &quot;a&quot;, v: 1 }, { n: &quot;b&quot;, v: 1 }, { n: &quot;c&quot;, v: 1 }, { n: &quot;d&quot;, v: 1 }, { n: &quot;e&quot;, v: 1 }, { n: &quot;f&quot;, v: 1 }, { n: &quot;g&quot;, v: 1 }, { n: &quot;h&quot;, v: 1 }, { n: &quot;i&quot;, v: 1 }, { n: &quot;j&quot;, v: 1 },];</span>
<span class="line">array.sort(function (a, b) {</span>
<span class="line">  return a.v - b.v;</span>
<span class="line">});</span>
<span class="line">for (let i = 0,len = array.length; i &lt; len; i++) {</span>
<span class="line">  console.log(array[i].n);</span>
<span class="line">}</span>
<span class="line">// a b c d e f g h i j</span>
<span class="line">12345678</span>
<span class="line"></span></code></pre></div><p>从a 到 j 刚好10条数据。</p><p>那么我们该如何规避Chrome浏览器的这种”bug”呢？其实很简单，只需略动手脚，改变排序方法的返回值即可，如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">// 由于快速排序会打乱值相同的元素的默认排序，因此我们需要先标记元素的默认位置</span>
<span class="line">array.forEach(function(v, k){</span>
<span class="line">  v.__index = k;</span>
<span class="line">});</span>
<span class="line">array.sort(function (a, b) {</span>
<span class="line">  // 由于__index标记了初始顺序，这样的返回才保证了值相同元素的顺序不变，进而使得排序稳定</span>
<span class="line">  return a.v - b.v || a.__index - b.__index;</span>
<span class="line">});</span>
<span class="line">12345678</span>
<span class="line"></span></code></pre></div><p>使用数组的sort方法需要注意一点：各浏览器的针对sort方法内部算法实现不尽相同，排序函数尽量只返回-1、0、1三种不同的值，不要尝试返回true或false等其它数值，因为可能导致不可靠的排序结果。</p><h6 id="问题分析" tabindex="-1"><a class="header-anchor" href="#问题分析"><span><strong>问题分析</strong></span></a></h6><p>sort方法传入的排序函数如果返回布尔值会导致什么样的结果呢？</p><p>以下是常见的浏览器以及脚本引擎：</p><table><thead><tr><th>Browser Name</th><th>ECMAScript Engine</th></tr></thead><tbody><tr><td>Internet Explorer 6 - 8</td><td>JScript</td></tr><tr><td>Internet Explorer 9 - 10</td><td>Chakra</td></tr><tr><td>Firefox</td><td>SpiderMonkey, IonMonkey, TraceMonkey</td></tr><tr><td>Chrome</td><td>V8</td></tr><tr><td>Safair</td><td>JavaScriptCore(SquirrelFish Extreme)</td></tr><tr><td>Opera</td><td>Carakan</td></tr></tbody></table><p>分析以下代码，预期将数组元素进行升序排序：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [7, 6, 5, 4, 3, 2, 1, 0, 8, 9];</span>
<span class="line">let comparefn = function (x, y) {</span>
<span class="line">  return x &gt; y;</span>
<span class="line">};</span>
<span class="line">array.sort(comparefn);</span>
<span class="line">12345</span>
<span class="line"></span></code></pre></div><p>代码中，comparefn 函数返回值为 bool 类型，并非为规范规定的 -1、0、1 值。那么执行此代码，各 JS 脚本引擎实现情况如何？</p><table><thead><tr><th></th><th>输出结果</th><th>是否符合预期</th></tr></thead><tbody><tr><td>JScript</td><td>[2, 3, 5, 1, 4, 6, 7, 0, 8, 9]</td><td>否</td></tr><tr><td>Carakan</td><td>[0, 1, 3, 8, 2, 4, 9, 5, 6, 7]</td><td>否</td></tr><tr><td>Chakra &amp; JavaScriptCore</td><td>[7, 6, 5, 4, 3, 2, 1, 0, 8, 9]</td><td>否</td></tr><tr><td>SpiderMonkey</td><td>[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]</td><td>是</td></tr><tr><td>V8</td><td>[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]</td><td>是</td></tr></tbody></table><p><strong>根据表中数据可见，当数组内元素个数小于等于 10 时，现象如下：</strong></p><ul><li>JScript &amp; Carakan 排序结果有误</li><li>Chakra &amp; JavaScriptCore 看起来没有进行排序</li><li>SpiderMonkey 返回了预期的正确结果</li><li>V8 暂时看起来排序正确</li></ul><p><strong>将数组元素扩大至 11 位，现象如下：</strong></p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [7, 6, 5, 4, 3, 2, 1, 0, 10, 9, 8];</span>
<span class="line">let comparefn = function (x, y) {</span>
<span class="line">  return x &gt; y;</span>
<span class="line">};</span>
<span class="line">array.sort(comparefn);</span>
<span class="line">12345</span>
<span class="line"></span></code></pre></div><table><thead><tr><th>JavaScript引擎</th><th>输出结果</th><th>是否符合预期</th></tr></thead><tbody><tr><td>JScript</td><td>[2, 3, 5, 1, 4, 6, 7, 0, 8, 9, 10]</td><td>否</td></tr><tr><td>Carakan</td><td>[0, 1, 3, 8, 2, 4, 9, 5, 10, 6, 7]</td><td>否</td></tr><tr><td>Chakra &amp; JavaScriptCore</td><td>[7, 6, 5, 4, 3, 2, 1, 0, 10, 8, 9]</td><td>否</td></tr><tr><td>IonMonkey</td><td>[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</td><td>是</td></tr><tr><td>V8</td><td>[5, 0, 1, 2, 3, 4, 6, 7, 8, 9, 10]</td><td>否</td></tr></tbody></table><p><strong>根据表中数据可见，当数组内元素个数大于 10 时：</strong></p><ul><li>JScript &amp; Carakan 排序结果有误</li><li>Chakra &amp; JavaScriptCore 看起来没有进行排序</li><li>SpiderMonkey 返回了预期的正确结果</li><li>V8 <strong>排序结果由正确转为不正确</strong></li></ul><h5 id="splice" tabindex="-1"><a class="header-anchor" href="#splice"><span><strong>splice</strong></span></a></h5><p>splice()方法用新元素替换旧元素的方式来修改数组。它是一个常用的方法，复杂的数组操作场景通常都会有它的身影，特别是需要维持原数组引用时，就地删除或者新增元素，splice是最适合的。</p><p>语法：<em>arr.splice(start,deleteCount[, item1[, item2[, …]]])</em></p><p>start 指定从哪一位开始修改内容。如果超过了数组长度，则从数组末尾开始添加内容；如果是负值，则其指定的索引位置等同于 length+start (length为数组的长度)，表示从数组末尾开始的第 -start 位。</p><p>deleteCount 指定要删除的元素个数，若等于0，则不删除。这种情况下，至少应该添加一位新元素，若大于start之后的元素总和，则start及之后的元素都将被删除。</p><p>itemN 指定新增的元素，如果缺省，则该方法只删除数组元素。</p><p>返回值 由原数组中被删除元素组成的数组，如果没有删除，则返回一个空数组。</p><p>下面来举栗子说明：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&quot;apple&quot;,&quot;boy&quot;];</span>
<span class="line">let splices = array.splice(1,1);</span>
<span class="line">console.log(array); // [&quot;apple&quot;]</span>
<span class="line">console.log(splices); // [&quot;boy&quot;] ,可见是从数组下标为1的元素开始删除,并且删除一个元素,由于itemN缺省,故此时该方法只删除元素</span>
<span class="line"></span>
<span class="line">array = [&quot;apple&quot;,&quot;boy&quot;];</span>
<span class="line">splices = array.splice(2,1,&quot;cat&quot;);</span>
<span class="line">console.log(array); // [&quot;apple&quot;, &quot;boy&quot;, &quot;cat&quot;]</span>
<span class="line">console.log(splices); // [], 可见由于start超过数组长度,此时从数组末尾开始添加元素,并且原数组不会发生删除行为</span>
<span class="line"></span>
<span class="line">array = [&quot;apple&quot;,&quot;boy&quot;];</span>
<span class="line">splices = array.splice(-2,1,&quot;cat&quot;);</span>
<span class="line">console.log(array); // [&quot;cat&quot;, &quot;boy&quot;]</span>
<span class="line">console.log(splices); // [&quot;apple&quot;], 可见当start为负值时,是从数组末尾开始的第-start位开始删除,删除一个元素,并且从此处插入了一个元素</span>
<span class="line"></span>
<span class="line">array = [&quot;apple&quot;,&quot;boy&quot;];</span>
<span class="line">splices = array.splice(-3,1,&quot;cat&quot;);</span>
<span class="line">console.log(array); // [&quot;cat&quot;, &quot;boy&quot;]</span>
<span class="line">console.log(splices); // [&quot;apple&quot;], 可见即使-start超出数组长度,数组默认从首位开始删除</span>
<span class="line"></span>
<span class="line">array = [&quot;apple&quot;,&quot;boy&quot;];</span>
<span class="line">splices = array.splice(0,3,&quot;cat&quot;);</span>
<span class="line">console.log(array); // [&quot;cat&quot;]</span>
<span class="line">console.log(splices); // [&quot;apple&quot;, &quot;boy&quot;], 可见当deleteCount大于数组start之后的元素总和时,start及之后的元素都将被删除</span>
<span class="line">123456789101112131415161718192021222324</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同上, splice一样受益于鸭式辨型, 比如:</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:&quot;apple&quot;,1:&quot;boy&quot;,length:2};</span>
<span class="line">let splices = Array.prototype.splice.call(o,1,1);</span>
<span class="line">console.log(o); // Object {0: &quot;apple&quot;, length: 1}, 可见对象o删除了一个属性,并且length-1</span>
<span class="line">console.log(splices); // [&quot;boy&quot;]</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>注意：如果类数组对象没有length属性，splice将为该类数组对象添加length属性，并初始化为0。（此处忽略举例，如果需要请在评论里反馈）</p><p>如果需要删除数组中一个已存在的元素，可参考如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&#39;a&#39;,&#39;b&#39;,&#39;c&#39;];</span>
<span class="line">array.splice(array.indexOf(&#39;b&#39;),1);</span>
<span class="line">12</span>
<span class="line"></span></code></pre></div><h5 id="unshift" tabindex="-1"><a class="header-anchor" href="#unshift"><span><strong>unshift</strong></span></a></h5><p>unshift() 方法用于在数组开始处插入一些元素(就像是栈底插入)，并返回数组新的长度。</p><p>语法：<em>arr.unshift(element1, …, elementN)</em></p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;];</span>
<span class="line">let length = array.unshift(&quot;yellow&quot;);</span>
<span class="line">console.log(array); // [&quot;yellow&quot;, &quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]</span>
<span class="line">console.log(length); // 4</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>如果给unshift方法传入一个数组呢？</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;];</span>
<span class="line">let length = array.unshift([&quot;yellow&quot;]);</span>
<span class="line">console.log(array); // [[&quot;yellow&quot;], &quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]</span>
<span class="line">console.log(length); // 4, 可见数组也能成功插入</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>同上，unshift也受益于鸭式辨型，呈上栗子：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:&quot;red&quot;, 1:&quot;green&quot;, 2:&quot;blue&quot;,length:3};</span>
<span class="line">let length = Array.prototype.unshift.call(o,&quot;gray&quot;);</span>
<span class="line">console.log(o); // Object {0: &quot;gray&quot;, 1: &quot;red&quot;, 2: &quot;green&quot;, 3: &quot;blue&quot;, length: 4}</span>
<span class="line">console.log(length); // 4</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>注意：如果类数组对象不指定length属性，则返回结果是这样的 <code>Object {0: &quot;gray&quot;, 1: &quot;green&quot;, 2: &quot;blue&quot;, length: 1}</code>，shift会认为数组长度为0，此时将从对象下标为0的位置开始插入，相应位置属性将被替换，此时初始化类数组对象的length属性为插入元素个数。</p><h5 id="copywithin-es6" tabindex="-1"><a class="header-anchor" href="#copywithin-es6"><span><strong>copyWithin(ES6)</strong></span></a></h5><p>copyWithin() 方法基于<strong>ECMAScript 2015（ES6）规范</strong>，用于数组内元素之间的替换，即替换元素和被替换元素均是数组内的元素。</p><p>语法：<em>arr.copyWithin(target, start[, end = this.length])</em></p><p>taget 指定被替换元素的索引，start 指定替换元素起始的索引，end 可选，指的是替换元素结束位置的索引。</p><p>如果start为负，则其指定的索引位置等同于length+start，length为数组的长度。end也是如此。</p><p>注：目前只有Firefox（版本32及其以上版本）实现了该方法。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [1,2,3,4,5]; </span>
<span class="line">let array2 = array.copyWithin(0,3);</span>
<span class="line">console.log(array===array2,array2); // true [4, 5, 3, 4, 5]</span>
<span class="line"></span>
<span class="line">let array = [1,2,3,4,5]; </span>
<span class="line">console.log(array.copyWithin(0,3,4)); // [4, 2, 3, 4, 5]</span>
<span class="line"></span>
<span class="line">let array = [1,2,3,4,5]; </span>
<span class="line">console.log(array.copyWithin(0,-2,-1)); // [4, 2, 3, 4, 5]</span>
<span class="line">123456789</span>
<span class="line"></span></code></pre></div><p>同上，copyWithin一样受益于鸭式辨型，例如：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:1, 1:2, 2:3, 3:4, 4:5,length:5}</span>
<span class="line">let o2 = Array.prototype.copyWithin.call(o,0,3);</span>
<span class="line">console.log(o===o2,o2); // true Object { 0=4,  1=5,  2=3,  更多...}</span>
<span class="line">123</span>
<span class="line"></span></code></pre></div><p>如需在Firefox之外的浏览器使用copyWithin方法，请参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin#Polyfill" target="_blank" rel="noopener noreferrer">Polyfill</a>。</p><h5 id="fill-es6" tabindex="-1"><a class="header-anchor" href="#fill-es6"><span><strong>fill(ES6)</strong></span></a></h5><p>fill() 方法基于<strong>ECMAScript 2015（ES6）规范</strong>，它同样用于数组元素替换，但与copyWithin略有不同，它主要用于将数组指定区间内的元素替换为某个值。</p><p>语法：<em>arr.fill(value, start[, end = this.length])</em></p><p>value 指定被替换的值，start 指定替换元素起始的索引，end 可选，指的是替换元素结束位置的索引。</p><p>如果start为负，则其指定的索引位置等同于length+start，length为数组的长度。end也是如此。</p><p>注：目前只有Firefox（版本31及其以上版本）实现了该方法。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [1,2,3,4,5];</span>
<span class="line">let array2 = array.fill(10,0,3);</span>
<span class="line">console.log(array===array2,array2); // true [10, 10, 10, 4, 5], 可见数组区间[0,3]的元素全部替换为10</span>
<span class="line">// 其他的举例请参考copyWithin</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>同上，fill 一样受益于鸭式辨型，例如：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:1, 1:2, 2:3, 3:4, 4:5,length:5}</span>
<span class="line">let o2 = Array.prototype.fill.call(o,10,0,2);</span>
<span class="line">console.log(o===o2,o2); true Object { 0=10,  1=10,  2=3,  更多...}</span>
<span class="line">123</span>
<span class="line"></span></code></pre></div><p>如需在Firefox之外的浏览器使用fill方法,请参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#Compatibility" target="_blank" rel="noopener noreferrer">Polyfill</a>。</p><h4 id="不会改变自身的方法-9个" tabindex="-1"><a class="header-anchor" href="#不会改变自身的方法-9个"><span><strong>不会改变自身的方法(9个)</strong></span></a></h4><p>基于ES7，不会改变自身的方法一共有9个，分别为concat、join、slice、toString、toLocateString、indexOf、lastIndexOf、未标准的toSource以及ES7新增的方法includes。</p><h5 id="concat" tabindex="-1"><a class="header-anchor" href="#concat"><span><strong>concat</strong></span></a></h5><p>concat() 方法将传入的数组或者元素与原数组合并，组成一个新的数组并返回。</p><p>语法：<em>arr.concat(value1, value2, …, valueN)</em></p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [1, 2, 3];</span>
<span class="line">let array2 = array.concat(4,[5,6],[7,8,9]);</span>
<span class="line">console.log(array2); // [1, 2, 3, 4, 5, 6, 7, 8, 9]</span>
<span class="line">console.log(array); // [1, 2, 3], 可见原数组并未被修改</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>若concat方法中不传入参数，那么将基于原数组<strong>浅复制</strong>生成一个一模一样的新数组（指向新的地址空间）。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [{a: 1}];</span>
<span class="line">let array3 = array.concat();</span>
<span class="line">console.log(array3); // [{a: 1}]</span>
<span class="line">console.log(array3 === array); // false</span>
<span class="line">console.log(array[0] === array3[0]); // true，新旧数组第一个元素依旧共用一个同一个对象的引用</span>
<span class="line">12345</span>
<span class="line"></span></code></pre></div><p>同上，concat 一样受益于鸭式辨型，但其效果可能达不到我们的期望，如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:&quot;a&quot;, 1:&quot;b&quot;, 2:&quot;c&quot;,length:3};</span>
<span class="line">let o2 = Array.prototype.concat.call(o,&#39;d&#39;,{3:&#39;e&#39;,4:&#39;f&#39;,length:2},[&#39;g&#39;,&#39;h&#39;,&#39;i&#39;]);</span>
<span class="line">console.log(o2); // [{0:&quot;a&quot;, 1:&quot;b&quot;, 2:&quot;c&quot;, length:3}, &#39;d&#39;, {3:&#39;e&#39;, 4:&#39;f&#39;, length:2}, &#39;g&#39;, &#39;h&#39;, &#39;i&#39;]</span>
<span class="line">123</span>
<span class="line"></span></code></pre></div><p>可见，类数组对象合并后返回的是依然是数组，并不是我们期望的对象。</p><h5 id="join" tabindex="-1"><a class="header-anchor" href="#join"><span><strong>join</strong></span></a></h5><p>join() 方法将数组中的所有元素连接成一个字符串。</p><p>语法：<em>arr.join([separator = ‘,’])</em> separator可选，缺省默认为逗号。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&#39;We&#39;, &#39;are&#39;, &#39;Chinese&#39;];</span>
<span class="line">console.log(array.join()); // &quot;We,are,Chinese&quot;</span>
<span class="line">console.log(array.join(&#39;+&#39;)); // &quot;We+are+Chinese&quot;</span>
<span class="line">console.log(array.join(&#39;&#39;)); // &quot;WeareChinese&quot;</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>同上，join 一样受益于鸭式辨型，如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:&quot;We&quot;, 1:&quot;are&quot;, 2:&quot;Chinese&quot;, length:3};</span>
<span class="line">console.log(Array.prototype.join.call(o,&#39;+&#39;)); // &quot;We+are+Chinese&quot;</span>
<span class="line">console.log(Array.prototype.join.call(&#39;abc&#39;)); // &quot;a,b,c&quot;</span>
<span class="line">123</span>
<span class="line"></span></code></pre></div><h5 id="slice" tabindex="-1"><a class="header-anchor" href="#slice"><span><strong>slice</strong></span></a></h5><p>slice() 方法将数组中一部分元素浅复制存入新的数组对象，并且返回这个数组对象。</p><p>语法：<em>arr.slice([start[, end]])</em></p><p>参数 start 指定复制开始位置的索引，end如果有值则表示复制结束位置的索引（不包括此位置）。</p><p>如果 start 的值为负数，假如数组长度为 length，则表示从 length+start 的位置开始复制，此时参数 end 如果有值，只能是比 start 大的负数，否则将返回空数组。</p><p>slice方法参数为空时，同concat方法一样，都是浅复制生成一个新数组。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&quot;one&quot;, &quot;two&quot;, &quot;three&quot;,&quot;four&quot;, &quot;five&quot;];</span>
<span class="line">console.log(array.slice()); // [&quot;one&quot;, &quot;two&quot;, &quot;three&quot;,&quot;four&quot;, &quot;five&quot;]</span>
<span class="line">console.log(array.slice(2,3)); // [&quot;three&quot;]</span>
<span class="line">123</span>
<span class="line"></span></code></pre></div><p><strong>浅复制</strong> 是指当对象的被复制时，只是复制了对象的引用，指向的依然是同一个对象。下面来说明slice为什么是浅复制。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [{color:&quot;yellow&quot;}, 2, 3];</span>
<span class="line">let array2 = array.slice(0,1);</span>
<span class="line">console.log(array2); // [{color:&quot;yellow&quot;}]</span>
<span class="line">array[0][&quot;color&quot;] = &quot;blue&quot;;</span>
<span class="line">console.log(array2); // [{color:&quot;bule&quot;}]</span>
<span class="line">12345</span>
<span class="line"></span></code></pre></div><p>由于slice是浅复制，复制到的对象只是一个引用，改变原数组array的值，array2也随之改变。</p><p>同时，稍微利用下 slice 方法第一个参数为负数时的特性，我们可以非常方便的拿到数组的最后一项元素，如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">console.log([1,2,3].slice(-1));//[3]</span>
<span class="line">1</span>
<span class="line"></span></code></pre></div><p>同上，slice 一样受益于鸭式辨型。如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:{&quot;color&quot;:&quot;yellow&quot;}, 1:2, 2:3, length:3};</span>
<span class="line">let o2 = Array.prototype.slice.call(o,0,1);</span>
<span class="line">console.log(o2); // [{color:&quot;yellow&quot;}] ,毫无违和感...</span>
<span class="line">123</span>
<span class="line"></span></code></pre></div><p>鉴于IE9以下版本对于该方法支持性并不是很好，如需更好的支持低版本IE浏览器，请参考<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice" target="_blank" rel="noopener noreferrer">polyfill</a>。</p><h5 id="tostring" tabindex="-1"><a class="header-anchor" href="#tostring"><span><strong>toString</strong></span></a></h5><p>toString() 方法返回数组的字符串形式，该字符串由数组中的每个元素的 <code>toString()</code> 返回值经调用 <code>join()</code> 方法连接（由逗号隔开）组成。</p><p>语法： <em>arr.toString()</em></p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&#39;Jan&#39;, &#39;Feb&#39;, &#39;Mar&#39;, &#39;Apr&#39;];</span>
<span class="line">let str = array.toString();</span>
<span class="line">console.log(str); // Jan,Feb,Mar,Apr</span>
<span class="line">123</span>
<span class="line"></span></code></pre></div><p>当数组直接和字符串作连接操作时，将会自动调用其toString() 方法。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let str = [&#39;Jan&#39;, &#39;Feb&#39;, &#39;Mar&#39;, &#39;Apr&#39;] + &#39;,May&#39;;</span>
<span class="line">console.log(str); // &quot;Jan,Feb,Mar,Apr,May&quot;</span>
<span class="line">// 下面我们来试试鸭式辨型</span>
<span class="line">let o = {0:&#39;Jan&#39;, 1:&#39;Feb&#39;, 2:&#39;Mar&#39;, length:3};</span>
<span class="line">let o2 = Array.prototype.toString.call(o);</span>
<span class="line">console.log(o2); // [object Object]</span>
<span class="line">console.log(o.toString()==o2); // true</span>
<span class="line">1234567</span>
<span class="line"></span></code></pre></div><p>可见，<code>Array.prototype.toString()</code>方法处理类数组对象时，跟类数组对象直接调用<code>Object.prototype.toString()</code>方法结果完全一致，说好的鸭式辨型呢？</p><p>根据ES5语义，toString() 方法是通用的，可被用于任何对象。如果对象有一个join() 方法，将会被调用，其返回值将被返回，没有则调用<code>Object.prototype.toString()</code>，为此，我们给o对象添加一个join方法。如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {</span>
<span class="line">  0:&#39;Jan&#39;, </span>
<span class="line">  1:&#39;Feb&#39;, </span>
<span class="line">  2:&#39;Mar&#39;, </span>
<span class="line">  length:3, </span>
<span class="line">  join:function(){</span>
<span class="line">    return Array.prototype.join.call(this);</span>
<span class="line">  }</span>
<span class="line">};</span>
<span class="line">console.log(Array.prototype.toString.call(o)); // &quot;Jan,Feb,Mar&quot;</span>
<span class="line">12345678910</span>
<span class="line"></span></code></pre></div><h5 id="tolocalestring" tabindex="-1"><a class="header-anchor" href="#tolocalestring"><span><strong>toLocaleString</strong></span></a></h5><p>toLocaleString() 类似toString()的变型，该字符串由数组中的每个元素的 <code>toLocaleString()</code> 返回值经调用 <code>join()</code> 方法连接（由逗号隔开）组成。</p><p>语法：<em>arr.toLocaleString()</em></p><p>数组中的元素将调用各自的 toLocaleString 方法：</p><ul><li><code>Object</code>：<code>[Object.prototype.toLocaleString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString)</code></li><li><code>Number</code>：<code>[Number.prototype.toLocaleString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)</code></li><li><code>Date</code>：<code>[Date.prototype.toLocaleString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)</code></li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array= [{name:&#39;zz&#39;}, 123, &quot;abc&quot;, new Date()];</span>
<span class="line">let str = array.toLocaleString();</span>
<span class="line">console.log(str); // [object Object],123,abc,2016/1/5 下午1:06:23</span>
<span class="line">123</span>
<span class="line"></span></code></pre></div><p>其鸭式辨型的写法也同toString 保持一致，如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {</span>
<span class="line">  0:123, </span>
<span class="line">  1:&#39;abc&#39;, </span>
<span class="line">  2:new Date(), </span>
<span class="line">  length:3, </span>
<span class="line">  join:function(){</span>
<span class="line">    return Array.prototype.join.call(this);</span>
<span class="line">  }</span>
<span class="line">};</span>
<span class="line">console.log(Array.prototype.toLocaleString.call(o)); // 123,abc,2016/1/5 下午1:16:50</span>
<span class="line">12345678910</span>
<span class="line"></span></code></pre></div><h5 id="indexof" tabindex="-1"><a class="header-anchor" href="#indexof"><span><strong>indexOf</strong></span></a></h5><p>indexOf() 方法用于查找元素在数组中第一次出现时的索引，如果没有，则返回-1。</p><p>语法：<em>arr.indexOf(element, fromIndex=0)</em></p><p>element 为需要查找的元素。</p><p>fromIndex 为开始查找的位置，缺省默认为0。如果超出数组长度，则返回-1。如果为负值，假设数组长度为length，则从数组的第 length + fromIndex项开始往数组末尾查找，如果length + fromIndex&lt;0 则整个数组都会被查找。</p><p>indexOf使用严格相等（即使用 === 去匹配数组中的元素）。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&#39;abc&#39;, &#39;def&#39;, &#39;ghi&#39;,&#39;123&#39;];</span>
<span class="line">console.log(array.indexOf(&#39;def&#39;)); // 1</span>
<span class="line">console.log(array.indexOf(&#39;def&#39;,-1)); // -1 此时表示从最后一个元素往后查找,因此查找失败返回-1</span>
<span class="line">console.log(array.indexOf(&#39;def&#39;,-4)); // 1 由于4大于数组长度,此时将查找整个数组,因此返回1</span>
<span class="line">console.log(array.indexOf(123)); // -1, 由于是严格匹配,因此并不会匹配到字符串&#39;123&#39;</span>
<span class="line">12345</span>
<span class="line"></span></code></pre></div><p>得益于鸭式辨型，indexOf 可以处理类数组对象。如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:&#39;abc&#39;, 1:&#39;def&#39;, 2:&#39;ghi&#39;, length:3};</span>
<span class="line">console.log(Array.prototype.indexOf.call(o,&#39;ghi&#39;,-4));//2</span>
<span class="line">12</span>
<span class="line"></span></code></pre></div><p>然而该方法并不支持IE9以下版本，如需更好的支持低版本IE浏览器（IE6~8）， 请参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill" target="_blank" rel="noopener noreferrer">Polyfill</a>。</p><h5 id="lastindexof" tabindex="-1"><a class="header-anchor" href="#lastindexof"><span><strong>lastIndexOf</strong></span></a></h5><p>lastIndexOf() 方法用于查找元素在数组中最后一次出现时的索引，如果没有，则返回-1。并且它是indexOf的逆向查找，即从数组最后一个往前查找。</p><p>语法：<em>arr.lastIndexOf(element, fromIndex=length-1)</em></p><p>element 为需要查找的元素。</p><p>fromIndex 为开始查找的位置，缺省默认为数组长度length-1。如果超出数组长度，由于是逆向查找，则查找整个数组。如果为负值，则从数组的第 length + fromIndex项开始往数组开头查找，如果length + fromIndex&lt;0 则数组不会被查找。</p><p>同 indexOf 一样，lastIndexOf 也是严格匹配数组元素。</p><p>举例请参考 <code>indexOf</code> ，不再详述，兼容低版本IE浏览器（IE6~8），请参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf#Compatibility" target="_blank" rel="noopener noreferrer">Polyfill</a>。</p><h5 id="includes-es7" tabindex="-1"><a class="header-anchor" href="#includes-es7"><span><strong>includes(ES7)</strong></span></a></h5><p>includes() 方法基于<strong>ECMAScript 2016（ES7）规范</strong>，它用来判断当前数组是否包含某个指定的值，如果是，则返回 true，否则返回 false。</p><p>语法：<em>arr.includes(element, fromIndex=0)</em></p><p>element 为需要查找的元素。</p><p>fromIndex 表示从该索引位置开始查找 element，缺省为0，它是正向查找，即从索引处往数组末尾查找。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [-0, 1, 2];</span>
<span class="line">console.log(array.includes(+0)); // true</span>
<span class="line">console.log(array.includes(1)); // true</span>
<span class="line">console.log(array.includes(2,-4)); // true</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>以上，includes似乎忽略了 <code>-0</code> 与 <code>+0</code> 的区别，这不是问题，因为JavaScript一直以来都是不区分 <code>-0</code> 和 <code>+0</code> 的。</p><p>你可能会问，既然有了indexOf方法，为什么又造一个includes方法，<code>arr.indexOf(x)&gt;-1</code>不就等于<code>arr.includes(x)</code>？看起来是的，几乎所有的时候它们都等同，唯一的区别就是includes能够发现NaN，而indexOf不能。</p><div class="language-javascript" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">let</span> array <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">NaN</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>array<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token number">NaN</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arra<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token number">NaN</span><span class="token punctuation">)</span><span class="token operator">&gt;</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span></span>
<span class="line"><span class="token number">123</span></span>
<span class="line"></span></code></pre></div><p>该方法同样受益于鸭式辨型。如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:&#39;a&#39;, 1:&#39;b&#39;, 2:&#39;c&#39;, length:3};</span>
<span class="line">let bool = Array.prototype.includes.call(o, &#39;a&#39;);</span>
<span class="line">console.log(bool); // true</span>
<span class="line">123</span>
<span class="line"></span></code></pre></div><p>该方法只有在Chrome 47、opera 34、Safari 9版本及其更高版本中才被实现。如需支持其他浏览器，请参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Polyfill" target="_blank" rel="noopener noreferrer">Polyfill</a>。</p><h5 id="tosource-非标准" tabindex="-1"><a class="header-anchor" href="#tosource-非标准"><span><strong>toSource(非标准)</strong></span></a></h5><p>toSource() 方法是<strong>非标准的</strong>，该方法返回数组的源代码，目前只有 Firefox 实现了它。</p><p>语法：<em>arr.toSource()</em></p><div class="language-javascript" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">let</span> array <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;c&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>array<span class="token punctuation">.</span><span class="token function">toSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]</span></span>
<span class="line"><span class="token comment">// 测试鸭式辨型</span></span>
<span class="line"><span class="token keyword">let</span> o <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token operator">:</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token operator">:</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token operator">:</span><span class="token string">&#39;c&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">length</span><span class="token operator">:</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toSource</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&quot;a&quot;,&quot;b&quot;,&quot;c&quot;]</span></span>
<span class="line"><span class="token number">12345</span></span>
<span class="line"></span></code></pre></div><h4 id="遍历方法-12个" tabindex="-1"><a class="header-anchor" href="#遍历方法-12个"><span><strong>遍历方法(12个)</strong></span></a></h4><p>基于ES6，不会改变自身的方法一共有12个，分别为forEach、every、some、filter、map、reduce、reduceRight 以及ES6新增的方法entries、find、findIndex、keys、values。</p><h5 id="foreach" tabindex="-1"><a class="header-anchor" href="#foreach"><span><strong>forEach</strong></span></a></h5><p>forEach() 方法指定数组的每项元素都执行一次传入的函数，返回值为undefined。</p><p>语法：<em>arr.forEach(fn, thisArg)</em></p><p>fn 表示在数组每一项上执行的函数，接受三个参数：</p><ul><li>value 当前正在被处理的元素的值</li><li>index 当前元素的数组索引</li><li>array 数组本身</li></ul><p>thisArg 可选，用来当做fn函数内的this对象。</p><p>forEach 将为数组中每一项执行一次 fn 函数，那些已删除，新增或者从未赋值的项将被跳过（但不包括值为 undefined 的项）。</p><p>遍历过程中，fn会被传入上述三个参数。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [1, 3, 5];</span>
<span class="line">let obj = {name:&#39;cc&#39;};</span>
<span class="line">let sReturn = array.forEach(function(value, index, array){</span>
<span class="line">  array[index] = value * value;</span>
<span class="line">  console.log(this.name); // cc被打印了三次</span>
<span class="line">},obj);</span>
<span class="line">console.log(array); // [1, 9, 25], 可见原数组改变了</span>
<span class="line">console.log(sReturn); // undefined, 可见返回值为undefined</span>
<span class="line">12345678</span>
<span class="line"></span></code></pre></div><p>得益于鸭式辨型，虽然forEach不能直接遍历对象，但它可以通过call方式遍历类数组对象。如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:1, 1:3, 2:5, length:3};</span>
<span class="line">Array.prototype.forEach.call(o,function(value, index, obj){</span>
<span class="line">  console.log(value,index,obj);</span>
<span class="line">  obj[index] = value * value;</span>
<span class="line">},o);</span>
<span class="line">// 1 0 Object {0: 1, 1: 3, 2: 5, length: 3}</span>
<span class="line">// 3 1 Object {0: 1, 1: 3, 2: 5, length: 3}</span>
<span class="line">// 5 2 Object {0: 1, 1: 9, 2: 5, length: 3}</span>
<span class="line">console.log(o); // Object {0: 1, 1: 9, 2: 25, length: 3}</span>
<span class="line">123456789</span>
<span class="line"></span></code></pre></div><p>参考前面的文章 <code>[详解JS遍历](http://louiszhai.github.io/2015/12/18/traverse/#forEach)</code> 中 forEach的讲解，我们知道，forEach无法直接退出循环，只能使用return 来达到for循环中continue的效果，并且forEach不能在低版本IE（6~8）中使用，兼容写法请参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#%E5%85%BC%E5%AE%B9%E6%97%A7%E7%8E%AF%E5%A2%83%EF%BC%88Polyfill%EF%BC%89" target="_blank" rel="noopener noreferrer">Polyfill</a>。</p><h5 id="every" tabindex="-1"><a class="header-anchor" href="#every"><span><strong>every</strong></span></a></h5><p>every() 方法使用传入的函数测试所有元素，只要其中有一个函数返回值为 false，那么该方法的结果为 false；如果全部返回 true，那么该方法的结果才为 true。因此 every 方法存在如下规律：</p><ul><li>若需检测数组中存在元素大于100 （即 one &gt; 100），那么我们需要在传入的函数中构造 “false” 返回值 （即返回 item &lt;= 100），同时整个方法结果为 false 才表示数组存在元素满足条件；（简单理解为：若是单项判断，可用 one false ===&gt; false）</li><li>若需检测数组中是否所有元素都大于100 （即all &gt; 100）那么我们需要在传入的函数中构造 “true” 返回值 （即返回 item &gt; 100），同时整个方法结果为 true 才表示数组所有元素均满足条件。(简单理解为：若是全部判断，可用 all true ===&gt; true）</li></ul><p>语法同上述forEach，具体还可以参考 <code>[详解JS遍历](http://louiszhai.github.io/2015/12/18/traverse/#every)</code> 中every的讲解。</p><p>以下是鸭式辨型的写法：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:10, 1:8, 2:25, length:3};</span>
<span class="line">let bool = Array.prototype.every.call(o,function(value, index, obj){</span>
<span class="line">  return value &gt;= 8;</span>
<span class="line">},o);</span>
<span class="line">console.log(bool); // true</span>
<span class="line">12345</span>
<span class="line"></span></code></pre></div><p>every 一样不能在低版本IE(6~8)中使用，兼容写法请参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every#Compatibility" target="_blank" rel="noopener noreferrer">Polyfill</a>。</p><h5 id="some" tabindex="-1"><a class="header-anchor" href="#some"><span><strong>some</strong></span></a></h5><p>some() 方法刚好同 every() 方法相反，some 测试数组元素时，只要有一个函数返回值为 true，则该方法返回 true，若全部返回 false，则该方法返回 false。some 方法存在如下规律：</p><ul><li>若需检测数组中存在元素大于100 (即 one &gt; 100)，那么我们需要在传入的函数中构造 “true” 返回值 (即返回 item &gt; 100)，同时整个方法结果为 true 才表示数组存在元素满足条件；（简单理解为：若是单项判断，可用 one true ===&gt; true）</li><li>若需检测数组中是否所有元素都大于100（即 all &gt; 100），那么我们需要在传入的函数中构造 “false” 返回值 （即返回 item &lt;= 100），同时整个方法结果为 false 才表示数组所有元素均满足条件。（简单理解为：若是全部判断，可用 all false ===&gt; false）</li></ul><p>你注意到没有，some方法与includes方法有着异曲同工之妙，他们都是探测数组中是否拥有满足条件的元素，一旦找到，便返回true。多观察和总结这种微妙的关联关系，能够帮助我们深入理解它们的原理。</p><p>some 的鸭式辨型写法可以参照every，同样它也不能在低版本IE（6~8）中使用，兼容写法请参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some#Compatibility" target="_blank" rel="noopener noreferrer">Polyfill</a>。</p><h5 id="filter" tabindex="-1"><a class="header-anchor" href="#filter"><span><strong>filter</strong></span></a></h5><p>filter() 方法使用传入的函数测试所有元素，并返回所有通过测试的元素组成的新数组。它就好比一个过滤器，筛掉不符合条件的元素。</p><p>语法：<em>arr.filter(fn, thisArg)</em></p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [18, 9, 10, 35, 80];</span>
<span class="line">let array2 = array.filter(function(value, index, array){</span>
<span class="line">  return value &gt; 20;</span>
<span class="line">});</span>
<span class="line">console.log(array2); // [35, 80]</span>
<span class="line">12345</span>
<span class="line"></span></code></pre></div><p>filter一样支持鸭式辨型，具体请参考every方法鸭式辨型写法。其在低版本IE（6~8）的兼容写法请参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Compatibility" target="_blank" rel="noopener noreferrer">Polyfill</a>。</p><h5 id="map" tabindex="-1"><a class="header-anchor" href="#map"><span><strong>map</strong></span></a></h5><p>map() 方法遍历数组，使用传入函数处理每个元素，并返回函数的返回值组成的新数组。</p><p>语法：<em>arr.map(fn, thisArg)</em></p><p>参数介绍同 forEach 方法的参数介绍。</p><p>具体用法请参考 <code>[详解JS遍历](http://louiszhai.github.io/2015/12/18/traverse/#map)</code> 中 map 的讲解。</p><p>map 一样支持鸭式辨型, 具体请参考every方法鸭式辨型写法。</p><p>其在低版本IE（6~8）的兼容写法请参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Compatibility" target="_blank" rel="noopener noreferrer">Polyfill</a>。</p><h5 id="reduce" tabindex="-1"><a class="header-anchor" href="#reduce"><span><strong>reduce</strong></span></a></h5><p>reduce() 方法接收一个方法作为累加器，数组中的每个值(从左至右) 开始合并，最终为一个值。</p><p>语法：<em>arr.reduce(fn, initialValue)</em></p><p>fn 表示在数组每一项上执行的函数，接受四个参数：</p><ul><li>previousValue 上一次调用回调返回的值，或者是提供的初始值</li><li>value 数组中当前被处理元素的值</li><li>index 当前元素在数组中的索引</li><li>array 数组自身</li></ul><p>initialValue 指定第一次调用 fn 的第一个参数。</p><p>当 fn 第一次执行时：</p><ul><li>如果 initialValue 在调用 reduce 时被提供，那么第一个 previousValue 将等于 initialValue，此时 item 等于数组中的第一个值；</li><li>如果 initialValue 未被提供，那么 previousVaule 等于数组中的第一个值，item 等于数组中的第二个值。此时如果数组为空，那么将抛出 TypeError。</li><li>如果数组仅有一个元素，并且没有提供 initialValue，或提供了 initialValue 但数组为空，那么fn不会被执行，数组的唯一值将被返回。</li></ul><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [1, 2, 3, 4];</span>
<span class="line">let s = array.reduce(function(previousValue, value, index, array){</span>
<span class="line">  return previousValue * value;</span>
<span class="line">},1);</span>
<span class="line">console.log(s); // 24</span>
<span class="line">// ES6写法更加简洁</span>
<span class="line">array.reduce((p, v) =&gt; p * v); // 24</span>
<span class="line">1234567</span>
<span class="line"></span></code></pre></div><p>以上回调被调用4次，每次的参数和返回见下表：</p><table><thead><tr><th>callback</th><th>previousValue</th><th>currentValue</th><th>index</th><th>array</th><th>return value</th></tr></thead><tbody><tr><td>第1次</td><td>1</td><td>1</td><td>0</td><td>[1,2,3,4]</td><td>1</td></tr><tr><td>第2次</td><td>1</td><td>2</td><td>1</td><td>[1,2,3,4]</td><td>2</td></tr><tr><td>第3次</td><td>2</td><td>3</td><td>2</td><td>[1,2,3,4]</td><td>6</td></tr><tr><td>第4次</td><td>6</td><td>4</td><td>3</td><td>[1,2,3,4]</td><td>24</td></tr></tbody></table><p>reduce 一样支持鸭式辨型，具体请参考every方法鸭式辨型写法。</p><p>其在低版本IE（6~8）的兼容写法请参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#%E5%85%BC%E5%AE%B9%E6%97%A7%E7%8E%AF%E5%A2%83%EF%BC%88Polyfill%EF%BC%89" target="_blank" rel="noopener noreferrer">Polyfill</a>。</p><h5 id="reduceright" tabindex="-1"><a class="header-anchor" href="#reduceright"><span><strong>reduceRight</strong></span></a></h5><p>reduceRight() 方法接收一个方法作为累加器，数组中的每个值（从右至左）开始合并，最终为一个值。除了与reduce执行方向相反外，其他完全与其一致，请参考上述 reduce 方法介绍。</p><p>其在低版本IE（6~8）的兼容写法请参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#.E5.85.BC.E5.AE.B9.E6.80.A7.E6.97.A7.E7.8E.AF.E5.A2.83.EF.BC.88Polyfill.EF.BC.89" target="_blank" rel="noopener noreferrer">Polyfill</a>。</p><h5 id="entries-es6" tabindex="-1"><a class="header-anchor" href="#entries-es6"><span><strong>entries(ES6)</strong></span></a></h5><p>entries() 方法基于<strong>ECMAScript 2015（ES6）规范</strong>，返回一个数组迭代器对象，该对象包含数组中每个索引的键值对。</p><p>语法：<em>arr.entries()</em></p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;];</span>
<span class="line">let iterator = array.entries();</span>
<span class="line">console.log(iterator.next().value); // [0, &quot;a&quot;]</span>
<span class="line">console.log(iterator.next().value); // [1, &quot;b&quot;]</span>
<span class="line">console.log(iterator.next().value); // [2, &quot;c&quot;]</span>
<span class="line">console.log(iterator.next().value); // undefined, 迭代器处于数组末尾时, 再迭代就会返回undefined</span>
<span class="line">123456</span>
<span class="line"></span></code></pre></div><p>很明显，entries 也受益于鸭式辨型，如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let o = {0:&quot;a&quot;, 1:&quot;b&quot;, 2:&quot;c&quot;, length:3};</span>
<span class="line">let iterator = Array.prototype.entries.call(o);</span>
<span class="line">console.log(iterator.next().value); // [0, &quot;a&quot;]</span>
<span class="line">console.log(iterator.next().value); // [1, &quot;b&quot;]</span>
<span class="line">console.log(iterator.next().value); // [2, &quot;c&quot;]</span>
<span class="line">12345</span>
<span class="line"></span></code></pre></div><p>由于该方法基于ES6，因此目前并不支持所有浏览器，以下是各浏览器支持版本：</p><table><thead><tr><th>Browser</th><th>Chrome</th><th>Firefox (Gecko)</th><th>Internet Explorer</th><th>Opera</th><th>Safari</th></tr></thead><tbody><tr><td>Basic support</td><td>38</td><td><a href="https://developer.mozilla.org/en-US/Firefox/Releases/28" target="_blank" rel="noopener noreferrer">28</a></td><td></td><td></td><td></td></tr><tr><td>(28)</td><td>未实现</td><td>25</td><td>7.1</td><td></td><td></td></tr></tbody></table><h5 id="find-findindex-es6" tabindex="-1"><a class="header-anchor" href="#find-findindex-es6"><span><strong>find&amp;findIndex(ES6)</strong></span></a></h5><p>find() 方法基于<strong>ECMAScript 2015（ES6）规范</strong>，返回数组中第一个满足条件的元素（如果有的话）， 如果没有，则返回undefined。</p><p>findIndex() 方法也基于<strong>ECMAScript 2015（ES6）规范</strong>，它返回数组中第一个满足条件的元素的索引（如果有的话）否则返回-1。</p><p>语法：<em>arr.find(fn, thisArg)</em>，<em>arr.findIndex(fn, thisArg)</em></p><p>我们发现它们的语法与forEach等十分相似，其实不光语法，find（或findIndex）在参数及其使用注意事项上，均与forEach一致。因此此处将略去 find（或findIndex）的参数介绍。下面我们来看个例子🌰 ：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [1, 3, 5, 7, 8, 9, 10];</span>
<span class="line">function f(value, index, array){</span>
<span class="line">  return value%2==0; // 返回偶数</span>
<span class="line">}</span>
<span class="line">function f2(value, index, array){</span>
<span class="line">  return value &gt; 20; // 返回大于20的数</span>
<span class="line">}</span>
<span class="line">console.log(array.find(f)); // 8</span>
<span class="line">console.log(array.find(f2)); // undefined</span>
<span class="line">console.log(array.findIndex(f)); // 4</span>
<span class="line">console.log(array.findIndex(f2)); // -1</span>
<span class="line">1234567891011</span>
<span class="line"></span></code></pre></div><p>由于其鸭式辨型写法也与forEach方法一致，故此处略去。</p><p>兼容性上我没有详测，可以知道的是，最新版的Chrome v47，以及Firefox的版本25均实现了它们。</p><h5 id="keys-es6" tabindex="-1"><a class="header-anchor" href="#keys-es6"><span><strong>keys(ES6)</strong></span></a></h5><p>keys() 方法基于<strong>ECMAScript 2015（ES6）规范</strong>，返回一个数组索引的迭代器。（浏览器实际实现可能会有调整）</p><p>语法：<em>arr.keys()</em></p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&quot;abc&quot;, &quot;xyz&quot;];</span>
<span class="line">let iterator = array.keys();</span>
<span class="line">console.log(iterator.next()); // Object {value: 0, done: false}</span>
<span class="line">console.log(iterator.next()); // Object {value: 1, done: false}</span>
<span class="line">console.log(iterator.next()); // Object {value: undefined, done: false}</span>
<span class="line">12345</span>
<span class="line"></span></code></pre></div><p>索引迭代器会包含那些没有对应元素的索引，如下：</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&quot;abc&quot;, , &quot;xyz&quot;];</span>
<span class="line">let sparseKeys = Object.keys(array);</span>
<span class="line">let denseKeys = [...array.keys()];</span>
<span class="line">console.log(sparseKeys); // [&quot;0&quot;, &quot;2&quot;]</span>
<span class="line">console.log(denseKeys);  // [0, 1, 2]</span>
<span class="line">12345</span>
<span class="line"></span></code></pre></div><p>其鸭式辨型写法请参考上述 entries 方法。</p><p>前面我们用Array.from生成一个从0到指定数字的新数组，利用keys也很容易实现。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">[...Array(10).keys()]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]</span>
<span class="line">[...new Array(10).keys()]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]</span>
<span class="line">12</span>
<span class="line"></span></code></pre></div><p>由于Array的特性，new Array 和 Array 对单个数字的处理相同，因此以上两种均可行。</p><p>keys基于ES6，并未完全支持，以下是各浏览器支持版本：</p><table><thead><tr><th>Browser</th><th>Chrome</th><th>Firefox (Gecko)</th><th>Internet Explorer</th><th>Opera</th><th>Safari</th></tr></thead><tbody><tr><td>Basic support</td><td>38</td><td><a href="https://developer.mozilla.org/en-US/Firefox/Releases/28" target="_blank" rel="noopener noreferrer">28</a></td><td></td><td></td><td></td></tr><tr><td>(28)</td><td>未实现</td><td>25</td><td>7.1</td><td></td><td></td></tr></tbody></table><h5 id="values-es6" tabindex="-1"><a class="header-anchor" href="#values-es6"><span><strong>values(ES6)</strong></span></a></h5><p>values() 方法基于<strong>ECMAScript 2015（ES6）规范</strong>，返回一个数组迭代器对象，该对象包含数组中每个索引的值。其用法基本与上述 entries 方法一致。</p><p>语法：<em>arr.values()</em></p><p>遗憾的是，现在没有浏览器实现了该方法，因此下面将就着看看吧。</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&quot;abc&quot;, &quot;xyz&quot;];</span>
<span class="line">let iterator = array.values();</span>
<span class="line">console.log(iterator.next().value);//abc</span>
<span class="line">console.log(iterator.next().value);//xyz</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><h5 id="symbol-iterator-es6" tabindex="-1"><a class="header-anchor" href="#symbol-iterator-es6"><span><strong>Symbol.iterator(ES6)</strong></span></a></h5><p>该方法基于<strong>ECMAScript 2015（ES6）规范</strong>，同 values 方法功能相同。</p><p>语法：<em>arrSymbol.iterator</em></p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">let array = [&quot;abc&quot;, &quot;xyz&quot;];</span>
<span class="line">let iterator = array[Symbol.iterator]();</span>
<span class="line">console.log(iterator.next().value); // abc</span>
<span class="line">console.log(iterator.next().value); // xyz</span>
<span class="line">1234</span>
<span class="line"></span></code></pre></div><p>其鸭式辨型写法请参考上述 entries 方法。</p><p>由于该方法基于ES6，并未完全支持，以下是各浏览器支持版本：</p><table><thead><tr><th>Browser</th><th>Chrome</th><th>Firefox (Gecko)</th><th>Internet Explorer</th><th>Opera</th><th>Safari</th></tr></thead><tbody><tr><td>Basic support</td><td>38</td><td><a href="https://developer.mozilla.org/en-US/Firefox/Releases/36" target="_blank" rel="noopener noreferrer">36</a></td><td></td><td></td><td></td></tr><tr><td>(36) <a href="http://louiszhai.github.io/2017/04/28/array/#respond" target="_blank" rel="noopener noreferrer">1</a></td><td>未实现</td><td>25</td><td>未实现</td><td></td><td></td></tr></tbody></table><h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span><strong>小结</strong></span></a></h3><p>以上，Array.prototype 的各方法基本介绍完毕，这些方法之间存在很多共性。比如：</p><ul><li>所有插入元素的方法, 比如 push、unshift，一律返回数组新的长度；</li><li>所有删除元素的方法，比如 pop、shift、splice 一律返回删除的元素，或者返回删除的多个元素组成的数组；</li><li>部分遍历方法，比如 forEach、every、some、filter、map、find、findIndex，它们都包含<code>function(value,index,array){}</code> 和 <code>thisArg</code> 这样两个形参。</li></ul><p>Array.prototype 的所有方法均具有鸭式辨型这种神奇的特性。它们不止可以用来处理数组对象，还可以处理类数组对象。</p><p>例如 javascript 中一个纯天然的类数组对象字符串（String），像join方法（不改变当前对象自身）就完全适用，可惜的是 Array.prototype 中很多方法均会去试图修改当前对象的 length 属性，比如说 pop、push、shift, unshift 方法，操作 String 对象时，由于String对象的长度本身不可更改，这将导致抛出TypeError错误。</p><p>还记得么，Array.prototype本身就是一个数组，并且它的长度为0。</p><p>后续章节我们将继续探索Array的一些事情。感谢您的阅读！</p>`,398)]))}const c=n(p,[["render",o]]),d=JSON.parse('{"path":"/frontend/frontend-tips/array.html","title":"前端数组","lang":"zh-CN","frontmatter":{"description":"前端数组 数组是一种非常重要的数据类型，它语法简单、灵活、高效。 在多数编程语言中，数组都充当着至关重要的角色，以至于很难想象没有数组的编程语言会是什么模样。特别是JavaScript，它天生的灵活性，又进一步发挥了数组的特长，丰富了数组的使用场景。可以毫不夸张地说，不深入地了解数组，不足以写JavaScript。 截止ES7规范，数组共包含33个标准...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/frontend-tips/array.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"前端数组"}],["meta",{"property":"og:description","content":"前端数组 数组是一种非常重要的数据类型，它语法简单、灵活、高效。 在多数编程语言中，数组都充当着至关重要的角色，以至于很难想象没有数组的编程语言会是什么模样。特别是JavaScript，它天生的灵活性，又进一步发挥了数组的特长，丰富了数组的使用场景。可以毫不夸张地说，不深入地了解数组，不足以写JavaScript。 截止ES7规范，数组共包含33个标准..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-07-29T07:25:09.000Z"}],["meta",{"property":"article:modified_time","content":"2022-07-29T07:25:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"前端数组\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-07-29T07:25:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":3,"title":"Array构造器","slug":"array构造器","link":"#array构造器","children":[]},{"level":3,"title":"ES6新增的构造函数方法","slug":"es6新增的构造函数方法","link":"#es6新增的构造函数方法","children":[{"level":4,"title":"Array.of","slug":"array-of","link":"#array-of","children":[]},{"level":4,"title":"Array.from","slug":"array-from","link":"#array-from","children":[]}]},{"level":3,"title":"Array.isArray","slug":"array-isarray","link":"#array-isarray","children":[]},{"level":3,"title":"数组推导","slug":"数组推导","link":"#数组推导","children":[]},{"level":3,"title":"原型","slug":"原型","link":"#原型","children":[]},{"level":3,"title":"方法","slug":"方法","link":"#方法","children":[{"level":4,"title":"改变自身值的方法(9个)","slug":"改变自身值的方法-9个","link":"#改变自身值的方法-9个","children":[{"level":5,"title":"pop","slug":"pop","link":"#pop","children":[]},{"level":5,"title":"push","slug":"push","link":"#push","children":[]},{"level":5,"title":"reverse","slug":"reverse","link":"#reverse","children":[]},{"level":5,"title":"shift","slug":"shift","link":"#shift","children":[]},{"level":5,"title":"sort","slug":"sort","link":"#sort","children":[]},{"level":5,"title":"splice","slug":"splice","link":"#splice","children":[]},{"level":5,"title":"unshift","slug":"unshift","link":"#unshift","children":[]},{"level":5,"title":"copyWithin(ES6)","slug":"copywithin-es6","link":"#copywithin-es6","children":[]},{"level":5,"title":"fill(ES6)","slug":"fill-es6","link":"#fill-es6","children":[]}]},{"level":4,"title":"不会改变自身的方法(9个)","slug":"不会改变自身的方法-9个","link":"#不会改变自身的方法-9个","children":[{"level":5,"title":"concat","slug":"concat","link":"#concat","children":[]},{"level":5,"title":"join","slug":"join","link":"#join","children":[]},{"level":5,"title":"slice","slug":"slice","link":"#slice","children":[]},{"level":5,"title":"toString","slug":"tostring","link":"#tostring","children":[]},{"level":5,"title":"toLocaleString","slug":"tolocalestring","link":"#tolocalestring","children":[]},{"level":5,"title":"indexOf","slug":"indexof","link":"#indexof","children":[]},{"level":5,"title":"lastIndexOf","slug":"lastindexof","link":"#lastindexof","children":[]},{"level":5,"title":"includes(ES7)","slug":"includes-es7","link":"#includes-es7","children":[]},{"level":5,"title":"toSource(非标准)","slug":"tosource-非标准","link":"#tosource-非标准","children":[]}]},{"level":4,"title":"遍历方法(12个)","slug":"遍历方法-12个","link":"#遍历方法-12个","children":[{"level":5,"title":"forEach","slug":"foreach","link":"#foreach","children":[]},{"level":5,"title":"every","slug":"every","link":"#every","children":[]},{"level":5,"title":"some","slug":"some","link":"#some","children":[]},{"level":5,"title":"filter","slug":"filter","link":"#filter","children":[]},{"level":5,"title":"map","slug":"map","link":"#map","children":[]},{"level":5,"title":"reduce","slug":"reduce","link":"#reduce","children":[]},{"level":5,"title":"reduceRight","slug":"reduceright","link":"#reduceright","children":[]},{"level":5,"title":"entries(ES6)","slug":"entries-es6","link":"#entries-es6","children":[]},{"level":5,"title":"find&findIndex(ES6)","slug":"find-findindex-es6","link":"#find-findindex-es6","children":[]},{"level":5,"title":"keys(ES6)","slug":"keys-es6","link":"#keys-es6","children":[]},{"level":5,"title":"values(ES6)","slug":"values-es6","link":"#values-es6","children":[]},{"level":5,"title":"Symbol.iterator(ES6)","slug":"symbol-iterator-es6","link":"#symbol-iterator-es6","children":[]}]}]},{"level":3,"title":"小结","slug":"小结","link":"#小结","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1659079509000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":6,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":43.13,"words":12939},"filePathRelative":"frontend/frontend-tips/array.md","localizedDate":"2022年3月21日","autoDesc":true}');export{c as comp,d as data};
