---
title: 跨域问题解决
category:
  - 编程
  - 前端
  - 跨域
tag:
  - 编程
description: 跨域问题1
translate_title: crossdomain-problem-solving
date: 2017-09-11 19:17:00
---


# 前端跨域请求api的几种常用解决方案

简单印象 2017-11-30 07:56:01

总结一下，前端跨域请求后端api的几种常用方法：

**1.iframe**

随着近年来前端技术的飞跃发展以及移动互联网时代的洗礼，iframe的使用渐渐的不被建议，虽然也是一种跨域请求的解决方案，但这里就不再讲述，请读者自行查阅网上资料。

**2.jsonp**

jsonp是比较常用的方法，我们假设a.com域名需要向b.com发起一个api请求（jsonp的一个缺点是，仅能接受GET方式），则使用JSONP完成该过程的实例可以这样：

![前端跨域请求api的几种常用解决方案](http://p9.pstatp.com/large/471a0003f97186e22f1a)

a.com/jsonp.html

![前端跨域请求api的几种常用解决方案](http://p1.pstatp.com/large/471d0000e892d47be493)

b.com/jsonp.php

**3. 通过请求同域下的api，间接获取它域的数据**

我们仍以域名a.com/demo.html需获取b.com下的数据为例，这时候只要在a.com下创建一个demo.php，由demo.php通过curl的方式向b.com发起数据请求，并包装请求结果返回给a.com/demo.html页面。这里主要是通过与a.com/demo.html同域下的a.com/demo.php做了一层数据请求代理，避免了前端跨域请求。

**4.使用web服务器的反向代理设置**

同样是使用代理的思维，但与2不同的是，我们这里使用web服务器的反向代理配置：

Nginx反向代理可以使用 proxy_pass

![前端跨域请求api的几种常用解决方案](http://p3.pstatp.com/large/471c0000f29ef3c942b5)

Apache2的反向代理的配置可以使用ProxyPass

![前端跨域请求api的几种常用解决方案](http://p3.pstatp.com/large/471d0000ec0cdcd89c79)

**5.设置header头（CORS）**

在你要跨域请求的api里，设置header头Access-Control-Allow-Origin: *，以php为例，在api代码的入口方法处加入如下一行：

![前端跨域请求api的几种常用解决方案](http://p9.pstatp.com/large/471d0000ecfccdb33597)