# Minecraft 数据包基础

[官方文档](https://minecraft.wiki/w/Data_pack)

## 什么是数据包

数据包（Datapack）是 Minecraft 1.13+ 引入的机制，允许在不安装 MOD 的情况下修改游戏内容，包括：

- 自定义合成配方和战利品表
- 自定义进度和成就
- 自定义函数（命令组）
- 自定义世界生成
- 自定义谓词和物品修饰器

## 数据包结构

```
datapack_name/
├── pack.mcmeta                  # 数据包描述文件
├── pack.png                     # 数据包图标（可选）
└── data/
    ├── <命名空间>/
    │   ├── functions/           # 函数文件
    │   │   └── example.mcfunction
    │   ├── advancements/        # 进度文件
    │   │   └── example.json
    │   ├── recipes/             # 合成配方
    │   │   └── example.json
    │   ├── loot_tables/         # 战利品表
    │   │   └── blocks/
    │   │       └── example.json
    │   ├── predicates/          # 谓词
    │   │   └── example.json
    │   ├── item_modifiers/      # 物品修饰器
    │   ├── tags/                # 标签
    │   │   ├── blocks/
    │   │   ├── items/
    │   │   └── entity_types/
    │   ├── worldgen/            # 世界生成
    │   │   ├── biome/
    │   │   ├── configured_feature/
    │   │   ├── placed_feature/
    │   │   ├── structure/
    │   │   └── dimension/
    │   └── dimension_type/      # 维度类型
    └── minecraft/               # 覆盖原版命名空间
        └── tags/
            └── functions/
                └── tick.json    # 每 tick 执行的函数
```

### 命名空间

每个数据包使用**命名空间**来避免冲突：

```text
data/<namespace>/<type>/<path>.json
```

- 建议使用小写字母和下划线
- 你的数据包通常使用自定义命名空间，例如 `my_pack`
- 使用 `minecraft` 命名空间可以覆盖原版内容

## pack.mcmeta

```json
{
    "pack": {
        "pack_format": 48,
        "description": "§b我的第一个数据包\n§7版本 1.0"
    }
}
```

### pack_format 版本对照

| 版本 | pack_format |
|------|-------------|
| 1.21.4 | 48 |
| 1.21 | 42 |
| 1.20.5 | 41 |
| 1.20.2 | 18 |
| 1.19.4 | 13 |
| 1.18.2 | 10 |
| 1.17 | 7 |
| 1.16.2 | 6 |
| 1.15 | 5 |
| 1.14 | 4 |
| 1.13 | 3 |

## 安装数据包

### 单机世界

```text
1. 打开世界文件夹
   .minecraft/saves/<世界名称>/datapacks/

2. 将数据包文件夹或.zip 文件放入该目录

3. 进入世界后使用命令：
   /datapack list       # 查看已加载的数据包
   /datapack enable <名称>  # 启用数据包
   /datapack disable <名称> # 禁用数据包

4. 重载数据包：
   /reload
```

### 服务器

```text
1. 将数据包放入服务器目录：
   /world/datapacks/

2. 在 server console 中：
   /reload

3. 查看所有数据包：
   /datapack list
   /datapack list available  # 查看可用的
```

## 第一个数据包

### 示例：自定义欢迎消息

创建以下文件结构：

```
welcome_pack/
├── pack.mcmeta
└── data/
    └── my_pack/
        └── functions/
            └── welcome.mcfunction
```

### pack.mcmeta

```json
{
    "pack": {
        "pack_format": 48,
        "description": "§a欢迎数据包"
    }
}
```

### functions/welcome.mcfunction

```mcfunction
# 欢迎消息
say §a欢迎使用我的数据包！
say §e这是一个自定义函数
```

### 测试数据包

```text
1. 将 welcome_pack 文件夹放入 datapacks 目录
2. 进入游戏执行 /reload
3. 执行 /function my_pack:welcome
4. 控制台显示欢迎消息
```

## 常用调试命令

```text
/reload               # 重载所有数据包
/datapack list        # 列出现已加载
/function <命名空间:路径>  # 执行函数
/schedule function <函数> <时间>  # 延迟执行
/gamerule doLimitedCrafting false  # 显示所有配方

# 数据包诊断
/datapack disable "welcome_pack"  # 禁用
/datapack enable "welcome_pack"   # 启用
```

## 数据包 vs 插件 vs MOD

| 特性 | 数据包 | 插件 (Spigot) | MOD (Forge/Fabric) |
|------|--------|---------------|-------------------|
| 安装难度 | ⭐ 极简 | ⭐⭐ 简单 | ⭐⭐⭐ 复杂 |
| 需要服务端 | 任何 | Spigot/Paper | Forge/Fabric |
| 可修改内容 | 数据逻辑 | 全部 | 全部 |
| 自定义代码 | ❌ | ✅ Java | ✅ Java |
| 客户端要求 | 无 | 无 | 需安装 |
| 性能消耗 | 极低 | 低 | 中等 |
