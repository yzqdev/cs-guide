import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/21-regex.html","title":"21 - 正则表达式","lang":"zh-CN","frontmatter":{"order":21,"description":"21 - 正则表达式 RegExMatch RegExMatch 搜索字符串中匹配正则表达式的位置和内容： 捕获组 RegExMatch 选项 RegExReplace RegExReplace 用正则表达式替换字符串内容： 替换中的反向引用 常用正则模式 数字 字符 量词 位置 常用匹配模式 AHK 中正则表达式的注意事项 AHK 使用 PCRE 库...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"21 - 正则表达式\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/21-regex.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"21 - 正则表达式"}],["meta",{"property":"og:description","content":"21 - 正则表达式 RegExMatch RegExMatch 搜索字符串中匹配正则表达式的位置和内容： 捕获组 RegExMatch 选项 RegExReplace RegExReplace 用正则表达式替换字符串内容： 替换中的反向引用 常用正则模式 数字 字符 量词 位置 常用匹配模式 AHK 中正则表达式的注意事项 AHK 使用 PCRE 库..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":4.06,"words":1219},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/21-regex.md","autoDesc":true}`),u={name:`21-regex.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_21-正则表达式" tabindex="-1"><a class="header-anchor" href="#_21-正则表达式"><span>21 - 正则表达式</span></a></h1><h2 id="regexmatch" tabindex="-1"><a class="header-anchor" href="#regexmatch"><span>RegExMatch</span></a></h2><p>RegExMatch 搜索字符串中匹配正则表达式的位置和内容：</p><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">; RegExMatch(字符串, 正则表达式, 输出变量, 起始位置)</span>
<span class="line">; 返回匹配位置（1开始），0表示未找到</span>
<span class="line"></span>
<span class="line">; 基本匹配</span>
<span class="line">pos := RegExMatch(&quot;Hello World 123&quot;, &quot;\\d+&quot;)</span>
<span class="line">MsgBox pos   ; 13（数字&quot;123&quot;从第13个字符开始）</span>
<span class="line"></span>
<span class="line">; 获取匹配内容</span>
<span class="line">found := &quot;&quot;</span>
<span class="line">pos := RegExMatch(&quot;Hello World 123&quot;, &quot;\\d+&quot;, &amp;found)</span>
<span class="line">MsgBox found   ; &quot;123&quot;</span>
<span class="line"></span>
<span class="line">; 邮箱匹配</span>
<span class="line">email := &quot;Contact: user@example.com for info&quot;</span>
<span class="line">if RegExMatch(email, &quot;[\\w.]+@[\\w.]+\\.\\w+&quot;, &amp;match) {</span>
<span class="line">    MsgBox &quot;邮箱: &quot; match</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="捕获组" tabindex="-1"><a class="header-anchor" href="#捕获组"><span>捕获组</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 用 () 创建捕获组</span>
<span class="line">text := &quot;2024-07-16&quot;</span>
<span class="line">RegExMatch(text, &quot;(\\d{4})-(\\d{2})-(\\d{2})&quot;, &amp;m)</span>
<span class="line">MsgBox m[0]    ; &quot;2024-07-16&quot; — 整体匹配</span>
<span class="line">MsgBox m[1]    ; &quot;2024&quot; — 第1组</span>
<span class="line">MsgBox m[2]    ; &quot;07&quot; — 第2组</span>
<span class="line">MsgBox m[3]    ; &quot;16&quot; — 第3组</span>
<span class="line"></span>
<span class="line">; 提取域名</span>
<span class="line">url := &quot;https://www.autohotkey.com/docs&quot;</span>
<span class="line">RegExMatch(url, &quot;https?://([\\w.]+)&quot;, &amp;m)</span>
<span class="line">MsgBox m[1]    ; &quot;www.autohotkey.com&quot;</span>
<span class="line"></span>
<span class="line">; 命名捕获组（AHK 不支持命名组，用索引代替）</span>
<span class="line"></span></code></pre></div><h3 id="regexmatch-选项" tabindex="-1"><a class="header-anchor" href="#regexmatch-选项"><span>RegExMatch 选项</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 第三个参数后的选项</span>
<span class="line">; &quot;i&quot; — 不区分大小写</span>
<span class="line">pos := RegExMatch(&quot;HELLO&quot;, &quot;hello&quot;, , 1)           ; 不匹配</span>
<span class="line">pos := RegExMatch(&quot;HELLO&quot;, &quot;hello&quot;, , 1, &quot;i&quot;)       ; 匹配（不区分大小写）</span>
<span class="line"></span>
<span class="line">; &quot;m&quot; — 多行模式（^和$匹配每行的开头结尾）</span>
<span class="line">; &quot;s&quot; — dotAll模式（.匹配换行符）</span>
<span class="line">; &quot;x&quot; — 忽略空白和#注释</span>
<span class="line"></span></code></pre></div><h2 id="regexreplace" tabindex="-1"><a class="header-anchor" href="#regexreplace"><span>RegExReplace</span></a></h2><p>RegExReplace 用正则表达式替换字符串内容：</p><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; RegExReplace(字符串, 正则表达式, 替换文本, 替换次数, 起始位置)</span>
<span class="line">; 返回替换后的字符串</span>
<span class="line"></span>
<span class="line">; 基本替换</span>
<span class="line">result := RegExReplace(&quot;Hello 123 World 456&quot;, &quot;\\d+&quot;, &quot;NUM&quot;)</span>
<span class="line">MsgBox result   ; &quot;Hello NUM World NUM&quot;</span>
<span class="line"></span>
<span class="line">; 只替换1次</span>
<span class="line">result := RegExReplace(&quot;Hello 123 World 456&quot;, &quot;\\d+&quot;, &quot;NUM&quot;, 1)</span>
<span class="line">MsgBox result   ; &quot;Hello NUM World 456&quot;</span>
<span class="line"></span>
<span class="line">; 使用捕获组替换</span>
<span class="line">result := RegExReplace(&quot;2024-07-16&quot;, &quot;(\\d{4})-(\\d{2})-(\\d{2})&quot;, &quot;$2/$3/$1&quot;)</span>
<span class="line">MsgBox result   ; &quot;07/16/2024&quot;</span>
<span class="line"></span>
<span class="line">; 删除所有数字</span>
<span class="line">result := RegExReplace(&quot;abc123def456&quot;, &quot;\\d+&quot;)</span>
<span class="line">MsgBox result   ; &quot;abcdef&quot;</span>
<span class="line"></span>
<span class="line">; 不区分大小写替换</span>
<span class="line">result := RegExReplace(&quot;Hello HELLO hello&quot;, &quot;hello&quot;, &quot;Hi&quot;, , , &quot;i&quot;)</span>
<span class="line">MsgBox result   ; &quot;Hi Hi Hi&quot;</span>
<span class="line"></span>
<span class="line">; 删除首尾空白</span>
<span class="line">text := &quot;  Hello World  &quot;</span>
<span class="line">result := RegExReplace(text, &quot;^[\\s]+|[\\s]+$&quot;)</span>
<span class="line">MsgBox result   ; &quot;Hello World&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="替换中的反向引用" tabindex="-1"><a class="header-anchor" href="#替换中的反向引用"><span>替换中的反向引用</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; $0 — 整体匹配</span>
<span class="line">; $1 ~ $9 — 第1到9个捕获组</span>
<span class="line"></span>
<span class="line">; 交换两个单词</span>
<span class="line">result := RegExReplace(&quot;Hello World&quot;, &quot;(\\w+) (\\w+)&quot;, &quot;$2 $1&quot;)</span>
<span class="line">MsgBox result   ; &quot;World Hello&quot;</span>
<span class="line"></span>
<span class="line">; 给数字加括号</span>
<span class="line">result := RegExReplace(&quot;Score: 95&quot;, &quot;(\\d+)&quot;, &quot;($1)&quot;)</span>
<span class="line">MsgBox result   ; &quot;Score: (95)&quot;</span>
<span class="line"></span></code></pre></div><h2 id="常用正则模式" tabindex="-1"><a class="header-anchor" href="#常用正则模式"><span>常用正则模式</span></a></h2><h3 id="数字" tabindex="-1"><a class="header-anchor" href="#数字"><span>数字</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">\\d          ; 任意一个数字 [0-9]</span>
<span class="line">\\d+         ; 一个或多个数字</span>
<span class="line">\\d{3}       ; 恰好3个数字</span>
<span class="line">\\d{2,4}     ; 2到4个数字</span>
<span class="line">-?\\d+       ; 可能带负号的整数</span>
<span class="line">\\d+\\.\\d+    ; 简单浮点数</span>
<span class="line"></span></code></pre></div><h3 id="字符" tabindex="-1"><a class="header-anchor" href="#字符"><span>字符</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">\\w          ; 单词字符 [a-zA-Z0-9_]</span>
<span class="line">\\w+         ; 一个或多个单词字符</span>
<span class="line">\\s          ; 空白字符（空格、Tab、换行等）</span>
<span class="line">\\S          ; 非空白字符</span>
<span class="line">.           ; 任意字符（不含换行）</span>
<span class="line">[a-z]       ; 小写字母</span>
<span class="line">[A-Z]       ; 大写字母</span>
<span class="line">[0-9a-fA-F] ; 十六进制字符</span>
<span class="line"></span></code></pre></div><h3 id="量词" tabindex="-1"><a class="header-anchor" href="#量词"><span>量词</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">x?          ; 0或1个x</span>
<span class="line">x*          ; 0或多个x</span>
<span class="line">x+          ; 1或多个x</span>
<span class="line">x{3}        ; 恰好3个x</span>
<span class="line">x{3,}       ; 至少3个x</span>
<span class="line">x{3,5}      ; 3到5个x</span>
<span class="line"></span></code></pre></div><h3 id="位置" tabindex="-1"><a class="header-anchor" href="#位置"><span>位置</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">^           ; 字符串开头（或多行模式下行首）</span>
<span class="line">$           ; 字符串结尾（或多行模式下行尾）</span>
<span class="line">\\b          ; 单词边界</span>
<span class="line">\\B          ; 非单词边界</span>
<span class="line"></span></code></pre></div><h3 id="常用匹配模式" tabindex="-1"><a class="header-anchor" href="#常用匹配模式"><span>常用匹配模式</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 邮箱</span>
<span class="line">pattern := &quot;[\\w.+-]+@[\\w.-]+\\.\\w+&quot;</span>
<span class="line"></span>
<span class="line">; URL</span>
<span class="line">pattern := &quot;https?://[\\w./-]+&quot;</span>
<span class="line"></span>
<span class="line">; IP 地址</span>
<span class="line">pattern := &quot;\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}&quot;</span>
<span class="line"></span>
<span class="line">; 日期 YYYY-MM-DD</span>
<span class="line">pattern := &quot;\\d{4}-\\d{2}-\\d{2}&quot;</span>
<span class="line"></span>
<span class="line">; 时间 HH:MM:SS</span>
<span class="line">pattern := &quot;\\d{2}:\\d{2}:\\d{2}&quot;</span>
<span class="line"></span>
<span class="line">; 中文字符</span>
<span class="line">pattern := &quot;[\\x{4e00}-\\x{9fff}]&quot;</span>
<span class="line"></span>
<span class="line">; HTML 标签</span>
<span class="line">pattern := &quot;&lt;[^&gt;]+&gt;&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ahk-中正则表达式的注意事项" tabindex="-1"><a class="header-anchor" href="#ahk-中正则表达式的注意事项"><span>AHK 中正则表达式的注意事项</span></a></h2><h3 id="ahk-使用-pcre-库" tabindex="-1"><a class="header-anchor" href="#ahk-使用-pcre-库"><span>AHK 使用 PCRE 库</span></a></h3><p>AHK 的正则基于 PCRE（Perl Compatible Regular Expressions），支持大多数 Perl 正则特性。</p><h3 id="转义字符" tabindex="-1"><a class="header-anchor" href="#转义字符"><span>转义字符</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; AHK 字符串中的反斜杠需要双重转义</span>
<span class="line">; 正则中的 \\d 在 AHK 字符串中写作 &quot;\\d&quot;</span>
<span class="line">; 正则中的 \\. 在 AHK 字符串中写作 &quot;\\.&quot;</span>
<span class="line"></span>
<span class="line">; 如果正则中有大量反斜杠，可用 \`\` (反引号) 字面字符串</span>
<span class="line">; AHK 中没有原始字符串语法，必须手动处理转义</span>
<span class="line"></span>
<span class="line">; 示例：匹配文件路径中的 .ahk 扩展名</span>
<span class="line">RegExMatch(path, &quot;\\.ahk$&quot;)    ; 注意: \\. 在AHK字符串中是 \\.</span>
<span class="line"></span>
<span class="line">; 匹配反斜杠本身</span>
<span class="line">RegExMatch(path, &quot;\\\\&quot;)        ; 正则中 \\\\ 匹配一个 \\ 字符</span>
<span class="line"></span></code></pre></div><h3 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符"><span>~ 运算符</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; ~= 是正则匹配运算符（简化写法）</span>
<span class="line">if (str ~= &quot;\\d+&quot;)</span>
<span class="line">    MsgBox &quot;包含数字&quot;</span>
<span class="line"></span>
<span class="line">; 等价于</span>
<span class="line">if RegExMatch(str, &quot;\\d+&quot;)</span>
<span class="line">    MsgBox &quot;包含数字&quot;</span>
<span class="line"></span></code></pre></div><h2 id="实用正则脚本" tabindex="-1"><a class="header-anchor" href="#实用正则脚本"><span>实用正则脚本</span></a></h2><h3 id="文本提取" tabindex="-1"><a class="header-anchor" href="#文本提取"><span>文本提取</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; 从剪贴板提取所有邮箱</span>
<span class="line">^!e:: {</span>
<span class="line">    A_Clipboard := &quot;&quot;</span>
<span class="line">    Send &quot;^c&quot;</span>
<span class="line">    ClipWait 2</span>
<span class="line">    emails := []</span>
<span class="line">    pos := 1</span>
<span class="line">    while RegExMatch(A_Clipboard, &quot;[\\w.+-]+@[\\w.-]+\\.\\w+&quot;, &amp;m, pos) {</span>
<span class="line">        emails.Push(m[])</span>
<span class="line">        pos := m.Pos + m.Len</span>
<span class="line">    }</span>
<span class="line">    MsgBox &quot;找到 &quot; emails.Length &quot; 个邮箱&quot;</span>
<span class="line">    for i, e in emails</span>
<span class="line">        MsgBox e</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文本清理" tabindex="-1"><a class="header-anchor" href="#文本清理"><span>文本清理</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; Ctrl+Shift+C 清理选中文字的多余空白</span>
<span class="line">^+c:: {</span>
<span class="line">    A_Clipboard := &quot;&quot;</span>
<span class="line">    Send &quot;^c&quot;</span>
<span class="line">    ClipWait 2</span>
<span class="line">    text := A_Clipboard</span>
<span class="line">    ; 去除每行首尾空白</span>
<span class="line">    text := RegExReplace(text, &quot;^[\\s]+|[\\s]+$&quot;, &quot;&quot;)</span>
<span class="line">    ; 多个空格合并为一个</span>
<span class="line">    text := RegExReplace(text, &quot;[ ]{2,}&quot;, &quot; &quot;)</span>
<span class="line">    ; 多个空行合并为一个</span>
<span class="line">    text := RegExReplace(text, &quot;(\\r?\\n){3,}&quot;, &quot;$1$1&quot;)</span>
<span class="line">    A_Clipboard := text</span>
<span class="line">    Send &quot;^v&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据格式化" tabindex="-1"><a class="header-anchor" href="#数据格式化"><span>数据格式化</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 格式化日期</span>
<span class="line">raw := &quot;20240716&quot;</span>
<span class="line">formatted := RegExReplace(raw, &quot;(\\d{4})(\\d{2})(\\d{2})&quot;, &quot;$1-$2-$3&quot;)</span>
<span class="line">MsgBox formatted   ; &quot;2024-07-16&quot;</span>
<span class="line"></span>
<span class="line">; 格式化电话号码</span>
<span class="line">phone := &quot;13812345678&quot;</span>
<span class="line">formatted := RegExReplace(phone, &quot;(\\d{3})(\\d{4})(\\d{4})&quot;, &quot;$1-$2-$3&quot;)</span>
<span class="line">MsgBox formatted   ; &quot;138-1234-5678&quot;</span>
<span class="line"></span></code></pre></div><hr>`,39),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/22-error-handling.html`},{default:r(()=>[...l[0]||=[e(`22-错误处理与调试`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};