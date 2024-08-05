import{_ as t,c as n,o as e,d as i}from"./app-CbULZrmi.js";const o={},a=i(`<h1 id="相机" tabindex="-1"><a class="header-anchor" href="#相机"><span>相机</span></a></h1><p>这是以下两种方式，您可以在应用程序中使用相机</p><ul><li>在我们的应用程序中使用现有的android camera应用程序</li><li>在我们的应用程序中直接使用android提供的Camera API</li></ul><h2 id="现有的android-camera应用程序" tabindex="-1"><a class="header-anchor" href="#现有的android-camera应用程序"><span>现有的android camera应用程序</span></a></h2><p>您将使用<strong>MediaStore.ACTION_IMAGE_CAPTURE</strong>来启动手机上安装的现有相机应用程序。其语法如下</p><pre><code class="language-java">  Intent intent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
</code></pre><p>除上述内容外，MediaStore还提供其他可用的Intent。它们列出如下</p><table><thead><tr><th>常量</th><th>说明</th></tr></thead><tbody><tr><td><strong>ACTION_IMAGE_CAPTURE_SECURE</strong></td><td>固定设备后，它将返回从相机捕获的图像</td></tr><tr><td><strong>ACTION_VIDEO_CAPTURE</strong></td><td>它调用android中的现有视频应用程序以捕获视频</td></tr><tr><td><strong>EXTRA_SCREEN_ORIENTATION</strong></td><td>用于将屏幕的方向设置为垂直或横向</td></tr><tr><td><strong>EXTRA_FULL_SCREEN</strong></td><td>它用于控制ViewImage的用户界面</td></tr><tr><td><strong>INTENT_ACTION_VIDEO_CAMERA</strong></td><td>此意图用于在视频模式下启动相机</td></tr><tr><td><strong>EXTRA_SIZE_LIMIT</strong></td><td>用于指定视频或图像捕获大小的大小限制</td></tr></tbody></table><p>现在，您将使用函数**startActivityForResult()**启动此活动并等待其结果。其语法如下</p><pre><code class="language-java">  startActivityForResult(intent,0)
</code></pre><p>该方法已在Activity类中定义。我们从主要活动中调用它。在活动类中定义的方法具有相同的作用，但是在您不是从活动而是从其他地方进行调用时使用。它们在下面列出</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td><strong>startActivityForResult(Intent intent, int requestCode, Bundle options)</strong></td><td>它开始一个活动，但可以带上额外的选项。</td></tr><tr><td><strong>startActivityFromChild(Activity child, Intent intent, int requestCode)</strong></td><td>当您的活动是其他任何活动的子项时，它将启动活动。</td></tr><tr><td><strong>startActivityFromChild(Activity child, Intent intent, int requestCode, Bundle options)</strong></td><td>它的工作原理与上述相同，但可以附带捆绑形式的其他值。</td></tr><tr><td><strong>startActivityFromFragment(Fragment fragment, Intent intent, int requestCode)</strong></td><td>它从您当前所在的片段中启动活动。</td></tr><tr><td><strong>startActivityFromFragment(Fragment fragment, Intent intent, int requestCode, Bundle options)</strong></td><td>它不仅从片段启动活动，而且可以带走额外的价值。</td></tr></tbody></table><p>无论您使用了哪个函数来启动活动，它们都将返回结果。可以通过重写<strong>onActivityResult</strong>函数来获得结果。</p><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><p>这是一个示例，显示了如何启动现有的相机应用程序以捕获图像并以位图的形式显示结果。要尝试使用此示例，您需要在支持相机的实际设备上运行它。</p><ol><li>您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如<a href="https://www.jc2182.com/andriod/android-hello-world.html" target="_blank" rel="noopener noreferrer">Hello World示例</a>一章中所述。</li><li>修改src/MainActivity.java文件用于启动Camera的意图代码。</li><li>修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。</li><li>修改AndroidManifest.xml以添加必要的权限。</li><li>运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。</li></ol><p>以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。</p><pre><code class="language-java">  package com.jc2182.demo;
  
  import android.Manifest;
  import android.app.Activity;
  import android.app.AlertDialog;
  import android.content.Context;
  import android.content.DialogInterface;
  import android.content.Intent;
  import android.content.SharedPreferences;
  import android.content.pm.PackageManager;
  import android.net.Uri;
  import android.os.Bundle;
  import android.provider.Settings;
  import androidx.core.app.ActivityCompat;
  import androidx.core.content.ContextCompat;
  

public class MainActivity extends Activity {
 public static final int MY_PERMISSIONS_REQUEST_CAMERA = 100;
 public static final String ALLOW_KEY = &quot;ALLOWED&quot;;
 public static final String CAMERA_PREF = &quot;camera_pref&quot;;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
          if (getFromPref(this, ALLOW_KEY)) {
              showSettingsAlert();
          } else if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {

              // Should we show an explanation?
              if (ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission.CAMERA)) {
                  showAlert();
              } else {
                  // No explanation needed, we can request the permission.
                  ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CAMERA}, MY_PERMISSIONS_REQUEST_CAMERA);
              }
          }
      } else {
          openCamera();
      }

  }
  public static void saveToPreferences(Context context, String key, Boolean allowed) {
      SharedPreferences myPrefs = context.getSharedPreferences(CAMERA_PREF, Context.MODE_PRIVATE);
      SharedPreferences.Editor prefsEditor = myPrefs.edit();
      prefsEditor.putBoolean(key, allowed);
      prefsEditor.commit();
  }

  public static Boolean getFromPref(Context context, String key) {
      SharedPreferences myPrefs = context.getSharedPreferences(CAMERA_PREF, Context.MODE_PRIVATE);
      return (myPrefs.getBoolean(key, false));
  }

  private void showAlert() {
      AlertDialog alertDialog = new AlertDialog.Builder(MainActivity.this).create();
      alertDialog.setTitle(&quot;Alert&quot;);
      alertDialog.setMessage(&quot;App needs to access the Camera.&quot;);

      alertDialog.setButton(AlertDialog.BUTTON_NEGATIVE, &quot;DONT ALLOW&quot;, new DialogInterface.OnClickListener() {
                  public void onClick(DialogInterface dialog, int which) {
                      dialog.dismiss();
                      finish();
                  }
              });

      alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, &quot;ALLOW&quot;, new DialogInterface.OnClickListener() {

                  public void onClick(DialogInterface dialog, int which) {
                      dialog.dismiss();
                      ActivityCompat.requestPermissions(MainActivity.this,
                              new String[]{Manifest.permission.CAMERA},
                              MY_PERMISSIONS_REQUEST_CAMERA);
                  }
              });
      alertDialog.show();
  }

  private void showSettingsAlert() {
      AlertDialog alertDialog = new AlertDialog.Builder(MainActivity.this).create();
      alertDialog.setTitle(&quot;Alert&quot;);
      alertDialog.setMessage(&quot;App needs to access the Camera.&quot;);

      alertDialog.setButton(AlertDialog.BUTTON_NEGATIVE, &quot;DONT ALLOW&quot;,
              new DialogInterface.OnClickListener() {

                  public void onClick(DialogInterface dialog, int which) {
                      dialog.dismiss();
                      //finish();
                  }
              });

      alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, &quot;SETTINGS&quot;,
              new DialogInterface.OnClickListener() {

                  public void onClick(DialogInterface dialog, int which) {
                      dialog.dismiss();
                      startInstalledAppDetailsActivity(MainActivity.this);
                  }
              });

      alertDialog.show();
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
      switch (requestCode) {
          case MY_PERMISSIONS_REQUEST_CAMERA: {
              for (int i = 0, len = permissions.length; i &lt; len; i++) {
                  String permission = permissions[i];

                  if (grantResults[i] == PackageManager.PERMISSION_DENIED) {
                      boolean
                              showRationale =
                              ActivityCompat.shouldShowRequestPermissionRationale(
                                      this, permission);

                      if (showRationale) {
                          showAlert();
                      } else if (!showRationale) {
                          // user denied flagging NEVER ASK AGAIN
                          // you can either enable some fall back,
                          // disable features of your app
                          // or open another dialog explaining
                          // again the permission and directing to
                          // the app setting
                          saveToPreferences(MainActivity.this, ALLOW_KEY, true);
                      }
                  }
              }
          }

          // other &#39;case&#39; lines to check for other
          // permissions this app might request
      }
  }

  @Override
  protected void onResume() {
      super.onResume();
  }

  public static void startInstalledAppDetailsActivity(final Activity context) {
      if (context == null) {
          return;
      }

      final Intent i = new Intent();
      i.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
      i.addCategory(Intent.CATEGORY_DEFAULT);
      i.setData(Uri.parse(&quot;package:&quot; + context.getPackageName()));
      i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      i.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
      i.addFlags(Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS);
      context.startActivity(i);
  }

  private void openCamera() {
      Intent intent = new Intent(&quot;android.media.action.IMAGE_CAPTURE&quot;);
      startActivity(intent);
  }

}

</code></pre><p>以下是res/layout/activity_main.xml文件的内容-</p><pre><code class="language-xml">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;RelativeLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    tools:context=&quot;.MainActivity&quot;&gt;
&lt;/RelativeLayout&gt;
</code></pre><p>以下是AndroidManifest.xml文件的内容-</p><pre><code class="language-xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    package=&quot;com.jc2182.demo&quot;&gt;

    &lt;uses-permission android:name=&quot;android.permission.CAMERA&quot; /&gt;

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
</code></pre><p>在真实的设备上测试您的demo。</p>`,23),r=[a];function d(s,l){return e(),n("div",null,r)}const p=t(o,[["render",d],["__file","camera.html.vue"]]),m=JSON.parse('{"path":"/android-tutor/advanced/camera.html","title":"相机","lang":"zh-CN","frontmatter":{"description":"相机 这是以下两种方式，您可以在应用程序中使用相机 在我们的应用程序中使用现有的android camera应用程序 在我们的应用程序中直接使用android提供的Camera API 现有的android camera应用程序 您将使用MediaStore.ACTION_IMAGE_CAPTURE来启动手机上安装的现有相机应用程序。其语法如下 除上述...","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/android-tutor/advanced/camera.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"相机"}],["meta",{"property":"og:description","content":"相机 这是以下两种方式，您可以在应用程序中使用相机 在我们的应用程序中使用现有的android camera应用程序 在我们的应用程序中直接使用android提供的Camera API 现有的android camera应用程序 您将使用MediaStore.ACTION_IMAGE_CAPTURE来启动手机上安装的现有相机应用程序。其语法如下 除上述..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-25T05:00:38.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-06-25T05:00:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"相机\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-25T05:00:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"现有的android camera应用程序","slug":"现有的android-camera应用程序","link":"#现有的android-camera应用程序","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"createdTime":1684738995000,"updatedTime":1687669238000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":4.12,"words":1236},"filePathRelative":"android-tutor/advanced/camera.md","localizedDate":"2023年5月22日","autoDesc":true}');export{p as comp,m as data};
