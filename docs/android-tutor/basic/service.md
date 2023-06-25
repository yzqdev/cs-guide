
# Android 服务（Services）
  
  :::tip
   一个服务（Service）是在后台运行的组件，无需与用户交互即可执行长时间运行的操作，即使应用程序被销毁，它也能工作。服务基本上可以有两种状态
  
  :::
  | 状态        | 描述                                                                                                                                                                        |
  | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | **Started** | 当应用程序组件(如activity)通过调用startService()启动服务时，服务将被启动。一旦启动，服务可以无限期地在后台运行，即使启动它的组件已被销毁。                                  |
  | **Bound**   | 当应用程序组件通过调用bindService()绑定到服务时，服务被绑定。绑定服务提供客户机-服务器接口，允许组件与服务交互、发送请求、获取结果，甚至通过进程间通信(IPC)跨进程进行交互。 |
  
  服务具有生命周期回调方法，您可以实施这些方法来监视服务状态的变化，并且可以在适当的阶段执行工作。左图显示了使用startService()创建服务时的生命周期，右图显示了使用bindService()创建服务时的生命周期：（图片由android.com提供）
  
  ![service](https://www.jc2182.com/images/android/service.jpg)
  
  要创建服务，请创建一个Java类，该类扩展了Service基类或其现有子类之一。该服务基类定义的各种回调方法和最重要的如下。您不需要实现所有的回调方法。但是，重要的是，您必须了解每一个，并实施那些确保您的应用程序符合用户期望的行为。
  
  | 回调方法             | 描述                                                                                                                                                                                                             |
  | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | **onStartCommand()** | 当另一个组件（例如activity）通过调用startService()请求启动服务时，系统将调用此方法。如果实现此方法，则有责任通过调用stopSelf()或stopService()方法在服务完成后停止服务。                                          |
  | **onBind()**         | 当另一个组件希望通过调用bindService()与服务绑定时，系统将调用此方法。如果实现此方法，则必须通过返回IBinder对象，提供客户端用于与服务进行通信的接口。您必须始终实现此方法，但是如果您不想允许绑定，则应返回null。 |
  | **onUnbind()**       | 当所有客户端都已与服务发布的特定接口断开连接时，系统将调用此方法。                                                                                                                                               |
  | **onRebind()**       | 在新的客户端已连接到该服务之后，系统已在先前通知所有客户端已断开其onUnbind（Intent）的连接之后，调用此方法。                                                                                                     |
  | **onCreate()**       | 首次使用onStartCommand()或onBind()创建服务时，系统会调用此方法。进行一次设置需要此呼叫。                                                                                                                         |
  | **onDestroy()**      | 当不再使用该服务并将其销毁时，系统将调用此方法。您的服务应实现此功能，以清理所有资源，例如线程，注册的侦听器，接收器等。                                                                                         |
  
## 实例
  
  以下框架服务演示了每种生命周期方法
  
```java
  
  
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
```
  
  本示例将引导您完成一些简单的步骤，以展示如何创建自己的Android服务。请按照以下步骤修改我们在[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中创建的Android应用程序-
  
  1. 您将使用Android Studio IDE创建一个Android应用程序，并将其命名为HelloWrold，位于 com.jc2182.helloworld 程序包下。
  2. 修改主activity文件MainActivity.java以添加**startService()**和**stopService()**方法。
  3. 在com.jc2182.helloworld包下创建一个新的Java文件MyService.java。该文件将实现与Android服务相关的方法。
  4. 使用<service ... />标签在AndroidManifest.xml文件中定义您的服务。一个应用程序可以具有一个或多个服务，而没有任何限制。
  5. 修改res/layout/activity_main.xml文件的默认内容，以在线性布局中两个按钮。
  6. 无需更改res/values/strings.xml文件中的任何常量。Android Studio处理字符串值
  7. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件MainActivity.java的内容。该文件可以包括每个基本生命周期方法。我们添加了startService()和stopService()方法来启动和停止服务。
  
```java
  
  
  import androidx.appcompat.app.AppCompatActivity;
  
  import android.content.Intent;
  import android.os.Bundle;
  import android.util.Log;
  import android.view.View;
  
  public class MainActivity extends AppCompatActivity {
  
      String msg = "Android : ";
  
      /** 在第一次创建activity时调用。 */
      @Override
      public void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          Log.d(msg, "onCreate() 事件被调用。");
      }
  
      public void startService(View view) {
          startService(new Intent(getBaseContext(), HelloService.class));
      }
  
      // 停止服务
      public void stopService(View view) {
          stopService(new Intent(getBaseContext(), HelloService.class));
      }
  }
```
  
  以下是HellowService.java的内容。该文件可以根据要求实现与服务相关联的一种或多种方法。现在，我们将仅实现两种方法onStartCommand()和onDestroy() -
  
```java
  
  
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
          Toast.makeText(this, "服务启动。", Toast.LENGTH_LONG).show();
          return START_STICKY;
      }
  
      @Override
      public void onDestroy() {
          super.onDestroy();
          Toast.makeText(this, "服务销毁。", Toast.LENGTH_LONG).show();
      }
  }
```
  
  以下将修改AndroidManifest.xml文件的内容。在这里我们添加了`<service ... />`标签以包括我们的服务-
  
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
  
          <service
              android:name=".HelloService"
              android:enabled="true"
              android:exported="true"></service>
      </application>
  
  </manifest>
```
  
以下是res/layout/activity_main.xml文件的内容，其中包括两个按钮-
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:tools="http://schemas.android.com/tools"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      xmlns:app="http://schemas.android.com/apk/res-auto"
      android:paddingLeft="@dimen/activity_horizontal_margin"
      android:paddingRight="@dimen/activity_horizontal_margin"
      android:paddingTop="@dimen/activity_vertical_margin"
      android:paddingBottom="@dimen/activity_vertical_margin"
      tools:context=".MainActivity">
 
  <TextView
      android:id="@+id/textView1"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_alignParentTop="true"
      android:layout_centerHorizontal="true"
      android:layout_marginTop="43dp"
      android:text="services 例子"
      android:textSize="30dp"
      tools:ignore="MissingConstraints"
      tools:layout_editor_absoluteX="109dp"
      tools:layout_editor_absoluteY="48dp" />

  <TextView
      android:id="@+id/textView2"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_above="@+id/imageButton"
      android:layout_centerHorizontal="true"
      android:layout_marginBottom="96dp"
      android:text="蝴蝶教程 "
      android:textColor="#ff87ff09"
      android:textSize="30dp"
      tools:ignore="MissingConstraints"
      tools:layout_editor_absoluteX="162dp"
      tools:layout_editor_absoluteY="121dp" />

  <ImageButton
      android:id="@+id/imageButton"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_centerHorizontal="true"
      android:layout_centerVertical="true"
      android:src="@drawable/logo"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      tools:layout_editor_absoluteY="196dp"
      tools:ignore="MissingConstraints" />

  <Button
      android:id="@+id/button2"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_below="@+id/imageButton"
      android:layout_centerHorizontal="true"
      android:layout_marginTop="16dp"
      android:onClick="startService"
      android:text="启动服务"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      tools:ignore="MissingConstraints"
      tools:layout_editor_absoluteY="397dp" />

  <Button
      android:id="@+id/button"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_below="@+id/button2"
      android:layout_alignStart="@+id/button2"
      android:layout_alignLeft="@+id/button2"
      android:layout_alignEnd="@+id/button2"
      android:layout_alignRight="@+id/button2"
      android:layout_centerHorizontal="true"
      android:layout_marginStart="0dp"
      android:layout_marginLeft="0dp"
      android:layout_marginTop="47dp"
      android:layout_marginEnd="0dp"
      android:layout_marginRight="0dp"
      android:onClick="stopService"
      android:text="停止服务"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      tools:ignore="MissingConstraints"
      tools:layout_editor_absoluteY="326dp" />
 

</RelativeLayout>
```

让我们尝试运行修改后的Hello World！我们刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后点击Android StudioRun图标工具栏中的“运行” 图标。Android Studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

![service](https://www.jc2182.com/images/android/service1.png)

现在启动服务，让我们单击“启动服务”按钮，这将启动服务，并且按照我们在onStartCommand()方法中的编程，一条消息“服务启动。”将出现在模拟器的底部，如下所示：

![service](https://www.jc2182.com/images/android/service2.png)

要停止服务，您可以单击停止服务按钮。出现如下图示：

![servi](https://www.jc2182.com/images/android/service3.png)
