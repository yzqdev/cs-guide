<#
.SYNOPSIS
    Redis 服务重启脚本
.DESCRIPTION
    停止并重新启动 Redis 服务（Windows 版）
.EXAMPLE
    .\restart-redis.ps1
#>

Write-Host ">>> 停止 Redis 服务..." -ForegroundColor Cyan
Stop-Service -Name "Redis" -ErrorAction SilentlyContinue
if ($?) {
    Write-Host "    Redis 已停止" -ForegroundColor Green
} else {
    Write-Host "    Redis 服务未运行或不存在" -ForegroundColor Yellow
}

Write-Host ">>> 等待 5 秒..." -ForegroundColor Cyan
Start-Sleep -Seconds 5

Write-Host ">>> 启动 Redis 服务..." -ForegroundColor Cyan
Start-Service -Name "Redis" -ErrorAction SilentlyContinue
if ($?) {
    Write-Host "    Redis 已启动" -ForegroundColor Green
} else {
    Write-Host "    Redis 启动失败，请检查服务是否已安装" -ForegroundColor Red
}

Write-Host ">>> Redis 重启完成" -ForegroundColor Green