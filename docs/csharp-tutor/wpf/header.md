# xaml标记

```xml
<Page
    x:Class="TutorWpf.Views.Pages.SettingsPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:helpers="clr-namespace:TutorWpf.Helpers"
    xmlns:i="http://schemas.microsoft.com/xaml/behaviors"
    xmlns:local="clr-namespace:TutorWpf.Views.Pages"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:ui="http://schemas.lepo.co/wpfui/2022/xaml"
    Title="SettingsPage"
    d:DataContext="{d:DesignInstance local:SettingsPage,
                                     IsDesignTimeCreatable=False}"
    d:DesignHeight="450"
    d:DesignWidth="800"
    ui:Design.Background="{DynamicResource ApplicationBackgroundBrush}"
    ui:Design.Foreground="{DynamicResource TextFillColorPrimaryBrush}"
    Foreground="{DynamicResource TextFillColorPrimaryBrush}"
    mc:Ignorable="d">
</Page>
```

其中xmlns:i使用方法(需要安装[Microsoft.Xaml.Behaviors.Wpf](https://github.com/microsoft/XamlBehaviorsWpf))

```xml
  <ComboBox
      DisplayMemberPath="LangName"
      ItemsSource="{Binding ViewModel.Langs}"
      SelectionChanged="ComboBox_SelectionChanged">

      <i:Interaction.Triggers>
          <i:EventTrigger EventName="SelectionChanged">
              <i:InvokeCommandAction Command="{Binding SelectionChangedCommand}" />
          </i:EventTrigger>
      </i:Interaction.Triggers>
  </ComboBox>
```