---
order: 2
---
# Visual Studio 配置

[官方文档](https://docs.microsoft.com/zh-cn/visualstudio/)

## 常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+K, Ctrl+F` | 格式化选中的代码 |
| `Ctrl+K, Ctrl+D` | 格式化整个文档 |
| `Ctrl+R, Ctrl+G` | 删除未使用的 using |
| `Ctrl+Shift+B` | 生成解决方案 |
| `F5` | 启动调试 |
| `Ctrl+F5` | 不调试直接运行 |
| `F9` | 切换断点 |
| `F10` | 逐过程 |
| `F11` | 逐语句 |
| `Ctrl+Shift+F` | 在文件中查找 |
| `Ctrl+Q` | 快速搜索（搜索所有菜单/选项） |
| `Alt+Shift+F10` | 导入命名空间 |
| `Ctrl+R, Ctrl+R` | 重命名符号 |
| `Ctrl+M, Ctrl+M` | 展开/折叠代码块 |

## 项目配置

### 格式化配置

配置文件仓库：[my-configs](https://github.com/yzqdev/my-configs.git)

推荐在项目根目录放置 `.editorconfig` 文件统一代码风格。

### 常用项目配置

- 配置 `.editorconfig` 和 `.gitignore`
- 配置自动补全：工具 → 选项 → 文本编辑器 → C# → 高级
- 删除字符后显示完整列表 → 打上勾
- 启用导航到反编译源（工具 → 选项 → 文本编辑器 → C# → 高级 → 支持导航到反编译源）

### 调试设置

要在调试停止时自动关闭控制台：

```
工具 → 选项 → 调试 → 调试停止时自动关闭控制台
```

## 插件推荐

### 代码编辑与格式化

| 插件 | 说明 | 链接 |
|------|------|------|
| **CodeMaid** | 代码清理和格式化工具（排序 using、整理代码） | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=SteveCadwallader.CodeMaidVS2022) |
| **CSharpier** | 自动化 C# 代码格式化工具 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=csharpier.CSharpier) |
| **Roslynator 2022** | 代码分析、重构和修复（500+ 规则） | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=josefpihrt.Roslynator2022) |
| **Format Document On Save** | 保存时自动格式化文档 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=mynkow.FormatdocumentonSave) |
| **Spell Checker** | 拼写检查（支持注释和字符串） | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=EWoodruff.VisualStudioSpellCheckerVS2022andLater) |

### XAML / WPF

| 插件 | 说明 | 链接 |
|------|------|------|
| **XAML Styler** | XAML 代码格式化工具 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamXavalon.XAMLStyler2022) |
| **Avalonia for VS 2022** | Avalonia UI 开发工具 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.AvaloniaVS) |
| **WPF-UI** | WPF UI 设计工具 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=lepo.WPF-UI) |

### 生产力工具

| 插件 | 说明 | 链接 |
|------|------|------|
| **Visual Studio IntelliCode** | AI 辅助代码补全 | 内置 |
| **Viasfora** | 代码着色增强（括号匹配、关键字高亮） | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=TomasRestrepo.Viasfora) |
| **Indent Rainbow** | 不同层级缩进不同颜色 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=chingucoding.IndentRainbow) |
| **Rainbow Braces** | 彩虹色括号 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.RainbowBraces) |
| **File Icons** | 文件图标美化 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.FileIcons) |
| **VSColorOutput64** | 输出窗口着色 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=MikeWard-AnnArbor.VSColorOutput64) |
| **Codist** | C# 编码体验增强（代码高亮、导航栏改进） | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=wmj.Codist) |
| **Visual Commander** | 自动化脚本扩展 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=SergeyVlasov.VisualCommander) |

### 调试与诊断

| 插件 | 说明 | 链接 |
|------|------|------|
| **Solution Error Visualizer 2022** | 解决方案错误可视化 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=VisualStudioPlatformTeam.SolutionErrorVisualizer2022) |
| **ILSpy 2022** | 反编译 .NET 程序集 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=SharpDevelopTeam.ILSpy2022) |
| **Visual Studio Show Inline Errors** | 编辑器内显示错误/警告 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=AlexanderGayko.ShowInlineErrors) |

### 数据与数据库

| 插件 | 说明 | 链接 |
|------|------|------|
| **EF Core Power Tools** | EF Core 逆向工程、模型可视化 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=ErikEJ.EFCorePowerTools) |
| **EntityFramework Reverse POCO Generator** | EF Core POCO 代码生成 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=SimonHughes.EntityFrameworkReversePOCOGenerator) |
| **ResX Manager** | 资源文件管理 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=TomEnglert.ResXManager) |

### 项目模板

| 插件 | 说明 | 链接 |
|------|------|------|
| **Template Studio** | 微软官方项目模板（WinUI/WPF/UWP） | [GitHub](https://github.com/microsoft/TemplateStudio) |
| **Project Reunion** | Windows 应用 SDK 模板 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=ProjectReunion.MicrosoftProjectReunion) |

### 其他

| 插件 | 说明 | 链接 |
|------|------|------|
| **PowerShell Tools** | PowerShell 扩展支持 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=AdamRDriscoll.PowerShellToolsforVisualStudio2017-18561) |
| **Power Mode** | 打字特效（粒子效果） | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=BigEgg.PowerMode) |
| **Markdown Editor** | 增强的 Markdown 编辑器 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.MarkdownEditor2) |
| **Code Converter (VB ↔ C#)** | VB 和 C# 代码互转 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=SharpDevelopTeam.CodeConverter) |
| **REST Client** | 在 VS 中发送 HTTP 请求 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.RestClient) |
| **Word Highlight** | 选中关键词高亮所有相同词 | [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=TrungKienPhan.WordHighlight-18439) |
| **Open Command Line** | 快速打开命令行 | VS 内置扩展 |

## .editorconfig 推荐配置

```ini
# 代码风格统一配置文件
root = true

[*]
indent_style = space
indent_size = 4
charset = utf-8
insert_final_newline = true
trim_trailing_whitespace = true

[*.cs]
indent_size = 4
csharp_new_line_before_open_brace = all
csharp_preferred_modifier_order = public, private, protected, internal, static, extern, new, virtual, abstract, sealed, override, readonly, unsafe, volatile, async
dotnet_sort_system_directives_first = true

[*.xml]
indent_size = 2

[*.md]
trim_trailing_whitespace = false
```
