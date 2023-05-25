# 安卓代码片段

## 获取navhost

标签使用`androidx.fragment.app.FragmentContainerView`会闪退,因为oncreated生命周期还未初始化
下面的代码可以解决
android文档原文->[链接](https://developer.android.google.cn/guide/navigation/navigation-getting-started?hl=zh-cn#java)

```java

NavHostFragment navHostFragment = (NavHostFragment) getSupportFragmentManager().findFragmentById(R.id.nav_host_fragment_activity_main);
NavController navController = navHostFragment.getNavController();
```
