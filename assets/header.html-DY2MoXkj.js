import{_ as t,c as e,o,d as n}from"./app-CbULZrmi.js";const a={},r=n(`<h1 id="xaml标记" tabindex="-1"><a class="header-anchor" href="#xaml标记"><span>xaml标记</span></a></h1><pre><code class="language-xml">&lt;Page
    x:Class=&quot;TutorWpf.Views.Pages.SettingsPage&quot;
    xmlns=&quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot;
    xmlns:x=&quot;http://schemas.microsoft.com/winfx/2006/xaml&quot;
    xmlns:d=&quot;http://schemas.microsoft.com/expression/blend/2008&quot;
    xmlns:helpers=&quot;clr-namespace:TutorWpf.Helpers&quot;
    xmlns:i=&quot;http://schemas.microsoft.com/xaml/behaviors&quot;
    xmlns:local=&quot;clr-namespace:TutorWpf.Views.Pages&quot;
    xmlns:mc=&quot;http://schemas.openxmlformats.org/markup-compatibility/2006&quot;
    xmlns:ui=&quot;http://schemas.lepo.co/wpfui/2022/xaml&quot;
    Title=&quot;SettingsPage&quot;
    d:DataContext=&quot;{d:DesignInstance local:SettingsPage,
                                     IsDesignTimeCreatable=False}&quot;
    d:DesignHeight=&quot;450&quot;
    d:DesignWidth=&quot;800&quot;
    ui:Design.Background=&quot;{DynamicResource ApplicationBackgroundBrush}&quot;
    ui:Design.Foreground=&quot;{DynamicResource TextFillColorPrimaryBrush}&quot;
    Foreground=&quot;{DynamicResource TextFillColorPrimaryBrush}&quot;
    mc:Ignorable=&quot;d&quot;&gt;
&lt;/Page&gt;
</code></pre><p>其中xmlns:i使用方法(需要安装<a href="https://github.com/microsoft/XamlBehaviorsWpf" target="_blank" rel="noopener noreferrer">Microsoft.Xaml.Behaviors.Wpf</a>)</p><pre><code class="language-xml">  &lt;ComboBox
      DisplayMemberPath=&quot;LangName&quot;
      ItemsSource=&quot;{Binding ViewModel.Langs}&quot;
      SelectionChanged=&quot;ComboBox_SelectionChanged&quot;&gt;

      &lt;i:Interaction.Triggers&gt;
          &lt;i:EventTrigger EventName=&quot;SelectionChanged&quot;&gt;
              &lt;i:InvokeCommandAction Command=&quot;{Binding SelectionChangedCommand}&quot; /&gt;
          &lt;/i:EventTrigger&gt;
      &lt;/i:Interaction.Triggers&gt;
  &lt;/ComboBox&gt;
</code></pre>`,4),i=[r];function s(m,c){return o(),e("div",null,i)}const u=t(a,[["render",s],["__file","header.html.vue"]]),p=JSON.parse('{"path":"/csharp-tutor/wpf/header.html","title":"xaml标记","lang":"zh-CN","frontmatter":{"description":"xaml标记 其中xmlns:i使用方法(需要安装Microsoft.Xaml.Behaviors.Wpf)","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/csharp-tutor/wpf/header.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"xaml标记"}],["meta",{"property":"og:description","content":"xaml标记 其中xmlns:i使用方法(需要安装Microsoft.Xaml.Behaviors.Wpf)"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-20T18:32:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-09-20T18:32:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"xaml标记\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-20T18:32:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1695234758000,"updatedTime":1695234758000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.38,"words":114},"filePathRelative":"csharp-tutor/wpf/header.md","localizedDate":"2023年9月20日","autoDesc":true}');export{u as comp,p as data};
