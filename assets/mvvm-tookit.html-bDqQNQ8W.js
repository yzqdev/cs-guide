import{_ as t,c as o,o as e,d as n}from"./app-CbULZrmi.js";const a={},i=n(`<h1 id="mvvm绑定工具" tabindex="-1"><a class="header-anchor" href="#mvvm绑定工具"><span>mvvm绑定工具</span></a></h1><h2 id="例子" tabindex="-1"><a class="header-anchor" href="#例子"><span>例子</span></a></h2><p>TookitModel.cs</p><pre><code class="language-csharp">using CommunityToolkit.Mvvm.ComponentModel;
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

    private async Task&lt;string&gt; DownloadTextAsync()
    {
        await Task.Delay(1000); // Simulate a web request
        Name = &quot;1秒后&quot;;
        return &quot;Hello world!&quot;;
    }

    /// &lt;summary&gt;
    /// 1.使用relaycommand
    /// &lt;/summary&gt;
    public RelayCommand ClickCommand { get; }

    private string _name;
    public string Name
    {
        get { return _name; }
        set { SetProperty(ref _name, value); }
    }

    public TookitModel()
    {
        Name = &quot;初始名字&quot;;
        ClickCommand = new RelayCommand(Show);

        DownloadTextCommand = new AsyncRelayCommand(DownloadTextAsync);
    }

    public void Show()
    {
        Name = &quot;bbbbbbbbb&quot;;
        MessageBox.Show(Name);
    }

    /// &lt;summary&gt;
    ///2. 也可以使用attribute
    /// &lt;/summary&gt;
    [RelayCommand]
    public void open()
    {
        var dialog = new VistaFolderBrowserDialog
        {
            Description = &quot;Please select a folder.&quot;,
            UseDescriptionForTitle = true // This applies to the Vista style dialog only, not the old dialog.
        };

        if (!VistaFolderBrowserDialog.IsVistaFolderDialogSupported)
        {
            MessageBox.Show(
                &quot;Because you are not using Windows Vista or later, the regular folder browser dialog will be used. Please use Windows Vista to see the new dialog.&quot;,
                &quot;Sample folder browser dialog&quot;
            );
        }

        if ((bool)dialog.ShowDialog())
        {
            Name = dialog.SelectedPath;
            string a = &quot;aaa&quot;;
            MessageBox.Show(
                $&quot;The selected folder was:{Environment.NewLine}{Name}&quot;,
                &quot;Sample folder browser dialog&quot;
            );
        }
    }
}

</code></pre><p>TookitView.xaml</p><pre><code class="language-xml">&lt;Window
    x:Class=&quot;ViewModelTutor.View.TookitView&quot;
    xmlns=&quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot;
    xmlns:x=&quot;http://schemas.microsoft.com/winfx/2006/xaml&quot;
    xmlns:d=&quot;http://schemas.microsoft.com/expression/blend/2008&quot;
    xmlns:local=&quot;clr-namespace:ViewModelTutor.Model&quot;
    xmlns:mc=&quot;http://schemas.openxmlformats.org/markup-compatibility/2006&quot;
    Title=&quot;TookitView&quot;
    Width=&quot;800&quot;
    Height=&quot;450&quot;
    mc:Ignorable=&quot;d&quot;&gt;
    &lt;Window.DataContext&gt;
        &lt;local:TookitModel /&gt;
    &lt;/Window.DataContext&gt;
    &lt;StackPanel Margin=&quot;5&quot;&gt;
        &lt;Label Content=&quot;名字&quot; /&gt;
        &lt;TextBox x:Name=&quot;box1&quot; Text=&quot;{Binding Name}&quot; /&gt;
        &lt;TextBlock x:Name=&quot;block1&quot; Text=&quot;{Binding Name}&quot; /&gt;
        &lt;Button
            x:Name=&quot;show&quot;
            Command=&quot;{Binding ClickCommand}&quot;
            Content=&quot;点击&quot; /&gt;
        &lt;Separator /&gt;
        &lt;Button Command=&quot;{Binding DownloadTextCommand}&quot; Content=&quot;Click me!&quot; /&gt;
        &lt;Button Command=&quot;{Binding openCommand}&quot;&gt;打开文件&lt;/Button&gt;
    &lt;/StackPanel&gt;
&lt;/Window&gt;

</code></pre><p>TookitView.Xaml.cs</p><pre><code class="language-csharp">using System;
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

/// &lt;summary&gt;
/// TookitView.xaml 的交互逻辑
/// &lt;/summary&gt;
public partial class TookitView : Window
{
    public TookitView()
    {
        InitializeComponent();
    }
}

</code></pre>`,8),s=[i];function l(m,u){return e(),o("div",null,s)}const d=t(a,[["render",l],["__file","mvvm-tookit.html.vue"]]),c=JSON.parse('{"path":"/csharp-tutor/wpf/mvvm-tookit.html","title":"mvvm绑定工具","lang":"zh-CN","frontmatter":{"description":"mvvm绑定工具 例子 TookitModel.cs TookitView.xaml TookitView.Xaml.cs","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/csharp-tutor/wpf/mvvm-tookit.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"mvvm绑定工具"}],["meta",{"property":"og:description","content":"mvvm绑定工具 例子 TookitModel.cs TookitView.xaml TookitView.Xaml.cs"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-20T18:32:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-09-20T18:32:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"mvvm绑定工具\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-20T18:32:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"例子","slug":"例子","link":"#例子","children":[]}],"git":{"createdTime":1687669238000,"updatedTime":1695234758000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":2}]},"readingTime":{"minutes":1.15,"words":346},"filePathRelative":"csharp-tutor/wpf/mvvm-tookit.md","localizedDate":"2023年6月25日","autoDesc":true}');export{d as comp,c as data};
