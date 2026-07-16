---
order: 1
---

# Activity 笔记

## Activity 跳转

```kotlin
// Kotlin 方式
startActivity(Intent(this, OtherActivity::class.java))

// 携带参数
val intent = Intent(this, OtherActivity::class.java).apply {
    putExtra("key", "value")
    putExtra("id", 123)
}
startActivity(intent)

// 接收参数
class OtherActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val value = intent.getStringExtra("key")
        val id = intent.getIntExtra("id", 0)
    }
}
```

## 获取返回值（startActivityForResult）

```kotlin
// 方式一：registerForActivityResult（推荐）
val resultLauncher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
    if (result.resultCode == RESULT_OK) {
        val data = result.data
        // 处理返回数据
    }
}

// 启动
resultLauncher.launch(Intent(this, OtherActivity::class.java))

// 返回数据
intent.putExtra("result", "success")
setResult(RESULT_OK, intent)
finish()
```

## Activity 生命周期

```
onCreate()  → 首次创建
onStart()   → 可见
onResume()  → 可交互（前台）
onPause()   → 部分可见（失去焦点）
onStop()    → 完全不可见
onRestart() → 重新启动
onDestroy() → 销毁
```

## 启动模式（launchMode）

| 模式 | 说明 |
|------|------|
| `standard` | 默认，每次创建新实例 |
| `singleTop` | 栈顶复用，否则创建新实例 |
| `singleTask` | 栈内单例，复用并清除其上所有 Activity |
| `singleInstance` | 独立任务栈，全局单例 |

```xml
<!-- AndroidManifest.xml -->
<activity
    android:name=".SingleTopActivity"
    android:launchMode="singleTop" />
```