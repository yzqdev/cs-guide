# Compose 基础组件

## 一、核心 Composable

### 1. Text —— 文本显示

```kotlin
@Composable
fun TextExample() {
    Text(
        text = "Hello Compose",
        color = Color.Black,
        fontSize = 20.sp,
        fontWeight = FontWeight.Bold,
        fontStyle = FontStyle.Italic,
        textAlign = TextAlign.Center,
        maxLines = 2,
        overflow = TextOverflow.Ellipsis,
    )
}
```

### 2. Image —— 图片

```kotlin
@Composable
fun ImageExample() {
    // 加载资源图
    Image(
        painter = painterResource(id = R.drawable.icon),
        contentDescription = "图标",
        modifier = Modifier.size(48.dp),
        contentScale = ContentScale.Crop,
    )

    // 加载网络图（需 Coil 库）
    // implementation("io.coil-kt:coil-compose:2.5.0")
    AsyncImage(
        model = "https://example.com/image.jpg",
        contentDescription = "网络图片",
        modifier = Modifier.clip(CircleShape),
    )
}
```

### 3. Button —— 按钮

```kotlin
@Composable
fun ButtonExample() {
    // 普通按钮
    Button(
        onClick = { /* 点击事件 */ },
        colors = ButtonDefaults.buttonColors(
            containerColor = MaterialTheme.colorScheme.primary,
            contentColor = Color.White,
        ),
        shape = RoundedCornerShape(8.dp),
    ) {
        Text("确认")
    }

    // 图标按钮
    IconButton(onClick = { }) {
        Icon(Icons.Default.Favorite, contentDescription = "收藏")
    }

    // 文字按钮
    TextButton(onClick = { }) {
        Text("取消")
    }

    // 轮廓按钮
    OutlinedButton(onClick = { }) {
        Text("更多")
    }

    // 悬浮按钮
    FloatingActionButton(onClick = { }) {
        Icon(Icons.Default.Add, contentDescription = "添加")
    }
}
```

### 4. TextField —— 输入框

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TextFieldExample() {
    var text by remember { mutableStateOf("") }

    // OutlinedTextField（Material 3 推荐）
    OutlinedTextField(
        value = text,
        onValueChange = { text = it },
        label = { Text("用户名") },
        placeholder = { Text("请输入用户名") },
        leadingIcon = { Icon(Icons.Default.Person, contentDescription = null) },
        trailingIcon = {
            if (text.isNotEmpty()) {
                IconButton(onClick = { text = "" }) {
                    Icon(Icons.Default.Clear, contentDescription = "清除")
                }
            }
        },
        modifier = Modifier.fillMaxWidth().padding(16.dp),
        singleLine = true,
        isError = text.length < 2 && text.isNotEmpty(),
        supportingText = {
            if (text.length < 2 && text.isNotEmpty()) {
                Text("用户名至少 2 个字符", color = MaterialTheme.colorScheme.error)
            }
        },
    )
}
```

### 5. Column / Row / Box —— 布局

```kotlin
@Composable
fun LayoutExample() {
    // Column —— 纵向排列
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.SpaceEvenly,
    ) {
        Text("顶部")
        Text("中间")
        Text("底部")
    }

    // Row —— 横向排列
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text("左")
        Text("中")
        Text("右")
    }

    // Box —— 层叠布局
    Box(
        modifier = Modifier.size(200.dp),
        contentAlignment = Alignment.Center,
    ) {
        Box(
            modifier = Modifier
                .size(100.dp)
                .background(Color.Blue)
        )
        Text("居中文字", color = Color.White)
    }
}
```

## 二、列表

### 1. LazyColumn —— 长列表

```kotlin
data class Item(val id: Int, val title: String, val description: String)

@Composable
fun LazyListExample(items: List<Item>) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        // 固定头部
        item {
            Text("标题", style = MaterialTheme.typography.headlineMedium)
        }

        // 动态列表
        items(items, key = { it.id }) { item ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(item.title, fontWeight = FontWeight.Bold)
                    Text(item.description, color = Color.Gray)
                }
            }
        }

        // 固定底部
        item {
            Text("—— 已加载全部 ——",
                modifier = Modifier.fillMaxWidth(),
                textAlign = TextAlign.Center,
                color = Color.Gray,
            )
        }
    }
}
```

### 2. LazyRow —— 横向列表

```kotlin
@Composable
fun ChipRow(chips: List<String>) {
    LazyRow(
        contentPadding = PaddingValues(horizontal = 16.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        items(chips) { chip ->
            Surface(
                shape = RoundedCornerShape(20.dp),
                color = MaterialTheme.colorScheme.secondaryContainer,
            ) {
                Text(
                    text = chip,
                    modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                )
            }
        }
    }
}
```

## 三、Card —— 卡片

```kotlin
@Composable
fun CardExample() {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        shape = RoundedCornerShape(12.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            AsyncImage(
                model = "https://example.com/cover.jpg",
                contentDescription = null,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(180.dp)
                    .clip(RoundedCornerShape(8.dp)),
                contentScale = ContentScale.Crop,
            )
            Spacer(Modifier.height(12.dp))
            Text("标题", fontWeight = FontWeight.Bold, fontSize = 18.sp)
            Spacer(Modifier.height(4.dp))
            Text("描述内容", color = Color.Gray)
            Spacer(Modifier.height(8.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text("作者", fontSize = 12.sp, color = Color.Gray)
                Text("3 小时前", fontSize = 12.sp, color = Color.Gray)
            }
        }
    }
}
```

## 四、Dialog —— 对话框

```kotlin
@Composable
fun DialogExample() {
    var showDialog by remember { mutableStateOf(false) }

    Button(onClick = { showDialog = true }) {
        Text("显示对话框")
    }

    if (showDialog) {
        AlertDialog(
            onDismissRequest = { showDialog = false },
            title = { Text("确认删除？") },
            text = { Text("删除后无法恢复，确定要删除吗？") },
            confirmButton = {
                TextButton(onClick = { showDialog = false }) {
                    Text("确定")
                }
            },
            dismissButton = {
                TextButton(onClick = { showDialog = false }) {
                    Text("取消")
                }
            },
        )
    }
}
```

## 五、Scaffold —— 脚手架

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ScaffoldExample() {
    var selectedTab by remember { mutableIntStateOf(0) }
    val navItems = listOf("首页", "发现", "消息", "我的")
    val navIcons = listOf(Icons.Default.Home, Icons.Default.Search,
        Icons.Default.Notifications, Icons.Default.Person)

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("首页") },
                actions = {
                    IconButton(onClick = { }) {
                        Icon(Icons.Default.Settings, contentDescription = "设置")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                    titleContentColor = Color.White,
                    actionIconContentColor = Color.White,
                ),
            )
        },
        bottomBar = {
            NavigationBar {
                navItems.forEachIndexed { index, item ->
                    NavigationBarItem(
                        icon = { Icon(navIcons[index], contentDescription = item) },
                        label = { Text(item) },
                        selected = selectedTab == index,
                        onClick = { selectedTab = index },
                    )
                }
            }
        },
        floatingActionButton = {
            FloatingActionButton(onClick = { }) {
                Icon(Icons.Default.Add, contentDescription = "添加")
            }
        },
    ) { paddingValues ->
        // 主内容
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) {
            Text("当前页面：${navItems[selectedTab]}")
        }
    }
}
```

## 六、综合示例：登录页面

```kotlin
@Composable
fun LoginScreen() {
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var loading by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
    ) {
        Text(
            text = "欢迎回来",
            style = MaterialTheme.typography.headlineLarge,
            fontWeight = FontWeight.Bold,
        )
        Spacer(Modifier.height(8.dp))
        Text("登录以继续", color = Color.Gray)
        Spacer(Modifier.height(32.dp))

        OutlinedTextField(
            value = username,
            onValueChange = { username = it },
            label = { Text("用户名") },
            leadingIcon = { Icon(Icons.Default.Person, contentDescription = null) },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
        )
        Spacer(Modifier.height(16.dp))

        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("密码") },
            leadingIcon = { Icon(Icons.Default.Lock, contentDescription = null) },
            visualTransformation = PasswordVisualTransformation(),
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
        )
        Spacer(Modifier.height(8.dp))

        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.End) {
            TextButton(onClick = { }) { Text("忘记密码？") }
        }
        Spacer(Modifier.height(24.dp))

        Button(
            onClick = { loading = true },
            modifier = Modifier.fillMaxWidth().height(50.dp),
            enabled = !loading,
        ) {
            if (loading) {
                CircularProgressIndicator(
                    modifier = Modifier.size(24.dp),
                    color = Color.White,
                    strokeWidth = 2.dp,
                )
            } else {
                Text("登录", fontSize = 16.sp)
            }
        }
        Spacer(Modifier.height(16.dp))

        Row {
            Text("还没有账号？")
            TextButton(onClick = { }) { Text("立即注册") }
        }
    }
}
```
