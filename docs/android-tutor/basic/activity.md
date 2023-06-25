# activity

# Android Activity
  
  > Activity 代表具有用户界面的单个屏幕，就像Java的窗口或框架一样。Android Activity是ContextThemeWrapper类的子类。
  
  如果您使用过C，C ++或Java编程语言，那么您一定已经看到您的程序从main()函数开始。与之非常相似，Android系统以Activity来启动其程序，该Activity以对onCreate()回调方法的调用开始。有一系列启动Activity的回调方法和一系列拆除Activity的回调方法，如下面的Activity生命周期图所示：
  
  ![activity](https://www.jc2182.com/images/android/activity.jpg)
  
  Activity类定义以下回调，即事件。您不需要实现所有的回调方法。但是，重要的是，您必须了解每一个，并实施那些确保您的应用程序符合用户期望的行为。
  
  | 回调方法        | 描述                                                                                                               |
  | --------------- | ------------------------------------------------------------------------------------------------------------------ |
  | **onCreate()**  | 这是第一个回调，并在首次创建Activity时调用。                                                                       |
  | **onStart()**   | 当Activity对用户可见时，将调用此回调。                                                                             |
  | **onResume()**  | 当用户开始与应用程序交互时，将调用此方法。                                                                         |
  | **onPause()**   | 暂停的Activity不接收用户输入，并且无法执行任何代码，并且在当前Activity被暂停并且先前的Activity正在恢复时将被调用。 |
  | **onStop()**    | 当Activity不再可见时，将调用此回调。                                                                               |
  | **onDestroy()** | 在Activity销毁系统之前，将调用此回调。                                                                             |
  | **onRestart()** | Activity停止后重新启动时，将调用此回调。                                                                           |
  
## 实例
  
  本示例将带您通过简单的步骤来展示Android应用程序活动的生命周期。请按照以下步骤修改我们在[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中创建的Android应用程序-
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为HelloWorld，位于com.jc2182.helloworld包下。
  2. 修改主活动文件MainActivity.java，如下所述。其余文件保持不变。
  3. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.helloworld/MainActivity.java的内容。该文件包括每种基本生命周期方法。所述Log.d方法已经被用来生成日志消息-
  
```java
  
  
  import androidx.appcompat.app.AppCompatActivity;
  
  import android.os.Bundle;
  import android.util.Log;
  
  public class MainActivity extends AppCompatActivity {
  
      String msg = "Android : ";
  
      /** 在activity首次创建时调用。 */
      @Override
      public void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          Log.d(msg, "onCreate() 事件");
      }
  
      /** 当activity即将可见时调用。 */
      @Override
      protected void onStart() {
          super.onStart();
          Log.d(msg, "onStart() 事件");
      }
  
      /** 当activity变为可见时调用。 */
      @Override
      protected void onResume() {
          super.onResume();
          Log.d(msg, "onResume() 事件");
      }
  
      /** 在另一个activity获得焦点时调用。 */
      @Override
      protected void onPause() {
          super.onPause();
          Log.d(msg, " onPause() 事件");
      }
  
      /** 当activity不再可见时调用 */
      @Override
      protected void onStop() {
          super.onStop();
          Log.d(msg, "onStop() 事件");
      }
  
      /** 在活activity销毁之前调用。 */
      @Override
      public void onDestroy() {
          super.onDestroy();
          Log.d(msg, "onDestroy() 事件");
      }
  }
```
  
  Activity类使用项目的res/layout文件夹中可用的XML文件加载所有UI组件。以下语句从res/layout/activity_main.xml文件加载UI组件：
  
```java
  setContentView(R.layout.activity_main);
```
  
  一个应用程序可以具有一个或多个activity，而没有任何限制。您为应用程序定义的每个activity都必须在AndroidManifest.xml文件中声明，并且应用程序的main activity必须在清单中使用`<intent-filter>`声明，其中包括MAIN操作和LAUNCHER类别，如下所示：
  
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
      </application>
  
  </manifest>
```
  
  如果未为您的activity之一声明MAIN操作或LAUNCHER类别，则您的应用程序图标将不会出现在主屏幕的应用程序列表中。让我们尝试运行修改后的Hello World！我们刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的activity文件之一，然后Android Studio运行图标从工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示Emulator窗口，并且您应该在Android studio的LogCat窗口中看到以下日志消息-
  
```t4
  2020-07-07 16:21:59.664 8407-8407/com.jc2182.helloworld D/Android :: onCreate() 事件
  2020-07-07 16:21:59.671 8407-8407/com.jc2182.helloworld D/Android :: onStart() 事件
  2020-07-07 16:21:59.672 8407-8407/com.jc2182.helloworld D/Android :: onResume() 事件
```
  
  ![activity](https://www.jc2182.com/images/android/activity1.jpg)
  
  让我们尝试单击Android模拟器上的锁屏按钮，它将在Android studio的LogCat窗口中生成以下事件消息：
  
```t4
  2020-07-07 16:24:24.042 8407-8407/com.jc2182.helloworld D/Android ::  onPause() 事件
  2020-07-07 16:24:25.042 8407-8407/com.jc2182.helloworld D/Android ::  onStop() 事件
```
  
  让我们再次尝试在Android模拟器上解锁屏幕，它将在Android Studio的LogCat窗口中生成以下事件消息：
  
```t4
  2020-07-07 16:25:59.671 8407-8407/com.jc2182.helloworld D/Android :: onStart() 事件
  2020-07-07 16:25:59.672 8407-8407/com.jc2182.helloworld D/Android :: onResume() 事件
```
  
  接下来，让我们再次尝试Android后退按钮在Android仿真器上单击“后退”按钮，它将在Android Studio的LogCat窗口中生成以下事件消息，从而完成了Android应用程序的活动生命周期。
  
```t4
  2020-07-07 16:26:24.042 8407-8407/com.jc2182.helloworld D/Android ::  onPause() 事件
  2020-07-07 16:26:25.042 8407-8407/com.jc2182.helloworld D/Android ::  onStop() 事件
  2020-07-07 16:26:25.043 8407-8407/com.jc2182.helloworld D/Android ::  onDestroy() 事件
```
