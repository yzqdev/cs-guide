# 蓝牙
  
  在许多方法中，蓝牙是一种在两个不同设备之间发送或接收数据的方法。Android平台包括对蓝牙框架的支持，该框架允许设备与其他蓝牙设备无线交换数据。Android提供了蓝牙API来执行这些不同的操作。
  
- 扫描其他蓝牙设备
- 获取已配对设备的列表
- 通过服务发现连接到其他设备
  
  Android提供了**BluetoothAdapter**类来与蓝牙通信。通过调用静态方法**getDefaultAdapter()**创建此调用的对象。其语法如下。
  
```java
  private BluetoothAdapter BA;
  BA = BluetoothAdapter.getDefaultAdapter(); 
```
  
  为了启用设备的蓝牙，请使用以下蓝牙常量**ACTION_REQUEST_ENABLE**调用该意图。它的语法是。。
  
```java
  Intent turnOn = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
  startActivityForResult(turnOn, 0);       
```
  
  除了此常量之外，API还提供了其他常量来支持不同的任务。它们在下面列出。
  
  | 常量                            | 说明                                   |
  | ------------------------------- | -------------------------------------- |
  | **ACTION_REQUEST_DISCOVERABLE** | 该常数用于打开蓝牙的发现               |
  | **ACTION_STATE_CHANGED**        | 该常数将通知蓝牙状态已更改             |
  | **ACTION_FOUND**                | 此常数用于接收有关发现的每个设备的信息 |
  
  启用蓝牙后，可以通过调用**getBondedDevices()**方法获取已配对设备的列表。它返回一组蓝牙设备。它的语法是。
  
```java
  private Set<BluetoothDevice>pairedDevices;
  pairedDevices = BA.getBondedDevices();
```
  
  除了被阻止的设备外，API中还有其他方法可以更好地控制蓝牙。它们在下面列出。
  
  | 方法                     | 说明                                  |
  | ------------------------ | ------------------------------------- |
  | **enable()**             | 如果未启用，此方法将启用适配器        |
  | **isEnabled()**          | 如果启用了适配器，则此方法返回true    |
  | **disable()**            | 此方法禁用适配器                      |
  | **getName()**            | 此方法返回蓝牙适配器的名称            |
  | **setName(String name)** | 此方法更改蓝牙名称                    |
  | **getState()**           | 此方法返回蓝牙适配器的当前状态。      |
  | **startDiscovery()**     | 此方法将在120秒内启动蓝牙的发现过程。 |
  
## 示例
  
  此示例演示了BluetoothAdapter类的知识，该类可操作蓝牙并显示由蓝牙配对的设备的列表。要试验此示例，您需要在实际设备上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以添加代码
  3. 修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。
  4. 修改AndroidManifest.xml以添加必要的权限。
  5. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.bluetooth.BluetoothAdapter;
  import android.bluetooth.BluetoothDevice;
  import android.content.Intent;
  import android.os.Bundle;
  import android.util.Log;
  import android.view.View;
  import android.widget.ArrayAdapter;
  import android.widget.Button;
  import android.widget.ListView;
  import android.widget.Toast;
  
  import java.util.ArrayList;
  import java.util.Set;
  

public class MainActivity extends Activity {
 Button b1,b2,b3,b4;
 private BluetoothAdapter BA;
 private Set<bluetoothdevice> pairedDevices;
 ListView lv;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      b1 = (Button) findViewById(R.id.button);
      b2=(Button)findViewById(R.id.button2);
      b3=(Button)findViewById(R.id.button3);
      b4=(Button)findViewById(R.id.button4);

      BA = BluetoothAdapter.getDefaultAdapter();
      lv = (ListView)findViewById(R.id.listView);
  }

  public void on(View v){
      if (BA != null){  // 设备不支持蓝牙
          boolean isEnabled = BA.isEnabled();
          if (isEnabled) {
              Intent turnOn = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
              startActivityForResult(turnOn, 0);
              Toast.makeText(getApplicationContext(), "Turned on",Toast.LENGTH_LONG).show();
          } else {
              Toast.makeText(getApplicationContext(), "Already on", Toast.LENGTH_LONG).show();
          }
      }else {
          Log.i("Bluetooth:::", "Bluetooth not supported");
          // Show proper message here
          finish();
      }
  }

  public void off(View v){
      if (BA == null){
          Log.i("Bluetooth:::", "Bluetooth not supported");
          // Show proper message here
          finish();
      }
      BA.disable();
      Toast.makeText(getApplicationContext(), "Turned off" ,Toast.LENGTH_LONG).show();
  }


  public  void visible(View v){
      if (BA == null){
          Log.i("Bluetooth:::", "Bluetooth not supported");
          // Show proper message here
          finish();
      }
      Intent getVisible = new Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
      startActivityForResult(getVisible, 0);
  }


  public void list(View v){
      if (BA == null){
          Log.i("Bluetooth:::", "Bluetooth not supported");
          // Show proper message here
          finish();
      }
      pairedDevices = BA.getBondedDevices();

      ArrayList list = new ArrayList();

      for(BluetoothDevice bt : pairedDevices) list.add(bt.getName());
      Toast.makeText(getApplicationContext(), "Showing Paired Devices",Toast.LENGTH_SHORT).show();

      final ArrayAdapter adapter = new  ArrayAdapter(this,android.R.layout.simple_list_item_1, list);

      lv.setAdapter(adapter);
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
    tools:context=".MainActivity"
    android:transitionGroup="true">

    <TextView android:text="蓝牙示例"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/textview"
        android:textSize="35dp"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="蝴蝶教程"
        android:id="@+id/textView"
        android:layout_below="@+id/textview"
        android:layout_centerHorizontal="true"
        android:textColor="#ff7aff24"
        android:textSize="35dp" />

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageView"
        android:background="#22110033"
        android:src="@drawable/logo"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true"
        android:theme="@style/Base.TextAppearance.AppCompat" />

    <Button
        android:id="@+id/button"
        android:layout_width="98dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/imageView"
        android:layout_marginEnd="-48dp"
        android:layout_marginRight="-48dp"
        android:layout_toStartOf="@+id/imageView"
        android:layout_toLeftOf="@+id/imageView"
        android:clickable="true"
        android:onClick="on"
        android:text="打开" />

    <Button
        android:id="@+id/button2"
        android:layout_width="98dp"
        android:layout_height="wrap_content"
        android:layout_alignBottom="@+id/button"
        android:layout_centerHorizontal="true"
        android:layout_marginBottom="4dp"
        android:onClick="visible"
        android:text="可见" />

    <Button
        android:id="@+id/button3"
        android:layout_width="100dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/imageView"
        android:layout_marginStart="-51dp"
        android:layout_marginLeft="-51dp"
        android:layout_toEndOf="@+id/imageView"
        android:layout_toRightOf="@+id/imageView"
        android:onClick="list"
        android:text="设备列表" />

    <Button
        android:id="@+id/button4"
        android:layout_width="102dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/button"
        android:layout_alignParentStart="true"
        android:layout_alignParentLeft="true"
        android:onClick="off"
        android:text="关闭" />

    <ListView
        android:id="@+id/listView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/textView2"
        android:layout_alignStart="@+id/button"
        android:layout_alignLeft="@+id/button"
        android:layout_alignParentBottom="true"
        android:layout_centerHorizontal="true"
        android:layout_marginStart="3dp"
        android:layout_marginLeft="3dp"
        android:layout_marginTop="31dp"
        android:layout_marginBottom="-22dp" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="配对的设备："
        android:id="@+id/textView2"
        android:textColor="#ff34ff06"
        android:textSize="25dp"
        android:layout_below="@+id/button4"
        android:layout_alignLeft="@+id/listView"
        android:layout_alignStart="@+id/listView" />

</RelativeLayout>
````

以下是res/layout/activity_main.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.jc2182.demo">

    <uses-permission android:name="android.permission.BLUETOOTH"/>
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>

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

![](https://www.jc2182.com/images/android/bluetooth1.png)

您可以依次点击各个按钮来测试蓝牙的功能。
