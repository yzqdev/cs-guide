<#
.SYNOPSIS
    Windows 常用开发工具安装（使用 winget）
.DESCRIPTION
    通过 winget 安装 Windows 常用的开发工具
.EXAMPLE
    .\install-common-tools.ps1
#>

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  开始安装常用工具" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 检查 winget 是否可用
if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    Write-Host "❌ winget 不可用，请先安装应用安装程序" -ForegroundColor Red
    exit 1
}

$tools = @(
    @{ Name = "7zip"; Id = "7zip.7zip" },
    @{ Name = "Git"; Id = "Git.Git" },
    @{ Name = "Wget"; Id = "GNU.Wget" },
    @{ Name = "Google Chrome"; Id = "Google.Chrome" },
    @{ Name = "Visual Studio Code"; Id = "Microsoft.VisualStudioCode" },
    @{ Name = "Windows Terminal"; Id = "Microsoft.WindowsTerminal" },
    @{ Name = "PowerShell 7"; Id = "Microsoft.PowerShell" }
)

foreach ($tool in $tools) {
    Write-Host "  安装 $($tool.Name)..." -ForegroundColor Yellow
    winget install --id $tool.Id --silent --accept-package-agreements 2>$null
}

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  常用工具安装完成" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan