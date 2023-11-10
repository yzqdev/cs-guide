## scss技巧

## 嵌套,复用

```scss
//推荐使用 @extend
.button {
  font-size: 14px;
  padding: 10px 20px;
  color: #fff;
}
.button-green {
  @extend .button;
  background: green;
}
.button-red {
  @extend .button;
  background: red;
}


```

使用@extend产生 DRY CSS风格的代码。但是@mixin就不能产生DRY式的代码。

@extend会增加选择器之间的联系，然后把他们堆在一起。你正在为一些相关的元素设置样式，就拿一组按钮来说，使用@extend让他们共享样式看起来合情合理。但是如果这些被复用的样式片段并不仅仅局限于相关的元素，那么使用@mixin或许更好。

@mixin主要的优势就是它能够接受参数。如果想传递参数，你会很自然地选择@mixin而不是@extend

## 少用@import, 而是用@use替换

```scss
@import "./mixin.scss";
@import "./variables.scss";

```

等价于

```scss
@use "./mixin.scss" as *;
@use "./variables.scss" as *;
```

@forward 指令允许你从另一个样式表中导入变量、混合器和函数，但不导入样式。类似于

```js
export * from './util.ts'
```

## 导出scss变量给js使用

**必须是.module.scss文件**

vars.module.scss

```scss
$font-sm:16px;
$red-color:#ff0000;
.home{
  color:cyan;
  .wrap{
    background-color: #ff0000;
  }
}
$white:    #fff;
$black:    #000;
$grey:     #ccc;
// etc...

// Export the color palette to make it accessible to JS
:export {
    white: $white;
    black: $black;
    grey: $grey;
    // etc...
}

```

CssFeat.vue

```vue

<script setup lang="ts">
import vars from './vars.module.scss'
onBeforeMount(() => {
  console.log(vars )
})
</script>

<template>
  <div>
    css feat

    <section>
      <article>
        <div>{{ vars['white'] }}</div>
      </article>
    </section>
  </div>
</template>

<style lang="scss" scoped>

</style>

```
