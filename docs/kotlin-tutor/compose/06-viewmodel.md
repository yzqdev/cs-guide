---
order: 6
---

# ViewModel 与 Compose 集成

## 一、ViewModel 概述

ViewModel 是 Jetpack 的核心组件，用于以生命周期感知的方式存储和管理 UI 相关数据。它会在配置变更（如屏幕旋转）后继续存在。

```kotlin
// 基本 ViewModel
class CounterViewModel : ViewModel() {
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()

    fun increment() {
        _count.value++
    }

    fun decrement() {
        _count.value--
    }
}
```

## 二、在 Compose 中使用 ViewModel

### 1. 添加依赖

```kotlin
// build.gradle.kts
dependencies {
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0")
    implementation("androidx.activity:activity-compose:1.8.2")
}
```

### 2. 基本用法

```kotlin
@Composable
fun CounterScreen(viewModel: CounterViewModel = viewModel()) {
    val count by viewModel.count.collectAsState()

    Scaffold(
        topBar = { TopAppBar(title = { Text("计数器") }) }
    ) { padding ->
        Column(
            modifier = Modifier.fillMaxSize().padding(padding),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) {
            Text("计数：$count", fontSize = 48.sp, fontWeight = FontWeight.Bold)
            Spacer(Modifier.height(24.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                Button(onClick = viewModel::decrement) { Text("-") }
                Button(onClick = viewModel::increment) { Text("+") }
            }
        }
    }
}
```

### 3. ViewModel 工厂方法（带参数）

```kotlin
class UserViewModel(
    private val userId: String,
    private val userRepository: UserRepository,
) : ViewModel() {

    private val _uiState = MutableStateFlow<UserUiState>(UserUiState.Loading)
    val uiState: StateFlow<UserUiState> = _uiState.asStateFlow()

    init { loadUser() }

    private fun loadUser() {
        viewModelScope.launch {
            _uiState.value = UserUiState.Loading
            try {
                val user = userRepository.getUser(userId)
                _uiState.value = UserUiState.Success(user)
            } catch (e: Exception) {
                _uiState.value = UserUiState.Error(e.message ?: "未知错误")
            }
        }
    }
}

sealed class UserUiState {
    object Loading : UserUiState()
    data class Success(val user: User) : UserUiState()
    data class Error(val message: String) : UserUiState()
}

// 自定义工厂
class UserViewModelFactory(
    private val userId: String,
    private val userRepository: UserRepository,
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return UserViewModel(userId, userRepository) as T
    }
}

// Compose 中使用
@Composable
fun UserScreen(userId: String, viewModel: UserViewModel = viewModel(
    factory = UserViewModelFactory(userId, remember { UserRepository() })
)) {
    val state by viewModel.uiState.collectAsState()

    when (val s = state) {
        is UserUiState.Loading -> CircularProgressIndicator()
        is UserUiState.Success -> UserInfo(s.user)
        is UserUiState.Error -> Text("错误：${s.message}", color = Color.Red)
    }
}
```

## 三、StateFlow 与 collectAsState

```kotlin
class SearchViewModel : ViewModel() {
    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery.asStateFlow()

    private val _searchResults = MutableStateFlow<List<String>>(emptyList())
    val searchResults: StateFlow<List<String>> = _searchResults.asStateFlow()

    fun onSearchQueryChanged(query: String) {
        _searchQuery.value = query
    }

    init {
        // 防抖搜索
        viewModelScope.launch {
            _searchQuery
                .debounce(300)
                .filter { it.length >= 2 }
                .distinctUntilChanged()
                .collectLatest { query ->
                    _searchResults.value = performSearch(query)
                }
        }
    }
}

@Composable
fun SearchScreen(viewModel: SearchViewModel = viewModel()) {
    val query by viewModel.searchQuery.collectAsState()
    val results by viewModel.searchResults.collectAsState()

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        OutlinedTextField(
            value = query,
            onValueChange = viewModel::onSearchQueryChanged,
            label = { Text("搜索") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
        )
        Spacer(Modifier.height(16.dp))
        LazyColumn {
            items(results) { item -> Text(item, modifier = Modifier.padding(8.dp)) }
        }
    }
}
```

## 四、SharedFlow 事件处理

对于一次性事件（如导航、Snackbar），使用 SharedFlow：

```kotlin
class EventViewModel : ViewModel() {
    // 事件通道——只发送一次，不重放
    private val _events = MutableSharedFlow<UiEvent>()
    val events: SharedFlow<UiEvent> = _events.asSharedFlow()

    fun saveData() {
        viewModelScope.launch {
            try {
                // 保存数据...
                _events.emit(UiEvent.ShowSnackbar("保存成功"))
                _events.emit(UiEvent.NavigateBack)
            } catch (e: Exception) {
                _events.emit(UiEvent.ShowSnackbar("保存失败：${e.message}"))
            }
        }
    }
}

sealed class UiEvent {
    data class ShowSnackbar(val message: String) : UiEvent()
    object NavigateBack : UiEvent()
    data class NavigateTo(val route: String) : UiEvent()
}

@Composable
fun EventHandlingScreen(viewModel: EventViewModel = viewModel()) {
    val scope = rememberCoroutineScope()
    val snackbarHostState = remember { SnackbarHostState() }

    // 收集一次性事件
    LaunchedEffect(Unit) {
        viewModel.events.collect { event ->
            when (event) {
                is UiEvent.ShowSnackbar -> {
                    snackbarHostState.showSnackbar(event.message)
                }
                is UiEvent.NavigateBack -> { }
                is UiEvent.NavigateTo -> { }
            }
        }
    }

    Scaffold(snackbarHost = { SnackbarHost(snackbarHostState) }) { padding ->
        Button(
            onClick = { viewModel.saveData() },
            modifier = Modifier.fillMaxSize().padding(padding),
        ) {
            Text("保存")
        }
    }
}
```

## 五、ViewModel + SavedStateHandle

```kotlin
class SavedStateViewModel(
    private val savedStateHandle: SavedStateHandle,
) : ViewModel() {

    // SavedStateHandle 中的数据在进程被杀死后也能恢复
    var count: Int
        get() = savedStateHandle.get("count") ?: 0
        set(value) = savedStateHandle.set("count", value)

    var username: String
        get() = savedStateHandle.get("username") ?: ""
        set(value) = savedStateHandle.set("username", value)
}

@Composable
fun SavedStateScreen(viewModel: SavedStateViewModel = viewModel()) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text("计数：${viewModel.count}", fontSize = 24.sp)
        Button(onClick = { viewModel.count++ }) { Text("增加") }
        Spacer(Modifier.height(16.dp))
        OutlinedTextField(
            value = viewModel.username,
            onValueChange = { viewModel.username = it },
            label = { Text("用户名") },
        )
    }
}
```

## 六、多 ViewModel 协作

```kotlin
// 共享数据的 ViewModel —— 通过 SharedViewModel 模式
class SharedViewModel : ViewModel() {
    private val _selectedItem = MutableStateFlow<String?>(null)
    val selectedItem: StateFlow<String?> = _selectedItem.asStateFlow()

    fun selectItem(item: String) {
        _selectedItem.value = item
    }
}

// Master 页面
@Composable
fun MasterScreen(
    sharedViewModel: SharedViewModel,
    onNavigate: () -> Unit,
) {
    LazyColumn {
        items(listOf("Item 1", "Item 2", "Item 3")) { item ->
            ListItem(
                headlineContent = { Text(item) },
                modifier = Modifier.clickable {
                    sharedViewModel.selectItem(item)
                    onNavigate()
                },
            )
        }
    }
}

// Detail 页面
@Composable
fun DetailScreen(sharedViewModel: SharedViewModel) {
    val selectedItem by sharedViewModel.selectedItem.collectAsState()
    Text("选中的项目：$selectedItem", fontSize = 24.sp)
}

// 父级确保 ViewModel 在同一作用域
@Composable
fun MainScreen() {
    val sharedViewModel: SharedViewModel = viewModel()

    NavHost(navController = rememberNavController(), startDestination = "master") {
        composable("master") {
            MasterScreen(sharedViewModel) {
                navController.navigate("detail")
            }
        }
        composable("detail") {
            DetailScreen(sharedViewModel)
        }
    }
}
```

## 七、ViewModel 测试

```kotlin
class CounterViewModelTest {
    @Test
    fun `increment increases count by 1`() = runTest {
        val viewModel = CounterViewModel()

        viewModel.increment()

        // 收集 StateFlow 的值
        val state = viewModel.count.first()
        assertEquals(1, state)
    }

    @Test
    fun `decrement decreases count by 1`() = runTest {
        val viewModel = CounterViewModel()

        viewModel.decrement()

        val state = viewModel.count.first()
        assertEquals(-1, state)
    }
}
```

## 八、ViewModel 生命周期

```text
Activity 创建 → ViewModel 创建
屏幕旋转 → Activity 重建 → ViewModel 复用（不重建）
Activity 销毁 → ViewModel.clear() 自动调用
```

```kotlin
class LifecycleAwareViewModel : ViewModel() {
    init {
        println("ViewModel 初始化")
    }

    override fun onCleared() {
        super.onCleared()
        println("ViewModel 被清除——释放资源")
    }
}

@Composable
fun ViewModelLifecycleDemo() {
    // viewModel() 在 Composable 生命周期内保持实例
    val vm: LifecycleAwareViewModel = viewModel()

    // 也可以限定 ViewModel 的作用域
    val lifecycleOwner = LocalLifecycleOwner.current
    val vm2: LifecycleAwareViewModel = viewModel(
        viewModelStoreOwner = LocalViewModelStoreOwner.current!!
    )
}
```
