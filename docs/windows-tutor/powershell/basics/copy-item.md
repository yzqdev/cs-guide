# 复制

PowerShell 中使用`Copy-Item`将一个项目从一个位置复制到另一个位置，可以是复制单个文件、也可以复制文件夹。

## 复制文件和文件夹

最简单的复制一个文件到另一个文件夹内，如果目标文件夹不存在会自动创建。

```powershell
Copy-Item "E:\PowerShell\form\1.txt" -Destination "E:\PowerShell\to\"
```

如果`-Destination`参数是文件名，就会重命名文件。

```powershell
Copy-Item "E:\PowerShell\form\1.txt" -Destination "E:\PowerShell\to\2.txt"
```

使用通配符可以复制文件夹内所有文件到另一个文件内，加上`-Recurse`就能复制所有的文件和子文件夹的内容。

```powershell
Copy-Item "E:\PowerShell\form\*" -Destination "E:\PowerShell\to\" -Recurse
```

注意，在复制文件夹时，**当 to 文件夹不存在时**，效果和上面一样，但实际功能是**复制 from 文件夹并且重命名为 to**。
当 to 文件夹已存在时，最终的结果目录结构会是 `E:\PowerShell\to\from\`，也就是把整个 from 文件夹复制到 to 文件夹内。

```powershell
Copy-Item "E:\PowerShell\form\" -Destination "E:\PowerShell\to\ -Recurse"
```

## 排除和包含

使用`-Filter`参数可以设置复制特定文件名的文件或文件夹，如下例子，如果文件夹名称是 *.txt 也会被复制。
注意，使用此参数时目标文件夹 to 必须是存在的，否则报错。

```powershell
Copy-Item "E:\PowerShell\from\*" -Destination "E:\PowerShell\to\" -Filter '*.txt'
```

使用`-Exclude`或`-Include`参数来排除或包含文件或文件夹，值是单个文件名，或者是包含多个文件名称的数组，同样这里的文件名也包含文件夹名。

```powershell
Copy-Item "E:\PowerShell\from\*" -Destination "E:\PowerShell\to\" -Exclude '*.pdf'
```

## 不复制空文件夹

可以通过判断文件夹内项目数量来确定文件夹是否为空。
首先通过`Get-ChildItem $from -Recurse`获取文件夹内所有的项目。
然后遍历每个项目，通过`$item.PSIsContainer`判断是否是文件夹，如果是文件夹且项目个数为 0 则跳过，否则就复制。
由于是按照单个项目来复制，所以需要通过替换原目录为新目录来设置目标路径。

```powershell
$from = "E:\PowerShell\from\"
$to = "E:\PowerShell\to\"
$items = Get-ChildItem $from -Recurse
ForEach ($item in $items)
{
    if($item.PSIsContainer -and (Get-ChildItem $($item.FullName)).Count -eq 0)
    {
        Continue
    }else{
        $t = $item.Fullname.replace("$from","$to")
        Copy-Item $item.FullName -Destination $t
    }
}
```

## 跳过和覆盖

当复制单个文件时默认会直接覆盖同名文件，如果想跳过需要通过`Test-Path`来判断是否存在同名文件。

```powershell
if(!(Test-Path "E:\PowerShell\to\1.txt")){
    Copy-Item "E:\PowerShell\from\1.txt" "E:\PowerShell\to\1.txt"
}else{
    Write-Host "包含同名文件"
}
```

但是当使用通配符复制文件夹内所有内容时，同名的文件夹默认并不会覆盖，而且会报错，这个时候加上`-Force`参数即可。

```powershell
Copy-Item "E:\PowerShell\from\*" "E:\PowerShell\to\" -Recurse -Force`
```

## 显示复制进度

Copy-Item 并没有参数来设置显示复制进度的功能，要显示进度需要用到`Write-Progress`。
显示复制单个文件的进度

```powershell
function Copy-File {
    param( [string]$from, [string]$to)
    $ffile = [io.file]::OpenRead($from)
    $tofile = [io.file]::OpenWrite($to)
    try {
        [byte[]]$buff = new-object byte[] 4096
        [long]$total = [int]$count = 0
        do {
            $count = $ffile.Read($buff, 0, $buff.Length)
            $tofile.Write($buff, 0, $count)
            $total += $count
            if ($total % 1mb -eq 0) {
                Write-Progress -Activity "从[$from]复制到[$to]" -status "复制中" `
                   -PercentComplete ([long]($total * 100 / $ffile.Length))
            }
        } while ($count -gt 0)
    }
    finally {
        $ffile.Dispose()
        $tofile.Dispose()
    }
}
$from = "E:\PowerShell\from\1.txt"
$to = "E:\PowerShell\to\1.txt"
Copy-File $from $to
```

显示复制多个文件的进度

```powershell
function Copy-File{
    Param([string]$from,[string]$to)
    $Filelist=Get-Childitem "$from" –Recurse
    $Total=$Filelist.count
    $Position=0
 
    foreach ($File in $Filelist)
    {
        $Filename=$File.Fullname.replace($from,'')
        $DestinationFile=($to+$Filename)
        Write-Progress -Activity "从[$from]复制到[$to]" -Status "正在复制[$Filename]" -PercentComplete (($Position/$total)*100)
        Copy-Item $File.FullName -Destination $DestinationFile
        $Position++
    }
 
}
$from = "E:\PowerShell\from\"
$to = "E:\PowerShell\to\"
Copy-File $from $to
```

*参考：*
*<https://www.spguides.com/powershell-copy-item/>*
*<https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/copy-item>*
