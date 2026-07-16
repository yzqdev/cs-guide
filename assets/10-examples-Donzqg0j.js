import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/linux-tutor/awesome-shell/10-examples.html","title":"综合实战案例","lang":"zh-CN","frontmatter":{"description":"综合实战案例 案例 1：系统信息收集脚本 案例 2：日志分析脚本 案例 3：数据库自动备份脚本 案例 4：服务器健康检查脚本 案例 5：文件批量处理脚本 案例 6：自动部署脚本 案例 7：网络监控脚本 案例 8：交互式菜单脚本 快速参考卡片 常用命令速查 管道组合技巧 本教程到此结束，Happy Shell Scripting! 🚀","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"综合实战案例\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T12:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/awesome-shell/10-examples.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"综合实战案例"}],["meta",{"property":"og:description","content":"综合实战案例 案例 1：系统信息收集脚本 案例 2：日志分析脚本 案例 3：数据库自动备份脚本 案例 4：服务器健康检查脚本 案例 5：文件批量处理脚本 案例 6：自动部署脚本 案例 7：网络监控脚本 案例 8：交互式菜单脚本 快速参考卡片 常用命令速查 管道组合技巧 本教程到此结束，Happy Shell Scripting! 🚀"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T12:37:10.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T12:37:10.000Z"}]]},"git":{"createdTime":1784119030000,"updatedTime":1784119030000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":11.63,"words":3489},"filePathRelative":"linux-tutor/awesome-shell/10-examples.md","autoDesc":true}`),a={name:`10-examples.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="综合实战案例" tabindex="-1"><a class="header-anchor" href="#综合实战案例"><span>综合实战案例</span></a></h1><h2 id="案例-1-系统信息收集脚本" tabindex="-1"><a class="header-anchor" href="#案例-1-系统信息收集脚本"><span>案例 1：系统信息收集脚本</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># 系统信息收集脚本</span></span>
<span class="line"><span class="token comment"># 收集系统基本信息并输出到文件</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">set</span> <span class="token parameter variable">-euo</span> pipefail</span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">output_file</span><span class="token operator">=</span><span class="token string">&quot;system_info_<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y%m%d_%H%M%S<span class="token variable">)</span></span>.txt&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;=========================================&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot; 系统信息报告&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot; 生成时间: <span class="token variable"><span class="token variable">$(</span><span class="token function">date</span><span class="token variable">)</span></span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;=========================================&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 系统基本信息 ---&quot;</span></span>
<span class="line">    <span class="token function">uname</span> <span class="token parameter variable">-a</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;--- CPU 信息 ---&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;核心数: <span class="token variable"><span class="token variable">$(</span>nproc<span class="token variable">)</span></span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;型号: <span class="token variable"><span class="token variable">$(</span>lscpu <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;Model name&#39;</span> <span class="token operator">|</span> <span class="token function">cut</span> -d: <span class="token parameter variable">-f2</span> <span class="token operator">|</span> <span class="token function">xargs</span><span class="token variable">)</span></span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 内存信息 ---&quot;</span></span>
<span class="line">    <span class="token function">free</span> <span class="token parameter variable">-h</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 磁盘使用 ---&quot;</span></span>
<span class="line">    <span class="token function">df</span> <span class="token parameter variable">-h</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> tmpfs <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> loop</span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 网络接口 ---&quot;</span></span>
<span class="line">    <span class="token function">ip</span> addr show <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&quot;^[0-9]|inet &quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token string">&quot;127.0.0.1&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 运行时间 ---&quot;</span></span>
<span class="line">    <span class="token function">uptime</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 当前登录用户 ---&quot;</span></span>
<span class="line">    <span class="token function">who</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 最近 10 条日志 ---&quot;</span></span>
<span class="line">    journalctl <span class="token parameter variable">-n</span> <span class="token number">10</span> --no-pager <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;journalctl 不可用&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 监听端口 ---&quot;</span></span>
<span class="line">    ss <span class="token parameter variable">-tlnp</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">||</span> <span class="token function">netstat</span> <span class="token parameter variable">-tlnp</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;无法获取&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span> <span class="token operator">&gt;</span> <span class="token string">&quot;<span class="token variable">$output_file</span>&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;系统信息已保存到: <span class="token variable">$output_file</span>&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="案例-2-日志分析脚本" tabindex="-1"><a class="header-anchor" href="#案例-2-日志分析脚本"><span>案例 2：日志分析脚本</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># Nginx 访问日志分析脚本</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">set</span> <span class="token parameter variable">-euo</span> pipefail</span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">logfile</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${1<span class="token operator">:-</span><span class="token operator">/</span>var<span class="token operator">/</span>log<span class="token operator">/</span>nginx<span class="token operator">/</span>access.log}</span>&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;<span class="token variable">$logfile</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;错误: 日志文件 <span class="token variable">$logfile</span> 不存在&quot;</span></span>
<span class="line">    <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;=========================================&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot; Nginx 访问日志分析报告&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot; 日志文件: <span class="token variable">$logfile</span>&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;=========================================&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 1. 总访问量</span></span>
<span class="line"><span class="token assign-left variable">total_requests</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">wc</span> <span class="token parameter variable">-l</span> <span class="token operator">&lt;</span> <span class="token string">&quot;<span class="token variable">$logfile</span>&quot;</span><span class="token variable">)</span></span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;总访问次数: <span class="token variable">$total_requests</span>&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 独立 IP 数量</span></span>
<span class="line"><span class="token assign-left variable">unique_ips</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">awk</span> <span class="token string">&#39;{print $1}&#39;</span> <span class="token string">&quot;<span class="token variable">$logfile</span>&quot;</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-u</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span><span class="token variable">)</span></span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;独立 IP 数量: <span class="token variable">$unique_ips</span>&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 访问最多的 10 个 IP</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 访问最多的 10 个 IP ---&quot;</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{print $1}&#39;</span> <span class="token string">&quot;<span class="token variable">$logfile</span>&quot;</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-rn</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-10</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 访问最多的 10 个页面</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 访问最多的 10 个页面 ---&quot;</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{print $7}&#39;</span> <span class="token string">&quot;<span class="token variable">$logfile</span>&quot;</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-rn</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-10</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. HTTP 状态码分布</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;--- HTTP 状态码分布 ---&quot;</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{print $9}&#39;</span> <span class="token string">&quot;<span class="token variable">$logfile</span>&quot;</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-rn</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 6. 404 错误最多的页面</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 404 错误最多的页面 ---&quot;</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;$9 == 404 {print $7}&#39;</span> <span class="token string">&quot;<span class="token variable">$logfile</span>&quot;</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-rn</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-10</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 7. 每小时请求分布</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 每小时请求分布 ---&quot;</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{print $4}&#39;</span> <span class="token string">&quot;<span class="token variable">$logfile</span>&quot;</span> <span class="token operator">|</span> <span class="token function">cut</span> -d: <span class="token parameter variable">-f2</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-n</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 8. 流量统计</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 总流量 ---&quot;</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{sum += $10} END {printf &quot;%.2f MB\\n&quot;, sum/1024/1024}&#39;</span> <span class="token string">&quot;<span class="token variable">$logfile</span>&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="案例-3-数据库自动备份脚本" tabindex="-1"><a class="header-anchor" href="#案例-3-数据库自动备份脚本"><span>案例 3：数据库自动备份脚本</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># MySQL 数据库自动备份脚本</span></span>
<span class="line"><span class="token comment"># 用法: ./backup_db.sh [数据库名]</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">set</span> <span class="token parameter variable">-euo</span> pipefail</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置</span></span>
<span class="line"><span class="token assign-left variable">DB_USER</span><span class="token operator">=</span><span class="token string">&quot;root&quot;</span></span>
<span class="line"><span class="token assign-left variable">DB_PASS</span><span class="token operator">=</span><span class="token string">&quot;your_password&quot;</span></span>
<span class="line"><span class="token assign-left variable">BACKUP_DIR</span><span class="token operator">=</span><span class="token string">&quot;/var/backup/mysql&quot;</span></span>
<span class="line"><span class="token assign-left variable">RETENTION_DAYS</span><span class="token operator">=</span><span class="token number">7</span></span>
<span class="line"><span class="token assign-left variable">DATE</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y%m%d_%H%M%S<span class="token variable">)</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 颜色</span></span>
<span class="line"><span class="token assign-left variable">RED</span><span class="token operator">=</span><span class="token string">&#39;\\033[0;31m&#39;</span></span>
<span class="line"><span class="token assign-left variable">GREEN</span><span class="token operator">=</span><span class="token string">&#39;\\033[0;32m&#39;</span></span>
<span class="line"><span class="token assign-left variable">NC</span><span class="token operator">=</span><span class="token string">&#39;\\033[0m&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 日志</span></span>
<span class="line"><span class="token function-name function">log_info</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${GREEN}</span>[INFO]<span class="token variable">\${NC}</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token string">&#39;+%H:%M:%S&#39;</span><span class="token variable">)</span></span> - <span class="token variable">$1</span>&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function-name function">log_error</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${RED}</span>[ERROR]<span class="token variable">\${NC}</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token string">&#39;+%H:%M:%S&#39;</span><span class="token variable">)</span></span> - <span class="token variable">$1</span>&quot;</span> <span class="token operator">&gt;</span><span class="token file-descriptor important">&amp;2</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查依赖</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token operator">!</span> <span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> mysqldump <span class="token operator">&amp;&gt;</span>/dev/null<span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    log_error <span class="token string">&quot;mysqldump 未安装&quot;</span></span>
<span class="line">    <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建备份目录</span></span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;<span class="token variable">$BACKUP_DIR</span>&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取要备份的数据库</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$#</span> <span class="token parameter variable">-ge</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token assign-left variable">databases</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$1</span>&quot;</span></span>
<span class="line"><span class="token keyword">else</span></span>
<span class="line">    <span class="token assign-left variable">databases</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>mysql -u<span class="token string">&quot;<span class="token variable">$DB_USER</span>&quot;</span> -p<span class="token string">&quot;<span class="token variable">$DB_PASS</span>&quot;</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;SHOW DATABASES;&quot;</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token punctuation">\\</span></span>
<span class="line">        <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-Ev</span> <span class="token string">&quot;Database|information_schema|performance_schema|mysql|sys&quot;</span><span class="token variable">)</span></span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 备份函数</span></span>
<span class="line"><span class="token function-name function">backup_db</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">db</span><span class="token operator">=</span><span class="token variable">$1</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">backup_file</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${BACKUP_DIR}</span>/<span class="token variable">\${db}</span>_<span class="token variable">\${DATE}</span>.sql.gz&quot;</span></span>
<span class="line"></span>
<span class="line">    log_info <span class="token string">&quot;开始备份数据库: <span class="token variable">$db</span>&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> mysqldump -u<span class="token string">&quot;<span class="token variable">$DB_USER</span>&quot;</span> -p<span class="token string">&quot;<span class="token variable">$DB_PASS</span>&quot;</span> <span class="token punctuation">\\</span></span>
<span class="line">        --single-transaction <span class="token punctuation">\\</span></span>
<span class="line">        <span class="token parameter variable">--routines</span> <span class="token punctuation">\\</span></span>
<span class="line">        <span class="token parameter variable">--triggers</span> <span class="token punctuation">\\</span></span>
<span class="line">        <span class="token parameter variable">--events</span> <span class="token punctuation">\\</span></span>
<span class="line">        <span class="token string">&quot;<span class="token variable">$db</span>&quot;</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">|</span> <span class="token function">gzip</span> <span class="token operator">&gt;</span> <span class="token string">&quot;<span class="token variable">$backup_file</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line"></span>
<span class="line">        <span class="token builtin class-name">local</span> <span class="token assign-left variable">size</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">du</span> <span class="token parameter variable">-h</span> <span class="token string">&quot;<span class="token variable">$backup_file</span>&quot;</span> <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-f1</span><span class="token variable">)</span></span></span>
<span class="line">        log_info <span class="token string">&quot;备份完成: <span class="token variable">$backup_file</span> (<span class="token variable">$size</span>)&quot;</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">        log_error <span class="token string">&quot;备份失败: <span class="token variable">$db</span>&quot;</span></span>
<span class="line">        <span class="token builtin class-name">return</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 主流程</span></span>
<span class="line">log_info <span class="token string">&quot;开始数据库备份任务&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">for</span> <span class="token for-or-select variable">db</span> <span class="token keyword">in</span> <span class="token variable">$databases</span><span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">    backup_db <span class="token string">&quot;<span class="token variable">$db</span>&quot;</span></span>
<span class="line"><span class="token keyword">done</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清理旧备份</span></span>
<span class="line">log_info <span class="token string">&quot;清理 <span class="token variable">\${RETENTION_DAYS}</span> 天前的备份&quot;</span></span>
<span class="line"><span class="token function">find</span> <span class="token string">&quot;<span class="token variable">$BACKUP_DIR</span>&quot;</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;*.sql.gz&quot;</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-mtime</span> +<span class="token variable">$RETENTION_DAYS</span> <span class="token parameter variable">-delete</span></span>
<span class="line"></span>
<span class="line">log_info <span class="token string">&quot;备份任务完成&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 输出备份统计</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;备份目录: <span class="token variable">$BACKUP_DIR</span>&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;总备份数: <span class="token variable"><span class="token variable">$(</span><span class="token function">find</span> <span class="token string">&quot;<span class="token variable">$BACKUP_DIR</span>&quot;</span> <span class="token parameter variable">-name</span> <span class="token string">&#39;*.sql.gz&#39;</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span><span class="token variable">)</span></span>&quot;</span></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;总大小: <span class="token variable"><span class="token variable">$(</span><span class="token function">du</span> <span class="token parameter variable">-sh</span> <span class="token string">&quot;<span class="token variable">$BACKUP_DIR</span>&quot;</span> <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-f1</span><span class="token variable">)</span></span>&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="案例-4-服务器健康检查脚本" tabindex="-1"><a class="header-anchor" href="#案例-4-服务器健康检查脚本"><span>案例 4：服务器健康检查脚本</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># 服务器健康检查脚本</span></span>
<span class="line"><span class="token comment"># 定期检查服务器运行状态，异常时发送告警</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">set</span> <span class="token parameter variable">-euo</span> pipefail</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置</span></span>
<span class="line"><span class="token assign-left variable">ALERT_EMAIL</span><span class="token operator">=</span><span class="token string">&quot;admin@example.com&quot;</span></span>
<span class="line"><span class="token assign-left variable">LOAD_THRESHOLD</span><span class="token operator">=</span><span class="token number">5.0</span></span>
<span class="line"><span class="token assign-left variable">DISK_THRESHOLD</span><span class="token operator">=</span><span class="token number">90</span></span>
<span class="line"><span class="token assign-left variable">MEM_THRESHOLD</span><span class="token operator">=</span><span class="token number">90</span></span>
<span class="line"><span class="token assign-left variable">CHECK_INTERVAL</span><span class="token operator">=</span><span class="token number">60</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查 CPU 负载</span></span>
<span class="line"><span class="token function-name function">check_load</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">load</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">uptime</span> <span class="token operator">|</span> <span class="token function">awk</span> -F<span class="token string">&#39;load average:&#39;</span> <span class="token string">&#39;{print $2}&#39;</span> <span class="token operator">|</span> <span class="token function">cut</span> -d, <span class="token parameter variable">-f1</span> <span class="token operator">|</span> <span class="token function">xargs</span><span class="token variable">)</span></span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">cores</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>nproc<span class="token variable">)</span></span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">per_cpu_load</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$load</span> / <span class="token variable">$cores</span>&quot;</span> <span class="token operator">|</span> <span class="token function">bc</span> <span class="token parameter variable">-l</span><span class="token variable">)</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;当前负载: <span class="token variable">$load</span> (共 <span class="token variable">$cores</span> 核, 每核负载: <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">printf</span> <span class="token string">&quot;%.2f&quot;</span> $per_cpu_load<span class="token variable">)</span></span>)&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token variable"><span class="token punctuation">((</span> $<span class="token punctuation">(</span>echo &quot;$per_cpu_load <span class="token operator">&gt;</span> $LOAD_THRESHOLD&quot; <span class="token operator">|</span> bc <span class="token operator">-</span>l<span class="token punctuation">)</span> <span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">        <span class="token builtin class-name">return</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line">    <span class="token builtin class-name">return</span> <span class="token number">0</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查磁盘使用率</span></span>
<span class="line"><span class="token function-name function">check_disk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">issues</span><span class="token operator">=</span><span class="token number">0</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;磁盘使用情况:&quot;</span></span>
<span class="line">    <span class="token function">df</span> <span class="token parameter variable">-h</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> tmpfs <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> loop <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> line<span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">        <span class="token builtin class-name">local</span> <span class="token assign-left variable">usage</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$line</span>&quot;</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $5}&#39;</span> <span class="token operator">|</span> <span class="token function">tr</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;%&#39;</span><span class="token variable">)</span></span></span>
<span class="line">        <span class="token builtin class-name">local</span> <span class="token assign-left variable">mount</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$line</span>&quot;</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $6}&#39;</span><span class="token variable">)</span></span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$usage</span>&quot;</span> <span class="token parameter variable">-ge</span> <span class="token string">&quot;<span class="token variable">$DISK_THRESHOLD</span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null<span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;  ⚠️  <span class="token variable">$mount</span> 使用率: <span class="token variable">\${usage}</span>% (超过阈值 <span class="token variable">\${DISK_THRESHOLD}</span>%)&quot;</span></span>
<span class="line">            <span class="token assign-left variable">issues</span><span class="token operator">=</span><span class="token number">1</span></span>
<span class="line">        <span class="token keyword">else</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;  ✅ <span class="token variable">$mount</span> 使用率: <span class="token variable">\${usage}</span>%&quot;</span></span>
<span class="line">        <span class="token keyword">fi</span></span>
<span class="line">    <span class="token keyword">done</span></span>
<span class="line">    <span class="token builtin class-name">return</span> <span class="token variable">$issues</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查内存使用率</span></span>
<span class="line"><span class="token function-name function">check_memory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">total</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">free</span> <span class="token parameter variable">-m</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;/Mem:/ {print $2}&#39;</span><span class="token variable">)</span></span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">used</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">free</span> <span class="token parameter variable">-m</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;/Mem:/ {print $3}&#39;</span><span class="token variable">)</span></span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">usage</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token string">&quot;scale=2; <span class="token variable">$used</span> * 100 / <span class="token variable">$total</span>&quot;</span> <span class="token operator">|</span> <span class="token function">bc</span><span class="token variable">)</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;内存使用: <span class="token variable">\${usage}</span>% (已用 <span class="token variable">\${used}</span>MB / 总共 <span class="token variable">\${total}</span>MB)&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token variable"><span class="token punctuation">((</span> $<span class="token punctuation">(</span>echo &quot;$usage <span class="token operator">&gt;</span> $MEM_THRESHOLD&quot; <span class="token operator">|</span> bc <span class="token operator">-</span>l<span class="token punctuation">)</span> <span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">        <span class="token builtin class-name">return</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line">    <span class="token builtin class-name">return</span> <span class="token number">0</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查关键服务</span></span>
<span class="line"><span class="token function-name function">check_services</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">services</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">&quot;nginx&quot;</span> <span class="token string">&quot;mysql&quot;</span> <span class="token string">&quot;ssh&quot;</span> <span class="token string">&quot;docker&quot;</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">issues</span><span class="token operator">=</span><span class="token number">0</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;服务状态:&quot;</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token for-or-select variable">svc</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">\${services<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">        <span class="token keyword">if</span> systemctl is-active <span class="token parameter variable">--quiet</span> <span class="token string">&quot;<span class="token variable">$svc</span>&quot;</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null<span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;  ✅ <span class="token variable">$svc</span>: 运行中&quot;</span></span>
<span class="line">        <span class="token keyword">else</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;  ❌ <span class="token variable">$svc</span>: 未运行&quot;</span></span>
<span class="line">            <span class="token assign-left variable">issues</span><span class="token operator">=</span><span class="token number">1</span></span>
<span class="line">        <span class="token keyword">fi</span></span>
<span class="line">    <span class="token keyword">done</span></span>
<span class="line">    <span class="token builtin class-name">return</span> <span class="token variable">$issues</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查网络连接</span></span>
<span class="line"><span class="token function-name function">check_network</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token function">ping</span> <span class="token parameter variable">-c</span> <span class="token number">1</span> <span class="token parameter variable">-W</span> <span class="token number">2</span> <span class="token number">8.8</span>.8.8 <span class="token operator">&amp;&gt;</span>/dev/null<span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;网络: ✅ 外网连通&quot;</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;网络: ❌ 外网不通&quot;</span></span>
<span class="line">        <span class="token builtin class-name">return</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line">    <span class="token builtin class-name">return</span> <span class="token number">0</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 发送告警（示例：写入日志，实际可配置邮件）</span></span>
<span class="line"><span class="token function-name function">send_alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">message</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$1</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">timestamp</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token string">&#39;+%Y-%m-%d %H:%M:%S&#39;</span><span class="token variable">)</span></span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;[<span class="token variable">$timestamp</span>] ALERT: <span class="token variable">$message</span>&quot;</span> <span class="token operator">&gt;&gt;</span> /var/log/health_check.log</span>
<span class="line">    <span class="token comment"># echo &quot;$message&quot; | mail -s &quot;服务器告警&quot; &quot;$ALERT_EMAIL&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 主函数</span></span>
<span class="line"><span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;=========================================&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot; 服务器健康检查 - <span class="token variable"><span class="token variable">$(</span><span class="token function">date</span><span class="token variable">)</span></span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;=========================================&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">has_issues</span><span class="token operator">=</span><span class="token number">0</span></span>
<span class="line"></span>
<span class="line">    check_load <span class="token operator">||</span> <span class="token assign-left variable">has_issues</span><span class="token operator">=</span><span class="token number">1</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    check_memory <span class="token operator">||</span> <span class="token assign-left variable">has_issues</span><span class="token operator">=</span><span class="token number">1</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    check_disk <span class="token operator">||</span> <span class="token assign-left variable">has_issues</span><span class="token operator">=</span><span class="token number">1</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    check_services <span class="token operator">||</span> <span class="token assign-left variable">has_issues</span><span class="token operator">=</span><span class="token number">1</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    check_network <span class="token operator">||</span> <span class="token assign-left variable">has_issues</span><span class="token operator">=</span><span class="token number">1</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$has_issues</span> <span class="token parameter variable">-eq</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;⚠️  发现异常，请及时处理！&quot;</span></span>
<span class="line">        send_alert <span class="token string">&quot;服务器 <span class="token variable"><span class="token variable">$(</span><span class="token function">hostname</span><span class="token variable">)</span></span> 健康检查发现异常，请查看 /var/log/health_check.log&quot;</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;✅ 所有检查通过，服务器运行正常&quot;</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">main</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="案例-5-文件批量处理脚本" tabindex="-1"><a class="header-anchor" href="#案例-5-文件批量处理脚本"><span>案例 5：文件批量处理脚本</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># 批量文件处理工具</span></span>
<span class="line"><span class="token comment"># 支持：重命名、转码、压缩、搜索替换</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">set</span> <span class="token parameter variable">-euo</span> pipefail</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 批量重命名</span></span>
<span class="line"><span class="token function-name function">batch_rename</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">dir</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${1<span class="token operator">:-</span>.}</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">pattern</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${2}</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">replacement</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${3}</span>&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$pattern</span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$replacement</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;用法: <span class="token variable">$0</span> rename &lt;目录&gt; &lt;模式&gt; &lt;替换&gt;&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;示例: <span class="token variable">$0</span> rename /path &#39;\\.htm$&#39; &#39;.html&#39;&quot;</span></span>
<span class="line">        <span class="token builtin class-name">return</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;正在批量重命名文件...&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;目录: <span class="token variable">$dir</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;模式: <span class="token variable">$pattern</span> -&gt; <span class="token variable">$replacement</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">count</span><span class="token operator">=</span><span class="token number">0</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token for-or-select variable">file</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">$dir</span>&quot;</span>/*<span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;<span class="token variable">$file</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">            <span class="token builtin class-name">local</span> <span class="token assign-left variable">newname</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$file</span>&quot;</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-E</span> <span class="token string">&quot;s/<span class="token variable">$pattern</span>/<span class="token variable">$replacement</span>/&quot;</span><span class="token variable">)</span></span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$file</span>&quot;</span> <span class="token operator">!=</span> <span class="token string">&quot;<span class="token variable">$newname</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">                <span class="token function">mv</span> <span class="token parameter variable">-v</span> <span class="token string">&quot;<span class="token variable">$file</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$newname</span>&quot;</span></span>
<span class="line">                <span class="token variable"><span class="token punctuation">((</span>count<span class="token operator">++</span><span class="token punctuation">))</span></span></span>
<span class="line">            <span class="token keyword">fi</span></span>
<span class="line">        <span class="token keyword">fi</span></span>
<span class="line">    <span class="token keyword">done</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;共重命名 <span class="token variable">$count</span> 个文件&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 批量转换编码</span></span>
<span class="line"><span class="token function-name function">batch_convert_encoding</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">dir</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${1<span class="token operator">:-</span>.}</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">from</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${2<span class="token operator">:-</span>gbk}</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">to</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${3<span class="token operator">:-</span>utf8}</span>&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;正在转换文件编码...&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;目录: <span class="token variable">$dir</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;编码: <span class="token variable">$from</span> -&gt; <span class="token variable">$to</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token function">find</span> <span class="token string">&quot;<span class="token variable">$dir</span>&quot;</span> <span class="token parameter variable">-type</span> f <span class="token punctuation">\\</span><span class="token punctuation">(</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;*.txt&quot;</span> <span class="token parameter variable">-o</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;*.md&quot;</span> <span class="token parameter variable">-o</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;*.csv&quot;</span> <span class="token punctuation">\\</span><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token function">file</span><span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;转换: <span class="token variable">$file</span>&quot;</span></span>
<span class="line">        <span class="token function">iconv</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;<span class="token variable">$from</span>&quot;</span> <span class="token parameter variable">-t</span> <span class="token string">&quot;<span class="token variable">$to</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$file</span>&quot;</span> <span class="token parameter variable">-o</span> <span class="token string">&quot;<span class="token variable">\${file}</span>.tmp&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">mv</span> <span class="token string">&quot;<span class="token variable">\${file}</span>.tmp&quot;</span> <span class="token string">&quot;<span class="token variable">$file</span>&quot;</span></span>
<span class="line">    <span class="token keyword">done</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;编码转换完成&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 批量压缩</span></span>
<span class="line"><span class="token function-name function">batch_compress</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">dir</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${1<span class="token operator">:-</span>.}</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">type</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${2<span class="token operator">:-</span>gz}</span>&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;正在批量压缩文件...&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;目录: <span class="token variable">$dir</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;压缩方式: <span class="token variable">$type</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token function">find</span> <span class="token string">&quot;<span class="token variable">$dir</span>&quot;</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-name</span> <span class="token string">&quot;*.log&quot;</span> <span class="token parameter variable">-o</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;*.bak&quot;</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token function">file</span><span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">        <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$type</span>&quot;</span> <span class="token keyword">in</span></span>
<span class="line">            gz<span class="token punctuation">)</span></span>
<span class="line">                <span class="token function">gzip</span> <span class="token parameter variable">-v</span> <span class="token string">&quot;<span class="token variable">$file</span>&quot;</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            bz2<span class="token punctuation">)</span></span>
<span class="line">                <span class="token function">bzip2</span> <span class="token parameter variable">-v</span> <span class="token string">&quot;<span class="token variable">$file</span>&quot;</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token function">zip</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token function">zip</span> <span class="token string">&quot;<span class="token variable">\${file}</span>.zip&quot;</span> <span class="token string">&quot;<span class="token variable">$file</span>&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">rm</span> <span class="token string">&quot;<span class="token variable">$file</span>&quot;</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">esac</span></span>
<span class="line">    <span class="token keyword">done</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;压缩完成&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 批量搜索替换</span></span>
<span class="line"><span class="token function-name function">batch_replace</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">dir</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${1<span class="token operator">:-</span>.}</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">pattern</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${2}</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">replacement</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${3}</span>&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$pattern</span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$replacement</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;用法: <span class="token variable">$0</span> replace &lt;目录&gt; &lt;模式&gt; &lt;替换&gt;&quot;</span></span>
<span class="line">        <span class="token builtin class-name">return</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;正在批量搜索替换...&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;目录: <span class="token variable">$dir</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;模式: <span class="token variable">$pattern</span> -&gt; <span class="token variable">$replacement</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token function">find</span> <span class="token string">&quot;<span class="token variable">$dir</span>&quot;</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-name</span> <span class="token string">&quot;*.txt&quot;</span> <span class="token parameter variable">-o</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;*.md&quot;</span> <span class="token parameter variable">-o</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;*.conf&quot;</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token function">file</span><span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token function">grep</span> <span class="token parameter variable">-l</span> <span class="token string">&quot;<span class="token variable">$pattern</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$file</span>&quot;</span> <span class="token operator">&amp;&gt;</span>/dev/null<span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;修改: <span class="token variable">$file</span>&quot;</span></span>
<span class="line">            <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/<span class="token variable">$pattern</span>/<span class="token variable">$replacement</span>/g&quot;</span> <span class="token string">&quot;<span class="token variable">$file</span>&quot;</span></span>
<span class="line">        <span class="token keyword">fi</span></span>
<span class="line">    <span class="token keyword">done</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;替换完成&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 主函数</span></span>
<span class="line"><span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">\${1<span class="token operator">:-</span>help}</span>&quot;</span> <span class="token keyword">in</span></span>
<span class="line">        <span class="token function">rename</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token builtin class-name">shift</span></span>
<span class="line">            batch_rename <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span></span>
<span class="line">            <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">        convert<span class="token punctuation">)</span></span>
<span class="line">            <span class="token builtin class-name">shift</span></span>
<span class="line">            batch_convert_encoding <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span></span>
<span class="line">            <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">        compress<span class="token punctuation">)</span></span>
<span class="line">            <span class="token builtin class-name">shift</span></span>
<span class="line">            batch_compress <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span></span>
<span class="line">            <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">        replace<span class="token punctuation">)</span></span>
<span class="line">            <span class="token builtin class-name">shift</span></span>
<span class="line">            batch_replace <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span></span>
<span class="line">            <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token builtin class-name">help</span><span class="token operator">|</span>*<span class="token punctuation">)</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;批量文件处理工具&quot;</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;用法:&quot;</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;  <span class="token variable">$0</span> rename &lt;目录&gt; &lt;模式&gt; &lt;替换&gt;    - 批量重命名&quot;</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;  <span class="token variable">$0</span> convert &lt;目录&gt; [源编码] [目标编码] - 批量转换编码&quot;</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;  <span class="token variable">$0</span> compress &lt;目录&gt; [类型]         - 批量压缩文件&quot;</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;  <span class="token variable">$0</span> replace &lt;目录&gt; &lt;模式&gt; &lt;替换&gt;   - 批量搜索替换&quot;</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;示例:&quot;</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;  <span class="token variable">$0</span> rename /path &#39;<span class="token entity" title="\\\\">\\\\</span>.htm$&#39; &#39;.html&#39;&quot;</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;  <span class="token variable">$0</span> convert /path gbk utf8&quot;</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;  <span class="token variable">$0</span> compress /var/log gz&quot;</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;  <span class="token variable">$0</span> replace /config &#39;old_value&#39; &#39;new_value&#39;&quot;</span></span>
<span class="line">            <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">esac</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">main <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="案例-6-自动部署脚本" tabindex="-1"><a class="header-anchor" href="#案例-6-自动部署脚本"><span>案例 6：自动部署脚本</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># 简单自动部署脚本</span></span>
<span class="line"><span class="token comment"># 从 Git 拉取代码并构建项目</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">set</span> <span class="token parameter variable">-euo</span> pipefail</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置</span></span>
<span class="line"><span class="token assign-left variable">PROJECT_DIR</span><span class="token operator">=</span><span class="token string">&quot;/var/www/myapp&quot;</span></span>
<span class="line"><span class="token assign-left variable">GIT_REPO</span><span class="token operator">=</span><span class="token string">&quot;https://github.com/user/myapp.git&quot;</span></span>
<span class="line"><span class="token assign-left variable">BRANCH</span><span class="token operator">=</span><span class="token string">&quot;main&quot;</span></span>
<span class="line"><span class="token assign-left variable">BUILD_CMD</span><span class="token operator">=</span><span class="token string">&quot;npm run build&quot;</span></span>
<span class="line"><span class="token assign-left variable">RESTART_CMD</span><span class="token operator">=</span><span class="token string">&quot;systemctl restart myapp&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 颜色</span></span>
<span class="line"><span class="token assign-left variable">GREEN</span><span class="token operator">=</span><span class="token string">&#39;\\033[0;32m&#39;</span></span>
<span class="line"><span class="token assign-left variable">RED</span><span class="token operator">=</span><span class="token string">&#39;\\033[0;31m&#39;</span></span>
<span class="line"><span class="token assign-left variable">YELLOW</span><span class="token operator">=</span><span class="token string">&#39;\\033[0;33m&#39;</span></span>
<span class="line"><span class="token assign-left variable">NC</span><span class="token operator">=</span><span class="token string">&#39;\\033[0m&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token function-name function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${GREEN}</span>[<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token string">&#39;+%H:%M:%S&#39;</span><span class="token variable">)</span></span>]<span class="token variable">\${NC}</span> <span class="token variable">$1</span>&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function-name function">warn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${YELLOW}</span>[WARN]<span class="token variable">\${NC}</span> <span class="token variable">$1</span>&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function-name function">error</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${RED}</span>[ERROR]<span class="token variable">\${NC}</span> <span class="token variable">$1</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查依赖</span></span>
<span class="line"><span class="token function-name function">check_deps</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> <span class="token function">git</span> <span class="token operator">||</span> error <span class="token string">&quot;git 未安装&quot;</span></span>
<span class="line">    <span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> <span class="token function">npm</span> <span class="token operator">||</span> error <span class="token string">&quot;npm 未安装&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 备份</span></span>
<span class="line"><span class="token function-name function">backup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">backup_dir</span><span class="token operator">=</span><span class="token string">&quot;/var/backup/myapp_<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y%m%d_%H%M%S<span class="token variable">)</span></span>&quot;</span></span>
<span class="line">    log <span class="token string">&quot;创建备份: <span class="token variable">$backup_dir</span>&quot;</span></span>
<span class="line">    <span class="token function">cp</span> <span class="token parameter variable">-r</span> <span class="token string">&quot;<span class="token variable">$PROJECT_DIR</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$backup_dir</span>&quot;</span> <span class="token operator">||</span> warn <span class="token string">&quot;备份失败，将继续部署&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 部署</span></span>
<span class="line"><span class="token function-name function">deploy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    log <span class="token string">&quot;开始部署...&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 进入项目目录</span></span>
<span class="line">    <span class="token builtin class-name">cd</span> <span class="token string">&quot;<span class="token variable">$PROJECT_DIR</span>&quot;</span> <span class="token operator">||</span> error <span class="token string">&quot;项目目录不存在&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 保存当前版本</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">old_version</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">git</span> rev-parse <span class="token parameter variable">--short</span> HEAD <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;none&quot;</span><span class="token variable">)</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 拉取最新代码</span></span>
<span class="line">    log <span class="token string">&quot;拉取代码...&quot;</span></span>
<span class="line">    <span class="token function">git</span> fetch origin</span>
<span class="line">    <span class="token function">git</span> reset <span class="token parameter variable">--hard</span> <span class="token string">&quot;origin/<span class="token variable">$BRANCH</span>&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 获取新版本</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">new_version</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">git</span> rev-parse <span class="token parameter variable">--short</span> HEAD<span class="token variable">)</span></span></span>
<span class="line"></span>
<span class="line">    log <span class="token string">&quot;版本更新: <span class="token variable">$old_version</span> -&gt; <span class="token variable">$new_version</span>&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 安装依赖</span></span>
<span class="line">    log <span class="token string">&quot;安装依赖...&quot;</span></span>
<span class="line">    <span class="token function">npm</span> <span class="token function">install</span> <span class="token operator">||</span> error <span class="token string">&quot;npm install 失败&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 构建</span></span>
<span class="line">    log <span class="token string">&quot;构建项目...&quot;</span></span>
<span class="line">    <span class="token variable">$BUILD_CMD</span> <span class="token operator">||</span> error <span class="token string">&quot;构建失败&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 重启服务</span></span>
<span class="line">    log <span class="token string">&quot;重启服务...&quot;</span></span>
<span class="line">    <span class="token variable">$RESTART_CMD</span> <span class="token operator">||</span> warn <span class="token string">&quot;服务重启失败，请手动检查&quot;</span></span>
<span class="line"></span>
<span class="line">    log <span class="token string">&quot;部署完成！&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;部署时间: <span class="token variable"><span class="token variable">$(</span><span class="token function">date</span><span class="token variable">)</span></span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;项目版本: <span class="token variable">$new_version</span>&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 回滚</span></span>
<span class="line"><span class="token function-name function">rollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    log <span class="token string">&quot;执行回滚...&quot;</span></span>
<span class="line">    <span class="token builtin class-name">cd</span> <span class="token string">&quot;<span class="token variable">$PROJECT_DIR</span>&quot;</span> <span class="token operator">||</span> error <span class="token string">&quot;项目目录不存在&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token function">git</span> stash</span>
<span class="line">    <span class="token function">git</span> checkout <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token operator">||</span> error <span class="token string">&quot;版本 <span class="token variable">$1</span> 不存在&quot;</span></span>
<span class="line">    <span class="token function">npm</span> <span class="token function">install</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">$BUILD_CMD</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">$RESTART_CMD</span></span>
<span class="line"></span>
<span class="line">    log <span class="token string">&quot;回滚到版本 <span class="token variable">$1</span> 完成&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 主函数</span></span>
<span class="line"><span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    check_deps</span>
<span class="line"></span>
<span class="line">    <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">\${1<span class="token operator">:-</span>deploy}</span>&quot;</span> <span class="token keyword">in</span></span>
<span class="line">        deploy<span class="token punctuation">)</span></span>
<span class="line">            backup</span>
<span class="line">            deploy</span>
<span class="line">            <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">        rollback<span class="token punctuation">)</span></span>
<span class="line">            rollback <span class="token string">&quot;<span class="token variable">\${2<span class="token operator">:-</span>HEAD~1}</span>&quot;</span></span>
<span class="line">            <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">        status<span class="token punctuation">)</span></span>
<span class="line">            <span class="token builtin class-name">cd</span> <span class="token string">&quot;<span class="token variable">$PROJECT_DIR</span>&quot;</span></span>
<span class="line">            <span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">-5</span></span>
<span class="line">            <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">        *<span class="token punctuation">)</span></span>
<span class="line">            <span class="token builtin class-name">echo</span> <span class="token string">&quot;用法: <span class="token variable">$0</span> {deploy|rollback [版本]|status}&quot;</span></span>
<span class="line">            <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">esac</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">main <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="案例-7-网络监控脚本" tabindex="-1"><a class="header-anchor" href="#案例-7-网络监控脚本"><span>案例 7：网络监控脚本</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># 网络连通性监控脚本</span></span>
<span class="line"><span class="token comment"># 监控多个主机和端口的连通性</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">set</span> <span class="token parameter variable">-euo</span> pipefail</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置</span></span>
<span class="line"><span class="token assign-left variable">HOSTS</span><span class="token operator">=</span><span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">&quot;8.8.8.8: Google DNS&quot;</span></span>
<span class="line">    <span class="token string">&quot;1.1.1.1: Cloudflare DNS&quot;</span></span>
<span class="line">    <span class="token string">&quot;github.com: GitHub&quot;</span></span>
<span class="line">    <span class="token string">&quot;baidu.com: Baidu&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token assign-left variable">PORTS</span><span class="token operator">=</span><span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">&quot;localhost:22: SSH&quot;</span></span>
<span class="line">    <span class="token string">&quot;localhost:80: HTTP&quot;</span></span>
<span class="line">    <span class="token string">&quot;localhost:443: HTTPS&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"><span class="token assign-left variable">LOG_FILE</span><span class="token operator">=</span><span class="token string">&quot;/var/log/network_monitor.log&quot;</span></span>
<span class="line"><span class="token assign-left variable">ALERT_LOG</span><span class="token operator">=</span><span class="token string">&quot;/var/log/network_alert.log&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 日志函数</span></span>
<span class="line"><span class="token function-name function">log</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">timestamp</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token string">&#39;+%Y-%m-%d %H:%M:%S&#39;</span><span class="token variable">)</span></span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;[<span class="token variable">$timestamp</span>] <span class="token variable">$1</span>&quot;</span> <span class="token operator">&gt;&gt;</span> <span class="token string">&quot;<span class="token variable">$LOG_FILE</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;[<span class="token variable">$timestamp</span>] <span class="token variable">$1</span>&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function-name function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">timestamp</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> <span class="token string">&#39;+%Y-%m-%d %H:%M:%S&#39;</span><span class="token variable">)</span></span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;[<span class="token variable">$timestamp</span>] ALERT: <span class="token variable">$1</span>&quot;</span> <span class="token operator">&gt;&gt;</span> <span class="token string">&quot;<span class="token variable">$ALERT_LOG</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;[<span class="token variable">$timestamp</span>] ALERT: <span class="token variable">$1</span>&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查主机连通性</span></span>
<span class="line"><span class="token function-name function">check_host</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">host</span><span class="token operator">=</span><span class="token variable">$1</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token variable">$2</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token function">ping</span> <span class="token parameter variable">-c</span> <span class="token number">2</span> <span class="token parameter variable">-W</span> <span class="token number">3</span> <span class="token string">&quot;<span class="token variable">$host</span>&quot;</span> <span class="token operator">&amp;&gt;</span>/dev/null<span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">        log <span class="token string">&quot;✅ <span class="token variable">$name</span> (<span class="token variable">$host</span>) - 可达&quot;</span></span>
<span class="line">        <span class="token builtin class-name">return</span> <span class="token number">0</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">        alert <span class="token string">&quot;❌ <span class="token variable">$name</span> (<span class="token variable">$host</span>) - 不可达&quot;</span></span>
<span class="line">        <span class="token builtin class-name">return</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查端口连通性</span></span>
<span class="line"><span class="token function-name function">check_port</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">host</span><span class="token operator">=</span><span class="token variable">$1</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token variable">$2</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token variable">$3</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token function">timeout</span> <span class="token number">3</span> <span class="token function">bash</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;echo &gt;/dev/tcp/<span class="token variable">$host</span>/<span class="token variable">$port</span>&quot;</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null<span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">        log <span class="token string">&quot;✅ <span class="token variable">$name</span> (<span class="token variable">$host</span>:<span class="token variable">$port</span>) - 开放&quot;</span></span>
<span class="line">        <span class="token builtin class-name">return</span> <span class="token number">0</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">        alert <span class="token string">&quot;❌ <span class="token variable">$name</span> (<span class="token variable">$host</span>:<span class="token variable">$port</span>) - 关闭&quot;</span></span>
<span class="line">        <span class="token builtin class-name">return</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查 DNS 解析</span></span>
<span class="line"><span class="token function-name function">check_dns</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">domain</span><span class="token operator">=</span><span class="token variable">$1</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token variable">$2</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token function">nslookup</span> <span class="token string">&quot;<span class="token variable">$domain</span>&quot;</span> <span class="token operator">&amp;&gt;</span>/dev/null<span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">        <span class="token builtin class-name">local</span> <span class="token assign-left variable">ip</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">dig</span> +short <span class="token string">&quot;<span class="token variable">$domain</span>&quot;</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-1</span><span class="token variable">)</span></span></span>
<span class="line">        log <span class="token string">&quot;✅ DNS 解析 - <span class="token variable">$name</span> (<span class="token variable">$domain</span> -&gt; <span class="token variable">$ip</span>)&quot;</span></span>
<span class="line">        <span class="token builtin class-name">return</span> <span class="token number">0</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">        alert <span class="token string">&quot;❌ DNS 解析失败 - <span class="token variable">$name</span> (<span class="token variable">$domain</span>)&quot;</span></span>
<span class="line">        <span class="token builtin class-name">return</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 测量延迟</span></span>
<span class="line"><span class="token function-name function">measure_latency</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">host</span><span class="token operator">=</span><span class="token variable">$1</span></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">result</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">ping</span> <span class="token parameter variable">-c</span> <span class="token number">5</span> <span class="token parameter variable">-q</span> <span class="token string">&quot;<span class="token variable">$host</span>&quot;</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">|</span> <span class="token function">tail</span> <span class="token parameter variable">-1</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $4}&#39;</span> <span class="token operator">|</span> <span class="token function">cut</span> -d<span class="token string">&#39;/&#39;</span> <span class="token parameter variable">-f2</span><span class="token variable">)</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">$result</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">        log <span class="token string">&quot;📊 延迟统计 - <span class="token variable">$host</span>: 平均 <span class="token variable">\${result}</span>ms&quot;</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">        alert <span class="token string">&quot;📊 延迟统计 - <span class="token variable">$host</span>: 无法获取&quot;</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 主函数</span></span>
<span class="line"><span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;=========================================&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot; 网络监控 - <span class="token variable"><span class="token variable">$(</span><span class="token function">date</span><span class="token variable">)</span></span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;=========================================&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">local</span> <span class="token assign-left variable">failed</span><span class="token operator">=</span><span class="token number">0</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 主机连通性检查 ---&quot;</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token for-or-select variable">entry</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">\${HOSTS<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">        <span class="token assign-left variable"><span class="token environment constant">IFS</span></span><span class="token operator">=</span><span class="token string">&#39;:&#39;</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-r</span> <span class="token function">host</span> name <span class="token operator">&lt;&lt;&lt;</span> <span class="token string">&quot;<span class="token variable">$entry</span>&quot;</span></span>
<span class="line">        check_host <span class="token string">&quot;<span class="token variable">$host</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$name</span>&quot;</span> <span class="token operator">||</span> <span class="token variable"><span class="token punctuation">((</span>failed<span class="token operator">++</span><span class="token punctuation">))</span></span></span>
<span class="line">    <span class="token keyword">done</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 端口连通性检查 ---&quot;</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token for-or-select variable">entry</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">\${PORTS<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">        <span class="token assign-left variable"><span class="token environment constant">IFS</span></span><span class="token operator">=</span><span class="token string">&#39;:&#39;</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-r</span> <span class="token function">host</span> port name <span class="token operator">&lt;&lt;&lt;</span> <span class="token string">&quot;<span class="token variable">$entry</span>&quot;</span></span>
<span class="line">        check_port <span class="token string">&quot;<span class="token variable">$host</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$port</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$name</span>&quot;</span> <span class="token operator">||</span> <span class="token variable"><span class="token punctuation">((</span>failed<span class="token operator">++</span><span class="token punctuation">))</span></span></span>
<span class="line">    <span class="token keyword">done</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 延迟测量 ---&quot;</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token for-or-select variable">entry</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">\${HOSTS<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">        <span class="token assign-left variable"><span class="token environment constant">IFS</span></span><span class="token operator">=</span><span class="token string">&#39;:&#39;</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-r</span> <span class="token function">host</span> name <span class="token operator">&lt;&lt;&lt;</span> <span class="token string">&quot;<span class="token variable">$entry</span>&quot;</span></span>
<span class="line">        measure_latency <span class="token string">&quot;<span class="token variable">$host</span>&quot;</span></span>
<span class="line">    <span class="token keyword">done</span></span>
<span class="line"></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$failed</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">        log <span class="token string">&quot;🎉 所有检查通过&quot;</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">        alert <span class="token string">&quot;⚠️  <span class="token variable">$failed</span> 项检查失败&quot;</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">main</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="案例-8-交互式菜单脚本" tabindex="-1"><a class="header-anchor" href="#案例-8-交互式菜单脚本"><span>案例 8：交互式菜单脚本</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># 交互式系统管理菜单</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">set</span> <span class="token parameter variable">-euo</span> pipefail</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 颜色</span></span>
<span class="line"><span class="token assign-left variable">RED</span><span class="token operator">=</span><span class="token string">&#39;\\033[0;31m&#39;</span></span>
<span class="line"><span class="token assign-left variable">GREEN</span><span class="token operator">=</span><span class="token string">&#39;\\033[0;32m&#39;</span></span>
<span class="line"><span class="token assign-left variable">YELLOW</span><span class="token operator">=</span><span class="token string">&#39;\\033[0;33m&#39;</span></span>
<span class="line"><span class="token assign-left variable">BLUE</span><span class="token operator">=</span><span class="token string">&#39;\\033[0;34m&#39;</span></span>
<span class="line"><span class="token assign-left variable">NC</span><span class="token operator">=</span><span class="token string">&#39;\\033[0m&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 标题</span></span>
<span class="line"><span class="token function-name function">show_header</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">clear</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${BLUE}</span>========================================<span class="token variable">\${NC}</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${BLUE}</span>         Linux 系统管理工具            <span class="token variable">\${NC}</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token variable">\${BLUE}</span>========================================<span class="token variable">\${NC}</span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;系统: <span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-o</span><span class="token variable">)</span></span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;主机: <span class="token variable"><span class="token variable">$(</span><span class="token function">hostname</span><span class="token variable">)</span></span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;时间: <span class="token variable"><span class="token variable">$(</span><span class="token function">date</span><span class="token variable">)</span></span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;负载: <span class="token variable"><span class="token variable">$(</span><span class="token function">uptime</span> <span class="token operator">|</span> <span class="token function">awk</span> -F<span class="token string">&#39;load average:&#39;</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">)</span></span>&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 系统信息菜单</span></span>
<span class="line"><span class="token function-name function">system_info_menu</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">while</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">        show_header</span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 系统信息 ---&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;1. CPU 信息&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;2. 内存信息&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;3. 磁盘信息&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;4. 网络信息&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;5. 进程信息&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;0. 返回主菜单&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">        <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请选择 [0-5]: &quot;</span> choice</span>
<span class="line"></span>
<span class="line">        <span class="token keyword">case</span> <span class="token variable">$choice</span> <span class="token keyword">in</span></span>
<span class="line">            <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\n">\\n</span>--- CPU 信息 ---&quot;</span></span>
<span class="line">                lscpu <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&quot;Model name|CPU\\(s\\)|Thread|Core|MHz&quot;</span></span>
<span class="line">                <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;按回车继续...&quot;</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\n">\\n</span>--- 内存信息 ---&quot;</span></span>
<span class="line">                <span class="token function">free</span> <span class="token parameter variable">-h</span></span>
<span class="line">                <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;按回车继续...&quot;</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token number">3</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\n">\\n</span>--- 磁盘信息 ---&quot;</span></span>
<span class="line">                <span class="token function">df</span> <span class="token parameter variable">-h</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> tmpfs</span>
<span class="line">                <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;按回车继续...&quot;</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token number">4</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\n">\\n</span>--- 网络信息 ---&quot;</span></span>
<span class="line">                <span class="token function">ip</span> addr show <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&quot;^[0-9]|inet &quot;</span></span>
<span class="line">                <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;按回车继续...&quot;</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token number">5</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\n">\\n</span>--- 进程信息 (CPU 前 10) ---&quot;</span></span>
<span class="line">                <span class="token function">ps</span> aux <span class="token parameter variable">--sort</span><span class="token operator">=</span>-%cpu <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-11</span></span>
<span class="line">                <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;按回车继续...&quot;</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token builtin class-name">return</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            *<span class="token punctuation">)</span></span>
<span class="line">                <span class="token builtin class-name">echo</span> <span class="token string">&quot;无效选择&quot;</span></span>
<span class="line">                <span class="token function">sleep</span> <span class="token number">1</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">esac</span></span>
<span class="line">    <span class="token keyword">done</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 服务管理菜单</span></span>
<span class="line"><span class="token function-name function">service_menu</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">while</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">        show_header</span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 服务管理 ---&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;1. 查看服务状态&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;2. 启动服务&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;3. 停止服务&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;4. 重启服务&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;5. 设置开机自启&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;0. 返回主菜单&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">        <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请选择 [0-5]: &quot;</span> choice</span>
<span class="line"></span>
<span class="line">        <span class="token keyword">case</span> <span class="token variable">$choice</span> <span class="token keyword">in</span></span>
<span class="line">            <span class="token number">1</span><span class="token operator">|</span><span class="token number">2</span><span class="token operator">|</span><span class="token number">3</span><span class="token operator">|</span><span class="token number">4</span><span class="token operator">|</span><span class="token number">5</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入服务名: &quot;</span> <span class="token function">service</span></span>
<span class="line">                <span class="token keyword">case</span> <span class="token variable">$choice</span> <span class="token keyword">in</span></span>
<span class="line">                    <span class="token number">1</span><span class="token punctuation">)</span> <span class="token function">sudo</span> systemctl status <span class="token string">&quot;<span class="token variable">$service</span>&quot;</span> <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token number">2</span><span class="token punctuation">)</span> <span class="token function">sudo</span> systemctl start <span class="token string">&quot;<span class="token variable">$service</span>&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;✅ 已启动&quot;</span> <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token number">3</span><span class="token punctuation">)</span> <span class="token function">sudo</span> systemctl stop <span class="token string">&quot;<span class="token variable">$service</span>&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;✅ 已停止&quot;</span> <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token number">4</span><span class="token punctuation">)</span> <span class="token function">sudo</span> systemctl restart <span class="token string">&quot;<span class="token variable">$service</span>&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;✅ 已重启&quot;</span> <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">                    <span class="token number">5</span><span class="token punctuation">)</span> <span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> <span class="token string">&quot;<span class="token variable">$service</span>&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;✅ 已设置开机自启&quot;</span> <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token keyword">esac</span></span>
<span class="line">                <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;按回车继续...&quot;</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token builtin class-name">return</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            *<span class="token punctuation">)</span></span>
<span class="line">                <span class="token builtin class-name">echo</span> <span class="token string">&quot;无效选择&quot;</span></span>
<span class="line">                <span class="token function">sleep</span> <span class="token number">1</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">esac</span></span>
<span class="line">    <span class="token keyword">done</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 日志查看菜单</span></span>
<span class="line"><span class="token function-name function">log_menu</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">while</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">        show_header</span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 日志查看 ---&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;1. 系统日志&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;2. 认证日志&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;3. 内核日志&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;4. 自定义日志&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;0. 返回主菜单&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">        <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请选择 [0-4]: &quot;</span> choice</span>
<span class="line"></span>
<span class="line">        <span class="token keyword">case</span> <span class="token variable">$choice</span> <span class="token keyword">in</span></span>
<span class="line">            <span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">                journalctl <span class="token parameter variable">-n</span> <span class="token number">30</span> --no-pager</span>
<span class="line">                <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;按回车继续...&quot;</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line">                journalctl <span class="token parameter variable">-u</span> sshd <span class="token parameter variable">-n</span> <span class="token number">30</span> --no-pager <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">||</span> <span class="token function">cat</span> /var/log/auth.log <span class="token operator">|</span> <span class="token function">tail</span> <span class="token parameter variable">-30</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;日志不可用&quot;</span></span>
<span class="line">                <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;按回车继续...&quot;</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token number">3</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token function">dmesg</span> <span class="token operator">|</span> <span class="token function">tail</span> <span class="token parameter variable">-30</span></span>
<span class="line">                <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;按回车继续...&quot;</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token number">4</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请输入日志文件路径: &quot;</span> logfile</span>
<span class="line">                <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;<span class="token variable">$logfile</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">                    <span class="token function">tail</span> <span class="token parameter variable">-30</span> <span class="token string">&quot;<span class="token variable">$logfile</span>&quot;</span></span>
<span class="line">                <span class="token keyword">else</span></span>
<span class="line">                    <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件不存在&quot;</span></span>
<span class="line">                <span class="token keyword">fi</span></span>
<span class="line">                <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;按回车继续...&quot;</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token builtin class-name">return</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            *<span class="token punctuation">)</span></span>
<span class="line">                <span class="token builtin class-name">echo</span> <span class="token string">&quot;无效选择&quot;</span></span>
<span class="line">                <span class="token function">sleep</span> <span class="token number">1</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">esac</span></span>
<span class="line">    <span class="token keyword">done</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 主菜单</span></span>
<span class="line"><span class="token function-name function">main_menu</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">while</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">        show_header</span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;--- 主菜单 ---&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;1. 📊 系统信息&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;2. ⚙️  服务管理&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;3. 📋 日志查看&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;4. 🧹 系统清理&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;0. 🚪 退出&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line">        <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;请选择 [0-4]: &quot;</span> choice</span>
<span class="line"></span>
<span class="line">        <span class="token keyword">case</span> <span class="token variable">$choice</span> <span class="token keyword">in</span></span>
<span class="line">            <span class="token number">1</span><span class="token punctuation">)</span> system_info_menu <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token number">2</span><span class="token punctuation">)</span> service_menu <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token number">3</span><span class="token punctuation">)</span> log_menu <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token number">4</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token builtin class-name">echo</span> <span class="token string">&quot;清理系统缓存...&quot;</span></span>
<span class="line">                <span class="token function">sudo</span> <span class="token function">apt</span> autoremove <span class="token parameter variable">-y</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">||</span> <span class="token function">sudo</span> yum autoremove <span class="token parameter variable">-y</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;跳过&quot;</span></span>
<span class="line">                <span class="token builtin class-name">echo</span> <span class="token string">&quot;清理完成&quot;</span></span>
<span class="line">                <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;按回车继续...&quot;</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token builtin class-name">echo</span> <span class="token string">&quot;再见！&quot;</span></span>
<span class="line">                <span class="token builtin class-name">exit</span> <span class="token number">0</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">            *<span class="token punctuation">)</span></span>
<span class="line">                <span class="token builtin class-name">echo</span> <span class="token string">&quot;无效选择&quot;</span></span>
<span class="line">                <span class="token function">sleep</span> <span class="token number">1</span></span>
<span class="line">                <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">esac</span></span>
<span class="line">    <span class="token keyword">done</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动主菜单</span></span>
<span class="line">main_menu</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="快速参考卡片" tabindex="-1"><a class="header-anchor" href="#快速参考卡片"><span>快速参考卡片</span></a></h2><h3 id="常用命令速查" tabindex="-1"><a class="header-anchor" href="#常用命令速查"><span>常用命令速查</span></a></h3><table><thead><tr><th>用途</th><th>命令</th></tr></thead><tbody><tr><td>查找文件</td><td><code>find / -name &quot;*.txt&quot;</code></td></tr><tr><td>搜索文本</td><td><code>grep -r &quot;pattern&quot; /path/</code></td></tr><tr><td>统计行数</td><td><code>wc -l file.txt</code></td></tr><tr><td>排序去重</td><td><code>sort file.txt | uniq -c</code></td></tr><tr><td>查看磁盘</td><td><code>df -h</code></td></tr><tr><td>查看目录大小</td><td><code>du -sh *</code></td></tr><tr><td>压缩解压</td><td><code>tar -czvf a.tar.gz dir/</code></td></tr><tr><td>杀死进程</td><td><code>kill -9 PID</code></td></tr><tr><td>查看端口</td><td><code>ss -tlnp</code></td></tr><tr><td>下载文件</td><td><code>curl -O URL</code></td></tr><tr><td>远程复制</td><td><code>scp file user@host:/path/</code></td></tr><tr><td>实时日志</td><td><code>tail -f /var/log/syslog</code></td></tr></tbody></table><h3 id="管道组合技巧" tabindex="-1"><a class="header-anchor" href="#管道组合技巧"><span>管道组合技巧</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 找到最大的 10 个文件</span></span>
<span class="line"><span class="token function">find</span> / <span class="token parameter variable">-type</span> f <span class="token parameter variable">-exec</span> <span class="token function">du</span> <span class="token parameter variable">-h</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> + <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-rh</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-10</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 统计每个用户的进程数</span></span>
<span class="line"><span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $1}&#39;</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-rn</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看所有监听端口</span></span>
<span class="line">ss <span class="token parameter variable">-tlnp</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;NR&gt;1 {print $4, $7}&#39;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token string">&#39;127.0.0.1&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 找到占用 CPU 最多的进程</span></span>
<span class="line"><span class="token function">ps</span> aux <span class="token parameter variable">--sort</span><span class="token operator">=</span>-%cpu <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-3</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 统计日志中每小时请求数</span></span>
<span class="line"><span class="token function">awk</span> <span class="token string">&#39;{print $4}&#39;</span> access.log <span class="token operator">|</span> <span class="token function">cut</span> -d: <span class="token parameter variable">-f2</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-n</span></span>
<span class="line"></span></code></pre></div><hr><p><em>本教程到此结束，Happy Shell Scripting! 🚀</em></p>`,32)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};