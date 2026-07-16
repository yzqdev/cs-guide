import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/23-script-organization.html","title":"23 - 脚本管理与组织","lang":"zh-CN","frontmatter":{"order":23,"description":"23 - 脚本管理与组织 #Include #Include 用于将其他脚本文件包含进来，实现模块化： #Include 的规则 #Include 在脚本加载时处理（不是运行时） 被包含的文件可以定义函数、变量、热键 同一文件不会重复包含 包含路径相对于当前文件（不是主脚本） 库函数目录 AHK 有标准的库函数机制： 标准库路径 放在这些目录下的 .a...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"23 - 脚本管理与组织\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/23-script-organization.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"23 - 脚本管理与组织"}],["meta",{"property":"og:description","content":"23 - 脚本管理与组织 #Include #Include 用于将其他脚本文件包含进来，实现模块化： #Include 的规则 #Include 在脚本加载时处理（不是运行时） 被包含的文件可以定义函数、变量、热键 同一文件不会重复包含 包含路径相对于当前文件（不是主脚本） 库函数目录 AHK 有标准的库函数机制： 标准库路径 放在这些目录下的 .a..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.69,"words":1107},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/23-script-organization.md","autoDesc":true}`),u={name:`23-script-organization.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_23-脚本管理与组织" tabindex="-1"><a class="header-anchor" href="#_23-脚本管理与组织"><span>23 - 脚本管理与组织</span></a></h1><h2 id="include" tabindex="-1"><a class="header-anchor" href="#include"><span>#Include</span></a></h2><p><code>#Include</code> 用于将其他脚本文件包含进来，实现模块化：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; 包含相对路径文件</span>
<span class="line">#Include lib\\utils.ahk</span>
<span class="line"></span>
<span class="line">; 包含绝对路径文件</span>
<span class="line">#Include C:\\AHK\\Lib\\mylib.ahk</span>
<span class="line"></span>
<span class="line">; 包含目录下所有文件</span>
<span class="line">#Include *i lib\\optional.ahk   ; *i = 忽略错误（文件不存在不报错）</span>
<span class="line"></span></code></pre></div><h3 id="include-的规则" tabindex="-1"><a class="header-anchor" href="#include-的规则"><span>#Include 的规则</span></a></h3><ul><li><code>#Include</code> 在脚本加载时处理（不是运行时）</li><li>被包含的文件可以定义函数、变量、热键</li><li>同一文件不会重复包含</li><li>包含路径相对于<strong>当前文件</strong>（不是主脚本）</li></ul><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 主脚本: main.ahk</span>
<span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line">#Include lib\\strings.ahk       ; 包含字符串工具</span>
<span class="line">#Include lib\\windows.ahk       ; 包含窗口工具</span>
<span class="line">#Include lib\\hotkeys.ahk       ; 包含热键定义</span>
<span class="line"></span>
<span class="line">; 现在可以使用所有包含文件中的函数和热键</span>
<span class="line"></span></code></pre></div><h2 id="库函数目录" tabindex="-1"><a class="header-anchor" href="#库函数目录"><span>库函数目录</span></a></h2><p>AHK 有标准的库函数机制：</p><h3 id="标准库路径" tabindex="-1"><a class="header-anchor" href="#标准库路径"><span>标准库路径</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">%A_MyDocuments%\\AutoHotkey\\Lib\\     ; 用户库</span>
<span class="line">%A_AhkPath%\\Lib\\                    ; 系统库（AHK 安装目录下）</span>
<span class="line"></span></code></pre></div><p>放在这些目录下的 <code>.ahk</code> 文件会被自动搜索：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 如果调用了一个未定义的函数 MyFunc</span>
<span class="line">; AHK 会自动搜索:</span>
<span class="line">; %A_MyDocuments%\\AutoHotkey\\Lib\\MyFunc.ahk</span>
<span class="line">; %A_AhkPath%\\Lib\\MyFunc.ahk</span>
<span class="line"></span>
<span class="line">; 只需将函数文件放到 Lib 目录，无需 #Include</span>
<span class="line"></span></code></pre></div><h3 id="函数文件命名" tabindex="-1"><a class="header-anchor" href="#函数文件命名"><span>函数文件命名</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">; 文件名必须与函数名一致</span>
<span class="line">; MyFunc.ahk → 包含 MyFunc() 函数</span>
<span class="line">; StringUtils.ahk → 包含 StringUtils 类或函数</span>
<span class="line"></span></code></pre></div><h2 id="脚本结构模板" tabindex="-1"><a class="header-anchor" href="#脚本结构模板"><span>脚本结构模板</span></a></h2><h3 id="推荐的项目结构" tabindex="-1"><a class="header-anchor" href="#推荐的项目结构"><span>推荐的项目结构</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">MyProject/</span>
<span class="line">├── main.ahk              ; 主脚本入口</span>
<span class="line">├── config.ahk            ; 配置和全局变量</span>
<span class="line">├── lib/</span>
<span class="line">│   ├── utils.ahk         ; 通用工具函数</span>
<span class="line">│   ├── windows.ahk       ; 窗口操作函数</span>
<span class="line">│   ├── strings.ahk       ; 字符串处理函数</span>
<span class="line">│   └── hotkeys.ahk       ; 热键定义</span>
<span class="line">└── data/</span>
<span class="line">│   ├── config.ini        ; 配置文件</span>
<span class="line">│   └── templates/        ; 模板文件</span>
<span class="line"></span></code></pre></div><h3 id="主脚本模板" tabindex="-1"><a class="header-anchor" href="#主脚本模板"><span>主脚本模板</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line">#Warn All, StdOut</span>
<span class="line"></span>
<span class="line">; ===== 配置 =====</span>
<span class="line">CoordMode &quot;Mouse&quot;, &quot;Screen&quot;</span>
<span class="line">CoordMode &quot;Pixel&quot;, &quot;Screen&quot;</span>
<span class="line">SetWorkingDir A_ScriptDir</span>
<span class="line"></span>
<span class="line">; ===== 包含 =====</span>
<span class="line">#Include lib\\utils.ahk</span>
<span class="line">#Include lib\\hotkeys.ahk</span>
<span class="line"></span>
<span class="line">; ===== 全局变量 =====</span>
<span class="line">APP_NAME := &quot;MyTool&quot;</span>
<span class="line">APP_VERSION := &quot;1.0&quot;</span>
<span class="line">debugMode := false</span>
<span class="line"></span>
<span class="line">; ===== 初始化 =====</span>
<span class="line">Init()</span>
<span class="line"></span>
<span class="line">Init() {</span>
<span class="line">    ; 加载配置</span>
<span class="line">    LoadConfig()</span>
<span class="line">    ; 设置定时器</span>
<span class="line">    SetTimer CheckIdle, 60000</span>
<span class="line">    ; 显示托盘菜单</span>
<span class="line">    SetupTray()</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">LoadConfig() {</span>
<span class="line">    global</span>
<span class="line">    configPath := A_ScriptDir &quot;\\data\\config.ini&quot;</span>
<span class="line">    if FileExist(configPath) {</span>
<span class="line">        fontSize := IniRead(configPath, &quot;Editor&quot;, &quot;FontSize&quot;, 12)</span>
<span class="line">        autoSave := IniRead(configPath, &quot;Editor&quot;, &quot;AutoSave&quot;, 0)</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">SetupTray() {</span>
<span class="line">    A_TrayMenu.Delete()              ; 清空默认菜单</span>
<span class="line">    A_TrayMenu.Add(&quot;设置&quot;, ShowSettings)</span>
<span class="line">    A_TrayMenu.Add(&quot;关于&quot;, ShowAbout)</span>
<span class="line">    A_TrayMenu.Add()                 ; 分隔线</span>
<span class="line">    A_TrayMenu.Add(&quot;退出&quot;, (*) =&gt; ExitApp())</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">ShowSettings(*) {</span>
<span class="line">    MsgBox &quot;设置界面&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">ShowAbout(*) {</span>
<span class="line">    MsgBox APP_NAME &quot; v&quot; APP_VERSION</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; ===== 热键 =====</span>
<span class="line">Esc:: ExitApp</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="工具函数库模板" tabindex="-1"><a class="header-anchor" href="#工具函数库模板"><span>工具函数库模板</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; lib/utils.ahk — 通用工具函数</span>
<span class="line"></span>
<span class="line">; 日志函数</span>
<span class="line">LogWrite(msg) {</span>
<span class="line">    timestamp := FormatTime(A_Now, &quot;yyyy/MM/dd HH:mm:ss&quot;)</span>
<span class="line">    FileAppend timestamp &quot; — &quot; msg &quot;\`n&quot;, A_ScriptDir &quot;\\log.txt&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 安全的文件读取</span>
<span class="line">SafeFileRead(path) {</span>
<span class="line">    try {</span>
<span class="line">        return FileRead(path)</span>
<span class="line">    } catch {</span>
<span class="line">        return &quot;&quot;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 数组求和</span>
<span class="line">ArraySum(arr) {</span>
<span class="line">    total := 0</span>
<span class="line">    for i, v in arr</span>
<span class="line">        total += v</span>
<span class="line">    return total</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 字符串首字母大写</span>
<span class="line">Capitalize(s) {</span>
<span class="line">    if StrLen(s) = 0</span>
<span class="line">        return s</span>
<span class="line">    return StrUpper(SubStr(s, 1, 1)) . SubStr(s, 2)</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 剪贴板操作（保存-修改-恢复）</span>
<span class="line">PasteText(text) {</span>
<span class="line">    saved := A_Clipboard</span>
<span class="line">    A_Clipboard := text</span>
<span class="line">    ClipWait 2</span>
<span class="line">    Send &quot;^v&quot;</span>
<span class="line">    Sleep 100</span>
<span class="line">    A_Clipboard := saved</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="托盘菜单定制" tabindex="-1"><a class="header-anchor" href="#托盘菜单定制"><span>托盘菜单定制</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 自定义托盘菜单</span>
<span class="line">A_TrayMenu.Delete()                     ; 删除所有默认项</span>
<span class="line"></span>
<span class="line">A_TrayMenu.Add(&quot;功能1&quot;, Func1)</span>
<span class="line">A_TrayMenu.Add(&quot;功能2&quot;, Func2)</span>
<span class="line">A_TrayMenu.Add(&quot;功能3&quot;, Func3)</span>
<span class="line"></span>
<span class="line">A_TrayMenu.Add()                        ; 分隔线</span>
<span class="line">A_TrayMenu.Add(&quot;帮助&quot;, ShowHelp)</span>
<span class="line">A_TrayMenu.Add(&quot;关于&quot;, ShowAbout)</span>
<span class="line">A_TrayMenu.Add()                        ; 分隔线</span>
<span class="line">A_TrayMenu.Add(&quot;暂停脚本&quot;, PauseToggle)</span>
<span class="line">A_TrayMenu.Add(&quot;退出&quot;, (*) =&gt; ExitApp())</span>
<span class="line"></span>
<span class="line">; 设置默认项（双击托盘图标触发）</span>
<span class="line">A_TrayMenu.DefaultAction := &quot;功能1&quot;</span>
<span class="line"></span>
<span class="line">Func1(*) { MsgBox &quot;功能1&quot; }</span>
<span class="line">Func2(*) { MsgBox &quot;功能2&quot; }</span>
<span class="line">Func3(*) { MsgBox &quot;功能3&quot; }</span>
<span class="line">ShowHelp(*) { Run &quot;https://www.autohotkey.com/docs/&quot; }</span>
<span class="line">ShowAbout(*) { MsgBox &quot;MyTool v1.0&quot; }</span>
<span class="line">PauseToggle(*) {</span>
<span class="line">    if A_IsPaused {</span>
<span class="line">        Pause -1   ; 恢复</span>
<span class="line">        ToolTip &quot;脚本已恢复&quot;</span>
<span class="line">    } else {</span>
<span class="line">        Pause 1    ; 暂停</span>
<span class="line">        ToolTip &quot;脚本已暂停&quot;</span>
<span class="line">    }</span>
<span class="line">    SetTimer () =&gt; ToolTip(), -2000</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 修改托盘图标提示文字</span>
<span class="line">A_IconTip := &quot;MyTool v1.0 — 右键查看菜单&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="编译为-exe" tabindex="-1"><a class="header-anchor" href="#编译为-exe"><span>编译为 EXE</span></a></h2><p>使用 Ahk2Exe 编译器可以将 <code>.ahk</code> 脚本编译为独立的 <code>.exe</code> 文件：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 方式1: 使用 AHK 自带的 Ahk2Exe 工具</span>
<span class="line">; 位于 AHK 安装目录下的 Compiler\\Ahk2Exe.exe</span>
<span class="line"></span>
<span class="line">; 方式2: 命令行编译</span>
<span class="line">Run &quot;Ahk2Exe.exe /in main.ahk /out MyTool.exe&quot;</span>
<span class="line"></span>
<span class="line">; 方式3: 在脚本中使用</span>
<span class="line">; CompileScript() {</span>
<span class="line">;     compiler := A_AhkPath &quot;\\..\\Compiler\\Ahk2Exe.exe&quot;</span>
<span class="line">;     Run compiler &#39; /in &quot;&#39; A_ScriptFullPath &#39;&quot; /out &quot;&#39; A_ScriptDir &#39;\\MyTool.exe&quot;&#39;</span>
<span class="line">; }</span>
<span class="line"></span></code></pre></div><h3 id="编译选项" tabindex="-1"><a class="header-anchor" href="#编译选项"><span>编译选项</span></a></h3><table><thead><tr><th>选项</th><th>说明</th></tr></thead><tbody><tr><td><code>/in</code></td><td>输入脚本路径</td></tr><tr><td><code>/out</code></td><td>输出 EXE 路径</td></tr><tr><td><code>/icon</code></td><td>图标文件路径</td></tr><tr><td><code>/compress</code></td><td>压缩级别 (0-2)</td></tr><tr><td><code>/mpress</code></td><td>使用 mpress 压缩</td></tr><tr><td><code>/gui</code></td><td>以 GUI 模式运行编译器</td></tr></tbody></table><h2 id="常见脚本管理问题" tabindex="-1"><a class="header-anchor" href="#常见脚本管理问题"><span>常见脚本管理问题</span></a></h2><h3 id="脚本冲突" tabindex="-1"><a class="header-anchor" href="#脚本冲突"><span>脚本冲突</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; #SingleInstance 解决同一脚本多次运行的冲突</span>
<span class="line">#SingleInstance Force      ; 强制替换旧实例（推荐）</span>
<span class="line">#SingleInstance Ignore     ; 忽略新实例</span>
<span class="line">#SingleInstance Prompt     ; 弹窗询问是否替换</span>
<span class="line"></span></code></pre></div><h3 id="热键冲突" tabindex="-1"><a class="header-anchor" href="#热键冲突"><span>热键冲突</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 多个脚本定义同一热键 → 最后激活的脚本捕获热键</span>
<span class="line">; 解决: 用 #HotIf 限制热键范围</span>
<span class="line"></span>
<span class="line">; 或检查热键是否已注册</span>
<span class="line">try {</span>
<span class="line">    Hotkey &quot;^j&quot;, On    ; 尝试注册</span>
<span class="line">} catch {</span>
<span class="line">    MsgBox &quot;^j 热键已被其他脚本占用&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="脚本自动启动" tabindex="-1"><a class="header-anchor" href="#脚本自动启动"><span>脚本自动启动</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 将脚本放到启动文件夹</span>
<span class="line">startupFolder := A_Startup</span>
<span class="line">FileCopy A_ScriptFullPath, startupFolder &quot;\\&quot; A_ScriptName</span>
<span class="line"></span>
<span class="line">; 或者创建快捷方式到启动文件夹</span>
<span class="line">; FileCreateShortcut 更灵活</span>
<span class="line">FileCreateShortcut A_ScriptFullPath, A_Startup &quot;\\MyTool.lnk&quot;</span>
<span class="line"></span></code></pre></div><hr>`,37),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/24-practical-examples.html`},{default:r(()=>[...l[0]||=[e(`24-实用脚本实例`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};