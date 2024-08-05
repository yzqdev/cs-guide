import{_ as t,c as o,o as e,d as n}from"./app-CbULZrmi.js";const a={},r=n(`<h1 id="本地化" tabindex="-1"><a class="header-anchor" href="#本地化"><span>本地化</span></a></h1><p>android应用程序可以在许多不同地区的许多设备上运行。为了使您的应用程序更具交互性，您的应用程序应该以适合于将使用您的应用程序的语言环境的方式来处理文本，数字，文件等。将字符串更改为不同语言的方式称为本地化在本章中，我们将说明，如何根据不同的区域来本地化应用程序等。我们将本地化应用程序中使用的字符串，并以相同的方式本地化其他内容。</p><h2 id="本地化字符串" tabindex="-1"><a class="header-anchor" href="#本地化字符串"><span>本地化字符串</span></a></h2><p>为了对应用程序中使用的字符串进行本地化，请在re下创建一个新文件夹，名称为values-local，其中local将替换为该区域。例如，在意大利，values-it文件夹将在res下创建。</p><p>创建完该文件夹后，将strings.xml从默认文件夹到您创建的文件夹中。并更改其内容。例如，我更改了hello_world字符串的值。</p><p><em>意大利，res/values-it/strings.xml</em></p><pre><code class="language-xml">  &lt;resources&gt;
     &lt;string name=&quot;hello_world&quot;&gt;Ciao mondo!&lt;/string&gt;
  &lt;/resources&gt;
</code></pre><p><em>西班牙，res/values-es/strings.xml</em></p><pre><code class="language-xml">  &lt;resources&gt;
     &lt;string name=&quot;hello_world&quot;&gt;Hola Mundo!&lt;/string&gt;
  &lt;/resources&gt;
</code></pre><p><em>法语，res/values-fr/strings.xml</em></p><pre><code class="language-xml">  &lt;resources&gt;
     &lt;string name=&quot;hello_world&quot;&gt;Bonjour le monde !&lt;/string&gt;
  &lt;/resources&gt;
</code></pre><p>除了这些语言，下表还提供了其他语言的区域代码-</p><table><thead><tr><th>语言</th><th>说明</th></tr></thead><tbody><tr><td><strong>非洲语</strong></td><td>代码：af 文件夹名称：values-af</td></tr><tr><td><strong>阿拉伯语</strong></td><td>代码：ar。文件夹名称：values-ar</td></tr><tr><td><strong>孟加拉语</strong></td><td>代号：bn。文件夹名称：values-bn</td></tr><tr><td><strong>捷克语</strong></td><td>代码：cs 文件夹名称：values-cs</td></tr><tr><td><strong>中文</strong></td><td>代码：zh。文件夹名称：values-zh</td></tr><tr><td><strong>德语</strong></td><td>代号：de。文件夹名称：values-de</td></tr><tr><td><strong>法文</strong></td><td>代码：fr。文件夹名称：values-fr</td></tr><tr><td><strong>日本</strong></td><td>代码：ja。文件夹名称：values-ja</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>要试验此示例，可以在实际设备或仿真器中运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改res/layout/activity_main以添加相应的XML组件</li><li>修改res/values/string.xml以添加必要的字符串组件</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.os.Bundle;
</code></pre><p>public class MainActivity extends Activity {</p><pre><code>  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);
  }
</code></pre><p>}</p><pre><code>

以下是res/layout/activity_main.xml文件的内容-

\`\`\`xml

&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot; android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;

    &lt;TextView
        android:text=&quot;本地化示例&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/textview&quot;
        android:textSize=&quot;35dp&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView&quot;
        android:layout_width=&quot;198dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/textview&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:textColor=&quot;#ff7aff24&quot;
        android:textSize=&quot;35dp&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;94dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/imageView&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:text=&quot;下载&quot; /&gt;

    &lt;ImageView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageView&quot;
        android:src=&quot;@drawable/logo&quot;
        android:background=&quot;#11EE22bb&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;ProgressBar
        android:id=&quot;@+id/progressBar&quot;
        style=&quot;?android:attr/progressBarStyleLarge&quot;
        android:layout_width=&quot;272dp&quot;
        android:layout_height=&quot;362dp&quot;
        android:layout_below=&quot;@+id/button&quot;
        android:layout_alignStart=&quot;@+id/textview&quot;
        android:layout_alignLeft=&quot;@+id/textview&quot;
        android:layout_alignEnd=&quot;@+id/textView&quot;
        android:layout_alignRight=&quot;@+id/textView&quot;
        android:layout_alignParentBottom=&quot;true&quot;
        android:layout_marginEnd=&quot;-30dp&quot;
        android:layout_marginRight=&quot;-30dp&quot;
        android:layout_marginBottom=&quot;7dp&quot;
        android:progressDrawable=&quot;@drawable/circular_progress_bar&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>以下是res/values/strings.xml文件的内容-</p><pre><code class="language-xml">&lt;resources&gt;
    &lt;string name=&quot;app_name&quot;&gt;Demo&lt;/string&gt;
    &lt;string name=&quot;hello_world&quot;&gt;Hello world!&lt;/string&gt;
    &lt;string name=&quot;hindi&quot;&gt;तितली ट्यूटोरियल&lt;/string&gt;
    &lt;string name=&quot;marathi&quot;&gt;बटरफ्लाय ट्यूटोरियल&lt;/string&gt;
    &lt;string name=&quot;arabic&quot;&gt;البرنامج التعليمي الفراشة&lt;/string&gt;
    &lt;string name=&quot;english&quot;&gt;Butterfly tutorial&lt;/string&gt;
&lt;/resources&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/localtion1.png" alt=""></p>`,26),d=[r];function i(l,u){return e(),o("div",null,d)}const c=t(a,[["render",i],["__file","localization.html.vue"]]),g=JSON.parse('{"path":"/android-tutor/advanced/localization.html","title":"本地化","lang":"zh-CN","frontmatter":{"description":"本地化 android应用程序可以在许多不同地区的许多设备上运行。为了使您的应用程序更具交互性，您的应用程序应该以适合于将使用您的应用程序的语言环境的方式来处理文本，数字，文件等。将字符串更改为不同语言的方式称为本地化在本章中，我们将说明，如何根据不同的区域来本地化应用程序等。我们将本地化应用程序中使用的字符串，并以相同的方式本地化其他内容。 本地化字...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/localization.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"本地化"}],["meta",{"property":"og:description","content":"本地化 android应用程序可以在许多不同地区的许多设备上运行。为了使您的应用程序更具交互性，您的应用程序应该以适合于将使用您的应用程序的语言环境的方式来处理文本，数字，文件等。将字符串更改为不同语言的方式称为本地化在本章中，我们将说明，如何根据不同的区域来本地化应用程序等。我们将本地化应用程序中使用的字符串，并以相同的方式本地化其他内容。 本地化字..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/localtion1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"本地化\\",\\"image\\":[\\"https://www.jc2182.com/images/android/localtion1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"本地化字符串","slug":"本地化字符串","link":"#本地化字符串","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.21,"words":962},"filePathRelative":"android-tutor/advanced/localization.md","localizedDate":"2023年5月22日","autoDesc":true}');export{c as comp,g as data};
