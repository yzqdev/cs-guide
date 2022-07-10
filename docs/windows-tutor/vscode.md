# vscode技巧

## terminal输入cls不生效

导航：`File> Preferences>Keyboard Shortcuts``
搜索`workbench.action.terminal.clear``
 然后设置快捷键为`ctrl+q`

```text
"terminal.integrated.windowsEnableConpty": false
```

## vscode不显示powershell在terminal中的字体

参考：<https://github.com/Microsoft/vscode/issues/15119#issuecomment-259248159>
这点需要在vscode的用户设定里设置字体才可以。
打开用户设置，加上这两句话：

```text
# 指定终端的字体 (注意名字要完全符合font名）
"terminal.integrated.fontFamily": "MesloLGL NF",

# 指定终端字大小
"terminal.integrated.fontSize": 14
```
