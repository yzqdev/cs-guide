# vue3教程

## 使用vite出现错误

```text
[vite] Internal server error: URI malformed
```

删掉html里面的

```html
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```

## setup样例

<code-sample />

@[code](@/components/CodeSample.vue)

## 创建一个响应式对象，对象的属性是数组

:::demo [vue]

```vue
<template>
  <div>
    <div v-for="item in arr.list" :key="item">
      {{ item }}
    </div>

    <button @click="change">change</button>
  </div>
</template>

<script>
const { defineComponent, reactive, ref }  =Vue;
export default defineComponent({
  setup(props, context) {
    let arr = reactive({
      list: [],
    });
    function change() {
      console.log("change...");
      let newArr = [1, 2, 3];
      arr.list = newArr;
    }
    return {
      arr,
      change,
    };
  },
});
</script>

```

:::
