# 常见问题

## 如何打包

[参考文章](https://blog.panpili.com/2022/coding/dotnet/quit-winui-now/)

## Unpackage 模式找不到 ApplicationData.Current

`Windows.Storage.ApplicationData.Current` 仅适用于具有身份的打包应用程序（UWP 应用和 Desktop Bridge 应用）。未打包的 Win32 EXE 没有自己的独立应用数据的概念。

不清楚为什么需要在这里使用这个，或者你想要完成什么。这不应该与音频播放中的裂缝有任何关系。

## Win 双击 exe 就可以运行的配置

```xml
<WindowsPackageType>None</WindowsPackageType>
<WindowsAppSDKSelfContained>true</WindowsAppSDKSelfContained>
```

## 打包命令

```powershell
dotnet publish ..\UI\UI.csproj -c $(Configuration) -r win10-x64 -p:PublishSingleFile=true -p:Platform=x64 -o ..\Executables\UI
```