<#
.SYNOPSIS
    定时任务测试脚本：记录两次时间到日志文件
.DESCRIPTION
    模拟 crontab 执行，记录开始和结束时间到 C:\temp\cron-test.log
.EXAMPLE
    .\cron-test.ps1
#>

$logFile = "C:\temp\cron-test.log"
$logDir = Split-Path $logFile -Parent
if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir -Force | Out-Null
}

$time1 = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
"${time1}" | Out-File -FilePath $logFile -Append

Start-Sleep -Seconds 5

$time2 = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
"${time2}" | Out-File -FilePath $logFile -Append

Write-Host "日志已写入: $logFile" -ForegroundColor Green