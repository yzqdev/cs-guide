<#
.SYNOPSIS
    Windows 安装 Mycat 数据库中间件
.DESCRIPTION
    下载并配置 Mycat 数据库中间件
.PARAMETER MycatPath
    Mycat 安装路径，默认 C:\tools\mycat
.EXAMPLE
    .\install-mycat.ps1
#>

param(
    [string]$MycatPath = "C:\tools\mycat"
)

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  安装 Mycat" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 检查 JAVA_HOME
if (-not $env:JAVA_HOME) {
    Write-Host "❌ 没有 JAVA_HOME 环境变量，请先安装 JDK" -ForegroundColor Red
    exit 1
}

# 创建目录
if (-not (Test-Path "C:\tools")) {
    New-Item -ItemType Directory -Path "C:\tools" -Force | Out-Null
}

# 下载 Mycat
$mycatZip = "C:\tools\Mycat-server-1.6-RELEASE-win.zip"
$mycatUrl = "https://github.com/MyCATApache/Mycat-Server/releases/download/1.6-RELEASE/Mycat-server-1.6-RELEASE-win.zip"

if (-not (Test-Path $mycatZip)) {
    Write-Host ">>> 下载 Mycat..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $mycatUrl -OutFile $mycatZip
}

# 解压
if (-not (Test-Path $MycatPath)) {
    Write-Host ">>> 解压 Mycat..." -ForegroundColor Yellow
    Expand-Archive -Path $mycatZip -DestinationPath "C:\tools" -Force
}

# 配置环境变量
Write-Host ">>> 配置环境变量..." -ForegroundColor Yellow
[Environment]::SetEnvironmentVariable("MYCAT_HOME", $MycatPath, "Machine")

Write-Host "✅ Mycat 安装完成" -ForegroundColor Green
Write-Host "   MYCAT_HOME = $MycatPath" -ForegroundColor Green