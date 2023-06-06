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
