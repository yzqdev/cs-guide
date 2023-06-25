# 单帧片段（Single frame fragment）

## Android 单帧片段
  
:::tip
 **单帧片段（Single frame fragment)** 是为小屏幕设备（例如手持设备（手机））设计的，并且应高于android 3.0版本。
  
:::
  
## 示例
  
  本示例将向您说明如何创建自己的片段。在这里，我们将创建两个片段，其中一个片段将在设备处于横向模式时使用，另一个片段将在竖屏模式下使用。因此，让我们按照以下步骤进行操作，类似于创建[Hello World 例子](https://www.jc2182.com/andriod/android-hello-world.html)时遵循的步骤-
  
  1. 您将使用Android StudioIDE创建一个Android应用程序，并将其命名为Helloworld，位于com.jc2182.helloworld包下，Activity为空。
  2. 修改主Activity文件MainActivity.java，如下代码所示。在这里，我们将检查设备的方向，并因此在不同的片段之间进行切换。
  3. 在包com.jc2182.helloworld下创建两个Java文件PM_Fragment.java和LM_Fragement.java，以定义您的片段和相关方法。
  4. 创建布局文件res/layout/lm_fragment.xml和res/layout/pm_fragment.xml并为两个片段定义布局。
  5. 修改res/layout/activity_main.xml文件的默认内容以包括两个片段。
  6. 在res/values/strings.xml文件中定义所需的常量
  7. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要Activity文件MainActivity.java的内容 -
  
```java
  
  

import android.app.FragmentManager;
 import android.app.FragmentTransaction;
 import android.content.res.Configuration;
 import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {


  /** 在Activity首次创建时调用。 */
  @Override
  public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      Configuration config = getResources().getConfiguration();

      FragmentManager fragmentManager = getFragmentManager();
      FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();

      /**         * 检查设备的方向并采取相应的行动         */

      if (config.orientation == Configuration.ORIENTATION_LANDSCAPE) {
          /**             * 设备的横屏模式             */
          LM_Fragement ls_fragment = new LM_Fragement();
          fragmentTransaction.replace(android.R.id.content, ls_fragment);
      }else{
          /**             * 设备竖屏模式             */
          PM_Fragement pm_fragment = new PM_Fragement();
          fragmentTransaction.replace(android.R.id.content, pm_fragment);
      }
      fragmentTransaction.commit();
  }

}

```

创建两个片段文件LM_Fragement.java和PM_Fragment.java

以下是LM_Fragement.java文件的内容-

```java



import android.os.Bundle;

import android.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

/** * A simple {@link Fragment} subclass. * Use the {@link LM_Fragement#newInstance} factory method to * create an instance of this fragment. */
public class LM_Fragement extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        /**         * 膨胀这个片段的布局         */

        return inflater.inflate(R.layout.lm_fragement, container, false);
    }
}
```

以下是PM_Fragement.java文件的内容-

```java


import android.os.Bundle;

import android.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup; 

/** * A simple {@link Fragment} subclass. * Use the {@link PM_Fragement#newInstance} factory method to * create an instance of this fragment. */
public class PM_Fragement extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        /**         * 膨胀这个片段的布局         */
        return inflater.inflate(R.layout.pm_fragment, container, false);
    }
}
```

在res/layout目录下创建两个布局文件lm_fragement.xml和pm_fragment.xml。

以下是lm_fragement.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".LM_Fragement">

    <TextView
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:text="@string/landscape_message"
        android:textColor="#000000"
        android:textSize="100px" />

    <!-- 这里可以配置更多图形组件  -->

</LinearLayout>
```

以下是pm_fragment.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".PM_Fragement">

    <TextView
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:text="@string/portrait_message"
        android:textColor="#000000"
        android:textSize="100px" />
    <!-- 这里可以配置更多图形组件  -->

</LinearLayout>
```

以下是res/layout/activity_main.xml文件的内容 -

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


    <fragment
        android:name="com.example.fragments"
        android:id="@+id/lm_fragment"
        android:layout_weight="1"
        android:layout_width="0dp"
        android:layout_height="match_parent" />

    <fragment
        android:name="com.example.fragments"
        android:id="@+id/pm_fragment"
        android:layout_weight="2"
        android:layout_width="0dp"
        android:layout_height="match_parent" />

</RelativeLayout>
```

确保您具有以下res/values/strings.xml文件的内容-

```xml
<resources>
    <string name="app_name">HelloWorld</string>
    <!-- TODO: Remove or change this placeholder text -->
    <string name="landscape_message">这是横屏模式片段</string>
    <string name="portrait_message">这是竖屏模式片段</string>
</resources>
```

让我们尝试运行刚刚创建的修改后的HelloWorld应用程序。我假设您是在进行环境设置时创建的AVD。要从Android Studio运行该应用，请打开您项目的Activity文件之一，然后从工具栏中单击“运行”图标。Android Studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示“模拟器”窗口。请耐心等待，因为这可能需要花费一些时间，具体取决于您的计算机速度，出现以下内容-

![fragment](https://www.jc2182.com/images/android/singlefragment1.png)

这时候让我们来切换屏幕为横屏

![fragment](https://www.jc2182.com/images/android/singlefragment2.png)

这时候我们看到如下效果：
![frame](https://www.jc2182.com/images/android/singlefragment3.png)
