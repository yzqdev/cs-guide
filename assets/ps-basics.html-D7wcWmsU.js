import{_ as e,c as n,o as t,d as a}from"./app-CbULZrmi.js";const l={},r=a(`<h1 id="powershell基础" tabindex="-1"><a class="header-anchor" href="#powershell基础"><span>powershell基础</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>powershell和linux bash的比较<a href="http://xahlee.info/powershell/powershell_for_unixer.html" target="_blank" rel="noopener noreferrer">http://xahlee.info/powershell/powershell_for_unixer.html</a></p><p><a href="https://docs.microsoft.com/zh-cn/powershell/" target="_blank" rel="noopener noreferrer">官方文档</a></p></div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><h3 id="推荐使用dotnet-cli" tabindex="-1"><a class="header-anchor" href="#推荐使用dotnet-cli"><span>推荐使用dotnet-cli</span></a></h3><pre><code class="language-powershell">dotnet tool install --global PowerShell
# 更新
dotnet tool update --global PowerShell
</code></pre><h2 id="变量" tabindex="-1"><a class="header-anchor" href="#变量"><span>变量</span></a></h2><p>变量都是以<code>$</code>开头, 是强类型语言, 语言是大小写不敏感的</p><p>提一提变量保护与常量的声明：<code>New-Variable num -Value 100 -Force -Option readonly</code>这样就得到一个受保护的变量<code>$num</code>，如果要销毁它只能通过<code>del $num</code>删除。如果要声明常量则用<code>New-Variable num -Value 100 -Force -Option constant</code></p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>一些基础的变量需要在环境变量里面找: <code>$env:tmp</code>, <code>$env:userprofile</code></p></div><h2 id="打印变量" tabindex="-1"><a class="header-anchor" href="#打印变量"><span>打印变量</span></a></h2><pre><code class="language-powershell">echo $item

Write-Output $item

# 下面这个可以输出带颜色的字
 Write-Host &#39;当前路径&#39;$PWD -ForegroundColor Cyan

</code></pre><h2 id="数组" tabindex="-1"><a class="header-anchor" href="#数组"><span>数组</span></a></h2><h3 id="数组的创建" tabindex="-1"><a class="header-anchor" href="#数组的创建"><span>数组的创建</span></a></h3><p>数组的创建可以通过下面五种方式来创建，在适当的条件下选择适当的方式创建即可</p><pre><code class="language-powershell">$array = 1,2,3,4
$array = 1..4
$array=1,&quot;2017&quot;,([System.Guid]::NewGuid()),(get-date)
$a=@()  # 空数组
$a=,&quot;1&quot; # 一个元素的数组
</code></pre><h3 id="数组的访问" tabindex="-1"><a class="header-anchor" href="#数组的访问"><span>数组的访问</span></a></h3><p>数组的访问和C类似，第一位元素实用下标0来访问即<code>$array[0]</code>,我们来看看ipconfig获取到的数据</p><pre><code class="language-powershell">$ip = ipconfig
$ip[1] # 获取ipconfig第二行的数据
</code></pre><h3 id="数组的判断" tabindex="-1"><a class="header-anchor" href="#数组的判断"><span>数组的判断</span></a></h3><pre><code class="language-powershell">$test -is [array]
</code></pre><h3 id="数组的追加" tabindex="-1"><a class="header-anchor" href="#数组的追加"><span>数组的追加</span></a></h3><pre><code class="language-powershell">$books += &quot;元素4&quot;
</code></pre><h2 id="哈希表" tabindex="-1"><a class="header-anchor" href="#哈希表"><span>哈希表</span></a></h2><h3 id="哈希表的创建" tabindex="-1"><a class="header-anchor" href="#哈希表的创建"><span>哈希表的创建</span></a></h3><pre><code class="language-powershell">$stu=@{ Name = &quot;test&quot;;Age=&quot;12&quot;;sex=&quot;man&quot; }
</code></pre><h3 id="哈希表里存数组" tabindex="-1"><a class="header-anchor" href="#哈希表里存数组"><span>哈希表里存数组</span></a></h3><pre><code class="language-powershell">$stu=@{ Name = &quot;hei&quot;;Age=&quot;12&quot;;sex=&quot;man&quot;;Books=&quot;kali&quot;,&quot;sqlmap&quot;,&quot;powershell&quot; }
</code></pre><h3 id="哈希表的插入与删除" tabindex="-1"><a class="header-anchor" href="#哈希表的插入与删除"><span>哈希表的插入与删除</span></a></h3><pre><code class="language-powershell">$Student=@{}
$Student.Name=&quot;hahaha&quot;
$stu.Remove(&quot;Name&quot;)
</code></pre><h2 id="对象" tabindex="-1"><a class="header-anchor" href="#对象"><span>对象</span></a></h2><p>在powershell中一切都可以视为对象，包罗万象。</p><h3 id="查看对象结构-get-member" tabindex="-1"><a class="header-anchor" href="#查看对象结构-get-member"><span>查看对象结构 (Get-Member)</span></a></h3><p>由于对象在 Windows PowerShell 中扮演了如此重要的角色，因此存在几个用于处理任意对象类型的本机命令。最重要的一个是 Get-Member 命令。</p><pre><code class="language-powershell">Get-Process | Get-Member | Out-Host -Paging
TypeName: System.Diagnostics.Process

Name                           MemberType     Definition
----                           ----------     ----------
Handles                        AliasProperty  Handles = Handlecount
Name                           AliasProperty  Name = ProcessName
NPM                            AliasProperty  NPM = NonpagedSystemMemorySize
PM                             AliasProperty  PM = PagedMemorySize
VM                             AliasProperty  VM = VirtualMemorySize
WS                             AliasProperty  WS = WorkingSet
add_Disposed                   Method         System.Void add_Disposed(Event...
...
</code></pre><p>我们可以通过筛选想要查看的元素，让这个冗长的信息列表更易于使用。Get-Member 命令仅允许你列出属性成员。属性的形式有数种。如果将 Get-Member MemberType 参数设置为值属性，则 cmdlet 将显示任何类型的属性 。生成的列表仍会很长，但较之前更易于管理：</p><pre><code class="language-powershell">PS&gt; Get-Process | Get-Member -MemberType Properties

   TypeName: System.Diagnostics.Process

Name                       MemberType     Definition
----                       ----------     ----------
Handles                    AliasProperty  Handles = Handlecount
Name                       AliasProperty  Name = ProcessName
...
ExitCode                   Property       System.Int32 ExitCode {get;}
...
Handle                     Property       System.IntPtr Handle {get;}
...
CPU                        ScriptProperty System.Object CPU {get=$this.Total...
...
Path                       ScriptProperty System.Object Path {get=$this.Main...
...
</code></pre><h3 id="选择对象部件-select-object" tabindex="-1"><a class="header-anchor" href="#选择对象部件-select-object"><span>选择对象部件 (Select-Object)</span></a></h3><p>可以使用 Select-Object cmdlet 创建新的自定义 PowerShell 对象（包含从用于创建它们的对象中选择的属性）。键入下面的命令以创建仅包括 Win32_LogicalDisk WMI 类的 Name 和 FreeSpace 属性的新对象：</p><pre><code class="language-powershell">Get-CimInstance -Class Win32_LogicalDisk | Select-Object -Property Name,FreeSpace
Name      FreeSpace
----      ---------
C:      50664845312
</code></pre><p>可以使用 Select-Object 创建计算属性。这样即可以以十亿字节为单位显示 FreeSpace，而非以字节为单位。</p><pre><code class="language-powershell">Get-CimInstance -Class Win32_LogicalDisk |
  Select-Object -Property Name, @{
    label=&#39;FreeSpace&#39;
    expression={($_.FreeSpace/1GB).ToString(&#39;F2&#39;)}
  }
  
Name    FreeSpace
----    ---------
C:      47.18
</code></pre><h3 id="从管道中删除对象-where-object" tabindex="-1"><a class="header-anchor" href="#从管道中删除对象-where-object"><span>从管道中删除对象 (Where-Object)</span></a></h3><p>在 PowerShell 中，你通常会生成和传递比预期更多的对象到管道中。可以通过使用 Format-* cmdlet 指定特定对象的属性进行显示，但是这对从显示中删除整个对象的问题没有任何帮助。你可能希望在管道末尾之前筛选对象，以便你可以只对初始生成对象的子集执行操作。</p><h3 id="使用-where-object-执行简单测试" tabindex="-1"><a class="header-anchor" href="#使用-where-object-执行简单测试"><span>使用 Where-Object 执行简单测试</span></a></h3><p>借助 PowerShell 中的 Where-Object cmdlet，可以测试管道中的每个对象，并沿管道仅传递满足特定测试条件的对象。将从管道中删除未通过测试的对象。测试条件以 FilterScript 参数值的形式提供。比较运算符 含义 示例（返回 True） 出于分析考虑，&lt;、&gt; 和 = 等符号不用作比较运算符。相反，比较运算符由字母组成。比如-eq、-ne、-like等等。Where-Object 脚本块使用特殊变量 $_ 来指代管道中的当前对象。以下是其工作原理示例。如果你有一个数字列表，且希望仅返回小于 3 的数字，则可使用 Where-Object 通过键入以下内容来筛选数字：</p><pre><code class="language-powershell">1,2,3,4 | Where-Object {$_ -lt 3}
1
2
</code></pre><h3 id="基于对象属性进行筛选" tabindex="-1"><a class="header-anchor" href="#基于对象属性进行筛选"><span>基于对象属性进行筛选</span></a></h3><p>由于 $_ 指代当前管道对象，因此可以访问它的属性进行测试。例如，我们可以看看 WMI 中的 Win32_SystemDriver 类。一个特定的系统上可能有数百个系统驱动程序，但是你可能只对特定一些系统驱动程序感兴趣，例如那些当前正在运行的程序。对于 Win32_SystemDriver 类，相关属性是 State 。你可以筛选系统驱动程序，通过键入以下内容仅选择正在运行的驱动程序：</p><pre><code class="language-powershell">Get-CimInstance -Class Win32_SystemDriver |
  Where-Object {$_.State -eq &#39;Running&#39;}
</code></pre><p>这仍会生成一个较长的列表。你可能还希望进行筛选，以通过测试 StartMode 值仅选择自动启动的驱动程序集：</p><pre><code class="language-powershell">DisplayName : RAS Asynchronous Media Driver
Name        : AsyncMac
State       : Running
Status      : OK
Started     : True

DisplayName : Audio Stub Driver
Name        : audstub
State       : Running
Status      : OK
Started     : True
...
</code></pre><p>这为我们提供了大量不再需要的信息，因为我们知道驱动程序正在运行。事实上，此时我们可能需要的唯一信息就是名称和显示名。下面的命令仅包括这两种属性，从而使输出更简单：</p><pre><code class="language-powershell">Get-CimInstance -Class Win32_SystemDriver |
  Where-Object {$_.State -eq &quot;Running&quot;} |
    Where-Object {$_.StartMode -eq &quot;Manual&quot;} |
      Format-Table -Property Name,DisplayName
      
Name              DisplayName
----              -----------
AsyncMac               RAS Asynchronous Media Driver
bindflt                Windows Bind Filter Driver
bowser                 Browser
CompositeBus           Composite Bus Enumerator Driver
condrv                 Console Driver
HdAudAddService        Microsoft 1.1 UAA Function Driver for High Definition Audio Service
HDAudBus               Microsoft UAA Bus Driver for High Definition Audio
HidUsb                 Microsoft HID Class Driver
HTTP                   HTTP Service
igfx                   igfx
IntcDAud               Intel(R) Display Audio
intelppm               Intel Processor Driver
...
</code></pre><h3 id="创建-net-对象" tabindex="-1"><a class="header-anchor" href="#创建-net-对象"><span>创建 .NET 对象</span></a></h3><p>存在具有 .NET Framework 和 COM 接口的软件组件，使用它们可执行许多系统管理任务。Windows PowerShell 允许你使用这些组件，因此你将不限于执行可通过使用 cmdlet 执行的任务。Windows PowerShell 初始版本中的许多 cmdlet 对远程计算机无效。我们将演示如何通过直接从 Windows PowerShell 使用 .NET Framework System.Diagnostics.EventLog 类在管理事件日志时绕过此限制。</p><h3 id="使用-new-object-进行事件日志访问" tabindex="-1"><a class="header-anchor" href="#使用-new-object-进行事件日志访问"><span>使用 New-Object 进行事件日志访问</span></a></h3><p>.NET Framework 类库包括一个名为 System.Diagnostics.EventLog 的类，该类可用于管理事件日志。可以通过使用具有 TypeName 参数的 New-Object cmdlet 创建 .NET Framework 类的新实例。例如，以下命令将创建事件日志引用：</p><pre><code class="language-powershell">PS&gt; New-Object -TypeName System.Diagnostics.EventLog

  Max(K) Retain OverflowAction        Entries Name
  ------ ------ --------------        ------- ----
</code></pre><p>尽管该命令创建了 EventLog 类的实例，但该实例不包含任何数据。这是因为我们未指定特定的事件日志。如何获取真正的事件日志？</p><h3 id="将构造函数与-new-object-一起使用" tabindex="-1"><a class="header-anchor" href="#将构造函数与-new-object-一起使用"><span>将构造函数与 New-Object 一起使用</span></a></h3><p>若要引用特定的事件日志，需要指定日志的名称。New-Object 具有 ArgumentList 参数。作为值传递到此形参的实参将由对象的特殊的启动方法使用。此方法叫做构造函数，因为它将用于构造对象。例如，若要对获取应用程序日志的引用，请指定字符串“Application”作为实参</p><pre><code class="language-powershell">PS&gt; New-Object -TypeName System.Diagnostics.EventLog -ArgumentList Application

Max(K) Retain OverflowAction        Entries Name
------ ------ --------------        ------- ----
16,384      7 OverwriteOlder          2,160 Application
</code></pre><h3 id="在变量中存储对象" tabindex="-1"><a class="header-anchor" href="#在变量中存储对象"><span>在变量中存储对象</span></a></h3><p>你可能需要存储对对象的引用，以便在当前的 Shell 中使用。尽管 Windows PowerShell 允许使用管道执行大量操作，减少了对变量的需求，但有时在变量中存储对对象的引用可以更方便地操纵这些对象。Windows PowerShell 允许你创建实质上是命名对象的变量。来自任何有效 Windows PowerShell 命令的输出都可以存储在变量中。变量名始终以 $ 开头。如果想要将应用程序日志引用存储在名为 $AppLog 的变量中，请键入该变量的名称，后跟一个等号，然后键入用于创建应用程序日志对象的命令：</p><pre><code class="language-powershell">PS&gt; $AppLog = New-Object -TypeName System.Diagnostics.EventLog -ArgumentList Application

PS&gt; $AppLog

  Max(K) Retain OverflowAction        Entries Name
  ------ ------ --------------        ------- ----
  16,384      7 OverwriteOlder          2,160 Application
</code></pre><h3 id="使用-new-object-访问远程事件日志" tabindex="-1"><a class="header-anchor" href="#使用-new-object-访问远程事件日志"><span>使用 New-Object 访问远程事件日志</span></a></h3><p>上一节中使用的命令以本地计算机为目标；Get-EventLog cmdlet 可做到这一点。若要访问远程计算机上的应用程序日志，必须同时将日志名称和计算机名称（或 IP 地址）作为参数提供。</p><pre><code class="language-powershell">PS&gt; $RemoteAppLog = New-Object -TypeName System.Diagnostics.EventLog Application,192.168.1.81
PS&gt; $RemoteAppLog

  Max(K) Retain OverflowAction        Entries Name
  ------ ------ --------------        ------- ----
     512      7 OverwriteOlder            262 Application
</code></pre><h3 id="使用对象方法清除事件日志" tabindex="-1"><a class="header-anchor" href="#使用对象方法清除事件日志"><span>使用对象方法清除事件日志</span></a></h3><p>对象通常具有可调用以执行任务的方法。可以使用 Get-Member 来显示与对象关联的方法。下面的命令和已选的输出将显示 EventLog 类的一些方法：</p><pre><code class="language-powershell">PS&gt; $RemoteAppLog | Get-Member -MemberType Method

   TypeName: System.Diagnostics.EventLog

Name                      MemberType Definition
----                      ---------- ----------
...
Clear                     Method     System.Void Clear()
Close                     Method     System.Void Close()
...
GetType                   Method     System.Type GetType()
...
ModifyOverflowPolicy      Method     System.Void ModifyOverflowPolicy(Overfl...
RegisterDisplayName       Method     System.Void RegisterDisplayName(String ...
...
ToString                  Method     System.String ToString()
WriteEntry                Method     System.Void WriteEntry(String message),...
WriteEvent                Method     System.Void WriteEvent(EventInstance in...
</code></pre><p>Clear() 方法可以用于清除事件日志。调用方法时，即使该方法不需要参数，也必须始终在方法名称后紧跟括号。这使得 Windows PowerShell 方法能够区分该方法和具有相同名称的潜在属性。键入以下命令以调用 Clear 方法：</p><pre><code class="language-powershell">PS&gt; $RemoteAppLog.Clear()
</code></pre><h3 id="使用-new-object-创建-com-对象" tabindex="-1"><a class="header-anchor" href="#使用-new-object-创建-com-对象"><span>使用 New-Object 创建 COM 对象</span></a></h3><p>可以使用 New-Object 来处理组件对象模型 (COM) 组件。组件的范围从 Windows 脚本宿主 (WSH) 包含的各种库到 ActiveX 应用程序（如大多数系统上安装的 Internet Explorer）。</p><p>New-Object 使用 .NET Framework 运行时可调用的包装器创建 COM 对象，因此调用 COM 对象时它与 .NET Framework 具有相同的限制。若要创建 COM 对象，需要为 ComObject 参数指定要使用的 COM 类的编程标识符（或 ProgId）。COM 用途限制的全面讨论和确定系统上可用的 ProgId 已超出本用户指南的范围，但来自环境的大多数已知对象（如 WSH）都可在 Windows PowerShell 内使用。</p><p>可以通过指定以下 progid 来创建 WSH 对象：WScript.Shell 、WScript.Network 、Scripting.Dictionary 和 Scripting.FileSystemObject 。以下命令将创建这些对象：</p><pre><code class="language-powershell">New-Object -ComObject WScript.Shell
New-Object -ComObject WScript.Network
New-Object -ComObject Scripting.Dictionary
New-Object -ComObject Scripting.FileSystemObject
</code></pre><p>尽管在 Windows PowerShell 中可通过其他方法使用这些类的大多数功能，但使用 WSH 类执行某些任务（如创建快捷方式）仍更加简单。</p><h3 id="使用-wscript-shell-创建桌面快捷方式" tabindex="-1"><a class="header-anchor" href="#使用-wscript-shell-创建桌面快捷方式"><span>使用 WScript.Shell 创建桌面快捷方式</span></a></h3><p>可以使用 COM 对象快速执行的一个任务是创建快捷方式。假设你想要在桌面上创建链接到 Windows PowerShell 主文件夹的快捷方式。首先需要创建对 WScript.Shell 的引用，我们会将其存储在名为 $WshShell 的变量中：</p><pre><code class="language-powershell">$WshShell = New-Object -ComObject WScript.Shell
</code></pre><p>Ge-Member 可用于 COM 对象，因此你可以通过键入以下内容浏览对象的成员：</p><pre><code class="language-powershell">PS&gt; $WshShell | Get-Member

   TypeName: System.__ComObject#{41904400-be18-11d3-a28b-00104bd35090}

Name                     MemberType            Definition
----                     ----------            ----------
AppActivate              Method                bool AppActivate (Variant, Va...
CreateShortcut           Method                IDispatch CreateShortcut (str...
...
</code></pre><p>Get-Member 具有可选 InputObject 参数，你可以使用这个参数而不使用管道为 Get-Member 提供输入。如果改用命令 Get-Member-InputObject $WshShell，你会得到与如上所示相同的输出。如果使用 InputObject，它将视其参数为单个项。这意味着，如果变量中有几个对象，那么 Get-Member 会将它们视为一个对象数组。例如：</p><pre><code class="language-powershell">PS&gt; $a = 1,2,&quot;three&quot;
PS&gt; Get-Member -InputObject $a
TypeName: System.Object[]
Name               MemberType    Definition
----               ----------    ----------
Count              AliasProperty Count = Length
...
</code></pre><p>WScript.Shell CreateShortcut 方法接受单个参数，即要创建的快捷方式文件的路径。我们可以键入桌面的完整路径，但还有更简单的方法。桌面通常由当前用户的主文件夹内名为 Desktop 的文件夹表示。Windows PowerShell 具有变量 $Home，它包含此文件夹的路径。我们可以通过使用此变量指定主文件夹的路径，然后通过键入以下内容添加 Desktop 文件夹的名称和要创建的快捷方式的名称：</p><pre><code class="language-powershell">$lnk = $WshShell.CreateShortcut(&quot;$Home\\Desktop\\PSHome.lnk&quot;)
</code></pre><p>当你在双引号内使用外观类似变量名称的项时，Windows PowerShell 将尝试替换匹配的值。如果使用单引号，Windows PowerShell 将不会替换该变量值。例如，请尝试键入以下命令：</p><pre><code class="language-powershell">PS&gt; &quot;$Home\\Desktop\\PSHome.lnk&quot;
C:\\Documents and Settings\\aka\\Desktop\\PSHome.lnk
PS&gt; &#39;$Home\\Desktop\\PSHome.lnk&#39;
$Home\\Desktop\\PSHome.lnk
</code></pre><p>我们现在有一个名为 $lnk 的变量，其中包含新的快捷方式引用。如果想要查看其成员，你可以通过管道将它传递到 Get-Member。下面的输出显示了完成创建快捷方式所需使用的成员：</p><pre><code class="language-powershell">PS&gt; $lnk | Get-Member
TypeName: System.__ComObject#{f935dc23-1cf0-11d0-adb9-00c04fd58a0b}
Name             MemberType   Definition
----             ----------   ----------
...
Save             Method       void Save ()
...
TargetPath       Property     string TargetPath () {get} {set}
</code></pre><p>我们需要指定 TargetPath（它是 Windows PowerShell 的应用程序文件夹），然后通过调用 Save 方法保存快捷方式 $lnk。Windows PowerShell 应用程序文件夹路径存储在变量 $PSHome 中，因此我们可以通过键入以下内容执行此操作：</p><pre><code class="language-powershell">$lnk.TargetPath = $PSHome
$lnk.Save()
</code></pre><h2 id="控制语句" tabindex="-1"><a class="header-anchor" href="#控制语句"><span>控制语句</span></a></h2><h3 id="条件判断" tabindex="-1"><a class="header-anchor" href="#条件判断"><span>条件判断</span></a></h3><h3 id="比较运算符" tabindex="-1"><a class="header-anchor" href="#比较运算符"><span>比较运算符</span></a></h3><pre><code class="language-powershell">-eq ：等于
-ne ：不等于
-gt ：大于
-ge ：大于等于
-lt ：小于
-le ：小于等于
-contains ：包含
$array -contains something

-notcontains :不包含
!($a): 求反
-and ：和
-or ：或
-xor ：异或
-not ：逆
</code></pre><h3 id="if-else" tabindex="-1"><a class="header-anchor" href="#if-else"><span>if-else</span></a></h3><pre><code class="language-powershell">if-else:

if($value -eq 1){
 code1
}else{
 code2
}
</code></pre><h3 id="循环语句" tabindex="-1"><a class="header-anchor" href="#循环语句"><span>循环语句</span></a></h3><h3 id="while" tabindex="-1"><a class="header-anchor" href="#while"><span>while</span></a></h3><pre><code class="language-powershell">while($n -gt 0){
 code
}
</code></pre><h3 id="for" tabindex="-1"><a class="header-anchor" href="#for"><span>for</span></a></h3><pre><code class="language-powershell">$sum=0
for($i=1;$i -le 100;$i++)
{
    $sum+=$i
}
$sum
</code></pre><h3 id="foreach" tabindex="-1"><a class="header-anchor" href="#foreach"><span>foreach</span></a></h3><pre><code class="language-powershell"># 打印出windows目录下大于1mb的文件名
foreach($file in dir c:\\windows)
{
    if($file.Length -gt 1mb)
    {
        $File.Name
    }
}
</code></pre><h3 id="foreach-object" tabindex="-1"><a class="header-anchor" href="#foreach-object"><span>foreach-object</span></a></h3><pre><code class="language-powershell"># 获取所有的服务，并获取对呀进程ID是否大于100
Get-WmiObject Win32_Service | ForEach-Object {&quot;Name:&quot;+ $_.DisplayName, &quot;, Is ProcessId more than 100:&quot; + ($_.ProcessId -gt 100)}
</code></pre><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数"><span>函数</span></a></h2><pre><code class="language-powershell">function Invoke-PortScan {
&lt;#
.SYNOPSIS 
简介

.DESCRIPTION
描述
    
.PARAMETER StartAddress
参数

.PARAMETER EndAddress
参数

.EXAMPLE
PS &gt; Invoke-PortScan -StartAddress 192.168.0.1 -EndAddress 192.168.0.254
用例
#&gt;
code
}
</code></pre><h2 id="异常处理" tabindex="-1"><a class="header-anchor" href="#异常处理"><span>异常处理</span></a></h2><pre><code class="language-powershell">Try{ $connection.open() $success = $true }Catch{ $success = $false }
</code></pre>`,113),o=[r];function s(i,c){return t(),n("div",null,o)}const h=e(l,[["render",s],["__file","ps-basics.html.vue"]]),d=JSON.parse('{"path":"/windows-tutor/powershell/ps-basics.html","title":"powershell基础","lang":"zh-CN","frontmatter":{"description":"powershell基础 提示 powershell和linux bash的比较http://xahlee.info/powershell/powershell_for_unixer.html 官方文档 安装 推荐使用dotnet-cli 变量 变量都是以$开头, 是强类型语言, 语言是大小写不敏感的 提一提变量保护与常量的声明：New-Variabl...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/powershell/ps-basics.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"powershell基础"}],["meta",{"property":"og:description","content":"powershell基础 提示 powershell和linux bash的比较http://xahlee.info/powershell/powershell_for_unixer.html 官方文档 安装 推荐使用dotnet-cli 变量 变量都是以$开头, 是强类型语言, 语言是大小写不敏感的 提一提变量保护与常量的声明：New-Variabl..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-05T22:42:48.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-05T22:42:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"powershell基础\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-05T22:42:48.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[{"level":3,"title":"推荐使用dotnet-cli","slug":"推荐使用dotnet-cli","link":"#推荐使用dotnet-cli","children":[]}]},{"level":2,"title":"变量","slug":"变量","link":"#变量","children":[]},{"level":2,"title":"打印变量","slug":"打印变量","link":"#打印变量","children":[]},{"level":2,"title":"数组","slug":"数组","link":"#数组","children":[{"level":3,"title":"数组的创建","slug":"数组的创建","link":"#数组的创建","children":[]},{"level":3,"title":"数组的访问","slug":"数组的访问","link":"#数组的访问","children":[]},{"level":3,"title":"数组的判断","slug":"数组的判断","link":"#数组的判断","children":[]},{"level":3,"title":"数组的追加","slug":"数组的追加","link":"#数组的追加","children":[]}]},{"level":2,"title":"哈希表","slug":"哈希表","link":"#哈希表","children":[{"level":3,"title":"哈希表的创建","slug":"哈希表的创建","link":"#哈希表的创建","children":[]},{"level":3,"title":"哈希表里存数组","slug":"哈希表里存数组","link":"#哈希表里存数组","children":[]},{"level":3,"title":"哈希表的插入与删除","slug":"哈希表的插入与删除","link":"#哈希表的插入与删除","children":[]}]},{"level":2,"title":"对象","slug":"对象","link":"#对象","children":[{"level":3,"title":"查看对象结构 (Get-Member)","slug":"查看对象结构-get-member","link":"#查看对象结构-get-member","children":[]},{"level":3,"title":"选择对象部件 (Select-Object)","slug":"选择对象部件-select-object","link":"#选择对象部件-select-object","children":[]},{"level":3,"title":"从管道中删除对象 (Where-Object)","slug":"从管道中删除对象-where-object","link":"#从管道中删除对象-where-object","children":[]},{"level":3,"title":"使用 Where-Object 执行简单测试","slug":"使用-where-object-执行简单测试","link":"#使用-where-object-执行简单测试","children":[]},{"level":3,"title":"基于对象属性进行筛选","slug":"基于对象属性进行筛选","link":"#基于对象属性进行筛选","children":[]},{"level":3,"title":"创建 .NET 对象","slug":"创建-net-对象","link":"#创建-net-对象","children":[]},{"level":3,"title":"使用 New-Object 进行事件日志访问","slug":"使用-new-object-进行事件日志访问","link":"#使用-new-object-进行事件日志访问","children":[]},{"level":3,"title":"将构造函数与 New-Object 一起使用","slug":"将构造函数与-new-object-一起使用","link":"#将构造函数与-new-object-一起使用","children":[]},{"level":3,"title":"在变量中存储对象","slug":"在变量中存储对象","link":"#在变量中存储对象","children":[]},{"level":3,"title":"使用 New-Object 访问远程事件日志","slug":"使用-new-object-访问远程事件日志","link":"#使用-new-object-访问远程事件日志","children":[]},{"level":3,"title":"使用对象方法清除事件日志","slug":"使用对象方法清除事件日志","link":"#使用对象方法清除事件日志","children":[]},{"level":3,"title":"使用 New-Object 创建 COM 对象","slug":"使用-new-object-创建-com-对象","link":"#使用-new-object-创建-com-对象","children":[]},{"level":3,"title":"使用 WScript.Shell 创建桌面快捷方式","slug":"使用-wscript-shell-创建桌面快捷方式","link":"#使用-wscript-shell-创建桌面快捷方式","children":[]}]},{"level":2,"title":"控制语句","slug":"控制语句","link":"#控制语句","children":[{"level":3,"title":"条件判断","slug":"条件判断","link":"#条件判断","children":[]},{"level":3,"title":"比较运算符","slug":"比较运算符","link":"#比较运算符","children":[]},{"level":3,"title":"if-else","slug":"if-else","link":"#if-else","children":[]},{"level":3,"title":"循环语句","slug":"循环语句","link":"#循环语句","children":[]},{"level":3,"title":"while","slug":"while","link":"#while","children":[]},{"level":3,"title":"for","slug":"for","link":"#for","children":[]},{"level":3,"title":"foreach","slug":"foreach","link":"#foreach","children":[]},{"level":3,"title":"foreach-object","slug":"foreach-object","link":"#foreach-object","children":[]}]},{"level":2,"title":"函数","slug":"函数","link":"#函数","children":[]},{"level":2,"title":"异常处理","slug":"异常处理","link":"#异常处理","children":[]}],"git":{"createdTime":1649261064000,"updatedTime":1659739368000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":11.85,"words":3556},"filePathRelative":"windows-tutor/powershell/ps-basics.md","localizedDate":"2022年4月6日","autoDesc":true}');export{h as comp,d as data};
