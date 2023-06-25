# 自定义组件
  
  Android提供了很多预构建的小部件列表，例如[Button](https://www.jc2182.com/andriod/android-button-show.html)，[TextView](https://www.jc2182.com/andriod/android-textview-show.html)，[EditText](https://www.jc2182.com/andriod/android-edittext-show.html)，ListView，[CheckBox](https://www.jc2182.com/andriod/android-checkbox-show.html)，[RadioButton](https://www.jc2182.com/andriod/android-radiobutton-show.html)，Gallery，[Spinner](https://www.jc2182.com/andriod/android-spinner-show.html)，[AutoCompleteTextView](https://www.jc2182.com/andriod/android-autocompletetextview-show.html)等。您可以直接在Android应用程序开发中使用这些小部件，但是当您对任何可用小部件的现有功能不满意。Android为您提供了创建自己的自定义组件的方法，您可以对其进行自定义以满足自己的需求。如果您只需要对现有的小部件或布局进行少量调整，则可以简单地对小部件或布局进行子类化并覆盖其方法，从而可以精确控制屏幕元素的外观和功能。本教程说明了如何创建自定义视图，并通过简单的步骤在应用程序中使用它们。
  
  自定义视图层次结构中的自定义组件示例：
  
  ![](https://www.jc2182.com/images/android/customcomponents.jpg)
  
## 创建一个简单的自定义组件
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 创建XML res/values/attrs.xml文件以定义新属性及其数据类型。
  3. 修改src/MainActivity.java 为定义的按钮添加单击事件侦听器和处理程序
  4. 修改res/layout/activity_main.xml文件的默认内容并添加代码以创建Color复合视图实例以及一些默认属性和新属性。
  5. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  在res/values文件夹中创建以下属性文件attrs.xml。
  
```xml
  <?xml version="1.0" encoding="utf-8"?>
  <resources xmlns:tools="http://schemas.android.com/tools">
      <declare-styleable name="TimeView">
          <attr name="title" format="string" />
          <attr name="setColor" format="boolean"/>
      </declare-styleable>
  </resources>
```
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.os.Bundle;
  import android.widget.TextView;
 
  

public class MainActivity extends Activity {
 @Override
 protected void onCreate(Bundle savedInstanceState) {
 super.onCreate(savedInstanceState);
 setContentView(R.layout.activity_main);

 

      TextView simpleText = (TextView) findViewById(R.id.simple);
      simpleText.setText("这是一个简单的TextView");
  }

 

}

```

以下是res/layout/activity_main.xml文件的内容-

```xml

<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:custom="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity" >

    <com.jc2182.demo.TimeView
        android:id="@+id/timeView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textColor="#fff"
        android:textSize="40sp"
        custom:title="自定义TimeView"
        custom:setColor="true" />

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/simple"
        android:layout_below="@id/timeView"
        android:layout_marginTop="10dp" />
</RelativeLayout>
```

为您的复合视图创建以下名为TimeView.java的Java文件。

```java
package com.jc2182.demo;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Color;
import android.util.AttributeSet;
import androidx.appcompat.widget.AppCompatTextView;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class TimeView extends AppCompatTextView {
    private String titleText;
    private boolean color;

    public TimeView(Context context) {
        super(context);
        setTimeView();
    }

    public TimeView(Context context, AttributeSet attrs) {
        super(context, attrs);
        // 检索到的值对应于属性的位置
        TypedArray typedArray = context.obtainStyledAttributes(attrs,R.styleable.TimeView);
        int count = typedArray.getIndexCount();
        try{

            for (int i = 0; i < count; ++i) {

                int attr = typedArray.getIndex(i);
                // attr对应于title属性
                if(attr == R.styleable.TimeView_title) {

                    // 从布局设置文本
                    titleText = typedArray.getString(attr);
                    setTimeView();
                } else if(attr == R.styleable.TimeView_setColor) {
                    // 设置attr的颜色“setColor”
                    color = typedArray.getBoolean(attr, false);
                    decorateText();
                }
            }
        }

        // recycle()将被强制执行
        finally {
            // for reuse
            typedArray.recycle();
        }
    }

    public TimeView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        setTimeView();
    }

    private void setTimeView() {
        // has the format hour.minuits am/pm
        SimpleDateFormat dateFormat = new SimpleDateFormat("hh.mm aa");
        String time = dateFormat.format(Calendar.getInstance().getTime());

        if(this.titleText != null )
            setText(this.titleText+" " + time);
        else
            setText(time);
    }

    private void decorateText() {
        // 当我们在XML布局中将setColor属性设置为true时
        if(this.color == true){
            //设置阴影的特征和颜色
            setShadowLayer(4, 2, 2, Color.rgb(250, 00, 250));
            setBackgroundColor(Color.CYAN);
        } else {
            setBackgroundColor(Color.RED);
        }
    }
}
```

让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-

![](https://www.jc2182.com/images/android/customcomponents1.png)

尝试去修改源代码改变自定义组件的属性值，或添加一些其他属性去实现自己的功能。
