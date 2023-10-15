---
order: 5
---
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
:::

---

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


# 编码问题

这几天工作中用到不少字符集，Unicode、utf-8、GB2312等，但是在windows命令行里敲notepad进入文本编辑页面。保存时需要选择编码方式，但是不存在GB，却有ANSI，于是纳闷，回来一查，才恍然大悟：原来在简体中文系统下，ANSI 编码代表 GB2312 编码。
为使计算机支持更多语言，通常使用 0x80~0xFF 范围的 2 个字节来表示 1 个字符。比如：汉字 '中' 在中文操作系统中，使用 [0xD6,0xD0] 这两个字节存储。
不同的国家和地区制定了不同的标准，由此产生了 GB2312, BIG5, JIS 等各自的编码标准。这些使用 2 个字节来代表一个字符的各种汉字延伸编码方式，称为 ANSI 编码。在简体中文系统下，ANSI 编码代表 GB2312 编码，在日文操作系统下，ANSI 编码代表 JIS 编码。
不同 ANSI 编码之间互不兼容，当信息在国际间交流时，无法将属于两种语言的文字，存储在同一段 ANSI 编码的文本中。
