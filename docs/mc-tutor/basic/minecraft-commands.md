# Minecraft 指令大全

[官方wiki](https://minecraft.fandom.com/zh/wiki/%E5%91%BD%E4%BB%A4)

## 基础指令

| 指令 | 说明 | 示例 |
|------|------|------|
| `/help` | 显示帮助 | `/help` |
| `/seed` | 显示世界种子 | `/seed` |
| `/list` | 显示在线玩家 | `/list` |
| `/kill` | 自杀 | `/kill @e[type=minecraft:creeper]` |
| `/me` | 发送动作消息 | `/me 在挖矿` |
| `/tell` | 私聊玩家 | `/tell 张三 你好` |

## 传送与位置

```text
/tp <目标>                         # 传送到目标
/tp <x> <y> <z>                   # 传送到坐标
/tp <玩家> <目标>                  # 传送玩家到目标

/spawnpoint                       # 设置出生点到当前位置
/spawnpoint <玩家>                 # 设置玩家出生点
/setworldspawn                    # 设置世界出生点

/warp <名称>                      # 传送到地标（需插件）
/home                            # 回家
```

## 时间与天气

```text
/time set <数值>                   # 设置时间
/time set day                     # 白天 (1000)
/time set night                   # 夜晚 (13000)
/time set 0                       # 黎明
/time add <tick>                  # 增加时间

/weather clear                    # 晴天
/weather rain                     # 雨天
/weather thunder                  # 雷暴
/weather rain 100                 # 下雨100秒
```

## 游戏模式

```text
/gamemode <模式>                   # 切换模式
/gamemode survival                 # 生存
/gamemode creative                 # 创造
/gamemode adventure                # 冒险
/gamemode spectator                # 旁观

# 简写
/gamemode 0                        # 生存
/gamemode 1                        # 创造
/gamemode 2                        # 冒险
/gamemode 3                        # 旁观
```

## 物品相关

```text
/give <玩家> <物品> [数量]         # 给予物品
/give @p diamond 1                # 给自己1个钻石
/give @a minecraft:iron_sword 1   # 给所有人铁剑

/clear <玩家> [物品] [数量]        # 清空物品
/enchant <玩家> <附魔ID> [等级]   # 附魔物品
/enchant @p sharpness 5           # 锋利V
```

## 游戏规则

```text
/gamerule <规则> <值>
/gamerule doDaylightCycle false    # 停止日夜交替
/gamerule doWeatherCycle false     # 停止天气变化
/gamerule keepInventory true       # 死亡不掉落
/gamerule mobGriefing false        # 防止怪物破坏地形
/gamerule doMobSpawning false      # 禁止怪物生成
/gamerule doFireTick false         # 禁止火焰蔓延
/gamerule showCoordinates true     # 显示坐标
/gamerule commandBlockOutput false # 关闭命令方块输出
/gamerule maxCommandChainLength 65535  # 命令链最大长度
```

## 实体操作

```text
/summon <实体> [坐标] [NBT]        # 生成实体
/summon creeper                    # 生成苦力怕
/summon minecraft:ender_dragon     # 生成末影龙
/summon minecraft:iron_golem ~ ~ ~ {NoAI:1} # 无AI铁傀儡

/kill @e[type=minecraft:creeper]   # 杀死所有苦力怕
/kill @e[type=!minecraft:player]   # 杀死所有非玩家实体
```

### 目标选择器

| 参数 | 说明 | 示例 |
|------|------|------|
| `@p` | 最近玩家 | `@p` |
| `@a` | 所有玩家 | `@a` |
| `@r` | 随机玩家 | `@r` |
| `@e` | 所有实体 | `@e[type=creeper]` |
| `@s` | 执行者自己 | `@s` |

### 选择器参数

```text
@e[type=zombie]                    # 所有僵尸
@e[type=zombie,limit=5]            # 前5个僵尸
@a[gamemode=creative]              # 创造模式玩家
@p[distance=..10]                  # 10格内的最近玩家
@e[type=item,distance=..5]         # 5格内的掉落物
@a[scores={score_name=10..}]       # 分数>=10的玩家
@e[name="Test"]                    # 名字为Test的实体
@e[tag=myTag]                      # 带有myTag标签的实体
```

## 方块操作

```text
/setblock <坐标> <方块>            # 放置单个方块
/setblock ~ ~1 ~ minecraft:stone   # 头上放石头

/fill <x1> <y1> <z1> <x2> <y2> <z2> <方块>   # 填充区域
/fill ~ ~ ~ ~5 ~5 ~5 stone         # 填充5x5x5石头
/fill ~ ~1 ~ ~10 ~10 ~10 air       # 清除10x10x10区域
/fill x1 y1 z1 x2 y2 z2 wool replace stone  # 替换方块

/clone <x1> <y1> <z1> <x2> <y2> <z2> <x> <y> <z>  # 复制区域
```

## 世界管理

```text
/save-all                          # 保存世界
/save-off                          # 关闭自动保存
/save-on                           # 开启自动保存

/setworldspawn                     # 设置世界出生点
/setworldspawn 100 64 200          # 设置到指定坐标

/difficulty <难度>                 # 设置难度
/difficulty peaceful               # 和平
/difficulty hard                   # 困难
```

## 数据包与函数

```text
/datapack enable <名称>            # 启用数据包
/datapack disable <名称>           # 禁用数据包
/datapack list                     # 列出数据包

/function <命名空间:函数>          # 执行函数
/function mypack:hello             # 执行函数
```

## NBT 数据操作

```text
/data get entity <目标>            # 获取实体数据
/data get block <坐标>             # 获取方块数据
/data merge entity <目标> <NBT>    # 合并数据
/data merge block <坐标> <NBT>     # 合并方块数据

# 示例
/data merge entity @e[type=minecraft:villager,limit=1] {CustomName:'"张三"'}
```

## 记分板

```text
/scoreboard objectives add <名称> <条件> [显示名]
/scoreboard objectives add kills totalKillCount 杀敌数
/scoreboard objectives setdisplay sidebar kills

/scoreboard players set <玩家> <目标> <数值>
/scoreboard players add @p kills 1
/scoreboard players reset <玩家> [目标]
```

## 常用指令组合

### 创造模式生存包

```text
/gamemode creative
/give @p minecraft:command_block 64
/give @p minecraft:structure_block 64
/give @p minecraft:debug_stick
```

### 快速建房框架

```text
/fill ~ ~ ~ ~10 ~10 ~10 minecraft:stone
/fill ~ ~1 ~ ~9 ~9 ~9 minecraft:air
```

### 清空周围怪物

```text
/kill @e[type=!minecraft:player,distance=..50]
```

### 保护区域

```text
/gamerule mobGriefing false
/gamerule doMobSpawning false
```
