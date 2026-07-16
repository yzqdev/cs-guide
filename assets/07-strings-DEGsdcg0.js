import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/07-strings.html","title":"07 - 字符串处理","lang":"zh-CN","frontmatter":{"order":7,"description":"07 - 字符串处理 字符串拼接 字符串长度 截取子串 AHK 字符串索引从 1 开始（不像 Python/C 从 0 开始）。 查找子串 替换字符串 拆分字符串 大小写转换 去空白 字符串格式化 字符串比较 字符串与数字转换 重复字符串 反转字符串 多行字符串 字符串包含判断的常见模式 下一步:","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"07 - 字符串处理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/07-strings.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"07 - 字符串处理"}],["meta",{"property":"og:description","content":"07 - 字符串处理 字符串拼接 字符串长度 截取子串 AHK 字符串索引从 1 开始（不像 Python/C 从 0 开始）。 查找子串 替换字符串 拆分字符串 大小写转换 去空白 字符串格式化 字符串比较 字符串与数字转换 重复字符串 反转字符串 多行字符串 字符串包含判断的常见模式 下一步:"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.92,"words":1177},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/07-strings.md","autoDesc":true}`),u={name:`07-strings.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_07-字符串处理" tabindex="-1"><a class="header-anchor" href="#_07-字符串处理"><span>07 - 字符串处理</span></a></h1><h2 id="字符串拼接" tabindex="-1"><a class="header-anchor" href="#字符串拼接"><span>字符串拼接</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">; 隐式拼接 — 表达式中相邻项自动拼接</span>
<span class="line">msg := &quot;Hello&quot; &quot; &quot; &quot;World&quot;        ; &quot;Hello World&quot;</span>
<span class="line">msg := &quot;Name: &quot; name &quot; Age: &quot; age ; 变量自动拼接</span>
<span class="line"></span>
<span class="line">; 拼接运算符 .</span>
<span class="line">msg := &quot;Hello&quot; . &quot; &quot; . &quot;World&quot;    ; 同上</span>
<span class="line"></span>
<span class="line">; .= 拼接赋值</span>
<span class="line">text := &quot;Hello&quot;</span>
<span class="line">text .= &quot; &quot;</span>
<span class="line">text .= &quot;World&quot;                    ; text = &quot;Hello World&quot;</span>
<span class="line"></span>
<span class="line">; 注意运算优先级 — 用括号</span>
<span class="line">msg := &quot;Result: &quot; (1 + 2)          ; &quot;Result: 3&quot;</span>
<span class="line">msg := &quot;Value: &quot; func()            ; &quot;Value: 返回值&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符串长度" tabindex="-1"><a class="header-anchor" href="#字符串长度"><span>字符串长度</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">s := &quot;AutoHotkey&quot;</span>
<span class="line">MsgBox StrLen(s)              ; 10</span>
<span class="line"></span>
<span class="line">; 空字符串</span>
<span class="line">MsgBox StrLen(&quot;&quot;)             ; 0</span>
<span class="line"></span>
<span class="line">; 包含中文（AHK 支持 Unicode）</span>
<span class="line">MsgBox StrLen(&quot;你好&quot;)          ; 2</span>
<span class="line"></span></code></pre></div><h2 id="截取子串" tabindex="-1"><a class="header-anchor" href="#截取子串"><span>截取子串</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">s := &quot;AutoHotkey&quot;</span>
<span class="line"></span>
<span class="line">; SubStr(字符串, 起始位置, 长度)</span>
<span class="line">; 起始位置：1 为第一个字符，-1 为最后一个字符</span>
<span class="line"></span>
<span class="line">MsgBox SubStr(s, 1, 4)        ; &quot;Auto&quot;  — 从第1个取4个</span>
<span class="line">MsgBox SubStr(s, 5)           ; &quot;Hotkey&quot; — 从第5个取到末尾</span>
<span class="line">MsgBox SubStr(s, -3)          ; &quot;key&quot;    — 从倒数第3个取到末尾</span>
<span class="line">MsgBox SubStr(s, -6, 3)       ; &quot;Hot&quot;    — 从倒数第6个取3个</span>
<span class="line"></span></code></pre></div><blockquote><p>AHK 字符串索引从 <strong>1</strong> 开始（不像 Python/C 从 0 开始）。</p></blockquote><h2 id="查找子串" tabindex="-1"><a class="header-anchor" href="#查找子串"><span>查找子串</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">s := &quot;AutoHotkey&quot;</span>
<span class="line"></span>
<span class="line">; InStr(字符串, 搜索内容, 是否区分大小写, 起始位置)</span>
<span class="line">MsgBox InStr(s, &quot;Hot&quot;)        ; 5  — 找到&quot;Hot&quot;在第5个位置</span>
<span class="line">MsgBox InStr(s, &quot;hot&quot;)        ; 5  — 默认不区分大小写</span>
<span class="line">MsgBox InStr(s, &quot;hot&quot;, true)  ; 0  — 区分大小写，找不到</span>
<span class="line"></span>
<span class="line">; 从右边搜索</span>
<span class="line">MsgBox InStr(s, &quot;o&quot;)          ; 4  — 第一个&quot;o&quot;</span>
<span class="line">MsgBox InStr(s, &quot;o&quot;, , -1)    ; 6  — 从右边搜索第一个&quot;o&quot;</span>
<span class="line"></span>
<span class="line">; 是否包含某子串</span>
<span class="line">if InStr(s, &quot;Hot&quot;)</span>
<span class="line">    MsgBox &quot;包含 Hot&quot;</span>
<span class="line"></span>
<span class="line">; 判断不包含</span>
<span class="line">if !InStr(s, &quot;xyz&quot;)</span>
<span class="line">    MsgBox &quot;不包含 xyz&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="替换字符串" tabindex="-1"><a class="header-anchor" href="#替换字符串"><span>替换字符串</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">s := &quot;Hello World World&quot;</span>
<span class="line"></span>
<span class="line">; StrReplace(字符串, 搜索内容, 替换内容, 区分大小写, 替换次数)</span>
<span class="line">MsgBox StrReplace(s, &quot;World&quot;, &quot;AHK&quot;)       ; &quot;Hello AHK AHK&quot;</span>
<span class="line">MsgBox StrReplace(s, &quot;World&quot;, &quot;AHK&quot;, , 1)  ; &quot;Hello AHK World&quot; — 只替换1次</span>
<span class="line"></span>
<span class="line">; 区分大小写</span>
<span class="line">MsgBox StrReplace(s, &quot;world&quot;, &quot;AHK&quot;, true)  ; 不替换（大小写不匹配）</span>
<span class="line"></span>
<span class="line">; 删除子串（替换为空）</span>
<span class="line">MsgBox StrReplace(s, &quot;World&quot;)               ; &quot;Hello  &quot;</span>
<span class="line"></span>
<span class="line">; 获取替换次数</span>
<span class="line">count := 0</span>
<span class="line">result := StrReplace(s, &quot;World&quot;, &quot;AHK&quot;, , , &amp;count)</span>
<span class="line">MsgBox &quot;替换了 &quot; count &quot; 次&quot;                ; 替换了 2 次</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="拆分字符串" tabindex="-1"><a class="header-anchor" href="#拆分字符串"><span>拆分字符串</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">csv := &quot;apple,banana,cherry,date&quot;</span>
<span class="line"></span>
<span class="line">; StrSplit(字符串, 分隔符, 引号字符, 保留分隔符)</span>
<span class="line">arr := StrSplit(csv, &quot;,&quot;)</span>
<span class="line"></span>
<span class="line">for i, fruit in arr {</span>
<span class="line">    MsgBox i &quot;: &quot; fruit</span>
<span class="line">}</span>
<span class="line">; 1: apple, 2: banana, 3: cherry, 4: date</span>
<span class="line"></span>
<span class="line">; 拆分到指定数量</span>
<span class="line">arr := StrSplit(csv, &quot;,&quot;, , 2)    ; 只拆成2部分</span>
<span class="line">MsgBox arr[1]                      ; &quot;apple&quot;</span>
<span class="line">MsgBox arr[2]                      ; &quot;banana,cherry,date&quot;</span>
<span class="line"></span>
<span class="line">; 用空格拆分</span>
<span class="line">text := &quot;Hello  World   AHK&quot;</span>
<span class="line">arr := StrSplit(text, &quot; &quot;)</span>
<span class="line">; [&quot;Hello&quot;, &quot;World&quot;, &quot;AHK&quot;]</span>
<span class="line"></span>
<span class="line">; 按多个字符拆分</span>
<span class="line">s := &quot;a,b;c.d&quot;</span>
<span class="line">arr := StrSplit(s, [&quot;,&quot;, &quot;;&quot;, &quot;.&quot;])</span>
<span class="line">; [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;d&quot;]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="大小写转换" tabindex="-1"><a class="header-anchor" href="#大小写转换"><span>大小写转换</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">s := &quot;AutoHotkey v2&quot;</span>
<span class="line"></span>
<span class="line">MsgBox StrLower(s)      ; &quot;autohotkey v2&quot;</span>
<span class="line">MsgBox StrUpper(s)      ; &quot;AUTOHOTKEY V2&quot;</span>
<span class="line"></span>
<span class="line">; 首字母大写</span>
<span class="line">MsgBox StrTitle(s)      ; &quot;Autohotkey V2&quot;</span>
<span class="line"></span></code></pre></div><h2 id="去空白" tabindex="-1"><a class="header-anchor" href="#去空白"><span>去空白</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">s := &quot;  Hello World  &quot;</span>
<span class="line"></span>
<span class="line">MsgBox Trim(s)          ; &quot;Hello World&quot; — 去首尾空白</span>
<span class="line">MsgBox LTrim(s)         ; &quot;Hello World  &quot; — 去左边空白</span>
<span class="line">MsgBox RTrim(s)         ; &quot;  Hello World&quot; — 去右边空白</span>
<span class="line"></span>
<span class="line">; 去指定字符</span>
<span class="line">MsgBox Trim(&quot;xxHelloxx&quot;, &quot;x&quot;)   ; &quot;Hello&quot;</span>
<span class="line">MsgBox LTrim(&quot;000123&quot;, &quot;0&quot;)     ; &quot;123&quot;</span>
<span class="line"></span></code></pre></div><h2 id="字符串格式化" tabindex="-1"><a class="header-anchor" href="#字符串格式化"><span>字符串格式化</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; Format(格式串, 参数...)</span>
<span class="line">MsgBox Format(&quot;Hello, {}!&quot;, &quot;World&quot;)          ; &quot;Hello, World!&quot;</span>
<span class="line">MsgBox Format(&quot;{} + {} = {}&quot;, 1, 2, 3)        ; &quot;1 + 2 = 3&quot;</span>
<span class="line"></span>
<span class="line">; 位置参数</span>
<span class="line">MsgBox Format(&quot;{2} before {1}&quot;, &quot;A&quot;, &quot;B&quot;)     ; &quot;B before A&quot;</span>
<span class="line"></span>
<span class="line">; 数字格式化</span>
<span class="line">MsgBox Format(&quot;{:.2f}&quot;, 3.14159)              ; &quot;3.14&quot;</span>
<span class="line">MsgBox Format(&quot;{:d}&quot;, 42)                     ; &quot;42&quot;</span>
<span class="line">MsgBox Format(&quot;{:08d}&quot;, 42)                   ; &quot;00000042&quot;</span>
<span class="line">MsgBox Format(&quot;{:x}&quot;, 255)                    ; &quot;ff&quot;</span>
<span class="line"></span>
<span class="line">; 宽度和对齐</span>
<span class="line">MsgBox Format(&quot;{:10}&quot;, &quot;left&quot;)                ; &quot;left      &quot;（左对齐，宽10）</span>
<span class="line">MsgBox Format(&quot;{:&gt;10}&quot;, &quot;right&quot;)              ; &quot;     right&quot;（右对齐）</span>
<span class="line">MsgBox Format(&quot;{:^10}&quot;, &quot;center&quot;)             ; &quot;  center  &quot;（居中）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符串比较" tabindex="-1"><a class="header-anchor" href="#字符串比较"><span>字符串比较</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 不区分大小写（默认）</span>
<span class="line">if (&quot;abc&quot; = &quot;ABC&quot;)</span>
<span class="line">    MsgBox &quot;相等&quot;              ; 显示</span>
<span class="line"></span>
<span class="line">; 区分大小写</span>
<span class="line">if (&quot;abc&quot; == &quot;ABC&quot;)</span>
<span class="line">    MsgBox &quot;相等&quot;              ; 不显示</span>
<span class="line"></span>
<span class="line">; Compare 函数 — 返回 -1/0/1</span>
<span class="line">MsgBox StrCompare(&quot;abc&quot;, &quot;abc&quot;)     ; 0  — 相等</span>
<span class="line">MsgBox StrCompare(&quot;abc&quot;, &quot;abd&quot;)     ; -1 — abc &lt; abd</span>
<span class="line">MsgBox StrCompare(&quot;abd&quot;, &quot;abc&quot;)     ; 1  — abd &gt; abc</span>
<span class="line">MsgBox StrCompare(&quot;abc&quot;, &quot;ABC&quot;, true) ; 1 — 区分大小写，abc &gt; ABC</span>
<span class="line"></span></code></pre></div><h2 id="字符串与数字转换" tabindex="-1"><a class="header-anchor" href="#字符串与数字转换"><span>字符串与数字转换</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 数字转字符串</span>
<span class="line">s := String(42)           ; &quot;42&quot;</span>
<span class="line">s := String(3.14)         ; &quot;3.14&quot;</span>
<span class="line"></span>
<span class="line">; 字符串转数字</span>
<span class="line">n := Number(&quot;42&quot;)         ; 42</span>
<span class="line">n := Integer(&quot;42&quot;)        ; 42</span>
<span class="line">n := Float(&quot;3.14&quot;)        ; 3.14</span>
<span class="line"></span>
<span class="line">; 隐式转换</span>
<span class="line">MsgBox &quot;3&quot; + 4            ; 7（字符串&quot;3&quot;在运算时自动转为数字3）</span>
<span class="line">MsgBox &quot;3&quot; . 4            ; &quot;34&quot;（. 运算符是拼接）</span>
<span class="line">MsgBox &quot;3&quot; + &quot;4&quot;          ; 7</span>
<span class="line"></span></code></pre></div><h2 id="重复字符串" tabindex="-1"><a class="header-anchor" href="#重复字符串"><span>重复字符串</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; StrRepeat(字符串, 重复次数)</span>
<span class="line">MsgBox StrRepeat(&quot;=&quot;, 20)           ; &quot;====================&quot;</span>
<span class="line">MsgBox StrRepeat(&quot;Ha&quot;, 3)           ; &quot;HaHaHa&quot;</span>
<span class="line"></span>
<span class="line">; AHK v2 之前的替代方案（如果没有 StrRepeat）</span>
<span class="line">StrRepeatOld(s, n) {</span>
<span class="line">    result := &quot;&quot;</span>
<span class="line">    Loop n</span>
<span class="line">        result .= s</span>
<span class="line">    return result</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="反转字符串" tabindex="-1"><a class="header-anchor" href="#反转字符串"><span>反转字符串</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">ReverseStr(s) {</span>
<span class="line">    result := &quot;&quot;</span>
<span class="line">    Loop StrLen(s) {</span>
<span class="line">        result .= SubStr(s, StrLen(s) - A_Index + 1, 1)</span>
<span class="line">    }</span>
<span class="line">    return result</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">MsgBox ReverseStr(&quot;Hello&quot;)     ; &quot;olleH&quot;</span>
<span class="line"></span></code></pre></div><h2 id="多行字符串" tabindex="-1"><a class="header-anchor" href="#多行字符串"><span>多行字符串</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 用 ( ) 延续区域创建多行字符串</span>
<span class="line">longText := (</span>
<span class="line">    &quot;这是一段很长的文字，\`n&quot;</span>
<span class="line">    &quot;可以分多行书写，\`n&quot;</span>
<span class="line">    &quot;每行末尾的引号后加 \`n 换行。&quot;</span>
<span class="line">)</span>
<span class="line"></span>
<span class="line">MsgBox longText</span>
<span class="line"></span>
<span class="line">; 用转义换行符</span>
<span class="line">text := &quot;第一行\`n第二行\`n第三行&quot;</span>
<span class="line">MsgBox text</span>
<span class="line"></span></code></pre></div><h2 id="字符串包含判断的常见模式" tabindex="-1"><a class="header-anchor" href="#字符串包含判断的常见模式"><span>字符串包含判断的常见模式</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 方式1: InStr</span>
<span class="line">if InStr(path, &quot;.ahk&quot;)</span>
<span class="line">    MsgBox &quot;这是 AHK 脚本&quot;</span>
<span class="line"></span>
<span class="line">; 方式2: InStr 区分大小写</span>
<span class="line">if InStr(path, &quot;.AHK&quot;, true)</span>
<span class="line">    MsgBox &quot;扩展名是大写 AHK&quot;</span>
<span class="line"></span>
<span class="line">; 方式3: 正则表达式（更灵活）</span>
<span class="line">if path ~= &quot;\\.ahk$&quot;</span>
<span class="line">    MsgBox &quot;文件名以 .ahk 结尾&quot;</span>
<span class="line"></span>
<span class="line">; 前缀判断</span>
<span class="line">if SubStr(str, 1, 5) = &quot;Hello&quot;</span>
<span class="line">    MsgBox &quot;以 Hello 开头&quot;</span>
<span class="line"></span>
<span class="line">; 后缀判断</span>
<span class="line">suffix := SubStr(str, -4)</span>
<span class="line">if suffix = &quot;.ahk&quot;</span>
<span class="line">    MsgBox &quot;以 .ahk 结尾&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>`,33),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/08-arrays-and-objects.html`},{default:r(()=>[...l[0]||=[e(`08-数组与对象`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};