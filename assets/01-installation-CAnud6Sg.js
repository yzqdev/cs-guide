import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/java-tutor/orm-tutor/redis/01-installation.html","title":"Redis 安装与入门","lang":"zh-CN","frontmatter":{"description":"Redis 安装与入门 Redis 是一个开源的内存数据库，常用于缓存、消息队列和会话存储。支持多种数据结构（String、Hash、List、Set、ZSet）。 安装 Redis 使用 Docker（推荐） macOS 安装 Linux 安装（Ubuntu） Windows 安装 Redis 官方不支持 Windows，可以使用以下替代方案： re...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis 安装与入门\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T07:23:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/redis/01-installation.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Redis 安装与入门"}],["meta",{"property":"og:description","content":"Redis 安装与入门 Redis 是一个开源的内存数据库，常用于缓存、消息队列和会话存储。支持多种数据结构（String、Hash、List、Set、ZSet）。 安装 Redis 使用 Docker（推荐） macOS 安装 Linux 安装（Ubuntu） Windows 安装 Redis 官方不支持 Windows，可以使用以下替代方案： re..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T07:23:11.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T07:23:11.000Z"}]]},"git":{"createdTime":1783927391000,"updatedTime":1783927391000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.46,"words":737},"filePathRelative":"java-tutor/orm-tutor/redis/01-installation.md","autoDesc":true}`),a={name:`01-installation.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="redis-安装与入门" tabindex="-1"><a class="header-anchor" href="#redis-安装与入门"><span>Redis 安装与入门</span></a></h1><blockquote><p>Redis 是一个开源的内存数据库，常用于缓存、消息队列和会话存储。支持多种数据结构（String、Hash、List、Set、ZSet）。</p></blockquote><h2 id="安装-redis" tabindex="-1"><a class="header-anchor" href="#安装-redis"><span>安装 Redis</span></a></h2><h3 id="使用-docker-推荐" tabindex="-1"><a class="header-anchor" href="#使用-docker-推荐"><span>使用 Docker（推荐）</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 拉取并启动</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--name</span> redis <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> redis:7-alpine</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 带密码与持久化</span></span>
<span class="line"><span class="token function">docker</span> run <span class="token parameter variable">--name</span> redis <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-v</span> redis_data:/data <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 <span class="token punctuation">\\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> redis:7-alpine <span class="token punctuation">\\</span></span>
<span class="line">  redis-server <span class="token parameter variable">--requirepass</span> <span class="token number">123456</span> <span class="token parameter variable">--appendonly</span> <span class="token function">yes</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 连接容器中的 redis-cli</span></span>
<span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> redis redis-cli</span>
<span class="line"></span></code></pre></div><h3 id="macos-安装" tabindex="-1"><a class="header-anchor" href="#macos-安装"><span>macOS 安装</span></a></h3><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># Homebrew</span></span>
<span class="line">brew <span class="token function">install</span> redis</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动</span></span>
<span class="line">brew services start redis</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 验证</span></span>
<span class="line">redis-cli <span class="token function">ping</span>  <span class="token comment"># PONG</span></span>
<span class="line"></span></code></pre></div><h3 id="linux-安装-ubuntu" tabindex="-1"><a class="header-anchor" href="#linux-安装-ubuntu"><span>Linux 安装（Ubuntu）</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安装</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> update</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> redis-server <span class="token parameter variable">-y</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 启动</span></span>
<span class="line"><span class="token function">sudo</span> systemctl start redis</span>
<span class="line"><span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> redis</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 配置</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">vim</span> /etc/redis/redis.conf</span>
<span class="line"><span class="token comment"># 修改: requirepass 123456</span></span>
<span class="line"><span class="token comment"># 修改: bind 0.0.0.0（需要远程访问时）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重启</span></span>
<span class="line"><span class="token function">sudo</span> systemctl restart redis</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="windows-安装" tabindex="-1"><a class="header-anchor" href="#windows-安装"><span>Windows 安装</span></a></h3><p>Redis 官方不支持 Windows，可以使用以下替代方案：</p><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 方式一：WSL（推荐）</span></span>
<span class="line">wsl <span class="token parameter variable">--install</span></span>
<span class="line">wsl <span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> redis-server</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方式二：使用 Memurai（兼容 Redis）</span></span>
<span class="line"><span class="token comment"># https://www.memurai.com/</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 方式三：tporadowski 的 Windows 移植版</span></span>
<span class="line"><span class="token comment"># https://github.com/tporadowski/redis/releases</span></span>
<span class="line"></span></code></pre></div><h2 id="redis-cli-基本使用" tabindex="-1"><a class="header-anchor" href="#redis-cli-基本使用"><span>redis-cli 基本使用</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 连接</span></span>
<span class="line">redis-cli</span>
<span class="line">redis-cli <span class="token parameter variable">-h</span> <span class="token number">127.0</span>.0.1 <span class="token parameter variable">-p</span> <span class="token number">6379</span></span>
<span class="line">redis-cli <span class="token parameter variable">-a</span> <span class="token number">123456</span>  <span class="token comment"># 带密码（不安全，密码会出现在进程列表）</span></span>
<span class="line">redis-cli <span class="token parameter variable">--askpass</span>  <span class="token comment"># 安全方式（交互式输入密码）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 认证</span></span>
<span class="line">AUTH <span class="token number">123456</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 基本的 PING</span></span>
<span class="line">PING  <span class="token comment"># → PONG</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 选择数据库（默认 0-15）</span></span>
<span class="line">SELECT <span class="token number">0</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看所有 key（生产环境慎用）</span></span>
<span class="line">KEYS *</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="核心概念" tabindex="-1"><a class="header-anchor" href="#核心概念"><span>核心概念</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">Redis 特点</span>
<span class="line">├── 内存存储：读写极快（10万+ QPS）</span>
<span class="line">├── 数据结构丰富：String/Hash/List/Set/ZSet</span>
<span class="line">├── 支持持久化：RDB（快照）/ AOF（日志）</span>
<span class="line">├── 支持过期时间：自动淘汰过期 key</span>
<span class="line">├── 支持发布订阅：消息通知</span>
<span class="line">└── 单线程模型：原子操作，无需锁</span>
<span class="line"></span></code></pre></div><h2 id="基本操作示例" tabindex="-1"><a class="header-anchor" href="#基本操作示例"><span>基本操作示例</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># String</span></span>
<span class="line">SET name <span class="token string">&quot;张三&quot;</span></span>
<span class="line">GET name       <span class="token comment"># &quot;张三&quot;</span></span>
<span class="line">DEL name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 设置过期时间（秒）</span></span>
<span class="line">SET code <span class="token string">&quot;1234&quot;</span> EX <span class="token number">60</span>     <span class="token comment"># 60 秒后自动删除</span></span>
<span class="line">TTL code                  <span class="token comment"># 查看剩余秒数</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看 key 类型</span></span>
<span class="line">TYPE name</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看所有 key</span></span>
<span class="line">KEYS *</span>
<span class="line"><span class="token comment"># 或使用 SCAN（推荐生产环境）</span></span>
<span class="line">SCAN <span class="token number">0</span> MATCH user:* COUNT <span class="token number">100</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清空所有数据</span></span>
<span class="line">FLUSHALL  <span class="token comment"># 清空所有数据库</span></span>
<span class="line">FLUSHDB   <span class="token comment"># 清空当前数据库</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件"><span>配置文件</span></a></h2><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf"><pre><code class="language-conf"><span class="line"># /etc/redis/redis.conf 核心配置</span>
<span class="line"></span>
<span class="line"># 绑定地址</span>
<span class="line">bind 127.0.0.1</span>
<span class="line"># bind 0.0.0.0  # 允许远程访问</span>
<span class="line"></span>
<span class="line"># 端口</span>
<span class="line">port 6379</span>
<span class="line"></span>
<span class="line"># 密码</span>
<span class="line">requirepass 123456</span>
<span class="line"></span>
<span class="line"># 持久化（AOF）</span>
<span class="line">appendonly yes</span>
<span class="line">appendfsync everysec</span>
<span class="line"></span>
<span class="line"># 最大内存（缓存场景）</span>
<span class="line">maxmemory 1gb</span>
<span class="line">maxmemory-policy allkeys-lru  # 淘汰策略</span>
<span class="line"></span>
<span class="line"># 数据库数量</span>
<span class="line">databases 16</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="可视化工具" tabindex="-1"><a class="header-anchor" href="#可视化工具"><span>可视化工具</span></a></h2><table><thead><tr><th>工具</th><th>平台</th><th>说明</th></tr></thead><tbody><tr><td><strong>RedisInsight</strong></td><td>全平台</td><td>官方出品，推荐</td></tr><tr><td><strong>AnotherRedisDesktopManager</strong></td><td>全平台</td><td>免费开源</td></tr><tr><td><strong>Tiny RDM</strong></td><td>全平台</td><td>轻量免费</td></tr><tr><td><strong>QuickRedis</strong></td><td>Windows</td><td>免费</td></tr></tbody></table><h2 id="常用命令速查" tabindex="-1"><a class="header-anchor" href="#常用命令速查"><span>常用命令速查</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 连接操作</span></span>
<span class="line">AUTH password</span>
<span class="line">PING</span>
<span class="line">SELECT db_index</span>
<span class="line">QUIT</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看信息</span></span>
<span class="line">INFO                <span class="token comment"># 服务器信息</span></span>
<span class="line">INFO memory         <span class="token comment"># 内存信息</span></span>
<span class="line">INFO clients        <span class="token comment"># 客户端信息</span></span>
<span class="line">INFO stats          <span class="token comment"># 统计信息</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 监控</span></span>
<span class="line">MONITOR             <span class="token comment"># 实时监控所有命令（慎用）</span></span>
<span class="line">SLOWLOG GET <span class="token number">10</span>      <span class="token comment"># 查看最近 10 条慢查询</span></span>
<span class="line">CLIENT LIST         <span class="token comment"># 查看所有客户端</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="练习" tabindex="-1"><a class="header-anchor" href="#练习"><span>练习</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 使用 Docker 启动 Redis</span></span>
<span class="line"><span class="token comment"># 2. 连接 Redis 并设置/获取一个字符串</span></span>
<span class="line"><span class="token comment"># 3. 设置一个带过期时间的 key</span></span>
<span class="line"><span class="token comment"># 4. 查看当前数据库中所有 key</span></span>
<span class="line"><span class="token comment"># 5. 修改 Redis 密码并重启</span></span>
<span class="line"></span></code></pre></div>`,26)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};