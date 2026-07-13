---
order: 3
---
# Minecraft 工具推荐

> 地图编辑、NBT 修改、常用指令速查——Minecraft 玩家和服主的实用工具合集。

---

## 资源包推荐

> 改变游戏的视觉风格，从高清材质到像素风格应有尽有。

| 资源包名称 | 特点 | 推荐指数 |
|-----------|------|---------|
| **Faithful** | 保持原版风格的高清材质包（32x / 64x / 128x） | ⭐⭐⭐⭐⭐ |
| **Depixel** | 像素风格的材质包，更具复古感 | ⭐⭐⭐⭐ |
| **XeKr 原版红石显示** | 红石线方向显示，红石玩家必备 | ⭐⭐⭐⭐ |
| **Bare Bones** | 极简风格，色彩鲜明 | ⭐⭐⭐⭐ |
| **Stay True** | 保留原版风格但纹理更细腻 | ⭐⭐⭐⭐⭐ |

---

## 地图编辑工具

> 查看、编辑、分析你的 Minecraft 世界文件。

### MCA Selector

- **功能**: 地图区块管理工具，支持查看、删除、导出 Minecraft 世界的区块
- **版本支持**: 全版本支持
- **运行要求**: Java 8+，需要安装 JavaFX
- **JavaFX 下载**: [GluonHQ](https://gluonhq.com/products/javafx/)

**启动命令**:
```shell
java --module-path <path to javafx>/lib --add-modules ALL-MODULE-PATH -jar mcaselector-1.16.3.jar
```

**主要用途**:
- 删除不需要的区块（重置已探索区域）
- 将特定区块复制到另一个世界
- 批量删除特定生物群系或高度范围的区块

### MCEdit

- **功能**: 经典地图编辑器，可视化操作
- **版本支持**: 1.12.2 及以下版本（高版本不兼容）
- **官网**: [MCEdit Unified](http://podshot.github.io/MCEdit-Unified/)

### Amulet MC

- **功能**: 新一代地图编辑器，支持多版本，界面现代
- **官网**: [amuletmc.com](https://www.amuletmc.com)

### NBT 编辑器

> NBT（Named Binary Tag）是 Minecraft 存储数据的主要格式，修改 NBT 可以自定义物品属性。

| 工具名称 | 描述 | 推荐 |
|---------|------|------|
| **NBT Studio** | NBTExplorer 的改进版，支持 Windows / macOS / Linux | ⭐⭐⭐⭐⭐ |
| **NBTExplorer** | 经典 NBT 查看和编辑工具 | ⭐⭐⭐ |

---

## 常用指令

### 物品给予指令

给玩家一个附魔钻石剑（锋利 X）：

```minecraft
/give @s minecraft:diamond_sword{Enchantments:[{id:"minecraft:sharpness",lvl:10}]} 1
```

给玩家一个自定义命名和描述的物品：

```minecraft
/give @s minecraft:diamond_sword{display:{Name:'{"text":"王者之剑","color":"gold"}',Lore:['{"text":"传说中的神剑","color":"gray"}']}} 1
```

**相关链接**:
- [Give 指令详解](https://minecraft.fandom.com/zh/wiki/%E5%91%BD%E4%BB%A4/give)
- [附魔指令](https://minecraft.fandom.com/zh/wiki/%E9%99%84%E9%AD%94)

### PowerTool 绑定指令

使用 `/powertool` 指令将命令绑定到物品上，手持该物品时点击即可执行：

```minecraft
/powertool msg
/powertool give @s diamond 1
```

### 生成自定义生物

生成一个骑着僵尸的马：

```minecraft
/summon horse ~ ~ ~ {Passengers:[{id:"minecraft:zombie"}]}
```

生成一个身穿全套钻石装备的僵尸：

```minecraft
/summon zombie ~ ~ ~ {equipment:{chest:{components:{"minecraft:enchantments":{"minecraft:protection":4}},count:1,id:"minecraft:diamond_chestplate"},feet:{components:{"minecraft:enchantments":{"minecraft:protection":4}},count:1,id:"minecraft:diamond_boots"},head:{components:{"minecraft:enchantments":{"minecraft:protection":4}},count:1,id:"minecraft:diamond_helmet"},legs:{components:{"minecraft:enchantments":{"minecraft:protection":4}},count:1,id:"minecraft:diamond_leggings"},mainhand:{components:{"minecraft:enchantments":{"minecraft:sharpness":5}},count:1,id:"minecraft:trident"}}}
```

---

## 药水效果代码对照表

> 用于 `/effect` 指令和命令方块中的药水效果 ID。

| 效果名称 | ID | 英文名称 |
|---------|----|---------|
| 速度 | 1 | speed |
| 缓慢 | 2 | slowness |
| 急迫 | 3 | haste |
| 挖掘疲劳 | 4 | mining_fatigue |
| 力量 | 5 | strength |
| 瞬间治疗 | 6 | instant_health |
| 瞬间伤害 | 7 | instant_damage |
| 跳跃提升 | 8 | jump_boost |
| 反胃 | 9 | nausea |
| 生命恢复 | 10 | regeneration |
| 抗性提升 | 11 | resistance |
| 防火 | 12 | fire_resistance |
| 水下呼吸 | 13 | water_breathing |
| 隐身 | 14 | invisibility |
| 失明 | 15 | blindness |
| 夜视 | 16 | night_vision |
| 饥饿 | 17 | hunger |
| 虚弱 | 18 | weakness |
| 中毒 | 19 | poison |
| 凋零 | 20 | wither |
| 生命提升 | 21 | health_boost |
| 伤害吸收 | 22 | absorption |
| 饱和 | 23 | saturation |
| 发光 | 24 | glowing |
| 飘浮 | 25 | levitation |
| 幸运 | 26 | luck |
| 霉运 | 27 | unluck |
| 缓降 | 28 | slow_falling |

**清除所有效果**:
```minecraft
/effect clear @s
```