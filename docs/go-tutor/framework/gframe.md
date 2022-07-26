# gf教程

## 打包静态文件

把静态文件放在public文件夹,必须在`main.go`(或者其他入口文件)添加`_ "myapp/packed"`然后`gf build(包含--pack)`
然后在入口文件添加`s.AddStaticPath("/atools", "public")`,到时候就可以通过`http://localhost:8000/atools`访问到静态文件

必须在`main.go`(或者其他入口文件)添加`_ "myapp/packed"`然后`gf build(包含--pack)`,**直接`gf build(包含--pack)`是不行的**.
(其实资源管理章节里说了,[https://goframe.org/pages/viewpage.action?pageId=1114148](https://goframe.org/pages/viewpage.action?pageId=1114148),但是如果先看的是`gf build`文档就可能会忽视掉这一点)

`gf build`打包过程如下:

1. `gf build(包含--pack)`会先在`packed`文件夹生成一个`build_pack_data.go`文件
2. 然后执行`go build main.go`,因为我们在`main.go`添加了`_ "myapp/packed"`,所以资源文件就打包进去了,没加这行代码,就没打包进去
3. 生成可执行文件
