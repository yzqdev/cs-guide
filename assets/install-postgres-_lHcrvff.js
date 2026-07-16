import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/java-tutor/orm-tutor/pgsql/install-postgres.html","title":"PostgreSQL 安装与快速入门","lang":"zh-CN","frontmatter":{"description":"PostgreSQL 安装与快速入门 PostgreSQL 是一个功能强大的开源关系型数据库，支持 JSON、全文检索、窗口函数等高级特性。 安装 PostgreSQL Windows 安装 从 PostgreSQL 官网 下载安装包 运行安装程序，按向导完成安装 安装过程中设置 postgres 超级用户密码 默认端口为 5432 勾选安装 pgAd...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"PostgreSQL 安装与快速入门\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T07:23:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/pgsql/install-postgres.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"PostgreSQL 安装与快速入门"}],["meta",{"property":"og:description","content":"PostgreSQL 安装与快速入门 PostgreSQL 是一个功能强大的开源关系型数据库，支持 JSON、全文检索、窗口函数等高级特性。 安装 PostgreSQL Windows 安装 从 PostgreSQL 官网 下载安装包 运行安装程序，按向导完成安装 安装过程中设置 postgres 超级用户密码 默认端口为 5432 勾选安装 pgAd..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T07:23:11.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T07:23:11.000Z"}]]},"git":{"createdTime":1651226307000,"updatedTime":1783927391000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":7,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.86,"words":858},"filePathRelative":"java-tutor/orm-tutor/pgsql/install-postgres.md","autoDesc":true}`),a={name:`install-postgres.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="postgresql-安装与快速入门" tabindex="-1"><a class="header-anchor" href="#postgresql-安装与快速入门"><span>PostgreSQL 安装与快速入门</span></a></h1><blockquote><p>PostgreSQL 是一个功能强大的开源关系型数据库，支持 JSON、全文检索、窗口函数等高级特性。</p></blockquote><h2 id="安装-postgresql" tabindex="-1"><a class="header-anchor" href="#安装-postgresql"><span>安装 PostgreSQL</span></a></h2><h3 id="windows-安装" tabindex="-1"><a class="header-anchor" href="#windows-安装"><span>Windows 安装</span></a></h3><ol><li>从 <a href="https://www.postgresql.org/download/windows/" target="_blank" rel="noopener noreferrer">PostgreSQL 官网</a> 下载安装包</li><li>运行安装程序，按向导完成安装</li><li>安装过程中设置 postgres 超级用户密码</li><li>默认端口为 <strong>5432</strong></li><li>勾选安装 pgAdmin 4（图形化管理工具）</li></ol><h3 id="macos-安装" tabindex="-1"><a class="header-anchor" href="#macos-安装"><span>macOS 安装</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 使用 Homebrew（推荐）</span></span>
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
<span class="line"></span>
<span class="line"><span class="token comment"># 开机自启</span></span>
<span class="line"><span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> postgresql</span>
<span class="line"></span></code></pre></div><h3 id="docker-安装-推荐开发环境" tabindex="-1"><a class="header-anchor" href="#docker-安装-推荐开发环境"><span>Docker 安装（推荐开发环境）</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 拉取并启动</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--name</span> pg16 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">POSTGRES_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">POSTGRES_DB</span><span class="token operator">=</span>testdb <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">5432</span>:5432 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> postgres:16</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 进入容器</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> pg16 psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> testdb</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 挂载数据卷（持久化存储）</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--name</span> pg16 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> pgdata:/var/lib/postgresql/data <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">POSTGRES_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">5432</span>:5432 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> postgres:16</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置-postgresql" tabindex="-1"><a class="header-anchor" href="#配置-postgresql"><span>配置 PostgreSQL</span></a></h2><h3 id="核心配置文件" tabindex="-1"><a class="header-anchor" href="#核心配置文件"><span>核心配置文件</span></a></h3><table><thead><tr><th>文件</th><th>路径</th><th>作用</th></tr></thead><tbody><tr><td><code>postgresql.conf</code></td><td><code>/etc/postgresql/16/main/postgresql.conf</code></td><td>主配置（监听地址、内存、日志等）</td></tr><tr><td><code>pg_hba.conf</code></td><td><code>/etc/postgresql/16/main/pg_hba.conf</code></td><td>客户端认证配置</td></tr><tr><td><code>pg_ident.conf</code></td><td><code>/etc/postgresql/16/main/pg_ident.conf</code></td><td>用户名映射</td></tr></tbody></table><h3 id="开启远程访问" tabindex="-1"><a class="header-anchor" href="#开启远程访问"><span>开启远程访问</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 修改 postgresql.conf，监听所有地址</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">vim</span> /etc/postgresql/16/main/postgresql.conf</span>
<span class="line"></span></code></pre></div><div class="language-conf" data-highlighter="prismjs" data-ext="conf"><pre><code class="language-conf"><span class="line">listen_addresses = &#39;*&#39;</span>
<span class="line">port = 5432</span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 2. 修改 pg_hba.conf，允许远程连接</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">vim</span> /etc/postgresql/16/main/pg_hba.conf</span>
<span class="line"></span></code></pre></div><div class="language-conf" data-highlighter="prismjs" data-ext="conf"><pre><code class="language-conf"><span class="line"># 格式: TYPE  DATABASE  USER  ADDRESS  METHOD</span>
<span class="line"># 允许任何用户从任何 IP 通过密码连接任何数据库</span>
<span class="line">host    all             all             0.0.0.0/0               scram-sha-256</span>
<span class="line"># 或者使用 md5（兼容旧客户端）</span>
<span class="line">host    all             all             0.0.0.0/0               md5</span>
<span class="line"></span></code></pre></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 3. 重启服务</span></span>
<span class="line"><span class="token function">sudo</span> systemctl restart postgresql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 检查监听状态</span></span>
<span class="line"><span class="token function">netstat</span> <span class="token parameter variable">-an</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">5432</span></span>
<span class="line"></span></code></pre></div><h2 id="连接-postgresql" tabindex="-1"><a class="header-anchor" href="#连接-postgresql"><span>连接 PostgreSQL</span></a></h2><h3 id="使用-psql-命令行" tabindex="-1"><a class="header-anchor" href="#使用-psql-命令行"><span>使用 psql 命令行</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 连接本地数据库</span></span>
<span class="line">psql <span class="token parameter variable">-U</span> postgres</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 连接到指定数据库</span></span>
<span class="line">psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> mydb <span class="token parameter variable">-h</span> localhost <span class="token parameter variable">-p</span> <span class="token number">5432</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 执行 SQL 并退出</span></span>
<span class="line">psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> mydb <span class="token parameter variable">-c</span> <span class="token string">&quot;SELECT version();&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 执行 SQL 文件</span></span>
<span class="line">psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> mydb <span class="token parameter variable">-f</span> script.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Windows PowerShell 中设置密码（避免交互）</span></span>
<span class="line"><span class="token variable">$env</span>:PGPASSWORD<span class="token operator">=</span><span class="token string">&#39;123456&#39;</span><span class="token punctuation">;</span> psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> mydb <span class="token parameter variable">-c</span> <span class="token string">&quot;SELECT 1&quot;</span></span>
<span class="line"></span></code></pre></div><h3 id="使用-pgadmin-4" tabindex="-1"><a class="header-anchor" href="#使用-pgadmin-4"><span>使用 pgAdmin 4</span></a></h3><p>安装后访问 <code>http://localhost:54321/browser/</code>，添加服务器连接：</p><table><thead><tr><th>字段</th><th>值</th></tr></thead><tbody><tr><td>地址</td><td><code>localhost</code></td></tr><tr><td>端口</td><td><code>5432</code></td></tr><tr><td>用户名</td><td><code>postgres</code></td></tr><tr><td>密码</td><td>安装时设置的密码</td></tr></tbody></table><h3 id="使用-dbeaver-navicat" tabindex="-1"><a class="header-anchor" href="#使用-dbeaver-navicat"><span>使用 DBeaver / Navicat</span></a></h3><p>推荐使用 DBeaver（免费、跨平台），连接方式同上。</p><h2 id="创建第一个数据库" tabindex="-1"><a class="header-anchor" href="#创建第一个数据库"><span>创建第一个数据库</span></a></h2><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 查看现有数据库</span></span>
<span class="line">\\l</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 创建数据库</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> mydb<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 切换到数据库</span></span>
<span class="line">\\c mydb</span>
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
<span class="line"><span class="token comment">-- 插入数据</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> users <span class="token punctuation">(</span>name<span class="token punctuation">,</span> email<span class="token punctuation">,</span> age<span class="token punctuation">)</span> <span class="token keyword">VALUES</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">&#39;张三&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;zhangsan@test.com&#39;</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">&#39;李四&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;lisi@test.com&#39;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查询</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看表结构</span></span>
<span class="line">\\d users</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="服务管理命令" tabindex="-1"><a class="header-anchor" href="#服务管理命令"><span>服务管理命令</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># systemd（Ubuntu/Debian/CentOS 7+）</span></span>
<span class="line"><span class="token function">sudo</span> systemctl start postgresql</span>
<span class="line"><span class="token function">sudo</span> systemctl stop postgresql</span>
<span class="line"><span class="token function">sudo</span> systemctl restart postgresql</span>
<span class="line"><span class="token function">sudo</span> systemctl status postgresql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># SysV init</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">service</span> postgresql start</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">service</span> postgresql stop</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">service</span> postgresql restart</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Windows（以管理员身份运行）</span></span>
<span class="line">net start postgresql-16</span>
<span class="line">net stop postgresql-16</span>
<span class="line"></span></code></pre></div><h2 id="卸载-postgresql" tabindex="-1"><a class="header-anchor" href="#卸载-postgresql"><span>卸载 PostgreSQL</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># Ubuntu/Debian</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">service</span> postgresql stop</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token parameter variable">--purge</span> remove postgresql<span class="token punctuation">\\</span>*</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /etc/postgresql/</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/postgresql/</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">userdel</span> <span class="token parameter variable">-r</span> postgres</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">groupdel</span> postgres</span>
<span class="line"></span></code></pre></div><h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题"><span>常见问题</span></a></h2><h3 id="连接被拒绝-没有-pg-hba-conf-条目" tabindex="-1"><a class="header-anchor" href="#连接被拒绝-没有-pg-hba-conf-条目"><span>连接被拒绝：没有 pg_hba.conf 条目</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">FATAL: no pg_hba.conf entry for host &quot;192.168.1.100&quot;</span>
<span class="line"></span></code></pre></div><p><strong>解决：</strong> 在 <code>pg_hba.conf</code> 中添加：</p><div class="language-conf" data-highlighter="prismjs" data-ext="conf"><pre><code class="language-conf"><span class="line">host all all 0.0.0.0/0 scram-sha-256</span>
<span class="line"></span></code></pre></div><h3 id="密码认证失败" tabindex="-1"><a class="header-anchor" href="#密码认证失败"><span>密码认证失败</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 方法一：在 psql 中修改密码</span></span>
<span class="line">psql <span class="token parameter variable">-U</span> postgres</span>
<span class="line">ALTER <span class="token environment constant">USER</span> postgres WITH PASSWORD <span class="token string">&#39;newpassword&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方法二：重置 Linux 用户 postgres 的密码</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">passwd</span> <span class="token parameter variable">-d</span> postgres</span>
<span class="line"><span class="token function">sudo</span> <span class="token parameter variable">-u</span> postgres <span class="token function">passwd</span></span>
<span class="line"></span></code></pre></div><h3 id="端口被占用" tabindex="-1"><a class="header-anchor" href="#端口被占用"><span>端口被占用</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看端口占用</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">lsof</span> <span class="token parameter variable">-i</span> :5432</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改端口：在 postgresql.conf 中修改 port 字段</span></span>
<span class="line">port <span class="token operator">=</span> <span class="token number">5433</span></span>
<span class="line"></span></code></pre></div>`,43)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};