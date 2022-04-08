# vue单html

## Vue3

```html
<!DOCTYPE html>
<html lang="zh"  >
<head>
    <meta charset="UTF-8"/>
    <title>系统配置</title>
    <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/element-plus/dist/index.css"
    />
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script src="https://cdn.jsdelivr.net/npm/element-plus"></script>
</head>
<body>
<div id="app">
     <el-button>哈哈哈</el-button>

</div>


<script >

    const app=Vue.createApp({
        data(){
            return{
                msg:'hhhhh'
            }
        }
    })
    app.use(ElementPlus);
    app.mount("#app")
</script>

</body>
</html>
```

## 使用quasar

[https://quasar.dev/start/umd](https://quasar.dev/start/umd)

```xml
<!DOCTYPE html>
<html>
  <!--
    WARNING! Make sure that you match all Quasar related
    tags to the same version! (Below it's "@2.3.2")
  -->

  <head>
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons" rel="stylesheet" type="text/css">
    <link href="https://cdn.jsdelivr.net/npm/quasar@2.3.2/dist/quasar.prod.css" rel="stylesheet" type="text/css">
  </head>

  <body>
    <!-- example of injection point where you write your app template -->
    <div id="q-app"></div>

    <!-- Add the following at the end of your body tag -->
    <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/quasar@2.3.2/dist/quasar.umd.prod.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/quasar@2.3.2/dist/lang/zh-CN.umd.prod.js"></script>
    
    <script>
      /*
        Example kicking off the UI. Obviously, adapt this to your specific needs.
        Assumes you have a <div id="q-app"></div> in your <body> above
       */
      const app = Vue.createApp({
        setup () {
          return {}
        }
      })

      app.use(Quasar)
      Quasar.lang.set(Quasar.lang.zhCN)
      app.mount('#q-app')
    </script>
  </body>
</html>

```
