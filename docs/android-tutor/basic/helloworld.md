---
 
order: 2
 
---
# helloworld实例

## Hello World示例
  
## 创建Android应用程序
  
  第一步是使用Android Studio创建一个简单的Android应用程序。当您单击Android Studio图标时，它将显示如下屏幕
  
  ![hello](https://www.jc2182.com/images/android/hello1.jpg)
  
  您可以通过调用启动新的android studio项目(Start a new Android Studio project)来启动应用程序开发。在新的安装框架中应询问应用程序名称，软件包信息和项目位置。
  
  ![hello](https://upload-bbs.mihoyo.com/upload/2022/06/06/281049291/b77b780d9fd62d31c1e45b9bdfd5bd18_5616220922950803496.png)
  
  输入应用程序名称后，将被称为选择您的应用程序在其上运行的尺寸，这里需要指定Minimum SDK，在我们的教程中，我已声明为API23：Android 6.0（Mashmallow）-
  
  ![hello](https://upload-bbs.mihoyo.com/upload/2022/06/06/281049291/1c02e6802fdd912a13a84860d7bcad77_4073516283405585534.png)
  
  下一安装级别应包含选择要移动的Activity，它指定应用程序的默认布局(这里我们选择空的Activity（Empty activity）)。
  
  ![hello](https://www.jc2182.com/images/android/hello4.jpg)
  
  在最后阶段，它将是一个开放的开发工具，用于编写应用程序代码。
  
  ![hello](https://www.jc2182.com/images/android/hello5.png)
  
## Android应用程序剖析
  
  在运行应用程序之前，您应该了解Android项目中的一些目录和文件-
  
  ![hello](https://www.jc2182.com/images/android/hello6.jpg)
  
  文件夹，文件和说明::
  
  | 序号  | 文件/文件夹             | 描述                                                                                                                                           |
  | ----- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
  | **1** | **java**                | 它包含项目的.java源文件。 默认情况下，它包含MainActivity.java源文件，该文件具有一个Activity类，该活动类在使用应用程序图标启动应用程序时运行。  |
  | **2** | **res/drawable-hdpi**   | 这是用于高分辨率度屏幕的可绘制对象的目录。                                                                                                     |
  | **3** | **res/layout**          | 这是用于定义应用程序用户界面的文件的目录。                                                                                                     |
  | **4** | **res/values**          | 这是包含资源集合（例如字符串和颜色定义）的其他各种XML文件的目录。                                                                              |
  | **5** | **AndroidManifest.xml** | 这是清单文件，描述了应用程序的基本特征并定义了每个组件。                                                                                       |
  | **6** | **Build.gradle**        | 这是一个自动生成的文件，其中包含compileSdkVersion，buildToolsVersion，applicationId，minSdkVersion，targetSdkVersion，versionCode和versionName |
  
## MainActivity.java
  
  Main Activity代码是Java文件MainActivity.java。这是实际的应用程序文件，最终会转换为Dalvik可执行文件并运行您的应用程序。以下是应用程序向导为Hello World生成的默认代码！应用程序-
  
```java
  import androidx.appcompat.app.AppCompatActivity;
  import android.os.Bundle;
  
  public class MainActivity extends AppCompatActivity {
  
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
      }
  }
```
  
  在此，**R.layout.activity_main**引用位于res/layout文件夹中的activity_main.xml文件。**onCreate()**方法是当加载一个activity。
  
## AndroidManifest.xml
  
  作为应用程序一部分开发的任何组件，都必须在AndroidManifest.xml中声明其所有组件，该清单位于应用程序项目目录的根目录中。该文件用作Android OS与您的应用程序之间的接口，因此，如果您未在此文件中声明组件，那么OS将不会考虑该文件。例如，默认清单文件看起来像以下文件：
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <manifest xmlns:android="http://schemas.android.com/apk/res/android" >
  
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
  
  在这里，`<application> ... </application>`标记包含与应用程序相关的组件。属性android：icon将指向res/mipmap下可用的应用程序图标。该应用程序使用位于可绘制文件夹中的名为ic_launcher.png的图像 `<activity>`标签用于指定activity，而android:name属性指定Activity子类的完全限定的类名，而android：label属性则指定用作activity标签的字符串。您可以使用`<activity>`标签指定多个activity。 intent-filter被命名为android.intent.action.MAIN，表明这项activtiy作为切入点应用。intent-filter的类别名为android.intent.category.LAUNCHER，指示可以从设备的启动器图标启动应用程序。
  
  以下是清单文件中将使用的标签列表，用于指定不同的Android应用程序组件-
  
- `<activity>` activtity元素
- 服务的`<service>`元素
- 广播接收器的`<receiver>`元素
- 内容提供商的`<provider>`元素

## strings.xml
  
  strings.xml文件位于RES/values文件夹，它包含了所有的文本应用程序使用。例如，按钮，标签，默认文本和类似类型的字符串的名称将进入此文件。该文件负责其文本内容。例如，默认字符串文件将类似于以下文件-
  
```xml
  <resources>
      <string name="app_name">My Second Application</string>
  </resources>
```
  
## 布局文件
  
  activity_main.xml中是可用布局文件RES/layout目录，由应用程序构建它的界面时引用。您将非常频繁地修改此文件以更改应用程序的布局。此文件将具有以下与默认布局有关的内容-
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:app="http://schemas.android.com/apk/res-auto"
      xmlns:tools="http://schemas.android.com/tools"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      tools:context=".MainActivity">
  
      <TextView
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:text="Hello World!"
          app:layout_constraintBottom_toBottomOf="parent"
          app:layout_constraintLeft_toLeftOf="parent"
          app:layout_constraintRight_toRightOf="parent"
          app:layout_constraintTop_toTopOf="parent" />
  
  </androidx.constraintlayout.widget.ConstraintLayout>
```
  
## 运行应用程序
  
  让我们尝试运行我们的Hello World！我们刚刚创建的应用程序。我假设您是在进行环境设置时创建的AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后点击Eclipse运行图标工具栏中的“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将在“Emulator”窗口中显示
  
  ![hello](https://www.jc2182.com/images/android/hello7.png)
  
  ![hello](https://www.jc2182.com/images/android/hello8.png)
  
  恭喜！！！您已经开发了第一个Android应用程序，现在只需逐步遵循本教程的其余部分，即可成为出色的Android开发人员。一切顺利。
