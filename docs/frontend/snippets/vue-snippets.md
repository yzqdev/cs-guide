# vue代码片段

一个按钮点击两次出现不同事件
:::vue-demo

```vue
<template>
<div>
  <button @click="clickOnce">点击</button>
  <article v-if="visible">这是你想看的</article>
</div>
</template>

<script>
export default {
  data(){
    return{
      flag:0,visible:false,
    }
  },methods:{
    clickOnce(){
      this.flag++;
      this.visible=true
      if (this.flag>1) {
        this.visible=false
        this.flag=0
      }
    }
  }
}
</script>

<style scoped>

</style>

```

:::

## 一个图片预览的组件

@[code vue](@/components/ImgPreview.vue)

使用

@[code vue](@/components/Preview.vue)
 