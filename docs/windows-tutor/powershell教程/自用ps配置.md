# ps配置

:::tip
查询`profile`位置: `$PROFILE`

:::

## 配置文件

```powershell
function fluship {
    ipconfig /flushdns
}
function yarnDev {
    yarn && yarn dev
}
function removeItem {
    Remove-Item -Recurse -Force
    
}
function deleteNodemodules {
    Copy-Item .\package.json -Destination .\package.jsonbak;
    Remove-Item .\package.json;
    yarn init -y && yarn add axios;
    Write-Output '删除node_modules中'
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
    git commit -m 'update' ;
    git push origin main -f ; 
    git gc --aggressive --prune=all
}
Set-Alias yr deleteNodemodules
Set-Alias ip fluship
Set-Alias y yarnDev
Set-Alias gitp gpFunc
Set-Alias gitc gcacheFun
# chcp 65001


# PSReadLine
Import-Module PSReadLine
# Enable Prediction History
Set-PSReadLineOption -PredictionSource History
# Advanced Autocompletion for arrow keys
Set-PSReadlineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadlineKeyHandler -Key DownArrow -Function HistorySearchForward
Import-Module posh-git
Import-Module oh-my-posh
Set-PoshPrompt -Theme amro
# conda activate condapkg
```
