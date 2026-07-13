# Shell 脚本

<Catalog />

## 目录

| 文件 | 内容 |
|------|------|
| [PowerShell 命令](./powershell.md) | PowerShell 删除、统计、遍历、dotnet 发布等 |

## 快速参考

```powershell
# PowerShell 基础
Get-ChildItem        # ls / dir
Set-Location         # cd
Get-Content          # cat / type
Select-String        # grep / findstr
Where-Object         # where / filter
ForEach-Object       # foreach

# 常用别名
# ls → Get-ChildItem
# cd → Set-Location  
# cat → Get-Content
# echo → Write-Output
# sleep → Start-Sleep
```

```bash
# Bash 基础
ls -la               # 列出文件
cd /path             # 切换目录
grep pattern file    # 搜索
find . -name "*.js"  # 查找文件
chmod +x script.sh   # 添加执行权限
./script.sh          # 运行脚本

# 变量
NAME="world"
echo "Hello, $NAME!"

# 条件
if [ -f "file.txt" ]; then
    echo "文件存在"
fi

# 循环
for f in *.txt; do
    echo "处理 $f"
done
```
