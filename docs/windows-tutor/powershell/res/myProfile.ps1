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
# PowerShell parameter completion shim for the dotnet CLI
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
Set-Alias gitc gcacheFun
Set-Alias kate "C:\Program Files\Kate\bin\kate.exe"
#chcp 65001
#chcp 936


# PSReadLine
Import-Module PSReadLine
# Enable Prediction History
Set-PSReadLineOption -PredictionSource History
# Advanced Autocompletion for arrow keys
Set-PSReadlineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadlineKeyHandler -Key DownArrow -Function HistorySearchForward
Import-Module posh-git
 oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\negligible.omp.json"|Invoke-Expression

#conda activate condapkg
