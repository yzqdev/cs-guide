# 安装dotnet

## windows安装

[地址](https://dotnet.microsoft.com/zh-cn/download/dotnet/6.0/runtime?cid=getdotnetcore)

## linux安装

[linux安装](https://docs.microsoft.com/zh-cn/dotnet/core/install/linux?WT.mc_id=dotnet-35129-website)

## 20.04

使用 APT 进行安装可通过几个命令来完成。 安装 .NET 之前，请运行以下命令，将 Microsoft 包签名密钥添加到受信任密钥列表，并添加包存储库。

打开终端并运行以下命令：

```bash
wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb
```

### 安装 SDK

.NET SDK 使你可以通过 .NET 开发应用。 如果安装 .NET SDK，则无需安装相应的运行时。 若要安装 .NET SDK，请运行以下命令：

```bash
sudo apt-get update; \
  sudo apt-get install -y apt-transport-https && \
  sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-6.0
```

 重要

如果收到类似于“找不到包 dotnet-sdk-6.0”的错误消息，请参阅 [APT 疑难解答](https://docs.microsoft.com/zh-cn/dotnet/core/install/linux-ubuntu#apt-troubleshooting)部分。

### 安装运行时

通过 ASP.NET Core 运行时，可以运行使用 .NET 开发且未提供运行时的应用。 以下命令将安装 ASP.NET Core 运行时，这是与 .NET 最兼容的运行时。 在终端中，运行以下命令：

```bash
sudo apt-get update; \
  sudo apt-get install -y apt-transport-https && \
  sudo apt-get update && \
  sudo apt-get install -y aspnetcore-runtime-6.0
```

 重要

如果收到类似于“找不到包 aspnetcore-runtime-6.0”的错误消息，请参阅 [APT 疑难解答](https://docs.microsoft.com/zh-cn/dotnet/core/install/linux-ubuntu#apt-troubleshooting)部分。

作为 ASP.NET Core 运行时的一种替代方法，你可以安装不包含 ASP.NET Core 支持的 .NET 运行时：将上一命令中的 `aspnetcore-runtime-6.0` 替换为 `dotnet-runtime-6.0`：

```bash
sudo apt-get install -y dotnet-runtime-6.0
```
