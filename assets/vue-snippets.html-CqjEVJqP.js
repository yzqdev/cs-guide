import{_ as t,r as o,c as i,b as s,w as r,a as e,o as l}from"./app-CbULZrmi.js";const a={},c=e("h1",{id:"vue代码片段",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#vue代码片段"},[e("span",null,"vue代码片段")])],-1),p=e("p",null,"一个按钮点击两次出现不同事件",-1),d=e("pre",null,[e("code",{class:"language-vue"},`<template>
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
<\/script>

<style scoped>

</style>

`)],-1),m=e("h2",{id:"一个图片预览的组件",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#一个图片预览的组件"},[e("span",null,"一个图片预览的组件")])],-1),g=e("pre",null,[e("code",{class:"language-vue"},`<template>
  <teleport to="body">
    <transition name="fade">
      <div class="img-overlay" v-show="show">
        <button class="fix-btn" @click="close">
          <svg
            version="1.1"
            id="x"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 11.9 11.9"
            style="color: green"
            width="14"
            height="14"
            xml:space="preserve"
          >
            <path
              d="M10.4,0L6,4.5L1.5,0L0,1.5L4.5,6L0,10.4l1.5,1.5L6,7.5l4.5,4.5l1.5-1.5L7.5,6l4.5-4.5L10.4,0z"
            />
          </svg>
        </button>
        <div class="img-dialog" :style="style">
          <img class="img" :src="imgSrc" />
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script setup lang="ts">
import { computed, CSSProperties } from "vue";

let props = defineProps({
  imgSrc: { type: String },
  width: { type: String },
  show: { type: Boolean, default: false },
});
let display = computed(() => {
  return props.show ? "block" : "none";
});
let style = computed(() => {
  let style: CSSProperties = {};
  if (props.width) {
    style[\`--el-dialog-width\`] = props.width;
  }
  return style;
});
let emit = defineEmits(["close", "close-view"]);

function closeView() {
  emit("close-view");
}

function close() {
  emit("close");
}
<\/script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.img-overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;

  background-color: rgba(0, 0, 0, 0.7);
  overflow: auto;

  .fix-btn {
    position: absolute;
    top: 4rem;
    right: 4rem;
    padding: 0.5rem;
    color: white;
    border: 2px solid rgb(102 102 102);
    border-radius: 50%;
    transition: fill 0.6s cubic-bezier(0.07, 0.95, 0, 1);

    path {
      fill: #b3b3b3;
    }

    &:hover {
      path {
        fill: #27ffa7;
      }
    }
  }

  .img-dialog {
    --el-dialog-margin-top: 15vh;
    --el-dialog-width: 50%;
    --el-dialog-bg-color: #ffffff;
    --el-dialog-box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04),
      0px 8px 20px rgba(0, 0, 0, 0.08);

    --el-dialog-padding-primary: 20px;

    position: relative;
    margin: var(--el-dialog-margin-top, 15vh) auto 50px;
    background: var(--el-dialog-bg-color);
    border-radius: 2px;
    box-shadow: var(--el-dialog-box-shadow);
    box-sizing: border-box;
    width: var(--el-dialog-width, 50%);

    .img {
      max-width: 100%;

      display: block;

      margin: auto;
      z-index: 1000;
    }
  }
}
</style>
`)],-1),h=e("p",null,"使用",-1),u=e("pre",null,[e("code",{class:"language-vue"},`<template>
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
<\/script>
`)],-1);function v(f,w){const n=o("CodeDemo");return l(),i("div",null,[c,p,s(n,{id:"code-demo-6",type:"vue",title:"%E6%8C%89%E9%92%AE",code:"eJxtUEtOwzAQvcooq1YNpGyDE3EDLpCN6zjUwk0iexKBqmwAiQUXAMSCG7BghRDiMtBwDPxJIkBIlub33rzn2QZtw4M4IMg3taTI06wkuWhNACCrBrEq4YhJwU6TLHDxuGQ8C9L+4uXz+pVEHuPxVKFgkkO7JwoDb4UWK2nBX+93u9unj7fH3eVz/3DT31+RaABbwcgrkuiHC1NqpkSNJudndaUQcl7QRiJsrVhOkc7mLgVQHBtVDgVAIelJvAwH/bigUvPQDzsbunDDcV3lOh4o08emjQC4FnrfblosDn/1hrUJqoaPA1HAbCKkB3Pv8R+S8/JnZjnJcmw6h6PRrDSPRNMl7FXw3JxYs6rmue9EruXyoPsG9f6jGw=="},{default:r(()=>[d]),_:1}),m,g,h,u])}const x=t(a,[["render",v],["__file","vue-snippets.html.vue"]]),y=JSON.parse('{"path":"/cs-tips/frontend/snippets/vue-snippets.html","title":"vue代码片段","lang":"zh-CN","frontmatter":{"description":"vue代码片段 一个按钮点击两次出现不同事件 一个图片预览的组件 使用","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/snippets/vue-snippets.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"vue代码片段"}],["meta",{"property":"og:description","content":"vue代码片段 一个按钮点击两次出现不同事件 一个图片预览的组件 使用"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vue代码片段\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"一个图片预览的组件","slug":"一个图片预览的组件","link":"#一个图片预览的组件","children":[]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.3,"words":89},"filePathRelative":"cs-tips/frontend/snippets/vue-snippets.md","localizedDate":"2023年5月25日","autoDesc":true}');export{x as comp,y as data};
