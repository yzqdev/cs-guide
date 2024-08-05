import{_ as t,c as o,o as n,d as e}from"./app-CbULZrmi.js";const r={},a=e(`<h1 id="加载进度条" tabindex="-1"><a class="header-anchor" href="#加载进度条"><span>加载进度条</span></a></h1><p>您可以通过加载进度条在android中显示任务的进度。进度条有两种形状。加载栏和加载微调器。在本章中，我们将讨论微调器。微调框用于显示总完成时间未知的那些任务的进度。为了使用它，您只需要像这样在xml中定义它。</p><pre><code class="language-xml">  &lt;ProgressBar
     android:id=&quot;@+id/progressBar1&quot;
     style=&quot;?android:attr/progressBarStyleLarge&quot;
     android:layout_width=&quot;wrap_content&quot;
     android:layout_height=&quot;wrap_content&quot;
     android:layout_centerHorizontal=&quot;true&quot; /&gt;
</code></pre><p>在xml中定义它之后，您必须通过ProgressBar类在java文件中获取它的引用。其语法如下-</p><pre><code class="language-java">  private ProgressBar spinner;
  spinner = (ProgressBar)findViewById(R.id.progressBar1);
</code></pre><p>之后，您可以使其消失，并在需要时通过setVisibility方法将其恢复。其语法如下-</p><pre><code class="language-java">  spinner.setVisibility(View.GONE);
  spinner.setVisibility(View.VISIBLE);
</code></pre><p>除了这些方法外，ProgressBar类中还定义了其他方法，可用于更有效地处理微调器。</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>isIndeterminate()</strong></td><td>指示此进度条是否处于不确定模式</td></tr><tr><td><strong>postInvalidate()</strong></td><td>在事件循环的后续周期中导致无效事件发生</td></tr><tr><td><strong>setIndeterminate(boolean indeterminate)</strong></td><td>更改此进度条的不确定模式</td></tr><tr><td><strong>invalidateDrawable(Drawable dr)</strong></td><td>使指定的Drawable无效</td></tr><tr><td><strong>incrementSecondaryProgressBy(int diff)</strong></td><td>将进度条的辅助进度增加指定的数量</td></tr><tr><td><strong>getProgressDrawable()</strong></td><td>获取用于在进度模式下绘制进度条的drawable</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>这是一个演示使用ProgressBar处理微调器的示例。它创建了一个基本应用程序，可让您在单击按钮时打开微调器。要试验此示例，可以在实际设备或仿真器中运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件添加必要代码。</li><li>修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。</li><li>需要在drawable文件夹中创建一个xml文件。它包含形状和旋转进度栏信息</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;

  import android.app.Activity;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  import android.widget.ProgressBar;

  public class MainActivity extends Activity {
      Button b1;

      private ProgressBar spinner;
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          b1=(Button)findViewById(R.id.button);
          spinner=(ProgressBar)findViewById(R.id.progressBar);
          spinner.setVisibility(View.GONE);
    
          b1.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  spinner.setVisibility(View.VISIBLE);
              }
          });
      }

  }

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot; android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;

    &lt;TextView
        android:text=&quot;加载进度条示例&quot;
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
</code></pre><p>以下是res/xml/circular_progress_bar.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;rotate
    xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:fromDegrees=&quot;90&quot;
    android:pivotX=&quot;50%&quot;
    android:pivotY=&quot;50%&quot;
    android:toDegrees=&quot;360&quot;&gt;

    &lt;shape
        android:innerRadiusRatio=&quot;3&quot;
        android:shape=&quot;ring&quot;
        android:thicknessRatio=&quot;7.0&quot;&gt;

        &lt;gradient
            android:centerColor=&quot;#007DD6&quot;
            android:endColor=&quot;#007DD6&quot;
            android:startColor=&quot;#007DD6&quot;
            android:angle=&quot;0&quot;
            android:type=&quot;sweep&quot;
            android:useLevel=&quot;false&quot; /&gt;
    &lt;/shape&gt;

&lt;/rotate&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/loadingspinner1.png" alt=""></p><p>点击下载，进度条在转动</p><p><img src="https://www.jc2182.com/images/android/loadingspinner2.png" alt=""></p>`,22),i=[a];function d(u,l){return n(),o("div",null,i)}const p=t(r,[["render",d],["__file","spinner.html.vue"]]),c=JSON.parse('{"path":"/android-tutor/advanced/spinner.html","title":"加载进度条","lang":"zh-CN","frontmatter":{"description":"加载进度条 您可以通过加载进度条在android中显示任务的进度。进度条有两种形状。加载栏和加载微调器。在本章中，我们将讨论微调器。微调框用于显示总完成时间未知的那些任务的进度。为了使用它，您只需要像这样在xml中定义它。 在xml中定义它之后，您必须通过ProgressBar类在java文件中获取它的引用。其语法如下- 之后，您可以使其消失，并在需要...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/spinner.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"加载进度条"}],["meta",{"property":"og:description","content":"加载进度条 您可以通过加载进度条在android中显示任务的进度。进度条有两种形状。加载栏和加载微调器。在本章中，我们将讨论微调器。微调框用于显示总完成时间未知的那些任务的进度。为了使用它，您只需要像这样在xml中定义它。 在xml中定义它之后，您必须通过ProgressBar类在java文件中获取它的引用。其语法如下- 之后，您可以使其消失，并在需要..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/loadingspinner1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"加载进度条\\",\\"image\\":[\\"https://www.jc2182.com/images/android/loadingspinner1.png\\",\\"https://www.jc2182.com/images/android/loadingspinner2.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.29,"words":987},"filePathRelative":"android-tutor/advanced/spinner.md","localizedDate":"2023年5月22日","autoDesc":true}');export{p as comp,c as data};
