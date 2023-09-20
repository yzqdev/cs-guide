# vue3教程

## 使用vite出现错误

```text
[vite] Internal server error: URI malformed
```

删掉html里面的

```html
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```

## setup样例

<code-sample />

@[code](@/components/CodeSample.vue)

## 创建一个响应式对象，对象的属性是数组

:::vue-demo  

```vue
<template>
  <div>
    <div v-for="item in arr.list" :key="item">
      {{ item }}
    </div>

    <button @click="change">change</button>
  </div>
</template>

<script>
const { defineComponent, reactive, ref }  =Vue;
export default defineComponent({
  setup(props, context) {
    let arr = reactive({
      list: [],
    });
    function change() {
      console.log("change...");
      let newArr = [1, 2, 3];
      arr.list = newArr;
    }
    return {
      arr,
      change,
    };
  },
});
</script>

```

:::


## vue3使用ts

- scripts

```
{
   "preview": "vite preview",

    "test:unit": "vitest",

    "build-only": "vite build",

    "type-check": "vue-tsc --noEmit -p tsconfig.vitest.json --composite false",

    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",

    "format": "prettier --write src/"
}
```

- dev dependencies

```json
{
 "devDependencies": {

    "@tsconfig/node18": "^18.2.0",

    "@types/jsdom": "^21.1.1",

    "@types/lodash-es": "^4.17.9",

    "@types/node": "^18.17.0",

    "@vitejs/plugin-vue": "^4.2.3",

    "@vue/test-utils": "^2.4.1",

    "@vue/tsconfig": "^0.4.0",

    "autoprefixer": "^10.4.14",

    "postcss": "^8.4.27",

    "prettier": "^3.0.1",

    "sass": "^1.65.1",

    "tailwindcss": "^3.3.3",

    "tslib": "^2.6.1",

    "typescript": "^5.1.6",

    "vite": "^4.4.9",

    "vitest": "^0.33.0",

    "vue-tsc": "^1.8.8"

  }
}
```
- tsconfig.json

```json
{

  "files": [],

  "references": [

    {

      "path": "./tsconfig.node.json"

    },

    {

      "path": "./tsconfig.app.json"

    },

    {

      "path": "./tsconfig.vitest.json"

    }

  ]

}
```
 

- tsconfig.app.json
```json
 
{

  "extends": "@vue/tsconfig/tsconfig.dom.json",

  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],

  "exclude": ["src/**/__tests__/*"],

  "compilerOptions": {

    "composite": true,

    "baseUrl": ".",

    "paths": {

      "@/*": ["./src/*"]

    }

  }

}
```

- tsconfig.node.json

```json
{

  "extends": "@tsconfig/node18/tsconfig.json",

  "include": [

    "vite.config.*",

    "vitest.config.*",

    "cypress.config.*",

    "nightwatch.conf.*",

    "playwright.config.*",

    "plugins/**/*",

  ],

  "compilerOptions": {

    "composite": true,

    "module": "ESNext",

    "moduleResolution": "Bundler",

    "types": ["node"]

  }

}
```

- tsconfig.vitest.json
```json
{

  "extends": "./tsconfig.app.json",

  "exclude": [],

  "compilerOptions": {

    "composite": true,

    "lib": [],

    "types": ["node", "jsdom"]

  }

}
```

- vitest.config.ts
```ts
import { fileURLToPath } from 'node:url'

import { mergeConfig, defineConfig } from 'vite'

import { configDefaults } from 'vitest/config'

import viteConfig from './vite.config'

  

export default mergeConfig(

  viteConfig,

  defineConfig({

    test: {

      environment: 'jsdom',

      exclude: [...configDefaults.exclude, 'e2e/*'],

      root: fileURLToPath(new URL('./', import.meta.url)),

      transformMode: {

        web: [/\.[jt]sx$/]

      }

    }

  })

)
```