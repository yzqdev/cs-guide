---
order: 3
---
# mc工具
## mc使用java推荐

https://zh.minecraft.wiki/w/Tutorial:%E6%9B%B4%E6%96%B0Java#%E9%80%89%E6%8B%A9Java%E5%8F%91%E8%A1%8C%E7%89%88
## 资源包

faithful
depixel

## 实用的小工具

### 如何在java8以上版本使用javafx?

1.12.2及以下版本用mcedit，全版本请用mcaselector

fx下载地址 [https://gluonhq.com/products/javafx/](https://gluonhq.com/products/javafx/)

Open the command prompt and run `java --module-path <path to unzipped folder>/lib --add-modules ALL-MODULE-PATH -jar <path to mcaselector-1.16.3.jar>` where you replace everything in `<>`with the appropriate paths.


### mcedit

[http://podshot.github.io/MCEdit-Unified/](http://podshot.github.io/MCEdit-Unified/)

### amuletmc

- [amuletmc](https://www.amuletmc.com)
- [nbt-studio](https://github.com/tryashtar/nbt-studio)(是NBTExplore的改进版,
- [NBTExplorer](https://github.com/jaquadro/NBTExplorer)

mcaselector 运行的话java8以上需要javafx(下载javafx)

```shell
 java --module-path D:\javafx-sdk-17.0.0.1/lib --add-modules ALL-MODULE-PATH -jar  .\mcaselector-1.16.3.jar

```

## 指令

[give指令](https://minecraft.fandom.com/zh/wiki/%E5%91%BD%E4%BB%A4/give)

```txt
    /give @s minecraft:diamond_sword{Enchantments:[{id:"minecraft:sharpness",lvl:10}]} 1   锋利10的钻石剑

/give @s minecraft:iron_sword{Enchantments:[{id:"minecraft:unbreaking",lvl:256}]} 1   无限耐久的铁剑
/give @p minecraft:netherite_pickaxe{Unbreakable:1b}  无限耐久的下界合金镐子(1.20.6之前)
/give @p netherite_pickaxe[unbreakable={}] 1   (1.20.6之后)

Netherite sword with 9999 attack damage: 
/give @p netherite_sword[attribute_modifiers=[{id:"attack_damage",type:"generic.attack_damage",amount:9999,operation:"add_value",slot:"mainhand"}]] 1

Dirt with 10 attack damage:
/give @p dirt[attribute_modifiers=[{id:"attack_damage",type:"generic.attack_damage",amount:10,operation:"add_value",slot:"mainhand"}]] 1

Netherite sword with hidden attack damage:
/give @p netherite_sword[attribute_modifiers={modifiers:[{id:"attack_damage",type:"generic.attack_damage",amount:1,operation:"add_value",slot:"mainhand"}],show_in_tooltip:false}] 1
```

附魔指令 [链接](https://minecraft.fandom.com/zh/wiki/%E9%99%84%E9%AD%94)

### mc给物品添加指令

输入 `/powertool` 你要的指令
比如 `/powetool msg` 就给你手上的物品添加了/msg指令
就能把该指令绑定到你手上的物品

## mc效果代码

- 清除效果 — clear  速度 1 speed
- 缓慢 2 slowness
- 急迫 3 haste
- 挖掘疲劳 4 mining_fatigue
- 力量 5 strength
- 瞬间治疗 6 instant_health
- 瞬间伤害 7 instant_damage
- 跳跃提升 8 jump_boost           -235 63 250
- 反胃 9 nausea
- 生命恢复 10 regeneration
- 抗性提升 11 resistance
- 防火 12 fire_resistance
- 水下呼吸 13 water_breathing
- 隐身 14 invisibility
- 失明 15 blindness
- 夜视 16 night_vision
- 饥饿 17 hunger
- 虚弱 18 weakness
- 中毒 19 poison
- 凋零 20 wither
- 生命提升 21 health_boost
- 伤害吸收 22 absorption
- 饱和 23 saturation
- 发光（PC） 24 glowing
- 飘浮 25 levitation
- 幸运（PC） 26 luck
- 霉运（PC） 27 unluck
- 缓降指令ID是28
