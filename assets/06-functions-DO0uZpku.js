import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/06-functions.html","title":"06 - 函数","lang":"zh-CN","frontmatter":{"order":6,"description":"06 - 函数 函数定义 返回值 默认参数 默认参数必须是常量表达式，不能是变量。 可变参数 函数调用方式 推荐：始终使用括号调用函数，更清晰且不容易出错。 局部变量与全局变量 global 声明 static 声明（函数内静态变量） static 变量在函数调用之间保持值，但只在该函数内可见。 闭包 AHK v2 支持闭包 — 函数可以捕获外部变量：...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"06 - 函数\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/06-functions.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"06 - 函数"}],["meta",{"property":"og:description","content":"06 - 函数 函数定义 返回值 默认参数 默认参数必须是常量表达式，不能是变量。 可变参数 函数调用方式 推荐：始终使用括号调用函数，更清晰且不容易出错。 局部变量与全局变量 global 声明 static 声明（函数内静态变量） static 变量在函数调用之间保持值，但只在该函数内可见。 闭包 AHK v2 支持闭包 — 函数可以捕获外部变量：..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.44,"words":1031},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/06-functions.md","autoDesc":true}`),u={name:`06-functions.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_06-函数" tabindex="-1"><a class="header-anchor" href="#_06-函数"><span>06 - 函数</span></a></h1><h2 id="函数定义" tabindex="-1"><a class="header-anchor" href="#函数定义"><span>函数定义</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">; 基本函数</span>
<span class="line">Greet(name) {</span>
<span class="line">    MsgBox &quot;Hello, &quot; name &quot;!&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 调用</span>
<span class="line">Greet(&quot;AutoHotkey&quot;)</span>
<span class="line"></span></code></pre></div><h3 id="返回值" tabindex="-1"><a class="header-anchor" href="#返回值"><span>返回值</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">Add(a, b) {</span>
<span class="line">    return a + b</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">result := Add(3, 4)     ; result = 7</span>
<span class="line"></span>
<span class="line">; return 可以省略，函数默认返回空字符串</span>
<span class="line">NoReturn() {</span>
<span class="line">    MsgBox &quot;没有返回值&quot;</span>
<span class="line">}</span>
<span class="line">x := NoReturn()          ; x = &quot;&quot;（空字符串）</span>
<span class="line"></span></code></pre></div><h3 id="默认参数" tabindex="-1"><a class="header-anchor" href="#默认参数"><span>默认参数</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">Power(base, exp := 2) {    ; exp 默认为 2</span>
<span class="line">    return base ** exp</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">MsgBox Power(3)           ; 9（3 的 2 次方）</span>
<span class="line">MsgBox Power(3, 3)        ; 27（3 的 3 次方）</span>
<span class="line"></span></code></pre></div><blockquote><p>默认参数必须是常量表达式，不能是变量。</p></blockquote><h3 id="可变参数" tabindex="-1"><a class="header-anchor" href="#可变参数"><span>可变参数</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 用 * 接收任意数量的参数</span>
<span class="line">Sum(nums*) {</span>
<span class="line">    total := 0</span>
<span class="line">    for i, n in nums {</span>
<span class="line">        total += n</span>
<span class="line">    }</span>
<span class="line">    return total</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">MsgBox Sum(1, 2, 3)       ; 6</span>
<span class="line">MsgBox Sum(1, 2, 3, 4, 5) ; 15</span>
<span class="line">MsgBox Sum()              ; 0</span>
<span class="line"></span>
<span class="line">; 可变参数也可以有前缀的固定参数</span>
<span class="line">Join(sep, parts*) {</span>
<span class="line">    result := &quot;&quot;</span>
<span class="line">    for i, p in parts {</span>
<span class="line">        if (i &gt; 1)</span>
<span class="line">            result .= sep</span>
<span class="line">        result .= p</span>
<span class="line">    }</span>
<span class="line">    return result</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">MsgBox Join(&quot;, &quot;, &quot;a&quot;, &quot;b&quot;, &quot;c&quot;)  ; &quot;a, b, c&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数调用方式" tabindex="-1"><a class="header-anchor" href="#函数调用方式"><span>函数调用方式</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 括号调用（推荐、标准方式）</span>
<span class="line">MsgBox(&quot;Hello&quot;)</span>
<span class="line">result := Add(3, 4)</span>
<span class="line"></span>
<span class="line">; 空括号可以省略</span>
<span class="line">ExitApp()     ; 等价于</span>
<span class="line">ExitApp       ; 无参数时可以省略括号</span>
<span class="line"></span>
<span class="line">; 单参数可以省略括号</span>
<span class="line">MsgBox &quot;Hello&quot;    ; 等价于 MsgBox(&quot;Hello&quot;)</span>
<span class="line">Sleep 1000        ; 等价于 Sleep(1000)</span>
<span class="line"></span>
<span class="line">; 多参数必须用括号</span>
<span class="line">MsgBox(&quot;确认？&quot;, &quot;标题&quot;, 4)</span>
<span class="line"></span></code></pre></div><blockquote><p><strong>推荐</strong>：始终使用括号调用函数，更清晰且不容易出错。</p></blockquote><h2 id="局部变量与全局变量" tabindex="-1"><a class="header-anchor" href="#局部变量与全局变量"><span>局部变量与全局变量</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">x := 10               ; 全局变量</span>
<span class="line"></span>
<span class="line">MyFunc() {</span>
<span class="line">    x := 20            ; 局部变量（默认），不影响全局</span>
<span class="line">    y := 30            ; 局部变量</span>
<span class="line">    MsgBox &quot;局部 x=&quot; x &quot; y=&quot; y</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">MyFunc()               ; 显示局部 x=20 y=30</span>
<span class="line">MsgBox &quot;全局 x=&quot; x     ; 显示全局 x=10</span>
<span class="line"></span></code></pre></div><h3 id="global-声明" tabindex="-1"><a class="header-anchor" href="#global-声明"><span>global 声明</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">counter := 0</span>
<span class="line"></span>
<span class="line">Increment() {</span>
<span class="line">    global counter     ; 引用全局变量</span>
<span class="line">    counter += 1</span>
<span class="line">    return counter</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">Increment()            ; 1</span>
<span class="line">Increment()            ; 2</span>
<span class="line">MsgBox counter         ; 2</span>
<span class="line"></span></code></pre></div><h3 id="static-声明-函数内静态变量" tabindex="-1"><a class="header-anchor" href="#static-声明-函数内静态变量"><span>static 声明（函数内静态变量）</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">Count() {</span>
<span class="line">    static count := 0   ; 静态变量，只在首次调用时初始化</span>
<span class="line">    count += 1</span>
<span class="line">    return count</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">MsgBox Count()         ; 1</span>
<span class="line">MsgBox Count()         ; 2</span>
<span class="line">MsgBox Count()         ; 3</span>
<span class="line"></span></code></pre></div><blockquote><p><code>static</code> 变量在函数调用之间保持值，但只在该函数内可见。</p></blockquote><h2 id="闭包" tabindex="-1"><a class="header-anchor" href="#闭包"><span>闭包</span></a></h2><p>AHK v2 支持<strong>闭包</strong> — 函数可以捕获外部变量：</p><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">MakeCounter(start := 0) {</span>
<span class="line">    count := start           ; 局部变量</span>
<span class="line">    Counter() {</span>
<span class="line">        count += 1           ; 捕获并修改外部的 count</span>
<span class="line">        return count</span>
<span class="line">    }</span>
<span class="line">    return Counter           ; 返回内部函数</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">c := MakeCounter(10)</span>
<span class="line">MsgBox c()                   ; 11</span>
<span class="line">MsgBox c()                   ; 12</span>
<span class="line">MsgBox c()                   ; 13</span>
<span class="line"></span>
<span class="line">; 每次调用 MakeCounter 创建独立的闭包</span>
<span class="line">c2 := MakeCounter()</span>
<span class="line">MsgBox c2()                  ; 1（独立计数）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="递归" tabindex="-1"><a class="header-anchor" href="#递归"><span>递归</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 递归计算阶乘</span>
<span class="line">Factorial(n) {</span>
<span class="line">    if (n &lt;= 1)</span>
<span class="line">        return 1</span>
<span class="line">    return n * Factorial(n - 1)</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">MsgBox Factorial(5)       ; 120（5! = 120）</span>
<span class="line"></span>
<span class="line">; 递归遍历目录</span>
<span class="line">ListFiles(dir, indent := 0) {</span>
<span class="line">    prefix := StrRepeat(&quot;  &quot;, indent)</span>
<span class="line">    Loop Files dir &quot;\\*.*&quot; {</span>
<span class="line">        if A_LoopFileAttrib ~= &quot;D&quot; {    ; 是目录</span>
<span class="line">            MsgBox prefix &quot;[DIR] &quot; A_LoopFileName</span>
<span class="line">            ListFiles(A_LoopFileFullPath, indent + 1)</span>
<span class="line">        } else {</span>
<span class="line">            MsgBox prefix A_LoopFileName</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数作为参数-回调" tabindex="-1"><a class="header-anchor" href="#函数作为参数-回调"><span>函数作为参数（回调）</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 传递函数作为参数</span>
<span class="line">Apply(arr, func) {</span>
<span class="line">    result := []</span>
<span class="line">    for i, v in arr {</span>
<span class="line">        result.Push(func(v))</span>
<span class="line">    }</span>
<span class="line">    return result</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">Double(n) {</span>
<span class="line">    return n * 2</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">arr := [1, 2, 3, 4]</span>
<span class="line">doubled := Apply(arr, Double)</span>
<span class="line">MsgBox doubled[1]  ; 2</span>
<span class="line">MsgBox doubled[2]  ; 4</span>
<span class="line">MsgBox doubled[3]  ; 6</span>
<span class="line">MsgBox doubled[4]  ; 8</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数引用" tabindex="-1"><a class="header-anchor" href="#函数引用"><span>函数引用</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 用 Func() 获取函数引用</span>
<span class="line">fn := Func(&quot;MsgBox&quot;)</span>
<span class="line">fn(&quot;Hello&quot;)          ; 等价于 MsgBox(&quot;Hello&quot;)</span>
<span class="line"></span>
<span class="line">; 函数引用可以存储和传递</span>
<span class="line">fn := Double</span>
<span class="line">MsgBox fn(5)         ; 10</span>
<span class="line"></span>
<span class="line">; 函数名作为字符串</span>
<span class="line">fn := &quot;Double&quot;</span>
<span class="line">MsgBox %fn%(5)       ; 不推荐，v2 中尽量避免这种写法</span>
<span class="line"></span></code></pre></div><h2 id="内置常用函数" tabindex="-1"><a class="header-anchor" href="#内置常用函数"><span>内置常用函数</span></a></h2><h3 id="消息与输入" tabindex="-1"><a class="header-anchor" href="#消息与输入"><span>消息与输入</span></a></h3><table><thead><tr><th>函数</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td><code>MsgBox</code></td><td>弹出消息框</td><td><code>MsgBox(&quot;提示&quot;, &quot;标题&quot;, 64)</code></td></tr><tr><td><code>InputBox</code></td><td>输入对话框</td><td><code>InputBox(&quot;请输入&quot;, &quot;标题&quot;)</code></td></tr><tr><td><code>ToolTip</code></td><td>鼠标旁提示</td><td><code>ToolTip(&quot;提示文字&quot;)</code></td></tr><tr><td><code>SplashTextOn</code></td><td>持久提示窗口</td><td><code>SplashTextOn(&quot;标题&quot;, &quot;内容&quot;)</code></td></tr></tbody></table><h3 id="数学" tabindex="-1"><a class="header-anchor" href="#数学"><span>数学</span></a></h3><table><thead><tr><th>函数</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td><code>Abs</code></td><td>绝对值</td><td><code>Abs(-5)</code> → 5</td></tr><tr><td><code>Ceil</code></td><td>向上取整</td><td><code>Ceil(3.2)</code> → 4</td></tr><tr><td><code>Floor</code></td><td>向下取整</td><td><code>Floor(3.8)</code> → 3</td></tr><tr><td><code>Round</code></td><td>四舍五入</td><td><code>Round(3.5)</code> → 4</td></tr><tr><td><code>Sqrt</code></td><td>平方根</td><td><code>Sqrt(9)</code> → 3</td></tr><tr><td><code>Max</code></td><td>最大值</td><td><code>Max(1, 5, 3)</code> → 5</td></tr><tr><td><code>Min</code></td><td>最小值</td><td><code>Min(1, 5, 3)</code> → 1</td></tr><tr><td><code>Random</code></td><td>随机数</td><td><code>Random(1, 100)</code> → 随机1-100</td></tr><tr><td><code>Mod</code></td><td>取模</td><td><code>Mod(10, 3)</code> → 1</td></tr></tbody></table><h3 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串"><span>字符串</span></a></h3><table><thead><tr><th>函数</th><th>说明</th></tr></thead><tbody><tr><td><code>StrLen</code></td><td>字符串长度</td></tr><tr><td><code>SubStr</code></td><td>截取子串</td></tr><tr><td><code>InStr</code></td><td>查找子串位置</td></tr><tr><td><code>StrReplace</code></td><td>替换子串</td></tr><tr><td><code>StrSplit</code></td><td>按分隔符拆分</td></tr><tr><td><code>StrLower</code></td><td>转小写</td></tr><tr><td><code>StrUpper</code></td><td>转大写</td></tr><tr><td><code>Trim</code></td><td>去首尾空白</td></tr><tr><td><code>LTrim / RTrim</code></td><td>去左/右空白</td></tr><tr><td><code>Format</code></td><td>格式化字符串</td></tr></tbody></table><h3 id="文件" tabindex="-1"><a class="header-anchor" href="#文件"><span>文件</span></a></h3><table><thead><tr><th>函数</th><th>说明</th></tr></thead><tbody><tr><td><code>FileRead</code></td><td>读文件</td></tr><tr><td><code>FileWrite</code></td><td>写文件</td></tr><tr><td><code>FileAppend</code></td><td>追加内容</td></tr><tr><td><code>FileExist</code></td><td>检查文件是否存在</td></tr><tr><td><code>FileGetSize</code></td><td>文件大小</td></tr><tr><td><code>FileDelete</code></td><td>删除文件</td></tr><tr><td><code>FileCopy</code></td><td>复制文件</td></tr><tr><td><code>FileMove</code></td><td>移动文件</td></tr><tr><td><code>DirExist</code></td><td>检查目录是否存在</td></tr><tr><td><code>DirCopy</code></td><td>复制目录</td></tr><tr><td><code>DirDelete</code></td><td>删除目录</td></tr></tbody></table><hr>`,39),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/07-strings.html`},{default:r(()=>[...l[0]||=[e(`07-字符串处理`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};