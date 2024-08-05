import{_ as t,c as e,o,d as n}from"./app-CbULZrmi.js";const r={},a=n(`<h1 id="自定义组件" tabindex="-1"><a class="header-anchor" href="#自定义组件"><span>自定义组件</span></a></h1><p>Android提供了很多预构建的小部件列表，例如<a href="https://www.jc2182.com/andriod/android-button-show.html" target="_blank" rel="noopener noreferrer">Button</a>，<a href="https://www.jc2182.com/andriod/android-textview-show.html" target="_blank" rel="noopener noreferrer">TextView</a>，<a href="https://www.jc2182.com/andriod/android-edittext-show.html" target="_blank" rel="noopener noreferrer">EditText</a>，ListView，<a href="https://www.jc2182.com/andriod/android-checkbox-show.html" target="_blank" rel="noopener noreferrer">CheckBox</a>，<a href="https://www.jc2182.com/andriod/android-radiobutton-show.html" target="_blank" rel="noopener noreferrer">RadioButton</a>，Gallery，<a href="https://www.jc2182.com/andriod/android-spinner-show.html" target="_blank" rel="noopener noreferrer">Spinner</a>，<a href="https://www.jc2182.com/andriod/android-autocompletetextview-show.html" target="_blank" rel="noopener noreferrer">AutoCompleteTextView</a>等。您可以直接在Android应用程序开发中使用这些小部件，但是当您对任何可用小部件的现有功能不满意。Android为您提供了创建自己的自定义组件的方法，您可以对其进行自定义以满足自己的需求。如果您只需要对现有的小部件或布局进行少量调整，则可以简单地对小部件或布局进行子类化并覆盖其方法，从而可以精确控制屏幕元素的外观和功能。本教程说明了如何创建自定义视图，并通过简单的步骤在应用程序中使用它们。</p><p>自定义视图层次结构中的自定义组件示例：</p><p><img src="https://www.jc2182.com/images/android/customcomponents.jpg" alt=""></p><h2 id="创建一个简单的自定义组件" tabindex="-1"><a class="header-anchor" href="#创建一个简单的自定义组件"><span>创建一个简单的自定义组件</span></a></h2><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>创建XML res/values/attrs.xml文件以定义新属性及其数据类型。</li><li>修改src/MainActivity.java 为定义的按钮添加单击事件侦听器和处理程序</li><li>修改res/layout/activity_main.xml文件的默认内容并添加代码以创建Color复合视图实例以及一些默认属性和新属性。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>在res/values文件夹中创建以下属性文件attrs.xml。</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;resources xmlns:tools=&quot;http://schemas.android.com/tools&quot;&gt;
      &lt;declare-styleable name=&quot;TimeView&quot;&gt;
          &lt;attr name=&quot;title&quot; format=&quot;string&quot; /&gt;
          &lt;attr name=&quot;setColor&quot; format=&quot;boolean&quot;/&gt;
      &lt;/declare-styleable&gt;
  &lt;/resources&gt;
</code></pre><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.os.Bundle;
  import android.widget.TextView;
 
  

public class MainActivity extends Activity {
 @Override
 protected void onCreate(Bundle savedInstanceState) {
 super.onCreate(savedInstanceState);
 setContentView(R.layout.activity_main);

 

      TextView simpleText = (TextView) findViewById(R.id.simple);
      simpleText.setText(&quot;这是一个简单的TextView&quot;);
  }

 

}

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    xmlns:custom=&quot;http://schemas.android.com/apk/res-auto&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot; &gt;

    &lt;com.jc2182.demo.TimeView
        android:id=&quot;@+id/timeView&quot;
        android:layout_width=&quot;match_parent&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:textColor=&quot;#fff&quot;
        android:textSize=&quot;40sp&quot;
        custom:title=&quot;自定义TimeView&quot;
        custom:setColor=&quot;true&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;match_parent&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/simple&quot;
        android:layout_below=&quot;@id/timeView&quot;
        android:layout_marginTop=&quot;10dp&quot; /&gt;
&lt;/RelativeLayout&gt;
</code></pre><p>为您的复合视图创建以下名为TimeView.java的Java文件。</p><pre><code class="language-java">package com.jc2182.demo;

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

            for (int i = 0; i &lt; count; ++i) {

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
        SimpleDateFormat dateFormat = new SimpleDateFormat(&quot;hh.mm aa&quot;);
        String time = dateFormat.format(Calendar.getInstance().getTime());

        if(this.titleText != null )
            setText(this.titleText+&quot; &quot; + time);
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
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/customcomponents1.png" alt=""></p><p>尝试去修改源代码改变自定义组件的属性值，或添加一些其他属性去实现自己的功能。</p>`,17),i=[a];function d(l,c){return o(),e("div",null,i)}const m=t(r,[["render",d],["__file","custom-components.html.vue"]]),p=JSON.parse('{"path":"/android-tutor/interface/custom-components.html","title":"自定义组件","lang":"zh-CN","frontmatter":{"description":"自定义组件 Android提供了很多预构建的小部件列表，例如Button，TextView，EditText，ListView，CheckBox，RadioButton，Gallery，Spinner，AutoCompleteTextView等。您可以直接在Android应用程序开发中使用这些小部件，但是当您对任何可用小部件的现有功能不满意。Andro...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/interface/custom-components.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"自定义组件"}],["meta",{"property":"og:description","content":"自定义组件 Android提供了很多预构建的小部件列表，例如Button，TextView，EditText，ListView，CheckBox，RadioButton，Gallery，Spinner，AutoCompleteTextView等。您可以直接在Android应用程序开发中使用这些小部件，但是当您对任何可用小部件的现有功能不满意。Andro..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/customcomponents.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"自定义组件\\",\\"image\\":[\\"https://www.jc2182.com/images/android/customcomponents.jpg\\",\\"https://www.jc2182.com/images/android/customcomponents1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"创建一个简单的自定义组件","slug":"创建一个简单的自定义组件","link":"#创建一个简单的自定义组件","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.37,"words":1012},"filePathRelative":"android-tutor/interface/custom-components.md","localizedDate":"2023年5月22日","autoDesc":true}');export{m as comp,p as data};
