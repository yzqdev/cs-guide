import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/linux-tutor/linux-tips/my-shells.html","title":"实用 Shell 脚本 — 服务管理模板","lang":"zh-CN","frontmatter":{"description":"实用 Shell 脚本 — 服务管理模板 一个通用的 Go/Node.js/Java 服务管理脚本，支持 start/stop/restart/status。 使用方式 注意事项 需要将 binName 和 LOG_PATH 修改为实际值 确保可执行文件与脚本在同一目录，或使用绝对路径 日志文件会自动创建，建议定期清理","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"实用 Shell 脚本 — 服务管理模板\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-15T12:37:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/linux-tutor/linux-tips/my-shells.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"实用 Shell 脚本 — 服务管理模板"}],["meta",{"property":"og:description","content":"实用 Shell 脚本 — 服务管理模板 一个通用的 Go/Node.js/Java 服务管理脚本，支持 start/stop/restart/status。 使用方式 注意事项 需要将 binName 和 LOG_PATH 修改为实际值 确保可执行文件与脚本在同一目录，或使用绝对路径 日志文件会自动创建，建议定期清理"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-15T12:37:10.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-15T12:37:10.000Z"}]]},"git":{"createdTime":1649166358000,"updatedTime":1784119030000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":1.21,"words":363},"filePathRelative":"linux-tutor/linux-tips/my-shells.md","autoDesc":true}`),a={name:`my-shells.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="实用-shell-脚本-—-服务管理模板" tabindex="-1"><a class="header-anchor" href="#实用-shell-脚本-—-服务管理模板"><span>实用 Shell 脚本 — 服务管理模板</span></a></h1><blockquote><p>一个通用的 Go/Node.js/Java 服务管理脚本，支持 start/stop/restart/status。</p></blockquote><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># 服务管理脚本</span></span>
<span class="line"><span class="token comment"># 用法: ./service.sh [start|stop|restart|status]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置</span></span>
<span class="line"><span class="token assign-left variable">binName</span><span class="token operator">=</span><span class="token string">&quot;filebrowser&quot;</span>                  <span class="token comment"># 可执行文件名</span></span>
<span class="line"><span class="token assign-left variable">LOG_PATH</span><span class="token operator">=</span><span class="token string">&quot;/opt/filebrowser.log&quot;</span>        <span class="token comment"># 日志路径</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用说明</span></span>
<span class="line"><span class="token function-name function">tips</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;用法: sh <span class="token variable">$0</span> [start|stop|restart|status]&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;示例: sh <span class="token variable">$0</span> start&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">    <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取进程 PID</span></span>
<span class="line"><span class="token function-name function">get_pid</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> $binName <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token variable">)</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动服务</span></span>
<span class="line"><span class="token function-name function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token assign-left variable">pid</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>get_pid<span class="token variable">)</span></span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$pid</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">        <span class="token comment"># 后台启动并将输出重定向到日志文件</span></span>
<span class="line">        <span class="token function">nohup</span> ./<span class="token variable">$binName</span> <span class="token operator">&gt;&gt;</span><span class="token variable">$LOG_PATH</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span></span>
<span class="line">        <span class="token assign-left variable">pid</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>get_pid<span class="token variable">)</span></span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Service <span class="token variable">\${binName}</span> is starting! PID=<span class="token variable">\${pid}</span>&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Log file: <span class="token variable">\${LOG_PATH}</span>&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Service <span class="token variable">\${binName}</span> is already running! PID=<span class="token variable">\${pid}</span>&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;If necessary, please use: <span class="token variable">$0</span> restart&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 停止服务</span></span>
<span class="line"><span class="token function-name function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token assign-left variable">pid</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>get_pid<span class="token variable">)</span></span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$pid</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Service <span class="token variable">\${binName}</span> is not running!&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">        <span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token variable">$pid</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Service <span class="token variable">\${binName}</span> stopped successfully! PID:<span class="token variable">\${pid}</span> killed.&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看状态</span></span>
<span class="line"><span class="token function-name function">status</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token assign-left variable">pid</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>get_pid<span class="token variable">)</span></span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$pid</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Service <span class="token variable">\${binName}</span> is not running!&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Service <span class="token variable">\${binName}</span> is running! PID=<span class="token variable">\${pid}</span>&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启服务</span></span>
<span class="line"><span class="token function-name function">restart</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;.............................Restarting..............................&quot;</span></span>
<span class="line">    <span class="token assign-left variable">pid</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>get_pid<span class="token variable">)</span></span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$pid</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">        <span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token variable">$pid</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line">    start</span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;....................Restart successfully!...........................&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 主入口</span></span>
<span class="line"><span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token keyword">in</span></span>
<span class="line">    <span class="token string">&quot;start&quot;</span><span class="token punctuation">)</span></span>
<span class="line">        start</span>
<span class="line">        <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token string">&quot;stop&quot;</span><span class="token punctuation">)</span></span>
<span class="line">        stop</span>
<span class="line">        <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token string">&quot;status&quot;</span><span class="token punctuation">)</span></span>
<span class="line">        status</span>
<span class="line">        <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token string">&quot;restart&quot;</span><span class="token punctuation">)</span></span>
<span class="line">        restart</span>
<span class="line">        <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    *<span class="token punctuation">)</span></span>
<span class="line">        tips</span>
<span class="line">        <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">esac</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用方式" tabindex="-1"><a class="header-anchor" href="#使用方式"><span>使用方式</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 给脚本添加执行权限</span></span>
<span class="line"><span class="token function">chmod</span> +x service.sh</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动服务</span></span>
<span class="line">./service.sh start</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 停止服务</span></span>
<span class="line">./service.sh stop</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启服务</span></span>
<span class="line">./service.sh restart</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看状态</span></span>
<span class="line">./service.sh status</span>
<span class="line"></span></code></pre></div><h2 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项"><span>注意事项</span></a></h2><ul><li>需要将 <code>binName</code> 和 <code>LOG_PATH</code> 修改为实际值</li><li>确保可执行文件与脚本在同一目录，或使用绝对路径</li><li>日志文件会自动创建，建议定期清理</li></ul>`,7)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};