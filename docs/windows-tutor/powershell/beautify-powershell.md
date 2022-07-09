# powershell美化

## **改造PowerShell**

默认的PowerShell并不美观，仅仅是将原来“傻大黑”变成了“傻大蓝”。（由于我的PowerShell已经改造过了所以我这里就没有办法截图了）我们的做法是在PowerShell里面加一个PowerLine，然后剩下的，在Terminal中配置。

安装PowerLine的方法很简单，我们要先安装oh-my-posh，首先打开一个PowerShell，输入

```powershell
Install-Module posh-git -Scope CurrentUser
Install-Module oh-my-posh -Scope CurrentUser
```

如果你使用管理员权限打开PowerShell并且想把oh-my-posh安装到所有用户，则输入

```powershell
Install-Module posh-git
Install-Module oh-my-posh
```

这里如果让你允许什么不可信的来源，输入`Y`表示同意即可。

安装完成后，输入

```powershell
Import-Module posh-git
Import-Module oh-my-posh
Set-Theme PowerLine
```

**如果你的电脑里没有安装Git，在输入**`**Import-Module posh-git**`**会报错，解决方法是**[**安装Git**](https://git-scm.com/)**或者把这一行去掉。**

但是这次使用`Import-Module`的指令，再次启动PowerShell就会发现没有效果，这是因为这些指令仅限于本次会话的PowerShell有效，因此，若要使这一效果在每次启动的时候都有效，那就要将其添加到启动脚本中。

在PowerShell中输入`code $profile` ，然后输入以下内容，保存。如果你没有安装VS Code，则使用`notepad $profile`。

```powershell
Import-Module posh-git
Import-Module oh-my-posh
Set-Theme PowerLine
```

如果提示禁止执行脚本之类的错误信息，请将脚本执行策略更改为`RemoteSigned`。具体方法为使用具有管理员权限的PowerShell，然后输入

```powershell
Set-ExecutionPolicy RemoteSigned
```

这样，在每次PoweShell打开的时候都能启用PowerLine主题。

可是这样，PowerShell打开的时候仍有乱码（或者说，有违和感），这是因为没有给你使用的字体链接表情，乱码的地方其实就是表情符号。


我喜欢的oh-my-posh主题 `negligible` `pure` `ys`
`paradox` `powerlevel10k_classic`, `powerlevel10k_lean`