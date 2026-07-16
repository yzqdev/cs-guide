# 我的 PowerShell 配置与脚本

> 实用 PowerShell 配置文件和日常脚本集合。

:::tip
查询 `profile` 位置：`$PROFILE`
:::

## 配置文件（$PROFILE）

保存以下内容到 `$PROFILE`：

```powershell
# ===== 网络工具 =====
function fluship {
    ipconfig /flushdns
}

# ===== Yarn 加速 =====
function yarnDev {
    yarn --registry=https://registry.npmmirror.com && yarn dev
}

function yarnInstall {
    yarn install --registry=https://registry.npmmirror.com
}

# ===== 删除 node_modules 后重建 =====
function deletePnpm {
    Copy-Item .\package.json -Destination .\package.jsonbak
    Remove-Item .\package.json
    if (Test-Path "pnpm-lock.yml") {
        Remove-Item "pnpm-lock.yml"
    }
    Write-Output '删除 node_modules 中'
    pnpm init && pnpm add axios
    Remove-Item -Force -Recurse .\node_modules
    Remove-Item .\package.json
    Copy-Item .\package.jsonbak -Destination .\package.json
    Remove-Item .\package.jsonbak
    Remove-Item '*lock*'
    Write-Output '已完成'
}

function deleteNodemodules {
    Copy-Item .\package.json -Destination .\package.jsonbak
    Remove-Item .\package.json
    Write-Output '删除 node_modules 中'
    yarn init -y && yarn add axios
    Remove-Item -Force -Recurse .\node_modules
    Remove-Item .\package.json
    Copy-Item .\package.jsonbak -Destination .\package.json
    Remove-Item .\package.jsonbak
    Remove-Item '*lock*'
    Write-Output '已完成'
}

# ===== Git 快捷操作 =====
function gbFun {
    git pull --rebase
}

function glogFun {
    git log --graph --pretty='%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%ar) %C(bold blue)<%an>%Creset'
}

function gpFunc {
    git add -A && git commit -m $args[0] && git push origin main
}

function gcacheFun {
    git checkout --orphan dev
    git add -A
    git branch -D main
    git branch -m main
    git commit -m 'Initial commit'
    git push origin main -f
    git gc --aggressive --prune=all
}

# ===== 文件工具 =====
function Format-FileSize() {
    Param ([int]$size)
    If ($size -gt 1TB) { [string]::Format("{0:0.00} TB", $size / 1TB) }
    ElseIf ($size -gt 1GB) { [string]::Format("{0:0.00} GB", $size / 1GB) }
    ElseIf ($size -gt 1MB) { [string]::Format("{0:0.00} MB", $size / 1MB) }
    ElseIf ($size -gt 1KB) { [string]::Format("{0:0.00} kB", $size / 1KB) }
    ElseIf ($size -gt 0) { [string]::Format("{0:0.00} B", $size) }
    Else { "" }
}

function lsmFunc() {
    Get-ChildItem | Select-Object Name, LastWriteTime,
        @{Name = "Size"; Expression = { Format-FileSize($_.Length) } }
}

function getCmdPath() {
    start (Get-ChildItem (Get-Command -Name $args[0]).Source).Directory
}

# ===== dotnet CLI 补全 =====
Register-ArgumentCompleter -Native -CommandName dotnet -ScriptBlock {
    param($commandName, $wordToComplete, $cursorPosition)
    dotnet complete --position $cursorPosition "$wordToComplete" | ForEach-Object {
        [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_)
    }
}

# ===== 别名 =====
Remove-Alias -Name ni -Force
Set-Alias yr deleteNodemodules
Set-Alias pr deletePnpm
Set-Alias ip fluship
Set-Alias yd yarnDev
Set-Alias y  yarnInstall
Set-Alias gitp gpFunc
Set-Alias gitc gcacheFun
Set-Alias gcp getCmdPath
Set-Alias gb  gbFun
Set-Alias glog glogFun
Set-Alias kate "C:\Program Files\Kate\bin\kate.exe"
Set-Alias lsm lsmFunc

# ===== VS Code Shell Integration =====
if ($env:TERM_PROGRAM -eq "vscode") {
    . "$env:USERPROFILE\AppData\Local\Programs\Microsoft VS Code\resources\app\out\vs\workbench\contrib\terminal\browser\media\shellIntegration.ps1"
}

# ===== PSReadLine =====
Import-Module PSReadLine
Import-Module -Name Terminal-Icons
Set-PSReadLineOption -PredictionSource History
Set-PSReadlineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadlineKeyHandler -Key DownArrow -Function HistorySearchForward
Import-Module posh-git
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\negligible.omp.json" | Invoke-Expression
```

## 获取安装的软件

列出本机所有已安装的软件：

```powershell
function Get-InstalledSoftwares {
    function ConvertTo-ProductEntity {
        param([Microsoft.Win32.RegistryKey]$RegKey)
        $product = '' | select Name, Publisher, Version
        $product.Name = $_.GetValue("DisplayName")
        $product.Publisher = $_.GetValue("Publisher")
        $product.Version = $_.GetValue("DisplayVersion")
        if (-not [string]::IsNullOrEmpty($product.Name)) { $product }
    }

    $UninstallPaths = @(
        'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall',
        'HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall'
    )

    if ([Environment]::Is64BitOperatingSystem) {
        $UninstallPaths += 'HKLM:SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall'
    }

    $UninstallPaths | ForEach-Object {
        Get-ChildItem $_ | ForEach-Object {
            ConvertTo-ProductEntity -RegKey $_
        }
    }
}
```

## 克隆王道的文档（wangdoc）

批量克隆 wangdoc 系列教程并提取 docs 文件夹：

```powershell
$prefix = 'https://github.com/wangdoc/'
$suffix = '.git'
$cur = $PWD
$gitRepos = 'bash-tutorial', 'git-tutorial', 'node-tutorial', 'javascript-tutorial',
            'clang-tutorial', 'css-tutorial', 'es6-tutorial', 'ssh-tutorial',
            'html-tutorial', 'webapi-tutorial'

$dest = 'E:\myblogs\wangdoc\docs\'
$tmpPath = $env:tmp + '\wang\'

if (-not (Test-Path $tmpPath)) { mkdir $tmpPath }
Set-Location $tmpPath

function cloneOnlyDocs {
    foreach ($item in $gitRepos) {
        if (-not (Test-Path $item)) { mkdir $item }
        Set-Location $item
        Write-Host "当前路径 $PWD" -ForegroundColor Cyan

        if (Test-Path ".git") {
            Write-Host '已有 git 文件夹' -ForegroundColor Cyan
            switch ($item) {
                'ssh-tutorial' { git pull origin main }
                'clang-tutorial' { git pull origin main }
                Default { git pull origin master }
            }
        } else {
            git init
            git remote add origin $prefix$item$suffix
            git config core.sparsecheckout true
            Write-Output 'docs' >> '.git/info/sparse-checkout'
            switch ($item) {
                'ssh-tutorial' { git pull origin main }
                'clang-tutorial' { git pull origin main }
                Default { git pull origin master }
            }
        }

        Copy-Item -Path 'docs' -Destination $dest$item -Recurse -Force
        Set-Location ../
    }
}

cloneOnlyDocs
Remove-Item -Recurse -Force $tmpPath
Set-Location $cur
```

## 百度图片爬虫

```powershell
function Get-Random-String {
    $fileName = -join ([char[]](65..90 + 97..122) | Get-Random -Count 6)
    $fileName
}

function Resolve-Directory {
    param ([Parameter(Mandatory)][string]$Path)
    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -Path $Path -ItemType Directory -ErrorAction SilentlyContinue
    }
}

function Invoke-MD5 {
    param ([Parameter(Mandatory)][string]$Path)
    begin { $global:hashTable = @{} }
    process {
        Get-ChildItem -Path $Path | Where-Object {
            $hash = Get-FileHash -Path $_.FullName -Algorithm MD5
            $hashTable[$hash.Hash] = $hash.Path
        }
    }
}

function Get-Images {
    param (
        [Parameter(ValueFromPipeline)][int]$page = 1,
        [Parameter(Mandatory)][string]$Path,
        [Parameter(Mandatory)][string]$keyword
    )
    begin {
        Resolve-Directory -Path $Path
        Invoke-MD5 -Path $Path
        $headers = @{
            'Accept' = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            'Accept-Encoding' = 'gzip, deflate, br'
            'Accept-Language' = 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7'
            'Host' = 'image.baidu.com'
            'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
        }
    }
    process {
        $n = ($page * 20)
        $word = [uri]::EscapeDataString($keyword)
        $url = "https://image.baidu.com/search/flip?tn=baiduimage&ie=utf-8&word=${word}&pn=$n"
        Write-Host "Handling $url`n"
        $web = Invoke-WebRequest -Uri $url -Method GET -Headers $headers
        $web | Select-String '"objURL":"https?://+[^\s]+[\w]' -AllMatches |
            ForEach-Object { $_.Matches } | ForEach-Object {
                $_ -match 'https?://.+.'
                $Matches.Values | ForEach-Object {
                    Write-Host "Fetching from $_" -ForegroundColor Cyan
                    $ext = ([regex]'\.(jpe?g|png|gif|tif|bmp)').Match($_).Value
                    if ([String]::IsNullOrEmpty($ext)) { $ext = ".jpg" }
                    $fileFullName = (Get-Random-String) + $ext
                    $TargetPath = Join-Path -Path $Path -ChildPath $fileFullName
                    Invoke-WebRequest -Uri $_ -PassThru -TimeoutSec 20000 -OutFile $TargetPath -ErrorAction SilentlyContinue
                    if ((Test-Path $TargetPath)) {
                        $hashValue = (Get-FileHash -Path $TargetPath -Algorithm MD5).Hash
                        if ($hashValue -and $hashTable.ContainsKey($hashValue)) {
                            Remove-Item -Path $TargetPath -Force -ErrorAction SilentlyContinue
                        }
                    }
                    Start-Sleep -Milliseconds 1000
                }
            }
    }
}

# 使用：爬取百度图片 "soft cat"，保存到 d:\temp\baiduimages
0..10 | Get-Images -Path "d:\temp\baiduimages" -keyword "soft cat"
```

## 获取文件夹内的文件数量

```powershell
[System.IO.Directory]::GetFiles("d:\flutter", '*', 'AllDirectories').Count
```

或者：

```powershell
Get-ChildItem -Path "d:\flutter" -Force -Recurse -ErrorAction SilentlyContinue |
    Where-Object { $_.PSIsContainer -eq $false } |
    Measure-Object |
    Select-Object -ExpandProperty Count
```
