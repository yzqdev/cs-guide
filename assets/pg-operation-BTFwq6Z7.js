import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/java-tutor/orm-tutor/pgsql/pg-operation.html","title":"PostgreSQL 基本操作","lang":"zh-CN","frontmatter":{"description":"PostgreSQL 基本操作 从连接到日常 CRUD 操作，掌握 PostgreSQL 的核心 SQL。 psql 交互命令 psql 是 PostgreSQL 自带的命令行工具，以 \\\\ 开头的命令是元命令（meta-command）： 信息查询 连接与切换 显示设置 环境变量 数据库管理 表管理 数据操作（CRUD） INSERT SELECT U...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"PostgreSQL 基本操作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T07:23:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/pgsql/pg-operation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"PostgreSQL 基本操作"}],["meta",{"property":"og:description","content":"PostgreSQL 基本操作 从连接到日常 CRUD 操作，掌握 PostgreSQL 的核心 SQL。 psql 交互命令 psql 是 PostgreSQL 自带的命令行工具，以 \\\\ 开头的命令是元命令（meta-command）： 信息查询 连接与切换 显示设置 环境变量 数据库管理 表管理 数据操作（CRUD） INSERT SELECT U..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T07:23:11.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T07:23:11.000Z"}]]},"git":{"createdTime":1695234758000,"updatedTime":1783927391000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":6,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":5.83,"words":1749},"filePathRelative":"java-tutor/orm-tutor/pgsql/pg-operation.md","autoDesc":true}`),a={name:`pg-operation.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="postgresql-基本操作" tabindex="-1"><a class="header-anchor" href="#postgresql-基本操作"><span>PostgreSQL 基本操作</span></a></h1><blockquote><p>从连接到日常 CRUD 操作，掌握 PostgreSQL 的核心 SQL。</p></blockquote><h2 id="psql-交互命令" tabindex="-1"><a class="header-anchor" href="#psql-交互命令"><span>psql 交互命令</span></a></h2><p><code>psql</code> 是 PostgreSQL 自带的命令行工具，以 <code>\\</code> 开头的命令是元命令（meta-command）：</p><h3 id="信息查询" tabindex="-1"><a class="header-anchor" href="#信息查询"><span>信息查询</span></a></h3><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 查看所有数据库</span></span>
<span class="line">\\l</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看所有表</span></span>
<span class="line">\\dt</span>
<span class="line">\\dt<span class="token operator">+</span>     <span class="token comment">-- 详细信息（含大小、描述）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看表结构</span></span>
<span class="line">\\d users</span>
<span class="line">\\d<span class="token operator">+</span> users</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看索引</span></span>
<span class="line">\\di</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看序列</span></span>
<span class="line">\\ds</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看视图</span></span>
<span class="line">\\dv</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看函数</span></span>
<span class="line">\\df</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看当前连接信息</span></span>
<span class="line">\\conninfo</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看所有 schema</span></span>
<span class="line">\\dn</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看表空间</span></span>
<span class="line">\\db</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="连接与切换" tabindex="-1"><a class="header-anchor" href="#连接与切换"><span>连接与切换</span></a></h3><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 切换数据库</span></span>
<span class="line">\\c mydb</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 列出当前数据库的连接</span></span>
<span class="line">\\g</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看命令历史</span></span>
<span class="line">\\s</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 执行外部 SQL 文件</span></span>
<span class="line">\\i <span class="token operator">/</span>path<span class="token operator">/</span><span class="token keyword">to</span><span class="token operator">/</span><span class="token keyword">file</span><span class="token punctuation">.</span><span class="token keyword">sql</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 输出查询结果到文件</span></span>
<span class="line">\\o <span class="token operator">/</span>path<span class="token operator">/</span><span class="token keyword">to</span><span class="token operator">/</span>output<span class="token punctuation">.</span>txt</span>
<span class="line"></span></code></pre></div><h3 id="显示设置" tabindex="-1"><a class="header-anchor" href="#显示设置"><span>显示设置</span></a></h3><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 开启查询时间显示</span></span>
<span class="line">\\timing</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 对齐/非对齐输出</span></span>
<span class="line">\\a</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 扩展显示（每行一个字段）</span></span>
<span class="line">\\x</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看当前设置</span></span>
<span class="line">\\<span class="token keyword">set</span></span>
<span class="line"></span></code></pre></div><h2 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量"><span>环境变量</span></a></h2><table><thead><tr><th>变量</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td><code>PGHOST</code></td><td>数据库主机</td><td><code>localhost</code></td></tr><tr><td><code>PGPORT</code></td><td>端口</td><td><code>5432</code></td></tr><tr><td><code>PGDATABASE</code></td><td>默认数据库</td><td><code>mydb</code></td></tr><tr><td><code>PGUSER</code></td><td>用户名</td><td><code>postgres</code></td></tr><tr><td><code>PGPASSWORD</code></td><td>密码</td><td><code>123456</code></td></tr><tr><td><code>PGDATA</code></td><td>数据目录</td><td><code>/var/lib/postgresql/16/data</code></td></tr></tbody></table><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 设置环境变量后，无需每次都指定连接参数</span></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">PGHOST</span><span class="token operator">=</span>localhost</span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">PGPORT</span><span class="token operator">=</span><span class="token number">5432</span></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">PGDATABASE</span><span class="token operator">=</span>mydb</span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">PGUSER</span><span class="token operator">=</span>postgres</span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">PGPASSWORD</span><span class="token operator">=</span><span class="token number">123456</span></span>
<span class="line"></span>
<span class="line">psql  <span class="token comment"># 直接连接</span></span>
<span class="line"></span></code></pre></div><h2 id="数据库管理" tabindex="-1"><a class="header-anchor" href="#数据库管理"><span>数据库管理</span></a></h2><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 创建数据库</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> mydb<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> mydb OWNER postgres ENCODING <span class="token string">&#39;UTF8&#39;</span> LC_COLLATE <span class="token string">&#39;zh_CN.UTF-8&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看数据库列表</span></span>
<span class="line">\\l</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看当前数据库</span></span>
<span class="line"><span class="token keyword">SELECT</span> current_database<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 切换数据库</span></span>
<span class="line">\\c mydb</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看数据库大小</span></span>
<span class="line"><span class="token keyword">SELECT</span> pg_database_size<span class="token punctuation">(</span><span class="token string">&#39;mydb&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> pg_size_pretty<span class="token punctuation">(</span>pg_database_size<span class="token punctuation">(</span><span class="token string">&#39;mydb&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">-- 人性化显示</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 重命名数据库（必须断开连接）</span></span>
<span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">DATABASE</span> mydb <span class="token keyword">RENAME</span> <span class="token keyword">TO</span> newdb<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 删除数据库（必须断开连接）</span></span>
<span class="line"><span class="token keyword">DROP</span> <span class="token keyword">DATABASE</span> mydb<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="表管理" tabindex="-1"><a class="header-anchor" href="#表管理"><span>表管理</span></a></h2><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 创建表</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> students <span class="token punctuation">(</span></span>
<span class="line">    id <span class="token keyword">SERIAL</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">    age <span class="token keyword">INT</span> <span class="token keyword">CHECK</span> <span class="token punctuation">(</span>age <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">AND</span> age <span class="token operator">&lt;</span> <span class="token number">150</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    email <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span> <span class="token keyword">UNIQUE</span><span class="token punctuation">,</span></span>
<span class="line">    score <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token number">0.0</span><span class="token punctuation">,</span></span>
<span class="line">    class_id <span class="token keyword">INT</span> <span class="token keyword">REFERENCES</span> classes<span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">,</span>  <span class="token comment">-- 外键</span></span>
<span class="line">    created_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看所有表</span></span>
<span class="line">\\dt</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看表结构</span></span>
<span class="line">\\d students</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 修改表名</span></span>
<span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> students <span class="token keyword">RENAME</span> <span class="token keyword">TO</span> pupils<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 添加列</span></span>
<span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> students <span class="token keyword">ADD</span> <span class="token keyword">COLUMN</span> phone <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 删除列</span></span>
<span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> students <span class="token keyword">DROP</span> <span class="token keyword">COLUMN</span> phone<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 修改列类型</span></span>
<span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> students <span class="token keyword">ALTER</span> <span class="token keyword">COLUMN</span> score <span class="token keyword">TYPE</span> <span class="token keyword">NUMERIC</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 设置默认值</span></span>
<span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> students <span class="token keyword">ALTER</span> <span class="token keyword">COLUMN</span> score <span class="token keyword">SET</span> <span class="token keyword">DEFAULT</span> <span class="token number">0.0</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 添加 NOT NULL 约束</span></span>
<span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> students <span class="token keyword">ALTER</span> <span class="token keyword">COLUMN</span> email <span class="token keyword">SET</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 添加 CHECK 约束</span></span>
<span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> students <span class="token keyword">ADD</span> <span class="token keyword">CONSTRAINT</span> check_age <span class="token keyword">CHECK</span> <span class="token punctuation">(</span>age <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 删除表</span></span>
<span class="line"><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> students<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> students <span class="token keyword">CASCADE</span><span class="token punctuation">;</span>  <span class="token comment">-- CASCADE 同时删除依赖对象</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据操作-crud" tabindex="-1"><a class="header-anchor" href="#数据操作-crud"><span>数据操作（CRUD）</span></a></h2><h3 id="insert" tabindex="-1"><a class="header-anchor" href="#insert"><span>INSERT</span></a></h3><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 插入单条</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> students <span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> email<span class="token punctuation">,</span> score<span class="token punctuation">,</span> class_id<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">&#39;张三&#39;</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token string">&#39;zhangsan@test.com&#39;</span><span class="token punctuation">,</span> <span class="token number">85.5</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 插入多条</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> students <span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> email<span class="token punctuation">,</span> score<span class="token punctuation">,</span> class_id<span class="token punctuation">)</span> <span class="token keyword">VALUES</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">&#39;李四&#39;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token string">&#39;lisi@test.com&#39;</span><span class="token punctuation">,</span> <span class="token number">92.0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">&#39;王五&#39;</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">,</span> <span class="token string">&#39;wangwu@test.com&#39;</span><span class="token punctuation">,</span> <span class="token number">78.5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">&#39;赵六&#39;</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token string">&#39;zhaoliu@test.com&#39;</span><span class="token punctuation">,</span> <span class="token number">88.0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 插入并从其他表获取数据</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> excellent_students <span class="token punctuation">(</span>name<span class="token punctuation">,</span> score<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">SELECT</span> name<span class="token punctuation">,</span> score <span class="token keyword">FROM</span> students <span class="token keyword">WHERE</span> score <span class="token operator">&gt;=</span> <span class="token number">90</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 插入冲突处理（ON CONFLICT）</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> students <span class="token punctuation">(</span>id<span class="token punctuation">,</span> name<span class="token punctuation">,</span> email<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;张三&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;newemail@test.com&#39;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">ON</span> CONFLICT <span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token keyword">DO</span> <span class="token keyword">UPDATE</span> <span class="token keyword">SET</span> email <span class="token operator">=</span> EXCLUDED<span class="token punctuation">.</span>email<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="select" tabindex="-1"><a class="header-anchor" href="#select"><span>SELECT</span></a></h3><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 基本查询</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> students<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> id<span class="token punctuation">,</span> name<span class="token punctuation">,</span> score <span class="token keyword">FROM</span> students<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 别名</span></span>
<span class="line"><span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>name <span class="token keyword">AS</span> 姓名<span class="token punctuation">,</span> s<span class="token punctuation">.</span>score <span class="token keyword">AS</span> 成绩 <span class="token keyword">FROM</span> students s<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 去重</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> class_id <span class="token keyword">FROM</span> students<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- WHERE 条件</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> students <span class="token keyword">WHERE</span> score <span class="token operator">&gt;=</span> <span class="token number">80</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> students <span class="token keyword">WHERE</span> name <span class="token operator">LIKE</span> <span class="token string">&#39;张%&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> students <span class="token keyword">WHERE</span> age <span class="token operator">BETWEEN</span> <span class="token number">20</span> <span class="token operator">AND</span> <span class="token number">30</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> students <span class="token keyword">WHERE</span> class_id <span class="token operator">IN</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 排序</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> students <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> score <span class="token keyword">DESC</span><span class="token punctuation">,</span> name <span class="token keyword">ASC</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 分页</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> students <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> id <span class="token keyword">LIMIT</span> <span class="token number">10</span> <span class="token keyword">OFFSET</span> <span class="token number">0</span><span class="token punctuation">;</span>  <span class="token comment">-- 第 1 页</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> students <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> id <span class="token keyword">LIMIT</span> <span class="token number">10</span> <span class="token keyword">OFFSET</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token comment">-- 第 2 页</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 聚合</span></span>
<span class="line"><span class="token keyword">SELECT</span></span>
<span class="line">    class_id<span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> student_count<span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">AVG</span><span class="token punctuation">(</span>score<span class="token punctuation">)</span> <span class="token keyword">AS</span> avg_score<span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">MAX</span><span class="token punctuation">(</span>score<span class="token punctuation">)</span> <span class="token keyword">AS</span> max_score<span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">MIN</span><span class="token punctuation">(</span>score<span class="token punctuation">)</span> <span class="token keyword">AS</span> min_score</span>
<span class="line"><span class="token keyword">FROM</span> students</span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> class_id</span>
<span class="line"><span class="token keyword">HAVING</span> <span class="token function">AVG</span><span class="token punctuation">(</span>score<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">80</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 子查询</span></span>
<span class="line"><span class="token keyword">SELECT</span> name<span class="token punctuation">,</span> score <span class="token keyword">FROM</span> students</span>
<span class="line"><span class="token keyword">WHERE</span> score <span class="token operator">&gt;</span> <span class="token punctuation">(</span><span class="token keyword">SELECT</span> <span class="token function">AVG</span><span class="token punctuation">(</span>score<span class="token punctuation">)</span> <span class="token keyword">FROM</span> students<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- LIMIT 与 OFFSET 的另一种写法（SQL 标准）</span></span>
<span class="line"><span class="token keyword">OFFSET</span> <span class="token number">0</span> <span class="token keyword">ROWS</span> <span class="token keyword">FETCH</span> <span class="token keyword">NEXT</span> <span class="token number">10</span> <span class="token keyword">ROWS</span> ONLY<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="update" tabindex="-1"><a class="header-anchor" href="#update"><span>UPDATE</span></a></h3><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 更新单个字段</span></span>
<span class="line"><span class="token keyword">UPDATE</span> students <span class="token keyword">SET</span> score <span class="token operator">=</span> <span class="token number">90</span> <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 更新多个字段</span></span>
<span class="line"><span class="token keyword">UPDATE</span> students <span class="token keyword">SET</span> score <span class="token operator">=</span> <span class="token number">95</span><span class="token punctuation">,</span> age <span class="token operator">=</span> <span class="token number">26</span> <span class="token keyword">WHERE</span> name <span class="token operator">=</span> <span class="token string">&#39;张三&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 使用其他表的值更新</span></span>
<span class="line"><span class="token keyword">UPDATE</span> students s</span>
<span class="line"><span class="token keyword">SET</span> score <span class="token operator">=</span> e<span class="token punctuation">.</span>score</span>
<span class="line"><span class="token keyword">FROM</span> exam_scores e</span>
<span class="line"><span class="token keyword">WHERE</span> s<span class="token punctuation">.</span>id <span class="token operator">=</span> e<span class="token punctuation">.</span>student_id<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 带 RETURNING（PostgreSQL 特有）</span></span>
<span class="line"><span class="token keyword">UPDATE</span> students <span class="token keyword">SET</span> score <span class="token operator">=</span> <span class="token number">100</span> <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span> <span class="token keyword">RETURNING</span> id<span class="token punctuation">,</span> name<span class="token punctuation">,</span> score<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h3 id="delete" tabindex="-1"><a class="header-anchor" href="#delete"><span>DELETE</span></a></h3><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 删除指定行</span></span>
<span class="line"><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> students <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 删除所有行（保留表结构）</span></span>
<span class="line"><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> students<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">TRUNCATE</span> <span class="token keyword">TABLE</span> students<span class="token punctuation">;</span>  <span class="token comment">-- 更快，不能回滚（事务中可回滚）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 带 RETURNING</span></span>
<span class="line"><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> students <span class="token keyword">WHERE</span> score <span class="token operator">&lt;</span> <span class="token number">60</span> <span class="token keyword">RETURNING</span> id<span class="token punctuation">,</span> name<span class="token punctuation">,</span> score<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 级联删除（受外键约束）</span></span>
<span class="line"><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> classes <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span> <span class="token keyword">CASCADE</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h2 id="约束-constraints" tabindex="-1"><a class="header-anchor" href="#约束-constraints"><span>约束（Constraints）</span></a></h2><table><thead><tr><th>约束</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td><code>PRIMARY KEY</code></td><td>主键，唯一 + 非空</td><td><code>id INT PRIMARY KEY</code></td></tr><tr><td><code>FOREIGN KEY</code></td><td>外键，引用其他表</td><td><code>class_id INT REFERENCES classes(id)</code></td></tr><tr><td><code>UNIQUE</code></td><td>唯一值</td><td><code>email VARCHAR(200) UNIQUE</code></td></tr><tr><td><code>NOT NULL</code></td><td>非空</td><td><code>name VARCHAR(50) NOT NULL</code></td></tr><tr><td><code>CHECK</code></td><td>条件检查</td><td><code>age INT CHECK (age &gt; 0)</code></td></tr><tr><td><code>DEFAULT</code></td><td>默认值</td><td><code>score DECIMAL DEFAULT 0.0</code></td></tr><tr><td><code>EXCLUDE</code></td><td>排除约束</td><td><code>EXCLUDE USING gist (period WITH &amp;&amp;)</code></td></tr></tbody></table><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 外键约束的级联行为</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> orders <span class="token punctuation">(</span></span>
<span class="line">    id <span class="token keyword">SERIAL</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    user_id <span class="token keyword">INT</span> <span class="token keyword">REFERENCES</span> users<span class="token punctuation">(</span>id<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">ON</span> <span class="token keyword">DELETE</span> <span class="token keyword">CASCADE</span>      <span class="token comment">-- 删除用户时同时删除其订单</span></span>
<span class="line">        <span class="token keyword">ON</span> <span class="token keyword">UPDATE</span> <span class="token keyword">CASCADE</span>      <span class="token comment">-- 更新用户 ID 时同步更新</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 其他选项：SET NULL / SET DEFAULT / RESTRICT / NO ACTION</span></span>
<span class="line"></span></code></pre></div><h2 id="schema-模式" tabindex="-1"><a class="header-anchor" href="#schema-模式"><span>Schema（模式）</span></a></h2><p>Schema 用于组织数据库对象，类似于命名空间：</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 创建 schema</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">SCHEMA</span> myapp<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 在 schema 中创建表</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> myapp<span class="token punctuation">.</span>products <span class="token punctuation">(</span></span>
<span class="line">    id <span class="token keyword">SERIAL</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看所有 schema</span></span>
<span class="line">\\dn</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 设置搜索路径（默认是 public）</span></span>
<span class="line"><span class="token keyword">SET</span> search_path <span class="token keyword">TO</span> myapp<span class="token punctuation">,</span> <span class="token keyword">public</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 删除 schema</span></span>
<span class="line"><span class="token keyword">DROP</span> <span class="token keyword">SCHEMA</span> myapp <span class="token keyword">CASCADE</span><span class="token punctuation">;</span>  <span class="token comment">-- CASCADE 删除所有包含的对象</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="扩展模块-extensions" tabindex="-1"><a class="header-anchor" href="#扩展模块-extensions"><span>扩展模块（Extensions）</span></a></h2><p>PostgreSQL 通过扩展模块提供额外功能：</p><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 查看已安装的扩展</span></span>
<span class="line">\\dx</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看可用扩展</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> pg_available_extensions<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 常用扩展</span></span>
<span class="line"><span class="token keyword">CREATE</span> EXTENSION <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token string">&quot;uuid-ossp&quot;</span><span class="token punctuation">;</span>       <span class="token comment">-- UUID 生成</span></span>
<span class="line"><span class="token keyword">CREATE</span> EXTENSION <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token string">&quot;pgcrypto&quot;</span><span class="token punctuation">;</span>         <span class="token comment">-- 加密函数</span></span>
<span class="line"><span class="token keyword">CREATE</span> EXTENSION <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token string">&quot;pg_trgm&quot;</span><span class="token punctuation">;</span>          <span class="token comment">-- 模糊搜索</span></span>
<span class="line"><span class="token keyword">CREATE</span> EXTENSION <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token string">&quot;postgis&quot;</span><span class="token punctuation">;</span>          <span class="token comment">-- 地理空间（需单独安装）</span></span>
<span class="line"><span class="token keyword">CREATE</span> EXTENSION <span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token string">&quot;hstore&quot;</span><span class="token punctuation">;</span>           <span class="token comment">-- 键值存储</span></span>
<span class="line"></span></code></pre></div><h2 id="备份与恢复" tabindex="-1"><a class="header-anchor" href="#备份与恢复"><span>备份与恢复</span></a></h2><h3 id="pg-dump-—-单个数据库" tabindex="-1"><a class="header-anchor" href="#pg-dump-—-单个数据库"><span>pg_dump — 单个数据库</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 备份到 SQL 文件</span></span>
<span class="line">pg_dump <span class="token parameter variable">-U</span> postgres mydb <span class="token operator">&gt;</span> mydb_backup.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 备份到自定义格式（压缩，可恢复部分）</span></span>
<span class="line">pg_dump <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-Fc</span> mydb <span class="token operator">&gt;</span> mydb_backup.dump</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 只备份数据（不包含建表语句）</span></span>
<span class="line">pg_dump <span class="token parameter variable">-U</span> postgres --data-only mydb <span class="token operator">&gt;</span> mydb_data.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 只备份 schema（不包含数据）</span></span>
<span class="line">pg_dump <span class="token parameter variable">-U</span> postgres --schema-only mydb <span class="token operator">&gt;</span> mydb_schema.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用环境变量传递密码</span></span>
<span class="line"><span class="token variable">$env</span>:PGPASSWORD<span class="token operator">=</span><span class="token string">&#39;123456&#39;</span>  <span class="token comment"># Windows PowerShell</span></span>
<span class="line">pg_dump <span class="token parameter variable">-U</span> postgres mydb <span class="token operator">&gt;</span> backup.sql</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pg-dumpall-—-所有数据库" tabindex="-1"><a class="header-anchor" href="#pg-dumpall-—-所有数据库"><span>pg_dumpall — 所有数据库</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 备份所有数据库（包含用户和表空间信息）</span></span>
<span class="line">pg_dumpall <span class="token parameter variable">-U</span> postgres <span class="token operator">&gt;</span> all_backup.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 仅备份全局对象（用户、表空间）</span></span>
<span class="line">pg_dumpall <span class="token parameter variable">-U</span> postgres --globals-only <span class="token operator">&gt;</span> globals.sql</span>
<span class="line"></span></code></pre></div><h3 id="恢复" tabindex="-1"><a class="header-anchor" href="#恢复"><span>恢复</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 恢复 SQL 文件</span></span>
<span class="line">psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> mydb <span class="token operator">&lt;</span> mydb_backup.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 恢复自定义格式</span></span>
<span class="line">pg_restore <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> mydb mydb_backup.dump</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 从 PowerShell 输入</span></span>
<span class="line">Get-Content .<span class="token punctuation">\\</span>backup.sql <span class="token operator">|</span> psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-d</span> mydb</span>
<span class="line"></span></code></pre></div><h2 id="postgresql-版本升级" tabindex="-1"><a class="header-anchor" href="#postgresql-版本升级"><span>PostgreSQL 版本升级</span></a></h2><h3 id="方式一-pg-dump-psql-适合小数据量" tabindex="-1"><a class="header-anchor" href="#方式一-pg-dump-psql-适合小数据量"><span>方式一：pg_dump + psql（适合小数据量）</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 备份旧版本数据</span></span>
<span class="line">pg_dumpall <span class="token parameter variable">-U</span> postgres <span class="token operator">&gt;</span> backup.sql</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 安装新版本</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 恢复</span></span>
<span class="line">psql <span class="token parameter variable">-U</span> postgres <span class="token parameter variable">-f</span> backup.sql postgres</span>
<span class="line"></span></code></pre></div><h3 id="方式二-pg-upgrade-适合大数据量-推荐" tabindex="-1"><a class="header-anchor" href="#方式二-pg-upgrade-适合大数据量-推荐"><span>方式二：pg_upgrade（适合大数据量，推荐）</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># Windows PowerShell 示例：从 15 升级到 16</span></span>
<span class="line"><span class="token variable">$env</span>:PGPASSWORD <span class="token operator">=</span> <span class="token string">&#39;123456&#39;</span></span>
<span class="line">pg_upgrade <span class="token variable"><span class="token variable">\`</span></span>
<span class="line">  <span class="token parameter variable">-b</span> <span class="token string">&quot;D:\\Program Files\\PostgreSQL<span class="token entity" title="\\15">\\15</span><span class="token entity" title="\\b">\\b</span>in&quot;</span> <span class="token variable">\`</span></span></span>
<span class="line">  <span class="token parameter variable">-B</span> <span class="token string">&quot;D:\\Program Files\\PostgreSQL<span class="token entity" title="\\16">\\16</span><span class="token entity" title="\\b">\\b</span>in&quot;</span> <span class="token variable"><span class="token variable">\`</span></span>
<span class="line">  <span class="token parameter variable">-d</span> <span class="token string">&quot;D:\\Program Files\\PostgreSQL<span class="token entity" title="\\15">\\15</span>\\data&quot;</span> <span class="token variable">\`</span></span></span>
<span class="line">  <span class="token parameter variable">-D</span> <span class="token string">&quot;D:\\Program Files\\PostgreSQL<span class="token entity" title="\\16">\\16</span>\\data&quot;</span> \`</span>
<span class="line">  <span class="token parameter variable">-U</span> postgres</span>
<span class="line"></span></code></pre></div><h2 id="练习" tabindex="-1"><a class="header-anchor" href="#练习"><span>练习</span></a></h2><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 1. 创建博客系统表</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> posts <span class="token punctuation">(</span></span>
<span class="line">    id <span class="token keyword">SERIAL</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    title <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">    content <span class="token keyword">TEXT</span><span class="token punctuation">,</span></span>
<span class="line">    author_id <span class="token keyword">INT</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token keyword">status</span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token string">&#39;draft&#39;</span><span class="token punctuation">,</span></span>
<span class="line">    created_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span><span class="token punctuation">,</span></span>
<span class="line">    updated_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> comments <span class="token punctuation">(</span></span>
<span class="line">    id <span class="token keyword">SERIAL</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    post_id <span class="token keyword">INT</span> <span class="token keyword">REFERENCES</span> posts<span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token keyword">ON</span> <span class="token keyword">DELETE</span> <span class="token keyword">CASCADE</span><span class="token punctuation">,</span></span>
<span class="line">    author <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">    body <span class="token keyword">TEXT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span></span>
<span class="line">    created_at <span class="token keyword">TIMESTAMP</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 2. 插入测试数据</span></span>
<span class="line"><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> posts <span class="token punctuation">(</span>title<span class="token punctuation">,</span> content<span class="token punctuation">,</span> author_id<span class="token punctuation">,</span> <span class="token keyword">status</span><span class="token punctuation">)</span> <span class="token keyword">VALUES</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">&#39;PostgreSQL 入门&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;内容...&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;published&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">&#39;JSON 高级用法&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;内容...&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;published&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">(</span><span class="token string">&#39;草稿文章&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;内容...&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;draft&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 3. 查询已发布文章及其评论数</span></span>
<span class="line"><span class="token keyword">SELECT</span></span>
<span class="line">    p<span class="token punctuation">.</span>id<span class="token punctuation">,</span></span>
<span class="line">    p<span class="token punctuation">.</span>title<span class="token punctuation">,</span></span>
<span class="line">    p<span class="token punctuation">.</span><span class="token keyword">status</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">COUNT</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token keyword">AS</span> comment_count</span>
<span class="line"><span class="token keyword">FROM</span> posts p</span>
<span class="line"><span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> comments c <span class="token keyword">ON</span> c<span class="token punctuation">.</span>post_id <span class="token operator">=</span> p<span class="token punctuation">.</span>id</span>
<span class="line"><span class="token keyword">WHERE</span> p<span class="token punctuation">.</span><span class="token keyword">status</span> <span class="token operator">=</span> <span class="token string">&#39;published&#39;</span></span>
<span class="line"><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> p<span class="token punctuation">.</span>id<span class="token punctuation">,</span> p<span class="token punctuation">.</span>title<span class="token punctuation">,</span> p<span class="token punctuation">.</span><span class="token keyword">status</span></span>
<span class="line"><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> p<span class="token punctuation">.</span>id<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,49)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};