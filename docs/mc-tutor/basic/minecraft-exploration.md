# Minecraft 探索与结构

## 主世界结构

### 村庄 (village)

```text
生物群系：平原(plains)、沙漠(desert)、热带草原(savanna)、针叶林(taiga)、雪原(snowy_plains)

村民类型(villager)：随村庄群系变化
资源：食物、绿宝石(emerald)交易、床(red_bed)、箱子(chest)

防御：铁傀儡(iron_golem)保护
```

### 废弃矿井 (mineshaft)

```text
生成：地下任意位置
特征：木制支撑柱、铁轨(rail)、矿车(minecart)
危险：洞穴蜘蛛刷怪笼 (cave_spider spawner)
资源：铁轨、红石(redstone)、矿物
```

### 要塞 (stronghold)

```text
生成：地下随机分布
特征：石砖结构、有传送门房间
资源：末地传送门(end_portal)、箱子、图书馆
定位：用末影之眼(eye_of_ender)
```

### 林地府邸 (mansion)

```text
生成：黑森林(roofed_forest/dark_forest)
特征：大型木石建筑
生物：卫道士(vindicator)、唤魔者(evoker)
资源：不死图腾(totem_of_undying)、钻石(diamond)、金苹果(golden_apple)
```

### 海底遗迹 (monument)

```text
生成：深海生物群系
守卫者(guardian)生成
资源：海绵(sponge)、海晶石(prismarine)、金块(gold_block)
```

### 沙漠神殿 (desert_pyramid)

```text
生成：沙漠(desert)
特征：金字塔形
机关：蓝色陶瓦（压力板(stone_pressure_plate)+TNT）
资源：钻石、铁、绿宝石
```

### 丛林神庙 (jungle_pyramid)

```text
生成：丛林(jungle)
特征：机关解锁
资源：弓箭、骨头(bone)、红石
```

### 掠夺者前哨站 (pillager_outpost)

```text
生成：任何可生成村庄的群系
特征：瞭望塔
生物：掠夺者(pillager)、掠食兽(ravager)
资源：箱子、不祥旗帜(ominous_banner)
```

### 沼泽小屋 (swamp_hut)

```text
生成：沼泽(swamp)
生物：女巫(witch)
资源：药水、红石、蜘蛛网(cobweb)
```

### 沉船 (shipwreck)

```text
生成：海洋
资源：藏宝图、食物、铁
引导：使用藏宝图找到埋藏的宝藏(buried_treasure)
```

## 下界结构

### 下界要塞 (fortress)

```text
生成：下界
特征：大型黑石/砖结构
生物：烈焰人(blaze)、凋零骷髅(wither_skeleton)
资源：地狱疣(nether_wart)、烈焰棒(blaze_rod)、骷髅头(wither_skeleton_skull)
```

### 堡垒遗迹 (bastion_remnant)

```text
生成：下界
特征：猪灵城堡
生物：猪灵(piglin)、猪灵蛮兵(piglin_brute)、疣猪兽(hoglin)
资源：金块(gold_block)、下界合金装备
```

### 堡垒遗迹（猪灵）

```text
四种类型：桥(bridge)、疣猪兽棚(hoglin_stable)、居住区(housing)、藏宝室(treasure)
宝藏室：下界合金装备、钻石
```

### 废弃传送门 (ruined_portal)

```text
生成：主世界和下界
资源：燧石(flint)、金块、打火石(flint_and_steel)
```

## 末地结构

### 末地主岛 (the_end)

```text
末影龙(end_dragon)战斗
黑曜石(obsidian)柱（治疗水晶(end_crystal)）
返回传送门(end_gateway)
```

### 末地城 (end_city)

```text
生成：末地外岛
资源：鞘翅(elytra)、潜影壳(shulker_shell)
```

### 末地船 (end_ship)

```text
生成：末地城附近
资源：鞘翅（物品框内）、龙头(dragon_head)、钻石
```

## 探索技巧

### 生存工具包

```text
探索必备品：
✅ 满附魔钻石/下界合金装备 (diamond/netherite)
✅ 足够的食物（金胡萝卜 golden_carrot 最佳）
✅ 火把 (torch)（或夜视药水）
✅ 床 (bed)（设置重生点）
✅ 末影珍珠 (ender_pearl)（逃离危险）
✅ 水桶 (water_bucket)（高空救急/跨岩浆）
✅ 盾牌 (shield)（格挡箭矢）
✅ 弓(bow)+箭(arrow)（远程攻击）
✅ 工作台(crafting_table)+合成材料（应急）
✅ 指南针(compass)/地图(map)（不迷路）
✅ 命名牌(name_tag)（标记坐标）
```

### 定位方法

```text
定位结构指令：
/locate structure minecraft:village
/locate structure minecraft:fortress
/locate biome minecraft:plains
/locate structure #village

1.21+ 版本：
/ locate structure 后跟结构类型
探险家地图：与制图师村民交易
```

### 常见陷阱

```text
1. 不要在陌生矿道跑（小心悬崖）
2. 不要在高处直接跳（水桶救急）
3. 不要在地狱使用床（会爆炸）
4. 不要直视末影人
5. 不要靠近苦力怕（盾牌格挡）
6. 不要在水里穿钻石靴（沉底）
```

### 资源收集优先级

```text
第一天：
木材 > 食物 > 庇护所 > 床

前期：
铁 > 煤炭 > 食物 > 更多木材

中期：
钻石 > 下界合金 > 附魔材料

后期：
鞘翅 > 潜影壳 > 龙头（装饰）
```

## 生物群系分布速查

| 温度 | 群系 | 特征 |
|------|------|------|
| ❄️ 雪原 | 雪原、冰刺平原 | 雪、冰、北极熊 |
| 🌲 寒冷 | 针叶林、巨型针叶林 | 云杉、狼、狐狸 |
| 🌿 温带 | 森林、白桦林 | 橡树、花、兔子 |
| 🌾 干燥 | 平原、向日葵平原 | 开阔、马、村庄 |
| 🏜️ 炎热 | 沙漠、恶地 | 仙人掌、金矿 |
| 🌴 潮湿 | 丛林、沼泽 | 大型树木、女巫 |
| 🌊 水域 | 海洋、深海 | 海底遗迹 |
| 🏔️ 高山 | 尖峭山峰、雪林 | 山羊、大量矿 |
