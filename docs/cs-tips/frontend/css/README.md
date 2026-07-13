# CSS

<Catalog />

## 目录

| 文件 | 内容 |
|------|------|
| [SCSS 技巧](./scss.md) | SCSS 嵌套、@extend vs @mixin、@use/@forward、导出变量给 JS 使用 |

## 快速参考

```css
/* 选择器 */
.class { }      /* 类选择器 */
#id { }         /* ID 选择器 */
element { }     /* 元素选择器 */
[attr] { }      /* 属性选择器 */
.parent > .child { }  /* 子代选择器 */

/* 盒模型 */
.box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
}

/* 响应式 */
@media (max-width: 768px) {
    .container { flex-direction: column; }
}

/* 动画 */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
.fade-in { animation: fadeIn 0.3s ease-in; }
```
