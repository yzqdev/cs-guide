<#
.SYNOPSIS
    Windows 安装 JDK（使用 winget）
.DESCRIPTION
    通过 winget 安装 Adoptium JDK 并配置 JAVA_HOME
.EXAMPLE
    .\install-jdk.ps1
#>

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  安装 JDK" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    Write-Host "❌ winget 不可用" -ForegroundColor Red
    exit 1
}

Write-Host ">>> 安装 Adoptium JDK 17..." -ForegroundColor Yellow
winget install --id EclipseAdoptium.Temurin.17.JDK --silent --accept-package-agreements

Write-Host ">>> 配置 JAVA_HOME 环境变量..." -ForegroundColor Yellow
$javaPath = Get-ChildItem "C:\Program Files\Eclipse Adoptium\*" -Directory | Sort-Object Name -Descending | Select-Object -First 1
if ($javaPath) {
    [Environment]::SetEnvironmentVariable("JAVA_HOME", $javaPath.FullName, "Machine")
    Write-Host "✅ JAVA_HOME = $($javaPath.FullName)" -ForegroundColor Green
}

Write-Host "✅ JDK 安装完成，请重新打开终端使环境变量生效" -ForegroundColor Green