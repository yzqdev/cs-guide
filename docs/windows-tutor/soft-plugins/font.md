# 编程字体推荐

以下是一些适合编程的等宽字体推荐，包含中英文支持和连字特性。

## 推荐字体列表

### 经典字体
- **Consolas** - Windows 默认编程字体，清晰易读
- **Menlo** - macOS 默认编程字体
- **Monaco** - 经典的 macOS 编程字体
- **Source Code Pro** - Adobe 出品的开源等宽字体
- **Droid Sans Mono** - Google 开源字体

### 支持连字（Ligatures）的现代字体
- **Fira Code** - 最流行的连字字体，支持多种编程符号组合
- **JetBrains Mono** - JetBrains 出品，专为开发者设计
- **Cascadia Code** - Microsoft 出品，支持连字和等宽显示
- **Hack** - 开源编程字体，支持连字

### 中英文混合字体
- **Microsoft YaHei Mono** - 微软雅黑等宽版，中英文混排友好
- **Ubuntu Mono** - Ubuntu 系统默认等宽字体
- **Sarasa Gothic (更纱黑体)** - 专为 CJK 设计的等宽字体
  - 项目地址：[GitHub](https://github.com/be5invis/Sarasa-Gothic)

## VS Code 字体配置示例

在 `settings.json` 中配置中英文字体：

```json
{
    "editor.fontFamily": "'Fira Code', '微软雅黑', 'Microsoft YaHei Mono', Monaco, 'Source Code Pro', 'Cascadia Code', Consolas, monospace",
    "editor.inlayHints.fontFamily": "Monaco, '微软雅黑', Consolas, 'Courier New', monospace",
    "editor.codeLensFontFamily": "'Fira Code', '微软雅黑', Monaco",
    "markdown.preview.fontFamily": "'Fira Code', '微软雅黑', -apple-system, BlinkMacSystemFont, 'Segoe WPC', 'Segoe UI', system-ui, 'Ubuntu', 'Droid Sans', sans-serif",
    "workbench.colorTheme": "One Dark Pro Monokai Darker",
    "debug.console.fontFamily": "'Fira Code', '微软雅黑'",
    "scm.inputFontFamily": "'Fira Code', '微软雅黑'",
    "terminal.integrated.fontFamily": "'Fira Code', '微软雅黑'",
    "editor.fontLigatures": true
}
```

## 配置说明

1. **字体顺序**: 按优先级排列，系统会使用第一个可用的字体
2. **连字支持**: 设置 `"editor.fontLigatures": true` 启用连字功能
3. **中英文混排**: 将中文字体（如微软雅黑）放在西文字体之后
4. **fallback**: 最后使用 `monospace` 作为兜底
