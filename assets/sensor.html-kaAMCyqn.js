import{_ as t,c as e,o,d as n}from"./app-CbULZrmi.js";const r={},a=n(`<h1 id="传感器" tabindex="-1"><a class="header-anchor" href="#传感器"><span>传感器</span></a></h1><p>大多数android设备都有内置的传感器，可以测量运动，方向和各种环境条件。android平台支持三大类传感器。</p><ul><li><p>运动传感器</p></li><li><p>环境传感器</p></li><li><p>位置传感器</p><p>有些传感器是基于硬件的传感器，有些是基于软件的传感器。无论传感器是什么，android都允许我们从这些传感器获取原始数据，并将其用于我们的应用程序中。为此，android为我们提供了一些类。</p><p>Android提供了<strong>SensorManager</strong>和<strong>Sensor</strong>类，以在我们的应用程序中使用传感器。为了使用传感器，您需要做的第一件事是实例化<strong>SensorManager</strong>类的对象。可以如下实现。</p></li></ul><pre><code class="language-java">  SensorManager sMgr;
  sMgr = (SensorManager)this.getSystemService(SENSOR_SERVICE);
</code></pre><p>接下来需要做的是通过调用SensorManager类的getDefaultSensor()方法来实例化Sensor类的对象。其语法如下-</p><pre><code class="language-java">  Sensor light;
  light = sMgr.getDefaultSensor(Sensor.TYPE_LIGHT);
</code></pre><p>声明该传感器后，您需要注册其侦听器并重写onAccuracyChanged和onSensorChanged这两个方法。它的语法如下-</p><pre><code class="language-java">  sMgr.registerListener(this, light,SensorManager.SENSOR_DELAY_NORMAL);
  public void onAccuracyChanged(Sensor sensor, int accuracy) {
  }
  
  public void onSensorChanged(SensorEvent event) {
  }
</code></pre><h2 id="获取支持的传感器列表" tabindex="-1"><a class="header-anchor" href="#获取支持的传感器列表"><span>获取支持的传感器列表</span></a></h2><p>您可以通过调用getSensorList方法获取设备支持的传感器列表，该方法将返回包含传感器名称和版本号以及更多信的传感器列表。然后，您可以遍历列表以获取信息。其语法如下-</p><pre><code class="language-java">  sMgr = (SensorManager)this.getSystemService(SENSOR_SERVICE);
  List&lt;Sensor&gt; list = sMgr.getSensorList(Sensor.TYPE_ALL);
  for(Sensor sensor: list){
  }
</code></pre><p>除了这些方法之外，SensorManager类还提供了其他方法来管理传感器框架。这些方法在下面列出-</p><p>td&gt; td&gt; td&gt; td&gt; td&gt;</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>getDefaultSensor(int type)</strong></td><td>此方法获取给定类型的默认传感器。</td></tr><tr><td><strong>getInclination(float[] I)</strong></td><td>该方法从倾斜矩阵计算以弧度为单位的地磁倾斜角。</td></tr><tr><td><strong>registerListener(SensorListener listener, int sensors, int rate)</strong></td><td>此方法为传感器注册一个侦听器</td></tr><tr><td><strong>unregisterListener(SensorEventListener listener, Sensor sensor)</strong></td><td>此方法为注册了该传感器的传感器注销一个侦听器。</td></tr><tr><td><strong>getOrientation(float[] R, float[] values)</strong></td><td>此方法根据旋转矩阵计算设备的方向。</td></tr><tr><td><strong>getAltitude(float p0, float p)</strong></td><td>此方法从大气压力和海平面压力计算以米为单位的海拔高度。</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>本示例演示了进度对话框的旋转用法。按下按钮时将显示旋转进度对话框。 要尝试使用此示例，您需要在按照以下步骤开发应用程序后，在实际设备上运行此示例。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加必要的代码。</li><li>修改res/layout/activity_main以添加相应的XML组件。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。</p><pre><code class="language-java">  

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
    
          for (int i = 1; i &lt; mList.size(); i++) {
              tv1.setVisibility(View.VISIBLE);
              tv1.append(&quot;\\n&quot; + mList.get(i).getName() + &quot;\\n&quot; + mList.get(i).getVendor() + &quot;\\n&quot; + mList.get(i).getVersion());
          }
      }

  }

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;
    android:transitionGroup=&quot;true&quot;&gt;

    &lt;TextView android:text=&quot;传感器 &quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/textview&quot;
        android:textSize=&quot;35sp&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:id=&quot;@+id/textView&quot;
        android:layout_below=&quot;@+id/textview&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:textColor=&quot;#ff7aff24&quot;
        android:textSize=&quot;35sp&quot; /&gt;

    &lt;ImageView
        android:id=&quot;@+id/imageView&quot;
        android:layout_width=&quot;248dp&quot;
        android:layout_height=&quot;69dp&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginTop=&quot;4dp&quot;
        android:background=&quot;#223311&quot;
        android:src=&quot;@drawable/logo&quot; /&gt;

    &lt;TextView
        android:id=&quot;@+id/textView2&quot;
        android:layout_width=&quot;match_parent&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/imageView&quot;
        android:layout_alignParentStart=&quot;true&quot;
        android:layout_alignParentEnd=&quot;true&quot;
        android:layout_alignParentBottom=&quot;true&quot;
        android:layout_marginStart=&quot;0dp&quot;
        android:layout_marginTop=&quot;21dp&quot;
        android:text=&quot;New Text&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/sensor.png" alt=""></p>`,23),i=[a];function d(s,u){return o(),e("div",null,i)}const p=t(r,[["render",d],["__file","sensor.html.vue"]]),c=JSON.parse('{"path":"/android-tutor/advanced/sensor.html","title":"传感器","lang":"zh-CN","frontmatter":{"description":"传感器 大多数android设备都有内置的传感器，可以测量运动，方向和各种环境条件。android平台支持三大类传感器。 运动传感器 环境传感器 位置传感器 有些传感器是基于硬件的传感器，有些是基于软件的传感器。无论传感器是什么，android都允许我们从这些传感器获取原始数据，并将其用于我们的应用程序中。为此，android为我们提供了一些类。 An...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/sensor.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"传感器"}],["meta",{"property":"og:description","content":"传感器 大多数android设备都有内置的传感器，可以测量运动，方向和各种环境条件。android平台支持三大类传感器。 运动传感器 环境传感器 位置传感器 有些传感器是基于硬件的传感器，有些是基于软件的传感器。无论传感器是什么，android都允许我们从这些传感器获取原始数据，并将其用于我们的应用程序中。为此，android为我们提供了一些类。 An..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/sensor.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"传感器\\",\\"image\\":[\\"https://www.jc2182.com/images/android/sensor.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"获取支持的传感器列表","slug":"获取支持的传感器列表","link":"#获取支持的传感器列表","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3.62,"words":1086},"filePathRelative":"android-tutor/advanced/sensor.md","localizedDate":"2023年5月22日","autoDesc":true}');export{p as comp,c as data};
