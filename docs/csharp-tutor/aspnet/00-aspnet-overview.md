---
order: 0
---

# 概述与环境搭建

## 什么是 ASP.NET Core？

ASP.NET Core 是一个**跨平台、高性能、开源**的 Web 框架，用于构建现代 Web 应用、API 和微服务。它是微软重新设计的 ASP.NET 框架，完全重写，不再依赖 `System.Web.dll`。

### 核心特性

| 特性 | 说明 |
|------|------|
| **跨平台** | 支持 Windows、Linux、macOS |
| **高性能** | 在 TechEmpower 基准测试中排名前列 |
| **模块化** | 通过 NuGet 包按需引用组件 |
| **依赖注入** | 内置 IOC 容器 |
| **统一编程模型** | MVC、Web API、Razor Pages 统一在同一个框架中 |
| **云原生** | 原生支持 Docker、Kubernetes、配置热更新 |

## 版本演进

| 版本 | 发布时间 | 关键特性 |
|------|---------|---------|
| .NET Core 1.0 | 2016 | 首个跨平台版本 |
| .NET Core 3.1 | 2019 | LTS 版本，Windows Forms 支持 |
| .NET 5 | 2020 | 统一 .NET 平台，不再区分 Core |
| .NET 6 | 2021 | LTS，Minimal API，热重载 |
| .NET 7 | 2022 | 性能优化，Rate Limiting |
| .NET 8 | 2023 | LTS，AOT 编译，API 模板改进 |
| .NET 9 | 2024 | 最新版本 |

## 安装 .NET SDK

### Windows

```bash
# 方式一：下载安装包
# 访问 https://dotnet.microsoft.com/download

# 方式二：使用 winget
winget install Microsoft.DotNet.SDK.9
```

### Linux (Ubuntu/Debian)

```bash
# 注册微软包源
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb

# 安装 SDK
sudo apt-get update
sudo apt-get install -y dotnet-sdk-9.0
```

### macOS

```bash
# 使用 Homebrew
brew install --cask dotnet-sdk
```

### 验证安装

```bash
dotnet --version
# 输出类似: 9.0.100

dotnet --list-sdks
# 输出已安装的所有 SDK 版本
```

## 创建第一个项目

```bash
# 创建 Web API 项目
dotnet new webapi -n MyFirstApp

# 创建 MVC 项目
dotnet new mvc -n MyFirstMvc

# 创建 Minimal API 项目
dotnet new web -n MyFirstMinimal

# 进入项目目录
cd MyFirstApp

# 运行项目
dotnet run
```

## 开发工具

### Visual Studio 2022
- 完整的 IDE 支持
- 内置调试器、SQL Server 集成
- 社区版免费

### VS Code
```bash
# 安装 C# 扩展
code --install-extension ms-dotnettools.csharp
```

### JetBrains Rider
- 跨平台 .NET IDE
- 强大的重构和导航功能

## 下一步

现在你已经搭建好开发环境，接下来学习如何创建第一个 ASP.NET Core 应用。