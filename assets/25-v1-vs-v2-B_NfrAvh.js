import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/25-v1-vs-v2.html","title":"25 - AHK v1 与 v2 差异","lang":"zh-CN","frontmatter":{"order":25,"description":"25 - AHK v1 与 v2 差异 为什么有 v1 和 v2？ AHK v1 从 2003 年开始发展，语法以命令式为主，经历了多年累积，存在不少不一致的设计。AHK v2 从 2017 年开始重构，目标是建立一套更一致、更现代、更易用的语法体系。 当前状态： AHK v2 已正式发布，是官方推荐版本 AHK v1 维护模式（只修 bug，不再添加...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"25 - AHK v1 与 v2 差异\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/25-v1-vs-v2.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"25 - AHK v1 与 v2 差异"}],["meta",{"property":"og:description","content":"25 - AHK v1 与 v2 差异 为什么有 v1 和 v2？ AHK v1 从 2003 年开始发展，语法以命令式为主，经历了多年累积，存在不少不一致的设计。AHK v2 从 2017 年开始重构，目标是建立一套更一致、更现代、更易用的语法体系。 当前状态： AHK v2 已正式发布，是官方推荐版本 AHK v1 维护模式（只修 bug，不再添加..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":4.79,"words":1438},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/25-v1-vs-v2.md","autoDesc":true}`),u={name:`25-v1-vs-v2.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[4]||=n(`<h1 id="_25-ahk-v1-与-v2-差异" tabindex="-1"><a class="header-anchor" href="#_25-ahk-v1-与-v2-差异"><span>25 - AHK v1 与 v2 差异</span></a></h1><h2 id="为什么有-v1-和-v2" tabindex="-1"><a class="header-anchor" href="#为什么有-v1-和-v2"><span>为什么有 v1 和 v2？</span></a></h2><p>AHK v1 从 2003 年开始发展，语法以命令式为主，经历了多年累积，存在不少不一致的设计。AHK v2 从 2017 年开始重构，目标是建立一套更一致、更现代、更易用的语法体系。</p><p><strong>当前状态</strong>：</p><ul><li>AHK v2 已正式发布，是<strong>官方推荐版本</strong></li><li>AHK v1 维护模式（只修 bug，不再添加新功能）</li><li>新项目应该使用 v2</li></ul><h2 id="语法核心差异" tabindex="-1"><a class="header-anchor" href="#语法核心差异"><span>语法核心差异</span></a></h2><h3 id="赋值" tabindex="-1"><a class="header-anchor" href="#赋值"><span>赋值</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ===== v1 =====</span>
<span class="line">var = value          ; 传统赋值（字符串，不含表达式）</span>
<span class="line">var := value         ; 表达式赋值</span>
<span class="line"></span>
<span class="line">; v1 中两种赋值并存，容易混淆</span>
<span class="line">name = Hello         ; name = &quot;Hello&quot;（传统赋值）</span>
<span class="line">name := &quot;Hello&quot;      ; name = &quot;Hello&quot;（表达式赋值）</span>
<span class="line">count = 5            ; count = &quot;5&quot;（传统赋值，字符串！）</span>
<span class="line">count := 5           ; count = 5（表达式赋值，数字）</span>
<span class="line"></span>
<span class="line">; ===== v2 =====</span>
<span class="line">var := value         ; 统一用 :=，只有表达式赋值</span>
<span class="line">name := &quot;Hello&quot;</span>
<span class="line">count := 5</span>
<span class="line">; v1 的 var = value 在 v2 中不再支持</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="变量引用" tabindex="-1"><a class="header-anchor" href="#变量引用"><span>变量引用</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ===== v1 =====</span>
<span class="line">MsgBox, %var%        ; 百分号变量引用（命令参数中）</span>
<span class="line">MsgBox % &quot;Value: &quot; var  ; 强制表达式模式</span>
<span class="line"></span>
<span class="line">; ===== v2 =====</span>
<span class="line">MsgBox var           ; 变量直接使用，不需要 %var%</span>
<span class="line">MsgBox &quot;Value: &quot; var ; 表达式自动拼接</span>
<span class="line"></span></code></pre></div><h3 id="函数调用" tabindex="-1"><a class="header-anchor" href="#函数调用"><span>函数调用</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ===== v1 =====</span>
<span class="line">; 命令式调用（参数用逗号分隔，不用括号）</span>
<span class="line">MsgBox, Hello World</span>
<span class="line">FileRead, content, C:\\test.txt</span>
<span class="line"></span>
<span class="line">; 函数式调用（用括号）</span>
<span class="line">result := Add(1, 2)</span>
<span class="line"></span>
<span class="line">; ===== v2 =====</span>
<span class="line">; 统一函数式调用（所有命令变成函数）</span>
<span class="line">MsgBox &quot;Hello World&quot;</span>
<span class="line">content := FileRead(&quot;C:\\test.txt&quot;)</span>
<span class="line">result := Add(1, 2)</span>
<span class="line"></span></code></pre></div><h3 id="字符串拼接" tabindex="-1"><a class="header-anchor" href="#字符串拼接"><span>字符串拼接</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ===== v1 =====</span>
<span class="line">; 自动拼接（相邻项）只在表达式模式中有效</span>
<span class="line">msg := &quot;Hello&quot; . &quot; &quot; . &quot;World&quot;   ; . 运算符拼接</span>
<span class="line">msg = Hello %name%                ; 传统赋值中用 %var%</span>
<span class="line"></span>
<span class="line">; ===== v2 =====</span>
<span class="line">msg := &quot;Hello&quot; &quot; &quot; &quot;World&quot;        ; 表达式中自动拼接</span>
<span class="line">msg := &quot;Hello&quot; . &quot; &quot; . &quot;World&quot;    ; . 运算符也可用</span>
<span class="line">msg := &quot;Hello &quot; name              ; 变量自动拼接</span>
<span class="line"></span></code></pre></div><h3 id="热键定义" tabindex="-1"><a class="header-anchor" href="#热键定义"><span>热键定义</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ===== v1 =====</span>
<span class="line">^j::</span>
<span class="line">    Send, Hello</span>
<span class="line">    MsgBox, Done</span>
<span class="line">return               ; v1 热键块必须用 return 结尾</span>
<span class="line"></span>
<span class="line">; 单行热键</span>
<span class="line">^k:: Send, Hello</span>
<span class="line"></span>
<span class="line">; ===== v2 =====</span>
<span class="line">^j:: {</span>
<span class="line">    Send &quot;Hello&quot;</span>
<span class="line">    MsgBox &quot;Done&quot;</span>
<span class="line">}                    ; v2 用花括号，不需要 return</span>
<span class="line"></span>
<span class="line">; 单行热键</span>
<span class="line">^k:: Send &quot;Hello&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="if-else-语法" tabindex="-1"><a class="header-anchor" href="#if-else-语法"><span>if/else 语法</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ===== v1 =====</span>
<span class="line">if (x &gt; 0) {</span>
<span class="line">    MsgBox, Positive</span>
<span class="line">} else {</span>
<span class="line">    MsgBox, Negative</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; v1 还支持命令式 if（不推荐）</span>
<span class="line">IfExist, C:\\test.txt</span>
<span class="line">    MsgBox, File exists</span>
<span class="line"></span>
<span class="line">; ===== v2 =====</span>
<span class="line">if (x &gt; 0) {</span>
<span class="line">    MsgBox &quot;Positive&quot;</span>
<span class="line">} else {</span>
<span class="line">    MsgBox &quot;Negative&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 命令式 if 不再支持，全部用函数</span>
<span class="line">if FileExist(&quot;C:\\test.txt&quot;)</span>
<span class="line">    MsgBox &quot;File exists&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="命令-vs-函数对照表" tabindex="-1"><a class="header-anchor" href="#命令-vs-函数对照表"><span>命令 vs 函数对照表</span></a></h3><table><thead><tr><th>v1 命令</th><th>v2 函数</th></tr></thead><tbody><tr><td><code>MsgBox, text</code></td><td><code>MsgBox text</code></td></tr><tr><td><code>Send, text</code></td><td><code>Send text</code></td></tr><tr><td><code>Run, program</code></td><td><code>Run program</code></td></tr><tr><td><code>WinActivate, title</code></td><td><code>WinActivate title</code></td></tr><tr><td><code>WinClose, title</code></td><td><code>WinClose title</code></td></tr><tr><td><code>WinWait, title</code></td><td><code>WinWait title</code></td></tr><tr><td><code>FileRead, var, path</code></td><td><code>var := FileRead(path)</code></td></tr><tr><td><code>FileWrite, text, path</code></td><td><code>FileWrite text, path</code></td></tr><tr><td><code>FileAppend, text, path</code></td><td><code>FileAppend text, path</code></td></tr><tr><td><code>FileDelete, path</code></td><td><code>FileDelete path</code></td></tr><tr><td><code>Clipboard := text</code></td><td><code>A_Clipboard := text</code></td></tr><tr><td><code>Sleep, ms</code></td><td><code>Sleep ms</code></td></tr><tr><td><code>SetTimer, label, ms</code></td><td><code>SetTimer func, ms</code></td></tr><tr><td><code>Click, x, y</code></td><td><code>Click x, y</code></td></tr><tr><td><code>MouseMove, x, y</code></td><td><code>MouseMove x, y</code></td></tr><tr><td><code>ControlSend, keys, ctrl, win</code></td><td><code>ControlSend keys, ctrl, win</code></td></tr><tr><td><code>InputBox, var, prompt</code></td><td><code>var := InputBox(prompt)</code></td></tr><tr><td><code>IniRead, var, file, sec, key</code></td><td><code>var := IniRead(file, sec, key)</code></td></tr><tr><td><code>IniWrite, value, file, sec, key</code></td><td><code>IniWrite value, file, sec, key</code></td></tr></tbody></table><h3 id="剪贴板变量" tabindex="-1"><a class="header-anchor" href="#剪贴板变量"><span>剪贴板变量</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ===== v1 =====</span>
<span class="line">Clipboard := &quot;Hello&quot;        ; 变量名 Clipboard</span>
<span class="line">var := Clipboard            ; 读取</span>
<span class="line"></span>
<span class="line">; ===== v2 =====</span>
<span class="line">A_Clipboard := &quot;Hello&quot;      ; 变量名 A_Clipboard（加A_前缀）</span>
<span class="line">var := A_Clipboard          ; 读取</span>
<span class="line"></span></code></pre></div><h3 id="对象系统" tabindex="-1"><a class="header-anchor" href="#对象系统"><span>对象系统</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ===== v1 =====</span>
<span class="line">; v1 的 Object 是旧式键值对象</span>
<span class="line">obj := {}</span>
<span class="line">obj.key := &quot;value&quot;</span>
<span class="line">obj := Object(&quot;key&quot;, &quot;value&quot;)</span>
<span class="line"></span>
<span class="line">; 数组</span>
<span class="line">arr := []</span>
<span class="line">arr.Push(1)</span>
<span class="line"></span>
<span class="line">; ===== v2 =====</span>
<span class="line">; v2 有更规范的类型</span>
<span class="line">arr := [1, 2, 3]            ; Array</span>
<span class="line">m := Map(&quot;key&quot;, &quot;value&quot;)    ; Map（字典）</span>
<span class="line">obj := {key: &quot;value&quot;}        ; Object（简化语法）</span>
<span class="line">obj := Object()              ; Object</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>v2 的 <code>Map</code> 替代了 v1 中 Object 的字典用法，<code>Array</code> 更规范。</p></blockquote><h3 id="错误处理" tabindex="-1"><a class="header-anchor" href="#错误处理"><span>错误处理</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ===== v1 =====</span>
<span class="line">; v1 没有 try/catch，错误处理非常有限</span>
<span class="line">; 用 ErrorLevel 变量检查</span>
<span class="line">Run, notepad.exe</span>
<span class="line">if (ErrorLevel = &quot;ERROR&quot;)</span>
<span class="line">    MsgBox, Failed</span>
<span class="line"></span>
<span class="line">; ===== v2 =====</span>
<span class="line">; v2 有完整的 try/catch/finally</span>
<span class="line">try {</span>
<span class="line">    Run &quot;notepad.exe&quot;</span>
<span class="line">} catch Error as e {</span>
<span class="line">    MsgBox &quot;Failed: &quot; e.Message</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="hotif-vs-if" tabindex="-1"><a class="header-anchor" href="#hotif-vs-if"><span>#HotIf vs #If</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ===== v1 =====</span>
<span class="line">#If WinActive(&quot;Notepad&quot;)</span>
<span class="line">^c:: MsgBox, In Notepad</span>
<span class="line">#If</span>
<span class="line"></span>
<span class="line">; ===== v2 =====</span>
<span class="line">#HotIf WinActive(&quot;Notepad&quot;)</span>
<span class="line">^c:: MsgBox &quot;In Notepad&quot;</span>
<span class="line">#HotIf</span>
<span class="line"></span></code></pre></div><h2 id="迁移策略" tabindex="-1"><a class="header-anchor" href="#迁移策略"><span>迁移策略</span></a></h2><h3 id="_1-从-v1-到-v2-的迁移步骤" tabindex="-1"><a class="header-anchor" href="#_1-从-v1-到-v2-的迁移步骤"><span>1. 从 v1 到 v2 的迁移步骤</span></a></h3><ol><li><strong>确保脚本开头有 <code>#Requires AutoHotkey v2.0</code></strong></li><li><strong>把所有命令式调用改为函数式调用</strong></li><li><strong>把 <code>var = value</code> 改为 <code>var := value</code></strong></li><li><strong>把 <code>%var%</code> 改为直接使用变量名</strong></li><li><strong>把热键的 <code>return</code> 改为花括号 <code>{}</code></strong></li><li><strong>把 <code>Clipboard</code> 改为 <code>A_Clipboard</code></strong></li><li><strong>把 <code>#If</code> 改为 <code>#HotIf</code></strong></li><li><strong>把 <code>ErrorLevel</code> 改为 try/catch</strong></li><li><strong>把 Object 的字典用法改为 Map</strong></li></ol><h3 id="_2-常见迁移陷阱" tabindex="-1"><a class="header-anchor" href="#_2-常见迁移陷阱"><span>2. 常见迁移陷阱</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 陷阱1: 等号 vs 冒号等号</span>
<span class="line">; v1:</span>
<span class="line">x = Hello      ; 字符串赋值</span>
<span class="line">; v2 必须改为:</span>
<span class="line">x := &quot;Hello&quot;   ; 加引号！</span>
<span class="line"></span>
<span class="line">; 陷阱2: 百分号变量</span>
<span class="line">; v1:</span>
<span class="line">MsgBox, %x%</span>
<span class="line">; v2:</span>
<span class="line">MsgBox x       ; 不需要百分号</span>
<span class="line"></span>
<span class="line">; 陷阱3: 命令参数顺序</span>
<span class="line">; v1:</span>
<span class="line">FileRead, OutputVar, FilePath</span>
<span class="line">; v2:</span>
<span class="line">OutputVar := FileRead(FilePath)    ; 返回值，不是输出参数</span>
<span class="line"></span>
<span class="line">; 陷阱4: if 后面的逗号</span>
<span class="line">; v1:</span>
<span class="line">IfEqual, x, 1, MsgBox, Equal</span>
<span class="line">; v2:</span>
<span class="line">if (x = 1)</span>
<span class="line">    MsgBox &quot;Equal&quot;</span>
<span class="line"></span>
<span class="line">; 陷阱5: 热键 return</span>
<span class="line">; v1:</span>
<span class="line">^j::</span>
<span class="line">    Send, Hello</span>
<span class="line">return</span>
<span class="line">; v2:</span>
<span class="line">^j:: {</span>
<span class="line">    Send &quot;Hello&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 陷阱6: GoSub / Label</span>
<span class="line">; v1 支持 GoSub 跳转到标签</span>
<span class="line">GoSub, MyLabel</span>
<span class="line">MyLabel:</span>
<span class="line">    MsgBox, Hello</span>
<span class="line">return</span>
<span class="line">; v2 不支持 GoSub，改为函数调用</span>
<span class="line">MyLabel() {</span>
<span class="line">    MsgBox &quot;Hello&quot;</span>
<span class="line">}</span>
<span class="line">MyLabel()</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-不再支持的-v1-特性" tabindex="-1"><a class="header-anchor" href="#_3-不再支持的-v1-特性"><span>3. 不再支持的 v1 特性</span></a></h3><table><thead><tr><th>v1 特性</th><th>v2 替代</th></tr></thead><tbody><tr><td><code>var = value</code> 传统赋值</td><td><code>var := value</code></td></tr><tr><td><code>%var%</code> 百分号变量</td><td>直接变量名</td></tr><tr><td>命令式语法 <code>MsgBox, text</code></td><td>函数式 <code>MsgBox text</code></td></tr><tr><td><code>GoSub</code> / Labels</td><td>函数调用</td></tr><tr><td><code>ErrorLevel</code></td><td>try/catch + 返回值</td></tr><tr><td><code>#If</code></td><td><code>#HotIf</code></td></tr><tr><td><code>Clipboard</code></td><td><code>A_Clipboard</code></td></tr><tr><td><code>SetTimer, Label</code></td><td><code>SetTimer FuncObj</code></td></tr><tr><td>单行 if 无括号</td><td>建议使用括号</td></tr><tr><td><code>Loop, Read</code></td><td><code>Loop Read</code></td></tr><tr><td><code>Loop, Files</code></td><td><code>Loop Files</code></td></tr><tr><td><code>SplashImageOn</code></td><td>Gui 方式实现</td></tr></tbody></table><h2 id="共存与兼容" tabindex="-1"><a class="header-anchor" href="#共存与兼容"><span>共存与兼容</span></a></h2><h3 id="同时使用-v1-和-v2" tabindex="-1"><a class="header-anchor" href="#同时使用-v1-和-v2"><span>同时使用 v1 和 v2</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; v1 脚本开头</span>
<span class="line">#Requires AutoHotkey v1.1</span>
<span class="line"></span>
<span class="line">; v2 脚本开头</span>
<span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">; AHK 安装程序可以选择安装 v1 或 v2 或两者</span>
<span class="line">; .ahk 文件默认用 v2 打开</span>
<span class="line">; .ah1 文件扩展名用于 v1 脚本</span>
<span class="line">; .ah2 文件扩展名用于 v2 脚本</span>
<span class="line"></span></code></pre></div><h3 id="迁移辅助工具" tabindex="-1"><a class="header-anchor" href="#迁移辅助工具"><span>迁移辅助工具</span></a></h3><p>AHK 官方提供了迁移辅助工具：</p><ul><li><strong>AHK v1 to v2 Converter</strong> — 自动转换部分 v1 语法为 v2</li><li>不完美，需要手动检查和调整</li></ul><h2 id="学习建议" tabindex="-1"><a class="header-anchor" href="#学习建议"><span>学习建议</span></a></h2><ol><li><strong>新项目直接用 v2</strong> — 不要从 v1 开始</li><li><strong>已有 v1 脚本</strong> — 按需迁移，不必一次性全部转换</li><li><strong>v1 脚本可以和 v2 脚本并存</strong> — 不冲突</li><li><strong>本教程全程基于 v2</strong> — 按此教程学习即可</li></ol><hr>`,45),i(`p`,null,[l[1]||=i(`strong`,null,`恭喜！`,-1),l[2]||=e(` 你已完成 AutoHotkey 完整教程的学习。现在你已经具备了 AHK v2 的基础知识到进阶能力的完整知识体系。回到 `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/00-%E7%9B%AE%E5%BD%95%E4%B8%8E%E5%AF%BC%E8%88%AA.html`},{default:r(()=>[...l[0]||=[e(`目录`,-1)]]),_:1}),l[3]||=e(` 查看所有章节。`,-1)])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};