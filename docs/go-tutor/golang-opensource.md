---
order: 4
---
# go相关资源

## 相关文档

- [官网](https://go.dev/)
- [依赖](https://pkg.go.dev/)
- [topgoer](https://www.topgoer.com/)
- [地鼠文档](https://www.topgoer.cn/)
- [go语言中文网](https://studygolang.com/)
- [learnku](https://learnku.com/go)
- [go forum](https://forum.golangbridge.org/)
- [golang中国](https://www.golangtc.com/)

## 一些好用的命令行工具

- [https://github.com/oligot/go-mod-upgrade](https://github.com/oligot/go-mod-upgrade)
- [https://github.com/cosmtrek/air](https://github.com/cosmtrek/air)
- [https://github.com/spf13/cobra](https://github.com/spf13/cobra)
- [https://github.com/gohugoio/hugo](https://github.com/gohugoio/hugo)
- [upx](https://github.com/upx/upx)
- [https://github.com/Dreamacro/clash](https://github.com/Dreamacro/clash)

## web框架

- gin    [https://gin-gonic.com/zh-cn/docs/quickstart/](https://gin-gonic.com/zh-cn/docs/quickstart/)
- echo   [https://echo.labstack.com/guide/](https://echo.labstack.com/guide/)
- gorm   [https://gorm.io/](https://gorm.io/)
- fiber    [https://github.com/gofiber/fiber](https://github.com/gofiber/fiber)
- iris(不推荐,抄袭嫌疑) [https://github.com/kataras/iris](https://github.com/kataras/iris)
- xorm    [http://xorm.topgoer.com/](http://xorm.topgoer.com/)
- gookit   [http://github.com/gookit/color](http://github.com/gookit/color)
- 还有其他的    [https://gookit.github.io/docs/zh/all-projects](https://gookit.github.io/docs/zh/all-projects)
- goframe    [https://goframe.org](https://goframe.org)

- 发送邮件的   [https://github.com/jordan-wright/email](https://github.com/jordan-wright/email)

## 工具

- [air](https://github.com/cosmtrek/air)  
- [https://cobra.dev/](https://cobra.dev/)
- <https://github.com/charmbracelet/bubbletea>
- [viper](https://github.com/spf13/viper)
- [gitea](https://github.com/go-gitea/gitea)
- [hugo](https://github.com/gohugoio/hugo)
- [yay](https://github.com/Jguer/yay) archlinux的包管理工具,绝对好用
- <https://github.com/qax-os/excelize>
- [https://github.com/samber/lo](https://github.com/samber/lo) go的lodash库
- <https://github.com/hashicorp/go-getter>
- <https://github.com/oligot/go-mod-upgrade>

# 常用库

## viper

解析yaml和json可能会出现解析值为空,原因是错误的使用了json或者yaml的tag,要使用`mapstructure`标签

```go
type Config{
    QiniuAccessKey     string `yaml:"qiniu_accesskey" mapstruct:"qiniu_accesskey"`
}

```

## gorm

AutoMigrate

<https://gorm.io/zh_CN/docs/migration.html>

## 爬虫

[https://github.com/gocolly/colly](https://github.com/gocolly/colly)
## zap

```shell
go get -u go.uber.org/zap
```

## logrus

推荐使用logrus
它是一个结构化、插件化的日志记录库。完全兼容 golang 标准库中的日志模块。它还内置了 2 种日志输出格式 JSONFormatter 和 TextFormatter，来定义输出的日志格式。

github地址：<https://github.com/sirupsen/logrus>

切分日志[lumberjack](https://github.com/natefinch/lumberjack/tree/v3)

## 微服务框架

- [go-micro](https://github.com/asim/go-micro)
- [istio](https://github.com/istio/istio) 谷歌开源
- [go-zero](https://github.com/zeromicro/go-zero) 推荐使用,国人开源
- [go-kit](https://github.com/go-kit/kit)
- [go-kratos](https://github.com/go-kratos/kratos)
- [dubbo-go](https://github.com/apache/dubbo-go)
- [tars-go](https://github.com/TarsCloud/TarsGo)
- <https://github.com/containers/podman>

## 爬虫

- [resty](https://github.com/go-resty/resty) http客户端
- <https://github.com/PuerkitoBio/goquery>
- <https://github.com/gocolly/colly>

### 关于间接依赖

   [https://learnku.com/articles/47737](https://learnku.com/articles/47737)(查看//indirect出现的原因)
什么叫间接依赖呢？打个比方，项目 A 依赖了项目 B，项目 B 又依赖了项目 C，那么对项目 A 而言，项目 C 就是间接依赖，这里要注意，并不是所有的间接依赖都会出现在 `go.mod` 文件中。间接依赖出现在 go.mod 文件的情况，可能符合下面的场景的一种或多种：

直接依赖未启用 Go module
直接依赖 `go.mod`文件中缺失部分依赖

## 开源项目

​

| mo.fish | [https://github.com/tophubs/TopList](https://github.com/tophubs/TopList) |
| ------- | ------------------------------------------------------------------------ |
|         |                                                                          |
|         |                                                                          |
|         |                                                                          |
|         |                                                                          |

- [https://github.com/pocketbase/pocketbase](https://github.com/pocketbase/pocketbase) 低代码平台
- [https://github.com/tophubs/TopList](https://github.com/tophubs/TopList)(mo.fish)
- [https://geektutu.com/post/gee.html](https://geektutu.com/post/gee.html)(很好的教程)
- [https://w2solo.com/](https://w2solo.com/)(独立开发者)
- [https://mojotv.cn/tutorial/golang-map](https://mojotv.cn/tutorial/golang-map)(go教程)
- [https://hackertalk.net/](https://hackertalk.net/)(一个论坛而已)
- (go开源编辑器)[https://github.com/88250/wide](https://github.com/88250/wide)
- [https://github.com/88250/pipe](https://github.com/88250/pipe)
- [https://gitee.com/mlogclub/bbs-go](https://gitee.com/mlogclub/bbs-go)(一个bbs)
- [goyoubbs](https://github.com/ego008/goyoubbs)
- [https://cnodejs.org/topic/6095f0834d20cb84966910a9](https://cnodejs.org/topic/6095f0834d20cb84966910a9)
- [https://books.halfrost.com/leetcode/](https://books.halfrost.com/leetcode/)(leetcode题解)
- [ginblog](https://gitee.com/wejectchan/ginblog)
- [https://gfw.go101.org/article/101.html](https://gfw.go101.org/article/101.html)
- [https://gitee.com/dl88250/pipe](https://gitee.com/dl88250/pipe)
- [https://github.com/go-admin-team/go-admin](https://github.com/go-admin-team/go-admin)
- [gitee上的go建站系统](https://gitee.com/explore/build-web-system?lang=Go)
- [wblog](https://github.com/wangsongyan/wblog)
- [zendea论坛](https://gitee.com/zendea/zendea)
- [gin-vue-admin](https://www.gin-vue-admin.com/)
- [https://forum.casbin.com/](https://forum.casbin.com/)(一个v2ex类似的网站)
- [https://github.com/letseeqiji/gorobbs](https://github.com/letseeqiji/gorobbs)
- [gitee.com/yllan/ferry](https://gitee.com/yllan/ferry)
- [开源中国](https://www.oschina.net/project/tag/66/bbs?-%20company=0&sort=time&tag=66&lang=358&recommend=false)
- [https://gitee.com/explore/backend?lang=Go](https://gitee.com/explore/backend?lang=Go)
- [一个非常好的系统检测软件](https://gitee.com/admpub/nging)
- [https://github.com/Bingjian-Zhu/gin-vue](https://github.com/Bingjian-Zhu/gin-vue)(gin+gorm)
