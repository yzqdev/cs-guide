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
    
 