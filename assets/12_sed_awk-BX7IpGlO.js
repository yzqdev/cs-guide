import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/linux-tutor/basic/12_sed_awk.html","title":"sed 与 awk 进阶","lang":"zh-CN","frontmatter":{"order":12,"description":"sed 与 awk 进阶 sed 和 awk 是 Linux 文本处理的两专家器。sed 擅长行编辑，awk 擅长列处理。 sed — 流编辑器 sed 逐行处理文本，主要用于替换、删除、插入操作。 替换 删除 打印与行号 插入与追加 综合示例 awk — 数据流处理 awk 将文本视为由行和列组成的表格数据。 基本结构 打印列 特殊变量 设置分隔符 ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"sed 与 awk 进阶\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T12:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/basic/12_sed_awk.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"sed 与 awk 进阶"}],["meta",{"property":"og:description","content":"sed 与 awk 进阶 sed 和 awk 是 Linux 文本处理的两专家器。sed 擅长行编辑，awk 擅长列处理。 sed — 流编辑器 sed 逐行处理文本，主要用于替换、删除、插入操作。 替换 删除 打印与行号 插入与追加 综合示例 awk — 数据流处理 awk 将文本视为由行和列组成的表格数据。 基本结构 打印列 特殊变量 设置分隔符 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T12:37:10.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T12:37:10.000Z"}]]},"git":{"createdTime":1784119030000,"updatedTime":1784119030000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.44,"words":1032},"filePathRelative":"linux-tutor/basic/12_sed_awk.md","autoDesc":true}`),a={name:`12_sed_awk.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="sed-与-awk-进阶" tabindex="-1"><a class="header-anchor" href="#sed-与-awk-进阶"><span>sed 与 awk 进阶</span></a></h1><p><code>sed</code> 和 <code>awk</code> 是 Linux 文本处理的两专家器。<code>sed</code> 擅长行编辑，<code>awk</code> 擅长列处理。</p><h2 id="sed-—-流编辑器" tabindex="-1"><a class="header-anchor" href="#sed-—-流编辑器"><span>sed — 流编辑器</span></a></h2><p><code>sed</code> 逐行处理文本，主要用于替换、删除、插入操作。</p><h3 id="替换" tabindex="-1"><a class="header-anchor" href="#替换"><span>替换</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 基本替换（每行第一个匹配）</span></span>
<span class="line"><span class="token function">sed</span> <span class="token string">&#39;s/foo/bar/&#39;</span> file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 全局替换</span></span>
<span class="line"><span class="token function">sed</span> <span class="token string">&#39;s/foo/bar/g&#39;</span> file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 只替换第 2 行</span></span>
<span class="line"><span class="token function">sed</span> <span class="token string">&#39;2s/foo/bar/&#39;</span> file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 替换第 2 到第 5 行</span></span>
<span class="line"><span class="token function">sed</span> <span class="token string">&#39;2,5s/foo/bar/g&#39;</span> file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 原地修改（直接改文件）</span></span>
<span class="line"><span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/foo/bar/g&#39;</span> file.txt</span>
<span class="line"><span class="token function">sed</span> <span class="token parameter variable">-i.bak</span> <span class="token string">&#39;s/foo/bar/g&#39;</span> file.txt  <span class="token comment"># 备份原文件</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用正则</span></span>
<span class="line"><span class="token function">sed</span> <span class="token string">&#39;s/[0-9]\\+/NUM/g&#39;</span> file.txt     <span class="token comment"># 将所有数字替换为 NUM</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除" tabindex="-1"><a class="header-anchor" href="#删除"><span>删除</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">sed</span> <span class="token string">&#39;/^$/d&#39;</span> file.txt            <span class="token comment"># 删除空行</span></span>
<span class="line"><span class="token function">sed</span> <span class="token string">&#39;/debug/d&#39;</span> file.txt         <span class="token comment"># 删除包含 debug 的行</span></span>
<span class="line"><span class="token function">sed</span> <span class="token string">&#39;2d&#39;</span> file.txt               <span class="token comment"># 删除第 2 行</span></span>
<span class="line"><span class="token function">sed</span> <span class="token string">&#39;2,5d&#39;</span> file.txt             <span class="token comment"># 删除 2-5 行</span></span>
<span class="line"><span class="token function">sed</span> <span class="token string">&#39;5,$d&#39;</span> file.txt             <span class="token comment"># 删除第 5 行到末尾</span></span>
<span class="line"><span class="token function">sed</span> <span class="token string">&#39;/^#/d&#39;</span> config.conf         <span class="token comment"># 删除注释行</span></span>
<span class="line"></span></code></pre></div><h3 id="打印与行号" tabindex="-1"><a class="header-anchor" href="#打印与行号"><span>打印与行号</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">sed</span> <span class="token parameter variable">-n</span> <span class="token string">&#39;5p&#39;</span> file.txt            <span class="token comment"># 只打印第 5 行</span></span>
<span class="line"><span class="token function">sed</span> <span class="token parameter variable">-n</span> <span class="token string">&#39;10,20p&#39;</span> file.txt        <span class="token comment"># 打印 10-20 行</span></span>
<span class="line"><span class="token function">sed</span> <span class="token parameter variable">-n</span> <span class="token string">&#39;/error/p&#39;</span> file.txt      <span class="token comment"># 打印包含 error 的行</span></span>
<span class="line"><span class="token function">sed</span> <span class="token parameter variable">-n</span> <span class="token string">&#39;/error/=&#39;</span> file.txt      <span class="token comment"># 打印匹配行的行号</span></span>
<span class="line"></span></code></pre></div><h3 id="插入与追加" tabindex="-1"><a class="header-anchor" href="#插入与追加"><span>插入与追加</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">sed</span> <span class="token string">&#39;2i\\插入的新行&#39;</span> file.txt    <span class="token comment"># 在第 2 行前插入</span></span>
<span class="line"><span class="token function">sed</span> <span class="token string">&#39;2a\\追加的新行&#39;</span> file.txt    <span class="token comment"># 在第 2 行后追加</span></span>
<span class="line"><span class="token function">sed</span> <span class="token string">&#39;$a\\文件末尾追加&#39;</span> file.txt  <span class="token comment"># 在文件末尾追加</span></span>
<span class="line"></span></code></pre></div><h3 id="综合示例" tabindex="-1"><a class="header-anchor" href="#综合示例"><span>综合示例</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 替换配置文件中某个值</span></span>
<span class="line"><span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/^#Port 22/Port 2222/&#39;</span> /etc/ssh/sshd_config</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 提取日志中的时间戳</span></span>
<span class="line"><span class="token function">sed</span> <span class="token parameter variable">-n</span> <span class="token string">&#39;s/.*\\[\\(.*\\)\\].*/\\1/p&#39;</span> app.log</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除 HTML 标签</span></span>
<span class="line"><span class="token function">sed</span> <span class="token string">&#39;s/&lt;[^&gt;]*&gt;//g&#39;</span> index.html</span>
<span class="line"></span></code></pre></div><h2 id="awk-—-数据流处理" tabindex="-1"><a class="header-anchor" href="#awk-—-数据流处理"><span>awk — 数据流处理</span></a></h2><p><code>awk</code> 将文本视为由行和列组成的表格数据。</p><h3 id="基本结构" tabindex="-1"><a class="header-anchor" href="#基本结构"><span>基本结构</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">awk</span> <span class="token string">&#39;BEGIN { 初始化 } { 每行处理 } END { 收尾 }&#39;</span> <span class="token function">file</span></span>
<span class="line"></span></code></pre></div><h3 id="打印列" tabindex="-1"><a class="header-anchor" href="#打印列"><span>打印列</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 打印第 1 列和第 3 列</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{print $1, $3}&#39;</span> file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 打印最后一列</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{print $NF}&#39;</span> file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 打印倒数第 2 列</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{print $(NF-1)}&#39;</span> file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 打印行号和内容</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{print NR&quot;: &quot;$0}&#39;</span> file.txt</span>
<span class="line"></span></code></pre></div><h3 id="特殊变量" tabindex="-1"><a class="header-anchor" href="#特殊变量"><span>特殊变量</span></a></h3><table><thead><tr><th>变量</th><th>含义</th></tr></thead><tbody><tr><td><code>$0</code></td><td>当前整行</td></tr><tr><td><code>$1</code>, <code>$2</code>...</td><td>第 N 列</td></tr><tr><td><code>NF</code></td><td>当前行的列数</td></tr><tr><td><code>NR</code></td><td>当前行号</td></tr><tr><td><code>FS</code></td><td>字段分隔符（默认空格）</td></tr><tr><td><code>OFS</code></td><td>输出字段分隔符</td></tr></tbody></table><h3 id="设置分隔符" tabindex="-1"><a class="header-anchor" href="#设置分隔符"><span>设置分隔符</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 以 : 分隔，打印用户名和 shell</span></span>
<span class="line"><span class="token function">awk</span> -F: <span class="token string">&#39;{print $1, $7}&#39;</span> /etc/passwd</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 复杂分隔符</span></span>
<span class="line"><span class="token function">awk</span> -F<span class="token string">&#39;[:/]&#39;</span> <span class="token string">&#39;{print $1, $3}&#39;</span> file.txt</span>
<span class="line"></span></code></pre></div><h3 id="条件过滤" tabindex="-1"><a class="header-anchor" href="#条件过滤"><span>条件过滤</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 行号过滤</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;NR &gt; 5 &amp;&amp; NR &lt; 10 {print}&#39;</span> file.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 数值过滤</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;$3 &gt; 100 {print $1, $3}&#39;</span> data.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 字符串匹配</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;/error/ {print}&#39;</span> app.log</span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;$1 ~ /^192\\.168/ {print}&#39;</span> access.log   <span class="token comment"># 匹配 IP 段</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;$1 !~ /127\\.0\\.0\\.1/&#39;</span> access.log        <span class="token comment"># 排除本机</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 字段值匹配</span></span>
<span class="line"><span class="token function">awk</span> -F: <span class="token string">&#39;$3 &gt;= 1000 {print $1}&#39;</span> /etc/passwd  <span class="token comment"># 普通用户(UID &gt;= 1000)</span></span>
<span class="line"></span></code></pre></div><h3 id="内置函数" tabindex="-1"><a class="header-anchor" href="#内置函数"><span>内置函数</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 字符串函数</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{print length($0), toupper($1)}&#39;</span> file.txt</span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{print substr($2, 1, 5)}&#39;</span> file.txt      <span class="token comment"># 子串</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 数值函数</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{sum += $1} END {print &quot;总和:&quot;, sum}&#39;</span> numbers.txt</span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{sum += $1; count++} END {print &quot;平均:&quot;, sum/count}&#39;</span> numbers.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># printf 格式化</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{printf &quot;%-20s %8.2f\\n&quot;, $1, $2}&#39;</span> data.txt</span>
<span class="line"></span></code></pre></div><h3 id="关联数组" tabindex="-1"><a class="header-anchor" href="#关联数组"><span>关联数组</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 统计 IP 访问次数</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{count[$1]++} END {for (ip in count) print ip, count[ip]}&#39;</span> access.log</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 按第二列分组求和</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{sum[$2] += $3} END {for (k in sum) print k, sum[k]}&#39;</span> sales.txt</span>
<span class="line"></span></code></pre></div><h2 id="实战-日志分析" tabindex="-1"><a class="header-anchor" href="#实战-日志分析"><span>实战：日志分析</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 分析 Nginx 日志 — 统计每个 IP 的访问次数</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{count[$1]++} END {for (ip in count) print count[ip], ip}&#39;</span> access.log <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-rn</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-10</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 统计每个 URL 的总传输字节</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{bytes[$7] += $10} END {for (url in bytes) print bytes[url], url}&#39;</span> access.log <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-rn</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-10</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 找出 500 错误的请求</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;$9 ~ /^5/ {print $1, $7, $9}&#39;</span> access.log</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 按小时统计请求量</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{print substr($4, 2, 13)}&#39;</span> access.log <span class="token operator">|</span> <span class="token function">cut</span> -d: <span class="token parameter variable">-f1</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span></span>
<span class="line"></span></code></pre></div><h3 id="文件合并" tabindex="-1"><a class="header-anchor" href="#文件合并"><span>文件合并</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># paste 按列拼接</span></span>
<span class="line"><span class="token function">paste</span> file1 file2</span>
<span class="line"><span class="token function">paste</span> -d<span class="token string">&#39;,&#39;</span> file1 file2           <span class="token comment"># 指定分隔符</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># join 按关键字合并（需排序）</span></span>
<span class="line"><span class="token function">sort</span> file1 <span class="token operator">&gt;</span> f1.sorted</span>
<span class="line"><span class="token function">sort</span> file2 <span class="token operator">&gt;</span> f2.sorted</span>
<span class="line"><span class="token function">join</span> -t<span class="token string">&#39;,&#39;</span> <span class="token parameter variable">-1</span> <span class="token number">1</span> <span class="token parameter variable">-2</span> <span class="token number">1</span> f1.sorted f2.sorted</span>
<span class="line"></span></code></pre></div><h2 id="本章小结" tabindex="-1"><a class="header-anchor" href="#本章小结"><span>本章小结</span></a></h2><table><thead><tr><th>工具</th><th>哲学</th><th>适用场景</th></tr></thead><tbody><tr><td><code>sed</code></td><td>行编辑</td><td>替换、删除、插入文本</td></tr><tr><td><code>awk</code></td><td>列处理</td><td>数据分析、报表、格式化输出</td></tr><tr><td><code>paste</code></td><td>列拼接</td><td>合并文件</td></tr><tr><td><code>join</code></td><td>行合并</td><td>关联两个文件</td></tr></tbody></table><p><strong>选择原则</strong>：</p><ul><li>简单替换 → <code>sed</code></li><li>需要计算/分组/统计 → <code>awk</code></li><li>复杂逻辑 → 用 Python/Perl 替代</li></ul><h2 id="练习" tabindex="-1"><a class="header-anchor" href="#练习"><span>练习</span></a></h2><ol><li>用 <code>sed</code> 将 <code>date</code> 命令输出的月份替换为大写</li><li>用 <code>sed</code> 删除 <code>/etc/ssh/sshd_config</code> 中的注释行和空行</li><li>用 <code>awk</code> 统计系统中各 shell（<code>/etc/passwd</code> 最后一列）的使用人数</li><li>用 <code>awk</code> 分析 <code>/var/log/syslog</code>，统计每种日志级别的出现次数</li><li>用 <code>paste</code> 和 <code>awk</code> 合并两个 CSV 文件</li></ol>`,40)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};