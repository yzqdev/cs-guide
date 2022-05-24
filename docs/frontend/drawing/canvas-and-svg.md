# canvas和svg对比

<CanvasVSSvg />

:::details
@[code vue](@/components/CanvasVSSVg.vue)
:::

下面是html中的svg代码

::: normal-demo svg代码

```html
<svg>
<path d="M 0 0 L 50 50" style="stroke:red"></path>
<circle cx="50" cy="50" r="30" style="stroke:blue;fill:none;"></circle>
<rect x="50" y="25" width="15" height="10" style="fill:cyan;"></rect>
<text x="0" y="90">svg</text>
</svg>
```

:::

------
:::tip
下面个例子  
想要学习更多,去看mdn的教程[https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
:::

<canvas-sample />

:::details
@[code vue](@/components/CanvasSample.vue)
:::

-------
五子棋游戏

<gobang />

:::details 五子棋
@[code vue](@/components/Gobang.vue)
:::
