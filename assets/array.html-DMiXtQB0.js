import{_ as s,c as n,a as e,o as p}from"./app-C8DxhDIZ.js";const l={};function t(o,a){return p(),n("div",null,a[0]||(a[0]=[e(`<h1 id="数组" tabindex="-1"><a class="header-anchor" href="#数组"><span>数组</span></a></h1><p>与其他脚本语言一样，Windows PowerShell也支持名为数组的数据结构。 PowerShell中的数组是一种数据结构，用于将值的集合存储在单个变量中。 数组中的值可以是相同类型或不同类型。例如可以是字符串，整数，通用对象或其他数组。</p><p>数组中的每个元素或值都有一个索引。 索引是整数，代表值在数组中的位置。 我们可以使用索引检索数组的元素。 数组的索引始终以<code>0</code>开头，表示数组的第一个数据项。</p><h2 id="_1-创建和初始化数组" tabindex="-1"><a class="header-anchor" href="#_1-创建和初始化数组"><span>1.创建和初始化数组</span></a></h2><p>要在PowerShell中声明数组，可使用赋值运算符将多个值分配给变量。 逗号分隔存储在数组中的值。 以下语句是声明数组变量的语法：</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token variable">$variable_name</span> = value1<span class="token punctuation">,</span> value2<span class="token punctuation">,</span> value3<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">,</span>ValueN</span>
<span class="line">Shell</span>
<span class="line"></span></code></pre></div><p>**示例：**要创建和初始化<code>$k</code>数组，该数组包含五个整数值：<code>10</code>,<code>15</code>,<code>20</code>,<code>50</code>,<code>99</code>。在PowerShell中键入以下命令：</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token variable">$k</span> = 10<span class="token punctuation">,</span> 15<span class="token punctuation">,</span> 20<span class="token punctuation">,</span> 50<span class="token punctuation">,</span> 99</span>
<span class="line">Shell</span>
<span class="line"></span></code></pre></div><p>还可以使用范围运算符来初始化数组。 **示例：**要创建和初始化数组<code>$arr</code>，该数组包含从<code>2</code>到<code>10</code>的值。在PowerShell中键入以下命令：</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token variable">$arr</span> = 2<span class="token punctuation">.</span><span class="token punctuation">.</span>10</span>
<span class="line">Shell</span>
<span class="line"></span></code></pre></div><h2 id="_2-访问数组元素" tabindex="-1"><a class="header-anchor" href="#_2-访问数组元素"><span>2.访问数组元素</span></a></h2><p>可以在PowerShell控制台上显示数组的所有值。方法是键入数组的名称，后跟美元($)符号。</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token comment"># 例如: 假设数组$array1包含值：11,20,30,50,66,99。 在PowerShell上键入以下命令以显示数组的所有值：</span></span>
<span class="line"><span class="token variable">$array1</span>=11<span class="token punctuation">,</span>20<span class="token punctuation">,</span>30<span class="token punctuation">,</span>50<span class="token punctuation">,</span>66<span class="token punctuation">,</span>99</span>
<span class="line"><span class="token variable">$array1</span></span>
<span class="line">Shell</span>
<span class="line"></span></code></pre></div><p>还可以使用索引号从数组访问元素，将索引号括在方括号中。以下语句是显示指定位置的值的语法：</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token variable">$variable_name</span> <span class="token namespace">[index_number]</span></span>
<span class="line">Shell</span>
<span class="line"></span></code></pre></div><p>例如：假设您要显示数组<code>$array1</code>的第二个元素，使用以下命令：</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token variable">$array1</span><span class="token punctuation">[</span>2<span class="token punctuation">]</span></span>
<span class="line">Shell</span>
<span class="line"></span></code></pre></div><p>可以通过使用范围运算符访问索引来访问数组的一部分。 **例如：**假设要从数组的第三个元素访问第六个元素，使用以下命令：</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token variable">$array1</span><span class="token punctuation">[</span>2<span class="token punctuation">.</span><span class="token punctuation">.</span>5<span class="token punctuation">]</span></span>
<span class="line">Shell</span>
<span class="line"></span></code></pre></div><p>可以使用负数访问数组的最后一部分，这些负数用于从数组末尾开始计数元素。 数字<code>-1</code>表示数组的最后一个元素。 **示例：**要显示数组的最后一个元素，使用以下命令：</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token variable">$array1</span><span class="token punctuation">[</span><span class="token operator">-</span>1<span class="token punctuation">]</span></span>
<span class="line">Shell</span>
<span class="line"></span></code></pre></div><p>要以索引的升序显示数组的最后四个元素，使用以下命令：</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token variable">$array1</span><span class="token punctuation">[</span><span class="token operator">-</span>4<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">-</span>1<span class="token punctuation">]</span></span>
<span class="line">Shell</span>
<span class="line"></span></code></pre></div><p>上面示例执行结果如下： <img src="http://www.xntutor.com/uploads/images/2020/02/03/211354_16109.png" alt="执行结果"></p><h2 id="_3-数组大小" tabindex="-1"><a class="header-anchor" href="#_3-数组大小"><span>3.数组大小</span></a></h2><p>数组的大小取决于元素的数量。可以使用以下语法获取数组的大小：</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token variable">$variable_name</span><span class="token punctuation">.</span>Length</span>
<span class="line">Shell</span>
<span class="line"></span></code></pre></div><p>**例如：**如果创建一个新数组<code>$a</code>，其中包含五个元素。<code>$a = 20,25,35,50,68</code>。要获取此数组的大小，使用以下命令：</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token variable">$a</span><span class="token punctuation">.</span>Length</span>
<span class="line">Shell</span>
<span class="line"></span></code></pre></div><p>上面示例执行结果如下：</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token function">PS</span> C:\\Users\\hema&gt; <span class="token variable">$a</span> = 20<span class="token punctuation">,</span>25<span class="token punctuation">,</span>35<span class="token punctuation">,</span>50<span class="token punctuation">,</span>68</span>
<span class="line"><span class="token function">PS</span> C:\\Users\\hema&gt; <span class="token variable">$a</span><span class="token punctuation">.</span>Length</span>
<span class="line">5</span>
<span class="line">Shell</span>
<span class="line"></span></code></pre></div><h2 id="_4-数组操作" tabindex="-1"><a class="header-anchor" href="#_4-数组操作"><span>4.数组操作</span></a></h2><p>我们可以通过指定数组名称和要更改的值的索引号来更改数组中特定索引值的值。 **示例：**要更改<code>$p</code>数组中第三个元素的值，使用以下命令：</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token variable">$p</span><span class="token punctuation">[</span>2<span class="token punctuation">]</span>=20</span>
<span class="line">Shell</span>
<span class="line"></span></code></pre></div><p>还可以使用<code>+=</code>运算符将值添加到数组。使用以下语法将值添加到现有数组：</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token variable">$variable_name</span> <span class="token operator">+=</span> value</span>
<span class="line">Shell</span>
<span class="line"></span></code></pre></div><p><strong>例如：</strong> 要将元素添加到数组<code>$a</code>，请键入以下命令：</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token variable">$a</span> <span class="token operator">+=</span> 15</span>
<span class="line">Shell</span>
<span class="line"></span></code></pre></div><h2 id="_5-初始化一个空数组" tabindex="-1"><a class="header-anchor" href="#_5-初始化一个空数组"><span>5.初始化一个空数组</span></a></h2><p>可以使用以下语法初始化一个空数组：</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token variable">$variable_name</span> = @<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">Shell</span>
<span class="line"></span></code></pre></div><h2 id="_6-从数组中删除元素" tabindex="-1"><a class="header-anchor" href="#_6-从数组中删除元素"><span>6.从数组中删除元素</span></a></h2><p>通过使用以下示例，我们可以了解如何从数组中删除单个或多个元素： 假设数组<code>$array</code>包含五个元素<code>20,25,35,50,68</code>。如要从数组中删除第一个和最后一个值，请使用以下命令：</p><div class="language-powershell" data-highlighter="prismjs" data-ext="powershell" data-title="powershell"><pre><code><span class="line"><span class="token variable">$array</span> = <span class="token punctuation">(</span><span class="token variable">$array</span><span class="token punctuation">[</span>1<span class="token punctuation">]</span> <span class="token variable">$array</span><span class="token punctuation">[</span>2<span class="token punctuation">]</span> <span class="token variable">$array</span><span class="token punctuation">[</span>3<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre></div>`,44)]))}const i=s(l,[["render",t]]),r=JSON.parse('{"path":"/windows-tutor/powershell/basics/array.html","title":"数组","lang":"zh-CN","frontmatter":{"description":"数组 与其他脚本语言一样，Windows PowerShell也支持名为数组的数据结构。 PowerShell中的数组是一种数据结构，用于将值的集合存储在单个变量中。 数组中的值可以是相同类型或不同类型。例如可以是字符串，整数，通用对象或其他数组。 数组中的每个元素或值都有一个索引。 索引是整数，代表值在数组中的位置。 我们可以使用索引检索数组的元素。...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/powershell/basics/array.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"数组"}],["meta",{"property":"og:description","content":"数组 与其他脚本语言一样，Windows PowerShell也支持名为数组的数据结构。 PowerShell中的数组是一种数据结构，用于将值的集合存储在单个变量中。 数组中的值可以是相同类型或不同类型。例如可以是字符串，整数，通用对象或其他数组。 数组中的每个元素或值都有一个索引。 索引是整数，代表值在数组中的位置。 我们可以使用索引检索数组的元素。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"http://www.xntutor.com/uploads/images/2020/02/03/211354_16109.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-25T16:48:44.000Z"}],["meta",{"property":"article:modified_time","content":"2022-05-25T16:48:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"数组\\",\\"image\\":[\\"http://www.xntutor.com/uploads/images/2020/02/03/211354_16109.png\\"],\\"dateModified\\":\\"2022-05-25T16:48:44.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"1.创建和初始化数组","slug":"_1-创建和初始化数组","link":"#_1-创建和初始化数组","children":[]},{"level":2,"title":"2.访问数组元素","slug":"_2-访问数组元素","link":"#_2-访问数组元素","children":[]},{"level":2,"title":"3.数组大小","slug":"_3-数组大小","link":"#_3-数组大小","children":[]},{"level":2,"title":"4.数组操作","slug":"_4-数组操作","link":"#_4-数组操作","children":[]},{"level":2,"title":"5.初始化一个空数组","slug":"_5-初始化一个空数组","link":"#_5-初始化一个空数组","children":[]},{"level":2,"title":"6.从数组中删除元素","slug":"_6-从数组中删除元素","link":"#_6-从数组中删除元素","children":[]}],"git":{"createdTime":1652240878000,"updatedTime":1653497324000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.31,"words":993},"filePathRelative":"windows-tutor/powershell/basics/array.md","localizedDate":"2022年5月11日","autoDesc":true}');export{i as comp,r as data};
