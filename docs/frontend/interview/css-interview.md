# CSS 面试

前端面试常考的 CSS 知识点。

## 居中方案

### Flexbox 居中（推荐）

```css
.parent {
  display: flex;
  justify-content: center;  /* 水平居中 */
  align-items: center;      /* 垂直居中 */
}
```

### Grid 居中

```css
.parent {
  display: grid;
  place-items: center;
}
```

### 绝对定位 + transform

```css
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### 绝对定位 + margin auto

```css
.child {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  margin: auto;
  width: 100px;  /* 必须有宽高 */
  height: 100px;
}
```

### 文本行高居中

```css
.parent {
  height: 200px;
  line-height: 200px;
  text-align: center;
}
```

---

## 盒模型

### 标准盒模型 vs IE 盒模型

| 盒模型 | 计算方式 |
|--------|----------|
| `content-box`（默认） | `width` = 内容宽度 |
| `border-box` | `width` = 内容 + padding + border |

```css
* {
  box-sizing: border-box;
}
```

### margin 塌陷（合并）

父子元素的垂直 margin 会合并，取最大值。

**解决方案**：
- 父元素加 `overflow: hidden`
- 父元素加 `border` 或 `padding`
- 使用 BFC

---

## BFC（块级格式化上下文）

### 触发条件

- `overflow` 不为 `visible`（如 `hidden`、`auto`）
- `display: flow-root`
- `float` 不为 `none`
- `position` 为 `absolute` 或 `fixed`
- `display: inline-block`、`flex`、`grid`

### BFC 的作用

- 防止 margin 塌陷
- 清除浮动（包含浮动子元素）
- 防止元素被浮动元素覆盖

```css
/* 清除浮动的经典方案 */
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

/* 现代方案 */
.parent {
  display: flow-root;
}
```

---

## 清除浮动

### 为什么需要清除浮动

浮动元素脱离文档流，父元素高度塌陷。

### 方法

```css
/* 方法 1：伪元素（推荐） */
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

/* 方法 2：overflow */
.parent {
  overflow: hidden;
}

/* 方法 3：BFC */
.parent {
  display: flow-root;
}
```

---

## 定位

### position 属性

| 值 | 说明 | 参照物 |
|----|------|--------|
| `static` | 默认，不脱离文档流 | 无 |
| `relative` | 相对定位 | 自身 |
| `absolute` | 绝对定位 | 最近的已定位祖先 |
| `fixed` | 固定定位 | 视口 |
| `sticky` | 粘性定位 | 滚动容器 |

### z-index

- 只有定位元素（`position` 非 `static`）才能设置 `z-index`
- 层叠上下文：`z-index` 值越大越靠前
- 同一层叠上下文中，`z-index` 才能比较

### sticky 失效场景

- 父元素设置 `overflow: hidden`/`auto`/`scroll`
- 父元素高度不够
- 没有设置 `top`/`bottom`/`left`/`right`

---

## Flex 布局

### 常用属性

```css
.container {
  display: flex;
  flex-direction: row;      /* 主轴方向 */
  justify-content: center;  /* 主轴对齐 */
  align-items: center;      /* 交叉轴对齐 */
  flex-wrap: wrap;          /* 换行 */
  gap: 10px;               /* 间距 */
}

.item {
  flex: 1;                  /* 等分空间 */
  flex-shrink: 0;           /* 不收缩 */
  order: -1;                /* 排列顺序 */
}
```

### flex: 1 的含义

```css
flex: 1;  /* 等价于 flex: 1 1 0% */
```

- `flex-grow: 1` — 放大比例
- `flex-shrink: 1` — 收缩比例
- `flex-basis: 0%` — 初始大小

---

## Grid 布局

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px auto;
  gap: 20px;
}

.item {
  grid-column: 1 / 3;  /* 跨两列 */
  grid-row: 1;          /* 第一行 */
}
```

---

## 动画

### transition

```css
.box {
  transition: all 0.3s ease;
}
.box:hover {
  transform: scale(1.1);
  opacity: 0.8;
}
```

### animation

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.box {
  animation: fadeIn 0.5s ease forwards;
}
```

### transform 常用值

```css
transform: translateX(10px);    /* 平移 */
transform: rotate(45deg);       /* 旋转 */
transform: scale(1.5);          /* 缩放 */
transform: skewX(10deg);        /* 倾斜 */
```

### 性能优化

- 优先使用 `transform` 和 `opacity` 做动画（不触发重排）
- 避免动画 `width`、`height`、`margin`、`padding`（会触发重排）
- 使用 `will-change` 提示浏览器

```css
.box {
  will-change: transform;
}
```

---

## 响应式

### 媒体查询

```css
/* 移动优先 */
@media (min-width: 768px) {
  .container { max-width: 720px; }
}
@media (min-width: 1024px) {
  .container { max-width: 960px; }
}
```

### rem 适配

```javascript
// 根据屏幕宽度设置根字体大小
function setRem() {
  const baseSize = 16;
  const clientWidth = document.documentElement.clientWidth;
  const scale = clientWidth / 375;  // 设计稿宽度
  document.documentElement.style.fontSize = baseSize * scale + 'px';
}
window.addEventListener('resize', setRem);
```

### vw/vh 适配

```css
/* 设计稿 375px 宽度 */
.container {
  width: 375vw;
  max-width: 100%;
}
```

---

## CSS 选择器优先级

### 优先级计算

| 等级 | 选择器类型 | 权重 |
|------|-----------|------|
| 行内样式 | `style=""` | 1,0,0,0 |
| ID 选择器 | `#id` | 0,1,0,0 |
| 类/属性/伪类 | `.class`、`[attr]`、`:hover` | 0,0,1,0 |
| 元素/伪元素 | `div`、`::before` | 0,0,0,1 |
| 通配符 | `*` | 0,0,0,0 |

### !important

`!important` 会覆盖所有优先级，应尽量避免使用。

---

## 其他

### 隐藏元素的方法

| 方法 | 占据空间 | 可点击 |
|------|----------|--------|
| `display: none` | 不占 | 不可 |
| `visibility: hidden` | 占 | 不可 |
| `opacity: 0` | 占 | 可 |
| `position: absolute; left: -9999px` | 不占 | 不可 |

### 单行/多行文本溢出

```css
/* 单行 */
.single-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 多行 */
.multi-line {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### CSS 继承

可继承的属性：`color`、`font-size`、`font-family`、`line-height`、`text-align` 等。

不可继承的属性：`margin`、`padding`、`border`、`width`、`height` 等。

### 层叠上下文

创建层叠上下文的条件：
- `root` 元素
- `position` 非 `static` + `z-index` 非 `auto`
- `opacity < 1`
- `transform`/`filter`/`perspective`
- `flex` 容器 + `z-index` 非 `auto`
