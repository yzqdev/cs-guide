# 进度系统

[官方文档](https://minecraft.wiki/w/Advancement)

## 进度基础

进度系统可以追踪玩家行为，触发奖励，显示自定义提示。

### 进度 JSON 格式

```json
// data/my_pack/advancements/first_diamond.json
{
    "display": {
        "title": "获得钻石！",
        "description": "第一次获得钻石",
        "icon": {
            "item": "minecraft:diamond"
        },
        "frame": "task",
        "show_toast": true,
        "announce_to_chat": true,
        "hidden": false,
        "background": "minecraft:textures/block/stone.png"
    },
    "criteria": {
        "get_diamond": {
            "trigger": "minecraft:inventory_changed",
            "conditions": {
                "items": [
                    {
                        "items": [
                            "minecraft:diamond"
                        ]
                    }
                ]
            }
        }
    },
    "rewards": {
        "experience": 100,
        "loot": [
            "minecraft:chests/spawn_bonus_chest"
        ]
    }
}
```

## 进度显示选项

### frame 类型

```json
// frame 取值：
"frame": "task"        // 任务（方形，棕褐色）
"frame": "goal"        // 目标（星形，蓝色）
"frame": "challenge"   // 挑战（多边形，紫色）

// 隐式显示
"hidden": true   // 达成前不可见
```

## 触发器类型

### 常用触发器

```json
// inventory_changed — 背包变化
"trigger": "minecraft:inventory_changed",
"conditions": {
    "items": [
        {
            "items": ["minecraft:diamond"],
            "count": 10
        }
    ]
}

// minecraft:impossible — 只能通过命令达成
"trigger": "minecraft:impossible"

// bred_animals — 繁殖动物
"trigger": "minecraft:bred_animals",
"conditions": {
    "parent": {
        "type": "minecraft:horse"
    },
    "partner": {
        "type": "minecraft:horse"
    }
}

// killed_by_crossbow — 弩击杀
"trigger": "minecraft:killed_by_crossbow"

// player_killed_entity — 击杀生物
"trigger": "minecraft:player_killed_entity",
"conditions": {
    "entity": {
        "type": "minecraft:ender_dragon"
    }
}

// location — 到达位置
"trigger": "minecraft:location",
"conditions": {
    "player": {
        "biome": "minecraft:plains",
        "dimension": "minecraft:overworld"
    }
}

// tick — 每 tick 检测
"trigger": "minecraft:tick"

// used_item — 使用物品
"trigger": "minecraft:used_item",
"conditions": {
    "item": {
        "items": ["minecraft:ender_pearl"]
    }
}

// construct_beacon — 建造信标
"trigger": "minecraft:construct_beacon",
"conditions": {
    "level": 4
}

// consume_item — 吃东西
"trigger": "minecraft:consume_item",
"conditions": {
    "item": {
        "items": ["minecraft:golden_apple"]
    }
}

// effects_changed — 获得效果
"trigger": "minecraft:effects_changed",
"conditions": {
    "effects": {
        "minecraft:regeneration": {}
    }
}
```

### 多条件触发器

```json
{
    "criteria": {
        "has_diamond_sword": {
            "trigger": "minecraft:inventory_changed",
            "conditions": {
                "items": [
                    {
                        "items": ["minecraft:diamond_sword"]
                    }
                ]
            }
        },
        "has_diamond_pickaxe": {
            "trigger": "minecraft:inventory_changed",
            "conditions": {
                "items": [
                    {
                        "items": ["minecraft:diamond_pickaxe"]
                    }
                ]
            }
        }
    },
    "requirements": [
        ["has_diamond_sword", "has_diamond_pickaxe"]
    ]
}
```

## 进度树结构

### 父子进度

```json
// data/my_pack/advancements/root.json
{
    "display": {
        "title": "我的数据包",
        "description": "开始冒险",
        "icon": { "item": "minecraft:book" },
        "frame": "task",
        "background": "minecraft:textures/block/stone.png",
        "show_toast": false,
        "announce_to_chat": false
    },
    "criteria": {
        "tick": {
            "trigger": "minecraft:tick"
        }
    }
}

// data/my_pack/advancements/first_diamond.json
{
    "display": {
        "title": "闪闪发光",
        "description": "获得钻石",
        "icon": { "item": "minecraft:diamond" },
        "frame": "goal",
        "show_toast": true,
        "announce_to_chat": true
    },
    "parent": "my_pack:root",
    "criteria": {
        "get_diamond": {
            "trigger": "minecraft:inventory_changed",
            "conditions": {
                "items": [
                    { "items": ["minecraft:diamond"] }
                ]
            }
        }
    }
}
```

## 奖励系统

### 多种奖励

```json
{
    "rewards": {
        "experience": 500,
        "loot": [
            "minecraft:chests/end_city_treasure",
            "my_pack:reward_items"
        ],
        "recipes": [
            "minecraft:diamond_sword",
            "my_pack:custom_sword"
        ],
        "function": "my_pack:advancement_reward"
    }
}
```

## 命令触发器

### 使用命令授予/撤销进度

```mcfunction
# 授予进度
advancement grant @p only my_pack:root
advancement grant @p everything from my_pack:root
advancement grant @a everything      # 授予所有

# 撤销进度
advancement revoke @p only my_pack:first_diamond
advancement revoke @p everything from my_pack:root

# 检测进度
execute if entity @p[advancements={my_pack:first_diamond=true}] run give @p diamond 16
```

## 进度奖励函数

```mcfunction
# data/my_pack/functions/advancement_reward.mcfunction
# 达成进度时触发的奖励
give @p diamond 5
give @p experience_bottle 3
say §a恭喜达成进度！
effect give @p regeneration 30 1
```

## 完成示例：全成就挑战

```json
{
    "display": {
        "title": "§6钻石大师",
        "description": "§e收集 100 颗钻石",
        "icon": { "item": "minecraft:diamond_block" },
        "frame": "challenge",
        "show_toast": true,
        "announce_to_chat": true,
        "hidden": false
    },
    "parent": "my_pack:first_diamond",
    "criteria": {
        "collect_diamonds": {
            "trigger": "minecraft:inventory_changed",
            "conditions": {
                "items": [
                    {
                        "items": ["minecraft:diamond"],
                        "count": 100
                    }
                ]
            }
        }
    },
    "rewards": {
        "experience": 1000,
        "function": "my_pack:diamond_master_reward"
    }
}
```
