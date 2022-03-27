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
    git commit -m 'update' ;
    git push origin main -f ; 
    git gc --aggressive --prune=all
}
Set-Alias yr deleteNodemodules
Set-Alias ip fluship
Set-Alias y yarnDev
Set-Alias gitp gpFunc
Set-Alias gitc gcacheFun
# chcp 65001


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
# conda activate condapkg
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
