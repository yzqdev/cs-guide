# 战利品表

[官方文档](https://minecraft.wiki/w/Loot_table)

## 战利品表基础

战利品表控制方块破坏、实体死亡、箱子生成时掉落什么物品。

## 方块战利品表

### 自掉类型

```json
// data/my_pack/loot_table/blocks/ruby_block.json
// 最简单的：破坏方块掉落自身
{
    "type": "minecraft:block",
    "pools": [
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:item",
                    "name": "my_pack:ruby_block"
                }
            ],
            "conditions": [
                {
                    "condition": "minecraft:survives_explosion"
                }
            ]
        }
    ]
}
```

### 矿石掉落（有时运）

```json
// data/my_pack/loot_table/blocks/ruby_ore.json
{
    "type": "minecraft:block",
    "pools": [
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:alternatives",
                    "children": [
                        {
                            "type": "minecraft:item",
                            "name": "my_pack:ruby_ore",
                            "conditions": [
                                {
                                    "condition": "minecraft:match_tool",
                                    "predicate": {
                                        "enchantments": [
                                            {
                                                "enchantment": "minecraft:silk_touch",
                                                "levels": {
                                                    "min": 1
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "type": "minecraft:item",
                            "name": "my_pack:ruby",
                            "functions": [
                                {
                                    "function": "minecraft:set_count",
                                    "count": {
                                        "min": 1,
                                        "max": 3
                                    }
                                },
                                {
                                    "function": "minecraft:apply_bonus",
                                    "enchantment": "minecraft:fortune",
                                    "formula": "minecraft:ore_drops"
                                },
                                {
                                    "function": "minecraft:explosion_decay"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```

### 多层掉落（精准采集 vs 普通）

```json
{
    "type": "minecraft:block",
    "pools": [
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:item",
                    "name": "minecraft:glass",
                    "conditions": [
                        {
                            "condition": "minecraft:match_tool",
                            "predicate": {
                                "enchantments": [
                                    {
                                        "enchantment": "minecraft:silk_touch",
                                        "levels": { "min": 1 }
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "type": "minecraft:item",
                    "name": "minecraft:diamond",
                    "conditions": [
                        {
                            "condition": "minecraft:inverted",
                            "term": {
                                "condition": "minecraft:match_tool",
                                "predicate": {
                                    "enchantments": [
                                        {
                                            "enchantment": "minecraft:silk_touch",
                                            "levels": { "min": 1 }
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
```

## 实体战利品表

### 自定义生物掉落

```json
// data/my_pack/loot_table/entities/ruby_golem.json
{
    "type": "minecraft:entity",
    "pools": [
        {
            "rolls": {
                "min": 1,
                "max": 3
            },
            "entries": [
                {
                    "type": "minecraft:item",
                    "name": "my_pack:ruby",
                    "weight": 5,
                    "functions": [
                        {
                            "function": "minecraft:set_count",
                            "count": {
                                "min": 1,
                                "max": 4
                            }
                        }
                    ]
                },
                {
                    "type": "minecraft:item",
                    "name": "minecraft:experience_bottle",
                    "weight": 2,
                    "functions": [
                        {
                            "function": "minecraft:set_count",
                            "count": {
                                "min": 0,
                                "max": 2
                            }
                        }
                    ]
                },
                {
                    "type": "minecraft:item",
                    "name": "my_pack:ruby_golem_spawn_egg",
                    "weight": 1
                }
            ]
        }
    ],
    "random_sequence": "my_pack:entities/ruby_golem"
}
```

### 玩家击杀额外掉落

```json
{
    "type": "minecraft:entity",
    "pools": [
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:item",
                    "name": "minecraft:player_head",
                    "functions": [
                        {
                            "function": "minecraft:set_player_head",
                            "entity": "this"
                        }
                    ],
                    "conditions": [
                        {
                            "condition": "minecraft:killed_by_player"
                        }
                    ]
                }
            ]
        }
    ]
}
```

## 箱子战利品表

### 自定义宝箱

```json
// data/my_pack/loot_table/chests/ruby_temple.json
{
    "type": "minecraft:chest",
    "pools": [
        {
            "rolls": {
                "min": 3,
                "max": 8
            },
            "entries": [
                {
                    "type": "minecraft:item",
                    "name": "my_pack:ruby",
                    "weight": 15,
                    "functions": [
                        {
                            "function": "minecraft:set_count",
                            "count": { "min": 2, "max": 6 }
                        }
                    ]
                },
                {
                    "type": "minecraft:item",
                    "name": "minecraft:diamond",
                    "weight": 8,
                    "functions": [
                        {
                            "function": "minecraft:set_count",
                            "count": { "min": 1, "max": 3 }
                        }
                    ]
                },
                {
                    "type": "minecraft:item",
                    "name": "minecraft:enchanted_golden_apple",
                    "weight": 2
                },
                {
                    "type": "minecraft:item",
                    "name": "my_pack:ruby_sword",
                    "weight": 5,
                    "functions": [
                        {
                            "function": "minecraft:enchant_with_levels",
                            "levels": { "min": 15, "max": 30 }
                        }
                    ]
                },
                {
                    "type": "minecraft:empty",
                    "weight": 10
                }
            ]
        }
    ],
    "random_sequence": "my_pack:chests/ruby_temple"
}
```

### 钓鱼战利品

```json
// data/my_pack/loot_table/gameplay/fishing.json
{
    "type": "minecraft:fishing",
    "pools": [
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:item",
                    "name": "my_pack:ruby",
                    "weight": 1,
                    "conditions": [
                        {
                            "condition": "minecraft:random_chance",
                            "chance": 0.05
                        }
                    ]
                }
            ]
        }
    ]
}
```

## 函数参考

### set_count — 设置数量

```json
{
    "function": "minecraft:set_count",
    "count": {
        "min": 1,
        "max": 5
    }
}
```

### enchant_with_levels — 附魔

```json
{
    "function": "minecraft:enchant_with_levels",
    "levels": 30,
    "options": {
        "treasure": true
    }
}
```

### set_nbt — 设置 NBT

```json
{
    "function": "minecraft:set_nbt",
    "tag": "{display:{Name:'{\"text\":\"§6传奇之剑\"}'},Enchantments:[{id:\"sharpness\",lvl:5}]}"
}
```

### set_damage — 设置耐久

```json
{
    "function": "minecraft:set_damage",
    "damage": {
        "min": 0.1,
        "max": 0.5
    }
}
```

### furnace_smelt — 熔炉烧炼(自动烹饪)

```json
{
    "function": "minecraft:furnace_smelt"
}
```

### 条件：killed_by_player

```json
{
    "condition": "minecraft:killed_by_player"
}
```

### 条件：random_chance

```json
{
    "condition": "minecraft:random_chance",
    "chance": 0.3
}
```

### 条件：random_chance_with_looting

```json
{
    "condition": "minecraft:random_chance_with_looting",
    "chance": 0.1,
    "looting_multiplier": 0.02
}
```

## 覆盖原版战利品表

```json
// data/minecraft/loot_table/blocks/coal_ore.json
// 这会覆盖原版煤矿掉落
{
    "type": "minecraft:block",
    "pools": [
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:item",
                    "name": "minecraft:diamond"
                }
            ]
        }
    ]
}
```
