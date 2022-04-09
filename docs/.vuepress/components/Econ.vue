<template>
  <i
    class="iconfont"
    :class="`${prefix}-${name}`"
    :style="{ color: color, fontSize: size }"
  ></i>
</template>

<script>
export default {
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
      default: "20px",
    },
    prefix: {
      type: String,
      default: "icon",
    },
  },
};
</script>
