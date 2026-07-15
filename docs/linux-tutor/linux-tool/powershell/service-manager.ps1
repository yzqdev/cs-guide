<#
.SYNOPSIS
    Java 服务管理脚本（启动/停止/重启/状态）
.DESCRIPTION
    管理 Windows 上的 Java 后台服务进程
.PARAMETER Action
    操作类型: start, stop, restart, status
.PARAMETER ServiceName
    服务名称（jar 文件名）
.PARAMETER ServicePath
    服务所在路径
.EXAMPLE
    .\service-manager.ps1 start myapp.jar C:\apps\myapp
    .\service-manager.ps1 status myapp.jar
#>

param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("start", "stop", "restart", "status")]
    [string]$Action,

    [Parameter(Mandatory = $true)]
    [string]$ServiceName,

    [Parameter(Mandatory = $true)]
    [string]$ServicePath
)

$logFile = "C:\opt\run-log.log"

# 获取进程
function Get-JavaProcess {
    Get-Process -Name "java" -ErrorAction SilentlyContinue |
        Where-Object { $_.CommandLine -like "*$ServiceName*" }
}

function Start-Service {
    $proc = Get-JavaProcess
    if ($proc) {
        Write-Host "$ServiceName is running..." -ForegroundColor Yellow
    } else {
        Write-Host "Start $ServiceName..." -ForegroundColor Cyan
        $job = Start-Job -ScriptBlock {
            param($p, $n, $l)
            Set-Location $p
            Start-Process -FilePath "java" -ArgumentList "-jar $n" -NoNewWindow -RedirectStandardOutput $l
        } -ArgumentList $ServicePath, $ServiceName, $logFile
        Write-Host "Start $ServiceName success..." -ForegroundColor Green
    }
}

function Stop-Service {
    $proc = Get-JavaProcess
    if ($proc) {
        Write-Host "Stop $ServiceName..." -ForegroundColor Cyan
        $proc | Stop-Process -Force
        Write-Host "$ServiceName stopped" -ForegroundColor Green
    } else {
        Write-Host "$ServiceName is not running..." -ForegroundColor Yellow
    }
}

function Restart-Service {
    Stop-Service
    Start-Sleep -Seconds 2
    Start-Service
}

function Get-Status {
    $proc = Get-JavaProcess
    if ($proc) {
        Write-Host "$ServiceName is running (PID: $($proc.Id))" -ForegroundColor Green
    } else {
        Write-Host "$ServiceName is not running..." -ForegroundColor Yellow
    }
}

switch ($Action) {
    "start"   { Start-Service }
    "stop"    { Stop-Service }
    "restart" { Restart-Service }
    "status"  { Get-Status }
}