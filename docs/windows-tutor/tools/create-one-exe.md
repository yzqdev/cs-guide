---
order: 4
---
 
# 开发单个 exe 桌面应用程序

:::tip 三大分类

**第一类：C# / VB（.NET 生态）**  
框架：WPF、WinForm、MAUI、WinUI 3  
界面绚丽、功能强大、成熟稳定，上手难度相对较小。

**第二类：原生 / 跨平台 C++**  
框架：Qt、JUCE、wxWidgets、GTK  
性能好、跨平台，但开发难度较大，学习曲线陡峭。

**第三类：Web 技术包装**  
框架：Electron、Tauri、NW.js、Neutralinojs  
使用 HTML + CSS + JavaScript，跨平台，开发成本低，界面绚丽，缺点是性能开销较大。

:::

---

## 技术全景图

| 技术栈 | 语言 | 跨平台 | 性能 | 难度 | 产物体积 |
|--------|------|--------|------|------|---------|
| WPF | C# | ❌ (仅 Windows) | ⭐⭐⭐⭐ | ⭐⭐ | 小 |
| WinForm | C# | ❌ (仅 Windows) | ⭐⭐⭐ | ⭐ | 小 |
| MAUI | C# | ✅ Windows/macOS/iOS/Android | ⭐⭐⭐ | ⭐⭐⭐ | 中等 |
| WinUI 3 | C# / C++ | ❌ (仅 Windows) | ⭐⭐⭐⭐ | ⭐⭐⭐ | 小 |
| Flutter Desktop | Dart | ✅ 全平台 | ⭐⭐⭐⭐ | ⭐⭐⭐ | 中等 |
| Electron | JS/TS | ✅ 全平台 | ⭐⭐ | ⭐⭐ | 大 (~100MB+) |
| Tauri | Rust + JS | ✅ 全平台 | ⭐⭐⭐⭐ | ⭐⭐⭐ | 小 (~5MB) |
| Qt | C++ / Python | ✅ 全平台 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 中等 |
| JavaFX | Java / Kotlin | ✅ 全平台 | ⭐⭐⭐ | ⭐⭐⭐ | 中等 |
| PySide6 | Python | ✅ 全平台 | ⭐⭐⭐ | ⭐⭐ | 中等 |
| Wails | Go + JS | ✅ 全平台 | ⭐⭐⭐⭐ | ⭐⭐ | 小 |
| Fyne | Go | ✅ 全平台 | ⭐⭐⭐ | ⭐⭐⭐ | 中等 |

---

---

## WPF

> Windows Presentation Foundation — .NET 原生桌面 UI 框架

### 概述

WPF 是一个与分辨率无关的 UI 框架，使用基于矢量的呈现引擎，构建用于利用现代图形硬件。WPF 提供一套完善的应用程序开发功能，这些功能包括 Extensible Application Markup Language (XAML)、控件、数据绑定、布局、二维和三维图形、动画、样式、模板、文档、媒体、文本和版式。WPF 属于 .NET，因此可以生成整合 .NET API 其他元素的应用程序。

### 优点

- **XAML 声明式 UI**：界面与逻辑分离，设计师和开发者可协作
- **数据绑定强大**：支持 `INotifyPropertyChanged`、`ICommand`，MVVM 模式成熟
- **丰富的控件库**：DataGrid、ListView、TreeView 等开箱即用
- **矢量渲染**：高 DPI 自适应，界面清晰
- **支持硬件加速**：利用 DirectX 渲染

### 缺点

- 仅支持 Windows
- 学习曲线比 WinForm 陡峭（需要理解依赖属性、路由事件等概念）
- 默认样式老旧，需要自定义样式或第三方库（MaterialDesignToolkit、MahApps）

### 适用场景

- Windows 企业级桌面应用
- 工业控制 / 医疗 / 金融等行业的客户端
- 需要复杂数据展示和交互的应用

相关库：

- [MaterialDesignInXamlToolkit](https://github.com/MaterialDesignInXAML/MaterialDesignInXamlToolkit)
- [MahApps.Metro](https://github.com/MahApps/MahApps.Metro)
- [Prism](https://github.com/PrismLibrary/Prism)（MVVM 框架）

---

## WinForm

> Windows Forms — 最古老的 .NET 桌面框架

### 概述

其实就是对 MFC 的封装，沿用了"拖拖拽拽"的可视化设计器方式，可以快速搭出一个界面。但如果功能太复杂，维护会很困难。WinForm 通过 GDI+ 绘制界面，不支持硬件加速。

### 优点

- **设计器成熟**：拖拽控件，所见即所得
- **上手极快**：适合初学者和小工具
- **生态丰富**：大量第三方控件（DevExpress、Telerik、ComponentOne）
- **对一个 exe 友好**：可以做到单文件发布

### 缺点

- 不支持高 DPI（高分屏下模糊）
- 界面样式老旧，自定义美化困难
- 不支持硬件加速，复杂动画性能差
- 仅有 Windows 版本

### 适用场景

- 公司内部小工具
- 业务逻辑简单的管理端
- 遗留系统维护

---

## MAUI / Windows App SDK

> .NET Multi-platform App UI — .NET 6+ 的新一代跨平台框架

### 概述

MAUI 是 Xamarin.Forms 的进化版，使用 C# + XAML 一套代码生成 Windows、macOS、iOS、Android 应用。Windows App SDK（WinUI 3）则是 Windows 上最现代的 UI 框架，提供 Win11 风格的原生控件。

### 相关项目

- **Uno Platform**：<https://platform.uno/>  
  在 MAUI 基础上额外支持 WebAssembly 和 Linux，是真正的"一套代码全平台"

- **Avalonia UI**：<https://www.avaloniaui.net/>  
  第三方 WPF 风格跨平台框架，支持 Windows/macOS/Linux，社区活跃，是 WPF 开发者跨平台的首选替代

### 优点

- 真正的跨平台（MAUI、Avalonia）
- 原生性能
- 支持热重载（Hot Reload）
- WinUI 3 有 Win11 风格的全新控件

### 缺点

- MAUI 尚在发展中，部分平台（macOS、Linux）成熟度不如 Windows
- 文档和第三方库不如 WPF 丰富
- WinUI 3 仅限 Windows

---

## Flutter Desktop

> Google 的跨平台 UI 工具包 — 现已支持桌面

### 概述

Google 已经重磅发布了专为 Web、移动和桌面而构建的 Flutter 3.0！将 Flutter 从移动开发框架扩展成可移植框架，使用 Flutter 开发桌面端软件，无需重写代码，使用同一套代码库即可将你的移动应用打包生成 Windows、macOS 和 Linux 桌面端软件。Flutter 似有大一统之势。

[官方文档](https://flutter.dev/multi-platform/desktop)

### 优点

- 一套代码六端（Web、Windows、macOS、Linux、iOS、Android）
- 自绘引擎（Skia / Impeller），不依赖系统控件，界面一致
- 性能接近原生（60fps / 120fps）
- 强大的开发者工具（Hot Reload、DevTools）
- 社区生态快速增长

### 缺点

- 桌面端仍处于 Stable 早期，部分 API 没有桌面优化
- 产物体积较大（~30MB+ 基础运行时）
- Dart 语言相对小众
- 系统原生功能需通过 Platform Channel 调用

### 适用场景

- 移动端已有 Flutter 应用，需要快速覆盖桌面
- 追求跨平台界面一致性
- 中小型桌面工具

---

## Electron / Tauri / NW.js

> 基于 Web 技术的桌面应用方案

### Electron

Electron 是利用 Web 前端技术进行桌面应用开发的一套框架。

若想开发一个兼容多平台的桌面应用，以往常用的技术框架有 wxWidgets、GTK、Qt 等，这些框架受语言限制，且学习成本较高，效率有限。目前一些基于前端技术的 hybrid 框架很流行，且已经在多个领域得到了广泛的应用和验证，比如利用前端技术 + 相应的打包工具可开发适配多平台的应用（PC、微信公众号、小程序、Android、iOS 等）。Electron 就是这样一款框架，为前端技术人员利用 Web 前端技术开发桌面应用带来了可能，开发人员可利用已经掌握的前端技术如 HTML、CSS、JavaScript，以及结合一些前端技术框架：Vue、Angular、React、webpack，加之浏览器渲染引擎、Electron 封装的系统 API 快速实现一款桌面应用的开发，Electron 做了大部分复杂的工作，开发人员只需要专注在核心业务和前端技术本身。同时，通过一定的优化，Electron 可以做到很好的体验。

**知名案例**：VS Code、Slack、Discord、Figma（早期）、Notion、Obsidian

> 见本文档前端相关内容

### Tauri

Tauri 是 Electron 的现代替代方案，使用 Rust 作为后端，系统 WebView 作为渲染引擎。

- **体积小**：安装包约 3~5MB（相比 Electron 的 100MB+）
- **内存低**：比 Electron 节约约 50~70% 内存
- **安全性高**：Rust 后端提供内存安全保证
- **多语言支持**：Rust 后端可调用任何系统 API，前端仍用 HTML/CSS/JS

```bash
# 创建 Tauri 项目
npm create tauri-app@latest
```

文档：<https://tauri.app/>

### NW.js

NW.js 和 Electron 类似，是最早的 Web 桌面方案之一，但社区活跃度不如 Electron。

文档：<https://nwjs.io/>

### 总结对比

| 特性 | Electron | Tauri | NW.js |
|------|----------|-------|-------|
| 核心语言 | JS/TS + Node.js | Rust + JS/TS | JS/TS + Node.js |
| 渲染引擎 | Chromium（完整内置） | 系统 WebView | Chromium（完整内置） |
| 安装包大小 | ~100MB+ | ~3-5MB | ~100MB+ |
| 内存占用 | 高 | 低 | 高 |
| 安全性 | 较低 | 高（CSP + Rust） | 较低 |
| 成熟度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐（快速成长） | ⭐⭐⭐ |

---

## Neutralinojs

> 超轻量级的跨平台桌面应用框架

<https://github.com/neutralinojs/neutralinojs>

Neutralinojs 比 Electron 和 Tauri 更极端——它不捆绑任何浏览器引擎，而是利用系统自带的 WebView，后端也不强制使用特定语言（支持 Node.js、Python、Java 等）。

**特点：**

- 安装包可以小到 2MB
- 可以使用任意后端语言
- 支持 Windows、Linux、macOS
- 不依赖 Node.js（使用轻量的 Neutralinojs Server）

---

## Sciter

> 轻量级嵌入式 UI 引擎，适合资源受限的场景

[https://sciter.com/](https://sciter.com/)

Sciter 使用 HTML/CSS 定义 UI，使用 `script`（类似 JS 的 TIScript / 也支持 JS）做逻辑。体积只有几 MB，比 Chromium 嵌入式方案轻量得多，长期以来被国内许多软件（如某艺、某雷）用于渲染界面。

支持的绑定语言：C/C++、Go、Rust、Python、Delphi、.NET

---

## Wails

> 使用 Go + HTML/CSS/JS 构建漂亮的跨平台桌面应用

[https://github.com/wailsapp/wails](https://github.com/wailsapp/wails)

Wails 是 Go 生态的"Tauri"——后端用 Go，前端用 Web 技术，使用系统 WebView 渲染，打包体积小。

### 优点

- Go 编译快，部署简单（单文件）
- 原生控件利用系统 WebView
- 内存占用低
- Go 后端可以直接调用系统 API，无需 CGO（一定程度）

```bash
# 创建 Wails 项目
wails init -n myproject -t react
wails dev
```

---

## Qt

> Qt 是跨平台 C++ 应用程序开发框架

Qt 是一个跨平台的 C++ 应用程序开发框架。它提供给开发者建立图形用户界面所需的功能，广泛用于开发 GUI 程序，也可用于开发非 GUI 程序。Qt 是完全面向对象的，很容易扩展，并且允许真正地组件编程。Qt 使用标准的 C++ 和特殊的代码生成扩展（称为元对象编译器 Meta Object Compiler, moc）以及一些宏。

最新的版本是 Qt 6，[文档地址](https://doc.qt.io/)

### 语言绑定

Qt 官方支持多种语言的绑定：

| 语言 | 绑定 | 说明 |
|------|------|------|
| C++ | Qt (原生) | 性能最好 |
| Python | PySide6 / PyQt6 | 官方推荐 Python 绑定，效率高 |
| Rust | CXX-Qt / qt.rs | 社区方案，Rust 原生绑定 |
| Go | therecipe/qt | 社区方案，Go 绑定 |

### 优点

- **跨平台**：Windows / macOS / Linux / Android / iOS / 嵌入式
- **性能优秀**：C++ 原生编译
- **组件丰富**：QtWidgets、QtQuick（QML）、QtCharts、Qt3D、QtMultimedia 等
- **工具链完善**：Qt Creator IDE、Qt Designer 可视化设计
- **商业支持**：Qt Company 提供商业许可和技术支持

### 缺点

- 学习曲线陡峭（C++ + MOC + 信号槽机制）
- 商业许可费用高（LGPL 版可用于开源项目）
- 界面默认风格偏老（可通过 QSS 或 QML 改善）
- 编译时间较长

### 适用场景

- 需要高性能的桌面应用（CAD、视频编辑、模拟器）
- 跨平台工业软件
- 嵌入式设备 UI

---

## Unity (UGUI)

> 使用 Unity3D 引擎的 UGUI 框架做桌面开发

Unity3D 不仅限于游戏开发，它的 UGUI 框架同样可以做桌面应用开发。适合需要：

- 复杂 2D/3D 渲染
- 自定义图形和动画
- 跨平台游戏化界面

### 适用场景

- 需要 3D 预览的桌面工具（建模预览器、虚拟展厅）
- 数据可视化大屏
- 教育软件和仿真
- 跨平台游戏

---

## AutoIt

> Windows 自动化脚本语言，也可用来制作简单 GUI

[https://www.autoitscript.com/site/autoit/](https://www.autoitscript.com/site/autoit/)

AutoIt 最初是为了 Windows GUI 自动化测试而生，但它也有 GUI 创建能力（使用 `GUICreate` 等函数）。

**特点：**

- 体积极小，单个 exe 即可运行
- 语法类似 BASIC，学习成本低
- 内置大量 Windows 自动化函数
- 适合制作安装程序、小工具、自动化脚本

---

## Go + Fyne

> 使用 Go 语言开发原生跨平台桌面应用

[https://github.com/fyne-io/fyne](https://github.com/fyne-io/fyne)

Fyne 是 Go 生态中最成熟的桌面 UI 工具包，完全使用 Go 编写，不依赖任何外部运行时。

### 优点

- 纯 Go，编译为单文件，分发简单
- 跨平台（Windows / macOS / Linux / iOS / Android）
- 内置 Material Design 风格
- 支持中文渲染

```go
package main

import "fyne.io/fyne/v2/app"
import "fyne.io/fyne/v2/widget"

func main() {
    a := app.New()
    w := a.NewWindow("Hello")
    w.SetContent(widget.NewLabel("Hello Fyne!"))
    w.ShowAndRun()
}
```

### 缺点

- 控件库不如 Qt 丰富
- 复杂布局实现相对繁琐
- 社区规模中等

---

## PySide6 / PyQt6

> 使用 Python 开发 Qt 应用

PySide 由 Qt 的官方团队——Nokia Qt 进行维护，集成了 Qt 和 Python 的优势。一个 PySide 程序员只需要使用简单的 Python 语言就能够发挥 Qt 的所有功能。PySide 拥有 LGPL 2.1 版授权许可，允许进行免费/开源软件和私有商业软件的开发。Matplotlib、PhotoGrabber、Wing IDE、Lucas Chess、Fminer 等应用程序均使用 PySide 开发，这证明了 PySide 在软件行业的广泛普及和使用。另外，PySide Mobility 工程还允许 Python 访问 Qt Mobile API，这对你进行移动开发是很有帮助的。

### 使用建议

- **PySide6**：官方维护，LGPL 许可，推荐新项目使用
- **PyQt6**：第三方（Riverbank）维护，GPL 许可，商业使用需付费

如果你只是做小型工具，Python + Qt 是最快出效果的组合之一。

```python
import sys
from PySide6.QtWidgets import QApplication, QMainWindow, QPushButton

app = QApplication(sys.argv)
window = QMainWindow()
button = QPushButton("Hello Qt!")
window.setCentralWidget(button)
window.show()
sys.exit(app.exec())
```

---

## Aardio

> 轻量级 Windows 桌面软件开发工具

Aardio 是一个小众的 Windows 桌面软件开发语言/工具。它的特点在于：

- **体积极小**：整个 IDE 只有几十 MB，发布 exe 也很小
- **语法灵活**：类似 Lua + Python + JavaScript 的混合体
- **原生 Win32 API 调用**：几乎可以直接调用所有 Windows 系统 API
- **内置很多库**：HTTP、JSON、加密、压缩、数据库等
- **适合做小工具**：批量处理、系统管理、简单的 CRUD 桌面应用

文档：<https://www.aardio.com/>

---

## JavaFX

> Java 平台的下一代 GUI 框架

JavaFX 是一个开源的下一代客户端应用平台，适用于基于 Java 构建的桌面、移动端和嵌入式系统。它是许多个人和公司的共同努力的成果，目的是为开发丰富的客户端应用提供一个现代、高效、功能齐全的工具包。
JavaFX 是用来替代 AWT、Swing 的库，用于 Java 桌面开发。

### 优点

- 内置 CSS 样式支持，界面设计灵活
- FXML（类似 WPF 的 XAML）分离 UI 和逻辑
- 支持硬件加速（Prism 渲染引擎）
- 丰富的 UI 控件和图表组件
- 跨平台（Windows / macOS / Linux）

### 缺点

- Java 运行时体积较大
- 原生桌面风格偏少
- 社区不如前端活跃

### 构建工具推荐

- [Gluon Scene Builder](https://gluonhq.com/products/scene-builder/)：可视化 FXML 设计器
- [Maven / Gradle](https://openjfx.io/)：使用 `javafx-maven-plugin` 构建

---

## Kotlin Compose Desktop

> JetBrains 打造的现代桌面 UI 框架

Kotlin Compose Desktop 是 JetBrains 基于 Jetpack Compose 技术开发的桌面 UI 框架，使用 Kotlin 语言编写。

### 当前状态

已进入 Beta/Stable 阶段，不再是"还没有消息"了。JetBrains 的许多内部工具（如 YouTrack、Fleet 的部分 UI）已经在使用 Compose Desktop。

### 优点

- Kotlin 语言现代简洁
- 声明式 UI（Compose 范式）
- 跨平台（Windows / macOS / Linux）
- 与 Android Compose 共享 UI 代码
- 开发体验优秀（IntelliJ 全家桶支持）

```kotlin
@Composable
@Preview
fun App() {
    var count by remember { mutableStateOf(0) }
    MaterialTheme {
        Button(onClick = { count++ }) {
            Text("点击次数: $count")
        }
    }
}
```

文档：<https://www.jetbrains.com/lp/compose-multiplatform/>

---

## Delphi / Lazarus

> 经典的 Pascal 桌面开发工具

非常好用的跨平台桌面开发，可是用的人很少，Pascal 语言。

- **Delphi**：商业软件，RAD（Rapid Application Development）理念的代表作，拖拽式设计器极高效
- **Lazarus**：开源免费版，兼容 Delphi 代码，跨平台支持更好

### 特点

- 编译快、运行快
- 原生 Windows / macOS / Linux 支持
- 单 exe 发布（Delphi 尤为擅长）
- 数据库开发方面有强大的组件支持
- 适合快速开发企业内部应用

---

## 其他值得关注的方案

### Python + Tkinter / CustomTkinter

Python 内置的 Tkinter 是最简单的 GUI 方案，适合做非常小的工具。

```python
import tkinter as tk
root = tk.Tk()
tk.Label(root, text="Hello World").pack()
root.mainloop()
```

[CustomTkinter](https://github.com/TomSchimansky/CustomTkinter) 是现代风格的 Tkinter 增强版。

### Rust + egui / slint

Rust 生态的 GUI 方案：

| 框架 | 特点 |
|------|------|
| [egui](https://github.com/emilk/egui) | 即时模式 GUI，轻量，WebAssembly 友好 |
| [Slint](https://slint.dev/) | 声明式 UI，商业友好 |
| [Druid](https://github.com/linebender/druid) | 数据驱动，实验性质 |
| [Iced](https://github.com/iced-rs/iced) | Elixir 风格，跨平台 |

### Go + Gio

<https://gioui.org/> — 纯 Go 的即时模式 GUI 框架，无外部依赖。

### C++ 跨平台备选

| 框架 | 说明 |
|------|------|
| [wxWidgets](https://www.wxwidgets.org/) | "Write once, compile anywhere"，外观像原生 |
| [GTK](https://www.gtk.org/) | Linux 上最流行，C 语言，绑定众多 |
| [JUCE](https://juce.com/) | 音频应用首选，跨平台 |
| [Dear ImGui](https://github.com/ocornut/imgui) | 即时模式 GUI，适合开发工具和调试 UI |

### WebView2 (Edge WebView2)

Windows 上使用系统自带的 Edge WebView2 来渲染 Web 内容，结合 C++/C# 做后端，体积小、性能好。

```csharp
// C# 中使用 WebView2
webView21.CoreWebView2.Navigate("https://www.example.com");
```

文档：<https://learn.microsoft.com/en-us/microsoft-edge/webview2/>

---

## 如何选择？

### 按平台选择

| 目标平台 | 推荐方案 |
|---------|---------|
| 仅 Windows | WPF、WinForm、WinUI 3、Aardio、AutoIt |
| Windows + macOS | MAUI、Avalonia、Flutter、Qt、Tauri |
| Windows + macOS + Linux | Qt、Flutter、JavaFX、Electron、Tauri、PySide6 |
| 全平台（含移动端） | Flutter、MAUI、Qt、Kotlin Compose Multiplatform |

### 按开发者背景选择

| 你的背景 | 推荐方案 |
|---------|---------|
| C# / .NET 开发者 | WPF（仅 Windows）、MAUI / Avalonia（跨平台） |
| 前端开发者（HTML/CSS/JS） | Electron、Tauri、NW.js |
| Python 开发者 | PySide6 / PyQt6、Tkinter、Flet |
| Go 开发者 | Wails、Fyne、Gio |
| Rust 开发者 | Tauri、egui、Slint、Druid |
| Java / Kotlin 开发者 | JavaFX、Kotlin Compose Desktop |
| C++ 开发者 | Qt、wxWidgets、GTK、JUCE |

### 按需求选择

| 需求 | 推荐方案 |
|------|---------|
| 体积越小越好 | Tauri（~5MB）、Neutralinojs（~2MB）、Aardio、Go+Fyne |
| 性能越高越好 | Qt、WPF、C++ 原生 |
| 开发速度越快越好 | Electron、WinForm、Python+Tkinter |
| 界面越花哨越好 | Flutter、Electron、WPF + 第三方主题 |
| 跨平台兼容越好 | Flutter、Qt、Electron |
