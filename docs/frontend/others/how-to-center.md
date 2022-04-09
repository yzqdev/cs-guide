---
title: web前端中的居中（八种方法）
category: '前端, 编程'
tag:
  - 前端
  - 优化
  - 编程
  - 技巧
translate_title: centering-in-the-web-front-end-eight-methods
date: 2017-09-13 19:17:00
description:
---

# web前端中的居中（八种方法）

一、水平居中（后续总结所有垂直居中方法，好像也是八种）

1. 若是行内元素, 给其父元素设置 text-align:center,即可实现行内元素水平居中.
2. 若是块级元素, 该元素设置 margin:0 auto即可.
3. 若子元素包含 float:left 属性, 为了让子元素水平居中, 则可让父元素宽度设置为fit-content,并且配合margin, 作如下设置:

![web前端中的居中（八种方法）](https://p26.toutiaoimg.com/large/28960003e0099b89ef9b)

fit-content是CSS3中给width属性新加的一个属性值,它配合margin可以轻松实现水平居中, 目前只支持Chrome 和 Firefox浏览器.

4.使用flex 2012年版本布局, 可以轻松的实现水平居中, 子元素设置如下:

![web前端中的居中（八种方法）](https://p26.toutiaoimg.com/large/2a3b0001e8cdaaf291b2)

5.使用flex 2009年版本, 父元素display: box;box-pack: center;如下设置:

![web前端中的居中（八种方法）](https://p26.toutiaoimg.com/large/2a3d000057d2079a076f)

6.使用CSS3中新增的transform属性, 子元素设置如下:

![web前端中的居中（八种方法）](https://p26.toutiaoimg.com/large/2a380003692bf750796e)

7.使用绝对定位方式, 以及负值的margin-left, 子元素设置如下:

![web前端中的居中（八种方法）](https://p26.toutiaoimg.com/large/2a3600044b285773c1ab)

8.使用绝对定位方式, 以及left:0;right:0;margin:0 auto; 子元素设置如下:

![web前端中的居中（八种方法）](https://p26.toutiaoimg.com/large/2a3d00005b14765abf32)

- [Firefox](https://www.toutiao.com/search/?keyword=Firefox)
- [Chrome](https://www.toutiao.com/search/?keyword=Chrome)
