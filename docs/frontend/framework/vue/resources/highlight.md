# 代码高亮

## 方案对比

| 方案 | 特点 | 体积 |
|------|------|:----:|
| [highlight.js](https://highlightjs.org/) | 易用，组件丰富，支持 190+ 语言 | ~30KB |
| [Prism.js](https://prismjs.com/) | 轻量，可定制插件 | ~8KB+ |
| [Shiki](https://shiki.style/) | VS Code 配色，精确高亮 | 较大 |

## 使用 highlight.js

### 安装

```bash
npm install highlight.js
```

### 封装组件

```ts
// Highlight.ts
import { defineComponent, h, PropType } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export default defineComponent({
  name: 'Highlight',
  props: {
    code: { type: String, required: true },
    language: { type: String as PropType<string>, default: '' },
    autodetect: { type: Boolean, default: false },
  },
  setup(props) {
    return () => {
      const lang = props.language || (props.autodetect ? undefined : 'plaintext');
      const highlighted = lang
        ? hljs.highlight(props.code, { language: lang }).value
        : hljs.highlightAuto(props.code).value;

      return h('pre', [
        h('code', { class: lang ? `language-${lang}` : '', innerHTML: highlighted }),
      ]);
    };
  },
});
```

### 使用

```vue
<highlight autodetect :code="code" />
<highlight language="javascript" code="const x = 5;" />
```

## 使用 Prism.js

### 安装

```bash
npm install prismjs
```

### 使用

```html
<pre><code class="language-js">const foo = 'bar';</code></pre>

<script>
import Prism from 'prismjs';
// 语言支持
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism.css';
</script>
```

## 参考

- [highlight.js 官网](https://highlightjs.org/)
- [Prism.js 官网](https://prismjs.com/)
- [Shiki 官网](https://shiki.style/)