# 基础

## 创建aspnetcore项目

1. 创建web项目

```powershell
# 查看所有命令
dotnet -h
# 查看所有的模板
dotnet new list
# 创建一个webapp,非restapi
dotnet new webapp -o <项目名称>
# 创建一个restfulapi 最小api
dotnet new webapi -o  <项目名称>
```

2.创建最小api(使用vs)

- 从“文件”菜单中选择“新建”>“项目” 。
- 在搜索框中输入“Web API”。
- 选择“ASP.NET Core Web API”模板，然后选择“下一步”。
- 在“配置新项目”对话框中，将项目命名为“TodoApi”，然后选择“下一步”。
- 在“其他信息”对话框中：
  - 确认“框架”是“.NET 7.0”（或更高版本）。
  - 确认已选中“使用控制器(取消选中以使用最小 API)”。
  - 选择“创建”。

## 运行

```powershell
dotnet watch run
```
