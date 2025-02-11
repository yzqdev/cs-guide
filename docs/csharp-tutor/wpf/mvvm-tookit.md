# mvvm绑定工具

## 例子

TookitModel.cs

```csharp
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Ookii.Dialogs.Wpf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using ViewModelTutor.View;

namespace ViewModelTutor.Model;

public partial class TookitModel : ObservableObject
{
    public IAsyncRelayCommand DownloadTextCommand { get; }

    private async Task<string> DownloadTextAsync()
    {
        await Task.Delay(1000); // Simulate a web request
        Name = "1秒后";
        return "Hello world!";
    }

    /// <summary>
    /// 1.使用relaycommand
    /// </summary>
    public RelayCommand ClickCommand { get; }

    private string _name;
    public string Name
    {
        get { return _name; }
        set { SetProperty(ref _name, value); }
    }

    public TookitModel()
    {
        Name = "初始名字";
        ClickCommand = new RelayCommand(Show);

        DownloadTextCommand = new AsyncRelayCommand(DownloadTextAsync);
    }

    public void Show()
    {
        Name = "bbbbbbbbb";
        MessageBox.Show(Name);
    }

    /// <summary>
    ///2. 也可以使用attribute
    /// </summary>
    [RelayCommand]
    public void open()
    {
        var dialog = new VistaFolderBrowserDialog
        {
            Description = "Please select a folder.",
            UseDescriptionForTitle = true // This applies to the Vista style dialog only, not the old dialog.
        };

        if (!VistaFolderBrowserDialog.IsVistaFolderDialogSupported)
        {
            MessageBox.Show(
                "Because you are not using Windows Vista or later, the regular folder browser dialog will be used. Please use Windows Vista to see the new dialog.",
                "Sample folder browser dialog"
            );
        }

        if ((bool)dialog.ShowDialog())
        {
            Name = dialog.SelectedPath;
            string a = "aaa";
            MessageBox.Show(
                $"The selected folder was:{Environment.NewLine}{Name}",
                "Sample folder browser dialog"
            );
        }
    }
}

```

TookitView.xaml

```xml
<Window
    x:Class="ViewModelTutor.View.TookitView"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:local="clr-namespace:ViewModelTutor.Model"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    Title="TookitView"
    Width="800"
    Height="450"
    mc:Ignorable="d">
    <Window.DataContext>
        <local:TookitModel />
    </Window.DataContext>
    <StackPanel Margin="5">
        <Label Content="名字" />
        <TextBox x:Name="box1" Text="{Binding Name}" />
        <TextBlock x:Name="block1" Text="{Binding Name}" />
        <Button
            x:Name="show"
            Command="{Binding ClickCommand}"
            Content="点击" />
        <Separator />
        <Button Command="{Binding DownloadTextCommand}" Content="Click me!" />
        <Button Command="{Binding openCommand}">打开文件</Button>
    </StackPanel>
</Window>

```

TookitView.Xaml.cs

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace ViewModelTutor.View;

/// <summary>
/// TookitView.xaml 的交互逻辑
/// </summary>
public partial class TookitView : Window
{
    public TookitView()
    {
        InitializeComponent();
    }
}

```

## 注意事项

```csharp
  public RelayCommand IoCommand=new RelayCommand(() => { });
  public RelayCommand IoCommand=>new RelayCommand(() => { });


```

第一种是field定义:初始化RelayCommand一次,实例在对象的整个生命周期中保持不变(mvvm中无法生效)

改为下面可以生效(单例)

```csharp
private RelayCommand _ioCommand;
 public RelayCommand IoCommand => _ioCommand ??= new RelayCommand(ExecuteIoCommand);
```

第二种是只读的property定义:定义IoCommand为只读的property, RelayCommand的实例每次都会创建,不推荐使用,等同于

```csharp
public RelayCommand IoCommand
{
    get { return new RelayCommand(() => { }); }
}
```

推荐的写法

```csharp
public RelayCommand IoCommand { get; }

public ViewModel()
{
    IoCommand = new RelayCommand(() => { });
}

```
