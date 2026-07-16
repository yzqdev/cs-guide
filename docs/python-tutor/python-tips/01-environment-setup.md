---
order: 1
---

# Python 环境准备

> Python 开发环境搭建指南，涵盖安装、虚拟环境、包管理等。

## 安装 Python

在 [python.org](https://www.python.org/) 下载 Python 安装包并安装，注意要勾选"Add Python to PATH"，这样系统就能识别 `python` 命令。

```powershell
# 验证安装
python --version
pip --version
```

## pip 创建项目 venv 方法

Python 官方推荐的虚拟环境工具，从 Python 3.3 起内置。

官方文档：<https://docs.python.org/zh-cn/3/library/venv.html>

```txt
cd e:/py-proj

mkdir spider_projs
# 进入这个目录
cd spider_projs
# 然后创建虚拟环境，目录是 .venv
python -m venv .venv
# 然后激活环境，这一步很重要，它是把 .venv 中的 path 加入到环境变量去
```

### 激活虚拟环境

| 平台 | Shell | 激活命令 |
|------|-------|---------|
| POSIX | bash/zsh | `source .venv/bin/activate` |
| POSIX | fish | `source .venv/bin/activate.fish` |
| POSIX | csh/tcsh | `source .venv/bin/activate.csh` |
| Windows | cmd.exe | `.venv\Scripts\activate.bat` |
| Windows | PowerShell | `.venv\Scripts\Activate.ps1` |

:::tip
必须在环境激活的情况下安装依赖 `pip install requests`，没激活的话会安装在 Python 的全局 `site-packages` 目录！

```txt
# 生成依赖列表
pip freeze > requirements.txt

# 安装依赖
pip install -r requirements.txt
```
:::

## 安装 pipx

pipx 可以把全局安装的 CLI 工具存在用户目录，做到环境隔离。

通常来说安装全局命令行工具可以用 `pip install httpie` 这种方法，但是 pip 既可以安装 CLI 也可以安装依赖，这样容易混淆。

```bash
pip install pipx
```

### pipx 安装本地的 CLI 项目

<https://github.com/pypa/pipx/issues/6>

```bash
# 在项目目录下安装为全局可执行命令
pipx install .
```

## 安装 Poetry

Poetry 是现代的 Python 依赖管理和打包工具。

```bash
pipx install poetry
```

### Poetry 镜像配置

Poetry **不**会使用用户定义的 pip.ini 里面的镜像，所以要手动设置源：

```toml
[[tool.poetry.source]]
name = "tsinghua"
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
priority = "default"
```

### Poetry 常用配置

配置参考：<https://python-poetry.org/docs/configuration/>

```bash
# 配置在项目目录生成 .venv 文件夹
poetry config virtualenvs.in-project true

# 或者设置环境变量（用户环境变量重启后生效）
# POETRY_VIRTUALENVS_IN_PROJECT=true

# 配置环境名称
poetry config virtualenvs.prompt "{project_name}"
```

Poetry 缓存路径：`C:\Users\{username}\AppData\Local\pypoetry`

## 安装 Pipenv

Pipenv 是另一个流行的依赖管理工具（已逐渐被 Poetry 取代，但仍有项目使用）。

```shell
pipx install pipenv
```

```bash
# 设置环境变量，pipenv 会在当前目录下创建 .venv 目录
export PIPENV_VENV_IN_PROJECT=1
```

Pipenv 缓存路径：`C:\Users\{username}\AppData\Local\pipenv`
