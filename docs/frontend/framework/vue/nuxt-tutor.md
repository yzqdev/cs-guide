# nuxt技巧
 ## 数据获取

注意: 在使用动态数据(fetch或者axio请求的数据)时,使用onBeforeMount界面上无法看到数据的,也就是说,那些动态数据是无法被搜索引擎索引
解决办法就是使用内置的获取树方法,同时不要使用`nuxt generate`,因为`nuxt generate`生成的是静态html,获取数据还是会使用接口,而不是服务端渲染
```ts
<script setup lang="ts">
const { data: count } = await useFetch('/api/count')
</script>

<template>
  <p>Page visits: {{ count }}</p>
</template>
```
这种方式,启动一个node服务器,返回的就是完整的html而不是缺少动态数据的html了,不过这种方式打包出来必须使用node启动`nuxt build`

同理,astro也是这样,不过