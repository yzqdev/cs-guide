# 铃声控制
  
  您可以在Android中轻松控制铃声的音量和铃声配置文件，例如：（静音，振动，响亮等）。Android提供了AudioManager类，该类提供对这些控件的访问。为了使用**AndroidManager**类，您必须首先通过调用getSystemService()方法创建AudioManager类的对象。其语法如下。
  
```java
  private AudioManager myAudioManager;
  myAudioManager = (AudioManager)getSystemService(Context.AUDIO_SERVICE);  
```
  
  实例化AudioManager类的对象后，就可以使用setRingerMode方法设置设备的音频或铃声配置文件。其语法如下。
  
```java
  myAudioManager.setRingerMode(AudioManager.RINGER_MODE_VIBRATE);
```
  
  setRingerMode方法采用整数作为参数。对于每种模式，分配一个整数，以区分不同的模式。可能的模式是。
  
  | 模式                    | 说明                                 |
  | ----------------------- | ------------------------------------ |
  | **RINGER_MODE_VIBRATE** | 此模式将设备设置为振动模式。         |
  | **RINGER_MODE_NORMAL**  | 此模式将设备设置为正常（大声）模式。 |
  | **RINGER_MODE_SILENT**  | 此模式将设备设置为静音模式。         |
  
  设置模式后，可以调用getRingerMode()方法来获取系统的设置状态。其语法如下。
  
```java
  int mod = myAudioManager.getRingerMode();
```
  
  除了getRingerMode方法外，AudioManager类中还有其他方法可用于控制音量和其他模式。它们在下面列出。
  
  | 方法                                       | 说明                                   |
  | ------------------------------------------ | -------------------------------------- |
  | **adjustVolume(int direction, int flags)** | 此方法调整最相关流的音量               |
  | **getMode()**                              | 此方法返回当前的音频模式               |
  | **getStreamMaxVolume(int streamType)**     | 此方法返回特定流的最大音量索引         |
  | **getStreamVolume(int streamType)**        | 此方法返回特定流的当前体积索引         |
  | **isMusicActive()**                        | 此方法检查是否有任何音乐处于活动状态。 |
  | **startBluetoothSco()**                    | 此方法启动蓝牙SCO音频连接              |
  | **stopBluetoothSco()**                     | 此方法停止蓝牙SCO音频连接              |

- **
  
## 示例
  
  下面的示例演示AudioManager类的用法。它创建了一个应用程序，可让您为设备设置不同的铃声模式。要试验此示例，您需要在实际设备上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以添加AudioManager代码
  3. 修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。
  4. 修改AndroidManifest.xml以添加必要的权限。
  5. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  
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
                  Toast.makeText(MainActivity.this,"现在进入振动模式",
                          Toast.LENGTH_LONG).show();
              }
          });
    
          ring.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  myAudioManager.setRingerMode(AudioManager.RINGER_MODE_NORMAL);
                  Toast.makeText(MainActivity.this,"现在进入响铃模式",
                          Toast.LENGTH_LONG).show();
              }
          });
    
          silent.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  myAudioManager.setRingerMode(AudioManager.RINGER_MODE_SILENT);
                  Toast.makeText(MainActivity.this,"现在进入静音模式",
                          Toast.LENGTH_LONG).show();
              }
          });
    
          mode.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View v) {
                  int mod=myAudioManager.getRingerMode();
                  if(mod==AudioManager.RINGER_MODE_VIBRATE){
                      Toast.makeText(MainActivity.this,"现在进入振动模式",
                              Toast.LENGTH_LONG).show();
                  } else if(mod==AudioManager.RINGER_MODE_NORMAL){
                      Toast.makeText(MainActivity.this,"现在进入响铃模式",
                              Toast.LENGTH_LONG).show();
                  } else {
                      Toast.makeText(MainActivity.this,"现在进入静音模式",
                              Toast.LENGTH_LONG).show();
                  }
              }
          });
      }

  }

```

以下是res/layout/activity_main.xml文件的内容-

```xml

<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="403dp"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_alignParentRight="true"
        android:layout_marginTop="158dp"
        android:layout_marginRight="130dp"
        android:text="铃声控制示例"
        android:textSize="30dp" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="蝴蝶教程"
        android:id="@+id/textView2"
        android:textColor="#ff3eff0f"
        android:textSize="35dp"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true" />

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageView"
        android:src="@drawable/logo"
        android:background="#33223311"
        android:layout_below="@+id/textView2"
        android:layout_alignLeft="@+id/textView2"
        android:layout_alignStart="@+id/textView2"
        android:layout_alignRight="@+id/textView2"
        android:layout_alignEnd="@+id/textView2" />

    <Button
        android:id="@+id/button"
        android:layout_width="79dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/imageView"
        android:layout_alignParentStart="true"
        android:layout_alignParentLeft="true"
        android:layout_marginTop="59dp"
        android:text="模式" />

    <Button
        android:id="@+id/button2"
        android:layout_width="97dp"
        android:layout_height="wrap_content"
        android:layout_alignTop="@+id/button"
        android:layout_centerHorizontal="true"
        android:text="响铃" />

    <Button
        android:id="@+id/button3"
        android:layout_width="98dp"
        android:layout_height="wrap_content"
        android:layout_alignTop="@+id/button2"
        android:layout_alignEnd="@+id/textView"
        android:layout_alignRight="@+id/textView"
        android:text="振动" />

    <Button
        android:id="@+id/button4"
        android:layout_width="92dp"
        android:layout_height="59dp"
        android:layout_below="@+id/button2"
        android:layout_alignStart="@+id/button2"
        android:layout_alignLeft="@+id/button2"
        android:layout_marginStart="-35dp"
        android:layout_marginLeft="-35dp"
        android:layout_marginTop="-40dp"
        android:text="静音" />
</RelativeLayout>
```

  让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

  ![](https://www.jc2182.com/images/android/ringer1.png)

  您可以依次点击各个按钮来测试铃声效果。
