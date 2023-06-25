# Android Indent（意图）
  
  Android Intent(意图)是要执行的操作的抽象描述。它可以与startActivity一起使用来启动一个Activity，可以将broadcastIntent发送到任何感兴趣的BroadcastReceiver组件，也可以与**startService（Intent）**或**bindService（Intent，ServiceConnection，int）**一起与后台Service通信。
  
:::tip
意图本身（一个**Indent**对象）是一个被动数据结构，其中包含要执行的操作的抽象描述。
:::
  例如，假设您有一个Activity，该Activity需要启动电子邮件客户端并使用Android设备发送电子邮件。为此，您的“Activity”会将ACTION_SEND和相应的选择器一起发送到Android Intent解析器。指定的选择器为用户提供适当的界面，以选择如何发送您的电子邮件数据。
  
```java
  Intent email = new Intent(Intent.ACTION_SEND, Uri.parse("mailto:"));
  email.putExtra(Intent.EXTRA_EMAIL, recipients);
  email.putExtra(Intent.EXTRA_SUBJECT, subject.getText().toString());
  email.putExtra(Intent.EXTRA_TEXT, body.getText().toString());
  startActivity(Intent.createChooser(email, "Choose an email client from..."));
```
  
  上面的语法正在调用startActivity方法来启动电子邮件activity，结果应如下所示-
  
  ![indent](https://www.jc2182.com/images/android/indent1.jpg)
  
  例如，假设您有一个Activity，需要在Android设备上的网络浏览器中打开URL。为此，您的“Activity”会将ACTION_WEB_SEARCH Intent发送到Android Intent Resolver，以在网络浏览器中打开给定的URL。Intent解析器将解析一系列活动，然后选择与您的Intent最匹配的Activity（在本例中为Web Browser Activity）。然后，Intent Resolver将您的网页传递到Web浏览器并启动Web浏览器活动。
  
```java
  String q = "蝴蝶教程";
  Intent intent = new Intent(Intent.ACTION_WEB_SEARCH );
  intent.putExtra(SearchManager.QUERY, q);
  startActivity(intent);
```
  
  上面的示例将在android搜索引擎上搜索为“蝴蝶教程”，并在您的活动中提供了“蝴蝶教程”的结果
  
  有向每种类型的组件（活动(Activity)，服务(Service)和广播接收器(Broadcast Receivers)）传递意图（Indent）的单独机制。
  
  | 方法                        | 说明                                                               |
  | --------------------------- | ------------------------------------------------------------------ |
  | **Context.startActivity()** | Intent对象将传递给此方法以启动新活动或获取现有活动以执行新操作。   |
  | **Context.startService()**  | Intent对象将传递给此方法以启动服务或将新指令传递给正在进行的服务。 |
  | **Context.sendBroadcast()** | Intent对象将传递给此方法，以将消息传递给所有感兴趣的广播接收者。   |
  
## Indent 对象
  
  **Intent** 对象是一组信息，由接收Intent的组件使用，也包括Android系统使用的信息。
  
  一个Intent对象可以基于其正在通信或将要执行的内容包含以下组件-
  
  *执行动作（Action）*
  
  这是 Intent 对象的必需部分，并且是一个字符串，用于命名要执行的动作-或在广播意图的情况下，是已发生并要报告的动作。动作很大程度上决定了其余意图对象的结构。Intent类定义了许多与不同intent对应的动作常量。这是Android Intent[标准操作](https://developer.android.google.cn/reference/android/content/Intent#constants_1)的列表
  
  可以通过**setAction()**方法设置Intent对象中的动作，并通过**getAction()**读取该动作。
  
  *数据(Data)*
  
  将数据规范添加到意图过滤器。规范可以只是数据类型（mimeType属性），只是URI，或者既是数据类型又是URI。URI由其每个部分的单独属性指定-
  
  这些指定URL格式的属性是可选的，但也相互依赖-
  
- 如果未为意图过滤器指定方案，则将忽略所有其他URI属性。
- 如果未为过滤器指定主机，则将忽略端口属性和所有路径属性。
  
  **setData()**方法仅将数据指定为URI，**setType()**仅将数据指定为MIME类型，**setDataAndType()**将其指定为URI和MIME类型。URI由**getData()**读取，类型由**getType()**读取。
  
  动作/数据对的一些例子是-
  
  | action/data                                 | 说明                                             |
  | ------------------------------------------- | ------------------------------------------------ |
  | **ACTION_VIEW** content://contacts/people/1 | 显示标识符为“1”的人员的信息。                    |
  | **ACTION_DIAL** content://contacts/people/1 | 显示所填写的人的电话拨号器。                     |
  | **ACTION_VIEW** tel:123                     | 显示电话拨号器与给定的号码填写。                 |
  | **ACTION_DIAL** tel:123                     | 显示电话拨号器与给定的号码填写。                 |
  | **ACTION_EDIT** content://contacts/people/1 | 编辑标识符为“1”的人员的信息。                    |
  | **ACTION_VIEW** content://contacts/people/  | 显示用户可以浏览的人员列表。                     |
  | **ACTION_SET_WALLPAPER**                    | 显示选择壁纸的设置                               |
  | **ACTION_SYNC**                             | 它会同步数据，常数值是android.intent.action.sync |
  | **ACTION_SYSTEM_TUTORIAL**                  | 它将启动平台定义的教程(默认教程或启动教程)       |
  | **ACTION_TIMEZONE_CHANGED**                 | 当时区改变时就会调起                             |
  | **ACTION_UNINSTALL_PACKAGE**                | 它用于运行默认的卸载程序                         |
  
  *类别(Category)*
  
  类别是Intent对象的可选部分，它是一个字符串，其中包含有关应处理该意图的组件类型的其他信息。**addCategory()**方法将类别放置在Intent对象中，**removeCategory()**删除先前添加的类别，并且**getCategories()**获取对象中当前所有类别的集合。这是[Android Intent标准类别](https://developer.android.google.cn/reference/android/content/Intent#CATEGORY_HOME)的列表。
  
  附加功能(Extra)
  
  这将在键值对中提供附加信息，这些附加信息应传递给处理该意图的组件。可以分别使用**putExtras()**和**getExtras()**方法设置和读取附加功能。这是[Android Intent标准附加数据](https://developer.android.google.cn/reference/android/content/Intent#EXTRA_ALARM_COUNT)的列表
  
  *标志(Flag)*
  
  这些标志是Intent对象的可选部分，用于指示Android系统如何启动活动以及在启动活动(Activity)后如何对其进行处理等。[参考手册](https://developer.android.google.cn/reference/android/content/Intent#FLAG_ACTIVITY_BROUGHT_TO_FRONT)
  
  下表是一些常用的标志
  
  | 标志                         | 说明                                                                                                                                                                                                                         |
  | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | **FLAG_ACTIVITY_CLEAR_TASK** | 如果在传递给Context.startActivity() 的Intent中进行设置，则此标志将导致在活动开始之前清除与该活动相关联的所有现有任务。也就是说，该活动成为原本空的任务的新根，并且所有旧活动都已完成。只能与FLAG_ACTIVITY_NEW_TASK结合使用。 |
  | **FLAG_ACTIVITY_CLEAR_TOP**  | 如果已设置，并且正在启动的活动已在当前任务中运行，那么与其启动该活动的新实例，不如关闭该活动之上的所有其他活动，并将此Intent传递给（现在顶部）将旧活动作为新的Intent。                                                       |
  | **FLAG_ACTIVITY_NEW_TASK**   | 想要呈现“启动程序”样式行为的活动通常使用此标志：它们为用户提供了可以完成的单独操作的列表，否则这些操作完全独立于启动它们的活动。                                                                                             |
  
  *组件名称(component)*
  
  这个可选字段是一个android ComponentName对象，代表Activity，Service或BroadcastReceiver类。如果已设置，则将Intent对象传递到指定类的实例，否则Android使用Intent对象中的其他信息来定位合适的目标。组件名称由setComponent()，setClass()或setClassName()设置，并由getComponent()读取。
  
## Indent 类型
  
  Android支持以下两种类型的意图
  
  ![indent](https://www.jc2182.com/images/android/indent2.jpg)
  
  *Explicit Intents(显示意图)*
  
  显式意图将被连接到应用程序的内部世界，假设您想将一个活动(activity)连接到另一个活动(activity)，我们可以通过显式意图进行引用，下图是通过单击按钮将第一个活动连接到第二个活动。
  
  ![indent](https://www.jc2182.com/images/android/indent3.jpg)
  
  这些意图通过名称来指定目标组件，它们通常用于应用程序内部消息-例如启动下属服务或启动同级活动的活动。例如-
  
```java
  // 通过指定其类名来显式意图
  Intent i = new Intent(FirstActivity.this, SecondActivity.class);
  
  // 启动目标 Activity
  startActivity(i);
```
  
  *Implicit Intents(隐示意图)*
  
  这些意图不会命名目标，并且组件名称的字段保留为空白。隐式意图通常用于激活其他应用程序中的组件。例如-
  
```java
  Intent read1=new Intent();
  read1.setAction(android.content.Intent.ACTION_VIEW);
  read1.setData(ContactsContract.Contacts.CONTENT_URI);
  startActivity(read1);
```
  
  上面的代码将给出如下所示的结果调出联系人列表:
  
  ![indent](https://www.jc2182.com/images/android/indent1.png)
  
  接收到意图的目标组件可以使用**getExtras()**方法获取源组件发送的额外数据。例如-
  
```java
  // 在代码中的适当位置获取包对象
  Bundle extras = getIntent().getExtras();
  
  // 使用传递的key提取数据
  String value1 = extras.getString("Key1");
  String value2 = extras.getString("Key2");
```
  
## 示例
  
  以下示例显示了用于启动各种Android内置应用程序的Android Intent的功能。
  
  1. 您将使用Android Studio IDE创建一个Android应用程序，并在com.jc2182.helloworld包下将其命名为HelloWorld。
  2. 修改src/main/java/MainActivity.java文件并添加代码以定义对应于两个按钮的两个侦听器。启动浏览器并启动电话。
  3. 修改布局XML文件res/layout/activity_main.xml，以在线性布局中添加三个按钮。
  4. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.helloworld/MainActivity.java的内容。
  
```java
  
  
  import android.app.Activity;
  import android.content.Intent;
  import android.net.Uri;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
 
  

public class MainActivity extends Activity {
 
  Button b1,b2;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      b1=(Button)findViewById(R.id.button);
      b1.setOnClickListener(new View.OnClickListener() {

          @Override
          public void onClick(View v) {
              Intent i = new Intent(android.content.Intent.ACTION_VIEW, Uri.parse("http://www.jc2182.com"));
              startActivity(i);
          }
      });

      b2=(Button)findViewById(R.id.button2);
      b2.setOnClickListener(new View.OnClickListener() {
          @Override
          public void onClick(View v) {
              Intent i = new Intent(android.content.Intent.ACTION_VIEW,
                      Uri.parse("tel:9510300000"));
              startActivity(i);
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
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >

    <TextView
        android:id="@+id/textView1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="65dp"
        android:text="Intent（意图）示例"
        android:textSize="30dp" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/textView1"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="41dp"
        android:text="蝴蝶教程"
        android:textColor="#ff87ff09"
        android:textSize="30dp" />

    <ImageButton
        android:id="@+id/imageButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/textView2"
        android:layout_alignParentEnd="true"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="60dp"
        android:layout_marginEnd="45dp"
        android:src="@drawable/logo" />

    <EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/editText"
        android:layout_below="@+id/imageButton"
        android:layout_alignRight="@+id/imageButton"
        android:layout_alignEnd="@+id/imageButton" />

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignStart="@+id/imageButton"
        android:layout_alignLeft="@+id/imageButton"
        android:layout_alignTop="@+id/editText"
        android:layout_alignEnd="@+id/textView1"
        android:layout_alignRight="@+id/textView1"
        android:layout_marginStart="28dp"
        android:layout_marginLeft="28dp"
        android:layout_marginTop="40dp"
        android:layout_marginEnd="-27dp"
        android:layout_marginRight="-27dp"
        android:text="启动浏览器" />

    <Button
        android:id="@+id/button2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/button"
        android:layout_alignStart="@+id/button"
        android:layout_alignLeft="@+id/button"
        android:layout_alignEnd="@+id/textView2"
        android:layout_alignRight="@+id/textView2"
        android:layout_marginStart="48dp"
        android:layout_marginLeft="48dp"
        android:layout_marginTop="43dp"
        android:layout_marginEnd="-48dp"
        android:layout_marginRight="-48dp"
        android:text="启动电话" />

</RelativeLayout>
````

以下是AndroidManifest.xml的默认内容 -

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.jc2182.helloworld">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
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

让我们尝试运行您的“我的应用程序”应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用程序，请打开项目的活动文件之一，然后运行图标从工具栏中单击“运行” 图标。AndroidStudio会将其安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在模拟器上窗口-

![indent](https://www.jc2182.com/images/android/indent2.png)

现在单击“启动浏览器”按钮选择Chrome浏览器，这将启动配置的浏览器并显示<https://www.jc2182.com>，如下所示-

![indent](https://www.jc2182.com/images/android/indent3.png)

单击“启动电话”按钮，出现如下界面。

![indent](https://www.jc2182.com/images/android/indent4.png)

## 意图过滤器
  
  您已经了解了如何使用Intent调用另一个活动(activity)。Android OS使用过滤器来确定活动，服务和广播接收器的集合，这些接收器可以在指定的一组动作，类别和与Intent相关的数据方案的帮助下处理Intent。您将在清单文件中使用`<intent-filter>`元素列出与任何活动，服务或广播接收者关联的动作，类别和数据类型。以下是AndroidManifest.xml文件的一部分示例，用于指定活动com.jc2182.helloworld.CustomActivity，可以通过上述两个操作（一个类别和一个数据）之一来调用该活动-
  
```xml
  <activity android:name=".MainActivity">
      <intent-filter tools:ignore="AppLinkUrlError">
          <action android:name="android.intent.action.VIEW" />
          <action android:name="com.jc2182.helloworld.LAUNCH" />
          <category android:name="android.intent.category.DEFAULT" />
          <data android:scheme="https" />
      </intent-filter>
  </activity>
```
  
  当活动被上面的过滤器所定义，其他活动就可以通过下面的方式来调用这个活动。使用 **android.intent.action.VIEW**，使用 **com.jc2182.helloworld.LAUNCH** 动作，并提供**android.intent.category.DEFAULT**类别。元素指定要被调用的活动所期望的数据类型。上面的实例中，自定义活动期望的数据由"https://"开头。有这样的情况，通过过滤器，意图将被传递到多个的活动或者服务，用户将被询问启动哪个组件。如果没有找到目标组件，将发生一个异常。在调用活动之前，有一系列的 Android 检查测试：
  
- 过滤器 `<intent-filter>` 需要列出一个或者多个的动作，不能为空；过滤器至少包含一个 元素，否则将阻塞所有的意图。如果多个动作被提到，Android 在调用活动前尝试匹配其中提到的一个动作。
- 过滤器 `<intent-filter>` 可能列出0个，1个或者多个类别。如果没有类别被提到，Android 通过这个测试，如果有多个类别被提及，意图通过类型测试，每个意图对象的分类必须匹配过滤器中的一个分类。
- 每个 元素可以指定一个 URI 和一个数据类型(元媒体类型)。这里有独立的属性，如 URI 中的每个部分：模式，主机，端口和路径。意图包含有 URI 和类型，只有它的类型匹配了过滤器中列出的某个类型，则通过数据类型部分的测试。
  
  *意图过滤器示例*
  
  下面的实例是上面实例的一些修改。这里我们将看到如果一个意图调用定义的两个活动，Android 如何来解决冲突；如何使用过滤器来调用自定义活动；如果没有为意图定义合适的活动，则会出现异常。
  
  1. 使用Android Studio IDE创建Android应用程序，并命名为Intent filter，包名为com.jc2182.helloworld。当创建项目时，确保目标 SDK 和用最新版本的 Android SDK 进行编译使用高级的API。
  2. 修改 src/com.jc2182.helloworld/MainActivity.java 文件，添加代码来定义三个监听器来对应布局文件中定义的三个按钮。
  3. 添加 src/com.jc2182.helloworld/CustomActivity.java 文件来包含一个活动，可以被不同的意图调用。
  4. 修改 res/layout/activity_main.xml 文件在线性布局中添加三个按钮。
  5. 添加 res/lauout/custom_view.xml 布局文件，添加简单地 来显示通过 intent 传递的数据。
  6. 修改 AndroidManifest.xml 文件，添加 `<intent-filter>` 定义意图的规则来调用自定义活动。
  7. 启动 Android 模拟器来运行应用程序，并验证应用程序所做改变的结果。
  
  以下是修改后的主要活动文件src/MainActivity.java的内容。
  
```java
  
  
  import android.app.Activity;
  import android.content.Intent;
  import android.net.Uri;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Button;
  

public class MainActivity extends Activity {

  Button b1,b2,b3;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);
      b1=(Button)findViewById(R.id.button);
      b1.setOnClickListener(new View.OnClickListener() {

          @Override
          public void onClick(View v) {
              Intent i = new Intent(android.content.Intent.ACTION_VIEW,
                      Uri.parse("https://www.jc2182.com"));
              startActivity(i);
          }
      });

      b2 = (Button)findViewById(R.id.button2);
      b2.setOnClickListener(new View.OnClickListener() {
          @Override
          public void onClick(View v) {
              Intent i = new Intent("com.jc2182.helloworld.LAUNCH",Uri.parse("https://www.jc2182.com"));
              startActivity(i);
          }
      });

      b3 = (Button)findViewById(R.id.button3);
      b3.setOnClickListener(new View.OnClickListener() {
          @Override
          public void onClick(View v) {
              Intent i = new Intent("com.jc2182.helloworld.LAUNCH",
                      Uri.parse("http://www.jc2182.com"));
              startActivity(i);
          }
      });
  }

}

```

以下是修改后的主要活动文件src/com.jc2182.helloworld/CustomActivity.java的内容。

```java



import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;
import android.widget.TextView;

public class CustomActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.custom_view);
        TextView label = (TextView) findViewById(R.id.show_data);
        Uri url = getIntent().getData();
        label.setText(url.toString());
    }
}
```

以下是res/layout/activity_main.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >

    <TextView
        android:id="@+id/textView1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="67dp"
        android:text="意图|过滤器示例"
        android:textSize="30dp" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/textView1"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="32dp"
        android:text="蝴蝶教程"
        android:textColor="#ff87ff09"
        android:textSize="30dp" />

    <ImageButton
        android:id="@+id/imageButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/textView2"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="42dp"
        android:src="@drawable/logo" />

    <EditText
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/editText"
        android:layout_below="@+id/imageButton"
        android:layout_alignRight="@+id/imageButton"
        android:layout_alignEnd="@+id/imageButton" />

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignStart="@+id/imageButton"
        android:layout_alignLeft="@+id/imageButton"
        android:layout_alignTop="@+id/editText"
        android:layout_alignEnd="@+id/imageButton"
        android:layout_centerHorizontal="true"
        android:layout_marginStart="3dp"
        android:layout_marginLeft="3dp"
        android:layout_marginTop="32dp"
        android:layout_marginEnd="-2dp"
        android:text="启动浏览器" />

    <Button
        android:id="@+id/button2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/button"
        android:layout_alignStart="@+id/button"
        android:layout_alignLeft="@+id/button"
        android:layout_alignEnd="@+id/button"
        android:layout_centerHorizontal="true"
        android:layout_marginStart="2dp"
        android:layout_marginLeft="2dp"
        android:layout_marginTop="20dp"
        android:layout_marginEnd="-1dp"
        android:text="动过LAUNCH启动浏览" />

    <Button
        android:id="@+id/button3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/button2"
        android:layout_alignStart="@+id/button2"
        android:layout_alignLeft="@+id/button2"
        android:layout_alignParentEnd="true"
        android:layout_centerHorizontal="true"
        android:layout_marginStart="-17dp"
        android:layout_marginLeft="-17dp"
        android:layout_marginTop="29dp"
        android:layout_marginEnd="16dp"
        android:layout_toStartOf="@+id/editText"
        android:text="异常条件测试" />

</RelativeLayout>
```

以下将是res/layout/custom_view.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">
    <TextView android:id="@+id/show_data"
        android:layout_width="fill_parent"
        android:layout_height="400dp"/>
</LinearLayout>
```

以下将是AndroidManifest.xml的内容

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.jc2182.helloworld">

    <application
        android:allowBackup = "true"
        android:icon = "@mipmap/ic_launcher"
        android:label = "@string/app_name"
        android:supportsRtl = "true"
        android:theme = "@style/AppTheme">
        <activity android:name = ".MainActivity">
            <intent-filter>
                <action android:name = "android.intent.action.MAIN" />
                <category android:name = "android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity android:name="com.jc2182.helloworld.CustomActivity">

            <intent-filter tools:ignore="AppLinkUrlError">
                <action android:name = "android.intent.action.VIEW" />
                <action android:name = "com.jc2182.helloworld.LAUNCH" />
                <category android:name = "android.intent.category.DEFAULT" />
                <data android:scheme = "https" />
            </intent-filter>

        </activity>
    </application>

</manifest>
```

运行应用程序::

让我们尝试运行我们刚刚创建的HelloWorld应用程序。我假设您是在进行环境设置时创建的AVD。要从Android Studio运行该应用，请打开您项目的Activity文件之一，然后运行图标从工具栏中单击运行图标。Android在您的AVD上安装该应用程序并启动它，如果您的设置和应用程序一切正常，它将在“模拟器”窗口中显示-

![fragment](https://www.jc2182.com/images/android/indentfilter1.png)

现在让我们从第一个按钮“使用VIEW Action启动浏览器”开始。在这里，我们使用过滤器“android.intent.action.VIEW”定义了自定义活动，并且已经有一个针对Android定义的VIEW活动的默认活动，该活动正在启动网络浏览器，因此android显示以下两个选项来选择您需要的活动要启动。

![fragment](https://www.jc2182.com/images/android/indentfilter2.png)

现在，如果您选择浏览器，则Android将启动Web浏览器并打开jc2182.com网站，但是如果您选择My Indernt2 Application选项，则Android将启动CustomActivity，它仅捕获捕获的数据并在文本视图中显示，如下所示-

![fragment](https://www.jc2182.com/images/android/indentfilter3.png)

现在使用后退按钮返回并单击“通过LAUNCH Action启动浏览器”按钮，此处Android应用过滤器选择定义活动，它只是启动您的自定义活动再次，使用“后退”按钮返回并单击“异常条件”按钮，此处Android尝试为给定的意图找到有效的过滤器，但未找到定义的有效活动，因为这一次我们将数据用作http而不是https尽管我们采取了正确的措施，所以Android引发了异常并显示以下屏幕-
