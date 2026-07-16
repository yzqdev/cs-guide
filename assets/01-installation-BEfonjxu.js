import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/java-tutor/orm-tutor/mysql/01-installation.html","title":"MySQL 安装与连接","lang":"zh-CN","frontmatter":{"description":"MySQL 安装与连接 安装 MySQL 并学会几种连接方式。 安装 MySQL Windows 安装 从 MySQL 官网 下载 MSI 安装包 运行安装程序，选择 Developer Default 设置 root 用户密码（请牢记） 默认端口 3306 安装完成后在系统服务中自动启动 macOS 安装 Linux 安装（Ubuntu/Debian...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL 安装与连接\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T07:23:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/mysql/01-installation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"MySQL 安装与连接"}],["meta",{"property":"og:description","content":"MySQL 安装与连接 安装 MySQL 并学会几种连接方式。 安装 MySQL Windows 安装 从 MySQL 官网 下载 MSI 安装包 运行安装程序，选择 Developer Default 设置 root 用户密码（请牢记） 默认端口 3306 安装完成后在系统服务中自动启动 macOS 安装 Linux 安装（Ubuntu/Debian..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T07:23:11.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T07:23:11.000Z"}]]},"git":{"createdTime":1783927391000,"updatedTime":1783927391000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.58,"words":774},"filePathRelative":"java-tutor/orm-tutor/mysql/01-installation.md","autoDesc":true}`),a={name:`01-installation.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="mysql-安装与连接" tabindex="-1"><a class="header-anchor" href="#mysql-安装与连接"><span>MySQL 安装与连接</span></a></h1><blockquote><p>安装 MySQL 并学会几种连接方式。</p></blockquote><h2 id="安装-mysql" tabindex="-1"><a class="header-anchor" href="#安装-mysql"><span>安装 MySQL</span></a></h2><h3 id="windows-安装" tabindex="-1"><a class="header-anchor" href="#windows-安装"><span>Windows 安装</span></a></h3><ol><li>从 <a href="https://dev.mysql.com/downloads/mysql/" target="_blank" rel="noopener noreferrer">MySQL 官网</a> 下载 MSI 安装包</li><li>运行安装程序，选择 <strong>Developer Default</strong></li><li>设置 root 用户密码（请牢记）</li><li>默认端口 <strong>3306</strong></li><li>安装完成后在系统服务中自动启动</li></ol><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 验证安装</span>
<span class="line">mysql --version</span>
<span class="line"></span></code></pre></div><h3 id="macos-安装" tabindex="-1"><a class="header-anchor" href="#macos-安装"><span>macOS 安装</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 使用 Homebrew（推荐）</span></span>
<span class="line">brew <span class="token function">install</span> mysql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动</span></span>
<span class="line">brew services start mysql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安全配置（设置 root 密码）</span></span>
<span class="line">mysql_secure_installation</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 验证</span></span>
<span class="line">mysql <span class="token parameter variable">--version</span></span>
<span class="line"></span></code></pre></div><h3 id="linux-安装-ubuntu-debian" tabindex="-1"><a class="header-anchor" href="#linux-安装-ubuntu-debian"><span>Linux 安装（Ubuntu/Debian）</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 更新包列表</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> update</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装 MySQL</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> mysql-server <span class="token parameter variable">-y</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看状态</span></span>
<span class="line"><span class="token function">sudo</span> systemctl status mysql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安全配置</span></span>
<span class="line"><span class="token function">sudo</span> mysql_secure_installation</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 开机自启</span></span>
<span class="line"><span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> mysql</span>
<span class="line"></span></code></pre></div><h3 id="docker-安装-推荐开发环境" tabindex="-1"><a class="header-anchor" href="#docker-安装-推荐开发环境"><span>Docker 安装（推荐开发环境）</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 拉取并启动</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--name</span> mysql8 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_DATABASE</span><span class="token operator">=</span>testdb <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> mysql:8.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 进入容器</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mysql8 mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123456</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 挂载数据卷（持久化存储）</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--name</span> mysql8 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> mysql_data:/var/lib/mysql <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> mysql:8.0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="连接-mysql" tabindex="-1"><a class="header-anchor" href="#连接-mysql"><span>连接 MySQL</span></a></h2><h3 id="命令行连接" tabindex="-1"><a class="header-anchor" href="#命令行连接"><span>命令行连接</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 连接本地 MySQL</span></span>
<span class="line">mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定主机和端口</span></span>
<span class="line">mysql <span class="token parameter variable">-h</span> <span class="token number">127.0</span>.0.1 <span class="token parameter variable">-P</span> <span class="token number">3306</span> <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 直接指定密码（不推荐，有安全风险）</span></span>
<span class="line">mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p123456</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定数据库</span></span>
<span class="line">mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> <span class="token parameter variable">-D</span> testdb</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 执行 SQL 后退出</span></span>
<span class="line">mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;SHOW DATABASES;&quot;</span></span>
<span class="line"></span></code></pre></div><h3 id="连接参数说明" tabindex="-1"><a class="header-anchor" href="#连接参数说明"><span>连接参数说明</span></a></h3><table><thead><tr><th>参数</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td><code>-h</code></td><td>主机地址</td><td><code>-h 192.168.1.100</code></td></tr><tr><td><code>-P</code></td><td>端口（大写）</td><td><code>-P 3306</code></td></tr><tr><td><code>-u</code></td><td>用户名</td><td><code>-u root</code></td></tr><tr><td><code>-p</code></td><td>密码提示</td><td><code>-p</code></td></tr><tr><td><code>-D</code></td><td>指定数据库</td><td><code>-D testdb</code></td></tr><tr><td><code>-e</code></td><td>执行 SQL 并退出</td><td><code>-e &quot;SELECT 1&quot;</code></td></tr></tbody></table><h3 id="图形化工具" tabindex="-1"><a class="header-anchor" href="#图形化工具"><span>图形化工具</span></a></h3><table><thead><tr><th>工具</th><th>平台</th><th>收费</th></tr></thead><tbody><tr><td><strong>DBeaver</strong></td><td>全平台</td><td>免费</td></tr><tr><td><strong>MySQL Workbench</strong></td><td>全平台</td><td>免费</td></tr><tr><td><strong>Navicat</strong></td><td>全平台</td><td>收费</td></tr><tr><td><strong>HeidiSQL</strong></td><td>Windows</td><td>免费</td></tr><tr><td><strong>DataGrip</strong></td><td>全平台</td><td>收费</td></tr></tbody></table><h2 id="配置远程访问" tabindex="-1"><a class="header-anchor" href="#配置远程访问"><span>配置远程访问</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 修改配置文件，允许远程连接</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">vim</span> /etc/mysql/mysql.conf.d/mysqld.cnf</span>
<span class="line"></span></code></pre></div><div class="language-ini" data-highlighter="prismjs" data-ext="ini"><pre><code class="language-ini"><span class="line"><span class="token key attr-name">bind-address</span> <span class="token punctuation">=</span> <span class="token value attr-value">0.0.0.0  # 监听所有网卡</span></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 2. 登录 MySQL 授权远程用户</span></span>
<span class="line">mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span></span>
<span class="line"></span></code></pre></div><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 允许 root 从任何 IP 连接</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">ALL</span> <span class="token keyword">PRIVILEGES</span> <span class="token keyword">ON</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">&#39;root&#39;</span><span class="token variable">@&#39;%&#39;</span> IDENTIFIED <span class="token keyword">BY</span> <span class="token string">&#39;密码&#39;</span> <span class="token keyword">WITH</span> <span class="token keyword">GRANT</span> <span class="token keyword">OPTION</span><span class="token punctuation">;</span></span>
<span class="line">FLUSH <span class="token keyword">PRIVILEGES</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 创建特定用户</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">USER</span> <span class="token string">&#39;myuser&#39;</span><span class="token variable">@&#39;%&#39;</span> IDENTIFIED <span class="token keyword">BY</span> <span class="token string">&#39;mypassword&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">ALL</span> <span class="token keyword">PRIVILEGES</span> <span class="token keyword">ON</span> testdb<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">&#39;myuser&#39;</span><span class="token variable">@&#39;%&#39;</span><span class="token punctuation">;</span></span>
<span class="line">FLUSH <span class="token keyword">PRIVILEGES</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看用户权限</span></span>
<span class="line"><span class="token keyword">SHOW</span> GRANTS <span class="token keyword">FOR</span> <span class="token string">&#39;root&#39;</span><span class="token variable">@&#39;%&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 3. 重启 MySQL</span></span>
<span class="line"><span class="token function">sudo</span> systemctl restart mysql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 检查监听状态</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-an</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">3306</span></span>
<span class="line"></span></code></pre></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>云服务器还需在安全组中开放 3306 端口。</p></div><h2 id="常见连接问题" tabindex="-1"><a class="header-anchor" href="#常见连接问题"><span>常见连接问题</span></a></h2><h3 id="_1-error-2003-—-无法连接" tabindex="-1"><a class="header-anchor" href="#_1-error-2003-—-无法连接"><span>1. ERROR 2003 — 无法连接</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">ERROR 2003 (HY000): Can&#39;t connect to MySQL server on &#39;xxx&#39; (10061)</span>
<span class="line"></span></code></pre></div><p><strong>排查：</strong> 检查 MySQL 是否运行、端口是否正确、防火墙是否放行。</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 检查服务状态</span></span>
<span class="line"><span class="token function">sudo</span> systemctl status mysql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查端口</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-an</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">3306</span></span>
<span class="line"></span></code></pre></div><h3 id="_2-error-1045-—-密码错误" tabindex="-1"><a class="header-anchor" href="#_2-error-1045-—-密码错误"><span>2. ERROR 1045 — 密码错误</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">ERROR 1045 (28000): Access denied for user &#39;root&#39;@&#39;localhost&#39;</span>
<span class="line"></span></code></pre></div><p><strong>解决：</strong> 使用 <code>mysql_secure_installation</code> 重置或跳过授权表。</p><h3 id="_3-error-1524-—-插件未加载" tabindex="-1"><a class="header-anchor" href="#_3-error-1524-—-插件未加载"><span>3. ERROR 1524 — 插件未加载</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">ERROR 1524 (HY000): Plugin &#39;msql_native_password&#39; is not loaded</span>
<span class="line"></span></code></pre></div><p><strong>解决：</strong> 在 <code>my.cnf</code> 中添加 <code>mysql_native_password=ON</code> 后重启。</p><h2 id="基本命令" tabindex="-1"><a class="header-anchor" href="#基本命令"><span>基本命令</span></a></h2><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 查看版本</span></span>
<span class="line"><span class="token keyword">SELECT</span> VERSION<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看当前用户</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token keyword">USER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看数据库列表</span></span>
<span class="line"><span class="token keyword">SHOW</span> <span class="token keyword">DATABASES</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 创建数据库</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> testdb <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span> utf8mb4<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 选择数据库</span></span>
<span class="line"><span class="token keyword">USE</span> testdb<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看当前数据库</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token keyword">DATABASE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="服务管理命令" tabindex="-1"><a class="header-anchor" href="#服务管理命令"><span>服务管理命令</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># systemd（Ubuntu/Debian/CentOS 7+）</span></span>
<span class="line"><span class="token function">sudo</span> systemctl start mysql</span>
<span class="line"><span class="token function">sudo</span> systemctl stop mysql</span>
<span class="line"><span class="token function">sudo</span> systemctl restart mysql</span>
<span class="line"><span class="token function">sudo</span> systemctl status mysql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># SysV init</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">service</span> mysql start</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">service</span> mysql stop</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">service</span> mysql restart</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Windows</span></span>
<span class="line">net start mysql</span>
<span class="line">net stop mysql</span>
<span class="line"></span></code></pre></div>`,41)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};