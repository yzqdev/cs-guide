---
order: 6
---
# 注册表相关

1.打开注册表键：`HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\FileExts\.extension\OpenWithList
.extension`指你所要修改的文件扩展名。删除值和你所要去掉的程序名称相同的键就可以了。

2.在工具---文件夹选项---文件类型---把不要的文件类型删除

3.打开注册表编辑器，在`[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\FileExts]`和`[HKEY_CLASSES_ROOT＼SystemFileAssociations]`分支下中找到相应扩展名分支，然后在“OpenWithList”项中删除不需要的键值或项即可。

以上三种方法全是删除“打开方式”中的图标的。

在`HKEY_CLASSES_ROOT\Applications`里可以删除“打开方式－选择程序－其他程序”中的无用的程序的。打开`HKEY_CLASSES_ROOT\Applications`，找到你要删除的打开方式的程序，再找到你不想让它支持的扩展名并删除。
通过在我机子上对.mp3,.wma,.wmv等格式文件的试验，我发现对于不同的软件写入注册表的位置和方式是不同的，所以解决方法也不同，上面三种方法你都试一下。不懂注册表的话先了解一下，修改注册表前先备份，以防万一。

## notepad镜像

`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe`
修改这个可以通过notepad命令执行你添加的程序

## 修改拓展名对应打开的软件

`HKEY_CLASSES_ROOT\txtfile\shell\open\command`类似这样的,可以自行查看
`HKEY_CLASSES_ROOT\.yml`查看拓展名
`HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\FileExts\.json\OpenWithList` 这里显示openwithlist

### 修改文件默认打开方式

推荐使用filetypes manager
请百度搜索`修改注册表实现文件默认打开方式`  
例如[链接](https://blog.csdn.net/a302549450/article/details/84308175)
`HKEY_CLASSES_ROOT\xmlfile\shell\Open\command`,把里面的`默认`的值改为`"C:\Program Files\Kate\bin\kate.exe" %1`
