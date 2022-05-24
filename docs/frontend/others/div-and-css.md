
# 零基础入门前端开发工程师，应当提前掌握 DIV+CSS 布局规范

**样式命名规范**

![零基础入门前端开发工程师，应当提前掌握DIV+CSS布局规范](https://p26.toutiaoimg.com/large/470e000043a2bccf221e)

id 选择器常用命名规范

![零基础入门前端开发工程师，应当提前掌握DIV+CSS布局规范](https://p26.toutiaoimg.com/large/470b0001f6a133c60835)

类选择器常用命名规范

![零基础入门前端开发工程师，应当提前掌握DIV+CSS布局规范](https://p26.toutiaoimg.com/large/470b0001f9d5cf732b27)
<!--more-->
**全局样式设置**

1.全局样式置顶，并用注释标注为/_全局样式_/

2.用一内容定义的样式写在一起，并用注释标注

3.一个样式里面，多个属性的定义建议写在一行，属性定义之间用"；"隔开

4.样式中类或者 id 选择器的命名建议使用样式命名规范来书写

5.自定义选择器名称建议都用小写、尽量使用英文单词，少用拼音，名称中建议少用"-"或者"\_",尽量少用英文缩写。

/_全局样式部分_/

```css
* {
 padding: 0;
 margin: 0;
 font-size: 12px;
 font-family: "宋体";
}

ul,
li,
dl,
dt,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
form,
p {
 padding: 0;
 margin: 0;
}

ul {
 list-style: none;
}

img {
 border: 0px;
}

a {
 text-decoration: none;
}

.clearfloat {
 clear: both;
 height: 0px;
 font-size: 1px;
 line-height: 0px;
}
```

html 文档书写规范

1.html 标签代码书写应遵循 xhtml 规范：

a.Html 标签要全部小写

b.标签嵌套要对应

c.成对标签必须关闭，单个标签也需要关闭，如"<..../>"

d.标签属性需要用引号，且不能简写，如:

规范写法：`<input type="checkbox" checked="checked" />`

不规范写法：`<input type="checkbox" checked />`

2.同一模块的 html 代码用注释包含,如：

<!---logo广告条开始--->
```html
<div id="logobar">

.....

</div>
```
<!---logo广告条结束--->

3.Html 通过首行缩进来体现代码结构，如：
::: normal-demo

```html
<div id="main_nav">
  <ul>
   <li>
    <a href="#">首 页</a>
   </li>
   <li>
    <a href="#">企业招聘</a>
   </li>
  </ul>
 </div>
```

:::

4.Img 标签需加上"alt"属性
