import{_ as e,c as r,o as t,d as a}from"./app-CbULZrmi.js";const s={},o=a(`<h1 id="redis使用" tabindex="-1"><a class="header-anchor" href="#redis使用"><span>Redis使用</span></a></h1><p>不还意思没有rediswindows版本,需要memurai</p><h2 id="推荐使用" tabindex="-1"><a class="header-anchor" href="#推荐使用"><span>推荐使用</span></a></h2><p><a href="https://github.com/tporadowski/redis/releases" target="_blank" rel="noopener noreferrer">https://github.com/tporadowski/redis/releases</a></p><h2 id="memurai" tabindex="-1"><a class="header-anchor" href="#memurai"><span>memurai</span></a></h2><p><a href="https://www.memurai.com/get-memurai" target="_blank" rel="noopener noreferrer">https://www.memurai.com/get-memurai</a> 这个不行的话使用winget</p><h2 id="redis工具推荐" tabindex="-1"><a class="header-anchor" href="#redis工具推荐"><span>redis工具推荐</span></a></h2><p>官方管理工具</p><ul><li><p><a href="https://download.redisinsight.redis.com/latest/RedisInsight-v2-win-installer.exe" target="_blank" rel="noopener noreferrer">redisinsight</a> 用这个</p></li><li><p><a href="https://github.com/zkteco-home/redis-windows" target="_blank" rel="noopener noreferrer">https://github.com/zkteco-home/redis-windows</a></p></li><li><p><a href="https://github.com/tporadowski/redis" target="_blank" rel="noopener noreferrer">https://github.com/tporadowski/redis</a><br> 也可以用memurai</p></li><li><p><a href="https://www.memurai.com/get-memurai" target="_blank" rel="noopener noreferrer">https://www.memurai.com/get-memurai</a></p></li><li><p><a href="https://gitee.com/quick123official/quick_redis_blog" target="_blank" rel="noopener noreferrer">https://gitee.com/quick123official/quick_redis_blog</a></p></li></ul><h3 id="redisclient" tabindex="-1"><a class="header-anchor" href="#redisclient"><span>RedisClient</span></a></h3><p><strong>是否收费</strong>：免费 <strong>项目介绍</strong>：Java 编写的 Redis 连接客户端，功能丰富，并且是免费的。 <strong>支持平台</strong>：Windows <strong>项目地址</strong>：<a href="https://github.com/caoxinyu/RedisClient" target="_blank" rel="noopener noreferrer">https://github.com/caoxinyu/RedisClient</a></p><h3 id="redisstudio" tabindex="-1"><a class="header-anchor" href="#redisstudio"><span>RedisStudio</span></a></h3><p><strong>是否收费</strong>：免费 <strong>项目介绍</strong>：一款 C++ 编写的 Redis 管理工具，比较老，好久没更新了。 <strong>支持平台</strong>：Windows <strong>项目地址</strong>：<a href="https://github.com/cinience/RedisStudio" target="_blank" rel="noopener noreferrer">https://github.com/cinience/RedisStudio</a></p><h3 id="anotherredisdesktopmanager" tabindex="-1"><a class="header-anchor" href="#anotherredisdesktopmanager"><span>AnotherRedisDesktopManager</span></a></h3><p><strong>是否收费</strong>：免费 <strong>项目介绍</strong>：一款基于 NodeJS 开发的 Redis 桌面管理器，它的特点就是相对来说比较稳定，在数据量比较大的时候不会崩溃。 <strong>支持平台</strong>：Windows、Mac OS、Linux <strong>项目地址</strong>：<a href="https://github.com/qishibo/AnotherRedisDesktopManager" target="_blank" rel="noopener noreferrer">https://github.com/qishibo/AnotherRedisDesktopManager</a></p><h2 id="其他-redis-可视化工具" tabindex="-1"><a class="header-anchor" href="#其他-redis-可视化工具"><span>其他 Redis 可视化工具</span></a></h2><ul><li>Medis：<a href="https://github.com/luin/medis" target="_blank" rel="noopener noreferrer">https://github.com/luin/medis</a></li><li>phpRedisAdmin：<a href="https://github.com/ErikDubbelboer/phpRedisAdmin" target="_blank" rel="noopener noreferrer">https://github.com/ErikDubbelboer/phpRedisAdmin</a></li><li>PyRedisAdmin：<a href="https://github.com/JoneXiong/PyRedisAdmin" target="_blank" rel="noopener noreferrer">https://github.com/JoneXiong/PyRedisAdmin</a></li><li>Go-Redis：<a href="https://github.com/alphazero/Go-Redis" target="_blank" rel="noopener noreferrer">https://github.com/alphazero/Go-Redis</a></li><li>RedisLive：<a href="https://github.com/nkrode/RedisLive" target="_blank" rel="noopener noreferrer">https://github.com/nkrode/RedisLive</a></li><li>TreeDMS ：<a href="http://www.treesoft.cn/dms.html" target="_blank" rel="noopener noreferrer">http://www.treesoft.cn/dms.html</a></li><li><a href="https://github.com/tiny-craft/tiny-rdm" target="_blank" rel="noopener noreferrer">tinyrdm</a></li><li><a href="https://github.com/dromara/RedisFront" target="_blank" rel="noopener noreferrer">redis-front</a></li></ul><p><a href="https://www.zhihu.com/question/57728399" target="_blank" rel="noopener noreferrer">https://www.zhihu.com/question/57728399</a></p><p><a href="https://github.com/cc20110101/RedisView" target="_blank" rel="noopener noreferrer">https://github.com/cc20110101/RedisView</a><a href="https://github.com/qishibo/AnotherRedisDesktopManager/" target="_blank" rel="noopener noreferrer">https://github.com/qishibo/AnotherRedisDesktopManager/</a></p><h2 id="springboot使用redis存储乱码" tabindex="-1"><a class="header-anchor" href="#springboot使用redis存储乱码"><span>springboot使用redis存储乱码</span></a></h2><p>需要配置一下redisTemplate</p><pre><code class="language-java">@Configuration
public class RedisConfig {
    @Bean
    public StringRedisTemplate redisTemplate(RedisConnectionFactory factory) {
        StringRedisTemplate redisTemplate = new StringRedisTemplate(factory);

        ObjectMapper om = new ObjectMapper();
        om.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.deactivateDefaultTyping( );
      Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(om,
        Object.class);
        //设置完这个可以直接将对象以json格式存入redis中，但是取出来的时候要用JSON.parseArray(Json.toJsonString(object),Object.class)解析一下
        redisTemplate.setValueSerializer(jackson2JsonRedisSerializer);
        redisTemplate.setHashValueSerializer(jackson2JsonRedisSerializer);
        //调用后完成设置
        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }
}

</code></pre><h2 id="redis常用的数据类型" tabindex="-1"><a class="header-anchor" href="#redis常用的数据类型"><span>Redis常用的数据类型</span></a></h2><ul><li>String</li><li>Hash</li><li>List</li><li>Set</li><li>zSet</li><li>Sorted set</li></ul><h2 id="string类型" tabindex="-1"><a class="header-anchor" href="#string类型"><span>String类型</span></a></h2><p><strong>判断是否有key所对应的值，有则返回true，没有则返回false</strong></p><pre><code class="language-java">redisTemplate.hasKey(key)
</code></pre><p><strong>有则取出key值所对应的值</strong></p><pre><code class="language-java">redisTemplate.opsForValue().get(key)
</code></pre><p><strong>删除单个key值</strong></p><pre><code class="language-java">redisTemplate.delete(key)
</code></pre><p><strong>批量删除key</strong></p><pre><code class="language-java">redisTemplate.delete(keys) //其中keys:Collection&lt;K&gt; keys
</code></pre><p><strong>将当前传入的key值序列化为byte[]类型</strong></p><pre><code class="language-java">redisTemplate.dump(key)
</code></pre><p><strong>设置过期时间</strong></p><pre><code class="language-java">public Boolean expire(String key, long timeout, TimeUnit unit) {
    return redisTemplate.expire(key, timeout, unit);
 }

 public Boolean expireAt(String key, Date date) {
    return redisTemplate.expireAt(key, date);
  }
</code></pre><p><strong>查找匹配的key值，返回一个Set集合类型</strong></p><pre><code class="language-java">public Set&lt;String&gt; getPatternKey(String pattern) {
    return redisTemplate.keys(pattern);
}
</code></pre><p><strong>修改redis中key的名称</strong></p><pre><code class="language-java"> public void renameKey(String oldKey, String newKey) {
    redisTemplate.rename(oldKey, newKey);
}
</code></pre><p><strong>返回传入key所存储的值的类型</strong></p><pre><code class="language-java">public DataType getKeyType(String key) {
    return redisTemplate.type(key);
}
</code></pre><p><strong>如果旧值存在时，将旧值改为新值</strong></p><pre><code class="language-java">public Boolean renameOldKeyIfAbsent(String oldKey, String newKey) {
    return redisTemplate.renameIfAbsent(oldKey, newKey);
}
</code></pre><p><strong>从redis中随机取出一个key</strong></p><pre><code class="language-java">redisTemplate.randomKey()
</code></pre><p><strong>返回当前key所对应的剩余过期时间</strong></p><pre><code class="language-java"> public Long getExpire(String key) {
    return redisTemplate.getExpire(key);
}
</code></pre><p><strong>返回剩余过期时间并且指定时间单位</strong></p><pre><code class="language-java">public Long getExpire(String key, TimeUnit unit) {
    return redisTemplate.getExpire(key, unit);
}
</code></pre><p><strong>将key持久化保存</strong></p><pre><code class="language-java">public Boolean persistKey(String key) {
    return redisTemplate.persist(key);
}
</code></pre><p><strong>将当前数据库的key移动到指定redis中数据库当中</strong></p><pre><code class="language-java">public Boolean moveToDbIndex(String key, int dbIndex) {
    return redisTemplate.move(key, dbIndex);
}
</code></pre><p><strong>设置当前的key以及value值</strong></p><pre><code class="language-java">redisTemplate.opsForValue().set(key, value)
</code></pre><p><strong>设置当前的key以及value值并且设置过期时间</strong></p><pre><code class="language-java">redisTemplate.opsForValue().set(key, value, timeout, unit)
</code></pre><p><strong>返回key中字符串的子字符</strong></p><pre><code class="language-java">public String getCharacterRange(String key, long start, long end) {
    return redisTemplate.opsForValue().get(key, start, end);
}
</code></pre><p><strong>将旧的key设置为value，并且返回旧的key</strong></p><pre><code class="language-java">public String setKeyAsValue(String key, String value) {
    return redisTemplate.opsForValue().getAndSet(key, value);
}
</code></pre><p><strong>批量获取值</strong></p><pre><code class="language-java"> public List&lt;String&gt; multiGet(Collection&lt;String&gt; keys) {
    return redisTemplate.opsForValue().multiGet(keys);
 }
</code></pre><p><strong>在原有的值基础上新增字符串到末尾</strong></p><pre><code class="language-java">redisTemplate.opsForValue().append(key, value)
</code></pre><p><strong>以增量的方式将double值存储在变量中</strong></p><pre><code class="language-java"> public Double incrByDouble(String key, double increment) {
    return redisTemplate.opsForValue().increment(key, increment);
 }
</code></pre><p><strong>通过increment(K key, long delta)方法以增量方式存储long值（正值则自增，负值则自减）</strong></p><pre><code class="language-java">public Long incrBy(String key, long increment) {
    return redisTemplate.opsForValue().increment(key, increment);
}
</code></pre><p><strong>如果对应的map集合名称不存在，则添加否则不做修改</strong></p><pre><code class="language-java">Map valueMap = new HashMap();  
valueMap.put(&quot;valueMap1&quot;,&quot;map1&quot;);  
valueMap.put(&quot;valueMap2&quot;,&quot;map2&quot;);  
valueMap.put(&quot;valueMap3&quot;,&quot;map3&quot;);  
redisTemplate.opsForValue().multiSetIfAbsent(valueMap);
</code></pre><p><strong>设置map集合到redis</strong></p><pre><code class="language-java">Map valueMap = new HashMap();  
valueMap.put(&quot;valueMap1&quot;,&quot;map1&quot;);  
valueMap.put(&quot;valueMap2&quot;,&quot;map2&quot;);  
valueMap.put(&quot;valueMap3&quot;,&quot;map3&quot;);  
redisTemplate.opsForValue().multiSet(valueMap);
</code></pre><p><strong>获取字符串的长度</strong></p><pre><code class="language-java">redisTemplate.opsForValue().size(key)
</code></pre><p><strong>用 value 参数覆写给定 key 所储存的字符串值，从偏移量 offset 开始</strong></p><pre><code class="language-java">redisTemplate.opsForValue().set(key, value, offset)
</code></pre><p><strong>重新设置key对应的值，如果存在返回false，否则返回true</strong></p><pre><code class="language-java">redisTemplate.opsForValue().setIfAbsent(key, value)
</code></pre><p><strong>将值 value 关联到 key,并将 key 的过期时间设为 timeout</strong></p><pre><code class="language-java">redisTemplate.opsForValue().set(key, value, timeout, unit)
</code></pre><p><strong>将二进制第offset位值变为value</strong></p><pre><code class="language-java">redisTemplate.opsForValue().setBit(key, offset, value)
</code></pre><p><strong>对key所储存的字符串值，获取指定偏移量上的位(bit)</strong></p><pre><code class="language-java">redisTemplate.opsForValue().getBit(key, offset)
</code></pre><h2 id="hash类型" tabindex="-1"><a class="header-anchor" href="#hash类型"><span>Hash类型</span></a></h2><p>Redis hash 是一个string类型的field和value的映射表，hash特别适合用于存储对象。 Redis 中每个 hash 可以存储 2^32 - 1 键值对（40多亿）。</p><p><strong>获取变量中的指定map键是否有值,如果存在该map键则获取值，没有则返回null。</strong></p><pre><code class="language-java">redisTemplate.opsForHash().get(key, field)
</code></pre><p><strong>获取变量中的键值对</strong></p><pre><code class="language-java">public Map&lt;Object, Object&gt; hGetAll(String key) {
    return redisTemplate.opsForHash().entries(key);
}
</code></pre><p><strong>新增hashMap值</strong></p><pre><code class="language-java">redisTemplate.opsForHash().put(key, hashKey, value)
</code></pre><p><strong>以map集合的形式添加键值对</strong></p><pre><code class="language-java">public void hPutAll(String key, Map&lt;String, String&gt; maps) {
    redisTemplate.opsForHash().putAll(key, maps);
}
</code></pre><p><strong>仅当hashKey不存在时才设置</strong></p><pre><code class="language-java">public Boolean hashPutIfAbsent(String key, String hashKey, String value) {
    return redisTemplate.opsForHash().putIfAbsent(key, hashKey, value);
}
</code></pre><p><strong>删除一个或者多个hash表字段</strong></p><pre><code class="language-java">public Long hashDelete(String key, Object... fields) {
    return redisTemplate.opsForHash().delete(key, fields);
}
</code></pre><p><strong>查看hash表中指定字段是否存在</strong></p><pre><code class="language-java">public boolean hashExists(String key, String field) {
    return redisTemplate.opsForHash().hasKey(key, field);
}
</code></pre><p><strong>给哈希表key中的指定字段的整数值加上增量increment</strong></p><pre><code class="language-java">public Long hashIncrBy(String key, Object field, long increment) {
    return redisTemplate.opsForHash().increment(key, field, increment);
}

 public Double hIncrByDouble(String key, Object field, double delta) {
    return redisTemplate.opsForHash().increment(key, field, delta);
}
</code></pre><p><strong>获取所有hash表中字段</strong></p><pre><code class="language-java">redisTemplate.opsForHash().keys(key)
</code></pre><p><strong>获取hash表中字段的数量</strong></p><pre><code class="language-java">redisTemplate.opsForHash().size(key)
</code></pre><p><strong>获取hash表中存在的所有的值</strong></p><pre><code class="language-java">public List&lt;Object&gt; hValues(String key) {
    return redisTemplate.opsForHash().values(key);
}
</code></pre><p><strong>匹配获取键值对，ScanOptions.NONE为获取全部键对</strong></p><pre><code class="language-java">public Cursor&lt;Entry&lt;Object, Object&gt;&gt; hashScan(String key, ScanOptions options) {
    return redisTemplate.opsForHash().scan(key, options);
}
</code></pre><h2 id="list类型" tabindex="-1"><a class="header-anchor" href="#list类型"><span>List类型</span></a></h2><p><strong>通过索引获取列表中的元素</strong></p><pre><code class="language-java">redisTemplate.opsForList().index(key, index)
</code></pre><p><strong>获取列表指定范围内的元素(start开始位置, 0是开始位置，end 结束位置, -1返回所有)</strong></p><pre><code class="language-java">redisTemplate.opsForList().range(key, start, end)
</code></pre><p><strong>存储在list的头部，即添加一个就把它放在最前面的索引处</strong></p><pre><code class="language-java">redisTemplate.opsForList().leftPush(key, value)
</code></pre><p><strong>把多个值存入List中(value可以是多个值，也可以是一个Collection value)</strong></p><pre><code class="language-java">redisTemplate.opsForList().leftPushAll(key, value)
</code></pre><p><strong>List存在的时候再加入</strong></p><pre><code class="language-java">redisTemplate.opsForList().leftPushIfPresent(key, value)
</code></pre><p><strong>如果pivot处值存在则在pivot前面添加</strong></p><pre><code class="language-java">redisTemplate.opsForList().leftPush(key, pivot, value)
</code></pre><p><strong>按照先进先出的顺序来添加(value可以是多个值，或者是Collection var2)</strong></p><pre><code class="language-java">redisTemplate.opsForList().rightPush(key, value)

redisTemplate.opsForList().rightPushAll(key, value)
</code></pre><p><strong>在pivot元素的右边添加值</strong></p><pre><code class="language-java">redisTemplate.opsForList().rightPush(key, pivot, value)
</code></pre><p><strong>设置指定索引处元素的值</strong></p><pre><code class="language-java">redisTemplate.opsForList().set(key, index, value)
</code></pre><p><strong>移除并获取列表中第一个元素(如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止)</strong></p><pre><code class="language-java">redisTemplate.opsForList().leftPop(key)

redisTemplate.opsForList().leftPop(key, timeout, unit)
</code></pre><p><strong>移除并获取列表最后一个元素</strong></p><pre><code class="language-java">redisTemplate.opsForList().rightPop(key)

redisTemplate.opsForList().rightPop(key, timeout, unit)
</code></pre><p><strong>从一个队列的右边弹出一个元素并将这个元素放入另一个指定队列的最左边</strong></p><pre><code class="language-java">redisTemplate.opsForList().rightPopAndLeftPush(sourceKey, destinationKey)

redisTemplate.opsForList().rightPopAndLeftPush(sourceKey, destinationKey, timeout, unit)
</code></pre><p><strong>删除集合中值等于value的元素(index=0, 删除所有值等于value的元素; index&gt;0, 从头部开始删除第一个值等于value的元素; index&lt;0, 从尾部开始删除第一个值等于value的元素)</strong></p><pre><code class="language-java">redisTemplate.opsForList().remove(key, index, value)
</code></pre><p><strong>将List列表进行剪裁</strong></p><pre><code class="language-java">redisTemplate.opsForList().trim(key, start, end)
</code></pre><p><strong>获取当前key的List列表长度</strong></p><pre><code class="language-java">redisTemplate.opsForList().size(key)
</code></pre><h2 id="set类型" tabindex="-1"><a class="header-anchor" href="#set类型"><span>Set类型</span></a></h2><p><strong>添加元素</strong></p><pre><code class="language-java">redisTemplate.opsForSet().add(key, values)
</code></pre><p><strong>移除元素(单个值、多个值)</strong></p><pre><code class="language-java">redisTemplate.opsForSet().remove(key, values)
</code></pre><p><strong>删除并且返回一个随机的元素</strong></p><pre><code class="language-java">redisTemplate.opsForSet().pop(key)
</code></pre><p><strong>获取集合的大小</strong></p><pre><code class="language-java">redisTemplate.opsForSet().size(key)
</code></pre><p><strong>判断集合是否包含value</strong></p><pre><code class="language-java">redisTemplate.opsForSet().isMember(key, value)
</code></pre><p><strong>获取两个集合的交集(key对应的无序集合与otherKey对应的无序集合求交集)</strong></p><pre><code class="language-java">redisTemplate.opsForSet().intersect(key, otherKey)
</code></pre><p><strong>获取多个集合的交集(Collection var2)</strong></p><pre><code class="language-java">redisTemplate.opsForSet().intersect(key, otherKeys)
</code></pre><p><strong>key集合与otherKey集合的交集存储到destKey集合中(其中otherKey可以为单个值或者集合)</strong></p><pre><code class="language-java">redisTemplate.opsForSet().intersectAndStore(key, otherKey, destKey)
</code></pre><p><strong>key集合与多个集合的交集存储到destKey无序集合中</strong></p><pre><code class="language-java">redisTemplate.opsForSet().intersectAndStore(key, otherKeys, destKey)
</code></pre><p><strong>获取两个或者多个集合的并集(otherKeys可以为单个值或者是集合)</strong></p><pre><code class="language-java">redisTemplate.opsForSet().union(key, otherKeys)
</code></pre><p><strong>key集合与otherKey集合的并集存储到destKey中(otherKeys可以为单个值或者是集合)</strong></p><pre><code class="language-java">redisTemplate.opsForSet().unionAndStore(key, otherKey, destKey)
</code></pre><p><strong>获取两个或者多个集合的差集(otherKeys可以为单个值或者是集合)</strong></p><pre><code class="language-java">redisTemplate.opsForSet().difference(key, otherKeys)
</code></pre><p><strong>差集存储到destKey中(otherKeys可以为单个值或者集合)</strong></p><pre><code class="language-java">redisTemplate.opsForSet().differenceAndStore(key, otherKey, destKey)
</code></pre><p><strong>随机获取集合中的一个元素</strong></p><pre><code class="language-java">redisTemplate.opsForSet().randomMember(key)
</code></pre><p><strong>获取集合中的所有元素</strong></p><pre><code class="language-java">redisTemplate.opsForSet().members(key)
</code></pre><p><strong>随机获取集合中count个元素</strong></p><pre><code class="language-java">redisTemplate.opsForSet().randomMembers(key, count)
</code></pre><p><strong>获取多个key无序集合中的元素（去重），count表示个数</strong></p><pre><code class="language-java">redisTemplate.opsForSet().distinctRandomMembers(key, count)
</code></pre><p><strong>遍历set类似于Interator(ScanOptions.NONE为显示所有的)</strong></p><pre><code class="language-java">redisTemplate.opsForSet().scan(key, options)
</code></pre><h2 id="zset类型" tabindex="-1"><a class="header-anchor" href="#zset类型"><span>zSet类型</span></a></h2><p><strong>ZSetOperations提供了一系列方法对有序集合进行操作</strong><strong>添加元素(有序集合是按照元素的score值由小到大进行排列)</strong></p><pre><code class="language-java">redisTemplate.opsForZSet().add(key, value, score)
</code></pre><p><strong>删除对应的value,value可以为多个值</strong></p><pre><code class="language-java">redisTemplate.opsForZSet().remove(key, values)
</code></pre><p><strong>增加元素的score值，并返回增加后的值</strong></p><pre><code class="language-java">redisTemplate.opsForZSet().incrementScore(key, value, delta)
</code></pre><p><strong>返回元素在集合的排名,有序集合是按照元素的score值由小到大排列</strong></p><pre><code class="language-java">redisTemplate.opsForZSet().rank(key, value)
</code></pre><p><strong>返回元素在集合的排名,按元素的score值由大到小排列</strong></p><pre><code class="language-java">redisTemplate.opsForZSet().reverseRank(key, value)
</code></pre><p><strong>获取集合中给定区间的元素(start 开始位置，end 结束位置, -1查询所有)</strong></p><pre><code class="language-java">redisTemplate.opsForZSet().reverseRangeWithScores(key, start,end)
</code></pre><p><strong>按照Score值查询集合中的元素，结果从小到大排序</strong></p><pre><code class="language-java">redisTemplate.opsForZSet().reverseRangeByScore(key, min, max)
redisTemplate.opsForZSet().reverseRangeByScoreWithScores(key, min, max)
//返回值为:Set&lt;ZSetOperations.TypedTuple&lt;V&gt;&gt;
</code></pre><p><strong>从高到低的排序集中获取分数在最小和最大值之间的元素</strong></p><pre><code class="language-java">redisTemplate.opsForZSet().reverseRangeByScore(key, min, max, start, end)
</code></pre><p><strong>根据score值获取集合元素数量</strong></p><pre><code class="language-java">redisTemplate.opsForZSet().count(key, min, max)
</code></pre><p><strong>获取集合的大小</strong></p><pre><code class="language-java">redisTemplate.opsForZSet().size(key)
redisTemplate.opsForZSet().zCard(key)
</code></pre><p><strong>获取集合中key、value元素对应的score值</strong></p><pre><code class="language-java">redisTemplate.opsForZSet().score(key, value)
</code></pre><p><strong>移除指定索引位置处的成员</strong></p><pre><code class="language-java">redisTemplate.opsForZSet().removeRange(key, start, end)
</code></pre><p><strong>移除指定score范围的集合成员</strong></p><pre><code class="language-java">redisTemplate.opsForZSet().removeRangeByScore(key, min, max)
</code></pre><p><strong>获取key和otherKey的并集并存储在destKey中（其中otherKeys可以为单个字符串或者字符串集合）</strong></p><pre><code class="language-java">redisTemplate.opsForZSet().unionAndStore(key, otherKey, destKey)
</code></pre><p><strong>获取key和otherKey的交集并存储在destKey中（其中otherKeys可以为单个字符串或者字符串集合）</strong></p><pre><code class="language-java">redisTemplate.opsForZSet().intersectAndStore(key, otherKey, destKey)
</code></pre><p><strong>遍历集合（和iterator一模一样）</strong></p><pre><code class="language-java"> Cursor&lt;TypedTuple&lt;Object&gt;&gt; scan = opsForZSet.scan(&quot;test3&quot;, ScanOptions.NONE);
        while (scan.hasNext()){
            ZSetOperations.TypedTuple&lt;Object&gt; item = scan.next();
            System.out.println(item.getValue() + &quot;:&quot; + item.getScore());
        }
</code></pre><p>参考：<a href="https://github.com/nuptkwz/notes/tree/master/technology/redis" target="_blank" rel="noopener noreferrer">https://github.com/nuptkwz/notes/tree/master/technology/redis</a></p>`,215),n=[o];function p(i,l){return t(),r("div",null,n)}const g=e(s,[["render",p],["__file","redis-tutor.html.vue"]]),c=JSON.parse('{"path":"/java-tutor/orm-tutor/redis-tutor.html","title":"Redis使用","lang":"zh-CN","frontmatter":{"description":"Redis使用 不还意思没有rediswindows版本,需要memurai 推荐使用 https://github.com/tporadowski/redis/releases memurai https://www.memurai.com/get-memurai 这个不行的话使用winget redis工具推荐 官方管理工具 redisinsigh...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/orm-tutor/redis-tutor.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Redis使用"}],["meta",{"property":"og:description","content":"Redis使用 不还意思没有rediswindows版本,需要memurai 推荐使用 https://github.com/tporadowski/redis/releases memurai https://www.memurai.com/get-memurai 这个不行的话使用winget redis工具推荐 官方管理工具 redisinsigh..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-24T08:24:01.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2024-03-24T08:24:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-24T08:24:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"推荐使用","slug":"推荐使用","link":"#推荐使用","children":[]},{"level":2,"title":"memurai","slug":"memurai","link":"#memurai","children":[]},{"level":2,"title":"redis工具推荐","slug":"redis工具推荐","link":"#redis工具推荐","children":[{"level":3,"title":"RedisClient","slug":"redisclient","link":"#redisclient","children":[]},{"level":3,"title":"RedisStudio","slug":"redisstudio","link":"#redisstudio","children":[]},{"level":3,"title":"AnotherRedisDesktopManager","slug":"anotherredisdesktopmanager","link":"#anotherredisdesktopmanager","children":[]}]},{"level":2,"title":"其他 Redis 可视化工具","slug":"其他-redis-可视化工具","link":"#其他-redis-可视化工具","children":[]},{"level":2,"title":"springboot使用redis存储乱码","slug":"springboot使用redis存储乱码","link":"#springboot使用redis存储乱码","children":[]},{"level":2,"title":"Redis常用的数据类型","slug":"redis常用的数据类型","link":"#redis常用的数据类型","children":[]},{"level":2,"title":"String类型","slug":"string类型","link":"#string类型","children":[]},{"level":2,"title":"Hash类型","slug":"hash类型","link":"#hash类型","children":[]},{"level":2,"title":"List类型","slug":"list类型","link":"#list类型","children":[]},{"level":2,"title":"Set类型","slug":"set类型","link":"#set类型","children":[]},{"level":2,"title":"zSet类型","slug":"zset类型","link":"#zset类型","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1711268641000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":4}]},"readingTime":{"minutes":9.21,"words":2763},"filePathRelative":"java-tutor/orm-tutor/redis-tutor.md","localizedDate":"2022年3月21日","autoDesc":true}');export{g as comp,c as data};
