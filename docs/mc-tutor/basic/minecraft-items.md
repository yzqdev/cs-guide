# Minecraft 物品与合成

## 工具等级

| 材质 | 对应 ID | 耐久度 | 挖掘速度 | 攻击伤害 | 获取方式 |
|------|---------|--------|----------|----------|----------|
| 木头 | `wooden` | 59 | 2 | 4 | 木板 (oak_planks) |
| 石头 | `stone` | 131 | 4 | 5 | 圆石 (cobblestone) |
| 铁 | `iron` | 250 | 6 | 6 | 铁锭 (iron_ingot) |
| 钻石 | `diamond` | 1561 | 8 | 7 | 钻石 (diamond) |
| 下界合金 | `netherite` | 2031 | 9 | 8 | 下界合金锭 (netherite_ingot) |
| 金 | `golden` | 32 | 12 | 4 | 金锭 (gold_ingot) |

## 核心工具合成

### 基础工具

| 工具 | ID | 合成配方 |
|------|----|---------|
| 木镐 | `wooden_pickaxe` | 3 木板 + 2 木棍 |
| 木斧 | `wooden_axe` | 3 木板 + 2 木棍 |
| 木剑 | `wooden_sword` | 2 木板 + 1 木棍 |
| 木锹 | `wooden_shovel` | 1 木板 + 2 木棍 |
| 木锄 | `wooden_hoe` | 2 木板 + 2 木棍 |
| 石镐 | `stone_pickaxe` | 3 圆石 + 2 木棍 |
| 石斧 | `stone_axe` | 3 圆石 + 2 木棍 |
| 石剑 | `stone_sword` | 2 圆石 + 1 木棍 |
| 石锹 | `stone_shovel` | 1 圆石 + 2 木棍 |
| 石锄 | `stone_hoe` | 2 圆石 + 2 木棍 |
| 铁镐 | `iron_pickaxe` | 3 铁锭 + 2 木棍 |
| 铁斧 | `iron_axe` | 3 铁锭 + 2 木棍 |
| 铁剑 | `iron_sword` | 2 铁锭 + 1 木棍 |
| 铁锹 | `iron_shovel` | 1 铁锭 + 2 木棍 |
| 铁锄 | `iron_hoe` | 2 铁锭 + 2 木棍 |
| 钻石镐 | `diamond_pickaxe` | 3 钻石 + 2 木棍 |
| 钻石剑 | `diamond_sword` | 2 钻石 + 1 木棍 |
| 金镐 | `golden_pickaxe` | 3 金锭 + 2 木棍 |

### 下界合金升级

```text
钻石工具 + 下界合金锭 (netherite_ingot) → 下界合金工具 (netherite_xxx)
通过锻造台 (smithing_table) 升级，需要锻造模板 (netherite_upgrade_smithing_template)
```

## 基础物品合成

| 物品 | ID | 合成 | 用途 |
|------|----|------|------|
| 工作台 | `crafting_table` | 4个木板 | 3×3 合成 |
| 熔炉 | `furnace` | 8个圆石 | 烧炼 |
| 箱子 | `chest` | 8个木板 | 存储 |
| 床 | `red_bed` | 3木板+3羊毛 | 设置重生点 |
| 火把 | `torch` | 1木棍+1煤炭 | 照明 |
| 梯子 | `ladder` | 7个木棍 | 垂直移动 |
| 橡木门 | `oak_door` | 6个木板 | 阻挡怪物 |
| 栅栏 | `oak_fence` | 4木棍+2木板 | 围栏 |
| 船 | `oak_boat` | 5个木板 | 水上移动 |
| 桶 | `bucket` | 3铁锭 | 装水/岩浆/鱼 |
| 指南针 | `compass` | 4铁锭+1红石 | 指向出生点 |
| 时钟 | `clock` | 4金锭+1红石 | 显示时间 |
| 钓鱼竿 | `fishing_rod` | 3木棍+2线 | 钓鱼 |
| 打火石 | `flint_and_steel` | 1铁锭+1燧石 | 点火/激活下界门 |

## 装备合成

```text
头盔 (helmet)：  胸甲 (chestplate)：  护腿 (leggings)：  靴子 (boots)：
III               I I                 III                 I I
I I               III                 I I                 I I
                  I I                 I
材质前缀：leather_ / iron_ / diamond_ / netherite_ / golden_
例：钻石胸甲 = diamond_chestplate
```

| 装备 | ID 后缀 | 铁甲防护 | 钻石甲防护 | 下界合金甲防护 |
|------|---------|----------|------------|----------------|
| 头盔 | `_helmet` | 2 | 3 | 3 |
| 胸甲 | `_chestplate` | 6 | 8 | 8 |
| 护腿 | `_leggings` | 5 | 6 | 6 |
| 靴子 | `_boots` | 2 | 3 | 3 |
| **总计** | — | **15** | **20** | **20** |

## 食物

| 食物 | ID | 饱食度 | 饱和度 | 获取方式 |
|------|----|--------|--------|----------|
| 牛排 | `cooked_beef` | 8 | 12.8 | 牛→生牛肉(beef)→烹饪 |
| 猪排 | `cooked_porkchop` | 8 | 12.8 | 猪→生猪排(porkchop)→烹饪 |
| 熟鸡肉 | `cooked_chicken` | 6 | 7.2 | 鸡→生鸡肉(chicken)→烹饪 |
| 面包 | `bread` | 5 | 6 | 3小麦(wheat)合成 |
| 胡萝卜 | `carrot` | 3 | 4.8 | 种植/僵尸掉落 |
| 马铃薯 | `potato` | 5 | 7.2 | 种植→烤马铃薯(baked_potato) |
| 金胡萝卜 | `golden_carrot` | 6 | 14.4 | 8金粒+胡萝卜（最佳食物） |
| 附魔金苹果 | `enchanted_golden_apple` | 4 | 9.6 | 8金块+苹果(apple)（极其稀有） |

## 重要方块合成

```text
熔炉 (furnace)：  漏斗 (hopper)：  活塞 (piston)：     发射器 (dispenser)：
CCC                III              WWW                 CCC
C C                I I              CIC                 C C
CCC                I I              WRW                 CRC
C=圆石(cobblestone)  I=铁锭(iron_ingot)  W=木板(oak_planks)  R=红石(redstone)

附魔台 (enchanting_table)：  铁砧 (anvil)：              酿造台 (brewing_stand)：
B B                           III                         BLB
DCD                          II I                         CBC
DCD                          III
B=书(book)  D=钻石(diamond)  C=黑曜石(obsidian)  I=铁块(iron_block)  L=烈焰棒(blaze_rod)
```

## 矿物块与制品

```text
矿物块合成：9个矿物 → 1个块（压缩存储）
块分解：1个块 → 9个矿物

铁块 (iron_block)          ← 9铁锭(iron_ingot)      钻石块 (diamond_block)  ← 9钻石(diamond)
金块 (gold_block)          ← 9金锭(gold_ingot)       绿宝石块 (emerald_block) ← 9绿宝石(emerald)
下界合金块 (netherite_block) ← 9下界合金锭(netherite_ingot)
```

## 染料

```text
16种染料由基础材料合成：
- 玫瑰红 → 红色 (red_dye)    | 仙人掌绿 → 绿色 (green_dye)
- 青金石 → 蓝色 (blue_dye)   | 骨粉 → 白色 (white_dye)
- 可可豆 → 棕色 (brown_dye)  | 墨囊 → 黑色 (black_dye)
- 蒲公英黄 → 黄色 (yellow_dye) | 紫绶 → 紫色 (purple_dye)
```

## 实用技巧

```text
1. 快速砍树：砍掉最下方的原木后，按住左键向上看
2. 精准采集附魔镐可获取完整矿物块
3. 时运附魔镐增加矿物掉落数量
4. 用脚手架（6竹竿）方便高空建筑
5. 水下用门/栅栏门创造呼吸空间
6. 用楼梯代替台阶，节省材料
7. 铁砧可以修复工具和合并附魔
```
