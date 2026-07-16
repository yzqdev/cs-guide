import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/20-dll-and-com.html","title":"20 - DLL 调用与 COM","lang":"zh-CN","frontmatter":{"order":20,"description":"20 - DLL 调用与 COM DllCall DllCall 允许 AHK 直接调用 Windows DLL 中的函数，扩展 AHK 能力到系统 API 级别： 基本格式 常用 DllCall 示例 MessageBox（WinAPI） 获取系统信息 窗口操作 鼠标操作 文件操作 类型对照表 Buffer — 内存缓冲区 NumPut / NumG...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"20 - DLL 调用与 COM\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/20-dll-and-com.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"20 - DLL 调用与 COM"}],["meta",{"property":"og:description","content":"20 - DLL 调用与 COM DllCall DllCall 允许 AHK 直接调用 Windows DLL 中的函数，扩展 AHK 能力到系统 API 级别： 基本格式 常用 DllCall 示例 MessageBox（WinAPI） 获取系统信息 窗口操作 鼠标操作 文件操作 类型对照表 Buffer — 内存缓冲区 NumPut / NumG..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":4.46,"words":1338},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/20-dll-and-com.md","autoDesc":true}`),u={name:`20-dll-and-com.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_20-dll-调用与-com" tabindex="-1"><a class="header-anchor" href="#_20-dll-调用与-com"><span>20 - DLL 调用与 COM</span></a></h1><h2 id="dllcall" tabindex="-1"><a class="header-anchor" href="#dllcall"><span>DllCall</span></a></h2><p>DllCall 允许 AHK 直接调用 Windows DLL 中的函数，扩展 AHK 能力到系统 API 级别：</p><h3 id="基本格式" tabindex="-1"><a class="header-anchor" href="#基本格式"><span>基本格式</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; DllCall(函数, 类型1, 参数1, 类型2, 参数2, ..., 返回类型)</span>
<span class="line">; 类型: Int, UInt, Long, ULong, Float, Double, Str, WStr, Ptr, UPtr, Int64, UInt64, Short, UShort, Char, UChar</span>
<span class="line"></span></code></pre></div><h3 id="常用-dllcall-示例" tabindex="-1"><a class="header-anchor" href="#常用-dllcall-示例"><span>常用 DllCall 示例</span></a></h3><h4 id="messagebox-winapi" tabindex="-1"><a class="header-anchor" href="#messagebox-winapi"><span>MessageBox（WinAPI）</span></a></h4><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">; 直接调用 MessageBoxA</span>
<span class="line">result := DllCall(&quot;MessageBoxA&quot;, &quot;Ptr&quot;, 0, &quot;Str&quot;, &quot;Hello from DllCall!&quot;, &quot;Str&quot;, &quot;标题&quot;, &quot;UInt&quot;, 0)</span>
<span class="line">MsgBox &quot;返回值: &quot; result   ; 1=OK</span>
<span class="line"></span></code></pre></div><h4 id="获取系统信息" tabindex="-1"><a class="header-anchor" href="#获取系统信息"><span>获取系统信息</span></a></h4><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 获取计算机名</span>
<span class="line">buf := Buffer(256)</span>
<span class="line">DllCall(&quot;GetComputerNameA&quot;, &quot;Ptr&quot;, buf, &quot;UInt*&quot;, 256)</span>
<span class="line">MsgBox &quot;计算机名: &quot; StrGet(buf)</span>
<span class="line"></span>
<span class="line">; 获取用户名</span>
<span class="line">buf := Buffer(256)</span>
<span class="line">DllCall(&quot;GetUserNameA&quot;, &quot;Ptr&quot;, buf, &quot;UInt*&quot;, 256)</span>
<span class="line">MsgBox &quot;用户名: &quot; StrGet(buf)</span>
<span class="line"></span>
<span class="line">; 获取系统启动时间</span>
<span class="line">DllCall(&quot;GetTickCount64&quot;, &quot;Int64*&quot;, &amp;tick)</span>
<span class="line">MsgBox &quot;系统启动 &quot; tick / 1000 &quot; 秒&quot;</span>
<span class="line"></span></code></pre></div><h4 id="窗口操作" tabindex="-1"><a class="header-anchor" href="#窗口操作"><span>窗口操作</span></a></h4><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 获取窗口句柄</span>
<span class="line">hwnd := WinGetID(&quot;计算器&quot;)</span>
<span class="line"></span>
<span class="line">; 设置窗口标题</span>
<span class="line">DllCall(&quot;SetWindowTextA&quot;, &quot;Ptr&quot;, hwnd, &quot;Str&quot;, &quot;新标题&quot;)</span>
<span class="line"></span>
<span class="line">; 获取窗口标题长度</span>
<span class="line">len := DllCall(&quot;GetWindowTextLengthA&quot;, &quot;Ptr&quot;, hwnd)</span>
<span class="line">MsgBox &quot;标题长度: &quot; len</span>
<span class="line"></span>
<span class="line">; 判断窗口是否可见</span>
<span class="line">visible := DllCall(&quot;IsWindowVisible&quot;, &quot;Ptr&quot;, hwnd)</span>
<span class="line">MsgBox &quot;可见: &quot; visible</span>
<span class="line"></span></code></pre></div><h4 id="鼠标操作" tabindex="-1"><a class="header-anchor" href="#鼠标操作"><span>鼠标操作</span></a></h4><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 设置鼠标位置</span>
<span class="line">DllCall(&quot;SetCursorPos&quot;, &quot;Int&quot;, 500, &quot;Int&quot;, 300)</span>
<span class="line"></span>
<span class="line">; 获取鼠标位置</span>
<span class="line">DllCall(&quot;GetCursorPos&quot;, &quot;Int*&quot;, &amp;x, &quot;Int*&quot;, &amp;y)</span>
<span class="line">MsgBox &quot;鼠标: (&quot; x &quot;, &quot; y &quot;)&quot;</span>
<span class="line"></span></code></pre></div><h4 id="文件操作" tabindex="-1"><a class="header-anchor" href="#文件操作"><span>文件操作</span></a></h4><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 复制文件（用 WinAPI）</span>
<span class="line">DllCall(&quot;CopyFileA&quot;, &quot;Str&quot;, &quot;C:\\src.txt&quot;, &quot;Str&quot;, &quot;C:\\dst.txt&quot;, &quot;UInt&quot;, 0)</span>
<span class="line">; 第三个参数: 0=允许覆盖, 1=不覆盖</span>
<span class="line"></span>
<span class="line">; 删除文件</span>
<span class="line">DllCall(&quot;DeleteFileA&quot;, &quot;Str&quot;, &quot;C:\\temp.txt&quot;)</span>
<span class="line"></span></code></pre></div><h3 id="类型对照表" tabindex="-1"><a class="header-anchor" href="#类型对照表"><span>类型对照表</span></a></h3><table><thead><tr><th>AHK 类型</th><th>C 类型</th><th>说明</th></tr></thead><tbody><tr><td><code>Int</code></td><td><code>int</code></td><td>32位有符号整数</td></tr><tr><td><code>UInt</code></td><td><code>unsigned int</code></td><td>32位无符号整数</td></tr><tr><td><code>Short</code></td><td><code>short</code></td><td>16位有符号</td></tr><tr><td><code>UShort</code></td><td><code>unsigned short</code></td><td>16位无符号</td></tr><tr><td><code>Char</code></td><td><code>char</code></td><td>8位有符号</td></tr><tr><td><code>UChar</code></td><td><code>unsigned char</code></td><td>8位无符号</td></tr><tr><td><code>Long</code></td><td><code>long</code></td><td>32位有符号</td></tr><tr><td><code>ULong</code></td><td><code>unsigned long</code></td><td>32位无符号</td></tr><tr><td><code>Int64</code></td><td><code>__int64</code></td><td>64位有符号</td></tr><tr><td><code>UInt64</code></td><td><code>unsigned __int64</code></td><td>64位无符号</td></tr><tr><td><code>Float</code></td><td><code>float</code></td><td>32位浮点</td></tr><tr><td><code>Double</code></td><td><code>double</code></td><td>64位浮点</td></tr><tr><td><code>Str</code></td><td><code>char*</code></td><td>ANSI字符串</td></tr><tr><td><code>WStr</code></td><td><code>wchar_t*</code></td><td>Unicode字符串</td></tr><tr><td><code>Ptr</code></td><td><code>void*</code> / <code>HWND</code> 等</td><td>指针（32/64位）</td></tr><tr><td><code>UPtr</code></td><td><code>unsigned void*</code></td><td>无符号指针</td></tr></tbody></table><h3 id="buffer-—-内存缓冲区" tabindex="-1"><a class="header-anchor" href="#buffer-—-内存缓冲区"><span>Buffer — 内存缓冲区</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 创建内存缓冲区</span>
<span class="line">buf := Buffer(256)          ; 256字节</span>
<span class="line">buf := Buffer(256, 0)       ; 256字节，初始值0</span>
<span class="line"></span>
<span class="line">; 读写缓冲区</span>
<span class="line">NumPut(42, buf, 0, &quot;Int&quot;)   ; 在偏移0写入整数42</span>
<span class="line">value := NumGet(buf, 0, &quot;Int&quot;)  ; 从偏移0读取整数</span>
<span class="line">MsgBox value                 ; 42</span>
<span class="line"></span>
<span class="line">; 字符串读写</span>
<span class="line">StrPut(&quot;Hello&quot;, buf, &quot;UTF-8&quot;)</span>
<span class="line">MsgBox StrGet(buf, &quot;UTF-8&quot;)   ; &quot;Hello&quot;</span>
<span class="line"></span>
<span class="line">; 指针大小</span>
<span class="line">MsgBox A_PtrSize  ; 4(32位AHK) 或 8(64位AHK)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="numput-numget" tabindex="-1"><a class="header-anchor" href="#numput-numget"><span>NumPut / NumGet</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">buf := Buffer(32)</span>
<span class="line"></span>
<span class="line">; NumPut(值, 缓冲区, 偏移, 类型)</span>
<span class="line">NumPut(100, buf, 0, &quot;Int&quot;)         ; 偏移0: 整数100</span>
<span class="line">NumPut(3.14, buf, 4, &quot;Float&quot;)      ; 偏移4: 浮点3.14</span>
<span class="line">NumPut(99999, buf, 8, &quot;UInt&quot;)      ; 偏移8: 无符号整数</span>
<span class="line"></span>
<span class="line">; NumGet(缓冲区, 偏移, 类型)</span>
<span class="line">MsgBox NumGet(buf, 0, &quot;Int&quot;)       ; 100</span>
<span class="line">MsgBox NumGet(buf, 4, &quot;Float&quot;)     ; 3.14</span>
<span class="line">MsgBox NumGet(buf, 8, &quot;UInt&quot;)      ; 99999</span>
<span class="line"></span></code></pre></div><h2 id="com-对象" tabindex="-1"><a class="header-anchor" href="#com-对象"><span>COM 对象</span></a></h2><p>COM (Component Object Model) 是 Windows 的组件对象模型，AHK 可以通过 <code>ComObject</code> 创建和操控 COM 对象：</p><h3 id="创建-com-对象" tabindex="-1"><a class="header-anchor" href="#创建-com-对象"><span>创建 COM 对象</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ComObject(ProgID 或 CLSID)</span>
<span class="line">; ProgID 是 COM 对象的程序标识符</span>
<span class="line"></span>
<span class="line">; 创建 Excel 对象</span>
<span class="line">excel := ComObject(&quot;Excel.Application&quot;)</span>
<span class="line"></span>
<span class="line">; 创建 Word 对象</span>
<span class="line">word := ComObject(&quot;Word.Application&quot;)</span>
<span class="line"></span>
<span class="line">; 创建 Shell 对象</span>
<span class="line">shell := ComObject(&quot;Shell.Application&quot;)</span>
<span class="line"></span>
<span class="line">; 创建 WScript.Shell 对象</span>
<span class="line">wsh := ComObject(&quot;WScript.Shell&quot;)</span>
<span class="line"></span>
<span class="line">; 创建 FileSystemObject</span>
<span class="line">fso := ComObject(&quot;Scripting.FileSystemObject&quot;)</span>
<span class="line"></span>
<span class="line">; 创建 InternetExplorer 对象</span>
<span class="line">ie := ComObject(&quot;InternetExplorer.Application&quot;)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="shell-操作" tabindex="-1"><a class="header-anchor" href="#shell-操作"><span>Shell 操作</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; WScript.Shell — 最常用的 COM 对象</span>
<span class="line">wsh := ComObject(&quot;WScript.Shell&quot;)</span>
<span class="line"></span>
<span class="line">; 运行程序</span>
<span class="line">wsh.Run(&quot;notepad.exe&quot;)</span>
<span class="line">wsh.Run(&quot;calc.exe&quot;, 1, true)   ; 1=正常窗口, true=等待</span>
<span class="line"></span>
<span class="line">; 弹窗</span>
<span class="line">wsh.Popup(&quot;Hello from COM!&quot;, 5, &quot;标题&quot;, 64)  ; 5秒自动关闭</span>
<span class="line"></span>
<span class="line">; 注册表读写</span>
<span class="line">val := wsh.RegRead(&quot;HKCU\\Software\\MyApp\\Setting&quot;)</span>
<span class="line">wsh.RegWrite(&quot;REG_SZ&quot;, &quot;HKCU\\Software\\MyApp\\Setting&quot;, &quot;NewValue&quot;)</span>
<span class="line"></span>
<span class="line">; 环境变量</span>
<span class="line">wsh.ExpandEnvironmentStrings(&quot;%USERPROFILE%&quot;)   ; 展开环境变量</span>
<span class="line"></span>
<span class="line">; 特殊文件夹</span>
<span class="line">MsgBox wsh.SpecialFolders(&quot;Desktop&quot;)             ; 桌面路径</span>
<span class="line">MsgBox wsh.SpecialFolders(&quot;MyDocuments&quot;)         ; 文档路径</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="excel-自动化" tabindex="-1"><a class="header-anchor" href="#excel-自动化"><span>Excel 自动化</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; 创建 Excel 实例</span>
<span class="line">excel := ComObject(&quot;Excel.Application&quot;)</span>
<span class="line">excel.Visible := true                    ; 显示 Excel 窗口</span>
<span class="line"></span>
<span class="line">; 新建工作簿</span>
<span class="line">wb := excel.Workbooks.Add()</span>
<span class="line"></span>
<span class="line">; 写入数据</span>
<span class="line">ws := wb.ActiveSheet</span>
<span class="line">ws.Cells(1, 1).Value := &quot;姓名&quot;</span>
<span class="line">ws.Cells(1, 2).Value := &quot;分数&quot;</span>
<span class="line">ws.Cells(2, 1).Value := &quot;Alice&quot;</span>
<span class="line">ws.Cells(2, 2).Value := 95</span>
<span class="line">ws.Cells(3, 1).Value := &quot;Bob&quot;</span>
<span class="line">ws.Cells(3, 2).Value := 87</span>
<span class="line"></span>
<span class="line">; 保存</span>
<span class="line">wb.SaveAs(A_ScriptDir &quot;\\test.xlsx&quot;)</span>
<span class="line"></span>
<span class="line">; 读取数据</span>
<span class="line">MsgBox ws.Cells(2, 2).Value   ; 95</span>
<span class="line"></span>
<span class="line">; 关闭（可选）</span>
<span class="line">; wb.Close()</span>
<span class="line">; excel.Quit()</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="filesystemobject" tabindex="-1"><a class="header-anchor" href="#filesystemobject"><span>FileSystemObject</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">fso := ComObject(&quot;Scripting.FileSystemObject&quot;)</span>
<span class="line"></span>
<span class="line">; 检查文件是否存在</span>
<span class="line">if fso.FileExists(&quot;C:\\test.txt&quot;)</span>
<span class="line">    MsgBox &quot;文件存在&quot;</span>
<span class="line"></span>
<span class="line">; 检查文件夹</span>
<span class="line">if fso.FolderExists(&quot;C:\\MyFolder&quot;)</span>
<span class="line">    MsgBox &quot;文件夹存在&quot;</span>
<span class="line"></span>
<span class="line">; 获取文件信息</span>
<span class="line">file := fso.GetFile(&quot;C:\\test.txt&quot;)</span>
<span class="line">MsgBox &quot;文件名: &quot; file.Name</span>
<span class="line">MsgBox &quot;大小: &quot; file.Size &quot; 字节&quot;</span>
<span class="line">MsgBox &quot;路径: &quot; file.Path</span>
<span class="line"></span>
<span class="line">; 创建文件夹</span>
<span class="line">fso.CreateFolder(&quot;C:\\NewFolder&quot;)</span>
<span class="line"></span>
<span class="line">; 复制文件</span>
<span class="line">fso.CopyFile(&quot;C:\\src.txt&quot;, &quot;C:\\dst.txt&quot;)</span>
<span class="line"></span>
<span class="line">; 删除文件</span>
<span class="line">fso.DeleteFile(&quot;C:\\temp.txt&quot;)</span>
<span class="line"></span>
<span class="line">; 驱动器信息</span>
<span class="line">drive := fso.GetDrive(&quot;C:&quot;)</span>
<span class="line">MsgBox &quot;可用空间: &quot; drive.AvailableSpace &quot; 字节&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="shell-application-—-窗口管理" tabindex="-1"><a class="header-anchor" href="#shell-application-—-窗口管理"><span>Shell.Application — 窗口管理</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">shell := ComObject(&quot;Shell.Application&quot;)</span>
<span class="line"></span>
<span class="line">; 最小化所有窗口</span>
<span class="line">shell.MinimizeAll()</span>
<span class="line"></span>
<span class="line">; 撤消最小化所有窗口</span>
<span class="line">shell.UndoMinimizeAll()</span>
<span class="line"></span>
<span class="line">; 打开文件夹</span>
<span class="line">shell.Explore(&quot;C:\\MyFolder&quot;)</span>
<span class="line"></span>
<span class="line">; 打开运行对话框</span>
<span class="line">shell.FileRun()</span>
<span class="line"></span>
<span class="line">; 查找文件</span>
<span class="line">shell.FindFiles()</span>
<span class="line"></span>
<span class="line">; 关闭Windows</span>
<span class="line">; shell.ShutdownWindows()    ; 会弹出关机对话框</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="com-事件绑定" tabindex="-1"><a class="header-anchor" href="#com-事件绑定"><span>COM 事件绑定</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 创建带事件的 COM 对象</span>
<span class="line">ie := ComObject(&quot;InternetExplorer.Application&quot;)</span>
<span class="line"></span>
<span class="line">; 绑定事件</span>
<span class="line">; ComObjConnect(com对象, 事件处理前缀)</span>
<span class="line">; 或者用对象方式处理事件</span>
<span class="line"></span></code></pre></div><h2 id="实用-com-dllcall-脚本" tabindex="-1"><a class="header-anchor" href="#实用-com-dllcall-脚本"><span>实用 COM/DllCall 脚本</span></a></h2><h3 id="系统音量控制" tabindex="-1"><a class="header-anchor" href="#系统音量控制"><span>系统音量控制</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; 获取当前音量</span>
<span class="line">GetVolume() {</span>
<span class="line">    ; 通过 DllCall 操作音量 API</span>
<span class="line">    ; 简单方式：用 Send 发送音量键</span>
<span class="line">    return 0  ; 精确获取需要更复杂的 COM 操作</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 增加音量</span>
<span class="line">^Up:: Send &quot;{Volume_Up}&quot;</span>
<span class="line"></span>
<span class="line">; 减少音量</span>
<span class="line">^Down:: Send &quot;{Volume_Down}&quot;</span>
<span class="line"></span>
<span class="line">; 静音切换</span>
<span class="line">^M:: Send &quot;{Volume_Mute}&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="屏幕分辨率获取" tabindex="-1"><a class="header-anchor" href="#屏幕分辨率获取"><span>屏幕分辨率获取</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">; 用 DllCall 获取精确分辨率</span>
<span class="line">DllCall(&quot;GetSystemMetrics&quot;, &quot;Int&quot;, 0, &quot;Int&quot;)  ; SM_CXSCREEN = 0</span>
<span class="line">width := DllCall(&quot;GetSystemMetrics&quot;, &quot;Int&quot;, 0, &quot;Int&quot;)</span>
<span class="line">height := DllCall(&quot;GetSystemMetrics&quot;, &quot;Int&quot;, 1, &quot;Int&quot;)</span>
<span class="line">MsgBox &quot;屏幕分辨率: &quot; width &quot; x &quot; height</span>
<span class="line"></span></code></pre></div><h3 id="系统空闲时间检测" tabindex="-1"><a class="header-anchor" href="#系统空闲时间检测"><span>系统空闲时间检测</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">GetIdleTime() {</span>
<span class="line">    ; LASTINPUTINFO 结构</span>
<span class="line">    lii := Buffer(A_PtrSize + 4)</span>
<span class="line">    NumPut(A_PtrSize + 4, lii, 0, &quot;UInt&quot;)</span>
<span class="line">    DllCall(&quot;GetLastInputInfo&quot;, &quot;Ptr&quot;, lii)</span>
<span class="line">    lastInput := NumGet(lii, A_PtrSize, &quot;UInt&quot;)</span>
<span class="line">    tick := DllCall(&quot;GetTickCount&quot;, &quot;UInt&quot;)</span>
<span class="line">    return (tick - lastInput) // 1000   ; 返回秒数</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">SetTimer CheckIdle, 1000</span>
<span class="line"></span>
<span class="line">CheckIdle() {</span>
<span class="line">    idle := GetIdleTime()</span>
<span class="line">    if (idle &gt; 300)    ; 5分钟无操作</span>
<span class="line">        ToolTip &quot;空闲 &quot; idle &quot; 秒&quot;</span>
<span class="line">    else</span>
<span class="line">        ToolTip &quot;&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">Esc:: ExitApp</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>`,44),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/21-regex.html`},{default:r(()=>[...l[0]||=[e(`21-正则表达式`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};