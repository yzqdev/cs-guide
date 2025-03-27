import{_ as p,c as e,a as s,b as c,e as a,d as o,r as l,o as i}from"./app-C8DxhDIZ.js";const u={};function k(r,n){const t=l("VPIcon");return i(),e("div",null,[n[2]||(n[2]=s(`<h1 id="java方法引用" tabindex="-1"><a class="header-anchor" href="#java方法引用"><span>java方法引用</span></a></h1><h2 id="一、简介" tabindex="-1"><a class="header-anchor" href="#一、简介"><span>一、简介</span></a></h2><p>方法引用是java8的新特性之一， 可以直接引用已有Java类或对象的方法或构造器。方法引用与<a href="https://www.jianshu.com/p/8d7f98116693" target="_blank" rel="noopener noreferrer">lambda表达式</a>结合使用，可以进一步简化代码。 来看一段简单代码：</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> strList <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        strList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span> s2<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> s1<span class="token punctuation">.</span><span class="token function">compareToIgnoreCase</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>上述程序生成一个Stream流，对流中的字符串进行排序并遍历打印。程序中采用lambda表达式的方式代替匿名类简化了代码，然而代码中两处lambda表达式都仅仅调用的是一个已存在的方法：String.compareToIgnoreCase、System.out.println，这种情况可以用方法引用来简化：</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> strList <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        strList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sorted</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">compareToIgnoreCase</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>对比一下可以看到，上述程序分别采用了<strong>类的任意对象的实例方法引用</strong>和<strong>特定对象的实例方法引用</strong>两种方法引用形式（下一章会讲述），采用方法引用的方式可以简化lambda表达式的写法。</p><h2 id="二、方法引用的具体使用" tabindex="-1"><a class="header-anchor" href="#二、方法引用的具体使用"><span>二、方法引用的具体使用</span></a></h2><p>java8方法引用有四种形式：</p><ul><li>静态方法引用　　　　　　　：　 　ClassName :: staticMethodName</li><li>构造器引用　　　　　　　　：　 　ClassName :: new</li><li>类的任意对象的实例方法引用：　 　ClassName :: instanceMethodName</li><li>特定对象的实例方法引用　　：　 　object :: instanceMethodName</li></ul><p>lambda表达式可用方法引用代替的<strong>场景</strong>可以简要概括为：<strong>lambda表达式的主体仅包含一个表达式，且该表达式仅调用了一个已经存在的方法</strong>。方法引用的<strong>通用特性</strong>：<strong>方法引用所使用方法的入参和返回值与lambda表达式实现的函数式接口的入参和返回值一致</strong>。</p><h2 id="_2-1-静态方法引用" tabindex="-1"><a class="header-anchor" href="#_2-1-静态方法引用"><span>2.1 静态方法引用</span></a></h2>`,12)),c("p",null,[n[0]||(n[0]=a("静态方法引用的语法格式为： **类名")),o(t,{icon:`静态方法名** ，如
System.out`}),n[1]||(n[1]=a("println 等价于lambda表达式 s -> System.out.println(s) ，代码示例："))]),n[3]||(n[3]=s(`<div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">//lambda表达式使用：</span></span>
<span class="line">        <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> <span class="token class-name">Test</span><span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">//静态方法引用：</span></span>
<span class="line">        <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token class-name">Test</span><span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    </span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>静态方法引用适用于lambda表达式主体中仅仅调用了某个类的静态方法的情形</strong>。</p><h2 id="_2-2-构造器引用" tabindex="-1"><a class="header-anchor" href="#_2-2-构造器引用"><span>2.2 构造器引用</span></a></h2><p>&amp;nbsp构造器引用的语法格式为： <strong>类名::new</strong> ，如<code>() -&gt; new ArrayList&lt;String&gt;() 等价于 ArrayList&lt;String&gt;::new</code>，代码示例：</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token class-name">Supplier</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> supplier1<span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">new</span>  <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><p>等价于</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token class-name">Supplier</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> supplier <span class="token operator">=</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span><span class="token operator">::</span><span class="token keyword">new</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><p><strong>构造器引用适用于lambda表达式主体中仅仅调用了某个类的构造函数返回实例的场景</strong>。</p><h2 id="_2-3-类的任意对象的实例方法引用" tabindex="-1"><a class="header-anchor" href="#_2-3-类的任意对象的实例方法引用"><span>2.3 类的任意对象的实例方法引用</span></a></h2><p>&amp;nbsp类的任意对象的实例方法引用的语法格式为： <strong>类名::实例方法名</strong> ， 这种方法引用相对比较复杂，我们来看示例：</p><p>一、示例1</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">  <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>strs<span class="token punctuation">,</span><span class="token punctuation">(</span>s1<span class="token punctuation">,</span>s2<span class="token punctuation">)</span><span class="token operator">-&gt;</span>s1<span class="token punctuation">.</span><span class="token function">compareToIgnoreCase</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><p>等价于</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">  <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>strs<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token operator">::</span><span class="token function">compareToIgnoreCase</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><p>上述示例中，strs为一个String数组，lambda表达式(s1,s2)-&gt;s1.compareToIgnoreCase(s2)实现函数式接口的是Comparator接口, 我们看下jdk8中Comparator接口的源码（截取部分）：</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">  <span class="token annotation punctuation">@FunctionalInterface</span></span>
<span class="line">  <span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Comparator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token class-name">T</span> o1<span class="token punctuation">,</span> <span class="token class-name">T</span> o2<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>而String类的compareToIgnoreCase方法源码为：</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compareToIgnoreCase</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token constant">CASE_INSENSITIVE_ORDER</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> str<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><p>可以发现函数式接口<code>Comparator&lt;String&gt;的compare</code>方法比String类的compareToIgnoreCase方法多了一个String类型的入参。看到这里对类的任意对象的实例方法引用的使用可能似懂非懂，下面我们看一个自己实现一个类的任意对象的实例方法引用的示例（示例2）。</p><p>二、示例2</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    </span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">Integer</span> score<span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setNameAndScore</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Integer</span> score<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>score <span class="token operator">=</span> score<span class="token punctuation">;</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Student &quot;</span><span class="token operator">+</span>  name <span class="token operator">+</span><span class="token string">&quot;&#39;s score is &quot;</span> <span class="token operator">+</span> score<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">/*lambda表达式的用法：</span>
<span class="line">        TestInterface testInterface = (student, name, score) -&gt; student.setNameAndScore(name, score);*/</span></span>
<span class="line">        <span class="token comment">//类的任意对象的实例方法引用的用法:</span></span>
<span class="line">        <span class="token class-name">TestInterface</span> testInterface <span class="token operator">=</span> <span class="token class-name">Student</span><span class="token operator">::</span><span class="token function">setNameAndScore</span><span class="token punctuation">;</span></span>
<span class="line">        testInterface<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;DoubleBin&quot;</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    </span>
<span class="line">    <span class="token annotation punctuation">@FunctionalInterface</span></span>
<span class="line">    <span class="token keyword">interface</span> <span class="token class-name">TestInterface</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 注意：入参比Student类的setNameAndScore方法多1个Student对象，除第一个外其它入参类型一致</span></span>
<span class="line">        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Student</span> d<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Integer</span> score<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看完上述代码，我们可以总结出<strong>类的任意对象的实例方法引用的特性</strong>为：</p><ul><li>1、方法引用的<strong>通用特性</strong>：方法引用所使用方法的入参和返回值与lambda表达式实现的函数式接口的入参和返回值一致；</li><li>2、<strong>lambda表达式的第一个入参为实例方法的调用者，后面的入参与实例方法的入参一致</strong>。</li></ul><h2 id="_2-4-特定对象的实例方法引用" tabindex="-1"><a class="header-anchor" href="#_2-4-特定对象的实例方法引用"><span>2.4 特定对象的实例方法引用</span></a></h2><p>&amp;nbsp特定对象的实例方法引用的语法格式为： <strong>对象::实例方法名</strong> ， 示例代码：</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">Test</span> test <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">// lambda表达式使用：</span></span>
<span class="line">        <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>s <span class="token operator">-&gt;</span> test<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">// 特定对象的实例方法引用：</span></span>
<span class="line">        <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>test<span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    </span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>特定对象的实例方法引用适用于lambda表达式的主体中仅仅调用了某个对象的某个实例方法的场景</strong>。</p><h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结"><span>三、总结</span></a></h2><p>方法引用使用运算符::连接类(或对象)与方法名称(或new)实现在特定场景下lambda表达式的简化表示，使用时要注意方法引用的使用场景及各种方法引用的特性。使用方法引用的好处是能够更进一步简化代码编写，使代码更简洁。 <strong>然而作者认为，方法引用代替lambda表达式对代码的简化程度远远没有lambda表达式代替匿名类的简化程度大， 有时反而增加了代码的理解难度(如2.3节：类的任意对象的实例方法引用)，且使用场景的局限性不利于增加或修改代码，个人认为有时没有必要刻意使用方法引用~</strong></p>`,29))])}const m=p(u,[["render",k]]),v=JSON.parse('{"path":"/java-tutor/java-tips/method-reference.html","title":"java方法引用","lang":"zh-CN","frontmatter":{"description":"java方法引用 一、简介 方法引用是java8的新特性之一， 可以直接引用已有Java类或对象的方法或构造器。方法引用与lambda表达式结合使用，可以进一步简化代码。 来看一段简单代码： 上述程序生成一个Stream流，对流中的字符串进行排序并遍历打印。程序中采用lambda表达式的方式代替匿名类简化了代码，然而代码中两处lambda表达式都仅仅调...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/java-tips/method-reference.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"java方法引用"}],["meta",{"property":"og:description","content":"java方法引用 一、简介 方法引用是java8的新特性之一， 可以直接引用已有Java类或对象的方法或构造器。方法引用与lambda表达式结合使用，可以进一步简化代码。 来看一段简单代码： 上述程序生成一个Stream流，对流中的字符串进行排序并遍历打印。程序中采用lambda表达式的方式代替匿名类简化了代码，然而代码中两处lambda表达式都仅仅调..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-24T12:34:23.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-24T12:34:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"java方法引用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-24T12:34:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"一、简介","slug":"一、简介","link":"#一、简介","children":[]},{"level":2,"title":"二、方法引用的具体使用","slug":"二、方法引用的具体使用","link":"#二、方法引用的具体使用","children":[]},{"level":2,"title":"2.1 静态方法引用","slug":"_2-1-静态方法引用","link":"#_2-1-静态方法引用","children":[]},{"level":2,"title":"2.2 构造器引用","slug":"_2-2-构造器引用","link":"#_2-2-构造器引用","children":[]},{"level":2,"title":"2.3 类的任意对象的实例方法引用","slug":"_2-3-类的任意对象的实例方法引用","link":"#_2-3-类的任意对象的实例方法引用","children":[]},{"level":2,"title":"2.4 特定对象的实例方法引用","slug":"_2-4-特定对象的实例方法引用","link":"#_2-4-特定对象的实例方法引用","children":[]},{"level":2,"title":"三、总结","slug":"三、总结","link":"#三、总结","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1711283663000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":4,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":5.01,"words":1502},"filePathRelative":"java-tutor/java-tips/method-reference.md","localizedDate":"2022年3月21日","autoDesc":true}');export{m as comp,v as data};
