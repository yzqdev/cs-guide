import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/mc-tutor/basic/datapack/functions.html","title":"函数与命令","lang":"zh-CN","frontmatter":{"description":"函数与命令 官方文档 什么是函数 函数（.mcfunction 文件）是一组按顺序执行的 Minecraft 命令。 基本函数 创建函数文件 执行函数 函数中的命令 常用命令 目标选择器 条件执行 if/unless 常用 execute 语法 变量与记分板 创建记分板 操作记分板 常用函数模板 每日奖励 随机传送 清理掉落物 延时执行 tick.js...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"函数与命令\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-07-13T05:16:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/mc-tutor/basic/datapack/functions.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"函数与命令"}],["meta",{"property":"og:description","content":"函数与命令 官方文档 什么是函数 函数（.mcfunction 文件）是一组按顺序执行的 Minecraft 命令。 基本函数 创建函数文件 执行函数 函数中的命令 常用命令 目标选择器 条件执行 if/unless 常用 execute 语法 变量与记分板 创建记分板 操作记分板 常用函数模板 每日奖励 随机传送 清理掉落物 延时执行 tick.js..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-13T05:16:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-13T05:16:15.000Z"}]]},"git":{"createdTime":1783919775000,"updatedTime":1783919775000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":1,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.48,"words":1045},"filePathRelative":"mc-tutor/basic/datapack/functions.md","autoDesc":true}`),a={name:`functions.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="函数与命令" tabindex="-1"><a class="header-anchor" href="#函数与命令"><span>函数与命令</span></a></h1><p><a href="https://minecraft.wiki/w/Function" target="_blank" rel="noopener noreferrer">官方文档</a></p><h2 id="什么是函数" tabindex="-1"><a class="header-anchor" href="#什么是函数"><span>什么是函数</span></a></h2><p>函数（<code>.mcfunction</code> 文件）是一组按顺序执行的 Minecraft 命令。</p><h2 id="基本函数" tabindex="-1"><a class="header-anchor" href="#基本函数"><span>基本函数</span></a></h2><h3 id="创建函数文件" tabindex="-1"><a class="header-anchor" href="#创建函数文件"><span>创建函数文件</span></a></h3><div class="language-mcfunction" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># data/my_pack/functions/hello.mcfunction</span>
<span class="line">say 你好，世界！</span>
<span class="line">give @p diamond 1</span>
<span class="line">effect give @p speed 30 1</span>
<span class="line"></span></code></pre></div><h3 id="执行函数" tabindex="-1"><a class="header-anchor" href="#执行函数"><span>执行函数</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/function my_pack:hello</span>
<span class="line"></span></code></pre></div><h2 id="函数中的命令" tabindex="-1"><a class="header-anchor" href="#函数中的命令"><span>函数中的命令</span></a></h2><h3 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h3><div class="language-mcfunction line-numbers-mode" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># 消息与提示</span>
<span class="line">say §6公告消息                    # 全体消息</span>
<span class="line">tell @p §a你好！                   # 私聊</span>
<span class="line">title @a title §6公告             # 标题显示</span>
<span class="line">title @a subtitle §7副标题        # 副标题</span>
<span class="line">title @a actionbar §e状态栏消息   # 状态栏</span>
<span class="line"></span>
<span class="line"># 给予与清除</span>
<span class="line">give @p diamond 16</span>
<span class="line">give @p minecraft:diamond_sword{display:{Name:&#39;{&quot;text&quot;:&quot;传说之剑&quot;}&#39;}} 1</span>
<span class="line">clear @p minecraft:dirt            # 清除泥土</span>
<span class="line"></span>
<span class="line"># 效果</span>
<span class="line">effect give @p speed 60 2         # 60秒速度II</span>
<span class="line">effect give @p minecraft:strength 30 1</span>
<span class="line">effect clear @p                   # 清除所有效果</span>
<span class="line"></span>
<span class="line"># 传送与生成</span>
<span class="line">tp @p 100 64 200</span>
<span class="line">spawnpoint @p 100 64 200</span>
<span class="line">setworldspawn 100 64 200</span>
<span class="line"></span>
<span class="line"># 时间与天气</span>
<span class="line">time set day</span>
<span class="line">weather clear</span>
<span class="line"></span>
<span class="line"># 游戏模式</span>
<span class="line">gamemode creative @p</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="目标选择器" tabindex="-1"><a class="header-anchor" href="#目标选择器"><span>目标选择器</span></a></h3><div class="language-mcfunction line-numbers-mode" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># 选择器参数</span>
<span class="line">@p                              # 最近玩家</span>
<span class="line">@r                              # 随机玩家</span>
<span class="line">@a                              # 所有玩家</span>
<span class="line">@e                              # 所有实体</span>
<span class="line">@s                              # 命令执行者</span>
<span class="line"></span>
<span class="line"># 过滤器</span>
<span class="line">@a[distance=..10]              # 10格内的玩家</span>
<span class="line">@a[gamemode=creative]           # 创造模式玩家</span>
<span class="line">@e[type=minecraft:creeper]      # 所有苦力怕</span>
<span class="line">@e[type=!minecraft:player]      # 非玩家实体</span>
<span class="line">@a[scores={kills=10..}]        # 击杀数≥10的玩家</span>
<span class="line">@a[tag=admin]                   # 带有 admin 标签的玩家</span>
<span class="line">@p[x=100,y=64,z=200,distance=..50]  # 坐标附近最近玩家</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="条件执行" tabindex="-1"><a class="header-anchor" href="#条件执行"><span>条件执行</span></a></h2><h3 id="if-unless" tabindex="-1"><a class="header-anchor" href="#if-unless"><span>if/unless</span></a></h3><div class="language-mcfunction" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># 条件执行：检测玩家是否有钻石</span>
<span class="line">execute if entity @p[nbt={Inventory:[{id:&quot;minecraft:diamond&quot;}]}] run say §a你有钻石！</span>
<span class="line"></span>
<span class="line"># 条件执行：检测方块</span>
<span class="line">execute if block 100 64 200 minecraft:diamond_block run say §a方块是钻石块！</span>
<span class="line"></span>
<span class="line"># 条件执行：检测生物群系</span>
<span class="line">execute if biome 100 64 200 minecraft:plains run say §a你在平原！</span>
<span class="line"></span>
<span class="line"># unless = if 取反</span>
<span class="line">execute unless entity @p[nbt={Inventory:[{id:&quot;minecraft:diamond&quot;}]}] run say §c你没有钻石！</span>
<span class="line"></span></code></pre></div><h2 id="常用-execute-语法" tabindex="-1"><a class="header-anchor" href="#常用-execute-语法"><span>常用 execute 语法</span></a></h2><div class="language-mcfunction line-numbers-mode" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># 作为实体执行</span>
<span class="line">execute as @a at @s run say 每个玩家说这句话</span>
<span class="line"></span>
<span class="line"># 在实体位置执行</span>
<span class="line">execute at @e[type=sheep] run setblock ~ ~1 ~ torch</span>
<span class="line"></span>
<span class="line"># 偏移执行</span>
<span class="line">execute positioned 100 64 200 run setblock ~ ~ ~ diamond_block</span>
<span class="line"></span>
<span class="line"># 定向执行</span>
<span class="line">execute as @p at @s anchored eyes run setblock ^ ^ ^1 stone</span>
<span class="line"></span>
<span class="line"># 链式执行</span>
<span class="line">execute as @a at @s if block ~ ~-1 ~ diamond_block run give @s diamond</span>
<span class="line"></span>
<span class="line"># 带有条件链</span>
<span class="line">execute as @a at @s if entity @s[gamemode=survival] run gamemode creative @s</span>
<span class="line"></span>
<span class="line"># 对指定实体运行</span>
<span class="line">execute as @e[type=minecraft:zombie] at @s run tp @s ~ ~10 ~</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="变量与记分板" tabindex="-1"><a class="header-anchor" href="#变量与记分板"><span>变量与记分板</span></a></h2><h3 id="创建记分板" tabindex="-1"><a class="header-anchor" href="#创建记分板"><span>创建记分板</span></a></h3><div class="language-mcfunction" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># 创建记分板目标</span>
<span class="line">scoreboard objectives add kills minecraft:player_kill_count §e击杀数</span>
<span class="line">scoreboard objectives add money dummy §6金币</span>
<span class="line">scoreboard objectives add timer dummy §b计时器</span>
<span class="line"></span>
<span class="line"># 显示记分板</span>
<span class="line">scoreboard objectives setdisplay sidebar kills    # 右侧显示</span>
<span class="line">scoreboard objectives setdisplay list money        # 列表显示</span>
<span class="line">scoreboard objectives setdisplay belowName money   # 名字下方显示</span>
<span class="line"></span></code></pre></div><h3 id="操作记分板" tabindex="-1"><a class="header-anchor" href="#操作记分板"><span>操作记分板</span></a></h3><div class="language-mcfunction line-numbers-mode" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># 设置分数</span>
<span class="line">scoreboard players set @p kills 0             # 设置固定值</span>
<span class="line">scoreboard players add @p kills 1             # 增加</span>
<span class="line">scoreboard players remove @p kills 1           # 减少</span>
<span class="line">scoreboard players reset @p kills              # 重置</span>
<span class="line"></span>
<span class="line"># 重置所有玩家</span>
<span class="line">scoreboard players reset * kills</span>
<span class="line"></span>
<span class="line"># 复制分数</span>
<span class="line">scoreboard players operation @p kills = @s kills</span>
<span class="line"></span>
<span class="line"># 分数比较</span>
<span class="line">execute if score @p kills &gt; @s kills run say 你的击杀数更高</span>
<span class="line">execute unless score @p kills &gt;= 10 run say 击杀数不足</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常用函数模板" tabindex="-1"><a class="header-anchor" href="#常用函数模板"><span>常用函数模板</span></a></h2><h3 id="每日奖励" tabindex="-1"><a class="header-anchor" href="#每日奖励"><span>每日奖励</span></a></h3><div class="language-mcfunction" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># data/my_pack/functions/daily_reward.mcfunction</span>
<span class="line"># 每日首次登录奖励</span>
<span class="line">scoreboard players add @p reward_time 1</span>
<span class="line">execute if score @p reward_time = @s reward_time_limit run give @p diamond 1</span>
<span class="line">execute if score @p reward_time = @s reward_time_limit run say §a你获得了每日奖励！</span>
<span class="line"></span></code></pre></div><h3 id="随机传送" tabindex="-1"><a class="header-anchor" href="#随机传送"><span>随机传送</span></a></h3><div class="language-mcfunction" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># data/my_pack/functions/random_tp.mcfunction</span>
<span class="line"># 随机传送玩家到 500 格内</span>
<span class="line"># 需要配合谓词使用</span>
<span class="line">spreadplayers ~ ~ 1000 5000 false @p</span>
<span class="line">say §a你被随机传送了！</span>
<span class="line"></span></code></pre></div><h3 id="清理掉落物" tabindex="-1"><a class="header-anchor" href="#清理掉落物"><span>清理掉落物</span></a></h3><div class="language-mcfunction" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># data/my_pack/functions/clear_items.mcfunction</span>
<span class="line"># 清理地面上的掉落物</span>
<span class="line">kill @e[type=minecraft:item]</span>
<span class="line">say §e已清理掉落物</span>
<span class="line"></span></code></pre></div><h3 id="延时执行" tabindex="-1"><a class="header-anchor" href="#延时执行"><span>延时执行</span></a></h3><div class="language-mcfunction" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># 使用 schedule 命令延时</span>
<span class="line">schedule function my_pack:delayed_task 5s</span>
<span class="line"></span>
<span class="line"># data/my_pack/functions/delayed_task.mcfunction</span>
<span class="line">say §a5 秒后执行的消息</span>
<span class="line"></span></code></pre></div><h2 id="tick-json-与-load-json" tabindex="-1"><a class="header-anchor" href="#tick-json-与-load-json"><span>tick.json 与 load.json</span></a></h2><h3 id="每-tick-执行" tabindex="-1"><a class="header-anchor" href="#每-tick-执行"><span>每 tick 执行</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// data/minecraft/tags/functions/tick.json</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;values&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">&quot;my_pack:tick_handler&quot;</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><div class="language-mcfunction" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># data/my_pack/functions/tick_handler.mcfunction</span>
<span class="line"># 每 tick（1/20 秒）执行一次</span>
<span class="line">execute as @a at @s run effect give @s speed 2 0 true</span>
<span class="line"></span></code></pre></div><h3 id="加载时执行" tabindex="-1"><a class="header-anchor" href="#加载时执行"><span>加载时执行</span></a></h3><div class="language-json" data-highlighter="prismjs" data-ext="json"><pre><code class="language-json"><span class="line"><span class="token comment">// data/minecraft/tags/functions/load.json</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">&quot;values&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">&quot;my_pack:on_load&quot;</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre></div><div class="language-mcfunction" data-highlighter="prismjs" data-ext="mcfunction"><pre><code class="language-mcfunction"><span class="line"># data/my_pack/functions/on_load.mcfunction</span>
<span class="line">say §a数据包已加载！</span>
<span class="line">scoreboard objectives add timer dummy</span>
<span class="line"></span></code></pre></div><h2 id="调试技巧" tabindex="-1"><a class="header-anchor" href="#调试技巧"><span>调试技巧</span></a></h2><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/gamerule logAdminCommands true  # 记录命令执行</span>
<span class="line">/gamerule sendCommandFeedback true  # 显示命令反馈</span>
<span class="line">/reload                          # 重载所有数据包</span>
<span class="line"></span>
<span class="line"># 测试函数时建议</span>
<span class="line">1. 先在聊天栏测试单条命令</span>
<span class="line">2. 确认无误后再写进 .mcfunction</span>
<span class="line">3. 使用 say 输出调试信息</span>
<span class="line">4. 需要注意 JSON 格式的正确性</span>
<span class="line"></span></code></pre></div>`,42)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};