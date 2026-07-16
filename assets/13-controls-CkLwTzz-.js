import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/13-controls.html","title":"13 - 控件操作","lang":"zh-CN","frontmatter":{"order":13,"description":"13 - 控件操作 控件操作概述 控件操作允许你直接与窗口内的 UI 元素交互，无需模拟键盘/鼠标操作。这种方式更稳定、更可靠。 控件识别 控件的 ClassNN 每个控件都有一个 ClassNN（类名+序号），如 Edit1、Button2、Listbox1： 控件文本 有些控件可以通过文本匹配（按钮上的文字等）： ControlSend — 向控件...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"13 - 控件操作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/13-controls.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"13 - 控件操作"}],["meta",{"property":"og:description","content":"13 - 控件操作 控件操作概述 控件操作允许你直接与窗口内的 UI 元素交互，无需模拟键盘/鼠标操作。这种方式更稳定、更可靠。 控件识别 控件的 ClassNN 每个控件都有一个 ClassNN（类名+序号），如 Edit1、Button2、Listbox1： 控件文本 有些控件可以通过文本匹配（按钮上的文字等）： ControlSend — 向控件..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.86,"words":1157},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/13-controls.md","autoDesc":true}`),u={name:`13-controls.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_13-控件操作" tabindex="-1"><a class="header-anchor" href="#_13-控件操作"><span>13 - 控件操作</span></a></h1><h2 id="控件操作概述" tabindex="-1"><a class="header-anchor" href="#控件操作概述"><span>控件操作概述</span></a></h2><p>控件操作允许你直接与窗口内的 UI 元素交互，无需模拟键盘/鼠标操作。这种方式更稳定、更可靠。</p><h2 id="控件识别" tabindex="-1"><a class="header-anchor" href="#控件识别"><span>控件识别</span></a></h2><h3 id="控件的-classnn" tabindex="-1"><a class="header-anchor" href="#控件的-classnn"><span>控件的 ClassNN</span></a></h3><p>每个控件都有一个 ClassNN（类名+序号），如 <code>Edit1</code>、<code>Button2</code>、<code>Listbox1</code>：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 查看控件的 ClassNN — 用 Window Spy 工具</span>
<span class="line">; 右键 AHK 托盘图标 → Window Spy</span>
<span class="line"></span>
<span class="line">; 或者用代码获取</span>
<span class="line">ctrlList := WinGetControls(&quot;计算器&quot;)</span>
<span class="line">for i, ctrl in ctrlList {</span>
<span class="line">    MsgBox ctrl   ; 显示所有控件的 ClassNN</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="控件文本" tabindex="-1"><a class="header-anchor" href="#控件文本"><span>控件文本</span></a></h3><p>有些控件可以通过文本匹配（按钮上的文字等）：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 用按钮文字识别</span>
<span class="line">ControlClick &quot;确定&quot;, &quot;对话框&quot;</span>
<span class="line">ControlClick &quot;Cancel&quot;, &quot;Save As&quot;</span>
<span class="line"></span>
<span class="line">; 用 ClassNN</span>
<span class="line">ControlClick &quot;Button1&quot;, &quot;对话框&quot;</span>
<span class="line"></span></code></pre></div><h2 id="controlsend-—-向控件发送按键" tabindex="-1"><a class="header-anchor" href="#controlsend-—-向控件发送按键"><span>ControlSend — 向控件发送按键</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ControlSend(按键, 控件, 窗口)</span>
<span class="line">ControlSend &quot;Hello World&quot;, &quot;Edit1&quot;, &quot;记事本&quot;</span>
<span class="line"></span>
<span class="line">; 发送特殊键</span>
<span class="line">ControlSend &quot;{Enter}&quot;, &quot;Edit1&quot;, &quot;记事本&quot;</span>
<span class="line"></span>
<span class="line">; 发送到控件，即使窗口不活动</span>
<span class="line">; 这是最稳定的输入方式——不需要窗口在前台</span>
<span class="line">WinActivate &quot;记事本&quot;       ; 不需要激活！</span>
<span class="line">ControlSend &quot;Hello&quot;, &quot;Edit1&quot;, &quot;记事本&quot;  ; 即使窗口在后台也能发送</span>
<span class="line"></span>
<span class="line">; 向整个窗口发送（不指定控件）</span>
<span class="line">ControlSend &quot;^a&quot;,, &quot;记事本&quot;   ; Ctrl+A 发送到记事本主窗口</span>
<span class="line"></span></code></pre></div><h3 id="controlsend-vs-send" tabindex="-1"><a class="header-anchor" href="#controlsend-vs-send"><span>ControlSend vs Send</span></a></h3><table><thead><tr><th>方式</th><th>需要窗口活动</th><th>可后台操作</th><th>稳定性</th></tr></thead><tbody><tr><td><code>Send</code></td><td>是</td><td>否</td><td>中</td></tr><tr><td><code>ControlSend</code></td><td>否</td><td>是</td><td>高</td></tr><tr><td><code>SendInput</code></td><td>是</td><td>否</td><td>高</td></tr></tbody></table><blockquote><p><code>ControlSend</code> 是最推荐的输入方式，因为它不依赖窗口状态。</p></blockquote><h2 id="controlclick-—-点击控件" tabindex="-1"><a class="header-anchor" href="#controlclick-—-点击控件"><span>ControlClick — 点击控件</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ControlClick(控件, 窗口, 按钮类型, 点击次数, 模式)</span>
<span class="line">ControlClick &quot;Button1&quot;, &quot;对话框&quot;              ; 左键单击</span>
<span class="line">ControlClick &quot;Button1&quot;, &quot;对话框&quot;, &quot;R&quot;          ; 右键单击</span>
<span class="line">ControlClick &quot;Button1&quot;, &quot;对话框&quot;, , 2          ; 双击</span>
<span class="line"></span>
<span class="line">; 用按钮文字匹配</span>
<span class="line">ControlClick &quot;确定&quot;, &quot;对话框&quot;</span>
<span class="line">ControlClick &quot;Cancel&quot;, &quot;另存为&quot;</span>
<span class="line"></span>
<span class="line">; 用坐标点击（相对控件）</span>
<span class="line">ControlClick &quot;x50 y20&quot;, &quot;Static1&quot;, &quot;对话框&quot;</span>
<span class="line"></span>
<span class="line">; 后台点击 — 窗口不需要活动</span>
<span class="line">ControlClick &quot;Button1&quot;, &quot;对话框&quot;, , , &quot;NA&quot;    ; NA = 不激活窗口</span>
<span class="line"></span></code></pre></div><h2 id="controlgettext-—-获取控件文本" tabindex="-1"><a class="header-anchor" href="#controlgettext-—-获取控件文本"><span>ControlGetText — 获取控件文本</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ControlGetText(控件, 窗口)</span>
<span class="line">text := ControlGetText(&quot;Edit1&quot;, &quot;记事本&quot;)</span>
<span class="line">MsgBox &quot;记事本内容: &quot; text</span>
<span class="line"></span>
<span class="line">; 获取下拉框选中项</span>
<span class="line">selection := ControlGetText(&quot;ComboBox1&quot;, &quot;设置&quot;)</span>
<span class="line"></span>
<span class="line">; 获取按钮文字</span>
<span class="line">btnText := ControlGetText(&quot;Button1&quot;, &quot;对话框&quot;)</span>
<span class="line">MsgBox btnText    ; &quot;确定&quot; 或 &quot;Cancel&quot;</span>
<span class="line"></span></code></pre></div><h2 id="controlsettext-—-设置控件文本" tabindex="-1"><a class="header-anchor" href="#controlsettext-—-设置控件文本"><span>ControlSetText — 设置控件文本</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ControlSetText(控件, 文本, 窗口)</span>
<span class="line">ControlSetText &quot;Edit1&quot;, &quot;Hello AHK v2!&quot;, &quot;记事本&quot;</span>
<span class="line"></span>
<span class="line">; 设置文件路径（另存为对话框）</span>
<span class="line">WinWait &quot;另存为&quot;</span>
<span class="line">ControlSetText &quot;Edit1&quot;, &quot;C:\\MyFolder\\file.txt&quot;, &quot;另存为&quot;</span>
<span class="line">ControlClick &quot;Button2&quot;, &quot;另存为&quot;   ; 点击保存</span>
<span class="line"></span></code></pre></div><h2 id="controlchoose-—-选择控件项" tabindex="-1"><a class="header-anchor" href="#controlchoose-—-选择控件项"><span>ControlChoose — 选择控件项</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 选择下拉框的指定项（按索引，从1开始）</span>
<span class="line">ControlChoose 3, &quot;ComboBox1&quot;, &quot;设置&quot;    ; 选择第3项</span>
<span class="line"></span>
<span class="line">; 选择列表框的指定项</span>
<span class="line">ControlChoose 2, &quot;ListBox1&quot;, &quot;对话框&quot;</span>
<span class="line"></span>
<span class="line">; 选择 Tab 控件的指定页</span>
<span class="line">ControlChoose 1, &quot;SysTabControl321&quot;, &quot;属性&quot;</span>
<span class="line"></span></code></pre></div><h3 id="controlchoosestring-—-按文字选择" tabindex="-1"><a class="header-anchor" href="#controlchoosestring-—-按文字选择"><span>ControlChooseString — 按文字选择</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 选择下拉框中文字匹配的项</span>
<span class="line">ControlChooseString &quot;English&quot;, &quot;ComboBox1&quot;, &quot;语言设置&quot;</span>
<span class="line"></span></code></pre></div><h2 id="其他控件函数" tabindex="-1"><a class="header-anchor" href="#其他控件函数"><span>其他控件函数</span></a></h2><h3 id="controlget-controlset" tabindex="-1"><a class="header-anchor" href="#controlget-controlset"><span>ControlGet / ControlSet</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 获取控件的各种属性</span>
<span class="line">; ControlGet(命令, 值, 控件, 窗口)</span>
<span class="line"></span>
<span class="line">; 检查控件是否可见</span>
<span class="line">visible := ControlGetVisible(&quot;Button1&quot;, &quot;对话框&quot;)</span>
<span class="line"></span>
<span class="line">; 检查控件是否启用</span>
<span class="line">enabled := ControlGetEnabled(&quot;Edit1&quot;, &quot;记事本&quot;)</span>
<span class="line"></span>
<span class="line">; 获取控件位置</span>
<span class="line">ControlGetPos &amp;x, &amp;y, &amp;w, &amp;h, &quot;Button1&quot;, &quot;对话框&quot;</span>
<span class="line">MsgBox &quot;控件位置: (&quot; x &quot;,&quot; y &quot;) 大小: &quot; w &quot;x&quot; h</span>
<span class="line"></span>
<span class="line">; 获取列表框项目数</span>
<span class="line">count := ControlGetItems(&quot;ListBox1&quot;, &quot;对话框&quot;).Length</span>
<span class="line"></span>
<span class="line">; 获取当前选中行号</span>
<span class="line">line := ControlGetCurrentCol(&quot;Edit1&quot;, &quot;记事本&quot;)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="controlfocus-controlmove-controlhide-controlshow" tabindex="-1"><a class="header-anchor" href="#controlfocus-controlmove-controlhide-controlshow"><span>ControlFocus / ControlMove / ControlHide / ControlShow</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 聚焦控件</span>
<span class="line">ControlFocus &quot;Edit1&quot;, &quot;记事本&quot;</span>
<span class="line"></span>
<span class="line">; 移动控件</span>
<span class="line">ControlMove &quot;Button1&quot;, 10, 20, 100, 30, &quot;对话框&quot;</span>
<span class="line"></span>
<span class="line">; 隐藏/显示控件</span>
<span class="line">ControlHide &quot;Button1&quot;, &quot;对话框&quot;</span>
<span class="line">ControlShow &quot;Button1&quot;, &quot;对话框&quot;</span>
<span class="line"></span></code></pre></div><h2 id="控件列表获取" tabindex="-1"><a class="header-anchor" href="#控件列表获取"><span>控件列表获取</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 获取窗口所有控件 ClassNN</span>
<span class="line">ctrls := WinGetControls(&quot;计算器&quot;)</span>
<span class="line">for i, ctrl in ctrls {</span>
<span class="line">    MsgBox ctrl</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 获取控件类名列表</span>
<span class="line">ctrlsH := WinGetControlsHwnd(&quot;计算器&quot;)</span>
<span class="line">for i, hwnd in ctrlsH {</span>
<span class="line">    MsgBox &quot;控件句柄: &quot; hwnd</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 获取控件数量</span>
<span class="line">count := WinGetControls(&quot;计算器&quot;).Length</span>
<span class="line">MsgBox count</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实用控件脚本" tabindex="-1"><a class="header-anchor" href="#实用控件脚本"><span>实用控件脚本</span></a></h2><h3 id="自动填写表单" tabindex="-1"><a class="header-anchor" href="#自动填写表单"><span>自动填写表单</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+F 自动填写登录表单</span>
<span class="line">^!f:: {</span>
<span class="line">    WinWait &quot;登录&quot;, , 5</span>
<span class="line">    if WinExist(&quot;登录&quot;) {</span>
<span class="line">        ControlSetText &quot;Edit1&quot;, &quot;myusername&quot;, &quot;登录&quot;</span>
<span class="line">        ControlSetText &quot;Edit2&quot;, &quot;mypassword&quot;, &quot;登录&quot;</span>
<span class="line">        ControlClick &quot;Button1&quot;, &quot;登录&quot;     ; 点击登录按钮</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="记事本自动化" tabindex="-1"><a class="header-anchor" href="#记事本自动化"><span>记事本自动化</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+N 在记事本中输入文字</span>
<span class="line">^!n:: {</span>
<span class="line">    Run &quot;notepad.exe&quot;</span>
<span class="line">    WinWait &quot;无标题 - 记事本&quot;, , 3</span>
<span class="line">    if WinExist(&quot;记事本&quot;) {</span>
<span class="line">        ControlSetText &quot;Edit1&quot;, &quot;AutoHotkey 自动输入的文本\`n第二行\`n第三行&quot;, &quot;记事本&quot;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="treeview-listview-操作" tabindex="-1"><a class="header-anchor" href="#treeview-listview-操作"><span>TreeView / ListView 操作</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 获取 ListView 选中项</span>
<span class="line">selected := ControlGetItems(&quot;SysListView321&quot;, &quot;文件夹选项&quot;)</span>
<span class="line"></span>
<span class="line">; TreeView 操作</span>
<span class="line">ControlGetTree tmp, &quot;SysTreeView321&quot;, &quot;资源管理器&quot;</span>
<span class="line"></span></code></pre></div><blockquote><p>TreeView 和 ListView 操作较复杂，建议参考 AHK 官方文档的 GUI 控件部分。</p></blockquote><h2 id="窗口-spy-工具" tabindex="-1"><a class="header-anchor" href="#窗口-spy-工具"><span>窗口 Spy 工具</span></a></h2><p>Window Spy 是 AHK 内置的窗口信息查看工具，是控件操作的必备辅助：</p><ol><li>右键 AHK 托盘图标 → Window Spy</li><li>鼠标移到目标控件上，Window Spy 会显示： <ul><li>窗口标题、类名、进程名</li><li>控件的 ClassNN</li><li>鼠标坐标（Screen/Window/Client）</li><li>控件文字</li></ul></li></ol><blockquote><p><strong>建议</strong>：操作控件前，先用 Window Spy 确认控件的 ClassNN 和窗口标题。</p></blockquote><hr>`,45),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/14-send.html`},{default:r(()=>[...l[0]||=[e(`14-Send与键盘模拟`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};