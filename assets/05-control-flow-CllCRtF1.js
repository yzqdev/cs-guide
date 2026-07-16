import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/05-control-flow.html","title":"05 - 控制流","lang":"zh-CN","frontmatter":{"order":5,"description":"05 - 控制流 if / else if 的条件写法 三元运算符 Loop 循环 计数循环 条件循环 无限循环 + break 循环控制: break / continue For-In 循环（遍历对象） While 循环 while 先检查条件再执行；Loop {...} Until 先执行再检查条件。 Switch（AHK v2 新增） Swit...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"05 - 控制流\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/05-control-flow.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"05 - 控制流"}],["meta",{"property":"og:description","content":"05 - 控制流 if / else if 的条件写法 三元运算符 Loop 循环 计数循环 条件循环 无限循环 + break 循环控制: break / continue For-In 循环（遍历对象） While 循环 while 先检查条件再执行；Loop {...} Until 先执行再检查条件。 Switch（AHK v2 新增） Swit..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.89,"words":868},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/05-control-flow.md","autoDesc":true}`),u={name:`05-control-flow.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_05-控制流" tabindex="-1"><a class="header-anchor" href="#_05-控制流"><span>05 - 控制流</span></a></h1><h2 id="if-else" tabindex="-1"><a class="header-anchor" href="#if-else"><span>if / else</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">; 基本 if</span>
<span class="line">if (age &gt;= 18) {</span>
<span class="line">    MsgBox &quot;成年人&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; if-else</span>
<span class="line">if (score &gt;= 60) {</span>
<span class="line">    MsgBox &quot;及格&quot;</span>
<span class="line">} else {</span>
<span class="line">    MsgBox &quot;不及格&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; if-else 链</span>
<span class="line">if (score &gt;= 90) {</span>
<span class="line">    MsgBox &quot;优秀&quot;</span>
<span class="line">} else if (score &gt;= 60) {</span>
<span class="line">    MsgBox &quot;及格&quot;</span>
<span class="line">} else {</span>
<span class="line">    MsgBox &quot;不及格&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="if-的条件写法" tabindex="-1"><a class="header-anchor" href="#if-的条件写法"><span>if 的条件写法</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 括号内的表达式</span>
<span class="line">if (x &gt; 0 &amp;&amp; y &gt; 0) {</span>
<span class="line">    MsgBox &quot;正坐标&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; AHK v2 中 if 条件必须用括号</span>
<span class="line">if x &gt; 0 {    ; 也可以不加外层括号，但建议加上</span>
<span class="line">    MsgBox &quot;正数&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 单行 if</span>
<span class="line">if (flag)</span>
<span class="line">    MsgBox &quot;已启用&quot;</span>
<span class="line"></span>
<span class="line">; 否定条件</span>
<span class="line">if !(loggedIn) {</span>
<span class="line">    MsgBox &quot;请先登录&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三元运算符" tabindex="-1"><a class="header-anchor" href="#三元运算符"><span>三元运算符</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 快速的条件判断赋值</span>
<span class="line">label := age &gt;= 18 ? &quot;成年&quot; : &quot;未成年&quot;</span>
<span class="line"></span>
<span class="line">MsgBox score &gt;= 60 ? &quot;通过&quot; : &quot;失败&quot;</span>
<span class="line"></span>
<span class="line">; 可以用于函数参数</span>
<span class="line">MsgBox(found ? &quot;找到了！&quot; : &quot;没找到！&quot;)</span>
<span class="line"></span></code></pre></div><h2 id="loop-循环" tabindex="-1"><a class="header-anchor" href="#loop-循环"><span>Loop 循环</span></a></h2><h3 id="计数循环" tabindex="-1"><a class="header-anchor" href="#计数循环"><span>计数循环</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; Loop n — 执行 n 次</span>
<span class="line">Loop 5 {</span>
<span class="line">    MsgBox &quot;这是第 &quot; A_Index &quot; 次循环&quot;</span>
<span class="line">}</span>
<span class="line">; A_Index 是内置变量，表示当前循环次数（从 1 开始）</span>
<span class="line"></span></code></pre></div><h3 id="条件循环" tabindex="-1"><a class="header-anchor" href="#条件循环"><span>条件循环</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; Loop { ... } Until 条件 — 执行直到条件满足</span>
<span class="line">Loop {</span>
<span class="line">    x := Random(1, 100)</span>
<span class="line">    if (x &gt; 90)</span>
<span class="line">        break</span>
<span class="line">} Until (x &gt; 90)</span>
<span class="line"></span>
<span class="line">; 注意：上面是先执行再判断。Until 至少执行一次循环体。</span>
<span class="line"></span></code></pre></div><h3 id="无限循环-break" tabindex="-1"><a class="header-anchor" href="#无限循环-break"><span>无限循环 + break</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">Loop {</span>
<span class="line">    if (GetKeyState(&quot;Esc&quot;, &quot;P&quot;))   ; 检查 Esc 是否被按下</span>
<span class="line">        break</span>
<span class="line">    Sleep 100</span>
<span class="line">}</span>
<span class="line">MsgBox &quot;循环结束&quot;</span>
<span class="line"></span></code></pre></div><h3 id="循环控制-break-continue" tabindex="-1"><a class="header-anchor" href="#循环控制-break-continue"><span>循环控制: break / continue</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; break — 立即退出整个循环</span>
<span class="line">Loop 10 {</span>
<span class="line">    if (A_Index = 5)</span>
<span class="line">        break         ; 第5次时退出，不会继续到6-10</span>
<span class="line">    MsgBox A_Index</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; continue — 跳过当前迭代，继续下一次</span>
<span class="line">Loop 10 {</span>
<span class="line">    if (A_Index = 5)</span>
<span class="line">        continue      ; 第5次跳过，继续第6次</span>
<span class="line">    MsgBox A_Index    ; 不会显示 5</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="for-in-循环-遍历对象" tabindex="-1"><a class="header-anchor" href="#for-in-循环-遍历对象"><span>For-In 循环（遍历对象）</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 遍历 Array</span>
<span class="line">arr := [10, 20, 30, 40]</span>
<span class="line">for index, value in arr {</span>
<span class="line">    MsgBox &quot;索引 &quot; index &quot; = &quot; value</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 遍历 Map</span>
<span class="line">m := Map(&quot;name&quot;, &quot;AHK&quot;, &quot;version&quot;, 2)</span>
<span class="line">for key, value in m {</span>
<span class="line">    MsgBox key &quot;: &quot; value</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; A_Index 在 for 循环中也可用</span>
<span class="line">arr := [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]</span>
<span class="line">for index, value in arr {</span>
<span class="line">    MsgBox &quot;迭代次数: &quot; A_Index  ; 1, 2, 3</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="while-循环" tabindex="-1"><a class="header-anchor" href="#while-循环"><span>While 循环</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; while 条件 — 条件为真时反复执行</span>
<span class="line">i := 0</span>
<span class="line">while (i &lt; 10) {</span>
<span class="line">    i++</span>
<span class="line">    MsgBox &quot;i = &quot; i</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; while 也可以不加括号</span>
<span class="line">while i &lt; 10</span>
<span class="line">    i++</span>
<span class="line"></span></code></pre></div><blockquote><p><code>while</code> 先检查条件再执行；<code>Loop {...} Until</code> 先执行再检查条件。</p></blockquote><h2 id="switch-ahk-v2-新增" tabindex="-1"><a class="header-anchor" href="#switch-ahk-v2-新增"><span>Switch（AHK v2 新增）</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">day := &quot;Wednesday&quot;</span>
<span class="line"></span>
<span class="line">switch day {</span>
<span class="line">    case &quot;Monday&quot;:</span>
<span class="line">        MsgBox &quot;周一&quot;</span>
<span class="line">    case &quot;Tuesday&quot;, &quot;Wednesday&quot;:</span>
<span class="line">        MsgBox &quot;周二或周三&quot;   ; 多值用逗号</span>
<span class="line">    case &quot;Thursday&quot;:</span>
<span class="line">        MsgBox &quot;周四&quot;</span>
<span class="line">    case &quot;Friday&quot;:</span>
<span class="line">        MsgBox &quot;周五&quot;</span>
<span class="line">    default:</span>
<span class="line">        MsgBox &quot;周末或其他&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h3 id="switch-的数值匹配" tabindex="-1"><a class="header-anchor" href="#switch-的数值匹配"><span>Switch 的数值匹配</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">score := 85</span>
<span class="line"></span>
<span class="line">switch true {              ; switch true 可以用条件表达式</span>
<span class="line">    case score &gt;= 90:</span>
<span class="line">        MsgBox &quot;优秀&quot;</span>
<span class="line">    case score &gt;= 80:</span>
<span class="line">        MsgBox &quot;良好&quot;</span>
<span class="line">    case score &gt;= 60:</span>
<span class="line">        MsgBox &quot;及格&quot;</span>
<span class="line">    default:</span>
<span class="line">        MsgBox &quot;不及格&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><blockquote><p><code>switch</code> 每个 case 后自动 break，不需要手动写 break。</p></blockquote><h2 id="循环嵌套" tabindex="-1"><a class="header-anchor" href="#循环嵌套"><span>循环嵌套</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 嵌套循环 — 用 A_Index 区分层级</span>
<span class="line">Loop 3 {</span>
<span class="line">    outer := A_Index       ; 保存外层 A_Index</span>
<span class="line">    Loop 3 {</span>
<span class="line">        MsgBox &quot;外: &quot; outer &quot; 内: &quot; A_Index</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><blockquote><p><code>A_Index</code> 总是表示<strong>当前层</strong>的循环索引。嵌套时需要保存外层的值。</p></blockquote><h2 id="循环变量-a-index" tabindex="-1"><a class="header-anchor" href="#循环变量-a-index"><span>循环变量 A_Index</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">Loop 5 {</span>
<span class="line">    MsgBox A_Index     ; 依次显示 1, 2, 3, 4, 5</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; A_Index 在循环结束后自动恢复为 0</span>
<span class="line">MsgBox A_Index          ; 0（循环外）</span>
<span class="line"></span></code></pre></div><table><thead><tr><th>循环类型</th><th>A_Index</th><th>说明</th></tr></thead><tbody><tr><td><code>Loop n</code></td><td>1 到 n</td><td>计数循环</td></tr><tr><td><code>Loop { } Until</code></td><td>递增</td><td>条件循环</td></tr><tr><td><code>for k,v in obj</code></td><td>递增</td><td>遍历循环</td></tr><tr><td><code>while</code></td><td>递增</td><td>条件循环</td></tr></tbody></table><h2 id="常见循环模式" tabindex="-1"><a class="header-anchor" href="#常见循环模式"><span>常见循环模式</span></a></h2><h3 id="等待某个条件" tabindex="-1"><a class="header-anchor" href="#等待某个条件"><span>等待某个条件</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 等待窗口出现</span>
<span class="line">WinWait &quot;计算器&quot;, , 10    ; 最多等10秒</span>
<span class="line">if WinExist(&quot;计算器&quot;)</span>
<span class="line">    MsgBox &quot;计算器已出现&quot;</span>
<span class="line">else</span>
<span class="line">    MsgBox &quot;等待超时&quot;</span>
<span class="line"></span>
<span class="line">; 自定义等待循环</span>
<span class="line">Loop {</span>
<span class="line">    if WinExist(&quot;目标窗口&quot;) {</span>
<span class="line">        WinActivate &quot;目标窗口&quot;</span>
<span class="line">        break</span>
<span class="line">    }</span>
<span class="line">    Sleep 500</span>
<span class="line">} Until (A_Index &gt; 20)    ; 最多等 20*500ms = 10秒</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重试模式" tabindex="-1"><a class="header-anchor" href="#重试模式"><span>重试模式</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">maxRetry := 3</span>
<span class="line">Loop maxRetry {</span>
<span class="line">    try {</span>
<span class="line">        result := DoSomething()</span>
<span class="line">        break               ; 成功则退出</span>
<span class="line">    } catch Error as e {</span>
<span class="line">        if (A_Index = maxRetry)</span>
<span class="line">            MsgBox &quot;重试 &quot; maxRetry &quot; 次后仍失败: &quot; e.Message</span>
<span class="line">        else</span>
<span class="line">            Sleep 1000      ; 重试前等待</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><hr>`,38),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/06-functions.html`},{default:r(()=>[...l[0]||=[e(`06-函数`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};