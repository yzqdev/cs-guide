import{_ as t,c as o,o as n,d as i}from"./app-CbULZrmi.js";const e={},a=i(`<h1 id="通知" tabindex="-1"><a class="header-anchor" href="#通知"><span>通知</span></a></h1><p>一个通知是可以显示到你的应用程序的正常UI的用户之外的消息。当您告诉系统发出通知时，它首先在通知区域中显示为图标。要查看通知的详细信息，用户可以打开通知抽屉。通知区域和通知抽屉都是用户可以随时查看的系统控制区域。</p><p>Android <strong>Toast</strong>类提供了一种方便的方式来向用户显示警报，但问题是这些警报不是持久性的，这意味着警报在屏幕上闪烁几秒钟然后消失。</p><p>要查看通知的详细信息，您将必须选择图标，该图标将显示包含有关通知的详细信息的通知面板。在虚拟设备上使用模拟器时，您必须单击屏幕顶部并向下拖动状态栏以展开它，这将为您提供以下详细信息。这将只有64 dp高，称为正常视图。</p><h2 id="创建和发送通知" tabindex="-1"><a class="header-anchor" href="#创建和发送通知"><span>创建和发送通知</span></a></h2><p>您可以通过简单的方法来创建通知。在您的应用程序中按照以下步骤创建通知</p><p><em>第1步-创建通知生成器</em></p><p>第一步是使用 <strong>Notification.Builder()<strong>创建一个通知生成器。您将使用</strong>Notification Builder</strong>设置各种<strong>Notification</strong>属性，例如其大小图标，标题，优先级等。</p><pre><code class="language-java">   Notification.Builder builder = new Notification.Builder(this);
</code></pre><p><em>第2步-设置通知属性</em></p><p>拥有<strong>Builder</strong>对象后，可以根据需要使用<strong>Builder</strong>对象设置其<strong>Notification</strong>属性。但这是强制性的，至少应设置-</p><ul><li>一个小图标，由**setSmallIcon()**设置</li><li>标题，由**setContentTitle()**设置</li><li>详细信息文本，由**setContentText()**设置</li><li>.............</li></ul><pre><code class="language-java">  builder.setContentInfo(&quot;内容信息&quot;)
                  .setContentText(&quot;通知内容&quot;)//设置通知内容
                  .setContentTitle(&quot;通知标题&quot;)//设置通知标题
                  .setLargeIcon(BitmapFactory.decodeResource(getResources(),R.mipmap.ic_launcher))
                  .setSmallIcon(R.mipmap.ic_launcher_round)//不能缺少的一个属性
                  .setSubText(&quot;Subtext&quot;)
                  .setTicker(&quot;滚动消息......&quot;)
                  .setWhen(System.currentTimeMillis());//设置通知时间，默认为系统发出通知的时间，通常不用设置
</code></pre><p>您有很多可选属性，可以为通知设置。要了解有关它们的更多信息，请参阅<strong>Notification.Builder</strong>的参考文档。</p><p><em>步骤3-发出通知</em></p><p>最后，通过调用<strong>NotificationManager.notify()<strong>发送通知，将</strong>Notification</strong>对象传递给系统。通知它之前，请确保对构建器对象调用<strong>NotificationCompat.Builder.build()<strong>方法。此方法合并所有已设置的选项，并返回一个新的</strong>Notification</strong>对象。</p><pre><code class="language-java">  Notification n = builder.build();
          //3、manager.notify()
  manager.notify(NOTIFICATION_ID,n);
</code></pre><h2 id="notificationcompat-builder类" tabindex="-1"><a class="header-anchor" href="#notificationcompat-builder类"><span>NotificationCompat.Builder类</span></a></h2><p><strong>NotificationCompat.Builder</strong>类可让您更轻松地控制所有标志，并有助于构造典型的通知布局。以下是一些作为<strong>NotificationCompat.Builder</strong>类的一部分可用的重要且最常用的方法。</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>Notification build()</strong></td><td>合并所有已设置的选项，并返回一个新的Notification对象。</td></tr><tr><td><strong>NotificationCompat.Builder setAutoCancel (boolean autoCancel)</strong></td><td>设置此标志将使其生效，因此当用户在面板中单击它时，通知将自动取消。</td></tr><tr><td><strong>NotificationCompat.Builder setContent (RemoteViews views)</strong></td><td>提供自定义的RemoteViews代替标准的RemoteViews使用。</td></tr><tr><td><strong>NotificationCompat.Builder setContentInfo (CharSequence info)</strong></td><td>在通知的右侧设置大文本。</td></tr><tr><td><strong>NotificationCompat.Builder setContentIntent (PendingIntent intent)</strong></td><td>提供单击通知时发送的PendingIntent。</td></tr><tr><td><strong>NotificationCompat.Builder setContentText (CharSequence text)</strong></td><td>在标准通知中设置通知的文本（第二行）。</td></tr><tr><td><strong>NotificationCompat.Builder setContentTitle (CharSequence title)</strong></td><td>在标准通知中设置通知的文本（第一行）。</td></tr><tr><td><strong>NotificationCompat.Builder setDefaults (int defaults)</strong></td><td>设置将使用的默认通知选项。</td></tr><tr><td><strong>NotificationCompat.Builder setLargeIcon (Bitmap icon)</strong></td><td>设置股票消息和通知中显示的大图标。</td></tr><tr><td><strong>NotificationCompat.Builder setNumber (int number)</strong></td><td>在通知的右侧设置较大的数字。</td></tr><tr><td><strong>NotificationCompat.Builder setOngoing (boolean ongoing)</strong></td><td>设置这是否是正在进行的通知。</td></tr><tr><td><strong>NotificationCompat.Builder setSmallIcon (int icon)</strong></td><td>设置要在通知布局中使用的小图标。</td></tr><tr><td><strong>NotificationCompat.Builder setStyle (NotificationCompat.Style style)</strong></td><td>添加丰富的通知样式以在构建时应用。</td></tr><tr><td><strong>NotificationCompat.Builder setTicker (CharSequence tickerText)</strong></td><td>设置第一次到达通知时在状态栏中显示的文本。</td></tr><tr><td><strong>NotificationCompat.Builder setVibrate (long[] pattern)</strong></td><td>设置要使用的振动模式。</td></tr><tr><td><strong>NotificationCompat.Builder setWhen (long when)</strong></td><td>设置事件发生的时间。面板中的通知此时已排序。</td></tr></tbody></table><h2 id="通知示例演示" tabindex="-1"><a class="header-anchor" href="#通知示例演示"><span>通知示例演示</span></a></h2><ol><li>您将使用Android Studio IDE创建一个Android应用程序，并在com.example.demo包下将其命名为Demo。</li><li>修改src/MainActivity.java文件并添加一些组件</li><li>修改布局XML文件res/layout/activity_main.xml来定义一个界面。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.app.Notification;
  import android.app.NotificationChannel;
  import android.app.NotificationManager;
  import android.content.Context;
  import android.graphics.BitmapFactory;
  import android.graphics.Color;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  
  

public class MainActivity extends Activity {
 private static final int NOTIFICATION_ID = 1;
 Button b1;
 @Override
 protected void onCreate(Bundle savedInstanceState) {
 super.onCreate(savedInstanceState);
 setContentView(R.layout.activity_main);


      b1 = (Button)findViewById(R.id.button);
      b1.setOnClickListener(new View.OnClickListener() {
          @Override
          public void onClick(View v) {
              addNotification();
          }
      });
  }

  private void addNotification() {
      //1、NotificationManager
      NotificationManager manager = (NotificationManager)getSystemService(Context.NOTIFICATION_SERVICE);
      /** 2、Builder-&gt;Notification         *  必要属性有三项         *  小图标，通过 setSmallIcon() 方法设置         *  标题，通过 setContentTitle() 方法设置         *  内容，通过 setContentText() 方法设置*/
      Notification.Builder builder = new Notification.Builder(this);
      builder.setContentInfo(&quot;内容信息&quot;)
              .setContentText(&quot;通知内容&quot;)//设置通知内容
              .setContentTitle(&quot;通知标题&quot;)//设置通知标题
              .setLargeIcon(BitmapFactory.decodeResource(getResources(),R.mipmap.ic_launcher))
              .setSmallIcon(R.mipmap.ic_launcher_round)//不能缺少的一个属性
              .setSubText(&quot;Subtext&quot;)
              .setTicker(&quot;滚动消息......&quot;)
              .setWhen(System.currentTimeMillis());//设置通知时间，默认为系统发出通知的时间，通常不用设置

      if (android.os.Build.VERSION.SDK_INT &gt;= android.os.Build.VERSION_CODES.O) {  // 这里的判断是为了兼容更高版本的API (O // 26)
          NotificationChannel channel = new NotificationChannel(&quot;001&quot;,&quot;my_channel&quot;,NotificationManager.IMPORTANCE_DEFAULT);
          channel.enableLights(true); //是否在桌面icon右上角展示小红点
          channel.setLightColor(Color.GREEN); //小红点颜色
          channel.setShowBadge(true); //是否在久按桌面图标时显示此渠道的通知
          manager.createNotificationChannel(channel);
          builder.setChannelId(&quot;001&quot;);
      }

      Notification n = builder.build();
      //3、manager.notify()
      manager.notify(NOTIFICATION_ID,n);


  }


}

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;MainActivity&quot;&gt;

    &lt;TextView
        android:id=&quot;@+id/textView1&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;通知示例&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:textSize=&quot;30sp&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView2&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:textColor=&quot;#ff87ff09&quot;
        android:textSize=&quot;30sp&quot;
        android:layout_below=&quot;@+id/textView1&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;48dp&quot; /&gt;

    &lt;ImageButton
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageButton&quot;
        android:src=&quot;@drawable/logo&quot;
        android:layout_below=&quot;@+id/textView2&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;42dp&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;69dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/imageButton&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;62dp&quot;
        android:text=&quot;通知&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/notification1.png" alt=""></p><p>点击“通知”按钮，从屏幕顶部下拉即可看到刚刚发送的通知。</p>`,29),r=[a];function d(u,c){return n(),o("div",null,r)}const s=t(e,[["render",d],["__file","notification.html.vue"]]),p=JSON.parse('{"path":"/android-tutor/advanced/notification.html","title":"通知","lang":"zh-CN","frontmatter":{"description":"通知 一个通知是可以显示到你的应用程序的正常UI的用户之外的消息。当您告诉系统发出通知时，它首先在通知区域中显示为图标。要查看通知的详细信息，用户可以打开通知抽屉。通知区域和通知抽屉都是用户可以随时查看的系统控制区域。 Android Toast类提供了一种方便的方式来向用户显示警报，但问题是这些警报不是持久性的，这意味着警报在屏幕上闪烁几秒钟然后消失...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/notification.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"通知"}],["meta",{"property":"og:description","content":"通知 一个通知是可以显示到你的应用程序的正常UI的用户之外的消息。当您告诉系统发出通知时，它首先在通知区域中显示为图标。要查看通知的详细信息，用户可以打开通知抽屉。通知区域和通知抽屉都是用户可以随时查看的系统控制区域。 Android Toast类提供了一种方便的方式来向用户显示警报，但问题是这些警报不是持久性的，这意味着警报在屏幕上闪烁几秒钟然后消失..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/notification1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"通知\\",\\"image\\":[\\"https://www.jc2182.com/images/android/notification1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"创建和发送通知","slug":"创建和发送通知","link":"#创建和发送通知","children":[]},{"level":2,"title":"NotificationCompat.Builder类","slug":"notificationcompat-builder类","link":"#notificationcompat-builder类","children":[]},{"level":2,"title":"通知示例演示","slug":"通知示例演示","link":"#通知示例演示","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":5.6,"words":1680},"filePathRelative":"android-tutor/advanced/notification.md","localizedDate":"2023年5月22日","autoDesc":true}');export{s as comp,p as data};
