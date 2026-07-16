import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/18-timers.html","title":"18 - 定时器与回调","lang":"zh-CN","frontmatter":{"order":18,"description":"18 - 定时器与回调 SetTimer SetTimer 是 AHK 的定时执行机制，每隔一段时间自动调用一个函数： 定时器管理 关闭定时器 修改定时器间隔 检查定时器状态 定时器与热键配合 热键控制定时器 定时器自毁 回调函数 回调函数是作为参数传递给其他函数、在特定时机被调用的函数： OnClipboardChange OnExit OnMess...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"18 - 定时器与回调\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/18-timers.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"18 - 定时器与回调"}],["meta",{"property":"og:description","content":"18 - 定时器与回调 SetTimer SetTimer 是 AHK 的定时执行机制，每隔一段时间自动调用一个函数： 定时器管理 关闭定时器 修改定时器间隔 检查定时器状态 定时器与热键配合 热键控制定时器 定时器自毁 回调函数 回调函数是作为参数传递给其他函数、在特定时机被调用的函数： OnClipboardChange OnExit OnMess..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.19,"words":958},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/18-timers.md","autoDesc":true}`),u={name:`18-timers.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_18-定时器与回调" tabindex="-1"><a class="header-anchor" href="#_18-定时器与回调"><span>18 - 定时器与回调</span></a></h1><h2 id="settimer" tabindex="-1"><a class="header-anchor" href="#settimer"><span>SetTimer</span></a></h2><p>SetTimer 是 AHK 的定时执行机制，每隔一段时间自动调用一个函数：</p><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; SetTimer(函数, 间隔毫秒)</span>
<span class="line">; 间隔 &gt; 0: 重复执行</span>
<span class="line">; 间隔 &lt; 0: 只执行一次（单次定时器）</span>
<span class="line"></span>
<span class="line">; 每1秒执行一次</span>
<span class="line">SetTimer MyTimer, 1000</span>
<span class="line"></span>
<span class="line">MyTimer() {</span>
<span class="line">    ToolTip A_Hour &quot;:&quot; A_Min &quot;:&quot; A_Sec</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 5秒后执行一次（单次）</span>
<span class="line">SetTimer OneShot, -5000</span>
<span class="line"></span>
<span class="line">OneShot() {</span>
<span class="line">    MsgBox &quot;5秒到了！&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 立即执行一次（间隔0）</span>
<span class="line">SetTimer Immediate, 0</span>
<span class="line"></span>
<span class="line">Immediate() {</span>
<span class="line">    MsgBox &quot;立即执行&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="定时器管理" tabindex="-1"><a class="header-anchor" href="#定时器管理"><span>定时器管理</span></a></h2><h3 id="关闭定时器" tabindex="-1"><a class="header-anchor" href="#关闭定时器"><span>关闭定时器</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 关闭定时器</span>
<span class="line">SetTimer MyTimer, 0       ; 0 = 关闭</span>
<span class="line"></span>
<span class="line">; 或者用函数引用</span>
<span class="line">SetTimer MyTimer, &quot;Off&quot;</span>
<span class="line"></span></code></pre></div><h3 id="修改定时器间隔" tabindex="-1"><a class="header-anchor" href="#修改定时器间隔"><span>修改定时器间隔</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 改变间隔</span>
<span class="line">SetTimer MyTimer, 500     ; 改为500毫秒</span>
<span class="line"></span>
<span class="line">; 切换定时器开关</span>
<span class="line">SetTimer MyTimer, &quot;Toggle&quot;   ; 开→关 或 关→开</span>
<span class="line"></span></code></pre></div><h3 id="检查定时器状态" tabindex="-1"><a class="header-anchor" href="#检查定时器状态"><span>检查定时器状态</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 定时器是否启用</span>
<span class="line">MsgBox A_TickCount   ; 获取脚本启动后的毫秒数</span>
<span class="line"></span></code></pre></div><h2 id="定时器与热键配合" tabindex="-1"><a class="header-anchor" href="#定时器与热键配合"><span>定时器与热键配合</span></a></h2><h3 id="热键控制定时器" tabindex="-1"><a class="header-anchor" href="#热键控制定时器"><span>热键控制定时器</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">global timerActive := false</span>
<span class="line"></span>
<span class="line">; Ctrl+T 启动/停止定时器</span>
<span class="line">^t:: {</span>
<span class="line">    timerActive := !timerActive</span>
<span class="line">    if timerActive {</span>
<span class="line">        SetTimer CheckWindow, 1000</span>
<span class="line">        ToolTip &quot;定时器已启动&quot;</span>
<span class="line">    } else {</span>
<span class="line">        SetTimer CheckWindow, 0</span>
<span class="line">        ToolTip &quot;定时器已停止&quot;</span>
<span class="line">    }</span>
<span class="line">    SetTimer () =&gt; ToolTip(), -2000</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">CheckWindow() {</span>
<span class="line">    title := WinGetTitle(&quot;A&quot;)</span>
<span class="line">    ToolTip &quot;当前窗口: &quot; title</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="定时器自毁" tabindex="-1"><a class="header-anchor" href="#定时器自毁"><span>定时器自毁</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 3秒后显示消息并自动关闭定时器</span>
<span class="line">SetTimer SelfDestruct, 3000</span>
<span class="line"></span>
<span class="line">SelfDestruct() {</span>
<span class="line">    MsgBox &quot;定时器执行完毕&quot;</span>
<span class="line">    SetTimer SelfDestruct, 0    ; 关闭自己</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="回调函数" tabindex="-1"><a class="header-anchor" href="#回调函数"><span>回调函数</span></a></h2><p>回调函数是作为参数传递给其他函数、在特定时机被调用的函数：</p><h3 id="onclipboardchange" tabindex="-1"><a class="header-anchor" href="#onclipboardchange"><span>OnClipboardChange</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 剪贴板变化回调</span>
<span class="line">OnClipboardChange ClipHandler</span>
<span class="line"></span>
<span class="line">ClipHandler(dataType) {</span>
<span class="line">    ToolTip &quot;剪贴板变化，类型: &quot; dataType</span>
<span class="line">    SetTimer () =&gt; ToolTip(), -3000</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="onexit" tabindex="-1"><a class="header-anchor" href="#onexit"><span>OnExit</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 脚本退出回调</span>
<span class="line">OnExit ExitHandler</span>
<span class="line"></span>
<span class="line">ExitHandler(exitReason) {</span>
<span class="line">    ; exitReason: &quot;Logoff&quot;, &quot;Shutdown&quot;, &quot;Close&quot;, &quot;Error&quot;, &quot;Single&quot;, &quot;Reload&quot;</span>
<span class="line">    if (exitReason != &quot;Reload&quot; &amp;&amp; exitReason != &quot;Single&quot;) {</span>
<span class="line">        MsgBox &quot;脚本即将退出，原因: &quot; exitReason</span>
<span class="line">    }</span>
<span class="line">    return false   ; false=允许退出，true=阻止退出</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="onmessage" tabindex="-1"><a class="header-anchor" href="#onmessage"><span>OnMessage</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 监听 Windows 消息</span>
<span class="line">OnMessage 0x100, KeyHandler    ; WM_KEYDOWN = 0x100</span>
<span class="line"></span>
<span class="line">KeyHandler(wParam, lParam, msg, hwnd) {</span>
<span class="line">    ToolTip &quot;按键消息: &quot; wParam</span>
<span class="line">    SetTimer () =&gt; ToolTip(), -1000</span>
<span class="line">    return 0</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="定时器高级模式" tabindex="-1"><a class="header-anchor" href="#定时器高级模式"><span>定时器高级模式</span></a></h2><h3 id="动态间隔定时器" tabindex="-1"><a class="header-anchor" href="#动态间隔定时器"><span>动态间隔定时器</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 根据条件改变定时器间隔</span>
<span class="line">SetTimer AdaptiveTimer, 1000</span>
<span class="line"></span>
<span class="line">AdaptiveTimer() {</span>
<span class="line">    title := WinGetTitle(&quot;A&quot;)</span>
<span class="line">    if InStr(title, &quot;Chrome&quot;) {</span>
<span class="line">        SetTimer AdaptiveTimer, 200   ; Chrome窗口时更频繁</span>
<span class="line">    } else {</span>
<span class="line">        SetTimer AdaptiveTimer, 1000  ; 其他窗口时正常频率</span>
<span class="line">    }</span>
<span class="line">    ToolTip title</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="定时器队列" tabindex="-1"><a class="header-anchor" href="#定时器队列"><span>定时器队列</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 多个定时器同时运行</span>
<span class="line">SetTimer Timer1, 1000</span>
<span class="line">SetTimer Timer2, 2000</span>
<span class="line">SetTimer Timer3, 5000</span>
<span class="line"></span>
<span class="line">Timer1() {</span>
<span class="line">    ToolTip &quot;Timer1: &quot; A_Sec</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">Timer2() {</span>
<span class="line">    ToolTip &quot;Timer2: &quot; A_Min</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">Timer3() {</span>
<span class="line">    MsgBox &quot;Timer5秒触发&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="精确计时" tabindex="-1"><a class="header-anchor" href="#精确计时"><span>精确计时</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; A_TickCount — 系统启动后的毫秒数，用于精确计时</span>
<span class="line">startTime := A_TickCount</span>
<span class="line"></span>
<span class="line">Sleep 1500</span>
<span class="line"></span>
<span class="line">elapsed := A_TickCount - startTime</span>
<span class="line">MsgBox &quot;经过 &quot; elapsed &quot; 毫秒&quot;   ; 约1500</span>
<span class="line"></span>
<span class="line">; 测量函数执行时间</span>
<span class="line">MeasureTime() {</span>
<span class="line">    start := A_TickCount</span>
<span class="line">    ; ... 执行一些操作 ...</span>
<span class="line">    Loop 1000 {</span>
<span class="line">        x := Random(1, 1000)</span>
<span class="line">    }</span>
<span class="line">    elapsed := A_TickCount - start</span>
<span class="line">    MsgBox &quot;耗时 &quot; elapsed &quot; 毫秒&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="定时器注意事项" tabindex="-1"><a class="header-anchor" href="#定时器注意事项"><span>定时器注意事项</span></a></h2><h3 id="定时器精度" tabindex="-1"><a class="header-anchor" href="#定时器精度"><span>定时器精度</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 定时器精度大约是 10-15ms（受系统时钟精度影响）</span>
<span class="line">; 不能依赖定时器做精确计时</span>
<span class="line"></span>
<span class="line">; 如果需要精确等待，用 Sleep</span>
<span class="line">Sleep 100   ; 精确等待100ms</span>
<span class="line"></span>
<span class="line">; 定时器间隔最短约 15ms</span>
<span class="line">SetTimer FastTimer, 15    ; 接近最短间隔</span>
<span class="line"></span></code></pre></div><h3 id="定时器与阻塞操作" tabindex="-1"><a class="header-anchor" href="#定时器与阻塞操作"><span>定时器与阻塞操作</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 定时器回调中不要有长时间阻塞操作</span>
<span class="line">; 如 MsgBox、InputBox 等（它们会暂停脚本）</span>
<span class="line"></span>
<span class="line">BadTimer() {</span>
<span class="line">    MsgBox &quot;这会阻塞其他定时器！&quot;   ; 不推荐</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">GoodTimer() {</span>
<span class="line">    ToolTip &quot;不阻塞&quot;                ; 推荐</span>
<span class="line">    SetTimer () =&gt; ToolTip(), -2000</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="定时器优先级" tabindex="-1"><a class="header-anchor" href="#定时器优先级"><span>定时器优先级</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 设置定时器优先级（数值越小优先级越高）</span>
<span class="line">SetTimer HighPriority, 1000, -1    ; 优先级-1（高）</span>
<span class="line">SetTimer LowPriority, 1000, 10     ; 优先级10（低）</span>
<span class="line"></span></code></pre></div><h2 id="实用定时器脚本" tabindex="-1"><a class="header-anchor" href="#实用定时器脚本"><span>实用定时器脚本</span></a></h2><h3 id="自动保存提醒" tabindex="-1"><a class="header-anchor" href="#自动保存提醒"><span>自动保存提醒</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; 每5分钟提醒保存</span>
<span class="line">SetTimer SaveReminder, 300000</span>
<span class="line"></span>
<span class="line">SaveReminder() {</span>
<span class="line">    if WinActive(&quot;ahk_exe notepad.exe&quot;) {</span>
<span class="line">        ToolTip &quot;别忘了保存文件！Ctrl+S&quot;</span>
<span class="line">        SetTimer () =&gt; ToolTip(), -5000</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="窗口切换提示" tabindex="-1"><a class="header-anchor" href="#窗口切换提示"><span>窗口切换提示</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">global lastWindow := &quot;&quot;</span>
<span class="line"></span>
<span class="line">SetTimer WindowWatcher, 500</span>
<span class="line"></span>
<span class="line">WindowWatcher() {</span>
<span class="line">    current := WinGetTitle(&quot;A&quot;)</span>
<span class="line">    if (current != lastWindow &amp;&amp; current != &quot;&quot;) {</span>
<span class="line">        ToolTip &quot;切换到: &quot; current</span>
<span class="line">        SetTimer () =&gt; ToolTip(), -3000</span>
<span class="line">        lastWindow := current</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="防空闲自动操作" tabindex="-1"><a class="header-anchor" href="#防空闲自动操作"><span>防空闲自动操作</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; 每4分钟移动鼠标，防止系统判定为空闲</span>
<span class="line">SetTimer AntiIdle, 240000</span>
<span class="line"></span>
<span class="line">AntiIdle() {</span>
<span class="line">    MouseMove 1, 0, 0, &quot;R&quot;    ; 向右移动1像素</span>
<span class="line">    Sleep 100</span>
<span class="line">    MouseMove -1, 0, 0, &quot;R&quot;  ; 向左移回</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><hr>`,46),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/19-gui.html`},{default:r(()=>[...l[0]||=[e(`19-GUI图形界面`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};