# 字体推荐

- Microsoft YaHei Mono
- Consolas
- Cascadia Code [连字]
- Menlo
- Source Code Pro
- Monaco
- Hack
- JetBrains Mono[连字]
- Fira Code[连字]
- Droid Sans Mono
- Ubuntu mono
- <https://github.com/be5invis/Sarasa-Gothic>

## vscode指定中英文字体设置

在font-family属性中，第一个字体填写“Fira Code”，第二个字体填写“微软雅黑”，保存设置后，重新启动vscode，可以看到字体已经生效了

```json
{
    "editor.fontFamily": "'Fira Code','微软雅黑','Microsoft YaHei Mono',Monoca,'Source Code Pro','Cascadia Code',Consolas,monospace",
    "editor.inlayHints.fontFamily": "Monoca,'微软雅黑',Consolas, 'Courier New', monospace",
    "editor.codeLensFontFamily": "Fira Code,'微软雅黑'，Monaco",
    "markdown.preview.fontFamily": "Fira Code,'微软雅黑',-apple-system, BlinkMacSystemFont, 'Segoe WPC', 'Segoe UI', system-ui, 'Ubuntu', 'Droid Sans', sans-serif",
    "workbench.colorTheme": "One Dark Pro Monokai Darker",
    "debug.console.fontFamily": "Fira Code, '微软雅黑'",
    "scm.inputFontFamily": "Fira Code, '微软雅黑'",
    "terminal.integrated.fontFamily": "Fira Code, '微软雅黑'",
}
```

```text
the quick fox jumped over the lazy dog
An
```
