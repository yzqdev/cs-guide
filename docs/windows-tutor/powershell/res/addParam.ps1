param (
    [String]$Type = "run"
)
$name = "server"
$curDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Write-Host "当前路径"$curDir   -ForegroundColor Yellow
if ($Type -eq "run") {
    Write-Host "运行" -ForegroundColor Cyan
    Write-Host "go run main.go" -ForegroundColor Cyan 
}
elseif ($Type -eq "build") {
    Write-Host "编译" -ForegroundColor Red
    Write-Host "go build" -ForegroundColor Cyan
    
}
