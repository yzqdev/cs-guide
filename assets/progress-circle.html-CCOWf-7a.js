import{_ as t,c as e,o,d as n}from"./app-CbULZrmi.js";const r={},a=n(`<h1 id="进度圈" tabindex="-1"><a class="header-anchor" href="#进度圈"><span>进度圈</span></a></h1><p>进行进度圈的最简单方法是使用名为<strong>ProgressDialog</strong>的类。加载栏也可以通过该类制作。条形和圆形之间唯一的逻辑区别是，当您知道等待特定任务的总时间时使用前者，而当您不知道等待时间时使用后者。为此，您需要实例化此类的对象。它的语法是。</p><pre><code class="language-java">  ProgressDialog progress = new ProgressDialog(this);
</code></pre><p>现在，您可以设置此对话框的某些属性。例如，其样式，其文字等</p><pre><code class="language-java">  progress.setMessage(&quot;Downloading Music :) &quot;);
  progress.setProgressStyle(ProgressDialog.STYLE_SPINNER);
  progress.setIndeterminate(true);
</code></pre><p>除了这些方法外，<strong>ProgressDialog</strong>类还提供其他方法。</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>getMax()</strong></td><td>此方法返回进度的最大值</td></tr><tr><td><strong>incrementProgressBy(int diff)</strong></td><td>此方法将进度条增加作为参数传递的值的差</td></tr><tr><td><strong>setIndeterminate(boolean indeterminate)</strong></td><td>此方法将进度指示器设置为“确定”或“不确定”</td></tr><tr><td><strong>setMax(int max)</strong></td><td>此方法设置进度对话框的最大值</td></tr><tr><td><strong>setProgress(int value)</strong></td><td>此方法用于使用某些特定值更新进度对话框</td></tr><tr><td><strong>show(Context context, CharSequence title, CharSequence message)</strong></td><td>这是一种静态方法，用于显示进度对话框</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>本示例演示了进度对话框的旋转用法。按下按钮时将显示旋转进度对话框。 要尝试使用此示例，您需要在按照以下步骤开发应用程序后，在实际设备上运行此示例。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加进度代码以显示旋转进度对话框。</li><li>修改res/layout/activity_main.xml文件以添加相应的XML代码。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.app.ProgressDialog;
  import android.os.Bundle;
  import android.os.Handler;
  import android.view.View;
  import android.widget.Button;

  public class MainActivity extends Activity {

      Button b1;
      private ProgressDialog progressBar;
      private int progressBarStatus = 0;
      private Handler progressBarbHandler = new Handler();
      private long fileSize = 0;
    
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          b1=(Button)findViewById(R.id.button);
    
          b1.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  progressBar = new ProgressDialog(v.getContext());
                  progressBar.setCancelable(true);
                  progressBar.setMessage(&quot;File downloading ...&quot;);
                  progressBar.setProgressStyle(ProgressDialog.STYLE_SPINNER);
                  progressBar.setProgress(0);
                  progressBar.setMax(100);
                  progressBar.show();
                  progressBarStatus = 0;
    
                  fileSize = 0;
                  new Thread(new Runnable() {
                      public void run() {
                          while (progressBarStatus &lt; 100) {
                              progressBarStatus = downloadFile();
    
                              try {
                                  Thread.sleep(1000);
                              } catch (InterruptedException e) {
                                  e.printStackTrace();
                              }
    
                              progressBarbHandler.post(new Runnable() {
                                  public void run() {
                                      progressBar.setProgress(progressBarStatus);
                                  }
                              });
                          }
    
                          if (progressBarStatus &gt;= 100) {
                              try {
                                  Thread.sleep(2000);
                              } catch (InterruptedException e) {
                                  e.printStackTrace();
                              }
                              progressBar.dismiss();
                          }
                      }
                  }).start();
              }
          });
      }
    
      public int downloadFile() {
          while (fileSize &lt;= 1000000) {
              fileSize++;
    
              if (fileSize == 100000) {
                  return 10;
              }else if (fileSize == 200000) {
                  return 20;
              }else if (fileSize == 300000) {
                  return 30;
              }else if (fileSize == 400000) {
                  return 40;
              }else if (fileSize == 500000) {
                  return 50;
              }else if (fileSize == 700000) {
                  return 70;
              }else if (fileSize == 800000) {
                  return 80;
              }
          }
          return 100;
      }

  }

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot; android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;

    &lt;TextView android:text=&quot;进度圈示例&quot; android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/textview&quot;
        android:textSize=&quot;35dp&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:id=&quot;@+id/textView&quot;
        android:layout_below=&quot;@+id/textview&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:textColor=&quot;#ff7aff24&quot;
        android:textSize=&quot;35dp&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;111dp&quot;
        android:layout_height=&quot;79dp&quot;
        android:layout_alignParentBottom=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginBottom=&quot;112dp&quot;
        android:text=&quot;下载&quot; /&gt;

    &lt;ImageView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageView&quot;
        android:src=&quot;@drawable/logo&quot;
        android:background=&quot;#22110055&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/progresscircle1.png" alt=""></p><p>尝试点击下载如下：</p><p><img src="https://www.jc2182.com/images/android/progresscircle2.png" alt=""></p>`,18),i=[a];function d(s,l){return o(),e("div",null,i)}const c=t(r,[["render",d],["__file","progress-circle.html.vue"]]),p=JSON.parse('{"path":"/android-tutor/advanced/progress-circle.html","title":"进度圈","lang":"zh-CN","frontmatter":{"description":"进度圈 进行进度圈的最简单方法是使用名为ProgressDialog的类。加载栏也可以通过该类制作。条形和圆形之间唯一的逻辑区别是，当您知道等待特定任务的总时间时使用前者，而当您不知道等待时间时使用后者。为此，您需要实例化此类的对象。它的语法是。 现在，您可以设置此对话框的某些属性。例如，其样式，其文字等 除了这些方法外，ProgressDialog类...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/progress-circle.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"进度圈"}],["meta",{"property":"og:description","content":"进度圈 进行进度圈的最简单方法是使用名为ProgressDialog的类。加载栏也可以通过该类制作。条形和圆形之间唯一的逻辑区别是，当您知道等待特定任务的总时间时使用前者，而当您不知道等待时间时使用后者。为此，您需要实例化此类的对象。它的语法是。 现在，您可以设置此对话框的某些属性。例如，其样式，其文字等 除了这些方法外，ProgressDialog类..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/progresscircle1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"进度圈\\",\\"image\\":[\\"https://www.jc2182.com/images/android/progresscircle1.png\\",\\"https://www.jc2182.com/images/android/progresscircle2.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.04,"words":913},"filePathRelative":"android-tutor/advanced/progress-circle.md","localizedDate":"2023年5月22日","autoDesc":true}');export{c as comp,p as data};
