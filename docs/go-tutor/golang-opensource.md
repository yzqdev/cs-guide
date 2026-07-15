---
order: 4
---

# Go 相关资源

## 官方文档

| 资源 | 说明 |
|------|------|
| [Go 官网](https://go.dev/) | 官方主页，下载、文档、博客 |
| [pkg.go.dev](https://pkg.go.dev/) | 官方包索引，查找依赖库 |
| [Go 指南](https://tour.go-zh.org/list) | 官方入门教程（中文） |

## 社区 & 教程

| 站点 | 说明 |
|------|------|
| [Go 语言中文网](https://studygolang.com/) | 国内最大的 Go 中文社区 |
| [LearnKu](https://learnku.com/go) | Go 教程、实战、问答 |
| [topgoer](https://www.topgoer.com/) | Go 开发者导航 |
| [地鼠文档](https://www.topgoer.cn/) | Go 中文文档站 |
| [学院的](https://geekr.dev/) | 学院君，Go 进阶教程 |
| [煎鱼](https://eddycjy.com/posts/) | 煎鱼的 Go 博客，质量很高 |
| [Go 语言高级编程](https://gfw.go101.org/article/101.html) | go101 系列书籍 |
| [LeetCode 题解](https://books.halfrost.com/leetcode/) | Halfrost 的 LeetCode Go 题解 |
| [7天从零实现 Web 框架](https://geektutu.com/post/gee.html) | 极客兔兔教程，手写 Gee 框架 |
| [mojotv](https://mojotv.cn/tutorial/golang-map) | Go 教程 |
| [coolshell](https://coolshell.cn/) | 酷壳，左耳朵耗子博客 |
| [Go Forum](https://forum.golangbridge.org/) | 英文 Go 论坛 |
| [GolangTC](https://www.golangtc.com/) | Golang 中国 |

## Web 框架

| 框架 | 说明 |
|------|------|
| [Gin](https://gin-gonic.com/zh-cn/docs/quickstart/) | 轻量高性能，最流行的 Go Web 框架 |
| [Echo](https://echo.labstack.com/guide/) | 简洁高性能，路由功能强大 |
| [Fiber](https://github.com/gofiber/fiber) | 类 Express 风格，性能极高 |
| [GoFrame](https://goframe.org) | 功能完备的企业级开发框架 |
| [gookit](https://gookit.github.io/docs/zh/all-projects) | Go 工具集，包含 color、filter 等库 |
| [Iris](https://github.com/kataras/iris) | 功能丰富（有抄袭争议，不推荐） |

## ORM / 数据库

| 库 | 说明 |
|----|------|
| [GORM](https://gorm.io/) | 最流行的 Go ORM，功能全面 |
| [XORM](http://xorm.topgoer.com/) | 轻量级 ORM，简洁易用 |

## 微服务框架

| 框架 | 说明 |
|------|------|
| [go-zero](https://github.com/zeromicro/go-zero) | 国人开源，推荐使用，集成了微服务各种组件 |
| [go-kratos](https://github.com/go-kratos/kratos) | Bilibili 开源的微服务框架 |
| [go-micro](https://github.com/asim/go-micro) | 可插拔的微服务框架 |
| [go-kit](https://github.com/go-kit/kit) | 微服务工具集 |
| [Istio](https://github.com/istio/istio) | 谷歌开源，服务网格 |
| [Dubbo-Go](https://github.com/apache/dubbo-go) | 阿里 Dubbo 的 Go 实现 |
| [Tars-Go](https://github.com/TarsCloud/TarsGo) | 腾讯 Tars 框架 Go 版 |

## 命令行工具

| 工具 | 说明 |
|------|------|
| [Cobra](https://github.com/spf13/cobra) | CLI 框架，Kubernetes、Hugo 都在用 |
| [Viper](https://github.com/spf13/viper) | 配置管理库，支持多格式 |
| [Air](https://github.com/cosmtrek/air) | Go 热重载工具，开发必备 |
| [go-mod-upgrade](https://github.com/oligot/go-mod-upgrade) | 交互式升级 Go 依赖版本 |
| [UPX](https://github.com/upx/upx) | 可执行文件压缩工具 |
| [Clash](https://github.com/Dreamacro/clash) | Go 实现的代理工具 |
| [yay](https://github.com/Jguer/yay) | ArchLinux 的 AUR 包管理器 |
| [Bubble Tea](https://github.com/charmbracelet/bubbletea) | TUI 框架，终端界面开发 |
| [Podman](https://github.com/containers/podman) | 无守护进程的容器引擎 |

## 常用库

### 日志

```shell
go get -u go.uber.org/zap
```

- [zap](https://github.com/uber-go/zap) — Uber 开源，高性能结构化日志
- [logrus](https://github.com/sirupsen/logrus) — 结构化日志，兼容标准库
- [lumberjack](https://github.com/natefinch/lumberjack) — 日志切分归档

### HTTP 客户端

| 库 | 说明 |
|----|------|
| [resty](https://github.com/go-resty/resty) | 功能丰富的 HTTP 客户端 |
| [go-getter](https://github.com/hashicorp/go-getter) | HashiCorp 出品的文件下载库 |

### 爬虫

| 库 | 说明 |
|----|------|
| [Colly](https://github.com/gocolly/colly) | 快速灵活的爬虫框架 |
| [GoQuery](https://github.com/PuerkitoBio/goquery) | 类 jQuery 的 HTML 解析 |
| [Excelize](https://github.com/qax-os/excelize) | Excel 文件读写库 |
| [lo](https://github.com/samber/lo) | Go 的 Lodash 风格工具库 |
| [Email](https://github.com/jordan-wright/email) | 邮件发送库 |

### 工具库

- [goquery](https://github.com/PuerkitoBio/goquery) — HTML 解析
- [excelize](https://github.com/qax-os/excelize) — Excel 读写
- [lo](https://github.com/samber/lo) — Go 版 Lodash

## Viper 使用注意

解析 yaml 或 json 时，如果出现值为空，通常是 tag 写错了。Viper 内部使用 `mapstructure` 标签，而非 `yaml` 或 `json`：

```go
type Config struct {
    QiniuAccessKey string `yaml:"qiniu_accesskey" mapstructure:"qiniu_accesskey"`
}
```

## 关于间接依赖

间接依赖出现在 `go.mod` 中的场景：

- 直接依赖未启用 Go module
- 直接依赖的 `go.mod` 中缺失部分依赖

参考：[理解 Go 间接依赖](https://learnku.com/articles/47737)

## 开源项目

### 博客 / CMS

| 项目 | 说明 |
|------|------|
| [Pipe](https://github.com/88250/pipe) | Go 博客平台 |
| [bbs-go](https://gitee.com/mlogclub/bbs-go) | Go 论坛系统 |
| [goyoubbs](https://github.com/ego008/goyoubbs) | 轻量论坛 |
| [ginblog](https://gitee.com/wejectchan/ginblog) | Gin + Blog |
| [wblog](https://github.com/wangsongyan/wblog) | 个人博客系统 |
| [zendea](https://gitee.com/zendea/zendea) | Go 论坛 |
| [gorobbs](https://github.com/letseeqiji/gorobbs) | Go 论坛 |

### 管理后台

| 项目 | 说明 |
|------|------|
| [go-admin](https://github.com/go-admin-team/go-admin) | 基于 Gin + Gorm 的后台管理系统 |
| [gin-vue-admin](https://www.gin-vue-admin.com/) | Gin + Vue 后台管理 |
| [nging](https://gitee.com/admpub/nging) | Go 系统检测管理面板 |
| [ferry](https://gitee.com/yllan/ferry) | Go 工单系统 |

### 低代码 / 工具

| 项目 | 说明 |
|------|------|
| [PocketBase](https://github.com/pocketbase/pocketbase) | 开源低代码平台，含数据库、认证、API |
| [TopList](https://github.com/tophubs/TopList) | 热门榜单聚合（mo.fish） |
| [Gitea](https://github.com/go-gitea/gitea) | 轻量级 Git 服务 |
| [Hugo](https://github.com/gohugoio/hugo) | 静态站点生成器 |
| [Wide](https://github.com/88250/wide) | Go 开源在线编辑器 |

### 更多资源

| 链接 | 说明 |
|------|------|
| [Gitee Go 建站系统](https://gitee.com/explore/build-web-system?lang=Go) | Gitee Go 项目合集 |
| [开源中国 Go BBS](https://www.oschina.net/project/tag/66/bbs) | 开源中国 BBS 项目 |
| [Gitee Go 后端](https://gitee.com/explore/backend?lang=Go) | Gitee Go 后端项目 |
| [独立开发者](https://w2solo.com/) | 独立开发者社区 |
| [HackerTalk](https://hackertalk.net/) | 技术论坛 |
| [Casbin Forum](https://forum.casbin.com/) | V2EX 风格论坛 |
