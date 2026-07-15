<#
.SYNOPSIS
    For 循环演示脚本（PowerShell 版）
.PARAMETER MaxValue
    最大数值，默认 10
.EXAMPLE
    .\for-loop.ps1
    .\for-loop.ps1 -MaxValue 20
#>

param(
    [int]$MaxValue = 10
)

Write-Host "=== 从 0 到 ${MaxValue}，步长 5 ===" -ForegroundColor Cyan
for ($i = 0; $i -le $MaxValue; $i += 5) {
    Write-Host "i=$i"
}
Write-Host "=== 循环结束 ===" -ForegroundColor Cyan