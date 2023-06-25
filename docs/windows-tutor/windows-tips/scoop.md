# scoop用法

## 安装

```powershell
irm get.scoop.sh | iex
```

## 修改路径

-  用户安装的程序和scoop本身位于`C:\Users<user>\scoop`。
- 全局安装的程序（–global）位于`C:\ProgramData\scoop`

可以通过环境变量更改这些设置。具体步骤如下

```powershell
$env:SCOOP='E:\UserScoop'
[Environment]::SetEnvironmentVariable('USERSCOOP', $env:SCOOP, 'User')

$env:SCOOP_GLOBAL='E:\GlobalScoopApps'
[Environment]::SetEnvironmentVariable('SCOOP_GLOBAL', $env:SCOOP_GLOBAL, 'Machine')
```

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
```

## 一些软件

- 7zip
- curl
- fd
- grep
- hugo-extended
- lazygit
- oh-my-posh
- onefetch
- sudo
- perl
- winfetch
- wixtoolset