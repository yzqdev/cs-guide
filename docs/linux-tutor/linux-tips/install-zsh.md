# Linux 安装 ZSH 与 Oh My Zsh

## 一、安装 ZSH

```bash
# Arch/Manjaro
sudo pacman -S zsh

# Debian/Ubuntu
sudo apt install zsh

# macOS
brew install zsh
```

## 二、安装 Oh My Zsh

```bash
# 官方方式
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 国内用户（使用镜像）
sh -c "$(curl -fsSL https://gitee.com/mirrors/oh-my-zsh/raw/master/tools/install.sh)"
```

## 三、设置默认 Shell

```bash
# 查看当前 Shell
echo $SHELL

# 切换默认 Shell 为 ZSH
chsh -s /bin/zsh

# 重新登录后生效，或直接执行
zsh
```

## 四、安装必备插件

### 1. 语法高亮

```bash
# 官方
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git \
  ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting

# 国内镜像
git clone https://gitclone.com/github.com/zsh-users/zsh-syntax-highlighting.git \
  ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting
```

### 2. 自动建议

```bash
# 官方
git clone https://github.com/zsh-users/zsh-autosuggestions.git \
  ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions

# 国内镜像
git clone https://gitclone.com/github.com/zsh-users/zsh-autosuggestions.git \
  ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions
```

### 3. 自动补全

```bash
# 官方
git clone https://github.com/zsh-users/zsh-completions \
  ~/.oh-my-zsh/custom/plugins/zsh-completions

# 国内镜像
git clone https://gitclone.com/github.com/zsh-users/zsh-completions.git \
  ~/.oh-my-zsh/custom/plugins/zsh-completions
```

## 五、配置插件

编辑 `~/.zshrc`：

```bash
vim ~/.zshrc
```

找到 `plugins=(git)` 这一行，修改为：

```bash
plugins=(
  git
  zsh-syntax-highlighting
  zsh-autosuggestions
  zsh-completions
  docker
  docker-compose
  extract
  sudo
  colored-man-pages
  command-not-found
)
```

重新加载配置：

```bash
source ~/.zshrc
# 或使用内置命令
src
```

## 六、主题推荐

### 内置主题

| 主题 | 预览 |
|------|------|
| `jtriley` | 简洁，带 Git 状态 |
| `amuse` | 彩色，带时间戳 |
| `gnzh` | 带系统信息 |
| `junkfood` | 彩色图标 |
| `agnoster` | 经典，信息丰富 |

```bash
# 在 ~/.zshrc 中修改主题
ZSH_THEME="agnoster"
```

### 第三方主题

**Powerlevel10k** — 最流行的 ZSH 主题：

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

# 在 ~/.zshrc 中设置
ZSH_THEME="powerlevel10k/powerlevel10k"
```

更多主题：[github.com/ohmyzsh/ohmyzsh/wiki/Themes](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)

## 七、插件功能详解

### 内置插件

| 插件 | 功能 |
|------|------|
| `git` | Git 命令别名（`gaa`=git add all, `gcmsg`=git commit -m, `gst`=git status）|
| `extract` | 一键解压所有格式（`x filename.tar.gz`）|
| `sudo` | 双击 Esc 在命令前加 sudo |
| `colored-man-pages` | man 命令彩色高亮 |
| `command-not-found` | 输入错误命令时提示如何安装 |
| `vi-mode` | Vim 键位模式 |
| `safe-paste` | 粘贴时不自动执行 |

### 实用插件

| 插件 | 功能 |
|------|------|
| `last-working-dir` | 打开终端时自动进入上次目录 |
| `rand-quote` | 显示随机名言 |
| `themes` | 提供 `theme` 命令随时切换主题 |
| `gitignore` | 提供 `gi` 命令生成 `.gitignore` 模板 |
| `zsh_reload` | 提供 `src` 命令重载 ZSH |
| `z` | 在常用目录间快速跳转 |
| `git-open` | 在浏览器中打开当前 Git 远程仓库 |

### 插件管理器

**zplug** — ZSH 的 Vundle：

```bash
if [[ -f ~/.zplug/init.zsh ]]; then
  source ~/.zplug/init.zsh

  zplug "zsh-users/zsh-syntax-highlighting"
  zplug "zsh-users/zsh-autosuggestions"
  zplug "supercrabtree/k"
  zplug "denisidoro/navi"

  if ! zplug check --verbose; then
    echo 'Run "zplug install" to install'
  fi
  zplug load
fi
```

## 八、常用快捷键

安装 `history-substring-search` 插件后，可以绑定：

```bash
# 在 ~/.zshrc 中添加
bindkey '^P' history-substring-search-up
bindkey '^N' history-substring-search-down
```

这样在输入命令前缀后，按 `Ctrl+P` / `Ctrl+N` 可以在历史命令中搜索。