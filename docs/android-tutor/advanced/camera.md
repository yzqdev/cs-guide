# 相机
  
  这是以下两种方式，您可以在应用程序中使用相机
  
  - 在我们的应用程序中使用现有的android camera应用程序
  - 在我们的应用程序中直接使用android提供的Camera API

  
  ## 现有的android camera应用程序
  
  您将使用**MediaStore.ACTION_IMAGE_CAPTURE**来启动手机上安装的现有相机应用程序。其语法如下
  
```java
  Intent intent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
```
  
  
  
  除上述内容外，MediaStore还提供其他可用的Intent。它们列出如下
  
  | 常量                            | 说明                                        |
  | ------------------------------- | ------------------------------------------- |
  | **ACTION_IMAGE_CAPTURE_SECURE** | 固定设备后，它将返回从相机捕获的图像        |
  | **ACTION_VIDEO_CAPTURE**        | 它调用android中的现有视频应用程序以捕获视频 |
  | **EXTRA_SCREEN_ORIENTATION**    | 用于将屏幕的方向设置为垂直或横向            |
  | **EXTRA_FULL_SCREEN**           | 它用于控制ViewImage的用户界面               |
  | **INTENT_ACTION_VIDEO_CAMERA**  | 此意图用于在视频模式下启动相机              |
  | **EXTRA_SIZE_LIMIT**            | 用于指定视频或图像捕获大小的大小限制        |
  
  现在，您将使用函数**startActivityForResult()**启动此活动并等待其结果。其语法如下
  
```java
  startActivityForResult(intent,0)
```
  
  
  
  该方法已在Activity类中定义。我们从主要活动中调用它。在活动类中定义的方法具有相同的作用，但是在您不是从活动而是从其他地方进行调用时使用。它们在下面列出
  
  | 方法                                                                                             | 说明                                                 |
  | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
  | **startActivityForResult(Intent intent, int requestCode, Bundle options)**                       | 它开始一个活动，但可以带上额外的选项。               |
  | **startActivityFromChild(Activity child, Intent intent, int requestCode)**                       | 当您的活动是其他任何活动的子项时，它将启动活动。     |
  | **startActivityFromChild(Activity child, Intent intent, int requestCode, Bundle options)**       | 它的工作原理与上述相同，但可以附带捆绑形式的其他值。 |
  | **startActivityFromFragment(Fragment fragment, Intent intent, int requestCode)**                 | 它从您当前所在的片段中启动活动。                     |
  | **startActivityFromFragment(Fragment fragment, Intent intent, int requestCode, Bundle options)** | 它不仅从片段启动活动，而且可以带走额外的价值。       |
  
  无论您使用了哪个函数来启动活动，它们都将返回结果。可以通过重写**onActivityResult**函数来获得结果。
  

  
  ## 示例
  
  这是一个示例，显示了如何启动现有的相机应用程序以捕获图像并以位图的形式显示结果。要尝试使用此示例，您需要在支持相机的实际设备上运行它。
  
  1. 您将使用Android Studio创建一个Android应用程序，并将其命名为Demo，位于com.jc2182.demo包下，如[Hello World示例](https://www.jc2182.com/andriod/android-hello-world.html)一章中所述。
  2. 修改src/MainActivity.java文件用于启动Camera的意图代码。
  3. 修改res/layout/activity_main.xml文件如果需要，可添加任何GUI组件。
  4. 修改AndroidManifest.xml以添加必要的权限。
  5. 运行该应用程序以启动Android模拟器并验证在该应用程序中所做更改的结果。
  
  以下是修改后的主要活动文件src/com.jc2182.demo/MainActivity.java的内容。该文件可以包括每个基本生命周期方法。
  
```java
  package com.jc2182.demo;
  
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
 public static final String ALLOW_KEY = "ALLOWED";
 public static final String CAMERA_PREF = "camera_pref";

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
      alertDialog.setTitle("Alert");
      alertDialog.setMessage("App needs to access the Camera.");

      alertDialog.setButton(AlertDialog.BUTTON_NEGATIVE, "DONT ALLOW", new DialogInterface.OnClickListener() {
                  public void onClick(DialogInterface dialog, int which) {
                      dialog.dismiss();
                      finish();
                  }
              });

      alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "ALLOW", new DialogInterface.OnClickListener() {

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
      alertDialog.setTitle("Alert");
      alertDialog.setMessage("App needs to access the Camera.");

      alertDialog.setButton(AlertDialog.BUTTON_NEGATIVE, "DONT ALLOW",
              new DialogInterface.OnClickListener() {

                  public void onClick(DialogInterface dialog, int which) {
                      dialog.dismiss();
                      //finish();
                  }
              });

      alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "SETTINGS",
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
              for (int i = 0, len = permissions.length; i < len; i++) {
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

          // other 'case' lines to check for other
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
      i.setData(Uri.parse("package:" + context.getPackageName()));
      i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      i.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
      i.addFlags(Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS);
      context.startActivity(i);
  }

  private void openCamera() {
      Intent intent = new Intent("android.media.action.IMAGE_CAPTURE");
      startActivity(intent);
  }

}

```


以下是res/layout/activity_main.xml文件的内容-

```xml

<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
</RelativeLayout>
````



以下是AndroidManifest.xml文件的内容-

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.jc2182.demo">

    <uses-permission android:name="android.permission.CAMERA" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

</manifest>
```



在真实的设备上测试您的demo。