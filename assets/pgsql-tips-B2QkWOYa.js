import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/java-tutor/orm-tutor/pgsql/pgsql-tips.html","title":"PostgreSQL 性能调优与配置","lang":"zh-CN","frontmatter":{"description":"PostgreSQL 性能调优与配置 PostgreSQL 的性能取决于合理的配置和索引设计。掌握这些优化技巧，让你的数据库跑得更快。 postgresql.conf 核心配置 配置文件位置：/etc/postgresql/16/main/postgresql.conf 或 PGDATA/postgresql.conf 内存配置 磁盘写入配置 连接配置...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"PostgreSQL 性能调优与配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T07:23:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/pgsql/pgsql-tips.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"PostgreSQL 性能调优与配置"}],["meta",{"property":"og:description","content":"PostgreSQL 性能调优与配置 PostgreSQL 的性能取决于合理的配置和索引设计。掌握这些优化技巧，让你的数据库跑得更快。 postgresql.conf 核心配置 配置文件位置：/etc/postgresql/16/main/postgresql.conf 或 PGDATA/postgresql.conf 内存配置 磁盘写入配置 连接配置..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T07:23:11.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T07:23:11.000Z"}]]},"git":{"createdTime":1652540980000,"updatedTime":1783927391000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":8,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":4.99,"words":1498},"filePathRelative":"java-tutor/orm-tutor/pgsql/pgsql-tips.md","autoDesc":true}`),a={name:`pgsql-tips.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="postgresql-性能调优与配置" tabindex="-1"><a class="header-anchor" href="#postgresql-性能调优与配置"><span>PostgreSQL 性能调优与配置</span></a></h1><blockquote><p>PostgreSQL 的性能取决于合理的配置和索引设计。掌握这些优化技巧，让你的数据库跑得更快。</p></blockquote><h2 id="postgresql-conf-核心配置" tabindex="-1"><a class="header-anchor" href="#postgresql-conf-核心配置"><span>postgresql.conf 核心配置</span></a></h2><p>配置文件位置：<code>/etc/postgresql/16/main/postgresql.conf</code> 或 <code>PGDATA/postgresql.conf</code></p><h3 id="内存配置" tabindex="-1"><a class="header-anchor" href="#内存配置"><span>内存配置</span></a></h3><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf"><pre><code class="language-conf"><span class="line"># 共享缓冲区（通常设为物理内存的 25%）</span>
<span class="line">shared_buffers = 2GB</span>
<span class="line"></span>
<span class="line"># 排序/哈希操作使用的内存（每个操作）</span>
<span class="line">work_mem = 64MB</span>
<span class="line"></span>
<span class="line"># 维护操作内存（VACUUM、CREATE INDEX）</span>
<span class="line">maintenance_work_mem = 512MB</span>
<span class="line"></span>
<span class="line"># 缓存查询计划</span>
<span class="line">shared_plan_cache = 8MB</span>
<span class="line"></span>
<span class="line"># 写入缓冲区</span>
<span class="line">wal_buffers = 16MB</span>
<span class="line"></span>
<span class="line"># 并行查询（每个查询最多使用的 CPU）</span>
<span class="line">max_parallel_workers_per_gather = 4</span>
<span class="line">parallel_setup_cost = 1000</span>
<span class="line">parallel_tuple_cost = 0.1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="磁盘写入配置" tabindex="-1"><a class="header-anchor" href="#磁盘写入配置"><span>磁盘写入配置</span></a></h3><div class="language-conf" data-highlighter="prismjs" data-ext="conf"><pre><code class="language-conf"><span class="line"># 推荐 SSD 设置为 ON，HDD 设置为 OFF</span>
<span class="line">synchronous_commit = on</span>
<span class="line"></span>
<span class="line"># 检查点间隔</span>
<span class="line">checkpoint_timeout = 15min</span>
<span class="line">checkpoint_completion_target = 0.9</span>
<span class="line"></span>
<span class="line"># WAL 日志大小</span>
<span class="line">max_wal_size = 4GB</span>
<span class="line">min_wal_size = 1GB</span>
<span class="line"></span>
<span class="line"># 写入方式（SSD 推荐 direct）</span>
<span class="line">wal_init_zero = on</span>
<span class="line">wal_recycle = on</span>
<span class="line"></span></code></pre></div><h3 id="连接配置" tabindex="-1"><a class="header-anchor" href="#连接配置"><span>连接配置</span></a></h3><div class="language-conf" data-highlighter="prismjs" data-ext="conf"><pre><code class="language-conf"><span class="line"># 最大连接数（每个连接约占用 2MB）</span>
<span class="line">max_connections = 100</span>
<span class="line"></span>
<span class="line"># 保留给超级用户的连接数</span>
<span class="line">superuser_reserved_connections = 3</span>
<span class="line"></span></code></pre></div><h3 id="自动清理配置" tabindex="-1"><a class="header-anchor" href="#自动清理配置"><span>自动清理配置</span></a></h3><div class="language-conf" data-highlighter="prismjs" data-ext="conf"><pre><code class="language-conf"><span class="line"># 自动 VACUUM</span>
<span class="line">autovacuum = on</span>
<span class="line">autovacuum_naptime = 1min</span>
<span class="line">autovacuum_max_workers = 3</span>
<span class="line"></span>
<span class="line"># 何时触发 VACUUM（表中有 20% + 50 行被修改时）</span>
<span class="line">autovacuum_vacuum_scale_factor = 0.2</span>
<span class="line">autovacuum_vacuum_threshold = 50</span>
<span class="line"></span>
<span class="line"># 何时触发 ANALYZE</span>
<span class="line">autovacuum_analyze_scale_factor = 0.1</span>
<span class="line">autovacuum_analyze_threshold = 50</span>
<span class="line"></span></code></pre></div><h3 id="不同场景的推荐配置" tabindex="-1"><a class="header-anchor" href="#不同场景的推荐配置"><span>不同场景的推荐配置</span></a></h3><table><thead><tr><th>场景</th><th>内存</th><th>shared_buffers</th><th>work_mem</th><th>max_connections</th></tr></thead><tbody><tr><td>个人开发（4GB RAM）</td><td>4GB</td><td>1GB</td><td>32MB</td><td>20</td></tr><tr><td>小型应用（8GB RAM）</td><td>8GB</td><td>2GB</td><td>64MB</td><td>50</td></tr><tr><td>中型应用（16GB RAM）</td><td>16GB</td><td>4GB</td><td>128MB</td><td>100</td></tr><tr><td>大型应用（32GB RAM）</td><td>32GB</td><td>8GB</td><td>256MB</td><td>200</td></tr></tbody></table><h3 id="查看当前配置" tabindex="-1"><a class="header-anchor" href="#查看当前配置"><span>查看当前配置</span></a></h3><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 查看当前配置值</span></span>
<span class="line"><span class="token keyword">SHOW</span> shared_buffers<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SHOW</span> work_mem<span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SHOW</span> max_connections<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看所有配置（含默认值）</span></span>
<span class="line"><span class="token keyword">SELECT</span> name<span class="token punctuation">,</span> setting<span class="token punctuation">,</span> unit<span class="token punctuation">,</span> context <span class="token keyword">FROM</span> pg_settings</span>
<span class="line"><span class="token keyword">WHERE</span> category <span class="token operator">=</span> <span class="token string">&#39;Resource Usage / Memory&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看需要重启才能生效的配置</span></span>
<span class="line"><span class="token keyword">SELECT</span> name<span class="token punctuation">,</span> setting <span class="token keyword">FROM</span> pg_settings <span class="token keyword">WHERE</span> pending_restart <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h2 id="explain-查询分析" tabindex="-1"><a class="header-anchor" href="#explain-查询分析"><span>EXPLAIN 查询分析</span></a></h2><h3 id="使用-explain" tabindex="-1"><a class="header-anchor" href="#使用-explain"><span>使用 EXPLAIN</span></a></h3><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 查看查询计划（不执行）</span></span>
<span class="line"><span class="token keyword">EXPLAIN</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> email <span class="token operator">=</span> <span class="token string">&#39;test@test.com&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 执行并查看实际时间</span></span>
<span class="line"><span class="token keyword">EXPLAIN</span> <span class="token keyword">ANALYZE</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> email <span class="token operator">=</span> <span class="token string">&#39;test@test.com&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看更详细的计划</span></span>
<span class="line"><span class="token keyword">EXPLAIN</span> <span class="token punctuation">(</span><span class="token keyword">ANALYZE</span><span class="token punctuation">,</span> BUFFERS<span class="token punctuation">,</span> FORMAT JSON<span class="token punctuation">)</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> email <span class="token operator">=</span> <span class="token string">&#39;test@test.com&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h3 id="扫描方式" tabindex="-1"><a class="header-anchor" href="#扫描方式"><span>扫描方式</span></a></h3><table><thead><tr><th>方式</th><th>说明</th><th>速度</th></tr></thead><tbody><tr><td><code>Seq Scan</code></td><td>全表扫描（从头到尾）</td><td>慢 ❌</td></tr><tr><td><code>Index Scan</code></td><td>索引扫描（找到行再回表）</td><td>快 ✅</td></tr><tr><td><code>Index Only Scan</code></td><td>索引覆盖扫描（不回表）</td><td>最快 ✅✅</td></tr><tr><td><code>Bitmap Index Scan</code></td><td>位图索引扫描（用于多个索引组合）</td><td>中等</td></tr></tbody></table><h3 id="优化示例" tabindex="-1"><a class="header-anchor" href="#优化示例"><span>优化示例</span></a></h3><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- ❌ 全表扫描（未建索引）</span></span>
<span class="line"><span class="token keyword">EXPLAIN</span> <span class="token keyword">ANALYZE</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> email <span class="token operator">=</span> <span class="token string">&#39;a@b.com&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">-- Seq Scan on users (cost=0.00..734.00 rows=1 width=42)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- ✅ 创建索引后变为索引扫描</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> idx_users_email <span class="token keyword">ON</span> users<span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">EXPLAIN</span> <span class="token keyword">ANALYZE</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> email <span class="token operator">=</span> <span class="token string">&#39;a@b.com&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">-- Index Scan using idx_users_email (cost=0.28..8.29 rows=1 width=42)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- ❌ 排序不走索引</span></span>
<span class="line"><span class="token keyword">EXPLAIN</span> <span class="token keyword">ANALYZE</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> created_at <span class="token keyword">DESC</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">-- Sort (cost=1000.00..1200.00 rows=10000 width=42)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- ✅ 排序走索引</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> idx_users_created_at <span class="token keyword">ON</span> users<span class="token punctuation">(</span>created_at <span class="token keyword">DESC</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常见优化场景" tabindex="-1"><a class="header-anchor" href="#常见优化场景"><span>常见优化场景</span></a></h3><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 1. LIMIT + OFFSET 分页优化</span></span>
<span class="line"><span class="token comment">-- ❌ 慢（OFFSET 越大越慢，需要扫描所有跳过的行）</span></span>
<span class="line"><span class="token keyword">EXPLAIN</span> <span class="token keyword">ANALYZE</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> id <span class="token keyword">LIMIT</span> <span class="token number">10</span> <span class="token keyword">OFFSET</span> <span class="token number">100000</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- ✅ 快（利用索引跳过）</span></span>
<span class="line"><span class="token keyword">EXPLAIN</span> <span class="token keyword">ANALYZE</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users</span>
<span class="line"><span class="token keyword">WHERE</span> id <span class="token operator">&gt;</span> <span class="token number">100000</span> <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> id <span class="token keyword">LIMIT</span> <span class="token number">10</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 2. JOIN 优化（确保关联字段有索引）</span></span>
<span class="line"><span class="token comment">-- 在 foreign key 字段上建索引（PostgreSQL 不会自动建立外键索引）</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> idx_posts_author_id <span class="token keyword">ON</span> posts<span class="token punctuation">(</span>author_id<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 3. 避免 WHERE 中使用函数（索引会失效）</span></span>
<span class="line"><span class="token comment">-- ❌</span></span>
<span class="line"><span class="token keyword">EXPLAIN</span> <span class="token keyword">ANALYZE</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> <span class="token keyword">DATE</span><span class="token punctuation">(</span>created_at<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token string">&#39;2024-01-15&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">-- ✅</span></span>
<span class="line"><span class="token keyword">EXPLAIN</span> <span class="token keyword">ANALYZE</span> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users</span>
<span class="line"><span class="token keyword">WHERE</span> created_at <span class="token operator">&gt;=</span> <span class="token string">&#39;2024-01-15&#39;</span> <span class="token operator">AND</span> created_at <span class="token operator">&lt;</span> <span class="token string">&#39;2024-01-16&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符集与编码" tabindex="-1"><a class="header-anchor" href="#字符集与编码"><span>字符集与编码</span></a></h2><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 查看数据库编码</span></span>
<span class="line">\\l</span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看客户端编码</span></span>
<span class="line"><span class="token keyword">SHOW</span> client_encoding<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 设置编码</span></span>
<span class="line"><span class="token keyword">SET</span> client_encoding <span class="token keyword">TO</span> <span class="token string">&#39;UTF8&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- Windows 命令行下编码问题（出现乱码时）</span></span>
<span class="line"><span class="token comment">-- 先切换代码页</span></span>
<span class="line">chcp <span class="token number">65001</span>  <span class="token comment">-- UTF-8</span></span>
<span class="line">chcp <span class="token number">936</span>    <span class="token comment">-- GBK</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 创建数据库时指定编码</span></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> mydb <span class="token keyword">WITH</span> ENCODING <span class="token string">&#39;UTF8&#39;</span> LC_COLLATE <span class="token string">&#39;zh_CN.UTF-8&#39;</span> LC_CTYPE <span class="token string">&#39;zh_CN.UTF-8&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="时区处理" tabindex="-1"><a class="header-anchor" href="#时区处理"><span>时区处理</span></a></h2><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 查看当前时区</span></span>
<span class="line"><span class="token keyword">SHOW</span> timezone<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 设置会话时区</span></span>
<span class="line"><span class="token keyword">SET</span> timezone <span class="token keyword">TO</span> <span class="token string">&#39;Asia/Shanghai&#39;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">SET</span> timezone <span class="token keyword">TO</span> <span class="token string">&#39;UTC&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 数据库级别时区</span></span>
<span class="line"><span class="token keyword">ALTER</span> <span class="token keyword">DATABASE</span> mydb <span class="token keyword">SET</span> timezone <span class="token keyword">TO</span> <span class="token string">&#39;Asia/Shanghai&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 时间戳类型选择</span></span>
<span class="line"><span class="token comment">-- TIMESTAMP → 对应 Java LocalDateTime（不存时区）</span></span>
<span class="line"><span class="token comment">-- TIMESTAMPTZ → 对应 Java Instant（存 UTC，查询时转为当前时区）</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> events <span class="token punctuation">(</span></span>
<span class="line">    id <span class="token keyword">SERIAL</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span></span>
<span class="line">    event_name <span class="token keyword">TEXT</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">-- 如果不需要时区转换（如记录的本地时间）</span></span>
<span class="line">    local_time <span class="token keyword">TIMESTAMP</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">-- 如果需要自动时区转换（如用户操作时间）</span></span>
<span class="line">    utc_time TIMESTAMPTZ</span>
<span class="line"><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="连接池配置" tabindex="-1"><a class="header-anchor" href="#连接池配置"><span>连接池配置</span></a></h2><h3 id="hikaricp-spring-boot-默认" tabindex="-1"><a class="header-anchor" href="#hikaricp-spring-boot-默认"><span>HikariCP（Spring Boot 默认）</span></a></h3><div class="language-yaml" data-highlighter="prismjs" data-ext="yml"><pre><code class="language-yaml"><span class="line"><span class="token key atrule">spring</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">datasource</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">hikari</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token comment"># 核心配置</span></span>
<span class="line">      <span class="token key atrule">maximum-pool-size</span><span class="token punctuation">:</span> <span class="token number">10</span>        <span class="token comment"># 最大连接数</span></span>
<span class="line">      <span class="token key atrule">minimum-idle</span><span class="token punctuation">:</span> <span class="token number">2</span>               <span class="token comment"># 最小空闲连接</span></span>
<span class="line">      <span class="token key atrule">connection-timeout</span><span class="token punctuation">:</span> <span class="token number">30000</span>     <span class="token comment"># 获取连接超时（毫秒）</span></span>
<span class="line">      <span class="token key atrule">idle-timeout</span><span class="token punctuation">:</span> <span class="token number">600000</span>          <span class="token comment"># 空闲超时（10分钟）</span></span>
<span class="line">      <span class="token key atrule">max-lifetime</span><span class="token punctuation">:</span> <span class="token number">1800000</span>         <span class="token comment"># 最大存活时间（30分钟）</span></span>
<span class="line"></span>
<span class="line">      <span class="token comment"># PostgreSQL 推荐设置</span></span>
<span class="line">      <span class="token key atrule">connection-test-query</span><span class="token punctuation">:</span> SELECT 1</span>
<span class="line">      <span class="token key atrule">validation-timeout</span><span class="token punctuation">:</span> <span class="token number">3000</span></span>
<span class="line">      <span class="token key atrule">leak-detection-threshold</span><span class="token punctuation">:</span> <span class="token number">60000</span>  <span class="token comment"># 连接泄漏检测</span></span>
<span class="line"></span></code></pre></div><h3 id="查看连接池状态" tabindex="-1"><a class="header-anchor" href="#查看连接池状态"><span>查看连接池状态</span></a></h3><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 查看当前连接数</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">FROM</span> pg_stat_activity<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看每个连接的来源</span></span>
<span class="line"><span class="token keyword">SELECT</span></span>
<span class="line">    pid<span class="token punctuation">,</span></span>
<span class="line">    usename<span class="token punctuation">,</span></span>
<span class="line">    application_name<span class="token punctuation">,</span></span>
<span class="line">    client_addr<span class="token punctuation">,</span></span>
<span class="line">    state<span class="token punctuation">,</span></span>
<span class="line">    query_start</span>
<span class="line"><span class="token keyword">FROM</span> pg_stat_activity</span>
<span class="line"><span class="token keyword">WHERE</span> state <span class="token operator">!=</span> <span class="token string">&#39;idle&#39;</span></span>
<span class="line"><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> query_start<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h2 id="vacuum-与维护" tabindex="-1"><a class="header-anchor" href="#vacuum-与维护"><span>VACUUM 与维护</span></a></h2><h3 id="为什么需要-vacuum" tabindex="-1"><a class="header-anchor" href="#为什么需要-vacuum"><span>为什么需要 VACUUM？</span></a></h3><p>PostgreSQL 的 MVCC 机制会产生&quot;死元组&quot;（dead tuples），需要定期清理释放空间。</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 查看表死元组数量</span></span>
<span class="line"><span class="token keyword">SELECT</span></span>
<span class="line">    relname<span class="token punctuation">,</span></span>
<span class="line">    n_dead_tup<span class="token punctuation">,</span></span>
<span class="line">    n_live_tup<span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">round</span><span class="token punctuation">(</span>n_dead_tup <span class="token operator">*</span> <span class="token number">100.0</span> <span class="token operator">/</span> <span class="token keyword">nullif</span><span class="token punctuation">(</span>n_live_tup <span class="token operator">+</span> n_dead_tup<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> dead_pct<span class="token punctuation">,</span></span>
<span class="line">    last_autovacuum<span class="token punctuation">,</span></span>
<span class="line">    last_autoanalyze</span>
<span class="line"><span class="token keyword">FROM</span> pg_stat_user_tables</span>
<span class="line"><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> n_dead_tup <span class="token keyword">DESC</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 手动 VACUUM</span></span>
<span class="line">VACUUM users<span class="token punctuation">;</span>                        <span class="token comment">-- 回收空间（不影响读写）</span></span>
<span class="line">VACUUM <span class="token keyword">ANALYZE</span> users<span class="token punctuation">;</span>                <span class="token comment">-- 回收空间 + 更新统计信息</span></span>
<span class="line">VACUUM <span class="token keyword">FULL</span> users<span class="token punctuation">;</span>                   <span class="token comment">-- 彻底整理（会锁表，谨慎使用！）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看表大小变化</span></span>
<span class="line"><span class="token keyword">SELECT</span> pg_size_pretty<span class="token punctuation">(</span>pg_total_relation_size<span class="token punctuation">(</span><span class="token string">&#39;users&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自动-vacuum" tabindex="-1"><a class="header-anchor" href="#自动-vacuum"><span>自动 VACUUM</span></a></h3><p>确保 <code>autovacuum = on</code>（默认开启）。自动 VACUUM 是 PostgreSQL 的一大优势，无需像 MySQL 那样手动执行 optimize。</p><h2 id="常见问题排查" tabindex="-1"><a class="header-anchor" href="#常见问题排查"><span>常见问题排查</span></a></h2><h3 id="连接被拒绝" tabindex="-1"><a class="header-anchor" href="#连接被拒绝"><span>连接被拒绝</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">FATAL: no pg_hba.conf entry for host &quot;192.168.1.100&quot;</span>
<span class="line"></span></code></pre></div><p>在 <code>pg_hba.conf</code> 添加：</p><div class="language-conf" data-highlighter="prismjs" data-ext="conf"><pre><code class="language-conf"><span class="line">host all all 0.0.0.0/0 scram-sha-256</span>
<span class="line"></span></code></pre></div><h3 id="查询突然变慢" tabindex="-1"><a class="header-anchor" href="#查询突然变慢"><span>查询突然变慢</span></a></h3><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 1. 查看是否有锁等待</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> pg_stat_activity <span class="token keyword">WHERE</span> wait_event <span class="token operator">IS</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 2. 分析表更新统计信息</span></span>
<span class="line"><span class="token keyword">ANALYZE</span> users<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 3. 查看是否有大量死元组</span></span>
<span class="line"><span class="token keyword">SELECT</span> relname<span class="token punctuation">,</span> n_dead_tup <span class="token keyword">FROM</span> pg_stat_user_tables <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> n_dead_tup <span class="token keyword">DESC</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 4. 检查索引是否需要重建</span></span>
<span class="line">REINDEX <span class="token keyword">TABLE</span> users<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h3 id="连接数耗尽" tabindex="-1"><a class="header-anchor" href="#连接数耗尽"><span>连接数耗尽</span></a></h3><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 查看当前连接数</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">FROM</span> pg_stat_activity<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看最大连接数</span></span>
<span class="line"><span class="token keyword">SHOW</span> max_connections<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 终止空闲连接</span></span>
<span class="line"><span class="token keyword">SELECT</span> pg_terminate_backend<span class="token punctuation">(</span>pid<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">FROM</span> pg_stat_activity</span>
<span class="line"><span class="token keyword">WHERE</span> state <span class="token operator">=</span> <span class="token string">&#39;idle&#39;</span></span>
<span class="line">  <span class="token operator">AND</span> backend_start <span class="token operator">&lt;</span> <span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token keyword">INTERVAL</span> <span class="token string">&#39;1 hour&#39;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h3 id="磁盘空间不足" tabindex="-1"><a class="header-anchor" href="#磁盘空间不足"><span>磁盘空间不足</span></a></h3><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 查看数据库大小排名</span></span>
<span class="line"><span class="token keyword">SELECT</span></span>
<span class="line">    datname<span class="token punctuation">,</span></span>
<span class="line">    pg_size_pretty<span class="token punctuation">(</span>pg_database_size<span class="token punctuation">(</span>datname<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> size</span>
<span class="line"><span class="token keyword">FROM</span> pg_database</span>
<span class="line"><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> pg_database_size<span class="token punctuation">(</span>datname<span class="token punctuation">)</span> <span class="token keyword">DESC</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">-- 查看表大小排名</span></span>
<span class="line"><span class="token keyword">SELECT</span></span>
<span class="line">    relname<span class="token punctuation">,</span></span>
<span class="line">    pg_size_pretty<span class="token punctuation">(</span>pg_total_relation_size<span class="token punctuation">(</span>relid<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> total_size</span>
<span class="line"><span class="token keyword">FROM</span> pg_catalog<span class="token punctuation">.</span>pg_statio_user_tables</span>
<span class="line"><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> pg_total_relation_size<span class="token punctuation">(</span>relid<span class="token punctuation">)</span> <span class="token keyword">DESC</span></span>
<span class="line"><span class="token keyword">LIMIT</span> <span class="token number">10</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><h2 id="练习" tabindex="-1"><a class="header-anchor" href="#练习"><span>练习</span></a></h2><div class="language-sql" data-highlighter="prismjs" data-ext="sql"><pre><code class="language-sql"><span class="line"><span class="token comment">-- 1. 查看当前数据库中哪个表最大</span></span>
<span class="line"><span class="token comment">-- 2. 找到执行时间最长的查询</span></span>
<span class="line"><span class="token comment">-- 3. 分析一个慢查询并用 EXPLAIN 找出问题</span></span>
<span class="line"><span class="token comment">-- 4. 检查 autovacuum 是否正常工作</span></span>
<span class="line"></span></code></pre></div>`,53)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};