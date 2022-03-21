# 打包发布

使用msbuild
[使用msbuild](https://docs.microsoft.com/zh-cn/visualstudio/msbuild/msbuild?view=vs-2022)
打包程序
[使用cli](https://docs.microsoft.com/zh-cn/dotnet/core/deploying/deploy-with-cli)
生成单个exe文件

[打包生成单个文件](https://docs.microsoft.com/zh-cn/dotnet/core/deploying/single-file)

```bash
dotnet publish -r win-x64 -c Release -p:PublishSingleFile=true --self-contained false
```
