<template>
  <img :src="src" @click="showBigImg($event)" style="width: 25px; height: 25px; cursor: pointer" />
  <a :href="src" :download="src">下载</a>
  <img-preview :show="showImg" @close="closePreview" :img-src="imgSrc"></img-preview>
</template>

<script setup>
import ImgPreview from './ImgPreview.vue'

let src = $ref('https://upload-bbs.mihoyo.com/upload/2022/06/27/2614c94981f4c5c38d19df374cbc8fb8.jpeg')
let showImg = $ref(false)
let imgSrc = $ref('')
function showBigImg(e) {
  imgSrc = src
  showImg = true
}
function closePreview() {
  showImg = false
}
</script>
