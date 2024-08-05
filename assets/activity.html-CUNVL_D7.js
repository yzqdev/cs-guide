import{_ as t,c as o,o as i,d as n}from"./app-CbULZrmi.js";const e={},a=n(`<h1 id="activity" tabindex="-1"><a class="header-anchor" href="#activity"><span>activity</span></a></h1><h1 id="android-activity" tabindex="-1"><a class="header-anchor" href="#android-activity"><span>Android Activity</span></a></h1><blockquote><p>Activity 代表具有用户界面的单个屏幕，就像Java的窗口或框架一样。Android Activity是ContextThemeWrapper类的子类。</p></blockquote><p>如果您使用过C，C ++或Java编程语言，那么您一定已经看到您的程序从main()函数开始。与之非常相似，Android系统以Activity来启动其程序，该Activity以对onCreate()回调方法的调用开始。有一系列启动Activity的回调方法和一系列拆除Activity的回调方法，如下面的Activity生命周期图所示：</p><p><img src="https://www.jc2182.com/images/android/activity.jpg" alt="activity"></p><p>Activity类定义以下回调，即事件。您不需要实现所有的回调方法。但是，重要的是，您必须了解每一个，并实施那些确保您的应用程序符合用户期望的行为。</p><table><thead><tr><th>回调方法</th><th>描述</th></tr></thead><tbody><tr><td><strong>onCreate()</strong></td><td>这是第一个回调，并在首次创建Activity时调用。</td></tr><tr><td><strong>onStart()</strong></td><td>当Activity对用户可见时，将调用此回调。</td></tr><tr><td><strong>onResume()</strong></td><td>当用户开始与应用程序交互时，将调用此方法。</td></tr><tr><td><strong>onPause()</strong></td><td>暂停的Activity不接收用户输入，并且无法执行任何代码，并且在当前Activity被暂停并且先前的Activity正在恢复时将被调用。</td></tr><tr><td><strong>onStop()</strong></td><td>当Activity不再可见时，将调用此回调。</td></tr><tr><td><strong>onDestroy()</strong></td><td>在Activity销毁系统之前，将调用此回调。</td></tr><tr><td><strong>onRestart()</strong></td><td>Activity停止后重新启动时，将调用此回调。</td></tr></tbody></table><h2 id="实例" tabindex="-1"><a class="header-anchor" href="#实例"><span>实例</span></a></h2><p>本示例将带您通过简单的步骤来展示Android应用程序活动的生命周期。请按照以下步骤修改我们在<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中创建的Android应用程序-</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为HelloWorld，位于com.jc2182.helloworld包下。</li><li>修改主活动文件MainActivity.java，如下所述。其余文件保持不变。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.helloworld/MainActivity.java的内容。该文件包括每种基本生命周期方法。所述Log.d方法已经被用来生成日志消息-</p><pre><code class="language-java">  
  
  import androidx.appcompat.app.AppCompatActivity;
  
  import android.os.Bundle;
  import android.util.Log;
  
  public class MainActivity extends AppCompatActivity {
  
      String msg = &quot;Android : &quot;;
  
      /** 在activity首次创建时调用。 */
      @Override
      public void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          Log.d(msg, &quot;onCreate() 事件&quot;);
      }
  
      /** 当activity即将可见时调用。 */
      @Override
      protected void onStart() {
          super.onStart();
          Log.d(msg, &quot;onStart() 事件&quot;);
      }
  
      /** 当activity变为可见时调用。 */
      @Override
      protected void onResume() {
          super.onResume();
          Log.d(msg, &quot;onResume() 事件&quot;);
      }
  
      /** 在另一个activity获得焦点时调用。 */
      @Override
      protected void onPause() {
          super.onPause();
          Log.d(msg, &quot; onPause() 事件&quot;);
      }
  
      /** 当activity不再可见时调用 */
      @Override
      protected void onStop() {
          super.onStop();
          Log.d(msg, &quot;onStop() 事件&quot;);
      }
  
      /** 在活activity销毁之前调用。 */
      @Override
      public void onDestroy() {
          super.onDestroy();
          Log.d(msg, &quot;onDestroy() 事件&quot;);
      }
  }
</code></pre><p>Activity类使用项目的res/layout文件夹中可用的XML文件加载所有UI组件。以下语句从res/layout/activity_main.xml文件加载UI组件：</p><pre><code class="language-java">  setContentView(R.layout.activity_main);
</code></pre><p>一个应用程序可以具有一个或多个activity，而没有任何限制。您为应用程序定义的每个activity都必须在AndroidManifest.xml文件中声明，并且应用程序的main activity必须在清单中使用<code>&lt;intent-filter&gt;</code>声明，其中包括MAIN操作和LAUNCHER类别，如下所示：</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
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
      &lt;/application&gt;
  
  &lt;/manifest&gt;
</code></pre><p>如果未为您的activity之一声明MAIN操作或LAUNCHER类别，则您的应用程序图标将不会出现在主屏幕的应用程序列表中。让我们尝试运行修改后的Hello World！我们刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的activity文件之一，然后Android Studio运行图标从工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示Emulator窗口，并且您应该在Android studio的LogCat窗口中看到以下日志消息-</p><pre><code class="language-t4">  2020-07-07 16:21:59.664 8407-8407/com.jc2182.helloworld D/Android :: onCreate() 事件
  2020-07-07 16:21:59.671 8407-8407/com.jc2182.helloworld D/Android :: onStart() 事件
  2020-07-07 16:21:59.672 8407-8407/com.jc2182.helloworld D/Android :: onResume() 事件
</code></pre><p><img src="https://www.jc2182.com/images/android/activity1.jpg" alt="activity"></p><p>让我们尝试单击Android模拟器上的锁屏按钮，它将在Android studio的LogCat窗口中生成以下事件消息：</p><pre><code class="language-t4">  2020-07-07 16:24:24.042 8407-8407/com.jc2182.helloworld D/Android ::  onPause() 事件
  2020-07-07 16:24:25.042 8407-8407/com.jc2182.helloworld D/Android ::  onStop() 事件
</code></pre><p>让我们再次尝试在Android模拟器上解锁屏幕，它将在Android Studio的LogCat窗口中生成以下事件消息：</p><pre><code class="language-t4">  2020-07-07 16:25:59.671 8407-8407/com.jc2182.helloworld D/Android :: onStart() 事件
  2020-07-07 16:25:59.672 8407-8407/com.jc2182.helloworld D/Android :: onResume() 事件
</code></pre><p>接下来，让我们再次尝试Android后退按钮在Android仿真器上单击“后退”按钮，它将在Android Studio的LogCat窗口中生成以下事件消息，从而完成了Android应用程序的活动生命周期。</p><pre><code class="language-t4">  2020-07-07 16:26:24.042 8407-8407/com.jc2182.helloworld D/Android ::  onPause() 事件
  2020-07-07 16:26:25.042 8407-8407/com.jc2182.helloworld D/Android ::  onStop() 事件
  2020-07-07 16:26:25.043 8407-8407/com.jc2182.helloworld D/Android ::  onDestroy() 事件
</code></pre>`,25),d=[a];function r(c,l){return i(),o("div",null,d)}const s=t(e,[["render",r],["__file","activity.html.vue"]]),u=JSON.parse('{"path":"/android-tutor/basic/activity.html","title":"activity","lang":"zh-CN","frontmatter":{"description":"activity Android Activity Activity 代表具有用户界面的单个屏幕，就像Java的窗口或框架一样。Android Activity是ContextThemeWrapper类的子类。 如果您使用过C，C ++或Java编程语言，那么您一定已经看到您的程序从main()函数开始。与之非常相似，Android系统以Activit...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/basic/activity.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"activity"}],["meta",{"property":"og:description","content":"activity Android Activity Activity 代表具有用户界面的单个屏幕，就像Java的窗口或框架一样。Android Activity是ContextThemeWrapper类的子类。 如果您使用过C，C ++或Java编程语言，那么您一定已经看到您的程序从main()函数开始。与之非常相似，Android系统以Activit..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/activity.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"activity\\",\\"image\\":[\\"https://www.jc2182.com/images/android/activity.jpg\\",\\"https://www.jc2182.com/images/android/activity1.jpg\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"实例","slug":"实例","link":"#实例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":4.36,"words":1307},"filePathRelative":"android-tutor/basic/activity.md","localizedDate":"2023年5月22日","autoDesc":true}');export{s as comp,u as data};
