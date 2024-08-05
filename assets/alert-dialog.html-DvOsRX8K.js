import{_ as t,c as e,o as n,d as o}from"./app-CbULZrmi.js";const i={},a=o(`<h1 id="对话框" tabindex="-1"><a class="header-anchor" href="#对话框"><span>对话框</span></a></h1><ul><li>对话框是一个小窗口，提示用户做出决定或输入其他信息。在您的应用程序中，有时候，如果您想让用户根据用户采取的任何特定操作，在是或否之间做出决定，方法是保留在同一活动中而不更改屏幕，则可以使用“警告对话框”。为了创建警报对话框，您需要创建一个<strong>AlertDialogBu​​ilder</strong>对象，该对象是<strong>AlertDialog</strong>的内部类。其语法如下</li></ul><pre><code class="language-java">  AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(this);
</code></pre><p>现在，您必须使用AlertDialogBu​​ilder类的对象设置正（是）或负（否）按钮。它的语法是</p><pre><code class="language-java">  alertDialogBuilder.setPositiveButton(CharSequence text, 
     DialogInterface.OnClickListener listener)
  alertDialogBuilder.setNegativeButton(CharSequence text, 
     DialogInterface.OnClickListener listener)
</code></pre><p>除此之外，您还可以使用builder类提供的其他功能来自定义警报对话框。这些在下面列出</p><table><thead><tr><th>分发流程</th><th>说明</th></tr></thead><tbody><tr><td><strong>setIcon(Drawable icon)</strong></td><td>此方法设置警报对话框的图标。</td></tr><tr><td><strong>setCancelable(boolean cancel able)</strong></td><td>此方法设置对话框是否可以取消的属性</td></tr><tr><td><strong>setMessage(CharSequence message)</strong></td><td>此方法设置要在警报对话框中显示的消息</td></tr><tr><td><strong>setMultiChoiceItems(CharSequence[] items, boolean[] checkedItems, DialogInterface.OnMultiChoiceClickListener listener)</strong></td><td>此方法将要在对话框中显示的项目列表设置为内容。 选定的选项将由侦听器通知</td></tr><tr><td><strong>setOnCancelListener(DialogInterface.OnCancelListener onCancelListener)</strong></td><td>此方法设置在取消对话框时将调用的回调。</td></tr><tr><td><strong>setTitle(CharSequence title)</strong></td><td>此方法设置标题显示在对话框。</td></tr></tbody></table><p>创建并设置对话框构建器之后，您将通过调用构建器类的create()方法来创建警报对话框。它的语法是</p><pre><code class="language-java">  AlertDialog alertDialog = alertDialogBuilder.create();
  alertDialog.show();
</code></pre><p>这将创建警报对话框，并将其显示在屏幕上。</p><h2 id="对话片段" tabindex="-1"><a class="header-anchor" href="#对话片段"><span>对话片段</span></a></h2><p>在进入示例之前，我们需要了解对话框片段。对话框片段是可以在对话框中显示片段的片段</p><pre><code class="language-java">  public class DialogFragment extends DialogFragment {
     @Override
     public Dialog onCreateDialog(Bundle savedInstanceState) {
        // 使用Builder类进行便捷的对话框构建
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        builder.setPositiveButton(R.string.fire, new DialogInterface.OnClickListener() {
           public void onClick(DialogInterface dialog, int id) {
              toast.makeText(this,&quot;enter a text here&quot;,Toast.LENTH_SHORT).show();
           }
        })
        .setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
           public void onClick(DialogInterface dialog, int id) {
              finish();
           });
           // 创建AlertDialog对象并返回它
           return builder.create();
        }
     }
  }
</code></pre><h2 id="列表对话框" tabindex="-1"><a class="header-anchor" href="#列表对话框"><span>列表对话框</span></a></h2><p>它用于在对话框中显示项目列表。假设用户需要选择一个项目列表，或者需要从多个项目列表中单击一个项目，在这种情况下，我们可以使用列表对话框。</p><pre><code class="language-java">  public Dialog onCreateDialog(Bundle savedInstanceState) {
     AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
     builder.setTitle(Pick a Color).setItems(R.array.colors_array, new DialogInterface.OnClickListener() {
        public void onClick(DialogInterface dialog, int which) {
           // which参数包含所选项目的索引位置
        }
     });
     return builder.create();
  }
</code></pre><h2 id="单选列表对话框" tabindex="-1"><a class="header-anchor" href="#单选列表对话框"><span>单选列表对话框</span></a></h2><p>它曾经用来在对话框中添加单选列表。我们可以根据用户的选择进行选择或取消选择。</p><pre><code class="language-java">  public Dialog onCreateDialog(Bundle savedInstanceState) {
     mSelectedItems = new ArrayList();
     AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
  
     builder.setTitle(&quot;This is list choice dialog box&quot;);
     .setMultiChoiceItems(R.array.toppings, null,
        new DialogInterface.OnMultiChoiceClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int which, boolean isChecked) {
  
           if (isChecked) {
              // 如果用户选中了该项目，则将其添加到所选项目中
              mSelectedItems.add(which);
           }
  
           else if (mSelectedItems.contains(which)) {
              // 否则，如果该项目已经在数组中，请将其删除
              mSelectedItems.remove(Integer.valueOf(which));
           }
        }
     })
  
     // 设置动作按钮
     .setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int id) {
           // User clicked OK, so save the mSelectedItems results somewhere
           // or return them to the component that opened the dialog
           ...
        }
     })
  
     .setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int id) {
           ...
        }
     });
     return builder.create();
  }
</code></pre><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>以下示例演示了在Android中使用AlertDialog的方法。要试验该示例，您需要在仿真器或实际设备上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件以添加警报对话框代码以启动对话框。</li><li>修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.app.Activity;
  import android.app.AlertDialog;
  import android.content.DialogInterface;
  import android.os.Bundle;
  import android.view.View;
  import android.widget.Toast;
 
  

public class MainActivity extends Activity {
 @Override
 protected void onCreate(Bundle savedInstanceState) {
 super.onCreate(savedInstanceState);
 setContentView(R.layout.activity_main);
 }

 
  public void open(View view){
      AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(this);
      alertDialogBuilder.setMessage(&quot;您确定吗?&quot;);
              alertDialogBuilder.setPositiveButton(&quot;是&quot;, new DialogInterface.OnClickListener() {
                          @Override
                          public void onClick(DialogInterface arg0, int arg1) {
                              Toast.makeText(MainActivity.this,&quot;您点击了‘是’按钮&quot;, Toast.LENGTH_LONG).show();
                          }
                      });

      alertDialogBuilder.setNegativeButton(&quot;否&quot;,new DialogInterface.OnClickListener() {
          @Override
          public void onClick(DialogInterface dialog, int which) {
              finish();
          }
      });

      AlertDialog alertDialog = alertDialogBuilder.create();
      alertDialog.show();
  }
 

}

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout
    xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot; android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;警告框示例&quot;
        android:id=&quot;@+id/textView&quot;
        android:textSize=&quot;35dp&quot;
        android:layout_alignParentTop=&quot;true&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;TextView
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;蝴蝶教程&quot;
        android:id=&quot;@+id/textView2&quot;
        android:textColor=&quot;#ff3eff0f&quot;
        android:textSize=&quot;35dp&quot;
        android:layout_below=&quot;@+id/textView&quot;
        android:layout_centerHorizontal=&quot;true&quot; /&gt;

    &lt;ImageView
        android:id=&quot;@+id/imageView&quot;
        android:layout_width=&quot;198dp&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:layout_below=&quot;@+id/textView2&quot;
        android:layout_alignLeft=&quot;@+id/textView&quot;
        android:layout_alignRight=&quot;@+id/textView2&quot;
        android:layout_marginRight=&quot;-43dp&quot;
        android:background=&quot;#22332266&quot;
        android:src=&quot;@drawable/logo&quot; /&gt;
    &lt;Button
        android:layout_width=&quot;wrap_content&quot;
        android:layout_height=&quot;wrap_content&quot;
        android:text=&quot;警告框&quot;
        android:id=&quot;@+id/button&quot;
        android:layout_below=&quot;@+id/imageView&quot;
        android:layout_alignRight=&quot;@+id/textView2&quot;
        android:layout_alignEnd=&quot;@+id/textView2&quot;
        android:layout_marginTop=&quot;42dp&quot;
        android:onClick=&quot;open&quot;
        android:layout_alignLeft=&quot;@+id/imageView&quot;
        android:layout_alignStart=&quot;@+id/imageView&quot; /&gt;

&lt;/RelativeLayout&gt;
</code></pre><p>让我们尝试运行刚刚修改的应用程序。我假设您在进行环境设置时已创建了AVD。要从Android Studio运行该应用，请打开您项目的活动文件之一，然后工具栏中单击“运行”图标。Android studio将应用程序安装在您的AVD上并启动它，如果设置和应用程序一切正常，它将显示在“模拟器”窗口下面-</p><p><img src="https://www.jc2182.com/images/android/alertdialog1.png" alt=""></p><p>点击“警告框”按钮，如下界面</p><p><img src="https://www.jc2182.com/images/android/alertdialog2.png" alt=""></p><p>点击“是”按钮，如下界面</p>`,31),r=[a];function l(d,c){return n(),e("div",null,r)}const s=t(i,[["render",l],["__file","alert-dialog.html.vue"]]),g=JSON.parse('{"path":"/android-tutor/advanced/alert-dialog.html","title":"对话框","lang":"zh-CN","frontmatter":{"description":"对话框 对话框是一个小窗口，提示用户做出决定或输入其他信息。在您的应用程序中，有时候，如果您想让用户根据用户采取的任何特定操作，在是或否之间做出决定，方法是保留在同一活动中而不更改屏幕，则可以使用“警告对话框”。为了创建警报对话框，您需要创建一个AlertDialogBu​​ilder对象，该对象是AlertDialog的内部类。其语法如下 现在，您必...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/alert-dialog.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"对话框"}],["meta",{"property":"og:description","content":"对话框 对话框是一个小窗口，提示用户做出决定或输入其他信息。在您的应用程序中，有时候，如果您想让用户根据用户采取的任何特定操作，在是或否之间做出决定，方法是保留在同一活动中而不更改屏幕，则可以使用“警告对话框”。为了创建警报对话框，您需要创建一个AlertDialogBu​​ilder对象，该对象是AlertDialog的内部类。其语法如下 现在，您必..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.jc2182.com/images/android/alertdialog1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"对话框\\",\\"image\\":[\\"https://www.jc2182.com/images/android/alertdialog1.png\\",\\"https://www.jc2182.com/images/android/alertdialog2.png\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"对话片段","slug":"对话片段","link":"#对话片段","children":[]},{"level":2,"title":"列表对话框","slug":"列表对话框","link":"#列表对话框","children":[]},{"level":2,"title":"单选列表对话框","slug":"单选列表对话框","link":"#单选列表对话框","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":4.68,"words":1405},"filePathRelative":"android-tutor/advanced/alert-dialog.md","localizedDate":"2023年5月22日","autoDesc":true}');export{s as comp,g as data};
