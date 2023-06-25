
# 列表片段
  
  > **列表片段（ListFragment）**静态库支持版本。用于编写在Android 3.0之前的平台上运行的应用程序。在Android 3.0或更高版本上运行时，仍使用此实现。
  
  列表片段的基本实现是用于创建片段中的列表项
  
  ![fragmentlist](https://www.jc2182.com/images/android/fragmentlist.jpg)
  
## 示例
  
  本示例将向您说明如何基于arrayAdapter创建自己的列表片段。因此，让我们按照以下步骤进行操作，类似于创建[Hello World 例子](https://www.jc2182.com/andriod/android-hello-world.html)时遵循的步骤-
  
  1. 您将使用Android Studio创建一个Android应用程序，并在com.jc2182.helloworld包下将其命名为HelloWrold，Activity为空。
  2. 修改已放置在res/values/string.xml的字符串文件以添加新的字符串常量
  3. 在res/layout目录下创建一个名为list_fragment.xml的布局，以定义列表片段。并将片段标签（`<fragment>`）添加到您的activity_main.xml中
  4. 创建一个myListFragment.java，它位于java/myListFragment.java，它包含onCreateView()，onActivityCreated()和OnItemClickListener()
  5. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  在开始编码之前，我将在res/values目录下的string.xml文件中初始化字符串常量。
  
```xml
  <resources>
      <string name="app_name">HelloWorld</string>
      <!-- TODO: Remove or change this placeholder text -->
      <string name="action_settings">Settings</string>
      <string name="hello_world">Hello world!</string>
      <string name="imgdesc">imgdesc</string>
  
      <string-array name="Planets">
          <item>太阳</item>
          <item>水星</item>
          <item>金星</item>
          <item>地球</item>
          <item>火星</item>
          <item>木星</item>
          <item>土星</item>
          <item>天王星</item>
          <item>海王星</item>
      </string-array>
  </resources>
```
  
  以下是res/layout/activity_main.xml文件的内容。它包含线性布局和片段标签。
  
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
      android:id="@+id/fragment1"
      android:name="com.jc2182.helloworld.MyListFragment"
      android:layout_width="match_parent"
      android:layout_height="match_parent" />

</RelativeLayout>
```

以下是res/layout/list_fragment.xml文件的内容。它包含线性布局，列表视图和文本视图

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >

    <ListView
        android:id="@android:id/list"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" >
    </ListView>

    <TextView
        android:id="@android:id/empty"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" >
    </TextView>
</LinearLayout>
```

以下是src/main/java/myListFragment.java文件的内容。在编写代码之前，需要遵循以下几个步骤

- 创建一个类MyListFragment并将其继承ListFragment。
  
- 在onCreateView()方法内部，使用上面定义的list_fragment xml布局填充视图。
  
- 在onActivityCreated()方法中，从资源创建一个arrayadapter，即使用R.array.planet，您可以在string.xml内找到它，并将此适配器设置为listview，还可以设置onItem单击Listener。
  
- 在OnItemClickListener()方法内部，显示一条正在单击的带有条目名称的祝酒消息。
  
```java
  
  
  import android.os.Bundle;
  import android.view.LayoutInflater;
  import android.view.View;
  import android.view.ViewGroup;
  import android.widget.AdapterView;
  import android.widget.ArrayAdapter;
  import android.widget.Toast;
  
  import androidx.fragment.app.ListFragment;
  
  
/**  表示项目列表的片段。 */
 public class MyListFragment extends ListFragment implements AdapterView.OnItemClickListener {
 @Override
 public View onCreateView(LayoutInflater inflater,
 ViewGroup container, Bundle savedInstanceState) {
 View view = inflater.inflate(R.layout.list_fragment, container, false);
 return view;
 }

 
  @Override
  public void onActivityCreated(Bundle savedInstanceState) {
      super.onActivityCreated(savedInstanceState);
      ArrayAdapter adapter = ArrayAdapter.createFromResource(getActivity(), R.array.Planets, android.R.layout.simple_list_item_1);
      setListAdapter(adapter);
      getListView().setOnItemClickListener(this);
  }

  @Override
  public void onItemClick(AdapterView parent, View view, int position,long id) {
      Toast.makeText(getActivity(), "Item: " + position, Toast.LENGTH_SHORT).show();
  }
 
}

```

以下代码将成为MainActivity.java的内容

```java



import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}
````

运行应用程序::

让我们尝试运行我们刚刚创建的HelloWorld应用程序。我假设您是在进行环境设置时创建的AVD。要从Android Studio运行该应用，请打开您项目的Activity文件之一，然后运行图标从工具栏中单击运行图标。Android在您的AVD上安装该应用程序并启动它，如果您的设置和应用程序一切正常，它将在“模拟器”窗口中显示

![aa](https://www.jc2182.com/images/android/listfragment2.png)
