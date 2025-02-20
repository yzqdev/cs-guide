# uv

## 安装uv

<https://docs.astral.sh/uv/getting-started/installation/>
推荐使用powershell安装

## 配置文件位置

`%APPDATA%\uv\uv.toml`

```toml
cache-dir = "F:/deps/uvcache"
[[index]]
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
default = true

```

## 常用命令

```powershell
#同步依赖表
uv sync
#创建一个3.12的venv
uv venv --python '3.12'

# 按装一个全局工具
uv tool install --python '3.12' label-studio
uv tool install you-get

# 工具安装位置
 uv tool dir
 # 安装python

 uv python install 3.13
```

## pyprojet.toml

实例文件

```toml
[project]
name = "my-cli"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.13"
dependencies = [
    
    'click>=8.1.8',
    'colorama>=0.4.6' 
]
[project.scripts]
mycli = "my_cli.main:boot"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
[tool.hatch.build.targets.wheel]
packages = ["my_cli"]

```
