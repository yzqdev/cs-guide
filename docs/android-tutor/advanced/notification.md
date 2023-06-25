# 通知
  
  一个通知是可以显示到你的应用程序的正常UI的用户之外的消息。当您告诉系统发出通知时，它首先在通知区域中显示为图标。要查看通知的详细信息，用户可以打开通知抽屉。通知区域和通知抽屉都是用户可以随时查看的系统控制区域。
  
  Android **Toast**类提供了一种方便的方式来向用户显示警报，但问题是这些警报不是持久性的，这意味着警报在屏幕上闪烁几秒钟然后消失。
  
  要查看通知的详细信息，您将必须选择图标，该图标将显示包含有关通知的详细信息的通知面板。在虚拟设备上使用模拟器时，您必须单击屏幕顶部并向下拖动状态栏以展开它，这将为您提供以下详细信息。这将只有64 dp高，称为正常视图。
  
## 创建和发送通知
  
  您可以通过简单的方法来创建通知。在您的应用程序中按照以下步骤创建通知
  
  *第1步-创建通知生成器*
  
  第一步是使用 **Notification.Builder()**创建一个通知生成器。您将使用**Notification Builder**设置各种**Notification**属性，例如其大小图标，标题，优先级等。
  
```java
   Notification.Builder builder = new Notification.Builder(this);
```
  
  *第2步-设置通知属性*
  
  拥有**Builder**对象后，可以根据需要使用**Builder**对象设置其**Notification**属性。但这是强制性的，至少应设置-
  
- 一个小图标，由**setSmallIcon()**设置
- 标题，由**setContentTitle()**设置
- 详细信息文本，由**setContentText()**设置
- .............
  
```java
  builder.setContentInfo("内容信息")
                  .setContentText("通知内容")//设置通知内容
                  .setContentTitle("通知标题")//设置通知标题
                  .setLargeIcon(BitmapFactory.decodeResource(getResources(),R.mipmap.ic_launcher))
                  .setSmallIcon(R.mipmap.ic_launcher_round)//不能缺少的一个属性
                  .setSubText("Subtext")
                  .setTicker("滚动消息......")
                  .setWhen(System.currentTimeMillis());//设置通知时间，默认为系统发出通知的时间，通常不用设置
```
  
  您有很多可选属性，可以为通知设置。要了解有关它们的更多信息，请参阅**Notification.Builder**的参考文档。
  
  *步骤3-发出通知*
  
  最后，通过调用**NotificationManager.notify()**发送通知，将**Notification**对象传递给系统。通知它之前，请确保对构建器对象调用**NotificationCompat.Builder.build()**方法。此方法合并所有已设置的选项，并返回一个新的**Notification**对象。
  
```java
  Notification n = builder.build();
          //3、manager.notify()
  manager.notify(NOTIFICATION_ID,n);
```
  
## NotificationCompat.Builder类
  
  **NotificationCompat.Builder**类可让您更轻松地控制所有标志，并有助于构造典型的通知布局。以下是一些作为**NotificationCompat.Builder**类的一部分可用的重要且最常用的方法。
  
  | 方法                                                                     | 说明                                                               |
  | ------------------------------------------------------------------------ | ------------------------------------------------------------------ |
  | **Notification build()**                                                 | 合并所有已设置的选项，并返回一个新的Notification对象。             |
  | **NotificationCompat.Builder setAutoCancel (boolean autoCancel)**        | 设置此标志将使其生效，因此当用户在面板中单击它时，通知将自动取消。 |
  | **NotificationCompat.Builder setContent (RemoteViews views)**            | 提供自定义的RemoteViews代替标准的RemoteViews使用。                 |
  | **NotificationCompat.Builder setContentInfo (CharSequence info)**        | 在通知的右侧设置大文本。                                           |
  | **NotificationCompat.Builder setContentIntent (PendingIntent intent)**   | 提供单击通知时发送的PendingIntent。                                |
  | **NotificationCompat.Builder setContentText (CharSequence text)**        | 在标准通知中设置通知的文本（第二行）。                             |
  | **NotificationCompat.Builder setContentTitle (CharSequence title)**      | 在标准通知中设置通知的文本（第一行）。                             |
  | **NotificationCompat.Builder setDefaults (int defaults)**                | 设置将使用的默认通知选项。                                         |
  | **NotificationCompat.Builder setLargeIcon (Bitmap icon)**                | 设置股票消息和通知中显示的大图标。                                 |
  | **NotificationCompat.Builder setNumber (int number)**                    | 在通知的右侧设置较大的数字。                                       |
  | **NotificationCompat.Builder setOngoing (boolean ongoing)**              | 设置这是否是正在进行的通知。                                       |
  | **NotificationCompat.Builder setSmallIcon (int icon)**                   | 设置要在通知布局中使用的小图标。                                   |
  | **NotificationCompat.Builder setStyle (NotificationCompat.Style style)** | 添加丰富的通知样式以在构建时应用。                                 |
  | **NotificationCompat.Builder setTicker (CharSequence tickerText)**       | 设置第一次到达通知时在状态栏中显示的文本。                         |
  | **NotificationCompat.Builder setVibrate (long[] pattern)**               | 设置要使用的振动模式。                                             |
  | **NotificationCompat.Builder setWhen (long when)**                       | 设置事件发生的时间。面板中的通知此时已排序。                       |
  
## 通知示例演示
  
  1. 您将使用Android Studio IDE创建一个Android应用程序，并在com.example.demo包下将其命名为Demo。
  2. 修改src/MainActivity.java文件并添加一些组件
  3. 修改布局XML文件res/layout/activity_main.xml来定义一个界面。
  4. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.app.Notification;
  import android.app.NotificationChannel;
  import android.app.NotificationManager;
  import android.content.Context;
  import android.graphics.BitmapFactory;
  import android.graphics.Color;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  
  

public class MainActivity extends Activity {
 private static final int NOTIFICATION_ID = 1;
 Button b1;
 @Override
 protected void onCreate(Bundle savedInstanceState) {
 super.onCreate(savedInstanceState);
 setContentView(R.layout.activity_main);


      b1 = (Button)findViewById(R.id.button);
      b1.setOnClickListener(new View.OnClickListener() {
          @Override
          public void onClick(View v) {
              addNotification();
          }
      });
  }

  private void addNotification() {
      //1、NotificationManager
      NotificationManager manager = (NotificationManager)getSystemService(Context.NOTIFICATION_SERVICE);
      /** 2、Builder->Notification         *  必要属性有三项         *  小图标，通过 setSmallIcon() 方法设置         *  标题，通过 setContentTitle() 方法设置         *  内容，通过 setContentText() 方法设置*/
      Notification.Builder builder = new Notification.Builder(this);
      builder.setContentInfo("内容信息")
              .setContentText("通知内容")//设置通知内容
              .setContentTitle("通知标题")//设置通知标题
              .setLargeIcon(BitmapFactory.decodeResource(getResources(),R.mipmap.ic_launcher))
              .setSmallIcon(R.mipmap.ic_launcher_round)//不能缺少的一个属性
              .setSubText("Subtext")
              .setTicker("滚动消息......")
              .setWhen(System.currentTimeMillis());//设置通知时间，默认为系统发出通知的时间，通常不用设置

      if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {  // 这里的判断是为了兼容更高版本的API (O // 26)
          NotificationChannel channel = new NotificationChannel("001","my_channel",NotificationManager.IMPORTANCE_DEFAULT);
          channel.enableLights(true); //是否在桌面icon右上角展示小红点
          channel.setLightColor(Color.GREEN); //小红点颜色
          channel.setShowBadge(true); //是否在久按桌面图标时显示此渠道的通知
          manager.createNotificationChannel(channel);
          builder.setChannelId("001");
      }

      Notification n = builder.build();
      //3、manager.notify()
      manager.notify(NOTIFICATION_ID,n);


  }


}

```

以下是res/layout/activity_main.xml文件的内容-

```xml

<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="MainActivity">

    <TextView
        android:id="@+id/textView1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="通知示例"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:textSize="30sp" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="蝴蝶教程"
        android:textColor="#ff87ff09"
        android:textSize="30sp"
        android:layout_below="@+id/textView1"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="48dp" />

    <ImageButton
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageButton"
        android:src="@drawable/logo"
        android:layout_below="@+id/textView2"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="42dp" />

    <Button
        android:id="@+id/button"
        android:layout_width="69dp"
        android:layout_height="wrap_content"
        android:layout_below="@+id/imageButton"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="62dp"
        android:text="通知" />

</RelativeLayout>
````

让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

![](https://www.jc2182.com/images/android/notification1.png)

点击“通知”按钮，从屏幕顶部下拉即可看到刚刚发送的通知。
