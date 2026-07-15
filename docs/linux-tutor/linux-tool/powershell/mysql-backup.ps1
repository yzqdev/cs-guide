<#
.SYNOPSIS
    MySQL 数据库备份脚本（Windows 版）
.PARAMETER BackupDate
    备份日期，格式 YYYYMMDD，默认当天
.EXAMPLE
    .\mysql-backup.ps1
    .\mysql-backup.ps1 -BackupDate "20260715"
#>

param(
    [string]$BackupDate = (Get-Date -Format "yyyyMMdd")
)

$backupDir = "C:\backup\mysql"
$backupFile = "$backupDir\mydb-$BackupDate.sql"

if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
}

Write-Host "📅 备份日期 = $BackupDate" -ForegroundColor Cyan
Write-Host "📦 开始备份..." -ForegroundColor Cyan

# 使用 mysqldump（需在 PATH 中）
$mysqldump = Get-Command mysqldump -ErrorAction SilentlyContinue
if (-not $mysqldump) {
    Write-Host "❌ mysqldump 未找到，请确保 MySQL 已安装并在 PATH 中" -ForegroundColor Red
    exit 1
}

& mysqldump -u root -p 数据库名 > $backupFile

if ($?) {
    Write-Host "✅ 备份完成: $backupFile" -ForegroundColor Green
} else {
    Write-Host "❌ 备份失败" -ForegroundColor Red
}