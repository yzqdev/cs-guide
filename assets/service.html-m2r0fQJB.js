import{_ as t,c as o,o as n,d as e}from"./app-CbULZrmi.js";const i={},r=e(`<h1 id="android-服务-services" tabindex="-1"><a class="header-anchor" href="#android-服务-services"><span>Android 服务（Services）</span></a></h1><div class="hint-container tip"><p class="hint-container-title">提示</p><p>一个服务（Service）是在后台运行的组件，无需与用户交互即可执行长时间运行的操作，即使应用程序被销毁，它也能工作。服务基本上可以有两种状态</p></div><table><thead><tr><th>状态</th><th>描述</th></tr></thead><tbody><tr><td><strong>Started</strong></td><td>当应用程序组件(如activity)通过调用startService()启动服务时，服务将被启动。一旦启动，服务可以无限期地在后台运行，即使启动它的组件已被销毁。</td></tr><tr><td><strong>Bound</strong></td><td>当应用程序组件通过调用bindService()绑定到服务时，服务被绑定。绑定服务提供客户机-服务器接口，允许组件与服务交互、发送请求、获取结果，甚至通过进程间通信(IPC)跨进程进行交互。</td></tr></tbody></table><p>服务具有生命周期回调方法，您可以实施这些方法来监视服务状态的变化，并且可以在适当的阶段执行工作。左图显示了使用startService()创建服务时的生命周期，右图显示了使用bindService()创建服务时的生命周期：（图片由android.com提供）</p><p><img src="https://www.jc2182.com/images/android/service.jpg" alt="service"></p><p>要创建服务，请创建一个Java类，该类扩展了Service基类或其现有子类之一。该服务基类定义的各种回调方法和最重要的如下。您不需要实现所有的回调方法。但是，重要的是，您必须了解每一个，并实施那些确保您的应用程序符合用户期望的行为。</p><table><thead><tr><th>回调方法</th><th>描述</th></tr></thead><tbody><tr><td><strong>onStartCommand()</strong></td><td>当另一个组件（例如activity）通过调用startService()请求启动服务时，系统将调用此方法。如果实现此方法，则有责任通过调用stopSelf()或stopService()方法在服务完成后停止服务。</td></tr><tr><td><strong>onBind()</strong></td><td>当另一个组件希望通过调用bindService()与服务绑定时，系统将调用此方法。如果实现此方法，则必须通过返回IBinder对象，提供客户端用于与服务进行通信的接口。您必须始终实现此方法，但是如果您不想允许绑定，则应返回null。</td></tr><tr><td><strong>onUnbind()</strong></td><td>当所有客户端都已与服务发布的特定接口断开连接时，系统将调用此方法。</td></tr><tr><td><strong>onRebind()</strong></td><td>在新的客户端已连接到该服务之后，系统已在先前通知所有客户端已断开其onUnbind（Intent）的连接之后，调用此方法。</td></tr><tr><td><strong>onCreate()</strong></td><td>首次使用onStartCommand()或onBind()创建服务时，系统会调用此方法。进行一次设置需要此呼叫。</td></tr><tr><td><strong>onDestroy()</strong></td><td>当不再使用该服务并将其销毁时，系统将调用此方法。您的服务应实现此功能，以清理所有资源，例如线程，注册的侦听器，接收器等。</td></tr></tbody></table><h2 id="实例" tabindex="-1"><a class="header-anchor" href="#实例"><span>实例</span></a></h2><p>以下框架服务演示了每种生命周期方法</p><pre><code class="language-java">  
  
  import android.app.Service;
  import android.content.Intent;
  import android.os.IBinder;
  
  public class HelloService extends Service {
      /** 指示服务被终止时的行为 */
      int mStartMode;
  
      /** 绑定客户端的接口 */
      IBinder mBinder;
  
      /** 指示是否应使用onRebind */
      boolean mAllowRebind;
  
      /** 在创建服务时调用。 */
      @Override
      public void onCreate() {
  
      }
  
      /** 由于调用startService()，服务正在启动 */
      @Override
      public int onStartCommand(Intent intent, int flags, int startId) {
          return mStartMode;
      }
  
      /** 客户端使用bindService()绑定到服务 */
      @Override
      public IBinder onBind(Intent intent) {
          return mBinder;
      }
  
          /** 当所有客户端都与unbindService()解除绑定时调用*/
      @Override
      public boolean onUnbind(Intent intent) {
          return mAllowRebind;
      }
  
      /** 当客户端通过bindService()绑定到服务时调用*/
      @Override
      public void onRebind(Intent intent) {
  
      }
  
      /** 当服务不再使用并被销毁时调用 */
      @Override
      public void onDestroy() {
  
      }
  }
</code></pre><p>本示例将引导您完成一些简单的步骤，以展示如何创建自己的Android服务。请按照以下步骤修改我们在<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中创建的Android应用程序-</p><ol><li>您将使用Android Studio IDE创建一个Android应用程序，并将其命名为HelloWrold，位于 com.jc2182.helloworld 程序包下。</li><li>修改主activity文件MainActivity.java以添加**startService()<strong>和</strong>stopService()**方法。</li><li>在com.jc2182.helloworld包下创建一个新的Java文件MyService.java。该文件将实现与Android服务相关的方法。</li><li>使用&lt;service ... /&gt;标签在AndroidManifest.xml文件中定义您的服务。一个应用程序可以具有一个或多个服务，而没有任何限制。</li><li>修改res/layout/activity_main.xml文件的默认内容，以在线性布局中两个按钮。</li><li>无需更改res/values/strings.xml文件中的任何常量。Android Studio处理字符串值</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件MainActivity.java的内容。该文件可以包括每个基本生命周期方法。我们添加了startService()和stopService()方法来启动和停止服务。</p><pre><code class="language-java">  
  
  import androidx.appcompat.app.AppCompatActivity;
  
  import android.content.Intent;
  import android.os.Bundle;
  import android.util.Log;
  import android.view.View;
  
  public class MainActivity extends AppCompatActivity {
  
      String msg = &quot;Android : &quot;;
  
      /** 在第一次创建activity时调用。 */
      @Override
      public void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          Log.d(msg, &quot;onCreate() 事件被调用。&quot;);
      }
  
      public void startService(View view) {
          startService(new Intent(getBaseContext(), HelloService.class));
      }
  
      // 停止服务
      public void stopService(View view) {
          stopService(new Intent(getBaseContext(), HelloService.class));
      }
  }
</code></pre><p>以下是HellowService.java的内容。该文件可以根据要求实现与服务相关联的一种或多种方法。现在，我们将仅实现两种方法onStartCommand()和onDestroy() -</p><pre><code class="language-java">  
  
  import android.app.Service;
  import android.content.Intent;
  import android.os.IBinder;
  import android.widget.Toast;
  
  import androidx.annotation.Nullable;
  
  public class HelloService extends Service {
      @Nullable
      @Override
      public IBinder onBind(Intent intent) {
          return null;
      }
  
      @Override
      public int onStartCommand(Intent intent, int flags, int startId) {
          // Let it continue running until it is stopped.
          Toast.makeText(this, &quot;服务启动。&quot;, Toast.LENGTH_LONG).show();
          return START_STICKY;
      }
  
      @Override
      public void onDestroy() {
          super.onDestroy();
          Toast.makeText(this, &quot;服务销毁。&quot;, Toast.LENGTH_LONG).show();
      }
  }
</code></pre><p>以下将修改AndroidManifest.xml文件的内容。在这里我们添加了<code>&lt;service ... /&gt;</code>标签以包括我们的服务-</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
      package=&quot;com.jc2182.helloworld&quot;&gt;
  
      &lt;application
          android:allowBackup=&quot;true&quot;
          android:icon=&quot;@mipmap/ic_launcher&quot;
          android:label=&quot;@string/app_name&quot;
          android:roundIcon=&quot;@mipmap/ic_launcher_round&quot;
          android:supportsRtl=&quot;true&quot;
          android:theme=&quot;@style/AppTheme&quot;&gt;
          &lt;activity android:name=&quot;.MainActivity&quot;&gt;
              &lt;intent-filter&gt;
                  &lt;action android:name=&quot;android.intent.action.MAIN&quot; /&gt;
  
                  &lt;category android:name=&quot;android.intent.category.LAUNCHER&quot; /&gt;
              &lt;/intent-filter&gt;
          &lt;/activity&gt;
  
          &lt;service
              android:name=&quot;.HelloService&quot;
              android:enabled=&quot;true&quot;
              android:exported=&quot;true&quot;&gt;&lt;/service&gt;
      &lt;/application&gt;
  
  &lt;/manifest&gt;
</code></pre><p>以下是res/layout/activity_main.xml文件的内容，其中包括两个按钮-</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
      xmlns:tools=&quot;http://schemas.android.com/tools&quot;
      android:layout_width=&quot;match_parent&quot;
      android:layout_height=&quot;match_parent&quot;
      xmlns:app=&quot;http://schemas.android.com/apk/res-auto&quot;
      android:paddingLeft=&quot;@dimen/activity_horizontal_margin&quot;
      android:paddingRight=&quot;@dimen/activity_horizontal_margin&quot;
      android:paddingTop=&quot;@dimen/activity_vertical_margin&quot;
      android:paddingBottom=&quot;@dimen/activity_vertical_margin&quot;
      tools:context=&quot;.MainActivity&quot;&gt;
 
  &lt;TextView
      android:id=&quot;@+id/textView1&quot;
      android:layout_width=&quot;wrap_content&quot;
      android:layout_height=&quot;wrap_content&quot;
      android:layout_alignParentTop=&quot;true&quot;
      android:layout_centerHorizontal=&quot;true&quot;
      android:layout_marginTop=&quot;43dp&quot;
      android:text=&quot;services 例子&quot;
      android:textSize=&quot;30dp&quot;
      tools:ignore=&quot;MissingConstraints&quot;
      tools:layout_editor_absoluteX=&quot;109dp&quot;
      tools:layout_editor_absoluteY=&quot;48dp&quot; /&gt;

  &lt;TextView
      android:id=&quot;@+id/textView2&quot;
      android:layout_width=&quot;wrap_content&quot;
      android:layout_height=&quot;wrap_content&quot;
      android:layout_above=&quot;@+id/imageButton&quot;
      android:layout_centerHorizontal=&quot;true&quot;
      android:layout_marginBottom=&quot;96dp&quot;
      android:text=&quot;蝴蝶教程 &quot;
      android:textColor=&quot;#ff87ff09&quot;
      android:textSize=&quot;30dp&quot;
      tools:ignore=&quot;MissingConstraints&quot;
      tools:layout_editor_absoluteX=&quot;162dp&quot;
      tools:layout_editor_absoluteY=&quot;121dp&quot; /&gt;

  &lt;ImageButton
      android:id=&quot;@+id/imageButton&quot;
      android:layout_width=&quot;wrap_content&quot;
      android:layout_height=&quot;wrap_content&quot;
      android:layout_centerHorizontal=&quot;true&quot;
      android:layout_centerVertical=&quot;true&quot;
      android:src=&quot;@drawable/logo&quot;
      app:layout_constraintEnd_toEndOf=&quot;parent&quot;
      app:layout_constraintStart_toStartOf=&quot;parent&quot;
      tools:layout_editor_absoluteY=&quot;196dp&quot;
      tools:ignore=&quot;MissingConstraints&quot; /&gt;

  &lt;Button
      android:id=&quot;@+id/button2&quot;
      android:layout_width=&quot;wrap_content&quot;
      android:layout_height=&quot;wrap_content&quot;
      android:layout_below=&quot;@+id/imageButton&quot;
      android:layout_centerHorizontal=&quot;true&quot;
      android:layout_marginTop=&quot;16dp&quot;
      android:onClick=&quot;startService&quot;
      android:text=&quot;启动服务&quot;
      app:layout_constraintEnd_toEndOf=&quot;parent&quot;
      app:layout_constraintStart_toStartOf=&quot;parent&quot;
      tools:ignore=&quot;MissingConstraints&quot;
      tools:layout_editor_absoluteY=&quot;397dp&quot; /&gt;

  &lt;Button
      android:id=&quot;@+id/button&quot;
      android:layout_width=&quot;wrap_content&quot;
      android:layout_height=&quot;wrap_content&quot;
      android:layout_below=&quot;@+id/button2&quot;
      android:layout_alignStart=&quot;@+id/button2&quot;
      android:layout_alignLeft=&quot;@+id/button2&quot;
      android:layout_alignEnd=&quot;@+id/button2&quot;
      android:layout_alignRight=&quot;@+id/button2&quot;
      android:layout_centerHorizontal=&quot;true&quot;
      android:layout_marginStart=&quot;0dp&quot;
      android:layout_marginLeft=&quot;0dp&quot;
      android:layout_marginTop=&quot;47dp&quot;
      android:layout_marginEnd=&quot;0dp&quot;
      android:layout_marginRight=&quot;0dp&quot;
      android:onClick=&quot;stopService&quot;
      android:text=&quot;停止服务&quot;
      app:layout_constraintEnd_toEndOf=&quot;parent&quot;
      app:layout_constraintStart_toStartOf=&quot;parent&quot;
      tools:ignore=&quot;MissingConstraints&quot;
      tools:layout_editor_absoluteY=&quot;326dp&quot; /&gt;
 

&lt;/RelativeLayout&gt;
</code></pre><p>让我们尝试运行修改后的Hello World！我们刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后点击Android StudioRun图标工具栏中的“运行” 图标。Android Studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/service1.png" alt="service"></p><p>现在启动服务，让我们单击“启动服务”按钮，这将启动服务，并且按照我们在onStartCommand()方法中的编程，一条消息“服务启动。”将出现在模拟器的底部，如下所示：</p><p><img src="https://www.jc2182.com/images/android/service2.png" alt="service"></p><p>要停止服务，您可以单击停止服务按钮。出现如下图示：</p><p><img src="https://www.jc2182.com/images/android/service3.png" alt="servi"></p>`,26),a=[r];function d(u,l){return n(),o("div",null,a)}const c=t(i,[["render",d],["__file","service.html.vue"]]),p=JSON.parse('{"path":"/android-tutor/basic/service.html","title":"Android 服务（Services）","lang":"zh-CN","frontmatter":{"description":"Android 服务（Services） 提示 一个服务（Service）是在后台运行的组件，无需与用户交互即可执行长时间运行的操作，即使应用程序被销毁，它也能工作。服务基本上可以有两种状态 服务具有生命周期回调方法，您可以实施这些方法来监视服务状态的变化，并且可以在适当的阶段执行工作。左图显示了使用startService()创建服务时的生命周期，右...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/basic/service.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"Android 服务（Services）"}],["meta",{"property":"og:description","content":"Android 服务（Services） 提示 一个服务（Service）是在后台运行的组件，无需与用户交互即可执行长时间运行的操作，即使应用程序被销毁，它也能工作。服务基本上可以有两种状态 服务具有生命周期回调方法，您可以实施这些方法来监视服务状态的变化，并且可以在适当的阶段执行工作。左图显示了使用startService()创建服务时的生命周期，右..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/service.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Android 服务（Services）\\",\\"image\\":[\\"https://www.jc2182.com/images/android/service.jpg\\",\\"https://www.jc2182.com/images/android/service1.png\\",\\"https://www.jc2182.com/images/android/service2.png\\",\\"https://www.jc2182.com/images/android/service3.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"实例","slug":"实例","link":"#实例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":6.64,"words":1993},"filePathRelative":"android-tutor/basic/service.md","localizedDate":"2023年5月22日","autoDesc":true}');export{c as comp,p as data};
