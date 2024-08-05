import{_ as t,c as e,o as n,d as o}from"./app-CbULZrmi.js";const a={},r=o(`<h1 id="资源的组织和访问" tabindex="-1"><a class="header-anchor" href="#资源的组织和访问"><span>资源的组织和访问</span></a></h1><p>您还可以使用许多其他项来构建良好的Android应用程序。除了为应用程序编码之外，您还需要处理各种其他资源，例如代码使用的静态内容，例如位图，颜色，布局定义，用户界面字符串，动画指令等。这些资源始终在项目的res/目录下的各个子目录中分别维护。本教程将向您说明如何组织应用程序资源，指定替代资源并在应用程序中访问它们。</p><h2 id="在android-studio中整理资源" tabindex="-1"><a class="header-anchor" href="#在android-studio中整理资源"><span>在Android Studio中整理资源</span></a></h2><pre><code class="language-t4">  MyProject/
     app/
        manifest/
           AndroidManifest.xml
     java/
        MyActivity.java  
        res/
           drawable/  
              icon.png  
           layout/  
              activity_main.xml
              info.xml
           values/  
              strings.xml 
</code></pre><table><thead><tr><th>文件夹</th><th>描述</th></tr></thead><tbody><tr><td>anim/</td><td>定义属性动画的XML文件。它们保存在res/anim/文件夹中，并可以从<strong>R.anim</strong>类访问。</td></tr><tr><td>color/</td><td>定义颜色状态列表的XML文件。它们保存在res/color/中，并可以从<strong>R.color</strong>类访问。</td></tr><tr><td>drawable/</td><td>图像文件（如.png，.jpg，.gif或XML文件）被编译为位图，状态列表，形状，可绘制动画的文件。它们保存在res/drawable/中，并可以从R.drawable类访问。</td></tr><tr><td>layout/</td><td>定义用户界面布局的XML文件。它们保存在res/layout/中，并可以从R.layout类访问。</td></tr><tr><td>menu/</td><td>定义应用程序菜单的XML文件，例如选项菜单，上下文菜单或子菜单。它们保存在res/menu/中，并可以从R.menu类访问。</td></tr><tr><td>raw/</td><td>以原始格式保存的任意文件。您需要使用资源ID（即R.raw.filename）调用Resources.openRawResource()来打开此类原始文件。</td></tr><tr><td>values/</td><td>包含简单值（例如字符串，整数和颜色）的XML文件。例如，以下是您可以在此目录中创建的资源的一些文件名约定 用于资源数组的arrays.xml，可从R.array类访问。 用于资源整数的integers.xml，可从R.integer类访问。 用于布尔值资源的bools.xml，并从R.bool类进行访问。 colors.xml获取颜色值，并从R.color类访问。 尺寸值的dimens.xml，可从R.dimen类访问。 strings.xml获取字符串值，并从R.string类进行访问。 用于样式的styles.xml，可从R.style类访问 。</td></tr><tr><td>xml/</td><td>可以在运行时通过调用Resources.getXML()读取任意XML文件。 您可以在此处保存各种配置文件，这些文件将在运行时使用。</td></tr></tbody></table><h2 id="替代资源" tabindex="-1"><a class="header-anchor" href="#替代资源"><span>替代资源</span></a></h2><p>您的应用程序应提供替代资源以支持特定的设备配置。例如，您应该包括用于不同屏幕分辨率的备用可绘制资源（即images）和用于不同语言的备用字符串资源。在运行时，Android将检测当前的设备配置并为您的应用程序加载适当的资源。要为一组资源指定特定于配置的替代方案，请遵循以下步骤：在res/中以格式<code>&lt;resources_name&gt;-&lt;config_qualifier&gt;</code>命名新目录。在这里resources_name将是上表中提到的任何资源，例如layout，drawable等。限定符将指定要使用这些资源的单个配置。您可以查看官方文档以获取针对不同类型资源的限定词的完整列表。将相应的备用资源保存在此新目录中。如以下示例所示，资源文件的名称必须与默认资源文件的名称完全相同，但是这些文件将具有特定于备用文件的内容。例如，尽管图像文件名相同，但对于高分辨率屏幕，其分辨率将很高。以下是为默认屏幕指定图像和为高分辨率屏幕指定替代图像的示例。</p><pre><code class="language-t4">  MyProject/
     app/
        manifest/
           AndroidManifest.xml
     java/
        MyActivity.java   
        res/
           drawable/  
              icon.png
              background.png
           drawable-hdpi/  
              icon.png
              background.png  
           layout/  
              activity_main.xml
              info.xml
           values/  
              strings.xml 
</code></pre><p>下面是另一个示例，该示例指定默认语言的布局和阿拉伯语的替代布局。</p><pre><code class="language-t4">  MyProject/
     app/
        manifest/
           AndroidManifest.xml
     java/
        MyActivity.java   
        res/
           drawable/  
              icon.png
              background.png
           drawable-hdpi/  
              icon.png
              background.png  
           layout/  
              activity_main.xml
              info.xml
           layout-ar/
              main.xml
           values/  
              strings.xml 
</code></pre><h2 id="访问资源" tabindex="-1"><a class="header-anchor" href="#访问资源"><span>访问资源</span></a></h2><p>在应用程序开发期间，您将需要访问代码中或布局XML文件中的已定义资源。以下部分说明了如何在两种情况下访问资源-</p><p><em>用代码访问资源</em></p><p>编译Android应用程序时，将生成R类，其中包含res/目录中所有可用资源的资源ID 。您可以使用R类通过子目录和资源名称或直接使用资源ID来访问该资源。</p><p>例如要访问res/drawable/myimage.png并设置ImageView，您将使用以下代码-</p><pre><code class="language-java">  ImageView imageView = (ImageView) findViewById(R.id.myimageview);
  imageView.setImageResource(R.drawable.myimage);
</code></pre><p>在这里，代码的第一行使用<strong>R.id.myimageview</strong>来获取在布局文件中以id myimageview定义的ImageView 。第二行代码使用<strong>R.drawable.myimage</strong>获取名称为myimage的图像，该图像位于/res下的drawable子目录中。</p><p>考虑下一个示例，其中res/values/strings.xml具有以下定义-</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;resources&gt;
     &lt;string  name=&quot;hello&quot;&gt;Hello, World!&lt;/string&gt;
  &lt;/resources&gt;
</code></pre><p>现在您可以使用资源ID在ID为msg的TextView对象上设置文本，如下所示-</p><pre><code class="language-java">  TextView msgTextView = (TextView) findViewById(R.id.msg);
  msgTextView.setText(R.string.hello);
</code></pre><p>考虑具有以下定义的布局res/layout/activity_main.xml-</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
     android:layout_width=&quot;fill_parent&quot;    
     android:layout_height=&quot;fill_parent&quot;    
     android:orientation=&quot;vertical&quot; &gt;
  
     &lt;TextView android:id=&quot;@+id/text&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;Hello, I am a TextView&quot; /&gt;
  
     &lt;Button android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;Hello, I am a Button&quot; /&gt;
  
  &lt;/LinearLayout&gt;
</code></pre><p>此应用程序代码将在onCreate()方法中为Activity加载此布局，如下所示：</p><pre><code class="language-java">  public void onCreate(Bundle savedInstanceState) {
     super.onCreate(savedInstanceState);
     setContentView(R.layout.activity_main);
  }
</code></pre><p><em>访问XML资源</em></p><p>考虑以下资源XML res/values/strings.xml文件，其中包括颜色资源和字符串资源-</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;resources&gt;
     &lt;color name=&quot;opaque_red&quot;&gt;#f00&lt;/color&gt;
     &lt;string name=&quot;hello&quot;&gt;Hello!&lt;/string&gt;
  &lt;/resources&gt;
</code></pre><p>现在，您可以在以下布局文件中使用这些资源来设置文本颜色和文本字符串，如下所示：</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;EditText xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
     android:layout_width=&quot;fill_parent&quot;
     android:layout_height=&quot;fill_parent&quot;
     android:textColor=&quot;@color/opaque_red&quot;
     android:text=&quot;@string/hello&quot; /&gt;
</code></pre><p>现在，如果您再次浏览上一章，我将向您解释Hello World！例如，我相信您将对本章介绍的所有概念有更好的理解。因此，我强烈建议您查看上一章中的工作示例，并从基本的角度检查我如何使用各种资源。</p>`,31),d=[r];function i(l,s){return n(),e("div",null,d)}const c=t(a,[["render",i],["__file","resources.html.vue"]]),p=JSON.parse('{"path":"/android-tutor/basic/resources.html","title":"资源的组织和访问","lang":"zh-CN","frontmatter":{"description":"资源的组织和访问 您还可以使用许多其他项来构建良好的Android应用程序。除了为应用程序编码之外，您还需要处理各种其他资源，例如代码使用的静态内容，例如位图，颜色，布局定义，用户界面字符串，动画指令等。这些资源始终在项目的res/目录下的各个子目录中分别维护。本教程将向您说明如何组织应用程序资源，指定替代资源并在应用程序中访问它们。 在Android...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/basic/resources.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"资源的组织和访问"}],["meta",{"property":"og:description","content":"资源的组织和访问 您还可以使用许多其他项来构建良好的Android应用程序。除了为应用程序编码之外，您还需要处理各种其他资源，例如代码使用的静态内容，例如位图，颜色，布局定义，用户界面字符串，动画指令等。这些资源始终在项目的res/目录下的各个子目录中分别维护。本教程将向您说明如何组织应用程序资源，指定替代资源并在应用程序中访问它们。 在Android..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"资源的组织和访问\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"在Android Studio中整理资源","slug":"在android-studio中整理资源","link":"#在android-studio中整理资源","children":[]},{"level":2,"title":"替代资源","slug":"替代资源","link":"#替代资源","children":[]},{"level":2,"title":"访问资源","slug":"访问资源","link":"#访问资源","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":5.12,"words":1536},"filePathRelative":"android-tutor/basic/resources.md","localizedDate":"2023年5月22日","autoDesc":true}');export{c as comp,p as data};
