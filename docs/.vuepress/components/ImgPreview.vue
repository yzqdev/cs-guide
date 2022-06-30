<template>
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
    style[`--el-dialog-width`] = props.width;
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
</script>
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
