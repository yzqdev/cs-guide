# cmdlet

cmdlet发音为:”command-lets”，它是在PowerShell环境中使用的轻量级命令。 这些是在PowerShell环境中实现特殊功能的特殊命令。cmdlet遵循“动词-名词”模式，例如：`set-childItem`。

Windows PowerShell运行时在命令行中提供的自动化脚本的上下文中调用这些命令。 它还通过Windows PowerShell应用程序编程接口API以编程方式调用它们。

## 1. Cmdlet是什么？

PowerShell中的`cmdlet`执行操作，并将Microsoft .NET Framework对象返回到管道中的下一个命令。 `Cmdlet`可以接收对象作为输入，也可以将结果输出为对象，这使其适合用作管道中的接收者。

如果编写`cmdlet`，则必须实现一个`cmdlet`类，该类派生自两个专门的`cmdlet`基类之一。 派生类必须：

- 声明一个属性，该属性将派生类标识为`cmdlet`。
- 定义用属性标识的公共属性，这些属性将公共属性标识为`cmdlet`的参数。
- 要处理记录，它会覆盖一种或多种输入处理方法。
- 可以使用`Import-Module cmdlet`来直接加载包含该类的程序集，或者可以创建一个主机应用程序，该主机应用程序使用`System.Management.Automation.Runspaces.Initialsessionstate` API来加载该程序集。 两种方法都提供对`cmdlet`功能的编程访问和命令行访问。

## 2. Cmdlet术语

Windows PowerShell cmdlet中经常使用的术语如下：

**Cmdlet属性**
Windows PowerShell定义了几个用于向cmdlet添加通用功能的属性。 它包括cmdlet属性，该属性将Microsoft .NET框架类标识为cmdlet类。

**Cmdlet参数**
它提供了允许cmdlet访问输入的机制。参数可以直接从命令行接受输入，也可以接受通过管道传递给cmdlet的对象。

**参数集**
在同一命令中使用一组参数来执行特定操作。 PowerShell中的cmdlet可以具有多个参数集，但是每个参数集必须至少具有一个唯一参数。

Windows PowerShell使用参数集允许编写一个cmdlet，该cmdlet可以针对不同的方案执行不同的操作。 参数集让我们可以根据参数向用户公开不同的参数； 它返回用户指定的不同信息。

**动态参数**
动态参数会在运行时添加到cmdlet。 通常，当另一个参数的参数设置为特定值时，会将这些参数添加到cmdlet。

**输入处理方式**
输入处理方法允许cmdlet执行输入处理，预处理和后处理的操作。 cmdlet用来处理其记录的那些方法将作为输入接收。 输入处理方法包括`System.Management.Automation.Cmdlet.EndProcessing`方法，`System.Management.Automation.Cmdlet.ProcessRecord`方法和`System.Management.Automation.Cmdlet.BeginProcessing`方法。

**事务**
逻辑命令组被视为单个任务。 如果组中的任何命令失败，任务将自动失败。 用户可以选择拒绝或接受在事务中执行的操作。 Windows PowerShell版本2.0中引入了对事务的支持。

## 3. Cmdlet与命令有什么区别？

cmdlet在以下方面与其他命令Shell程序环境中的命令不同：

- 通常，命令不支持其解析，输出格式或错误表示。 Windows PowerShell运行时处理这三种(解析，输出格式或错误表示)。
- cmdlet从管道而不是从字符流处理输入对象，并且`cmdlet`将输出对象传递到管道。
- Cmdlet一次处理一个对象，因此它们是面向记录的。
- Cmdlet是.NET Framework类的实例，因此它们不是独立的可执行文件。

PowerShell基本cmdlet命令如下表所示：

| 命令                      | 描述(说明)                                             |
| ------------------------- | ------------------------------------------------------ |
| `Add-content`             | 将内容添加到指定的文件。                               |
| `Add-Computer`            | 将本地计算机添加到域或工作组。                         |
| `Add-History`             | 用于在历史记录中添加命令。                             |
| `Add-jobTrigger`          | 将作业触发器添加到计划的作业中。                       |
| `Add-member`              | 将自定义方法或属性添加到PowerShell对象的实例。         |
| `Add-type`                | 将Microsoft .NET框架类添加到Windows PowerShell会话中。 |
| `Clear-Content`           | 删除文件的内容，但不删除该文件。                       |
| `Clear-History`           | 从命令历史记录中删除条目。                             |
| `Clear-Item`              | 清除项目或变量的值，但不清除该项目或变量。             |
| `Clear-ItemProperty`      | 清除属性的值，但不删除该属性。                         |
| `Clear-Variable`          | 删除变量的值。                                         |
| `Clear-Host`              | 清除宿主程序的显示。                                   |
| `Copy-ItemProperty`       | 将值和属性从指定位置复制到另一个位置。                 |
| `Copy-Item`               | 将项目从一个位置复制到另一个位置。                     |
| `Complete-Transaction`    | 提交活动事务。                                         |
| `Compare-object`          | 比较两组对象。                                         |
| `Disable-PSBreakpoint`    | 禁用当前控制台中的断点。                               |
| `Enable-PSBreakpoint`     | 在当前控制台中启用断点。                               |
| `Find-package`            | 在可用的软件包源中查找软件包。                         |
| `Find-script`             | 用于查找脚本。                                         |
| `ForEach-Object`          | 对输入对象集合中的每个项目执行操作。                   |
| `Get-Alias`               | 获取当前会话的别名。                                   |
| `Get-childItem`           | 在一个或多个指定位置获取项目和子项目。                 |
| `Get-Command`             | 用于获取所有命令                                       |
| `Get-Content`             | 在指定位置获取文件的内容。                             |
| `Get-Date`                | 用于获取当前日期和时间。                               |
| `Get-ExecutionPolicy`     | 获取当前会话的执行策略。                               |
| `Get-Help`                | 显示有关PowerShell命令和概念的信息。                   |
| `Get-History`             | 显示在当前会话期间输入的命令列表。                     |
| `Get-host`                | 获取代表当前宿主程序的对象。                           |
| `Get-InstalledScript`     | 获取为当前用户安装的脚本。                             |
| `Get-Item`                | 在特定位置获取项目或文件。                             |
| `Get-ItemProperty`        | 获取特定项目的属性。                                   |
| `Get-Location`            | 显示当前的工作位置。                                   |
| `Get-PSBreakpoint`        | 获取在当前会话中设置的断点。                           |
| `Get-Package`             | 通过使用程序包管理来显示所有已安装程序包的列表。       |
| `Get-Process`             | 获取在本地或远程计算机上运行的进程。                   |
| `Get-Service`             | 在本地或远程计算机上获取服务。                         |
| `Get-Transaction`         | 获取当前活动的事务。                                   |
| `Get-Variable`            | 在当前控制台中获取变量。                               |
| `Install-package`         | 用于安装一个或多个软件包。                             |
| `Install-script`          | 用于安装脚本。                                         |
| `Invoke-commands`         | 在本地和远程计算机上执行命令。                         |
| `Move-Item`               | 用于将项目从一个位置移动到另一位置。                   |
| `Move-ItemProperty`       | 用于将项目的属性从一个位置移动到另一位置。             |
| `New-alias`               | 创建一个新别名。                                       |
| `New-Item`                | 创建一个新项目。                                       |
| `New-ItemProperty`        | 为项目创建一个新属性并设置其值。                       |
| `New-Service`             | 创建一个新的Window服务。                               |
| `New-variable`            | 创建一个新变量。                                       |
| `Read-Host`               | 从控制台读取一行输入。                                 |
| `Remove-computer`         | 从其域中删除本地计算机。                               |
| `Remove-Item`             | 删除特定项目。                                         |
| `Remove-ItemProperty`     | 从项目中删除属性及其值。                               |
| `Remove-job`              | 删除Windows PowerShell的后台作业。                     |
| `Remove-PSBreakpoint`     | 从当前控制台删除该断点。                               |
| `Remove-variable`         | 删除具有其值的变量。                                   |
| `Rename-computer`         | 用于重命名计算机。                                     |
| `Restart-Service`         | 停止并启动一项或多项服务。                             |
| `Restart-computer`        | 用于在本地和远程计算机上重新启动Windows操作系统。      |
| `Resume-job`              | 用于重新启动挂起的作业。                               |
| `Save-Help`               | 它用于下载最新的帮助文件并将其保存到文件系统目录。     |
| `Save-packages`           | 用于将软件包保存到本地计算机，而无需安装它们。         |
| `Save-Script`             | 用于保存脚本。                                         |
| `Select-string`           | 用于在字符串或文件中查找文本。                         |
| `Send-MailMessage`        | 用于发送电子邮件。                                     |
| `Set-Alias`               | 在当前Windows PowerShell中创建或更改cmdlet的别名。     |
| `Set-content`             | 将内容写入文件中。                                     |
| `Set-Date`                | 更改系统时间。                                         |
| `Set-Item`                | 将项目的值更改为命令中指定的值。                       |
| `Set-ItemProperty`        | 更改或创建项目属性的值。                               |
| `Set-Location`            | 用于将当前工作位置设置为特定位置。                     |
| `Set-PSBreakpoint`        | 在命令，行或变量上设置断点。                           |
| `Set-ScheduledJob`        | 更改计划的作业。                                       |
| `Set-Service`             | 停止，启动和挂起服务，并更改其属性。                   |
| `Set-variable`            | 设置变量的值。                                         |
| `Show-command`            | 在图形命令窗口中创建Windows PowerShell命令。           |
| `Sort-Object`             | 按属性值对对象进行排序。                               |
| `Start-Job`               | 启动Windows PowerShell的后台作业。                     |
| `Start-Process`           | 在本地计算机上启动或启动更多进程。                     |
| `Start-services`          | 启动一个或多个已停止的服务。                           |
| `Start-transaction`       | 启动事务。                                             |
| `Stop-Computer`           | 关闭本地和远程计算机。                                 |
| `Stop-Job`                | 停止Windows PowerShell的后台作业。                     |
| `Stop-Process`            | 停止一个或多个进程。                                   |
| `Stop-Services`           | 停止一个或多个正在运行的服务。                         |
| `Suspend-jobs`            | 暂时停止工作流程作业。                                 |
| `Suspend-Service`         | 挂起或暂停一个或多个正在运行的服务。                   |
| `Undo-transaction`        | 回滚活动事务。                                         |
| `Uninstall-module`        | 用于卸载模块。                                         |
| `Uninstall-Package`       | 卸载一个或多个软件包。                                 |
| `Unregister-ScheduledJob` | 删除本地计算机上的计划作业                             |
| `Update-Help`             | 用于下载并在计算机上安装最新的帮助文件。               |
| `Write-Output`            | 将特定对象沿管道发送到下一个命令。                     |

## cmd和powershell的对比

| 作用         | cmd命令 | powershell命令 |
| ------------ | ------- | -------------- |
| 打印字符     | echo    | Write-Output   |
| 进入路径     | cd      | Set-Location   |
| 获取指令路径 | no      | Get-Command    |
|获取文件列表|ls|Get-ChildItem|
