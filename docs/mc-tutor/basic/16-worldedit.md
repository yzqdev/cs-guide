---
order: 16
---
# WorldEdit 指南

> 最强 Minecraft 地图编辑插件，快速建造、填充、复制、改造地形必备。

![钻石镐](https://minecraft.wiki/images/Invicon_Diamond_Pickaxe.png) ![木剑](https://minecraft.wiki/images/Invicon_Wooden_Sword.png) ![水桶](https://minecraft.wiki/images/Invicon_Water_Bucket.png) ![岩浆桶](https://minecraft.wiki/images/Invicon_Lava_Bucket.png) ![雪球](https://minecraft.wiki/images/Invicon_Snowball.png)

[官方 Wiki](https://worldedit.enginehub.org/en/latest/)

---

## 基本概念

### 安装

- **服务器**: 将 WorldEdit 插件放入 `plugins/` 目录，重启服务器
- **单机（Forge/Fabric）**: 安装对应版本的 WorldEdit Mod
- **权限**: OP 玩家自动拥有权限；非 OP 需要 `worldedit.*` 权限节点

### 选区（Region）

WorldEdit 的所有操作都基于选区。先用工具选择两个对角点，然后对选区执行操作。

### 切换模式

```text
//toggleeditwand           # 切换编辑魔杖（关闭后木斧恢复原功能）
```

---

## 选区操作

### 选择工具

| 操作 | 说明 |
|------|------|
| **木斧**（默认工具） | 左键选择第一个点，右键选择第二个点 |
| `//wand` | 获取木斧 |
| `//sel` | 查看当前选区 |
| `//sel cuboid` | 切换到长方体选区模式（默认） |
| `//sel extend` | 扩展选区模式（可追加选择） |
| `//sel poly` | 多边形选区模式（垂直柱体，适用不规则平面区域） |
| `//sel sphere` | 球形选区模式 |
| `//sel cyl` | 圆柱选区模式 |

### 选择技巧

```text
//hpos1                       # 将视线所指的方块设为第一个点（不走过去）
//hpos2                       # 将视线所指的方块设为第二个点
//chunk                       # 选择整个区块（16×16）
//chunks                      # 选择选区内的所有完整区块
//expand <格数> <方向>        # 向指定方向扩展选区
//expand <格数>               # 向玩家视线方向扩展
//expand vert                 # 将选区扩展到天空和基岩（垂直全高）
//contract <格数> <方向>      # 收缩选区
//outset <格数>               # 向所有方向扩展
//inset <格数>                # 所有方向向内收缩
//shift <格数> <方向>         # 移动选区（不移动方块）
//size                        # 查看选区尺寸
//count <方块ID>              # 统计选区内指定方块数量
//distr                       # 统计选区所有方块分布
```

---

## 基础编辑命令

> 以下命令在选区上执行批量操作。

```text
//set <方块>                   # 用指定方块填充整个选区
//set stone                    # 全部填充为石头
//set 35:14                    # 全部填充为红色羊毛（旧格式）

//replace <旧方块> <新方块>    # 替换选区中的方块
//replace stone grass_block    # 将石头替换为草方块
//replace grass_block air      # 将草方块替换为空气
//replace air water            # 将空气替换为水

//overlay <方块>               # 在选区表面的所有方块上覆盖一层
//overlay grass_block          # 所有表面覆盖草方块
//overlay snow 7               # 覆盖 7 层雪

//walls <方块>                 # 在选区边缘建造围墙（四边）
//walls stone_bricks           # 石砖围墙

//faces <方块>                 # 给选区建造完整外壳（六面）
//faces glass                  # 玻璃外壳

//outline <方块>               # 选区边框线（仅边缘线框）
//outline glowstone             # 荧石边框线

//smooth [迭代次数]            # 平滑地形（迭代次数越大越平滑）
//smooth 5                     # 5 次迭代平滑地形

//naturalize                   # 将选区顶层草方块、下方泥土、深层石头自然化
```

---

## 放置命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `//set <方块>` | 填充选区 | `//set stone` |
| `//replace [旧] <新>` | 替换方块 | `//replace grass dirt` |
| `//overlay <方块>` | 覆盖表面 | `//overlay grass` |
| `//walls <方块>` | 建围墙 | `//walls stone_bricks` |
| `//faces <方块>` | 包裹外壳 | `//faces glass` |
| `//outline <方块>` | 边框线 | `//outline glowstone` |
| `//smooth [次数]` | 平滑地形 | `//smooth 3` |
| `//naturalize` | 自然化地形 | `//naturalize` |

---

## 生成形状

```text
//hsphere <方块> <半径> [是否仅外壳]          # 空心球
//hsphere stone 10                           # 石头空心球（半径 10）
//hsphere glass 20 true                      # 玻璃空心球

//sphere <方块> <半径> [是否仅外壳]           # 实心球
//sphere stone 5                             # 石头实心球

//cyl <方块> <半径> <高度> [是否仅外壳]       # 圆柱体
//cyl stone 10 5                             # 石头圆柱（半径 10，高 5）
//cyl glass 15 30 true                       # 玻璃空心圆柱

//hcyl <方块> <半径> <高度>                   # 空心圆柱
//hcyl stone 10 5                            # 石头空心圆柱

//pyramid <方块> <大小>                      # 金字塔（实心）
//pyramid stone 10                           # 石头金字塔

//hpyramid <方块> <大小>                     # 空心金字塔
//hpyramid glass 10                          # 玻璃空心金字塔

//forest <密度> [种类]                       # 生成森林
//forest 5                                   # 密度 5 的森林
//forest 10 birch                            # 白桦树林

//pumpkins [密度]                            # 生成南瓜（万圣节主题）
//pumpkins 10                                # 密度 10 的南瓜

//generate <公式>                             # 用公式生成地形（高级）
//generate -h stone                          # 使用高度图公式
```

---

## 移动、复制与变换

```text
//copy [-e] [-m <方块>]                       # 复制选区内容到剪贴板
//copy                                        # 正常复制
//copy -e                                     # 复制时跳过空气方块
//copy -m stone                               # 只复制石头

//cut [-e]                                    # 剪切（复制后清空选区）
//cut                                         # 剪切选区
//cut -e                                      # 剪切并跳过空气

//paste [-a]                                  # 粘贴剪贴板内容
//paste                                       # 粘贴
//paste -a                                    # 粘贴时跳过空气方块（保留原有方块）

//rotate <角度>                               # 旋转剪贴板（角度：0/90/180/270）
//rotate 90                                   # 顺时针旋转 90°

//flip <方向>                                 # 翻转剪贴板
//flip north                                  # 南北方向翻转
//flip up                                     # 上下翻转

//move <格数> <方向> [方块]                   # 移动选区内的方块
//move 10 up                                  # 向上移动 10 格
//move 5 north stone                          # 向北移动 5 格，空出部分用石头填充

//stack <次数> <方向>                         # 堆叠复制（重复粘贴）
//stack 10 up                                 # 向上堆叠 10 次
//stack 5 south                               # 向南堆叠 5 次

//regen                                       # 重新生成选区（恢复为原始生物群系地形）
//deform <表达式>                             # 变形选区（按公式）
//deform x=y*2                                # 将选区按公式变形
```

---

## 撤销与历史

```text
//undo [次数]                                 # 撤销操作
//undo                                        # 撤销上一次
//undo 5                                      # 撤销最近 5 次

//redo [次数]                                 # 重做操作
//redo                                        # 重做上一次
//redo 3                                      # 重做 3 次

//clearhistory                                # 清空历史记录（释放内存）
```

---

## 刷子工具

> 刷子可以像画笔一样在地图上绘制、替换、塑形，适合地形雕刻和大型建筑。

### 基础刷子命令

```text
//brush sphere <方块> <半径>                 # 球形刷
//brush sphere stone 5                       # 半径 5 的石头球刷

//brush cyl <方块> <半径> <高度>             # 圆柱刷
//brush cyl stone 3 10                       # 半径 3、高 10 的圆柱刷

//brush clipbrd [-e] [-a]                    # 剪贴板刷（用选区内容作为笔刷）
//brush clipbrd                               # 用剪贴板内容涂抹

//brush smooth [迭代次数]                    # 地形平滑刷
//brush smooth 5                              # 平滑刷

//brush deform <表达式>                      # 变形刷
//brush raise <半径>                         # 抬升地形刷
//brush lower <半径>                         # 降低地形刷

//brush gravity [半径]                       # 重力刷（让方块自然下落）
//brush gravity 10                            # 半径 10 的重力刷
```

### 刷子设置

```text
/brush <命令> [参数]                         # 绑定刷子到当前手持物品
//mask <方块>                                # 设置刷子遮罩（只影响指定方块）
//mask grass_block stone                     # 只修改草方块和石头
//mask #existing                             # 只修改已存在的方块
//mask #solid                                 # 只修改实心方块

//size <半径>                                # 设置刷子大小
//size 10                                    # 设置刷子半径为 10

//range <格数>                               # 设置刷子最大使用距离
//range 50                                   # 最大使用距离 50 格
```

### 刷子示例

```text
# 调色刷——用木斧选一个区域，然后当刷子用
//copy -e                                   # 复制选区（跳过空气）
//brush clipbrd -a                          # 绑定为笔刷（跳过空气粘贴）

# 地形雕刻——将草地刷成石头
//mask grass_block                          # 只影响草方块
//brush sphere stone 3                      # 半径 3 的石头球刷
# 然后右键点击草地即可雕刻
```

---

## 生物群系与生态

```text
//setbiome <生物群系ID>                     # 设置选区的生物群系
//setbiome forest                            # 森林
//setbiome desert                            # 沙漠
//setbiome plains                            # 平原
//setbiome ocean                             # 海洋
//setbiome minecraft:cherry_grove           # 樱花树林
//setbiome minecraft:deep_dark              # 深暗之域

//listbiomes [源]                            # 列出所有生物群系
//listbiomes *                               # 列出所有群系
```

---

## 方块信息查询

```text
//info                                      # 信息查询模式（点击方块查看信息）
//toggleinfo                                # 切换信息模式
/blockinfo                                  # 查看手中方块的信息

//listblocks                                # 列出选区中所有方块类型
```

---

## 超级镐子

> 超级镐子可以一次性挖掘大片区域。

```text
//sp                                        # 切换超级镐子开关
//sp area                                   # 挖掘时删除选区范围内所有方块
//sp fill                                   # 挖掘时删除接触到的相同方块（连锁挖矿）
//sp horiz                                  # 挖掘时删除同一水平面上的方块

# 使用超级镐子时按住左键挖掘，会按模式规则删除方块
```

---

## 导航命令

```text
//unstuck                                   # 卡住时脱身（传送到最近的空位）
//ascend                                    # 向上传送到上一层空间
//descend                                   # 向下传送到下一层空间

//ceil [格数]                               # 传送到当前房间的天花板
//floor                                     # 传送到当前房间的地板

/thru                                      # 穿过前方的墙壁（视线方向）
/jump                                      # 跳转到视线所指的方块位置
/up <格数>                                 # 向上传送指定格数
```

---

## 实用工具

```text
//toggleplace                               # 切换粘贴位置（玩家位置 / 选区中心）
//remap <旧ID> <新ID> [旧ID2 新ID2 ...]    # 批量重新映射方块 ID
//drain <半径>                              # 排干指定半径内的液体
//drain 10                                  # 排干 10 格内的水/岩浆
//fixwater <半径>                           # 修复水（让静止水流平复）
//fixlava <半径>                            # 修复岩浆
//removeabove <格数>                        # 移除头顶上方的方块
//removebelow <格数>                        # 移除脚下下方的方块
//removelight <半径>                        # 移除光源方块
//replacenear <格数> <旧> <新>             # 替换附近方块
//replacenear 10 grass_block stone          # 替换 10 格内的草方块为石头

//fill <半径> <高度> <方块>                 # 向脚下填充一个圆柱
//fill 10 5 water                           # 在脚下填出一个半径 10、高 5 的水池

//help [命令]                               # 查看帮助
//help //set                                # 查看 //set 命令帮助
//worldedit:version                         # 查看 WorldEdit 版本
```

---

## 方块 ID 与遮罩

### 常用方块 ID

| ID | 说明 |
|----|------|
| `stone` | 石头 |
| `grass_block` | 草方块 |
| `dirt` | 泥土 |
| `cobblestone` | 圆石 |
| `stone_bricks` | 石砖 |
| `oak_planks` | 橡木木板 |
| `glass` | 玻璃 |
| `water` | 水 |
| `lava` | 岩浆 |
| `sand` | 沙子 |
| `air` | 空气 |

### 常用遮罩（Mask）

> 遮罩限制命令只影响指定方块。

| 遮罩 | 说明 |
|------|------|
| `#existing` | 只修改已存在的方块（非空气） |
| `#solid` | 只修改实心方块 |
| `#surface` | 只修改表面方块 |
| `#light` | 只修改光源方块 |
| `#air` | 只修改空气方块 |
| `stone,grass_block` | 逗号分隔，匹配多种方块 |

### 示例

```text
//replace #existing stone      # 将所有已存在的方块替换为石头
//set #solid                   # 将选区填充为仅实心方块（空气区域不变）
//mask #surface                # 设置遮罩：只影响表面
//brush sphere stone 5        # 配合遮罩使用
```

---

## 完整工作流示例

### 建造一座山

```text
1. //wand                         # 获取木斧
2. 左键 + 右键选择山地范围
3. //set stone                    # 填充山体基础
4. //smooth 5                     # 平滑地形
5. //overlay grass_block          # 表面覆盖草方块
6. //setbiome forest              # 设置为森林群系
7. //forest 3                     # 种树
```

### 建造圆形竞技场

```text
1. //hcyl stone 30 1              # 建造半径 30 的石环地基
2. //hcyl stone 30 20             # 建造外墙
3. //hcyl air 28 18               # 内部掏空
4. //sphere glass 30              # 顶部玻璃穹顶
5. //setbiome plains              # 设置为平原群系
```

### 复制建筑

```text
1. 选择建筑区域
2. //copy -e                     # 复制（跳过空气）
3. 走到目标位置
4. //paste                       # 粘贴
5. //rotate 90                   # 如果方向不对，旋转 90°
6. //paste                       # 再次粘贴
```

---

> **提示**: 所有以 `//` 开头的命令都是 WorldEdit 指令。部分命令可能需要对应权限才能使用。建议先在单人测试世界或 `//undo` 可用的情况下练习。
