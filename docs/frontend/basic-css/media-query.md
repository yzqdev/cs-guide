# 媒体查询

:::normal-demo

```html
<div>ddd</div>
```

```css
div{
    width:100%;
    height:100px;
}
@media screen and (max-width: 400px) {
    div {
        background:purple;
        color: blue;
    }
}
@media screen and (min-width: 600px) {
    div {
        background:cyan;
        color: red;
    }
}
```

:::

不使用媒体查询
:::normal-demo

```html
<ul class="grid">
    <li>
        <h2>Card 1</h2>
        <p>...</p>
    </li>
    <li>
        <h2>Card 2</h2>
        <p>...</p>
    </li>
    <li>
        <h2>Card 3</h2>
        <p>...</p>
    </li>
    <li>
        <h2>Card 4</h2>
        <p>...</p>
    </li>
    <li>
        <h2>Card 5</h2>
        <p>...</p>
    </li>
</ul>
```

```css
.grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.grid li {
    border: 1px solid #666;
    padding: 10px;
}

```

:::
