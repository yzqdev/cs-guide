import{_ as e,c as n,o as t,d as o}from"./app-CbULZrmi.js";const a={},i=o(`<h1 id="我的ps配置" tabindex="-1"><a class="header-anchor" href="#我的ps配置"><span>我的ps配置</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>查询<code>profile</code>位置: <code>$PROFILE</code></p></div><h2 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件"><span>配置文件</span></a></h2><pre><code class="language-powershell">function fluship {
    ipconfig /flushdns
}
function yarnDev {
    yarn --registry=https://registry.npmmirror.com &amp;&amp; yarn dev
}
function yarnInstall {
    yarn install --registry=https://registry.npmmirror.com
}
function removeItem {
    Remove-Item -Recurse -Force

}
function getCmdPath() {
    start (Get-ChildItem (Get-Command -Name $args[0]).Source).Directory
}
function deletePnpm {
    Copy-Item .\\package.json -Destination .\\package.jsonbak;
    Remove-Item .\\package.json;
    if (Test-Path &quot;pnpm-lock.yml&quot;) {
        Remove-Item  &quot;pnpm-lock.yml&quot;;
    }

    Write-Output &#39;删除node_modules中&#39;
    pnpm init &amp;&amp; pnpm add axios
    Remove-Item -Force -Recurse .\\node_modules;
    Remove-Item .\\package.json;
    Copy-Item .\\package.jsonbak -Destination .\\package.json;
    Remove-Item .\\package.jsonbak
    # 删除文件名中包含lock字符的文件
    Remove-Item   &#39;*lock*&#39;
    Write-Output &#39;已完成&#39;
}
function deleteNodemodules {
    Copy-Item .\\package.json -Destination .\\package.jsonbak;
    Remove-Item .\\package.json;
    Write-Output &#39;删除node_modules中&#39;
    yarn init -y &amp;&amp; yarn add axios;

    Remove-Item -Force -Recurse .\\node_modules;
    Remove-Item .\\package.json;
    Copy-Item .\\package.jsonbak -Destination .\\package.json;
    Remove-Item .\\package.jsonbak
    # 删除文件名中包含lock字符的文件
    Remove-Item   &#39;*lock*&#39;
    Write-Output &#39;已完成&#39;
}
function gbFun {
    git pull --rebase
}
function glogFun {
    git log --graph --pretty=&#39;%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%ar) %C(bold blue)&lt;%an&gt;%Creset&#39;
}
function gpFunc {
    git add -A &amp;&amp; git commit -m $args[0] &amp;&amp; git push origin main
}
function gcacheFun {
    git checkout --orphan dev ;
    git add -A ;
    git branch -D main ;
    git branch -m main ;
    git commit -m &#39;Initial commit&#39; ;
    git push origin main -f ;
    git gc --aggressive --prune=all
}
function Format-FileSize() {
    Param ([int]$size)
    If ($size -gt 1TB) { [string]::Format(&quot;{0:0.00} TB&quot;, $size / 1TB) }
    ElseIf ($size -gt 1GB) { [string]::Format(&quot;{0:0.00} GB&quot;, $size / 1GB) }
    ElseIf ($size -gt 1MB) { [string]::Format(&quot;{0:0.00} MB&quot;, $size / 1MB) }
    ElseIf ($size -gt 1KB) { [string]::Format(&quot;{0:0.00} kB&quot;, $size / 1KB) }
    ElseIf ($size -gt 0) { [string]::Format(&quot;{0:0.00} B&quot;, $size) }
    Else { &quot;&quot; }
}
function lsmFunc() {
    Get-ChildItem | Select-Object Name, LastWriteTime, @{Name = &quot;Size&quot;; Expression = { Format-FileSize($_.Length) } }
}
# # PowerShell parameter completion shim for the dotnet CLI
Register-ArgumentCompleter -Native -CommandName dotnet -ScriptBlock {
    param($commandName, $wordToComplete, $cursorPosition)
    dotnet complete --position $cursorPosition &quot;$wordToComplete&quot; | ForEach-Object {
        [System.Management.Automation.CompletionResult]::new($_, $_, &#39;ParameterValue&#39;, $_)
    }
}
Remove-Alias -Name ni -Force
Set-Alias yr deleteNodemodules
Set-Alias pr deletePnpm
Set-Alias ip fluship
Set-Alias yd yarnDev
Set-Alias y yarnInstall
Set-Alias gitp gpFunc
Set-Alias gitc gcacheFunq
Set-Alias gcp getCmdPath
Set-Alias gb gbFun
Set-Alias glog glogFun
Set-Alias kate &quot;C:\\Program Files\\Kate\\bin\\kate.exe&quot;
Set-Alias lsm lsmFunc
# #chcp 65001
# #chcp 936
if ($env:TERM_PROGRAM -eq &quot;vscode&quot;) {
    . &quot;$env:USERPROFILE\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\out\\vs\\workbench\\contrib\\terminal\\browser\\media\\shellIntegration.ps1&quot;
}
# if ($env:TERM_PROGRAM -eq &quot;vscode&quot;) { . &quot;$(code --locate-shell-integration-path pwsh)&quot; }
# # PSReadLine
Import-Module PSReadLine
Import-Module -Name Terminal-Icons
# # Enable Prediction History
Set-PSReadLineOption -PredictionSource History
# # Advanced Autocompletion for arrow keys
Set-PSReadlineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadlineKeyHandler -Key DownArrow -Function HistorySearchForward
Import-Module posh-git
oh-my-posh init pwsh --config &quot;$env:POSH_THEMES_PATH\\negligible.omp.json&quot; | Invoke-Expression
#
# #conda activate condapkg
</code></pre><h2 id="下载sg源码的配置" tabindex="-1"><a class="header-anchor" href="#下载sg源码的配置"><span>下载sg源码的配置</span></a></h2><pre><code class="language-powershell">$snapName = &quot;.\\Snap.Genshin&quot;
function cloneSnap {
    git clone &quot;https://github.com/DGP-Studio/Snap.Genshin.git&quot;;
    if (Test-Path &quot;.\\Snap.Genshin&quot;) {
        Set-Location Snap.Genshin
    }
}
# 复制metadata
function copyMeta {
    # 获取dotnet版本
    $snapCsProj = Get-Content &quot;.\\DGP.Genshin\\DGP.Genshin.csproj&quot;
    $reg = &quot;&lt;TargetFramework&gt;(?&lt;netVersion&gt;.*?)&lt;/TargetFramework&gt;&quot;
    $version = &quot;&quot;
    foreach ($line in $snapCsProj) {
        if ($line -match $reg) {       
            $version = $Matches.netVersion;
        }
    
    }
    if ( Test-Path &quot;.git&quot;  ) {
        $buildDir = &quot;Build\\\\Debug\\\\$version&quot; 
        git submodule update --init --recursive
        if (-not (Test-Path  $buildDir)) {
            mkdir &quot;$buildDir\\\\Plugins\\\\&quot;
            xcopy Metadata\\\\*.json &quot;$buildDir\\\\Metadata\\\\&quot; /e /y
        }
        else {
            xcopy Metadata\\\\*.json &quot;$buildDir\\\\Metadata\\\\&quot; /e /y
        }
     
    }
    else {
        Write-Host &#39;不是一个有效的git仓库,请重新clone https://github.com/DGP-Studio/Snap.Genshin.git&#39; -ForegroundColor Magenta
        Exit-PSSession
    }
    # 返回目录
    Set-Location &#39;../&#39;
}
 
function run {
    Write-Output &quot;将在本文件夹创建项目 Snap.Genshin&quot;
    Write-Host &quot;确定继续吗?(输入y确认,输入n退出)&quot; -NoNewline -ForegroundColor Magenta
    $response = read-host
    if ( $response -ne &quot;Y&quot; ) { 
        exit 
    }
    else {
        if (Test-Path $snapName) {
            Write-Host &quot;文件夹已经存在了!&quot;
            Exit
        }
        else {
            cloneSnap
            copyMeta
        }
    }
}
run
    
 
</code></pre><h2 id="克隆王道的文档" tabindex="-1"><a class="header-anchor" href="#克隆王道的文档"><span>克隆王道的文档</span></a></h2><pre><code class="language-powershell">$prefix = &#39;https://github.com/wangdoc/&#39;
$suffix = &#39;.git&#39;
$cur = $PWD
$gitRepos = &#39;bash-tutorial&#39;, &#39;git-tutorial&#39;, &#39;node-tutorial&#39;, &#39;javascript-tutorial&#39;, &#39;clang-tutorial&#39;, &#39;css-tutorial&#39;, &#39;es6-tutorial&#39;, &#39;ssh-tutorial&#39;, &#39;html-tutorial&#39;, &#39;webapi-tutorial&#39;
# 这里填你的docs文件夹
 
$dest = &#39;E:\\myblogs\\wangdoc\\docs\\&#39;
# 系统临时文件路径
$tmpPath = $env:tmp + &#39;\\wang\\&#39;
Write-Host  &#39;设置临时文件路径&#39;$tmpPath -ForegroundColor Cyan
if (-not (Test-Path $tmpPath)) {
    mkdir $tmpPath
}
Set-Location $tmpPath
# 克隆所有文件
function cloneAll {
    foreach ($item in $gitRepos) {
        git clone $prefix$item$suffix
        Set-Location $item
        Copy-Item -Recurse -Force docs $dest$item
    } 
    Set-Location $cur
    delTmpPath
    
    
}
function cloneOnlyDocs {
    foreach ($item in $gitRepos) {
        if (-not (Test-Path  $item)) {
            mkdir $item 
        }
        
         
        Set-Location $item
    
        Write-Host &#39;当前路径&#39;$PWD -ForegroundColor Cyan
        if (Test-Path &quot;.git&quot; ) {
            Write-Host  &#39;已有git文件夹&#39; -ForegroundColor Cyan
            switch ($item) {
                &#39;ssh-tutorial&#39; {  
                    git pull origin main
                } 
                &#39;clang-tutorial&#39; {  
                    git pull origin main
                }
                Default {
                    git pull origin master
                }
            }
            Write-Host &#39;从docs复制到&#39;$dest$item -ForegroundColor Cyan
            # 注意下面的\\文件夹分割
            Copy-Item  -Path &#39;docs&#39;-Destination  $dest$item -Recurse -Force
            Set-Location ../
        }
        else {
            git init
            git remote add origin $prefix$item$suffix
            # 设置允许克隆子目录
            git config core.sparsecheckout true 
            Write-Host  &#39;没有git文件夹,正在克隆&#39; -ForegroundColor Cyan
            Write-Host &#39;当前路径&#39;$PWD -ForegroundColor Cyan
            Write-Output &#39;docs&#39; &gt;&gt; &#39;.git/info/sparse-checkout&#39;  
            switch ($item) {
                &#39;ssh-tutorial&#39; {  
                    git pull origin main
                } 
                &#39;clang-tutorial&#39; {  
                    git pull origin main
                }
                Default {
                    git pull origin master
                }
            }
            # 注意下面的\\文件夹分割 -Force 覆盖文件
            Copy-Item  -Path &#39;docs&#39;  -Destination  $dest$item -Recurse -Force
            Set-Location ../
        }
    } 
     
}

function delTmpPath {
    Remove-Item -Recurse -Force $tmpPath
    
}
cloneOnlyDocs
Set-Location $cur
</code></pre><h2 id="小爬虫" tabindex="-1"><a class="header-anchor" href="#小爬虫"><span>小爬虫</span></a></h2><pre><code class="language-powershell">#This is a crawler for baidu images
&lt;#
All these funuctions would be used to implementation crawler&#39;s target
#&gt;
function Get-Random-String {
    $fileName = -join ([char[]](65..90 + 97..122) | Get-Random -Count 6)
    $fileName
}

function Resolve-Directory {
    param (
        [Parameter(Mandatory)]
        [string]
        $Path
    )
    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -Path $Path -ItemType Directory -ErrorAction SilentlyContinue
    }
}

function Invoke-MD5 {
    param (
        # Parameter Path
        [Parameter(Mandatory)]
        [string]
        $Path
    )
    begin {
        $global:hashTable = @{ }
    }
    process {
        Get-ChildItem -Path $Path | Where-Object {
            $hash = Get-FileHash -Path $_.FullName -Algorithm MD5
            $hashTable[$hash.Hash] = $hash.Path
        }
    }
    end { }
}


function Get-Images {
    param (
        [Parameter(ValueFromPipeline)]
        [int]
        $page = 1,
        [Parameter(Mandatory)]
        [string]
        $Path,
        [Parameter(Mandatory)]
        [string]
        $keyword
    )
    begin {
        Resolve-Directory -Path $Path
        Invoke-MD5 -Path $Path
        $headers = @{
            &#39;Accept&#39;                    = &#39;text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3&#39;
            &#39;Accept-Encoding&#39;           = &#39;gzip, deflate, br&#39;
            &#39;Accept-Language&#39;           = &#39;en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7&#39;
            &#39;Host&#39;                      = &#39;image.baidu.com&#39;
            &#39;Upgrade-Insecure-Requests&#39; = &#39;1&#39;
            &#39;User-Agent&#39;                = &#39;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36&#39;
        }
    }
    process {
        $n = ($page * 20)
        $word = [uri]::EscapeDataString($keyword)
        $url = &quot;https://image.baidu.com/search/flip?tn=baiduimage&amp;ie=utf-8&amp;word=\${word}&amp;pn=$n&quot;
        Write-Host &quot;Handling $url\`n&quot;
        $web = (Invoke-WebRequest -Uri $url -Method GET -Headers $headers)
        $web | Select-String &#39;&quot;objURL&quot;:&quot;https?://+[^\\s]+[\\w]&#39; -AllMatches | ForEach-Object { $_.Matches } | Foreach-Object {
            $_ -match &#39;https?://.+.&#39;
            $Matches.Values | ForEach-Object {
                Write-Host &quot;Fetching from $_&quot; -ForegroundColor 3
                $ext = ([regex]&#39;\\.(jpe?g|png|gif|tif|bmp)&#39;).Match($_).Value
                if ([String]::IsNullOrEmpty($ext)) {
                    $ext = &quot;.jpg&quot;
                }
                $fileFullName = (Get-Random-String) + $ext
                $TargetPath = Join-Path -Path $Path -ChildPath $fileFullName
                Invoke-WebRequest -Uri $_ -PassThru -TimeoutSec 20000 -OutFile $TargetPath -ErrorAction SilentlyContinue
                # calculate the md5 value
                if ((Test-Path $TargetPath)) {
                    $hashValue = (Get-FileHash -Path $TargetPath -Algorithm MD5).Hash
                    if ($hashValue -and $hashTable.ContainsKey($hashValue)) {
                        Remove-Item -Path $TargetPath -Force -ErrorAction SilentlyContinue
                    }
                }
                Start-Sleep -Milliseconds 1000
            }
        }
        #ii $Path
    }
}

0..10 | Get-Images -Path &quot;d:\\temp\\baiduimages&quot; -keyword &quot;soft cat&quot;
</code></pre><h2 id="获取安装的软件" tabindex="-1"><a class="header-anchor" href="#获取安装的软件"><span>获取安装的软件</span></a></h2><pre><code class="language-powershell">&lt;#
.Synopsis
   Get installed software list by retrieving registry.
.DESCRIPTION
   The function return a installed software list by retrieving registry from below path;
   1.&#39;HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall&#39;
   2.&#39;HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall&#39;
   3.&#39;HKLM:SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall&#39;
   Author: Mosser Lee (http://www.pstips.net/author/mosser/)

.EXAMPLE
   Get-InstalledSoftwares
.EXAMPLE
   Get-InstalledSoftwares  | Group-Object Publisher
#&gt;
function Get-InstalledSoftwares {
    #
    # Read registry key as product entity.
    #
    function ConvertTo-ProductEntity {
        param([Microsoft.Win32.RegistryKey]$RegKey)
        $product = &#39;&#39; | select Name, Publisher, Version
        $product.Name = $_.GetValue(&quot;DisplayName&quot;)
        $product.Publisher = $_.GetValue(&quot;Publisher&quot;)
        $product.Version = $_.GetValue(&quot;DisplayVersion&quot;)

        if ( -not [string]::IsNullOrEmpty($product.Name)) {
            $product
        }
    }

    $UninstallPaths = @(,
        # For local machine.
        &#39;HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall&#39;,
        # For current user.
        &#39;HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall&#39;)

    # For 32bit softwares that were installed on 64bit operating system.
    if ([Environment]::Is64BitOperatingSystem) {
        $UninstallPaths += &#39;HKLM:SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall&#39;
    }
    $UninstallPaths | foreach {
        Get-ChildItem $_ | foreach {
            ConvertTo-ProductEntity -RegKey $_
        }
    }
}
</code></pre><h2 id="获取文件夹大小" tabindex="-1"><a class="header-anchor" href="#获取文件夹大小"><span>获取文件夹大小</span></a></h2><pre><code class="language-powershell">$startFolder = &quot;D:\\flutter&quot;
$colItems = (Get-ChildItem $startFolder  | Where-Object {$_.PSIsContainer -eq $True} | Sort-Object)
foreach ($i in $colItems)
{
    $subFolderItems = (Get-ChildItem $i.FullName -recurse | Measure-Object -property length -sum)
    $FileSize=&quot;{0:N2}&quot; -f ($subFolderItems.sum / 1GB)
    $Unit=&#39;GB&#39;
    if($FileSize -lt 1)
    {
        $FileSize=&quot;{0:N2}&quot; -f ($subFolderItems.sum / 1MB)
        $Unit=&#39;MB&#39;
    }
    write-host $i.FullName  &#39; -- &#39;  $FileSize  $Unit -fore green
}
</code></pre><h2 id="获取文件夹内的文件数量" tabindex="-1"><a class="header-anchor" href="#获取文件夹内的文件数量"><span>获取文件夹内的文件数量</span></a></h2><pre><code class="language-powershell">[System.IO.Directory]::GetFiles(&quot;d:\\flutter&quot;, &#39;*&#39;, &#39;AllDirectories&#39;).Count
</code></pre><p>或者</p><pre><code class="language-powershell">Get-ChildItem -Path &quot;d:\\flutter&quot; -Force -Recurse -ErrorAction SilentlyContinue |
 Where-Object { $_.PSIsContainer -eq $false } |
 Measure-Object | 
 Select-Object -ExpandProperty Count
</code></pre>`,18),r=[i];function s(l,c){return t(),n("div",null,r)}const p=e(a,[["render",s],["__file","my-powershell.html.vue"]]),m=JSON.parse('{"path":"/windows-tutor/powershell/my-powershell.html","title":"我的ps配置","lang":"zh-CN","frontmatter":{"description":"我的ps配置 提示 查询profile位置: $PROFILE 配置文件 下载sg源码的配置 克隆王道的文档 小爬虫 获取安装的软件 获取文件夹大小 获取文件夹内的文件数量 或者","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/windows-tutor/powershell/my-powershell.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"我的ps配置"}],["meta",{"property":"og:description","content":"我的ps配置 提示 查询profile位置: $PROFILE 配置文件 下载sg源码的配置 克隆王道的文档 小爬虫 获取安装的软件 获取文件夹大小 获取文件夹内的文件数量 或者"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-12T18:15:02.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-12T18:15:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"我的ps配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-12T18:15:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"配置文件","slug":"配置文件","link":"#配置文件","children":[]},{"level":2,"title":"下载sg源码的配置","slug":"下载sg源码的配置","link":"#下载sg源码的配置","children":[]},{"level":2,"title":"克隆王道的文档","slug":"克隆王道的文档","link":"#克隆王道的文档","children":[]},{"level":2,"title":"小爬虫","slug":"小爬虫","link":"#小爬虫","children":[]},{"level":2,"title":"获取安装的软件","slug":"获取安装的软件","link":"#获取安装的软件","children":[]},{"level":2,"title":"获取文件夹大小","slug":"获取文件夹大小","link":"#获取文件夹大小","children":[]},{"level":2,"title":"获取文件夹内的文件数量","slug":"获取文件夹内的文件数量","link":"#获取文件夹内的文件数量","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1652379302000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":8}]},"readingTime":{"minutes":0.38,"words":115},"filePathRelative":"windows-tutor/powershell/my-powershell.md","localizedDate":"2022年3月21日","autoDesc":true}');export{p as comp,m as data};
