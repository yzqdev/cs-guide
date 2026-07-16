import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/24-practical-examples.html","title":"24 - 实用脚本实例","lang":"zh-CN","frontmatter":{"order":24,"description":"24 - 实用脚本实例 1. 窗口快速切换器 2. 文本转换工具集 3. 快速搜索选中文字 4. 自动重复按键 5. 窗口布局管理 6. 快速输入模板 7. 鼠标抖动防空闲 8. 批量文件重命名 9. 剪贴板历史管理器 10. 简单计时器/番茄钟 11. 自动填写表单 12. 系统信息快捷查看 下一步:","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"24 - 实用脚本实例\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/24-practical-examples.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"24 - 实用脚本实例"}],["meta",{"property":"og:description","content":"24 - 实用脚本实例 1. 窗口快速切换器 2. 文本转换工具集 3. 快速搜索选中文字 4. 自动重复按键 5. 窗口布局管理 6. 快速输入模板 7. 鼠标抖动防空闲 8. 批量文件重命名 9. 剪贴板历史管理器 10. 简单计时器/番茄钟 11. 自动填写表单 12. 系统信息快捷查看 下一步:"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":4.01,"words":1203},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/24-practical-examples.md","autoDesc":true}`),u={name:`24-practical-examples.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_24-实用脚本实例" tabindex="-1"><a class="header-anchor" href="#_24-实用脚本实例"><span>24 - 实用脚本实例</span></a></h1><h2 id="_1-窗口快速切换器" tabindex="-1"><a class="header-anchor" href="#_1-窗口快速切换器"><span>1. 窗口快速切换器</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; Alt+1~5 快速切换到指定窗口</span>
<span class="line">!1:: ActivateWindow(&quot;ahk_exe chrome.exe&quot;, &quot;Chrome&quot;)</span>
<span class="line">!2:: ActivateWindow(&quot;ahk_exe code.exe&quot;, &quot;VSCode&quot;)</span>
<span class="line">!3:: ActivateWindow(&quot;ahk_exe notepad.exe&quot;, &quot;记事本&quot;)</span>
<span class="line">!4:: ActivateWindow(&quot;ahk_exe explorer.exe&quot;, &quot;资源管理器&quot;)</span>
<span class="line">!5:: ActivateWindow(&quot;ahk_exe Telegram.exe&quot;, &quot;Telegram&quot;)</span>
<span class="line"></span>
<span class="line">ActivateWindow(identifier, name) {</span>
<span class="line">    if WinExist(identifier) {</span>
<span class="line">        WinActivate identifier</span>
<span class="line">    } else {</span>
<span class="line">        MsgBox name &quot; 未运行&quot;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; Alt+0 切换到上一个活动窗口</span>
<span class="line">!0:: WinActivate &quot;ahk_id &quot; A_PriorWindowId</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-文本转换工具集" tabindex="-1"><a class="header-anchor" href="#_2-文本转换工具集"><span>2. 文本转换工具集</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; Ctrl+Shift+U — 选中文字转大写</span>
<span class="line">^+u:: TransformSelection(StrUpper)</span>
<span class="line"></span>
<span class="line">; Ctrl+Shift+L — 选中文字转小写</span>
<span class="line">^+l:: TransformSelection(StrLower)</span>
<span class="line"></span>
<span class="line">; Ctrl+Shift+T — 选中文字首字母大写</span>
<span class="line">^+t:: TransformSelection(StrTitle)</span>
<span class="line"></span>
<span class="line">; Ctrl+Shift+R — 选中文字去除多余空白</span>
<span class="line">^+r:: TransformSelection(Trim)</span>
<span class="line"></span>
<span class="line">TransformSelection(func) {</span>
<span class="line">    saved := A_Clipboard</span>
<span class="line">    A_Clipboard := &quot;&quot;</span>
<span class="line">    Send &quot;^c&quot;</span>
<span class="line">    ClipWait 2</span>
<span class="line">    A_Clipboard := func(A_Clipboard)</span>
<span class="line">    Send &quot;^v&quot;</span>
<span class="line">    Sleep 100</span>
<span class="line">    A_Clipboard := saved</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-快速搜索选中文字" tabindex="-1"><a class="header-anchor" href="#_3-快速搜索选中文字"><span>3. 快速搜索选中文字</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; Ctrl+Shift+G — Google搜索选中文字</span>
<span class="line">^+g:: SearchSelected(&quot;https://www.google.com/search?q=&quot;)</span>
<span class="line"></span>
<span class="line">; Ctrl+Shift+B — 百度搜索选中文字</span>
<span class="line">^+b:: SearchSelected(&quot;https://www.baidu.com/s?wd=&quot;)</span>
<span class="line"></span>
<span class="line">; Ctrl+Shift+D — 在文档中搜索</span>
<span class="line">^+d:: SearchSelected(&quot;https://devdocs.io/#q=&quot;)</span>
<span class="line"></span>
<span class="line">SearchSelected(baseUrl) {</span>
<span class="line">    saved := A_Clipboard</span>
<span class="line">    A_Clipboard := &quot;&quot;</span>
<span class="line">    Send &quot;^c&quot;</span>
<span class="line">    ClipWait 2</span>
<span class="line">    if (A_Clipboard != &quot;&quot;) {</span>
<span class="line">        Run baseUrl A_Clipboard</span>
<span class="line">    }</span>
<span class="line">    A_Clipboard := saved</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-自动重复按键" tabindex="-1"><a class="header-anchor" href="#_4-自动重复按键"><span>4. 自动重复按键</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; 按住 F1 自动重复按键</span>
<span class="line">*$1:: AutoRepeat(&quot;1&quot;)</span>
<span class="line">*$2:: AutoRepeat(&quot;2&quot;)</span>
<span class="line">*$3:: AutoRepeat(&quot;3&quot;)</span>
<span class="line">*$4:: AutoRepeat(&quot;4&quot;)</span>
<span class="line">*$5:: AutoRepeat(&quot;5&quot;)</span>
<span class="line"></span>
<span class="line">AutoRepeat(key) {</span>
<span class="line">    Loop {</span>
<span class="line">        Send key</span>
<span class="line">        KeyWait key, &quot;U T0.1&quot;    ; 等按键释放（最多0.1秒）</span>
<span class="line">        if !GetKeyState(key, &quot;P&quot;)</span>
<span class="line">            break                 ; 按键已释放，退出循环</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-窗口布局管理" tabindex="-1"><a class="header-anchor" href="#_5-窗口布局管理"><span>5. 窗口布局管理</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+Left — 窗口移到左半屏</span>
<span class="line">^!Left:: MoveWindow(&quot;Left&quot;)</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+Right — 窗口移到右半屏</span>
<span class="line">^!Right:: MoveWindow(&quot;Right&quot;)</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+Up — 窗口最大化</span>
<span class="line">^!Up:: WinMaximize &quot;A&quot;</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+Down — 窗口还原</span>
<span class="line">^!Down:: WinRestore &quot;A&quot;</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+1 — 窗口移到左上四分之一</span>
<span class="line">^!1:: MoveWindow(&quot;TopLeft&quot;)</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+2 — 窗口移到右上四分之一</span>
<span class="line">^!2:: MoveWindow(&quot;TopRight&quot;)</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+3 — 窗口移到左下四分之一</span>
<span class="line">^!3:: MoveWindow(&quot;BottomLeft&quot;)</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+4 — 窗口移到右下四分之一</span>
<span class="line">^!4:: MoveWindow(&quot;BottomRight&quot;)</span>
<span class="line"></span>
<span class="line">MoveWindow(position) {</span>
<span class="line">    WinGetPos &amp;x, &amp;y, &amp;w, &amp;h, &quot;A&quot;</span>
<span class="line">    sw := A_ScreenWidth</span>
<span class="line">    sh := A_ScreenHeight</span>
<span class="line">    halfW := sw // 2</span>
<span class="line">    halfH := sh // 2</span>
<span class="line"></span>
<span class="line">    switch position {</span>
<span class="line">        case &quot;Left&quot;:</span>
<span class="line">            WinMove &quot;A&quot;, , 0, 0, halfW, sh</span>
<span class="line">        case &quot;Right&quot;:</span>
<span class="line">            WinMove &quot;A&quot;, , halfW, 0, halfW, sh</span>
<span class="line">        case &quot;TopLeft&quot;:</span>
<span class="line">            WinMove &quot;A&quot;, , 0, 0, halfW, halfH</span>
<span class="line">        case &quot;TopRight&quot;:</span>
<span class="line">            WinMove &quot;A&quot;, , halfW, 0, halfW, halfH</span>
<span class="line">        case &quot;BottomLeft&quot;:</span>
<span class="line">            WinMove &quot;A&quot;, , 0, halfH, halfW, halfH</span>
<span class="line">        case &quot;BottomRight&quot;:</span>
<span class="line">            WinMove &quot;A&quot;, , halfW, halfH, halfW, halfH</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-快速输入模板" tabindex="-1"><a class="header-anchor" href="#_6-快速输入模板"><span>6. 快速输入模板</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+E — 稍后插入邮箱</span>
<span class="line">^!e:: QuickPaste(&quot;myemail@example.com&quot;)</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+S — 稍后插入签名</span>
<span class="line">^!s:: QuickPaste(&quot;Best regards,\`nJohn Doe&quot;)</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+D — 稍后插入日期</span>
<span class="line">^!d:: QuickPaste(A_YYYY &quot;-&quot; A_MM &quot;-&quot; A_DD)</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+T — 稍后插入时间</span>
<span class="line">^!t:: QuickPaste(A_Hour &quot;:&quot; A_Min)</span>
<span class="line"></span>
<span class="line">QuickPaste(text) {</span>
<span class="line">    saved := A_Clipboard</span>
<span class="line">    A_Clipboard := text</span>
<span class="line">    ClipWait 1</span>
<span class="line">    Send &quot;^v&quot;</span>
<span class="line">    Sleep 100</span>
<span class="line">    A_Clipboard := saved</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-鼠标抖动防空闲" tabindex="-1"><a class="header-anchor" href="#_7-鼠标抖动防空闲"><span>7. 鼠标抖动防空闲</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+I — 启用/禁用防空闲</span>
<span class="line">^!i:: {</span>
<span class="line">    global antiIdle := !antiIdle</span>
<span class="line">    if antiIdle {</span>
<span class="line">        SetTimer AntiIdle, 240000    ; 每4分钟</span>
<span class="line">        ToolTip &quot;防空闲已启用&quot;</span>
<span class="line">    } else {</span>
<span class="line">        SetTimer AntiIdle, 0</span>
<span class="line">        ToolTip &quot;防空闲已禁用&quot;</span>
<span class="line">    }</span>
<span class="line">    SetTimer () =&gt; ToolTip(), -2000</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">AntiIdle() {</span>
<span class="line">    MouseMove 1, 0, 0, &quot;R&quot;</span>
<span class="line">    Sleep 50</span>
<span class="line">    MouseMove -1, 0, 0, &quot;R&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-批量文件重命名" tabindex="-1"><a class="header-anchor" href="#_8-批量文件重命名"><span>8. 批量文件重命名</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+R — 批量重命名当前目录下 .txt 文件</span>
<span class="line">^!r:: {</span>
<span class="line">    folder := FileSelectFolder(&quot;&quot;, &quot;选择文件夹&quot;)</span>
<span class="line">    if (folder = &quot;&quot;)</span>
<span class="line">        return</span>
<span class="line"></span>
<span class="line">    prefix := InputBox(&quot;输入新文件前缀&quot;, &quot;批量重命名&quot;)</span>
<span class="line">    if (prefix = &quot;&quot;)</span>
<span class="line">        return</span>
<span class="line"></span>
<span class="line">    count := 0</span>
<span class="line">    Loop Files folder &quot;\\*.txt&quot; {</span>
<span class="line">        newName := prefix &quot;_&quot; count + 1 &quot;.txt&quot;</span>
<span class="line">        FileMove A_LoopFileFullPath, folder &quot;\\&quot; newName</span>
<span class="line">        count++</span>
<span class="line">    }</span>
<span class="line">    MsgBox &quot;重命名了 &quot; count &quot; 个文件&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-剪贴板历史管理器" tabindex="-1"><a class="header-anchor" href="#_9-剪贴板历史管理器"><span>9. 剪贴板历史管理器</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">global clipHistory := []</span>
<span class="line">global maxHistory := 10</span>
<span class="line"></span>
<span class="line">OnClipboardChange RecordClip</span>
<span class="line"></span>
<span class="line">RecordClip(dataType) {</span>
<span class="line">    global clipHistory</span>
<span class="line">    if (dataType = 1 &amp;&amp; A_Clipboard != &quot;&quot;) {</span>
<span class="line">        ; 不重复记录相同内容</span>
<span class="line">        if (clipHistory.Length &gt; 0 &amp;&amp; clipHistory[clipHistory.Length] = A_Clipboard)</span>
<span class="line">            return</span>
<span class="line">        clipHistory.Push(A_Clipboard)</span>
<span class="line">        if (clipHistory.Length &gt; maxHistory)</span>
<span class="line">            clipHistory.RemoveAt(1)</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; Win+V — 显示剪贴板历史</span>
<span class="line">#v:: {</span>
<span class="line">    if (clipHistory.Length = 0) {</span>
<span class="line">        MsgBox &quot;剪贴板历史为空&quot;</span>
<span class="line">        return</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    list := &quot;&quot;</span>
<span class="line">    for i, clip in clipHistory {</span>
<span class="line">        preview := StrLen(clip) &gt; 60 ? SubStr(clip, 1, 60) . &quot;...&quot; : clip</span>
<span class="line">        list .= i &quot;. &quot; preview &quot;\`n&quot;</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    result := InputBox(list, &quot;剪贴板历史 — 输入序号粘贴&quot;, , 1)</span>
<span class="line">    if (result != &quot;&quot; &amp;&amp; IsInteger(result)) {</span>
<span class="line">        idx := Integer(result)</span>
<span class="line">        if (idx &gt;= 1 &amp;&amp; idx &lt;= clipHistory.Length) {</span>
<span class="line">            A_Clipboard := clipHistory[idx]</span>
<span class="line">            Send &quot;^v&quot;</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10-简单计时器-番茄钟" tabindex="-1"><a class="header-anchor" href="#_10-简单计时器-番茄钟"><span>10. 简单计时器/番茄钟</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">global pomodoroActive := false</span>
<span class="line">global pomodoroCount := 0</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+P — 开始25分钟番茄钟</span>
<span class="line">^!p:: {</span>
<span class="line">    if pomodoroActive {</span>
<span class="line">        MsgBox &quot;番茄钟正在进行中&quot;</span>
<span class="line">        return</span>
<span class="line">    }</span>
<span class="line">    pomodoroActive := true</span>
<span class="line">    SetTimer PomodoroEnd, -1500000    ; 25分钟 = 1500000毫秒</span>
<span class="line">    ToolTip &quot;番茄钟开始 (25分钟)&quot;</span>
<span class="line">    SetTimer () =&gt; ToolTip(), -5000</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">PomodoroEnd() {</span>
<span class="line">    global pomodoroActive, pomodoroCount</span>
<span class="line">    pomodoroActive := false</span>
<span class="line">    pomodoroCount++</span>
<span class="line">    MsgBox &quot;番茄钟结束！已完成 &quot; pomodoroCount &quot; 个\`n休息5分钟&quot;, &quot;番茄钟&quot;, 64</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+S — 查看番茄钟状态</span>
<span class="line">^!s:: {</span>
<span class="line">    MsgBox &quot;番茄钟: &quot; (pomodoroActive ? &quot;进行中&quot; : &quot;未开始&quot;)</span>
<span class="line">        . &quot;\`n已完成: &quot; pomodoroCount &quot; 个&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_11-自动填写表单" tabindex="-1"><a class="header-anchor" href="#_11-自动填写表单"><span>11. 自动填写表单</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+F — 自动填写登录表单</span>
<span class="line">^!f:: AutoFillForm(&quot;MyUsername&quot;, &quot;MyPassword&quot;)</span>
<span class="line"></span>
<span class="line">AutoFillForm(user, pass) {</span>
<span class="line">    saved := A_Clipboard</span>
<span class="line"></span>
<span class="line">    ; 复制用户名</span>
<span class="line">    A_Clipboard := user</span>
<span class="line">    ClipWait 1</span>
<span class="line">    Send &quot;^v&quot;</span>
<span class="line">    Send &quot;{Tab}&quot;</span>
<span class="line"></span>
<span class="line">    Sleep 100</span>
<span class="line"></span>
<span class="line">    ; 复制密码</span>
<span class="line">    A_Clipboard := pass</span>
<span class="line">    ClipWait 1</span>
<span class="line">    Send &quot;^v&quot;</span>
<span class="line">    Send &quot;{Enter}&quot;</span>
<span class="line"></span>
<span class="line">    A_Clipboard := saved</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_12-系统信息快捷查看" tabindex="-1"><a class="header-anchor" href="#_12-系统信息快捷查看"><span>12. 系统信息快捷查看</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+I — 显示系统信息</span>
<span class="line">^!i:: {</span>
<span class="line">    info := &quot;系统信息\`n&quot;</span>
<span class="line">        . &quot;================\`n&quot;</span>
<span class="line">        . &quot;计算机名: &quot; A_ComputerName &quot;\`n&quot;</span>
<span class="line">        . &quot;用户名: &quot; A_UserName &quot;\`n&quot;</span>
<span class="line">        . &quot;操作系统: &quot; A_OsVersion &quot;\`n&quot;</span>
<span class="line">        . &quot;64位系统: &quot; (A_Is64bitOS ? &quot;是&quot; : &quot;否&quot;) &quot;\`n&quot;</span>
<span class="line">        . &quot;屏幕: &quot; A_ScreenWidth &quot; x &quot; A_ScreenHeight &quot;\`n&quot;</span>
<span class="line">        . &quot;管理员: &quot; (A_IsAdmin ? &quot;是&quot; : &quot;否&quot;) &quot;\`n&quot;</span>
<span class="line">        . &quot;AHK版本: &quot; A_AhkVersion &quot;\`n&quot;</span>
<span class="line">        . &quot;脚本路径: &quot; A_ScriptFullPath &quot;\`n&quot;</span>
<span class="line">        . &quot;工作时间: &quot; A_WorkingDir &quot;\`n&quot;</span>
<span class="line">        . &quot;当前时间: &quot; A_Now</span>
<span class="line"></span>
<span class="line">    MsgBox info, &quot;系统信息&quot;, 64</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>`,26),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/25-v1-vs-v2.html`},{default:r(()=>[...l[0]||=[e(`25-AHK v1与v2差异`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};