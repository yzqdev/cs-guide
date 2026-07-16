import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/09-hotkeys.html","title":"09 - 键盘热键","lang":"zh-CN","frontmatter":{"order":9,"description":"09 - 键盘热键 热键基础 热键是 AutoHotkey 最核心的功能。按下指定按键组合，触发一段代码： 修饰符符号 键名表 特殊键 数字键盘键 鼠标键（也可用作热键） 多键组合（序列热键） 上下文热键 热键只在特定窗口生效： 常用上下文条件 禁用和启用热键 Hotkey 函数 热键选项 热键的 Pass-through 长按热键（持续触发） 按键释...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"09 - 键盘热键\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/09-hotkeys.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"09 - 键盘热键"}],["meta",{"property":"og:description","content":"09 - 键盘热键 热键基础 热键是 AutoHotkey 最核心的功能。按下指定按键组合，触发一段代码： 修饰符符号 键名表 特殊键 数字键盘键 鼠标键（也可用作热键） 多键组合（序列热键） 上下文热键 热键只在特定窗口生效： 常用上下文条件 禁用和启用热键 Hotkey 函数 热键选项 热键的 Pass-through 长按热键（持续触发） 按键释..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":4.19,"words":1256},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/09-hotkeys.md","autoDesc":true}`),u={name:`09-hotkeys.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_09-键盘热键" tabindex="-1"><a class="header-anchor" href="#_09-键盘热键"><span>09 - 键盘热键</span></a></h1><h2 id="热键基础" tabindex="-1"><a class="header-anchor" href="#热键基础"><span>热键基础</span></a></h2><p>热键是 AutoHotkey 最核心的功能。按下指定按键组合，触发一段代码：</p><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; 格式: 修饰符+键名:: 代码块</span>
<span class="line"></span>
<span class="line">; Ctrl+J — 输出文字</span>
<span class="line">^j:: {</span>
<span class="line">    Send &quot;Hello from AHK!&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; Alt+F1 — 弹出消息</span>
<span class="line">!F1:: MsgBox &quot;Alt+F1 被按下&quot;</span>
<span class="line"></span>
<span class="line">; Win+Q — 退出脚本</span>
<span class="line">#q:: ExitApp</span>
<span class="line"></span>
<span class="line">; Esc — 退出脚本</span>
<span class="line">Esc:: ExitApp</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修饰符符号" tabindex="-1"><a class="header-anchor" href="#修饰符符号"><span>修饰符符号</span></a></h2><table><thead><tr><th>符号</th><th>修饰键</th><th>英文名</th></tr></thead><tbody><tr><td><code>^</code></td><td>Ctrl</td><td>Control</td></tr><tr><td><code>!</code></td><td>Alt</td><td>Alt</td></tr><tr><td><code>#</code></td><td>Win</td><td>Windows</td></tr><tr><td><code>+</code></td><td>Shift</td><td>Shift</td></tr><tr><td><code>&lt;</code></td><td>左侧修饰键</td><td>Left</td></tr><tr><td><code>&gt;</code></td><td>右侧修饰键</td><td>Right</td></tr></tbody></table><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 组合多个修饰键</span>
<span class="line">^!s:: MsgBox &quot;Ctrl+Alt+S&quot;    ; Ctrl+Alt+S</span>
<span class="line">^+c:: MsgBox &quot;Ctrl+Shift+C&quot;  ; Ctrl+Shift+C</span>
<span class="line">^!#f:: MsgBox &quot;Ctrl+Alt+Win+F&quot; ; Ctrl+Alt+Win+F</span>
<span class="line"></span>
<span class="line">; 指定左右修饰键</span>
<span class="line">&lt;^a:: MsgBox &quot;左Ctrl+A&quot;      ; 只有左Ctrl+A才触发</span>
<span class="line">&gt;!a:: MsgBox &quot;右Alt+A&quot;       ; 只有右Alt+A才触发</span>
<span class="line"></span></code></pre></div><h2 id="键名表" tabindex="-1"><a class="header-anchor" href="#键名表"><span>键名表</span></a></h2><h3 id="特殊键" tabindex="-1"><a class="header-anchor" href="#特殊键"><span>特殊键</span></a></h3><table><thead><tr><th>键名</th><th>按键</th></tr></thead><tbody><tr><td><code>F1</code> - <code>F12</code></td><td>F1 到 F12</td></tr><tr><td><code>Enter</code> / <code>Return</code></td><td>回车</td></tr><tr><td><code>Esc</code> / <code>Escape</code></td><td>Esc</td></tr><tr><td><code>Tab</code></td><td>Tab</td></tr><tr><td><code>Space</code></td><td>空格</td></tr><tr><td><code>Backspace</code> / <code>BS</code></td><td>退格</td></tr><tr><td><code>Delete</code> / <code>Del</code></td><td>Delete</td></tr><tr><td><code>Insert</code> / <code>Ins</code></td><td>Insert</td></tr><tr><td><code>Home</code></td><td>Home</td></tr><tr><td><code>End</code></td><td>End</td></tr><tr><td><code>PgUp</code> / <code>PageUp</code></td><td>Page Up</td></tr><tr><td><code>PgDn</code> / <code>PageDown</code></td><td>Page Down</td></tr><tr><td><code>Up</code></td><td>上箭头</td></tr><tr><td><code>Down</code></td><td>下箭头</td></tr><tr><td><code>Left</code></td><td>左箭头</td></tr><tr><td><code>Right</code></td><td>右箭头</td></tr><tr><td><code>CapsLock</code></td><td>大写锁定</td></tr><tr><td><code>ScrollLock</code></td><td>滚动锁定</td></tr><tr><td><code>NumLock</code></td><td>数字锁定</td></tr></tbody></table><h3 id="数字键盘键" tabindex="-1"><a class="header-anchor" href="#数字键盘键"><span>数字键盘键</span></a></h3><table><thead><tr><th>键名</th><th>按键</th></tr></thead><tbody><tr><td><code>Numpad0</code> - <code>Numpad9</code></td><td>数字键盘 0-9</td></tr><tr><td><code>NumpadDot</code></td><td>数字键盘小数点</td></tr><tr><td><code>NumpadEnter</code></td><td>数字键盘回车</td></tr><tr><td><code>NumpadAdd</code></td><td>数字键盘加号</td></tr><tr><td><code>NumpadSub</code></td><td>数字键盘减号</td></tr><tr><td><code>NumpadMult</code></td><td>数字键盘乘号</td></tr><tr><td><code>NumpadDiv</code></td><td>数字键盘除号</td></tr></tbody></table><h3 id="鼠标键-也可用作热键" tabindex="-1"><a class="header-anchor" href="#鼠标键-也可用作热键"><span>鼠标键（也可用作热键）</span></a></h3><table><thead><tr><th>键名</th><th>说明</th></tr></thead><tbody><tr><td><code>LButton</code></td><td>鼠标左键</td></tr><tr><td><code>RButton</code></td><td>鼠标右键</td></tr><tr><td><code>MButton</code></td><td>鼠标中键</td></tr></tbody></table><h2 id="多键组合-序列热键" tabindex="-1"><a class="header-anchor" href="#多键组合-序列热键"><span>多键组合（序列热键）</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 按键序列 — 不是同时按，而是依次按</span>
<span class="line">; q 然后按 b 然后按 p 触发</span>
<span class="line">q &amp; b &amp; p:: MsgBox &quot;依次按了 Q → B → P&quot;</span>
<span class="line"></span>
<span class="line">; 更常用的方式：自定义组合键</span>
<span class="line">; Numpad0 + Numpad1 同时按下触发</span>
<span class="line">Numpad0 &amp; Numpad1:: MsgBox &quot;0和1同时按&quot;</span>
<span class="line"></span>
<span class="line">; 单独按 Numpad0 不再发送原始按键（被热键覆盖了）</span>
<span class="line">; 如果想保留原始功能：</span>
<span class="line">Numpad0:: Send &quot;{Numpad0}&quot;  ; 恢复原始行为</span>
<span class="line"></span></code></pre></div><h2 id="上下文热键" tabindex="-1"><a class="header-anchor" href="#上下文热键"><span>上下文热键</span></a></h2><p>热键只在特定窗口生效：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; #HotIf 指令 — 后续热键只在条件满足时生效</span>
<span class="line">#HotIf WinActive(&quot;计算器&quot;)</span>
<span class="line">^c:: MsgBox &quot;在计算器中按了 Ctrl+C&quot;     ; 只在计算器窗口生效</span>
<span class="line">^v:: MsgBox &quot;在计算器中按了 Ctrl+V&quot;</span>
<span class="line"></span>
<span class="line">#HotIf WinActive(&quot;ahk_exe notepad.exe&quot;)</span>
<span class="line">^s:: MsgBox &quot;在记事本中按了 Ctrl+S&quot;     ; 只在记事本生效</span>
<span class="line"></span>
<span class="line">#HotIf                                     ; 恢复为全局热键</span>
<span class="line">^j:: MsgBox &quot;任何窗口都生效&quot;</span>
<span class="line"></span></code></pre></div><h3 id="常用上下文条件" tabindex="-1"><a class="header-anchor" href="#常用上下文条件"><span>常用上下文条件</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 按窗口标题匹配</span>
<span class="line">#HotIf WinActive(&quot;计算器&quot;)</span>
<span class="line"></span>
<span class="line">; 按进程名匹配</span>
<span class="line">#HotIf WinActive(&quot;ahk_exe chrome.exe&quot;)</span>
<span class="line"></span>
<span class="line">; 按窗口类名匹配</span>
<span class="line">#HotIf WinActive(&quot;ahk_class Notepad&quot;)</span>
<span class="line"></span>
<span class="line">; 自定义条件函数</span>
<span class="line">#HotIf IsInEditor()</span>
<span class="line"></span>
<span class="line">IsInEditor() {</span>
<span class="line">    return WinActive(&quot;ahk_exe code.exe&quot;) || WinActive(&quot;ahk_exe notepad.exe&quot;)</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">#HotIf IsInEditor()</span>
<span class="line">^d:: Send &quot;delete&quot;    ; 只在编辑器中生效</span>
<span class="line"></span>
<span class="line">#HotIf</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="禁用和启用热键" tabindex="-1"><a class="header-anchor" href="#禁用和启用热键"><span>禁用和启用热键</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 禁用热键 — 按键不再有原始功能（也不触发任何代码）</span>
<span class="line">^c:: MsgBox &quot;Ctrl+C 被拦截&quot;  ; Ctrl+C 不再复制</span>
<span class="line"></span>
<span class="line">; 让热键什么都不做（完全屏蔽按键）</span>
<span class="line">XButton1:: return    ; 鼠标X1键被屏蔽</span>
<span class="line"></span>
<span class="line">; 启用/禁用热键动态切换</span>
<span class="line">global hotkeysEnabled := true</span>
<span class="line"></span>
<span class="line">^j:: {</span>
<span class="line">    if hotkeysEnabled</span>
<span class="line">        Send &quot;Hello&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 切换函数</span>
<span class="line">ToggleHotkeys() {</span>
<span class="line">    global hotkeysEnabled</span>
<span class="line">    hotkeysEnabled := !hotkeysEnabled</span>
<span class="line">    if hotkeysEnabled {</span>
<span class="line">        Hotkey &quot;^j&quot;, On    ; 启用</span>
<span class="line">        ToolTip &quot;热键已启用&quot;</span>
<span class="line">    } else {</span>
<span class="line">        Hotkey &quot;^j&quot;, Off   ; 禁用</span>
<span class="line">        ToolTip &quot;热键已禁用&quot;</span>
<span class="line">    }</span>
<span class="line">    SetTimer () =&gt; ToolTip(), -2000</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">^t:: ToggleHotkeys()</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hotkey-函数" tabindex="-1"><a class="header-anchor" href="#hotkey-函数"><span>Hotkey 函数</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; Hotkey 命令 — 动态创建/管理热键</span>
<span class="line">Hotkey &quot;^!s&quot;, MyFunction        ; 动态创建 Ctrl+Alt+S 热键</span>
<span class="line">Hotkey &quot;^!s&quot;, &quot;Off&quot;             ; 禁用</span>
<span class="line">Hotkey &quot;^!s&quot;, &quot;On&quot;              ; 启用</span>
<span class="line">Hotkey &quot;^!s&quot;, &quot;AltTab&quot;          ; 改为系统功能</span>
<span class="line"></span>
<span class="line">MyFunction() {</span>
<span class="line">    MsgBox &quot;动态热键触发&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="热键选项" tabindex="-1"><a class="header-anchor" href="#热键选项"><span>热键选项</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; $ 前缀 — 防止 Send 触发热键（只响应物理按键）</span>
<span class="line">$^c:: Send &quot;^c&quot;   ; Send 发出的 Ctrl+C 不会再次触发此热键</span>
<span class="line"></span>
<span class="line">; ~ 前缀 — 不屏蔽按键原始功能</span>
<span class="line">~^s:: MsgBox &quot;Ctrl+S 被按下（仍执行保存）&quot;   ; Ctrl+S 原始功能保留</span>
<span class="line"></span>
<span class="line">; * 前缀 — 任意附加修饰键都可触发</span>
<span class="line">*c:: MsgBox &quot;C被按&quot;    ; 单按C、Ctrl+C、Alt+C等都能触发</span>
<span class="line"></span>
<span class="line">; 组合使用</span>
<span class="line">~$^c:: Send &quot;^c&quot;  ; 不屏蔽 + 不被 Send 触发</span>
<span class="line"></span></code></pre></div><table><thead><tr><th>前缀</th><th>作用</th></tr></thead><tbody><tr><td><code>$</code></td><td>只响应物理按键，Send 发出的不触发</td></tr><tr><td><code>~</code></td><td>不屏蔽原始按键功能</td></tr><tr><td><code>*</code></td><td>附加修饰键不影响触发</td></tr></tbody></table><h2 id="热键的-pass-through" tabindex="-1"><a class="header-anchor" href="#热键的-pass-through"><span>热键的 Pass-through</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 默认：热键会&quot;吃掉&quot;按键，系统收不到</span>
<span class="line">^c:: MsgBox &quot;拦截Ctrl+C&quot;  ; Ctrl+C不再复制</span>
<span class="line"></span>
<span class="line">; ~ 前缀：按键传给系统，同时触发热键</span>
<span class="line">~^c:: MsgBox &quot;Ctrl+C触发，但仍会复制&quot;  ; 复制仍然生效</span>
<span class="line"></span>
<span class="line">; 如果热键内用了 Send，可能需要 $ 防止递归</span>
<span class="line">$^c:: {</span>
<span class="line">    Send &quot;^c&quot;   ; 发送Ctrl+C</span>
<span class="line">    MsgBox &quot;自定义Ctrl+C&quot;   ; Send的^c不会再触发此热键（$保护）</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="长按热键-持续触发" tabindex="-1"><a class="header-anchor" href="#长按热键-持续触发"><span>长按热键（持续触发）</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 默认行为：按住时反复触发（受 #HotkeyInterval 控制）</span>
<span class="line">a:: Send &quot;x&quot;   ; 持续按a会反复发送x</span>
<span class="line"></span>
<span class="line">; 阻止反复触发</span>
<span class="line">a:: {</span>
<span class="line">    KeyWait &quot;a&quot;           ; 等待按键释放</span>
<span class="line">    Send &quot;x&quot;              ; 只触发一次</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="按键释放热键" tabindex="-1"><a class="header-anchor" href="#按键释放热键"><span>按键释放热键</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 按下触发 + 释放触发</span>
<span class="line">^a:: {</span>
<span class="line">    ToolTip &quot;Ctrl+A 按下&quot;</span>
<span class="line">    KeyWait &quot;a&quot;            ; 等待释放</span>
<span class="line">    ToolTip &quot;Ctrl+A 释放&quot;</span>
<span class="line">    SetTimer () =&gt; ToolTip(), -1000</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="热键调试技巧" tabindex="-1"><a class="header-anchor" href="#热键调试技巧"><span>热键调试技巧</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 列出所有热键</span>
<span class="line">ListHotkeys() {</span>
<span class="line">    for i, hk in A_HotkeyList</span>
<span class="line">        MsgBox hk</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 查看按键状态</span>
<span class="line">MsgBox GetKeyState(&quot;Ctrl&quot;)       ; 1=按下, 0=未按</span>
<span class="line">MsgBox GetKeyState(&quot;CapsLock&quot;, &quot;T&quot;)  ; T=切换状态 On/Off</span>
<span class="line">MsgBox GetKeyState(&quot;a&quot;, &quot;P&quot;)     ; P=物理状态（不被Send影响）</span>
<span class="line"></span></code></pre></div><hr>`,37),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/10-mouse.html`},{default:r(()=>[...l[0]||=[e(`10-鼠标热键与操作`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};