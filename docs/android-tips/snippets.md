# 代码片段
# 安卓代码片段

## 获取navhost

标签使用`androidx.fragment.app.FragmentContainerView`会闪退,因为oncreated生命周期还未初始化
下面的代码可以解决
android文档原文->[链接](https://developer.android.google.cn/guide/navigation/navigation-getting-started?hl=zh-cn#java)

```java

NavHostFragment navHostFragment = (NavHostFragment) getSupportFragmentManager().findFragmentById(R.id.nav_host_fragment_activity_main);
NavController navController = navHostFragment.getNavController();
```

## fragment实例添加argument

```kotlin
    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment RequestFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            RequestFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
```

## fragment添加menu

```kotlin
val menuHost = requireActivity()
        menuHost.addMenuProvider(object : MenuProvider {
            override fun onCreateMenu(menu: Menu, menuInflater: MenuInflater) {
                menuInflater.inflate(R.menu.menu_main, menu)
            }

            override fun onMenuItemSelected(menuItem: MenuItem): Boolean {
                when (menuItem.itemId) {
                    R.id.action_settings -> {
                        Toaster.show("menu")
                        return true
                    }

                    else -> return false
                }
            }

        })

```


# 如何获取Android设备唯一ID？

### 问题

每一个android设备都有唯一ID吗？如果有？怎么用java最简单取得呢？

### 回答1（最佳）

如何取得android唯一码？

好处：

- 1.不需要特定权限.
- 2.在99.5% Android装置（包括root过的）上，即API => 9，保证唯一性.
- 3.重装app之后仍能取得相同唯一值.

伪代码：

```
if API => 9/10: (99.5% of devices)

return unique ID containing serial id (rooted devices may be different)

else

return unique ID of build information (may overlap data - API < 9)
```

代码:

```java

/**
 * Return pseudo unique ID
 * @return ID
 */public static String getUniquePsuedoID() {
    // If all else fails, if the user does have lower than API 9 (lower
    // than Gingerbread), has reset their device or 'Secure.ANDROID_ID'
    // returns 'null', then simply the ID returned will be solely based
    // off their Android device information. This is where the collisions
    // can happen.
    // Thanks http://www.pocketmagic.net/?p=1662!
    // Try not to use DISPLAY, HOST or ID - these items could change.
    // If there are collisions, there will be overlapping data
    String m_szDevIDShort = "35" + (Build.BOARD.length() % 10) + (Build.BRAND.length() % 10) + (Build.CPU_ABI.length() % 10) + (Build.DEVICE.length() % 10) + (Build.MANUFACTURER.length() % 10) + (Build.MODEL.length() % 10) + (Build.PRODUCT.length() % 10);

    // Thanks to @Roman SL!
    // http://stackoverflow.com/a/4789483/950427
    // Only devices with API >= 9 have android.os.Build.SERIAL
    // http://developer.android.com/reference/android/os/Build.html#SERIAL
    // If a user upgrades software or roots their device, there will be a duplicate entry
    String serial = null;
    try {
        serial = android.os.Build.class.getField("SERIAL").get(null).toString();

        // Go ahead and return the serial for api => 9
        return new UUID(m_szDevIDShort.hashCode(), serial.hashCode()).toString();
    } catch (Exception exception) {
        // String needs to be initialized
        serial = "serial"; // some value
    }

    // Thanks @Joe!
    // http://stackoverflow.com/a/2853253/950427
    // Finally, combine the values we have found by using the UUID class to create a unique identifier
    return new UUID(m_szDevIDShort.hashCode(), serial.hashCode()).toString();}
```

### 回答2

好处：

- 1.不需要特定权限.
- 2.在100% Android装置（包括root过的）上，保证唯一性.

坏处

- 1.重装app之后不能取得相同唯一值.

```java
private static String uniqueID = null;
private static final String PREF_UNIQUE_ID = "PREF_UNIQUE_ID";

public synchronized static String id(Context context) {
    if (uniqueID == null) {
        SharedPreferences sharedPrefs = context.getSharedPreferences(
                PREF_UNIQUE_ID, Context.MODE_PRIVATE);
        uniqueID = sharedPrefs.getString(PREF_UNIQUE_ID, null);
        if (uniqueID == null) {
            uniqueID = UUID.randomUUID().toString();
            Editor editor = sharedPrefs.edit();
            editor.putString(PREF_UNIQUE_ID, uniqueID);
            editor.commit();
        }
    }
    return uniqueID;
}
```

### 回答3（需要有电话卡）

好处：
1.重装app之后仍能取得相同唯一值.

代码：

```java
    final TelephonyManager tm = (TelephonyManager) getBaseContext().getSystemService(Context.TELEPHONY_SERVICE);
    final String tmDevice, tmSerial, androidId;
    tmDevice = "" + tm.getDeviceId();
    tmSerial = "" + tm.getSimSerialNumber();
    androidId = "" + android.provider.Settings.Secure.getString(getContentResolver(), android.provider.Settings.Secure.ANDROID_ID);
    UUID deviceUuid = new UUID(androidId.hashCode(), ((long)tmDevice.hashCode() << 32) | tmSerial.hashCode());
    String deviceId = deviceUuid.toString();
```

谨记：要取得以下权限

```
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
```

stackoverflow链接：
<http://stackoverflow.com/questions/2785485/is-there-a-unique-android-device-id>


## activity显示返回按钮

```
oncreated中
  ActionBar actionBar = this.getSupportActionBar();
        actionBar.setTitle("搜索功能");
        actionBar.setDisplayHomeAsUpEnabled(true);
        
        
        然后
       @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if(item.getItemId() == android.R.id.home)
        {
            finish();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }     
    
    
    
```

## 显示返回键

```

 //不要使用navController.getGraph() 不然会出现返回键
        appBarConfiguration = AppBarConfiguration.Builder(
           navController.graph
        )
            .build()
        setupActionBarWithNavController(this, navController, appBarConfiguration)
```

## kotlin用法

### 接口实现

java

```java
button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });

        button.setOnClickListener((v) -> {
            
        });

```

kotlin

```kotlin
button.setOnClickListener(object : View.OnClickListener{
    override fun onClick(v: View?) {
       
    }
})
     button.setOnClickListener {
     
     }

```

## 使用代码实现view布局

```kotlin
  override fun onCreateView(  
    inflater: LayoutInflater,  
    container: ViewGroup?,  
    savedInstanceState: Bundle?  
  ): View? {  
  
    val lvRoot = LinearLayout(requireContext()).apply {  
      orientation = LinearLayout.VERTICAL  
      layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)  
      addView(Button(requireContext()).apply {  
        text = "thi is button"  
        layoutParams = LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT)  
      })  
    }  
    val tv1 = TextView(requireContext()).apply {  
      text = "thi is text"  
      layoutParams = LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT)  
    }  
    val tv2 = TextView(requireContext()).apply {  
      text = "thi is text3333322222222"  
      layoutParams = LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT)  
    }  
  
    lvRoot.addView(tv1)  
    lvRoot.addView(tv2)  
//    _binding = FragmentLineLayoutBinding.inflate(inflater, container, false)  
//    return binding.root  
    return lvRoot.rootView  
  }
```
# kotlin compose

```kotlin
import android.content.Intent  
import android.os.Bundle  
import androidx.activity.ComponentActivity  
import androidx.activity.compose.setContent  
import androidx.compose.foundation.clickable  
import androidx.compose.foundation.layout.Box  
import androidx.compose.foundation.layout.Column  
import androidx.compose.foundation.layout.fillMaxWidth  
import androidx.compose.foundation.layout.padding  
import androidx.compose.foundation.lazy.LazyColumn  
import androidx.compose.foundation.lazy.items  
import androidx.compose.material3.ExperimentalMaterial3Api  
import androidx.compose.material3.MaterialTheme  
import androidx.compose.material3.Scaffold  
import androidx.compose.material3.Text  
import androidx.compose.material3.TopAppBar  
import androidx.compose.ui.Modifier  
import androidx.compose.ui.draw.drawBehind  
import androidx.compose.ui.geometry.Offset  
import androidx.compose.ui.graphics.Color  
import androidx.compose.ui.platform.LocalContext  
import androidx.compose.ui.unit.dp  
import cn.yzq.simpleKt.simple.ui.cat.CatActivity  
  
  
class HomeListActivity : ComponentActivity() {  
  
  @OptIn(ExperimentalMaterial3Api::class)  
  override fun onCreate(savedInstanceState: Bundle?) {  
    super.onCreate(savedInstanceState)  
    setContent {  
      val ctx = LocalContext.current  
      MaterialTheme {  
        val btns = listOf(  
          MyIntent(  
            "main", "main desc",  
          ) {  
            ctx.startActivity(  
              Intent(  
                ctx,  
                MainActivity::class.java  
              )  
            )  
          },  
          MyIntent(  
            "cat activity", "cat desc",  
          ) {  
            ctx.startActivity(  
              Intent(  
                ctx,  
                CatActivity::class.java  
              )  
            )  
          },  
  
          )  
        Scaffold(topBar = {  
          TopAppBar(title = {  
            Text(  
              "首页",  
              color = Color.White,  
              modifier = Modifier.padding(horizontal = 10.dp)  
            )  
          })  
        }) {  
          Box(modifier = Modifier.padding(it)) {  
            LazyColumn(content = {  
  
              items(btns) { col ->  
                Column(modifier = Modifier  
                  .drawBehind {  
  
                    val strokeWidth = 1 * density  
                    val y = size.height - strokeWidth / 2  
  
                    drawLine(  
                      Color.LightGray,  
                      Offset(0f, y),  
                      Offset(size.width, y),  
                      strokeWidth  
                    )  
                  }  
                  .padding(10.dp)  
                  .fillMaxWidth()  
                  .clickable {  
                    col.intent()  
                  }) {  
                  Text(text = col.title)  
                  Text(text = col.description, color = Color.LightGray)  
                }  
  
              }  
            })  
          }        }  
  
  
      }  
    }  
  
  }  
}  
  
class MyIntent(val title: String, val description: String, val intent: () -> Unit)
```

获取权限

```kotlin
package ab.yzq.img.screen

import ab.yzq.img.ScaffoldView
import android.Manifest
import android.content.pm.PackageManager
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext
import androidx.core.content.ContextCompat
import androidx.navigation.NavHostController
import com.elvishew.xlog.XLog
import com.hjq.toast.Toaster

@Composable
fun HomeScreen(navHostController: NavHostController) {
    val ctx= LocalContext.current
    val requestPermissionLauncher =
        rememberLauncherForActivityResult(
            ActivityResultContracts.RequestPermission()
        ) { isGranted: Boolean ->
            if (isGranted) {
                // Permission is granted. Continue the action or workflow in your
                // app.
                Toaster.show("获取权限${Manifest.permission.READ_EXTERNAL_STORAGE}成功")
            } else {
                Toaster.show("获取权限${Manifest.permission.READ_EXTERNAL_STORAGE}失败")
                // Explain to the user that the feature is unavailable because the
                // feature requires a permission that the user has denied. At the
                // same time, respect the user's decision. Don't link to system
                // settings in an effort to convince the user to change their
                // decision.
            }
        }

    ScaffoldView(title = "首页", navController = navHostController) {
        LazyColumn(content = {
            item {
                Button(onClick = {

                    when (PackageManager.PERMISSION_GRANTED) {
                        ContextCompat.checkSelfPermission(
                            ctx,
                            Manifest.permission.READ_EXTERNAL_STORAGE
                        ) -> {

                            // Some works that require permission
                            XLog.enableBorder().d("权限已经获取了")
                        }
                        else -> {
                            // Asking for permission
                           requestPermissionLauncher.launch(Manifest.permission.READ_EXTERNAL_STORAGE)
                        }
                    }
                }) {
                    Text(text = "hhh")
                }
            }
        })
    }
}
```

# 安卓用法

在其他Fragment中取得PreferenceFragmentCompat组件的设定值(设置界面的配置信息)

```
SharedPreferences preferences= PreferenceManager.getDefaultSharedPreferences(getContext());
        boolean flag=preferences.getBoolean("english",true);
        String random=preferences.getString("randomNum","0000");
        Set<String> s=preferences.getStringSet("multi_select_list_preference",null);
        Log.i("lee", "onCreateView: "+flag+random+s);
```
关闭lint和test

kotlin

```kotlin

tasks.configureEach { task ->
    if (task.name.equals("lint")) {
        //this is for speed up build
        task.enabled = false
    }
    if (task.name.contains("Test")) {
        //this is what you need
        task.enabled = false
    }
}
```

groovy

```groovy

gradle.taskGraph.whenReady {
    tasks.each { task ->
        if (task.name.contains("test"))
        {
            task.enabled = false
        }
    }
}

或者
tasks.configureEach { task ->
    if (task.name.equals("lint")) {
        //this is for speed up build
        task.enabled = false
    }
    if (task.name.contains("Test")) {
        //this is what you need
        task.enabled = false
    }
}
```


## compose实现下边框

```

 .drawBehind {

                        val strokeWidth = 1 * density
                        val y = size.height - strokeWidth / 2

                        drawLine(
                            Color.LightGray,
                            Offset(0f, y),
                            Offset(size.width, y),
                            strokeWidth
                        )
                    }
```

## 动态添加组件

### flowlayout

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/constraintLayout"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    >

  <androidx.constraintlayout.helper.widget.Flow
      android:id="@+id/flow"
      android:layout_width="0dp"
      android:layout_height="wrap_content"
      android:orientation="horizontal"
      app:flow_wrapMode="chain"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      />
</androidx.constraintlayout.widget.ConstraintLayout>
```

kotlin

```kotlin
   onCreated()
        val btns = listOf(
            NavIntent("打电话",""){
                val intent = Intent().apply {
                    action = Intent.ACTION_DIAL
                    data = Uri.parse("tel:18856967709")
                }
                startActivity(intent)
            },
            NavIntent("share", "des") {
            val sendIntent: Intent = Intent().apply {
                action = Intent.ACTION_SEND
                putExtra(Intent.EXTRA_TEXT, "This is my text to send.")
                type = "text/plain"
            }

            val shareIntent = Intent.createChooser(sendIntent, null)
            startActivity(shareIntent)
        }, NavIntent("分享富文本", "") {
            val contentUri = "hhttt"
            val share = Intent.createChooser(Intent().apply {
                action = Intent.ACTION_SEND
                putExtra(Intent.EXTRA_TEXT, "https://developer.android.com/training/sharing/")

                // (Optional) Here you're setting the title of the content
                putExtra(Intent.EXTRA_TITLE, "Introducing content previews")

                // (Optional) Here you're passing a content URI to an image to be displayed
                data = Uri.parse(contentUri)
                flags = Intent.FLAG_GRANT_READ_URI_PERMISSION
            }, null)
            startActivity(share)
        },
        NavIntent("get share appas",""){
          val apps=  FileUtil.getShareApps(requireContext())
            apps.forEach {
                XLog.enableBorder().d(it)
            }
        })
        btns.forEachIndexed { index, i ->
            val btn = Button(requireContext())
            btn.apply {
                text = i.title
                isAllCaps = false
                id=View.generateViewId()
            }
            btn.setOnClickListener { i.evt() }
            activityIntentBinding.intentBtnGroup.addView(btn,index)
            activityIntentBinding.intentFlow.addView(btn)
        }

```
