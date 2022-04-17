# ps配置

:::tip
查询`profile`位置: `$PROFILE`

:::

## 配置文件

```powershell
function fluship {
    ipconfig /flushdns
}
function yarnDev {
    yarn && yarn dev
}
function removeItem {
    Remove-Item -Recurse -Force
    
}
function deleteNodemodules {
    Copy-Item .\package.json -Destination .\package.jsonbak;
    Remove-Item .\package.json;
    yarn init -y && yarn add axios;
    Write-Output '删除node_modules中'
    Remove-Item -Force -Recurse .\node_modules;
    Remove-Item .\package.json;
    Copy-Item .\package.jsonbak -Destination .\package.json;
    Remove-Item .\package.jsonbak
    # 删除文件名中包含lock字符的文件
    Remove-Item   '*lock*'
    Write-Output '已完成'
}

function gpFunc {
    git add -A && git commit -m $args[0] && git push origin main
}
function gcacheFun {
    git checkout --orphan dev ;
    git add -A ;
    git branch -D main ;
    git branch -m main ; 
    git commit -m 'Initial commit' ;
    git push origin main -f ; 
    git gc --aggressive --prune=all
}
Set-Alias yr deleteNodemodules
Set-Alias ip fluship
Set-Alias y yarnDev
Set-Alias gitp gpFunc
Set-Alias gitc gcacheFun
#chcp 65001


# PSReadLine
Import-Module PSReadLine
# Enable Prediction History
Set-PSReadLineOption -PredictionSource History
# Advanced Autocompletion for arrow keys
Set-PSReadlineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadlineKeyHandler -Key DownArrow -Function HistorySearchForward
Import-Module posh-git
Import-Module oh-my-posh
Set-PoshPrompt -Theme amro
#conda activate condapkg
```

## 下载sg源码的配置

```powershell
$snapName = ".\Snap.Genshin"
function cloneSnap {
    git clone "https://github.com/DGP-Studio/Snap.Genshin.git";
    if (Test-Path ".\Snap.Genshin") {
        Set-Location Snap.Genshin
    }
}
# 复制metadata
function copyMeta {
    # 获取dotnet版本
    $snapCsProj = Get-Content ".\DGP.Genshin\DGP.Genshin.csproj"
    $reg = "<TargetFramework>(?<netVersion>.*?)</TargetFramework>"
    $version = ""
    foreach ($line in $snapCsProj) {
        if ($line -match $reg) {       
            $version = $Matches.netVersion;
        }
    
    }
    if ( Test-Path ".git"  ) {
        $buildDir = "Build\\Debug\\$version" 
        git submodule update --init --recursive
        if (-not (Test-Path  $buildDir)) {
            mkdir "$buildDir\\Plugins\\"
            xcopy Metadata\\*.json "$buildDir\\Metadata\\" /e /y
        }
        else {
            xcopy Metadata\\*.json "$buildDir\\Metadata\\" /e /y
        }
     
    }
    else {
        Write-Host '不是一个有效的git仓库,请重新clone https://github.com/DGP-Studio/Snap.Genshin.git' -ForegroundColor Magenta
        Exit-PSSession
    }
    # 返回目录
    Set-Location '../'
}
 
function run {
    Write-Output "将在本文件夹创建项目 Snap.Genshin"
    Write-Host "确定继续吗?(输入y确认,输入n退出)" -NoNewline -ForegroundColor Magenta
    $response = read-host
    if ( $response -ne "Y" ) { 
        exit 
    }
    else {
        if (Test-Path $snapName) {
            Write-Host "文件夹已经存在了!"
            Exit
        }
        else {
            cloneSnap
            copyMeta
        }
    }
}
run
    
 
```

## 克隆王道的文档

```powershell
$prefix = 'https://github.com/wangdoc/'
$suffix = '.git'
$cur = $PWD
$gitRepos = 'bash-tutorial', 'git-tutorial', 'node-tutorial', 'javascript-tutorial', 'clang-tutorial', 'css-tutorial', 'es6-tutorial', 'ssh-tutorial', 'html-tutorial', 'webapi-tutorial'
# 这里填你的docs文件夹
 
$dest = 'E:\myblogs\wangdoc\docs\'
# 系统临时文件路径
$tmpPath = $env:tmp + '\wang\'
Write-Host  '设置临时文件路径'$tmpPath -ForegroundColor Cyan
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
    
        Write-Host '当前路径'$PWD -ForegroundColor Cyan
        if (Test-Path ".git" ) {
            Write-Host  '已有git文件夹' -ForegroundColor Cyan
            switch ($item) {
                'ssh-tutorial' {  
                    git pull origin main
                } 
                'clang-tutorial' {  
                    git pull origin main
                }
                Default {
                    git pull origin master
                }
            }
            Write-Host '从docs复制到'$dest$item -ForegroundColor Cyan
            # 注意下面的\文件夹分割
            Copy-Item  -Path 'docs'-Destination  $dest$item -Recurse -Force
            Set-Location ../
        }
        else {
            git init
            git remote add origin $prefix$item$suffix
            # 设置允许克隆子目录
            git config core.sparsecheckout true 
            Write-Host  '没有git文件夹,正在克隆' -ForegroundColor Cyan
            Write-Host '当前路径'$PWD -ForegroundColor Cyan
            Write-Output 'docs' >> '.git/info/sparse-checkout'  
            switch ($item) {
                'ssh-tutorial' {  
                    git pull origin main
                } 
                'clang-tutorial' {  
                    git pull origin main
                }
                Default {
                    git pull origin master
                }
            }
            # 注意下面的\文件夹分割 -Force 覆盖文件
            Copy-Item  -Path 'docs'  -Destination  $dest$item -Recurse -Force
            Set-Location ../
        }
    } 
     
}

function delTmpPath {
    Remove-Item -Recurse -Force $tmpPath
    
}
cloneOnlyDocs
Set-Location $cur
```
