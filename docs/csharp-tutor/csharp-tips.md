# csharp小技巧

找不到引用
​

程序集名称在项目的property里面看

```xml
<ResourceDictionary
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:controls="clr-namespace:DMSkin.CloudMusic.Controls"
    xmlns:dmcontrols="clr-namespace:DMSkin.Controls;assembly=DMSkin"  这里的assembly必须填,而且是程序集名称
   
    >
```

然后删除.vs文件夹
​

打开默认浏览器

```csharp
 Hyperlink link = sender as Hyperlink;
            // 激活的是当前默认的浏览器
  Process.Start(new ProcessStartInfo(link.NavigateUri.AbsoluteUri.ToString())
            {
                UseShellExecute = true
            });
  e.Handled = true;
```
