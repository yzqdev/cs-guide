import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/02-syntax.html","title":"02 - 基本语法","lang":"zh-CN","frontmatter":{"order":2,"description":"02 - 基本语法 注释 多行注释 /* */ 不能放在行尾，只能独立出现。 表达式与赋值 AHK v2 统一使用表达式语法，赋值用 :=： 关键规则： := 是赋值运算符（表达式赋值） = 在 v2 中不再用于赋值（只在比较时用） 字符串用双引号 &quot;...&quot; 数字不需要引号 表达式中变量直接写名字，不需要 %var% 行延续 长行...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"02 - 基本语法\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/02-syntax.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"02 - 基本语法"}],["meta",{"property":"og:description","content":"02 - 基本语法 注释 多行注释 /* */ 不能放在行尾，只能独立出现。 表达式与赋值 AHK v2 统一使用表达式语法，赋值用 :=： 关键规则： := 是赋值运算符（表达式赋值） = 在 v2 中不再用于赋值（只在比较时用） 字符串用双引号 &quot;...&quot; 数字不需要引号 表达式中变量直接写名字，不需要 %var% 行延续 长行..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.28,"words":983},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/02-syntax.md","autoDesc":true}`),u={name:`02-syntax.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_02-基本语法" tabindex="-1"><a class="header-anchor" href="#_02-基本语法"><span>02 - 基本语法</span></a></h1><h2 id="注释" tabindex="-1"><a class="header-anchor" href="#注释"><span>注释</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 单行注释 — 分号开头，整行都是注释</span>
<span class="line">x := 42  ; 行尾注释 — 分号后是注释</span>
<span class="line"></span>
<span class="line">/*</span>
<span class="line">  多行注释 — 用 /* 和 */ 包围</span>
<span class="line">  可以写很多行</span>
<span class="line">  适合写较长的说明</span>
<span class="line">*/</span>
<span class="line"></span></code></pre></div><blockquote><p>多行注释 <code>/* */</code> 不能放在行尾，只能独立出现。</p></blockquote><h2 id="表达式与赋值" tabindex="-1"><a class="header-anchor" href="#表达式与赋值"><span>表达式与赋值</span></a></h2><p>AHK v2 统一使用<strong>表达式语法</strong>，赋值用 <code>:=</code>：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">name := &quot;AutoHotkey&quot;    ; 字符串赋值</span>
<span class="line">age := 25               ; 数字赋值</span>
<span class="line">flag := true            ; 布尔赋值</span>
<span class="line">result := 3 + 4 * 2     ; 表达式赋值，result = 11</span>
<span class="line">msg := &quot;Hello, &quot; name   ; 字符串拼接（表达式内自动拼接）</span>
<span class="line"></span></code></pre></div><p><strong>关键规则</strong>：</p><ul><li><code>:=</code> 是赋值运算符（表达式赋值）</li><li><code>=</code> 在 v2 中不再用于赋值（只在比较时用）</li><li>字符串用双引号 <code>&quot;...&quot;</code></li><li>数字不需要引号</li><li>表达式中变量直接写名字，不需要 <code>%var%</code></li></ul><h2 id="行延续" tabindex="-1"><a class="header-anchor" href="#行延续"><span>行延续</span></a></h2><p>长行可以拆分书写：</p><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 方式1: 在行首用小括号包围（延续区域）</span>
<span class="line">longString := (</span>
<span class="line">    &quot;这是一段很长的文字，&quot;</span>
<span class="line">    &quot;可以分多行书写，&quot;</span>
<span class="line">    &quot;它们会被自动拼接在一起。&quot;</span>
<span class="line">)</span>
<span class="line"></span>
<span class="line">; 方式2: 续行符 — 行尾的逗号或运算符自动续行</span>
<span class="line">result := 1 + 2 + 3</span>
<span class="line">    + 4 + 5 + 6    ; 以 + 开头，自动续行</span>
<span class="line"></span>
<span class="line">; 方式3: 数组/对象的多行书写</span>
<span class="line">arr := [</span>
<span class="line">    10,</span>
<span class="line">    20,</span>
<span class="line">    30</span>
<span class="line">]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="代码块" tabindex="-1"><a class="header-anchor" href="#代码块"><span>代码块</span></a></h2><p>AHK v2 中代码块用花括号 <code>{}</code>：</p><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 热键代码块</span>
<span class="line">^j:: {</span>
<span class="line">    Send &quot;Hello&quot;</span>
<span class="line">    MsgBox &quot;热键已触发&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; if 代码块</span>
<span class="line">if (age &gt; 18) {</span>
<span class="line">    MsgBox &quot;成年人&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 单行简写（不需要花括号）</span>
<span class="line">^k:: Send &quot;快捷发送&quot;</span>
<span class="line"></span>
<span class="line">if (x &gt; 0)</span>
<span class="line">    MsgBox &quot;正数&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>推荐</strong>：始终使用花括号，即使只有一行代码。这样更清晰、更不容易出错。</p></blockquote><h2 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串"><span>字符串</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">; 双引号字符串</span>
<span class="line">s1 := &quot;Hello World&quot;</span>
<span class="line"></span>
<span class="line">; 字符串中的引号用转义</span>
<span class="line">s2 := &quot;He said \\&quot;Hi\\&quot;&quot;</span>
<span class="line"></span>
<span class="line">; 字符串拼接</span>
<span class="line">s3 := &quot;Hello&quot; &quot; &quot; &quot;World&quot;     ; 表达式拼接</span>
<span class="line">s4 := &quot;Hello&quot; name             ; 变量自动拼接</span>
<span class="line"></span>
<span class="line">; 用括号确保拼接顺序</span>
<span class="line">s5 := &quot;Age: &quot; (age + 1)       ; 先计算，再拼接</span>
<span class="line">s6 := &quot;Age: &quot; age + 1         ; 注意优先级！这可能不是你想要的</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字符串中的特殊字符" tabindex="-1"><a class="header-anchor" href="#字符串中的特殊字符"><span>字符串中的特殊字符</span></a></h3><table><thead><tr><th>转义</th><th>含义</th><th>示例</th></tr></thead><tbody><tr><td><code>\`n</code></td><td>换行</td><td><code>&quot;Line1</code>nLine2&quot;\`</td></tr><tr><td><code>\`r</code></td><td>回车</td><td><code>&quot;Text</code>r&quot;\`</td></tr><tr><td><code>\`t</code></td><td>Tab</td><td><code>&quot;Col1</code>tCol2&quot;\`</td></tr><tr><td><code>\`b</code></td><td>退格</td><td><code>&quot;Back</code>b&quot;\`</td></tr><tr><td><code>\`&quot;</code></td><td>双引号</td><td><code>&quot;He</code>&quot;said<code>&quot;&quot;</code></td></tr><tr><td><code></code> \`\`</td><td>反引号本身</td><td><code> &quot;A</code>B&quot; \`\`</td></tr><tr><td><code>\`,</code></td><td>逗号（在命令参数中）</td><td><code>&quot;a</code>, <code>&quot;b</code>&quot; \`</td></tr><tr><td><code>\`;</code></td><td>分号（行尾注释的;）</td><td><code>&quot;end</code>;not comment\`&quot;</td></tr></tbody></table><blockquote><p>AHK 用<strong>反引号</strong> <code>\`</code> 作为转义字符，不同于 C 语言的反斜杠 <code>\\</code>。</p></blockquote><h2 id="数字" tabindex="-1"><a class="header-anchor" href="#数字"><span>数字</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 整数</span>
<span class="line">i := 42</span>
<span class="line">i2 := -10</span>
<span class="line"></span>
<span class="line">; 十六进制</span>
<span class="line">hex := 0xFF        ; 255</span>
<span class="line"></span>
<span class="line">; 浮点数</span>
<span class="line">f := 3.14</span>
<span class="line">f2 := 1.0e3        ; 1000.0（科学计数法）</span>
<span class="line"></span></code></pre></div><h2 id="命令-vs-函数" tabindex="-1"><a class="header-anchor" href="#命令-vs-函数"><span>命令 vs 函数</span></a></h2><p>AHK v2 统一使用<strong>函数调用语法</strong>，所有命令都变成了函数：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; v1 命令式语法（v2 不支持）</span>
<span class="line">; MsgBox, Hello World</span>
<span class="line"></span>
<span class="line">; v2 函数式语法（唯一方式）</span>
<span class="line">MsgBox &quot;Hello World&quot;</span>
<span class="line"></span>
<span class="line">; 多参数函数</span>
<span class="line">MsgBox(&quot;确认删除？&quot;, &quot;警告&quot;, 4)  ; 标题、文本、图标类型</span>
<span class="line"></span></code></pre></div><h3 id="常用函数一览" tabindex="-1"><a class="header-anchor" href="#常用函数一览"><span>常用函数一览</span></a></h3><table><thead><tr><th>函数</th><th>用途</th><th>示例</th></tr></thead><tbody><tr><td><code>MsgBox</code></td><td>弹出消息框</td><td><code>MsgBox &quot;Hello&quot;</code></td></tr><tr><td><code>InputBox</code></td><td>输入对话框</td><td><code>InputBox(&quot;请输入名字&quot;)</code></td></tr><tr><td><code>ToolTip</code></td><td>提示浮窗</td><td><code>ToolTip &quot;提示文字&quot;</code></td></tr><tr><td><code>Sleep</code></td><td>等待毫秒</td><td><code>Sleep 1000</code></td></tr><tr><td><code>Send</code></td><td>发送按键</td><td><code>Send &quot;Hello&quot;</code></td></tr><tr><td><code>Run</code></td><td>运行程序</td><td><code>Run &quot;notepad.exe&quot;</code></td></tr><tr><td><code>FileExist</code></td><td>检查文件</td><td><code>FileExist(&quot;C:\\test.txt&quot;)</code></td></tr><tr><td><code>StrLen</code></td><td>字符串长度</td><td><code>StrLen(&quot;Hello&quot;)</code></td></tr></tbody></table><h2 id="指令-预处理指令" tabindex="-1"><a class="header-anchor" href="#指令-预处理指令"><span>#指令（预处理指令）</span></a></h2><p><code>#</code> 开头的指令在脚本加载时生效，不是运行时：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0     ; 指定所需版本</span>
<span class="line">#SingleInstance Force          ; 只允许一个脚本实例（强制替换旧的）</span>
<span class="line">#Warn All, StdOut              ; 开启所有警告输出</span>
<span class="line">#Include lib.ahk               ; 包含外部脚本</span>
<span class="line"></span></code></pre></div><table><thead><tr><th>指令</th><th>用途</th></tr></thead><tbody><tr><td><code>#Requires</code></td><td>指定 AHK 版本</td></tr><tr><td><code>#SingleInstance</code></td><td>单实例模式（Force/Ignore/Prompt）</td></tr><tr><td><code>#Include</code></td><td>包含其他脚本文件</td></tr><tr><td><code>#Warn</code></td><td>开启警告提示</td></tr><tr><td><code>#HotkeyInterval</code></td><td>热键频率限制</td></tr><tr><td><code>#MaxHotkeysPerInterval</code></td><td>最大热键数</td></tr></tbody></table><h2 id="代码组织结构" tabindex="-1"><a class="header-anchor" href="#代码组织结构"><span>代码组织结构</span></a></h2><p>一个完整的 AHK v2 脚本通常按以下顺序组织：</p><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; ===== 设置区 =====</span>
<span class="line">CoordMode &quot;Mouse&quot;, &quot;Screen&quot;   ; 鼠标坐标模式</span>
<span class="line">SetWorkingDir A_ScriptDir     ; 工作目录</span>
<span class="line"></span>
<span class="line">; ===== 全局变量区 =====</span>
<span class="line">appVersion := &quot;1.0&quot;</span>
<span class="line">appName := &quot;MyTool&quot;</span>
<span class="line"></span>
<span class="line">; ===== 热键区 =====</span>
<span class="line">^j:: Send &quot;Hello&quot;</span>
<span class="line">Esc:: ExitApp</span>
<span class="line"></span>
<span class="line">; ===== 热字符串区 =====</span>
<span class="line">:btw::by the way</span>
<span class="line"></span>
<span class="line">; ===== 函数区 =====</span>
<span class="line">MyFunc(param) {</span>
<span class="line">    return param * 2</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; ===== 定时器区 =====</span>
<span class="line">SetTimer CheckWindow, 1000</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>`,36),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/03-variables.html`},{default:r(()=>[...l[0]||=[e(`03-变量与数据类型`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};