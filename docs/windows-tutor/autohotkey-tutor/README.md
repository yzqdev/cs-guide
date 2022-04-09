# autohotkey和autoit教程

:::tip
autohotkey 简称ahk,是一个自由、开源的宏生成器和自动化软件工具，它让用户能够自动执行重复性任务。AutoHotkey 可以修改任何应用程序的用户界面（例如，把默认的 Windows 按键控制命令替换为 Emacs 风格）。它是由定制的脚本语言驱动，旨在提供键盘快捷键或热键。——wikipedia
:::

## 优点

1. 体积小巧、语法简明、易学易用。开发环境简单，只需要一个不足 1M 的解释器和一个顺手的编辑器，就可以开发了。

2. API 丰富。AHK 提供了很多桌面软件需要用到的 API，而且调用 Windows API 非常方便，这是很多其他脚本语言所无法比拟的。

3. AHK 对热键、热字符串有专门支持，写起来非常容易，而这在其他语言基本上都要费费尽周折。

4. AHK 没有官方自带或者第三方实现的完善的标准库，这样如果需要实现非内置的功能通常需要直接调用 Windows API 或寻找别人封装好的函数。AHK 语言本身并不强大，缺少很多现代语言所具备的高级特性，同时也缺乏对多线程等操作系统特性的支持

## 官方网站

请认准官方网站[https://www.autohotkey.com/](https://www.autohotkey.com/)
中文论坛[https://www.autoahk.com/](https://www.autoahk.com/)  
英文文档[https://www.autohotkey.com/docs/AutoHotkey.htm](https://www.autohotkey.com/docs/AutoHotkey.htm)  
中文文档[https://wyagd001.github.io/zh-cn/docs/AutoHotkey.htm](https://wyagd001.github.io/zh-cn/docs/AutoHotkey.htm)

## 当前版本

AHK v1

AHK v1 是当前 AHK 的主流版本，也是官方网站下载地址中的版本。包含三个构建版本：

1. Unicode 32-bit。32 位 Unicode 版本，如无特殊需求，推荐使用此版本。

2. Unicode 64-bit。64 位 Unicode 版本，性能比 Unicode 32-bit 版本稍好，但占用更多内存。兼容性方面不如 Unicode 32-bit 版本。适合对性能敏感的场景使用。

3. ANSI 32-bit 。32 位 ANSI 版本，对历史遗留下来的老 AHK 脚本兼容性较好。如果写新脚本，无需关注此版本。

## 实例

热键示例，按 Win + g 启动计算器
 常用快捷键标识如下：

- \#：win 键
- !：alt
- ^：ctrl
- +：shift

如#c，意思就是 win 键+c。

**热字符串**主要用于扩展缩写(自动替换)，就像拼音输入法里的简写。当然，它也可以用来启动任何脚本动作。

这两个都是通过::来连接随后要替代的操作。区别就是，热字符串用两个::来包围它，输入后加终止符输出命令，推荐空格键。

常用命令

Run 命令：用来启动一个程序、文档、URL 网址或者快捷方式。

;这个是快捷键 win+c 打开 [http://www.google.com](http://www.google.com/)

```text
#c::run www.google.com
```

;这个是字符串 输入 yz 加空格，则输出 yzqdev

```text
::yz::yzqdev
```

```ahk
#g::
 
Run, calc
 
return
 
; 热字符串示例，按 www 打开 AHK 官网
 
::www::
 
Run, http://ahkscript.org/
 
return
```

以上就是最简单最基本的操作，更多高端的可以参考官网官方文档。
