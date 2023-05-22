# 传感器
  
  大多数android设备都有内置的传感器，可以测量运动，方向和各种环境条件。android平台支持三大类传感器。
  
- 运动传感器
- 环境传感器
- 位置传感器
  
  有些传感器是基于硬件的传感器，有些是基于软件的传感器。无论传感器是什么，android都允许我们从这些传感器获取原始数据，并将其用于我们的应用程序中。为此，android为我们提供了一些类。
  
  Android提供了**SensorManager**和**Sensor**类，以在我们的应用程序中使用传感器。为了使用传感器，您需要做的第一件事是实例化**SensorManager**类的对象。可以如下实现。
  
```java
  SensorManager sMgr;
  sMgr = (SensorManager)this.getSystemService(SENSOR_SERVICE);
```
  
  接下来需要做的是通过调用SensorManager类的getDefaultSensor()方法来实例化Sensor类的对象。其语法如下-
  
```java
  Sensor light;
  light = sMgr.getDefaultSensor(Sensor.TYPE_LIGHT);
```
  
  声明该传感器后，您需要注册其侦听器并重写onAccuracyChanged和onSensorChanged这两个方法。它的语法如下-
  
```java
  sMgr.registerListener(this, light,SensorManager.SENSOR_DELAY_NORMAL);
  public void onAccuracyChanged(Sensor sensor, int accuracy) {
  }
  
  public void onSensorChanged(SensorEvent event) {
  }
```
  
## 获取支持的传感器列表
  
  您可以通过调用getSensorList方法获取设备支持的传感器列表，该方法将返回包含传感器名称和版本号以及更多信的传感器列表。然后，您可以遍历列表以获取信息。其语法如下-
  
```java
  sMgr = (SensorManager)this.getSystemService(SENSOR_SERVICE);
  List<Sensor> list = sMgr.getSensorList(Sensor.TYPE_ALL);
  for(Sensor sensor: list){
  }
```
  
  除了这些方法之外，SensorManager类还提供了其他方法来管理传感器框架。这些方法在下面列出-
  
  td> td> td> td> td>
  
  | 方法                                                                 | 说明                                                   |
  | -------------------------------------------------------------------- | ------------------------------------------------------ |
  | **getDefaultSensor(int type)**                                       | 此方法获取给定类型的默认传感器。                       |
  | **getInclination(float[] I)**                                        | 该方法从倾斜矩阵计算以弧度为单位的地磁倾斜角。         |
  | **registerListener(SensorListener listener, int sensors, int rate)** | 此方法为传感器注册一个侦听器                           |
  | **unregisterListener(SensorEventListener listener, Sensor sensor)**  | 此方法为注册了该传感器的传感器注销一个侦听器。         |
  | **getOrientation(float[] R, float[] values)**                        | 此方法根据旋转矩阵计算设备的方向。                     |
  | **getAltitude(float p0, float p)**                                   | 此方法从大气压力和海平面压力计算以米为单位的海拔高度。 |

## 示例
  
  本示例演示了进度对话框的旋转用法。按下按钮时将显示旋转进度对话框。 要尝试使用此示例，您需要在按照以下步骤开发应用程序后，在实际设备上运行此示例。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件以添加必要的代码。
  3. 修改res/layout/activity_main以添加相应的XML组件。
  4. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。
  
```java
  

  import android.app.Activity;
  import android.hardware.Sensor;
  import android.hardware.SensorManager;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.TextView;

  import java.util.List;

  public class MainActivity extends Activity {

      TextView tv1=null;
      private SensorManager mSensorManager;
    
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
    
          tv1 = (TextView) findViewById(R.id.textView2);
          tv1.setVisibility(View.GONE);
    
          mSensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);
          List mList= mSensorManager.getSensorList(Sensor.TYPE_ALL);
    
          for (int i = 1; i < mList.size(); i++) {
              tv1.setVisibility(View.VISIBLE);
              tv1.append("\n" + mList.get(i).getName() + "\n" + mList.get(i).getVendor() + "\n" + mList.get(i).getVersion());
          }
      }

  }

```

以下是res/layout/activity_main.xml文件的内容-

```xml

<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:transitionGroup="true">

    <TextView android:text="传感器 "
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/textview"
        android:textSize="35sp"
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
        android:textSize="35sp" />

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="248dp"
        android:layout_height="69dp"
        android:layout_below="@+id/textView"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="4dp"
        android:background="#223311"
        android:src="@drawable/logo" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@+id/imageView"
        android:layout_alignParentStart="true"
        android:layout_alignParentEnd="true"
        android:layout_alignParentBottom="true"
        android:layout_marginStart="0dp"
        android:layout_marginTop="21dp"
        android:text="New Text" />

</RelativeLayout>
```

  让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

  ![](https://www.jc2182.com/images/android/sensor.png)
