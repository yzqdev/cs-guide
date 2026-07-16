---
order: 11
---

# Compose UI 测试

## 一、添加依赖

```kotlin
// build.gradle.kts
dependencies {
    // Compose UI 测试
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")
    debugImplementation("androidx.compose.ui:ui-test-manifest")

    // 语义检查
    debugImplementation("androidx.compose.ui:ui-test")

    // 测试工具
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
}
```

## 二、测试规则

```kotlin
import androidx.compose.ui.test.junit4.createComposeRule
import org.junit.Rule
import org.junit.Test

class ComposeTest {

    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun testGreeting() {
        composeTestRule.setContent {
            Text("Hello, Compose!")
        }

        composeTestRule
            .onNodeWithText("Hello, Compose!")
            .assertExists()
    }
}
```

## 三、常用查找器

```kotlin
@get:Rule
val rule = createComposeRule()

// 按文本查找
rule.onNodeWithText("确认")
rule.onNodeWithText("取消", substring = true)  // 模糊匹配

// 按标签查找
rule.onNodeWithTag("loginButton")

// 按内容描述查找
rule.onNodeWithContentDescription("用户头像")

// 组合条件
rule.onNode(
    hasText("提交") and hasContentDescription("提交按钮")
)

// 多个匹配
rule.onAllNodesWithText("Item").assertCountEquals(5)
```

## 四、设置语义标签

```kotlin
@Composable
fun LoginButton(onClick: () -> Unit) {
    Button(
        onClick = onClick,
        modifier = Modifier.testTag("loginButton"),
    ) {
        Text("登录")
    }
}

@Composable
fun ProfileImage(url: String) {
    AsyncImage(
        model = url,
        contentDescription = "用户头像",
        modifier = Modifier
            .size(48.dp)
            .clip(CircleShape)
            .testTag("profileImage"),
    )
}
```

## 五、交互操作

```kotlin
@Test
fun testButtonClick() {
    var clicked = false
    rule.setContent {
        Button(onClick = { clicked = true }) {
            Text("点击")
        }
    }

    // 点击按钮
    rule.onNodeWithText("点击").performClick()
    assertTrue(clicked)
}

@Test
fun testTextInput() {
    var text = ""
    rule.setContent {
        OutlinedTextField(
            value = text,
            onValueChange = { text = it },
            label = { Text("输入") },
        )
    }

    // 输入文本
    rule.onNodeWithText("输入").performTextInput("Hello")

    // 替换文本
    rule.onNodeWithTag("inputField").performTextReplacement("New Text")

    // 清除文本
    rule.onNodeWithTag("inputField").performTextClearance()
}
```

## 六、断言

```kotlin
@Test
fun testAssertions() {
    rule.setContent {
        Column {
            Text("标题", modifier = Modifier.testTag("title"))
            Button(
                onClick = { },
                enabled = false,
                modifier = Modifier.testTag("disabledBtn"),
            ) {
                Text("禁用的按钮")
            }
            CircularProgressIndicator(modifier = Modifier.testTag("loading"))
        }
    }

    // 存在性断言
    rule.onNodeWithText("标题").assertExists()
    rule.onNodeWithText("不存在的文本").assertDoesNotExist()

    // 是否可见
    rule.onNodeWithTag("title").assertIsDisplayed()

    // 是否启用
    rule.onNodeWithTag("disabledBtn").assertIsNotEnabled()

    // 数量断言
    rule.onAllNodes(hasText("标题")).assertCountEquals(1)

    // 自定义断言
    rule.onNodeWithText("标题").assert(hasText("标题"))
}
```

## 七、LazyList 测试

```kotlin
@Test
fun testLazyList() {
    val items = (1..100).map { "Item $it" }

    rule.setContent {
        LazyColumn {
            items(items) { item ->
                Text(item, modifier = Modifier.testTag("listItem"))
            }
        }
    }

    // 滚动到指定项
    rule.onNodeWithText("Item 50").assertExists()

    // 使用 performScrollTo
    rule.onNodeWithTag("listItem").performScrollTo()

    // 等待列表稳定
    rule.waitForIdle()

    // 检查列表项数量
    rule.onAllNodes(hasText("Item")).assertCountEquals(100)
}
```

## 八、等待与超时

```kotlin
@Test
fun testAsyncOperation() {
    var result by mutableStateOf("加载中")

    rule.setContent {
        LaunchedEffect(Unit) {
            delay(2000)
            result = "加载完成"
        }
        Text(result, modifier = Modifier.testTag("status"))
    }

    // 等待直到条件满足（最长 5 秒）
    rule.waitUntil(timeoutMillis = 5000) {
        rule.onNodeWithText("加载完成")
    }

    // 或使用 waitForIdle
    rule.waitForIdle()
}
```

## 九、StateFlow 测试

```kotlin
@Test
fun testViewModelState() = runTest {
    val viewModel = CounterViewModel()
    viewModel.increment()

    val result = viewModel.count.first()
    assertEquals(1, result)
}

// Compose 中测试 ViewModel
@get:Rule
val rule = createComposeRule()

@Test
fun testCounterScreen() {
    rule.setContent {
        CounterScreen()
    }

    rule.onNodeWithText("0").assertExists()
    rule.onNodeWithText("+").performClick()
    rule.onNodeWithText("1").assertExists()
}
```

## 十、截图测试（可选）

```kotlin
// 需要添加依赖：
// androidTestImplementation("androidx.compose.ui:ui-test-screenshot")

@Test
fun testScreenshot() {
    rule.setContent {
        AppTheme {
            LoginScreen()
        }
    }

    // 捕获截图并与基准比较
    rule.onNodeWithTag("loginScreen").captureToImage()
}
```

## 十一、完整示例：登录页面测试

```kotlin
@Composable
fun LoginScreen(
    onLogin: (String, String) -> Unit,
    isLoading: Boolean = false,
) {
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(32.dp)
            .testTag("loginScreen"),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
    ) {
        Text("欢迎回来", style = MaterialTheme.typography.headlineLarge)
        Spacer(Modifier.height(32.dp))

        OutlinedTextField(
            value = username,
            onValueChange = { username = it },
            label = { Text("用户名") },
            modifier = Modifier.fillMaxWidth().testTag("usernameField"),
            singleLine = true,
        )
        Spacer(Modifier.height(16.dp))

        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("密码") },
            modifier = Modifier.fillMaxWidth().testTag("passwordField"),
            singleLine = true,
            visualTransformation = PasswordVisualTransformation(),
        )
        Spacer(Modifier.height(24.dp))

        Button(
            onClick = { onLogin(username, password) },
            modifier = Modifier.fillMaxWidth().testTag("loginButton"),
            enabled = !isLoading && username.isNotBlank() && password.isNotBlank(),
        ) {
            if (isLoading) {
                CircularProgressIndicator(
                    modifier = Modifier.size(24.dp),
                    color = Color.White,
                    strokeWidth = 2.dp,
                )
            } else {
                Text("登录")
            }
        }
    }
}

// 测试代码
class LoginScreenTest {

    @get:Rule
    val rule = createComposeRule()

    @Test
    fun loginScreen_initialState_displaysCorrectly() {
        rule.setContent { LoginScreen(onLogin = { _, _ -> }) }

        rule.onNodeWithText("欢迎回来").assertExists()
        rule.onNodeWithTag("usernameField").assertExists()
        rule.onNodeWithTag("passwordField").assertExists()
        rule.onNodeWithTag("loginButton").assertIsNotEnabled()
    }

    @Test
    fun loginScreen_emptyFields_buttonDisabled() {
        rule.setContent { LoginScreen(onLogin = { _, _ -> }) }

        rule.onNodeWithTag("loginButton").assertIsNotEnabled()
    }

    @Test
    fun loginScreen_filledFields_buttonEnabled() {
        rule.setContent { LoginScreen(onLogin = { _, _ -> }) }

        rule.onNodeWithTag("usernameField").performTextInput("admin")
        rule.onNodeWithTag("passwordField").performTextInput("password")
        rule.onNodeWithTag("loginButton").assertIsEnabled()
    }

    @Test
    fun loginScreen_loading_showsLoader() {
        rule.setContent { LoginScreen(onLogin = { _, _ -> }, isLoading = true) }

        rule.onNodeWithTag("loginButton").assertIsNotEnabled()
    }

    @Test
    fun loginButton_click_emitsCredentials() {
        var capturedUsername = ""
        var capturedPassword = ""

        rule.setContent {
            LoginScreen { username, password ->
                capturedUsername = username
                capturedPassword = password
            }
        }

        rule.onNodeWithTag("usernameField").performTextInput("alice")
        rule.onNodeWithTag("passwordField").performTextInput("123456")
        rule.onNodeWithTag("loginButton").performClick()

        assertEquals("alice", capturedUsername)
        assertEquals("123456", capturedPassword)
    }
}
```
