import{_ as t,c as e,o as n,d as o}from"./app-CbULZrmi.js";const i={},a=o(`<h1 id="音频捕获" tabindex="-1"><a class="header-anchor" href="#音频捕获"><span>音频捕获</span></a></h1><p>Android具有内置麦克风，您可以通过它捕获音频并将其存储或在手机中播放。有很多方法可以做到这一点，但是最常见的方法是通过MediaRecorder类。Android提供了MediaRecorder类来记录音频或视频。为了使用MediaRecorder类，您将首先创建MediaRecorder类的实例。其语法如下。</p><pre><code class="language-java">  MediaRecorder myAudioRecorder = new MediaRecorder();
</code></pre><p>现在，您将设置source，输出和编码格式以及输出文件。它们的语法在下面给出。</p><pre><code class="language-java">  myAudioRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
  myAudioRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
  myAudioRecorder.setAudioEncoder(MediaRecorder.OutputFormat.AMR_NB);
  myAudioRecorder.setOutputFile(outputFile);
</code></pre><p>在指定音频源和格式及其输出文件之后，我们可以调用两种基本方法准备并开始开始录制音频。</p><pre><code class="language-java">  myAudioRecorder.prepare();
  myAudioRecorder.start();
</code></pre><p>除了这些方法之外，MediaRecorder类中还列出了其他方法，这些方法使您可以更好地控制音频和视频记录。</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>setAudioSource()</strong></td><td>此方法指定要录制的音频源</td></tr><tr><td><strong>setVideoSource()</strong></td><td>此方法指定要录制的视频源</td></tr><tr><td><strong>setOutputFormat()</strong></td><td>此方法指定存储音频的音频格式</td></tr><tr><td><strong>setAudioEncoder()</strong></td><td>此方法指定要使用的音频编码器</td></tr><tr><td><strong>setOutputFile()</strong></td><td>此方法配置将录制的音频存储到的文件的路径</td></tr><tr><td><strong>stop()</strong></td><td>此方法停止记录过程。</td></tr><tr><td><strong>release()</strong></td><td>需要记录器实例时应调用此方法。</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>本示例演示MediaRecorder类捕获音频，然后MediaPlayer类播放记录的音频的演示。要试验此示例，您需要在实际设备上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加AudioCapture代码</li><li>修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。</li><li>修改AndroidManifest.xml以添加必要的权限。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.content.pm.PackageManager;
  import android.media.MediaPlayer;
  import android.media.MediaRecorder;
  import android.os.Bundle;
  import android.os.Environment;
  import android.view.View;
  import android.widget.Button;
  import android.widget.Toast;
  
  import androidx.core.app.ActivityCompat;
  import androidx.core.content.ContextCompat;
  
  import java.io.IOException;
  import java.util.Random;
  import static android.Manifest.permission.RECORD_AUDIO;
  import static android.Manifest.permission.WRITE_EXTERNAL_STORAGE;
  
  public class MainActivity extends Activity {
      Button buttonStart, buttonStop, buttonPlayLastRecordAudio,buttonStopPlayingRecording ;
      String AudioSavePathInDevice = null;
      MediaRecorder mediaRecorder ;
      Random random ;
      String RandomAudioFileName = &quot;ABCDEFGHIJKLMNOP&quot;;
      public static final int RequestPermissionCode = 1;
      MediaPlayer mediaPlayer ;
  
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
  
          buttonStart = (Button) findViewById(R.id.button);
          buttonStop = (Button) findViewById(R.id.button2);
          buttonPlayLastRecordAudio = (Button) findViewById(R.id.button3);
          buttonStopPlayingRecording = (Button)findViewById(R.id.button4);
  
          buttonStop.setEnabled(false);
          buttonPlayLastRecordAudio.setEnabled(false);
          buttonStopPlayingRecording.setEnabled(false);
  
          random = new Random();
  
          buttonStart.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View view) {
  
                  if(checkPermission()) {
  
                      AudioSavePathInDevice =  Environment.getExternalStorageDirectory().getAbsolutePath() + &quot;/&quot; + CreateRandomAudioFileName(5) + &quot;AudioRecording.3gp&quot;;
  
                      MediaRecorderReady();
  
                      try {
                          mediaRecorder.prepare();
                          mediaRecorder.start();
                      } catch (IllegalStateException e) {
                          // TODO Auto-generated catch block
                          e.printStackTrace();
                      } catch (Exception e) {
                          // TODO Auto-generated catch block
                          e.printStackTrace();
                      }
  
                      buttonStart.setEnabled(false);
                      buttonStop.setEnabled(true);
  
                      Toast.makeText(MainActivity.this, &quot;录制开始&quot;, Toast.LENGTH_LONG).show();
                  } else {
                      requestPermission();
                  }
  
              }
          });
  
          buttonStop.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View view) {
                  mediaRecorder.stop();
                  buttonStop.setEnabled(false);
                  buttonPlayLastRecordAudio.setEnabled(true);
                  buttonStart.setEnabled(true);
                  buttonStopPlayingRecording.setEnabled(false);
  
                  Toast.makeText(MainActivity.this, &quot;Recording Completed&quot;,
                          Toast.LENGTH_LONG).show();
              }
          });
  
          buttonPlayLastRecordAudio.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View view) throws IllegalArgumentException,
                      SecurityException, IllegalStateException {
  
                  buttonStop.setEnabled(false);
                  buttonStart.setEnabled(false);
                  buttonStopPlayingRecording.setEnabled(true);
  
                  mediaPlayer = new MediaPlayer();
                  try {
                      mediaPlayer.setDataSource(AudioSavePathInDevice);
                      mediaPlayer.prepare();
                  } catch (IOException e) {
                      e.printStackTrace();
                  }
  
                  mediaPlayer.start();
                  Toast.makeText(MainActivity.this, &quot;Recording Playing&quot;,
                          Toast.LENGTH_LONG).show();
              }
          });
  
          buttonStopPlayingRecording.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View view) {
                  buttonStop.setEnabled(false);
                  buttonStart.setEnabled(true);
                  buttonStopPlayingRecording.setEnabled(false);
                  buttonPlayLastRecordAudio.setEnabled(true);
  
                  if(mediaPlayer != null){
                      mediaPlayer.stop();
                      mediaPlayer.release();
                      MediaRecorderReady();
                  }
              }
          });
  
      }
  
      public void MediaRecorderReady(){
          mediaRecorder=new MediaRecorder();
          mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
          mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
          mediaRecorder.setAudioEncoder(MediaRecorder.OutputFormat.AMR_NB);
          mediaRecorder.setOutputFile(AudioSavePathInDevice);
      }
  
      public String CreateRandomAudioFileName(int string){
          StringBuilder stringBuilder = new StringBuilder( string );
          int i = 0 ;
          while(i &lt; string ) {
              stringBuilder.append(RandomAudioFileName.
                      charAt(random.nextInt(RandomAudioFileName.length())));
  
              i++ ;
          }
          return stringBuilder.toString();
      }
  
      private void requestPermission() {
          ActivityCompat.requestPermissions(MainActivity.this, new String[]{WRITE_EXTERNAL_STORAGE, RECORD_AUDIO}, RequestPermissionCode);
      }
  
      @Override
      public void onRequestPermissionsResult(int requestCode,
                                             String permissions[], int[] grantResults) {
          switch (requestCode) {
              case RequestPermissionCode:
                  if (grantResults.length&gt; 0) {
                      boolean StoragePermission = grantResults[0] == PackageManager.PERMISSION_GRANTED;
                      boolean RecordPermission = grantResults[1] ==  PackageManager.PERMISSION_GRANTED;
  
                      if (StoragePermission &amp;&amp; RecordPermission) {
                          Toast.makeText(MainActivity.this, &quot;授予权限&quot;,
                                  Toast.LENGTH_LONG).show();
                      } else {
                          Toast.makeText(MainActivity.this,&quot;拒绝权限&quot;,Toast.LENGTH_LONG).show();
                      }
                  }
                  break;
          }
      }
  
      public boolean checkPermission() {
          int result = ContextCompat.checkSelfPermission(getApplicationContext(), WRITE_EXTERNAL_STORAGE);
          int result1 = ContextCompat.checkSelfPermission(getApplicationContext(), RECORD_AUDIO);
          return result == PackageManager.PERMISSION_GRANTED &amp;&amp;  result1 == PackageManager.PERMISSION_GRANTED;
      }
  }
</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
      android:layout_width=&quot;match_parent&quot;
      android:layout_height=&quot;match_parent&quot; &gt;
  
      &lt;ImageView
          android:layout_width=&quot;wrap_content&quot;
          android:layout_height=&quot;wrap_content&quot;
          android:id=&quot;@+id/imageView&quot;
          android:layout_alignParentTop=&quot;true&quot;
          android:layout_centerHorizontal=&quot;true&quot;
          android:background=&quot;#22334422&quot;
          android:src=&quot;@drawable/logo&quot;/&gt;
  
      &lt;Button
          android:id=&quot;@+id/button&quot;
          android:layout_width=&quot;124dp&quot;
          android:layout_height=&quot;wrap_content&quot;
          android:layout_below=&quot;@+id/imageView&quot;
          android:layout_alignParentLeft=&quot;true&quot;
          android:layout_marginTop=&quot;37dp&quot;
          android:text=&quot;录音&quot; /&gt;
  
      &lt;Button
          android:id=&quot;@+id/button2&quot;
          android:layout_width=&quot;85dp&quot;
          android:layout_height=&quot;wrap_content&quot;
          android:layout_alignTop=&quot;@+id/button&quot;
          android:layout_centerHorizontal=&quot;true&quot;
          android:text=&quot;停止&quot; /&gt;
  
      &lt;Button
          android:id=&quot;@+id/button3&quot;
          android:layout_width=&quot;133dp&quot;
          android:layout_height=&quot;wrap_content&quot;
          android:layout_alignTop=&quot;@+id/button2&quot;
          android:layout_alignParentEnd=&quot;true&quot;
          android:layout_alignParentRight=&quot;true&quot;
          android:text=&quot;播放&quot; /&gt;
  
      &lt;Button
          android:id=&quot;@+id/button4&quot;
          android:layout_width=&quot;192dp&quot;
          android:layout_height=&quot;wrap_content&quot;
          android:layout_below=&quot;@+id/button2&quot;
          android:layout_centerHorizontal=&quot;true&quot;
          android:layout_marginTop=&quot;10dp&quot;
          android:text=&quot;停止播放录音 &quot; /&gt;
  &lt;/RelativeLayout&gt;
</code></pre><p>这是 AndroidManifest.xml 的代码。</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
      package=&quot;com.jc2182.demo&quot;&gt;
      &lt;uses-permission android:name=&quot;android.permission.WRITE_EXTERNAL_STORAGE&quot;/&gt;
      &lt;uses-permission android:name=&quot;android.permission.RECORD_AUDIO&quot; /&gt;
      &lt;uses-permission android:name=&quot;android.permission.STORAGE&quot; /&gt;
  
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
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/audio1.png" alt=""></p><p>您可以依次点击各个按钮来测试录音，播放的效果。</p>`,21),r=[a];function d(u,c){return n(),e("div",null,r)}const l=t(i,[["render",d],["__file","audio-capture.html.vue"]]),p=JSON.parse('{"path":"/android-tutor/advanced/audio-capture.html","title":"音频捕获","lang":"zh-CN","frontmatter":{"description":"音频捕获 Android具有内置麦克风，您可以通过它捕获音频并将其存储或在手机中播放。有很多方法可以做到这一点，但是最常见的方法是通过MediaRecorder类。Android提供了MediaRecorder类来记录音频或视频。为了使用MediaRecorder类，您将首先创建MediaRecorder类的实例。其语法如下。 现在，您将设置sourc...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/audio-capture.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"音频捕获"}],["meta",{"property":"og:description","content":"音频捕获 Android具有内置麦克风，您可以通过它捕获音频并将其存储或在手机中播放。有很多方法可以做到这一点，但是最常见的方法是通过MediaRecorder类。Android提供了MediaRecorder类来记录音频或视频。为了使用MediaRecorder类，您将首先创建MediaRecorder类的实例。其语法如下。 现在，您将设置sourc..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/audio1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"音频捕获\\",\\"image\\":[\\"https://www.jc2182.com/images/android/audio1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":4.14,"words":1242},"filePathRelative":"android-tutor/advanced/audio-capture.md","localizedDate":"2023年5月22日","autoDesc":true}');export{l as comp,p as data};
