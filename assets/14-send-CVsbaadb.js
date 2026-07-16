import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/14-send.html","title":"14 - Send 与键盘模拟","lang":"zh-CN","frontmatter":{"order":14,"description":"14 - Send 与键盘模拟 Send 函数 Send 是 AHK 最基础的键盘模拟函数： 特殊键名 所有特殊键用 {} 包围： 常用特殊键 修饰键（按下/释放） 其他 按下与释放 重复按键 发送模式 AHK 提供三种发送模式，各有特点： SendInput（默认，最推荐） SendPlay SendText / SendEvent 模式对比 Set...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"14 - Send 与键盘模拟\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/14-send.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"14 - Send 与键盘模拟"}],["meta",{"property":"og:description","content":"14 - Send 与键盘模拟 Send 函数 Send 是 AHK 最基础的键盘模拟函数： 特殊键名 所有特殊键用 {} 包围： 常用特殊键 修饰键（按下/释放） 其他 按下与释放 重复按键 发送模式 AHK 提供三种发送模式，各有特点： SendInput（默认，最推荐） SendPlay SendText / SendEvent 模式对比 Set..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.87,"words":1160},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/14-send.md","autoDesc":true}`),u={name:`14-send.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_14-send-与键盘模拟" tabindex="-1"><a class="header-anchor" href="#_14-send-与键盘模拟"><span>14 - Send 与键盘模拟</span></a></h1><h2 id="send-函数" tabindex="-1"><a class="header-anchor" href="#send-函数"><span>Send 函数</span></a></h2><p><code>Send</code> 是 AHK 最基础的键盘模拟函数：</p><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; 发送文字</span>
<span class="line">Send &quot;Hello World&quot;</span>
<span class="line"></span>
<span class="line">; 发送按键</span>
<span class="line">Send &quot;{Enter}&quot;</span>
<span class="line">Send &quot;{Tab}&quot;</span>
<span class="line"></span>
<span class="line">; 发送组合键</span>
<span class="line">Send &quot;^a&quot;         ; Ctrl+A</span>
<span class="line">Send &quot;^c&quot;         ; Ctrl+C</span>
<span class="line">Send &quot;^v&quot;         ; Ctrl+V</span>
<span class="line">Send &quot;^s&quot;         ; Ctrl+S</span>
<span class="line">Send &quot;!{F4}&quot;      ; Alt+F4</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="特殊键名" tabindex="-1"><a class="header-anchor" href="#特殊键名"><span>特殊键名</span></a></h2><p>所有特殊键用 <code>{}</code> 包围：</p><h3 id="常用特殊键" tabindex="-1"><a class="header-anchor" href="#常用特殊键"><span>常用特殊键</span></a></h3><table><thead><tr><th>键名</th><th>按键</th><th>说明</th></tr></thead><tbody><tr><td><code>{Enter}</code> / <code>{Return}</code></td><td>回车</td><td></td></tr><tr><td><code>{Tab}</code></td><td>Tab</td><td></td></tr><tr><td><code>{Space}</code></td><td>空格</td><td></td></tr><tr><td><code>{Backspace}</code> / <code>{BS}</code></td><td>退格</td><td></td></tr><tr><td><code>{Delete}</code> / <code>{Del}</code></td><td>删除</td><td></td></tr><tr><td><code>{Insert}</code> / <code>{Ins}</code></td><td>Insert</td><td></td></tr><tr><td><code>{Escape}</code> / <code>{Esc}</code></td><td>Esc</td><td></td></tr><tr><td><code>{Home}</code></td><td>Home</td><td></td></tr><tr><td><code>{End}</code></td><td>End</td><td></td></tr><tr><td><code>{PgUp}</code></td><td>Page Up</td><td></td></tr><tr><td><code>{PgDn}</code></td><td>Page Down</td><td></td></tr><tr><td><code>{Up}</code></td><td>上箭头</td><td></td></tr><tr><td><code>{Down}</code></td><td>下箭头</td><td></td></tr><tr><td><code>{Left}</code></td><td>左箭头</td><td></td></tr><tr><td><code>{Right}</code></td><td>右箭头</td><td></td></tr><tr><td><code>{F1}</code> - <code>{F12}</code></td><td>F1-F12</td><td></td></tr><tr><td><code>{CapsLock}</code></td><td>大写锁定</td><td></td></tr></tbody></table><h3 id="修饰键-按下-释放" tabindex="-1"><a class="header-anchor" href="#修饰键-按下-释放"><span>修饰键（按下/释放）</span></a></h3><table><thead><tr><th>键名</th><th>说明</th></tr></thead><tbody><tr><td><code>{Ctrl}</code> / <code>{Control}</code></td><td>Ctrl</td></tr><tr><td><code>{Alt}</code></td><td>Alt</td></tr><tr><td><code>{Shift}</code></td><td>Shift</td></tr><tr><td><code>{Win}</code> / <code>{LWin}</code> / <code>{RWin}</code></td><td>Win键</td></tr></tbody></table><h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h3><table><thead><tr><th>键名</th><th>说明</th></tr></thead><tbody><tr><td><code>{PrintScreen}</code></td><td>截屏键</td></tr><tr><td><code>{ScrollLock}</code></td><td>滚动锁定</td></tr><tr><td><code>{NumLock}</code></td><td>数字锁定</td></tr><tr><td><code>{Pause}</code> / <code>{Break}</code></td><td>Pause/Break</td></tr><tr><td><code>{Sleep}</code></td><td>Sleep键</td></tr><tr><td><code>{AppsKey}</code></td><td>右键菜单键</td></tr><tr><td><code>{Numpad0}</code> - <code>{Numpad9}</code></td><td>数字键盘</td></tr><tr><td><code>{NumpadDot}</code></td><td>数字键盘小数点</td></tr><tr><td><code>{NumpadEnter}</code></td><td>数字键盘回车</td></tr><tr><td><code>{NumpadAdd}</code></td><td>数字键盘加号</td></tr><tr><td><code>{NumpadSub}</code></td><td>数字键盘减号</td></tr><tr><td><code>{NumpadMult}</code></td><td>数字键盘乘号</td></tr><tr><td><code>{NumpadDiv}</code></td><td>数字键盘除号</td></tr></tbody></table><h3 id="按下与释放" tabindex="-1"><a class="header-anchor" href="#按下与释放"><span>按下与释放</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 按下修饰键 → 发送按键 → 释放修饰键</span>
<span class="line">Send &quot;{Ctrl down}a{Ctrl up}&quot;    ; 按住Ctrl → A → 释放Ctrl</span>
<span class="line"></span>
<span class="line">; 持续按住</span>
<span class="line">Send &quot;{Shift down}&quot;             ; 按住Shift</span>
<span class="line">Send &quot;abcdef&quot;                   ; 输出 ABCDEF（Shift被按住）</span>
<span class="line">Send &quot;{Shift up}&quot;               ; 释放Shift</span>
<span class="line"></span>
<span class="line">; 按住后执行多个操作</span>
<span class="line">Send &quot;{Ctrl down}&quot;</span>
<span class="line">Send &quot;a&quot;                        ; Ctrl+A</span>
<span class="line">Send &quot;c&quot;                        ; Ctrl+C</span>
<span class="line">Send &quot;{Ctrl up}&quot;                 ; 释放Ctrl</span>
<span class="line"></span></code></pre></div><h3 id="重复按键" tabindex="-1"><a class="header-anchor" href="#重复按键"><span>重复按键</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; {键名 次数} — 重复发送</span>
<span class="line">Send &quot;{Tab 3}&quot;           ; 发送3次Tab</span>
<span class="line">Send &quot;{Down 5}&quot;          ; 发送5次下箭头</span>
<span class="line">Send &quot;{Delete 10}&quot;       ; 发送10次Delete</span>
<span class="line"></span></code></pre></div><h2 id="发送模式" tabindex="-1"><a class="header-anchor" href="#发送模式"><span>发送模式</span></a></h2><p>AHK 提供三种发送模式，各有特点：</p><h3 id="sendinput-默认-最推荐" tabindex="-1"><a class="header-anchor" href="#sendinput-默认-最推荐"><span>SendInput（默认，最推荐）</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; SendInput — 最快最可靠</span>
<span class="line">SendInput &quot;Hello World&quot;</span>
<span class="line">Send &quot;Hello World&quot;       ; 默认就是 SendInput</span>
<span class="line"></span>
<span class="line">; 特点：</span>
<span class="line">; - 速度极快（几乎瞬间完成）</span>
<span class="line">; - 不会被其他程序拦截</span>
<span class="line">; - 不会触发 AHK 热键（自动保护）</span>
<span class="line">; - 大多数情况下的最佳选择</span>
<span class="line"></span></code></pre></div><h3 id="sendplay" tabindex="-1"><a class="header-anchor" href="#sendplay"><span>SendPlay</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; SendPlay — 在某些游戏和远程桌面中有效</span>
<span class="line">SendPlay &quot;Hello&quot;</span>
<span class="line"></span>
<span class="line">; 特点：</span>
<span class="line">; - 比 SendInput 慢</span>
<span class="line">; - 在某些 SendInput 无效的场合可用</span>
<span class="line">; - 适合游戏和远程桌面</span>
<span class="line">; - 不会触发 AHK 热键</span>
<span class="line"></span></code></pre></div><h3 id="sendtext-sendevent" tabindex="-1"><a class="header-anchor" href="#sendtext-sendevent"><span>SendText / SendEvent</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; SendText — 只发送纯文本，不解释特殊键名</span>
<span class="line">SendText &quot;{Enter}&quot;       ; 发送字面文字 &quot;{Enter}&quot;，不是按回车！</span>
<span class="line"></span>
<span class="line">; 特点：</span>
<span class="line">; - 只发送文字，不解释 {} 键名</span>
<span class="line">; - 适合发送包含特殊字符的文本</span>
<span class="line">; - 不触发热键</span>
<span class="line"></span>
<span class="line">; SendEvent — 逐键发送，速度慢</span>
<span class="line">SendEvent &quot;Hello&quot;</span>
<span class="line"></span>
<span class="line">; 特点：</span>
<span class="line">; - 每个键独立发送，速度慢</span>
<span class="line">; - 可以被其他程序拦截</span>
<span class="line">; - 会触发 AHK 热键（需要 $ 前缀保护）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="模式对比" tabindex="-1"><a class="header-anchor" href="#模式对比"><span>模式对比</span></a></h3><table><thead><tr><th>模式</th><th>速度</th><th>稳定性</th><th>解释特殊键</th><th>触发AHK热键</th><th>适用场景</th></tr></thead><tbody><tr><td>SendInput</td><td>极快</td><td>高</td><td>是</td><td>否</td><td>大多数场景</td></tr><tr><td>SendPlay</td><td>中</td><td>中</td><td>是</td><td>否</td><td>游戏/远程桌面</td></tr><tr><td>SendText</td><td>快</td><td>高</td><td>否</td><td>否</td><td>纯文本</td></tr><tr><td>SendEvent</td><td>慢</td><td>低</td><td>是</td><td>是</td><td>需要逐键发送</td></tr></tbody></table><h2 id="setkeydelay" tabindex="-1"><a class="header-anchor" href="#setkeydelay"><span>SetKeyDelay</span></a></h2><p>控制发送按键之间的延迟：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; SetKeyDelay(延迟毫秒, 按下持续时间毫秒)</span>
<span class="line">SetKeyDelay 50          ; 每键间隔50ms</span>
<span class="line">SetKeyDelay 10, 10      ; 间隔10ms，按下10ms</span>
<span class="line"></span>
<span class="line">; 对 SendEvent 和 ControlSend 有效</span>
<span class="line">; SendInput 不受 SetKeyDelay 影响</span>
<span class="line"></span>
<span class="line">; 游戏中可能需要增加延迟</span>
<span class="line">SetKeyDelay 50, 50</span>
<span class="line">SendEvent &quot;w w w w&quot;     ; 每个按键间隔50ms</span>
<span class="line"></span>
<span class="line">; 快速操作时减少延迟</span>
<span class="line">SetKeyDelay 0, 0</span>
<span class="line"></span></code></pre></div><h2 id="实用-send-模式" tabindex="-1"><a class="header-anchor" href="#实用-send-模式"><span>实用 Send 模式</span></a></h2><h3 id="快速输入文字" tabindex="-1"><a class="header-anchor" href="#快速输入文字"><span>快速输入文字</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">^j:: SendInput &quot;Hello World, this is AutoHotkey v2!&quot;</span>
<span class="line"></span></code></pre></div><h3 id="发送多行文本" tabindex="-1"><a class="header-anchor" href="#发送多行文本"><span>发送多行文本</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">^m:: {</span>
<span class="line">    SendInput &quot;第一行{Enter}第二行{Enter}第三行&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 或用多行字符串</span>
<span class="line">^l:: {</span>
<span class="line">    text := &quot;Line 1\`nLine 2\`nLine 3&quot;</span>
<span class="line">    for line in StrSplit(text, &quot;\`n&quot;) {</span>
<span class="line">        SendInput line</span>
<span class="line">        SendInput &quot;{Enter}&quot;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="复制粘贴操作" tabindex="-1"><a class="header-anchor" href="#复制粘贴操作"><span>复制粘贴操作</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; Ctrl+A → Ctrl+C → 在别处 Ctrl+V</span>
<span class="line">^!c:: {</span>
<span class="line">    SendInput &quot;^a&quot;      ; 全选</span>
<span class="line">    Sleep 100</span>
<span class="line">    SendInput &quot;^c&quot;      ; 复制</span>
<span class="line">    Sleep 100</span>
<span class="line">    WinActivate &quot;目标窗口&quot;</span>
<span class="line">    SendInput &quot;^v&quot;      ; 粘贴</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="游戏中的按键发送" tabindex="-1"><a class="header-anchor" href="#游戏中的按键发送"><span>游戏中的按键发送</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 游戏中可能需要 SendPlay 或 SendEvent</span>
<span class="line">; 且需要增加延迟</span>
<span class="line"></span>
<span class="line">SetKeyDelay 50, 50</span>
<span class="line"></span>
<span class="line">; 按住W键5秒（前进）</span>
<span class="line">#HotIf WinActive(&quot;ahk_exe game.exe&quot;)</span>
<span class="line">^w:: {</span>
<span class="line">    SendEvent &quot;{w down}&quot;</span>
<span class="line">    Sleep 5000</span>
<span class="line">    SendEvent &quot;{w up}&quot;</span>
<span class="line">}</span>
<span class="line">#HotIf</span>
<span class="line"></span></code></pre></div><h2 id="sendlevel-与-sendwait" tabindex="-1"><a class="header-anchor" href="#sendlevel-与-sendwait"><span>SendLevel 与 SendWait</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; SendLevel — 控制发送级别，防止热键递归触发</span>
<span class="line">; 默认级别0，Send发送的键不会触发级别&gt;=1的热键</span>
<span class="line"></span>
<span class="line">SetSendLevel 1          ; 设置发送级别为1</span>
<span class="line"></span>
<span class="line">; SendWait — 发送并等待所有键被处理</span>
<span class="line">SendWait &quot;^a^c&quot;         ; 发送Ctrl+A和Ctrl+C，等待完成</span>
<span class="line"></span></code></pre></div><h2 id="文字发送的最佳实践" tabindex="-1"><a class="header-anchor" href="#文字发送的最佳实践"><span>文字发送的最佳实践</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 1. 优先使用 SendInput（默认）</span>
<span class="line">Send &quot;Hello&quot;             ; 即 SendInput</span>
<span class="line"></span>
<span class="line">; 2. 如果发送大量文字，用 A_Clipboard 更稳定</span>
<span class="line">^j:: {</span>
<span class="line">    A_Clipboard := &quot;这是一段很长的文字...&quot;</span>
<span class="line">    Send &quot;^v&quot;            ; 粘贴，比逐字Send快且稳定</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 3. 后台窗口用 ControlSend</span>
<span class="line">ControlSend &quot;Hello&quot;, &quot;Edit1&quot;, &quot;记事本&quot;</span>
<span class="line"></span>
<span class="line">; 4. 避免在热键中直接Send可能触发其他热键的内容</span>
<span class="line">; 使用 $ 前缀保护</span>
<span class="line">$^c:: Send &quot;^c{Enter}&quot;  ; $防止Send的^c再次触发此热键</span>
<span class="line"></span>
<span class="line">; 5. 纯文本用 SendText</span>
<span class="line">SendText &quot;{Hello}&quot;       ; 发送字面文字，不解释{}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>`,43),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/15-clipboard.html`},{default:r(()=>[...l[0]||=[e(`15-剪贴板操作`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};