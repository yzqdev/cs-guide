# iconfont 使用

在iconfont网站建好自己的项目,配置好前缀
![image.png](https://cdn.nlark.com/yuque/0/2021/png/295914/1625642816213-e18dd4a6-2c66-4b6e-8ed5-481ab05dcdde.png#align=left&display=inline&height=442&margin=%5Bobject%20Object%5D&name=image.png&originHeight=883&originWidth=789&size=46330&status=done&style=none&width=394.5)
把生成的链接引入index.html

然后写一个`Econ.vue`文件,

```vue
<template>
  <i
    class="iconfont"
    :class="`el-iconfont-${name}`"
    :style="{ color: color, size: size }"
  ></i>
</template>

<script>
export default {
  name: "EIcon",

  props: {
    name: {
      type: String,
      require: true,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
  },
};
</script>
```

然后就可以使用  `<icon name='图标名称' ></icon>`来调用了
