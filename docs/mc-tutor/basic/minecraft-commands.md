# Minecraft 指令大全

> 从基础到进阶，涵盖生存、创造、服务器管理的常用指令及深度用法。

[官方 Wiki](https://minecraft.fandom.com/zh/wiki/%E5%91%BD%E4%BB%A4)

---

## 基础指令

日常最常用的基础指令，适合所有玩家。

| 指令 | 说明 | 示例 | 拓展 |
|------|------|------|------|
| `/help` | 显示帮助信息 | `/help` | `/help give` 可查看指定指令的详细用法 |
| `/seed` | 显示当前世界的种子 | `/seed` | 种子可用于在创建世界时复刻地形 |
| `/list` | 显示在线玩家列表及数量 | `/list` | 配合 `uuids` 参数可显示玩家 UUID |
| `/kill` | 杀死目标实体 | `/kill @e[type=minecraft:creeper]` | 不加参数默认杀死自己；可配合选择器批量清除实体 |
| `/me` | 发送第三人称动作消息 | `/me 在挖矿` → `*玩家名 在挖矿*` | 用于角色扮演，所有玩家可见 |
| `/tell` | 私聊指定玩家 | `/tell 张三 你好` | 仅目标玩家能看到消息 |
| `/say` | 广播消息（带服务器前缀） | `/say 服务器即将重启` | 消息会以 `[服务器]` 前缀显示 |

---

## 传送与定位

用于玩家移动、坐标查询和出生点设置。

```text
# 传送
/tp <目标>                         # 传送到目标实体位置
/tp <x> <y> <z>                   # 传送到指定坐标
/tp <玩家> <目标>                  # 将某玩家传送到目标
/tp <玩家> <x> <y> <z>            # 将某玩家传送到坐标

# 示例
/tp @p 100 64 -200                # 将最近玩家传送到坐标
/tp @a @p                         # 将所有玩家拉到最近玩家身边

# 出生点设置
/spawnpoint                       # 将个人出生点设为当前位置
/spawnpoint <玩家>                 # 设置指定玩家的出生点
/spawnpoint <玩家> <x> <y> <z>    # 设置玩家出生点到指定坐标

/setworldspawn                    # 将世界出生点设为当前位置
/setworldspawn <x> <y> <z>        # 设置世界出生点到指定坐标

# 查询坐标
/locate <结构>                     # 查找最近的自然生成结构
/locate village                    # 查找最近的村庄
/locate fortress                   # 查找下界要塞
/locate structure minecraft:ancient_city  # 查找远古城市

# 插件常用（非原版）
/warp <名称>                      # 传送到地标（需插件支持）
/home                             # 回家（需插件支持）
```

---

## 时间与天气

控制游戏内的昼夜循环和天气变化。

```text
# 时间控制
/time set <数值>                   # 设置时间为指定 tick
/time set day                      # 白天 (1000 tick)
/time set night                    # 夜晚 (13000 tick)
/time set noon                     # 正午 (6000 tick)
/time set midnight                 # 午夜 (18000 tick)
/time set 0                        # 黎明
/time add <tick>                   # 增加指定 tick 数

# 天气控制
/weather clear                     # 晴天
/weather rain                      # 雨天
/weather thunder                   # 雷暴
/weather rain <秒数>               # 下雨指定时长后结束
/weather thunder <秒数>            # 雷暴指定时长后结束

# 小贴士
# 1 个游戏日 = 24000 ticks = 20 分钟现实时间
# 使用 /gamerule doDaylightCycle false 可永久锁定时间
```

---

## 游戏模式

切换玩家的游戏模式，支持全称和数字简写。

```text
/gamemode <模式>                   # 切换自己的游戏模式
/gamemode <模式> <玩家>            # 切换指定玩家的游戏模式

# 模式列表
| 模式 | 全称 | 简写 | 说明 |
|------|------|------|------|
| 生存 | survival | 0 | 正常玩法，有生命值、饥饿值 |
| 创造 | creative | 1 | 无限资源、飞行、瞬间破坏 |
| 冒险 | adventure | 2 | 只能使用合适工具破坏方块 |
| 旁观 | spectator | 3 | 穿墙透视，无法交互 |

# 示例
/gamemode creative                 # 切换为创造模式
/gamemode survival @a              # 所有玩家切换生存
/gamemode 3                        # 旁观模式
```

### 游戏模式详解

- **生存模式**: 最核心的玩法，需要收集资源、合成工具、对抗怪物。饥饿值低于 18 点时才会自然回血。
- **创造模式**: 适合建筑和测试。拥有无限物品栏、可以飞行、无视伤害。左键瞬间破坏任意方块。
- **冒险模式**: 用于地图和冒险场景。只能使用适合的工具破坏方块（如用斧头破坏木板），防止误拆。
- **旁观模式**: 可以穿过任何方块，从实体视角观察（`左键` 点击实体），但不能与任何方块或物品交互。

---

## 物品操作

给予、清除、附魔物品的基础指令。

```text
# 给予物品
/give <玩家> <物品> [数量]         # 给予玩家指定物品
/give @p diamond 1                # 给自己 1 个钻石
/give @a minecraft:iron_sword 1   # 给所有玩家 1 把铁剑
/give @s minecraft:elytra 1       # 给自己 1 个鞘翅

# 清空物品
/clear <玩家>                      # 清空玩家全部物品
/clear <玩家> <物品>               # 清空指定类型的物品
/clear <玩家> <物品> [最大数量]    # 清空指定数量以内的物品

# 附魔物品（手持时使用）
/enchant <玩家> <附魔ID> [等级]   # 附魔手持物品
/enchant @p sharpness 5           # 锋利 V
/enchant @p unbreaking 3          # 耐久 III
/enchant @p mending 1             # 经验修补

# 物品栏操作
/replaceitem entity <目标> <栏位> <物品> [数量]  # 替换指定栏位的物品
```

---

## 附魔与自定义物品

> 通过 NBT 数据可以创建拥有自定义属性、名称、描述的强力物品。

### 带附魔的物品

给玩家一把锋利 X 的钻石剑：

```minecraft
/give @s minecraft:diamond_sword{Enchantments:[{id:"minecraft:sharpness",lvl:10}]} 1
```

给玩家一把带有多重附魔的弓：

```minecraft
/give @s minecraft:bow{Enchantments:[{id:"minecraft:power",lvl:5},{id:"minecraft:flame",lvl:1},{id:"minecraft:unbreaking",lvl:3}]} 1
```

### 自定义名称与描述

给玩家一把带有自定义名称和描述的金色宝剑：

```minecraft
/give @s minecraft:diamond_sword{display:{Name:'{"text":"王者之剑","color":"gold"}',Lore:['{"text":"传说中的神剑","color":"gray"}','{"text":"+20 攻击力","color":"green"}']}} 1
```

### 属性修改

通过 `AttributeModifiers` 修改物品的基础属性：

```minecraft
/give @s minecraft:diamond_sword{AttributeModifiers:[{AttributeName:"minecraft:generic.attack_damage",Name:"generic.attack_damage",Amount:50,Operation:0,UUID:[I;1,1,1,1]}]} 1
```

| NBT 字段 | 说明 |
|----------|------|
| `Enchantments` | 附魔列表，每个附魔有 `id` 和 `lvl` |
| `display.Name` | 物品显示名称（支持 JSON 文本） |
| `display.Lore` | 物品描述文本数组（支持 JSON 文本） |
| `AttributeModifiers` | 属性修改器列表（攻击力、速度等） |
| `Unbreakable` | 设为 `1` 使物品永不损坏 |
| `CanDestroy` | 冒险模式下可破坏的方块列表 |

---

## 实体操作

生成、清除、操作游戏中的生物和实体。

```text
# 生成实体
/summon <实体ID> [坐标] [NBT]      # 在指定位置生成实体

# 基础示例
/summon creeper                    # 生成一只苦力怕
/summon minecraft:ender_dragon     # 生成末影龙
/summon minecraft:iron_golem ~ ~ ~ {NoAI:1}  # 生成一只不会动的铁傀儡
/summon minecraft:bat ~ ~ ~ {Size:10}  # 生成超大蝙蝠
```

### 高级实体生成

生成一只骑着僵尸的马（利用 `Passengers` 实现骑乘）：

```minecraft
/summon horse ~ ~ ~ {Passengers:[{id:"minecraft:zombie"}]}
```

生成一只身穿全套钻石装备的僵尸：

```minecraft
/summon zombie ~ ~ ~ {
  equipment:{
    chest:{components:{"minecraft:enchantments":{"minecraft:protection":4}},count:1,id:"minecraft:diamond_chestplate"},
    feet:{components:{"minecraft:enchantments":{"minecraft:protection":4}},count:1,id:"minecraft:diamond_boots"},
    head:{components:{"minecraft:enchantments":{"minecraft:protection":4}},count:1,id:"minecraft:diamond_helmet"},
    legs:{components:{"minecraft:enchantments":{"minecraft:protection":4}},count:1,id:"minecraft:diamond_leggings"},
    mainhand:{components:{"minecraft:enchantments":{"minecraft:sharpness":5}},count:1,id:"minecraft:trident"}
  }
}
```

生成一只名为 "Boss" 的巨型僵尸，带有发光效果：

```minecraft
/summon zombie ~ ~ ~ {CustomName:'"Boss"',CustomNameVisible:1,Glowing:1,Size:3,Health:100}
```

### 常用 NBT 标签（实体）

| 标签 | 类型 | 说明 |
|------|------|------|
| `CustomName` | JSON 字符串 | 自定义实体名称 |
| `CustomNameVisible` | 布尔 | 始终显示名称（含穿墙） |
| `Glowing` | 布尔 | 实体发出白色轮廓光 |
| `NoAI` | 布尔 | 禁用 AI（实体原地不动） |
| `Silent` | 布尔 | 禁止实体发出声音 |
| `Health` | 浮点 | 设置实体生命值 |
| `Passengers` | 列表 | 该实体身上骑乘的实体列表 |
| `Equipment` | 列表 | 实体装备的物品 |
| `Invulnerable` | 布尔 | 实体免疫所有伤害 |

### 清除实体

```text
/kill @e[type=minecraft:creeper]           # 杀死所有苦力怕
/kill @e[type=!minecraft:player]           # 杀死所有非玩家实体
/kill @e[type=#minecraft:skeletons]        # 杀死所有骷髅类生物
/kill @e[family=minecraft:undead]          # 杀死所有亡灵生物
```

---

## 目标选择器

> 目标选择器是 Minecraft 指令系统的核心，用于精确定位玩家和实体。

### 基础选择器

| 选择器 | 说明 | 示例 |
|--------|------|------|
| `@p` | 距离最近的玩家 | `@p` |
| `@a` | 所有玩家 | `@a` |
| `@r` | 随机玩家 | `@r` |
| `@e` | 所有实体 | `@e[type=creeper]` |
| `@s` | 指令执行者自身 | `@s` |
| `@n` | 距离最近的实体 | `@n[type=!player]` |

### 选择器参数

在 `[]` 中添加参数来过滤目标，多个参数用逗号 `,` 分隔。

```text
# 类型和数量
@e[type=zombie]                    # 所有僵尸
@e[type=zombie,limit=5]            # 前 5 个僵尸
@e[type=!minecraft:player]         # 所有非玩家实体
@e[type=minecraft:cow,sort=nearest] # 按距离排序

# 游戏模式
@a[gamemode=creative]              # 创造模式玩家
@a[gamemode=survival]              # 生存模式玩家

# 距离筛选
@p[distance=..10]                  # 10 格内的最近玩家
@p[distance=10..]                  # 10 格以外的最近玩家
@e[type=item,distance=..5]         # 5 格内的掉落物
@e[distance=10..20]                # 10~20 格之间的实体

# 计分板
@a[scores={score_name=10..}]       # 分数 >= 10 的玩家
@a[scores={kills=5..10}]           # 杀敌数在 5~10 之间的玩家
@a[scores={deaths=..3}]            # 死亡次数 <= 3 的玩家

# 名字和标签
@e[name="Test"]                    # 名字为 Test 的实体
@e[name=!Test]                     # 名字不是 Test 的实体
@e[tag=myTag]                      # 带有 myTag 标签的实体
@e[tag=!boss]                      # 没有 boss 标签的实体

# NBT 匹配（1.20.5+ 使用 predicate）
@e[nbt={Health:1..}]               # 生命值 >= 1 的实体
```

### 参数运算符

| 符号 | 含义 | 示例 |
|------|------|------|
| `..N` | 小于等于 N | `distance=..10` |
| `M..` | 大于等于 M | `distance=10..` |
| `M..N` | 在 M 和 N 之间 | `distance=5..20` |
| `!` | 取反（排除） | `type=!player` |
| `=` | 精确匹配 | `gamemode=creative` |

---

## 方块操作

在游戏世界中放置、填充、复制和修改方块。

```text
# 放置单方块
/setblock <坐标> <方块> [破坏模式]  # 在指定坐标放置方块
/setblock ~ ~1 ~ minecraft:stone   # 在头顶放一个石头
/setblock ~ ~-1 ~ minecraft:redstone_block  # 在脚下放红石块
/setblock 100 64 200 minecraft:chest{Facing:"east"}  # 放置朝东的箱子

# 破坏模式
/setblock <坐标> air destroy        # 破坏方块并播放粒子效果（掉落物品）
/setblock <坐标> air replace        # 直接替换（不播放效果）

# 填充区域
/fill <x1> <y1> <z1> <x2> <y2> <z2> <方块> [破坏模式]
/fill ~ ~ ~ ~5 ~5 ~5 stone         # 填充 5×5×5 的石头
/fill ~ ~1 ~ ~10 ~10 ~10 air       # 清空 10×10×10 的区域
/fill 0 64 0 10 70 10 glass        # 建造玻璃房

# 替换方块
/fill x1 y1 z1 x2 y2 z2 wool replace stone  # 将石头替换为羊毛
/fill ~ ~ ~ ~10 ~10 ~10 air replace minecraft:grass_block  # 清除所有草方块

# 复制区域
/clone <x1> <y1> <z1> <x2> <y2> <z2> <目标x> <目标y> <目标z> [模式]

# 克隆模式
/clone ... ... ... masked           # 只复制非空气方块
/clone ... ... ... filtered <方块>  # 只复制指定方块
/clone ... ... ... replace          # 完整复制（默认）
```

---

## 世界管理

管理世界存档、难度、出生点等全局设置。

```text
# 存档管理
/save-all                          # 强制保存世界（立刻写入磁盘）
/save-off                          # 关闭自动保存（谨慎使用，避免数据丢失）
/save-on                           # 开启自动保存

# 难度设置
/difficulty <难度>                 # 设置游戏难度
/difficulty peaceful               # 和平
/difficulty easy                   # 简单
/difficulty normal                 # 普通
/difficulty hard                   # 困难

# 世界出生点
/setworldspawn                     # 设置世界出生点
/setworldspawn 100 64 200          # 设置到指定坐标

# 世界边界
/worldborder set <半径>            # 设置世界边界大小
/worldborder center <x> <z>        # 设置边界中心点
/worldborder add <格数>            # 扩展/缩小边界
/worldborder warning distance <格数> # 边界警告距离

# 生成结构
/place template <路径> [坐标]      # 放置结构模板
/place feature <特征> [坐标]       # 放置地形特征

# 示例
/place feature minecraft:end_gateway_return  # 放置返回末地折跃门
```

---

## 游戏规则

> 通过 `/gamerule` 可以精细控制游戏机制，是自定义游戏体验的核心工具。

### 常用游戏规则

```text
/gamerule <规则名> <值>
/gamerule doDaylightCycle false        # 停止日夜交替
/gamerule doWeatherCycle false         # 停止天气变化
/gamerule keepInventory true           # 死亡不掉落物品
/gamerule mobGriefing false            # 禁止怪物破坏地形（苦力怕不炸坑、末影人不搬方块）
/gamerule doMobSpawning false          # 禁止自然怪物生成
/gamerule doFireTick false             # 禁止火焰蔓延和熄灭
/gamerule commandBlockOutput false     # 关闭命令方块输出信息
/gamerule showCoordinates true         # 右上角显示坐标
/gamerule maxCommandChainLength 65535  # 命令方块链最大执行长度
/gamerule doEntityDrops false          # 禁止实体掉落物品（含生物和掉落物）
/gamerule doTileDrops false            # 禁止方块掉落物品
/gamerule randomTickSpeed 3            # 随机刻速度（影响作物生长和菌丝扩散）
/gamerule naturalRegeneration false    # 禁用自然回血（适合 RLCraft 类整合包）
/gamerule doInsomnia false             # 禁止幻翼生成
/gamerule doPatrolSpawning false       # 禁止掠夺者巡逻队生成
/gamerule doTraderSpawning false       # 禁止流浪商人生成
/gamerule doLimitedCrafting true       # 玩家只能合成已解锁配方（数据包用）
/gamerule announceAdvancements false   # 关闭进度通知
/gamerule forgiveDeadPlayers true      # 被僵尸感染的村民死后原谅玩家
/gamerule universalAnger false         # 僵尸被攻击时激怒附近所有僵尸
/gamerule playersSleepingPercentage 50 # 跳过夜晚所需的睡眠玩家百分比
```

---

## 药水与效果

> 使用 `/effect` 指令给予或清除状态效果，配合药水效果代码表使用。

### 指令用法

```text
# 给予效果
/effect give <目标> <效果> [秒数] [等级] [粒子隐藏]
/effect give @p speed 60 2               # 60 秒速度 III
/effect give @a regeneration 30 1 true   # 30 秒生命恢复 II（隐藏粒子）

# 清除效果
/effect clear <目标>                     # 清除目标所有效果
/effect clear <目标> <效果>              # 清除指定效果
/effect clear @s                         # 清除自己的所有效果

# 示例
/effect give @s minecraft:resistance 999999 4 true  # 几乎永久的抗性提升 V
/effect give @e[type=zombie,distance=..20] weakness 30 1  # 让附近僵尸虚弱
```

### 药水效果代码表

| 效果名称 | ID | 英文 ID | 说明 |
|---------|----|---------|------|
| 速度 | 1 | `speed` | 提高移动速度 |
| 缓慢 | 2 | `slowness` | 降低移动速度 |
| 急迫 | 3 | `haste` | 提高挖掘速度 |
| 挖掘疲劳 | 4 | `mining_fatigue` | 降低挖掘速度 |
| 力量 | 5 | `strength` | 提高近战攻击伤害 |
| 瞬间治疗 | 6 | `instant_health` | 瞬间恢复生命 |
| 瞬间伤害 | 7 | `instant_damage` | 瞬间造成伤害 |
| 跳跃提升 | 8 | `jump_boost` | 提高跳跃高度 |
| 反胃 | 9 | `nausea` | 屏幕扭曲晃动 |
| 生命恢复 | 10 | `regeneration` | 每 50 tick 恢复 1 点生命 |
| 抗性提升 | 11 | `resistance` | 减少受到的伤害 |
| 防火 | 12 | `fire_resistance` | 免疫火焰和岩浆伤害 |
| 水下呼吸 | 13 | `water_breathing` | 在水中不掉氧气值 |
| 隐身 | 14 | `invisibility` | 透明效果（装备仍可见） |
| 失明 | 15 | `blindness` | 视野变黑 |
| 夜视 | 16 | `night_vision` | 黑暗中获得夜视能力 |
| 饥饿 | 17 | `hunger` | 加速饥饿值下降 |
| 虚弱 | 18 | `weakness` | 降低近战攻击伤害 |
| 中毒 | 19 | `poison` | 持续伤害（最低半血） |
| 凋零 | 20 | `wither` | 持续伤害（可致死） |
| 生命提升 | 21 | `health_boost` | 增加额外生命上限 |
| 伤害吸收 | 22 | `absorption` | 增加额外吸收生命（金心） |
| 饱和 | 23 | `saturation` | 瞬间恢复饥饿值 |
| 发光 | 24 | `glowing` | 显示实体白色轮廓（穿墙可见） |
| 飘浮 | 25 | `levitation` | 使实体向上飘升 |
| 幸运 | 26 | `luck` | 提高优质战利品掉落概率 |
| 霉运 | 27 | `unluck` | 降低优质战利品掉落概率 |
| 缓降 | 28 | `slow_falling` | 减缓下落速度，免疫摔落伤害 |

### 效果等级说明

- **等级 0** = 效果 I，**等级 1** = 效果 II，依此类推
- 最大等级通常为 255（`/effect ... 255`），更高数值会被忽略
- 将 `粒子隐藏` 设为 `true` 可以隐藏效果粒子（适合创建隐藏 BUFF）

---

## NBT 数据操作

> NBT（Named Binary Tag）是 Minecraft 的核心数据格式，用于存储方块、实体和物品的额外属性。掌握 NBT 操作可以实现各种自定义效果。

### 查看与修改数据

```text
# 查询数据
/data get entity <目标>                # 获取实体完整 NBT 数据
/data get entity <目标> <路径>         # 获取指定路径的数据
/data get block <坐标>                 # 获取方块 NBT 数据

# 合并数据（修改指定字段）
/data merge entity <目标> <NBT>        # 合并 NBT 到实体
/data merge block <坐标> <NBT>         # 合并 NBT 到方块

# 删除数据
/data remove entity <目标> <路径>      # 删除实体的指定数据字段
/data remove block <坐标> <路径>        # 删除方块的指定数据字段

# 修改数据
/data modify entity <目标> <路径> <操作> <源>
/data modify block <坐标> <路径> set value <新值>
```

### 示例

给村民自定义名字：

```minecraft
/data merge entity @e[type=minecraft:villager,limit=1] {CustomName:'"张三"',CustomNameVisible:1}
```

修改箱子的内容：

```minecraft
/data merge block 100 64 200 {Items:[{Slot:0,id:"minecraft:diamond_sword",count:1}]}
```

将掉落物的 NBT 复制到另一个实体：

```minecraft
/data modify entity @e[type=minecraft:zombie,limit=1] CustomName set from entity @e[type=minecraft:item,limit=1] Item.tag.display.Name
```

### 常见 NBT 路径

| 路径 | 说明 |
|------|------|
| `Health` | 实体生命值 |
| `Pos` | 实体位置坐标数组 |
| `Motion` | 实体的运动向量 |
| `CustomName` | 自定义名称 |
| `Invulnerable` | 是否无敌 |
| `FallDistance` | 累计下落距离 |
| `Fire` | 剩余着火时间（tick） |
| `ActiveEffects` | 当前生效的状态效果 |
| `Items` | 方块容器内的物品列表 |

---

## 数据包与函数

> 数据包是 Minecraft 资源/行为的扩展机制，函数则允许将多条指令写入一个文本文件批量执行。

```text
# 数据包管理
/datapack enable <名称>             # 启用数据包
/datapack disable <名称>            # 禁用数据包
/datapack list                      # 列出所有数据包（含启用/禁用状态）
/datapack enable <名称> <优先级>    # 设置数据包优先级（before/after 某包）

# 执行函数
/function <命名空间:函数路径>       # 执行函数中的所有指令
/function mypack:hello              # 执行 mypack 数据包中的 hello 函数
/function mypack:tick               # 在数据包 tick 函数中每 tick 执行

# 函数标签
/function #minecraft:tick           # 执行所有标记为 tick 标签的函数
/function #minecraft:load           # 执行所有标记为 load 标签的函数
```

### 函数文件结构

```
datapacks/
└── mypack/
    ├── pack.mcmeta                 # 数据包描述文件
    └── data/
        └── mypack/
            └── functions/
                ├── hello.mcfunction  # 函数文件
                └── tick.mcfunction   # 每 tick 执行
```

---

## 记分板

> 记分板系统是 Minecraft 中最强大的游戏机制扩展工具之一，可用于追踪统计、触发事件、制作小游戏。

```text
# 创建计分板目标
/scoreboard objectives add <名称> <条件> [显示名]

# 条件类型（criteria）
/scoreboard objectives add kills totalKillCount 杀敌数   # 总击杀数
/scoreboard objectives add health health 生命值          # 生命值
/scoreboard objectives add deaths deathCount 死亡次数     # 死亡次数
/scoreboard objectives add level level 等级              # 经验等级
/scoreboard objectives add food food 饥饿值              # 饥饿值
/scoreboard objectives add dummy 金币                    # 虚拟目标（手动赋值）
/scoreboard objectives add trig trigger 传送             # 可被玩家触发的目标

# 显示计分板
/scoreboard objectives setdisplay sidebar kills           # 右侧边栏显示
/scoreboard objectives setdisplay list kills              # 玩家列表显示
/scoreboard objectives setdisplay belowName kills         # 名字下方显示

# 操作分数
/scoreboard players set <玩家> <目标> <数值>               # 设置分数
/scoreboard players add @p kills 1                        # 增加分数
/scoreboard players remove @p kills 1                     # 减少分数
/scoreboard players reset <玩家> [目标]                    # 重置分数

# 示例：创建传送系统
/scoreboard objectives add teleport trigger 传送           # 创建触发目标
/scoreboard players enable @p teleport                    # 允许玩家触发
# 玩家执行 /trigger teleport 后触发指令
```

### 记分板应用场景

- **小游戏计分**: 追踪击杀、死亡、得分，显示在侧边栏
- **条件判断**: 配合 `/execute` 执行分数条件指令
- **经济系统**: 创建 `dummy` 目标作为虚拟货币
- **计时器**: 每秒通过函数 `add` 操作实现倒计时
- **触发系统**: 使用 `trigger` 让玩家通过简单的 `/trigger` 指令触发复杂逻辑

---

## PowerTool（Essentials 插件）

> PowerTool 可以将指令绑定到物品上，手持物品点击即可快速执行。需安装 EssentialsX 插件。

```text
# 绑定指令到手持物品
/powertool <指令>                   # 将指令绑定到当前手持物品
/powertool msg                       # 绑定后点击物品自动打开聊天窗口
/powertool give @s diamond 1        # 点击物品获得钻石

# 清除绑定
/powertool remove                    # 移除当前物品的绑定
/powertool clear                     # 清除所有物品的绑定

# 多指令绑定
/powertool help                      # 查看 PowerTool 帮助
```

---

## 常用指令组合

> 实际场景中的指令搭配，解决常见需求。

### 创造模式生存包

适合进入创造模式开始建筑的起步指令：

```text
/gamemode creative
/give @p minecraft:command_block 64
/give @p minecraft:structure_block 64
/give @p minecraft:debug_stick
/give @p minecraft:barrier 64
/give @p minecraft:light_block 64
```

### 快速建房框架

先用石头围出框架，再掏空内部：

```text
/fill ~ ~ ~ ~10 ~10 ~10 minecraft:stone
/fill ~ ~1 ~ ~9 ~9 ~9 minecraft:air
```

### 清空周围怪物

清除半径 50 格内的所有怪物（安全施工/探索）：

```text
/kill @e[type=!minecraft:player,distance=..50]
```

### 创建保护区

防止怪物破坏地形和生成，适合建筑区域：

```text
/gamerule mobGriefing false
/gamerule doMobSpawning false
```

### 永久白天 + 好天气

适合建筑和探索：

```text
/time set day
/weather clear
/gamerule doDaylightCycle false
/gamerule doWeatherCycle false
```

### 自定义武器

给出一把带有自定义名和高级附魔的武器：

```text
/give @s minecraft:netherite_sword{
  display:{Name:'{"text":"屠龙刀","color":"red","bold":true}'},
  Enchantments:[{id:"minecraft:sharpness",lvl:10},{id:"minecraft:fire_aspect",lvl:3},{id:"minecraft:looting",lvl:5},{id:"minecraft:unbreaking",lvl:5}]
} 1
```

---

## 命令方块拓展

> 命令方块可以将指令自动化，是地图制作和服务器功能的核心组件。

### 命令方块类型

| 类型 | 外观 | 说明 |
|------|------|------|
| 脉冲（impulse） | 橙色 | 接收到红石信号时执行一次 |
| 连锁（chain） | 绿色 | 链中的下一个，需要上一个执行后才能触发 |
| 循环（repeating） | 紫色 | 每 tick 执行一次 |

### 获取命令方块

```text
/give @s minecraft:command_block
/give @s minecraft:chain_command_block
/give @s minecraft:repeating_command_block
```

### 命令方块常用技巧

1. **连锁执行**: 脉冲命令方块 → 连锁命令方块 → …，实现多步指令链
2. **循环检测**: 循环命令方块 + `redstone` 模式，持续检测条件
3. **条件制约**: 开启"条件制约"选项，只有前一个执行成功才执行
4. **保持开启**: 设为"保持开启"后无需红石信号持续工作

**示例**: 检测玩家血量并自动恢复

```text
# 循环命令方块（保持开启）
/execute as @a[gamemode=survival] if entity @s[nbt={Health:6}] run effect give @s regeneration 5 2
```

---

## 调试与实用工具

```text
# 调试棒（获取后右键点击方块调整属性）
/give @s minecraft:debug_stick

# 性能分析
/debug start                       # 开始性能分析
/debug stop                        # 停止并输出分析报告
/debug function                    # 分析函数性能

# 服务器信息
/tps                               # 查看服务器 TPS（需插件）
/memory                            # 查看内存占用
/gc                                # 垃圾回收（需插件）

# 延时执行
/schedule function <函数> <tick数>  # 延时执行函数
/schedule clear <函数>              # 取消延时
```

---

> **提示**: 本文档基于 Minecraft Java Edition 最新版本编写。使用 `/help <指令名>` 可在游戏中查看指令的详细用法和参数。
