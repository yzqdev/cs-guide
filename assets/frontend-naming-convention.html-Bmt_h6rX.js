import{_ as n,c as a,a as e,o as l}from"./app-B6vXTniy.js";const i={};function t(p,s){return l(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="前端开发规范-命名规范、html规范、css规范、js规范" tabindex="-1"><a class="header-anchor" href="#前端开发规范-命名规范、html规范、css规范、js规范"><span>前端开发规范：命名规范、html规范、css规范、js规范</span></a></h1><p>ps:资料来自网络 一个好的程序员肯定是要能书写可维护的代码，而不是一次性的代码，怎么能让团队当中其他人甚至一段时间时候你再看你某个时候写的代码也能看懂呢，这就需要规范你的代码了。 我是有一点强迫症的人，上周我们后端给我了一个CanUsename的接口（该接口的目的是判断输入的目的地是否是4级目的地），我真的是崩溃的。 我只是觉得这个名字不够语义化，但是让我自己想一个名字我又想不出来，于是我就在想，如果有一套命名规范的话，那么以后起名字就不用发愁了，直接按照规范来就好了~ 于是端午在家就百度了一下~</p><h1 id="命名" tabindex="-1"><a class="header-anchor" href="#命名"><span>命名</span></a></h1><h2 id="驼峰式命名法介绍" tabindex="-1"><a class="header-anchor" href="#驼峰式命名法介绍"><span>驼峰式命名法介绍</span></a></h2><ul><li><p>Pascal Case 大驼峰式命名法：首字母大写。eg：StudentInfo、UserInfo、ProductInfo</p></li><li><p>Camel Case 小驼峰式命名法：首字母小写。eg：studentInfo、userInfo、productInfo</p></li></ul><h2 id="文件资源命名" tabindex="-1"><a class="header-anchor" href="#文件资源命名"><span>文件资源命名</span></a></h2><ul><li><p>文件名不得含有空格</p></li><li><p>文件名建议只使用小写字母，不使用大写字母。( 为了醒目，某些说明文件的文件名，可以使用大写字母，比如README、LICENSE。 )</p></li><li><p>文件名包含多个单词时，单词之间建议使用半角的连词线 ( - ) 分隔。</p></li><li><p>引入资源使用相对路径，不要指定资源所带的具体协议 ( <code>http:</code>,<code>https:</code> ) ，除非这两者协议都不可用。</p></li></ul><p>不推荐：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;script src=&quot;http://cdn.com/foundation.min.js&quot;&gt;&lt;/script&gt;</span>
<span class="line"></span></code></pre></div><p>推荐</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;script src=&quot;//cdn.com/foundation.min.js&quot;&gt;&lt;/script&gt;</span>
<span class="line"></span></code></pre></div><h2 id="变量命名" tabindex="-1"><a class="header-anchor" href="#变量命名"><span>变量命名</span></a></h2><p><strong>命名方式</strong> : 小驼峰式命名方法 <strong>命名规范</strong> : 类型+对象描述的方式，如果没有明确的类型，就可以使前缀为名词</p><table><thead><tr><th style="text-align:left;">类型</th><th style="text-align:left;">小写字母</th></tr></thead><tbody><tr><td style="text-align:left;">array</td><td style="text-align:left;">a</td></tr><tr><td style="text-align:left;">boolean</td><td style="text-align:left;">b</td></tr><tr><td style="text-align:left;">function</td><td style="text-align:left;">fn</td></tr><tr><td style="text-align:left;">int</td><td style="text-align:left;">i</td></tr><tr><td style="text-align:left;">object</td><td style="text-align:left;">o</td></tr><tr><td style="text-align:left;">regular</td><td style="text-align:left;">r</td></tr><tr><td style="text-align:left;">string</td><td style="text-align:left;">s</td></tr></tbody></table><p>推荐</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let tableTitle = &quot;LoginTable&quot;</span>
<span class="line"></span></code></pre></div><p>不推荐</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let getTitle = &quot;LoginTable&quot;</span>
<span class="line"></span></code></pre></div><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数"><span>函数</span></a></h2><p><strong>命名方式</strong> : 小驼峰方式 ( 构造函数使用大驼峰命名法 ) <strong>命名规则</strong> : 前缀为动词</p><table><thead><tr><th>动词</th><th>含义</th><th>返回值</th></tr></thead><tbody><tr><td>can</td><td>判断是否可执行某个动作 ( 权限 )</td><td>函数返回一个布尔值。true：可执行；false：不可执行</td></tr><tr><td>has</td><td>判断是否含有某个值</td><td>函数返回一个布尔值。true：含有此值；false：不含有此值</td></tr><tr><td>is</td><td>判断是否为某个值</td><td>函数返回一个布尔值。true：为某个值；false：不为某个值</td></tr><tr><td>get</td><td>获取某个值</td><td>函数返回一个非布尔值</td></tr><tr><td>set</td><td>设置某个值</td><td>无返回值、返回是否设置成功或者返回链式对象</td></tr></tbody></table><p>推荐：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">//是否可阅读</span>
<span class="line">function canRead(){</span>
<span class="line">    return true;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">//获取姓名</span>
<span class="line">function getName{</span>
<span class="line">    return this.name</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="常量" tabindex="-1"><a class="header-anchor" href="#常量"><span>常量</span></a></h2><p><strong>命名方法</strong> : 全部大写 <strong>命名规范</strong> : 使用大写字母和下划线来组合命名，下划线用以分割单词。 推荐：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"> let MAX_COUNT = 10;</span>
<span class="line"> let URL = &#39;http://www.baidu.com&#39;;</span>
<span class="line"></span></code></pre></div><h2 id="类的成员" tabindex="-1"><a class="header-anchor" href="#类的成员"><span>类的成员</span></a></h2><ul><li>公共属性和方法 : 同变量命名方式</li><li>私有属性和方法 : 前缀为下划线(_)后面跟公共属性和方法一样的命名方式</li></ul><p>推荐(将<code>name</code>换成<code>this</code>是不是更熟悉了呢)</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">function Student(name) {</span>
<span class="line">    let _name = name; // 私有成员</span>
<span class="line"></span>
<span class="line">    // 公共方法</span>
<span class="line">    this.getName = function () {</span>
<span class="line">        return _name;</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    // 公共方式</span>
<span class="line">    this.setName = function (value) {</span>
<span class="line">        _name = value;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line">let st = new Student(&#39;tom&#39;);</span>
<span class="line">st.setName(&#39;jerry&#39;);</span>
<span class="line">console.log(st.getName()); // =&gt; jerry：输出_name私有变量的值</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="注释规范" tabindex="-1"><a class="header-anchor" href="#注释规范"><span>注释规范</span></a></h2><h3 id="单行注释" tabindex="-1"><a class="header-anchor" href="#单行注释"><span>单行注释 ( // )</span></a></h3><ul><li>单独一行：//(双斜线)与注释文字之间保留一个空格</li><li>在代码后面添加注释：//(双斜线)与代码之间保留一个空格，并且//(双斜线)与注释文字之间保留一个空格。</li><li>注释代码：//(双斜线)与代码之间保留一个空格。</li></ul><p>推荐 :</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">// 调用了一个函数；1)单独在一行</span>
<span class="line">setTitle();</span>
<span class="line"></span>
<span class="line">let maxCount = 10; // 设置最大量；2)在代码后面注释</span>
<span class="line"></span>
<span class="line">// setName(); // 3)注释代码</span>
<span class="line"></span></code></pre></div><h2 id="多行注释-注释说明" tabindex="-1"><a class="header-anchor" href="#多行注释-注释说明"><span>多行注释 ( /<em>注释说明</em>/ )</span></a></h2><ul><li><p>若开始(/<code>*</code>和结束(<code>*</code>/)都在一行，推荐采用单行注释</p></li><li><p>若至少三行注释时，第一行为/</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">*</span>
<span class="line"></span></code></pre></div><p>，最后行为</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">*</span>
<span class="line"></span></code></pre></div><p>/，其他行以</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">*</span>
<span class="line"></span></code></pre></div><p>开始，并且注释文字与</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">*</span>
<span class="line"></span></code></pre></div><p>保留一个空格。</p><p>推荐 :</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/*</span>
<span class="line">* 代码执行到这里后会调用setTitle()函数</span>
<span class="line">* setTitle()：设置title的值</span>
<span class="line">*/</span>
<span class="line">setTitle();</span>
<span class="line"></span></code></pre></div></li></ul><h2 id="函数-方法-注释" tabindex="-1"><a class="header-anchor" href="#函数-方法-注释"><span>函数 ( 方法 ) 注释</span></a></h2><p>函数(方法)注释也是多行注释的一种，但是包含了特殊的注释要求，参照 <a href="https://link.juejin.im/?target=http%3A%2F%2Fbaike.baidu.com%2Fitem%2Fjavadoc" target="_blank" rel="noopener noreferrer">javadoc(百度百科)</a> 语法：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/** </span>
<span class="line">* 函数说明 </span>
<span class="line">* @关键字 </span>
<span class="line">*/</span>
<span class="line"></span></code></pre></div><p>常用注释关键字</p><table><thead><tr><th>注释名</th><th>语法</th><th>含义</th><th>示例</th></tr></thead><tbody><tr><td>@param</td><td>@param 参数名 {参数类型} 描述信息</td><td>描述参数的信息</td><td>@param name {String} 传入名称</td></tr><tr><td>@return</td><td>@return {返回类型} 描述信息</td><td>描述返回值的信息</td><td>@return {Boolean} true:可执行;false:不可执行</td></tr><tr><td>@author</td><td>@author 作者信息 [附属信息：如邮箱、日期]</td><td>描述此函数作者的信息</td><td>@author 张三 2015/07/21</td></tr><tr><td>@version</td><td>@version XX.XX.XX</td><td>描述此函数的版本号</td><td>@version 1.0.3</td></tr><tr><td>@example</td><td>@example 示例代码</td><td>@example setTitle(&#39;测试&#39;)</td><td>如下</td></tr></tbody></table><p>推荐 :</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/**</span>
<span class="line"> - 合并Grid的行</span>
<span class="line"> - @param grid {Ext.Grid.Panel} 需要合并的Grid</span>
<span class="line"> - @param cols {Array} 需要合并列的Index(序号)数组；从0开始计数，序号也包含。</span>
<span class="line"> - @param isAllSome {Boolean} ：是否2个tr的cols必须完成一样才能进行合并。true：完成一样；false(默认)：不完全一样</span>
<span class="line"> - @return void</span>
<span class="line"> - @author polk6 2015/07/21 </span>
<span class="line"> - @example</span>
<span class="line"> - _________________                             _________________</span>
<span class="line"> - |  年龄 |  姓名 |                             |  年龄 |  姓名 |</span>
<span class="line"> - -----------------      mergeCells(grid,[0])   -----------------</span>
<span class="line"> - |  18   |  张三 |              =&gt;             |       |  张三 |</span>
<span class="line"> - -----------------                             -  18   ---------</span>
<span class="line"> - |  18   |  王五 |                             |       |  王五 |</span>
<span class="line"> - -----------------                             -----------------</span>
<span class="line">*/</span>
<span class="line">function mergeCells(grid, cols, isAllSome) {</span>
<span class="line">    // Do Something</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="html规范" tabindex="-1"><a class="header-anchor" href="#html规范"><span>HTML规范</span></a></h1><h2 id="文档规范" tabindex="-1"><a class="header-anchor" href="#文档规范"><span>文档规范</span></a></h2><p>使用 HTML5 的文档声明类型 : <code>&lt;!DOCTYPE html&gt;</code></p><ul><li>DOCTYPE标签是一种标准通用标记语言的文档类型声明，它的目的是要告诉标准通用标记语言解析器，它应该使用什么样的文档类型定义（DTD）来解析文档。</li><li>使用文档声明类型的作用是为了防止开启浏览器的怪异模式。</li><li>没有DOCTYPE文档类型声明会开启浏览器的怪异模式，浏览器会按照自己的解析方式渲染页面，在不同的浏览器下面会有不同的样式。</li><li>如果你的页面添加了&lt;!DOCTYP&gt;那么，那么就等同于开启了标准模式。浏览器会按照W3C标准解析渲染页面。</li></ul><h2 id="脚本加载" tabindex="-1"><a class="header-anchor" href="#脚本加载"><span>脚本加载</span></a></h2><p>说到js和css的位置，大家应该都知道js放在下面，css放在上面。 但是，如果你的项目只需要兼容ie10+或者只是在移动端访问，那么可以使用HTML5的新属性<code>async</code>，将脚本文件放在<code>&lt;head&gt;</code>内 <strong>兼容老旧浏览器(IE9-)时</strong>： 脚本引用写在 body 结束标签之前，并带上 async 属性。这虽然在老旧浏览器中不会异步加载脚本，但它只阻塞了 body 结束标签之前的 DOM 解析，这就大大降低了其阻塞影响。 <strong>而在现代浏览器中</strong>： 脚本将在 DOM 解析器发现 body 尾部的 script 标签才进行加载，此时加载属于异步加载，不会阻塞 CSSOM（但其执行仍发生在 CSSOM 之后）。 综上所述， 所有浏览器中推荐:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;html&gt;</span>
<span class="line">  &lt;head&gt;</span>
<span class="line">    &lt;link rel=&quot;stylesheet&quot; href=&quot;main.css&quot;&gt;</span>
<span class="line">  &lt;/head&gt;</span>
<span class="line">  &lt;body&gt;</span>
<span class="line">    &lt;!-- body goes here --&gt;</span>
<span class="line"></span>
<span class="line">    &lt;script src=&quot;main.js&quot; async&gt;&lt;/script&gt;</span>
<span class="line">  &lt;/body&gt;</span>
<span class="line">&lt;/html&gt;</span>
<span class="line"></span></code></pre></div><p>只兼容现代浏览器推荐:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;html&gt;</span>
<span class="line">  &lt;head&gt;</span>
<span class="line">    &lt;link rel=&quot;stylesheet&quot; href=&quot;main.css&quot;&gt;</span>
<span class="line">    &lt;script src=&quot;main.js&quot; async&gt;&lt;/script&gt;</span>
<span class="line">  &lt;/head&gt;</span>
<span class="line">  &lt;body&gt;</span>
<span class="line">    &lt;!-- body goes here --&gt;</span>
<span class="line">  &lt;/body&gt;</span>
<span class="line">&lt;/html&gt;</span>
<span class="line"></span></code></pre></div><h2 id="语义化" tabindex="-1"><a class="header-anchor" href="#语义化"><span>语义化</span></a></h2><p>我们一直都在说语义化编程，语义化编程，但是在代码中很少有人完全使用正确的元素。使用语义化标签也是有理由SEO的。</p><blockquote><p>语义化是指：根据元素其被创造出来时的初始意义来使用它。 意思就是用正确的标签干正确的事，而不是只有<code>div</code>和<code>span</code>。</p></blockquote><p>不推荐：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;b&gt;My page title&lt;/b&gt;</span>
<span class="line">&lt;div class=&quot;top-navigation&quot;&gt;</span>
<span class="line">  &lt;div class=&quot;nav-item&quot;&gt;&lt;a href=&quot;#home&quot;&gt;Home&lt;/a&gt;&lt;/div&gt;</span>
<span class="line">  &lt;div class=&quot;nav-item&quot;&gt;&lt;a href=&quot;#news&quot;&gt;News&lt;/a&gt;&lt;/div&gt;</span>
<span class="line">  &lt;div class=&quot;nav-item&quot;&gt;&lt;a href=&quot;#about&quot;&gt;About&lt;/a&gt;&lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line"></span>
<span class="line">&lt;div class=&quot;news-page&quot;&gt;</span>
<span class="line">  &lt;div class=&quot;page-section news&quot;&gt;</span>
<span class="line">    &lt;div class=&quot;title&quot;&gt;All news articles&lt;/div&gt;</span>
<span class="line">    &lt;div class=&quot;news-article&quot;&gt;</span>
<span class="line">      &lt;h2&gt;Bad article&lt;/h2&gt;</span>
<span class="line">      &lt;div class=&quot;intro&quot;&gt;Introduction sub-title&lt;/div&gt;</span>
<span class="line">      &lt;div class=&quot;content&quot;&gt;This is a very bad example for HTML semantics&lt;/div&gt;</span>
<span class="line">      &lt;div class=&quot;article-side-notes&quot;&gt;I think I&#39;m more on the side and should not receive the main credits&lt;/div&gt;</span>
<span class="line">      &lt;div class=&quot;article-foot-notes&quot;&gt;</span>
<span class="line">        This article was created by David &lt;div class=&quot;time&quot;&gt;2014-01-01 00:00&lt;/div&gt;</span>
<span class="line">      &lt;/div&gt;</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line"></span>
<span class="line">    &lt;div class=&quot;section-footer&quot;&gt;</span>
<span class="line">      Related sections: Events, Public holidays</span>
<span class="line">    &lt;/div&gt;</span>
<span class="line">  &lt;/div&gt;</span>
<span class="line">&lt;/div&gt;</span>
<span class="line"></span>
<span class="line">&lt;div class=&quot;page-footer&quot;&gt;</span>
<span class="line">  Copyright 2014</span>
<span class="line">&lt;/div&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>推荐</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">html 代码:</span>
<span class="line">&lt;!-- The page header should go into a header element --&gt;</span>
<span class="line">&lt;header&gt;</span>
<span class="line">  &lt;!-- As this title belongs to the page structure it&#39;s a heading and h1 should be used --&gt;</span>
<span class="line">  &lt;h1&gt;My page title&lt;/h1&gt;</span>
<span class="line">&lt;/header&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- All navigation should go into a nav element --&gt;</span>
<span class="line">&lt;nav class=&quot;top-navigation&quot;&gt;</span>
<span class="line">  &lt;!-- A listing of elements should always go to UL (OL for ordered listings) --&gt;</span>
<span class="line">  &lt;ul&gt;</span>
<span class="line">    &lt;li class=&quot;nav-item&quot;&gt;&lt;a href=&quot;#home&quot;&gt;Home&lt;/a&gt;&lt;/li&gt;</span>
<span class="line">    &lt;li class=&quot;nav-item&quot;&gt;&lt;a href=&quot;#news&quot;&gt;News&lt;/a&gt;&lt;/li&gt;</span>
<span class="line">    &lt;li class=&quot;nav-item&quot;&gt;&lt;a href=&quot;#about&quot;&gt;About&lt;/a&gt;&lt;/li&gt;</span>
<span class="line">  &lt;/ul&gt;</span>
<span class="line">&lt;/nav&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- The main part of the page should go into a main element (also use role=&quot;main&quot; for accessibility) --&gt;</span>
<span class="line">&lt;main class=&quot;news-page&quot; role=&quot;main&quot;&gt;</span>
<span class="line">  &lt;!-- A section of a page should go into a section element. Divide a page into sections with semantic elements. --&gt;</span>
<span class="line">  &lt;section class=&quot;page-section news&quot;&gt;</span>
<span class="line">    &lt;!-- A section header should go into a section element --&gt;</span>
<span class="line">    &lt;header&gt;</span>
<span class="line">      &lt;!-- As a page section belongs to the page structure heading elements should be used (in this case h2) --&gt;</span>
<span class="line">      &lt;h2 class=&quot;title&quot;&gt;All news articles&lt;/h2&gt;</span>
<span class="line">    &lt;/header&gt;</span>
<span class="line"></span>
<span class="line">    &lt;!-- If a section / module can be seen as an article (news article, blog entry, products teaser, any other</span>
<span class="line">     re-usable module / section that can occur multiple times on a page) a article element should be used --&gt;</span>
<span class="line">    &lt;article class=&quot;news-article&quot;&gt;</span>
<span class="line">      &lt;!-- An article can contain a header that contains the summary / introduction information of the article --&gt;</span>
<span class="line">      &lt;header&gt;</span>
<span class="line">        &lt;!-- As a article title does not belong to the overall page structure there should not be any heading tag! --&gt;</span>
<span class="line">        &lt;div class=&quot;article-title&quot;&gt;Good article&lt;/div&gt;</span>
<span class="line">        &lt;!-- Small can optionally be used to reduce importance --&gt;</span>
<span class="line">        &lt;small class=&quot;intro&quot;&gt;Introduction sub-title&lt;/small&gt;</span>
<span class="line">      &lt;/header&gt;</span>
<span class="line"></span>
<span class="line">      &lt;!-- For the main content in a section or article there is no semantic element --&gt;</span>
<span class="line">      &lt;div class=&quot;content&quot;&gt;</span>
<span class="line">        &lt;p&gt;This is a good example for HTML semantics&lt;/p&gt;</span>
<span class="line">      &lt;/div&gt;</span>
<span class="line">      &lt;!-- For content that is represented as side note or less important information in a given context use aside --&gt;</span>
<span class="line">      &lt;aside class=&quot;article-side-notes&quot;&gt;</span>
<span class="line">        &lt;p&gt;I think I&#39;m more on the side and should not receive the main credits&lt;/p&gt;</span>
<span class="line">      &lt;/aside&gt;</span>
<span class="line">      &lt;!-- Articles can also contain footers. If you have footnotes for an article place them into a footer element --&gt;</span>
<span class="line">      &lt;footer class=&quot;article-foot-notes&quot;&gt;</span>
<span class="line">        &lt;!-- The time element can be used to annotate a timestamp. Use the datetime attribute to specify ISO time</span>
<span class="line">         while the actual text in the time element can also be more human readable / relative --&gt;</span>
<span class="line">        &lt;p&gt;This article was created by David &lt;time datetime=&quot;2014-01-01 00:00&quot; class=&quot;time&quot;&gt;1 month ago&lt;/time&gt;&lt;/p&gt;</span>
<span class="line">      &lt;/footer&gt;</span>
<span class="line">    &lt;/article&gt;</span>
<span class="line"></span>
<span class="line">    &lt;!-- In a section, footnotes or similar information can also go into a footer element --&gt;</span>
<span class="line">    &lt;footer class=&quot;section-footer&quot;&gt;</span>
<span class="line">      &lt;p&gt;Related sections: Events, Public holidays&lt;/p&gt;</span>
<span class="line">    &lt;/footer&gt;</span>
<span class="line">  &lt;/section&gt;</span>
<span class="line">&lt;/main&gt;</span>
<span class="line"></span>
<span class="line">&lt;!-- Your page footer should go into a global footer element --&gt;</span>
<span class="line">&lt;footer class=&quot;page-footer&quot;&gt;</span>
<span class="line">  Copyright 2014</span>
<span class="line">&lt;/footer&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="alt标签不为空" tabindex="-1"><a class="header-anchor" href="#alt标签不为空"><span>alt标签不为空</span></a></h2><p><code>&lt;img&gt;</code>标签的 alt 属性指定了替代文本，用于在图像无法显示或者用户禁用图像显示时，代替图像显示在浏览器中的内容。 假设由于下列原因用户无法查看图像，alt 属性可以为图像提供替代的信息：</p><ul><li>网速太慢</li><li>src 属性中的错误</li><li>浏览器禁用图像</li><li>用户使用的是屏幕阅读器</li></ul><p>从SEO角度考虑，浏览器的爬虫爬不到图片的内容，所以我们要有文字告诉爬虫图片的内容</p><h2 id="结构、表现、行为三者分离" tabindex="-1"><a class="header-anchor" href="#结构、表现、行为三者分离"><span>结构、表现、行为三者分离</span></a></h2><p>尽量在文档和模板中只包含结构性的 HTML；而将所有表现代码，移入样式表中；将所有动作行为，移入脚本之中。 在此之外，为使得它们之间的联系尽可能的小，在文档和模板中也尽量少地引入样式和脚本文件。 建议：</p><ul><li>不使用超过一到两张样式表</li><li>不使用超过一到两个脚本（学会用合并脚本）</li><li>不使用行内样式（<code>&lt;style&gt;.no-good {}&lt;/style&gt;</code>）</li><li>不在元素上使用 style 属性（<code>&lt;hr style=&quot;border-top: 5px solid black&quot;&gt;</code>）</li><li>不使用行内脚本（<code>&lt;script&gt;alert(&#39;no good&#39;)&lt;/script&gt;</code>）</li><li>不使用表象元素（<code>i.e. &lt;b&gt;, &lt;u&gt;, &lt;center&gt;, &lt;font&gt;, &lt;b&gt;</code>）</li><li>不使用表象 class 名（<code>i.e. red, left, center</code>）</li></ul><h2 id="html只关注内容" tabindex="-1"><a class="header-anchor" href="#html只关注内容"><span>HTML只关注内容</span></a></h2><ul><li>HTML只显示展示内容信息</li><li>不要引入一些特定的 HTML 结构来解决一些视觉设计问题</li><li>不要将<code>img</code>元素当做专门用来做视觉设计的元素</li><li>样式上的问题应该使用css解决</li></ul><p>不推荐：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">&lt;!-- We should not introduce an additional element just to solve a design problem  --&gt;</span>
<span class="line">&lt;span class=&quot;text-box&quot;&gt;</span>
<span class="line">  &lt;span class=&quot;square&quot;&gt;&lt;/span&gt;</span>
<span class="line">  See the square next to me?</span>
<span class="line">&lt;/span&gt;</span>
<span class="line">css 代码:</span>
<span class="line">.text-box &gt; .square {</span>
<span class="line">  display: inline-block;</span>
<span class="line">  width: 1rem;</span>
<span class="line">  height: 1rem;</span>
<span class="line">  background-color: red;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>推荐</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">html 代码:</span>
<span class="line">&lt;!-- That&#39;s clean markup! --&gt;</span>
<span class="line">&lt;span class=&quot;text-box&quot;&gt;</span>
<span class="line">  See the square next to me?</span>
<span class="line">&lt;/span&gt;</span>
<span class="line">css 代码:</span>
<span class="line">/* We use a :before pseudo element to solve the design problem of placing a colored square in front of the text content */</span>
<span class="line">.text-box:before {</span>
<span class="line">  content: &quot;&quot;;</span>
<span class="line">  display: inline-block;</span>
<span class="line">  width: 1rem;</span>
<span class="line">  height: 1rem;</span>
<span class="line">  background-color: red;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p><strong>图片和 SVG 图形能被引入到 HTML 中的唯一理由是它们呈现出了与内容相关的一些信息。</strong></p><p>不推荐</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">html 代码:</span>
<span class="line">&lt;!-- Content images should never be used for design elements!  --&gt;</span>
<span class="line">&lt;span class=&quot;text-box&quot;&gt;</span>
<span class="line">  &lt;img src=&quot;square.svg&quot; alt=&quot;Square&quot; /&gt;</span>
<span class="line">  See the square next to me?</span>
<span class="line">&lt;/span&gt;</span>
<span class="line"></span></code></pre></div><p>推荐</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">html 代码:</span>
<span class="line">&lt;!-- That&#39;s clean markup! --&gt;</span>
<span class="line">&lt;span class=&quot;text-box&quot;&gt;</span>
<span class="line">  See the square next to me?</span>
<span class="line">&lt;/span&gt;</span>
<span class="line">css 代码:</span>
<span class="line">/* We use a :before pseudo element with a background image to solve the problem */</span>
<span class="line">.text-box:before {</span>
<span class="line">  content: &quot;&quot;;</span>
<span class="line">  display: inline-block;</span>
<span class="line">  width: 1rem;</span>
<span class="line">  height: 1rem;</span>
<span class="line">  background: url(square.svg) no-repeat;</span>
<span class="line">  background-size: 100%;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="js规范" tabindex="-1"><a class="header-anchor" href="#js规范"><span>js规范</span></a></h1><h2 id="避免全局命名空间污染" tabindex="-1"><a class="header-anchor" href="#避免全局命名空间污染"><span>避免全局命名空间污染</span></a></h2><p>防止全局命名空间被污染，我们通常的做法是将代码包裹成一个 IIFE(Immediately-Invoked Function Expression)，创建独立隔绝的定义域。也使得内存在执行完后立即释放。</p><p>IIFE 还可确保你的代码不会轻易被其它全局命名空间里的代码所修改（i.e. 第三方库，window 引用，被覆盖的未定义的关键字等等）。 不推荐:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let x = 10,</span>
<span class="line">    y = 100;</span>
<span class="line"></span>
<span class="line">// Declaring variables in the global scope is resulting in global scope pollution. All variables declared like this</span>
<span class="line">// will be stored in the window object. This is very unclean and needs to be avoided.</span>
<span class="line">console.log(window.x + &#39; &#39; + window.y);</span>
<span class="line"></span></code></pre></div><p>推荐</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">// We declare a IIFE and pass parameters into the function that we will use from the global space</span>
<span class="line">(function(log, w, undefined){</span>
<span class="line">  &#39;use strict&#39;;</span>
<span class="line"></span>
<span class="line">  let x = 10,</span>
<span class="line">      y = 100;</span>
<span class="line"></span>
<span class="line">  // Will output &#39;true true&#39;</span>
<span class="line">  log((w.x === undefined) + &#39; &#39; + (w.y === undefined));</span>
<span class="line"></span>
<span class="line">}(window.console.log, window));</span>
<span class="line"></span></code></pre></div><p>推荐的IIFE写法:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">(function(){</span>
<span class="line">  &#39;use strict&#39;;</span>
<span class="line"></span>
<span class="line">  // Code goes here</span>
<span class="line"></span>
<span class="line">}());</span>
<span class="line"></span></code></pre></div><p>如果你想引用全局变量或者是外层 IIFE 的变量，可以通过下列方式传参：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">(function($, w, d){</span>
<span class="line">  &#39;use strict&#39;;</span>
<span class="line"></span>
<span class="line">  $(function() {</span>
<span class="line">    w.alert(d.querySelectorAll(&#39;div&#39;).length);</span>
<span class="line">  });</span>
<span class="line">}(jQuery, window, document));</span>
<span class="line"></span></code></pre></div><h2 id="严格模式" tabindex="-1"><a class="header-anchor" href="#严格模式"><span>严格模式</span></a></h2><p>ECMAScript 5 严格模式可在整个脚本或独个方法内被激活。它对应不同的 javascript 语境会做更加严格的错误检查。严格模式也确保了 javascript 代码更加的健壮，运行的也更加快速。</p><p>严格模式会阻止使用在未来很可能被引入的预留关键字。</p><p>你应该在你的脚本中启用严格模式，最好是在独立的 IIFE 中应用它。避免在你的脚本第一行使用它而导致你的所有脚本都启动了严格模式，这有可能会引发一些第三方类库的问题。</p><h2 id="变量声明" tabindex="-1"><a class="header-anchor" href="#变量声明"><span>变量声明</span></a></h2><p>总是使用 let 来声明变量。如不指定 var，变量将被隐式地声明为全局变量，例如</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">let a = b = 0; //b会被隐式的创建为全局变量</span>
<span class="line"></span></code></pre></div><p>所以，请总是使用 let 来声明变量，并且使用单var模式（将所有的变量在函数最前面只使用一个var定义）。例如：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">(function (){</span>
<span class="line">  &#39;use strict&#39;</span>
<span class="line">  let a = 0,</span>
<span class="line">      b = 0,</span>
<span class="line">      c = 0,</span>
<span class="line">      i,</span>
<span class="line">      j,</span>
<span class="line">      myObject();</span>
<span class="line">}())</span>
<span class="line"></span></code></pre></div><p>采用严格模式带来的好处是，当你手误输入错误的变量名时，它可以通过报错信息来帮助你定位错误出处。</p><h2 id="js声明提前" tabindex="-1"><a class="header-anchor" href="#js声明提前"><span>js声明提前</span></a></h2><p>javascript会自动将函数作用域内的变量和方法的定义提前（只是提前声明，赋值还是在原处） 例如：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">(function(log){</span>
<span class="line">  &#39;use strict&#39;;</span>
<span class="line"></span>
<span class="line">  let a = 10;</span>
<span class="line"></span>
<span class="line">  for(let i = 0; i &lt; a; i++) {</span>
<span class="line">    let b = i * i;</span>
<span class="line">    log(b);</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  if(a === 10) {</span>
<span class="line">    let f = function() {</span>
<span class="line">      log(a);</span>
<span class="line">    };</span>
<span class="line">    f();</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  function x() {</span>
<span class="line">    log(&#39;Mr. X!&#39;);</span>
<span class="line">  }</span>
<span class="line">  x();</span>
<span class="line"></span>
<span class="line">}(window.console.log));</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提升后的js</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">(function(log){</span>
<span class="line">  &#39;use strict&#39;;</span>
<span class="line">  // All variables used in the closure will be hoisted to the top of the function</span>
<span class="line">  let a,</span>
<span class="line">      i,</span>
<span class="line">      b,</span>
<span class="line">      f;</span>
<span class="line">  // All functions in the closure will be hoisted to the top</span>
<span class="line">  function x() {</span>
<span class="line">    log(&#39;Mr. X!&#39;);</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  a = 10;</span>
<span class="line"></span>
<span class="line">  for(i = 0; i &lt; a; i++) {</span>
<span class="line">    b = i * i;</span>
<span class="line">    log(b);</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  if(a === 10) {</span>
<span class="line">    // Function assignments will only result in hoisted variables but the function body will not be hoisted</span>
<span class="line">    // Only by using a real function declaration the whole function will be hoisted with its body</span>
<span class="line">    f = function() {</span>
<span class="line">      log(a);</span>
<span class="line">    };</span>
<span class="line">    f();</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  x();</span>
<span class="line"></span>
<span class="line">}(window.console.log));</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用严格等" tabindex="-1"><a class="header-anchor" href="#使用严格等"><span>使用严格等</span></a></h2><p>总是使用 <code>===</code> 精确的比较操作符，避免在判断的过程中，由 JavaScript 的强制类型转换所造成的困扰。例如：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">(function(log){</span>
<span class="line">  &#39;use strict&#39;;</span>
<span class="line"></span>
<span class="line">  log(&#39;0&#39; == 0); // true</span>
<span class="line">  log(&#39;&#39; == false); // true</span>
<span class="line">  log(&#39;1&#39; == true); // true</span>
<span class="line">  log(null == undefined); // true</span>
<span class="line"></span>
<span class="line">  let x = {</span>
<span class="line">    valueOf: function() {</span>
<span class="line">      return &#39;X&#39;;</span>
<span class="line">    }</span>
<span class="line">  };</span>
<span class="line"></span>
<span class="line">  log(x == &#39;X&#39;);</span>
<span class="line"></span>
<span class="line">}(window.console.log));</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="等同-和严格等-的区别" tabindex="-1"><a class="header-anchor" href="#等同-和严格等-的区别"><span>等同== 和严格等===的区别</span></a></h3><ul><li>==， 两边值类型不同的时候，要先进行类型转换，再比较。</li><li>===，不做类型转换，类型不同的一定不等。</li></ul><p>==等同操作符</p><ul><li>如果两个值具有相同类型，会进行=<mark>比较，返回</mark>=的比较值</li><li>如果两个值不具有相同类型，也有可能返回true</li><li>如果一个值是null另一个值是undefined，返回true</li><li>如果一个值是string另个是number，会把string转换成number再进行比较</li><li>如果一个值是true，会把它转成1再比较，false会转成0</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">console.log( false == null )      // false</span>
<span class="line">console.log( false == undefined ) // false</span>
<span class="line">console.log( false == 0 )         // true</span>
<span class="line">console.log( false == &#39;&#39; )        // true</span>
<span class="line">console.log( false == NaN )       // false</span>
<span class="line"></span>
<span class="line">console.log( null == undefined ) // true</span>
<span class="line">console.log( null == 0 )         // false</span>
<span class="line">console.log( null == &#39;&#39; )        // false</span>
<span class="line">console.log( null == NaN )       // false</span>
<span class="line"></span>
<span class="line">console.log( undefined == 0)   // false</span>
<span class="line">console.log( undefined == &#39;&#39;)  // false</span>
<span class="line">console.log( undefined == NaN) // false</span>
<span class="line"></span>
<span class="line">console.log( 0 == &#39;&#39; )  // true</span>
<span class="line">console.log( 0 == NaN ) // false</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总结一下==</p><ul><li>false 除了和自身比较为 true 外，和 0，&quot;&quot; 比较也为 true</li><li>null 只和 undefined 比较时为 true， 反过来 undefined 也仅和 null 比较为 true，没有第二个</li><li>0 除了和 false 比较为 true，还有空字符串 &#39;&#39;&quot; 和空数组 []</li><li>空字符串 &#39;&#39; 除了和 false 比较为 true，还有一个数字 0</li></ul><blockquote><p>==, &gt;, &lt;, +, -, ... 这些操作符所造成的隐式类型转换都是无副作用的，它不会改变变量本身保存的值。，但是，如果你覆写某个对象的 <code>valueOf/toString</code>的话，==就会产生副作用.</p></blockquote><p>例如：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Array.prototype.valueOf = function() {</span>
<span class="line">  this[0]++;</span>
<span class="line">  return this;</span>
<span class="line">}</span>
<span class="line">let x = [1, 2, 3];</span>
<span class="line">x == 0;</span>
<span class="line">console.log(x);   // [2, 2, 3]</span>
<span class="line"></span></code></pre></div><p>===操作符：</p><ul><li>要是两个值类型不同，返回false</li><li>要是两个值都是number类型，并且数值相同，返回true</li><li>要是两个值都是stirng，并且两个值的String内容相同，返回true</li><li>要是两个值都是true或者都是false，返回true</li><li>要是两个值都是指向相同的Object，Arraya或者function，返回true</li><li>要是两个值都是null或者都是undefined，返回true</li></ul><h2 id="真假判断" tabindex="-1"><a class="header-anchor" href="#真假判断"><span>真假判断</span></a></h2><ul><li>js中以下内容为假：</li><li>false</li><li>null</li><li>undefined</li><li>0</li><li>&#39;&#39; (空字符串)</li><li>NaN</li></ul><h2 id="设置默认参数" tabindex="-1"><a class="header-anchor" href="#设置默认参数"><span>设置默认参数</span></a></h2><p>辑操作符 || 和 &amp;&amp; 也可被用来返回布尔值。如果操作对象为非布尔对象，那每个表达式将会被自左向右地做真假判断。基于此操作，最终总有一个表达式被返回回来。这在变量赋值时，是可以用来简化你的代码的。例如:如果x不存在且y不存在，x=1；如果x存在y存在，x = y</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">if(!x) {</span>
<span class="line">  if(!y) {</span>
<span class="line">    x = 1;</span>
<span class="line">  } else {</span>
<span class="line">    x = y;</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>等同于：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"> x = x || y || 1;</span>
<span class="line"></span></code></pre></div><p>这一小技巧经常用来给方法设定默认的参数。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">(function(log){</span>
<span class="line">  &#39;use strict&#39;;</span>
<span class="line"></span>
<span class="line">  function multiply(a, b) {</span>
<span class="line">    a = a || 1;</span>
<span class="line">    b = b || 1;</span>
<span class="line"></span>
<span class="line">    log(&#39;Result &#39; + a * b);</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  multiply(); // Result 1</span>
<span class="line">  multiply(10); // Result 10</span>
<span class="line">  multiply(3, NaN); // Result 3</span>
<span class="line">  multiply(9, 5); // Result 45</span>
<span class="line"></span>
<span class="line">}(window.console.log));</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="不使用eval-函数" tabindex="-1"><a class="header-anchor" href="#不使用eval-函数"><span>不使用eval()函数</span></a></h2><p>就如eval的字面意思来说，恶魔，使用eval()函数会带来安全隐患。 eval()函数的作用是返回任意字符串，当作js代码来处理。</p><h2 id="this关键字" tabindex="-1"><a class="header-anchor" href="#this关键字"><span>this关键字</span></a></h2><p>只在对象构造器、方法和在设定的闭包中使用 this 关键字。this 的语义在此有些误导。它时而指向全局对象（大多数时），时而指向调用者的定义域（在 eval 中），时而指向 DOM 树中的某一节点（当用事件处理绑定到 HTML 属性上时），时而指向一个新创建的对象（在构造器中），还时而指向其它的一些对象（如果函数被 call() 和 apply() 执行和调用时）。</p><p>正因为它是如此容易地被搞错，请限制它的使用场景：</p><ul><li>在构造函数中</li><li>在对象的方法中（包括由此创建出的闭包内）</li></ul><h2 id="首选函数式风格" tabindex="-1"><a class="header-anchor" href="#首选函数式风格"><span>首选函数式风格</span></a></h2><p>函数式编程让你可以简化代码并缩减维护成本，因为它容易复用，又适当地解耦和更少的依赖。</p><p>接下来的例子中，在一组数字求和的同一问题上，比较了两种解决方案。第一个例子是经典的程序处理，而第二个例子则是采用了函数式编程和 ECMA Script 5.1 的数组方法。 不推荐</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">(function(log){</span>
<span class="line">  &#39;use strict&#39;;</span>
<span class="line"></span>
<span class="line">  let arr = [10, 3, 7, 9, 100, 20],</span>
<span class="line">      sum = 0,</span>
<span class="line">      i;</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">  for(i = 0; i &lt; arr.length; i++) {</span>
<span class="line">    sum += arr[i];</span>
<span class="line">  }</span>
<span class="line"></span>
<span class="line">  log(&#39;The sum of array &#39; + arr + &#39; is: &#39; + sum)</span>
<span class="line"></span>
<span class="line">}(window.console.log));</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>推荐(函数式编程)：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">(function(log){</span>
<span class="line">  &#39;use strict&#39;;</span>
<span class="line"></span>
<span class="line">  let arr = [10, 3, 7, 9, 100, 20];</span>
<span class="line"></span>
<span class="line">  let sum = arr.reduce(function(prevValue, currentValue) {</span>
<span class="line">    return prevValue + currentValue;</span>
<span class="line">  }, 0);</span>
<span class="line"></span>
<span class="line">  log(&#39;The sum of array &#39; + arr + &#39; is: &#39; + sum);</span>
<span class="line"></span>
<span class="line">}(window.console.log));</span>
<span class="line"></span></code></pre></div><h2 id="修改内建对象的原型链" tabindex="-1"><a class="header-anchor" href="#修改内建对象的原型链"><span>修改内建对象的原型链</span></a></h2><p>修改内建的诸如 <code>Object.prototype</code> 和 <code>Array.prototype</code> 是被严厉禁止的。修改其它的内建对象比如 <code>Function.prototype</code>，虽危害没那么大，但始终还是会导致在开发过程中难以 debug 的问题，应当也要避免。</p><h2 id="三元条件判断-if-的快捷方法" tabindex="-1"><a class="header-anchor" href="#三元条件判断-if-的快捷方法"><span>三元条件判断（if 的快捷方法）</span></a></h2><p>用三元操作符分配或返回语句。在比较简单的情况下使用，避免在复杂的情况下使用。没人愿意用 10 行三元操作符把自己的脑子绕晕。 不推荐：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">if(x === 10) {</span>
<span class="line">  return &#39;valid&#39;;</span>
<span class="line">} else {</span>
<span class="line">  return &#39;invalid&#39;;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>推荐：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">return x === 10 ? &#39;valid&#39; : &#39;invalid&#39;</span>
<span class="line"></span></code></pre></div><h1 id="jshint" tabindex="-1"><a class="header-anchor" href="#jshint"><span>JSHint</span></a></h1><p>在js规范中，有很多规范都是样式上的规范而不是逻辑上的规范，比如尽量使用<code>===</code>而不是<code>==</code>，我们可以使用JSHint或者JSLint，Javascript代码验证工具，这种工具可以检查你的代码并提供相关的代码改进意见。我个人使用的是JSHint，所以就以这个为例</p><h2 id="webstorm内置jshint" tabindex="-1"><a class="header-anchor" href="#webstorm内置jshint"><span>webstorm内置JSHint</span></a></h2><p>对于ws爱好者来说，我没有用过其他的编译器，ws基本上能满足你的所有需求（最新的ws集成了vue）。 在Settings =&gt; language &amp; frameworks =&gt; JavaScript =&gt; Code Quality Tolls =&gt; JSHint</p><p><img src="https://user-gold-cdn.xitu.io/2017/5/30/7e7984a9e668c6d03b9d2fe0ab8f9bd2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" alt="webstorm中的jshint">webstorm中的jshint</p><p>官方文档</p><table><thead><tr><th>名称</th><th>含义</th></tr></thead><tbody><tr><td>curly</td><td>循环或者条件语句必须使用花括号包住</td></tr><tr><td>eqeqeq</td><td>使用强制等===</td></tr><tr><td>newcap</td><td>对于首字母大写的函数（声明的类），强制使用new</td></tr><tr><td>noarg</td><td>禁用arguments.caller和arguments.callee</td></tr><tr><td>sub</td><td>对于属性使用aaa.bbb而不是aaa[&#39;bbb&#39;]</td></tr><tr><td>undef</td><td>查找所有未定义的变量</td></tr><tr><td>boss</td><td>查找类似与if(a = 0)这样的代码</td></tr><tr><td>node</td><td>指定运行环境为node</td></tr><tr><td>strict</td><td>必须使用严格模式</td></tr><tr><td>asi</td><td>允许省略分号</td></tr><tr><td>bitwise</td><td>禁止使用位运算符，比如经常把&amp;&amp;写错&amp; 规避此错误</td></tr><tr><td>jquery</td><td>定义全局暴露的jQuery库</td></tr><tr><td>evil</td><td>禁止使用eval</td></tr><tr><td>maxdepth</td><td>嵌套的最大深度</td></tr><tr><td>maxparams</td><td>参数的最大个数</td></tr></tbody></table><h1 id="css规范" tabindex="-1"><a class="header-anchor" href="#css规范"><span>css规范</span></a></h1><h2 id="id和class的命名" tabindex="-1"><a class="header-anchor" href="#id和class的命名"><span>id和class的命名</span></a></h2><p>ID和class的名称总是使用可以反应元素目的和用途的名称，或其他通用的名称，代替表象和晦涩难懂的名称 不推荐 :</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">.fw-800 {</span>
<span class="line">  font-weight: 800;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">.red {</span>
<span class="line">  color: red;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>推荐 :</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">.heavy {</span>
<span class="line">  font-weight: 800;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">.important {</span>
<span class="line">  color: red;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="合理的使用id" tabindex="-1"><a class="header-anchor" href="#合理的使用id"><span>合理的使用ID</span></a></h2><p>一般情况下ID不应该被用于样式，并且ID的权重很高，所以不使用ID解决样式的问题，而是使用class 不推荐：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">#content .title {</span>
<span class="line">  font-size: 2em;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>推荐：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">.content .title {</span>
<span class="line">  font-size: 2em;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="css选择器中避免使用标签名" tabindex="-1"><a class="header-anchor" href="#css选择器中避免使用标签名"><span>css选择器中避免使用标签名</span></a></h2><p>从结构、表现、行为分离的原则来看，应该尽量避免css中出现HTML标签，并且在css选择器中出现标签名会存在潜在的问题。</p><h2 id="使用子选择器" tabindex="-1"><a class="header-anchor" href="#使用子选择器"><span>使用子选择器</span></a></h2><p>很多前端开发人员写选择器链的时候不使用 直接子选择器（注：直接子选择器和后代选择器的区别）。 有时，这可能会导致疼痛的设计问题并且有时候可能会很耗性能。 然而，在任何情况下，这是一个非常不好的做法。 如果你不写很通用的，需要匹配到DOM末端的选择器， 你应该总是考虑直接子选择器。 不推荐:</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">.content .title {</span>
<span class="line">  font-size: 2rem;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>推荐</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">.content &gt; .title {</span>
<span class="line">  font-size: 2rem;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="尽量使用缩写属性" tabindex="-1"><a class="header-anchor" href="#尽量使用缩写属性"><span>尽量使用缩写属性</span></a></h2><p>尽量使用缩写属性对于代码效率和可读性是很有用的，比如font属性。 不推荐：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">border-top-style: none;</span>
<span class="line">font-family: palatino, georgia, serif;</span>
<span class="line">font-size: 100%;</span>
<span class="line">line-height: 1.6;</span>
<span class="line">padding-bottom: 2em;</span>
<span class="line">padding-left: 1em;</span>
<span class="line">padding-right: 1em;</span>
<span class="line">padding-top: 0;</span>
<span class="line"></span></code></pre></div><p>推荐：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">border-top: 0;</span>
<span class="line">font: 100%/1.6 palatino, georgia, serif;</span>
<span class="line">padding: 0 1em 2em;</span>
<span class="line"></span></code></pre></div><h2 id="_0后面不带单位" tabindex="-1"><a class="header-anchor" href="#_0后面不带单位"><span>0后面不带单位</span></a></h2><p>省略0后面的单位， 不推荐：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">padding-bottom: 0px;</span>
<span class="line">margin: 0em;</span>
<span class="line"></span></code></pre></div><p>推荐：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">padding-bottom: 0;</span>
<span class="line">margin: 0;</span>
<span class="line"></span></code></pre></div><h2 id="属性格式" tabindex="-1"><a class="header-anchor" href="#属性格式"><span>属性格式</span></a></h2><ul><li>为了保证一致性和可扩展性，每个声明应该用分号结束，每个声明换行。</li><li>属性名的冒号后使用一个空格。出于一致性的原因， 属性和值（但属性和冒号之间没有空格）的之间始终使用一个空格。</li><li>每个选择器和属性声明总是使用新的一行。</li><li>属性选择器或属性值用双引号（””），而不是单引号（”）括起来。</li><li>URI值（url()）不要使用引号。</li></ul><p>作为最佳实践，我们应该遵循以下顺序（应该按照下表的顺序）：</p><p>结构性属性：</p><ol><li>display</li><li>position, left, top, right etc.</li><li>overflow, float, clear etc.</li><li>margin, padding</li></ol><p>表现性属性：</p><ul><li>background, border etc.</li><li>font, text</li></ul><p>不推荐：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"> .box {</span>
<span class="line">  font-family: &#39;Arial&#39;, sans-serif;</span>
<span class="line">  border: 3px solid #ddd;</span>
<span class="line">  left: 30%;</span>
<span class="line">  position: absolute;</span>
<span class="line">  text-transform: uppercase;</span>
<span class="line">  background-color: #eee;</span>
<span class="line">  right: 30%;</span>
<span class="line">  isplay: block;</span>
<span class="line">  font-size: 1.5rem;</span>
<span class="line">  overflow: hidden;</span>
<span class="line">  padding: 1em;</span>
<span class="line">  margin: 1em;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>推荐：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">.box {</span>
<span class="line">  display: block;</span>
<span class="line">  position: absolute;</span>
<span class="line">  left: 30%;</span>
<span class="line">  right: 30%;</span>
<span class="line">  overflow: hidden;</span>
<span class="line">  margin: 1em;</span>
<span class="line">  padding: 1em;</span>
<span class="line">  background-color: #eee;</span>
<span class="line">  border: 3px solid #ddd;</span>
<span class="line">  font-family: &#39;Arial&#39;, sans-serif;</span>
<span class="line">  font-size: 1.5rem;</span>
<span class="line">  text-transform: uppercase;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div>`,193)])])}const c=n(i,[["render",t]]),r=JSON.parse('{"path":"/cs-tips/frontend/others/frontend-naming-convention.html","title":"前端开发规范：命名规范、html规范、css规范、js规范","lang":"zh-CN","frontmatter":{"description":"前端开发规范：命名规范、html规范、css规范、js规范 ps:资料来自网络 一个好的程序员肯定是要能书写可维护的代码，而不是一次性的代码，怎么能让团队当中其他人甚至一段时间时候你再看你某个时候写的代码也能看懂呢，这就需要规范你的代码了。 我是有一点强迫症的人，上周我们后端给我了一个CanUsename的接口（该接口的目的是判断输入的目的地是否是4级...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"前端开发规范：命名规范、html规范、css规范、js规范\\",\\"image\\":[\\"https://user-gold-cdn.xitu.io/2017/5/30/7e7984a9e668c6d03b9d2fe0ab8f9bd2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/others/frontend-naming-convention.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"前端开发规范：命名规范、html规范、css规范、js规范"}],["meta",{"property":"og:description","content":"前端开发规范：命名规范、html规范、css规范、js规范 ps:资料来自网络 一个好的程序员肯定是要能书写可维护的代码，而不是一次性的代码，怎么能让团队当中其他人甚至一段时间时候你再看你某个时候写的代码也能看懂呢，这就需要规范你的代码了。 我是有一点强迫症的人，上周我们后端给我了一个CanUsename的接口（该接口的目的是判断输入的目的地是否是4级..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://user-gold-cdn.xitu.io/2017/5/30/7e7984a9e668c6d03b9d2fe0ab8f9bd2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}]]},"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":21.26,"words":6377},"filePathRelative":"cs-tips/frontend/others/frontend-naming-convention.md","autoDesc":true}');export{c as comp,r as data};
