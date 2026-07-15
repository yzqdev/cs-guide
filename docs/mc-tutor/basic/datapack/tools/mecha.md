# Mecha — Minecraft 命令验证器

[![GitHub](https://img.shields.io/github/stars/mcbeet/mecha)](https://github.com/mcbeet/mecha)
[![PyPI](https://img.shields.io/pypi/v/mecha)](https://pypi.org/project/mecha/)

> 仓库：<https://github.com/mcbeet/mecha>
> 注意：Mecha 现已合并到 Beet 单仓库中，位于 `packages/mecha`

Mecha 是一个强大的 Minecraft 命令解析与验证库，支持：

- 解析 `.mcfunction` 命令文件
- 验证命令语法是否正确
- 统计命令使用情况
- 作为 CI 检查工具
- 作为 Python 库集成到 Beet 构建管道

## 安装

```bash
pip install mecha
```

## 命令行使用

### 基础验证

```bash
# 验证整个数据包
mecha path/to/my_data_pack

# 验证单个函数文件
mecha path/to/function.mcfunction

# 验证当前目录下的所有 .mcfunction 文件
mecha .

# 指定 Minecraft 版本
mecha -m 1.21.4 path/to/my_data_pack

# 设置日志级别
mecha -l DEBUG path/to/my_data_pack
```

### 输出示例

```bash
$ mecha my_data_pack
Validating with mecha v0.104.1

ERROR  | mecha  Expected curly '}' but got bracket ']'.
       | my_data_pack/data/demo/functions/foo.mcfunction:5:34
       |      4 |
       |      5 |  say hello @a[scores={foo=1, bar=2]
       |        :                                   ^

Error: Reported 1 error.
```

### 命令统计

```bash
# 收集统计信息
mecha -s path/to/my_data_pack

# 输出到 JSON 文件
mecha -s -j stats.json path/to/my_data_pack
```

统计输出示例：

```
INFO   | stats  Analyzed 1 function
       | -------------------------------------------------------------------------------
       | Total commands (1 behind execute)                                      |      4
       | -------------------------------------------------------------------------------
       |        /scoreboard                                                     |      3
       |                    objectives add <objective> <criteria>               |      1
       |                    players set <targets> <objective> <score>           |      1
       |                    players operation <targets> <targetObjective> <o... |      1
       |        /setblock (1 behind execute)                                    |      1
       |        /execute                                                        |      1
       |                 if score <target> <targetObjective> matches <range>... |      1
       |                 as <targets> <subcommand>                              |      1
       |                 run <subcommand>                                       |      1
       | -------------------------------------------------------------------------------
       | Total selectors                                                        |      3
       | -------------------------------------------------------------------------------
       |        @e                                                              |      2
       |           [tag]                                                        |      2
       |           [scores]                                                     |      1
       |        @s                                                              |      1
       |        @e with missing or inverted type                                |      2
       | -------------------------------------------------------------------------------
       | Scoreboard objectives                                                  |      2
       | -------------------------------------------------------------------------------
       |        my_consts (dummy)                                               |      3
       |                  10                                                    |      2
       |        foo                                                             |      3
```

## 命令行选项

| 选项 | 说明 |
|------|------|
| `-m, --minecraft VERSION` | 指定 Minecraft 版本 |
| `-l, --log LEVEL` | 日志级别（DEBUG/INFO/WARNING/ERROR） |
| `-s, --stats` | 收集统计信息 |
| `-j, --json FILENAME` | 输出统计结果为 JSON 文件 |
| `-v, --version` | 显示版本号 |
| `-h, --help` | 显示帮助 |

## 作为 Python 库使用

### 基本用法

```python
from mecha import Mecha

mc = Mecha()

# 解析命令
function = """
    execute
        as @a
        at @s
        run
            say Hello!
"""

ast = mc.parse(function, multiline=True)
print(mc.serialize(ast))
# 输出: execute as @a at @s run say Hello!
```

### 指定版本

```python
from mecha import Mecha

# 指定 Minecraft 1.21.4
mc = Mecha(minecraft_version="1.21.4")

# 解析并验证
result = mc.parse("say Hello World")
```

### 错误处理

```python
from mecha import Mecha, DiagnosticError

mc = Mecha()

try:
    mc.parse("say Hello @a[scores={foo=1, bar=2]")
except DiagnosticError as e:
    print(f"错误: {e}")
    # 输出: 错误: Expected curly '}' but got bracket ']'.
```

### 自定义规则

```python
from mecha import Mecha, Visitor

class MyVisitor(Visitor):
    """自定义 AST 访问器"""
    def visit_call(self, node):
        print(f"发现命令调用: {node}")
        return node

mc = Mecha()
mc.visit(MyVisitor())
```

## 与 Beet 集成

Mecha 可以作为 Beet 的插件在构建时自动验证命令：

```yaml
# beet.yaml
pipeline:
  - beet.contrib.mecha
```

这样在运行 `beet build` 时，Mecha 会自动验证所有 `.mcfunction` 文件。

## CI/CD 集成（GitHub Actions）

Mecha 提供了 GitHub Action，可以在每次推送时自动验证数据包：

```yaml
# .github/workflows/check-commands.yml
name: Check commands
on: [push]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: mcbeet/check-commands@v1
        with:
          source: .
```

这样每次推送到 GitHub 都会自动运行验证，确保命令没有语法错误。

## 参考链接

- [GitHub 仓库](https://github.com/mcbeet/mecha)
- [Beet 单仓库](https://github.com/mcbeet/beet)
- [PyPI](https://pypi.org/project/mecha/)
- [Discord 社区](https://discord.gg/98MdSGMm8j)
