# 编程字体推荐

## 自用的字体

"Microsoft YaHei Mono"和**Jetbrains Mono**

## 推荐的字体

- Cascadia Code   微软出品的字体
- Fira Code          火狐出品的字体
- [Source Code Pro](https://www.iplaysoft.com/source-code-pro-font.html)
- [Mononoki](https://www.iplaysoft.com/mononoki.html)  
- [Consolas](https://www.iplaysoft.com/consolas.html)
- Monaco   苹果电脑默认字体
​

注意  `Microsoft Yahei Mono`和`Yahei Mono`不是同一个字体,用前一个就好了
一般有图形设置界面的编辑器里可以很方便地将字体设置为 Cascadia，而如果编辑器需要用配置文件设置的话，在 Font / Font Family 等项里设置字体名称为`Cascadia Code` 即可。
多个单词的字体名要加双引号如下
`"Cascadia Code","Microsoft YaHei Mono", Consolas,Source Code Pro, monospace`
​

​

## 音乐源地址

### api

我们知道网易云音乐上的一首歌 ID，如何获取它的 MP3 源地址呢？其实网易云音提供了转换的地址：
`http://music.163.com/song/media/outer/url?id=**ID数字**.mp3`
把上面红色部分ID数字换成网易云播放页面的即可，举个例子：
朴树的「平凡之路」，这首歌的地址是：
`https://music.163.com/#/song?id=29750099`
这首歌的 ID 是：29750099，那么它的 MP3 地址是：
`https://music.163.com/song/media/outer/url?id=29750099.mp3`

## 电子书格式

### 常见格式

txt
纯文本，不解释
优点：体积小，适用于绝大多数设备
缺点：不支持分章节、不支持图片、不支持封面、不支持超链接——它就是个纯文本

chm
这个东西最早是微软拿来做软件的帮助文档的吧……然后就被拿来做电子书了
优点：相对txt，可以分章节和加超链接
缺点：相对之后的其他电子书格式，体积较大；只是相对txt增加了分章节和超链接功能，依旧不支持很多东西；软件和设备支持差

pdf
开放的移动文档标准(Portable Document Format)，Adobe开发，适合用于复杂排版的电子刊物，创建和排版的软件专业度和功能性都很强。
优点：提供最好的排版效果、从创建到浏览都有一大批软硬件提供支持
缺点：在小屏上体验不佳，需要频繁缩放拖动（保证文档高还原度的代偿）

epub
排版基于HTML技术，能提供接近pdf的功能，图文混排功能和对格式的控制不如pdf强大
优点：体积相对pdf要小；对阅读设备的性能要求较低；对小屏设备友好
缺点：无明显缺点

mobi
根据我的使用经验，mobi跟epub表现无限接近，主要推手是Amazon，两种格式可以傻瓜式互转

关于mobi和epub的具体优劣：

epub格式对于复杂的排版，图表，公式等元素的兼容性比mobi格式好很多，在脚本，公式，矢量图形的支持方面也强过mobi格式，现阶段epub格式的优势体现在图文混排、图片嵌入字体等，未来可预测的优势是epub格式对于声音，影像等多媒体内容互动的支持上。

epub 格式是开放标准，所以在开发工具上也会有更大的选择，像Sigil、Calibre、Jutoh等软件都可以让用户自助制作epub格式电子书，但因为良莠不齐的制作也导致一个问题：大量的epub文件其实是不符合标准，无法保证在所有支持epub的硬件和软件上都可以顺利阅读，这就和iOS系统和 Android系统的区别有些相似。

**无脑选epub就好**

### 阅读器软件

Calibre
[neatreader](https://www.neat-reader.cn/)
[https://github.com/troyeguo/koodo-reader](https://github.com/troyeguo/koodo-reader)
