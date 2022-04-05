# 安装zsh和插件

## zsh/oh-my-zsh

```bash
  sudo pacman -S zsh
  或者
  sudo apt install zsh
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
  # 更改默认shell
  chsh -s /bin/zsh
  # 必备插件安装

  #zsh-autosuggestions自动补全
  git clone https://github.com/zsh-users/zsh-completions ~/.oh-my-zsh/custom/plugins/zsh-completions

#zsh-syntax-highlighting 命令有语法高亮效果
  git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting
# 自动提示插件
  git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions

  vim ~/.zshrc
  # edit plugins & save

  #设置随机主题,喜欢再改
  ZSH_THEME=random
  # 添加插件
  plugins=(git zsh-syntax-highlighting docker docker-compose zsh-autosuggestions zsh-completions extract)

  autoload -U compinit && compinit
```

## 主题推荐

<https://github.com/ohmyzsh/ohmyzsh/wiki/Themes>

我的主题: jtriley

![j](https://user-images.githubusercontent.com/49100982/108254869-8d8a7480-716c-11eb-8857-ee82b1fe4023.jpg)

我的主题: amuse
![a](https://user-images.githubusercontent.com/49100982/108254748-78ade100-716c-11eb-8f61-0a2bec4f671c.jpg)

我的主题: gnzh

![a](https://user-images.githubusercontent.com/49100982/108254837-882d2a00-716c-11eb-9f49-3b5e6e62eb52.jpg)

我的主题: junkfood

![a](https://user-images.githubusercontent.com/49100982/108254874-8e230b00-716c-11eb-90ea-e4f66c9a3dd6.jpg)

我的主题: agnoster

![a](https://user-images.githubusercontent.com/49100982/108254745-777cb400-716c-11eb-800a-a8cfa612253f.jpg)

一个需要自行安装的主题
<https://github.com/romkatv/powerlevel10k>

## 插件推荐

### git

```text
gaa = git add --all
gcmsg = git commit -m
ga = git add
gst = git status
gp = git push
```

### last-working-dir

此插件的作用是下一次打开终端时定位到之前的目录下，是一个很好用的插件

### extract

提供一个 extract 命令，以及它的别名 x。功能是：一！键！解！压！你知道tar的四种写法吗？我也不知道，所以我装了这个。从今以后 tar, gz, zip, rar 全部使用 extract 命令解压，再也不用天天查 cheatsheet 啦！

### rand-quote

提供一条 quote 命令，显示随机名言。和fortune的作用差不多，但是我感觉fortune上面大多是冷笑话，还是quote的内容比较有意思。

当然这种东西很少有人会主动去按的。所以你可以在你的zshrc里面的最后一行加上quote，实现每次打开shell显示一条名言的效果～

再进一步，安装一个cowsay，把quote | cowsay放到zshrc的最后一行。于是每次打开终端你就可以看到一头牛对你说(自己加)

### themes

提供一条 theme 命令，用来随时手动切换主题。在想要尝试各种主题的时候很实用，不需要一直改 zshrc 然后重载

### gitignore

提供一条 gi 命令，用来查询 gitignore 模板。比如你新建了一个 python 项目，就可以用

```bash
gi python > .gitignore 
```

来生成一份 gitignore 文件。

### zsh_reload

提供一个 src 命令，重载 zsh。对于经常折腾 zshrc 的我，这条命令非常实用

### git-open

提供一个 git-open 命令，在浏览器中打开当前所在 git 项目的远程仓库地址。

### z

提供一个 z 命令，在常用目录之间跳转。类似 autojump，但是不需要额外安装软件

接着是 oh-my-zsh 自带的，其他一些功能强大的实用工具。

## 1. vi-mode

vim输入模式，非常强大，不用多说。

## 2. per-directory-history

开启之后在一个目录下只能查询到这个目录下的历史命令。按 Ctrl+g 开启/关闭。对我来说很实用，但是不一定所有人都喜欢，可以考虑一下自己是否真的需要。

## 3. command-not-found

当你输入一条不存在的命令时，会自动查询这条命令可以如何获得。

## 4. safe-paste

像我这样的懒人，经常会从网上复制各种脚本。但是复制的命令有可能并不就是我要的，可能还需要改一改。但是往往我复制了几行脚本，粘贴到 zsh 里，就发现它直接运行了。这真是非常危险。

这个插件的功能就是：当你往 zsh 粘贴脚本时，它不会被立刻运行。给了我这种懒人修改别人脚本的机会。

## 5. colored-man-pages

给你带颜色的 man 命令。

## 6. sudo

apt 忘了加 sudo？开启这个插件，双击 Esc，zsh 会把上一条命令加上 sudo 给你。

## 7. history-substring-search

一般人会在 zsh 中绑定 history-search-backward 与 histor-search-forward 两个功能。

```text
bindkey '^P' history-search-backward
bindkey '^N' history-search-forward
```

这样子，就可以在输入一个命令，比如 git 之后，按 Ctrl-P 与 Ctrl-N 在以 git为前缀的历史记录中浏览，非常方便。

但是这个做法有一个问题，就是这个功能只考虑输入的第一个单词。也就是说，如果之前输入了 git status, git commit, git push 等等命令，那么我输入 "git s" 再 Ctrl-P，并不会锁定到 "git status", 而是会在所有以 git 开头的历史命令中循环。

这个插件的功能就是实现了一对更好用的 history-search-backward 与 histor-search-forward ，解决了上面所说的问题。开启之后，需要绑定按键：

```text
bindkey '^P' history-substring-search-up
bindkey '^N' history-substring-search-down
```

这样子就可以以自己输入的所有内容为前缀，进行历史查找了。

然后下面是需要单独安装的：

## 1. [zplug](https://github.com/zplug/zplug)

zsh 的插件管理器，类似 vim 的 vundle，把你需要的所有插件写到 zshrc 里，然后运行 zplug install 就可以安装这些插件。就像这样：

```bash
if [[ -f ~/.zplug/init.zsh ]] {
  source ~/.zplug/init.zsh

  zplug "zsh-users/zsh-syntax-highlighting"
  zplug "zsh-users/zsh-autosuggestions"
  zplug "supercrabtree/k"
  zplug "denisidoro/navi"
  zplug "MichaelAquilina/zsh-you-should-use"
  zplug "changyuheng/zsh-interactive-cd"
  zplug "SleepyBag/zsh-confer"

  zplug "Powerlevel9k/powerlevel9k", from:github, as:theme, if:"[[ $ZSH_THEME_STYLE == 9k ]]"
  zplug "denysdovhan/spaceship-prompt", use:spaceship.zsh-theme, from:github, as:theme, if:"[[ $ZSH_THEME_STYLE == spaceship ]]"
  zplug "caiogondim/bullet-train.zsh", use:bullet-train.zsh-theme, from:github, as:theme, if:"[[ $ZSH_THEME_STYLE == bullet ]]"
  zplug "skylerlee/zeta-zsh-theme", from:github, as:theme, if:"[[ $ZSH_THEME_STYLE == zeta ]]"

  if ! zplug check --verbose; then
      echo 'Run "zplug install" to install'
  fi
  # Then, source plugins and add commands to $PATH
  zplug load
}
```

这个工具不仅可以用来装 zsh 插件，事实上它可以用来自动安装任何你认为有必要的插件、主题、脚本甚至二进制程序。但是对于非 zsh 插件的程序，在安装之前要先看看 zplug 的文档，搞清楚如何安装。

## 2. [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)

shell 命令的代码高亮。你没有理由拒绝高亮。

## 3. [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)

在输入命令的过程中根据你的历史记录显示你可能想要输入的命令，按 tab 补全。

不过 tab 键似乎与 zsh 的补全有冲突，所以我改成了 ctrl-y 直接运行命令，关于如何修改快捷键，项目主页上也有写
