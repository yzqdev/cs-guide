import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/03-variables.html","title":"03 - 变量与数据类型","lang":"zh-CN","frontmatter":{"order":3,"description":"03 - 变量与数据类型 变量基础 AHK v2 中所有赋值使用 :=： 变量命名规则 以字母或 #、@、$、_ 开头 后续字符可以是字母、数字或 _ 不区分大小写（myVar 和 MYVAR 是同一个变量） 最长 253 个字符 数据类型 AHK v2 是动态类型语言，变量没有固定类型，值决定类型： 字符串 整数与浮点数 布尔值 变量的作用域 全局变...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"03 - 变量与数据类型\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/03-variables.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"03 - 变量与数据类型"}],["meta",{"property":"og:description","content":"03 - 变量与数据类型 变量基础 AHK v2 中所有赋值使用 :=： 变量命名规则 以字母或 #、@、$、_ 开头 后续字符可以是字母、数字或 _ 不区分大小写（myVar 和 MYVAR 是同一个变量） 最长 253 个字符 数据类型 AHK v2 是动态类型语言，变量没有固定类型，值决定类型： 字符串 整数与浮点数 布尔值 变量的作用域 全局变..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.81,"words":1143},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/03-variables.md","autoDesc":true}`),u={name:`03-variables.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_03-变量与数据类型" tabindex="-1"><a class="header-anchor" href="#_03-变量与数据类型"><span>03 - 变量与数据类型</span></a></h1><h2 id="变量基础" tabindex="-1"><a class="header-anchor" href="#变量基础"><span>变量基础</span></a></h2><p>AHK v2 中所有赋值使用 <code>:=</code>：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">name := &quot;AutoHotkey&quot;       ; 字符串</span>
<span class="line">age := 25                  ; 整数</span>
<span class="line">score := 98.5              ; 浮点数</span>
<span class="line">active := true             ; 布尔值</span>
<span class="line">empty := &quot;&quot;                ; 空字符串</span>
<span class="line">nothing := &quot;&quot;              ; 未初始化变量默认值为空字符串</span>
<span class="line"></span>
<span class="line">; 多变量赋值</span>
<span class="line">a := 1, b := 2, c := 3    ; 用逗号分隔</span>
<span class="line"></span></code></pre></div><h3 id="变量命名规则" tabindex="-1"><a class="header-anchor" href="#变量命名规则"><span>变量命名规则</span></a></h3><ul><li>以字母或 <code>#</code>、<code>@</code>、<code>$</code>、<code>_</code> 开头</li><li>后续字符可以是字母、数字或 <code>_</code></li><li>不区分大小写（<code>myVar</code> 和 <code>MYVAR</code> 是同一个变量）</li><li>最长 253 个字符</li></ul><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 合法的变量名</span>
<span class="line">myVar := 1</span>
<span class="line">_MyVar := 2</span>
<span class="line">$special := 3</span>
<span class="line"></span>
<span class="line">; 不合法</span>
<span class="line">; 2var := 1    （数字开头）</span>
<span class="line">; my-var := 2  （包含连字符）</span>
<span class="line"></span></code></pre></div><h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型"><span>数据类型</span></a></h2><p>AHK v2 是动态类型语言，变量没有固定类型，值决定类型：</p><h3 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串"><span>字符串</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">s := &quot;Hello World&quot;</span>
<span class="line">s := &quot;&quot;                   ; 空字符串</span>
<span class="line">s := &quot;He said \\&quot;Hi\\&quot;&quot;     ; 包含引号</span>
<span class="line">s := &quot;Line1\`nLine2&quot;       ; 包含换行</span>
<span class="line"></span>
<span class="line">; 字符串长度</span>
<span class="line">len := StrLen(s)</span>
<span class="line"></span>
<span class="line">; 字符串类型判断</span>
<span class="line">if IsString(s)</span>
<span class="line">    MsgBox &quot;这是字符串&quot;</span>
<span class="line"></span></code></pre></div><h3 id="整数与浮点数" tabindex="-1"><a class="header-anchor" href="#整数与浮点数"><span>整数与浮点数</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">i := 42                   ; 整数</span>
<span class="line">f := 3.14                 ; 浮点数</span>
<span class="line">neg := -10                ; 负数</span>
<span class="line">hex := 0xFF               ; 十六进制（255）</span>
<span class="line">sci := 1.5e6              ; 科学计数法（1500000）</span>
<span class="line"></span>
<span class="line">; 类型判断</span>
<span class="line">if IsInteger(i)</span>
<span class="line">    MsgBox &quot;这是整数&quot;</span>
<span class="line"></span>
<span class="line">if IsFloat(f)</span>
<span class="line">    MsgBox &quot;这是浮点数&quot;</span>
<span class="line"></span>
<span class="line">if IsNumber(i) || IsNumber(f)</span>
<span class="line">    MsgBox &quot;这是数字&quot;</span>
<span class="line"></span>
<span class="line">; 类型转换</span>
<span class="line">s := String(42)           ; 数字转字符串 &quot;42&quot;</span>
<span class="line">n := Number(&quot;3.14&quot;)       ; 字符串转数字 3.14</span>
<span class="line">i := Integer(&quot;42&quot;)        ; 字符串转整数 42</span>
<span class="line">f := Float(&quot;3.14&quot;)        ; 字符串转浮点数 3.14</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="布尔值" tabindex="-1"><a class="header-anchor" href="#布尔值"><span>布尔值</span></a></h3><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">flag := true              ; 真</span>
<span class="line">flag := false             ; 假</span>
<span class="line"></span>
<span class="line">; 布尔转换规则</span>
<span class="line">; 这些值被视为 false:</span>
<span class="line">;   0, 0.0, &quot;&quot; (空字符串), false</span>
<span class="line">; 其他值都视为 true:</span>
<span class="line">;   非零数字, 非空字符串, true, 对象</span>
<span class="line"></span>
<span class="line">if (flag)</span>
<span class="line">    MsgBox &quot;条件为真&quot;</span>
<span class="line"></span>
<span class="line">; 数字与布尔的关系</span>
<span class="line">n := 0</span>
<span class="line">if !n                     ; true（0 被视为 false）</span>
<span class="line">    MsgBox &quot;0 就是 false&quot;</span>
<span class="line"></span>
<span class="line">n := 1</span>
<span class="line">if n                      ; true（1 被视为 true）</span>
<span class="line">    MsgBox &quot;1 就是 true&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="变量的作用域" tabindex="-1"><a class="header-anchor" href="#变量的作用域"><span>变量的作用域</span></a></h2><h3 id="全局变量" tabindex="-1"><a class="header-anchor" href="#全局变量"><span>全局变量</span></a></h3><p>在函数外部定义的变量是全局的。函数内部要访问全局变量需要声明：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">globalVar := &quot;我是全局的&quot;</span>
<span class="line"></span>
<span class="line">ShowGlobal() {</span>
<span class="line">    global globalVar       ; 声明使用全局变量</span>
<span class="line">    MsgBox globalVar</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">ShowGlobal()</span>
<span class="line"></span></code></pre></div><h3 id="局部变量" tabindex="-1"><a class="header-anchor" href="#局部变量"><span>局部变量</span></a></h3><p>函数内部未声明为 global 的变量是局部的：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">x := 10                   ; 全局 x</span>
<span class="line"></span>
<span class="line">MyFunc() {</span>
<span class="line">    x := 20               ; 局部 x，不影响全局</span>
<span class="line">    MsgBox &quot;局部 x = &quot; x   ; 显示 20</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">MyFunc()</span>
<span class="line">MsgBox &quot;全局 x = &quot; x       ; 显示 10</span>
<span class="line"></span></code></pre></div><h3 id="强制全局声明" tabindex="-1"><a class="header-anchor" href="#强制全局声明"><span>强制全局声明</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">counter := 0</span>
<span class="line"></span>
<span class="line">Increment() {</span>
<span class="line">    global counter         ; 使用全局 counter</span>
<span class="line">    counter += 1</span>
<span class="line">    return counter</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">Increment()  ; 1</span>
<span class="line">Increment()  ; 2</span>
<span class="line">MsgBox counter             ; 2</span>
<span class="line"></span></code></pre></div><h2 id="空值与默认值" tabindex="-1"><a class="header-anchor" href="#空值与默认值"><span>空值与默认值</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 未赋值的变量是空字符串 &quot;&quot;</span>
<span class="line">x ; 等价于 &quot;&quot;</span>
<span class="line"></span>
<span class="line">; 在数值运算中，空字符串被视为 0</span>
<span class="line">result := &quot;&quot; + 5          ; 5</span>
<span class="line"></span>
<span class="line">; 在字符串拼接中，空字符串就是空</span>
<span class="line">msg := &quot;Value: &quot; &quot;&quot;       ; &quot;Value: &quot;</span>
<span class="line"></span>
<span class="line">; 判断变量是否为空</span>
<span class="line">if (name = &quot;&quot;)</span>
<span class="line">    MsgBox &quot;名字为空&quot;</span>
<span class="line"></span>
<span class="line">; 判断变量是否有值</span>
<span class="line">if name</span>
<span class="line">    MsgBox &quot;名字不为空&quot;</span>
<span class="line"></span>
<span class="line">; 设置默认值</span>
<span class="line">name := name || &quot;匿名&quot;    ; 如果 name 为空，使用 &quot;匿名&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常量与命名惯例" tabindex="-1"><a class="header-anchor" href="#常量与命名惯例"><span>常量与命名惯例</span></a></h2><p>AHK v2 没有真正的常量声明，但可以通过命名惯例约定：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 用全大写表示常量（惯例，非强制）</span>
<span class="line">APP_NAME := &quot;MyTool&quot;</span>
<span class="line">APP_VERSION := &quot;1.0&quot;</span>
<span class="line">MAX_RETRY := 3</span>
<span class="line"></span></code></pre></div><blockquote><p>注意：这些变量仍然可以被修改，全大写只是提醒开发者&quot;不应修改&quot;。</p></blockquote><h2 id="内置变量-a-变量" tabindex="-1"><a class="header-anchor" href="#内置变量-a-变量"><span>内置变量（A_ 变量）</span></a></h2><p>AHK 提供了大量以 <code>A_</code> 开头的内置变量：</p><h3 id="系统信息" tabindex="-1"><a class="header-anchor" href="#系统信息"><span>系统信息</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">MsgBox &quot;AHK 版本: &quot; A_AhkVersion</span>
<span class="line">MsgBox &quot;AHK 路径: &quot; A_AhkPath</span>
<span class="line">MsgBox &quot;操作系统: &quot; A_OsVersion</span>
<span class="line">MsgBox &quot;64位系统: &quot; A_Is64bitOS</span>
<span class="line">MsgBox &quot;指针大小: &quot; A_PtrSize</span>
<span class="line">MsgBox &quot;管理员权限: &quot; A_IsAdmin</span>
<span class="line"></span></code></pre></div><h3 id="脚本信息" tabindex="-1"><a class="header-anchor" href="#脚本信息"><span>脚本信息</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">MsgBox &quot;脚本路径: &quot; A_ScriptFullPath</span>
<span class="line">MsgBox &quot;脚本目录: &quot; A_ScriptDir</span>
<span class="line">MsgBox &quot;脚本名称: &quot; A_ScriptName</span>
<span class="line">MsgBox &quot;工作目录: &quot; A_WorkingDir</span>
<span class="line"></span></code></pre></div><h3 id="时间" tabindex="-1"><a class="header-anchor" href="#时间"><span>时间</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">MsgBox &quot;当前时间: &quot; A_Now          ; YYYYMMDDHHMMSS</span>
<span class="line">MsgBox &quot;当前日期: &quot; A_YYYY &quot;-&quot; A_MM &quot;-&quot; A_DD</span>
<span class="line">MsgBox &quot;时区偏移: &quot; A_TimeZoneUTC  ; 分钟偏移</span>
<span class="line"></span></code></pre></div><h3 id="键盘-鼠标状态" tabindex="-1"><a class="header-anchor" href="#键盘-鼠标状态"><span>键盘/鼠标状态</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">MsgBox &quot;光标类型: &quot; A_Cursor       ; Arrow, IBeam, Wait 等</span>
<span class="line">MsgBox &quot;CapsLock: &quot; A_CapsLockState  ; On/Off</span>
<span class="line">MsgBox &quot;Shift: &quot; GetKeyState(&quot;Shift&quot;) ; 1/0</span>
<span class="line"></span></code></pre></div><h3 id="窗口信息" tabindex="-1"><a class="header-anchor" href="#窗口信息"><span>窗口信息</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">MsgBox &quot;活动窗口: &quot; A_ActiveWindowId  ; 当前活动窗口的 ID</span>
<span class="line">MsgBox &quot;窗口标题: &quot; WinGetTitle(&quot;A&quot;)  ; &quot;A&quot; 表示活动窗口</span>
<span class="line"></span></code></pre></div><h2 id="类型判断函数" tabindex="-1"><a class="header-anchor" href="#类型判断函数"><span>类型判断函数</span></a></h2><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line"></span>
<span class="line">v := &quot;42&quot;</span>
<span class="line"></span>
<span class="line">IsString(v)     ; true</span>
<span class="line">IsInteger(v)    ; false（它是字符串 &quot;42&quot;，不是数字 42）</span>
<span class="line">IsNumber(v)     ; false</span>
<span class="line">IsObject(v)     ; false</span>
<span class="line">IsFloat(v)      ; false</span>
<span class="line"></span>
<span class="line">; 但 &quot;42&quot; 可以被隐式转换为数字</span>
<span class="line">result := v + 8  ; 50（字符串 &quot;42&quot; 在运算时自动转换）</span>
<span class="line"></span>
<span class="line">v2 := 42</span>
<span class="line">IsInteger(v2)   ; true</span>
<span class="line">IsString(v2)    ; false</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>函数</th><th>判断类型</th></tr></thead><tbody><tr><td><code>IsString()</code></td><td>字符串</td></tr><tr><td><code>IsInteger()</code></td><td>整数</td></tr><tr><td><code>IsFloat()</code></td><td>浮点数</td></tr><tr><td><code>IsNumber()</code></td><td>数字（整数或浮点数）</td></tr><tr><td><code>IsObject()</code></td><td>对象（Array/Map/Object 等）</td></tr><tr><td><code>IsSet()</code></td><td>变量是否已赋值</td></tr><tr><td><code>Type()</code></td><td>返回类型名称字符串</td></tr></tbody></table><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; Type() 返回类型名称</span>
<span class="line">MsgBox Type(&quot;hello&quot;)    ; &quot;String&quot;</span>
<span class="line">MsgBox Type(42)         ; &quot;Integer&quot;</span>
<span class="line">MsgBox Type(3.14)       ; &quot;Float&quot;</span>
<span class="line">MsgBox Type(true)       ; &quot;Integer&quot;（注意！true 在 AHK 中是整数 1）</span>
<span class="line">MsgBox Type([])         ; &quot;Array&quot;</span>
<span class="line">MsgBox Type(Map())      ; &quot;Map&quot;</span>
<span class="line"></span></code></pre></div><blockquote><p><strong>注意</strong>：AHK 中 <code>true</code> 是整数 1，<code>false</code> 是整数 0。布尔值本质上是整数。</p></blockquote><hr>`,48),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/04-operators.html`},{default:r(()=>[...l[0]||=[e(`04-运算符`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};