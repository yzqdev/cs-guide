<#
.SYNOPSIS
    Windows 安装 Maven
.DESCRIPTION
    下载并配置 Apache Maven 环境变量
.PARAMETER MavenPath
    Maven 解压路径，默认自动解压到 C:\tools\apache-maven
.EXAMPLE
    .\install-maven.ps1
#>

param(
    [string]$MavenPath = "C:\tools\apache-maven-3.9.6"
)

$mavenZip = "C:\tools\apache-maven-3.9.6-bin.zip"
$mavenUrl = "https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  安装 Maven" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 创建目录
if (-not (Test-Path "C:\tools")) {
    New-Item -ItemType Directory -Path "C:\tools" -Force | Out-Null
}

# 下载
if (-not (Test-Path $mavenZip)) {
    Write-Host ">>> 下载 Maven..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $mavenUrl -OutFile $mavenZip
}

# 解压
if (-not (Test-Path $MavenPath)) {
    Write-Host ">>> 解压 Maven..." -ForegroundColor Yellow
    Expand-Archive -Path $mavenZip -DestinationPath "C:\tools" -Force
}

# 配置环境变量
Write-Host ">>> 配置环境变量..." -ForegroundColor Yellow
[Environment]::SetEnvironmentVariable("MAVEN_HOME", $MavenPath, "Machine")
[Environment]::SetEnvironmentVariable("Path", "$env:Path;$MavenPath\bin", "Machine")

Write-Host "✅ Maven 安装完成" -ForegroundColor Green
Write-Host "   MAVEN_HOME = $MavenPath" -ForegroundColor Green