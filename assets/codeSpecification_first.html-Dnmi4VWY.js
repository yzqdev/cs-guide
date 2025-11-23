import{_ as n,c as a,a as p,o as e}from"./app-B6vXTniy.js";const t={};function l(o,s){return e(),a("div",null,[...s[0]||(s[0]=[p(`<h1 id="编码规范" tabindex="-1"><a class="header-anchor" href="#编码规范"><span>编码规范</span></a></h1><p><img src="http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-07-20-Python代码规范.png" alt=""></p><h1 id="一、简明概述" tabindex="-1"><a class="header-anchor" href="#一、简明概述"><span>一、简明概述</span></a></h1><h2 id="_1、编码" tabindex="-1"><a class="header-anchor" href="#_1、编码"><span>1、编码</span></a></h2><ul><li>如无特殊情况, 文件一律使用 UTF-8 编码</li><li>如无特殊情况, 文件头部必须加入<code>#-*-coding:utf-8-*-</code>标识</li></ul><h2 id="_2、代码格式" tabindex="-1"><a class="header-anchor" href="#_2、代码格式"><span>2、代码格式</span></a></h2><h3 id="_2-1、缩进" tabindex="-1"><a class="header-anchor" href="#_2-1、缩进"><span>2.1、缩进</span></a></h3><ul><li>统一使用 4 个空格进行缩进</li></ul><h3 id="_2-2、行宽" tabindex="-1"><a class="header-anchor" href="#_2-2、行宽"><span>2.2、行宽</span></a></h3><p>每行代码尽量不超过 80 个字符(在特殊情况下可以略微超过 80 ，但最长不得超过 120)</p><p>理由：</p><ul><li>这在查看 side-by-side 的 diff 时很有帮助</li><li>方便在控制台下查看代码</li><li>太长可能是设计有缺陷</li></ul><h3 id="_2-3、引号" tabindex="-1"><a class="header-anchor" href="#_2-3、引号"><span>2.3、引号</span></a></h3><p>简单说，自然语言使用双引号，机器标示使用单引号，因此 <strong>代码里</strong> 多数应该使用 <strong>单引号</strong></p><ul><li><em><strong>自然语言</strong></em> <strong>使用双引号</strong> <code>&quot;...&quot;</code><br> 例如错误信息；很多情况还是 unicode，使用<code>u&quot;你好世界&quot;</code></li><li><em><strong>机器标识</strong></em> <strong>使用单引号</strong> <code>&#39;...&#39;</code> 例如 dict 里的 key</li><li><em><strong>正则表达式</strong></em> <strong>使用原生的双引号</strong> <code>r&quot;...&quot;</code></li><li><em><strong>文档字符串 (docstring)</strong></em> <strong>使用三个双引号</strong> <code>&quot;&quot;&quot;......&quot;&quot;&quot;</code></li></ul><h3 id="_2-4、空行" tabindex="-1"><a class="header-anchor" href="#_2-4、空行"><span>2.4、空行</span></a></h3><ul><li>模块级函数和类定义之间空两行；</li><li>类成员函数之间空一行；</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">class</span> <span class="token class-name">A</span><span class="token punctuation">:</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">pass</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">hello</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">pass</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">pass</span>   </span>
<span class="line"></span></code></pre></div><ul><li>可以使用多个空行分隔多组相关的函数</li><li>函数中可以使用空行分隔出逻辑相关的代码</li></ul><h2 id="_3、import-语句" tabindex="-1"><a class="header-anchor" href="#_3、import-语句"><span>3、import 语句</span></a></h2><ul><li>import 语句应该分行书写</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># 正确的写法</span></span>
<span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> sys</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 不推荐的写法</span></span>
<span class="line"><span class="token keyword">import</span> sys<span class="token punctuation">,</span>os</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 正确的写法</span></span>
<span class="line"><span class="token keyword">from</span> subprocess <span class="token keyword">import</span> Popen<span class="token punctuation">,</span> PIPE</span>
<span class="line"></span></code></pre></div><ul><li>import语句应该使用 <strong>absolute</strong> import</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># 正确的写法</span></span>
<span class="line"><span class="token keyword">from</span> foo<span class="token punctuation">.</span>bar <span class="token keyword">import</span> Bar</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 不推荐的写法</span></span>
<span class="line"><span class="token keyword">from</span> <span class="token punctuation">.</span><span class="token punctuation">.</span>bar <span class="token keyword">import</span> Bar</span>
<span class="line"></span></code></pre></div><ul><li>import语句应该放在文件头部，置于模块说明及docstring之后，于全局变量之前；</li><li>import语句应该按照顺序排列，每组之间用一个空行分隔</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">import</span> os</span>
<span class="line"><span class="token keyword">import</span> sys</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> msgpack</span>
<span class="line"><span class="token keyword">import</span> zmq</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> foo</span>
<span class="line"></span></code></pre></div><ul><li>导入其他模块的类定义时，可以使用相对导入</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> myclass <span class="token keyword">import</span> MyClass</span>
<span class="line"></span></code></pre></div><ul><li>如果发生命名冲突，则可使用命名空间</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">import</span> bar</span>
<span class="line"><span class="token keyword">import</span> foo<span class="token punctuation">.</span>bar</span>
<span class="line"></span>
<span class="line">bar<span class="token punctuation">.</span>Bar<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">foo<span class="token punctuation">.</span>bar<span class="token punctuation">.</span>Bar<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><h2 id="_4、空格" tabindex="-1"><a class="header-anchor" href="#_4、空格"><span>4、空格</span></a></h2><ul><li>在二元运算符两边各空一格<code>[=,-,+=,==,&gt;,in,is not, and]</code>:</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># 正确的写法</span></span>
<span class="line">i <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span></span>
<span class="line">submitted <span class="token operator">+=</span> <span class="token number">1</span></span>
<span class="line">x <span class="token operator">=</span> x <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">-</span> <span class="token number">1</span></span>
<span class="line">hypot2 <span class="token operator">=</span> x <span class="token operator">*</span> x <span class="token operator">+</span> y <span class="token operator">*</span> y</span>
<span class="line">c <span class="token operator">=</span> <span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>a <span class="token operator">-</span> b<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 不推荐的写法</span></span>
<span class="line">i<span class="token operator">=</span>i<span class="token operator">+</span><span class="token number">1</span></span>
<span class="line">submitted <span class="token operator">+=</span><span class="token number">1</span></span>
<span class="line">x <span class="token operator">=</span> x<span class="token operator">*</span><span class="token number">2</span> <span class="token operator">-</span> <span class="token number">1</span></span>
<span class="line">hypot2 <span class="token operator">=</span> x<span class="token operator">*</span>x <span class="token operator">+</span> y<span class="token operator">*</span>y</span>
<span class="line">c <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token operator">+</span>b<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>a<span class="token operator">-</span>b<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><ul><li>函数的参数列表中，<code>,</code>之后要有空格</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># 正确的写法</span></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">complex</span><span class="token punctuation">(</span>real<span class="token punctuation">,</span> imag<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">pass</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 不推荐的写法</span></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">complex</span><span class="token punctuation">(</span>real<span class="token punctuation">,</span>imag<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">pass</span></span>
<span class="line"></span></code></pre></div><ul><li>函数的参数列表中，默认值等号两边不要添加空格</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># 正确的写法</span></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">complex</span><span class="token punctuation">(</span>real<span class="token punctuation">,</span> imag<span class="token operator">=</span><span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">pass</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 不推荐的写法</span></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">complex</span><span class="token punctuation">(</span>real<span class="token punctuation">,</span> imag <span class="token operator">=</span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">pass</span></span>
<span class="line"></span></code></pre></div><ul><li>左括号之后，右括号之前不要加多余的空格</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># 正确的写法</span></span>
<span class="line">spam<span class="token punctuation">(</span>ham<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>eggs<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 不推荐的写法</span></span>
<span class="line">spam<span class="token punctuation">(</span> ham<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> eggs <span class="token punctuation">:</span> <span class="token number">2</span> <span class="token punctuation">}</span> <span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><ul><li>字典对象的左括号之前不要多余的空格</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># 正确的写法</span></span>
<span class="line"><span class="token builtin">dict</span><span class="token punctuation">[</span><span class="token string">&#39;key&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">[</span>index<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 不推荐的写法</span></span>
<span class="line"><span class="token builtin">dict</span> <span class="token punctuation">[</span><span class="token string">&#39;key&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token builtin">list</span> <span class="token punctuation">[</span>index<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre></div><ul><li>不要为对齐赋值语句而使用的额外空格</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># 正确的写法</span></span>
<span class="line">x <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">y <span class="token operator">=</span> <span class="token number">2</span></span>
<span class="line">long_variable <span class="token operator">=</span> <span class="token number">3</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 不推荐的写法</span></span>
<span class="line">x             <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">y             <span class="token operator">=</span> <span class="token number">2</span></span>
<span class="line">long_variable <span class="token operator">=</span> <span class="token number">3</span></span>
<span class="line"></span></code></pre></div><h2 id="_5、换行" tabindex="-1"><a class="header-anchor" href="#_5、换行"><span>5、换行</span></a></h2><p>Python 支持括号内的换行。这时有两种情况。</p><ol><li>第二行缩进到括号的起始处</li></ol><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line">foo <span class="token operator">=</span> long_function_name<span class="token punctuation">(</span>var_one<span class="token punctuation">,</span> var_two<span class="token punctuation">,</span></span>
<span class="line">                         var_three<span class="token punctuation">,</span> var_four<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><ol start="2"><li>第二行缩进 4 个空格，适用于起始括号就换行的情形</li></ol><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">def</span> <span class="token function">long_function_name</span><span class="token punctuation">(</span></span>
<span class="line">        var_one<span class="token punctuation">,</span> var_two<span class="token punctuation">,</span> var_three<span class="token punctuation">,</span></span>
<span class="line">        var_four<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">print</span><span class="token punctuation">(</span>var_one<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>使用反斜杠<code>\\</code>换行，二元运算符<code>+</code> <code>.</code>等应出现在行末；长字符串也可以用此法换行</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line">session<span class="token punctuation">.</span>query<span class="token punctuation">(</span>MyTable<span class="token punctuation">)</span><span class="token punctuation">.</span>\\</span>
<span class="line">        filter_by<span class="token punctuation">(</span><span class="token builtin">id</span><span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span>\\</span>
<span class="line">        one<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">print</span> <span class="token string">&#39;Hello, &#39;</span>\\</span>
<span class="line">      <span class="token string">&#39;%s %s!&#39;</span> <span class="token operator">%</span>\\</span>
<span class="line">      <span class="token punctuation">(</span><span class="token string">&#39;Harry&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Potter&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><p>禁止复合语句，即一行中包含多个语句：</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># 正确的写法</span></span>
<span class="line">do_first<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">do_second<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">do_third<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 不推荐的写法</span></span>
<span class="line">do_first<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>do_second<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>do_third<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><p><code>if/for/while</code>一定要换行：</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># 正确的写法</span></span>
<span class="line"><span class="token keyword">if</span> foo <span class="token operator">==</span> <span class="token string">&#39;blah&#39;</span><span class="token punctuation">:</span></span>
<span class="line">    do_blah_thing<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 不推荐的写法</span></span>
<span class="line"><span class="token keyword">if</span> foo <span class="token operator">==</span> <span class="token string">&#39;blah&#39;</span><span class="token punctuation">:</span> do_blash_thing<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><h2 id="_6、docstring" tabindex="-1"><a class="header-anchor" href="#_6、docstring"><span>6、docstring</span></a></h2><p>docstring 的规范中最其本的两点：</p><ol><li>所有的公共模块、函数、类、方法，都应该写 docstring 。私有方法不一定需要，但应该在 def 后提供一个块注释来说明。</li><li>docstring 的结束&quot;&quot;&quot;应该独占一行，除非此 docstring 只有一行。</li></ol><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token triple-quoted-string string">&quot;&quot;&quot;Return a foobar</span>
<span class="line">Optional plotz says to frobnicate the bizbaz first.</span>
<span class="line">&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token triple-quoted-string string">&quot;&quot;&quot;Oneline docstring&quot;&quot;&quot;</span></span>
<span class="line"></span></code></pre></div><h1 id="二、注释" tabindex="-1"><a class="header-anchor" href="#二、注释"><span>二、注释</span></a></h1><h2 id="_1、注释" tabindex="-1"><a class="header-anchor" href="#_1、注释"><span>1、注释</span></a></h2><h3 id="_1-1、块注释" tabindex="-1"><a class="header-anchor" href="#_1-1、块注释"><span>1.1、块注释</span></a></h3><p>“#”号后空一格，段落件用空行分开（同样需要“#”号）</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># 块注释</span></span>
<span class="line"><span class="token comment"># 块注释</span></span>
<span class="line"><span class="token comment">#</span></span>
<span class="line"><span class="token comment"># 块注释</span></span>
<span class="line"><span class="token comment"># 块注释</span></span>
<span class="line"></span></code></pre></div><h3 id="_1-2、行注释" tabindex="-1"><a class="header-anchor" href="#_1-2、行注释"><span>1.2、行注释</span></a></h3><p>至少使用两个空格和语句分开，注意不要使用无意义的注释</p><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># 正确的写法</span></span>
<span class="line">x <span class="token operator">=</span> x <span class="token operator">+</span> <span class="token number">1</span>  <span class="token comment"># 边框加粗一个像素</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 不推荐的写法(无意义的注释)</span></span>
<span class="line">x <span class="token operator">=</span> x <span class="token operator">+</span> <span class="token number">1</span> <span class="token comment"># x加1</span></span>
<span class="line"></span></code></pre></div><h3 id="_1-3、建议" tabindex="-1"><a class="header-anchor" href="#_1-3、建议"><span>1.3、建议</span></a></h3><ul><li><p>在代码的关键部分(或比较复杂的地方), 能写注释的要尽量写注释</p></li><li><p>比较重要的注释段, 使用多个等号隔开, 可以更加醒目, 突出重要性</p></li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line">app <span class="token operator">=</span> create_app<span class="token punctuation">(</span>name<span class="token punctuation">,</span> options<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment"># =====================================</span></span>
<span class="line"><span class="token comment"># 请勿在此处添加 get post等app路由行为 !!!</span></span>
<span class="line"><span class="token comment"># =====================================</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span></span>
<span class="line">    app<span class="token punctuation">.</span>run<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div><h2 id="_2、文档注释-docstring" tabindex="-1"><a class="header-anchor" href="#_2、文档注释-docstring"><span>2、文档注释（Docstring）</span></a></h2><p>作为文档的Docstring一般出现在模块头部、函数和类的头部，这样在python中可以通过对象的__doc__对象获取文档. 编辑器和IDE也可以根据Docstring给出自动提示.</p><ul><li>文档注释以 &quot;&quot;&quot; 开头和结尾, 首行不换行, 如有多行, 末行必需换行, 以下是Google的docstring风格示例</li></ul><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># -*- coding: utf-8 -*-</span></span>
<span class="line"><span class="token triple-quoted-string string">&quot;&quot;&quot;Example docstrings.</span>
<span class="line"></span>
<span class="line">This module demonstrates documentation as specified by the \`Google Python</span>
<span class="line">Style Guide\`_. Docstrings may extend over multiple lines. Sections are created</span>
<span class="line">with a section header and a colon followed by a block of indented text.</span>
<span class="line"></span>
<span class="line">Example:</span>
<span class="line">    Examples can be given using either the \`\`Example\`\` or \`\`Examples\`\`</span>
<span class="line">    sections. Sections support any reStructuredText formatting, including</span>
<span class="line">    literal blocks::</span>
<span class="line"></span>
<span class="line">        $ python example_google.py</span>
<span class="line"></span>
<span class="line">Section breaks are created by resuming unindented text. Section breaks</span>
<span class="line">are also implicitly created anytime a new section starts.</span>
<span class="line">&quot;&quot;&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>不要在文档注释复制函数定义原型, 而是具体描述其具体内容, 解释具体参数和返回值等</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment">#  不推荐的写法(不要写函数原型等废话)</span></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">function</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token triple-quoted-string string">&quot;&quot;&quot;function(a, b) -&gt; list&quot;&quot;&quot;</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">#  正确的写法</span></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">function</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token triple-quoted-string string">&quot;&quot;&quot;计算并返回a到b范围内数据的平均值&quot;&quot;&quot;</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre></div><ul><li>对函数参数、返回值等的说明采用numpy标准, 如下所示</li></ul><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">def</span> <span class="token function">func</span><span class="token punctuation">(</span>arg1<span class="token punctuation">,</span> arg2<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token triple-quoted-string string">&quot;&quot;&quot;在这里写函数的一句话总结(如: 计算平均值).</span>
<span class="line"></span>
<span class="line">    这里是具体描述.</span>
<span class="line"></span>
<span class="line">    参数</span>
<span class="line">    ----------</span>
<span class="line">    arg1 : int</span>
<span class="line">        arg1的具体描述</span>
<span class="line">    arg2 : int</span>
<span class="line">        arg2的具体描述</span>
<span class="line"></span>
<span class="line">    返回值</span>
<span class="line">    -------</span>
<span class="line">    int</span>
<span class="line">        返回值的具体描述</span>
<span class="line"></span>
<span class="line">    参看</span>
<span class="line">    --------</span>
<span class="line">    otherfunc : 其它关联函数等...</span>
<span class="line"></span>
<span class="line">    示例</span>
<span class="line">    --------</span>
<span class="line">    示例使用doctest格式, 在\`&gt;&gt;&gt;\`后的代码可以被文档测试工具作为测试用例自动运行</span>
<span class="line"></span>
<span class="line">    &gt;&gt;&gt; a=[1,2,3]</span>
<span class="line">    &gt;&gt;&gt; print [x + 3 for x in a]</span>
<span class="line">    [4, 5, 6]</span>
<span class="line">    &quot;&quot;&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>文档注释不限于中英文, 但不要中英文混用</p></li><li><p>文档注释不是越长越好, 通常一两句话能把情况说清楚即可</p></li><li><p>模块、公有类、公有方法, 能写文档注释的, 应该尽量写文档注释</p></li></ul><h1 id="三、命名规范" tabindex="-1"><a class="header-anchor" href="#三、命名规范"><span>三、命名规范</span></a></h1><h2 id="_1、模块" tabindex="-1"><a class="header-anchor" href="#_1、模块"><span>1、模块</span></a></h2><ul><li>模块尽量使用小写命名，首字母保持小写，尽量不要用下划线(除非多个单词，且数量不多的情况)</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># 正确的模块名</span></span>
<span class="line"><span class="token keyword">import</span> decoder</span>
<span class="line"><span class="token keyword">import</span> html_parser</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 不推荐的模块名</span></span>
<span class="line"><span class="token keyword">import</span> Decoder</span>
<span class="line"></span></code></pre></div><h2 id="_2、类名" tabindex="-1"><a class="header-anchor" href="#_2、类名"><span>2、类名</span></a></h2><ul><li>类名使用驼峰(CamelCase)命名风格，首字母大写，私有类可用一个下划线开头</li></ul><div class="language-Python" data-highlighter="prismjs" data-ext="Python"><pre><code class="language-Python"><span class="line">class Farm():</span>
<span class="line">    pass</span>
<span class="line"></span>
<span class="line">class AnimalFarm(Farm):</span>
<span class="line">    pass</span>
<span class="line"></span>
<span class="line">class _PrivateFarm(Farm):</span>
<span class="line">    pass</span>
<span class="line"></span></code></pre></div><ul><li>将相关的类和顶级函数放在同一个模块里. 不像Java, 没必要限制一个类一个模块.</li></ul><h2 id="_3、函数" tabindex="-1"><a class="header-anchor" href="#_3、函数"><span>3、函数</span></a></h2><ul><li>函数名一律小写，如有多个单词，用下划线隔开</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">pass</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">run_with_env</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">pass</span></span>
<span class="line"></span></code></pre></div><ul><li>私有函数在函数前加一个下划线_</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">_private_func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">pass</span></span>
<span class="line"></span></code></pre></div><h2 id="_4、变量名" tabindex="-1"><a class="header-anchor" href="#_4、变量名"><span>4、变量名</span></a></h2><ul><li>变量名尽量小写, 如有多个单词，用下划线隔开</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span></span>
<span class="line">    count <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">    school_name <span class="token operator">=</span> <span class="token string">&#39;&#39;</span></span>
<span class="line"></span></code></pre></div><ul><li>常量采用全大写，如有多个单词，使用下划线隔开</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line">MAX_CLIENT <span class="token operator">=</span> <span class="token number">100</span></span>
<span class="line">MAX_CONNECTION <span class="token operator">=</span> <span class="token number">1000</span></span>
<span class="line">CONNECTION_TIMEOUT <span class="token operator">=</span> <span class="token number">600</span></span>
<span class="line"></span></code></pre></div><h2 id="_5、常量" tabindex="-1"><a class="header-anchor" href="#_5、常量"><span>5、常量</span></a></h2><ul><li>常量使用以下划线分隔的大写命名</li></ul><div class="language-python" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line">MAX_OVERFLOW <span class="token operator">=</span> <span class="token number">100</span></span>
<span class="line"></span>
<span class="line">Class <span class="token class-name">FooBar</span><span class="token punctuation">:</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">foo_bar</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> print_<span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token keyword">print</span><span class="token punctuation">(</span>print_<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div>`,100)])])}const i=n(t,[["render",l]]),r=JSON.parse('{"path":"/python-tutor/basics/codeSpecification_first.html","title":"编码规范","lang":"zh-CN","frontmatter":{"description":"编码规范 一、简明概述 1、编码 如无特殊情况, 文件一律使用 UTF-8 编码 如无特殊情况, 文件头部必须加入#-*-coding:utf-8-*-标识 2、代码格式 2.1、缩进 统一使用 4 个空格进行缩进 2.2、行宽 每行代码尽量不超过 80 个字符(在特殊情况下可以略微超过 80 ，但最长不得超过 120) 理由： 这在查看 side-b...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"编码规范\\",\\"image\\":[\\"http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-07-20-Python%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83.png\\"],\\"dateModified\\":\\"2022-05-26T16:22:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/python-tutor/basics/codeSpecification_first.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"编码规范"}],["meta",{"property":"og:description","content":"编码规范 一、简明概述 1、编码 如无特殊情况, 文件一律使用 UTF-8 编码 如无特殊情况, 文件头部必须加入#-*-coding:utf-8-*-标识 2、代码格式 2.1、缩进 统一使用 4 个空格进行缩进 2.2、行宽 每行代码尽量不超过 80 个字符(在特殊情况下可以略微超过 80 ，但最长不得超过 120) 理由： 这在查看 side-b..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"http://twowaterimage.oss-cn-beijing.aliyuncs.com/2019-07-20-Python%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-26T16:22:32.000Z"}],["meta",{"property":"article:modified_time","content":"2022-05-26T16:22:32.000Z"}]]},"git":{"createdTime":1653497324000,"updatedTime":1653582152000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":6.8,"words":2039},"filePathRelative":"python-tutor/basics/codeSpecification_first.md","autoDesc":true}');export{i as comp,r as data};
