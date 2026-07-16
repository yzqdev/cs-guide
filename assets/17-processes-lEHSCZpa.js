import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/17-processes.html","title":"17 - 进程管理","lang":"zh-CN","frontmatter":{"order":17,"description":"17 - 进程管理 Run / RunWait Run — 运行程序 RunWait — 运行并等待结束 Run 的选项汇总 命令行参数 向脚本传递参数 向程序传递参数 进程检测与管理 Process 函数 获取进程列表 环境变量 Shell 操作 管道与临时文件 当需要获取命令行输出时，可以用临时文件： A_ 相关进程变量 实用进程脚本 程序快速启动...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"17 - 进程管理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/17-processes.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"17 - 进程管理"}],["meta",{"property":"og:description","content":"17 - 进程管理 Run / RunWait Run — 运行程序 RunWait — 运行并等待结束 Run 的选项汇总 命令行参数 向脚本传递参数 向程序传递参数 进程检测与管理 Process 函数 获取进程列表 环境变量 Shell 操作 管道与临时文件 当需要获取命令行输出时，可以用临时文件： A_ 相关进程变量 实用进程脚本 程序快速启动..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.38,"words":1013},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/17-processes.md","autoDesc":true}`),u={name:`17-processes.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_17-进程管理" tabindex="-1"><a class="header-anchor" href="#_17-进程管理"><span>17 - 进程管理</span></a></h1><h2 id="run-runwait" tabindex="-1"><a class="header-anchor" href="#run-runwait"><span>Run / RunWait</span></a></h2><h3 id="run-—-运行程序" tabindex="-1"><a class="header-anchor" href="#run-—-运行程序"><span>Run — 运行程序</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">; Run(目标, 工作目录, 选项)</span>
<span class="line">Run &quot;notepad.exe&quot;                    ; 打开记事本</span>
<span class="line">Run &quot;calc.exe&quot;                       ; 打开计算器</span>
<span class="line">Run &quot;C:\\Program Files\\App\\app.exe&quot;  ; 运行指定路径程序</span>
<span class="line"></span>
<span class="line">; 打开网页</span>
<span class="line">Run &quot;https://www.autohotkey.com&quot;</span>
<span class="line"></span>
<span class="line">; 打开文件（用默认程序）</span>
<span class="line">Run &quot;C:\\Users\\test\\document.pdf&quot;</span>
<span class="line"></span>
<span class="line">; 指定工作目录</span>
<span class="line">Run &quot;myapp.exe&quot;, &quot;C:\\MyApp&quot;</span>
<span class="line"></span>
<span class="line">; 运行选项</span>
<span class="line">Run &quot;notepad.exe&quot;, , &quot;Max&quot;           ; 最大化运行</span>
<span class="line">Run &quot;notepad.exe&quot;, , &quot;Min&quot;           ; 最小化运行</span>
<span class="line">Run &quot;notepad.exe&quot;, , &quot;Hide&quot;          ; 隐藏运行（不显示窗口）</span>
<span class="line"></span>
<span class="line">; 用管理员权限运行</span>
<span class="line">Run &quot;*RunAs notepad.exe&quot;             ; 以管理员身份运行</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="runwait-—-运行并等待结束" tabindex="-1"><a class="header-anchor" href="#runwait-—-运行并等待结束"><span>RunWait — 运行并等待结束</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; RunWait 会等到程序退出后才继续执行脚本</span>
<span class="line">RunWait &quot;notepad.exe&quot;</span>
<span class="line">MsgBox &quot;记事本已关闭&quot;               ; 记事本关闭后才弹出</span>
<span class="line"></span>
<span class="line">; 获取退出码</span>
<span class="line">exitCode := RunWait(&quot;ping 127.0.0.1 -n 4&quot;)</span>
<span class="line">MsgBox &quot;ping 退出码: &quot; exitCode      ; 0=成功</span>
<span class="line"></span></code></pre></div><h3 id="run-的选项汇总" tabindex="-1"><a class="header-anchor" href="#run-的选项汇总"><span>Run 的选项汇总</span></a></h3><table><thead><tr><th>选项</th><th>说明</th></tr></thead><tbody><tr><td><code>Max</code></td><td>最大化窗口启动</td></tr><tr><td><code>Min</code></td><td>最小化窗口启动</td></tr><tr><td><code>Hide</code></td><td>隐藏窗口启动</td></tr><tr><td><code>*RunAs</code></td><td>以管理员权限运行</td></tr></tbody></table><h2 id="命令行参数" tabindex="-1"><a class="header-anchor" href="#命令行参数"><span>命令行参数</span></a></h2><h3 id="向脚本传递参数" tabindex="-1"><a class="header-anchor" href="#向脚本传递参数"><span>向脚本传递参数</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 命令行运行: AutoHotkey64.exe script.ahk param1 param2 &quot;long param&quot;</span>
<span class="line"></span>
<span class="line">; A_Args 数组接收参数</span>
<span class="line">MsgBox &quot;参数数量: &quot; A_Args.Length</span>
<span class="line">for i, arg in A_Args {</span>
<span class="line">    MsgBox i &quot;: &quot; arg</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="向程序传递参数" tabindex="-1"><a class="header-anchor" href="#向程序传递参数"><span>向程序传递参数</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 传递命令行参数</span>
<span class="line">Run &quot;notepad.exe C:\\test.txt&quot;           ; 打开文件</span>
<span class="line">Run &quot;cmd.exe /c dir C:\\ /s&quot;             ; CMD命令</span>
<span class="line">Run &quot;powershell -Command Get-Process&quot;    ; PowerShell命令</span>
<span class="line"></span>
<span class="line">; 传递多个参数</span>
<span class="line">Run &quot;myapp.exe --config config.json --verbose&quot;</span>
<span class="line"></span></code></pre></div><h2 id="进程检测与管理" tabindex="-1"><a class="header-anchor" href="#进程检测与管理"><span>进程检测与管理</span></a></h2><h3 id="process-函数" tabindex="-1"><a class="header-anchor" href="#process-函数"><span>Process 函数</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ProcessExist — 检查进程是否存在（返回PID或0）</span>
<span class="line">pid := ProcessExist(&quot;notepad.exe&quot;)</span>
<span class="line">if pid</span>
<span class="line">    MsgBox &quot;记事本正在运行，PID: &quot; pid</span>
<span class="line">else</span>
<span class="line">    MsgBox &quot;记事本未运行&quot;</span>
<span class="line"></span>
<span class="line">; ProcessClose — 关闭进程</span>
<span class="line">ProcessClose &quot;notepad.exe&quot;</span>
<span class="line"></span>
<span class="line">; ProcessSetPriority — 设置优先级</span>
<span class="line">ProcessSetPriority &quot;High&quot;, &quot;notepad.exe&quot;    ; 高优先级</span>
<span class="line">ProcessSetPriority &quot;Low&quot;, &quot;notepad.exe&quot;     ; 低优先级</span>
<span class="line">; 优先级: Low, BelowNormal, Normal, AboveNormal, High, RealTime</span>
<span class="line"></span>
<span class="line">; ProcessWait — 等待进程出现</span>
<span class="line">ProcessWait &quot;notepad.exe&quot;, 10    ; 等最多10秒</span>
<span class="line"></span>
<span class="line">; ProcessWaitClose — 等待进程退出</span>
<span class="line">ProcessWaitClose &quot;notepad.exe&quot;</span>
<span class="line">MsgBox &quot;记事本已退出&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取进程列表" tabindex="-1"><a class="header-anchor" href="#获取进程列表"><span>获取进程列表</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 获取所有进程PID</span>
<span class="line">pids := ProcessExist()    ; 返回所有进程</span>
<span class="line">for i, pid in pids {</span>
<span class="line">    name := ProcessGetName(pid)</span>
<span class="line">    MsgBox pid &quot;: &quot; name</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 获取进程名</span>
<span class="line">name := ProcessGetName(ProcessExist(&quot;notepad.exe&quot;))</span>
<span class="line">MsgBox name    ; &quot;notepad.exe&quot;</span>
<span class="line"></span></code></pre></div><h2 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量"><span>环境变量</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 读取环境变量</span>
<span class="line">MsgBox EnvGet(&quot;PATH&quot;)</span>
<span class="line">MsgBox EnvGet(&quot;USERPROFILE&quot;)</span>
<span class="line">MsgBox EnvGet(&quot;COMPUTERNAME&quot;)</span>
<span class="line"></span>
<span class="line">; 设置环境变量（仅影响当前脚本及其子进程）</span>
<span class="line">EnvSet &quot;MY_VAR&quot;, &quot;my_value&quot;</span>
<span class="line"></span>
<span class="line">; 扩展环境变量路径</span>
<span class="line">MsgBox ExpandEnvStrings(&quot;%USERPROFILE%\\Documents&quot;)</span>
<span class="line">; → &quot;C:\\Users\\yanni\\Documents&quot;</span>
<span class="line"></span></code></pre></div><h2 id="shell-操作" tabindex="-1"><a class="header-anchor" href="#shell-操作"><span>Shell 操作</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 用 Shell 执行操作</span>
<span class="line">Run &quot;explorer.exe C:\\MyFolder&quot;                    ; 打开文件夹</span>
<span class="line">Run &quot;explorer.exe /select,C:\\test.txt&quot;            ; 定位到文件</span>
<span class="line"></span>
<span class="line">; 系统操作</span>
<span class="line">Run &quot;rundll32.exe shell32.dll,Control_RunDLL&quot;     ; 打开控制面板</span>
<span class="line">Run &quot;sndvol.exe&quot;                                   ; 打开音量控制</span>
<span class="line"></span>
<span class="line">; CMD 命令</span>
<span class="line">Run &quot;cmd.exe /c ipconfig&quot;                          ; 运行CMD命令</span>
<span class="line">Run &quot;cmd.exe /c tasklist&quot;                          ; 查看进程列表</span>
<span class="line"></span>
<span class="line">; PowerShell</span>
<span class="line">Run &quot;powershell -Command Get-Process | Sort-Object CPU -Descending | Select-Object -First 5&quot;</span>
<span class="line"></span></code></pre></div><h2 id="管道与临时文件" tabindex="-1"><a class="header-anchor" href="#管道与临时文件"><span>管道与临时文件</span></a></h2><p>当需要获取命令行输出时，可以用临时文件：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 执行命令并将输出保存到临时文件</span>
<span class="line">tmpFile := A_Temp &quot;\\ahk_output.txt&quot;</span>
<span class="line">RunWait &quot;cmd.exe /c dir C:\\ &gt; &quot; tmpFile, , &quot;Hide&quot;</span>
<span class="line">content := FileRead(tmpFile)</span>
<span class="line">MsgBox content</span>
<span class="line">FileDelete tmpFile</span>
<span class="line"></span>
<span class="line">; 或者用 PowerShell 获取输出</span>
<span class="line">RunWait &#39;powershell -Command &quot;Get-Process | Out-File &#39; tmpFile &#39;&quot;&#39;, , &quot;Hide&quot;</span>
<span class="line">content := FileRead(tmpFile)</span>
<span class="line">MsgBox content</span>
<span class="line">FileDelete tmpFile</span>
<span class="line"></span></code></pre></div><h2 id="a-相关进程变量" tabindex="-1"><a class="header-anchor" href="#a-相关进程变量"><span>A_ 相关进程变量</span></a></h2><table><thead><tr><th>变量</th><th>说明</th></tr></thead><tbody><tr><td><code>A_Args</code></td><td>命令行参数数组</td></tr><tr><td><code>A_IsAdmin</code></td><td>是否以管理员权限运行</td></tr><tr><td><code>A_Temp</code></td><td>临时文件夹路径</td></tr><tr><td><code>A_ComSpec</code></td><td>CMD 路径（通常 <code>C:\\Windows\\system32\\cmd.exe</code>）</td></tr><tr><td><code>A_WinDir</code></td><td>Windows 目录路径</td></tr><tr><td><code>A_AppData</code></td><td>AppData 路径</td></tr><tr><td><code>A_AppDataCommon</code></td><td>公共 AppData 路径</td></tr><tr><td><code>A_Desktop</code></td><td>桌面路径</td></tr><tr><td><code>A_DesktopCommon</code></td><td>公共桌面路径</td></tr><tr><td><code>A_Programs</code></td><td>开始菜单程序路径</td></tr><tr><td><code>A_Startup</code></td><td>启动文件夹路径</td></tr><tr><td><code>A_MyDocuments</code></td><td>我的文档路径</td></tr></tbody></table><h2 id="实用进程脚本" tabindex="-1"><a class="header-anchor" href="#实用进程脚本"><span>实用进程脚本</span></a></h2><h3 id="程序快速启动器" tabindex="-1"><a class="header-anchor" href="#程序快速启动器"><span>程序快速启动器</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; Alt+1~5 快速启动程序</span>
<span class="line">!1:: Run &quot;notepad.exe&quot;</span>
<span class="line">!2:: Run &quot;calc.exe&quot;</span>
<span class="line">!3:: Run &quot;explorer.exe C:\\MyFolder&quot;</span>
<span class="line">!4:: Run &quot;chrome.exe&quot;</span>
<span class="line">!5:: Run &quot;C:\\Program Files\\VSCode\\Code.exe&quot;</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+N — 新建记事本并写入内容</span>
<span class="line">^!n:: {</span>
<span class="line">    Run &quot;notepad.exe&quot;</span>
<span class="line">    WinWait &quot;无标题&quot;, , 3</span>
<span class="line">    if WinExist(&quot;记事本&quot;) {</span>
<span class="line">        Send &quot;AutoHotkey 自动生成的文本&quot;</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="进程监控" tabindex="-1"><a class="header-anchor" href="#进程监控"><span>进程监控</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; 每5秒检查目标进程是否还在运行</span>
<span class="line">SetTimer CheckProcess, 5000</span>
<span class="line"></span>
<span class="line">CheckProcess() {</span>
<span class="line">    if !ProcessExist(&quot;myapp.exe&quot;) {</span>
<span class="line">        MsgBox &quot;myapp.exe 已停止运行！&quot;</span>
<span class="line">        Run &quot;myapp.exe&quot;              ; 自动重启</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="管理员权限检查" tabindex="-1"><a class="header-anchor" href="#管理员权限检查"><span>管理员权限检查</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">if !A_IsAdmin {</span>
<span class="line">    MsgBox &quot;当前不是管理员权限，正在重新以管理员运行...&quot;</span>
<span class="line">    Run &quot;*RunAs &quot; A_ScriptFullPath</span>
<span class="line">    ExitApp</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">MsgBox &quot;已获取管理员权限&quot;</span>
<span class="line"></span></code></pre></div><hr>`,35),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/18-timers.html`},{default:r(()=>[...l[0]||=[e(`18-定时器与回调`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};