import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/15-clipboard.html","title":"15 - 剪贴板操作","lang":"zh-CN","frontmatter":{"order":15,"description":"15 - 剪贴板操作 A_Clipboard 变量 AHK v2 使用 A_Clipboard 内置变量读写剪贴板： 等待剪贴板变化 剪贴板操作可能需要等待系统完成： 剪贴板实用操作 复制并处理 快速粘贴模板文字 保存和恢复剪贴板 多行剪贴板处理 剪贴板监控 使用 OnClipboardChange 回调函数监控剪贴板变化： dataType 值 剪贴...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"15 - 剪贴板操作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/15-clipboard.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"15 - 剪贴板操作"}],["meta",{"property":"og:description","content":"15 - 剪贴板操作 A_Clipboard 变量 AHK v2 使用 A_Clipboard 内置变量读写剪贴板： 等待剪贴板变化 剪贴板操作可能需要等待系统完成： 剪贴板实用操作 复制并处理 快速粘贴模板文字 保存和恢复剪贴板 多行剪贴板处理 剪贴板监控 使用 OnClipboardChange 回调函数监控剪贴板变化： dataType 值 剪贴..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.29,"words":987},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/15-clipboard.md","autoDesc":true}`),u={name:`15-clipboard.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_15-剪贴板操作" tabindex="-1"><a class="header-anchor" href="#_15-剪贴板操作"><span>15 - 剪贴板操作</span></a></h1><h2 id="a-clipboard-变量" tabindex="-1"><a class="header-anchor" href="#a-clipboard-变量"><span>A_Clipboard 变量</span></a></h2><p>AHK v2 使用 <code>A_Clipboard</code> 内置变量读写剪贴板：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; 读取剪贴板内容</span>
<span class="line">text := A_Clipboard</span>
<span class="line">MsgBox &quot;剪贴板内容: &quot; text</span>
<span class="line"></span>
<span class="line">; 写入剪贴板</span>
<span class="line">A_Clipboard := &quot;Hello from AHK!&quot;</span>
<span class="line"></span>
<span class="line">; 清空剪贴板</span>
<span class="line">A_Clipboard := &quot;&quot;</span>
<span class="line"></span></code></pre></div><h2 id="等待剪贴板变化" tabindex="-1"><a class="header-anchor" href="#等待剪贴板变化"><span>等待剪贴板变化</span></a></h2><p>剪贴板操作可能需要等待系统完成：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ClipWait — 等剪贴板出现内容</span>
<span class="line">A_Clipboard := &quot;&quot;</span>
<span class="line">Send &quot;^c&quot;              ; Ctrl+C 复制</span>
<span class="line">ClipWait 2             ; 等最多2秒</span>
<span class="line">MsgBox &quot;复制的内容: &quot; A_Clipboard</span>
<span class="line"></span>
<span class="line">; ClipWait(秒, 等待任意内容)</span>
<span class="line">; 第二个参数为true时，等待任意类型（包括文件等）</span>
<span class="line">A_Clipboard := &quot;&quot;</span>
<span class="line">Send &quot;^c&quot;</span>
<span class="line">ClipWait 2, true       ; 等文件或文本</span>
<span class="line"></span></code></pre></div><h2 id="剪贴板实用操作" tabindex="-1"><a class="header-anchor" href="#剪贴板实用操作"><span>剪贴板实用操作</span></a></h2><h3 id="复制并处理" tabindex="-1"><a class="header-anchor" href="#复制并处理"><span>复制并处理</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 复制选中文本并处理</span>
<span class="line">^!u:: {    ; Ctrl+Alt+U 将选中文字转为大写</span>
<span class="line">    A_Clipboard := &quot;&quot;</span>
<span class="line">    Send &quot;^c&quot;           ; 复制</span>
<span class="line">    ClipWait 2</span>
<span class="line">    A_Clipboard := StrUpper(A_Clipboard)</span>
<span class="line">    Send &quot;^v&quot;           ; 粘贴结果</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="快速粘贴模板文字" tabindex="-1"><a class="header-anchor" href="#快速粘贴模板文字"><span>快速粘贴模板文字</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; Ctrl+Alt+E 粘贴邮箱</span>
<span class="line">^!e:: {</span>
<span class="line">    A_Clipboard := &quot;myemail@example.com&quot;</span>
<span class="line">    Send &quot;^v&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+D 粘贴当前日期</span>
<span class="line">^!d:: {</span>
<span class="line">    A_Clipboard := A_YYYY &quot;-&quot; A_MM &quot;-&quot; A_DD</span>
<span class="line">    Send &quot;^v&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; Ctrl+Alt+T 粘贴当前时间</span>
<span class="line">^!t:: {</span>
<span class="line">    A_Clipboard := A_Hour &quot;:&quot; A_Min &quot;:&quot; A_Sec</span>
<span class="line">    Send &quot;^v&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="保存和恢复剪贴板" tabindex="-1"><a class="header-anchor" href="#保存和恢复剪贴板"><span>保存和恢复剪贴板</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 保存当前剪贴板内容，使用后恢复</span>
<span class="line">savedClip := &quot;&quot;</span>
<span class="line"></span>
<span class="line">PasteAndRestore(text) {</span>
<span class="line">    global savedClip</span>
<span class="line">    savedClip := A_Clipboard          ; 保存</span>
<span class="line">    A_Clipboard := text               ; 设置新内容</span>
<span class="line">    Send &quot;^v&quot;                          ; 粘贴</span>
<span class="line">    Sleep 100</span>
<span class="line">    A_Clipboard := savedClip           ; 恢复</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">^j:: PasteAndRestore(&quot;插入的文字&quot;)</span>
<span class="line"></span></code></pre></div><h3 id="多行剪贴板处理" tabindex="-1"><a class="header-anchor" href="#多行剪贴板处理"><span>多行剪贴板处理</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 将剪贴板中的多行文字逐行处理</span>
<span class="line">^!p:: {</span>
<span class="line">    A_Clipboard := &quot;&quot;</span>
<span class="line">    Send &quot;^c&quot;</span>
<span class="line">    ClipWait 2</span>
<span class="line">    lines := StrSplit(A_Clipboard, &quot;\`n&quot;)</span>
<span class="line">    result := &quot;&quot;</span>
<span class="line">    for i, line in lines {</span>
<span class="line">        result .= &quot;&gt;&quot; line &quot;\`n&quot;    ; 每行前面加 &gt;</span>
<span class="line">    }</span>
<span class="line">    A_Clipboard := result</span>
<span class="line">    Send &quot;^v&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="剪贴板监控" tabindex="-1"><a class="header-anchor" href="#剪贴板监控"><span>剪贴板监控</span></a></h2><p>使用 <code>OnClipboardChange</code> 回调函数监控剪贴板变化：</p><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; 注册剪贴板变化回调</span>
<span class="line">OnClipboardChange ClipChanged</span>
<span class="line"></span>
<span class="line">ClipChanged(dataType) {</span>
<span class="line">    ; dataType: 0=空, 1=文本, 2=非文本(如文件), 4=图像</span>
<span class="line">    if (dataType = 1) {</span>
<span class="line">        ToolTip &quot;剪贴板更新: &quot; SubStr(A_Clipboard, 1, 50)</span>
<span class="line">        SetTimer () =&gt; ToolTip(), -3000</span>
<span class="line">    } else if (dataType = 2) {</span>
<span class="line">        ToolTip &quot;剪贴板: 文件/非文本内容&quot;</span>
<span class="line">        SetTimer () =&gt; ToolTip(), -3000</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="datatype-值" tabindex="-1"><a class="header-anchor" href="#datatype-值"><span>dataType 值</span></a></h3><table><thead><tr><th>值</th><th>说明</th></tr></thead><tbody><tr><td>0</td><td>剪贴板为空</td></tr><tr><td>1</td><td>文本内容</td></tr><tr><td>2</td><td>非文本内容（文件列表、自定义格式等）</td></tr><tr><td>4</td><td>含有图像</td></tr></tbody></table><h3 id="剪贴板历史记录" tabindex="-1"><a class="header-anchor" href="#剪贴板历史记录"><span>剪贴板历史记录</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">clipHistory := []</span>
<span class="line">maxHistory := 20</span>
<span class="line"></span>
<span class="line">OnClipboardChange RecordClip</span>
<span class="line"></span>
<span class="line">RecordClip(dataType) {</span>
<span class="line">    global clipHistory</span>
<span class="line">    if (dataType = 1 &amp;&amp; A_Clipboard != &quot;&quot;) {</span>
<span class="line">        clipHistory.Push(A_Clipboard)</span>
<span class="line">        if (clipHistory.Length &gt; maxHistory)</span>
<span class="line">            clipHistory.RemoveAt(1)    ; 移除最老的</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; Ctrl+Shift+V — 查看剪贴板历史</span>
<span class="line">^+v:: {</span>
<span class="line">    if (clipHistory.Length = 0) {</span>
<span class="line">        MsgBox &quot;剪贴板历史为空&quot;</span>
<span class="line">        return</span>
<span class="line">    }</span>
<span class="line">    items := &quot;&quot;</span>
<span class="line">    for i, clip in clipHistory {</span>
<span class="line">        items .= i &quot;. &quot; SubStr(clip, 1, 40) &quot;\`n&quot;</span>
<span class="line">    }</span>
<span class="line">    result := MsgBox(items, &quot;剪贴板历史&quot;, 4)</span>
<span class="line">    ; 用户可以进一步选择粘贴哪条</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="剪贴板格式操作" tabindex="-1"><a class="header-anchor" href="#剪贴板格式操作"><span>剪贴板格式操作</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 检查剪贴板是否包含特定格式</span>
<span class="line">if DllCall(&quot;IsClipboardFormatAvailable&quot;, &quot;UInt&quot;, 1)  ; CF_TEXT = 1</span>
<span class="line">    MsgBox &quot;剪贴板有文本格式&quot;</span>
<span class="line"></span>
<span class="line">; 获取剪贴板所有格式</span>
<span class="line">formats := ClipboardFormats()</span>
<span class="line">for i, fmt in formats {</span>
<span class="line">    MsgBox &quot;格式ID: &quot; fmt</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; ClipboardFormats 是 AHK v2 内置函数</span>
<span class="line"></span></code></pre></div><h2 id="剪贴板注意事项" tabindex="-1"><a class="header-anchor" href="#剪贴板注意事项"><span>剪贴板注意事项</span></a></h2><h3 id="延迟问题" tabindex="-1"><a class="header-anchor" href="#延迟问题"><span>延迟问题</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 剪贴板操作后需要等待</span>
<span class="line">A_Clipboard := &quot;Hello&quot;</span>
<span class="line">ClipWait 1                ; 等待系统将内容放入剪贴板</span>
<span class="line">Send &quot;^v&quot;</span>
<span class="line"></span>
<span class="line">; 不等待可能导致粘贴的是旧内容</span>
<span class="line">A_Clipboard := &quot;New text&quot;</span>
<span class="line">; 如果不 ClipWait，^v 可能粘贴的还是之前的 &quot;Hello&quot;</span>
<span class="line"></span></code></pre></div><h3 id="特殊字符" tabindex="-1"><a class="header-anchor" href="#特殊字符"><span>特殊字符</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 剪贴板中的换行符</span>
<span class="line">A_Clipboard := &quot;Line1\`r\`nLine2&quot;  ; Windows 换行是 \`r\`n</span>
<span class="line">; 但 A_Clipboard 读取时自动处理</span>
<span class="line"></span>
<span class="line">; 检查换行格式</span>
<span class="line">if InStr(A_Clipboard, &quot;\`r\`n&quot;)</span>
<span class="line">    MsgBox &quot;Windows换行格式&quot;</span>
<span class="line">else if InStr(A_Clipboard, &quot;\`n&quot;)</span>
<span class="line">    MsgBox &quot;Unix换行格式&quot;</span>
<span class="line"></span></code></pre></div><h3 id="大文件操作" tabindex="-1"><a class="header-anchor" href="#大文件操作"><span>大文件操作</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 复制大文件时剪贴板可能很大</span>
<span class="line">; 使用 Sleep 确保操作完成</span>
<span class="line">Send &quot;^c&quot;</span>
<span class="line">Sleep 500           ; 大内容可能需要更长时间</span>
<span class="line">ClipWait 5           ; 等最多5秒</span>
<span class="line"></span></code></pre></div><h2 id="实用剪贴板脚本" tabindex="-1"><a class="header-anchor" href="#实用剪贴板脚本"><span>实用剪贴板脚本</span></a></h2><h3 id="文本转换工具集" tabindex="-1"><a class="header-anchor" href="#文本转换工具集"><span>文本转换工具集</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; Ctrl+Shift+U — 选中文本转大写</span>
<span class="line">^+u:: {</span>
<span class="line">    A_Clipboard := &quot;&quot;</span>
<span class="line">    Send &quot;^c&quot;</span>
<span class="line">    ClipWait 2</span>
<span class="line">    A_Clipboard := StrUpper(A_Clipboard)</span>
<span class="line">    Send &quot;^v&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; Ctrl+Shift+L — 选中文本转小写</span>
<span class="line">^+l:: {</span>
<span class="line">    A_Clipboard := &quot;&quot;</span>
<span class="line">    Send &quot;^c&quot;</span>
<span class="line">    ClipWait 2</span>
<span class="line">    A_Clipboard := StrLower(A_Clipboard)</span>
<span class="line">    Send &quot;^v&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; Ctrl+Shift+T — 选中文本首字母大写</span>
<span class="line">^+t:: {</span>
<span class="line">    A_Clipboard := &quot;&quot;</span>
<span class="line">    Send &quot;^c&quot;</span>
<span class="line">    ClipWait 2</span>
<span class="line">    A_Clipboard := StrTitle(A_Clipboard)</span>
<span class="line">    Send &quot;^v&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; Ctrl+Shift+R — 选中文字去首尾空白</span>
<span class="line">^+r:: {</span>
<span class="line">    A_Clipboard := &quot;&quot;</span>
<span class="line">    Send &quot;^c&quot;</span>
<span class="line">    ClipWait 2</span>
<span class="line">    A_Clipboard := Trim(A_Clipboard)</span>
<span class="line">    Send &quot;^v&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="搜索选中文字" tabindex="-1"><a class="header-anchor" href="#搜索选中文字"><span>搜索选中文字</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; Ctrl+Shift+G — 用Google搜索选中文字</span>
<span class="line">^+g:: {</span>
<span class="line">    A_Clipboard := &quot;&quot;</span>
<span class="line">    Send &quot;^c&quot;</span>
<span class="line">    ClipWait 2</span>
<span class="line">    query := A_Clipboard</span>
<span class="line">    Run &quot;https://www.google.com/search?q=&quot; query</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><hr>`,38),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/16-files.html`},{default:r(()=>[...l[0]||=[e(`16-文件操作`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};