---
order: 0
---

# AutoHotkey 完整教程 — 目录

> 一份从零到精通的 AutoHotkey v2 学习路线，覆盖热键、窗口自动化、GUI、COM/DLL 调用等核心能力。

---

## 入门篇

| 序号 | 文件 | 内容 |
|------|------|------|
| 00 | [目录与导航](#) | 本文件 |
| 01 | `01-setup.md` | 安装 AHK v2、编辑器配置、第一个脚本 |
| 02 | `02-syntax.md` | 表达式与命令、注释、行延续、代码块 |
| 03 | `03-variables.md` | 变量赋值、字符串、数字、布尔、对象类型 |
| 04 | `04-operators.md` | 算术、比较、逻辑、字符串、位运算、三元运算符 |
| 05 | `05-control-flow.md` | if/else、三元、loop、for-in、while、switch、break/continue |
| 06 | `06-functions.md` | 函数定义、参数、返回值、闭包、变参函数、回调 |
| 07 | `07-strings.md` | 拼接、子串、格式化、StrReplace、StrSplit、转换 |
| 08 | `08-arrays-and-objects.md` | Array、Map、嵌套结构、遍历、对象属性与方法 |

## 热键与自动化篇

| 序号 | 文件 | 内容 |
|------|------|------|
| 09 | `09-hotkeys.md` | 热键定义、修饰符、键名表、上下文热键、禁用/启用 |
| 10 | `10-mouse.md` | 鼠标热键、Click、MouseMove、拖拽、滚轮 |
| 11 | `11-hotstrings.md` | Hotstrings 自动替换、自动扩展、选项、触发条件 |
| 12 | `12-windows.md` | WinActivate、WinClose、WinWait、窗口匹配、窗口列表 |
| 13 | `13-controls.md` | ControlSend、ControlClick、获取控件文本、UI 自动化 |
| 14 | `14-send.md` | SendInput/SendPlay/SendText、特殊键、发送模式差异 |
| 15 | `15-clipboard.md` | A_Clipboard 读写、剪贴板监控、等待剪贴板变化 |

## 进阶篇

| 序号 | 文件 | 内容 |
|------|------|------|
| 16 | `16-files.md` | FileRead/FileWrite、FileSelect、INI 操作、文件遍历 |
| 17 | `17-processes.md` | Run/RunWait、Process、进程检测、命令行参数 |
| 18 | `18-timers.md` | SetTimer、定时器管理、回调函数、异步模式 |
| 19 | `19-gui.md` | Gui 创建、控件添加、事件绑定、布局与样式 |
| 20 | `20-dll-and-com.md` | DllCall、ComObject、WinAPI 调用、Excel/浏览器自动化 |
| 21 | `21-regex.md` | RegExMatch、RegExReplace、常用模式、捕获组 |
| 22 | `22-error-handling.md` | try/catch/finally、Error 对象、调试技巧、OutputDebug |

## 工程实践篇

| 序号 | 文件 | 内容 |
|------|------|------|
| 23 | `23-script-organization.md` | #Include、库函数、脚本结构、模块化设计 |
| 24 | `24-practical-examples.md` | 10+ 实战脚本：窗口管理、文本处理、效率工具等 |
| 25 | `25-v1-vs-v2.md` | 语法对比、迁移策略、常见陷阱、兼容层 |

---

**建议学习顺序**: 01→08 基础语法，09→15 热键自动化（AHK 核心），16→22 进阶能力，23→25 工程实践。

**版本说明**: 本教程基于 **AutoHotkey v2** 编写。AHK v2 是当前官方推荐版本，语法更现代、更一致。如需 v1 相关知识请参考第 25 章。
