---
author: HelloGitHub
---
# Linux 常用包 — 命令行效率工具

> 我第一次使用 Linux 服务器时，漆黑的界面上只有一行白色字母，末尾还有一个孤独闪烁的光标。我小心翼翼地输入第一个命令 `ls`，然后重复输入了好几遍界面依旧是漆黑一片。这种体验就像在漆黑的夜空，天上连一颗星星都没有...
>
> 后来在漫长学习命令行操作的过程中，遇到了一些让我相见恨晚的命令行工具，它们就像雨夜的一道闪电，瞬间照亮了整个夜空。

---

## 一、系统信息展示

### 1. neofetch — 系统信息展示

**替代**：`uname`、`hostname` 等

支持 150+ 种操作系统，以美观的方式展示系统信息。

```bash
# 安装
sudo apt install neofetch          # Debian/Ubuntu
brew install neofetch              # macOS

# 使用
neofetch
```

**项目地址**：[github.com/dylanaraps/neofetch](https://github.com/dylanaraps/neofetch)

### 2. screenfetch — 另一种系统信息展示

```bash
sudo apt install screenfetch
screenfetch
```

---

## 二、命令替代品

### 3. bat — 代替 cat

**语言**：Rust

支持语法高亮、行号显示、Git 改动展示的文件查看工具。

```bash
# 安装
sudo apt install bat               # Debian/Ubuntu
brew install bat                   # macOS

# 使用
cat README.md                     # 原始 cat
bat README.md                     # 带语法高亮

# 常用参数
bat --show-all                    # 显示所有不可见字符
bat -A                            # 同上
bat -n file.txt                   # 显示行号
bat -l python file.py             # 指定语言高亮
bat --theme=ansi                  # 指定主题
```

**项目地址**：[github.com/sharkdp/bat](https://github.com/sharkdp/bat)

### 4. httpie — 代替 curl

**语言**：Python

人性化的 HTTP 命令行客户端，返回结果高亮显示。

```bash
# 安装
sudo apt install httpie            # Debian/Ubuntu
brew install httpie                # macOS
pip install httpie                 # pip

# 使用
http https://api.example.com       # GET 请求
http POST https://api.example.com name=hello  # POST 请求
http PUT https://api.example.com/1 name=world
http DELETE https://api.example.com/1

# 常用参数
http -v https://example.com        # 详细输出
http -h https://example.com        # 只显示请求头
http -b https://example.com        # 只显示响应体
http --json POST ...               # JSON 格式
http -f POST ... name=value        # 表单格式
```

**项目地址**：[github.com/httpie/httpie](https://github.com/httpie/httpie)

### 5. htop — 代替 top

**语言**：C

交互式进程管理工具，比 top 更直观。

```bash
# 安装
sudo apt install htop              # Debian/Ubuntu
brew install htop                  # macOS

# 使用
htop                               # 启动
htop -u username                   # 只显示指定用户进程
htop -p 1234,5678                  # 只监控指定 PID

# 交互快捷键
# F1 帮助
# F2 设置
# F3 搜索
# F4 过滤
# F5 树形显示
# F6 排序
# F9 杀死进程
# F10 退出
```

**项目地址**：[github.com/htop-dev/htop](https://github.com/htop-dev/htop)

### 6. duf — 代替 df

**语言**：Go

更美观的磁盘使用情况查看工具。

```bash
# 安装
sudo apt install duf

# 使用
duf                                # 查看所有挂载点
duf /home                          # 查看指定目录
duf --only local                   # 只显示本地磁盘
duf --hide-fs tmpfs                # 隐藏 tmpfs
```

### 7. ncdu — 代替 du

**语言**：C

交互式磁盘使用分析工具。

```bash
# 安装
sudo apt install ncdu

# 使用
ncdu                               # 分析当前目录
ncdu /home                         # 分析指定目录
ncdu -x /                          # 不跨文件系统
```

---

## 三、开发效率工具

### 8. fd — 代替 find

**语言**：Rust

更快的文件查找工具，默认忽略隐藏文件和 .gitignore。

```bash
# 安装
sudo apt install fd-find           # Debian/Ubuntu
brew install fd                    # macOS

# 使用
fd "pattern"                       # 查找文件名包含 pattern 的文件
fd -e txt                          # 查找所有 .txt 文件
fd -e md -e txt                    # 查找 .md 和 .txt 文件
fd -d 3 "pattern"                  # 只在 3 层内查找
fd -x command                      # 对每个结果执行命令
fd -H "pattern"                    # 包含隐藏文件
```

**项目地址**：[github.com/sharkdp/fd](https://github.com/sharkdp/fd)

### 9. ripgrep (rg) — 代替 grep

**语言**：Rust

超快的文本搜索工具，递归搜索默认忽略 .gitignore。

```bash
# 安装
sudo apt install ripgrep           # Debian/Ubuntu
brew install ripgrep               # macOS

# 使用
rg "pattern"                       # 递归搜索当前目录
rg "pattern" /path/                # 搜索指定目录
rg -i "pattern"                    # 忽略大小写
rg -l "pattern"                    # 只显示文件名
rg -c "pattern"                    # 显示匹配次数
rg -g "*.py" "pattern"             # 只搜索 .py 文件
rg -A 5 "pattern"                  # 显示匹配后 5 行
rg -B 5 "pattern"                  # 显示匹配前 5 行
rg -C 5 "pattern"                  # 显示匹配前后各 5 行
```

**项目地址**：[github.com/BurntSushi/ripgrep](https://github.com/BurntSushi/ripgrep)

### 10. fzf — 模糊搜索

**语言**：Go

通用命令行模糊搜索工具，可以搜索文件、历史命令、进程等。

```bash
# 安装
sudo apt install fzf               # Debian/Ubuntu
brew install fzf                   # macOS

# 使用
fzf                                # 搜索当前目录文件
cat file.txt | fzf                # 搜索文件内容

# 集成到 Shell（在 .bashrc / .zshrc 中添加）
source /usr/share/fzf/key-bindings.bash
source /usr/share/fzf/completion.bash

# 快捷键（配置后）
# Ctrl+T 搜索文件
# Ctrl+R 搜索历史命令
# Ctrl+P 搜索进程
```

**项目地址**：[github.com/junegunn/fzf](https://github.com/junegunn/fzf)

### 11. fsql — 用 SQL 搜索文件

**语言**：Go

```bash
# 安装
go install github.com/kashav/fsql

# 使用
fsql "SELECT * FROM ./ WHERE name LIKE '%test%'"
fsql "SELECT path, size FROM ./ WHERE size > 1024 ORDER BY size DESC"
```

**项目地址**：[github.com/kashav/fsql](https://github.com/kashav/fsql)

---

## 四、数据库工具

### 12. mycli — MySQL 增强客户端

**语言**：Python

带语法高亮和自动补全的 MySQL 客户端。

```bash
# 安装
sudo apt install mycli             # Debian/Ubuntu
brew install mycli                 # macOS
pip install mycli                  # pip

# 使用
mycli -u root -p password database
mycli mysql://user:pass@localhost/db

# 功能
# - 自动补全 SQL 关键字
# - 语法高亮
# - 智能提示
# - 支持 SQL 历史
```

**项目地址**：[github.com/dbcli/mycli](https://github.com/dbcli/mycli)

### 13. pgcli — PostgreSQL 增强客户端

```bash
pip install pgcli
pgcli -h localhost -u user -d database
```

### 14. iredis — Redis 增强客户端

```bash
pip install iredis
iredis
```

---

## 五、容器与监控

### 15. ctop — 容器监控

**语言**：Go

类似 top 的 Docker 容器监控工具。

```bash
# 安装
sudo apt install ctop              # 或下载二进制
brew install ctop

# 使用
ctop                               # 启动
ctop -a                            # 显示所有容器（包括停止的）
```

**项目地址**：[github.com/bcicen/ctop](https://github.com/bcicen/ctop)

### 16. lazydocker — Docker 管理 UI

**语言**：Go

带终端 UI 的 Docker 管理工具。

```bash
# 安装
brew install lazydocker            # macOS
# 或者下载二进制文件

# 使用
lazydocker                         # 启动管理界面
```

**项目地址**：[github.com/jesseduffield/lazydocker](https://github.com/jesseduffield/lazydocker)

### 17. lazydocker 的姊妹 — lazygit

**语言**：Go

带终端 UI 的 Git 客户端。

```bash
# 安装
sudo apt install lazygit
brew install lazygit

# 使用
lazygit                            # 启动
```

**项目地址**：[github.com/jesseduffield/lazygit](https://github.com/jesseduffield/lazygit)

---

## 六、性能与压测

### 18. gpustat — GPU 监控

**语言**：Python

```bash
pip install gpustat
gpustat                            # 查看 GPU 状态
gpustat --watch                    # 实时监控
```

**项目地址**：[github.com/wookayin/gpustat](https://github.com/wookayin/gpustat)

### 19. ali — 压测工具

**语言**：Go

实时展示压力测试结果的命令行工具。

```bash
# 安装
go install github.com/nakabonne/ali

# 使用
ali http://localhost:8080
ali -d 30s http://localhost:8080   # 持续 30 秒
ali -c 50 http://localhost:8080    # 50 并发
```

**项目地址**：[github.com/nakabonne/ali](https://github.com/nakabonne/ali)

---

## 七、终极 Shell 体验

### 20. oh-my-zsh — 终极 Shell

**Star 数**：128k+ ⭐

ZSH 的框架，让命令行前所未有的好用。

```bash
# 安装 ZSH
sudo apt install zsh               # Debian/Ubuntu
brew install zsh                   # macOS

# 安装 oh-my-zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 配置文件
vim ~/.zshrc

# 切换默认 Shell
chsh -s /bin/zsh
```

**常用插件**：

```bash
# 在 ~/.zshrc 中设置
plugins=(git docker kubectl autojump zsh-autosuggestions zsh-syntax-highlighting)

# 安装自动补全插件
git clone https://github.com/zsh-users/zsh-autosuggestions \
  $ZSH_CUSTOM/plugins/zsh-autosuggestions

# 安装语法高亮插件
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git \
  $ZSH_CUSTOM/plugins/zsh-syntax-highlighting
```

**项目地址**：[github.com/ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)

---

## 八、快速安装脚本

```bash
# 一键安装常用工具（Debian/Ubuntu）
sudo apt install -y \
    neofetch \
    htop \
    bat \
    httpie \
    fd-find \
    ripgrep \
    fzf \
    tree \
    ncdu \
    duf \
    lazygit \
    mycli

# macOS
brew install \
    neofetch \
    htop \
    bat \
    httpie \
    fd \
    ripgrep \
    fzf \
    tree \
    ncdu \
    duf \
    lazygit \
    mycli
```