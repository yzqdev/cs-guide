# mc的区块原理

区块宽16格，长16格，高256格。[当玩家第一次出现在世界时](https://minecraft.fandom.com/zh/wiki/%E5%87%BA%E7%94%9F%E7%82%B9%E5%8C%BA%E5%9D%97)会在其周围生成区块，在[Java版](https://minecraft.fandom.com/zh/wiki/Java%E7%89%88)中，世界中最初会生成43×43个区块，其过程显示在[世界加载界面](https://minecraft.fandom.com/zh/wiki/%E4%B8%96%E7%95%8C%E5%8A%A0%E8%BD%BD%E7%95%8C%E9%9D%A2)。而随着玩家对世界的探索，相邻的区块也会被生成。

 一个mca文件包含32个区块,就是说坐标(511,60,511)在r.1.1.mca中

## Minecraft中坐标 | 区块坐标 | .mca文件名之间的转换

x坐标: 1024
y坐标: 1024
则x区块坐标: 64
z区块坐标: 64
​

Region文件名称(mca): r.2.2.mca

## 关系

Y轴用不到，所以这里省略
下文中Px,Pz,Cx,Cz,Rx,Rz均为变量

设玩家的坐标X,Z分(Px , Pz), 区块坐标为(Cx , Cz), .mca文件名为 r.`Rx`.`Rz`.mca
Px, Pz的类型均为浮点型(float), Cx, Cz, Rx, Rz均为整数型(int)

坐标 | 区块坐标 | .mca文件名 之间关系如下
:::tip
  [坐标](https://minecraft-zh.gamepedia.com/%E5%9D%90%E6%A0%87): 坐标（coordinates）在数字上反映了玩家在主世界中的位置。坐标基于一个由三条交于一点（即原点）的坐标轴而形成的网格
[区块](https://minecraft-zh.gamepedia.com/%E5%8C%BA%E5%9D%97): 区块（Chunk）是Minecraft世界里一个大小为16×256×16的部分
[.mca文件](https://minecraft-zh.gamepedia.com/%E5%8C%BA%E5%9F%9F%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F): 存档文件, 一个mca文件包含32个区块, 既 512×256×512 大小范围, 保存在 `world(地图目录)\region` 中
:::
**注意: 区块坐标 与 .mca文件名 的变量 Cx,Cz,Rx,Rz 均向下取整!**
**下文不再提示**

```java
(int)Cx = (float)Px / 16
(int)Cz = (float)Pz / 16
(int)Rx = (int)Cx / 32 = (float)Px / 16 / 32 = (float)Px / 512
(int)Rz = (int)Cx / 32 = (float)Pz / 16 / 32 = (float)Pz / 512
```

也就是说只要知道玩家坐标 (Px , Pz)
便可获知区块坐标 (Px / 16 , Pz / 16) 和 .mca文件名 r.`Px/512`.`Pz/512`.mca
