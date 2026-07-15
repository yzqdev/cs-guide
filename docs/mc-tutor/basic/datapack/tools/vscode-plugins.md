# VS Code 插件

## Datapack Helper Plus by Spyglass

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/SPYGlass.spyglass)](https://marketplace.visualstudio.com/items?itemName=SPYGlass.spyglass)

> 仓库地址：<https://github.com/SPYGlassMC/SPYGlass>

### 功能

Datapack Helper Plus（简称 Spyglass）是 VS Code 上最强大的 Minecraft 数据包开发插件，提供：

- **命令自动补全** — 输入时自动提示命令、参数、目标选择器
- **语法错误检查** — 实时检测命令语法错误，支持多版本 Minecraft
- **悬停文档** — 鼠标悬停查看命令说明（内置 Wiki 文档）
- **跳转定义** — `Ctrl+单击` 跳转到函数定义、进度、战利品表等
- **引用查找** — 查看函数/标签/记分板被哪些地方引用
- **代码片段** — 快速插入常用命令模板
- **重命名符号** — 安全重命名记分板、标签、函数等
- **大纲视图** — 在资源管理器中展示数据包结构

### 安装

```text
1. 打开 VS Code
2. 进入扩展商店（Ctrl+Shift+X）
3. 搜索 "Datapack Helper Plus" 或 "SPYGlass"
4. 点击安装
```

### 配置

在 VS Code 设置（`settings.json`）中：

```json
{
    // 设置 Minecraft 版本
    "spyglass.minecraftVersion": "1.21.4",

    // 启用/禁用自动补全
    "spyglass.enableAutocomplete": true,

    // 启用/禁用错误检查
    "spyglass.enableDiagnostics": true,

    // 启用/禁用悬停文档
    "spyglass.enableHover": true
}
```

### 使用示例

**命令补全**：输入 `execute as ` 会自动提示 `@a`、`@p`、`@s`、`@e`、`@r` 等目标选择器。

**错误检查**：下面命令中的 `@a` 后面缺少参数，插件会给出红色波浪线提示：

```mcfunction
# 错误：@a 后缺少参数
execute as @a run say hello
```

**跳转定义**：在 `function my_pack:foo` 上 `Ctrl+单击`，会跳转到 `foo.mcfunction` 文件。

---

## syntax-mcfunction

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/Arcensoth.language-mcfunction)](https://marketplace.visualstudio.com/items?itemName=Arcensoth.language-mcfunction)

> 仓库地址：<https://github.com/Arcensoth/language-mcfunction>

### 功能

专为 `.mcfunction` 文件提供语法高亮的轻量级插件：

- **语法高亮** — 区分命令、选择器、坐标、NBT 等不同元素
- **注释高亮** — `#` 开头的注释以不同颜色显示
- **数字/坐标高亮** — `~`、`^`、数字以特殊颜色标记

### 安装

```text
1. 打开 VS Code
2. 进入扩展商店（Ctrl+Shift+X）
3. 搜索 "syntax-mcfunction" 或 "language-mcfunction"
4. 点击安装
```

### 效果示例

安装后，`.mcfunction` 文件会呈现彩色语法高亮：

```mcfunction
# 注释是灰色
say §a欢迎使用数据包！          # say 命令高亮
execute as @a at @s run        # execute 和选择器不同颜色
    setblock ~ ~1 ~ minecraft:stone  # 坐标 ~ 符号特殊颜色
```

---

## 推荐组合

两个插件互不冲突，建议同时安装：

| 插件 | 主要作用 | 推荐原因 |
|------|----------|----------|
| Datapack Helper Plus | 补全、检查、导航 | 开发效率大幅提升 |
| syntax-mcfunction | 语法高亮 | 代码可读性更好 |

> 提示：如果安装了 Datapack Helper Plus，它自带语法高亮功能，但 syntax-mcfunction 的配色方案在某些主题下更美观，可以按需选用。
