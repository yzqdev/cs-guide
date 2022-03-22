---
title: css内容属性
category: 前端
tag:
  - 前端
  - css
  - 美化
translate_title: css-content-attributes
date: 2017-10-16 19:17:00
description:
---

# css 内容属性



# CSS 的内容属性，多种可能的取值，让样式设置更加丰富

CSS 技术提供了一个名为 content 的属性，该属性被翻译为“内容”。该属性的使用必须配合伪元素选择器::before 或者::after 结合起来使用。该属性在容器中设置了一个内联元素，可以使用其他的 CSS 属性来对这个新增的内联元素进行设置。

承接文章：[**CSS3\*\***伪装元素，尽管没有得到完美的兼容，仍有很强的用途\*\*](https://www.toutiao.com/i6489732621789037070/)
<!--more-->
技术等级：中级 | 适合有一定的 CSS 基础的人士阅读。

![CSS的内容属性，多种可能的取值，让样式设置更加丰富](http://p9.pstatp.com/large/46eb0004767457e774a8)

**希望收藏了这篇文章的你同时也可以关注一下“小海前端”的头条号，因为这些文章都是连载的，并且是经过系统的归纳和总结的。塌下心来认真阅读，你一定会学到对你有用的知识。**

CSS3 所提供的增强用户界面的属性以及与此相关的属性比较多，小海前端（头条号）将分几次对其进行讲解。所包含的所有增强用户界面的属性包括：

* box-shadow
* box-sizing
* overflow-x
* overflow-y
* resize
* outline
* outline-width
* outline-style
* outline-color
* outline-offset
* pointer-events
* user-select
* appearance
* **content**
* **counter-increment**
* **counter-reset**
* **quotes**

本篇文章为大家讲解与 content 属性相关的属性的用法。

**一、content 属性的设置：**

![CSS的内容属性，多种可能的取值，让样式设置更加丰富](http://p9.pstatp.com/large/46f00002995c209ebe50)

CSS 技术使用 content 属性来设置有关内容的效果

content 属性可以作用于任意的容器元素中，结合伪元素选择器::before 和::after 共同使用。该属性有多种取值，可以使用的取值包括：

* normal，默认值，表示没有任何内容在容器中被创建。
* <string>，字符串，表示创建内容为指定字符串的内联元素在容器内部。
* <url()>，url 地址，表示创建内容为 url 地址指定的对象的内联元素在容器内部。
* <attr()>，HTML 属性名，表示创建内容为指定的 HTML 属性的取值的内联元素在容器内部。
* <open-quote>，表示创建内容为 quotes 属性的前标记的内联元素在容器内部。
* <close-quote>，表示创建内容为 quotes 属性的后标记的内联元素在容器内部。
* <counter()>，计数器，表示创建计数器内容的内联元素在容器内部。

接下来让我们依次来学习 content 属性的各个取值的用法。为了更好的演示 content 属性的各种取值，首先我们在页面中创建一个无序列表：

> <ul>
>
> <li>白羊座</li>
>
> <li>金牛座</li>
>
> <li>双子座</li>
>
> <li>巨蟹座</li>
>
> <li>狮子座</li>
>
> <li>处女座</li>
>
> </ul>

**二、content 属性取值为<string>：**

**例 1：**在页面中创建一个无序列表，利用 content 属性为无序列表的每一列表项前面添加指定的字符串内容。

```css
ul li::before {
	content: "十二星座：;
	color: #ff5857;
}
```

这样，就可以在每一个列表项（即<li>标记对）的内部的最前面添加指定的字符串内容。最终的显示效果如下图所示：左侧为原列表项，右侧为使用了 content 属性之后的列表项。

![CSS的内容属性，多种可能的取值，让样式设置更加丰富](http://p3.pstatp.com/large/46f000029917397d012d)

指定 content 属性取值为字符串

请小伙伴们打开浏览器的“开发人员工具”，查看“十二星座：”这几个字在 HTML 文档结构中的位置。具体的“开发人员工具”的界面如下图所示。

![CSS的内容属性，多种可能的取值，让样式设置更加丰富](http://p3.pstatp.com/large/46ef000415d8bb68e5ef)

可以看出 content 属性添加的内容是容器内部的内联元素

从上图中可以看出，在<li>的内部结构中，出现了一个“::before”结构，这个结构就是利用 content 属性添加到每一个无序列表项内部的字符串。

若需要在每一个列表项内部的后面添加指定的字符串内容，可以使用::after 伪元素选择器。

**三、content 属性取值为<url()>：**

**例 2：**利用 content 属性为无序列表的每一列表项后面添加一个指定的图片。

```css
ul li::after {
  content: url(../images/xz.jpg);
}
```

最终的现实效果如下图所示：

![CSS的内容属性，多种可能的取值，让样式设置更加丰富](http://p1.pstatp.com/large/46f000029918f81b050b)

指定 content 属性取值为 url()的文件路径

**四、content 属性取值为<attr()>：**

**例 3：**为每一个列表项<li>标记对设置一个名为 data-li 的属性，并设置不同的内容。可以利用 content 属性的 attr()取值将这个名为 data-li 的属性取值作为内容添加到每一个列表项的前面。

HTML 中无序列表的代码如下所示：

```html
 <ul>
        <li data-li=”BaiYang”>白羊座</li>
        <li data-li=”JinNiu”>金牛座</li>
        <li data-li=”ShuangZi”>双子座</li>
        <li data-li=”JuXie”>巨蟹座</li>
        <li data-li=”ShiZi”>狮子座</li>
        <li data-li=”ChuNv”>处女座</li>
    </ul>
```

CSS 代码如下所示：

```css
ul li::before {
  content: attr(data-li);
  color: #ff5857;
}
```

最终的现实效果如下图所示：

![CSS的内容属性，多种可能的取值，让样式设置更加丰富](http://p3.pstatp.com/large/46ef000415d983d24130)

指定 content 属性取值为 attr()的 HTML 属性值

**五:**、content 属性取值为<open-quote>或<close-quote>：\*\*

该取值会涉及到一个名为 quotes 的属性，该属性可以取两个利用空格隔开的字符串，空格之前的字符串被称为“前标记”，空格之后的字符串被称为“后标记”。

**例 4:** 为每一个列表项的前面添加一个左大括号{，后面添加一个右大括号}。

> ul li{quotes:”{” ”}”;}
>
> ul li::before{content:open-quote;}
>
> ul li::after{content:close-quote;}

最终的现实效果如下图所示：

![CSS的内容属性，多种可能的取值，让样式设置更加丰富](http://p3.pstatp.com/large/46ef000415daa14d0cc4)

指定 content 属性取值为 quotes 属性的前标记或右标记

**小海声明**

在头条上发表的这些文章都是从前端开发的基础开始一步一步讲起的。我非常希望能有更多的前端开发初学者通过我写的文章，逐步学到一定的知识，甚至慢慢有了入门的感觉。这些文章都是我这几年教学过程中的经验，每写一篇时我都尽量把握好措辞，用简单易懂的语言描述，同时精心设计版面，让版面更加丰富，激发阅读兴趣。所以，每一篇文章可能篇幅不长，但是都要耗费小海老师很久的时间。
