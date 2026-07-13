# Go 常用技巧与资源

## Go Module 速查

[go.mod 速查表](https://encore.dev/guide/go.mod)

```bash
# 初始化模块
go mod init module-name

# 添加依赖
go get github.com/gin-gonic/gin

# 整理依赖
go mod tidy

# 下载依赖到本地
go mod download

# 查看依赖
go list -m all

# 查看可更新
go outdated

# 复制依赖到 vendor
go mod vendor
```

## 环境配置

```bash
# 启用 Go Modules
go env -w GO111MODULE=on

# 设置代理（国内推荐）
go env -w GOPROXY=https://goproxy.cn,direct

# 设置 GOPATH
go env -w GOPATH=D:\golangmod
```

### 常用环境变量

| 变量 | 说明 |
|------|------|
| `$GOROOT` | Go 安装目录 |
| `$GOPATH` | 工作目录 |
| `$GOBIN` | 可执行文件目录 |
| `$GO111MODULE` | 模块开关 (on/off/auto) |
| `$GOPROXY` | 代理地址 |
| `$GOPRIVATE` | 私有仓库（不走代理） |

## 开发工具

### Air（热重载）

```bash
go install github.com/cosmtrek/air@latest
# 在项目目录运行 air
air
```

### GoFrame CLI

```bash
# 安装 GF CLI
wget https://goframe.org/cli/linux_amd64/gf && chmod +x gf && ./gf install
```

### Swagger

```bash
go install github.com/swaggo/swag/cmd/swag@latest
# 在项目根目录生成文档
swag init
```

## 常用库推荐

### Web 框架

| 框架 | 说明 | 链接 |
|------|------|------|
| **Gin** | 高性能 HTTP 框架 | `github.com/gin-gonic/gin` |
| **Echo** | 高性能，极简 | `github.com/labstack/echo` |
| **GoFrame** | 全功能企业级框架 | `github.com/gogf/gf` |
| **Fiber** | 类 Express 风格 | `github.com/gofiber/fiber` |
| **Beego** | MVC 全栈框架 | `github.com/beego/beego` |

### 常用工具

| 库 | 用途 | 链接 |
|----|------|------|
| **Viper** | 配置管理 | `github.com/spf13/viper` |
| **Cobra** | CLI 工具 | `github.com/spf13/cobra` |
| **GORM** | ORM 数据库 | `gorm.io/gorm` |
| **GoRedis** | Redis 客户端 | `github.com/redis/go-redis` |
| **Logrus** | 日志库 | `github.com/sirupsen/logrus` |
| **Zap** | 高性能日志 | `go.uber.org/zap` |
| **Validator** | 验证器 | `github.com/go-playground/validator` |
| **JWT** | JWT 认证 | `github.com/golang-jwt/jwt` |
| **Casbin** | 权限管理 | `github.com/casbin/casbin` |
| **Testify** | 测试工具 | `github.com/stretchr/testify` |

### HTTP 客户端

| 库 | 说明 | 链接 |
|----|------|------|
| **标准库** | `net/http`，功能完善 | 内置 |
| **Resty** | 类 Python requests | `github.com/go-resty/resty` |
| **Gentleman** | 插件驱动的 HTTP 客户端 | `github.com/h2non/gentleman` |

## 快速记忆日期格式化

```go
// Go 日期格式化使用固定时间：2006-01-02 15:04:05
const layout = "2006-01-02 15:04:05"
now := time.Now()
fmt.Println(now.Format(layout))       // 2024-01-15 14:30:00
fmt.Println(now.Format("2006/01/02")) // 2024/01/15
```

## 代码规范

- 推荐驼峰命名，不用下划线
- 包名小写，简洁有意义
- 接口名：一个方法加 `-er` 后缀（如 Reader, Writer）
- 错误变量：`Err` 开头（如 `ErrNotFound`）
- 函数接收者：1-2 个字母（如 `u User`, `r Rectangle`）

## 开源项目参考

- [filebrowser](https://github.com/filebrowser/filebrowser) - 文件管理
- [frp](https://github.com/fatedier/frp) - 内网穿透
- [Caddy](https://github.com/caddyserver/caddy) - Web 服务器
- [Hugo](https://github.com/gohugoio/hugo) - 静态站点
- [Gitea](https://github.com/go-gitea/gitea) - Git 服务
- [Syncthing](https://github.com/syncthing/syncthing) - 文件同步
