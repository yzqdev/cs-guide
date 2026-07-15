# Beet — Minecraft 数据包开发工具包

[![GitHub](https://img.shields.io/github/stars/mcbeet/beet)](https://github.com/mcbeet/beet)
[![PyPI](https://img.shields.io/pypi/v/beet)](https://pypi.org/project/beet/)
[![Discord](https://img.shields.io/discord/800035701243772969)](https://discord.gg/98MdSGMm8j)

> 官网：<https://mcbeet.dev/>
> 仓库：<https://github.com/mcbeet/beet>

Beet 是一个 Python 开发的 Minecraft 数据包/资源包**构建工具链**。它把数据包开发从"手动管理数百个文件"变成"用代码自动化构建"。

## 核心概念

```
┌─────────────────────────────────────────────┐
│              beet.yaml / beet.py             │
│         (项目配置文件 + Python 插件)          │
├─────────────────────────────────────────────┤
│                  beet build                  │
│           (构建管道：加载 → 处理 → 输出)      │
├─────────────────────────────────────────────┤
│          ┌──────────┐  ┌──────────┐         │
│          │ Data Pack│  │Resource  │         │
│          │          │  │  Pack    │         │
│          └──────────┘  └──────────┘         │
│                   ↓ 输出                     │
│          ┌──────────────────────────┐        │
│          │  Minecraft 游戏目录       │        │
│          └──────────────────────────┘        │
└─────────────────────────────────────────────┘
```

## 安装

### 方式一：使用 uv（推荐）

```bash
# 安装 uv
pip install uv

# 安装 beet
uv tool install beet
```

### 方式二：使用 pip

```bash
pip install beet
```

### 验证安装

```bash
beet --help
```

输出应显示：

```
Usage: beet [OPTIONS] COMMAND [ARGS]...

  The beet toolchain.

Options:
  -p, --project PATH  Select project.
  -s, --set OPTION    Set config option.
  -l, --log LEVEL     Configure output verbosity.
  -v, --version       Show the version and exit.
  -h, --help          Show this message and exit.

Commands:
  build  Build the current project.
  cache  Inspect or clear the cache.
  link   Link the generated resource pack and data pack to Minecraft.
  watch  Watch the project directory and build on file changes.
```

## 命令列表

| 命令 | 说明 |
|------|------|
| `beet build` | 构建项目 |
| `beet watch` | 监听文件变化，自动重新构建 |
| `beet link` | 将生成的数据包链接到 Minecraft 游戏目录 |
| `beet cache` | 查看或清除缓存 |

## 快速开始

### 1. 创建项目结构

```
my_beet_pack/
├── beet.yaml          # 配置文件
├── pack.mcmeta        # 数据包描述
└── data/
    └── my_pack/
        └── functions/
            └── hello.mcfunction
```

### 2. 配置 beet.yaml

```yaml
# beet.yaml
id: my_beet_pack
name: "我的 Beet 数据包"
description: "使用 Beet 构建的数据包"
version: 1.0.0
author: "YourName"

# 输出到 Minecraft 世界目录
output: "C:/Users/YourName/AppData/Roaming/.minecraft/saves/测试世界/datapacks"

# 数据包配置
data_pack:
  pack_format: 48
  description: "§aBeet 构建的数据包"
```

### 3. 编写 Python 插件

创建一个 Python 插件文件，自动生成函数：

```python
# greet.py
from beet import Context, Function

def greet(ctx: Context):
    """添加一个欢迎函数到数据包"""
    ctx.data["greet:hello"] = Function(
        ["say §a欢迎使用 Beet 构建的数据包！"],
        tags=["minecraft:load"]
    )
```

然后在 `beet.yaml` 中引用插件：

```yaml
# beet.yaml
pipeline:
  - greet.py
```

### 4. 构建

```bash
beet build
```

### 5. 监听模式

```bash
beet watch
```

在监听模式下，每次修改文件都会自动重新构建。

## 进阶用法

### 使用 Python 配置

除了 YAML，也可以直接用 Python 文件配置项目：

```python
# beet.py
from beet import Context

def greet(ctx: Context):
    """自动生成欢迎函数"""
    ctx.data["greet:hello"] = [
        "say §aHello from Beet!",
    ]
    ctx.data["greet:hello"].tags = ["minecraft:load"]
```

然后运行：

```bash
beet -p beet.py build
```

### 合并多个数据包

```python
from beet import Context

def merge_packs(ctx: Context):
    """将多个数据包合并为一个"""
    # 加载其他数据包
    ctx.require("other_pack")
    
    # 合并函数
    for func in ctx.data.functions:
        print(f"处理函数: {func}")
```

### 与 Mecha 验证器集成

```yaml
# beet.yaml
pipeline:
  - beet.contrib.mecha  # 启用 Mecha 验证
  - greet.py
```

这样在构建时 Mecha 会自动验证所有命令的正确性。

### 使用模板

Beet 支持 Jinja2 模板，方便生成重复性内容：

```python
# template_example.py
from beet import Context, Template

def add_templates(ctx: Context):
    """使用模板生成函数"""
    template = Template("say {{ message }}")
    
    ctx.data["greet:morning"] = template.render(message="§e早上好！")
    ctx.data["greet:evening"] = template.render(message="§3晚上好！")
```

## 常用 API

| API | 说明 |
|-----|------|
| `ctx.data["namespace:path"]` | 访问/设置数据包内容 |
| `ctx.assets["namespace:path"]` | 访问/设置资源包内容 |
| `ctx.require("plugin")` | 加载另一个插件 |
| `ctx.meta` | 项目元数据 |
| `ctx.project_path` | 项目根目录路径 |
| `ctx.output_path` | 输出目录路径 |

## 参考链接

- [官网](https://mcbeet.dev/)
- [GitHub 仓库](https://github.com/mcbeet/beet)
- [示例代码](https://github.com/mcbeet/beet/tree/main/examples)
- [Discord 社区](https://discord.gg/98MdSGMm8j)
