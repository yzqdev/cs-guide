import{_ as t,c as e,o as n,d as i}from"./app-CbULZrmi.js";const a={},o=i(`<h1 id="列表片段" tabindex="-1"><a class="header-anchor" href="#列表片段"><span>列表片段</span></a></h1><blockquote><p>**列表片段（ListFragment）**静态库支持版本。用于编写在Android 3.0之前的平台上运行的应用程序。在Android 3.0或更高版本上运行时，仍使用此实现。</p></blockquote><p>列表片段的基本实现是用于创建片段中的列表项</p><p><img src="https://www.jc2182.com/images/android/fragmentlist.jpg" alt="fragmentlist"></p><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>本示例将向您说明如何基于arrayAdapter创建自己的列表片段。因此，让我们按照以下步骤进行操作，类似于创建<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World 例子</a>时遵循的步骤-</p><ol><li>您将使用Android Studio创建一个Android应用程序，并在com.jc2182.helloworld包下将其命名为HelloWrold，Activity为空。</li><li>修改已放置在res/values/string.xml的字符串文件以添加新的字符串常量</li><li>在res/layout目录下创建一个名为list_fragment.xml的布局，以定义列表片段。并将片段标签（<code>&lt;fragment&gt;</code>）添加到您的activity_main.xml中</li><li>创建一个myListFragment.java，它位于java/myListFragment.java，它包含onCreateView()，onActivityCreated()和OnItemClickListener()</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>在开始编码之前，我将在res/values目录下的string.xml文件中初始化字符串常量。</p><pre><code class="language-xml">  &lt;resources&gt;
      &lt;string name=&quot;app_name&quot;&gt;HelloWorld&lt;/string&gt;
      &lt;!-- TODO: Remove or change this placeholder text --&gt;
      &lt;string name=&quot;action_settings&quot;&gt;Settings&lt;/string&gt;
      &lt;string name=&quot;hello_world&quot;&gt;Hello world!&lt;/string&gt;
      &lt;string name=&quot;imgdesc&quot;&gt;imgdesc&lt;/string&gt;
  
      &lt;string-array name=&quot;Planets&quot;&gt;
          &lt;item&gt;太阳&lt;/item&gt;
          &lt;item&gt;水星&lt;/item&gt;
          &lt;item&gt;金星&lt;/item&gt;
          &lt;item&gt;地球&lt;/item&gt;
          &lt;item&gt;火星&lt;/item&gt;
          &lt;item&gt;木星&lt;/item&gt;
          &lt;item&gt;土星&lt;/item&gt;
          &lt;item&gt;天王星&lt;/item&gt;
          &lt;item&gt;海王星&lt;/item&gt;
      &lt;/string-array&gt;
  &lt;/resources&gt;
</code></pre><p>以下是res/layout/activity_main.xml文件的内容。它包含线性布局和片段标签。</p><pre><code class="language-xml">  &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
  &lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
      xmlns:tools=&quot;http://schemas.android.com/tools&quot;
      android:layout_width=&quot;match_parent&quot;
      android:layout_height=&quot;match_parent&quot;
      android:paddingLeft=&quot;@dimen/activity_horizontal_margin&quot;
      android:paddingRight=&quot;@dimen/activity_horizontal_margin&quot;
      android:paddingTop=&quot;@dimen/activity_vertical_margin&quot;
      android:paddingBottom=&quot;@dimen/activity_vertical_margin&quot;
      tools:context=&quot;.MainActivity&quot;&gt;
  
 
  &lt;fragment
      android:id=&quot;@+id/fragment1&quot;
      android:name=&quot;com.jc2182.helloworld.MyListFragment&quot;
      android:layout_width=&quot;match_parent&quot;
      android:layout_height=&quot;match_parent&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>以下是res/layout/list_fragment.xml文件的内容。它包含线性布局，列表视图和文本视图</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;LinearLayout
    xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    android:orientation=&quot;vertical&quot; &gt;

    &lt;ListView
        android:id=&quot;@android:id/list&quot;
        android:layout_width=&quot;match_parent&quot;
        android:layout_height=&quot;wrap_content&quot; &gt;
    &lt;/ListView&gt;

    &lt;TextView
        android:id=&quot;@android:id/empty&quot;
        android:layout_width=&quot;match_parent&quot;
        android:layout_height=&quot;wrap_content&quot; &gt;
    &lt;/TextView&gt;
&lt;/LinearLayout&gt;
</code></pre><p>以下是src/main/java/myListFragment.java文件的内容。在编写代码之前，需要遵循以下几个步骤</p><ul><li><p>创建一个类MyListFragment并将其继承ListFragment。</p></li><li><p>在onCreateView()方法内部，使用上面定义的list_fragment xml布局填充视图。</p></li><li><p>在onActivityCreated()方法中，从资源创建一个arrayadapter，即使用R.array.planet，您可以在string.xml内找到它，并将此适配器设置为listview，还可以设置onItem单击Listener。</p></li><li><p>在OnItemClickListener()方法内部，显示一条正在单击的带有条目名称的祝酒消息。</p></li></ul><pre><code class="language-java">  
  
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
      Toast.makeText(getActivity(), &quot;Item: &quot; + position, Toast.LENGTH_SHORT).show();
  }
 
}

</code></pre><p>以下代码将成为MainActivity.java的内容</p><pre><code class="language-java">


import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}
</code></pre><p>运行应用程序::</p><p>让我们尝试运行我们刚刚创建的HelloWorld应用程序。我假设您是在进行环境设置时创建的AVD。要从Android Studio运行该应用，请打开您项目的Activity文件之一，然后运行图标从工具栏中单击运行图标。Android在您的AVD上安装该应用程序并启动它，如果您的设置和应用程序一切正常，它将在“模拟器”窗口中显示</p><p><img src="https://www.jc2182.com/images/android/listfragment2.png" alt="aa"></p>`,21),r=[o];function d(l,s){return n(),e("div",null,r)}const p=t(a,[["render",d],["__file","list-frag.html.vue"]]),c=JSON.parse('{"path":"/android-tutor/basic/list-frag.html","title":"列表片段","lang":"zh-CN","frontmatter":{"description":"列表片段 **列表片段（ListFragment）**静态库支持版本。用于编写在Android 3.0之前的平台上运行的应用程序。在Android 3.0或更高版本上运行时，仍使用此实现。 列表片段的基本实现是用于创建片段中的列表项 fragmentlist 示例 本示例将向您说明如何基于arrayAdapter创建自己的列表片段。因此，让我们按照以下...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/basic/list-frag.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"列表片段"}],["meta",{"property":"og:description","content":"列表片段 **列表片段（ListFragment）**静态库支持版本。用于编写在Android 3.0之前的平台上运行的应用程序。在Android 3.0或更高版本上运行时，仍使用此实现。 列表片段的基本实现是用于创建片段中的列表项 fragmentlist 示例 本示例将向您说明如何基于arrayAdapter创建自己的列表片段。因此，让我们按照以下..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/fragmentlist.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"列表片段\\",\\"image\\":[\\"https://www.jc2182.com/images/android/fragmentlist.jpg\\",\\"https://www.jc2182.com/images/android/listfragment2.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":3,"words":900},"filePathRelative":"android-tutor/basic/list-frag.md","localizedDate":"2023年5月22日","autoDesc":true}');export{p as comp,c as data};
