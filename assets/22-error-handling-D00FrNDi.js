import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/22-error-handling.html","title":"22 - 错误处理与调试","lang":"zh-CN","frontmatter":{"order":22,"description":"22 - 错误处理与调试 try / catch / finally AHK v2 提供完整的异常处理机制： Error 对象属性 捕获特定错误类型 错误类型层级 抛出错误 调试技巧 MsgBox 调试 最简单直接的调试方式： ToolTip 调试 ToolTip 更轻量，不会阻塞脚本： OutputDebug OutputDebug 输出到调试器，不...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"22 - 错误处理与调试\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/22-error-handling.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"22 - 错误处理与调试"}],["meta",{"property":"og:description","content":"22 - 错误处理与调试 try / catch / finally AHK v2 提供完整的异常处理机制： Error 对象属性 捕获特定错误类型 错误类型层级 抛出错误 调试技巧 MsgBox 调试 最简单直接的调试方式： ToolTip 调试 ToolTip 更轻量，不会阻塞脚本： OutputDebug OutputDebug 输出到调试器，不..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.85,"words":1156},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/22-error-handling.md","autoDesc":true}`),u={name:`22-error-handling.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_22-错误处理与调试" tabindex="-1"><a class="header-anchor" href="#_22-错误处理与调试"><span>22 - 错误处理与调试</span></a></h1><h2 id="try-catch-finally" tabindex="-1"><a class="header-anchor" href="#try-catch-finally"><span>try / catch / finally</span></a></h2><p>AHK v2 提供完整的异常处理机制：</p><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">; 基本 try-catch</span>
<span class="line">try {</span>
<span class="line">    result := 10 / 0    ; 除零错误</span>
<span class="line">} catch Error as e {</span>
<span class="line">    MsgBox &quot;捕获错误: &quot; e.Message</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; try-catch-finally</span>
<span class="line">try {</span>
<span class="line">    f := FileOpen(&quot;C:\\nonexist.txt&quot;, &quot;r&quot;)</span>
<span class="line">    content := f.Read()</span>
<span class="line">    f.Close()</span>
<span class="line">} catch Error as e {</span>
<span class="line">    MsgBox &quot;文件读取失败: &quot; e.Message</span>
<span class="line">} finally {</span>
<span class="line">    MsgBox &quot;无论如何都会执行&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="error-对象属性" tabindex="-1"><a class="header-anchor" href="#error-对象属性"><span>Error 对象属性</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">try {</span>
<span class="line">    SomeFunction()</span>
<span class="line">} catch Error as e {</span>
<span class="line">    MsgBox &quot;类型: &quot; Type(e)      ; &quot;Error&quot; 或子类名</span>
<span class="line">    MsgBox &quot;消息: &quot; e.Message     ; 错误描述</span>
<span class="line">    MsgBox &quot;文件: &quot; e.File        ; 出错的脚本文件</span>
<span class="line">    MsgBox &quot;行号: &quot; e.Line        ; 出错的行号</span>
<span class="line">    MsgBox &quot;堆栈: &quot; e.Stack       ; 调用堆栈</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="捕获特定错误类型" tabindex="-1"><a class="header-anchor" href="#捕获特定错误类型"><span>捕获特定错误类型</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">try {</span>
<span class="line">    result := SomeOperation()</span>
<span class="line">} catch TypeError as e {</span>
<span class="line">    MsgBox &quot;类型错误: &quot; e.Message</span>
<span class="line">} catch ValueError as e {</span>
<span class="line">    MsgBox &quot;值错误: &quot; e.Message</span>
<span class="line">} catch Error as e {</span>
<span class="line">    MsgBox &quot;其他错误: &quot; e.Message</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="错误类型层级" tabindex="-1"><a class="header-anchor" href="#错误类型层级"><span>错误类型层级</span></a></h3><table><thead><tr><th>类型</th><th>说明</th></tr></thead><tbody><tr><td><code>Error</code></td><td>所有错误的基类</td></tr><tr><td><code>TypeError</code></td><td>类型相关错误</td></tr><tr><td><code>ValueError</code></td><td>值相关错误</td></tr><tr><td><code>RangeError</code></td><td>范围超出错误</td></tr><tr><td><code>IndexError</code></td><td>索引越界错误</td></tr><tr><td><code>TargetError</code></td><td>目标（窗口/控件）找不到</td></tr><tr><td><code>FileError</code></td><td>文件操作错误</td></tr><tr><td><code>OSError</code></td><td>操作系统相关错误</td></tr><tr><td><code>MemoryError</code></td><td>内存分配失败</td></tr><tr><td><code>ZeroDivisionError</code></td><td>除零错误</td></tr><tr><td><code>PropertyError</code></td><td>属性访问错误</td></tr></tbody></table><h3 id="抛出错误" tabindex="-1"><a class="header-anchor" href="#抛出错误"><span>抛出错误</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; throw 抛出错误</span>
<span class="line">CheckAge(age) {</span>
<span class="line">    if (age &lt; 0)</span>
<span class="line">        throw ValueError(&quot;年龄不能为负数: &quot; age, -1)</span>
<span class="line">    if (age &gt; 150)</span>
<span class="line">        throw RangeError(&quot;年龄超出范围: &quot; age, -1)</span>
<span class="line">    return true</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">try {</span>
<span class="line">    CheckAge(-5)</span>
<span class="line">} catch ValueError as e {</span>
<span class="line">    MsgBox e.Message    ; &quot;年龄不能为负数: -5&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; throw 也可以抛出自定义值</span>
<span class="line">throw &quot;自定义错误消息&quot;</span>
<span class="line"></span>
<span class="line">; throw Error 对象</span>
<span class="line">throw Error(&quot;出错了&quot;, A_LineNumber, A_ScriptName)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="调试技巧" tabindex="-1"><a class="header-anchor" href="#调试技巧"><span>调试技巧</span></a></h2><h3 id="msgbox-调试" tabindex="-1"><a class="header-anchor" href="#msgbox-调试"><span>MsgBox 调试</span></a></h3><p>最简单直接的调试方式：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 在关键位置插入 MsgBox</span>
<span class="line">x := CalculateSomething()</span>
<span class="line">MsgBox &quot;x 的值: &quot; x    ; 检查中间结果</span>
<span class="line"></span>
<span class="line">; 调试变量类型</span>
<span class="line">MsgBox &quot;type: &quot; Type(x) &quot; value: &quot; x</span>
<span class="line"></span>
<span class="line">; 调试数组</span>
<span class="line">for i, v in arr</span>
<span class="line">    MsgBox i &quot;: &quot; v</span>
<span class="line"></span></code></pre></div><h3 id="tooltip-调试" tabindex="-1"><a class="header-anchor" href="#tooltip-调试"><span>ToolTip 调试</span></a></h3><p>ToolTip 更轻量，不会阻塞脚本：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 显示调试信息但不阻塞</span>
<span class="line">result := SomeFunc()</span>
<span class="line">ToolTip &quot;result: &quot; result</span>
<span class="line">SetTimer () =&gt; ToolTip(), -3000    ; 3秒后清除</span>
<span class="line"></span></code></pre></div><h3 id="outputdebug" tabindex="-1"><a class="header-anchor" href="#outputdebug"><span>OutputDebug</span></a></h3><p>OutputDebug 输出到调试器，不阻塞脚本：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; OutputDebugString — 输出到调试器（如 DebugView）</span>
<span class="line">OutputDebug &quot;函数开始执行&quot;</span>
<span class="line">OutputDebug &quot;变量值: &quot; x</span>
<span class="line">OutputDebug &quot;函数结束&quot;</span>
<span class="line"></span>
<span class="line">; 用 DebugView (Sysinternals) 工具查看输出</span>
<span class="line">; 下载: https://learn.microsoft.com/en-us/sysinternals/downloads/debugview</span>
<span class="line"></span></code></pre></div><h3 id="a-调试变量" tabindex="-1"><a class="header-anchor" href="#a-调试变量"><span>A_ 调试变量</span></a></h3><table><thead><tr><th>变量</th><th>说明</th></tr></thead><tbody><tr><td><code>A_LineNumber</code></td><td>当前执行的行号</td></tr><tr><td><code>A_LineFile</code></td><td>当前执行的文件路径</td></tr><tr><td><code>A_ThisFunc</code></td><td>当前执行的函数名</td></tr><tr><td><code>A_ThisHotkey</code></td><td>最近触发的热键名</td></tr><tr><td><code>A_PriorHotkey</code></td><td>上一次触发的热键名</td></tr><tr><td><code>A_TimeSinceThisHotkey</code></td><td>当前热键触发后经过的毫秒数</td></tr><tr><td><code>A_TimeSincePriorHotkey</code></td><td>上次热键触发后经过的毫秒数</td></tr></tbody></table><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 在函数中获取调试信息</span>
<span class="line">MyFunc() {</span>
<span class="line">    OutputDebug &quot;进入 &quot; A_ThisFunc &quot; 行 &quot; A_LineNumber</span>
<span class="line">    ; ...</span>
<span class="line">    OutputDebug &quot;退出 &quot; A_ThisFunc</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="warn-警告指令" tabindex="-1"><a class="header-anchor" href="#warn-警告指令"><span>#Warn 警告指令</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; #Warn — 开启警告检测</span>
<span class="line">#Warn All, StdOut        ; 所有警告输出到标准输出</span>
<span class="line">#Warn All, MsgBox        ; 所有警告弹窗显示</span>
<span class="line">#Warn UseUnsetGlobal     ; 使用未设置的全局变量警告</span>
<span class="line">#Warn UseUnsetLocal      ; 使用未设置的局部变量警告</span>
<span class="line">#Warn LocalSameAsGlobal  ; 局部变量与全局同名警告</span>
<span class="line"></span></code></pre></div><h3 id="常用警告选项" tabindex="-1"><a class="header-anchor" href="#常用警告选项"><span>常用警告选项</span></a></h3><table><thead><tr><th>选项</th><th>说明</th></tr></thead><tbody><tr><td><code>All</code></td><td>所有警告</td></tr><tr><td><code>UseUnsetGlobal</code></td><td>使用未设置全局变量</td></tr><tr><td><code>UseUnsetLocal</code></td><td>使用未设置局部变量</td></tr><tr><td><code>LocalSameAsGlobal</code></td><td>局部变量与全局同名</td></tr><tr><td><code>ClassOverwrite</code></td><td>类名覆盖全局变量</td></tr></tbody></table><h2 id="调试最佳实践" tabindex="-1"><a class="header-anchor" href="#调试最佳实践"><span>调试最佳实践</span></a></h2><h3 id="_1-使用-try-catch-保护关键操作" tabindex="-1"><a class="header-anchor" href="#_1-使用-try-catch-保护关键操作"><span>1. 使用 try-catch 保护关键操作</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">SafeFileRead(path) {</span>
<span class="line">    try {</span>
<span class="line">        return FileRead(path)</span>
<span class="line">    } catch FileError as e {</span>
<span class="line">        MsgBox &quot;无法读取文件: &quot; path &quot;\`n错误: &quot; e.Message</span>
<span class="line">        return &quot;&quot;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="_2-验证输入参数" tabindex="-1"><a class="header-anchor" href="#_2-验证输入参数"><span>2. 验证输入参数</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">ProcessData(data) {</span>
<span class="line">    if !IsObject(data)</span>
<span class="line">        throw TypeError(&quot;data 必须是对象&quot;)</span>
<span class="line">    if data.Length = 0</span>
<span class="line">        throw ValueError(&quot;data 不能为空&quot;)</span>
<span class="line"></span>
<span class="line">    ; 安全处理...</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="_3-热键调试模式" tabindex="-1"><a class="header-anchor" href="#_3-热键调试模式"><span>3. 热键调试模式</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">global debugMode := false</span>
<span class="line"></span>
<span class="line">; Ctrl+D 切换调试模式</span>
<span class="line">^d:: {</span>
<span class="line">    debugMode := !debugMode</span>
<span class="line">    ToolTip debugMode ? &quot;调试模式 ON&quot; : &quot;调试模式 OFF&quot;</span>
<span class="line">    SetTimer () =&gt; ToolTip(), -2000</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 调试输出函数</span>
<span class="line">DebugLog(msg) {</span>
<span class="line">    if debugMode</span>
<span class="line">        OutputDebug msg</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 使用</span>
<span class="line">MyFunc() {</span>
<span class="line">    DebugLog &quot;进入 MyFunc&quot;</span>
<span class="line">    ; ...</span>
<span class="line">    DebugLog &quot;退出 MyFunc&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-错误日志记录" tabindex="-1"><a class="header-anchor" href="#_4-错误日志记录"><span>4. 错误日志记录</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">logFile := A_ScriptDir &quot;\\error.log&quot;</span>
<span class="line"></span>
<span class="line">LogError(e) {</span>
<span class="line">    timestamp := A_Now</span>
<span class="line">    entry := timestamp . &quot; | &quot; . Type(e) . &quot; | &quot; . e.Message</span>
<span class="line">        . &quot; | File: &quot; . e.File . &quot; Line: &quot; . e.Line . &quot;\`n&quot;</span>
<span class="line">    FileAppend entry, logFile</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 全局错误捕获</span>
<span class="line">OnError GlobalErrorHandler</span>
<span class="line"></span>
<span class="line">GlobalErrorHandler(e) {</span>
<span class="line">    LogError(e)</span>
<span class="line">    MsgBox &quot;发生错误: &quot; e.Message, &quot;错误&quot;, 16</span>
<span class="line">    return -1   ; 继续执行脚本（-1=继续，0=退出）</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 测试</span>
<span class="line">^t:: {</span>
<span class="line">    throw Error(&quot;测试错误&quot;)</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常见错误与解决" tabindex="-1"><a class="header-anchor" href="#常见错误与解决"><span>常见错误与解决</span></a></h2><h3 id="变量未定义" tabindex="-1"><a class="header-anchor" href="#变量未定义"><span>变量未定义</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 错误: 使用未赋值的变量</span>
<span class="line">MsgBox unknownVar    ; 可能报错或输出空值</span>
<span class="line"></span>
<span class="line">; 解决: 用 IsSet 检查</span>
<span class="line">if IsSet(unknownVar)</span>
<span class="line">    MsgBox unknownVar</span>
<span class="line">else</span>
<span class="line">    MsgBox &quot;变量未定义&quot;</span>
<span class="line"></span></code></pre></div><h3 id="窗口找不到" tabindex="-1"><a class="header-anchor" href="#窗口找不到"><span>窗口找不到</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 错误: 操作不存在的窗口</span>
<span class="line">WinActivate &quot;不存在的窗口&quot;   ; TargetError</span>
<span class="line"></span>
<span class="line">; 解决: 先检查</span>
<span class="line">if WinExist(&quot;目标窗口&quot;)</span>
<span class="line">    WinActivate &quot;目标窗口&quot;</span>
<span class="line">else</span>
<span class="line">    MsgBox &quot;窗口不存在&quot;</span>
<span class="line"></span></code></pre></div><h3 id="数组索引越界" tabindex="-1"><a class="header-anchor" href="#数组索引越界"><span>数组索引越界</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">arr := [1, 2, 3]</span>
<span class="line">; MsgBox arr[5]   ; 越界访问，返回空字符串（不是报错）</span>
<span class="line"></span>
<span class="line">; 但 Map 越界会报错</span>
<span class="line">m := Map(&quot;a&quot;, 1)</span>
<span class="line">; MsgBox m[&quot;b&quot;]   ; IndexError!</span>
<span class="line"></span>
<span class="line">; 解决: 用 Has 检查</span>
<span class="line">if m.Has(&quot;b&quot;)</span>
<span class="line">    MsgBox m[&quot;b&quot;]</span>
<span class="line"></span></code></pre></div><hr>`,46),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/23-script-organization.html`},{default:r(()=>[...l[0]||=[e(`23-脚本管理与组织`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};