---
order: 3
---
# Minecraft 工具推荐

## 资源包推荐

| 资源包名称 | 特点 |
|-----------|------|
| **Faithful** | 保持原版风格的高清材质包 |
| **Depixel** | 像素风格的材质包 |

## 地图编辑工具

### MCA Selector
- **功能**: 地图区块管理工具，支持查看和编辑 Minecraft 世界
- **版本支持**: 全版本支持
- **运行要求**: Java 8+ 需要安装 JavaFX
- **JavaFX 下载**: [GluonHQ](https://gluonhq.com/products/javafx/)

**启动命令**:
```shell
java --module-path <path to javafx>/lib --add-modules ALL-MODULE-PATH -jar mcaselector-1.16.3.jar
```

### MCEdit
- **功能**: 经典地图编辑器
- **版本支持**: 1.12.2 及以下版本
- **官网**: [MCEdit Unified](http://podshot.github.io/MCEdit-Unified/)

### Amulet MC
- **功能**: 新一代地图编辑器，支持多版本
- **官网**: [amuletmc.com](https://www.amuletmc.com)

### NBT 编辑器

| 工具名称 | 描述 |
|---------|------|
| **NBT Studio** | NBTExplorer 的改进版 |
| **NBTExplorer** | 查看和编辑 NBT 数据 |

## 常用指令

### 物品给予指令
```minecraft
/give @s minecraft:diamond_sword{Enchantments:[{id:"minecraft:sharpness",lvl:10}]} 1
```

**相关链接**:
- [Give 指令详解](https://minecraft.fandom.com/zh/wiki/%E5%91%BD%E4%BB%A4/give)
- [附魔指令](https://minecraft.fandom.com/zh/wiki/%E9%99%84%E9%AD%94)

### PowerTool 绑定指令
使用 `/powertool` 指令将命令绑定到物品：
```minecraft
/powertool msg
```

## 药水效果代码对照表

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
