$startFolder = "D:\flutter"
$colItems = (Get-ChildItem $startFolder  | Where-Object {$_.PSIsContainer -eq $True} | Sort-Object)
foreach ($i in $colItems)
{
    $subFolderItems = (Get-ChildItem $i.FullName -recurse | Measure-Object -property length -sum)
    $FileSize="{0:N2}" -f ($subFolderItems.sum / 1GB)
    $Unit='GB'
    if($FileSize -lt 1)
    {
        $FileSize="{0:N2}" -f ($subFolderItems.sum / 1MB)
        $Unit='MB'
    }
    write-host $i.FullName  ' -- '  $FileSize  $Unit -fore green
}