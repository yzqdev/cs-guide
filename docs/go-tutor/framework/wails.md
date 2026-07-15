# Wails 完整教程

<Catalog />

[Wails](https://wails.io/) 是一个用 Go 构建桌面应用的框架。它让你用 Go 写后端逻辑，用前端技术（HTML/CSS/JS）写界面，最终打包成一个跨平台的桌面应用。

## 安装

### 安装 Wails CLI

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

### 安装系统依赖

**Windows**：需要安装 [WebView2](https://developer.microsoft.com/zh-cn/microsoft-edge/webview2/)（Win10+ 已内置）

**macOS**：需要 Xcode Command Line Tools

```bash
xcode-select --install
```

**Linux**：需要安装 WebKit GTK

```bash
sudo apt install libgtk-3-dev libwebkit2gtk-4.0-dev
```

### 验证安装

```bash
wails doctor
```

## 创建项目

```bash
# 创建项目（选择前端模板）
wails init -n my-app -t vanilla     # 纯 JS
wails init -n my-app -t vue         # Vue
wails init -n my-app -t react       # React
wails init -n my-app -t svelte      # Svelte
wails init -n my-app -t preact      # Preact
wails init -n my-app -t lit         # Lit

# 使用自定义模板
wails init -n my-app -t https://github.com/example/template

# 进入项目
cd my-app
```

## 项目结构

```
my-app/
├── build/              # 构建相关配置
│   ├── appicon.png     # 应用图标
│   ├── darwin/         # macOS 打包配置
│   ├── windows/        # Windows 打包配置
│   └── linux/          # Linux 打包配置
├── frontend/           # 前端代码
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── main.go             # 主入口
├── app.go              # 应用逻辑（Go 后端）
├── wails.json          # Wails 项目配置
└── go.mod
```

## 主入口（main.go）

```go
package main

import (
    "embed"
    "log"

    "github.com/wailsapp/wails/v2"
    "github.com/wailsapp/wails/v2/pkg/options"
    "github.com/wailsapp/wails/v2/pkg/options/assetserver"
    "github.com/wailsapp/wails/v2/pkg/options/linux"
    "github.com/wailsapp/wails/v2/pkg/options/mac"
    "github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
    app := NewApp()

    err := wails.Run(&options.App{
        Title:  "MyApp",
        Width:  1024,
        Height: 768,

        // 窗口配置
        MinWidth:          800,
        MinHeight:         600,
        MaxWidth:          1920,
        MaxHeight:         1080,
        Resizable:         true,
        Fullscreen:        false,
        AlwaysOnTop:       false,
        WindowStartState:  options.Normal, // Normal, Maximised, Minimised, Fullscreen

        // 隐藏标题栏（自定义标题栏）
        Frameless: false,

        // 无边框 + 窗口拖拽区域
        // Frameless: true,
        // CSS: 设置 .drag { -webkit-app-region: drag; }

        // 资产服务器
        AssetServer: &assetserver.Options{
            Assets: assets,
        },

        // 前端背景色
        BackgroundColour: &options.RGBA{R: 255, G: 255, B: 255, A: 1},

        // 绑定 Go 方法到前端
        Bind: []interface{}{
            app,
        },

        // 平台特定配置
        Windows: &windows.Options{
            WebviewIsTransparent: false,
            WindowIsTranslucent:  false,
            DisableWindowIcon:    false,
            // 自定义菜单
            // Menu:           windowsMenu,
            // 消息对话框
            // Messages:       &windows.Messages{},
        },
        Mac: &mac.Options{
            TitleBar:             mac.TitleBarHiddenInset(),
            Appearance:           mac.DefaultAppearance,
            WebviewIsTransparent: false,
            WindowIsTranslucent:  false,
            About: &mac.AboutInfo{
                Title:   "MyApp",
                Message: "这是关于信息",
                // Icon: icon,
            },
        },
        Linux: &linux.Options{
            WebviewIsTransparent: false,
            WindowIsTranslucent:  false,
        },

        // 生命周期
        OnStartup:  app.startup,
        OnShutdown: app.shutdown,
        OnDomReady: app.domReady,
        // 浏览器打开 URL
        OnUrlChanged: func(url string) {
            log.Println("URL 变更:", url)
        },
    })

    if err != nil {
        log.Fatal(err)
    }
}
```

## Go 后端（app.go）

### 基础绑定

```go
package main

import "context"

type App struct {
    ctx context.Context
    // 用户信息存储
    userID int
}

// 启动时调用
func (a *App) startup(ctx context.Context) {
    a.ctx = ctx
    a.userID = 0
    log.Println("应用启动")
}

// 关闭时调用
func (a *App) shutdown(ctx context.Context) {
    log.Println("应用关闭")
}

// DOM 加载完成时调用
func (a *App) domReady(ctx context.Context) {
    log.Println("前端加载完成")
}

// 绑定方法 → 前端可调用
func (a *App) Greet(name string) string {
    return fmt.Sprintf("Hello %s! 来自 Go 后端的问候。", name)
}

// 返回结构体 → 自动转为 JSON
func (a *App) GetUser(id int) User {
    return User{ID: id, Name: "张三", Email: "zhangsan@example.com"}
}

type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

// 接收结构体参数
func (a *App) SaveUser(user User) error {
    log.Printf("保存用户: %+v", user)
    return nil
}

// 异步操作
func (a *App) LongRunningTask() {
    go func() {
        time.Sleep(3 * time.Second)
        // 完成后通知前端
        a.Emit("task-done", "任务完成")
    }()
}
```

### 事件系统

```go
import "github.com/wailsapp/wails/v2/pkg/runtime"

// 前端发送事件到 Go
func (a *App) OnEvent(ctx context.Context) {
    // 监听前端事件
    runtime.EventsOn(ctx, "frontend-event", func(optionalData ...interface{}) {
        log.Println("收到前端事件:", optionalData)
    })

    // 一次性监听
    runtime.EventsOnce(ctx, "one-time-event", func(optionalData ...interface{}) {
        log.Println("只触发一次:", optionalData)
    })
}

// Go 发送事件到前端
func (a *App) Emit(event string, data interface{}) {
    runtime.EventsEmit(a.ctx, event, data)
}

// 取消监听
func (a *App) Off(ctx context.Context, event string) {
    runtime.EventsOff(ctx, event)
}
```

### 对话框

```go
import "github.com/wailsapp/wails/v2/pkg/runtime"

// 信息对话框
func (a *App) ShowInfo() {
    runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
        Type:          runtime.InfoDialog,
        Title:         "提示",
        Message:       "操作成功",
        // 默认按钮
        DefaultButton: "确定",
    })
}

// 确认对话框
func (a *App) ConfirmDelete() bool {
    result, err := runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
        Type:          runtime.QuestionDialog,
        Title:         "确认删除",
        Message:       "确定要删除这条记录吗？此操作不可撤销。",
        Buttons:       []string{"确定", "取消"},
        DefaultButton: "取消",
        CancelButton:  "取消",
    })
    if err != nil {
        return false
    }
    return result == "确定"
}

// 错误对话框
func (a *App) ShowError(msg string) {
    runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
        Type:    runtime.ErrorDialog,
        Title:   "错误",
        Message: msg,
    })
}

// 警告对话框
func (a *App) ShowWarning() {
    runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
        Type:    runtime.WarningDialog,
        Title:   "警告",
        Message: "磁盘空间不足",
    })
}

// 打开文件对话框
func (a *App) OpenFile() string {
    file, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
        Title: "选择文件",
        Filters: []runtime.FileFilter{
            {DisplayName: "图片", Pattern: "*.png;*.jpg;*.jpeg"},
            {DisplayName: "文档", Pattern: "*.pdf;*.doc"},
            {DisplayName: "所有文件", Pattern: "*.*"},
        },
        DefaultDirectory: "C:/Users",
        DefaultFilename:  "",
        CanCreateDirectories: true,
        ShowHiddenFiles:      false,
        AllowsMultipleSelection: false,
    })
    if err != nil {
        return ""
    }
    return file
}

// 保存文件对话框
func (a *App) SaveFile() string {
    file, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
        Title: "保存文件",
        Filters: []runtime.FileFilter{
            {DisplayName: "文本文件", Pattern: "*.txt"},
        },
        DefaultFilename: "output.txt",
    })
    if err != nil {
        return ""
    }
    return file
}

// 打开目录对话框
func (a *App) OpenDirectory() string {
    dir, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
        Title: "选择目录",
    })
    if err != nil {
        return ""
    }
    return dir
}
```

### 窗口操作

```go
import "github.com/wailsapp/wails/v2/pkg/runtime"

// 窗口状态
func (a *App) WindowOperation(action string) {
    switch action {
    case "minimize":
        runtime.WindowMinimise(a.ctx)
    case "maximize":
        runtime.WindowMaximise(a.ctx)
    case "unmaximize":
        runtime.WindowUnmaximise(a.ctx)
    case "fullscreen":
        runtime.WindowFullscreen(a.ctx)
    case "unfullscreen":
        runtime.WindowUnfullscreen(a.ctx)
    case "center":
        runtime.WindowCenter(a.ctx)
    case "hide":
        runtime.WindowHide(a.ctx)
    case "show":
        runtime.WindowShow(a.ctx)
    case "close":
        runtime.Quit(a.ctx) // 退出应用
    }
}

// 设置窗口大小
func (a *App) SetWindowSize(width, height int) {
    runtime.WindowSetSize(a.ctx, width, height)
}

// 获取窗口大小
func (a *App) GetWindowSize() (int, int) {
    width, height := runtime.WindowGetSize(a.ctx)
    return width, height
}

// 设置窗口位置
func (a *App) SetWindowPosition(x, y int) {
    runtime.WindowSetPosition(a.ctx, x, y)
}

// 设置窗口标题
func (a *App) SetWindowTitle(title string) {
    runtime.WindowSetTitle(a.ctx, title)
}

// 设置窗口背景色
func (a *App) SetBackgroundColour(r, g, b, a uint8) {
    runtime.WindowSetBackgroundColour(a.ctx, r, g, b, a)
}

// 设置窗口是否可调整大小
func (a *App) SetResizable(resizable bool) {
    runtime.WindowSetResizable(a.ctx, resizable)
}

// 判断窗口状态
func (a *App) IsFullscreen() bool {
    return runtime.WindowIsFullscreen(a.ctx)
}

func (a *App) IsMaximised() bool {
    return runtime.WindowIsMaximised(a.ctx)
}

func (a *App) IsMinimised() bool {
    return runtime.WindowIsMinimised(a.ctx)
}
```

### 剪贴板

```go
import "github.com/wailsapp/wails/v2/pkg/runtime"

func (a *App) CopyToClipboard(text string) error {
    return runtime.ClipboardSetText(a.ctx, text)
}

func (a *App) PasteFromClipboard() (string, error) {
    return runtime.ClipboardGetText(a.ctx)
}
```

### 浏览器

```go
import "github.com/wailsapp/wails/v2/pkg/runtime"

func (a *App) OpenURL(url string) error {
    return runtime.BrowserOpenURL(a.ctx, url)
}
```

### 屏幕信息

```go
import "github.com/wailsapp/wails/v2/pkg/runtime"

func (a *App) GetScreenInfo() {
    screens, _ := runtime.ScreenGetAll(a.ctx)
    for _, screen := range screens {
        log.Printf("屏幕: %dx%d, 位置: (%d,%d), 是否主屏: %v",
            screen.Width, screen.Height,
            screen.X, screen.Y,
            screen.IsCurrent)
    }
}
```

### 菜单配置

```go
import (
    "github.com/wailsapp/wails/v2/pkg/menu"
    "github.com/wailsapp/wails/v2/pkg/menu/keys"
    "github.com/wailsapp/wails/v2/pkg/runtime"
)

func CreateMenu(app *App) *menu.Menu {
    fileMenu := menu.NewMenuFromItems(
        menu.SubMenu("文件", menu.NewMenuFromItems(
            menu.Text("新建", keys.CmdOrCtrl("n"), func(_ *menu.CallbackData) {
                runtime.EventsEmit(app.ctx, "menu-new", nil)
            }),
            menu.Text("打开", keys.CmdOrCtrl("o"), func(_ *menu.CallbackData) {
                app.OpenFile()
            }),
            menu.Separator(),
            menu.Text("保存", keys.CmdOrCtrl("s"), func(_ *menu.CallbackData) {
                runtime.EventsEmit(app.ctx, "menu-save", nil)
            }),
            menu.Separator(),
            menu.Text("退出", keys.CmdOrCtrl("q"), func(_ *menu.CallbackData) {
                runtime.Quit(app.ctx)
            }),
        )),
        menu.SubMenu("编辑", menu.NewMenuFromItems(
            menu.Text("撤销", keys.CmdOrCtrl("z"), nil),
            menu.Text("重做", keys.CmdOrCtrl("y"), nil),
            menu.Separator(),
            menu.Text("剪切", keys.CmdOrCtrl("x"), nil),
            menu.Text("复制", keys.CmdOrCtrl("c"), nil),
            menu.Text("粘贴", keys.CmdOrCtrl("v"), nil),
        )),
        menu.SubMenu("帮助", menu.NewMenuFromItems(
            menu.Text("关于", nil, func(_ *menu.CallbackData) {
                runtime.MessageDialog(app.ctx, runtime.MessageDialogOptions{
                    Type:    runtime.InfoDialog,
                    Title:   "关于",
                    Message: "MyApp v1.0.0",
                })
            }),
            menu.Text("检查更新", nil, func(_ *menu.CallbackData) {
                runtime.BrowserOpenURL(app.ctx, "https://example.com/releases")
            }),
        )),
    )

    return fileMenu
}
```

### 系统托盘

```go
import "github.com/wailsapp/wails/v2/pkg/options"

func main() {
    // 系统托盘
    err := wails.Run(&options.App{
        // ...
        // 系统托盘配置（需要先创建菜单）
        Menu: CreateMenu(app),
    })
}
```

## 前端集成

### 前端调用 Go 方法

```javascript
// 调用 Go 方法（返回 Promise）
window.go.main.App.Greet('张三').then((result) => {
  console.log(result) // "Hello 张三! 来自 Go 后端的问候。"
})

// async/await
async function loadUser() {
  const user = await window.go.main.App.GetUser(1)
  console.log(user) // { id: 1, name: "张三", email: "zhangsan@example.com" }
}

// 调用有返回错误的方法
try {
  await window.go.main.App.SaveUser({ id: 1, name: '张三' })
} catch (err) {
  console.error('保存失败:', err)
}
```

### 前端监听 Go 事件

```javascript
// 监听 Go 发送的事件
import { EventsOn, EventsOnce, EventsOff } from '@wailsapp/runtime'

// 持续监听
EventsOn('task-done', (data) => {
  console.log('任务完成:', data)
})

// 只监听一次
EventsOnce('one-time-event', (data) => {
  console.log('一次性事件:', data)
})

// 取消监听
EventsOff('task-done')

// 前端发送事件到 Go
import { EventsEmit } from '@wailsapp/runtime'
EventsEmit('frontend-event', { key: 'value' })
```

## Build 命令

### 开发模式

```bash
# 启动开发模式（热重载）
wails dev

# 指定前端开发服务器端口
wails dev -frontend http://localhost:5173

# 打开 DevTools
wails dev -devtools

# 重新加载
wails dev -reload
```

### 生产构建

```bash
# 基础构建
wails build

# 构建并压缩
wails build -upx -upxflags -9

# 跳过前端构建（已构建好）
wails build -skipfrontend

# 指定平台
wails build -platform windows/amd64
wails build -platform darwin/universal
wails build -platform linux/amd64

# 清理构建
wails build -clean
```

### -webview2 参数

```bash
wails build -webview2 download
```

| 参数       | 说明                                 |
| ---------- | ------------------------------------ |
| `download` | （推荐）提示用户下载安装 WebView2    |
| `embed`    | 嵌入引导程序（+150KB），无需用户安装 |
| `browser`  | 打开浏览器引导下载                   |
| `error`    | 无运行环境时直接报错                 |

### LDFlags

```bash
# Windows 隐藏控制台窗口
wails build -ldflags "-H windowsgui"

# 去掉调试信息
wails build -ldflags "-w -s"

# 组合
wails build -webview2 download -ldflags "-w -H windowsgui" -upx -upxflags -9
```

## wails.json 配置

```json
{
  "$schema": "https://wails.io/schemas/config.v2.json",
  "name": "my-app",
  "outputfilename": "my-app",
  "frontend:install": "npm install",
  "frontend:build": "npm run build",
  "frontend:dev:watcher": "npm run dev",
  "frontend:dev:serverUrl": "http://localhost:5173",
  "author": {
    "name": "Your Name",
    "email": "your@email.com"
  },
  "info": {
    "companyName": "My Company",
    "productName": "My App",
    "productVersion": "1.0.0",
    "copyright": "Copyright © 2024",
    "comments": "Built with Wails"
  }
}
```

## 应用图标

```bash
# 生成应用图标（需要安装 wails）
wails generate icon -input icon.png

# 或手动放置
# build/appicon.png → 自动用于各平台
```

## 注意事项

:::warning 路由模式

- **必须使用 hash 路由**，不要用 history 路由
  :::

:::warning 外部资源

- 不要在 `index.html` 中引用本地开发服务器地址（如 `http://localhost:8098`）
- 应用加载时会尝试连接这些地址，导致启动变慢
  :::

## 调试

```go
// 在 Go 代码中打印日志
log.Println("调试信息")

// 前端 DevTools
// 开发模式默认开启，构建时需添加 -devtools 参数

// 查看 Go 日志
// 开发模式在终端直接看
// 构建版本在 data 目录下的日志文件中
```

## 常见问题

### 1. 窗口白屏

- 检查 `frontend/dist` 是否存在
- 检查 `//go:embed all:frontend/dist` 路径是否正确
- 检查前端构建是否成功

### 2. 绑定方法没找到

- 确保在 `Bind: []interface{}{app}` 中注册了
- 确保方法名首字母大写（公开方法）
- 确保方法签名正确（`func (a *App) MethodName(params) (return, error)`）

### 3. 构建体积太大

- 使用 `-upx` 压缩
- 使用 `-ldflags "-w -s"` 移除调试符号
- 前端资源按需加载，不要打包不必要的库

### 4. 跨平台构建

```bash
# Windows 上构建 macOS 应用（需要交叉编译工具）
GOOS=darwin GOARCH=amd64 wails build

# macOS 上构建 Windows 应用
GOOS=windows GOARCH=amd64 wails build
```
