<#
.SYNOPSIS
    JDK 离线安装（环境变量配置）
.DESCRIPTION
    配置已安装的 JDK 环境变量 JAVA_HOME
.PARAMETER JavaPath
    JDK 安装路径，例如：C:\Program Files\Java\jdk-17
.EXAMPLE
    .\install-jdk-offline.ps1 "C:\Program Files\Java\jdk-17"
#>

param(
    [Parameter(Mandatory = $true)]
    [string]$JavaPath
)

if (-not (Test-Path $JavaPath)) {
    Write-Host "❌ 路径不存在: $JavaPath" -ForegroundColor Red
    exit 1
}

Write-Host ">>> 配置 JAVA_HOME..." -ForegroundColor Cyan
[Environment]::SetEnvironmentVariable("JAVA_HOME", $JavaPath, "Machine")
[Environment]::SetEnvironmentVariable("Path", "$env:Path;$JavaPath\bin", "Machine")

Write-Host "✅ JAVA_HOME = $JavaPath" -ForegroundColor Green
Write-Host "✅ 请重新打开终端使环境变量生效" -ForegroundColor Green