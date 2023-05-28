## 镜像

<https://libraries.io/>
<https://www.finclip.com/downloads/?activeTab=assistant>
<https://developer.android.com/build/migrate-to-kotlin-dsl>
<https://www.an.rustfisher.com/>
<https://juejin.cn/post/7219234932735934524#comment>

gradle用法  <https://juejin.cn/post/6895299152226615309>
<https://www.jetpackcompose.app/compose-catalog>

## 配置国内镜像

<https://doc.nju.edu.cn/books/35f4a/page/gradle>
第一种

```

settingsEvaluated { settings ->
    settings.dependencyResolutionManagement {
        repositories {
            maven {
            url "https://maven.aliyun.com/repository/public"
        }
        google {
            url "https://maven.aliyun.com/repository/google"
        }
        }
    }
}
allprojects {
    repositories {
        maven {
            url "https://maven.aliyun.com/repository/public"
        }
        google {
            url "https://maven.aliyun.com/repository/google"
        }
    }

    buildscript {
        repositories {
            maven {
                url "https://maven.aliyun.com/repository/public"
            }
            google {
                url "https://maven.aliyun.com/repository/google"
            }
        }
    }
}

```

第二种

```

def repoConfig = {
    all { ArtifactRepository repo ->
        if (repo instanceof MavenArtifactRepository) {
            def url = repo.url.toString()
            if (url.contains('maven.org')||url.contains("maven.apache.org") || url.startsWith('https://jcenter.bintray.com/')||url.contains('dl.google.com')) {
                println "gradle init: (${repo.name}: ${repo.url}) removed"
                println("(${repo.name}: ${repo.url})已被移除")
                remove repo
            }
        }
    }
    // maven { url 'http://mirrors.cloud.tencent.com/nexus/repository/maven-public/' }
    maven { url 'https://maven.aliyun.com/repository/central' }
    maven { url 'https://maven.aliyun.com/repository/jcenter' }
    maven { url 'https://maven.aliyun.com/repository/google' }
    maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
    maven{
        url "https://jitpack.io"
    }
}

allprojects {
    buildscript {
        repositories repoConfig
    }
    repositories repoConfig
}

```

或者

```
gradle.projectsLoaded {
    rootProject.allprojects {
        buildscript {
            repositories {
                def JCENTER_URL = 'https://maven.aliyun.com/repository/public'
                def GOOGLE_URL = 'https://maven.aliyun.com/repository/google'
                def NEXUS_URL = 'https://maven.aliyun.com/repository/central'
                all { ArtifactRepository repo ->
                    if (repo instanceof MavenArtifactRepository) {
                        def url = repo.url.toString()
                        if (url.startsWith('https://jcenter.bintray.com/')) {
                            project.logger.lifecycle "Repository ${repo.url} replaced by $JCENTER_URL."
                            println("buildscript ${repo.url} replaced by $JCENTER_URL.")
                            remove repo
                        }
                        else if (url.startsWith('https://dl.google.com/dl/android/maven2/')) {
                            project.logger.lifecycle "Repository ${repo.url} replaced by $GOOGLE_URL."
                            println("buildscript ${repo.url} replaced by $GOOGLE_URL.")
                            remove repo
                        }
                        else if (url.startsWith('https://repo1.maven.org/maven2')) {
                            project.logger.lifecycle "Repository ${repo.url} replaced by $REPOSITORY_URL."
                            println("buildscript ${repo.url} replaced by $REPOSITORY_URL.")
                            remove repo
                        }
                    }
                }
                jcenter {
                    url JCENTER_URL
                }
                google {
                    url GOOGLE_URL
                }
                maven {
                    url NEXUS_URL
                }
            }
        }
        repositories {
            def JCENTER_URL = 'https://maven.aliyun.com/repository/public'
            def GOOGLE_URL = 'https://maven.aliyun.com/repository/google'
            def NEXUS_URL = 'https://maven.aliyun.com/repository/central'
            all { ArtifactRepository repo ->
                if (repo instanceof MavenArtifactRepository) {
                    def url = repo.url.toString()
                    if (url.startsWith('https://jcenter.bintray.com/')) {
                        project.logger.lifecycle "Repository ${repo.url} replaced by $JCENTER_URL."
                        println("buildscript ${repo.url} replaced by $JCENTER_URL.")
                        remove repo
                    }
                    else if (url.startsWith('https://dl.google.com/dl/android/maven2/')) {
                        project.logger.lifecycle "Repository ${repo.url} replaced by $GOOGLE_URL."
                        println("buildscript ${repo.url} replaced by $GOOGLE_URL.")
                        remove repo
                    }
                    else if (url.startsWith('https://repo1.maven.org/maven2')) {
                        project.logger.lifecycle "Repository ${repo.url} replaced by $REPOSITORY_URL."
                        println("buildscript ${repo.url} replaced by $REPOSITORY_URL.")
                        remove repo
                    }
                }
            }
            jcenter {
                url JCENTER_URL
            }
            google {
                url GOOGLE_URL
            }
            maven {
                url NEXUS_URL
            }
        }
    }
}
```

## 添加依赖

```groovy
implementation fileTree(dir: 'libs', include: ['*.jar'])
implementation(files("/commonjar/3rdparty/gson-2.8.5.jar"))
```

```
implementation(files("/commonjar/3rdparty/gson-2.8.5.jar"))
  implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.jar", "*.aar"))))
    implementation(fileTree("src/main/libs") {
        include("*.jar", "*.aar")
    })
```

```
./gradlew build --refresh-dependencies
./gradlew app:dependencies --configuration implementation 
```

## 批量删除apk

```
要在git bash下用
adb shell "pm list packages ab.yzq | cut -c9- | xargs -n 1 sh /system/bin/pm uninstall"
```

# kotlin compose

```kotlin

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.material.TopAppBar
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.foundation.layout.Column
import cn.yzq.simpleKt.simple.ui.cat.CatActivity


class HomeListActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                val btns = listOf(
                    MyIntent(
                        "main","main desc", Intent(
                            this,
                            MainActivity::class.java
                        )
                    ),
                    MyIntent(
                        "cat activity","cat desc", Intent(
                            this,
                            CatActivity::class.java
                        )
                    ),

                    )
                Scaffold(topBar = {
                    TopAppBar() {
                        Text(
                            "首页",
                            color = Color.White,
                            modifier = Modifier.padding(horizontal = 10.dp)
                        )
                    }
                }) {
                    Box(modifier = Modifier.padding(it)) {
                        LazyColumn(content = {

                            items(btns) { col ->
                                Column( modifier = Modifier
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
                                        startActivity(
                                            col.intent
                                        )
                                    }) {
                                    Text(text = col.title)
                                    Text(text = col.description ,color=Color.LightGray)
                                }

                            }
                        })
                    }
                }


            }
        }

    }
}
class MyIntent(val title: String,val description:String, val intent: Intent)
```

获取权限

```
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

## gradle用法

```
org.gradle.daemon=true
org.gradle.parallel=true
```

关闭lint和test

kotlin

```

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

```

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

```
button.setOnClickListener(object : View.OnClickListener{
    override fun onClick(v: View?) {
       
    }
})
     button.setOnClickListener {
     
     }

```

## fragment生命周期

 onActivityCreated被弃用 应该使用onViewCreated

## 报错

 Cannot access 'androidx.core.app.OnMultiWindowModeChangedProvider' which is a supertype of 'cn.neoclub.uki.party.CreatePartyActivity'. Check your module classpath for missing or conflicting dependencies.

 加入activity-ktx即可

 ```
   // https://mvnrepository.com/artifact/androidx.activity/activity-ktx
    implementation("androidx.activity:activity-ktx:1.7.0")
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
