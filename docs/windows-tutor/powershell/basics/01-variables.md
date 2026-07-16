---
order: 1
---

# 变量

PowerShell 中变量以 `$` 开头，由系统自动维护。以下列出 PowerShell 中的自动变量（也称为内置变量），它们在脚本编写中非常常用。

## 变量基础

### 变量命名规则

- 以 `$` 开头，后跟字母、数字、下划线
- 不区分大小写（`$name` 和 `$Name` 是同一个变量）
- 可以包含空格（需用花括号括起来，如 `${my variable}`）

### 变量类型

PowerShell 变量是 .NET 类型，可以显式指定类型：

```powershell
# 自动推断类型
$name = "Alice"     # string
$count = 42         # int
$price = 19.99      # double
$isReady = $true    # bool

# 显式指定类型
[int]$age = 30
[string]$city = "Beijing"
[datetime]$date = "2024-01-01"
```

### 变量作用域

```powershell
# 全局变量
$global:config = "global"

# 脚本变量（仅当前脚本可见）
$script:counter = 0

# 私有变量（仅当前作用域可见）
$private:temp = "secret"

# 局部变量（默认，当前作用域）
$local:data = "local"

# 访问父作用域变量
$script:counter++
```

### 修改变量

```powershell
# 赋值
$var = "value"

# 追加
$var += " append"

# 删除变量
Remove-Variable -Name var

# 测试变量是否存在
Test-Path variable:var
```

## 自动变量列表

自动变量是存储 Windows PowerShell 状态的那些变量。这些变量将包含用户和系统的信息，默认变量，运行时变量和 PowerShell 设置。这些变量可以由 Windows PowerShell 创建和维护。

以下是 PowerShell 中自动变量的列表：

| 编号 | 变量               | 描述                                                                                             |
| ---- | ------------------ | ------------------------------------------------------------------------------------------------ |
| 1    | `$$`               | 此变量用于表示会话接收到的最后一行中的最后一个令牌。                                             |
| 2    | `$?`               | 此变量用于表示最后一个操作的执行状态。如果没有错误，则返回 `True`，否则返回 `False`。            |
| 3    | `$^`               | 此变量用于表示会话接收到的最后一行中的第一个令牌。                                               |
| 4    | `$_`               | 此变量充当 `$PSItem`，它在管道对象中包含当前对象。                                               |
| 5    | `$args`            | 此变量包含未声明参数的值的数组，这些值传递给脚本，函数或脚本块。                                 |
| 6    | `$ConsoleFileName` | 此变量用于表示控制台文件的路径，该文件最近在会话中使用。                                         |
| 7    | `$Error`           | 此变量用于包含代表最新错误的错误对象数组。                                                       |
| 8    | `$Event`           | 此变量用于包含 `PSEventArgs` 的对象。`PSEventArgs` 是用于表示正在处理的事件的对象。              |
| 9    | `$EventSubscriber` | 此变量用于包含 PSEventSubscriber 的对象。该对象包含正在处理的事件的事件订阅者。                  |
| 10   | `$EventArgs`       | 此变量用于包含一个对象，该对象表示第一个事件的参数。                                             |
| 11   | `$false`           | 此变量用于表示 `False`。                                                                         |
| 12   | `$foreach`         | 此变量用于包含 `ForEach` 循环的枚举数。该变量仅在执行 `ForEach` 循环时存在。并在循环完成后删除。 |
| 13   | `$Home`            | 此变量用于表示用户主目录的完整路径。                                                             |
| 14   | `$input`           | 此变量包含一个枚举器，该枚举器枚举传递给该函数的所有输入。它仅适用于脚本块和功能。               |
| 15   | `$Host`            | 此变量包含一个对象，该对象显示 Windows PowerShell 的当前主机应用程序。                           |
| 16   | `$IsLinux`         | 如果当前会话在 Linux 操作系统上运行，则此变量值为 `$True`，否则为 `$False`。                     |
| 17   | `$IsWindows`       | 如果当前会话在 Windows 操作系统上运行，则此变量值为 `$True`，否则为 `$False`。                   |
| 18   | `$IsMacOS`         | 如果当前会话在 MacOS 操作系统上运行，则此变量值为 `$True`，否则为 `$False`。                     |
| 19   | `$null`            | 此变量用于表示 `null` 值或空值。可以使用它来表示脚本和命令中缺少或未定义的值。                   |
| 20   | `$PID`             | 此变量显示进程的 PID，该进程正在托管当前 PowerShell 的会话。                                     |
| 21   | `$PSItem`          | 此变量充当 `$_`，它在管道对象中包含当前对象。                                                    |
| 22   | `$PSHome`          | 此变量表示 Windows PowerShell 安装目录的完整路径。                                               |
| 23   | `$PSVersionTable`  | 此变量用于表示只读哈希表，该哈希表显示有关当前会话中运行的 PowerShell 版本的详细信息。           |
| 24   | `$PWD`             | 此变量用于包含路径对象，该路径对象显示当前目录的完整路径。                                       |
| 25   | `$ShellId`         | 此变量用于表示当前 Shell 的标识符。                                                              |
