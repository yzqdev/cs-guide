import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/10-mouse.html","title":"10 - 鼠标热键与操作","lang":"zh-CN","frontmatter":{"order":10,"description":"10 - 鼠标热键与操作 鼠标热键 基本鼠标热键 组合鼠标热键 注意：当 RButton 被用于组合键时，单独按右键不再弹出菜单。需要恢复功能：~RButton:: return 或 RButton:: Send &quot;{RButton}&quot;。 ~ 前缀保留原始功能 Click 函数 基本点击 点击模式 Click 参数汇总 MouseM...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"10 - 鼠标热键与操作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/10-mouse.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"10 - 鼠标热键与操作"}],["meta",{"property":"og:description","content":"10 - 鼠标热键与操作 鼠标热键 基本鼠标热键 组合鼠标热键 注意：当 RButton 被用于组合键时，单独按右键不再弹出菜单。需要恢复功能：~RButton:: return 或 RButton:: Send &quot;{RButton}&quot;。 ~ 前缀保留原始功能 Click 函数 基本点击 点击模式 Click 参数汇总 MouseM..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.45,"words":1034},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/10-mouse.md","autoDesc":true}`),u={name:`10-mouse.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_10-鼠标热键与操作" tabindex="-1"><a class="header-anchor" href="#_10-鼠标热键与操作"><span>10 - 鼠标热键与操作</span></a></h1><h2 id="鼠标热键" tabindex="-1"><a class="header-anchor" href="#鼠标热键"><span>鼠标热键</span></a></h2><h3 id="基本鼠标热键" tabindex="-1"><a class="header-anchor" href="#基本鼠标热键"><span>基本鼠标热键</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; 鼠标左键</span>
<span class="line">LButton:: MsgBox &quot;左键&quot;</span>
<span class="line"></span>
<span class="line">; 鼠标右键</span>
<span class="line">RButton:: MsgBox &quot;右键&quot;</span>
<span class="line"></span>
<span class="line">; 鼠标中键</span>
<span class="line">MButton:: MsgBox &quot;中键&quot;</span>
<span class="line"></span>
<span class="line">; 鼠标额外键（X1/X2）</span>
<span class="line">XButton1:: MsgBox &quot;X1键&quot;</span>
<span class="line">XButton2:: MsgBox &quot;X2键&quot;</span>
<span class="line"></span>
<span class="line">; 滚轮</span>
<span class="line">WheelUp:: MsgBox &quot;向上滚&quot;</span>
<span class="line">WheelDown:: MsgBox &quot;向下滚&quot;</span>
<span class="line">WheelLeft:: MsgBox &quot;左滚&quot;</span>
<span class="line">WheelRight:: MsgBox &quot;右滚&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="组合鼠标热键" tabindex="-1"><a class="header-anchor" href="#组合鼠标热键"><span>组合鼠标热键</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; Ctrl + 鼠标左键</span>
<span class="line">^LButton:: MsgBox &quot;Ctrl+左键&quot;</span>
<span class="line"></span>
<span class="line">; Shift + 鼠标右键</span>
<span class="line">+RButton:: MsgBox &quot;Shift+右键&quot;</span>
<span class="line"></span>
<span class="line">; Alt + 滚轮</span>
<span class="line">!WheelUp:: MsgBox &quot;Alt+上滚&quot;</span>
<span class="line"></span>
<span class="line">; Win + 中键</span>
<span class="line">#MButton:: MsgBox &quot;Win+中键&quot;</span>
<span class="line"></span>
<span class="line">; 自定义组合：鼠标键 &amp; 键盘键</span>
<span class="line">RButton &amp; a:: MsgBox &quot;右键+A同时按&quot;</span>
<span class="line"></span></code></pre></div><blockquote><p>注意：当 <code>RButton</code> 被用于组合键时，单独按右键不再弹出菜单。需要恢复功能：<code>~RButton:: return</code> 或 <code>RButton:: Send &quot;{RButton}&quot;</code>。</p></blockquote><h3 id="前缀保留原始功能" tabindex="-1"><a class="header-anchor" href="#前缀保留原始功能"><span>~ 前缀保留原始功能</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 不屏蔽鼠标原始功能</span>
<span class="line">~WheelUp:: ToolTip &quot;向上滚（原始滚动仍生效)&quot;</span>
<span class="line">SetTimer () =&gt; ToolTip(), -2000</span>
<span class="line"></span>
<span class="line">~LButton:: ToolTip &quot;左键点击（原始点击仍生效)&quot;</span>
<span class="line">SetTimer () =&gt; ToolTip(), -2000</span>
<span class="line"></span></code></pre></div><h2 id="click-函数" tabindex="-1"><a class="header-anchor" href="#click-函数"><span>Click 函数</span></a></h2><h3 id="基本点击" tabindex="-1"><a class="header-anchor" href="#基本点击"><span>基本点击</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; Click &quot;x, y&quot; — 在指定坐标点击</span>
<span class="line">Click 100, 200           ; 在 (100,200) 左键单击</span>
<span class="line">Click 500, 300, 2        ; 在 (500,300) 双击</span>
<span class="line">Click 100, 200, 0        ; 在 (100,200) 移动但不点击</span>
<span class="line"></span>
<span class="line">; Click &quot;Relative&quot; — 相对当前位置偏移</span>
<span class="line">Click 10, -5, 0, &quot;Rel&quot;   ; 右移10，上移5，只移动不点击</span>
<span class="line"></span>
<span class="line">; 相对活动窗口</span>
<span class="line">Click 50, 50             ; 如果CoordMode设为Window，则相对窗口</span>
<span class="line"></span></code></pre></div><h3 id="点击模式" tabindex="-1"><a class="header-anchor" href="#点击模式"><span>点击模式</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 左键单击（默认）</span>
<span class="line">Click 100, 200</span>
<span class="line"></span>
<span class="line">; 右键点击</span>
<span class="line">Click 100, 200, &quot;R&quot;</span>
<span class="line"></span>
<span class="line">; 中键点击</span>
<span class="line">Click 100, 200, &quot;M&quot;</span>
<span class="line"></span>
<span class="line">; 双击</span>
<span class="line">Click 100, 200, 2        ; 左键双击</span>
<span class="line"></span>
<span class="line">; 按下和释放分开</span>
<span class="line">Click 100, 200, &quot;D&quot;      ; 在(100,200)按下左键</span>
<span class="line">Sleep 100</span>
<span class="line">Click 100, 200, &quot;U&quot;      ; 在(100,200)释放左键</span>
<span class="line"></span>
<span class="line">; 拖拽：按下 → 移动 → 释放</span>
<span class="line">Click 100, 200, &quot;D&quot;      ; 按下</span>
<span class="line">Click 300, 400, 0        ; 移动（0表示不点击）</span>
<span class="line">Click 300, 400, &quot;U&quot;      ; 释放</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="click-参数汇总" tabindex="-1"><a class="header-anchor" href="#click-参数汇总"><span>Click 参数汇总</span></a></h3><table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td><code>x, y</code></td><td>坐标位置</td></tr><tr><td><code>2</code></td><td>双击</td></tr><tr><td><code>0</code></td><td>只移动不点击</td></tr><tr><td><code>&quot;R&quot;</code></td><td>右键</td></tr><tr><td><code>&quot;M&quot;</code></td><td>中键</td></tr><tr><td><code>&quot;D&quot;</code></td><td>按下（Down）</td></tr><tr><td><code>&quot;U&quot;</code></td><td>释放（Up）</td></tr><tr><td><code>&quot;Rel&quot;</code></td><td>相对当前位置偏移</td></tr></tbody></table><h2 id="mousemove" tabindex="-1"><a class="header-anchor" href="#mousemove"><span>MouseMove</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 移动鼠标到指定位置</span>
<span class="line">MouseMove 100, 200         ; 移动到 (100, 200)</span>
<span class="line"></span>
<span class="line">; 相对移动</span>
<span class="line">MouseMove 10, 20, 0, &quot;R&quot;   ; 右移10，下移20（&quot;R&quot; = 相对模式）</span>
<span class="line"></span>
<span class="line">; 指定移动速度（0=瞬间，1=最慢，100=最快）</span>
<span class="line">MouseMove 500, 300, 50     ; 以速度50移动到(500,300)</span>
<span class="line"></span></code></pre></div><h2 id="mousegetpos" tabindex="-1"><a class="header-anchor" href="#mousegetpos"><span>MouseGetPos</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 获取鼠标当前位置和窗口信息</span>
<span class="line">MouseGetPos &amp;x, &amp;y        ; 获取坐标</span>
<span class="line">MsgBox &quot;鼠标位置: &quot; x &quot;, &quot; y</span>
<span class="line"></span>
<span class="line">; 获取鼠标下的窗口 ID</span>
<span class="line">MouseGetPos &amp;x, &amp;y, &amp;winID</span>
<span class="line">MsgBox &quot;窗口ID: &quot; winID</span>
<span class="line">MsgBox &quot;窗口标题: &quot; WinGetTitle(winID)</span>
<span class="line"></span>
<span class="line">; 获取鼠标下的控件</span>
<span class="line">MouseGetPos &amp;x, &amp;y, &amp;winID, &amp;ctrlID</span>
<span class="line">MsgBox &quot;控件: &quot; ctrlID</span>
<span class="line"></span>
<span class="line">; CoordMode 影响坐标模式</span>
<span class="line">CoordMode &quot;Mouse&quot;, &quot;Screen&quot;    ; 屏幕坐标</span>
<span class="line">MouseGetPos &amp;x, &amp;y</span>
<span class="line">MsgBox &quot;屏幕坐标: &quot; x &quot;, &quot; y</span>
<span class="line"></span>
<span class="line">CoordMode &quot;Mouse&quot;, &quot;Window&quot;    ; 窗口坐标</span>
<span class="line">MouseGetPos &amp;x, &amp;y</span>
<span class="line">MsgBox &quot;窗口坐标: &quot; x &quot;, &quot; y</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="coordmode-坐标模式" tabindex="-1"><a class="header-anchor" href="#coordmode-坐标模式"><span>CoordMode 坐标模式</span></a></h2><p>坐标模式决定 Click、MouseMove、MouseGetPos 等函数的坐标参照：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">CoordMode &quot;Mouse&quot;, &quot;Screen&quot;     ; 相对屏幕左上角</span>
<span class="line">CoordMode &quot;Mouse&quot;, &quot;Window&quot;     ; 相对活动窗口左上角</span>
<span class="line">CoordMode &quot;Mouse&quot;, &quot;Client&quot;     ; 相对活动窗口客户区左上角（不含标题栏）</span>
<span class="line">CoordMode &quot;Pixel&quot;, &quot;Screen&quot;     ; PixelSearch 等用屏幕坐标</span>
<span class="line">CoordMode &quot;ToolTip&quot;, &quot;Screen&quot;   ; ToolTip 定位用屏幕坐标</span>
<span class="line">CoordMode &quot;Caret&quot;, &quot;Window&quot;     ; 光标位置用窗口坐标</span>
<span class="line"></span></code></pre></div><blockquote><p><strong>建议</strong>：脚本开头统一设置 <code>CoordMode &quot;Mouse&quot;, &quot;Screen&quot;</code>，避免坐标混乱。</p></blockquote><h2 id="滚轮操作" tabindex="-1"><a class="header-anchor" href="#滚轮操作"><span>滚轮操作</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 鼠标滚轮热键</span>
<span class="line">WheelUp:: {</span>
<span class="line">    ToolTip &quot;上滚&quot;</span>
<span class="line">    SetTimer () =&gt; ToolTip(), -1000</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">WheelDown:: {</span>
<span class="line">    ToolTip &quot;下滚&quot;</span>
<span class="line">    SetTimer () =&gt; ToolTip(), -1000</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; Ctrl+滚轮 — 调整音量</span>
<span class="line">^WheelUp:: Send &quot;{Volume_Up}&quot;</span>
<span class="line">^WheelDown:: Send &quot;{Volume_Down}&quot;</span>
<span class="line"></span>
<span class="line">; Shift+滚轮 — 水平滚动</span>
<span class="line">+WheelUp:: Click &quot;WheelLeft&quot;    ; 向左滚</span>
<span class="line">+WheelDown:: Click &quot;WheelRight&quot; ; 向右滚</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mouseclickdrag" tabindex="-1"><a class="header-anchor" href="#mouseclickdrag"><span>MouseClickDrag</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 拖拽操作（按下 → 移动 → 释放）</span>
<span class="line">; MouseClickDrag(按键, 起始x, 起始y, 结束x, 结束y, 速度)</span>
<span class="line"></span>
<span class="line">; 左键拖拽</span>
<span class="line">MouseClickDrag &quot;L&quot;, 100, 200, 500, 600   ; 从(100,200)拖到(500,600)</span>
<span class="line"></span>
<span class="line">; 右键拖拽</span>
<span class="line">MouseClickDrag &quot;R&quot;, 100, 200, 500, 600</span>
<span class="line"></span>
<span class="line">; 指定速度（0=瞬间）</span>
<span class="line">MouseClickDrag &quot;L&quot;, 100, 200, 500, 600, 50</span>
<span class="line"></span></code></pre></div><h2 id="实用鼠标脚本示例" tabindex="-1"><a class="header-anchor" href="#实用鼠标脚本示例"><span>实用鼠标脚本示例</span></a></h2><h3 id="鼠标位置记录器" tabindex="-1"><a class="header-anchor" href="#鼠标位置记录器"><span>鼠标位置记录器</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line">CoordMode &quot;Mouse&quot;, &quot;Screen&quot;</span>
<span class="line"></span>
<span class="line">^!m:: {    ; Ctrl+Alt+M 记录鼠标位置</span>
<span class="line">    MouseGetPos &amp;x, &amp;y, &amp;winID</span>
<span class="line">    MsgBox &quot;位置: (&quot; x &quot;, &quot; y &quot;)\`n窗口: &quot; WinGetTitle(winID)</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="快速点击器" tabindex="-1"><a class="header-anchor" href="#快速点击器"><span>快速点击器</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">^!c:: {    ; Ctrl+Alt+C 连续点击</span>
<span class="line">    Loop 10 {</span>
<span class="line">        Click</span>
<span class="line">        Sleep 100</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="鼠标抖动检测" tabindex="-1"><a class="header-anchor" href="#鼠标抖动检测"><span>鼠标抖动检测</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line">CoordMode &quot;Mouse&quot;, &quot;Screen&quot;</span>
<span class="line"></span>
<span class="line">lastX := 0, lastY := 0</span>
<span class="line"></span>
<span class="line">SetTimer CheckMouse, 100</span>
<span class="line"></span>
<span class="line">CheckMouse() {</span>
<span class="line">    MouseGetPos &amp;x, &amp;y</span>
<span class="line">    if (Abs(x - lastX) &gt; 5 || Abs(y - lastY) &gt; 5)</span>
<span class="line">        ToolTip &quot;鼠标移动中&quot;</span>
<span class="line">    else</span>
<span class="line">        ToolTip &quot;鼠标静止&quot;</span>
<span class="line">    lastX := x</span>
<span class="line">    lastY := y</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>`,36),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/11-hotstrings.html`},{default:r(()=>[...l[0]||=[e(`11-热字符串`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};