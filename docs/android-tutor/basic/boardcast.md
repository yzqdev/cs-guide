# 广播接收器

## Android 广播接收器（Broadcast Receivers）

:::tip
 **广播接收器（Broadcast Receivers）**仅响应来自其他应用程序或系统本身的广播消息。这些消息有时称为事件或indent。例如，应用程序还可以启动广播，以使其他应用程序知道某些数据已下载到设备并可供他们使用，因此，这是广播接收器，它将拦截此通信并启动适当的操作。
:::
  要使**Broadcast Receiver**用于系统的广播意图，需要执行以下两个重要步骤-
  
- 创建广播接收器
- 注册广播接收器
  
  如果要实现您的自定义意图(indents)，还有另外一个步骤，那么您将必须创建并广播这些意图(indents)。
  
## 创建广播接收器
  
  广播接收器实现为**BroadcastReceiver**类的子类，并且重写**onReceive()**方法，在该方法中，每个消息均作为**Intent**对象参数接收。
  
```java
  public class MyReceiver extends BroadcastReceiver {
     @Override
     public void onReceive(Context context, Intent intent) {
        Toast.makeText(context, "Intent Detected.", Toast.LENGTH_LONG).show();
     }
  }
```
  
## 注册广播接收器
  
  应用程序通过在AndroidManifest.xml文件中注册广播接收器来侦听特定的广播意图(indent)。考虑一下，我们将为系统生成的事件**ACTION_BOOT_COMPLETED**注册MyReceiver，一旦Android系统完成启动过程，系统就会触发该事件。
  
  ![service](https://www.jc2182.com/images/android/broadcastreceiver.jpg)
  
```xml
  <application
     android:icon="@drawable/ic_launcher"
     android:label="@string/app_name"
     android:theme="@style/AppTheme" >
     <receiver android:name="MyReceiver">
  
        <intent-filter>
           <action android:name="android.intent.action.BOOT_COMPLETED">
           </action>
        </intent-filter>
  
     </receiver>
  </application>
```
  
  现在，每当您的Android设备启动时，它都会被BroadcastReceiver MyReceiver拦截，并且将执行onReceive()中的已实现逻辑。在Intent类中，有几个系统生成的事件定义为最终静态字段。下表列出了一些重要的系统事件。
  
  | 事件                                      | 描述                                                       |
  | ----------------------------------------- | ---------------------------------------------------------- |
  | **android.intent.action.BATTERY_CHANGED** | 粘滞广播，包含充电状态、电平和电池的其他信息。             |
  | **android.intent.action.BATTERY_LOW**     | 表示设备电量不足。                                         |
  | **android.intent.action.BATTERY_OKAY**    | 表示电池电量不足后现在是正常的。                           |
  | **android.intent.action.BOOT_COMPLETED**  | 这将在系统完成引导后广播一次。                             |
  | **android.intent.action.BUG_REPORT**      | 显示报告错误的活动。                                       |
  | **android.intent.action.CALL**            | 执行对数据指定的某人的调用。                               |
  | **android.intent.action.CALL_BUTTON**     | 用户按下“呼叫”按钮到拨号器或其他适当的用户界面来进行呼叫。 |
  | **android.intent.action.DATE_CHANGED**    | 日期改了。                                                 |
  | **android.intent.action.REBOOT**          | 让设备重新启动。                                           |
  
## 广播自定义意图(Indent)
  
  如果您希望应用程序本身应生成并发送自定义意图，则必须使用Activity类中的sendBroadcast()方法来创建并发送这些意图(Indent)。如果您使用sendStickyBroadcast(Intent)方法，则该Intent是粘性的，这意味着您要发送的Intent在广播完成后仍然存在。
  
```java
  public void broadcastIntent(View view) {
     Intent intent = new Intent();
     intent.setAction("com.jc2182.demo.CUSTOM_INTENT");
     sendBroadcast(intent);
  }
```
  
  这个意图com.jc2182.demo.CUSTOM_INTENT也可以通过类似于我们重新注册系统生成的意图的方式进行注册。
  
```xml
  <application
     android:icon="@drawable/ic_launcher"
     android:label="@string/app_name"
     android:theme="@style/AppTheme" >
     <receiver android:name="MyReceiver">
  
        <intent-filter>
           <action android:name="com.jc2182.demo.CUSTOM_INTENT">
           </action>
        </intent-filter>
  
     </receiver>
  </application>
```
  
## 示例
  
  本示例将向您说明如何创建BroadcastReceiver来拦截自定义意图。熟悉自定义意图后，即可对应用程序进行编程以拦截系统生成的意图。因此，让我们按照以下步骤修改我们在[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中创建的Android应用程序-
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为HelloWorld，位于com.jc2182.demo.helloworld包下。
  2. 修改主活动文件MainActivity.java以添加broadcastIntent()方法。
  3. 在com.jc2182.demo.helloworld包下创建一个名为MyReceiver.java的新Java文件， 以定义BroadcastReceiver。
  4. 应用程序可以处理一个或多个自定义和系统意图，而没有任何限制。您要拦截的每个意图都必须使用<receiver ... />标记注册到您的AndroidManifest.xml文件中
  5. 修改res/layout/activity_main.xml文件的默认内容，以包括一个用于广播意图的按钮。
  6. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件MainActivity.java的内容。该文件可以包括每个基本生命周期方法。我们添加了broadcastIntent()方法以广播自定义意图。
  
```java
  
  
  import androidx.appcompat.app.AppCompatActivity;
  
  import android.content.ComponentName;
  import android.content.Intent;
  import android.os.Bundle;
  import android.view.View;
  
  public class MainActivity extends AppCompatActivity {
```
  
```
  /** 在第一次创建activity时调用。 */
  @Override

  public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);
  }


  // 广播自定义意图。

  public void broadcastIntent(View view){
      Intent intent = new Intent();
      intent.setAction("com.test.CUSTOM_INTENT");
      // 这里ComponentName 第一个参数是 包名 ，第二个参数是广播接收器的类路径
      intent.setComponent(new ComponentName("com.jc2182.helloworld","com.jc2182.helloworld.MyReceiver"));
      sendBroadcast(intent);
  }
```

}

````


以下是MyReceiver.java的内容：

```java



import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

public class MyReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        Toast.makeText(context, "检测到意图。", Toast.LENGTH_LONG).show();
    }
}
````

以下将修改AndroidManifest.xml文件的内容 。在这里，我们添加了<receiver ... />标签以包括我们的广播接收器：

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.jc2182.helloworld">

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

        <receiver android:name=".MyReceiver" >
            <intent-filter>
                <action android:name="com.test.CUSTOM_INTENT">
                </action>
            </intent-filter>
        </receiver>

    </application>

</manifest>
```

以下是res/layout/activity_main.xml文件的内容，其中包括广播我们的自定义意图的按钮-

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin"
    tools:context=".MainActivity">


    <TextView
        android:id="@+id/textView1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Broadcast 例子"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:textSize="30dp" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="蝴蝶教程 "
        android:textColor="#ff87ff09"
        android:textSize="30dp"
        android:layout_above="@+id/imageButton"
        android:layout_centerHorizontal="true"
        android:layout_marginBottom="40dp" />

    <ImageButton
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageButton"
        android:src="@drawable/logo"
        android:layout_centerVertical="true"
        android:layout_centerHorizontal="true" />

    <Button
        android:id="@+id/button2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/imageButton"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="55dp"
        android:onClick="broadcastIntent"
        android:text="广播意图" />

</RelativeLayout>
```

让我们尝试运行修改后的Hello World！我们刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后点击Android StudioRun图标工具栏中的“运行” 图标。Android Studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

![service](https://www.jc2182.com/images/android/broadcastreceiver1.png)

现在启动广播接收器，让我们单击“广播意图”按钮，这将启动广播接收器，一条广播消息将出现在模拟器的底部，如下所示：
