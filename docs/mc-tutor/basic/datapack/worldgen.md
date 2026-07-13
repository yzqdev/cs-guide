# 数据包世界生成

[官方文档](https://minecraft.wiki/w/Data_pack#Worldgen)

## 自定义维度

### 维度类型

```json
// data/my_pack/dimension_type/ruby_world.json
{
    "ultrawarm": false,
    "natural": true,
    "piglin_safe": false,
    "respawn_anchor_works": false,
    "bed_works": true,
    "has_raids": false,
    "has_skylight": true,
    "has_ceiling": false,
    "coordinate_scale": 1,
    "ambient_light": 0.5,
    "fixed_time": 6000,
    "logical_height": 256,
    "effects": "minecraft:overworld",
    "infiniburn": "#minecraft:infiniburn_overworld",
    "min_y": 0,
    "height": 256,
    "monster_spawn_light_level": 7,
    "monster_spawn_block_light_limit": 1
}
```

### 维度文件

```json
// data/my_pack/dimension/ruby_world.json
{
    "type": "my_pack:ruby_world",
    "generator": {
        "type": "minecraft:noise",
        "settings": "minecraft:overworld",
        "biome_source": {
            "type": "minecraft:fixed",
            "biome": "minecraft:plains"
        },
        "seed": 0
    }
}
```

### 传送到自定义维度

```mcfunction
execute in my_pack:ruby_world run tp @p 0 64 0
```

## 自定义生物群系

### 生物群系定义

```json
// data/my_pack/worldgen/biome/crystal_plains.json
{
    "temperature": 0.8,
    "downfall": 0.4,
    "has_precipitation": true,
    "temperature_modifier": "none",
    "creature_spawn_probability": 0.5,
    "effects": {
        "sky_color": 8951807,
        "water_fog_color": 329011,
        "fog_color": 12638463,
        "water_color": 4159204,
        "grass_color": 8365931,
        "foliage_color": 8365931,
        "music": {
            "sound": "minecraft:music.game",
            "min_delay": 12000,
            "max_delay": 24000,
            "replace_current_music": false
        },
        "particle": {
            "options": {
                "type": "minecraft:end_rod"
            },
            "probability": 0.001
        }
    },
    "spawners": {
        "creature": [
            {
                "type": "minecraft:rabbit",
                "weight": 5,
                "minCount": 2,
                "maxCount": 5
            }
        ],
        "monster": [
            {
                "type": "minecraft:zombie",
                "weight": 10,
                "minCount": 1,
                "maxCount": 4
            }
        ]
    },
    "spawn_costs": {},
    "carvers": [
        "minecraft:cave",
        "minecraft:cave_extra_underground",
        "minecraft:canyon"
    ],
    "features": [
        [],
        ["minecraft:lake_lava_underground"],
        ["minecraft:amethyst_geode"],
        [],
        [],
        [],
        [
            "my_pack:ore_ruby",
            "minecraft:ore_dirt",
            "minecraft:ore_gravel",
            "minecraft:ore_granite_upper"
        ],
        [],
        [],
        ["minecraft:patch_grass_forest", "minecraft:flower_plains"]
    ]
}
```

## 矿石生成

### 配置特征（ConfiguredFeature）

```json
// data/my_pack/worldgen/configured_feature/ore_ruby.json
{
    "type": "minecraft:ore",
    "config": {
        "size": 8,
        "discard_chance_on_air_exposure": 0.0,
        "targets": [
            {
                "target": {
                    "predicate_type": "minecraft:tag_match",
                    "tag": "minecraft:stone_ore_replaceables"
                },
                "state": {
                    "Name": "my_pack:ruby_ore"
                }
            },
            {
                "target": {
                    "predicate_type": "minecraft:tag_match",
                    "tag": "minecraft:deepslate_ore_replaceables"
                },
                "state": {
                    "Name": "my_pack:deepslate_ruby_ore"
                }
            }
        ]
    }
}
```

### 放置特征（PlacedFeature）

```json
// data/my_pack/worldgen/placed_feature/ore_ruby.json
{
    "feature": "my_pack:ore_ruby",
    "placement": [
        {
            "type": "minecraft:count",
            "count": 10
        },
        {
            "type": "minecraft:in_square"
        },
        {
            "type": "minecraft:height_range",
            "height": {
                "type": "minecraft:uniform",
                "min_inclusive": {
                    "absolute": -64
                },
                "max_inclusive": {
                    "absolute": 40
                }
            }
        },
        {
            "type": "minecraft:biome"
        }
    ]
}
```

## 自定义结构

### 结构定义

```json
// data/my_pack/worldgen/structure/ruby_temple.json
{
    "type": "minecraft:jigsaw",
    "biomes": "#minecraft:is_overworld",
    "step": "surface_structures",
    "spawn_overrides": {},
    "terrain_adaptation": "beard_thin",
    "start_pool": "my_pack:ruby_temple/start_pool",
    "size": 7,
    "start_height": {
        "absolute": 0
    },
    "project_start_to_heightmap": "WORLD_SURFACE_WG",
    "max_distance_from_center": 80,
    "use_expansion_hack": false
}
```

### 结构池（Template Pools）

```json
// data/my_pack/structure/ruby_temple/start_pool.json
{
    "name": "my_pack:ruby_temple/start_pool",
    "fallback": "minecraft:empty",
    "elements": [
        {
            "weight": 1,
            "element": {
                "element_type": "minecraft:single_pool_element",
                "location": "my_pack:ruby_temple/main",
                "projection": "rigid",
                "processors": "minecraft:empty"
            }
        }
    ]
}
```

### 结构 NBT 文件

结构使用 `.nbt` 文件，通过结构方块或结构生成工具创建。

```text
结构文件路径：
data/my_pack/structure/ruby_temple/main.nbt
```

## 树木与植被

### 树木配置

```json
// data/my_pack/worldgen/configured_feature/crystal_tree.json
{
    "type": "minecraft:tree",
    "config": {
        "trunk": {
            "type": "minecraft:straight_trunk_placer",
            "base_height": 5,
            "height_rand_a": 3,
            "height_rand_b": 2
        },
        "leaves": {
            "type": "minecraft:blob_foliage_placer",
            "radius": 2,
            "offset": 1,
            "height": 3
        },
        "minimum_size": {
            "type": "minecraft:two_layers_feature_size",
            "limit": 1,
            "lower_size": 0,
            "upper_size": 1
        },
        "trunk_provider": {
            "type": "minecraft:simple_state_provider",
            "state": {
                "Name": "minecraft:amethyst_block"
            }
        },
        "leaves_provider": {
            "type": "minecraft:simple_state_provider",
            "state": {
                "Name": "minecraft:light_blue_stained_glass"
            }
        }
    }
}
```

### 树木放置

```json
// data/my_pack/worldgen/placed_feature/crystal_trees.json
{
    "feature": "my_pack:crystal_tree",
    "placement": [
        {
            "type": "minecraft:rarity_filter",
            "chance": 3
        },
        {
            "type": "minecraft:in_square"
        },
        {
            "type": "minecraft:surface_water_depth_filter",
            "max_water_depth": 0
        },
        {
            "type": "minecraft:heightmap",
            "heightmap": "MOTION_BLOCKING_NO_LEAVES"
        },
        {
            "type": "minecraft:biome"
        }
    ]
}
```

## 地质特征

### 晶洞

```json
// data/my_pack/worldgen/configured_feature/ruby_geode.json
{
    "type": "minecraft:geode",
    "config": {
        "blocks": {
            "filling_provider": {
                "type": "minecraft:simple_state_provider",
                "state": {
                    "Name": "minecraft:water"
                }
            },
            "inner_layer_provider": {
                "type": "minecraft:simple_state_provider",
                "state": {
                    "Name": "my_pack:ruby_block"
                }
            },
            "alternate_inner_layer_provider": {
                "type": "minecraft:simple_state_provider",
                "state": {
                    "Name": "minecraft:diamond_block"
                }
            },
            "middle_layer_provider": {
                "type": "minecraft:simple_state_provider",
                "state": {
                    "Name": "minecraft:calcite"
                }
            },
            "outer_layer_provider": {
                "type": "minecraft:simple_state_provider",
                "state": {
                    "Name": "minecraft:smooth_basalt"
                }
            }
        },
        "crack": {
            "generate_crack_chance": 0.95
        },
        "layers": {
            "filling": 1.7,
            "inner_layer": 2.5,
            "middle_layer": 3.2,
            "outer_layer": 4.5
        },
        "size": {
            "min_inclusive": 3,
            "max_inclusive": 7
        },
        "placement": {
            "prevent_close_to_surface": true
        },
        "crack_rate": 0.0,
        "noise_multiplier": 0.05,
        "use_potential_placements_chance": 0.35,
        "potential_replacements": [],
        "valid_blocks": ["minecraft:stone", "minecraft:deepslate"]
    }
}
```

## 湖泊与岩浆湖

```json
// data/my_pack/worldgen/configured_feature/ruby_lake.json
{
    "type": "minecraft:lake",
    "config": {
        "fluid": {
            "type": "minecraft:simple_state_provider",
            "state": {
                "Name": "minecraft:lava"
            }
        },
        "barrier": {
            "type": "minecraft:simple_state_provider",
            "state": {
                "Name": "minecraft:magma_block"
            }
        }
    }
}
```

## 生成条件控制

### 生物群系修改器

```json
// data/my_pack/worldgen/biome_modifier/add_ruby_ore.json
{
    "type": "minecraft:add_features_by_filter",
    "biome_source": {
        "type": "minecraft:biome_filter",
        "biomes": "#minecraft:is_overworld"
    },
    "features": "my_pack:ore_ruby",
    "step": "underground_ores"
}
```

### 添加结构

```json
// data/my_pack/worldgen/structure_set/ruby_temple.json
{
    "structures": [
        {
            "structure": "my_pack:ruby_temple",
            "weight": 1
        }
    ],
    "placement": {
        "type": "minecraft:random_spread",
        "salt": 123456,
        "separation": 8,
        "spacing": 32
    }
}
```

## 常用调试命令

```mcfunction
# 定位结构
/locate structure my_pack:ruby_temple

# 传送到维度
/execute in my_pack:ruby_world run tp ~ ~ ~

# 查看数据包内容
/datapack list

# 重载
/reload
```
