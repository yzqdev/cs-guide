# 代码规范

## 推荐配置

### ESLint

Vue 官方推荐使用 [eslint-plugin-vue](https://eslint.vuejs.org/rules/)：

```bash
npm install eslint eslint-plugin-vue -D
```

```js
// eslint.config.js
import pluginVue from 'eslint-plugin-vue';

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': ['error', { singleline: 5, multiline: 2 }],
    },
  },
];
```

### Prettier

```bash
npm install prettier -D
```

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100
}
```

## 参考

- [eslint-plugin-vue 规则文档](https://eslint.vuejs.org/rules/)
- [Vue 官方风格指南](https://cn.vuejs.org/style-guide/)