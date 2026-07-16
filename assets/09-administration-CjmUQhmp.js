import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/java-tutor/orm-tutor/mysql/09-administration.html","title":"MySQL 管理维护","lang":"zh-CN","frontmatter":{"description":"MySQL 管理维护 用户权限、备份恢复、主从复制、Docker 运维等日常管理技能。 用户与权限 用户管理 权限管理 权限层级 常用权限模板 备份与恢复 mysqldump 恢复 备份脚本 主从复制 基本原理 配置主库 配置从库 Docker 运维 重置密码 Windows Linux 日常检查 练习","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL 管理维护\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T07:23:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/mysql/09-administration.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"MySQL 管理维护"}],["meta",{"property":"og:description","content":"MySQL 管理维护 用户权限、备份恢复、主从复制、Docker 运维等日常管理技能。 用户与权限 用户管理 权限管理 权限层级 常用权限模板 备份与恢复 mysqldump 恢复 备份脚本 主从复制 基本原理 配置主库 配置从库 Docker 运维 重置密码 Windows Linux 日常检查 练习"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T07:23:11.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T07:23:11.000Z"}]]},"git":{"createdTime":1783927391000,"updatedTime":1783927391000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.8,"words":1139},"filePathRelative":"java-tutor/orm-tutor/mysql/09-administration.md","autoDesc":true}`),a={name:`09-administration.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="mysql-管理维护" tabindex="-1"><a class="header-anchor" href="#mysql-管理维护"><span>MySQL 管理维护</span></a></h1><blockquote><p>用户权限、备份恢复、主从复制、Docker 运维等日常管理技能。</p></blockquote><h2 id="用户与权限" tabindex="-1"><a class="header-anchor" href="#用户与权限"><span>用户与权限</span></a></h2><h3 id="用户管理" tabindex="-1"><a class="header-anchor" href="#用户管理"><span>用户管理</span></a></h3><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 创建用户</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">USER</span> <span class="token string">&#39;app_user&#39;</span><span class="token variable">@&#39;localhost&#39;</span> IDENTIFIED <span class="token keyword">BY</span> <span class="token string">&#39;password123&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">USER</span> <span class="token string">&#39;app_user&#39;</span><span class="token variable">@&#39;%&#39;</span> IDENTIFIED <span class="token keyword">BY</span> <span class="token string">&#39;password123&#39;</span><span class="token punctuation">;</span>  <span class="token comment">-- 可从任何 IP 连接</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看用户</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token keyword">user</span><span class="token punctuation">,</span> host<span class="token punctuation">,</span> plugin <span class="token keyword">FROM</span> mysql<span class="token punctuation">.</span><span class="token keyword">user</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 修改密码</span></span>
<span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">USER</span> <span class="token string">&#39;app_user&#39;</span><span class="token variable">@&#39;localhost&#39;</span> IDENTIFIED <span class="token keyword">BY</span> <span class="token string">&#39;new_password&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 删除用户</span></span>
<span class="line"><span class="token keyword">DROP</span> <span class="token keyword">USER</span> <span class="token string">&#39;app_user&#39;</span><span class="token variable">@&#39;localhost&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h3 id="权限管理" tabindex="-1"><a class="header-anchor" href="#权限管理"><span>权限管理</span></a></h3><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 授予权限</span></span>
<span class="line"><span class="token comment">-- 全部权限</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">ALL</span> <span class="token keyword">PRIVILEGES</span> <span class="token keyword">ON</span> testdb<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">&#39;app_user&#39;</span><span class="token variable">@&#39;localhost&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 只读权限</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">SELECT</span> <span class="token keyword">ON</span> testdb<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">&#39;readonly&#39;</span><span class="token variable">@&#39;%&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 部分权限</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">SELECT</span><span class="token punctuation">,</span> <span class="token keyword">INSERT</span><span class="token punctuation">,</span> <span class="token keyword">UPDATE</span><span class="token punctuation">,</span> <span class="token keyword">DELETE</span> <span class="token keyword">ON</span> testdb<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">&#39;editor&#39;</span><span class="token variable">@&#39;%&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 只允许查看特定列</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">SELECT</span> <span class="token punctuation">(</span>id<span class="token punctuation">,</span> username<span class="token punctuation">)</span> <span class="token keyword">ON</span> testdb<span class="token punctuation">.</span>users <span class="token keyword">TO</span> <span class="token string">&#39;analyst&#39;</span><span class="token variable">@&#39;%&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 授予创建临时表等高级权限</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">CREATE</span> <span class="token keyword">TEMPORARY</span> <span class="token keyword">TABLES</span> <span class="token keyword">ON</span> testdb<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">&#39;app_user&#39;</span><span class="token variable">@&#39;localhost&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 刷新权限</span></span>
<span class="line">FLUSH <span class="token keyword">PRIVILEGES</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看权限</span></span>
<span class="line"><span class="token keyword">SHOW</span> GRANTS <span class="token keyword">FOR</span> <span class="token string">&#39;app_user&#39;</span><span class="token variable">@&#39;localhost&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 撤销权限</span></span>
<span class="line"><span class="token keyword">REVOKE</span> <span class="token keyword">DELETE</span> <span class="token keyword">ON</span> testdb<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token string">&#39;editor&#39;</span><span class="token variable">@&#39;%&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="权限层级" tabindex="-1"><a class="header-anchor" href="#权限层级"><span>权限层级</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">全局（*.*）</span>
<span class="line">  └── 数据库（db_name.*）</span>
<span class="line">      └── 表（db_name.table）</span>
<span class="line">          └── 列（db_name.table.column）</span>
<span class="line"></span></code></pre></div><h3 id="常用权限模板" tabindex="-1"><a class="header-anchor" href="#常用权限模板"><span>常用权限模板</span></a></h3><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 管理员：所有权限</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">ALL</span> <span class="token keyword">PRIVILEGES</span> <span class="token keyword">ON</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">&#39;admin&#39;</span><span class="token variable">@&#39;localhost&#39;</span> <span class="token keyword">WITH</span> <span class="token keyword">GRANT</span> <span class="token keyword">OPTION</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 开发者：所有权限，但仅限于指定数据库</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">ALL</span> <span class="token keyword">PRIVILEGES</span> <span class="token keyword">ON</span> devdb<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">&#39;developer&#39;</span><span class="token variable">@&#39;%&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 应用用户：增删改查</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">SELECT</span><span class="token punctuation">,</span> <span class="token keyword">INSERT</span><span class="token punctuation">,</span> <span class="token keyword">UPDATE</span><span class="token punctuation">,</span> <span class="token keyword">DELETE</span> <span class="token keyword">ON</span> appdb<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">&#39;app_user&#39;</span><span class="token variable">@&#39;%&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 只读用户：仅查询</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">SELECT</span> <span class="token keyword">ON</span> appdb<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">&#39;readonly&#39;</span><span class="token variable">@&#39;%&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 备份用户：LOCK TABLES + SELECT</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">LOCK</span> <span class="token keyword">TABLES</span><span class="token punctuation">,</span> <span class="token keyword">SELECT</span> <span class="token keyword">ON</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">&#39;backup&#39;</span><span class="token variable">@&#39;localhost&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h2 id="备份与恢复" tabindex="-1"><a class="header-anchor" href="#备份与恢复"><span>备份与恢复</span></a></h2><h3 id="mysqldump" tabindex="-1"><a class="header-anchor" href="#mysqldump"><span>mysqldump</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 备份单个数据库</span></span>
<span class="line">mysqldump <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> testdb <span class="token operator">&gt;</span> testdb_backup.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 备份多个数据库</span></span>
<span class="line">mysqldump <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> <span class="token parameter variable">--databases</span> db1 db2 <span class="token operator">&gt;</span> dbs_backup.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 备份所有数据库</span></span>
<span class="line">mysqldump <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> --all-databases <span class="token operator">&gt;</span> all_backup.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 只备份数据（不含建表语句）</span></span>
<span class="line">mysqldump <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> --no-create-info testdb <span class="token operator">&gt;</span> data.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 只备份结构（不含数据）</span></span>
<span class="line">mysqldump <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> --no-data testdb <span class="token operator">&gt;</span> schema.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 压缩备份（推荐）</span></span>
<span class="line">mysqldump <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> testdb <span class="token operator">|</span> <span class="token function">gzip</span> <span class="token operator">&gt;</span> testdb_<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y%m%d<span class="token variable">)</span></span>.sql.gz</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Windows PowerShell</span></span>
<span class="line">mysqldump <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> testdb <span class="token operator">|</span> Out-File <span class="token parameter variable">-Encoding</span> UTF8 testdb_backup.sql</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="恢复" tabindex="-1"><a class="header-anchor" href="#恢复"><span>恢复</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 恢复整个数据库</span></span>
<span class="line">mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> testdb <span class="token operator">&lt;</span> testdb_backup.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 从压缩文件恢复</span></span>
<span class="line">gunzip <span class="token operator">&lt;</span> testdb_20240115.sql.gz <span class="token operator">|</span> mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> testdb</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 恢复所有数据库</span></span>
<span class="line">mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> <span class="token operator">&lt;</span> all_backup.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Windows PowerShell</span></span>
<span class="line">Get-Content testdb_backup.sql <span class="token operator">|</span> mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> testdb</span>
<span class="line"></span></code></pre></div><h3 id="备份脚本" tabindex="-1"><a class="header-anchor" href="#备份脚本"><span>备份脚本</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># backup.sh — 每天凌晨执行</span></span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">BACKUP_DIR</span><span class="token operator">=</span><span class="token string">&quot;/backup/mysql&quot;</span></span>
<span class="line"><span class="token assign-left variable">DB_NAME</span><span class="token operator">=</span><span class="token string">&quot;testdb&quot;</span></span>
<span class="line"><span class="token assign-left variable">DATE</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y%m%d_%H%M%S<span class="token variable">)</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建备份目录</span></span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;<span class="token variable">$BACKUP_DIR</span>&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 备份</span></span>
<span class="line">mysqldump <span class="token parameter variable">-u</span> root -p<span class="token string">&quot;<span class="token variable">$MYSQL_ROOT_PASSWORD</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$DB_NAME</span>&quot;</span> <span class="token operator">|</span> <span class="token function">gzip</span> <span class="token operator">&gt;</span> <span class="token string">&quot;<span class="token variable">$BACKUP_DIR</span>/<span class="token variable">\${DB_NAME}</span>_<span class="token variable">\${DATE}</span>.sql.gz&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除 30 天前的备份</span></span>
<span class="line"><span class="token function">find</span> <span class="token string">&quot;<span class="token variable">$BACKUP_DIR</span>&quot;</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;*.sql.gz&quot;</span> <span class="token parameter variable">-mtime</span> +30 <span class="token parameter variable">-delete</span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token string">&quot;[<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span><span class="token variable">)</span></span>] Backup completed: <span class="token variable">\${DB_NAME}</span>_<span class="token variable">\${DATE}</span>.sql.gz&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># crontab — 每天凌晨 2 点执行</span></span>
<span class="line"><span class="token number">0</span> <span class="token number">2</span> * * * /usr/local/bin/backup.sh</span>
<span class="line"></span></code></pre></div><h2 id="主从复制" tabindex="-1"><a class="header-anchor" href="#主从复制"><span>主从复制</span></a></h2><h3 id="基本原理" tabindex="-1"><a class="header-anchor" href="#基本原理"><span>基本原理</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">主库（Master）→ 写入 binlog → 从库（Slave）→ 读取 binlog → 写入 relay log → 执行 SQL</span>
<span class="line"></span></code></pre></div><h3 id="配置主库" tabindex="-1"><a class="header-anchor" href="#配置主库"><span>配置主库</span></a></h3><div class="language-ini" data-highlighter="prismjs" data-ext="ini"><pre><code class="language-ini"><span class="line"><span class="token comment"># my.cnf — 主库</span></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqld</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">server-id</span> <span class="token punctuation">=</span> <span class="token value attr-value">1</span></span>
<span class="line"><span class="token key attr-name">log_bin</span> <span class="token punctuation">=</span> <span class="token value attr-value">/var/log/mysql/mysql-bin.log</span></span>
<span class="line"><span class="token key attr-name">binlog_do_db</span> <span class="token punctuation">=</span> <span class="token value attr-value">testdb      # 要复制的数据库</span></span>
<span class="line"></span></code></pre></div><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 创建复制用户</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">USER</span> <span class="token string">&#39;repl&#39;</span><span class="token variable">@&#39;%&#39;</span> IDENTIFIED <span class="token keyword">BY</span> <span class="token string">&#39;repl_password&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">GRANT</span> <span class="token keyword">REPLICATION</span> SLAVE <span class="token keyword">ON</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">TO</span> <span class="token string">&#39;repl&#39;</span><span class="token variable">@&#39;%&#39;</span><span class="token punctuation">;</span></span>
<span class="line">FLUSH <span class="token keyword">PRIVILEGES</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看主库状态（记录 File 和 Position）</span></span>
<span class="line"><span class="token keyword">SHOW</span> MASTER <span class="token keyword">STATUS</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h3 id="配置从库" tabindex="-1"><a class="header-anchor" href="#配置从库"><span>配置从库</span></a></h3><div class="language-ini" data-highlighter="prismjs" data-ext="ini"><pre><code class="language-ini"><span class="line"><span class="token comment"># my.cnf — 从库</span></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">mysqld</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">server-id</span> <span class="token punctuation">=</span> <span class="token value attr-value">2</span></span>
<span class="line"><span class="token key attr-name">relay_log</span> <span class="token punctuation">=</span> <span class="token value attr-value">/var/log/mysql/mysql-relay-bin.log</span></span>
<span class="line"><span class="token key attr-name">read_only</span> <span class="token punctuation">=</span> <span class="token value attr-value">1               # 从库只读</span></span>
<span class="line"></span></code></pre></div><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 在从库上设置主库信息</span></span>
<span class="line">CHANGE MASTER <span class="token keyword">TO</span></span>
<span class="line">    MASTER_HOST<span class="token operator">=</span><span class="token string">&#39;192.168.1.1&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    MASTER_USER<span class="token operator">=</span><span class="token string">&#39;repl&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    MASTER_PASSWORD<span class="token operator">=</span><span class="token string">&#39;repl_password&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    MASTER_LOG_FILE<span class="token operator">=</span><span class="token string">&#39;mysql-bin.000001&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    MASTER_LOG_POS<span class="token operator">=</span><span class="token number">123</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 启动复制</span></span>
<span class="line"><span class="token keyword">START</span> SLAVE<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看同步状态</span></span>
<span class="line"><span class="token keyword">SHOW</span> SLAVE <span class="token keyword">STATUS</span>\\G</span>
<span class="line"><span class="token comment">-- 关键字段：</span></span>
<span class="line"><span class="token comment">-- Slave_IO_Running: Yes</span></span>
<span class="line"><span class="token comment">-- Slave_SQL_Running: Yes</span></span>
<span class="line"><span class="token comment">-- Seconds_Behind_Master: 0（延迟秒数）</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-运维" tabindex="-1"><a class="header-anchor" href="#docker-运维"><span>Docker 运维</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 启动 MySQL 容器</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--name</span> mysql8 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> mysql:8.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 指定配置文件</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--name</span> mysql8 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> /my/custom:/etc/mysql/conf.d <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> mysql_data:/var/lib/mysql <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> mysql:8.0</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 进入容器</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mysql8 <span class="token function">bash</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 在容器内执行命令</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mysql8 mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123456</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 备份容器中的数据库</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> mysql8 mysqldump <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123456</span> testdb <span class="token operator">&gt;</span> backup.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 恢复</span></span>
<span class="line"><span class="token function">cat</span> backup.sql <span class="token operator">|</span> <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-i</span> mysql8 mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123456</span> testdb</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看日志</span></span>
<span class="line"><span class="token function">docker</span> logs mysql8</span>
<span class="line"><span class="token function">docker</span> logs <span class="token parameter variable">-f</span> mysql8  <span class="token comment"># 实时跟踪</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 停止/启动</span></span>
<span class="line"><span class="token function">docker</span> stop mysql8</span>
<span class="line"><span class="token function">docker</span> start mysql8</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="重置密码" tabindex="-1"><a class="header-anchor" href="#重置密码"><span>重置密码</span></a></h2><h3 id="windows" tabindex="-1"><a class="header-anchor" href="#windows"><span>Windows</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 停止 MySQL 服务</span></span>
<span class="line">net stop mysql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 跳过授权表启动</span></span>
<span class="line">mysqld --skip-grant-tables --shared-memory</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 另开终端登录</span></span>
<span class="line">mysql <span class="token parameter variable">-u</span> root</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 重置密码</span></span>
<span class="line">FLUSH PRIVILEGES<span class="token punctuation">;</span></span>
<span class="line">ALTER <span class="token environment constant">USER</span> <span class="token string">&#39;root&#39;</span>@<span class="token string">&#39;localhost&#39;</span> IDENTIFIED BY <span class="token string">&#39;new_password&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h3 id="linux" tabindex="-1"><a class="header-anchor" href="#linux"><span>Linux</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 停止 MySQL</span></span>
<span class="line"><span class="token function">sudo</span> systemctl stop mysql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 跳过授权表启动</span></span>
<span class="line"><span class="token function">sudo</span> mysqld_safe --skip-grant-tables <span class="token operator">&amp;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 登录并重置</span></span>
<span class="line">mysql <span class="token parameter variable">-u</span> root</span>
<span class="line">FLUSH PRIVILEGES<span class="token punctuation">;</span></span>
<span class="line">ALTER <span class="token environment constant">USER</span> <span class="token string">&#39;root&#39;</span>@<span class="token string">&#39;localhost&#39;</span> IDENTIFIED BY <span class="token string">&#39;new_password&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 重启正常模式</span></span>
<span class="line"><span class="token function">sudo</span> systemctl restart mysql</span>
<span class="line"></span></code></pre></div><h2 id="日常检查" tabindex="-1"><a class="header-anchor" href="#日常检查"><span>日常检查</span></a></h2><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 1. 检查连接数</span></span>
<span class="line"><span class="token keyword">SHOW</span> <span class="token keyword">STATUS</span> <span class="token operator">LIKE</span> <span class="token string">&#39;Threads_connected&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SHOW</span> VARIABLES <span class="token operator">LIKE</span> <span class="token string">&#39;max_connections&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 2. 检查运行时间</span></span>
<span class="line"><span class="token keyword">SHOW</span> <span class="token keyword">STATUS</span> <span class="token operator">LIKE</span> <span class="token string">&#39;Uptime&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 3. 检查慢查询</span></span>
<span class="line"><span class="token keyword">SHOW</span> <span class="token keyword">STATUS</span> <span class="token operator">LIKE</span> <span class="token string">&#39;Slow_queries&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 4. 检查死锁</span></span>
<span class="line"><span class="token keyword">SHOW</span> <span class="token keyword">ENGINE</span> <span class="token keyword">INNODB</span> <span class="token keyword">STATUS</span>\\G</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 5. 数据库大小</span></span>
<span class="line"><span class="token keyword">SELECT</span></span>
<span class="line">    table_schema <span class="token keyword">AS</span> database_name<span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">ROUND</span><span class="token punctuation">(</span><span class="token function">SUM</span><span class="token punctuation">(</span>data_length <span class="token operator">+</span> index_length<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1024</span> <span class="token operator">/</span> <span class="token number">1024</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> size_mb</span>
<span class="line"><span class="token keyword">FROM</span> information_schema<span class="token punctuation">.</span><span class="token keyword">TABLES</span></span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> table_schema<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 6. 表大小排行</span></span>
<span class="line"><span class="token keyword">SELECT</span></span>
<span class="line">    TABLE_NAME<span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">ROUND</span><span class="token punctuation">(</span><span class="token punctuation">(</span>DATA_LENGTH <span class="token operator">+</span> INDEX_LENGTH<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1024</span> <span class="token operator">/</span> <span class="token number">1024</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> size_mb</span>
<span class="line"><span class="token keyword">FROM</span> information_schema<span class="token punctuation">.</span><span class="token keyword">TABLES</span></span>
<span class="line"><span class="token keyword">WHERE</span> TABLE_SCHEMA <span class="token operator">=</span> <span class="token string">&#39;testdb&#39;</span></span>
<span class="line"><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token punctuation">(</span>DATA_LENGTH <span class="token operator">+</span> INDEX_LENGTH<span class="token punctuation">)</span> <span class="token keyword">DESC</span></span>
<span class="line"><span class="token keyword">LIMIT</span> <span class="token number">10</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="练习" tabindex="-1"><a class="header-anchor" href="#练习"><span>练习</span></a></h2><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 1. 创建只读用户 analyst，只能查询 testdb 库</span></span>
<span class="line"><span class="token comment">-- 2. 使用 mysqldump 备份 testdb 并压缩</span></span>
<span class="line"><span class="token comment">-- 3. 备份后删除一条数据，再从备份恢复</span></span>
<span class="line"><span class="token comment">-- 4. 查看 testdb 中最大的 3 张表</span></span>
<span class="line"><span class="token comment">-- 5. 用 Docker 启动一个 MySQL 实例</span></span>
<span class="line"></span></code></pre></div>`,39)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};