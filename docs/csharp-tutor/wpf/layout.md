# 布局

## stackpanel

StackPanel就是将子元素按照堆栈的形式一一排列，可以通过设置StackPanel的Orientation属性设置两种排列方式：横排（Horizontal，该值为默认值）和竖排（Vertical）。纵向的StackPanel每个元素默认宽度与面板一样宽，反之横向是高度和面板一样高。如果包含的元素超过了面板控件，它会被截断多出的内容。可以通过Orientation属性来设置StackPanel是横排（设置其值为Vertical）还是竖排（设置其值为Horizontal）。下面XAML代码演示了StackPanel的使用：

```xml
<Window x:Class="WPFLayoutDemo.StackPanelDemo"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="StackPanel" Height="300" Width="200">
    <StackPanel Margin="10,10,10,10" Background="Azure">
        <Label>A Button Stack</Label>
        <Button Content="Button 1"></Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button Content="Button 4"></Button>
    </StackPanel>
</Window>
```

## wrappanel

　WrapPanel面板在可能的空间中，一次以一行或一列的方式布置控件。默认情况下，WrapPanel.Orientation属性设置为Horizontal，控件从左向右进行排列，然后再在下一行中排列，但你可将WrapPanel.Orientation设置为Vertical，从而在多个列中放置元素。与StackPanel面板不同，WrapPanel面板实际上用来控制用户界面中一小部分的布局细节，并非用于控制整个窗口布局。

```xml
<Window x:Class="WPFLayoutDemo.WrapPanelDemo"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="WrapPanelDemo" Height="300" Width="500">
    <WrapPanel Margin="10" Background="Azure">
        <Button VerticalAlignment="Top" Margin="5">Top Button</Button>
        <Button MinHeight="50"> Tall Button 2</Button>
        <Button VerticalAlignment="Bottom">Bottom Button</Button>
        <Button>Stretch Button</Button>
        <Button VerticalAlignment="Center">Center Button</Button>
        <Button>Next Button</Button>
    </WrapPanel>
</Window>
```

## dockpanel

　DockPanel面板定义一个区域，在此区域中，你可以使子元素通过锚点的形式进行排列。DockPanel类似于WinForm中Dock属性的功能。对于在DockPanel中的元素的停靠可以通过Panel.Dock的附加属性来设置，如果设置LastChildFill属性为true，则最后一个元素将填充剩余的所有空间。

```xml
<Window x:Class="WPFLayoutDemo.DockPanelDemo"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="DockPanelDemo" Height="300" Width="300">
    <DockPanel Margin="10" Background="Azure" LastChildFill="True">
        <Button DockPanel.Dock="Top" Background="Red">Top Button</Button>
        <Button DockPanel.Dock="Left" Background="Gray">Left Button</Button>
        <Button DockPanel.Dock="Right" Background="Green">Right Button</Button>
        <Button DockPanel.Dock="Bottom"  Background="White">Bottom Button</Button>
        <Button>Remaining Button</Button>
    </DockPanel>
</Window>
```

## grid布局

Grid比起其他Panel，功能是最多最为复杂的布局控件。它由`<Grid.ColumnDefinitions>`列元素集合和`<Grid.RowDefinitions>`行元素集合两种元素组成。而放在Grid面板中的元素必须显式采用附加属性定义其所在行和列，否则元素均默认放置在第0行第0列。

```xml
<Window x:Class="WPFLayoutDemo.GridDemo"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="GridDemo" Height="300" Width="480">
    <Grid Width="Auto" Height="Auto">
        <Grid.RowDefinitions>
            <RowDefinition Height="*"/>
            <RowDefinition Height="Auto"/>
        </Grid.RowDefinitions>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="120"/>
            <ColumnDefinition Width="150"/>
            <ColumnDefinition Width="*"/>
            <ColumnDefinition Width="2*"/>
        </Grid.ColumnDefinitions>
        <Rectangle Grid.Row="0" Grid.Column="0" Fill="Green" Margin="10,10,10,20"/>
        <Rectangle Grid.Row="0" Grid.Column="1" Grid.ColumnSpan="2" Fill="Blue" Margin="10,10,10,20"/>
        <Rectangle Grid.Row="0" Grid.Column="4" Fill="Orange"/>
        <Button Grid.Row="1" Grid.Column="0">Button 2</Button>
        <Rectangle Grid.Row="1" Grid.Column="1" Grid.ColumnSpan="3" Fill="Red"/>
    </Grid>
</Window>
```

## uniformgrid

　UniformGrid是Grid简化版本，不像Grid面板，UniformGrid不需要预先定义行集合和列集合，反而，通过简单设置Rows和Columns属性来设置尺寸。每个单元格始终具有相同的大小。UniformGrid每个单元格只能容纳一个元素，将自动按照在其内部的元素个数，自动创建行和列，并通过保存相同的行列数。

```xml
<Window x:Class="WPFLayoutDemo.UniformGridDemo"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="UniformGridDemo" Height="300" Width="300">
    <UniformGrid>
        <Ellipse Margin="10" Fill="Gray"/>
        <Ellipse Margin="10" Fill="Gray"/>
        <Ellipse Margin="10" Fill="Green"/>
        <Ellipse Margin="10" Fill="Green"/>
        <Ellipse Margin="10" Fill="Red"/>
    </UniformGrid>
</Window>

```
