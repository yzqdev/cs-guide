<#
.SYNOPSIS
    Windows 安装 Vim 和基础配置
.DESCRIPTION
    通过 winget 安装 Vim 并创建基础配置
.EXAMPLE
    .\install-vim.ps1
#>

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  安装 Vim" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 安装 Vim
if (Get-Command winget -ErrorAction SilentlyContinue) {
    Write-Host ">>> 安装 Vim..." -ForegroundColor Yellow
    winget install --id vim.vim --silent --accept-package-agreements
}

# 创建基础配置
$vimrc = "$env:USERPROFILE\_vimrc"
if (-not (Test-Path $vimrc)) {
    @"
set number
set tabstop=4
set shiftwidth=4
set expandtab
set autoindent
syntax on
"@ | Out-File -FilePath $vimrc -Encoding ASCII
    Write-Host "✅ Vim 配置已创建: $vimrc" -ForegroundColor Green
}

Write-Host "✅ Vim 安装完成" -ForegroundColor Green