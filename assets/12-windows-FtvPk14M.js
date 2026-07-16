import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/12-windows.html","title":"12 - 窗口操作","lang":"zh-CN","frontmatter":{"order":12,"description":"12 - 窗口操作 窗口匹配规则 AHK 操作窗口前需要识别目标窗口，有多种匹配方式： 窗口标题匹配模式 窗口激活与等待 WinActivate / WinActivateBottom WinWait / WinWaitActive / WinWaitClose 窗口信息获取 窗口列表 端口操作 WinClose / WinKill WinMove W...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"12 - 窗口操作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/12-windows.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"12 - 窗口操作"}],["meta",{"property":"og:description","content":"12 - 窗口操作 窗口匹配规则 AHK 操作窗口前需要识别目标窗口，有多种匹配方式： 窗口标题匹配模式 窗口激活与等待 WinActivate / WinActivateBottom WinWait / WinWaitActive / WinWaitClose 窗口信息获取 窗口列表 端口操作 WinClose / WinKill WinMove W..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":4.27,"words":1281},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/12-windows.md","autoDesc":true}`),u={name:`12-windows.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_12-窗口操作" tabindex="-1"><a class="header-anchor" href="#_12-窗口操作"><span>12 - 窗口操作</span></a></h1><h2 id="窗口匹配规则" tabindex="-1"><a class="header-anchor" href="#窗口匹配规则"><span>窗口匹配规则</span></a></h2><p>AHK 操作窗口前需要识别目标窗口，有多种匹配方式：</p><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 按窗口标题匹配</span>
<span class="line">WinActivate &quot;计算器&quot;</span>
<span class="line"></span>
<span class="line">; 按部分标题匹配（默认：包含即可）</span>
<span class="line">WinActivate &quot;Chrome&quot;       ; 任何标题包含&quot;Chrome&quot;的窗口</span>
<span class="line"></span>
<span class="line">; 按进程名匹配</span>
<span class="line">WinActivate &quot;ahk_exe notepad.exe&quot;</span>
<span class="line"></span>
<span class="line">; 按窗口类名匹配</span>
<span class="line">WinActivate &quot;ahk_class Notepad&quot;</span>
<span class="line"></span>
<span class="line">; 组合匹配</span>
<span class="line">WinActivate &quot;ahk_exe chrome.exe Chrome&quot;</span>
<span class="line"></span>
<span class="line">; &quot;A&quot; 表示当前活动窗口</span>
<span class="line">WinClose &quot;A&quot;              ; 关闭当前活动窗口</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="窗口标题匹配模式" tabindex="-1"><a class="header-anchor" href="#窗口标题匹配模式"><span>窗口标题匹配模式</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; SetTitleMatchMode 控制标题匹配方式</span>
<span class="line">; 模式1: 包含匹配（默认） — 标题包含指定文字就匹配</span>
<span class="line">SetTitleMatchMode 1</span>
<span class="line">WinActivate &quot;Chrome&quot;       ; 标题包含&quot;Chrome&quot;即匹配</span>
<span class="line"></span>
<span class="line">; 模式2: 从头匹配 — 标题以指定文字开头</span>
<span class="line">SetTitleMatchMode 2</span>
<span class="line">WinActivate &quot;Google&quot;       ; 标题以&quot;Google&quot;开头</span>
<span class="line"></span>
<span class="line">; 模式3: 精确匹配 — 标题完全等于指定文字</span>
<span class="line">SetTitleMatchMode 3</span>
<span class="line">WinActivate &quot;计算器&quot;        ; 标题必须完全等于&quot;计算器&quot;</span>
<span class="line"></span>
<span class="line">; RegEx 模式 — 正则表达式匹配</span>
<span class="line">SetTitleMatchMode &quot;RegEx&quot;</span>
<span class="line">WinActivate &quot;^Google.*Chrome&quot;  ; 标题匹配正则</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="窗口激活与等待" tabindex="-1"><a class="header-anchor" href="#窗口激活与等待"><span>窗口激活与等待</span></a></h2><h3 id="winactivate-winactivatebottom" tabindex="-1"><a class="header-anchor" href="#winactivate-winactivatebottom"><span>WinActivate / WinActivateBottom</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 激活窗口（将窗口带到前台）</span>
<span class="line">WinActivate &quot;计算器&quot;</span>
<span class="line"></span>
<span class="line">; 如果有多个匹配窗口，WinActivate 激活最近的</span>
<span class="line">; WinActivateBottom 激活最老的</span>
<span class="line">WinActivateBottom &quot;Chrome&quot;</span>
<span class="line"></span></code></pre></div><h3 id="winwait-winwaitactive-winwaitclose" tabindex="-1"><a class="header-anchor" href="#winwait-winwaitactive-winwaitclose"><span>WinWait / WinWaitActive / WinWaitClose</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; WinWait — 等待窗口出现</span>
<span class="line">WinWait &quot;计算器&quot;, , 10       ; 等最多10秒</span>
<span class="line">MsgBox &quot;计算器已出现&quot;</span>
<span class="line"></span>
<span class="line">; WinWaitActive — 等待窗口变为活动</span>
<span class="line">WinWaitActive &quot;计算器&quot;, , 5  ; 等最多5秒</span>
<span class="line"></span>
<span class="line">; WinWaitClose — 等待窗口关闭</span>
<span class="line">WinWaitClose &quot;计算器&quot;</span>
<span class="line">MsgBox &quot;计算器已关闭&quot;</span>
<span class="line"></span>
<span class="line">; 超时检查</span>
<span class="line">if !WinWait(&quot;计算器&quot;, , 5)</span>
<span class="line">    MsgBox &quot;5秒内计算器未出现&quot;</span>
<span class="line"></span></code></pre></div><h2 id="窗口信息获取" tabindex="-1"><a class="header-anchor" href="#窗口信息获取"><span>窗口信息获取</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; WinExist — 检查窗口是否存在（返回窗口ID或0）</span>
<span class="line">if WinExist(&quot;计算器&quot;)</span>
<span class="line">    MsgBox &quot;计算器正在运行&quot;</span>
<span class="line"></span>
<span class="line">; WinActive — 检查窗口是否活动</span>
<span class="line">if WinActive(&quot;计算器&quot;)</span>
<span class="line">    MsgBox &quot;计算器是活动窗口&quot;</span>
<span class="line"></span>
<span class="line">; WinGetTitle — 获取窗口标题</span>
<span class="line">title := WinGetTitle(&quot;A&quot;)        ; 当前活动窗口标题</span>
<span class="line">MsgBox title</span>
<span class="line"></span>
<span class="line">; WinGetClass — 获取窗口类名</span>
<span class="line">cls := WinGetClass(&quot;A&quot;)</span>
<span class="line">MsgBox cls</span>
<span class="line"></span>
<span class="line">; WinGetID — 获取窗口ID</span>
<span class="line">id := WinGetID(&quot;计算器&quot;)</span>
<span class="line"></span>
<span class="line">; WinGetPos — 获取窗口位置和大小</span>
<span class="line">WinGetPos &amp;x, &amp;y, &amp;w, &amp;h, &quot;计算器&quot;</span>
<span class="line">MsgBox &quot;位置: (&quot; x &quot;,&quot; y &quot;) 大小: &quot; w &quot;x&quot; h</span>
<span class="line"></span>
<span class="line">; WinGetProcessName — 获取进程名</span>
<span class="line">proc := WinGetProcessName(&quot;A&quot;)</span>
<span class="line">MsgBox &quot;进程: &quot; proc</span>
<span class="line"></span>
<span class="line">; WinGetText — 获取窗口文本</span>
<span class="line">text := WinGetText(&quot;计算器&quot;)</span>
<span class="line">MsgBox text</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="窗口列表" tabindex="-1"><a class="header-anchor" href="#窗口列表"><span>窗口列表</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; WinGetList — 获取所有匹配窗口ID列表</span>
<span class="line">ids := WinGetList(&quot;Chrome&quot;)</span>
<span class="line">for i, id in ids {</span>
<span class="line">    title := WinGetTitle(id)</span>
<span class="line">    MsgBox &quot;Chrome窗口: &quot; title</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 获取所有窗口</span>
<span class="line">ids := WinGetList()</span>
<span class="line">for i, id in ids {</span>
<span class="line">    MsgBox WinGetTitle(id)</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="端口操作" tabindex="-1"><a class="header-anchor" href="#端口操作"><span>端口操作</span></a></h2><h3 id="winclose-winkill" tabindex="-1"><a class="header-anchor" href="#winclose-winkill"><span>WinClose / WinKill</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; WinClose — 优雅关闭（发送WM_CLOSE消息）</span>
<span class="line">WinClose &quot;计算器&quot;</span>
<span class="line"></span>
<span class="line">; WinKill — 强制关闭（3秒后如果还没关就强制终止进程）</span>
<span class="line">WinKill &quot;顽固窗口&quot;</span>
<span class="line"></span>
<span class="line">; 等待关闭</span>
<span class="line">WinClose &quot;计算器&quot;</span>
<span class="line">WinWaitClose &quot;计算器&quot;, , 5    ; 等最多5秒</span>
<span class="line"></span></code></pre></div><h3 id="winmove" tabindex="-1"><a class="header-anchor" href="#winmove"><span>WinMove</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 移动和调整窗口大小</span>
<span class="line">; WinMove 标题, 文本, x, y, 宽, 高</span>
<span class="line">WinMove &quot;计算器&quot;, , 100, 100, 500, 400</span>
<span class="line"></span>
<span class="line">; 只移动不调整大小</span>
<span class="line">WinMove &quot;计算器&quot;, , 100, 100</span>
<span class="line"></span>
<span class="line">; 只调整大小不移动</span>
<span class="line">WinMove &quot;计算器&quot;, , , , 800, 600</span>
<span class="line"></span>
<span class="line">; 居中窗口</span>
<span class="line">CenterWindow(title) {</span>
<span class="line">    WinGetPos &amp;x, &amp;y, &amp;w, &amp;h, title</span>
<span class="line">    newX := (A_ScreenWidth - w) // 2</span>
<span class="line">    newY := (A_ScreenHeight - h) // 2</span>
<span class="line">    WinMove title, , newX, newY</span>
<span class="line">}</span>
<span class="line">CenterWindow(&quot;计算器&quot;)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="winminimize-winmaximize-winrestore" tabindex="-1"><a class="header-anchor" href="#winminimize-winmaximize-winrestore"><span>WinMinimize / WinMaximize / WinRestore</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 最小化</span>
<span class="line">WinMinimize &quot;计算器&quot;</span>
<span class="line"></span>
<span class="line">; 最大化</span>
<span class="line">WinMaximize &quot;计算器&quot;</span>
<span class="line"></span>
<span class="line">; 还原</span>
<span class="line">WinRestore &quot;计算器&quot;</span>
<span class="line"></span>
<span class="line">; 切换最大化/还原</span>
<span class="line">WinMaximize &quot;A&quot;   ; 如果已最大化则还原，否则最大化</span>
<span class="line"></span></code></pre></div><h3 id="winsetstyle-winsetalwaysontop-winsettransparent" tabindex="-1"><a class="header-anchor" href="#winsetstyle-winsetalwaysontop-winsettransparent"><span>WinSetStyle / WinSetAlwaysOnTop / WinSetTransparent</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 置顶/取消置顶</span>
<span class="line">WinSetAlwaysOnTop 1, &quot;计算器&quot;    ; 置顶</span>
<span class="line">WinSetAlwaysOnTop -1, &quot;计算器&quot;   ; 切换置顶</span>
<span class="line">WinSetAlwaysOnTop 0, &quot;计算器&quot;    ; 取消置顶</span>
<span class="line"></span>
<span class="line">; 透明度（0=完全透明，255=完全不透明）</span>
<span class="line">WinSetTransparent 200, &quot;计算器&quot;  ; 半透明</span>
<span class="line">WinSetTransparent 0, &quot;计算器&quot;    ; 完全透明（但仍然可见和可交互）</span>
<span class="line">WinSetTransparent &quot;Off&quot;, &quot;计算器&quot; ; 关闭透明效果</span>
<span class="line"></span>
<span class="line">; 隐藏/显示窗口</span>
<span class="line">WinHide &quot;计算器&quot;</span>
<span class="line">WinShow &quot;计算器&quot;</span>
<span class="line"></span>
<span class="line">; 禁用/启用窗口（不能/可以交互）</span>
<span class="line">WinSetEnabled 0, &quot;计算器&quot;  ; 禁用</span>
<span class="line">WinSetEnabled 1, &quot;计算器&quot;  ; 启用</span>
<span class="line"></span>
<span class="line">; 修改窗口样式</span>
<span class="line">WinSetStyle &quot;-0xC00000&quot;, &quot;计算器&quot;  ; 移除标题栏</span>
<span class="line">WinSetStyle &quot;+0xC00000&quot;, &quot;计算器&quot;  ; 添加标题栏</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="等待窗口示例" tabindex="-1"><a class="header-anchor" href="#等待窗口示例"><span>等待窗口示例</span></a></h2><h3 id="等待并操作" tabindex="-1"><a class="header-anchor" href="#等待并操作"><span>等待并操作</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 打开计算器，等待出现后操作</span>
<span class="line">Run &quot;calc.exe&quot;</span>
<span class="line">WinWait &quot;计算器&quot;, , 5</span>
<span class="line">if WinExist(&quot;计算器&quot;) {</span>
<span class="line">    WinActivate &quot;计算器&quot;</span>
<span class="line">    WinMove &quot;计算器&quot;, , 100, 100</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="等待对话框" tabindex="-1"><a class="header-anchor" href="#等待对话框"><span>等待对话框</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 等待保存对话框</span>
<span class="line">WinWait &quot;另存为&quot;, , 10</span>
<span class="line">if WinExist(&quot;另存为&quot;) {</span>
<span class="line">    ControlSetText &quot;Edit1&quot;, &quot;C:\\MyFolder\\file.txt&quot;, &quot;另存为&quot;</span>
<span class="line">    ControlClick &quot;Button2&quot;, &quot;另存为&quot;   ; 点击保存</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="窗口组操作" tabindex="-1"><a class="header-anchor" href="#窗口组操作"><span>窗口组操作</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; GroupAdd — 将窗口加入组，方便批量操作</span>
<span class="line">GroupAdd &quot;Browsers&quot;, &quot;ahk_exe chrome.exe&quot;</span>
<span class="line">GroupAdd &quot;Browsers&quot;, &quot;ahk_exe firefox.exe&quot;</span>
<span class="line">GroupAdd &quot;Browsers&quot;, &quot;ahk_exe msedge.exe&quot;</span>
<span class="line"></span>
<span class="line">; 关闭组中所有窗口</span>
<span class="line">WinClose &quot;ahk_group Browsers&quot;</span>
<span class="line"></span>
<span class="line">; 激活组中下一个窗口（循环切换）</span>
<span class="line">WinActivate &quot;ahk_group Browsers&quot;</span>
<span class="line"></span></code></pre></div><h2 id="实用窗口脚本" tabindex="-1"><a class="header-anchor" href="#实用窗口脚本"><span>实用窗口脚本</span></a></h2><h3 id="快速窗口切换" tabindex="-1"><a class="header-anchor" href="#快速窗口切换"><span>快速窗口切换</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; Ctrl+\` 切换到上一个活动窗口</span>
<span class="line">^\`:: {</span>
<span class="line">    WinActivate &quot;ahk_id &quot; A_PriorWindowId</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; Alt+1~5 切换到指定窗口</span>
<span class="line">!1:: WinActivate &quot;Chrome&quot;</span>
<span class="line">!2:: WinActivate &quot;VSCode&quot;</span>
<span class="line">!3:: WinActivate &quot;计算器&quot;</span>
<span class="line"></span></code></pre></div><h3 id="窗口信息显示" tabindex="-1"><a class="header-anchor" href="#窗口信息显示"><span>窗口信息显示</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">^!w:: {    ; Ctrl+Alt+W 显示当前窗口信息</span>
<span class="line">    title := WinGetTitle(&quot;A&quot;)</span>
<span class="line">    cls := WinGetClass(&quot;A&quot;)</span>
<span class="line">    proc := WinGetProcessName(&quot;A&quot;)</span>
<span class="line">    WinGetPos &amp;x, &amp;y, &amp;w, &amp;h, &quot;A&quot;</span>
<span class="line">    MsgBox &quot;标题: &quot; title</span>
<span class="line">        . &quot;\`n类名: &quot; cls</span>
<span class="line">        . &quot;\`n进程: &quot; proc</span>
<span class="line">        . &quot;\`n位置: (&quot; x &quot;,&quot; y &quot;)&quot;</span>
<span class="line">        . &quot;\`n大小: &quot; w &quot;x&quot; h</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="批量窗口管理" tabindex="-1"><a class="header-anchor" href="#批量窗口管理"><span>批量窗口管理</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+M 最小化所有Chrome窗口</span>
<span class="line">^!m:: {</span>
<span class="line">    ids := WinGetList(&quot;ahk_exe chrome.exe&quot;)</span>
<span class="line">    for i, id in ids</span>
<span class="line">        WinMinimize &quot;ahk_id &quot; id</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+C 关闭所有Chrome窗口</span>
<span class="line">^!c:: {</span>
<span class="line">    ids := WinGetList(&quot;ahk_exe chrome.exe&quot;)</span>
<span class="line">    for i, id in ids</span>
<span class="line">        WinClose &quot;ahk_id &quot; id</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>`,39),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/13-controls.html`},{default:r(()=>[...l[0]||=[e(`13-控件操作`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};