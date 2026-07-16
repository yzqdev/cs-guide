import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/java-tutor/orm-tutor/pgsql/01-installation.html","title":"PostgreSQL 安装与连接","lang":"zh-CN","frontmatter":{"description":"PostgreSQL 安装与连接 PostgreSQL 是一个功能强大的开源关系型数据库，以扩展性和标准兼容性著称。 安装 PostgreSQL Windows 安装 从 PostgreSQL 官网 下载安装包 运行安装程序，按向导完成 设置 postgres 超级用户密码 默认端口 5432 勾选安装 pgAdmin 4（图形化管理工具） macOS...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"PostgreSQL 安装与连接\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T07:23:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/pgsql/01-installation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"PostgreSQL 安装与连接"}],["meta",{"property":"og:description","content":"PostgreSQL 安装与连接 PostgreSQL 是一个功能强大的开源关系型数据库，以扩展性和标准兼容性著称。 安装 PostgreSQL Windows 安装 从 PostgreSQL 官网 下载安装包 运行安装程序，按向导完成 设置 postgres 超级用户密码 默认端口 5432 勾选安装 pgAdmin 4（图形化管理工具） macOS..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T07:23:11.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T07:23:11.000Z"}]]},"git":{"createdTime":1783927391000,"updatedTime":1783927391000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.94,"words":881},"filePathRelative":"java-tutor/orm-tutor/pgsql/01-installation.md","autoDesc":true}`),a={name:`01-installation.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="postgresql-安装与连接" tabindex="-1"><a class="header-anchor" href="#postgresql-安装与连接"><span>PostgreSQL 安装与连接</span></a></h1><blockquote><p>PostgreSQL 是一个功能强大的开源关系型数据库，以扩展性和标准兼容性著称。</p></blockquote><h2 id="安装-postgresql" tabindex="-1"><a class="header-anchor" href="#安装-postgresql"><span>安装 PostgreSQL</span></a></h2><h3 id="windows-安装" tabindex="-1"><a class="header-anchor" href="#windows-安装"><span>Windows 安装</span></a></h3><ol><li>从 <a href="https://www.postgresql.org/download/windows/" target="_blank" rel="noopener noreferrer">PostgreSQL 官网</a> 下载安装包</li><li>运行安装程序，按向导完成</li><li>设置 postgres 超级用户密码</li><li>默认端口 <strong>5432</strong></li><li>勾选安装 pgAdmin 4（图形化管理工具）</li></ol><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 配置环境变量</span></span>
<span class="line">PG_HOME <span class="token operator">=</span> C:<span class="token punctuation">\\</span>Program Files<span class="token punctuation">\\</span>PostgreSQL<span class="token punctuation">\\</span><span class="token number">16</span></span>
<span class="line"><span class="token environment constant">PATH</span>    <span class="token operator">=</span> %PG_HOME%<span class="token punctuation">\\</span>bin</span>
<span class="line">PGDATA  <span class="token operator">=</span> C:<span class="token punctuation">\\</span>Program Files<span class="token punctuation">\\</span>PostgreSQL<span class="token punctuation">\\</span><span class="token number">16</span><span class="token punctuation">\\</span>data</span>
<span class="line"></span></code></pre></div><h3 id="macos-安装" tabindex="-1"><a class="header-anchor" href="#macos-安装"><span>macOS 安装</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 使用 Homebrew（推荐）</span></span>
<span class="line">brew <span class="token function">install</span> postgresql@16</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动</span></span>
<span class="line">brew services start postgresql@16</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 验证</span></span>
<span class="line">psql <span class="token parameter variable">--version</span></span>
<span class="line"></span></code></pre></div><h3 id="linux-安装-ubuntu-debian" tabindex="-1"><a class="header-anchor" href="#linux-安装-ubuntu-debian"><span>Linux 安装（Ubuntu/Debian）</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 导入官方源</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&#39;echo &quot;deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main&quot; &gt; /etc/apt/sources.list.d/pgdg.list&#39;</span></span>
<span class="line"><span class="token function">wget</span> <span class="token parameter variable">--quiet</span> <span class="token parameter variable">-O</span> - https://www.postgresql.org/media/keys/ACCC4CF8.asc <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> update</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> postgresql-16 postgresql-client-16</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看状态</span></span>
<span class="line"><span class="token function">sudo</span> systemctl status postgresql</span>
<span class="line"><span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> postgresql</span>
<span class="line"></span></code></pre></div><h3 id="docker-安装-推荐开发环境" tabindex="-1"><a class="header-anchor" href="#docker-安装-推荐开发环境"><span>Docker 安装（推荐开发环境）</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 拉取并启动</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--name</span> pg16 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">POSTGRES_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">POSTGRES_DB</span><span class="token operator">=</span>testdb <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">5432</span>:5432 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> postgres:16</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 进入容器操作</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> pg16 psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> testdb</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 挂载数据卷</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--name</span> pg16 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> pgdata:/var/lib/postgresql/data <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">POSTGRES_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">5432</span>:5432 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> postgres:16</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="连接-postgresql" tabindex="-1"><a class="header-anchor" href="#连接-postgresql"><span>连接 PostgreSQL</span></a></h2><h3 id="使用-psql-命令行" tabindex="-1"><a class="header-anchor" href="#使用-psql-命令行"><span>使用 psql 命令行</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 连接本地数据库（默认用户和数据库）</span></span>
<span class="line">psql <span class="token parameter variable">-U</span> postgres</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 连接到指定数据库</span></span>
<span class="line">psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> testdb <span class="token parameter variable">-h</span> localhost <span class="token parameter variable">-p</span> <span class="token number">5432</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 执行 SQL 并退出</span></span>
<span class="line">psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> testdb <span class="token parameter variable">-c</span> <span class="token string">&quot;SELECT version();&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 执行 SQL 文件</span></span>
<span class="line">psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> testdb <span class="token parameter variable">-f</span> script.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Windows PowerShell 设置密码</span></span>
<span class="line"><span class="token variable">$env</span>:PGPASSWORD<span class="token operator">=</span><span class="token string">&#39;123456&#39;</span><span class="token punctuation">;</span> psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> testdb</span>
<span class="line"></span></code></pre></div><h3 id="psql-元命令速查" tabindex="-1"><a class="header-anchor" href="#psql-元命令速查"><span>psql 元命令速查</span></a></h3><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 信息查询</span></span>
<span class="line">\\l            <span class="token comment">-- 列出所有数据库</span></span>
<span class="line">\\dt           <span class="token comment">-- 列出所有表</span></span>
<span class="line">\\d users      <span class="token comment">-- 查看表结构</span></span>
<span class="line">\\di           <span class="token comment">-- 列出索引</span></span>
<span class="line">\\ds           <span class="token comment">-- 列出序列</span></span>
<span class="line">\\dv           <span class="token comment">-- 列出视图</span></span>
<span class="line">\\df           <span class="token comment">-- 列出函数</span></span>
<span class="line">\\du           <span class="token comment">-- 列出用户/角色</span></span>
<span class="line">\\dx           <span class="token comment">-- 列出扩展</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 连接与切换</span></span>
<span class="line">\\c testdb     <span class="token comment">-- 切换数据库</span></span>
<span class="line">\\conninfo     <span class="token comment">-- 显示当前连接信息</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 输出控制</span></span>
<span class="line">\\x            <span class="token comment">-- 切换扩展显示</span></span>
<span class="line">\\timing       <span class="token comment">-- 开启查询计时</span></span>
<span class="line">\\<span class="token operator">!</span> ls <span class="token operator">-</span>la     <span class="token comment">-- 执行操作系统命令</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 帮助</span></span>
<span class="line">\\?            <span class="token comment">-- 列出所有元命令</span></span>
<span class="line">\\h <span class="token keyword">SELECT</span>     <span class="token comment">-- 查看 SELECT 语法</span></span>
<span class="line">\\q            <span class="token comment">-- 退出</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="图形化工具" tabindex="-1"><a class="header-anchor" href="#图形化工具"><span>图形化工具</span></a></h3><table><thead><tr><th>工具</th><th>平台</th><th>收费</th></tr></thead><tbody><tr><td><strong>pgAdmin 4</strong></td><td>全平台</td><td>免费（安装时可选）</td></tr><tr><td><strong>DBeaver</strong></td><td>全平台</td><td>免费</td></tr><tr><td><strong>Navicat</strong></td><td>全平台</td><td>收费</td></tr><tr><td><strong>DataGrip</strong></td><td>全平台</td><td>收费</td></tr></tbody></table><h2 id="初始化数据库" tabindex="-1"><a class="header-anchor" href="#初始化数据库"><span>初始化数据库</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 手动初始化（Windows 解压版需要）</span></span>
<span class="line">initdb <span class="token parameter variable">-D</span> <span class="token string">&quot;C:\\Program Files\\PostgreSQL<span class="token entity" title="\\16">\\16</span>\\data&quot;</span> <span class="token parameter variable">-U</span> postgres</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建 postgres 用户（如果不存在）</span></span>
<span class="line">createuser <span class="token parameter variable">-s</span> <span class="token parameter variable">-r</span> postgres</span>
<span class="line"></span></code></pre></div><h2 id="服务管理" tabindex="-1"><a class="header-anchor" href="#服务管理"><span>服务管理</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># systemd（Linux）</span></span>
<span class="line"><span class="token function">sudo</span> systemctl start postgresql</span>
<span class="line"><span class="token function">sudo</span> systemctl stop postgresql</span>
<span class="line"><span class="token function">sudo</span> systemctl restart postgresql</span>
<span class="line"><span class="token function">sudo</span> systemctl status postgresql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># SysV init</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">service</span> postgresql start</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Windows</span></span>
<span class="line">pg_ctl start <span class="token parameter variable">-D</span> <span class="token string">&quot;C:\\Program Files\\PostgreSQL<span class="token entity" title="\\16">\\16</span>\\data&quot;</span></span>
<span class="line">pg_ctl stop</span>
<span class="line">pg_ctl register <span class="token parameter variable">-N</span> PostgreSQL  <span class="token comment"># 注册为系统服务</span></span>
<span class="line"></span></code></pre></div><h2 id="创建第一个数据库和表" tabindex="-1"><a class="header-anchor" href="#创建第一个数据库和表"><span>创建第一个数据库和表</span></a></h2><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 创建数据库</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> testdb<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 切换数据库</span></span>
<span class="line">\\c testdb</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 创建表</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> users <span class="token punctuation">(</span></span>
<span class="line">    id <span class="token keyword">SERIAL</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">    email <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span> <span class="token keyword">UNIQUE</span><span class="token punctuation">,</span></span>
<span class="line">    age <span class="token keyword">INT</span> <span class="token keyword">DEFAULT</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">    created_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 插入测试数据</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> users <span class="token punctuation">(</span>name<span class="token punctuation">,</span> email<span class="token punctuation">,</span> age<span class="token punctuation">)</span> <span class="token keyword">VALUES</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">&#39;张三&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;zhangsan@test.com&#39;</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">&#39;李四&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;lisi@test.com&#39;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查询</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="核心配置文件" tabindex="-1"><a class="header-anchor" href="#核心配置文件"><span>核心配置文件</span></a></h2><table><thead><tr><th>文件</th><th>路径</th><th>作用</th></tr></thead><tbody><tr><td><code>postgresql.conf</code></td><td><code>/etc/postgresql/16/main/postgresql.conf</code></td><td>主配置</td></tr><tr><td><code>pg_hba.conf</code></td><td><code>/etc/postgresql/16/main/pg_hba.conf</code></td><td>客户端认证</td></tr><tr><td><code>pg_ident.conf</code></td><td><code>/etc/postgresql/16/main/pg_ident.conf</code></td><td>用户名映射</td></tr></tbody></table><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 开启远程访问</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">vim</span> /etc/postgresql/16/main/postgresql.conf</span>
<span class="line"></span></code></pre></div><div class="language-conf" data-highlighter="prismjs" data-ext="conf"><pre><code class="language-conf"><span class="line">listen_addresses = &#39;*&#39;</span>
<span class="line">port = 5432</span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">sudo</span> <span class="token function">vim</span> /etc/postgresql/16/main/pg_hba.conf</span>
<span class="line"></span></code></pre></div><div class="language-conf" data-highlighter="prismjs" data-ext="conf"><pre><code class="language-conf"><span class="line"># 允许任何用户从任何 IP 连接</span>
<span class="line">host all all 0.0.0.0/0 scram-sha-256</span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">sudo</span> systemctl restart postgresql</span>
<span class="line"></span></code></pre></div><h2 id="常见连接问题" tabindex="-1"><a class="header-anchor" href="#常见连接问题"><span>常见连接问题</span></a></h2><h3 id="_1-no-pg-hba-conf-entry" tabindex="-1"><a class="header-anchor" href="#_1-no-pg-hba-conf-entry"><span>1. no pg_hba.conf entry</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">FATAL: no pg_hba.conf entry for host &quot;192.168.1.100&quot;</span>
<span class="line"></span></code></pre></div><p><strong>解决：</strong> 在 <code>pg_hba.conf</code> 中添加：</p><div class="language-conf" data-highlighter="prismjs" data-ext="conf"><pre><code class="language-conf"><span class="line">host all all 0.0.0.0/0 scram-sha-256</span>
<span class="line"></span></code></pre></div><h3 id="_2-密码认证失败" tabindex="-1"><a class="header-anchor" href="#_2-密码认证失败"><span>2. 密码认证失败</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 修改密码</span></span>
<span class="line">psql <span class="token parameter variable">-U</span> postgres</span>
<span class="line">ALTER <span class="token environment constant">USER</span> postgres WITH PASSWORD <span class="token string">&#39;newpassword&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h3 id="_3-找不到-postgres-角色" tabindex="-1"><a class="header-anchor" href="#_3-找不到-postgres-角色"><span>3. 找不到 postgres 角色</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 创建角色</span></span>
<span class="line">createuser <span class="token parameter variable">-s</span> <span class="token parameter variable">-r</span> postgres</span>
<span class="line"></span></code></pre></div><h2 id="练习" tabindex="-1"><a class="header-anchor" href="#练习"><span>练习</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 使用 Docker 启动 PostgreSQL</span></span>
<span class="line"><span class="token comment"># 2. 创建数据库 myapp</span></span>
<span class="line"><span class="token comment"># 3. 创建表 employees (id, name, salary, department, hired_date)</span></span>
<span class="line"><span class="token comment"># 4. 使用 psql 连接并插入测试数据</span></span>
<span class="line"></span></code></pre></div>`,43)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};