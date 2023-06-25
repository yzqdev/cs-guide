# 代码高亮

:::tip
代码高亮可以使用highlight.js或者prismjs
:::

## 可以使用highlight.js自己封装组件

[官网](https://highlightjs.org/)

@[code](@/components/Highlight.ts)

## 如何使用

```html
<div id="app">
    <!-- bind to a data property named `code` -->
    <highlight autodetect :code="code" />
    <!-- or literal code works as well -->
    <highlight language='javascript' code="let x = 5;" />
</div>
```

## prismjs

[官网](https://prismjs.com/)

示例

<iframe  style='height:25rem;width:100%;border:1px solid cyan' src='/cs-guide/prism.html' />

@[code](@/public/prism.html)
