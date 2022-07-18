# css选择器

## 元素选择器

::: normal-demo 元素选择器

```html
<span>这里是由 span 包裹的一些文字.</span>
<p>这里是由 p 包裹的一些文字.</p>
```

```css
span {
  background-color: red;
  color: #ffffff;
}
 
```

:::

## 类选择器

注意它和属性选择器这样的写法等价

```text
[class~=类名] {样式声明 }
```

:::normal-demo 类选择

```html
  <span class="classy">Here's a span with some text.</span>
  <span>Here's another.</span>
```

```css
span.classy {
  background-color: DodgerBlue;
}
```

:::

## id选择器

注意它和属性选择器这样的写法等价

```text
[id=id 属性值] {样式声明 }
```

::: normal-demo id选择器

```css
span#identified {
  background-color: DodgerBlue;
}
```

```html
  <span id="identified">Here's a span with some text.</span>
  <span>Here's another.</span>
```

:::

## 属性选择器

```css
/* 存在 title 属性的<a> 元素 */
a[title] {
  color: purple;
}

/* 存在 href 属性并且属性值匹配"https://example.org"的<a> 元素 */
a[href="https://example.org"] {
  color: green;
}

/* 存在 href 属性并且属性值包含"example"的<a> 元素 */
a[href*="example"] {
  font-size: 2em;
}

/* 存在 href 属性并且属性值结尾是".org"的<a> 元素 */
a[href$=".org"] {
  font-style: italic;
}

/* 存在 class 属性并且属性值包含以空格分隔的"logo"的<a>元素 */
a[class~="logo"] {
  padding: 2px;
}

```

```
[attr]
```

表示带有以 attr 命名的属性的元素。

```
[attr=value]
```

表示带有以 attr 命名的属性，且属性值为 value 的元素。

```
[attr~=value]
```

表示带有以 attr 命名的属性的元素，并且该属性是一个以空格作为分隔的值列表，其中至少有一个值为 value。

```
[attr|=value]
```

表示带有以 attr 命名的属性的元素，属性值为“value”或是以“value-”为前缀（"`-`"为连字符，Unicode 编码为 U+002D）开头。典型的应用场景是用来匹配语言简写代码（如 zh-CN，zh-TW 可以用 zh 作为 value）。

```
[attr^=value]
```

表示带有以 attr 命名的属性，且属性值是以 value 开头的元素。

```
[attr$=value]
```

表示带有以 attr 命名的属性，且属性值是以 value 结尾的元素。

```
[attr*=value]
```

表示带有以 attr 命名的属性，且属性值至少包含一个 value 值的元素。

```
[*attr* *operator* *value* i]
```

在属性选择器的右方括号前添加一个用空格隔开的字母 `i`（或 `I`），可以在匹配属性值时忽略大小写（支持 ASCII 字符范围之内的字母）。

`[*attr* *operator* *value* s]` Experimental

在属性选择器的右方括号前添加一个用空格隔开的字母 `s`（或 `S`），可以在匹配属性值时区分大小写（支持 ASCII 字符范围之内的字母）
:::normal-demo

```css
a {
  color: blue;
}

/* 以 "#" 开头的页面本地链接 */
a[href^="#"] {
  background-color: gold;
}

/* 包含 "example" 的链接 */
a[href*="example"] {
  background-color: silver;
}

/* 包含 "insensitive" 的链接，不区分大小写 */
a[href*="insensitive" i] {
  color: cyan;
}

/* 包含 "cAsE" 的链接，区分大小写 */
a[href*="cAsE" s] {
  color: pink;
}

/* 以 ".org" 结尾的链接 */
a[href$=".org"] {
  color: red;
}

/* 列表类型不需要大小写敏感标志，这是由于 HTML 处理 type 属性的一个怪癖。 */
ol[type="a"] {
  list-style-type: lower-alpha;
  background: red;
}

ol[type="a" s] {
  list-style-type: lower-alpha;
  background: lime;
}

ol[type="A" s] {
  list-style-type: upper-alpha;
  background: lime;
}
```

```html
<ul>
  <li><a href="#internal">Internal link</a></li>
  <li><a href="http://example.com">Example link</a></li>
  <li><a href="#InSensitive">Insensitive internal link</a></li>
  <li><a href="http://example.org">Example org link</a></li>
</ul>

<ol type="A">
  <li>Example list</li>
</ol>
```

:::

## 选择器列表

:::normal-demo

```css
/* 选择所有 <span> 和 <div> 元素 */
span, div {
  border: red 2px solid;
}
```

```html
<span>这是一个span</span>
<div>这是一个div</div>
```

:::

## 后代选择器

后代组合器（通常用单个空格（ ）字符表示）组合了两个选择器，如果第二个选择器匹配的元素具有与第一个选择器匹配的祖先（父母，父母的父母，父母的父母的父母等）元素，则它们将被选择。利用后代组合器的选择器称为后代选择器。
:::normal-demo

```css
li {
  list-style-type: disc;
}

li li {
  list-style-type: circle;
}
```

```html
<ul>
  <li>
    <div>Item 1</div>
    <ul>
      <li>Subitem A</li>
      <li>Subitem B</li>
    </ul>
  </li>
  <li>
    <div>Item 2</div>
    <ul>
      <li>Subitem A</li>
      <li>Subitem B</li>
    </ul>
  </li>
</ul>

```

:::

## 直接子代选择器

当使用  > 选择符分隔两个元素时，它只会匹配那些作为第一个元素的直接后代 (子元素) 的第二元素。与之相比，当两个元素由 后代选择器 相连时，它表示匹配存在的所有由第一个元素作为祖先元素 (但不一定是父元素) 的第二个元素，无论它在 DOM 中"跳跃" 多少次。

:::normal-demo

```css
span { background-color: white; }
div > span {
  background-color: DodgerBlue;
}
```

```html
<div>
  <span>Span 1. In the div.
    <span>Span 2. In the span that's in the div.</span>
  </span>
</div>
<span>Span 3. Not in a div at all</span>
```

:::

## 通用兄弟选择器

兄弟选择符，位置无须紧邻，只须同层级，A~B 选择A元素之后所有同层级B元素
:::normal-demo

```css
p ~ span {
  color: red;
}
```

```html
<span>This is not red.</span>
<p>Here is a paragraph.</p>
<code>Here is some code.</code>
<span>And here is a span.</span>
```

:::

## 相邻兄弟选择器

相邻兄弟选择器 (+) 介于两个选择器之间，当第二个元素紧跟在第一个元素之后，并且两个元素都是属于同一个父元素的子元素，则第二个元素将被选中

:::normal-demo

```css
li:first-of-type + li {
  color: red;
}
```

```html
<ul>
  <li>One</li>
  <li>Two!</li>
  <li>Three</li>
</ul>
```

:::

## 列选择器(实验中)

通过列合并符 (||) 链接两个元素时，它只会匹配被第二个 CSS 选择器匹配的元素，且此元素属于被第一个 CSS 选择器匹配的列元素。

:::normal-demo

```css
col.selected || td {
  background: gray;
  color: white;
  font-weight: bold;
}
```

```html
<table border="1">
  <colgroup>
    <col span="2"/>
    <col class="selected"/>
  </colgroup>
  <tbody>
    <tr>
      <td>A
      <td>B
      <td>C
    </tr>
    <tr>
      <td colspan="2">D</td>
      <td>E</td>
    </tr>
    <tr>
      <td>F</td>
      <td colspan="2">G</td>
    </tr>
  </tbody>
</table>
```

:::

## 伪类

CSS 伪类 是添加到选择器的关键字，指定要选择的元素的特殊状态。例如，:hover 可被用于在用户将鼠标悬停在按钮上时改变按钮的颜色。

:::normal-demo

```css
/* 所有用户指针悬停的按钮 */
button:hover {
  color: blue;
  background:red;
}
```

```html
<button>按钮</button>
```

:::

## 伪元素

伪元素是一个附加至选择器末的关键词，允许你对被选择元素的特定部分修改样式。下例中的 ::first-line 伪元素可改变段落首行文字的样式。

:::normal-demo

```css
/* 每一个 <p> 元素的第一行。 */
p::first-line {
  color: blue;
  text-transform: uppercase;
}
```

```html
<p>aaaaaa</p>
<p>bbbbb</p>
<p>aaaaaa</p>
```

:::
