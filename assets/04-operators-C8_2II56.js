import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/04-operators.html","title":"04 - 运算符","lang":"zh-CN","frontmatter":{"order":4,"description":"04 - 运算符 算术运算符 整除 vs 除法 比较运算符 关键区别：= / != 不区分大小写，== / !== 区分大小写。比较数字时两者行为相同。 比较的行为细节 逻辑运算符 字符串运算符 位运算符 三元运算符 运算符优先级 从高到低排列： 用括号确保优先级 赋值运算符汇总 下一步:","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"04 - 运算符\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/04-operators.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"04 - 运算符"}],["meta",{"property":"og:description","content":"04 - 运算符 算术运算符 整除 vs 除法 比较运算符 关键区别：= / != 不区分大小写，== / !== 区分大小写。比较数字时两者行为相同。 比较的行为细节 逻辑运算符 字符串运算符 位运算符 三元运算符 运算符优先级 从高到低排列： 用括号确保优先级 赋值运算符汇总 下一步:"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.37,"words":1012},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/04-operators.md","autoDesc":true}`),u={name:`04-operators.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_04-运算符" tabindex="-1"><a class="header-anchor" href="#_04-运算符"><span>04 - 运算符</span></a></h1><h2 id="算术运算符" tabindex="-1"><a class="header-anchor" href="#算术运算符"><span>算术运算符</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">a := 10</span>
<span class="line">b := 3</span>
<span class="line"></span>
<span class="line">result := a + b      ; 加法  → 13</span>
<span class="line">result := a - b      ; 减法  → 7</span>
<span class="line">result := a * b      ; 乘法  → 30</span>
<span class="line">result := a / b      ; 除法  → 3.333...</span>
<span class="line">result := a // b     ; 整除  → 3（向下取整）</span>
<span class="line">result := a ** b     ; 幂运算 → 1000（10 的 3 次方）</span>
<span class="line">result := a % b      ; 取模  → 1（10 mod 3）</span>
<span class="line"></span>
<span class="line">; 自增自减</span>
<span class="line">n := 5</span>
<span class="line">n++                   ; n = 6（后置自增）</span>
<span class="line">n--                   ; n = 5（后置自减）</span>
<span class="line">n += 10               ; n = 15（加赋值）</span>
<span class="line">n -= 5                ; n = 10（减赋值）</span>
<span class="line">n *= 2                ; n = 20（乘赋值）</span>
<span class="line">n /= 4                ; n = 5（除赋值）</span>
<span class="line">n //= 3               ; n = 1（整除赋值）</span>
<span class="line">n .= &quot;号&quot;             ; n = &quot;1号&quot;（字符串拼接赋值）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="整除-vs-除法" tabindex="-1"><a class="header-anchor" href="#整除-vs-除法"><span>整除 vs 除法</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; // 整除：向负无穷取整</span>
<span class="line">MsgBox 7 // 2      ; 3</span>
<span class="line">MsgBox -7 // 2     ; -4（注意不是 -3！）</span>
<span class="line">MsgBox 7.0 // 2    ; 3.0</span>
<span class="line"></span>
<span class="line">; / 除法：总是返回浮点数</span>
<span class="line">MsgBox 7 / 2       ; 3.5</span>
<span class="line">MsgBox 6 / 2       ; 3.0（也是浮点数）</span>
<span class="line"></span></code></pre></div><h2 id="比较运算符" tabindex="-1"><a class="header-anchor" href="#比较运算符"><span>比较运算符</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">5 == 5       ; true — 等于（区分大小写）</span>
<span class="line">5 != 5       ; false — 不等于（区分大小写）</span>
<span class="line"></span>
<span class="line">&quot;abc&quot; = &quot;ABC&quot;    ; true — 不区分大小写的字符串比较</span>
<span class="line">&quot;abc&quot; != &quot;ABC&quot;   ; false — 不区分大小写</span>
<span class="line"></span>
<span class="line">&quot;abc&quot; == &quot;ABC&quot;   ; false — 区分大小写的字符串比较</span>
<span class="line">&quot;abc&quot; !== &quot;ABC&quot;  ; true — 区分大小写</span>
<span class="line"></span>
<span class="line">5 &gt; 3        ; true — 大于</span>
<span class="line">5 &lt; 3        ; false — 小于</span>
<span class="line">5 &gt;= 5       ; true — 大于等于</span>
<span class="line">5 &lt;= 4       ; false — 小于等于</span>
<span class="line"></span></code></pre></div><blockquote><p><strong>关键区别</strong>：<code>= / !=</code> 不区分大小写，<code>== / !==</code> 区分大小写。比较数字时两者行为相同。</p></blockquote><h3 id="比较的行为细节" tabindex="-1"><a class="header-anchor" href="#比较的行为细节"><span>比较的行为细节</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 数字比较 — 数值比较</span>
<span class="line">MsgBox 5 &gt; 3        ; true</span>
<span class="line">MsgBox &quot;5&quot; &gt; &quot;3&quot;    ; true（字符串中的数字仍按数值比较）</span>
<span class="line"></span>
<span class="line">; 纯字符串比较 — 按字母序</span>
<span class="line">MsgBox &quot;abc&quot; &gt; &quot;abb&quot;  ; true（字母序比较）</span>
<span class="line">MsgBox &quot;abc&quot; &gt; &quot;ABC&quot;  ; true（不区分大小写字母序）</span>
<span class="line"></span>
<span class="line">; 混合比较 — 数字优先</span>
<span class="line">MsgBox &quot;10&quot; &gt; &quot;9&quot;    ; true（按数值比较）</span>
<span class="line">MsgBox &quot;a10&quot; &gt; &quot;a9&quot;  ; true（混合字符串也按数值部分比较）</span>
<span class="line"></span></code></pre></div><h2 id="逻辑运算符" tabindex="-1"><a class="header-anchor" href="#逻辑运算符"><span>逻辑运算符</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">true &amp;&amp; true    ; true — 逻辑与</span>
<span class="line">true &amp;&amp; false   ; false</span>
<span class="line">true || false   ; true — 逻辑或</span>
<span class="line">false || false  ; false</span>
<span class="line">!true           ; false — 逻辑非</span>
<span class="line">!false          ; true</span>
<span class="line"></span>
<span class="line">; 短路求值</span>
<span class="line">x := 5</span>
<span class="line">y := 0</span>
<span class="line">if (y != 0 &amp;&amp; x / y &gt; 2)    ; y=0 时不会执行 x/y，避免除零错误</span>
<span class="line">    MsgBox &quot;不会到这里&quot;</span>
<span class="line"></span>
<span class="line">; 实用模式</span>
<span class="line">if (FileExist(path) &amp;&amp; FileGetSize(path) &gt; 0)</span>
<span class="line">    MsgBox &quot;文件存在且有内容&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符串运算符" tabindex="-1"><a class="header-anchor" href="#字符串运算符"><span>字符串运算符</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 拼接（隐式拼接 — 表达式中相邻字符串和变量自动拼接）</span>
<span class="line">msg := &quot;Hello&quot; &quot; &quot; &quot;World&quot;       ; &quot;Hello World&quot;</span>
<span class="line">msg := &quot;Value: &quot; value           ; &quot;Value: 42&quot;（假设 value=42）</span>
<span class="line"></span>
<span class="line">; 拼接运算符 .</span>
<span class="line">msg := &quot;Hello&quot; . &quot; &quot; . &quot;World&quot;   ; 与隐式拼接效果相同</span>
<span class="line"></span>
<span class="line">; .= 拼接赋值</span>
<span class="line">text := &quot;Hello&quot;</span>
<span class="line">text .= &quot; World&quot;                  ; text = &quot;Hello World&quot;</span>
<span class="line"></span>
<span class="line">; 注意括号的使用</span>
<span class="line">msg := &quot;Age: &quot; (age + 1)          ; &quot;Age: 26&quot;（先计算再拼接）</span>
<span class="line">msg := &quot;Result: &quot; func()          ; 先调用函数再拼接</span>
<span class="line"></span></code></pre></div><h2 id="位运算符" tabindex="-1"><a class="header-anchor" href="#位运算符"><span>位运算符</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 按位与</span>
<span class="line">MsgBox 5 &amp; 3         ; 1  (0101 &amp; 0011 = 0001)</span>
<span class="line"></span>
<span class="line">; 按位或</span>
<span class="line">MsgBox 5 | 3         ; 7  (0101 | 0011 = 0111)</span>
<span class="line"></span>
<span class="line">; 按位异或</span>
<span class="line">MsgBox 5 ^ 3         ; 6  (0101 ^ 0011 = 0110)</span>
<span class="line"></span>
<span class="line">; 按位取反</span>
<span class="line">MsgBox ~5            ; -6（所有位翻转）</span>
<span class="line"></span>
<span class="line">; 左移</span>
<span class="line">MsgBox 1 &lt;&lt; 3        ; 8  (1 * 2^3 = 8)</span>
<span class="line"></span>
<span class="line">; 右移</span>
<span class="line">MsgBox 8 &gt;&gt; 3        ; 1  (8 / 2^3 = 1)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三元运算符" tabindex="-1"><a class="header-anchor" href="#三元运算符"><span>三元运算符</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 条件 ? 真值 : 假值</span>
<span class="line">status := age &gt;= 18 ? &quot;成年&quot; : &quot;未成年&quot;</span>
<span class="line"></span>
<span class="line">MsgBox age &gt;= 18 ? &quot;成年&quot; : &quot;未成年&quot;</span>
<span class="line"></span>
<span class="line">; 嵌套三元（谨慎使用，可读性差）</span>
<span class="line">label := score &gt;= 90 ? &quot;优秀&quot; : score &gt;= 60 ? &quot;及格&quot; : &quot;不及格&quot;</span>
<span class="line"></span></code></pre></div><h2 id="运算符优先级" tabindex="-1"><a class="header-anchor" href="#运算符优先级"><span>运算符优先级</span></a></h2><p>从高到低排列：</p><table><thead><tr><th>优先级</th><th>运算符</th><th>说明</th></tr></thead><tbody><tr><td>1（最高）</td><td><code>++ -- </code></td><td>自增自减（后置更低）</td></tr><tr><td>2</td><td><code>~ ! **</code></td><td>取反、逻辑非、幂运算</td></tr><tr><td>3</td><td><code>* / %</code></td><td>乘除取模</td></tr><tr><td>4</td><td><code>+ -</code></td><td>加减</td></tr><tr><td>5</td><td><code>&lt;&lt; &gt;&gt;</code></td><td>位移</td></tr><tr><td>6</td><td><code>&amp;</code></td><td>按位与</td></tr><tr><td>7</td><td><code>^</code></td><td>按位异或</td></tr><tr><td>8</td><td>\`</td><td>\`</td></tr><tr><td>9</td><td><code>&lt; &gt; &lt;= &gt;= = != == !==</code></td><td>比较</td></tr><tr><td>10</td><td><code>&amp;&amp;</code></td><td>逻辑与</td></tr><tr><td>11</td><td>\`</td><td></td></tr><tr><td>12（最低）</td><td><code>?:</code></td><td>三元</td></tr></tbody></table><h3 id="用括号确保优先级" tabindex="-1"><a class="header-anchor" href="#用括号确保优先级"><span>用括号确保优先级</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 不清楚优先级时，加括号更安全</span>
<span class="line">result := (a + b) * c      ; 明确先加再乘</span>
<span class="line">result := a + (b * c)      ; 明确先乘再加</span>
<span class="line"></span>
<span class="line">; 逻辑表达式加括号</span>
<span class="line">if (a &gt; 0 &amp;&amp; b &gt; 0)        ; 清晰</span>
<span class="line"></span></code></pre></div><h2 id="赋值运算符汇总" tabindex="-1"><a class="header-anchor" href="#赋值运算符汇总"><span>赋值运算符汇总</span></a></h2><table><thead><tr><th>运算符</th><th>等价写法</th><th>说明</th></tr></thead><tbody><tr><td><code>:=</code></td><td><code>x := value</code></td><td>赋值</td></tr><tr><td><code>+=</code></td><td><code>x := x + value</code></td><td>加赋值</td></tr><tr><td><code>-=</code></td><td><code>x := x - value</code></td><td>减赋值</td></tr><tr><td><code>*=</code></td><td><code>x := x * value</code></td><td>乘赋值</td></tr><tr><td><code>/=</code></td><td><code>x := x / value</code></td><td>除赋值</td></tr><tr><td><code>//=</code></td><td><code>x := x // value</code></td><td>整除赋值</td></tr><tr><td><code>%=</code></td><td><code>x := x % value</code></td><td>取模赋值</td></tr><tr><td><code>.= </code></td><td><code>x := x . value</code></td><td>拼接赋值</td></tr><tr><td><code>&amp;=</code></td><td><code>x := x &amp; value</code></td><td>位与赋值</td></tr><tr><td>\`</td><td>=\`</td><td>\`x := x</td></tr><tr><td><code>^=</code></td><td><code>x := x ^ value</code></td><td>位异或赋值</td></tr><tr><td><code>&lt;&lt;=</code></td><td><code>x := x &lt;&lt; value</code></td><td>左移赋值</td></tr><tr><td><code>&gt;&gt;=</code></td><td><code>x := x &gt;&gt; value</code></td><td>右移赋值</td></tr><tr><td><code>++</code></td><td><code>x := x + 1</code></td><td>自增</td></tr><tr><td><code>--</code></td><td><code>x := x - 1</code></td><td>自减</td></tr></tbody></table><hr>`,26),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/05-control-flow.html`},{default:r(()=>[...l[0]||=[e(`05-控制流`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};