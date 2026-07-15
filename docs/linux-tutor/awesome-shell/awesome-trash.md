---
index: 5
---
# 安全删除方案 — 用 trash 代替 rm

> `rm -rf` 是 Linux 中最危险的命令之一。本文提供一种安全方案：将 `rm` 替换为 `mv`，把文件移动到回收站目录，并定期自动清理。

## 一、方案原理

核心思路：在 Shell 中定义一个 `rm` 函数，将文件**移动**到家目录下的 `.trash` 文件夹，而非真正删除。同时，每次执行时自动清理超过 30 天的旧文件。

## 二、配置步骤

### 1. 创建回收站目录

```bash
cd ~ && mkdir -p .trash
chmod 777 .trash
```

### 2. 配置 Shell 函数

**Bash 用户**（编辑 `~/.bashrc`）：

```bash
# rm transform — 安全删除
function rm() {
    # 自动清理 30 天前的回收站文件
    now=$(date +%s)
    for s in $(ls --indicator-style=none "$HOME/.trash/"); do
        dir_name=${s//_/-}
        dir_time=$(date +%s -d "$dir_name" 2>/dev/null)
        if [ "$dir_time" -eq 0 ] || [ $((now - dir_time)) -gt 2592000 ]; then
            echo "🗑️  清理过期回收站: $dir_name"
            /bin/rm -rf "$HOME/.trash/$s"
        fi
    done

    # 如果没有参数，提示用法
    if [ -z "$1" ]; then
        echo "用法: rm <文件或目录>"
        return
    fi

    # 将文件移动到回收站
    prefix=$(date +%Y_%m_%d)
    hour=$(date +%H)
    mkdir -p "$HOME/.trash/$prefix/$hour"
    echo "🚮 正在移动到回收站: $1"
    mv "$1" "$HOME/.trash/$prefix/$hour/"
}
```

**Zsh 用户**（编辑 `~/.zshrc`）：

```bash
# rm transform — 安全删除
function rm() {
    # 自动清理 30 天前的回收站文件
    now=$(date +%s)
    for s in $(ls --indicator-style=none "$HOME/.trash/"); do
        dir_name=${s//_/-}
        dir_time=$(date +%s -d "$dir_name" 2>/dev/null)
        if [[ "$dir_time" -eq 0 ]] || [[ $((now - dir_time)) -gt 2592000 ]]; then
            echo "🗑️  清理过期回收站: $dir_name"
            /bin/rm -rf "$HOME/.trash/$s"
        fi
    done

    if [[ -z "$1" ]]; then
        echo '用法: rm <文件或目录>'
        return
    fi

    prefix=$(date +%Y_%m_%d)
    hour=$(date +%H)
    mkdir -p "$HOME/.trash/$prefix/$hour"
    echo "🚮 正在移动到回收站: $1"
    mv "$1" "$HOME/.trash/$prefix/$hour/"
}
```

### 3. 刷新配置

```bash
source ~/.bashrc   # Bash
source ~/.zshrc    # Zsh
```

## 三、使用说明

### 日常使用

```bash
# 删除文件（实际移动到回收站）
rm a.txt
# 输出: 🚮 正在移动到回收站: a.txt to /root/.trash

# 删除目录
rm mydir/
```

### 强制删除（跳过回收站）

当需要真正删除时，使用系统的 `rm` 命令：

```bash
# 清空回收站
/usr/bin/rm -rf ~/.trash/*

# 删除特定文件（不经过回收站）
/bin/rm -rf important_file
```

## 四、自动清理机制

脚本每次执行 `rm` 时，会自动清理 **30 天前** 放入回收站的文件：

- 回收站目录结构：`~/.trash/YYYY_MM_DD/HH/`
- 清理条件：目录名对应的日期超过 30 天
- 无需额外配置定时任务

## 五、优缺点对比

| 方案 | 优点 | 缺点 |
|------|------|------|
| 原生 `rm` | 简单直接 | 误删不可恢复 |
| 本方案 trash | 可恢复，自动清理 | 参数 `-rf` 会被当作文件名 |
| `safe-rm` | 专业工具 | 需要额外安装 |
| `trash-cli` | 功能完整 | 需要额外安装 |

## 六、进阶方案

### 使用 trash-cli（推荐）

如果需要更完善的功能，建议安装 `trash-cli`：

```bash
# 安装
sudo apt install trash-cli        # Ubuntu
sudo pacman -S trash-cli          # Arch

# 使用
trash-put file.txt                # 移到回收站
trash-list                        # 列出回收站
trash-restore                     # 恢复文件
trash-empty                       # 清空回收站
trash-empty 30                    # 删除 30 天前的文件
```

## 参考

- <http://www.linuxde.net/2013/02/11915.html>
- [trash-cli 项目](https://github.com/andreafrancia/trash-cli)