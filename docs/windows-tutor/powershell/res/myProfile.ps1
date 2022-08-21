function fluship {
    ipconfig /flushdns
}
function yarnDev {
    yarn --registry=https://registry.npmmirror.com && yarn dev
}
function yarnInstall {
    yarn install --registry=https://registry.npmmirror.com
}
function removeItem {
    Remove-Item -Recurse -Force

}
function getCmdPath() {
    start (Get-ChildItem (Get-Command -Name $args[0]).Source).Directory
}
function deletePnpm {
    Copy-Item .\package.json -Destination .\package.jsonbak;
    Remove-Item .\package.json;
    if (Test-Path "pnpm-lock.yml") {
        Remove-Item  "pnpm-lock.yml";
    }

    Write-Output '删除node_modules中'
    pnpm init && pnpm add axios
    Remove-Item -Force -Recurse .\node_modules;
    Remove-Item .\package.json;
    Copy-Item .\package.jsonbak -Destination .\package.json;
    Remove-Item .\package.jsonbak
    # 删除文件名中包含lock字符的文件
    Remove-Item   '*lock*'
    Write-Output '已完成'
}
function deleteNodemodules {
    Copy-Item .\package.json -Destination .\package.jsonbak;
    Remove-Item .\package.json;
    Write-Output '删除node_modules中'
    yarn init -y && yarn add axios;

    Remove-Item -Force -Recurse .\node_modules;
    Remove-Item .\package.json;
    Copy-Item .\package.jsonbak -Destination .\package.json;
    Remove-Item .\package.jsonbak
    # 删除文件名中包含lock字符的文件
    Remove-Item   '*lock*'
    Write-Output '已完成'
}
function gbFun {
    git pull --rebase
}
function glogFun {
    git log --graph --pretty='%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%ar) %C(bold blue)<%an>%Creset'
}
function gpFunc {
    git add -A && git commit -m $args[0] && git push origin main
}
function gcacheFun {
    git checkout --orphan dev ;
    git add -A ;
    git branch -D main ;
    git branch -m main ;
    git commit -m 'Initial commit' ;
    git push origin main -f ;
    git gc --aggressive --prune=all
}
function Format-FileSize() {
    Param ([int]$size)
    If ($size -gt 1TB) { [string]::Format("{0:0.00} TB", $size / 1TB) }
    ElseIf ($size -gt 1GB) { [string]::Format("{0:0.00} GB", $size / 1GB) }
    ElseIf ($size -gt 1MB) { [string]::Format("{0:0.00} MB", $size / 1MB) }
    ElseIf ($size -gt 1KB) { [string]::Format("{0:0.00} kB", $size / 1KB) }
    ElseIf ($size -gt 0) { [string]::Format("{0:0.00} B", $size) }
    Else { "" }
}
function lsmFunc() {
    Get-ChildItem | Select-Object Name, LastWriteTime, @{Name = "Size"; Expression = { Format-FileSize($_.Length) } }
}
# # PowerShell parameter completion shim for the dotnet CLI
Register-ArgumentCompleter -Native -CommandName dotnet -ScriptBlock {
    param($commandName, $wordToComplete, $cursorPosition)
    dotnet complete --position $cursorPosition "$wordToComplete" | ForEach-Object {
        [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_)
    }
}
Remove-Alias -Name ni -Force
Set-Alias yr deleteNodemodules
Set-Alias pr deletePnpm
Set-Alias ip fluship
Set-Alias yd yarnDev
Set-Alias y yarnInstall
Set-Alias gitp gpFunc
Set-Alias gitc gcacheFunq
Set-Alias gcp getCmdPath
Set-Alias gb gbFun
Set-Alias glog glogFun
Set-Alias kate "C:\Program Files\Kate\bin\kate.exe"
Set-Alias lsm lsmFunc
# #chcp 65001
# #chcp 936
if ($env:TERM_PROGRAM -eq "vscode") {
    . "$env:USERPROFILE\AppData\Local\Programs\Microsoft VS Code\resources\app\out\vs\workbench\contrib\terminal\browser\media\shellIntegration.ps1"
}
# if ($env:TERM_PROGRAM -eq "vscode") { . "$(code --locate-shell-integration-path pwsh)" }
# # PSReadLine
Import-Module PSReadLine
Import-Module -Name Terminal-Icons
# # Enable Prediction History
Set-PSReadLineOption -PredictionSource History
# # Advanced Autocompletion for arrow keys
Set-PSReadlineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadlineKeyHandler -Key DownArrow -Function HistorySearchForward
Import-Module posh-git
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\negligible.omp.json" | Invoke-Expression
#
# #conda activate condapkg
