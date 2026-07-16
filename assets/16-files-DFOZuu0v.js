import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/16-files.html","title":"16 - 文件操作","lang":"zh-CN","frontmatter":{"order":16,"description":"16 - 文件操作 文件读写 FileRead — 读取整个文件 FileWrite — 写入文件（覆盖） FileAppend — 追加内容 文件打开读写（FileObj） FileSelect 文件选择对话框 文件信息与检查 文件操作 文件遍历 Loop Files Loop Files 内置变量 INI 文件操作 INI 文件是 Windows ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"16 - 文件操作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/16-files.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"16 - 文件操作"}],["meta",{"property":"og:description","content":"16 - 文件操作 文件读写 FileRead — 读取整个文件 FileWrite — 写入文件（覆盖） FileAppend — 追加内容 文件打开读写（FileObj） FileSelect 文件选择对话框 文件信息与检查 文件操作 文件遍历 Loop Files Loop Files 内置变量 INI 文件操作 INI 文件是 Windows ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.94,"words":1183},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/16-files.md","autoDesc":true}`),u={name:`16-files.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_16-文件操作" tabindex="-1"><a class="header-anchor" href="#_16-文件操作"><span>16 - 文件操作</span></a></h1><h2 id="文件读写" tabindex="-1"><a class="header-anchor" href="#文件读写"><span>文件读写</span></a></h2><h3 id="fileread-—-读取整个文件" tabindex="-1"><a class="header-anchor" href="#fileread-—-读取整个文件"><span>FileRead — 读取整个文件</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">; FileRead(文件路径, 选项)</span>
<span class="line">content := FileRead(&quot;C:\\test.txt&quot;)</span>
<span class="line">MsgBox content</span>
<span class="line"></span>
<span class="line">; 读取选项</span>
<span class="line">content := FileRead(&quot;C:\\test.txt&quot;, &quot;RAW&quot;)   ; 原始二进制读取</span>
<span class="line">content := FileRead(&quot;C:\\test.txt&quot;, &quot;\`n&quot;)    ; 指定换行符</span>
<span class="line"></span></code></pre></div><h3 id="filewrite-—-写入文件-覆盖" tabindex="-1"><a class="header-anchor" href="#filewrite-—-写入文件-覆盖"><span>FileWrite — 写入文件（覆盖）</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; FileWrite(内容, 文件路径)</span>
<span class="line">FileWrite &quot;Hello World\`n&quot;, &quot;C:\\output.txt&quot;</span>
<span class="line"></span>
<span class="line">; 写入多行</span>
<span class="line">text := &quot;第一行\`n第二行\`n第三行\`n&quot;</span>
<span class="line">FileWrite text, &quot;C:\\output.txt&quot;</span>
<span class="line"></span></code></pre></div><h3 id="fileappend-—-追加内容" tabindex="-1"><a class="header-anchor" href="#fileappend-—-追加内容"><span>FileAppend — 追加内容</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; FileAppend(内容, 文件路径)</span>
<span class="line">FileAppend &quot;追加的一行\`n&quot;, &quot;C:\\log.txt&quot;</span>
<span class="line"></span>
<span class="line">; 追加多行</span>
<span class="line">Loop 5 {</span>
<span class="line">    FileAppend &quot;第 &quot; A_Index &quot; 次追加\`n&quot;, &quot;C:\\log.txt&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="文件打开读写-fileobj" tabindex="-1"><a class="header-anchor" href="#文件打开读写-fileobj"><span>文件打开读写（FileObj）</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 打开文件对象 — 更灵活的读写方式</span>
<span class="line">f := FileOpen(&quot;C:\\test.txt&quot;, &quot;w&quot;)    ; &quot;w&quot; = 写模式</span>
<span class="line">f.Write(&quot;Hello World\`n&quot;)</span>
<span class="line">f.Write(&quot;第二行\`n&quot;)</span>
<span class="line">f.Close()                            ; 必须关闭！</span>
<span class="line"></span>
<span class="line">; 读取</span>
<span class="line">f := FileOpen(&quot;C:\\test.txt&quot;, &quot;r&quot;)    ; &quot;r&quot; = 读模式</span>
<span class="line">content := f.Read()</span>
<span class="line">f.Close()</span>
<span class="line"></span>
<span class="line">; 模式说明</span>
<span class="line">; &quot;r&quot;  — 只读</span>
<span class="line">; &quot;w&quot;  — 只写（覆盖）</span>
<span class="line">; &quot;a&quot;  — 追加</span>
<span class="line">; &quot;rw&quot; — 读写</span>
<span class="line">; &quot;h&quot;  — 用句柄打开</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="fileselect-文件选择对话框" tabindex="-1"><a class="header-anchor" href="#fileselect-文件选择对话框"><span>FileSelect 文件选择对话框</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; FileSelectFile — 选择文件</span>
<span class="line">selected := FileSelect(&quot;S&quot;, &quot;C:\\&quot;, &quot;选择文件&quot;, &quot;文本文件 (*.txt)&quot;)</span>
<span class="line">if (selected != &quot;&quot;)</span>
<span class="line">    MsgBox &quot;选择了: &quot; selected</span>
<span class="line"></span>
<span class="line">; 多选模式</span>
<span class="line">selected := FileSelect(&quot;M&quot;, &quot;C:\\&quot;, &quot;选择多个文件&quot;, &quot;所有文件 (*.*)&quot;)</span>
<span class="line">for i, file in selected {</span>
<span class="line">    MsgBox file</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; FileSelectFolder — 选择文件夹</span>
<span class="line">folder := FileSelectFolder(&quot;C:\\&quot;, &quot;选择文件夹&quot;)</span>
<span class="line">if (folder != &quot;&quot;)</span>
<span class="line">    MsgBox &quot;选择了: &quot; folder</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文件信息与检查" tabindex="-1"><a class="header-anchor" href="#文件信息与检查"><span>文件信息与检查</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; FileExist — 检查文件/目录是否存在</span>
<span class="line">result := FileExist(&quot;C:\\test.txt&quot;)</span>
<span class="line">MsgBox result    ; 返回属性字符串如 &quot;A&quot;（归档），&quot;&quot;表示不存在</span>
<span class="line"></span>
<span class="line">; DirExist — 检查目录是否存在</span>
<span class="line">if DirExist(&quot;C:\\MyFolder&quot;)</span>
<span class="line">    MsgBox &quot;目录存在&quot;</span>
<span class="line"></span>
<span class="line">; FileGetSize — 文件大小</span>
<span class="line">size := FileGetSize(&quot;C:\\test.txt&quot;)</span>
<span class="line">MsgBox &quot;大小: &quot; size &quot; 字节&quot;</span>
<span class="line"></span>
<span class="line">; FileGetTime — 文件时间</span>
<span class="line">modTime := FileGetTime(&quot;C:\\test.txt&quot;, &quot;M&quot;)   ; M=修改时间</span>
<span class="line">MsgBox &quot;修改时间: &quot; modTime</span>
<span class="line"></span>
<span class="line">; FileGetAttrib — 文件属性</span>
<span class="line">attr := FileGetAttrib(&quot;C:\\test.txt&quot;)</span>
<span class="line">MsgBox &quot;属性: &quot; attr</span>
<span class="line"></span>
<span class="line">; 属性字符含义:</span>
<span class="line">; R = 只读, A = 归档, S = 系统, H = 隐藏, N = 普通</span>
<span class="line">; D = 目录, O = 离线, T = 临时</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文件操作" tabindex="-1"><a class="header-anchor" href="#文件操作"><span>文件操作</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; FileCopy — 复制文件</span>
<span class="line">FileCopy &quot;C:\\src.txt&quot;, &quot;C:\\dst.txt&quot;, true   ; true=覆盖已存在的</span>
<span class="line"></span>
<span class="line">; FileMove — 移动/重命名文件</span>
<span class="line">FileMove &quot;C:\\old.txt&quot;, &quot;C:\\new.txt&quot;, true</span>
<span class="line"></span>
<span class="line">; FileDelete — 删除文件</span>
<span class="line">FileDelete &quot;C:\\temp.txt&quot;</span>
<span class="line"></span>
<span class="line">; DirCopy — 复制目录</span>
<span class="line">DirCopy &quot;C:\\SrcFolder&quot;, &quot;C:\\DstFolder&quot;, true</span>
<span class="line"></span>
<span class="line">; DirMove — 移动/重命名目录</span>
<span class="line">DirMove &quot;C:\\OldFolder&quot;, &quot;C:\\NewFolder&quot;</span>
<span class="line"></span>
<span class="line">; DirDelete — 删除目录</span>
<span class="line">DirDelete &quot;C:\\TempFolder&quot;, true   ; true=递归删除（含子目录）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文件遍历" tabindex="-1"><a class="header-anchor" href="#文件遍历"><span>文件遍历</span></a></h2><h3 id="loop-files" tabindex="-1"><a class="header-anchor" href="#loop-files"><span>Loop Files</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 遍历目录中的文件</span>
<span class="line">Loop Files &quot;C:\\MyFolder\\*.*&quot; {</span>
<span class="line">    MsgBox A_LoopFileName            ; 文件名</span>
<span class="line">    MsgBox A_LoopFileFullPath        ; 完整路径</span>
<span class="line">    MsgBox A_LoopFileExt             ; 扩展名</span>
<span class="line">    MsgBox A_LoopFileSize            ; 文件大小</span>
<span class="line">    MsgBox A_LoopFileAttrib          ; 属性</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 只遍历 .txt 文件</span>
<span class="line">Loop Files &quot;C:\\MyFolder\\*.txt&quot; {</span>
<span class="line">    MsgBox A_LoopFileName</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 递归遍历（含子目录）— 加 &quot;R&quot; 选项</span>
<span class="line">Loop Files &quot;C:\\MyFolder\\*.*&quot;, &quot;R&quot; {</span>
<span class="line">    MsgBox A_LoopFileFullPath</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 只遍历目录（不含文件）— 加 &quot;D&quot; 选项</span>
<span class="line">Loop Files &quot;C:\\MyFolder\\*&quot;, &quot;D&quot; {</span>
<span class="line">    MsgBox &quot;[DIR] &quot; A_LoopFileName</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 递历遍历目录</span>
<span class="line">Loop Files &quot;C:\\MyFolder\\*&quot;, &quot;DR&quot; {</span>
<span class="line">    MsgBox &quot;[DIR] &quot; A_LoopFileFullPath</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="loop-files-内置变量" tabindex="-1"><a class="header-anchor" href="#loop-files-内置变量"><span>Loop Files 内置变量</span></a></h3><table><thead><tr><th>变量</th><th>说明</th></tr></thead><tbody><tr><td><code>A_LoopFileName</code></td><td>文件名（含扩展名）</td></tr><tr><td><code>A_LoopFileExt</code></td><td>扩展名（不含点）</td></tr><tr><td><code>A_LoopFileFullPath</code></td><td>完整路径</td></tr><tr><td><code>A_LoopFileDir</code></td><td>文件所在目录</td></tr><tr><td><code>A_LoopFileSize</code></td><td>文件大小（字节）</td></tr><tr><td><code>A_LoopFileAttrib</code></td><td>文件属性</td></tr><tr><td><code>A_LoopFileTimeModified</code></td><td>修改时间</td></tr><tr><td><code>A_LoopFileTimeCreated</code></td><td>创建时间</td></tr><tr><td><code>A_LoopFileTimeAccessed</code></td><td>访问时间</td></tr></tbody></table><h2 id="ini-文件操作" tabindex="-1"><a class="header-anchor" href="#ini-文件操作"><span>INI 文件操作</span></a></h2><p>INI 文件是 Windows 常用的配置文件格式：</p><div class="language-ini" data-highlighter="prismjs" data-ext="ini"><pre><code class="language-ini"><span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Section</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">Key</span><span class="token punctuation">=</span><span class="token value attr-value">Value</span></span>
<span class="line"></span></code></pre></div><h3 id="ini-读写" tabindex="-1"><a class="header-anchor" href="#ini-读写"><span>INI 读写</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; IniRead(文件, 节, 键, 默认值)</span>
<span class="line">value := IniRead(&quot;C:\\config.ini&quot;, &quot;Settings&quot;, &quot;Font&quot;, &quot;Arial&quot;)</span>
<span class="line">MsgBox &quot;字体设置: &quot; value</span>
<span class="line"></span>
<span class="line">; IniWrite(值, 文件, 节, 键)</span>
<span class="line">IniWrite &quot;Consolas&quot;, &quot;C:\\config.ini&quot;, &quot;Settings&quot;, &quot;Font&quot;</span>
<span class="line"></span>
<span class="line">; IniDelete(文件, 节, 键)</span>
<span class="line">IniDelete &quot;C:\\config.ini&quot;, &quot;Settings&quot;, &quot;Font&quot;</span>
<span class="line"></span>
<span class="line">; 删除整个节</span>
<span class="line">IniDelete &quot;C:\\config.ini&quot;, &quot;Settings&quot;</span>
<span class="line"></span></code></pre></div><h3 id="ini-实例" tabindex="-1"><a class="header-anchor" href="#ini-实例"><span>INI 实例</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 读取配置</span>
<span class="line">configPath := A_ScriptDir &quot;\\config.ini&quot;</span>
<span class="line"></span>
<span class="line">fontName := IniRead(configPath, &quot;Editor&quot;, &quot;Font&quot;, &quot;Consolas&quot;)</span>
<span class="line">fontSize := IniRead(configPath, &quot;Editor&quot;, &quot;Size&quot;, 12)</span>
<span class="line">autoSave := IniRead(configPath, &quot;Editor&quot;, &quot;AutoSave&quot;, 0)</span>
<span class="line"></span>
<span class="line">MsgBox &quot;Font: &quot; fontName &quot; Size: &quot; fontSize &quot; AutoSave: &quot; autoSave</span>
<span class="line"></span>
<span class="line">; 写入配置</span>
<span class="line">IniWrite fontName, configPath, &quot;Editor&quot;, &quot;Font&quot;</span>
<span class="line">IniWrite fontSize, configPath, &quot;Editor&quot;, &quot;Size&quot;</span>
<span class="line">IniWrite autoSave, configPath, &quot;Editor&quot;, &quot;AutoSave&quot;</span>
<span class="line"></span></code></pre></div><h2 id="文件编码" tabindex="-1"><a class="header-anchor" href="#文件编码"><span>文件编码</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; AHK v2 默认 UTF-8 编码</span>
<span class="line">; FileOpen 可以指定编码</span>
<span class="line">f := FileOpen(&quot;C:\\test.txt&quot;, &quot;w&quot;, &quot;UTF-8&quot;)</span>
<span class="line">f.Write(&quot;中文内容&quot;)</span>
<span class="line">f.Close()</span>
<span class="line"></span>
<span class="line">; 读取时自动检测编码</span>
<span class="line">f := FileOpen(&quot;C:\\test.txt&quot;, &quot;r&quot;)</span>
<span class="line">content := f.Read()</span>
<span class="line">f.Close()</span>
<span class="line"></span>
<span class="line">; 常见编码</span>
<span class="line">; &quot;UTF-8&quot;     — UTF-8（推荐）</span>
<span class="line">; &quot;UTF-8-RAW&quot; — UTF-8 无BOM</span>
<span class="line">; &quot;CP0&quot;       — 系统默认编码（中文Windows = GBK）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文件路径操作" tabindex="-1"><a class="header-anchor" href="#文件路径操作"><span>文件路径操作</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; A_ScriptDir — 脚本所在目录（最常用）</span>
<span class="line">path := A_ScriptDir &quot;\\data\\config.ini&quot;</span>
<span class="line"></span>
<span class="line">; A_WorkingDir — 当前工作目录</span>
<span class="line">MsgBox A_WorkingDir</span>
<span class="line"></span>
<span class="line">; SetWorkingDir — 设置工作目录</span>
<span class="line">SetWorkingDir &quot;C:\\MyProject&quot;</span>
<span class="line"></span>
<span class="line">; 路径拼接 — 用 \\ 连接</span>
<span class="line">fullPath := A_ScriptDir &quot;\\output\\result.txt&quot;</span>
<span class="line"></span>
<span class="line">; 获取路径各部分</span>
<span class="line">SplitPath &quot;C:\\Users\\test\\file.txt&quot;, &amp;name, &amp;dir, &amp;ext, &amp;nameNoExt, &amp;drive</span>
<span class="line">MsgBox &quot;文件名: &quot; name          ; &quot;file.txt&quot;</span>
<span class="line">MsgBox &quot;目录: &quot; dir              ; &quot;C:\\Users\\test&quot;</span>
<span class="line">MsgBox &quot;扩展名: &quot; ext            ; &quot;txt&quot;</span>
<span class="line">MsgBox &quot;无扩展名: &quot; nameNoExt   ; &quot;file&quot;</span>
<span class="line">MsgBox &quot;驱动器: &quot; drive          ; &quot;C:&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实用文件脚本" tabindex="-1"><a class="header-anchor" href="#实用文件脚本"><span>实用文件脚本</span></a></h2><h3 id="文件搜索器" tabindex="-1"><a class="header-anchor" href="#文件搜索器"><span>文件搜索器</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+F 搜索文件</span>
<span class="line">^!f:: {</span>
<span class="line">    folder := FileSelectFolder(&quot;&quot;, &quot;选择搜索目录&quot;)</span>
<span class="line">    if (folder = &quot;&quot;)</span>
<span class="line">        return</span>
<span class="line"></span>
<span class="line">    pattern := InputBox(&quot;输入搜索模式 (如 *.txt)&quot;, &quot;文件搜索&quot;)</span>
<span class="line">    if (pattern = &quot;&quot;)</span>
<span class="line">        return</span>
<span class="line"></span>
<span class="line">    results := &quot;&quot;</span>
<span class="line">    Loop Files folder &quot;\\&quot; pattern, &quot;R&quot; {</span>
<span class="line">        results .= A_LoopFileFullPath &quot;\`n&quot;</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    if (results = &quot;&quot;)</span>
<span class="line">        MsgBox &quot;没有找到匹配文件&quot;</span>
<span class="line">    else</span>
<span class="line">        MsgBox &quot;找到的文件:\`n&quot; results</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="日志记录" tabindex="-1"><a class="header-anchor" href="#日志记录"><span>日志记录</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">logFile := A_ScriptDir &quot;\\log.txt&quot;</span>
<span class="line"></span>
<span class="line">LogWrite(msg) {</span>
<span class="line">    timestamp := A_Now</span>
<span class="line">    formatted := SubStr(timestamp, 1, 4) &quot;/&quot; SubStr(timestamp, 5, 2) &quot;/&quot; SubStr(timestamp, 7, 2)</span>
<span class="line">        . &quot; &quot; SubStr(timestamp, 9, 2) &quot;:&quot; SubStr(timestamp, 11, 2) &quot;:&quot; SubStr(timestamp, 13, 2)</span>
<span class="line">    FileAppend formatted &quot; — &quot; msg &quot;\`n&quot;, logFile</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 使用</span>
<span class="line">^j:: {</span>
<span class="line">    LogWrite(&quot;热键 ^j 被触发&quot;)</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 查看日志</span>
<span class="line">^!l:: MsgBox FileRead(logFile)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>`,38),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/17-processes.html`},{default:r(()=>[...l[0]||=[e(`17-进程管理`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};