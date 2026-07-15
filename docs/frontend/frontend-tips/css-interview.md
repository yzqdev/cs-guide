# CSS 面试题

## 盒子模型

**1. 介绍一下标准的 CSS 盒子模型？与低版本 IE 的盒子模型有什么不同？**

- **标准盒子模型**：宽度 = content + padding + border + margin
- **低版本 IE 盒子模型**：宽度 = content（含 padding 和 border）+ margin

**2. box-sizing 属性？**

- `content-box`（默认）：W3C 标准盒子模型，width/height 只包含 content
- `border-box`：IE 传统模型，width/height 包含 content + padding + border

## 选择器与优先级

**3. CSS 选择器有哪些？哪些属性可以继承？**

选择器：
- `#id`、`.class`、`div`、`h1 + p`（相邻）、`ul > li`（子）、`li a`（后代）
- `*`（通配符）、`a[rel="external"]`（属性）、`a:hover`（伪类）

可继承：`font-size`、`font-family`、`color`
不可继承：`border`、`padding`、`margin`、`width`、`height`

**4. CSS 优先级算法如何计算？**

!important > 内联样式 > ID 选择器 > 类/伪类/属性选择器 > 元素选择器

| 选择器 | 权重 |
|---|---|
| 元素选择器 | 1 |
| 类/伪类/属性选择器 | 10 |
| ID 选择器 | 100 |
| 内联样式 | 1000 |
| !important | ∞ |

**5. CSS3 新增伪类？**

- `:first-of-type` / `:last-of-type` — 父元素中的首个/最后一个同类元素
- `:only-of-type` — 父元素中唯一的同类元素
- `:only-child` — 父元素中唯一的子元素
- `:nth-child(n)` — 父元素中第 n 个子元素
- `:enabled` / `:disabled` — 表单控件的启用/禁用状态
- `:checked` — 单选框/复选框选中状态

## 布局

**6. 如何居中 div？**

水平居中：

```css
/* 方式1：margin 自动 */
div { margin: 0 auto; width: 80px; height: 50px; }

/* 方式2：flex */
.parent { display: flex; justify-content: center; }

/* 方式3：absolute + transform */
.child { position: absolute; left: 50%; transform: translateX(-50%); }
```

垂直居中：

```css
/* 方式1：flex */
.parent { display: flex; align-items: center; }

/* 方式2：table-cell */
.parent { display: table-cell; vertical-align: middle; }

/* 方式3：absolute + transform */
.child { position: absolute; top: 50%; transform: translateY(-50%); }
```

水平垂直居中：

```css
/* flex */
.parent { display: flex; justify-content: center; align-items: center; }

/* absolute + transform */
.child { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }
```

**7. display 有哪些值？**

| 值 | 说明 |
|---|---|
| `inline` | 内联（默认） |
| `block` | 块级 |
| `inline-block` | 行内块级 |
| `none` | 隐藏 |
| `table` / `table-cell` | 表格显示 |
| `list-item` | 项目列表 |
| `flex` / `grid` | 弹性/网格布局 |

**8. position 的值？**

| 值 | 说明 |
|---|---|
| `static` | 默认，正常文档流 |
| `relative` | 相对自身定位，不脱离文档流 |
| `absolute` | 绝对定位，参考最近的非 static 父元素 |
| `fixed` | 固定定位，参考视口 |
| `sticky` | 粘性定位，relative + fixed 的结合 |

## CSS3 新特性

**9. CSS3 有哪些新特性？**

1. **颜色**：RGBA、HSL、HSLA、透明度
2. **背景**：`background-origin`、`background-size`、`background-repeat`
3. **文本**：`text-shadow`、`word-wrap`
4. **字体**：`@font-face` 自定义字体
5. **圆角**：`border-radius`
6. **边框**：`border-image`
7. **阴影**：`box-shadow`
8. **变形**：`transform`（旋转、缩放、平移、倾斜）
9. **过渡**：`transition`
10. **动画**：`@keyframes` + `animation`
11. **媒体查询**：`@media`
12. **弹性布局**：Flexbox
13. **网格布局**：Grid
14. **多列**：`column-count`、`column-gap`

**10. 请解释 Flexbox（弹性盒布局模型）及其适用场景？**

Flexbox 是一种一维布局模型，提供高效的方式来对齐和分配容器内元素的空间。适用于：
- 居中布局
- 等分布局
- 自适应布局
- 移动端开发

**11. 用纯 CSS 创建一个三角形的原理？**

```css
.triangle {
  width: 0;
  height: 0;
  border: 40px solid transparent;
  border-bottom-color: #ff0000;
}
```

原理：当元素宽高为 0 时，边框会形成三角形。通过设置不同边框的颜色可实现不同方向的三角形。

**12. 满屏品字布局如何设计？**

```html
<div class="top">上</div>
<div class="bottom-wrapper">
  <div class="left">左下</div>
  <div class="right">右下</div>
</div>
```

```css
.top { width: 100%; height: 200px; margin: 0 auto; }
.bottom-wrapper { width: 100%; }
.left, .right { float: left; width: 50%; box-sizing: border-box; }
```

## 兼容性

**13. 常见的兼容性问题？**

1. 不同浏览器标签默认 margin/padding 不同 → `* { margin: 0; padding: 0; }`
2. IE6 双边距 bug → `display: inline;`
3. Chrome 中文界面小于 12px 文本 → `-webkit-text-size-adjust: none;` 或 `transform: scale()`
4. 超链接 hover 失效 → 按 LVHA 顺序：`:link` → `:visited` → `:hover` → `:active`
5. IE 低版本不支持 `opacity` → 使用 filter

**14. 为什么要初始化 CSS 样式？**

不同浏览器对标签的默认样式不同，初始化可以消除差异，保证跨浏览器一致性。

## 高级概念

**15. absolute 的 containing block 计算方式？**

- **static/relative**：父元素的内容框（content area）
- **absolute**：向上找最近的 `position` 不为 `static` 的祖先元素的 padding box
- **fixed**：根元素（html/body）

**16. visibility: collapse 在不同浏览器的表现？**

- Chrome：与 `hidden` 无异
- Firefox/Opera/IE：与 `display: none` 无异

**17. display: none 与 visibility: hidden 的区别？**

| | display: none | visibility: hidden |
|---|---|---|
| 空间占用 | 释放 | 保留 |
| 渲染 | 回流 + 重绘 | 仅重绘 |
| 子元素 | 所有子元素隐藏 | 可单独设置 visible |

**18. position 与 display、overflow、float 的叠加效果？**

`position: absolute/fixed` 优先级最高，会使 `float` 失效，`display` 值会调整为 block。

## BFC

**19. 对 BFC（块级格式化上下文）的理解？**

BFC 是页面上的一个隔离的独立容器，内部子元素不会影响外部元素。

**触发条件**：
- `html` 根元素
- `float` 不为 `none`
- `overflow` 不为 `visible`
- `display: inline-block / table-cell / table-caption / flex / grid`
- `position: absolute / fixed`

**特性**：
- 内部 Box 垂直排列
- 相邻 Box 的 margin 重叠
- BFC 区域不会与 float 重叠
- 计算高度时包含浮动元素

**20. 什么时候需要清除浮动？如何清除？**

```css
/* 万能清除浮动 */
.clearfix::after {
  content: '';
  display: table;
  clear: both;
}
```

**21. margin 重合问题**

```css
/* 触发 BFC 解决 margin 重叠 */
.wrapper {
  overflow: hidden; /* 触发生成 BFC */
}
```

**22. 设置元素浮动后，display 值是多少？**

自动变为 `block`。

## 媒体查询与响应式

**23. 移动端布局用过媒体查询吗？**

```css
@media only screen and (max-width: 480px) {
  /* 移动端样式 */
}
```

## 性能

**25. CSS 优化、提高性能的方法？**

1. 避免过度约束和链式选择符
2. 避免 `!important`
3. 合并重复规则
4. 使用语义化类名
5. 压缩 CSS 文件

**26. 浏览器怎样解析 CSS 选择器？**

**从右向左解析**。先找到最右节点，再向上查找父节点直到根元素，这样能快速筛选大量不符合条件的叶子节点。

## 其他

**27. 使用奇数还是偶数字体？**

推荐**偶数**。Windows 点阵宋体只提供 12/14/16px 点阵，奇数字体会导致字体模糊。

**28. margin 和 padding 分别适合什么场景？**

| 场景 | 使用 |
|---|---|
| border 外侧需要空白 | margin |
| 空白处不需要背景色 | margin |
| 上下相邻元素空白需要抵消 | margin |
| border 内侧需要空白 | padding |
| 空白处需要背景颜色 | padding |
| 上下相邻元素空白需要叠加 | padding |

**29. 竖向百分比是相对于容器的高度吗？**

**不是**。`padding-top/bottom`、`margin-top/bottom` 的百分比是相对于**父容器的宽度**。

**30. 全屏滚动的原理？**

使用 `overflow: hidden` + `transition`，通过 `transform: translateY()` 切换页面。

**31. 什么是响应式设计？**

一个网站兼容多个终端，通过媒体查询检测屏幕尺寸做适配。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**32. ::before 和 :after 中双冒号和单冒号的区别？**

- 单冒号 `:` — CSS3 伪类（如 `:hover`）
- 双冒号 `::` — CSS3 伪元素（如 `::before`、`::after`）

**33. 怎么让 Chrome 支持小于 12px 的文字？**

```css
.small-text {
  font-size: 10px;
  transform: scale(0.8);
  transform-origin: left top;
}
```

**34. png、jpg、gif、webp 的区别？**

| 格式 | 特点 | 适用场景 |
|---|---|---|
| PNG | 无损、支持透明 | 图标、Logo |
| JPG | 有损、色彩丰富 | 照片、复杂图像 |
| GIF | 支持动画、256色 | 简单动画 |
| WebP | 谷歌格式、高压缩率 | 替代 JPG/PNG（Chrome 支持） |

**35. CSS Sprites（雪碧图）是什么？**

将多张小图合并成一张大图，通过 `background-position` 定位显示。优点：减少 HTTP 请求。

**36. line-height 如何理解？**

行高指一行文字的高度，即两行文字基线距离。单行文本垂直居中可将 `line-height` 设置为容器高度。
