import{i as e,r as t,s as n,t as r}from"./app-B1jqjtqq.js";var i=JSON.parse(`{"path":"/mc-tutor/basic/14-commands.html","title":"Minecraft 指令大全","lang":"zh-CN","frontmatter":{"order":14,"description":"Minecraft 指令大全 从基础到进阶，涵盖生存、创造、服务器管理的常用指令及深度用法。 命令方块 龙蛋 附魔金苹果 不死图腾 铁砧 官方 Wiki 基础指令 日常最常用的基础指令，适合所有玩家。 传送与定位 用于玩家移动、坐标查询和出生点设置。 时间与天气 控制游戏内的昼夜循环和天气变化。 游戏模式 切换玩家的游戏模式，支持全称和数字简写。 游戏...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Minecraft 指令大全\\",\\"image\\":[\\"https://mcasset.cloud/1.21/assets/minecraft/textures/items/command_block.png\\",\\"https://minecraft.wiki/images/Invicon_Dragon_Egg.png\\",\\"https://minecraft.wiki/images/Invicon_Golden_Apple.png\\",\\"https://minecraft.wiki/images/Invicon_Totem_of_Undying.png\\",\\"https://minecraft.wiki/images/Invicon_Anvil.png\\"],\\"dateModified\\":\\"2026-07-16T05:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"],["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/mc-tutor/basic/14-commands.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Minecraft 指令大全"}],["meta",{"property":"og:description","content":"Minecraft 指令大全 从基础到进阶，涵盖生存、创造、服务器管理的常用指令及深度用法。 命令方块 龙蛋 附魔金苹果 不死图腾 铁砧 官方 Wiki 基础指令 日常最常用的基础指令，适合所有玩家。 传送与定位 用于玩家移动、坐标查询和出生点设置。 时间与天气 控制游戏内的昼夜循环和天气变化。 游戏模式 切换玩家的游戏模式，支持全称和数字简写。 游戏..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://mcasset.cloud/1.21/assets/minecraft/textures/items/command_block.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-07-16T05:29:15.000Z"}],["meta",{"property":"article:modified_time","content":"2026-07-16T05:29:15.000Z"}]]},"git":{"createdTime":1783919775000,"updatedTime":1784179755000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":3,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":18.07,"words":5421},"filePathRelative":"mc-tutor/basic/14-commands.md","autoDesc":true}`),a={name:`14-commands.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<h1 id="minecraft-指令大全" tabindex="-1"><a class="header-anchor" href="#minecraft-指令大全"><span>Minecraft 指令大全</span></a></h1><blockquote><p>从基础到进阶，涵盖生存、创造、服务器管理的常用指令及深度用法。</p></blockquote><p><img src="https://mcasset.cloud/1.21/assets/minecraft/textures/items/command_block.png" alt="命令方块"> <img src="https://minecraft.wiki/images/Invicon_Dragon_Egg.png" alt="龙蛋"> <img src="https://minecraft.wiki/images/Invicon_Golden_Apple.png" alt="附魔金苹果"> <img src="https://minecraft.wiki/images/Invicon_Totem_of_Undying.png" alt="不死图腾"> <img src="https://minecraft.wiki/images/Invicon_Anvil.png" alt="铁砧"></p><p><a href="https://minecraft.fandom.com/zh/wiki/%E5%91%BD%E4%BB%A4" target="_blank" rel="noopener noreferrer">官方 Wiki</a></p><hr><h2 id="基础指令" tabindex="-1"><a class="header-anchor" href="#基础指令"><span>基础指令</span></a></h2><p>日常最常用的基础指令，适合所有玩家。</p><table><thead><tr><th>指令</th><th>说明</th><th>示例</th><th>拓展</th></tr></thead><tbody><tr><td><code>/help</code></td><td>显示帮助信息</td><td><code>/help</code></td><td><code>/help give</code> 可查看指定指令的详细用法</td></tr><tr><td><code>/seed</code></td><td>显示当前世界的种子</td><td><code>/seed</code></td><td>种子可用于在创建世界时复刻地形</td></tr><tr><td><code>/list</code></td><td>显示在线玩家列表及数量</td><td><code>/list</code></td><td>配合 <code>uuids</code> 参数可显示玩家 UUID</td></tr><tr><td><code>/kill</code></td><td>杀死目标实体</td><td><code>/kill @e[type=minecraft:creeper]</code></td><td>不加参数默认杀死自己；可配合选择器批量清除实体</td></tr><tr><td><code>/me</code></td><td>发送第三人称动作消息</td><td><code>/me 在挖矿</code> → <code>*玩家名 在挖矿*</code></td><td>用于角色扮演，所有玩家可见</td></tr><tr><td><code>/tell</code></td><td>私聊指定玩家</td><td><code>/tell 张三 你好</code></td><td>仅目标玩家能看到消息</td></tr><tr><td><code>/say</code></td><td>广播消息（带服务器前缀）</td><td><code>/say 服务器即将重启</code></td><td>消息会以 <code>[服务器]</code> 前缀显示</td></tr></tbody></table><hr><h2 id="传送与定位" tabindex="-1"><a class="header-anchor" href="#传送与定位"><span>传送与定位</span></a></h2><p>用于玩家移动、坐标查询和出生点设置。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 传送</span>
<span class="line">/tp &lt;目标&gt;                         # 传送到目标实体位置</span>
<span class="line">/tp &lt;x&gt; &lt;y&gt; &lt;z&gt;                   # 传送到指定坐标</span>
<span class="line">/tp &lt;玩家&gt; &lt;目标&gt;                  # 将某玩家传送到目标</span>
<span class="line">/tp &lt;玩家&gt; &lt;x&gt; &lt;y&gt; &lt;z&gt;            # 将某玩家传送到坐标</span>
<span class="line"></span>
<span class="line"># 示例</span>
<span class="line">/tp @p 100 64 -200                # 将最近玩家传送到坐标</span>
<span class="line">/tp @a @p                         # 将所有玩家拉到最近玩家身边</span>
<span class="line"></span>
<span class="line"># 出生点设置</span>
<span class="line">/spawnpoint                       # 将个人出生点设为当前位置</span>
<span class="line">/spawnpoint &lt;玩家&gt;                 # 设置指定玩家的出生点</span>
<span class="line">/spawnpoint &lt;玩家&gt; &lt;x&gt; &lt;y&gt; &lt;z&gt;    # 设置玩家出生点到指定坐标</span>
<span class="line"></span>
<span class="line">/setworldspawn                    # 将世界出生点设为当前位置</span>
<span class="line">/setworldspawn &lt;x&gt; &lt;y&gt; &lt;z&gt;        # 设置世界出生点到指定坐标</span>
<span class="line"></span>
<span class="line"># 查询坐标</span>
<span class="line">/locate &lt;结构&gt;                     # 查找最近的自然生成结构</span>
<span class="line">/locate village                    # 查找最近的村庄</span>
<span class="line">/locate fortress                   # 查找下界要塞</span>
<span class="line">/locate structure minecraft:ancient_city  # 查找远古城市</span>
<span class="line"></span>
<span class="line"># 插件常用（非原版）</span>
<span class="line">/warp &lt;名称&gt;                      # 传送到地标（需插件支持）</span>
<span class="line">/home                             # 回家（需插件支持）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="时间与天气" tabindex="-1"><a class="header-anchor" href="#时间与天气"><span>时间与天气</span></a></h2><p>控制游戏内的昼夜循环和天气变化。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 时间控制</span>
<span class="line">/time set &lt;数值&gt;                   # 设置时间为指定 tick</span>
<span class="line">/time set day                      # 白天 (1000 tick)</span>
<span class="line">/time set night                    # 夜晚 (13000 tick)</span>
<span class="line">/time set noon                     # 正午 (6000 tick)</span>
<span class="line">/time set midnight                 # 午夜 (18000 tick)</span>
<span class="line">/time set 0                        # 黎明</span>
<span class="line">/time add &lt;tick&gt;                   # 增加指定 tick 数</span>
<span class="line"></span>
<span class="line"># 天气控制</span>
<span class="line">/weather clear                     # 晴天</span>
<span class="line">/weather rain                      # 雨天</span>
<span class="line">/weather thunder                   # 雷暴</span>
<span class="line">/weather rain &lt;秒数&gt;               # 下雨指定时长后结束</span>
<span class="line">/weather thunder &lt;秒数&gt;            # 雷暴指定时长后结束</span>
<span class="line"></span>
<span class="line"># 小贴士</span>
<span class="line"># 1 个游戏日 = 24000 ticks = 20 分钟现实时间</span>
<span class="line"># 使用 /gamerule doDaylightCycle false 可永久锁定时间</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="游戏模式" tabindex="-1"><a class="header-anchor" href="#游戏模式"><span>游戏模式</span></a></h2><p>切换玩家的游戏模式，支持全称和数字简写。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/gamemode &lt;模式&gt;                   # 切换自己的游戏模式</span>
<span class="line">/gamemode &lt;模式&gt; &lt;玩家&gt;            # 切换指定玩家的游戏模式</span>
<span class="line"></span>
<span class="line"># 模式列表</span>
<span class="line">| 模式 | 全称 | 简写 | 说明 |</span>
<span class="line">|------|------|------|------|</span>
<span class="line">| 生存 | survival | 0 | 正常玩法，有生命值、饥饿值 |</span>
<span class="line">| 创造 | creative | 1 | 无限资源、飞行、瞬间破坏 |</span>
<span class="line">| 冒险 | adventure | 2 | 只能使用合适工具破坏方块 |</span>
<span class="line">| 旁观 | spectator | 3 | 穿墙透视，无法交互 |</span>
<span class="line"></span>
<span class="line"># 示例</span>
<span class="line">/gamemode creative                 # 切换为创造模式</span>
<span class="line">/gamemode survival @a              # 所有玩家切换生存</span>
<span class="line">/gamemode 3                        # 旁观模式</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="游戏模式详解" tabindex="-1"><a class="header-anchor" href="#游戏模式详解"><span>游戏模式详解</span></a></h3><ul><li><strong>生存模式</strong>: 最核心的玩法，需要收集资源、合成工具、对抗怪物。饥饿值低于 18 点时才会自然回血。</li><li><strong>创造模式</strong>: 适合建筑和测试。拥有无限物品栏、可以飞行、无视伤害。左键瞬间破坏任意方块。</li><li><strong>冒险模式</strong>: 用于地图和冒险场景。只能使用适合的工具破坏方块（如用斧头破坏木板），防止误拆。</li><li><strong>旁观模式</strong>: 可以穿过任何方块，从实体视角观察（<code>左键</code> 点击实体），但不能与任何方块或物品交互。</li></ul><hr><h2 id="物品操作" tabindex="-1"><a class="header-anchor" href="#物品操作"><span>物品操作</span></a></h2><p>给予、清除、附魔物品的基础指令。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 给予物品</span>
<span class="line">/give &lt;玩家&gt; &lt;物品&gt; [数量]         # 给予玩家指定物品</span>
<span class="line">/give @p diamond 1                # 给自己 1 个钻石</span>
<span class="line">/give @a minecraft:iron_sword 1   # 给所有玩家 1 把铁剑</span>
<span class="line">/give @s minecraft:elytra 1       # 给自己 1 个鞘翅</span>
<span class="line"></span>
<span class="line"># 清空物品</span>
<span class="line">/clear &lt;玩家&gt;                      # 清空玩家全部物品</span>
<span class="line">/clear &lt;玩家&gt; &lt;物品&gt;               # 清空指定类型的物品</span>
<span class="line">/clear &lt;玩家&gt; &lt;物品&gt; [最大数量]    # 清空指定数量以内的物品</span>
<span class="line"></span>
<span class="line"># 附魔物品（手持时使用）</span>
<span class="line">/enchant &lt;玩家&gt; &lt;附魔ID&gt; [等级]   # 附魔手持物品</span>
<span class="line">/enchant @p sharpness 5           # 锋利 V</span>
<span class="line">/enchant @p unbreaking 3          # 耐久 III</span>
<span class="line">/enchant @p mending 1             # 经验修补</span>
<span class="line"></span>
<span class="line"># 物品栏操作</span>
<span class="line">/replaceitem entity &lt;目标&gt; &lt;栏位&gt; &lt;物品&gt; [数量]  # 替换指定栏位的物品</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="附魔与自定义物品" tabindex="-1"><a class="header-anchor" href="#附魔与自定义物品"><span>附魔与自定义物品</span></a></h2><blockquote><p>通过 NBT 数据可以创建拥有自定义属性、名称、描述的强力物品。</p></blockquote><h3 id="带附魔的物品" tabindex="-1"><a class="header-anchor" href="#带附魔的物品"><span>带附魔的物品</span></a></h3><p>给玩家一把锋利 X 的钻石剑：</p><div class="language-minecraft" data-highlighter="prismjs" data-ext="minecraft"><pre><code class="language-minecraft"><span class="line">/give @s minecraft:diamond_sword{Enchantments:[{id:&quot;minecraft:sharpness&quot;,lvl:10}]} 1</span>
<span class="line"></span></code></pre></div><p>给玩家一把带有多重附魔的弓：</p><div class="language-minecraft" data-highlighter="prismjs" data-ext="minecraft"><pre><code class="language-minecraft"><span class="line">/give @s minecraft:bow{Enchantments:[{id:&quot;minecraft:power&quot;,lvl:5},{id:&quot;minecraft:flame&quot;,lvl:1},{id:&quot;minecraft:unbreaking&quot;,lvl:3}]} 1</span>
<span class="line"></span></code></pre></div><h3 id="自定义名称与描述" tabindex="-1"><a class="header-anchor" href="#自定义名称与描述"><span>自定义名称与描述</span></a></h3><p>给玩家一把带有自定义名称和描述的金色宝剑：</p><div class="language-minecraft" data-highlighter="prismjs" data-ext="minecraft"><pre><code class="language-minecraft"><span class="line">/give @s minecraft:diamond_sword{display:{Name:&#39;{&quot;text&quot;:&quot;王者之剑&quot;,&quot;color&quot;:&quot;gold&quot;}&#39;,Lore:[&#39;{&quot;text&quot;:&quot;传说中的神剑&quot;,&quot;color&quot;:&quot;gray&quot;}&#39;,&#39;{&quot;text&quot;:&quot;+20 攻击力&quot;,&quot;color&quot;:&quot;green&quot;}&#39;]}} 1</span>
<span class="line"></span></code></pre></div><h3 id="属性修改" tabindex="-1"><a class="header-anchor" href="#属性修改"><span>属性修改</span></a></h3><p>通过 <code>AttributeModifiers</code> 修改物品的基础属性：</p><div class="language-minecraft" data-highlighter="prismjs" data-ext="minecraft"><pre><code class="language-minecraft"><span class="line">/give @s minecraft:diamond_sword{AttributeModifiers:[{AttributeName:&quot;minecraft:generic.attack_damage&quot;,Name:&quot;generic.attack_damage&quot;,Amount:50,Operation:0,UUID:[I;1,1,1,1]}]} 1</span>
<span class="line"></span></code></pre></div><table><thead><tr><th>NBT 字段</th><th>说明</th></tr></thead><tbody><tr><td><code>Enchantments</code></td><td>附魔列表，每个附魔有 <code>id</code> 和 <code>lvl</code></td></tr><tr><td><code>display.Name</code></td><td>物品显示名称（支持 JSON 文本）</td></tr><tr><td><code>display.Lore</code></td><td>物品描述文本数组（支持 JSON 文本）</td></tr><tr><td><code>AttributeModifiers</code></td><td>属性修改器列表（攻击力、速度等）</td></tr><tr><td><code>Unbreakable</code></td><td>设为 <code>1</code> 使物品永不损坏</td></tr><tr><td><code>CanDestroy</code></td><td>冒险模式下可破坏的方块列表</td></tr></tbody></table><hr><h2 id="实体操作" tabindex="-1"><a class="header-anchor" href="#实体操作"><span>实体操作</span></a></h2><p>生成、清除、操作游戏中的生物和实体。</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 生成实体</span>
<span class="line">/summon &lt;实体ID&gt; [坐标] [NBT]      # 在指定位置生成实体</span>
<span class="line"></span>
<span class="line"># 基础示例</span>
<span class="line">/summon creeper                    # 生成一只苦力怕</span>
<span class="line">/summon minecraft:ender_dragon     # 生成末影龙</span>
<span class="line">/summon minecraft:iron_golem ~ ~ ~ {NoAI:1}  # 生成一只不会动的铁傀儡</span>
<span class="line">/summon minecraft:bat ~ ~ ~ {Size:10}  # 生成超大蝙蝠</span>
<span class="line"></span></code></pre></div><h3 id="高级实体生成" tabindex="-1"><a class="header-anchor" href="#高级实体生成"><span>高级实体生成</span></a></h3><p>生成一只骑着僵尸的马（利用 <code>Passengers</code> 实现骑乘）：</p><div class="language-minecraft" data-highlighter="prismjs" data-ext="minecraft"><pre><code class="language-minecraft"><span class="line">/summon horse ~ ~ ~ {Passengers:[{id:&quot;minecraft:zombie&quot;}]}</span>
<span class="line"></span></code></pre></div><p>生成一只身穿全套钻石装备的僵尸：</p><div class="language-minecraft" data-highlighter="prismjs" data-ext="minecraft"><pre><code class="language-minecraft"><span class="line">/summon zombie ~ ~ ~ {</span>
<span class="line">  equipment:{</span>
<span class="line">    chest:{components:{&quot;minecraft:enchantments&quot;:{&quot;minecraft:protection&quot;:4}},count:1,id:&quot;minecraft:diamond_chestplate&quot;},</span>
<span class="line">    feet:{components:{&quot;minecraft:enchantments&quot;:{&quot;minecraft:protection&quot;:4}},count:1,id:&quot;minecraft:diamond_boots&quot;},</span>
<span class="line">    head:{components:{&quot;minecraft:enchantments&quot;:{&quot;minecraft:protection&quot;:4}},count:1,id:&quot;minecraft:diamond_helmet&quot;},</span>
<span class="line">    legs:{components:{&quot;minecraft:enchantments&quot;:{&quot;minecraft:protection&quot;:4}},count:1,id:&quot;minecraft:diamond_leggings&quot;},</span>
<span class="line">    mainhand:{components:{&quot;minecraft:enchantments&quot;:{&quot;minecraft:sharpness&quot;:5}},count:1,id:&quot;minecraft:trident&quot;}</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre></div><p>生成一只名为 &quot;Boss&quot; 的巨型僵尸，带有发光效果：</p><div class="language-minecraft" data-highlighter="prismjs" data-ext="minecraft"><pre><code class="language-minecraft"><span class="line">/summon zombie ~ ~ ~ {CustomName:&#39;&quot;Boss&quot;&#39;,CustomNameVisible:1,Glowing:1,Size:3,Health:100}</span>
<span class="line"></span></code></pre></div><h3 id="常用-nbt-标签-实体" tabindex="-1"><a class="header-anchor" href="#常用-nbt-标签-实体"><span>常用 NBT 标签（实体）</span></a></h3><table><thead><tr><th>标签</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td><code>CustomName</code></td><td>JSON 字符串</td><td>自定义实体名称</td></tr><tr><td><code>CustomNameVisible</code></td><td>布尔</td><td>始终显示名称（含穿墙）</td></tr><tr><td><code>Glowing</code></td><td>布尔</td><td>实体发出白色轮廓光</td></tr><tr><td><code>NoAI</code></td><td>布尔</td><td>禁用 AI（实体原地不动）</td></tr><tr><td><code>Silent</code></td><td>布尔</td><td>禁止实体发出声音</td></tr><tr><td><code>Health</code></td><td>浮点</td><td>设置实体生命值</td></tr><tr><td><code>Passengers</code></td><td>列表</td><td>该实体身上骑乘的实体列表</td></tr><tr><td><code>Equipment</code></td><td>列表</td><td>实体装备的物品</td></tr><tr><td><code>Invulnerable</code></td><td>布尔</td><td>实体免疫所有伤害</td></tr></tbody></table><h3 id="清除实体" tabindex="-1"><a class="header-anchor" href="#清除实体"><span>清除实体</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/kill @e[type=minecraft:creeper]           # 杀死所有苦力怕</span>
<span class="line">/kill @e[type=!minecraft:player]           # 杀死所有非玩家实体</span>
<span class="line">/kill @e[type=#minecraft:skeletons]        # 杀死所有骷髅类生物</span>
<span class="line">/kill @e[family=minecraft:undead]          # 杀死所有亡灵生物</span>
<span class="line"></span></code></pre></div><hr><h2 id="目标选择器" tabindex="-1"><a class="header-anchor" href="#目标选择器"><span>目标选择器</span></a></h2><blockquote><p>目标选择器是 Minecraft 指令系统的核心，用于精确定位玩家和实体。</p></blockquote><h3 id="基础选择器" tabindex="-1"><a class="header-anchor" href="#基础选择器"><span>基础选择器</span></a></h3><table><thead><tr><th>选择器</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td><code>@p</code></td><td>距离最近的玩家</td><td><code>@p</code></td></tr><tr><td><code>@a</code></td><td>所有玩家</td><td><code>@a</code></td></tr><tr><td><code>@r</code></td><td>随机玩家</td><td><code>@r</code></td></tr><tr><td><code>@e</code></td><td>所有实体</td><td><code>@e[type=creeper]</code></td></tr><tr><td><code>@s</code></td><td>指令执行者自身</td><td><code>@s</code></td></tr><tr><td><code>@n</code></td><td>距离最近的实体</td><td><code>@n[type=!player]</code></td></tr></tbody></table><h3 id="选择器参数" tabindex="-1"><a class="header-anchor" href="#选择器参数"><span>选择器参数</span></a></h3><p>在 <code>[]</code> 中添加参数来过滤目标，多个参数用逗号 <code>,</code> 分隔。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 类型和数量</span>
<span class="line">@e[type=zombie]                    # 所有僵尸</span>
<span class="line">@e[type=zombie,limit=5]            # 前 5 个僵尸</span>
<span class="line">@e[type=!minecraft:player]         # 所有非玩家实体</span>
<span class="line">@e[type=minecraft:cow,sort=nearest] # 按距离排序</span>
<span class="line"></span>
<span class="line"># 游戏模式</span>
<span class="line">@a[gamemode=creative]              # 创造模式玩家</span>
<span class="line">@a[gamemode=survival]              # 生存模式玩家</span>
<span class="line"></span>
<span class="line"># 距离筛选</span>
<span class="line">@p[distance=..10]                  # 10 格内的最近玩家</span>
<span class="line">@p[distance=10..]                  # 10 格以外的最近玩家</span>
<span class="line">@e[type=item,distance=..5]         # 5 格内的掉落物</span>
<span class="line">@e[distance=10..20]                # 10~20 格之间的实体</span>
<span class="line"></span>
<span class="line"># 计分板</span>
<span class="line">@a[scores={score_name=10..}]       # 分数 &gt;= 10 的玩家</span>
<span class="line">@a[scores={kills=5..10}]           # 杀敌数在 5~10 之间的玩家</span>
<span class="line">@a[scores={deaths=..3}]            # 死亡次数 &lt;= 3 的玩家</span>
<span class="line"></span>
<span class="line"># 名字和标签</span>
<span class="line">@e[name=&quot;Test&quot;]                    # 名字为 Test 的实体</span>
<span class="line">@e[name=!Test]                     # 名字不是 Test 的实体</span>
<span class="line">@e[tag=myTag]                      # 带有 myTag 标签的实体</span>
<span class="line">@e[tag=!boss]                      # 没有 boss 标签的实体</span>
<span class="line"></span>
<span class="line"># NBT 匹配（1.20.5+ 使用 predicate）</span>
<span class="line">@e[nbt={Health:1..}]               # 生命值 &gt;= 1 的实体</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参数运算符" tabindex="-1"><a class="header-anchor" href="#参数运算符"><span>参数运算符</span></a></h3><table><thead><tr><th>符号</th><th>含义</th><th>示例</th></tr></thead><tbody><tr><td><code>..N</code></td><td>小于等于 N</td><td><code>distance=..10</code></td></tr><tr><td><code>M..</code></td><td>大于等于 M</td><td><code>distance=10..</code></td></tr><tr><td><code>M..N</code></td><td>在 M 和 N 之间</td><td><code>distance=5..20</code></td></tr><tr><td><code>!</code></td><td>取反（排除）</td><td><code>type=!player</code></td></tr><tr><td><code>=</code></td><td>精确匹配</td><td><code>gamemode=creative</code></td></tr></tbody></table><hr><h2 id="方块操作" tabindex="-1"><a class="header-anchor" href="#方块操作"><span>方块操作</span></a></h2><p>在游戏世界中放置、填充、复制和修改方块。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 放置单方块</span>
<span class="line">/setblock &lt;坐标&gt; &lt;方块&gt; [破坏模式]  # 在指定坐标放置方块</span>
<span class="line">/setblock ~ ~1 ~ minecraft:stone   # 在头顶放一个石头</span>
<span class="line">/setblock ~ ~-1 ~ minecraft:redstone_block  # 在脚下放红石块</span>
<span class="line">/setblock 100 64 200 minecraft:chest{Facing:&quot;east&quot;}  # 放置朝东的箱子</span>
<span class="line"></span>
<span class="line"># 破坏模式</span>
<span class="line">/setblock &lt;坐标&gt; air destroy        # 破坏方块并播放粒子效果（掉落物品）</span>
<span class="line">/setblock &lt;坐标&gt; air replace        # 直接替换（不播放效果）</span>
<span class="line"></span>
<span class="line"># 填充区域</span>
<span class="line">/fill &lt;x1&gt; &lt;y1&gt; &lt;z1&gt; &lt;x2&gt; &lt;y2&gt; &lt;z2&gt; &lt;方块&gt; [破坏模式]</span>
<span class="line">/fill ~ ~ ~ ~5 ~5 ~5 stone         # 填充 5×5×5 的石头</span>
<span class="line">/fill ~ ~1 ~ ~10 ~10 ~10 air       # 清空 10×10×10 的区域</span>
<span class="line">/fill 0 64 0 10 70 10 glass        # 建造玻璃房</span>
<span class="line"></span>
<span class="line"># 替换方块</span>
<span class="line">/fill x1 y1 z1 x2 y2 z2 wool replace stone  # 将石头替换为羊毛</span>
<span class="line">/fill ~ ~ ~ ~10 ~10 ~10 air replace minecraft:grass_block  # 清除所有草方块</span>
<span class="line"></span>
<span class="line"># 复制区域</span>
<span class="line">/clone &lt;x1&gt; &lt;y1&gt; &lt;z1&gt; &lt;x2&gt; &lt;y2&gt; &lt;z2&gt; &lt;目标x&gt; &lt;目标y&gt; &lt;目标z&gt; [模式]</span>
<span class="line"></span>
<span class="line"># 克隆模式</span>
<span class="line">/clone ... ... ... masked           # 只复制非空气方块</span>
<span class="line">/clone ... ... ... filtered &lt;方块&gt;  # 只复制指定方块</span>
<span class="line">/clone ... ... ... replace          # 完整复制（默认）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="世界管理" tabindex="-1"><a class="header-anchor" href="#世界管理"><span>世界管理</span></a></h2><p>管理世界存档、难度、出生点等全局设置。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 存档管理</span>
<span class="line">/save-all                          # 强制保存世界（立刻写入磁盘）</span>
<span class="line">/save-off                          # 关闭自动保存（谨慎使用，避免数据丢失）</span>
<span class="line">/save-on                           # 开启自动保存</span>
<span class="line"></span>
<span class="line"># 难度设置</span>
<span class="line">/difficulty &lt;难度&gt;                 # 设置游戏难度</span>
<span class="line">/difficulty peaceful               # 和平</span>
<span class="line">/difficulty easy                   # 简单</span>
<span class="line">/difficulty normal                 # 普通</span>
<span class="line">/difficulty hard                   # 困难</span>
<span class="line"></span>
<span class="line"># 世界出生点</span>
<span class="line">/setworldspawn                     # 设置世界出生点</span>
<span class="line">/setworldspawn 100 64 200          # 设置到指定坐标</span>
<span class="line"></span>
<span class="line"># 世界边界</span>
<span class="line">/worldborder set &lt;半径&gt;            # 设置世界边界大小</span>
<span class="line">/worldborder center &lt;x&gt; &lt;z&gt;        # 设置边界中心点</span>
<span class="line">/worldborder add &lt;格数&gt;            # 扩展/缩小边界</span>
<span class="line">/worldborder warning distance &lt;格数&gt; # 边界警告距离</span>
<span class="line"></span>
<span class="line"># 生成结构</span>
<span class="line">/place template &lt;路径&gt; [坐标]      # 放置结构模板</span>
<span class="line">/place feature &lt;特征&gt; [坐标]       # 放置地形特征</span>
<span class="line"></span>
<span class="line"># 示例</span>
<span class="line">/place feature minecraft:end_gateway_return  # 放置返回末地折跃门</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="游戏规则" tabindex="-1"><a class="header-anchor" href="#游戏规则"><span>游戏规则</span></a></h2><blockquote><p>通过 <code>/gamerule</code> 可以精细控制游戏机制，是自定义游戏体验的核心工具。</p></blockquote><h3 id="常用游戏规则" tabindex="-1"><a class="header-anchor" href="#常用游戏规则"><span>常用游戏规则</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/gamerule &lt;规则名&gt; &lt;值&gt;</span>
<span class="line">/gamerule doDaylightCycle false        # 停止日夜交替</span>
<span class="line">/gamerule doWeatherCycle false         # 停止天气变化</span>
<span class="line">/gamerule keepInventory true           # 死亡不掉落物品</span>
<span class="line">/gamerule mobGriefing false            # 禁止怪物破坏地形（苦力怕不炸坑、末影人不搬方块）</span>
<span class="line">/gamerule doMobSpawning false          # 禁止自然怪物生成</span>
<span class="line">/gamerule doFireTick false             # 禁止火焰蔓延和熄灭</span>
<span class="line">/gamerule commandBlockOutput false     # 关闭命令方块输出信息</span>
<span class="line">/gamerule showCoordinates true         # 右上角显示坐标</span>
<span class="line">/gamerule maxCommandChainLength 65535  # 命令方块链最大执行长度</span>
<span class="line">/gamerule doEntityDrops false          # 禁止实体掉落物品（含生物和掉落物）</span>
<span class="line">/gamerule doTileDrops false            # 禁止方块掉落物品</span>
<span class="line">/gamerule randomTickSpeed 3            # 随机刻速度（影响作物生长和菌丝扩散）</span>
<span class="line">/gamerule naturalRegeneration false    # 禁用自然回血（适合 RLCraft 类整合包）</span>
<span class="line">/gamerule doInsomnia false             # 禁止幻翼生成</span>
<span class="line">/gamerule doPatrolSpawning false       # 禁止掠夺者巡逻队生成</span>
<span class="line">/gamerule doTraderSpawning false       # 禁止流浪商人生成</span>
<span class="line">/gamerule doLimitedCrafting true       # 玩家只能合成已解锁配方（数据包用）</span>
<span class="line">/gamerule announceAdvancements false   # 关闭进度通知</span>
<span class="line">/gamerule forgiveDeadPlayers true      # 被僵尸感染的村民死后原谅玩家</span>
<span class="line">/gamerule universalAnger false         # 僵尸被攻击时激怒附近所有僵尸</span>
<span class="line">/gamerule playersSleepingPercentage 50 # 跳过夜晚所需的睡眠玩家百分比</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="药水与效果" tabindex="-1"><a class="header-anchor" href="#药水与效果"><span>药水与效果</span></a></h2><blockquote><p>使用 <code>/effect</code> 指令给予或清除状态效果，配合药水效果代码表使用。</p></blockquote><h3 id="指令用法" tabindex="-1"><a class="header-anchor" href="#指令用法"><span>指令用法</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 给予效果</span>
<span class="line">/effect give &lt;目标&gt; &lt;效果&gt; [秒数] [等级] [粒子隐藏]</span>
<span class="line">/effect give @p speed 60 2               # 60 秒速度 III</span>
<span class="line">/effect give @a regeneration 30 1 true   # 30 秒生命恢复 II（隐藏粒子）</span>
<span class="line"></span>
<span class="line"># 清除效果</span>
<span class="line">/effect clear &lt;目标&gt;                     # 清除目标所有效果</span>
<span class="line">/effect clear &lt;目标&gt; &lt;效果&gt;              # 清除指定效果</span>
<span class="line">/effect clear @s                         # 清除自己的所有效果</span>
<span class="line"></span>
<span class="line"># 示例</span>
<span class="line">/effect give @s minecraft:resistance 999999 4 true  # 几乎永久的抗性提升 V</span>
<span class="line">/effect give @e[type=zombie,distance=..20] weakness 30 1  # 让附近僵尸虚弱</span>
<span class="line"></span></code></pre></div><h3 id="药水效果代码表" tabindex="-1"><a class="header-anchor" href="#药水效果代码表"><span>药水效果代码表</span></a></h3><table><thead><tr><th>效果名称</th><th>ID</th><th>英文 ID</th><th>说明</th></tr></thead><tbody><tr><td>速度</td><td>1</td><td><code>speed</code></td><td>提高移动速度</td></tr><tr><td>缓慢</td><td>2</td><td><code>slowness</code></td><td>降低移动速度</td></tr><tr><td>急迫</td><td>3</td><td><code>haste</code></td><td>提高挖掘速度</td></tr><tr><td>挖掘疲劳</td><td>4</td><td><code>mining_fatigue</code></td><td>降低挖掘速度</td></tr><tr><td>力量</td><td>5</td><td><code>strength</code></td><td>提高近战攻击伤害</td></tr><tr><td>瞬间治疗</td><td>6</td><td><code>instant_health</code></td><td>瞬间恢复生命</td></tr><tr><td>瞬间伤害</td><td>7</td><td><code>instant_damage</code></td><td>瞬间造成伤害</td></tr><tr><td>跳跃提升</td><td>8</td><td><code>jump_boost</code></td><td>提高跳跃高度</td></tr><tr><td>反胃</td><td>9</td><td><code>nausea</code></td><td>屏幕扭曲晃动</td></tr><tr><td>生命恢复</td><td>10</td><td><code>regeneration</code></td><td>每 50 tick 恢复 1 点生命</td></tr><tr><td>抗性提升</td><td>11</td><td><code>resistance</code></td><td>减少受到的伤害</td></tr><tr><td>防火</td><td>12</td><td><code>fire_resistance</code></td><td>免疫火焰和岩浆伤害</td></tr><tr><td>水下呼吸</td><td>13</td><td><code>water_breathing</code></td><td>在水中不掉氧气值</td></tr><tr><td>隐身</td><td>14</td><td><code>invisibility</code></td><td>透明效果（装备仍可见）</td></tr><tr><td>失明</td><td>15</td><td><code>blindness</code></td><td>视野变黑</td></tr><tr><td>夜视</td><td>16</td><td><code>night_vision</code></td><td>黑暗中获得夜视能力</td></tr><tr><td>饥饿</td><td>17</td><td><code>hunger</code></td><td>加速饥饿值下降</td></tr><tr><td>虚弱</td><td>18</td><td><code>weakness</code></td><td>降低近战攻击伤害</td></tr><tr><td>中毒</td><td>19</td><td><code>poison</code></td><td>持续伤害（最低半血）</td></tr><tr><td>凋零</td><td>20</td><td><code>wither</code></td><td>持续伤害（可致死）</td></tr><tr><td>生命提升</td><td>21</td><td><code>health_boost</code></td><td>增加额外生命上限</td></tr><tr><td>伤害吸收</td><td>22</td><td><code>absorption</code></td><td>增加额外吸收生命（金心）</td></tr><tr><td>饱和</td><td>23</td><td><code>saturation</code></td><td>瞬间恢复饥饿值</td></tr><tr><td>发光</td><td>24</td><td><code>glowing</code></td><td>显示实体白色轮廓（穿墙可见）</td></tr><tr><td>飘浮</td><td>25</td><td><code>levitation</code></td><td>使实体向上飘升</td></tr><tr><td>幸运</td><td>26</td><td><code>luck</code></td><td>提高优质战利品掉落概率</td></tr><tr><td>霉运</td><td>27</td><td><code>unluck</code></td><td>降低优质战利品掉落概率</td></tr><tr><td>缓降</td><td>28</td><td><code>slow_falling</code></td><td>减缓下落速度，免疫摔落伤害</td></tr></tbody></table><h3 id="效果等级说明" tabindex="-1"><a class="header-anchor" href="#效果等级说明"><span>效果等级说明</span></a></h3><ul><li><strong>等级 0</strong> = 效果 I，<strong>等级 1</strong> = 效果 II，依此类推</li><li>最大等级通常为 255（<code>/effect ... 255</code>），更高数值会被忽略</li><li>将 <code>粒子隐藏</code> 设为 <code>true</code> 可以隐藏效果粒子（适合创建隐藏 BUFF）</li></ul><hr><h2 id="nbt-数据操作" tabindex="-1"><a class="header-anchor" href="#nbt-数据操作"><span>NBT 数据操作</span></a></h2><blockquote><p>NBT（Named Binary Tag）是 Minecraft 的核心数据格式，用于存储方块、实体和物品的额外属性。掌握 NBT 操作可以实现各种自定义效果。</p></blockquote><h3 id="查看与修改数据" tabindex="-1"><a class="header-anchor" href="#查看与修改数据"><span>查看与修改数据</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 查询数据</span>
<span class="line">/data get entity &lt;目标&gt;                # 获取实体完整 NBT 数据</span>
<span class="line">/data get entity &lt;目标&gt; &lt;路径&gt;         # 获取指定路径的数据</span>
<span class="line">/data get block &lt;坐标&gt;                 # 获取方块 NBT 数据</span>
<span class="line"></span>
<span class="line"># 合并数据（修改指定字段）</span>
<span class="line">/data merge entity &lt;目标&gt; &lt;NBT&gt;        # 合并 NBT 到实体</span>
<span class="line">/data merge block &lt;坐标&gt; &lt;NBT&gt;         # 合并 NBT 到方块</span>
<span class="line"></span>
<span class="line"># 删除数据</span>
<span class="line">/data remove entity &lt;目标&gt; &lt;路径&gt;      # 删除实体的指定数据字段</span>
<span class="line">/data remove block &lt;坐标&gt; &lt;路径&gt;        # 删除方块的指定数据字段</span>
<span class="line"></span>
<span class="line"># 修改数据</span>
<span class="line">/data modify entity &lt;目标&gt; &lt;路径&gt; &lt;操作&gt; &lt;源&gt;</span>
<span class="line">/data modify block &lt;坐标&gt; &lt;路径&gt; set value &lt;新值&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h3><p>给村民自定义名字：</p><div class="language-minecraft" data-highlighter="prismjs" data-ext="minecraft"><pre><code class="language-minecraft"><span class="line">/data merge entity @e[type=minecraft:villager,limit=1] {CustomName:&#39;&quot;张三&quot;&#39;,CustomNameVisible:1}</span>
<span class="line"></span></code></pre></div><p>修改箱子的内容：</p><div class="language-minecraft" data-highlighter="prismjs" data-ext="minecraft"><pre><code class="language-minecraft"><span class="line">/data merge block 100 64 200 {Items:[{Slot:0,id:&quot;minecraft:diamond_sword&quot;,count:1}]}</span>
<span class="line"></span></code></pre></div><p>将掉落物的 NBT 复制到另一个实体：</p><div class="language-minecraft" data-highlighter="prismjs" data-ext="minecraft"><pre><code class="language-minecraft"><span class="line">/data modify entity @e[type=minecraft:zombie,limit=1] CustomName set from entity @e[type=minecraft:item,limit=1] Item.tag.display.Name</span>
<span class="line"></span></code></pre></div><h3 id="常见-nbt-路径" tabindex="-1"><a class="header-anchor" href="#常见-nbt-路径"><span>常见 NBT 路径</span></a></h3><table><thead><tr><th>路径</th><th>说明</th></tr></thead><tbody><tr><td><code>Health</code></td><td>实体生命值</td></tr><tr><td><code>Pos</code></td><td>实体位置坐标数组</td></tr><tr><td><code>Motion</code></td><td>实体的运动向量</td></tr><tr><td><code>CustomName</code></td><td>自定义名称</td></tr><tr><td><code>Invulnerable</code></td><td>是否无敌</td></tr><tr><td><code>FallDistance</code></td><td>累计下落距离</td></tr><tr><td><code>Fire</code></td><td>剩余着火时间（tick）</td></tr><tr><td><code>ActiveEffects</code></td><td>当前生效的状态效果</td></tr><tr><td><code>Items</code></td><td>方块容器内的物品列表</td></tr></tbody></table><hr><h2 id="数据包与函数" tabindex="-1"><a class="header-anchor" href="#数据包与函数"><span>数据包与函数</span></a></h2><blockquote><p>数据包是 Minecraft 资源/行为的扩展机制，函数则允许将多条指令写入一个文本文件批量执行。</p></blockquote><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 数据包管理</span>
<span class="line">/datapack enable &lt;名称&gt;             # 启用数据包</span>
<span class="line">/datapack disable &lt;名称&gt;            # 禁用数据包</span>
<span class="line">/datapack list                      # 列出所有数据包（含启用/禁用状态）</span>
<span class="line">/datapack enable &lt;名称&gt; &lt;优先级&gt;    # 设置数据包优先级（before/after 某包）</span>
<span class="line"></span>
<span class="line"># 执行函数</span>
<span class="line">/function &lt;命名空间:函数路径&gt;       # 执行函数中的所有指令</span>
<span class="line">/function mypack:hello              # 执行 mypack 数据包中的 hello 函数</span>
<span class="line">/function mypack:tick               # 在数据包 tick 函数中每 tick 执行</span>
<span class="line"></span>
<span class="line"># 函数标签</span>
<span class="line">/function #minecraft:tick           # 执行所有标记为 tick 标签的函数</span>
<span class="line">/function #minecraft:load           # 执行所有标记为 load 标签的函数</span>
<span class="line"></span></code></pre></div><h3 id="函数文件结构" tabindex="-1"><a class="header-anchor" href="#函数文件结构"><span>函数文件结构</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">datapacks/</span>
<span class="line">└── mypack/</span>
<span class="line">    ├── pack.mcmeta                 # 数据包描述文件</span>
<span class="line">    └── data/</span>
<span class="line">        └── mypack/</span>
<span class="line">            └── functions/</span>
<span class="line">                ├── hello.mcfunction  # 函数文件</span>
<span class="line">                └── tick.mcfunction   # 每 tick 执行</span>
<span class="line"></span></code></pre></div><hr><h2 id="记分板" tabindex="-1"><a class="header-anchor" href="#记分板"><span>记分板</span></a></h2><blockquote><p>记分板系统是 Minecraft 中最强大的游戏机制扩展工具之一，可用于追踪统计、触发事件、制作小游戏。</p></blockquote><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 创建计分板目标</span>
<span class="line">/scoreboard objectives add &lt;名称&gt; &lt;条件&gt; [显示名]</span>
<span class="line"></span>
<span class="line"># 条件类型（criteria）</span>
<span class="line">/scoreboard objectives add kills totalKillCount 杀敌数   # 总击杀数</span>
<span class="line">/scoreboard objectives add health health 生命值          # 生命值</span>
<span class="line">/scoreboard objectives add deaths deathCount 死亡次数     # 死亡次数</span>
<span class="line">/scoreboard objectives add level level 等级              # 经验等级</span>
<span class="line">/scoreboard objectives add food food 饥饿值              # 饥饿值</span>
<span class="line">/scoreboard objectives add dummy 金币                    # 虚拟目标（手动赋值）</span>
<span class="line">/scoreboard objectives add trig trigger 传送             # 可被玩家触发的目标</span>
<span class="line"></span>
<span class="line"># 显示计分板</span>
<span class="line">/scoreboard objectives setdisplay sidebar kills           # 右侧边栏显示</span>
<span class="line">/scoreboard objectives setdisplay list kills              # 玩家列表显示</span>
<span class="line">/scoreboard objectives setdisplay belowName kills         # 名字下方显示</span>
<span class="line"></span>
<span class="line"># 操作分数</span>
<span class="line">/scoreboard players set &lt;玩家&gt; &lt;目标&gt; &lt;数值&gt;               # 设置分数</span>
<span class="line">/scoreboard players add @p kills 1                        # 增加分数</span>
<span class="line">/scoreboard players remove @p kills 1                     # 减少分数</span>
<span class="line">/scoreboard players reset &lt;玩家&gt; [目标]                    # 重置分数</span>
<span class="line"></span>
<span class="line"># 示例：创建传送系统</span>
<span class="line">/scoreboard objectives add teleport trigger 传送           # 创建触发目标</span>
<span class="line">/scoreboard players enable @p teleport                    # 允许玩家触发</span>
<span class="line"># 玩家执行 /trigger teleport 后触发指令</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="记分板应用场景" tabindex="-1"><a class="header-anchor" href="#记分板应用场景"><span>记分板应用场景</span></a></h3><ul><li><strong>小游戏计分</strong>: 追踪击杀、死亡、得分，显示在侧边栏</li><li><strong>条件判断</strong>: 配合 <code>/execute</code> 执行分数条件指令</li><li><strong>经济系统</strong>: 创建 <code>dummy</code> 目标作为虚拟货币</li><li><strong>计时器</strong>: 每秒通过函数 <code>add</code> 操作实现倒计时</li><li><strong>触发系统</strong>: 使用 <code>trigger</code> 让玩家通过简单的 <code>/trigger</code> 指令触发复杂逻辑</li></ul><hr><h2 id="powertool-essentials-插件" tabindex="-1"><a class="header-anchor" href="#powertool-essentials-插件"><span>PowerTool（Essentials 插件）</span></a></h2><blockquote><p>PowerTool 可以将指令绑定到物品上，手持物品点击即可快速执行。需安装 EssentialsX 插件。</p></blockquote><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 绑定指令到手持物品</span>
<span class="line">/powertool &lt;指令&gt;                   # 将指令绑定到当前手持物品</span>
<span class="line">/powertool msg                       # 绑定后点击物品自动打开聊天窗口</span>
<span class="line">/powertool give @s diamond 1        # 点击物品获得钻石</span>
<span class="line"></span>
<span class="line"># 清除绑定</span>
<span class="line">/powertool remove                    # 移除当前物品的绑定</span>
<span class="line">/powertool clear                     # 清除所有物品的绑定</span>
<span class="line"></span>
<span class="line"># 多指令绑定</span>
<span class="line">/powertool help                      # 查看 PowerTool 帮助</span>
<span class="line"></span></code></pre></div><hr><h2 id="常用指令组合" tabindex="-1"><a class="header-anchor" href="#常用指令组合"><span>常用指令组合</span></a></h2><blockquote><p>实际场景中的指令搭配，解决常见需求。</p></blockquote><h3 id="创造模式生存包" tabindex="-1"><a class="header-anchor" href="#创造模式生存包"><span>创造模式生存包</span></a></h3><p>适合进入创造模式开始建筑的起步指令：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/gamemode creative</span>
<span class="line">/give @p minecraft:command_block 64</span>
<span class="line">/give @p minecraft:structure_block 64</span>
<span class="line">/give @p minecraft:debug_stick</span>
<span class="line">/give @p minecraft:barrier 64</span>
<span class="line">/give @p minecraft:light_block 64</span>
<span class="line"></span></code></pre></div><h3 id="快速建房框架" tabindex="-1"><a class="header-anchor" href="#快速建房框架"><span>快速建房框架</span></a></h3><p>先用石头围出框架，再掏空内部：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/fill ~ ~ ~ ~10 ~10 ~10 minecraft:stone</span>
<span class="line">/fill ~ ~1 ~ ~9 ~9 ~9 minecraft:air</span>
<span class="line"></span></code></pre></div><h3 id="清空周围怪物" tabindex="-1"><a class="header-anchor" href="#清空周围怪物"><span>清空周围怪物</span></a></h3><p>清除半径 50 格内的所有怪物（安全施工/探索）：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/kill @e[type=!minecraft:player,distance=..50]</span>
<span class="line"></span></code></pre></div><h3 id="创建保护区" tabindex="-1"><a class="header-anchor" href="#创建保护区"><span>创建保护区</span></a></h3><p>防止怪物破坏地形和生成，适合建筑区域：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/gamerule mobGriefing false</span>
<span class="line">/gamerule doMobSpawning false</span>
<span class="line"></span></code></pre></div><h3 id="永久白天-好天气" tabindex="-1"><a class="header-anchor" href="#永久白天-好天气"><span>永久白天 + 好天气</span></a></h3><p>适合建筑和探索：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/time set day</span>
<span class="line">/weather clear</span>
<span class="line">/gamerule doDaylightCycle false</span>
<span class="line">/gamerule doWeatherCycle false</span>
<span class="line"></span></code></pre></div><h3 id="自定义武器" tabindex="-1"><a class="header-anchor" href="#自定义武器"><span>自定义武器</span></a></h3><p>给出一把带有自定义名和高级附魔的武器：</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/give @s minecraft:netherite_sword{</span>
<span class="line">  display:{Name:&#39;{&quot;text&quot;:&quot;屠龙刀&quot;,&quot;color&quot;:&quot;red&quot;,&quot;bold&quot;:true}&#39;},</span>
<span class="line">  Enchantments:[{id:&quot;minecraft:sharpness&quot;,lvl:10},{id:&quot;minecraft:fire_aspect&quot;,lvl:3},{id:&quot;minecraft:looting&quot;,lvl:5},{id:&quot;minecraft:unbreaking&quot;,lvl:5}]</span>
<span class="line">} 1</span>
<span class="line"></span></code></pre></div><hr><h2 id="命令方块拓展" tabindex="-1"><a class="header-anchor" href="#命令方块拓展"><span>命令方块拓展</span></a></h2><blockquote><p>命令方块可以将指令自动化，是地图制作和服务器功能的核心组件。</p></blockquote><h3 id="命令方块类型" tabindex="-1"><a class="header-anchor" href="#命令方块类型"><span>命令方块类型</span></a></h3><table><thead><tr><th>类型</th><th>外观</th><th>说明</th></tr></thead><tbody><tr><td>脉冲（impulse）</td><td>橙色</td><td>接收到红石信号时执行一次</td></tr><tr><td>连锁（chain）</td><td>绿色</td><td>链中的下一个，需要上一个执行后才能触发</td></tr><tr><td>循环（repeating）</td><td>紫色</td><td>每 tick 执行一次</td></tr></tbody></table><h3 id="获取命令方块" tabindex="-1"><a class="header-anchor" href="#获取命令方块"><span>获取命令方块</span></a></h3><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">/give @s minecraft:command_block</span>
<span class="line">/give @s minecraft:chain_command_block</span>
<span class="line">/give @s minecraft:repeating_command_block</span>
<span class="line"></span></code></pre></div><h3 id="命令方块常用技巧" tabindex="-1"><a class="header-anchor" href="#命令方块常用技巧"><span>命令方块常用技巧</span></a></h3><ol><li><strong>连锁执行</strong>: 脉冲命令方块 → 连锁命令方块 → …，实现多步指令链</li><li><strong>循环检测</strong>: 循环命令方块 + <code>redstone</code> 模式，持续检测条件</li><li><strong>条件制约</strong>: 开启&quot;条件制约&quot;选项，只有前一个执行成功才执行</li><li><strong>保持开启</strong>: 设为&quot;保持开启&quot;后无需红石信号持续工作</li></ol><p><strong>示例</strong>: 检测玩家血量并自动恢复</p><div class="language-text" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 循环命令方块（保持开启）</span>
<span class="line">/execute as @a[gamemode=survival] if entity @s[nbt={Health:6}] run effect give @s regeneration 5 2</span>
<span class="line"></span></code></pre></div><hr><h2 id="调试与实用工具" tabindex="-1"><a class="header-anchor" href="#调试与实用工具"><span>调试与实用工具</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># 调试棒（获取后右键点击方块调整属性）</span>
<span class="line">/give @s minecraft:debug_stick</span>
<span class="line"></span>
<span class="line"># 性能分析</span>
<span class="line">/debug start                       # 开始性能分析</span>
<span class="line">/debug stop                        # 停止并输出分析报告</span>
<span class="line">/debug function                    # 分析函数性能</span>
<span class="line"></span>
<span class="line"># 服务器信息</span>
<span class="line">/tps                               # 查看服务器 TPS（需插件）</span>
<span class="line">/memory                            # 查看内存占用</span>
<span class="line">/gc                                # 垃圾回收（需插件）</span>
<span class="line"></span>
<span class="line"># 延时执行</span>
<span class="line">/schedule function &lt;函数&gt; &lt;tick数&gt;  # 延时执行函数</span>
<span class="line">/schedule clear &lt;函数&gt;              # 取消延时</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><blockquote><p><strong>提示</strong>: 本文档基于 Minecraft Java Edition 最新版本编写。使用 <code>/help &lt;指令名&gt;</code> 可在游戏中查看指令的详细用法和参数。</p></blockquote>`,155)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};