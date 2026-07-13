# 制作 EXE 图标

## 图标格式说明

Windows 应用程序图标使用 **`.ico`** 格式，一个 `.ico` 文件可以包含同一图标的多分辨率版本（如 16×16、32×32、48×48、256×256 等），以适应不同显示场景（任务栏、桌面、资源管理器等）。

## 在线工具

无需安装，直接在浏览器中使用：

- **[icoconverter.com](https://icoconverter.com/)** — 上传 PNG/JPG 一键转换为 ICO，支持多分辨率
- **[convertio.co](https://convertio.co/zh/png-ico/)** — 支持批量转换，可自定义输出尺寸
- **[favicon.io](https://favicon.io/)** — 从文字/图片生成全套图标（favicon + 应用图标）
- **[easyicon.net](https://www.easyicon.net/)** — 图标搜索下载，支持多种格式和尺寸

## 桌面工具

- **[ImageMagick](https://imagemagick.org/)** — 强大的命令行图像处理工具，批量转换为 ICO
  ```bash
  magick convert input.png -define icon:auto-resize=256,64,48,32,16 output.ico
  ```
- **[Greenfish Icon Editor Pro](https://greenfishsoftware.org/gfiep.php)** — 免费的图标编辑器，支持从 PNG 导入并自动生成多尺寸
- **[Axialis IconWorkshop](https://www.axialis.com/iconworkshop/)** — 专业图标制作工具（收费）

## 图标素材网站

- **[Icon Archive](https://iconarchive.com/)** — 大量免费图标集，支持 ICO/PNG 格式下载
- **[Flaticon](https://www.flaticon.com/)** — 海量 SVG/PNG 图标资源
- **[Icons8](https://icons8.com/)** — 免费图标库，支持多种风格
- **[Material Design Icons](https://materialdesignicons.com/)** — Google Material 风格图标

## 在项目中引用图标

### WinForms / WPF

将 `.ico` 文件添加到项目 → 右键选中文件 → 属性 → 生成操作设为 `嵌入的资源`。

或在项目属性 > 应用程序 > 图标中选择图标文件。

### 设置窗口图标（WPF）

```xml
<Window Icon="/Resources/app.ico" ... />
```

### 设置窗口图标（WinForms）

```csharp
this.Icon = new Icon(@"Resources\app.ico");
```

## 推荐流程

1. 设计 256×256 的 PNG 图标
2. 使用 ImageMagick 或在线工具转换为 ICO（包含 256、64、48、32、16 五种尺寸）
3. 在项目属性中设置为应用程序图标
4. （可选）为不同 DPI 场景准备不同尺寸的图标资源
