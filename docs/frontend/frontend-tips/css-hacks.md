# CSS 技巧与 Hack

## 透明度问题

父元素设置 `opacity` 会导致子元素继承透明度。

**解决方法**：使用 `rgba` 或十六进制颜色（带 alpha 通道）替代。

```css
/* ✅ 推荐：使用 rgba */
background: rgba(0, 0, 0, 0.4);

/* ✅ 推荐：使用 hex + alpha */
background: #ffffff67;

/* ❌ 避免：会导致子元素也变透明 */
opacity: 0.4;
```

透明度对照表：[CSS 透明度对照](https://blog.csdn.net/ezconn/article/details/90052114)

## Less 循环生成样式类

自动生成 margin、padding、font-size 等工具类，解放双手。

```less
.loopStyle(@counter) when (@counter > 0) {
  .p-@{counter} { padding: (1vw * @counter); }
  .p-t-@{counter} { padding-top: (1vw * @counter); }
  .p-r-@{counter} { padding-right: (1vw * @counter); }
  .p-b-@{counter} { padding-bottom: (1vw * @counter); }
  .p-l-@{counter} { padding-left: (1vw * @counter); }

  .m-@{counter} { margin: (1vw * @counter); }
  .m-t-@{counter} { margin-top: (1vw * @counter); }
  .m-r-@{counter} { margin-right: (1vw * @counter); }
  .m-b-@{counter} { margin-bottom: (1vw * @counter); }
  .m-l-@{counter} { margin-left: (1vw * @counter); }

  .fz-@{counter} { font-size: (1vw * @counter); }
  .width@{counter} { width: 1% * @counter; }

  .loopStyle((@counter - 1));
}

.loopStyle(100);

/* 二维 margin 生成 */
@selectors: range(100);

each(@selectors, .(@v, @k) {
  each(@selectors, .(@h, @hk) {
    .m-@{v}-@{h} {
      margin: 1px * @v 1px * @h;
    }
  });
});
```

使用示例：

```html
<div class="m-t-10">margin-top: 10vw</div>
<div class="p-5">padding: 5vw</div>
<div class="fz-3">font-size: 3vw</div>
```

## SCSS 循环生成

```scss
@for $i from 1 through 200 {
  .m-#{$i} { margin: ($i / 100) + rem; }
  .m-t-#{$i} { margin-top: ($i / 100) + rem; }
  .m-b-#{$i} { margin-bottom: ($i / 100) + rem; }
  .m-l-#{$i} { margin-left: ($i / 100) + rem; }
  .m-r-#{$i} { margin-right: ($i / 100) + rem; }

  .p-#{$i} { padding: ($i / 100) + rem; }
  .p-t-#{$i} { padding-top: ($i / 100) + rem; }
  .p-b-#{$i} { padding-bottom: ($i / 100) + rem; }
  .p-l-#{$i} { padding-left: ($i / 100) + rem; }
  .p-r-#{$i} { padding-right: ($i / 100) + rem; }

  .fz-#{$i} { font-size: ($i / 100) + rem; }
}
```

## 常用 Hack 汇总

| 场景 | 方案 |
|---|---|
| 清除浮动 | `.clearfix::after { content: ''; display: table; clear: both; }` |
| 文本溢出省略 | `overflow: hidden; text-overflow: ellipsis; white-space: nowrap;` |
| 1px 边框（移动端） | `transform: scale(0.5)` |
| 禁用文本选择 | `user-select: none;` |
| 平滑滚动 | `scroll-behavior: smooth;` |
