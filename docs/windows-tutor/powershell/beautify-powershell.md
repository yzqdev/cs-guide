# powershell美化

## **改造PowerShell**

默认的PowerShell并不美观，仅仅是将原来“傻大黑”变成了“傻大蓝”。（由于我的PowerShell已经改造过了所以我这里就没有办法截图了）我们的做法是在PowerShell里面加一个PowerLine，然后剩下的，在Terminal中配置。

### 安装posh-git

```powershell
PowerShellGet\Install-Module posh-git -Scope CurrentUser -Force
```

### 安装PSReadLine

```powershell
Install-Module -Name PowerShellGet -Force
```

### 安装terminal-icons

[github地址](https://github.com/devblackops/Terminal-Icons)

```powershell
Install-Module -Name Terminal-Icons -Repository PSGallery
```

然后在`$profile`加入

```powershell
Import-Module -Name Terminal-Icons
```

### 安装oh-my-posh

### linux安装

<https://ohmyposh.dev/docs/installation/linux>

### windows安装

地址[https://ohmyposh.dev/](https://ohmyposh.dev/)  
推荐在windows商店下载oh-my-sh或者在[https://github.com/JanDeDobbeleer/oh-my-posh/releases](https://github.com/JanDeDobbeleer/oh-my-posh/releases)下载`install-amd64.exe`自行安装

然后在`$profile`添加

```shell
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\negligible.omp.json"|Invoke-Expression
```

安装PowerLine的方法很简单，我们要先安装oh-my-posh，首先打开一个PowerShell，输入

```powershell
Install-Module posh-git -Scope CurrentUser
https://ohmyposh.dev/
```

如果你使用管理员权限打开PowerShell并且想把oh-my-posh安装到所有用户，则输入

```powershell
Install-Module posh-git
 
```

**如果你的电脑里没有安装Git，在输入**`**Import-Module posh-git**`**会报错，解决方法是**[**安装Git**](https://git-scm.com/)**或者把这一行去掉。**

但是这次使用`Import-Module`的指令，再次启动PowerShell就会发现没有效果，这是因为这些指令仅限于本次会话的PowerShell有效，因此，若要使这一效果在每次启动的时候都有效，那就要将其添加到启动脚本中。

在PowerShell中输入`kate $profile` ，然后输入以下内容，保存。如果你没有安装kate，则使用`notepad $profile`。

```powershell
Import-Module posh-git
 
```

如果提示禁止执行脚本之类的错误信息，请将脚本执行策略更改为`RemoteSigned`。具体方法为使用具有管理员权限的PowerShell，然后输入

```powershell
Set-ExecutionPolicy RemoteSigned
```

这样，在每次PoweShell打开的时候都能启用PowerLine主题。

可是这样，PowerShell打开的时候仍有乱码（或者说，有违和感），这是因为没有给你使用的字体链接表情，乱码的地方其实就是表情符号。

我喜欢的oh-my-posh主题 `negligible` `pure` `ys`
`paradox` `powerlevel10k_classic`, `powerlevel10k_lean`

> 一个修改后的negligible主题

```json
{
  "$schema": "https://raw.githubusercontent.com/JanDeDobbeleer/oh-my-posh/main/themes/schema.json",
  "blocks": [
    {
      "alignment": "left",
      "segments": [
        {
          "foreground": "cyan",
          "style": "powerline",
          "template": "{{ if .WSL }}WSL at {{ end }}{{.Icon}}",
          "type": "os"
        },
        {
          "foreground": "cyan",
          "properties": {
            "style": "full"
          },
          "style": "plain",
          "template": " {{ .Path }} ",
          "type": "path"
        },
        {
          "foreground": "#F1502F",
          "properties": {
            "fetch_status": true
          },
          "style": "plain",
          "template": ":: {{ .HEAD }}{{ .BranchStatus }}{{ if .Staging.Changed }} \uf046 {{ .Staging.String }}{{ end }}{{ if and (.Working.Changed) (.Staging.Changed) }} |{{ end }}{{ if .Working.Changed }} \uf044 {{ .Working.String }}{{ end }} ",
          "type": "git"
        }
      ],
      "type": "prompt"
    },
    {
      "alignment": "right",
      "segments": [
        {
          "foreground": "red",
          "style": "plain",
          "template": "| root ",
          "type": "root"
        },
        {
          "foreground": "#06A4CE",
          "style": "powerline",
          "template": "| \ue798 {{ if .Error }}{{ .Error }}{{ else }}{{ .Full }}{{ end }} ",
          "type": "dart"
        },
        {
          "foreground": "#6CA35E",
          "style": "powerline",
          "template": "| \ue718 {{ if .PackageManagerIcon }}{{ .PackageManagerIcon }} {{ end }}{{ .Full }} ",
          "type": "node"
        },
        {
          "foreground": "#4584b6",
          "properties": {
            "display_mode": "context",
            "fetch_virtual_env": true
          },
          "style": "plain",
          "template": "| \ue235 {{ .Venv }} ",
          "type": "python"
        },
        {
          "type": "dotnet",
          "style": "powerline",
          "foreground": "#00ffff",
          "template": "| \uE77F {{ .Full }} "
        },
        {
          "type": "flutter",
          "style": "powerline",
          "foreground": "#1389fd",
          "template": "| \ue28e {{ if .Error }}{{ .Error }}{{ else }}{{ .Full }}{{ end }} "
        },
        {
          "type": "java",
          "style": "powerline",
          "foreground": "#ce2c00",
          "template": "| \uE738 {{ .Full }}"
        },
        {
          "foreground": "lightGreen",
          "style": "plain",
          "template": "| {{ .CurrentDate | date .Format }} ",
          "type": "time"
        }
      ],
      "type": "prompt"
    },
    {
      "alignment": "left",
      "newline": true,
      "segments": [
        {
          "foreground": "lightGreen",
          "foreground_templates": [
            "{{ if gt .Code 0 }}red{{ end }}"
          ],
          "properties": {
            "always_enabled": true
          },
          "style": "powerline",
          "template": "\u279c ",
          "type": "exit"
        }
      ],
      "type": "prompt"
    }
  ],
  "version": 2
}
```
