---
order: 3
---

# 生命周期管理

## 一、Compose 生命周期

Composable 函数有自己的生命周期：**进入组合 → 重组 → 离开组合**。

```kotlin
@Composable
fun LifecycleDemo() {
    // 进入组合时执行一次
    LaunchedEffect(Unit) {
        println("进入组合")
    }

    // 离开组合时执行
    DisposableEffect(Unit) {
        println("进入组合")
        onDispose {
            println("离开组合——清理资源")
        }
    }
}
```

## 二、LaunchedEffect

`LaunchedEffect` 在 Composable 进入组合时启动协程，当 key 变化时取消并重启：

```kotlin
@Composable
fun LaunchedEffectDemo(userId: String) {
    var userData by remember { mutableStateOf<User?>(null) }

    // key 为 userId：userId 变化时自动重启
    LaunchedEffect(userId) {
        userData = fetchUser(userId)  // 挂起函数
    }

    // key 为 Unit：只在进入时执行一次
    LaunchedEffect(Unit) {
        // 初始化日志等
    }

    // 多个 key：任一变化时重启
    LaunchedEffect(userId, someValue) {
        // ...
    }

    userData?.let { Text(it.name) }
}
```

## 三、DisposableEffect

`DisposableEffect` 用于需要清理的资源注册：

```kotlin
@Composable
fun DisposableEffectDemo(lifecycleOwner: LifecycleOwner) {
    // 监听 Activity/Fragment 生命周期
    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event ->
            when (event) {
                Lifecycle.Event.ON_RESUME -> println("前台")
                Lifecycle.Event.ON_PAUSE -> println("后台")
                else -> {}
            }
        }
        lifecycleOwner.lifecycle.addObserver(observer)

        onDispose {
            lifecycleOwner.lifecycle.removeObserver(observer)
        }
    }
}
```

### 传感器监听示例

```kotlin
@Composable
fun SensorDemo(context: Context = LocalContext.current) {
    val sensorManager = remember { context.getSystemService<SensorManager>()!! }
    val accelerometer = remember { sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER) }

    DisposableEffect(Unit) {
        val listener = SensorEventListener { event, _ ->
            println("加速度：x=${event.values[0]}, y=${event.values[1]}, z=${event.values[2]}")
        }
        sensorManager.registerListener(listener, accelerometer, SensorManager.SENSOR_DELAY_NORMAL)

        onDispose {
            sensorManager.unregisterListener(listener)
        }
    }
}
```

## 四、rememberCoroutineScope

在 Composable 外部（如回调中）启动协程：

```kotlin
@Composable
fun CoroutineScopeDemo() {
    val scope = rememberCoroutineScope()
    var count by remember { mutableIntStateOf(0) }

    Column {
        Text("计数：$count")
        Button(onClick = {
            // 在非 Composable 回调中启动协程
            scope.launch {
                delay(1000)
                count++
            }
        }) {
            Text("延迟 +1")
        }
    }
}
```

## 五、snapshotFlow

将 Compose 状态转换为 Flow：

```kotlin
@Composable
fun SearchDemo() {
    var query by remember { mutableStateOf("") }
    var results by remember { mutableStateOf<List<String>>(emptyList()) }

    LaunchedEffect(Unit) {
        snapshotFlow { query }
            .debounce(300)
            .filter { it.length >= 2 }
            .distinctUntilChanged()
            .collectLatest { q ->
                results = performSearch(q)
            }
    }

    Column {
        OutlinedTextField(value = query, onValueChange = { query = it })
        LazyColumn { items(results) { Text(it) } }
    }
}
```

## 六、Lifecycle 感知

```kotlin
@Composable
fun LifecycleAwareComposable() {
    val lifecycleOwner = LocalLifecycleOwner.current

    // 方式一：LifecycleEventEffect
    LifecycleEventEffect(Lifecycle.Event.ON_RESUME) {
        println("界面恢复")
    }

    // 方式二：LifecycleResumeEffect
    LifecycleResumeEffect(Unit) {
        println("首次显示或恢复")
        onPauseOrDispose {
            println("暂停或离开")
        }
    }

    // 方式三：观察生命周期状态
    val lifecycleState by lifecycleOwner.lifecycle.currentStateFlow.collectAsState()

    Text("当前状态：${lifecycleState}")
}
```

## 七、Window 焦点

```kotlin
@Composable
fun WindowFocusDemo() {
    var isFocused by remember { mutableStateOf(true) }

    LaunchedEffect(Unit) {
        // 监听窗口焦点变化（暂停/恢复游戏等场景）
    }

    // 使用 Modifier 的 onFocusChanged
    var text by remember { mutableStateOf("") }

    OutlinedTextField(
        value = text,
        onValueChange = { text = it },
        modifier = Modifier.onFocusChanged { state ->
            println("获得焦点：${state.isFocused}")
        },
    )
}
```

## 八、remember 与生命周期

```kotlin
@Composable
fun RememberLifecycle() {
    // remember —— 重组时保留，配置变更时丢失
    val normalState = remember { mutableStateOf("") }

    // rememberSaveable —— 配置变更时保留（通过 Bundle）
    val savedState = rememberSaveable { mutableStateOf("") }

    // remember 的 key 参数——key 变化时重新计算
    val computedValue = remember(inputValue) {
        expensiveComputation(inputValue)
    }
}
```

## 九、side-effects 总结

| API | 用途 | 执行时机 |
|-----|------|---------|
| `LaunchedEffect` | 启动协程 | 进入时启动，key 变重启 |
| `DisposableEffect` | 资源清理 | 进入时注册，离开时清理 |
| `SideEffect` | 非 Compose 代码同步 | 每次重组成功时 |
| `rememberCoroutineScope` | 回调中启动协程 | 配置时创建 |
| `snapshotFlow` | 状态 → Flow | 状态变化时发射 |
| `produceState` | 非 Compose → State | 进入时启动，离开时取消 |
| `derivedStateOf` | 派生状态 | 依赖变化时重算 |

### produceState 示例

```kotlin
@Composable
fun ProduceStateDemo(userId: String): State<User?> {
    return produceState<User?>(initialValue = null, key1 = userId) {
        value = fetchUser(userId)
    }
}
```

## 十、综合示例：自动保存草稿

```kotlin
@Composable
fun AutoSaveDraft(initialContent: String, onSave: (String) -> Unit) {
    var content by rememberSaveable { mutableStateOf(initialContent) }

    // 在后台线程自动保存（每 2 秒）
    LaunchedEffect(content) {
        delay(2000)
        onSave(content)
    }

    // 离开时保存最终版
    DisposableEffect(Unit) {
        onDispose {
            if (content != initialContent) {
                onSave(content)
            }
        }
    }

    OutlinedTextField(
        value = content,
        onValueChange = { content = it },
        modifier = Modifier.fillMaxWidth(),
        minLines = 5,
    )
}
```
