# 媒体播放器
  
  Android提供了许多方法来控制音频/视频文件和流的播放。一种方法是通过称为**MediaPlayer**的类。Android提供了MediaPlayer类来访问内置的媒体播放器服务，例如播放音频，视频等。为了使用**MediaPlayer**，我们必须调用此类的静态方法**create()**。此方法返回**MediaPlayer**类的实例。它的语法如下-
  
```java
  MediaPlayer mediaPlayer = MediaPlayer.create(this, R.raw.media);
```
  
  
  
  第二个参数是您要播放的媒体资源。您必须在项目下创建一个名为raw的新文件夹，并将媒体资源文件放入其中。创建Mediaplayer对象后，您可以调用一些方法来启动或停止播放。这些方法在下面列出。
  
```java
  mediaPlayer.start();
  mediaPlayer.pause();
```
  
  
  
  在调用start()方法时，音乐将从头开始播放。如果在pause()方法之后再次调用此方法，则音乐将从左端开始播放，而不是从头开始。为了从头开始播放音乐，您必须调用reset()方法。其语法如下。
  
```java
  mediaPlayer.reset();
```
  
  
  
  除了start和pause方法外，此类还提供了其他方法来更好地处理音频/视频文件。这些方法在下面列出-
  
  | 方法                                               | 说明                                                 |
  | -------------------------------------------------- | ---------------------------------------------------- |
  | **isPlaying()**                                    | 此方法仅返回true / false，指示歌曲是否正在播放       |
  | **seekTo(position)**                               | 此方法需要一个整数，并将歌曲移动到该特定位置（毫秒） |
  | **getCurrentPosition()**                           | 此方法以毫秒为单位返回歌曲的当前位置                 |
  | **getDuration()**                                  | 此方法返回歌曲的总持续时间（以毫秒为单位）           |
  | **reset()**                                        | 此方法重置媒体播放器                                 |
  | **release()**                                      | 此方法释放与MediaPlayer对象关联的所有资源            |
  | **setVolume(float leftVolume, float rightVolume)** | 此方法设置此播放器的调低音量                         |
  | **setDataSource(FileDescriptor fd)**               | 此方法设置音频/视频文件的数据源                      |
  | **selectTrack(int index)**                         | 此方法采用整数，然后从该特定索引的列表中选择轨道     |
  | **getTrackInfo()**                                 | 此方法返回轨道信息数                                 |


  
  ## 示例
  
  这是演示登录应用程序的示例。它创建一个基本的应用程序，仅给您三种尝试登录应用程序的机会。 要试验该示例，您可以在实际设备或仿真器上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以添加MediaPlayer代码。
  3. 修改res/layout/activity_main以添加相应的XML组件
  4. 在MediaPlayer下创建一个名称为raw的新文件夹，并在其中放置一个名称为.mp3的mp3音乐文件。
  5. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。
  
```java
  package com.jc2182.demo;
  
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
          tx3.setText("demo.mp3");
    
          mediaPlayer = MediaPlayer.create(this, R.raw.demo);
          seekbar = (SeekBar)findViewById(R.id.seekBar);
          seekbar.setClickable(false);
          b2.setEnabled(false);
    
          b3.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  Toast.makeText(getApplicationContext(), "播放音频",Toast.LENGTH_SHORT).show();
                          mediaPlayer.start();
    
                  finalTime = mediaPlayer.getDuration();
                  startTime = mediaPlayer.getCurrentPosition();
    
                  if (oneTimeOnly == 0) {
                      seekbar.setMax((int) finalTime);
                      oneTimeOnly = 1;
                  }
    
                  tx2.setText(String.format("%d min, %d sec",
                          TimeUnit.MILLISECONDS.toMinutes((long) finalTime),
                          TimeUnit.MILLISECONDS.toSeconds((long) finalTime) - TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS.toMinutes((long) finalTime)))
                  );
    
                  tx1.setText(String.format("%d min, %d sec",
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
                  Toast.makeText(getApplicationContext(), "暂停音频",Toast.LENGTH_SHORT).show();
                  mediaPlayer.pause();
                  b2.setEnabled(false);
                  b3.setEnabled(true);
              }
          });
    
          b1.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  int temp = (int)startTime;
    
                  if((temp+forwardTime)<=finalTime){
                      startTime = startTime + forwardTime;
                      mediaPlayer.seekTo((int) startTime);
                      Toast.makeText(getApplicationContext(),"您向前跳了5秒",Toast.LENGTH_SHORT).show();
                  }else{
                      Toast.makeText(getApplicationContext(),"无法向前跳5秒",Toast.LENGTH_SHORT).show();
                  }
              }
          });
    
          b4.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  int temp = (int)startTime;
    
                  if((temp-backwardTime)>0){
                      startTime = startTime - backwardTime;
                      mediaPlayer.seekTo((int) startTime);
                      Toast.makeText(getApplicationContext(),"您向后跳了5秒",Toast.LENGTH_SHORT).show();
                  }else{
                      Toast.makeText(getApplicationContext(),"无法向后跳5秒",Toast.LENGTH_SHORT).show();
                  }
              }
          });
      }
    
      private Runnable UpdateSongTime = new Runnable() {
          public void run() {
              startTime = mediaPlayer.getCurrentPosition();
              tx1.setText(String.format("%d min, %d sec",
                      TimeUnit.MILLISECONDS.toMinutes((long) startTime),
                      TimeUnit.MILLISECONDS.toSeconds((long) startTime) - TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS. toMinutes((long) startTime)))
              );
              seekbar.setProgress((int)startTime);
              myHandler.postDelayed(this, 100);
          }
      };

  }

```


以下是res/layout/activity_main.xml文件的内容-

```xml

<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textview"
        android:layout_width="239dp"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="13dp"
        android:text="音频播放"
        android:textSize="35dp" />

    <TextView
        android:id="@+id/textView"
        android:layout_width="261dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/textview"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="6dp"
        android:text="蝴蝶教程"
        android:textColor="#ff7aff24"
        android:textSize="35dp" />

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="wrap_content"
        android:layout_height="129dp"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="20dp"
        android:background="#22112200"
        android:src="@drawable/logo" />

    <Button
        android:id="@+id/button"
        android:layout_width="51dp"
        android:layout_height="wrap_content"
        android:layout_alignParentStart="true"
        android:layout_alignParentLeft="true"
        android:layout_alignParentBottom="true"
        android:text="@string/forward" />

    <Button
        android:id="@+id/button2"
        android:layout_width="59dp"
        android:layout_height="wrap_content"
        android:layout_alignLeft="@+id/imageView"
        android:layout_alignParentBottom="true"
        android:layout_marginLeft="39dp"
        android:layout_marginBottom="4dp"
        android:text="@string/pause" />

    <Button
        android:id="@+id/button3"
        android:layout_width="117dp"
        android:layout_height="wrap_content"
        android:layout_alignTop="@+id/button2"
        android:layout_marginStart="73dp"
        android:layout_marginLeft="73dp"
        android:layout_marginTop="3dp"
        android:layout_toEndOf="@+id/button2"
        android:layout_toRightOf="@+id/button2"
        android:text="@string/back" />

    <Button
        android:id="@+id/button4"
        android:layout_width="145dp"
        android:layout_height="wrap_content"
        android:layout_alignTop="@+id/button3"
        android:layout_alignParentBottom="true"
        android:layout_marginStart="76dp"
        android:layout_marginLeft="76dp"
        android:layout_marginTop="3dp"
        android:layout_marginBottom="0dp"
        android:layout_toEndOf="@+id/button3"
        android:layout_toRightOf="@+id/button3"
        android:text="@string/rewind" />

    <SeekBar
        android:id="@+id/seekBar"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_above="@+id/button"
        android:layout_alignStart="@+id/textview"
        android:layout_alignLeft="@+id/textview"
        android:layout_alignEnd="@+id/textview"
        android:layout_alignRight="@+id/textview"
        android:layout_marginStart="12dp"
        android:layout_marginLeft="12dp"
        android:layout_marginEnd="-6dp"
        android:layout_marginRight="-6dp"
        android:layout_marginBottom="120dp" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="105dp"
        android:layout_height="39dp"
        android:layout_above="@+id/seekBar"
        android:layout_marginEnd="-30dp"
        android:layout_marginRight="-30dp"
        android:layout_marginBottom="8dp"
        android:layout_toStartOf="@+id/textView"
        android:layout_toLeftOf="@+id/textView"
        android:text="Small Text"
        android:textAppearance="?android:attr/textAppearanceSmall" />

    <TextView
        android:id="@+id/textView3"
        android:layout_width="57dp"
        android:layout_height="35dp"
        android:layout_above="@+id/seekBar"
        android:layout_alignEnd="@+id/button4"
        android:layout_alignRight="@+id/button4"
        android:layout_marginEnd="17dp"
        android:layout_marginRight="17dp"
        android:layout_marginBottom="120dp"
        android:text="Small Text"
        android:textAppearance="?android:attr/textAppearanceSmall" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textAppearance="?android:attr/textAppearanceMedium"
        android:text="Medium Text"
        android:id="@+id/textView4"
        android:layout_alignBaseline="@+id/textView2"
        android:layout_alignBottom="@+id/textView2"
        android:layout_centerHorizontal="true" />

</RelativeLayout>
```

  

  以下是res/layout/activity_main.xml文件的内容-

```xml
<resources>
    <string name="app_name">Demo</string>
    <string name="back"><![CDATA[<]]></string>
    <string name="rewind"><![CDATA[<<]]></string>
    <string name="forward"><![CDATA[>>]]></string>
    <string name="pause">||</string>
</resources>
```

  

  让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

  ![](https://www.jc2182.com/images/android/mediaplayer1.png)

  尝试去点击按钮查看效果
