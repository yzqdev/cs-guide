import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/java-tutor/orm-tutor/redis/02-data-types.html","title":"Redis 数据类型详解","lang":"zh-CN","frontmatter":{"description":"Redis 数据类型详解 Redis 支持 5 种核心数据结构：String、Hash、List、Set、ZSet（有序集合）。 String — 字符串 Redis 最基础的类型，value 最大 512MB。 Hash — 哈希 适合存储对象，可以单独操作对象中的某个字段。 List — 列表 有序列表，支持从两端插入和弹出，可用作队列或栈。 Se...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis 数据类型详解\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T07:23:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/redis/02-data-types.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Redis 数据类型详解"}],["meta",{"property":"og:description","content":"Redis 数据类型详解 Redis 支持 5 种核心数据结构：String、Hash、List、Set、ZSet（有序集合）。 String — 字符串 Redis 最基础的类型，value 最大 512MB。 Hash — 哈希 适合存储对象，可以单独操作对象中的某个字段。 List — 列表 有序列表，支持从两端插入和弹出，可用作队列或栈。 Se..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T07:23:11.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T07:23:11.000Z"}]]},"git":{"createdTime":1783927391000,"updatedTime":1783927391000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.69,"words":1106},"filePathRelative":"java-tutor/orm-tutor/redis/02-data-types.md","autoDesc":true}`),a={name:`02-data-types.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="redis-数据类型详解" tabindex="-1"><a class="header-anchor" href="#redis-数据类型详解"><span>Redis 数据类型详解</span></a></h1><blockquote><p>Redis 支持 5 种核心数据结构：String、Hash、List、Set、ZSet（有序集合）。</p></blockquote><h2 id="string-—-字符串" tabindex="-1"><a class="header-anchor" href="#string-—-字符串"><span>String — 字符串</span></a></h2><p>Redis 最基础的类型，value 最大 512MB。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 设置</span></span>
<span class="line">SET name <span class="token string">&quot;张三&quot;</span></span>
<span class="line">SETNX name <span class="token string">&quot;李四&quot;</span>    <span class="token comment"># 仅在 key 不存在时设置（常用于分布式锁）</span></span>
<span class="line">MSET k1 v1 k2 v2    <span class="token comment"># 批量设置</span></span>
<span class="line">GET name            <span class="token comment"># &quot;张三&quot;</span></span>
<span class="line">MGET k1 k2          <span class="token comment"># 批量获取</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 数字操作</span></span>
<span class="line">SET count <span class="token number">10</span></span>
<span class="line">INCR count          <span class="token comment"># 11（自增 1）</span></span>
<span class="line">INCRBY count <span class="token number">5</span>      <span class="token comment"># 16（加 5）</span></span>
<span class="line">DECR count          <span class="token comment"># 15</span></span>
<span class="line">DECRBY count <span class="token number">3</span>      <span class="token comment"># 12</span></span>
<span class="line">INCRBYFLOAT price <span class="token number">10.5</span>  <span class="token comment"># 浮点运算</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 字符串操作</span></span>
<span class="line">APPEND name <span class="token string">&quot;先生&quot;</span>  <span class="token comment"># 追加</span></span>
<span class="line">GETRANGE name <span class="token number">0</span> <span class="token number">1</span>   <span class="token comment"># &quot;张&quot;（截取）</span></span>
<span class="line">STRLEN name         <span class="token comment"># 长度</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 过期时间</span></span>
<span class="line">SET code <span class="token string">&quot;1234&quot;</span> EX <span class="token number">60</span> NX  <span class="token comment"># 60秒过期 + 不存在才设</span></span>
<span class="line">SETEX code <span class="token number">60</span> <span class="token string">&quot;1234&quot;</span>      <span class="token comment"># 同上（简化语法）</span></span>
<span class="line">TTL code                  <span class="token comment"># 查看剩余秒数</span></span>
<span class="line">PERSIST code              <span class="token comment"># 移除过期时间</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 场景：缓存</span></span>
<span class="line">SET user:1 <span class="token string">&#39;{&quot;name&quot;:&quot;张三&quot;,&quot;age&quot;:25}&#39;</span> EX <span class="token number">3600</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 场景：分布式锁</span></span>
<span class="line">SET lock:order:123 <span class="token string">&quot;locked&quot;</span> NX EX <span class="token number">30</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hash-—-哈希" tabindex="-1"><a class="header-anchor" href="#hash-—-哈希"><span>Hash — 哈希</span></a></h2><p>适合存储对象，可以单独操作对象中的某个字段。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 设置单个字段</span></span>
<span class="line">HSET user:1 name <span class="token string">&quot;张三&quot;</span></span>
<span class="line">HSET user:1 age <span class="token number">25</span></span>
<span class="line">HSET user:1 email <span class="token string">&quot;zhangsan@test.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 批量设置</span></span>
<span class="line">HMSET user:2 name <span class="token string">&quot;李四&quot;</span> age <span class="token number">30</span> email <span class="token string">&quot;lisi@test.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取</span></span>
<span class="line">HGET user:1 name           <span class="token comment"># &quot;张三&quot;</span></span>
<span class="line">HMGET user:1 name age      <span class="token comment"># [&quot;张三&quot;, &quot;25&quot;]</span></span>
<span class="line">HGETALL user:1             <span class="token comment"># 所有字段和值</span></span>
<span class="line">HKEYS user:1               <span class="token comment"># 所有字段名</span></span>
<span class="line">HVALS user:1               <span class="token comment"># 所有值</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 数字运算</span></span>
<span class="line">HINCRBY user:1 age <span class="token number">1</span>       <span class="token comment"># 26（年龄加 1）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 判断存在</span></span>
<span class="line">HEXISTS user:1 name        <span class="token comment"># 1（存在）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除字段</span></span>
<span class="line">HDEL user:1 email</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 长度</span></span>
<span class="line">HLEN user:1                <span class="token comment"># 2（字段数）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 场景：用户信息、商品信息</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="list-—-列表" tabindex="-1"><a class="header-anchor" href="#list-—-列表"><span>List — 列表</span></a></h2><p>有序列表，支持从两端插入和弹出，可用作队列或栈。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 从左边插入（栈：后进先出）</span></span>
<span class="line">LPUSH queue <span class="token string">&quot;task1&quot;</span></span>
<span class="line">LPUSH queue <span class="token string">&quot;task2&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 从右边插入（队列：先进先出）</span></span>
<span class="line">RPUSH queue <span class="token string">&quot;task0&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 弹出</span></span>
<span class="line">LPOP queue    <span class="token comment"># &quot;task2&quot;（左端弹出）</span></span>
<span class="line">RPOP queue    <span class="token comment"># &quot;task0&quot;（右端弹出）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看</span></span>
<span class="line">LRANGE queue <span class="token number">0</span> <span class="token parameter variable">-1</span>      <span class="token comment"># 所有元素（-1 表示最后一个）</span></span>
<span class="line">LRANGE queue <span class="token number">0</span> <span class="token number">2</span>       <span class="token comment"># 前 3 个</span></span>
<span class="line">LLEN queue              <span class="token comment"># 长度</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 阻塞弹出（常用于消息队列）</span></span>
<span class="line">BLPOP queue <span class="token number">5</span>          <span class="token comment"># 5 秒内等待，有元素时弹出</span></span>
<span class="line">BRPOP queue <span class="token number">5</span>          <span class="token comment"># 从右端阻塞弹出</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 场景：消息队列、最新消息列表</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="set-—-集合" tabindex="-1"><a class="header-anchor" href="#set-—-集合"><span>Set — 集合</span></a></h2><p>无序、不可重复。支持交集、并集、差集运算。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 添加元素</span></span>
<span class="line">SADD user:1:tags <span class="token string">&quot;Java&quot;</span> <span class="token string">&quot;Python&quot;</span> <span class="token string">&quot;SQL&quot;</span></span>
<span class="line">SADD user:1:tags <span class="token string">&quot;Java&quot;</span>   <span class="token comment"># 0（重复，添加失败）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取</span></span>
<span class="line">SMEMBERS user:1:tags      <span class="token comment"># 所有元素</span></span>
<span class="line">SCARD user:1:tags         <span class="token comment"># 元素数量</span></span>
<span class="line">SISMEMBER user:1:tags <span class="token string">&quot;Java&quot;</span>  <span class="token comment"># 1（存在）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除</span></span>
<span class="line">SREM user:1:tags <span class="token string">&quot;SQL&quot;</span>    <span class="token comment"># 移除元素</span></span>
<span class="line">SPOP user:1:tags          <span class="token comment"># 随机弹出一个</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 集合运算</span></span>
<span class="line">SADD set1 a b c d</span>
<span class="line">SADD set2 c d e f</span>
<span class="line"></span>
<span class="line">SINTER set1 set2            <span class="token comment"># 交集：c d</span></span>
<span class="line">SUNION set1 set2            <span class="token comment"># 并集：a b c d e f</span></span>
<span class="line">SDIFF set1 set2             <span class="token comment"># 差集：a b</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 场景：标签、关注列表、共同好友</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="zset-—-有序集合" tabindex="-1"><a class="header-anchor" href="#zset-—-有序集合"><span>ZSet — 有序集合</span></a></h2><p>每个元素关联一个分数（score），按分数排序。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 添加元素（分数决定排序位置）</span></span>
<span class="line">ZADD leaderboard <span class="token number">100</span> <span class="token string">&quot;张三&quot;</span></span>
<span class="line">ZADD leaderboard <span class="token number">90</span> <span class="token string">&quot;李四&quot;</span></span>
<span class="line">ZADD leaderboard <span class="token number">80</span> <span class="token string">&quot;王五&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取</span></span>
<span class="line">ZRANGE leaderboard <span class="token number">0</span> <span class="token parameter variable">-1</span>        <span class="token comment"># 按分数升序：王五 李四 张三</span></span>
<span class="line">ZREVRANGE leaderboard <span class="token number">0</span> <span class="token parameter variable">-1</span>     <span class="token comment"># 按分数降序：张三 李四 王五</span></span>
<span class="line">ZRANGE leaderboard <span class="token number">0</span> <span class="token parameter variable">-1</span> WITHSCORES  <span class="token comment"># 带分数</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 排名</span></span>
<span class="line">ZRANK leaderboard <span class="token string">&quot;张三&quot;</span>       <span class="token comment"># 2（升序排名，从 0 开始）</span></span>
<span class="line">ZREVRANK leaderboard <span class="token string">&quot;张三&quot;</span>    <span class="token comment"># 0（降序排名）</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 分数操作</span></span>
<span class="line">ZINCRBY leaderboard <span class="token number">5</span> <span class="token string">&quot;张三&quot;</span>  <span class="token comment"># 加 5 分 → 105</span></span>
<span class="line">ZSCORE leaderboard <span class="token string">&quot;张三&quot;</span>     <span class="token comment"># 105</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 范围查询</span></span>
<span class="line">ZRANGEBYSCORE leaderboard <span class="token number">80</span> <span class="token number">100</span>  <span class="token comment"># 分数在 80-100 之间的</span></span>
<span class="line">ZCOUNT leaderboard <span class="token number">80</span> <span class="token number">100</span>          <span class="token comment"># 计数</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除</span></span>
<span class="line">ZREM leaderboard <span class="token string">&quot;王五&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 场景：排行榜、延时队列</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据类型选择对照" tabindex="-1"><a class="header-anchor" href="#数据类型选择对照"><span>数据类型选择对照</span></a></h2><table><thead><tr><th>类型</th><th>底层实现</th><th>适用场景</th><th>不适用场景</th></tr></thead><tbody><tr><td>String</td><td>动态字符串</td><td>缓存、计数器、分布式锁</td><td>大文本频繁修改</td></tr><tr><td>Hash</td><td>哈希表</td><td>对象存储、用户信息</td><td>字段很多的扁平数据</td></tr><tr><td>List</td><td>双向链表</td><td>消息队列、时间线</td><td>频繁随机访问中间元素</td></tr><tr><td>Set</td><td>哈希表</td><td>标签、去重、共同好友</td><td>需要排序</td></tr><tr><td>ZSet</td><td>跳表+哈希表</td><td>排行榜、延时队列</td><td>频繁添加大量成员</td></tr></tbody></table><h2 id="过期时间设置" tabindex="-1"><a class="header-anchor" href="#过期时间设置"><span>过期时间设置</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 创建时设置过期</span></span>
<span class="line">SET code <span class="token string">&quot;1234&quot;</span> EX <span class="token number">60</span></span>
<span class="line">SETEX code <span class="token number">60</span> <span class="token string">&quot;1234&quot;</span>     <span class="token comment"># 简化版</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 对已有 key 设置过期</span></span>
<span class="line">EXPIRE key <span class="token number">60</span>            <span class="token comment"># 60 秒后过期</span></span>
<span class="line">EXPIRE key <span class="token number">3600</span>          <span class="token comment"># 1 小时后过期</span></span>
<span class="line">EXPIREAT key <span class="token number">1700000000</span>  <span class="token comment"># 指定时间戳过期</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看过期时间</span></span>
<span class="line">TTL key                  <span class="token comment"># 剩余秒数（-1 永不过期，-2 已过期）</span></span>
<span class="line">PTTL key                 <span class="token comment"># 剩余毫秒数</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 取消过期</span></span>
<span class="line">PERSIST key              <span class="token comment"># 移除过期时间</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="练习" tabindex="-1"><a class="header-anchor" href="#练习"><span>练习</span></a></h2><div class="language-bash" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 1. 用 Hash 存储一个用户对象</span></span>
<span class="line"><span class="token comment"># 2. 用 List 实现一个简单的消息队列</span></span>
<span class="line"><span class="token comment"># 3. 用 Set 存储用户的标签并计算交集</span></span>
<span class="line"><span class="token comment"># 4. 用 ZSet 实现一个游戏排行榜</span></span>
<span class="line"></span></code></pre></div>`,23)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};