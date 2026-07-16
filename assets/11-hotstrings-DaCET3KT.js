import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./app-B1jqjtqq.js";var l=JSON.parse(`{"path":"/windows-tutor/autohotkey-tutor/basic/11-hotstrings.html","title":"11 - 热字符串","lang":"zh-CN","frontmatter":{"order":11,"description":"11 - 热字符串 热字符串基础 热字符串（Hotstrings）是输入特定文字后自动触发替换或动作的功能： 热字符串格式 触发文本 必须是字母、数字或符号组成的序列 触发条件：输入触发文本后按结束字符（空格、回车、Tab、标点等） 结束字符表 热字符串选项 选项写在第一个冒号后面，控制触发行为： 常用选项 组合选项 热字符串执行代码 当替换内容不止简...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"11 - 热字符串\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/autohotkey-tutor/basic/11-hotstrings.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"11 - 热字符串"}],["meta",{"property":"og:description","content":"11 - 热字符串 热字符串基础 热字符串（Hotstrings）是输入特定文字后自动触发替换或动作的功能： 热字符串格式 触发文本 必须是字母、数字或符号组成的序列 触发条件：输入触发文本后按结束字符（空格、回车、Tab、标点等） 结束字符表 热字符串选项 选项写在第一个冒号后面，控制触发行为： 常用选项 组合选项 热字符串执行代码 当替换内容不止简..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1784179755000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.98,"words":1194},"filePathRelative":"windows-tutor/autohotkey-tutor/basic/11-hotstrings.md","autoDesc":true}`),u={name:`11-hotstrings.md`};function d(c,l,u,d,f,p){let m=t(`RouteLink`);return s(),o(`div`,null,[l[3]||=n(`<h1 id="_11-热字符串" tabindex="-1"><a class="header-anchor" href="#_11-热字符串"><span>11 - 热字符串</span></a></h1><h2 id="热字符串基础" tabindex="-1"><a class="header-anchor" href="#热字符串基础"><span>热字符串基础</span></a></h2><p>热字符串（Hotstrings）是输入特定文字后自动触发替换或动作的功能：</p><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">#Requires AutoHotkey v2.0</span>
<span class="line">#SingleInstance Force</span>
<span class="line"></span>
<span class="line">; 自动替换 — 输入 btw 后按空格/回车等触发，自动替换为 by the way</span>
<span class="line">:btw::by the way</span>
<span class="line"></span>
<span class="line">; 自动展开邮箱</span>
<span class="line">:em::myemail@example.com</span>
<span class="line"></span>
<span class="line">; 自动展开日期</span>
<span class="line">:ds::</span>
<span class="line">{</span>
<span class="line">    Send A_YYYY &quot;/&quot; A_MM &quot;/&quot; A_DD</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><h2 id="热字符串格式" tabindex="-1"><a class="header-anchor" href="#热字符串格式"><span>热字符串格式</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">:选项:触发文本::替换文本</span>
<span class="line"></span></code></pre></div><h3 id="触发文本" tabindex="-1"><a class="header-anchor" href="#触发文本"><span>触发文本</span></a></h3><ul><li>必须是字母、数字或符号组成的序列</li><li>触发条件：输入触发文本后按<strong>结束字符</strong>（空格、回车、Tab、标点等）</li></ul><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 输入 &quot;btw&quot; 然后按空格 → 自动变为 &quot;by the way&quot;</span>
<span class="line">:btw::by the way</span>
<span class="line"></span>
<span class="line">; 输入 &quot;btw&quot; 然后按回车 → 同样触发</span>
<span class="line">; 输入 &quot;btw&quot; 然后按逗号 → 同样触发</span>
<span class="line"></span></code></pre></div><h3 id="结束字符表" tabindex="-1"><a class="header-anchor" href="#结束字符表"><span>结束字符表</span></a></h3><table><thead><tr><th>字符</th><th>说明</th></tr></thead><tbody><tr><td>空格</td><td>最常见触发字符</td></tr><tr><td><code>Enter</code></td><td>回车</td></tr><tr><td><code>Tab</code></td><td>Tab键</td></tr><tr><td><code>, . ? ! : ;</code></td><td>标点</td></tr><tr><td><code>(</code> <code>)</code></td><td>括号</td></tr><tr><td><code>/ \\</code></td><td>斜杠</td></tr><tr><td><code>-</code></td><td>连字符</td></tr></tbody></table><h2 id="热字符串选项" tabindex="-1"><a class="header-anchor" href="#热字符串选项"><span>热字符串选项</span></a></h2><p>选项写在第一个冒号后面，控制触发行为：</p><h3 id="常用选项" tabindex="-1"><a class="header-anchor" href="#常用选项"><span>常用选项</span></a></h3><table><thead><tr><th>选项</th><th>含义</th><th>说明</th></tr></thead><tbody><tr><td><code>*</code></td><td>无需结束字符</td><td>输入完立即触发，不用按空格等</td></tr><tr><td><code>B</code></td><td>自动退格</td><td>删除触发文本后再插入替换文本</td></tr><tr><td><code>C</code></td><td>区分大小写</td><td>触发文本必须精确匹配大小写</td></tr><tr><td><code>C1</code></td><td>不区分大小写</td><td>明确声明不区分（默认行为）</td></tr><tr><td><code>K</code></td><td>不退格</td><td>不删除触发文本，直接追加替换文本</td></tr><tr><td><code>O</code></td><td>不发送替换</td><td>触发但只执行代码，不发送文字</td></tr><tr><td><code>R</code></td><td>发送原始文本</td><td>不解释 <code>{Enter}</code> 等特殊键名</td></tr><tr><td><code>S</code></td><td>不触发其他热字符串</td><td>防止替换文本再次触发热字符串</td></tr><tr><td><code>Z</code></td><td>重置</td><td>匹配失败后重置匹配状态</td></tr></tbody></table><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; * 选项 — 无需结束字符，输入完立刻触发</span>
<span class="line">:*:jk::just kidding        ; 输入jk立即替换</span>
<span class="line"></span>
<span class="line">; B 选项 — 自动退格（默认行为）</span>
<span class="line">::btw::by the way          ; 先删除btw，再输入by the way</span>
<span class="line"></span>
<span class="line">; K 选项 — 不退格，追加</span>
<span class="line">:K:ahk::AutoHotkey         ; 输入ahk空格 → ahkAutoHotkey</span>
<span class="line"></span>
<span class="line">; C 选项 — 区分大小写</span>
<span class="line">:C:BTW::by the way         ; 只匹配大写BTW，btw不触发</span>
<span class="line"></span>
<span class="line">; O 选项 — 只执行代码，不发送文字</span>
<span class="line">:O:log::</span>
<span class="line">{</span>
<span class="line">    MsgBox &quot;log 被触发&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; * + O — 立即触发 + 只执行代码</span>
<span class="line">:*O:exit::ExitApp           ; 输入exit立即退出</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="组合选项" tabindex="-1"><a class="header-anchor" href="#组合选项"><span>组合选项</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; *C — 无需结束字符 + 区分大小写</span>
<span class="line">:*C:JK::Just Kidding</span>
<span class="line"></span>
<span class="line">; *B0 — 无需结束字符 + 不退格（追加模式）</span>
<span class="line">:*B0:sign::→signature      ; 输入sign后追加→signature</span>
<span class="line"></span>
<span class="line">; C1 — 明确不区分大小写</span>
<span class="line">:C1:btw::by the way        ; 和默认行为相同</span>
<span class="line"></span></code></pre></div><h2 id="热字符串执行代码" tabindex="-1"><a class="header-anchor" href="#热字符串执行代码"><span>热字符串执行代码</span></a></h2><p>当替换内容不止简单文字时，用花括号写代码块：</p><div class="language-ahk line-numbers-mode" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 发送当前时间</span>
<span class="line">:ts::</span>
<span class="line">{</span>
<span class="line">    Send A_Hour &quot;:&quot; A_Min &quot;:&quot; A_Sec</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 发送多行文本</span>
<span class="line">:addr::</span>
<span class="line">{</span>
<span class="line">    Send &quot;123 Main Street{Enter}Springfield, IL 62704&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 执行复杂操作</span>
<span class="line">:calc::</span>
<span class="line">{</span>
<span class="line">    WinActivate &quot;计算器&quot;</span>
<span class="line">    if !WinExist(&quot;计算器&quot;)</span>
<span class="line">        Run &quot;calc.exe&quot;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>代码块的热字符串默认带 <code>B</code>（退格），会先删除触发文本。</p></blockquote><h2 id="热字符串上下文" tabindex="-1"><a class="header-anchor" href="#热字符串上下文"><span>热字符串上下文</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; #HotIf — 限制热字符串只在特定窗口生效</span>
<span class="line">#HotIf WinActive(&quot;ahk_exe notepad.exe&quot;)</span>
<span class="line">:np::Notepad Hotstring     ; 只在记事本中生效</span>
<span class="line"></span>
<span class="line">#HotIf WinActive(&quot;ahk_exe chrome.exe&quot;)</span>
<span class="line">:em::myemail@example.com   ; 只在浏览器中生效</span>
<span class="line"></span>
<span class="line">#HotIf                      ; 恢复全局</span>
<span class="line">:btw::by the way</span>
<span class="line"></span></code></pre></div><h2 id="热字符串的自动文本功能" tabindex="-1"><a class="header-anchor" href="#热字符串的自动文本功能"><span>热字符串的自动文本功能</span></a></h2><h3 id="快速输入常用短语" tabindex="-1"><a class="header-anchor" href="#快速输入常用短语"><span>快速输入常用短语</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">::brb::be right back</span>
<span class="line">::omg::oh my god</span>
<span class="line">::imo::in my opinion</span>
<span class="line">::ttyl::talk to you later</span>
<span class="line">::fyi::for your information</span>
<span class="line">::afaik::as far as I know</span>
<span class="line">::iirc::if I recall correctly</span>
<span class="line"></span></code></pre></div><h3 id="快速输入符号" tabindex="-1"><a class="header-anchor" href="#快速输入符号"><span>快速输入符号</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">::-&gt;::→</span>
<span class="line">::&lt;-::←</span>
<span class="line">::&gt;=::≥</span>
<span class="line">::&lt;=::≤</span>
<span class="line">::!=::≠</span>
<span class="line">::(::【</span>
<span class="line">::)::】</span>
<span class="line"></span></code></pre></div><h3 id="快速输入代码片段" tabindex="-1"><a class="header-anchor" href="#快速输入代码片段"><span>快速输入代码片段</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 快速输入 HTML 标签</span>
<span class="line">::&lt;b::&lt;b&gt;{Enter}&lt;/b&gt;{Up}{End}</span>
<span class="line"></span>
<span class="line">; 快速输入 AHK 函数定义</span>
<span class="line">::fn::</span>
<span class="line">{</span>
<span class="line">    Send &quot;MyFunc(param) {{\`n    \`n}}&quot;</span>
<span class="line">    Send &quot;{Up}{End}&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">; 快速输入注释</span>
<span class="line">::cc::// TODO: comment here</span>
<span class="line"></span></code></pre></div><h2 id="hotstring-函数动态管理" tabindex="-1"><a class="header-anchor" href="#hotstring-函数动态管理"><span>Hotstring 函数动态管理</span></a></h2><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 动态创建热字符串</span>
<span class="line">Hotstring(&quot;:*:jk&quot;, &quot;just kidding&quot;)    ; 创建</span>
<span class="line">Hotstring(&quot;:*:jk&quot;, &quot;Off&quot;)             ; 禁用</span>
<span class="line">Hotstring(&quot;:*:jk&quot;, &quot;On&quot;)              ; 启用</span>
<span class="line">Hotstring(&quot;:*:jk&quot;)                    ; 删除</span>
<span class="line"></span>
<span class="line">; 批量管理</span>
<span class="line">Hotstring(&quot;Reset&quot;)                    ; 重置所有热字符串状态</span>
<span class="line"></span></code></pre></div><h2 id="热字符串注意事项" tabindex="-1"><a class="header-anchor" href="#热字符串注意事项"><span>热字符串注意事项</span></a></h2><h3 id="触发文本不要太短" tabindex="-1"><a class="header-anchor" href="#触发文本不要太短"><span>触发文本不要太短</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 不推荐：单个字母可能导致意外触发</span>
<span class="line">::a::apple              ; 输入任何包含a的单词都会匹配前缀</span>
<span class="line"></span>
<span class="line">; 推荐：至少3个字符</span>
<span class="line">::apl::apple             ; 不会意外触发</span>
<span class="line"></span>
<span class="line">; * 选项更要小心</span>
<span class="line">:*:j::just              ; 每次输入j就触发，非常危险</span>
<span class="line">:*:jk::just kidding     ; 至少2个字符</span>
<span class="line"></span></code></pre></div><h3 id="避免循环触发" tabindex="-1"><a class="header-anchor" href="#避免循环触发"><span>避免循环触发</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 如果替换文本包含触发文本，可能无限循环</span>
<span class="line">::btw::btw, I mean...   ; 替换后的btw会再次触发！</span>
<span class="line"></span>
<span class="line">; 使用 S 选项防止</span>
<span class="line">:S:btw::by the way       ; 替换文本不会再次触发热字符串</span>
<span class="line"></span></code></pre></div><h3 id="热字符串与-send-模式" tabindex="-1"><a class="header-anchor" href="#热字符串与-send-模式"><span>热字符串与 Send 模式</span></a></h3><div class="language-ahk" data-highlighter="prismjs" data-ext="ahk"><pre><code class="language-ahk"><span class="line">; 热字符串默认使用 SendInput 模式</span>
<span class="line">; 如果需要改变发送模式</span>
<span class="line">SetSendLevel 1            ; 提高发送级别</span>
<span class="line">::btw::by the way</span>
<span class="line"></span>
<span class="line">; R 选项 — 发送原始文本，不解释特殊键</span>
<span class="line">:R:keys::{Enter}{Tab}     ; 发送字面文字 &quot;{Enter}{Tab}&quot; 而不是按回车和Tab</span>
<span class="line"></span></code></pre></div><hr>`,41),i(`p`,null,[l[1]||=i(`strong`,null,`下一步`,-1),l[2]||=e(`: `,-1),a(m,{to:`/windows-tutor/autohotkey-tutor/basic/12-windows.html`},{default:r(()=>[...l[0]||=[e(`12-窗口操作`,-1)]]),_:1})])])}var f=c(u,[[`render`,d]]);export{l as _pageData,f as default};