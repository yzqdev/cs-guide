---
order: 9
---

# 软件包管理

Linux 发行版通过包管理器来安装、更新和卸载软件。

## 包管理器概览

| 发行版 | 包格式 | 底层工具 | 高层工具 |
|--------|--------|---------|---------|
| Debian/Ubuntu | `.deb` | `dpkg` | `apt` |
| RHEL/CentOS/Fedora | `.rpm` | `rpm` | `dnf` / `yum` |
| Arch Linux | — | `pacman` | `pacman` |
| openSUSE | `.rpm` | `rpm` | `zypper` |

本章以 **Ubuntu/Debian** 的 `apt` 为主。

## apt — Debian 系包管理

### 更新软件源

```bash
# 更新软件包索引（从源服务器获取最新列表）
sudo apt update

# 升级所有可升级的包
sudo apt upgrade

# 更彻底的升级（可能安装/删除依赖）
sudo apt full-upgrade
```

### 搜索与安装

```bash
# 搜索软件包
apt search nginx
apt search python | grep "^python3"

# 查看包信息
apt show nginx

# 安装
sudo apt install nginx
sudo apt install -y nginx    # 自动确认（脚本中使用）

# 安装多个包
sudo apt install git curl vim htop
```

### 卸载

```bash
# 保留配置文件
sudo apt remove nginx

# 完全移除（包括配置文件）
sudo apt purge nginx

# 自动移除不再需要的依赖
sudo apt autoremove

# 清除下载的 .deb 缓存
sudo apt clean
```

### 其他操作

```bash
# 查看已安装的包
apt list --installed
apt list --installed | grep python

# 查看哪些包可升级
apt list --upgradable

# 检查依赖
apt depends nginx
apt rdepends nginx
```

## dpkg — 底层工具

```bash
# 安装本地 .deb 文件
sudo dpkg -i package.deb

# 卸载
sudo dpkg -r package

# 查看已安装
dpkg -l

# 查看文件属于哪个包
dpkg -S /bin/ls

# 列出包安装的文件
dpkg -L nginx
```

当 `dpkg -i` 报依赖错误时，用以下命令修复：

```bash
sudo apt install -f
```

## 安装策略实战

```bash
# 1. 优先 apt 安装（自动处理依赖）
sudo apt install redis-server

# 2. 官方仓库没有，添加 PPA
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.12

# 3. 下载 .deb 手动安装
wget https://example.com/package.deb
sudo dpkg -i package.deb
sudo apt install -f           # 处理缺失依赖

# 4. 源码编译安装
sudo apt install build-essential
./configure
make
sudo make install
```

## 其他发行版速查

### RHEL/Fedora (dnf)

```bash
sudo dnf install nginx        # 安装
sudo dnf remove nginx         # 卸载
sudo dnf search nginx         # 搜索
sudo dnf update               # 更新
```

### Arch Linux (pacman)

```bash
sudo pacman -S nginx          # 安装
sudo pacman -R nginx          # 卸载
sudo pacman -Ss nginx         # 搜索
sudo pacman -Syu              # 全面更新
```

## 本章小结

```bash
# 日常三连
sudo apt update          # 1. 更新索引
sudo apt upgrade         # 2. 升级软件
sudo apt install pkg     # 3. 安装新软件
```

| 操作 | apt 命令 |
|------|---------|
| 更新索引 | `sudo apt update` |
| 安装 | `sudo apt install pkg` |
| 卸载 | `sudo apt remove pkg` |
| 搜索 | `apt search keyword` |
| 查看信息 | `apt show pkg` |
| 修复依赖 | `sudo apt install -f` |

## 练习

1. 用 `apt search` 找到一个有趣的小工具（如 `cowsay` 或 `figlet`），安装它
2. 用 `apt show` 查看已安装的某个包的详细信息
3. 用 `dpkg -L` 查看 `ls` 命令属于哪个包
4. 安装 `htop` 并用它替代 `top` 来查看进程
5. 练习卸载一个包并自动清理依赖
