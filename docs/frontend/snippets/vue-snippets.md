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

```vue
<template>
  <!-- 过渡动画 -->
  <transition name='fade'>
    <div class='img-view' @click='bigImg'>
      <!-- 遮罩层 -->
      <div class='img-layer'></div>
      <div class='img'>
        <img :src='imgSrc'>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: ['imgSrc'],
  methods: {
    bigImg() {
      // 发送事件
      this.$emit('clickit')
    }
  }
}
</script>
<style lang='less' scoped>
/*动画*/
.fade-enter-active,
.fade-leave-active {
  transition: all .2s linear;
  transform: translate3D(0, 0, 0);
}

.fade-enter,
.fade-leave-active {
  transform: translate3D(100%, 0, 0);
}
 

.img-view {

  width: 100%;
  height: 100%;

  .img img {
    max-width: 100%;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1000;
  }

  /*遮罩层样式*/

  .img-layer {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}


</style>
```

使用

```vue
<template>
<img :src='text' @click='clickImg($event)' style='width: 25px;height: 25px;cursor: pointer' /><a :href='text' :download='text'>下载</a>
           <big-img v-if="showImg" @clickit="viewImg" :imgSrc="text"></big-img>
</template>

<script >
  export default(){
    data(){
      return{}}
    ,methods:{
         clickImg(e) {
      this.showImg = true
      // 获取当前图片地址
      this.imgSrc = e.currentTarget.src
    },
    viewImg() {
      this.showImg = false
    },}</srcript>

```
