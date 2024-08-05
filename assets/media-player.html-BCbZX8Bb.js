import{_ as t,c as o,o as n,d as e}from"./app-CbULZrmi.js";const a={},i=e(`<h1 id="媒体播放器" tabindex="-1"><a class="header-anchor" href="#媒体播放器"><span>媒体播放器</span></a></h1><p>Android提供了许多方法来控制音频/视频文件和流的播放。一种方法是通过称为<strong>MediaPlayer</strong>的类。Android提供了MediaPlayer类来访问内置的媒体播放器服务，例如播放音频，视频等。为了使用<strong>MediaPlayer</strong>，我们必须调用此类的静态方法<strong>create()</strong>。此方法返回<strong>MediaPlayer</strong>类的实例。它的语法如下-</p><pre><code class="language-java">  MediaPlayer mediaPlayer = MediaPlayer.create(this, R.raw.media);
</code></pre><p>第二个参数是您要播放的媒体资源。您必须在项目下创建一个名为raw的新文件夹，并将媒体资源文件放入其中。创建Mediaplayer对象后，您可以调用一些方法来启动或停止播放。这些方法在下面列出。</p><pre><code class="language-java">  mediaPlayer.start();
  mediaPlayer.pause();
</code></pre><p>在调用start()方法时，音乐将从头开始播放。如果在pause()方法之后再次调用此方法，则音乐将从左端开始播放，而不是从头开始。为了从头开始播放音乐，您必须调用reset()方法。其语法如下。</p><pre><code class="language-java">  mediaPlayer.reset();
</code></pre><p>除了start和pause方法外，此类还提供了其他方法来更好地处理音频/视频文件。这些方法在下面列出-</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>isPlaying()</strong></td><td>此方法仅返回true / false，指示歌曲是否正在播放</td></tr><tr><td><strong>seekTo(position)</strong></td><td>此方法需要一个整数，并将歌曲移动到该特定位置（毫秒）</td></tr><tr><td><strong>getCurrentPosition()</strong></td><td>此方法以毫秒为单位返回歌曲的当前位置</td></tr><tr><td><strong>getDuration()</strong></td><td>此方法返回歌曲的总持续时间（以毫秒为单位）</td></tr><tr><td><strong>reset()</strong></td><td>此方法重置媒体播放器</td></tr><tr><td><strong>release()</strong></td><td>此方法释放与MediaPlayer对象关联的所有资源</td></tr><tr><td><strong>setVolume(float leftVolume, float rightVolume)</strong></td><td>此方法设置此播放器的调低音量</td></tr><tr><td><strong>setDataSource(FileDescriptor fd)</strong></td><td>此方法设置音频/视频文件的数据源</td></tr><tr><td><strong>selectTrack(int index)</strong></td><td>此方法采用整数，然后从该特定索引的列表中选择轨道</td></tr><tr><td><strong>getTrackInfo()</strong></td><td>此方法返回轨道信息数</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>这是演示登录应用程序的示例。它创建一个基本的应用程序，仅给您三种尝试登录应用程序的机会。 要试验该示例，您可以在实际设备或仿真器上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加MediaPlayer代码。</li><li>修改res/layout/activity_main以添加相应的XML组件</li><li>在MediaPlayer下创建一个名称为raw的新文件夹，并在其中放置一个名称为.mp3的mp3音乐文件。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.media.MediaPlayer;
  import android.os.Bundle;
  import android.os.Handler;
  import android.view.View;
  import android.widget.Button;
  import android.widget.ImageView;
  import android.widget.SeekBar;
  import android.widget.TextView;
  import android.widget.Toast;
  
  import java.util.concurrent.TimeUnit;

  public class MainActivity extends Activity {

      private Button b1,b2,b3,b4;
      private ImageView iv;
      private MediaPlayer mediaPlayer;
    
      private double startTime = 0;
      private double finalTime = 0;
    
      private Handler myHandler = new Handler();;
      private int forwardTime = 5000;
      private int backwardTime = 5000;
      private SeekBar seekbar;
      private TextView tx1,tx2,tx3;
    
      public static int oneTimeOnly = 0;
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          b1 = (Button) findViewById(R.id.button);
          b2 = (Button) findViewById(R.id.button2);
          b3 = (Button)findViewById(R.id.button3);
          b4 = (Button)findViewById(R.id.button4);
          iv = (ImageView)findViewById(R.id.imageView);
    
          tx1 = (TextView)findViewById(R.id.textView2);
          tx2 = (TextView)findViewById(R.id.textView3);
          tx3 = (TextView)findViewById(R.id.textView4);
          tx3.setText(&quot;demo.mp3&quot;);
    
          mediaPlayer = MediaPlayer.create(this, R.raw.demo);
          seekbar = (SeekBar)findViewById(R.id.seekBar);
          seekbar.setClickable(false);
          b2.setEnabled(false);
    
          b3.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  Toast.makeText(getApplicationContext(), &quot;播放音频&quot;,Toast.LENGTH_SHORT).show();
                          mediaPlayer.start();
    
                  finalTime = mediaPlayer.getDuration();
                  startTime = mediaPlayer.getCurrentPosition();
    
                  if (oneTimeOnly == 0) {
                      seekbar.setMax((int) finalTime);
                      oneTimeOnly = 1;
                  }
    
                  tx2.setText(String.format(&quot;%d min, %d sec&quot;,
                          TimeUnit.MILLISECONDS.toMinutes((long) finalTime),
                          TimeUnit.MILLISECONDS.toSeconds((long) finalTime) - TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS.toMinutes((long) finalTime)))
                  );
    
                  tx1.setText(String.format(&quot;%d min, %d sec&quot;,
                          TimeUnit.MILLISECONDS.toMinutes((long) startTime),
                          TimeUnit.MILLISECONDS.toSeconds((long) startTime) - TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS.toMinutes((long)
                                          startTime)))
                  );
    
                  seekbar.setProgress((int)startTime);
                  myHandler.postDelayed(UpdateSongTime,100);
                  b2.setEnabled(true);
                  b3.setEnabled(false);
              }
          });
    
          b2.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  Toast.makeText(getApplicationContext(), &quot;暂停音频&quot;,Toast.LENGTH_SHORT).show();
                  mediaPlayer.pause();
                  b2.setEnabled(false);
                  b3.setEnabled(true);
              }
          });
    
          b1.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  int temp = (int)startTime;
    
                  if((temp+forwardTime)&lt;=finalTime){
                      startTime = startTime + forwardTime;
                      mediaPlayer.seekTo((int) startTime);
                      Toast.makeText(getApplicationContext(),&quot;您向前跳了5秒&quot;,Toast.LENGTH_SHORT).show();
                  }else{
                      Toast.makeText(getApplicationContext(),&quot;无法向前跳5秒&quot;,Toast.LENGTH_SHORT).show();
                  }
              }
          });
    
          b4.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  int temp = (int)startTime;
    
                  if((temp-backwardTime)&gt;0){
                      startTime = startTime - backwardTime;
                      mediaPlayer.seekTo((int) startTime);
                      Toast.makeText(getApplicationContext(),&quot;您向后跳了5秒&quot;,Toast.LENGTH_SHORT).show();
                  }else{
                      Toast.makeText(getApplicationContext(),&quot;无法向后跳5秒&quot;,Toast.LENGTH_SHORT).show();
                  }
              }
          });
      }
    
      private Runnable UpdateSongTime = new Runnable() {
          public void run() {
              startTime = mediaPlayer.getCurrentPosition();
              tx1.setText(String.format(&quot;%d min, %d sec&quot;,
                      TimeUnit.MILLISECONDS.toMinutes((long) startTime),
                      TimeUnit.MILLISECONDS.toSeconds((long) startTime) - TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS. toMinutes((long) startTime)))
              );
              seekbar.setProgress((int)startTime);
              myHandler.postDelayed(this, 100);
          }
      };

  }

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot; android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;

    &lt;TextView
        android:id=&quot;@+id/textview&quot;
        android:layout_width=&quot;239dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;13dp&quot;
        android:text=&quot;音频播放&quot;
        android:textSize=&quot;35dp&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView&quot;
        android:layout_width=&quot;261dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/textview&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;6dp&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:textColor=&quot;#ff7aff24&quot;
        android:textSize=&quot;35dp&quot; /&gt;

    &lt;ImageView
        android:id=&quot;@+id/imageView&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;129dp&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;20dp&quot;
        android:background=&quot;#22112200&quot;
        android:src=&quot;@drawable/logo&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;51dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignParentStart=&quot;true&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:layout_alignParentBottom=&quot;true&quot;
        android:text=&quot;@string/forward&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button2&quot;
        android:layout_width=&quot;59dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignLeft=&quot;@+id/imageView&quot;
        android:layout_alignParentBottom=&quot;true&quot;
        android:layout_marginLeft=&quot;39dp&quot;
        android:layout_marginBottom=&quot;4dp&quot;
        android:text=&quot;@string/pause&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button3&quot;
        android:layout_width=&quot;117dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignTop=&quot;@+id/button2&quot;
        android:layout_marginStart=&quot;73dp&quot;
        android:layout_marginLeft=&quot;73dp&quot;
        android:layout_marginTop=&quot;3dp&quot;
        android:layout_toEndOf=&quot;@+id/button2&quot;
        android:layout_toRightOf=&quot;@+id/button2&quot;
        android:text=&quot;@string/back&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button4&quot;
        android:layout_width=&quot;145dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignTop=&quot;@+id/button3&quot;
        android:layout_alignParentBottom=&quot;true&quot;
        android:layout_marginStart=&quot;76dp&quot;
        android:layout_marginLeft=&quot;76dp&quot;
        android:layout_marginTop=&quot;3dp&quot;
        android:layout_marginBottom=&quot;0dp&quot;
        android:layout_toEndOf=&quot;@+id/button3&quot;
        android:layout_toRightOf=&quot;@+id/button3&quot;
        android:text=&quot;@string/rewind&quot; /&gt;

    &lt;SeekBar
        android:id=&quot;@+id/seekBar&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_above=&quot;@+id/button&quot;
        android:layout_alignStart=&quot;@+id/textview&quot;
        android:layout_alignLeft=&quot;@+id/textview&quot;
        android:layout_alignEnd=&quot;@+id/textview&quot;
        android:layout_alignRight=&quot;@+id/textview&quot;
        android:layout_marginStart=&quot;12dp&quot;
        android:layout_marginLeft=&quot;12dp&quot;
        android:layout_marginEnd=&quot;-6dp&quot;
        android:layout_marginRight=&quot;-6dp&quot;
        android:layout_marginBottom=&quot;120dp&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView2&quot;
        android:layout_width=&quot;105dp&quot;
        android:layout_height=&quot;39dp&quot;
        android:layout_above=&quot;@+id/seekBar&quot;
        android:layout_marginEnd=&quot;-30dp&quot;
        android:layout_marginRight=&quot;-30dp&quot;
        android:layout_marginBottom=&quot;8dp&quot;
        android:layout_toStartOf=&quot;@+id/textView&quot;
        android:layout_toLeftOf=&quot;@+id/textView&quot;
        android:text=&quot;Small Text&quot;
        android:textAppearance=&quot;?android:attr/textAppearanceSmall&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView3&quot;
        android:layout_width=&quot;57dp&quot;
        android:layout_height=&quot;35dp&quot;
        android:layout_above=&quot;@+id/seekBar&quot;
        android:layout_alignEnd=&quot;@+id/button4&quot;
        android:layout_alignRight=&quot;@+id/button4&quot;
        android:layout_marginEnd=&quot;17dp&quot;
        android:layout_marginRight=&quot;17dp&quot;
        android:layout_marginBottom=&quot;120dp&quot;
        android:text=&quot;Small Text&quot;
        android:textAppearance=&quot;?android:attr/textAppearanceSmall&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:textAppearance=&quot;?android:attr/textAppearanceMedium&quot;
        android:text=&quot;Medium Text&quot;
        android:id=&quot;@+id/textView4&quot;
        android:layout_alignBaseline=&quot;@+id/textView2&quot;
        android:layout_alignBottom=&quot;@+id/textView2&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">&lt;resources&gt;
    &lt;string name=&quot;app_name&quot;&gt;Demo&lt;/string&gt;
    &lt;string name=&quot;back&quot;&gt;&lt;![CDATA[&lt;]]&gt;&lt;/string&gt;
    &lt;string name=&quot;rewind&quot;&gt;&lt;![CDATA[&lt;&lt;]]&gt;&lt;/string&gt;
    &lt;string name=&quot;forward&quot;&gt;&lt;![CDATA[&gt;&gt;]]&gt;&lt;/string&gt;
    &lt;string name=&quot;pause&quot;&gt;||&lt;/string&gt;
&lt;/resources&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/mediaplayer1.png" alt=""></p><p>尝试去点击按钮查看效果</p>`,21),d=[i];function r(u,l){return n(),o("div",null,d)}const q=t(a,[["render",r],["__file","media-player.html.vue"]]),p=JSON.parse('{"path":"/android-tutor/advanced/media-player.html","title":"媒体播放器","lang":"zh-CN","frontmatter":{"description":"媒体播放器 Android提供了许多方法来控制音频/视频文件和流的播放。一种方法是通过称为MediaPlayer的类。Android提供了MediaPlayer类来访问内置的媒体播放器服务，例如播放音频，视频等。为了使用MediaPlayer，我们必须调用此类的静态方法create()。此方法返回MediaPlayer类的实例。它的语法如下- 第二个参...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/media-player.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"媒体播放器"}],["meta",{"property":"og:description","content":"媒体播放器 Android提供了许多方法来控制音频/视频文件和流的播放。一种方法是通过称为MediaPlayer的类。Android提供了MediaPlayer类来访问内置的媒体播放器服务，例如播放音频，视频等。为了使用MediaPlayer，我们必须调用此类的静态方法create()。此方法返回MediaPlayer类的实例。它的语法如下- 第二个参..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/mediaplayer1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"媒体播放器\\",\\"image\\":[\\"https://www.jc2182.com/images/android/mediaplayer1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":5.46,"words":1638},"filePathRelative":"android-tutor/advanced/media-player.md","localizedDate":"2023年5月22日","autoDesc":true}');export{q as comp,p as data};
