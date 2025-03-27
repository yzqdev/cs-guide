import{_ as a,c as s,a as p,o as t}from"./app-C8DxhDIZ.js";const e={};function o(c,n){return t(),s("div",null,n[0]||(n[0]=[p(`<h1 id="易错点" tabindex="-1"><a class="header-anchor" href="#易错点"><span>易错点</span></a></h1><h2 id="关于new和make" tabindex="-1"><a class="header-anchor" href="#关于new和make"><span>关于new和make</span></a></h2><h3 id="new和make" tabindex="-1"><a class="header-anchor" href="#new和make"><span><em>new</em>和make</span></a></h3><p>我们先来看一个例子：</p><div class="language-go" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> a <span class="token operator">*</span><span class="token builtin">int</span></span>
<span class="line">    <span class="token operator">*</span>a <span class="token operator">=</span> <span class="token number">100</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>a<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> b <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span></span>
<span class="line">    b<span class="token punctuation">[</span><span class="token string">&quot;测试&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">100</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>执行上面的代码会引发panic，为什么呢？ 在Go语言中对于引用类型的变量，我们在使用的时候不仅要声明它，还要为它分配内存空间，否则我们的值就没办法存储。而对于值类型的声明不需要分配内存空间，是因为它们在声明的时候已经默认分配好了内存空间。要分配内存，就引出来今天的<em>new</em>和make。 Go语言中<em>new</em>和make是内建的两个函数，主要用来分配内存</p><h3 id="new" tabindex="-1"><a class="header-anchor" href="#new"><span><em>new</em></span></a></h3><p><em>new</em>是一个内置的函数，它的函数签名如下：</p><div class="language-go" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line">    <span class="token keyword">func</span> <span class="token function">new</span><span class="token punctuation">(</span>Type<span class="token punctuation">)</span> <span class="token operator">*</span>Type</span>
<span class="line"></span></code></pre></div><p>其中，</p><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    1.Type表示类型，new函数只接受一个参数，这个参数是一个类型</span>
<span class="line">    2.*Type表示类型指针，new函数返回一个指向该类型内存地址的指针。</span>
<span class="line"></span></code></pre></div><p><em>new</em>函数不太常用，使用<em>new</em>函数得到的是一个类型的指针，并且该指针对应的值为该类型的零值。举个例子：</p><div class="language-go" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    a <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">    b <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span><span class="token builtin">bool</span><span class="token punctuation">)</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span> <span class="token comment">// *int</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%T\\n&quot;</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token comment">// *bool</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>a<span class="token punctuation">)</span>       <span class="token comment">// 0</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>b<span class="token punctuation">)</span>       <span class="token comment">// false</span></span>
<span class="line"><span class="token punctuation">}</span>    </span>
<span class="line"></span></code></pre></div><p>本节开始的示例代码中<code>var a *int</code>只是声明了一个指针变量a但是没有初始化，指针作为引用类型需要初始化后才会拥有内存空间，才可以给它赋值。应该按照如下方式使用内置的<em>new</em>函数对a进行初始化之后就可以正常对其赋值了：</p><div class="language-go" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> a <span class="token operator">*</span><span class="token builtin">int</span></span>
<span class="line">    a <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token operator">*</span>a <span class="token operator">=</span> <span class="token number">10</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">*</span>a<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="make" tabindex="-1"><a class="header-anchor" href="#make"><span>make</span></a></h3><p>make也是用于内存分配的，区别于<em>new</em>，它只用于slice、map以及chan的内存创建，而且它返回的类型就是这三个类型本身，而不是他们的指针类型，因为这三种类型就是引用类型，所以就没有必要返回他们的指针了。make函数的函数签名如下：</p><div class="language-go" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">make</span><span class="token punctuation">(</span>t Type<span class="token punctuation">,</span> size <span class="token operator">...</span>IntegerType<span class="token punctuation">)</span> Type</span>
<span class="line"></span></code></pre></div><p>make函数是无可替代的，我们在使用slice、map以及channel的时候，都需要使用make进行初始化，然后才可以对它们进行操作。这个我们在上一章中都有说明，关于channel我们会在后续的章节详细说明。</p><p>本节开始的示例中<code>var b map[string]int</code>只是声明变量b是一个map类型的变量，需要像下面的示例代码一样使用make函数进行初始化操作之后，才能对其进行键值对赋值：</p><div class="language-go" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> b <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span></span>
<span class="line">    b <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span></span>
<span class="line">    b<span class="token punctuation">[</span><span class="token string">&quot;测试&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">100</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h2 id="几个例子" tabindex="-1"><a class="header-anchor" href="#几个例子"><span>几个例子</span></a></h2><div class="language-go" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line"> lock sync<span class="token punctuation">.</span>Mutex</span>
<span class="line"> name <span class="token builtin">string</span></span>
<span class="line"> age  <span class="token builtin">int</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"> u <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span>User<span class="token punctuation">)</span></span>
<span class="line"> u<span class="token punctuation">.</span>lock<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"> u<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&quot;张三&quot;</span></span>
<span class="line"> u<span class="token punctuation">.</span>lock<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><h3 id="new与make的区别" tabindex="-1"><a class="header-anchor" href="#new与make的区别"><span><em>new</em>与make的区别</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">    1.二者都是用来做内存分配的。</span>
<span class="line">    2.make只用于slice、map以及channel的初始化，返回的还是这三个引用类型本身；</span>
<span class="line">    3.而new用于类型的内存分配，并且内存对应的值为类型零值，返回的是指向类型的指针。</span>
<span class="line"></span></code></pre></div><h2 id="对于结构体指针和结构体new" tabindex="-1"><a class="header-anchor" href="#对于结构体指针和结构体new"><span>对于结构体指针和结构体new</span></a></h2><div class="language-go" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">type</span> Test <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line"> name <span class="token builtin">string</span></span>
<span class="line"><span class="token punctuation">}</span> </span>
<span class="line"></span>
<span class="line">test1<span class="token operator">:=</span><span class="token function">new</span><span class="token punctuation">(</span>Test<span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// 在Go语言中，对结构体进行&amp;取地址操作时，视为对该类型进行一次 new 的实例化操作,底层仍会调用new函数，此时返回的test也是指针</span></span>
<span class="line">test2 <span class="token operator">:=</span> <span class="token operator">&amp;</span>Test<span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// 所以上面两个的效果是一样的(不过test1不等于test2,因为地址不一样)</span></span>
<span class="line"></span></code></pre></div><h3 id="指针小练习" tabindex="-1"><a class="header-anchor" href="#指针小练习"><span>指针小练习</span></a></h3><ul><li>程序定义一个int变量num的地址并打印</li><li>将num的地址赋给指针ptr，并通过ptr去修改num的值</li></ul><div class="language-go" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> a <span class="token builtin">int</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>a<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">var</span> p <span class="token operator">*</span><span class="token builtin">int</span></span>
<span class="line">    p <span class="token operator">=</span> <span class="token operator">&amp;</span>a</span>
<span class="line">    <span class="token operator">*</span>p <span class="token operator">=</span> <span class="token number">20</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div>`,30)]))}const i=a(e,[["render",o]]),u=JSON.parse('{"path":"/go-tutor/basics/tip.html","title":"易错点","lang":"zh-CN","frontmatter":{"description":"易错点 关于new和make new和make 我们先来看一个例子： 执行上面的代码会引发panic，为什么呢？ 在Go语言中对于引用类型的变量，我们在使用的时候不仅要声明它，还要为它分配内存空间，否则我们的值就没办法存储。而对于值类型的声明不需要分配内存空间，是因为它们在声明的时候已经默认分配好了内存空间。要分配内存，就引出来今天的new和make。...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/basics/tip.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"易错点"}],["meta",{"property":"og:description","content":"易错点 关于new和make new和make 我们先来看一个例子： 执行上面的代码会引发panic，为什么呢？ 在Go语言中对于引用类型的变量，我们在使用的时候不仅要声明它，还要为它分配内存空间，否则我们的值就没办法存储。而对于值类型的声明不需要分配内存空间，是因为它们在声明的时候已经默认分配好了内存空间。要分配内存，就引出来今天的new和make。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-21T02:04:02.000Z"}],["meta",{"property":"article:modified_time","content":"2022-08-21T02:04:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"易错点\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-21T02:04:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"关于new和make","slug":"关于new和make","link":"#关于new和make","children":[{"level":3,"title":"new和make","slug":"new和make","link":"#new和make","children":[]},{"level":3,"title":"new","slug":"new","link":"#new","children":[]},{"level":3,"title":"make","slug":"make","link":"#make","children":[]}]},{"level":2,"title":"几个例子","slug":"几个例子","link":"#几个例子","children":[{"level":3,"title":"new与make的区别","slug":"new与make的区别","link":"#new与make的区别","children":[]}]},{"level":2,"title":"对于结构体指针和结构体new","slug":"对于结构体指针和结构体new","link":"#对于结构体指针和结构体new","children":[{"level":3,"title":"指针小练习","slug":"指针小练习","link":"#指针小练习","children":[]}]}],"git":{"createdTime":1661047442000,"updatedTime":1661047442000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.27,"words":981},"filePathRelative":"go-tutor/basics/tip.md","localizedDate":"2022年8月21日","autoDesc":true}');export{i as comp,u as data};
