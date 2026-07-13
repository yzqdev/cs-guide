# Minecraft MOD 开发教程

本目录收录 Minecraft MOD 开发教程，涵盖 NeoForge 和 Fabric 两大主流 MOD 加载器。

## NeoForge

| 文件 | 内容 |
|------|------|
| [项目搭建](neoforge/setup.md) | 环境搭建、项目结构、主类编写、mods.toml、build.gradle、注册机制 |
| [物品注册](neoforge/items.md) | 物品/工具/盔甲/食物注册、自定义行为、合成配方、创造模式标签页 |
| [方块注册](neoforge/blocks.md) | 方块/矿石注册、方块模型/状态/掉落、自定义行为、方块实体、世界生成 |
| [事件系统](neoforge/events.md) | 事件总线、MOD/FORGE 事件、常用事件列表、优先级、取消事件、客户端事件 |

## Fabric

| 文件 | 内容 |
|------|------|
| [项目搭建](fabric/setup.md) | 环境搭建、项目结构、主类编写、fabric.mod.json、build.gradle、Fabric API |
| [物品注册](fabric/items.md) | 物品/工具/盔甲/食物注册、自定义行为、合成配方、自定义物品组 |
| [方块注册](fabric/blocks.md) | 方块/矿石注册、方块模型/状态/掉落、自定义行为、方块实体、世界生成 |
| [事件系统](fabric/events.md) | 事件回调、常用事件、Mixin 使用、服务端/客户端事件、完整案例 |

## 选择建议

```text
选择 NeoForge 的情况：
- 想使用传统 Forge 生态
- 需要丰富的 API 支持
- MOD 依赖其他 Forge MOD

选择 Fabric 的情况：
- 追求轻量和快速更新
- 使用 Mixin 进行底层修改
- 开发 1.17+ 版本的新 MOD
- 不需要大量 Forge 生态兼容
```
