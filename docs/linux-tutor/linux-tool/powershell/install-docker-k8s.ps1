<#
.SYNOPSIS
    Windows 安装 Docker Desktop + 启用 Kubernetes
.DESCRIPTION
    安装 Docker Desktop 并在 settings 中启用 Kubernetes
.EXAMPLE
    .\install-docker-k8s.ps1
#>

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  安装 Docker Desktop + Kubernetes" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    Write-Host "❌ winget 不可用" -ForegroundColor Red
    exit 1
}

Write-Host ">>> 安装 Docker Desktop..." -ForegroundColor Yellow
winget install --id Docker.DockerDesktop --silent --accept-package-agreements

Write-Host ""
Write-Host "⚠️  安装完成后，请手动操作:" -ForegroundColor Yellow
Write-Host "  1. 启动 Docker Desktop" -ForegroundColor Yellow
Write-Host "  2. 进入 Settings → Kubernetes" -ForegroundColor Yellow
Write-Host "  3. 勾选 Enable Kubernetes" -ForegroundColor Yellow
Write-Host "  4. 点击 Apply & Restart" -ForegroundColor Yellow
Write-Host ""
Write-Host "✅ Docker Desktop 安装完成" -ForegroundColor Green