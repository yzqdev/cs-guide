
## scoop地址


https://scoop.sh/#/

# scoop用法

## 安装

要先设置环境变量`USERSCOOP`为`D:\scoop` 然后运行下面的命令

```powershell

# 下面这行必须添加
$env:SCOOP='D:\scoop'

irm get.scoop.sh | iex
```

## 修改路径

-  用户安装的程序和scoop本身位于`C:\Users<user>\scoop`。
- 全局安装的程序（–global）位于`C:\ProgramData\scoop`

可以通过环境变量更改这些设置。具体步骤如下

```powershell
$env:SCOOP='D:\scoop'
[Environment]::SetEnvironmentVariable('USERSCOOP', $env:SCOOP, 'User')

$env:SCOOP_GLOBAL='E:\GlobalScoopApps'
[Environment]::SetEnvironmentVariable('SCOOP_GLOBAL', $env:SCOOP_GLOBAL, 'Machine')
```
## 仓库

一个好用的仓库
https://github.com/chawyehsu/dorado

小公举仓库
https://github.com/kodybrown/scoop-nirsoft
## 一些命令

```powershell
  # 找不到软件？添加软件库
scoop bucket add <bucketname>
# 搜索
scoop search ssh

# 更新scoop
scoop update

# 更新一个软件

scoop update curl
# 更新所有
scoop update *

 
# 设置全局代理
scoop config proxy 127.0.0.1:7890
# 取消全局代理
scoop config rm proxy
 
```

## 问题
系统找不到指定的路径。

请查看下面的注册表路径是否正确

```
HKEY_CURRENT_USER\SOFTWARE\Microsoft\Command Processor
```
## 一些软件

- 7zip
- aria2
- curl
- fd
- grep
- hugo-extended
- lazygit
- oh-my-posh
- onefetch
- quarkus-cli
- perl
- winfetch
- wixtoolset
- gsudo
- gitui
- watchexec
- fselect
- pueue
- grex
- procs
- dust
- lsd
- busybox
- scoop install main/clink
- scoop install extras/scoop-completion
- geek uninstaller
- croc

### 软件

- electerm
- krita
- inkscape
- blender
- dupeguru  重复文件查找工具

### 开发工具

- maven
- kotlin
- jdk
- nodejs
- nvm
- kate
- nginx
- jd-gui
- https://github.com/ipinfo/cli
- nmap
- potplayer
- cmake


## rust工具

- ☑️使用 `bat` 替换 `cat`
- ☑️使用 `bottom` 替换 `top` 和 `htop`
- ☑️使用 `du` 替换 `dust`
- ☑️使用 `fd` 替换 `find`
- ☑️使用 `gitui` 替换 `lazygit`
- ☑️使用 `lsd` 替换 `ls`
- ☑️使用 `lsd --tree` 替换 `tree`
- ☑️使用 `ripgrep` 替换 `grep`
- ☑️使用 `sd` 替换 `sed`
- ☑️使用 `tealdeer` 替换 `tldr` 和 `man`
- ☑️使用 `zoxide` 替换 `cd` 和 `z.lua`