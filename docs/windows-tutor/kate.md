# 使用kate代替记事本

:::tip

- kate(推荐)
- emeditor
- editor-plus
- everedit
- ueditor
- vscode
- sublime
- cudatext
- nodepad3

现在推荐使用 [kate(kde默认编辑器)](https://kate-editor.org/zh-cn)

[kde永远的神](https://apps.kde.org/zh-cn)

- kate
- okular
- kile
- filelight

<p>分割线------------------------------------------</p>
## 使用emeditor打开文件

### 右键注册`用emeditor打开`

注意这里的`%1`在注册表里面要带`""`
就像这样 `"D:\\programs\\emeditor\\EmEditor.exe"  "%1"`
新建一个`用cudatext打开`的reg文件,然后执行

```reg
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\*\shell\用EmEditor打开]
"Icon"="D:\\programs\\EmEditor\\EmEditor.exe"
@="用cudatext打开"

[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\*\shell\用EmEditor打开\command]
@="\"D:\\programs\\EmEditor\EmEditor.exe\"  \"%1\""



```

### 劫持默认notepad

win+R 输入 regedit 打开注册表  
输入计算机`HKEY_CLASSES_ROOT\txtfile\shell\open\command` 进入记事本的注册表  
修改默认的值,原来的值是 `%SystemRoot%\system32\NOTEPAD.EXE %1`,改为自己解压后的exe的位置(中间不要有中文和空格)
我改后是 `D:\programs\EmEditor\EmEditor.exe %1`
然后!
在路径输入 计算机`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options`,设置默认值为软件路径,比如我是 `D:\programs\EmEditor\EmEditor.exe`

```reg
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe]
"Debugger"="\"D:\\programs\\EmEditor\\EmEditor.exe\""
```

## cudatext设置中文

![cudatext](https://cudatext.github.io/img/cudatext-main.png)
打开 <https://sourceforge.net/projects/cudatext/files/addons/>
找到【translations】文件夹，
下载【translation.zh_CN.zip】
把其中的install.inf、zh_CN.ini以及其他存在的文件都解压到cudatext的data\lang文件夹下，重新运行软件点击【Options】-【translations】选择【zh_CN】即可。
下载所有插件  
[https://sourceforge.net/projects/cudatext/files/addons_all/](https://sourceforge.net/projects/cudatext/files/addons_all/)

:::
