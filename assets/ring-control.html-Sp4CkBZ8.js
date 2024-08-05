import{_ as t,c as o,o as n,d as e}from"./app-CbULZrmi.js";const i={},d=e(`<h1 id="铃声控制" tabindex="-1"><a class="header-anchor" href="#铃声控制"><span>铃声控制</span></a></h1><p>您可以在Android中轻松控制铃声的音量和铃声配置文件，例如：（静音，振动，响亮等）。Android提供了AudioManager类，该类提供对这些控件的访问。为了使用<strong>AndroidManager</strong>类，您必须首先通过调用getSystemService()方法创建AudioManager类的对象。其语法如下。</p><pre><code class="language-java">  private AudioManager myAudioManager;
  myAudioManager = (AudioManager)getSystemService(Context.AUDIO_SERVICE);  
</code></pre><p>实例化AudioManager类的对象后，就可以使用setRingerMode方法设置设备的音频或铃声配置文件。其语法如下。</p><pre><code class="language-java">  myAudioManager.setRingerMode(AudioManager.RINGER_MODE_VIBRATE);
</code></pre><p>setRingerMode方法采用整数作为参数。对于每种模式，分配一个整数，以区分不同的模式。可能的模式是。</p><table><thead><tr><th>模式</th><th>说明</th></tr></thead><tbody><tr><td><strong>RINGER_MODE_VIBRATE</strong></td><td>此模式将设备设置为振动模式。</td></tr><tr><td><strong>RINGER_MODE_NORMAL</strong></td><td>此模式将设备设置为正常（大声）模式。</td></tr><tr><td><strong>RINGER_MODE_SILENT</strong></td><td>此模式将设备设置为静音模式。</td></tr></tbody></table><p>设置模式后，可以调用getRingerMode()方法来获取系统的设置状态。其语法如下。</p><pre><code class="language-java">  int mod = myAudioManager.getRingerMode();
</code></pre><p>除了getRingerMode方法外，AudioManager类中还有其他方法可用于控制音量和其他模式。它们在下面列出。</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>adjustVolume(int direction, int flags)</strong></td><td>此方法调整最相关流的音量</td></tr><tr><td><strong>getMode()</strong></td><td>此方法返回当前的音频模式</td></tr><tr><td><strong>getStreamMaxVolume(int streamType)</strong></td><td>此方法返回特定流的最大音量索引</td></tr><tr><td><strong>getStreamVolume(int streamType)</strong></td><td>此方法返回特定流的当前体积索引</td></tr><tr><td><strong>isMusicActive()</strong></td><td>此方法检查是否有任何音乐处于活动状态。</td></tr><tr><td><strong>startBluetoothSco()</strong></td><td>此方法启动蓝牙SCO音频连接</td></tr><tr><td><strong>stopBluetoothSco()</strong></td><td>此方法停止蓝牙SCO音频连接</td></tr></tbody></table><ul><li><em></em></li></ul><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>下面的示例演示AudioManager类的用法。它创建了一个应用程序，可让您为设备设置不同的铃声模式。要试验此示例，您需要在实际设备上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加AudioManager代码</li><li>修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。</li><li>修改AndroidManifest.xml以添加必要的权限。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.content.Context;
  import android.media.AudioManager;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  import android.widget.Toast;
 

  public class MainActivity extends Activity {
      Button mode,ring,vibrate,silent;
      private AudioManager myAudioManager;

      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          vibrate=(Button)findViewById(R.id.button3);
          ring=(Button)findViewById(R.id.button2);
    
          mode=(Button)findViewById(R.id.button);
          silent=(Button)findViewById(R.id.button4);
          myAudioManager = (AudioManager)getSystemService(Context.AUDIO_SERVICE);
    
          vibrate.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  myAudioManager.setRingerMode(AudioManager.RINGER_MODE_VIBRATE);
                  Toast.makeText(MainActivity.this,&quot;现在进入振动模式&quot;,
                          Toast.LENGTH_LONG).show();
              }
          });
    
          ring.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  myAudioManager.setRingerMode(AudioManager.RINGER_MODE_NORMAL);
                  Toast.makeText(MainActivity.this,&quot;现在进入响铃模式&quot;,
                          Toast.LENGTH_LONG).show();
              }
          });
    
          silent.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  myAudioManager.setRingerMode(AudioManager.RINGER_MODE_SILENT);
                  Toast.makeText(MainActivity.this,&quot;现在进入静音模式&quot;,
                          Toast.LENGTH_LONG).show();
              }
          });
    
          mode.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  int mod=myAudioManager.getRingerMode();
                  if(mod==AudioManager.RINGER_MODE_VIBRATE){
                      Toast.makeText(MainActivity.this,&quot;现在进入振动模式&quot;,
                              Toast.LENGTH_LONG).show();
                  } else if(mod==AudioManager.RINGER_MODE_NORMAL){
                      Toast.makeText(MainActivity.this,&quot;现在进入响铃模式&quot;,
                              Toast.LENGTH_LONG).show();
                  } else {
                      Toast.makeText(MainActivity.this,&quot;现在进入静音模式&quot;,
                              Toast.LENGTH_LONG).show();
                  }
              }
          });
      }

  }

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout
    xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;

    &lt;TextView
        android:id=&quot;@+id/textView&quot;
        android:layout_width=&quot;403dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_alignParentRight=&quot;true&quot;
        android:layout_marginTop=&quot;158dp&quot;
        android:layout_marginRight=&quot;130dp&quot;
        android:text=&quot;铃声控制示例&quot;
        android:textSize=&quot;30dp&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:id=&quot;@+id/textView2&quot;
        android:textColor=&quot;#ff3eff0f&quot;
        android:textSize=&quot;35dp&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;ImageView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageView&quot;
        android:src=&quot;@drawable/logo&quot;
        android:background=&quot;#33223311&quot;
        android:layout_below=&quot;@+id/textView2&quot;
        android:layout_alignLeft=&quot;@+id/textView2&quot;
        android:layout_alignStart=&quot;@+id/textView2&quot;
        android:layout_alignRight=&quot;@+id/textView2&quot;
        android:layout_alignEnd=&quot;@+id/textView2&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;79dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/imageView&quot;
        android:layout_alignParentStart=&quot;true&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_marginTop=&quot;59dp&quot;
        android:text=&quot;模式&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button2&quot;
        android:layout_width=&quot;97dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignTop=&quot;@+id/button&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:text=&quot;响铃&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button3&quot;
        android:layout_width=&quot;98dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignTop=&quot;@+id/button2&quot;
        android:layout_alignEnd=&quot;@+id/textView&quot;
        android:layout_alignRight=&quot;@+id/textView&quot;
        android:text=&quot;振动&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button4&quot;
        android:layout_width=&quot;92dp&quot;
        android:layout_height=&quot;59dp&quot;
        android:layout_below=&quot;@+id/button2&quot;
        android:layout_alignStart=&quot;@+id/button2&quot;
        android:layout_alignLeft=&quot;@+id/button2&quot;
        android:layout_marginStart=&quot;-35dp&quot;
        android:layout_marginLeft=&quot;-35dp&quot;
        android:layout_marginTop=&quot;-40dp&quot;
        android:text=&quot;静音&quot; /&gt;
&lt;/RelativeLayout&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/ringer1.png" alt=""></p><p>您可以依次点击各个按钮来测试铃声效果。</p>`,22),a=[d];function r(u,l){return n(),o("div",null,a)}const s=t(i,[["render",r],["__file","ring-control.html.vue"]]),c=JSON.parse('{"path":"/android-tutor/advanced/ring-control.html","title":"铃声控制","lang":"zh-CN","frontmatter":{"description":"铃声控制 您可以在Android中轻松控制铃声的音量和铃声配置文件，例如：（静音，振动，响亮等）。Android提供了AudioManager类，该类提供对这些控件的访问。为了使用AndroidManager类，您必须首先通过调用getSystemService()方法创建AudioManager类的对象。其语法如下。 实例化AudioManager类...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/ring-control.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"铃声控制"}],["meta",{"property":"og:description","content":"铃声控制 您可以在Android中轻松控制铃声的音量和铃声配置文件，例如：（静音，振动，响亮等）。Android提供了AudioManager类，该类提供对这些控件的访问。为了使用AndroidManager类，您必须首先通过调用getSystemService()方法创建AudioManager类的对象。其语法如下。 实例化AudioManager类..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/ringer1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"铃声控制\\",\\"image\\":[\\"https://www.jc2182.com/images/android/ringer1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.91,"words":1173},"filePathRelative":"android-tutor/advanced/ring-control.md","localizedDate":"2023年5月22日","autoDesc":true}');export{s as comp,c as data};
