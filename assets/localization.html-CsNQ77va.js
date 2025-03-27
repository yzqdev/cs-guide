import{_ as a,c as s,a as t,o as e}from"./app-C8DxhDIZ.js";const l={};function p(o,n){return e(),s("div",null,n[0]||(n[0]=[t(`<h1 id="本地化" tabindex="-1"><a class="header-anchor" href="#本地化"><span>本地化</span></a></h1><p>android应用程序可以在许多不同地区的许多设备上运行。为了使您的应用程序更具交互性，您的应用程序应该以适合于将使用您的应用程序的语言环境的方式来处理文本，数字，文件等。将字符串更改为不同语言的方式称为本地化在本章中，我们将说明，如何根据不同的区域来本地化应用程序等。我们将本地化应用程序中使用的字符串，并以相同的方式本地化其他内容。</p><h2 id="本地化字符串" tabindex="-1"><a class="header-anchor" href="#本地化字符串"><span>本地化字符串</span></a></h2><p>为了对应用程序中使用的字符串进行本地化，请在re下创建一个新文件夹，名称为values-local，其中local将替换为该区域。例如，在意大利，values-it文件夹将在res下创建。</p><p>创建完该文件夹后，将strings.xml从默认文件夹到您创建的文件夹中。并更改其内容。例如，我更改了hello_world字符串的值。</p><p><em>意大利，res/values-it/strings.xml</em></p><div class="language-xml" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resources</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>hello_world<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Ciao mondo!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resources</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre></div><p><em>西班牙，res/values-es/strings.xml</em></p><div class="language-xml" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resources</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>hello_world<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Hola Mundo!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resources</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre></div><p><em>法语，res/values-fr/strings.xml</em></p><div class="language-xml" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resources</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>hello_world<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Bonjour le monde !<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resources</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre></div><p>除了这些语言，下表还提供了其他语言的区域代码-</p><table><thead><tr><th>语言</th><th>说明</th></tr></thead><tbody><tr><td><strong>非洲语</strong></td><td>代码：af 文件夹名称：values-af</td></tr><tr><td><strong>阿拉伯语</strong></td><td>代码：ar。文件夹名称：values-ar</td></tr><tr><td><strong>孟加拉语</strong></td><td>代号：bn。文件夹名称：values-bn</td></tr><tr><td><strong>捷克语</strong></td><td>代码：cs 文件夹名称：values-cs</td></tr><tr><td><strong>中文</strong></td><td>代码：zh。文件夹名称：values-zh</td></tr><tr><td><strong>德语</strong></td><td>代号：de。文件夹名称：values-de</td></tr><tr><td><strong>法文</strong></td><td>代码：fr。文件夹名称：values-fr</td></tr><tr><td><strong>日本</strong></td><td>代码：ja。文件夹名称：values-ja</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>要试验此示例，可以在实际设备或仿真器中运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改res/layout/activity_main以添加相应的XML组件</li><li>修改res/values/string.xml以添加必要的字符串组件</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><div class="language-java" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">  <span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>jc2182<span class="token punctuation">.</span>demo</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>app<span class="token punctuation">.</span></span><span class="token class-name">Activity</span></span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">import</span> <span class="token import"><span class="token namespace">android<span class="token punctuation">.</span>os<span class="token punctuation">.</span></span><span class="token class-name">Bundle</span></span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre></div><p>public class MainActivity extends Activity {</p><pre><code>  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);
  }
</code></pre><p>}</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line"></span>
<span class="line"></span>
<span class="line">以下是res/layout/activity_main.xml文件的内容-</span>
<span class="line"></span>
<span class="line">\`\`\`xml</span>
<span class="line"></span>
<span class="line">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;</span>
<span class="line">&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;</span>
<span class="line">    xmlns:tools=&quot;http://schemas.android.com/tools&quot; android:layout_width=&quot;match_parent&quot;</span>
<span class="line">    android:layout_height=&quot;match_parent&quot;</span>
<span class="line">    tools:context=&quot;.MainActivity&quot;&gt;</span>
<span class="line"></span>
<span class="line">    &lt;TextView</span>
<span class="line">        android:text=&quot;本地化示例&quot;</span>
<span class="line">        android:layout_width=&quot;wrap_content&quot;</span>
<span class="line">        android:layout_height=&quot;wrap_content&quot;</span>
<span class="line">        android:id=&quot;@+id/textview&quot;</span>
<span class="line">        android:textSize=&quot;35dp&quot;</span>
<span class="line">        android:layout_alignParentTop=&quot;true&quot;</span>
<span class="line">        android:layout_centerHorizontal=&quot;true&quot; /&gt;</span>
<span class="line"></span>
<span class="line">    &lt;TextView</span>
<span class="line">        android:id=&quot;@+id/textView&quot;</span>
<span class="line">        android:layout_width=&quot;198dp&quot;</span>
<span class="line">        android:layout_height=&quot;wrap_content&quot;</span>
<span class="line">        android:layout_below=&quot;@+id/textview&quot;</span>
<span class="line">        android:layout_centerHorizontal=&quot;true&quot;</span>
<span class="line">        android:text=&quot;蝴蝶教程&quot;</span>
<span class="line">        android:textColor=&quot;#ff7aff24&quot;</span>
<span class="line">        android:textSize=&quot;35dp&quot; /&gt;</span>
<span class="line"></span>
<span class="line">    &lt;Button</span>
<span class="line">        android:id=&quot;@+id/button&quot;</span>
<span class="line">        android:layout_width=&quot;94dp&quot;</span>
<span class="line">        android:layout_height=&quot;wrap_content&quot;</span>
<span class="line">        android:layout_below=&quot;@+id/imageView&quot;</span>
<span class="line">        android:layout_centerHorizontal=&quot;true&quot;</span>
<span class="line">        android:text=&quot;下载&quot; /&gt;</span>
<span class="line"></span>
<span class="line">    &lt;ImageView</span>
<span class="line">        android:layout_width=&quot;wrap_content&quot;</span>
<span class="line">        android:layout_height=&quot;wrap_content&quot;</span>
<span class="line">        android:id=&quot;@+id/imageView&quot;</span>
<span class="line">        android:src=&quot;@drawable/logo&quot;</span>
<span class="line">        android:background=&quot;#11EE22bb&quot;</span>
<span class="line">        android:layout_below=&quot;@+id/textView&quot;</span>
<span class="line">        android:layout_centerHorizontal=&quot;true&quot; /&gt;</span>
<span class="line"></span>
<span class="line">    &lt;ProgressBar</span>
<span class="line">        android:id=&quot;@+id/progressBar&quot;</span>
<span class="line">        style=&quot;?android:attr/progressBarStyleLarge&quot;</span>
<span class="line">        android:layout_width=&quot;272dp&quot;</span>
<span class="line">        android:layout_height=&quot;362dp&quot;</span>
<span class="line">        android:layout_below=&quot;@+id/button&quot;</span>
<span class="line">        android:layout_alignStart=&quot;@+id/textview&quot;</span>
<span class="line">        android:layout_alignLeft=&quot;@+id/textview&quot;</span>
<span class="line">        android:layout_alignEnd=&quot;@+id/textView&quot;</span>
<span class="line">        android:layout_alignRight=&quot;@+id/textView&quot;</span>
<span class="line">        android:layout_alignParentBottom=&quot;true&quot;</span>
<span class="line">        android:layout_marginEnd=&quot;-30dp&quot;</span>
<span class="line">        android:layout_marginRight=&quot;-30dp&quot;</span>
<span class="line">        android:layout_marginBottom=&quot;7dp&quot;</span>
<span class="line">        android:progressDrawable=&quot;@drawable/circular_progress_bar&quot; /&gt;</span>
<span class="line"></span>
<span class="line">&lt;/RelativeLayout&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是res/values/strings.xml文件的内容-</p><div class="language-xml" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>resources</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app_name<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Demo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>hello_world<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Hello world!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>hindi<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>तितली ट्यूटोरियल<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>marathi<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>बटरफ्लाय ट्यूटोरियल<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>arabic<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>البرنامج التعليمي الفراشة<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>string</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>english<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Butterfly tutorial<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>string</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>resources</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre></div><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/localtion1.png" alt=""></p>`,26)]))}const c=a(l,[["render",p]]),u=JSON.parse('{"path":"/android-tutor/advanced/localization.html","title":"本地化","lang":"zh-CN","frontmatter":{"description":"本地化 android应用程序可以在许多不同地区的许多设备上运行。为了使您的应用程序更具交互性，您的应用程序应该以适合于将使用您的应用程序的语言环境的方式来处理文本，数字，文件等。将字符串更改为不同语言的方式称为本地化在本章中，我们将说明，如何根据不同的区域来本地化应用程序等。我们将本地化应用程序中使用的字符串，并以相同的方式本地化其他内容。 本地化字...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/localization.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"本地化"}],["meta",{"property":"og:description","content":"本地化 android应用程序可以在许多不同地区的许多设备上运行。为了使您的应用程序更具交互性，您的应用程序应该以适合于将使用您的应用程序的语言环境的方式来处理文本，数字，文件等。将字符串更改为不同语言的方式称为本地化在本章中，我们将说明，如何根据不同的区域来本地化应用程序等。我们将本地化应用程序中使用的字符串，并以相同的方式本地化其他内容。 本地化字..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/localtion1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"本地化\\",\\"image\\":[\\"https://www.jc2182.com/images/android/localtion1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"本地化字符串","slug":"本地化字符串","link":"#本地化字符串","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","username":"yzqdev","email":"yzqdev@outlook.com","commits":2,"url":"https://github.com/yzqdev"}]},"readingTime":{"minutes":3.21,"words":962},"filePathRelative":"android-tutor/advanced/localization.md","localizedDate":"2023年5月22日","autoDesc":true}');export{c as comp,u as data};
