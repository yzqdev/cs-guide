import{_ as e,c as a,o as t,d as n}from"./app-CbULZrmi.js";const l={},s=n(`<h1 id="我的posh片段" tabindex="-1"><a class="header-anchor" href="#我的posh片段"><span>我的posh片段</span></a></h1><h2 id="powershell的库" tabindex="-1"><a class="header-anchor" href="#powershell的库"><span>Powershell的库</span></a></h2><p><a href="https://www.powershellgallery.com/" target="_blank" rel="noopener noreferrer">https://www.powershellgallery.com/</a><br> 部分教程 <a href="https://www.computerperformance.co.uk/powershell/" target="_blank" rel="noopener noreferrer">链接</a></p><h2 id="执行某个ps脚本的一个function" tabindex="-1"><a class="header-anchor" href="#执行某个ps脚本的一个function"><span>执行某个ps脚本的一个function</span></a></h2><pre><code class="language-powershell">powershell -command &quot;&amp; { . &lt;path&gt;\\script1.ps1; My-Func }&quot;

# 如果只是想在命令行执行
. .\\script.ps1
My-Func
</code></pre><h2 id="获取内置的变量" tabindex="-1"><a class="header-anchor" href="#获取内置的变量"><span>获取内置的变量</span></a></h2><pre><code>get-varible
</code></pre><h2 id="遍历删除文件夹下的-git目录" tabindex="-1"><a class="header-anchor" href="#遍历删除文件夹下的-git目录"><span>遍历删除文件夹下的.git目录</span></a></h2><pre><code class="language-powershell">ls * -include  .git  -Force -recurse |Remove-Item -r -Force
</code></pre><h2 id="start-process-别名-start-路径-打开当前文件夹" tabindex="-1"><a class="header-anchor" href="#start-process-别名-start-路径-打开当前文件夹"><span>Start-Process，别名：start + 路径， 打开当前文件夹</span></a></h2><pre><code class="language-powershell"># 以管理员身份启动Powershell
start -FilePath &quot;powershell&quot; -Verb RunAs
</code></pre><h2 id="get-history-别名-history、h-列出之前的操作命令" tabindex="-1"><a class="header-anchor" href="#get-history-别名-history、h-列出之前的操作命令"><span>Get-History，别名：history、h，列出之前的操作命令</span></a></h2><pre><code class="language-powershell">history
</code></pre><h2 id="get-process-别名-ps-查找进程-可以通过进程名称或者进程id来获取特定进程" tabindex="-1"><a class="header-anchor" href="#get-process-别名-ps-查找进程-可以通过进程名称或者进程id来获取特定进程"><span>Get-Process， 别名：ps，查找进程, 可以通过进程名称或者进程ID来获取特定进程</span></a></h2><pre><code class="language-powershell">Get-Process qq
</code></pre><h2 id="remove-item-别名-rm、del-删除或删除文件" tabindex="-1"><a class="header-anchor" href="#remove-item-别名-rm、del-删除或删除文件"><span>remove-item，别名： rm、del, 删除或删除文件</span></a></h2><pre><code class="language-powershell">
</code></pre><h2 id="get-location-别名-pwd-当前目录位置" tabindex="-1"><a class="header-anchor" href="#get-location-别名-pwd-当前目录位置"><span>get-location，别名：pwd, 当前目录位置</span></a></h2><h2 id="get-help-缩写help-查看命令的帮助" tabindex="-1"><a class="header-anchor" href="#get-help-缩写help-查看命令的帮助"><span>get-help, 缩写help，查看命令的帮助</span></a></h2><pre><code class="language-powershell">help get-process
</code></pre><h2 id="get-host" tabindex="-1"><a class="header-anchor" href="#get-host"><span>get-host</span></a></h2><h2 id="get-date-别名-date-获取系统当前时间" tabindex="-1"><a class="header-anchor" href="#get-date-别名-date-获取系统当前时间"><span>get-date, 别名：date，获取系统当前时间</span></a></h2><pre><code class="language-powershell">get-date
</code></pre><h2 id="get-content-别名-cat-输出文件内容到控制台" tabindex="-1"><a class="header-anchor" href="#get-content-别名-cat-输出文件内容到控制台"><span>get-content，别名：cat, 输出文件内容到控制台</span></a></h2><h2 id="获取命令的位置" tabindex="-1"><a class="header-anchor" href="#获取命令的位置"><span>获取命令的位置</span></a></h2><pre><code class="language-powershell"> Get-Command -Name npm
</code></pre><h3 id="获取命令所在目录" tabindex="-1"><a class="header-anchor" href="#获取命令所在目录"><span>获取命令所在目录</span></a></h3><pre><code class="language-powershell">start (Get-Item (Get-Command -Name npm).Source).Directory
</code></pre><h2 id="获取系统的编码" tabindex="-1"><a class="header-anchor" href="#获取系统的编码"><span>获取系统的编码</span></a></h2><pre><code class="language-powershell">chcp
活动代码页: 936 这个是gbk编码
</code></pre><h2 id="下载文件" tabindex="-1"><a class="header-anchor" href="#下载文件"><span>下载文件</span></a></h2><pre><code class="language-powershell">
iwr &quot;http://p9.pstatp.com&quot; -Outfile a.webp
或者
curl &#39;http:www.baidu.com&#39; -o a.webp
</code></pre><p>可以使用openfiles这个命令，和linux下的lsof差不多 不过系统默认是关闭这个功能，要使用这个功能，需要先激活。 激活命令：</p><pre><code class="language-powershell">openfiles /local on
</code></pre><p>然后重启电脑 然后就可以使用了，下面命令可以查询。</p><pre><code class="language-powershell">openfiles /query /v
</code></pre><p>不用了别忘记关闭它</p><pre><code class="language-powershell">openfiles /local off
</code></pre><h2 id="执行exe或者可执行文件" tabindex="-1"><a class="header-anchor" href="#执行exe或者可执行文件"><span>执行exe或者可执行文件</span></a></h2><pre><code class="language-powershell">.\\fileName 
</code></pre><h2 id="清屏" tabindex="-1"><a class="header-anchor" href="#清屏"><span>清屏</span></a></h2><pre><code class="language-powershell">clear|cls 
</code></pre><h2 id="查看版本" tabindex="-1"><a class="header-anchor" href="#查看版本"><span>查看版本</span></a></h2><pre><code class="language-powershell">$host.version
#  或者
Get-Host
</code></pre><h2 id="获取当前进程" tabindex="-1"><a class="header-anchor" href="#获取当前进程"><span>获取当前进程</span></a></h2><pre><code class="language-powershell">Get-Process
</code></pre><h3 id="关闭某进程" tabindex="-1"><a class="header-anchor" href="#关闭某进程"><span>关闭某进程</span></a></h3><pre><code class="language-powershell">$process =&quot;*powershellw*&quot;
# 查找和powershellw相关的进程
Get-CimInstance Win32_Process | Where {$_.CommandLine -like $process } | select -ExpandProperty CommandLine # | Measure-Object -Line
# 关闭powershellw进程
Get-CimInstance Win32_Process | Where {$_.CommandLine -like $process} | Remove-CimInstance
</code></pre><h3 id="查看进程的命令行" tabindex="-1"><a class="header-anchor" href="#查看进程的命令行"><span>查看进程的命令行</span></a></h3><pre><code class="language-powershell"># 获取powershell进程的命令行
Get-CimInstance Win32_Process -Filter &quot;name = &#39;powershell.exe&#39;&quot; | Select-Object CommandLine
# 获取命令行带有zfile.jar的命令行
Get-CimInstance Win32_Process  | Where-Object CommandLine -Match &#39;zfile&#39;| Remove-CimInstance

# 关闭某进程
Stop-Process -Id 34328
</code></pre><h2 id="查看端口被哪个进程占用" tabindex="-1"><a class="header-anchor" href="#查看端口被哪个进程占用"><span>查看端口被哪个进程占用</span></a></h2><pre><code class="language-powershell">Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess
</code></pre><h2 id="重命名" tabindex="-1"><a class="header-anchor" href="#重命名"><span>重命名</span></a></h2><pre><code class="language-powershell">Rename-Item FileName -NewName NewFileName
</code></pre><h2 id="批量重命名" tabindex="-1"><a class="header-anchor" href="#批量重命名"><span>批量重命名</span></a></h2><pre><code class="language-powershell">$i = 0
 
Get-ChildItem -Path D:\\pictures -Filter *.jpg |
ForEach-Object {
    $extension = $_.Extension
    $newName = &#39;pic_{0:d6}{1}&#39; -f $i, $extension
    $i++
    Rename-Item -Path $_.FullName -NewName $newName
}
</code></pre><pre><code class="language-powershell">type &gt; %~dp0\\a.txt
# 新建文件
echo a 2&gt;FileName
</code></pre><h2 id="添加参数" tabindex="-1"><a class="header-anchor" href="#添加参数"><span>添加参数</span></a></h2><pre><code class="language-powershell">param (
    [String]$Type = &quot;run&quot;
)
$name = &quot;server&quot;
$curDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Write-Host &quot;当前路径&quot;$curDir   -ForegroundColor Yellow
if ($Type -eq &quot;run&quot;) {
    Write-Host &quot;运行&quot; -ForegroundColor Cyan
    Write-Host &quot;go run main.go&quot; -ForegroundColor Cyan 
}
elseif ($Type -eq &quot;build&quot;) {
    Write-Host &quot;编译&quot; -ForegroundColor Red
    Write-Host &quot;go build&quot; -ForegroundColor Cyan
   
    
}
</code></pre><p>使用<code>.\\addParam.ps1 -Type</code> 输入 <code>-</code>会自动弹出-Type</p><h2 id="获取文件夹大小" tabindex="-1"><a class="header-anchor" href="#获取文件夹大小"><span>获取文件夹大小</span></a></h2><pre><code class="language-powershell">
param (
    [string] $folder
)
    
Get-ChildItem -Path $folder -Force -Recurse -ErrorAction SilentlyContinue |
Where-Object { $_.PSIsContainer -eq $false } |
Measure-Object |  Select-Object -ExpandProperty Count
Write-Host  &quot;文件数量检测完毕&quot; -ForegroundColor Cyan
</code></pre><h2 id="run-string-as-command-in-powershell" tabindex="-1"><a class="header-anchor" href="#run-string-as-command-in-powershell"><span>Run String as Command in PowerShell</span></a></h2><p>使用Invoke-Expression</p><pre><code class="language-powershell">$command = &quot;notepad.exe&quot;

Invoke-Expression $command

  
$command = &quot;Get-Process | Sort-Object -Property CPU -Descending | Select-Object -First 5&quot;

Invoke-Expression -Command $command
</code></pre><p>使用&amp;运算符</p><pre><code class="language-powershell">$command = &quot;notepad.exe&quot;

&amp; $command
</code></pre><p>使用双引号</p><pre><code class="language-powershell">$filename = &quot;File1.txt&quot;

$command = &quot;Get-Process | Out-File -FilePath &lt;code&gt;&quot;E:\\$filename&lt;/code&gt;&quot;&quot;

Invoke-Expression -Command $command
</code></pre><p>使用c#代码</p><pre><code class="language-powershell">$commandString = &quot;Get-ChildItem C:\\TEST1&quot;

$commandBlock = [scriptblock]::Create($commandString)

&amp; $commandBlock
</code></pre><p>来自<a href="https://java2blog.com/powershell-remove-special-characters-from-string/" target="_blank" rel="noopener noreferrer">https://java2blog.com/powershell-remove-special-characters-from-string/</a></p><h2 id="创建windows服务" tabindex="-1"><a class="header-anchor" href="#创建windows服务"><span>创建windows服务</span></a></h2><pre><code class="language-powershell">New-Service -Name Redis -DisplayName Redis7 -BinaryPathName &#39;D:\\programs\\Redis-7.0.13-Windows-x64-with-Service\\RedisService.exe&#39; -StartupType Automatic
</code></pre>`,74),r=[s];function o(c,i){return t(),a("div",null,r)}const h=e(l,[["render",o],["__file","ps-snippets.html.vue"]]),d=JSON.parse('{"path":"/windows-tutor/powershell/ps-snippets.html","title":"我的posh片段","lang":"zh-CN","frontmatter":{"description":"我的posh片段 Powershell的库 https://www.powershellgallery.com/ 部分教程 链接 执行某个ps脚本的一个function 获取内置的变量 遍历删除文件夹下的.git目录 Start-Process，别名：start + 路径， 打开当前文件夹 Get-History，别名：history、h，列出之前的操...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/powershell/ps-snippets.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"我的posh片段"}],["meta",{"property":"og:description","content":"我的posh片段 Powershell的库 https://www.powershellgallery.com/ 部分教程 链接 执行某个ps脚本的一个function 获取内置的变量 遍历删除文件夹下的.git目录 Start-Process，别名：start + 路径， 打开当前文件夹 Get-History，别名：history、h，列出之前的操..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-19T03:14:18.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-19T03:14:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"我的posh片段\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-19T03:14:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"Powershell的库","slug":"powershell的库","link":"#powershell的库","children":[]},{"level":2,"title":"执行某个ps脚本的一个function","slug":"执行某个ps脚本的一个function","link":"#执行某个ps脚本的一个function","children":[]},{"level":2,"title":"获取内置的变量","slug":"获取内置的变量","link":"#获取内置的变量","children":[]},{"level":2,"title":"遍历删除文件夹下的.git目录","slug":"遍历删除文件夹下的-git目录","link":"#遍历删除文件夹下的-git目录","children":[]},{"level":2,"title":"Start-Process，别名：start + 路径， 打开当前文件夹","slug":"start-process-别名-start-路径-打开当前文件夹","link":"#start-process-别名-start-路径-打开当前文件夹","children":[]},{"level":2,"title":"Get-History，别名：history、h，列出之前的操作命令","slug":"get-history-别名-history、h-列出之前的操作命令","link":"#get-history-别名-history、h-列出之前的操作命令","children":[]},{"level":2,"title":"Get-Process， 别名：ps，查找进程, 可以通过进程名称或者进程ID来获取特定进程","slug":"get-process-别名-ps-查找进程-可以通过进程名称或者进程id来获取特定进程","link":"#get-process-别名-ps-查找进程-可以通过进程名称或者进程id来获取特定进程","children":[]},{"level":2,"title":"remove-item，别名： rm、del, 删除或删除文件","slug":"remove-item-别名-rm、del-删除或删除文件","link":"#remove-item-别名-rm、del-删除或删除文件","children":[]},{"level":2,"title":"get-location，别名：pwd, 当前目录位置","slug":"get-location-别名-pwd-当前目录位置","link":"#get-location-别名-pwd-当前目录位置","children":[]},{"level":2,"title":"get-help, 缩写help，查看命令的帮助","slug":"get-help-缩写help-查看命令的帮助","link":"#get-help-缩写help-查看命令的帮助","children":[]},{"level":2,"title":"get-host","slug":"get-host","link":"#get-host","children":[]},{"level":2,"title":"get-date, 别名：date，获取系统当前时间","slug":"get-date-别名-date-获取系统当前时间","link":"#get-date-别名-date-获取系统当前时间","children":[]},{"level":2,"title":"get-content，别名：cat, 输出文件内容到控制台","slug":"get-content-别名-cat-输出文件内容到控制台","link":"#get-content-别名-cat-输出文件内容到控制台","children":[]},{"level":2,"title":"获取命令的位置","slug":"获取命令的位置","link":"#获取命令的位置","children":[{"level":3,"title":"获取命令所在目录","slug":"获取命令所在目录","link":"#获取命令所在目录","children":[]}]},{"level":2,"title":"获取系统的编码","slug":"获取系统的编码","link":"#获取系统的编码","children":[]},{"level":2,"title":"下载文件","slug":"下载文件","link":"#下载文件","children":[]},{"level":2,"title":"执行exe或者可执行文件","slug":"执行exe或者可执行文件","link":"#执行exe或者可执行文件","children":[]},{"level":2,"title":"清屏","slug":"清屏","link":"#清屏","children":[]},{"level":2,"title":"查看版本","slug":"查看版本","link":"#查看版本","children":[]},{"level":2,"title":"获取当前进程","slug":"获取当前进程","link":"#获取当前进程","children":[{"level":3,"title":"关闭某进程","slug":"关闭某进程","link":"#关闭某进程","children":[]},{"level":3,"title":"查看进程的命令行","slug":"查看进程的命令行","link":"#查看进程的命令行","children":[]}]},{"level":2,"title":"查看端口被哪个进程占用","slug":"查看端口被哪个进程占用","link":"#查看端口被哪个进程占用","children":[]},{"level":2,"title":"重命名","slug":"重命名","link":"#重命名","children":[]},{"level":2,"title":"批量重命名","slug":"批量重命名","link":"#批量重命名","children":[]},{"level":2,"title":"添加参数","slug":"添加参数","link":"#添加参数","children":[]},{"level":2,"title":"获取文件夹大小","slug":"获取文件夹大小","link":"#获取文件夹大小","children":[]},{"level":2,"title":"Run String as Command in PowerShell","slug":"run-string-as-command-in-powershell","link":"#run-string-as-command-in-powershell","children":[]},{"level":2,"title":"创建windows服务","slug":"创建windows服务","link":"#创建windows服务","children":[]}],"git":{"createdTime":1659850619000,"updatedTime":1700363658000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":4}]},"readingTime":{"minutes":2.62,"words":785},"filePathRelative":"windows-tutor/powershell/ps-snippets.md","localizedDate":"2022年8月7日","autoDesc":true}');export{h as comp,d as data};
