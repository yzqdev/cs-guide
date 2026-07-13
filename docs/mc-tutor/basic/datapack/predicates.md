# 谓词与物品修饰器

[官方文档](https://minecraft.wiki/w/Predicate)

## 谓词基础

谓词（Predicate）是 Minecraft 1.15+ 引入的条件检测系统，返回 true/false。

## 常用谓词

### 随机概率

```json
// data/my_pack/predicates/chance.json
// 50% 概率为 true
{
    "condition": "minecraft:random_chance",
    "chance": 0.5
}
```

### 带抢夺等级的随机

```json
{
    "condition": "minecraft:random_chance_with_looting",
    "chance": 0.1,
    "looting_multiplier": 0.02
}
```

### 检测玩家属性

```json
// data/my_pack/predicates/sneaking.json
// 检测玩家是否潜行
{
    "condition": "minecraft:entity_properties",
    "entity": "this",
    "predicate": {
        "flags": {
            "is_sneaking": true
        }
    }
}
```

### 检测天气

```json
// data/my_pack/predicates/weather_check.json
{
    "condition": "minecraft:weather_check",
    "raining": true,
    "thundering": false
}
```

### 检测玩家经验

```json
{
    "condition": "minecraft:entity_scores",
    "entity": "this",
    "scores": {
        "kills": {
            "min": 10
        }
    }
}
```

### 检测物品

```json
// data/my_pack/predicates/holding_sword.json
{
    "condition": "minecraft:entity_properties",
    "entity": "this",
    "predicate": {
        "equipment": {
            "mainhand": {
                "items": [
                    "minecraft:diamond_sword",
                    "minecraft:netherite_sword"
                ]
            }
        }
    }
}
```

### 检测实体类型

```json
{
    "condition": "minecraft:entity_properties",
    "entity": "killer",
    "predicate": {
        "type": "minecraft:player"
    }
}
```

### 时间检测

```json
{
    "condition": "minecraft:time_check",
    "value": {
        "min": 13000,
        "max": 23000
    }
}
```

## 组合谓词

### AND（所有条件成立）

```json
// data/my_pack/predicates/night_and_sneaking.json
{
    "condition": "minecraft:all_of",
    "terms": [
        {
            "condition": "minecraft:time_check",
            "value": {
                "min": 13000,
                "max": 23000
            }
        },
        {
            "condition": "minecraft:entity_properties",
            "entity": "this",
            "predicate": {
                "flags": {
                    "is_sneaking": true
                }
            }
        }
    ]
}
```

### OR（任一条件成立）

```json
{
    "condition": "minecraft:any_of",
    "terms": [
        { "condition": "minecraft:random_chance", "chance": 0.1 },
        { "condition": "minecraft:weather_check", "thundering": true }
    ]
}
```

### NOT（取反）

```json
{
    "condition": "minecraft:inverted",
    "term": {
        "condition": "minecraft:entity_properties",
        "entity": "this",
        "predicate": {
            "flags": {
                "is_sneaking": true
            }
        }
    }
}
```

## 在战利品表中使用谓词

```json
// 实体掉落条件
"conditions": [
    {
        "condition": "minecraft:killed_by_player"
    },
    {
        "condition": "minecraft:random_chance_with_looting",
        "chance": 0.05,
        "looting_multiplier": 0.01
    }
]
```

## 物品修饰器

物品修饰器用于修改将要生成的物品。

### set_count — 设置数量

```json
{
    "function": "minecraft:set_count",
    "count": {
        "min": 1,
        "max": 3
    },
    "add": false
}
```

### set_damage — 设置耐久

```json
{
    "function": "minecraft:set_damage",
    "damage": {
        "min": 0.15,
        "max": 0.25
    }
}
```

### enchant_randomly — 随机附魔

```json
{
    "function": "minecraft:enchant_randomly",
    "treasure": true
}
```

### enchant_with_levels — 等级附魔

```json
{
    "function": "minecraft:enchant_with_levels",
    "levels": 30,
    "treasure": true
}
```

### 物品名称和 Lore

```json
{
    "function": "minecraft:set_name",
    "name": {
        "text": "§6§l传说之剑",
        "italic": false
    }
}
```

### 组合多个修饰

```json
{
    "function": "minecraft:set_name",
    "name": {
        "text": "§b§l冰霜之剑",
        "italic": false
    }
}
```

## 自定义物品修饰器文件

```json
// data/my_pack/item_modifiers/ruby_upgrade.json
[
    {
        "function": "minecraft:set_name",
        "name": {
            "text": "§6§l红宝石升级",
            "italic": false
        }
    },
    {
        "function": "minecraft:set_lore",
        "lore": [
            "§7由红宝石强化",
            "§a攻击力 +5"
        ]
    }
]
```

### 在命令中使用

```mcfunction
# 应用物品修饰器
give @p minecraft:diamond_sword 1
/item modify entity @p weapon.mainhand my_pack:ruby_upgrade
```

## 谓词在进度中的使用

```json
{
    "criteria": {
        "in_desert": {
            "trigger": "minecraft:location",
            "conditions": {
                "player": [
                    {
                        "condition": "minecraft:entity_properties",
                        "entity": "this",
                        "predicate": {
                            "location": {
                                "biome": "minecraft:desert"
                            }
                        }
                    }
                ]
            }
        }
    }
}
```

## 谓词在函数中的使用

```mcfunction
# 使用谓词执行命令
execute if predicate my_pack:sneaking run give @s diamond 1
execute if predicate my_pack:night_and_sneaking run give @s netherite_ingot 1

# 加载数据包后测试谓词
reload
execute if predicate my_pack:chance run say 50% 概率触发！
```
