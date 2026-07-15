<#
.SYNOPSIS
    Windows 安装 Docker Desktop
.DESCRIPTION
    通过 winget 安装 Docker Desktop for Windows
.EXAMPLE
    .\install-docker.ps1
#>

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  安装 Docker Desktop" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 检查 winget
if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    Write-Host "❌ winget 不可用" -ForegroundColor Red
    exit 1
}

Write-Host ">>> 安装 Docker Desktop..." -ForegroundColor Yellow
winget install --id Docker.DockerDesktop --silent --accept-package-agreements

Write-Host ">>> 等待安装完成，请手动启动 Docker Desktop" -ForegroundColor Yellow
Write-Host "✅ Docker Desktop 安装完成" -ForegroundColor Green