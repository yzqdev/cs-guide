# Compose 教程

> Jetpack Compose 是 Android 和桌面端的现代声明式 UI 框架，使用 Kotlin 编写。无需 XML 布局，一切皆 Composable。

<Catalog />

## 目录

| 章节 | 标题 | 内容 |
|------|------|------|
| 01 | [基础组件](./basics.md) | Text、Image、Button、TextField、布局、列表、Card、Dialog、Scaffold、登录页 |
| 02 | [状态管理](./state.md) | remember、State 提升、LaunchedEffect、ViewModel + Flow、snapshotFlow |
| 03 | [导航](./navigation.md) | NavHost、路由定义、传参、底部导航、深层链接、导航动画 |
| 04 | [主题与样式](./theme.md) | Material 3 主题、字体、形状、动态颜色、深色模式 |
| 05 | [ViewModel 集成](./viewmodel.md) | ViewModel、StateFlow/SharedFlow、SavedStateHandle、ViewModel 工厂、多 ViewModel 协作 |
| 06 | [Jetpack 全家桶](./jetpack.md) | Room、Hilt、DataStore、WorkManager、Paging 3、Navigation Compose |
| 07 | [生命周期管理](./lifecycle.md) | LaunchedEffect、DisposableEffect、snapshotFlow、rememberCoroutineScope、Lifecycle 感知 |
| 08 | [网络请求与图片](./network.md) | Retrofit + OkHttp、Coil、统一错误封装、网络状态处理 |
| 09 | [UI 测试](./testing.md) | 查找器、交互操作、断言、LazyList 测试、登录页面完整测试 |
| 10 | [动画](./animation.md) | animateXxxAsState、AnimatedVisibility、AnimatedContent、Animatable、手势动画 |
| 11 | [项目架构](./architecture.md) | MVVM 分层、完整项目结构、Repository 模式、UseCase、单 Activity 架构 |

## 推荐学习路径

1. **入门**：01 → 02 → 04（核心组件 + 状态管理 + 主题）
2. **进阶**：05 → 06 → 07（ViewModel + Jetpack + 生命周期）
3. **实战**：08 → 03（网络请求 + 导航）
4. **深入**：10 → 09 → 11（动画 + 测试 + 架构）

## 相关资源

- [Compose 官网](https://developer.android.com/jetpack/compose)
- [Compose 控件速查](https://developer.android.com/jetpack/compose/components)
- [Compose BOM 版本](https://developer.android.google.cn/jetpack/compose/setup)
- [Material 3 设计指南](https://m3.material.io/)
