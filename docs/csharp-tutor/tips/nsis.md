# 安装包制作工具

将 .NET 应用程序打包为安装程序，方便分发和部署。

## 工具对比

| 工具 | 许可 | 难度 | 特点 |
|------|------|------|------|
| **Inno Setup** | 免费开源 | ⭐⭐ | 脚本驱动，功能强大，社区活跃 |
| **NSIS** | 免费开源 | ⭐⭐⭐ | 高度可定制，学习曲线较陡 |
| **WiX Toolset** | 免费开源 | ⭐⭐⭐ | XML 配置，与 MSBuild 深度集成 |
| **Advanced Installer** | 收费（有免费版） | ⭐ | 图形化界面，企业级支持 |
| **InstallShield** | 收费 | ⭐ | 老牌工具，功能全面但昂贵 |
| **Squirrel.Windows** | 免费开源 | ⭐⭐ | 自动更新友好，适合现代应用 |
| **CreateInstall** | 收费 | ⭐ | 可视化拖拽式制作 |

## 免费/开源工具

### Inno Setup

[官方网站](https://jrsoftware.org/isinfo.php)

最流行的免费安装制作工具，使用 Pascal 脚本语言。

```pascal
; 示例：基本安装脚本
[Setup]
AppName=MyApp
AppVersion=1.0
DefaultDirName={pf}\MyApp
OutputDir=output

[Files]
Source: "publish\*"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\MyApp"; Filename: "{app}\MyApp.exe"
```

常用功能：
- 支持所有 Windows 版本（XP 到 11）
- 支持自定义安装页面
- 支持静默安装
- 支持注册表操作
- 支持数字签名

### NSIS（Nullsoft Scriptable Install System）

[官方网站](https://nsis.sourceforge.io/Download)

功能强大的脚本驱动安装工具。

```nsis
; 示例：基本安装脚本
Name "MyApp"
OutFile "MyApp-Installer.exe"
InstallDir "$PROGRAMFILES\MyApp"

Section "安装"
  SetOutPath "$INSTDIR"
  File /r "publish\*.*"
  CreateShortCut "$DESKTOP\MyApp.lnk" "$INSTDIR\MyApp.exe"
SectionEnd
```

常用插件：
- [HM NIS Edit](https://hmne.sourceforge.net/) — NSIS 脚本编辑器
- [nsis-dlg](https://github.com/lordmulder/nsis-dlg) — 自定义对话框插件
- [nsProcess](https://nsis.sourceforge.io/nsProcess_plugin) — 检查/终止进程

### WiX Toolset

[官方网站](https://wixtoolset.org/)

XML 格式配置，深度集成到 Visual Studio 和 MSBuild。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Wix xmlns="http://wixtoolset.org/schemas/v4/wxs">
  <Package Name="MyApp" Version="1.0.0" Manufacturer="MyCompany">
    <Directory Id="TARGETDIR" Name="SourceDir">
      <Directory Id="ProgramFilesFolder">
        <Directory Id="INSTALLDIR" Name="MyApp">
          <Component>
            <File Id="MyExe" Source="publish\MyApp.exe" />
          </Component>
        </Directory>
      </Directory>
    </Directory>
  </Package>
</Wix>
```

### Squirrel.Windows

[GitHub 仓库](https://github.com/Squirrel/Squirrel.Windows)

专门为 .NET 应用设计的安装和自动更新框架。

```powershell
# 使用 Squirrel 打包
nuget pack MyApp.nuspec
squirrel --releasify MyApp.1.0.0.nupkg
```

特点：
- 自动更新支持
- 增量更新（仅下载变更部分）
- 安装/卸载事件钩子
- GitHub Releases 集成

## 商业工具

### Advanced Installer

[官方网站](https://www.advancedinstaller.com/)

- 可视化界面，无需写脚本
- 支持 MSI、EXE、MSIX 格式
- 支持 .NET 运行时自动检测和安装
- 支持数字签名
- 免费版有限制，专业版收费

### InstallShield

[官方网站](https://www.revenera.com/install/products/installshield.html)

- 行业标准的老牌工具
- 支持复杂的安装场景
- 与 Visual Studio 深度集成
- 价格较高

### CreateInstall

[官方网站](https://www.createinstall.com/)

- 拖拽式可视化操作
- 支持多种输出格式
- 脚本扩展支持

## .NET 发布最佳实践

```bash
# 1. 发布自包含应用
dotnet publish -c Release -r win-x64 --self-contained true -o ./publish

# 2. 发布单文件应用
dotnet publish -c Release -r win-x64 -p:PublishSingleFile=true --self-contained true -o ./publish

# 3. 使用 ReadyToRun 提高启动速度
dotnet publish -c Release -r win-x64 -p:PublishReadyToRun=true --self-contained true -o ./publish

# 4. 裁剪未使用的代码（减小体积）
dotnet publish -c Release -r win-x64 -p:PublishTrimmed=true --self-contained true -o ./publish
```

## 推荐选择

- **小型工具 / 快速分发** → Inno Setup（免费、简单、够用）
- **需要自动更新** → Squirrel.Windows
- **企业级 MSI 安装** → WiX Toolset
- **不想写脚本** → Advanced Installer（免费版）
- **高度自定义** → NSIS
