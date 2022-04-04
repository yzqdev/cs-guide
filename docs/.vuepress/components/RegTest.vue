<template>
  <ClientOnly>
    <n-input v-model="text"></n-input>
    <p>匹配文本:</p>
  </ClientOnly>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      text: "aaa",
      yourTxt: "hhh",
    };
  },
});
</script>
<style lang="scss" scoped></style>
