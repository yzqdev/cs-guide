---
order: 9
---

# Razor 视图

## Razor 语法基础

Razor 是 ASP.NET Core 的视图引擎，允许在 HTML 中嵌入 C# 代码。

### 内联表达式

```html
@* 单行表达式 *@
<p>当前时间: @DateTime.Now</p>
<p>用户名: @Model.Name</p>
<p>1 + 2 = @(1 + 2)</p>

@* HTML 编码：Razor 默认会编码输出，防止 XSS *@
<p>@Model.HtmlContent</p>  @* 输出编码后的文本 *@

@* 输出原始 HTML（不编码） *@
<p>@Html.Raw(Model.HtmlContent)</p>
```

### 代码块

```html
@* 多行代码块 *@
@{
    var greeting = "Hello";
    var hour = DateTime.Now.Hour;
    if (hour < 12)
    {
        greeting = "早上好";
    }
    else if (hour < 18)
    {
        greeting = "下午好";
    }
    else
    {
        greeting = "晚上好";
    }
}

<h2>@greeting, @Model.Name</h2>
```

## 布局（Layout）

### _Layout.cshtml

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>@ViewData["Title"] - MyApp</title>
    <link rel="stylesheet" href="~/css/site.css" />
    @await RenderSectionAsync("Styles", required: false)
</head>
<body>
    <header>
        <nav>
            <a href="/">首页</a>
            <a href="/Home/About">关于</a>
        </nav>
    </header>

    <main>
        @RenderBody()
    </main>

    <footer>
        &copy; 2024 - MyApp
    </footer>

    <script src="~/js/site.js"></script>
    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>
```

### 使用布局

```html
@* Views/_ViewStart.cshtml - 设置默认布局 *@
@{
    Layout = "_Layout";
}

@* 某个页面 *@
@{
    ViewData["Title"] = "首页";
}

<h1>欢迎来到我的网站</h1>
<p>这是首页内容</p>

@section Scripts {
    <script>
        console.log("首页专用脚本");
    </script>
}
```

## 部分视图（Partial Views）

### 创建部分视图 `_UserCard.cshtml`

```html
@model User

<div class="card">
    <h3>@Model.Name</h3>
    <p>邮箱: @Model.Email</p>
    <p>角色: @Model.Role</p>
</div>
```

### 渲染部分视图

```html
@* 方式一：渲染部分视图 *@
<partial name="_UserCard" model="user" />

@* 方式二：异步渲染 *@
@await Html.PartialAsync("_UserCard", user)

@* 方式三：循环渲染 *@
@foreach (var user in Model.Users)
{
    <partial name="_UserCard" model="user" />
}
```

## 视图组件（View Components）

视图组件比部分视图更强大，支持依赖注入和独立业务逻辑。

### 创建视图组件

```csharp
// Components/NavigationViewComponent.cs
public class NavigationViewComponent : ViewComponent
{
    private readonly ICategoryService _categoryService;

    public NavigationViewComponent(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    public async Task<IViewComponentResult> InvokeAsync(string activeClass = "active")
    {
        var categories = await _categoryService.GetAllAsync();
        return View(new NavigationViewModel
        {
            Categories = categories,
            ActiveClass = activeClass
        });
    }
}
```

### 视图组件模板

`Views/Shared/Components/Navigation/Default.cshtml`：

```html
@model NavigationViewModel

<nav class="navbar">
    <ul>
        @foreach (var category in Model.Categories)
        {
            <li class="@Model.ActiveClass">@category.Name</li>
        }
    </ul>
</nav>
```

### 调用视图组件

```html
@await Component.InvokeAsync("Navigation", new { activeClass = "current" })
```

## Tag Helpers

Tag Helpers 让服务器端代码参与到 HTML 元素创建中：

```html
@* 表单 *@
<form asp-controller="Users" asp-action="Create" method="post">
    <div>
        <label asp-for="Name"></label>
        <input asp-for="Name" class="form-control" />
        <span asp-validation-for="Name" class="text-danger"></span>
    </div>
    
    <div>
        <label asp-for="Email"></label>
        <input asp-for="Email" class="form-control" />
        <span asp-validation-for="Email" class="text-danger"></span>
    </div>
    
    <button type="submit" class="btn btn-primary">提交</button>
</form>

@* 链接 *@
<a asp-controller="Home" asp-action="Index" asp-route-id="5">首页</a>

@* 图片 *@
<img asp-append-version="true" src="~/images/logo.png" />

@* 环境判断 *@
<environment include="Development">
    <link rel="stylesheet" href="~/css/dev.css" />
</environment>
<environment exclude="Development">
    <link rel="stylesheet" href="~/css/prod.min.css" />
</environment>
```

## 常用内置 Tag Helpers

| Tag Helper | 用途 |
|-----------|------|
| `<a asp-controller asp-action>` | 生成链接 |
| `<form asp-action>` | 生成表单 |
| `<input asp-for>` | 绑定模型属性 |
| `<label asp-for>` | 显示属性名称 |
| `<span asp-validation-for>` | 显示验证错误 |
| `<select asp-for asp-items>` | 生成下拉列表 |
| `<environment>` | 环境特定内容 |
| `<cache>` | 缓存输出 |