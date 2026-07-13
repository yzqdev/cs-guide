# Compose 状态管理

## 一、remember —— 记住状态

```kotlin
@Composable
fun CounterExample() {
    // mutableStateOf 创建可观察状态
    // remember 保证在重组时保留状态
    var count by remember { mutableIntStateOf(0) }

    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text("计数：$count", fontSize = 24.sp)
        Spacer(Modifier.height(16.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { count-- }) { Text("-") }
            Button(onClick = { count++ }) { Text("+") }
        }
    }
}
```

## 二、remember vs rememberSaveable

```kotlin
@Composable
fun SaveableStateExample() {
    // remember：屏幕旋转后丢失
    var lostState by remember { mutableStateOf("丢失") }

    // rememberSaveable：屏幕旋转后保留（通过 Bundle）
    var savedState by rememberSaveable { mutableStateOf("保留") }
}
```

## 三、State 提升

将状态提升到调用方，实现单向数据流：

```kotlin
// ✅ 正确做法：状态提升
@Composable
fun ExpandableCard(
    title: String,
    expanded: Boolean,       // 状态由调用方传入
    onToggle: () -> Unit,    // 事件回调
    content: @Composable () -> Unit,
) {
    Card(
        onClick = onToggle,
        modifier = Modifier.fillMaxWidth().padding(8.dp),
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text(title, fontWeight = FontWeight.Bold)
                Icon(
                    if (expanded) Icons.Default.ExpandLess
                    else Icons.Default.ExpandMore,
                    contentDescription = if (expanded) "收起" else "展开",
                )
            }
            if (expanded) {
                Spacer(Modifier.height(8.dp))
                content()
            }
        }
    }
}

// 使用方
@Composable
fun Parent() {
    var expanded by remember { mutableStateOf(false) }

    ExpandableCard(
        title = "详情",
        expanded = expanded,
        onToggle = { expanded = !expanded },
    ) {
        Text("这是展开后的内容")
    }
}
```

## 四、rememberCoroutineScope

```kotlin
@Composable
fun CoroutineExample {
    val scope = rememberCoroutineScope()

    Button(onClick = {
        scope.launch {
            delay(1000)
            println("协程执行完毕")
        }
    }) {
        Text("启动协程")
    }
}
```

## 五、LaunchedEffect —— 副作用

```kotlin
@Composable
fun LaunchedEffectExample(userId: String) {
    var userData by remember { mutableStateOf<User?>(null) }

    // LaunchedEffect 会在 composition 进入时启动协程
    // key 变化时重启，离开时取消
    LaunchedEffect(userId) {
        userData = fetchUser(userId)  // 挂起函数
    }

    userData?.let {
        Text("用户名：${it.name}")
    }
}
```

## 六、DisposableEffect —— 资源清理

```kotlin
@Composable
fun LifecycleExample() {
    DisposableEffect(Unit) {
        // 初始化（类似 onStart）
        println("组件创建")

        onDispose {
            // 清理（类似 onStop）
            println("组件销毁")
        }
    }
}
```

## 七、derivedStateOf —— 派生状态

```kotlin
@Composable
fun TodoList(todos: List<TodoItem>) {
    // 当 todos 变化时自动重新计算
    val completedCount by remember {
        derivedStateOf { todos.count { it.isCompleted } }
    }

    Text("完成：$completedCount / ${todos.size}")
}

data class TodoItem(val text: String, val isCompleted: Boolean)
```

## 八、collectAsState —— 收集 Flow

```kotlin
class ViewModel : ViewModel() {
    val uiState: StateFlow<UiState> = MutableStateFlow(UiState.Loading)
}

sealed class UiState {
    object Loading : UiState()
    data class Success(val data: String) : UiState()
    data class Error(val message: String) : UiState()
}

@Composable
fun ViewModelExample(viewModel: ViewModel = viewModel()) {
    // 将 Flow 转换为 Compose 状态
    val state by viewModel.uiState.collectAsState()

    when (val s = state) {
        is UiState.Loading -> CircularProgressIndicator()
        is UiState.Success -> Text(s.data)
        is UiState.Error -> Text("错误：${s.message}", color = Color.Red)
    }
}
```

## 九、snapshotFlow —— 将状态转为 Flow

```kotlin
@Composable
fun SnapshotFlowExample() {
    var searchQuery by remember { mutableStateOf("") }

    // 将 Compose 状态转为 Flow
    LaunchedEffect(Unit) {
        snapshotFlow { searchQuery }
            .debounce(300)  // 防抖
            .filter { it.length >= 2 }
            .collect { query ->
                // 执行搜索
                performSearch(query)
            }
    }

    OutlinedTextField(
        value = searchQuery,
        onValueChange = { searchQuery = it },
        label = { Text("搜索") },
    )
}
```

## 十、状态选择指南

| 场景 | 推荐方案 |
|------|---------|
| 组件内部临时状态 | `remember { mutableStateOf() }` |
| 需要屏幕旋转保留 | `rememberSaveable { mutableStateOf() }` |
| 跨组件共享 | 状态提升到父组件 |
| 跨屏幕共享 | ViewModel + StateFlow |
| 异步数据加载 | LaunchedEffect + collectAsState |
| 复杂业务逻辑 | ViewModel + Repository 模式 |

## 十一、完整示例：ViewModel + 状态

```kotlin
// ViewModel
class TodoViewModel : ViewModel() {
    private val _todos = MutableStateFlow<List<Todo>>(emptyList())
    val todos: StateFlow<List<Todo>> = _todos.asStateFlow()

    private val _loading = MutableStateFlow(false)
    val loading: StateFlow<Boolean> = _loading.asStateFlow()

    init {
        loadTodos()
    }

    private fun loadTodos() {
        viewModelScope.launch {
            _loading.value = true
            try {
                _todos.value = fetchTodosFromApi()
            } catch (e: Exception) {
                // 处理错误
            } finally {
                _loading.value = false
            }
        }
    }

    fun toggleTodo(id: Int) {
        _todos.value = _todos.value.map {
            if (it.id == id) it.copy(isCompleted = !it.isCompleted)
            else it
        }
    }
}

data class Todo(val id: Int, val title: String, val isCompleted: Boolean)

// Compose 中使用
@Composable
fun TodoScreen(viewModel: TodoViewModel = viewModel()) {
    val todos by viewModel.todos.collectAsState()
    val loading by viewModel.loading.collectAsState()

    if (loading) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            CircularProgressIndicator()
        }
    } else {
        LazyColumn {
            items(todos, key = { it.id }) { todo ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { viewModel.toggleTodo(todo.id) }
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Checkbox(
                        checked = todo.isCompleted,
                        onCheckedChange = { viewModel.toggleTodo(todo.id) }
                    )
                    Spacer(Modifier.width(8.dp))
                    Text(
                        todo.title,
                        textDecoration = if (todo.isCompleted) TextDecoration.LineThrough else null,
                    )
                }
            }
        }
    }
}
```
