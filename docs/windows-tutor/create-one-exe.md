# 开发单个exe桌面应用程序

:::tip
第一类：C#或者VB，开发框架WPF、WinForm。界面可以非常绚丽，功能强大，也很成熟！开发上手难度相对较小！  
第二类：QT：C++,界面不错，性能好，跨平台，问题在于使用难度大，但收益也特别好，属于高风险高回报的那一类。另外开发环境比之上面俩略差。  
第三类：Web开发，使用Electron，使用语言html,js,css，功能强大，界面绚丽，跨平台，开发成本低，可以说是集优点于一身，除了性能是真的差。

:::

## wpf

这是一个与分辨率无关的 UI 框架，使用基于矢量的呈现引擎，构建用于利用现代图形硬件。 WPF 提供一套完善的应用程序开发功能，这些功能包括 Extensible Application Markup Language (XAML)、控件、数据绑定、布局、二维和三维图形、动画、样式、模板、文档、媒体、文本和版式。 WPF 属于 .NET，因此可以生成整合 .NET API 其他元素的应用程序

## winform

其实就是对mfc的封装,拖拖拽拽就可以写出一个界面了,但是如果太复杂的功能,很不好做

## flutter desktop

Google已经重磅发布了专为 Web、移动和桌面而构建的 Flutter 2.0！将 Flutter 从移动开发框架扩展成可移植框架，使用 Flutter 开发桌面端软件，无需重写代码，使用同一套代码库即可将你的移动应用打包生成 Windows、macOS 和 Linux 桌面端软件。Flutter似有大一统之势。

[文档](https://flutter.dev/multi-platform/desktop)

## electron/tauri

Electron是利用web前端技术进行桌面应用开发的一套框架。

若想开发一个兼容多平台的桌面应用，以往常用的技术框架有wxWidgets、GTK、QT等，这些框架受语言限制，且学习成本较高，效率有限。目前一些基于前端技术的hybrid框架很流行，且已经在多个领域得到了广泛的应用和验证，比如利用前端技术+相应的打包工具可开发适配多平台的应用（PC、微信公众号、小程序、Android、IOS等）。Electron就是这样一款框架，为前端技术人员利用web前端技术开发桌面应用带来了可能，开发人员可利用已经掌握的前端技术如Html、CSS、JavaScript，以及结合一些前端技术框架：Vue、Angular、React、webpack，加之浏览器渲染引擎、Electron封装的系统API快速实现一款桌面应用的开发，Electron做了大部分复杂的工作，开发人员只需要专注在核心业务和前端技术本身。同时，通过一定的优化，Electron可以做到很好的体验。

目前有不少知名桌面应用采用Electron开发，如：开发人员熟知的Visual Studio Code、MongoDB桌面版管理工具、Skype桌面版、WhatsApp桌面版、HTTP网络测试工具Postman等。所以前端开发者不用担心案例问题。

> 见本文档前端相关内容

## sciter

[https://sciter.com/](https://sciter.com/)

## qt

Qt 是一个跨平台的C++应用程序开发框架。它提供给开发者建立图形用户界面所需的功能，广泛用于开发GUI程序，也可用于开发非GUI程序。Qt是完全面向对象的，很容易扩展，并且允许真正地组件编程。Qt使用标准的C++和特殊的代码生成扩展（称为元对象编译器Meta Object Compiler, moc）以及一些宏。  

最新的版本是qt6,[文档地址](https://doc.qt.io/)

## unity

Unity3d,使用里面的UGUI框架，同样可以做桌面开发,

## autoit

[https://www.autoitscript.com/site/autoit/](https://www.autoitscript.com/site/autoit/)

## Golang + Fyne

## pyside

PySide由Qt的官方团队--Nokia Qt进行维护，集成了Qt和Python的优势。一个PySide程序员只需要使用简单的Python语言就能够发挥Qt的所有功能。PySide拥有LGPL2.1版授权许可，允许进行免费/开源软件和私有商业软件的开发。Matplotlib，PhotoGrabber，Wing IDE，Lucas Chess，Fminer等应用程序均使用PySide开发，这证明了PySide在软件行业的广泛普及和使用。另外，PySide Mobility工程还允许python访问Qt Mobile API，这对你进行移动开发是很有帮助的。

## aardio

一个小众的windows桌面软件开发

## javafx

JavaFX 是一个开源的下一代客户端应用平台，适用于基于Java构建的桌面、移动端和嵌入式系统。 它是许多个人和公司的共同努力的成果，目的是为开发丰富的客户端应用提供一个现代、高效、功能齐全的工具包。  
javafx是用来替代awt,swing的库,用于java桌面开发

## kotlin compose desktop

还没有消息呢

## delphi/Lazarus

非常好用的跨平台桌面开发,可是用的人很少,pascal语言
