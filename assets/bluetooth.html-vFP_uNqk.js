import{_ as t,c as o,o as n,d as e}from"./app-CbULZrmi.js";const i={},d=e(`<h1 id="蓝牙" tabindex="-1"><a class="header-anchor" href="#蓝牙"><span>蓝牙</span></a></h1><p>在许多方法中，蓝牙是一种在两个不同设备之间发送或接收数据的方法。Android平台包括对蓝牙框架的支持，该框架允许设备与其他蓝牙设备无线交换数据。Android提供了蓝牙API来执行这些不同的操作。</p><ul><li><p>扫描其他蓝牙设备</p></li><li><p>获取已配对设备的列表</p></li><li><p>通过服务发现连接到其他设备</p><p>Android提供了<strong>BluetoothAdapter</strong>类来与蓝牙通信。通过调用静态方法**getDefaultAdapter()**创建此调用的对象。其语法如下。</p></li></ul><pre><code class="language-java">  private BluetoothAdapter BA;
  BA = BluetoothAdapter.getDefaultAdapter(); 
</code></pre><p>为了启用设备的蓝牙，请使用以下蓝牙常量<strong>ACTION_REQUEST_ENABLE</strong>调用该意图。它的语法是。。</p><pre><code class="language-java">  Intent turnOn = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
  startActivityForResult(turnOn, 0);       
</code></pre><p>除了此常量之外，API还提供了其他常量来支持不同的任务。它们在下面列出。</p><table><thead><tr><th>常量</th><th>说明</th></tr></thead><tbody><tr><td><strong>ACTION_REQUEST_DISCOVERABLE</strong></td><td>该常数用于打开蓝牙的发现</td></tr><tr><td><strong>ACTION_STATE_CHANGED</strong></td><td>该常数将通知蓝牙状态已更改</td></tr><tr><td><strong>ACTION_FOUND</strong></td><td>此常数用于接收有关发现的每个设备的信息</td></tr></tbody></table><p>启用蓝牙后，可以通过调用**getBondedDevices()**方法获取已配对设备的列表。它返回一组蓝牙设备。它的语法是。</p><pre><code class="language-java">  private Set&lt;BluetoothDevice&gt;pairedDevices;
  pairedDevices = BA.getBondedDevices();
</code></pre><p>除了被阻止的设备外，API中还有其他方法可以更好地控制蓝牙。它们在下面列出。</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>enable()</strong></td><td>如果未启用，此方法将启用适配器</td></tr><tr><td><strong>isEnabled()</strong></td><td>如果启用了适配器，则此方法返回true</td></tr><tr><td><strong>disable()</strong></td><td>此方法禁用适配器</td></tr><tr><td><strong>getName()</strong></td><td>此方法返回蓝牙适配器的名称</td></tr><tr><td><strong>setName(String name)</strong></td><td>此方法更改蓝牙名称</td></tr><tr><td><strong>getState()</strong></td><td>此方法返回蓝牙适配器的当前状态。</td></tr><tr><td><strong>startDiscovery()</strong></td><td>此方法将在120秒内启动蓝牙的发现过程。</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>此示例演示了BluetoothAdapter类的知识，该类可操作蓝牙并显示由蓝牙配对的设备的列表。要试验此示例，您需要在实际设备上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加代码</li><li>修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。</li><li>修改AndroidManifest.xml以添加必要的权限。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.bluetooth.BluetoothAdapter;
  import android.bluetooth.BluetoothDevice;
  import android.content.Intent;
  import android.os.Bundle;
  import android.util.Log;
  import android.view.View;
  import android.widget.ArrayAdapter;
  import android.widget.Button;
  import android.widget.ListView;
  import android.widget.Toast;
  
  import java.util.ArrayList;
  import java.util.Set;
  

public class MainActivity extends Activity {
 Button b1,b2,b3,b4;
 private BluetoothAdapter BA;
 private Set&lt;bluetoothdevice&gt; pairedDevices;
 ListView lv;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      b1 = (Button) findViewById(R.id.button);
      b2=(Button)findViewById(R.id.button2);
      b3=(Button)findViewById(R.id.button3);
      b4=(Button)findViewById(R.id.button4);

      BA = BluetoothAdapter.getDefaultAdapter();
      lv = (ListView)findViewById(R.id.listView);
  }

  public void on(View v){
      if (BA != null){  // 设备不支持蓝牙
          boolean isEnabled = BA.isEnabled();
          if (isEnabled) {
              Intent turnOn = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
              startActivityForResult(turnOn, 0);
              Toast.makeText(getApplicationContext(), &quot;Turned on&quot;,Toast.LENGTH_LONG).show();
          } else {
              Toast.makeText(getApplicationContext(), &quot;Already on&quot;, Toast.LENGTH_LONG).show();
          }
      }else {
          Log.i(&quot;Bluetooth:::&quot;, &quot;Bluetooth not supported&quot;);
          // Show proper message here
          finish();
      }
  }

  public void off(View v){
      if (BA == null){
          Log.i(&quot;Bluetooth:::&quot;, &quot;Bluetooth not supported&quot;);
          // Show proper message here
          finish();
      }
      BA.disable();
      Toast.makeText(getApplicationContext(), &quot;Turned off&quot; ,Toast.LENGTH_LONG).show();
  }


  public  void visible(View v){
      if (BA == null){
          Log.i(&quot;Bluetooth:::&quot;, &quot;Bluetooth not supported&quot;);
          // Show proper message here
          finish();
      }
      Intent getVisible = new Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
      startActivityForResult(getVisible, 0);
  }


  public void list(View v){
      if (BA == null){
          Log.i(&quot;Bluetooth:::&quot;, &quot;Bluetooth not supported&quot;);
          // Show proper message here
          finish();
      }
      pairedDevices = BA.getBondedDevices();

      ArrayList list = new ArrayList();

      for(BluetoothDevice bt : pairedDevices) list.add(bt.getName());
      Toast.makeText(getApplicationContext(), &quot;Showing Paired Devices&quot;,Toast.LENGTH_SHORT).show();

      final ArrayAdapter adapter = new  ArrayAdapter(this,android.R.layout.simple_list_item_1, list);

      lv.setAdapter(adapter);
  }

}

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout
    xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;
    android:transitionGroup=&quot;true&quot;&gt;

    &lt;TextView android:text=&quot;蓝牙示例&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/textview&quot;
        android:textSize=&quot;35dp&quot;
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
        android:textSize=&quot;35dp&quot; /&gt;

    &lt;ImageView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:id=&quot;@+id/imageView&quot;
        android:background=&quot;#22110033&quot;
        android:src=&quot;@drawable/logo&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:theme=&quot;@style/Base.TextAppearance.AppCompat&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button&quot;
        android:layout_width=&quot;98dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/imageView&quot;
        android:layout_marginEnd=&quot;-48dp&quot;
        android:layout_marginRight=&quot;-48dp&quot;
        android:layout_toStartOf=&quot;@+id/imageView&quot;
        android:layout_toLeftOf=&quot;@+id/imageView&quot;
        android:clickable=&quot;true&quot;
        android:onClick=&quot;on&quot;
        android:text=&quot;打开&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button2&quot;
        android:layout_width=&quot;98dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_alignBottom=&quot;@+id/button&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginBottom=&quot;4dp&quot;
        android:onClick=&quot;visible&quot;
        android:text=&quot;可见&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button3&quot;
        android:layout_width=&quot;100dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/imageView&quot;
        android:layout_marginStart=&quot;-51dp&quot;
        android:layout_marginLeft=&quot;-51dp&quot;
        android:layout_toEndOf=&quot;@+id/imageView&quot;
        android:layout_toRightOf=&quot;@+id/imageView&quot;
        android:onClick=&quot;list&quot;
        android:text=&quot;设备列表&quot; /&gt;

    &lt;Button
        android:id=&quot;@+id/button4&quot;
        android:layout_width=&quot;102dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/button&quot;
        android:layout_alignParentStart=&quot;true&quot;
        android:layout_alignParentLeft=&quot;true&quot;
        android:onClick=&quot;off&quot;
        android:text=&quot;关闭&quot; /&gt;

    &lt;ListView
        android:id=&quot;@+id/listView&quot;
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/textView2&quot;
        android:layout_alignStart=&quot;@+id/button&quot;
        android:layout_alignLeft=&quot;@+id/button&quot;
        android:layout_alignParentBottom=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot;
        android:layout_marginStart=&quot;3dp&quot;
        android:layout_marginLeft=&quot;3dp&quot;
        android:layout_marginTop=&quot;31dp&quot;
        android:layout_marginBottom=&quot;-22dp&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;配对的设备：&quot;
        android:id=&quot;@+id/textView2&quot;
        android:textColor=&quot;#ff34ff06&quot;
        android:textSize=&quot;25dp&quot;
        android:layout_below=&quot;@+id/button4&quot;
        android:layout_alignLeft=&quot;@+id/listView&quot;
        android:layout_alignStart=&quot;@+id/listView&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    package=&quot;com.jc2182.demo&quot;&gt;

    &lt;uses-permission android:name=&quot;android.permission.BLUETOOTH&quot;/&gt;
    &lt;uses-permission android:name=&quot;android.permission.BLUETOOTH_ADMIN&quot;/&gt;

    &lt;application
        android:allowBackup=&quot;true&quot;
        android:icon=&quot;@mipmap/ic_launcher&quot;
        android:label=&quot;@string/app_name&quot;
        android:roundIcon=&quot;@mipmap/ic_launcher_round&quot;
        android:supportsRtl=&quot;true&quot;
        android:theme=&quot;@style/AppTheme&quot;&gt;
        &lt;activity android:name=&quot;.MainActivity&quot;&gt;
            &lt;intent-filter&gt;
                &lt;action android:name=&quot;android.intent.action.MAIN&quot; /&gt;

                &lt;category android:name=&quot;android.intent.category.LAUNCHER&quot; /&gt;
            &lt;/intent-filter&gt;
        &lt;/activity&gt;

    &lt;/application&gt;

&lt;/manifest&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/bluetooth1.png" alt=""></p><p>您可以依次点击各个按钮来测试蓝牙的功能。</p>`,24),a=[d];function r(u,l){return n(),o("div",null,a)}const q=t(i,[["render",r],["__file","bluetooth.html.vue"]]),s=JSON.parse('{"path":"/android-tutor/advanced/bluetooth.html","title":"蓝牙","lang":"zh-CN","frontmatter":{"description":"蓝牙 在许多方法中，蓝牙是一种在两个不同设备之间发送或接收数据的方法。Android平台包括对蓝牙框架的支持，该框架允许设备与其他蓝牙设备无线交换数据。Android提供了蓝牙API来执行这些不同的操作。 扫描其他蓝牙设备 获取已配对设备的列表 通过服务发现连接到其他设备 Android提供了BluetoothAdapter类来与蓝牙通信。通过调用静态...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/bluetooth.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"蓝牙"}],["meta",{"property":"og:description","content":"蓝牙 在许多方法中，蓝牙是一种在两个不同设备之间发送或接收数据的方法。Android平台包括对蓝牙框架的支持，该框架允许设备与其他蓝牙设备无线交换数据。Android提供了蓝牙API来执行这些不同的操作。 扫描其他蓝牙设备 获取已配对设备的列表 通过服务发现连接到其他设备 Android提供了BluetoothAdapter类来与蓝牙通信。通过调用静态..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/bluetooth1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"蓝牙\\",\\"image\\":[\\"https://www.jc2182.com/images/android/bluetooth1.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":4.79,"words":1437},"filePathRelative":"android-tutor/advanced/bluetooth.md","localizedDate":"2023年5月22日","autoDesc":true}');export{q as comp,s as data};
