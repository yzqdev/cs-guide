import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/java-tutor/orm-tutor/redis/03-commands.html","title":"Redis 常用命令参考","lang":"zh-CN","frontmatter":{"description":"Redis 常用命令参考 Redis 命令参考，按功能分类。 Key 操作 数据库操作 事务 发布订阅 Pipeline 管道 慢查询日志 客户端管理 服务器管理 批量操作技巧 练习","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis 常用命令参考\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T07:23:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/redis/03-commands.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Redis 常用命令参考"}],["meta",{"property":"og:description","content":"Redis 常用命令参考 Redis 命令参考，按功能分类。 Key 操作 数据库操作 事务 发布订阅 Pipeline 管道 慢查询日志 客户端管理 服务器管理 批量操作技巧 练习"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T07:23:11.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T07:23:11.000Z"}]]},"git":{"createdTime":1783927391000,"updatedTime":1783927391000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":2.65,"words":795},"filePathRelative":"java-tutor/orm-tutor/redis/03-commands.md","autoDesc":true}`),a={name:`03-commands.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="redis-常用命令参考" tabindex="-1"><a class="header-anchor" href="#redis-常用命令参考"><span>Redis 常用命令参考</span></a></h1><blockquote><p>Redis 命令参考，按功能分类。</p></blockquote><h2 id="key-操作" tabindex="-1"><a class="header-anchor" href="#key-操作"><span>Key 操作</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 基本操作</span></span>
<span class="line">DEL key                 <span class="token comment"># 删除 key</span></span>
<span class="line">EXISTS key              <span class="token comment"># 是否存在（1/0）</span></span>
<span class="line">TYPE key                <span class="token comment"># 返回类型</span></span>
<span class="line">RENAME key newkey       <span class="token comment"># 重命名</span></span>
<span class="line">RENAMENX key newkey     <span class="token comment"># 仅新名不存在时重命名</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 过期时间</span></span>
<span class="line">EXPIRE key seconds      <span class="token comment"># 设置过期</span></span>
<span class="line">TTL key                 <span class="token comment"># 查看剩余秒数</span></span>
<span class="line">PTTL key                <span class="token comment"># 查看剩余毫秒数</span></span>
<span class="line">PERSIST key             <span class="token comment"># 移除过期时间</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查找</span></span>
<span class="line">KEYS pattern            <span class="token comment"># 匹配 key（*任意多个，?单个）</span></span>
<span class="line"><span class="token comment"># KEYS user:*           # 所有 user: 开头的 key</span></span>
<span class="line"><span class="token comment"># KEYS *                # 所有 key（生产环境慎用）</span></span>
<span class="line">SCAN cursor <span class="token punctuation">[</span>MATCH pattern<span class="token punctuation">]</span> <span class="token punctuation">[</span>COUNT count<span class="token punctuation">]</span>  <span class="token comment"># 游标扫描（推荐生产环境）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 序列化</span></span>
<span class="line">DUMP key                <span class="token comment"># 序列化 key</span></span>
<span class="line">RESTORE key ttl serialized_value  <span class="token comment"># 反序列化恢复</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 其他</span></span>
<span class="line">RANDOMKEY               <span class="token comment"># 随机返回一个 key</span></span>
<span class="line">SORT key                <span class="token comment"># 排序（List/Set/ZSet）</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据库操作" tabindex="-1"><a class="header-anchor" href="#数据库操作"><span>数据库操作</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 选择数据库</span></span>
<span class="line">SELECT <span class="token number">0</span>                <span class="token comment"># 选择 0 号库（默认 0-15）</span></span>
<span class="line">SELECT <span class="token number">1</span>                <span class="token comment"># 选择 1 号库</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清空</span></span>
<span class="line">FLUSHDB                 <span class="token comment"># 清空当前库</span></span>
<span class="line">FLUSHALL                <span class="token comment"># 清空所有库</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 信息</span></span>
<span class="line">DBSIZE                  <span class="token comment"># 当前库 key 数量</span></span>
<span class="line">INFO                    <span class="token comment"># 服务器信息</span></span>
<span class="line">INFO keyspace           <span class="token comment"># 各库 key 统计</span></span>
<span class="line"></span></code></pre></div><h2 id="事务" tabindex="-1"><a class="header-anchor" href="#事务"><span>事务</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># Redis 事务：批量执行命令，保证原子性</span></span>
<span class="line">MULTI                   <span class="token comment"># 开始事务</span></span>
<span class="line">SET key1 <span class="token string">&quot;value1&quot;</span></span>
<span class="line">SET key2 <span class="token string">&quot;value2&quot;</span></span>
<span class="line">INCR counter</span>
<span class="line">EXEC                    <span class="token comment"># 提交执行</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 或取消</span></span>
<span class="line">MULTI</span>
<span class="line">SET key1 <span class="token string">&quot;v1&quot;</span></span>
<span class="line">DISCARD                 <span class="token comment"># 取消事务</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 乐观锁（CAS）</span></span>
<span class="line">WATCH key               <span class="token comment"># 监视 key</span></span>
<span class="line">MULTI</span>
<span class="line">SET key <span class="token string">&quot;newvalue&quot;</span></span>
<span class="line">EXEC                    <span class="token comment"># 如果 key 被其他客户端修改，则事务失败</span></span>
<span class="line">UNWATCH                 <span class="token comment"># 取消监视</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="发布订阅" tabindex="-1"><a class="header-anchor" href="#发布订阅"><span>发布订阅</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 订阅者（Subscriber）</span></span>
<span class="line">SUBSCRIBE channel        <span class="token comment"># 订阅频道</span></span>
<span class="line">PSUBSCRIBE news:*        <span class="token comment"># 订阅匹配模式的频道</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 发布者（Publisher）</span></span>
<span class="line">PUBLISH channel <span class="token string">&quot;hello&quot;</span>  <span class="token comment"># 发布消息</span></span>
<span class="line">PUBSUB CHANNELS          <span class="token comment"># 查看活跃频道</span></span>
<span class="line">PUBSUB NUMSUB channel    <span class="token comment"># 查看频道订阅数</span></span>
<span class="line"></span></code></pre></div><h2 id="pipeline-管道" tabindex="-1"><a class="header-anchor" href="#pipeline-管道"><span>Pipeline 管道</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># Pipeline 可以批量发送命令，减少网络往返</span></span>
<span class="line"><span class="token comment"># redis-cli 管道模式</span></span>
<span class="line"><span class="token punctuation">(</span>echo <span class="token parameter variable">-en</span> <span class="token string">&quot;SET k1 v1<span class="token entity" title="\\r">\\r</span><span class="token entity" title="\\n">\\n</span>SET k2 v2<span class="token entity" title="\\r">\\r</span><span class="token entity" title="\\n">\\n</span>GET k1<span class="token entity" title="\\r">\\r</span><span class="token entity" title="\\n">\\n</span>&quot;</span><span class="token punctuation">;</span> <span class="token function">sleep</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">|</span> redis-cli <span class="token parameter variable">--pipe</span></span>
<span class="line"></span></code></pre></div><h2 id="慢查询日志" tabindex="-1"><a class="header-anchor" href="#慢查询日志"><span>慢查询日志</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 配置（在 redis.conf 或命令行）</span></span>
<span class="line">CONFIG SET slowlog-log-slower-than <span class="token number">10000</span>  <span class="token comment"># 慢查询阈值（微秒）</span></span>
<span class="line">CONFIG SET slowlog-max-len <span class="token number">128</span>            <span class="token comment"># 记录条数</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看</span></span>
<span class="line">SLOWLOG GET <span class="token number">10</span>          <span class="token comment"># 查看最近 10 条慢查询</span></span>
<span class="line">SLOWLOG LEN             <span class="token comment"># 慢查询总数</span></span>
<span class="line">SLOWLOG RESET           <span class="token comment"># 清空慢查询</span></span>
<span class="line"></span></code></pre></div><h2 id="客户端管理" tabindex="-1"><a class="header-anchor" href="#客户端管理"><span>客户端管理</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 查看客户端</span></span>
<span class="line">CLIENT LIST             <span class="token comment"># 所有客户端</span></span>
<span class="line">CLIENT INFO             <span class="token comment"># 当前客户端</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 操作客户端</span></span>
<span class="line">CLIENT GETNAME          <span class="token comment"># 获取连接名</span></span>
<span class="line">CLIENT SETNAME myapp    <span class="token comment"># 设置连接名</span></span>
<span class="line">CLIENT KILL addr:port   <span class="token comment"># 断开某个客户端</span></span>
<span class="line">CLIENT PAUSE <span class="token number">10000</span>      <span class="token comment"># 暂停所有客户端 10 秒</span></span>
<span class="line"></span></code></pre></div><h2 id="服务器管理" tabindex="-1"><a class="header-anchor" href="#服务器管理"><span>服务器管理</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 配置</span></span>
<span class="line">CONFIG GET *             <span class="token comment"># 查看所有配置</span></span>
<span class="line">CONFIG GET requirepass   <span class="token comment"># 查看密码</span></span>
<span class="line">CONFIG SET requirepass <span class="token string">&quot;newpass&quot;</span>  <span class="token comment"># 修改配置（临时）</span></span>
<span class="line">CONFIG REWRITE           <span class="token comment"># 保存配置到文件</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 数据持久化</span></span>
<span class="line">SAVE                    <span class="token comment"># 阻塞式保存 RDB</span></span>
<span class="line">BGSAVE                  <span class="token comment"># 后台保存 RDB</span></span>
<span class="line">BGREWRITEAOF            <span class="token comment"># 重写 AOF 日志</span></span>
<span class="line">LASTSAVE                <span class="token comment"># 最后保存时间戳</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 关闭</span></span>
<span class="line">SHUTDOWN                <span class="token comment"># 关闭服务器</span></span>
<span class="line">SHUTDOWN NOSAVE         <span class="token comment"># 不保存关闭</span></span>
<span class="line">SHUTDOWN SAVE           <span class="token comment"># 保存后关闭</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 复制（主从）</span></span>
<span class="line">REPLICAOF <span class="token function">host</span> port     <span class="token comment"># 设置主从复制</span></span>
<span class="line">ROLE                    <span class="token comment"># 查看角色（master/slave）</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="批量操作技巧" tabindex="-1"><a class="header-anchor" href="#批量操作技巧"><span>批量操作技巧</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 批量获取（Shell）</span></span>
<span class="line">redis-cli <span class="token parameter variable">-a</span> password KEYS <span class="token string">&quot;user:*&quot;</span> <span class="token operator">|</span> <span class="token function">xargs</span> redis-cli <span class="token parameter variable">-a</span> password DEL</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 批量设置（通过管道）</span></span>
<span class="line"><span class="token function">cat</span> data.txt <span class="token operator">|</span> redis-cli <span class="token parameter variable">--pipe</span></span>
<span class="line"><span class="token comment"># data.txt 格式：</span></span>
<span class="line"><span class="token comment"># SET key1 value1</span></span>
<span class="line"><span class="token comment"># SET key2 value2</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查找并删除</span></span>
<span class="line">redis-cli <span class="token parameter variable">-a</span> password KEYS <span class="token string">&quot;cache:*&quot;</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> key<span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">  redis-cli <span class="token parameter variable">-a</span> password DEL <span class="token string">&quot;<span class="token variable">$key</span>&quot;</span></span>
<span class="line"><span class="token keyword">done</span></span>
<span class="line"></span></code></pre></div><h2 id="练习" tabindex="-1"><a class="header-anchor" href="#练习"><span>练习</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 使用 SCAN 替代 KEYS 扫描所有 user: 开头的 key</span></span>
<span class="line"><span class="token comment"># 2. 使用事务同时设置两个 key</span></span>
<span class="line"><span class="token comment"># 3. 查看 Redis 慢查询日志</span></span>
<span class="line"><span class="token comment"># 4. 使用 CONFIG 查看当前内存配置</span></span>
<span class="line"></span></code></pre></div>`,22)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};