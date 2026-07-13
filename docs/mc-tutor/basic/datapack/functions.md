# 函数与命令

[官方文档](https://minecraft.wiki/w/Function)

## 什么是函数

函数（`.mcfunction` 文件）是一组按顺序执行的 Minecraft 命令。

## 基本函数

### 创建函数文件

```mcfunction
# data/my_pack/functions/hello.mcfunction
say 你好，世界！
give @p diamond 1
effect give @p speed 30 1
```

### 执行函数

```text
/function my_pack:hello
```

## 函数中的命令

### 常用命令

```mcfunction
# 消息与提示
say §6公告消息                    # 全体消息
tell @p §a你好！                   # 私聊
title @a title §6公告             # 标题显示
title @a subtitle §7副标题        # 副标题
title @a actionbar §e状态栏消息   # 状态栏

# 给予与清除
give @p diamond 16
give @p minecraft:diamond_sword{display:{Name:'{"text":"传说之剑"}'}} 1
clear @p minecraft:dirt            # 清除泥土

# 效果
effect give @p speed 60 2         # 60秒速度II
effect give @p minecraft:strength 30 1
effect clear @p                   # 清除所有效果

# 传送与生成
tp @p 100 64 200
spawnpoint @p 100 64 200
setworldspawn 100 64 200

# 时间与天气
time set day
weather clear

# 游戏模式
gamemode creative @p
```

### 目标选择器

```mcfunction
# 选择器参数
@p                              # 最近玩家
@r                              # 随机玩家
@a                              # 所有玩家
@e                              # 所有实体
@s                              # 命令执行者

# 过滤器
@a[distance=..10]              # 10格内的玩家
@a[gamemode=creative]           # 创造模式玩家
@e[type=minecraft:creeper]      # 所有苦力怕
@e[type=!minecraft:player]      # 非玩家实体
@a[scores={kills=10..}]        # 击杀数≥10的玩家
@a[tag=admin]                   # 带有 admin 标签的玩家
@p[x=100,y=64,z=200,distance=..50]  # 坐标附近最近玩家
```

## 条件执行

### if/unless

```mcfunction
# 条件执行：检测玩家是否有钻石
execute if entity @p[nbt={Inventory:[{id:"minecraft:diamond"}]}] run say §a你有钻石！

# 条件执行：检测方块
execute if block 100 64 200 minecraft:diamond_block run say §a方块是钻石块！

# 条件执行：检测生物群系
execute if biome 100 64 200 minecraft:plains run say §a你在平原！

# unless = if 取反
execute unless entity @p[nbt={Inventory:[{id:"minecraft:diamond"}]}] run say §c你没有钻石！
```

## 常用 execute 语法

```mcfunction
# 作为实体执行
execute as @a at @s run say 每个玩家说这句话

# 在实体位置执行
execute at @e[type=sheep] run setblock ~ ~1 ~ torch

# 偏移执行
execute positioned 100 64 200 run setblock ~ ~ ~ diamond_block

# 定向执行
execute as @p at @s anchored eyes run setblock ^ ^ ^1 stone

# 链式执行
execute as @a at @s if block ~ ~-1 ~ diamond_block run give @s diamond

# 带有条件链
execute as @a at @s if entity @s[gamemode=survival] run gamemode creative @s

# 对指定实体运行
execute as @e[type=minecraft:zombie] at @s run tp @s ~ ~10 ~
```

## 变量与记分板

### 创建记分板

```mcfunction
# 创建记分板目标
scoreboard objectives add kills minecraft:player_kill_count §e击杀数
scoreboard objectives add money dummy §6金币
scoreboard objectives add timer dummy §b计时器

# 显示记分板
scoreboard objectives setdisplay sidebar kills    # 右侧显示
scoreboard objectives setdisplay list money        # 列表显示
scoreboard objectives setdisplay belowName money   # 名字下方显示
```

### 操作记分板

```mcfunction
# 设置分数
scoreboard players set @p kills 0             # 设置固定值
scoreboard players add @p kills 1             # 增加
scoreboard players remove @p kills 1           # 减少
scoreboard players reset @p kills              # 重置

# 重置所有玩家
scoreboard players reset * kills

# 复制分数
scoreboard players operation @p kills = @s kills

# 分数比较
execute if score @p kills > @s kills run say 你的击杀数更高
execute unless score @p kills >= 10 run say 击杀数不足
```

## 常用函数模板

### 每日奖励

```mcfunction
# data/my_pack/functions/daily_reward.mcfunction
# 每日首次登录奖励
scoreboard players add @p reward_time 1
execute if score @p reward_time = @s reward_time_limit run give @p diamond 1
execute if score @p reward_time = @s reward_time_limit run say §a你获得了每日奖励！
```

### 随机传送

```mcfunction
# data/my_pack/functions/random_tp.mcfunction
# 随机传送玩家到 500 格内
# 需要配合谓词使用
spreadplayers ~ ~ 1000 5000 false @p
say §a你被随机传送了！
```

### 清理掉落物

```mcfunction
# data/my_pack/functions/clear_items.mcfunction
# 清理地面上的掉落物
kill @e[type=minecraft:item]
say §e已清理掉落物
```

### 延时执行

```mcfunction
# 使用 schedule 命令延时
schedule function my_pack:delayed_task 5s

# data/my_pack/functions/delayed_task.mcfunction
say §a5 秒后执行的消息
```

## tick.json 与 load.json

### 每 tick 执行

```json
// data/minecraft/tags/functions/tick.json
{
    "values": [
        "my_pack:tick_handler"
    ]
}
```

```mcfunction
# data/my_pack/functions/tick_handler.mcfunction
# 每 tick（1/20 秒）执行一次
execute as @a at @s run effect give @s speed 2 0 true
```

### 加载时执行

```json
// data/minecraft/tags/functions/load.json
{
    "values": [
        "my_pack:on_load"
    ]
}
```

```mcfunction
# data/my_pack/functions/on_load.mcfunction
say §a数据包已加载！
scoreboard objectives add timer dummy
```

## 调试技巧

```text
/gamerule logAdminCommands true  # 记录命令执行
/gamerule sendCommandFeedback true  # 显示命令反馈
/reload                          # 重载所有数据包

# 测试函数时建议
1. 先在聊天栏测试单条命令
2. 确认无误后再写进 .mcfunction
3. 使用 say 输出调试信息
4. 需要注意 JSON 格式的正确性
```
