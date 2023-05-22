# Android 片段过渡
  
  切换中的Activity和片段（Fragment）过渡是建立在Android中一个相对较新的功能（称为过渡）之上的。在KitKat中引入的过渡框架为在应用程序中的不同UI状态之间进行动画处理提供了便捷的API。该框架围绕两个关键概念构建：场景和过渡。场景定义了应用程序UI的给定状态，而过渡则定义了两个场景之间的动画更改。 当场景改变时，过渡有两个主要职责-
  
- 在开始和结束场景中捕获每个视图的状态。
- 根据差异创建一个动画器，以动画化一个场景到另一个场景的视图。

## 示例
  
  本示例将向您说明如何使用片段过渡创建自定义动画。因此，让我们按照以下步骤进行操作，类似于创建[Hello World 例子](https://www.jc2182.com/andriod/android-hello-world.html)时遵循的步骤-
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为HelloWorld，位于com.jc2182.helloworld包下，activity为空。
  2. 修改位于res/layout/activity_main.xml的activity_main.xml，以添加文本视图
  3. 在res/layout目录下创建一个名为fragment_stack.xml的布局，以定义您的fragment标签和button标签
  4. 创建一个位于res/的文件夹，并将其命名为animator，然后添加fragment_slide_right_enter.xml和fragment_slide_left_exit.xml 和 fragment_slide_right_exit.xml和fragment_slide_left_enter.xml
  5. 在MainActivity.java中，需要添加片段堆栈，片段管理器和onCreateView()
  6. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是包含TextView 的res.layout/activity_main.xml的内容
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <LinearLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:orientation="vertical" >
  
      <FrameLayout
          android:id="@+id/fragment1"
          android:layout_width="match_parent"
          android:layout_height="0dp"
          android:layout_weight="1" />
  
      <Button
          android:id="@+id/new_fragment"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:text="添加新片段" />
  
  </LinearLayout>
```
  
  以下是res/layout/fragment_stack.xml文件的内容。它包含框架布局和按钮
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
      android:orientation="vertical" android:layout_width="match_parent"
      android:layout_height="match_parent">
      <TextView
          android:id="@+id/text"
          android:layout_width="match_parent"
          android:layout_height="match_parent"
          android:gravity="center"/>
  </LinearLayout>
```
  
  以下是res/animator/fragment_slide_left_enter.xml文件的内容。它包含set和objectAnimator标签
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <set xmlns:android="http://schemas.android.com/apk/res/android">
      <objectAnimator
          android:interpolator="@android:interpolator/decelerate_quint"
          android:valueFrom="100dp" android:valueTo="0dp"
          android:valueType="floatType"
          android:propertyName="translationX"
          android:duration="@android:integer/config_mediumAnimTime" />
  
      <objectAnimator
          android:interpolator="@android:interpolator/decelerate_quint"
          android:valueFrom="0.0" android:valueTo="1.0"
          android:valueType="floatType"
          android:propertyName="alpha"
          android:duration="@android:integer/config_mediumAnimTime" />
  </set>
```
  
  以下是res/animator/fragment_slide_left_exit.xml文件的内容。它包含set和objectAnimator标签。
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <set xmlns:android="http://schemas.android.com/apk/res/android">
      <objectAnimator
          android:interpolator="@android:interpolator/decelerate_quint"
          android:valueFrom="100dp" android:valueTo="0dp"
          android:valueType="floatType"
          android:propertyName="translationX"
          android:duration="@android:integer/config_mediumAnimTime" />
  
      <objectAnimator
          android:interpolator="@android:interpolator/decelerate_quint"
          android:valueFrom="0.0" android:valueTo="1.0"
          android:valueType="floatType"
          android:propertyName="alpha"
          android:duration="@android:integer/config_mediumAnimTime" />
  </set>
```
  
  以下是res/animator/fragment_slide_right_enter.xml文件的内容。它包含set和objectAnimator标签
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <set xmlns:android="http://schemas.android.com/apk/res/android">
      <objectAnimator
          android:interpolator="@android:interpolator/decelerate_quint"
          android:valueFrom="-100dp" android:valueTo="0dp"
          android:valueType="floatType"
          android:propertyName="translationX"
          android:duration="@android:integer/config_mediumAnimTime" />
  
      <objectAnimator
          android:interpolator="@android:interpolator/decelerate_quint"
          android:valueFrom="0.0" android:valueTo="1.0"
          android:valueType="floatType"
          android:propertyName="alpha"
          android:duration="@android:integer/config_mediumAnimTime" />
  </set>
```
  
  以下是res/animator/fragment_slide_right_exit.xml文件的内容，其中包含set和objectAnimator标签
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <set xmlns:android="http://schemas.android.com/apk/res/android">
      <objectAnimator
          android:interpolator="@android:interpolator/decelerate_quint"
          android:valueFrom="0dp" android:valueTo="100dp"
          android:valueType="floatType"
          android:propertyName="translationX"
          android:duration="@android:integer/config_mediumAnimTime" />
  
      <objectAnimator
          android:interpolator="@android:interpolator/decelerate_quint"
          android:valueFrom="1.0" android:valueTo="0.0"
          android:valueType="floatType"
          android:propertyName="alpha"
          android:duration="@android:integer/config_mediumAnimTime" />
  </set>
```
  
  以下代码将是src/main/java/MainActivity.java文件的内容。它包含按钮侦听器，堆栈片段和onCreateView
  
```java
  
  
  import android.app.Activity;
  import android.app.Fragment;
  import android.app.FragmentTransaction;
  import android.os.Bundle;
  
  import android.view.LayoutInflater;
  import android.view.View;
  import android.view.View.OnClickListener;
  import android.view.ViewGroup;
  
  import android.widget.Button;
  import android.widget.TextView;
  
  /** * 演示在判断事务中使用自定义动画. */
  public class MainActivity extends Activity {
      int mStackLevel = 1;
  
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
  
          Button button = (Button)findViewById(R.id.new_fragment);
  
          button.setOnClickListener(new OnClickListener() {
              public void onClick(View v) {
                  addFragmentToStack();
              }
          });
  
          if (savedInstanceState == null) {
              // 添加初始碎片
              Fragment newFragment = CountingFragment.newInstance(mStackLevel);
              FragmentTransaction ft = getFragmentManager().beginTransaction();
              ft.add(R.id.fragment1, newFragment).commit();
          }
          else
          {
              mStackLevel = savedInstanceState.getInt("level");
          }
      }
  
      @Override
      public void onSaveInstanceState(Bundle outState) {
          super.onSaveInstanceState(outState);
          outState.putInt("level", mStackLevel);
      }
  
      void addFragmentToStack() {
          mStackLevel++;
  
          // 实例化新的碎片
          Fragment newFragment = CountingFragment.newInstance(mStackLevel);
  
          // 添加碎片到活动，并将其放入后退栈中
          FragmentTransaction ft = getFragmentManager().beginTransaction();
          ft.setCustomAnimations(R.animator.fragment_slide_left_enter,
                  R.animator.fragment_slide_left_exit,
                  R.animator.fragment_slide_right_enter,
                  R.animator.fragment_slide_right_exit);
          ft.replace(R.id.fragment1, newFragment);
          ft.addToBackStack(null);
          ft.commit();
      }
  
      public static class CountingFragment extends Fragment {
          int mNum;
          /**         * 创建CountingFragment的实例，提供"num"作为参数         */
          static CountingFragment newInstance(int num) {
              CountingFragment f = new CountingFragment();
  
              Bundle args = new Bundle();
              args.putInt("num", num);
              f.setArguments(args);
              return f;
          }
  
          /**         * 在创建时，获取实例的number参数.         */
          @Override
          public void onCreate(Bundle savedInstanceState) {
              super.onCreate(savedInstanceState);
              mNum = getArguments() != null ? getArguments().getInt("num") : 1;
          }
          /**         * 碎片的界面仅包含一个TextView，用于显示number         */
          @Override
          public View onCreateView(LayoutInflater inflater, ViewGroup container,Bundle savedInstanceState) {
              View v = inflater.inflate(R.layout.fragment_stack, container, false);
              View tv = v.findViewById(R.id.text);
              ((TextView)tv).setText("Fragment #" + mNum);
              tv.setBackgroundDrawable(getResources().getDrawable(android.R.drawable.gallery_thumb));
              return v;
          }
      }
  }
```
  
  以下将是AndroidManifest.xml的内容
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.jc2182.helloworld">
  
      <application
          android:allowBackup="true"
          android:icon="@drawable/ic_launcher"
          android:label="@string/app_name"
          android:theme="@style/AppTheme" >
  
          <activity
              android:name=".MainActivity"
              android:label="@string/app_name" >
  
              <intent-filter>
                  <action android:name="android.intent.action.MAIN" />
                  <category android:name="android.intent.category.LAUNCHER" />
              </intent-filter>
  
          </activity>
  
      </application>
  
  </manifest>
```
  
  运行应用程序::
  
  让我们尝试运行我们刚刚创建的HelloWorld应用程序。我假设您是在进行环境设置时创建的AVD。要从Android Studio运行该应用，请打开您项目的Activity文件之一，然后运行图标从工具栏中单击运行图标。Android在您的AVD上安装该应用程序并启动它，如果您的设置和应用程序一切正常，它将在“模拟器”窗口中显示-
  
  ![fragment](https://www.jc2182.com/images/android/fragmenttransitions1.png)
  
  点击“添加片段”按钮，会出现如下：
