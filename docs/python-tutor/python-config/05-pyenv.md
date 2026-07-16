---
order: 5
---

# pyenv 多版本 Python 管理

> pyenv 可以让你在同一台机器上安装和管理多个 Python 版本，实现版本间轻松切换。

## 安装

### Windows（pyenv-win）

```powershell
# 使用 git 安装
git clone https://github.com/pyenv-win/pyenv-win.git %USERPROFILE%\.pyenv

# 或使用 pip 安装
pip install pyenv-win --target %USERPROFILE%\.pyenv
```

> 注意：不要使用 scoop 安装，可能会缺少必要组件。

### 配置环境变量

```powershell
# 添加以下环境变量
PYENV=%USERPROFILE%\.pyenv\pyenv-win
PYENV_ROOT=%USERPROFILE%\.pyenv\pyenv-win
PYENV_HOME=%USERPROFILE%\.pyenv\pyenv-win

# 在 PATH 中添加
%USERPROFILE%\.pyenv\pyenv-win\bin
%USERPROFILE%\.pyenv\pyenv-win\shims
```

### Linux / macOS

```bash
# 使用 installer 安装
curl https://pyenv.run | bash

# 或使用 Homebrew（macOS）
brew install pyenv
```

## 配置安装镜像

pyenv 默认从 Python 官网下载，速度较慢，可以配置国内镜像：

```powershell
# Windows 设置环境变量
PYTHON_BUILD_MIRROR_URL=https://mirrors.huaweicloud.com/python/
```

```bash
# Linux / macOS
export PYTHON_BUILD_MIRROR_URL=https://mirrors.huaweicloud.com/python/
```

## 常用命令

```bash
# 查看可安装的 Python 版本
pyenv install -l

# 搜索特定版本
pyenv install -l | findstr 3.12    # Windows
pyenv install -l | grep 3.12       # Linux/macOS

# 安装指定版本
pyenv install 3.12.0
pyenv install 3.11.7

# 查看已安装的版本
pyenv versions

# 设置全局默认版本
pyenv global 3.12.0

# 设置局部版本（当前目录）
pyenv local 3.11.7

# 设置 shell 版本（当前会话）
pyenv shell 3.12.0

# 查看当前版本
pyenv version

# 卸载版本
pyenv uninstall 3.11.7
```

## 更新 pyenv

```bash
# Windows
cd %USERPROFILE%\.pyenv\pyenv-win
git pull

# Linux/macOS
pyenv update
```

## 与 virtualenv 配合

pyenv 可以和 virtualenv 结合使用，实现 Python 版本 + 虚拟环境的双重隔离：

```bash
# 安装 pyenv-virtualenv 插件
git clone https://github.com/pyenv/pyenv-virtualenv.git $(pyenv root)/plugins/pyenv-virtualenv

# 创建虚拟环境（指定 Python 版本）
pyenv virtualenv 3.12.0 myproject-env

# 激活虚拟环境
pyenv activate myproject-env

# 退出虚拟环境
pyenv deactivate
```

## 常见问题

### 1. 安装后找不到 Python

```bash
# 重新哈希 shims
pyenv rehash
```

### 2. 安装速度慢

配置镜像源后执行：

```bash
pyenv install 3.12.0
```

### 3. Windows 上安装失败

确保使用管理员权限运行 PowerShell，并关闭杀毒软件。

## 参考链接

- [pyenv-win GitHub](https://github.com/pyenv-win/pyenv-win#installation)
- [pyenv GitHub](https://github.com/pyenv/pyenv)
- [pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv)