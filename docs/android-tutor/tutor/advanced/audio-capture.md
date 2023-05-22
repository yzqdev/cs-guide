# 音频捕获
  
  Android具有内置麦克风，您可以通过它捕获音频并将其存储或在手机中播放。有很多方法可以做到这一点，但是最常见的方法是通过MediaRecorder类。Android提供了MediaRecorder类来记录音频或视频。为了使用MediaRecorder类，您将首先创建MediaRecorder类的实例。其语法如下。
  
```java
  MediaRecorder myAudioRecorder = new MediaRecorder();
```
  
  现在，您将设置source，输出和编码格式以及输出文件。它们的语法在下面给出。
  
```java
  myAudioRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
  myAudioRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
  myAudioRecorder.setAudioEncoder(MediaRecorder.OutputFormat.AMR_NB);
  myAudioRecorder.setOutputFile(outputFile);
```
  
  在指定音频源和格式及其输出文件之后，我们可以调用两种基本方法准备并开始开始录制音频。
  
```java
  myAudioRecorder.prepare();
  myAudioRecorder.start();
```
  
  除了这些方法之外，MediaRecorder类中还列出了其他方法，这些方法使您可以更好地控制音频和视频记录。
  
  | 方法                  | 说明                                     |
  | --------------------- | ---------------------------------------- |
  | **setAudioSource()**  | 此方法指定要录制的音频源                 |
  | **setVideoSource()**  | 此方法指定要录制的视频源                 |
  | **setOutputFormat()** | 此方法指定存储音频的音频格式             |
  | **setAudioEncoder()** | 此方法指定要使用的音频编码器             |
  | **setOutputFile()**   | 此方法配置将录制的音频存储到的文件的路径 |
  | **stop()**            | 此方法停止记录过程。                     |
  | **release()**         | 需要记录器实例时应调用此方法。           |
  
## 示例
  
  本示例演示MediaRecorder类捕获音频，然后MediaPlayer类播放记录的音频的演示。要试验此示例，您需要在实际设备上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以添加AudioCapture代码
  3. 修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。
  4. 修改AndroidManifest.xml以添加必要的权限。
  5. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  
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
      String RandomAudioFileName = "ABCDEFGHIJKLMNOP";
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
  
                      AudioSavePathInDevice =  Environment.getExternalStorageDirectory().getAbsolutePath() + "/" + CreateRandomAudioFileName(5) + "AudioRecording.3gp";
  
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
  
                      Toast.makeText(MainActivity.this, "录制开始", Toast.LENGTH_LONG).show();
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
  
                  Toast.makeText(MainActivity.this, "Recording Completed",
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
                  Toast.makeText(MainActivity.this, "Recording Playing",
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
          while(i < string ) {
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
                  if (grantResults.length> 0) {
                      boolean StoragePermission = grantResults[0] == PackageManager.PERMISSION_GRANTED;
                      boolean RecordPermission = grantResults[1] ==  PackageManager.PERMISSION_GRANTED;
  
                      if (StoragePermission && RecordPermission) {
                          Toast.makeText(MainActivity.this, "授予权限",
                                  Toast.LENGTH_LONG).show();
                      } else {
                          Toast.makeText(MainActivity.this,"拒绝权限",Toast.LENGTH_LONG).show();
                      }
                  }
                  break;
          }
      }
  
      public boolean checkPermission() {
          int result = ContextCompat.checkSelfPermission(getApplicationContext(), WRITE_EXTERNAL_STORAGE);
          int result1 = ContextCompat.checkSelfPermission(getApplicationContext(), RECORD_AUDIO);
          return result == PackageManager.PERMISSION_GRANTED &&  result1 == PackageManager.PERMISSION_GRANTED;
      }
  }
```
  
  以下是res/layout/activity_main.xml文件的内容-
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
      android:layout_width="match_parent"
      android:layout_height="match_parent" >
  
      <ImageView
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:id="@+id/imageView"
          android:layout_alignParentTop="true"
          android:layout_centerHorizontal="true"
          android:background="#22334422"
          android:src="@drawable/logo"/>
  
      <Button
          android:id="@+id/button"
          android:layout_width="124dp"
          android:layout_height="wrap_content"
          android:layout_below="@+id/imageView"
          android:layout_alignParentLeft="true"
          android:layout_marginTop="37dp"
          android:text="录音" />
  
      <Button
          android:id="@+id/button2"
          android:layout_width="85dp"
          android:layout_height="wrap_content"
          android:layout_alignTop="@+id/button"
          android:layout_centerHorizontal="true"
          android:text="停止" />
  
      <Button
          android:id="@+id/button3"
          android:layout_width="133dp"
          android:layout_height="wrap_content"
          android:layout_alignTop="@+id/button2"
          android:layout_alignParentEnd="true"
          android:layout_alignParentRight="true"
          android:text="播放" />
  
      <Button
          android:id="@+id/button4"
          android:layout_width="192dp"
          android:layout_height="wrap_content"
          android:layout_below="@+id/button2"
          android:layout_centerHorizontal="true"
          android:layout_marginTop="10dp"
          android:text="停止播放录音 " />
  </RelativeLayout>
```
  
  这是 AndroidManifest.xml 的代码。
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.jc2182.demo">
      <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
      <uses-permission android:name="android.permission.RECORD_AUDIO" />
      <uses-permission android:name="android.permission.STORAGE" />
  
      <application
          android:allowBackup="true"
          android:icon="@mipmap/ic_launcher"
          android:label="@string/app_name"
          android:roundIcon="@mipmap/ic_launcher_round"
          android:supportsRtl="true"
          android:theme="@style/AppTheme">
          <activity android:name=".MainActivity">
              <intent-filter>
                  <action android:name="android.intent.action.MAIN" />
  
                  <category android:name="android.intent.category.LAUNCHER" />
              </intent-filter>
          </activity>
  
      </application>
  
  </manifest>
```
  
  让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-
  
  ![](https://www.jc2182.com/images/android/audio1.png)
  
  您可以依次点击各个按钮来测试录音，播放的效果。
