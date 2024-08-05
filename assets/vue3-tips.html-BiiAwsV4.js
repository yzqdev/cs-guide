import{_ as s,r as e,c as r,b as o,w as l,d as n,a as t,o as a}from"./app-CbULZrmi.js";const c={},q=n(`<h1 id="vue3教程" tabindex="-1"><a class="header-anchor" href="#vue3教程"><span>vue3教程</span></a></h1><h2 id="使用vite出现错误" tabindex="-1"><a class="header-anchor" href="#使用vite出现错误"><span>使用vite出现错误</span></a></h2><pre><code class="language-text">[vite] Internal server error: URI malformed
</code></pre><p>删掉html里面的</p><pre><code class="language-html">&lt;link rel=&quot;icon&quot; href=&quot;&lt;%= BASE_URL %&gt;favicon.ico&quot;&gt;
</code></pre><h2 id="setup样例" tabindex="-1"><a class="header-anchor" href="#setup样例"><span>setup样例</span></a></h2>`,6),p=t("pre",null,[t("code",{class:"language-vue"},`<template>
  <div>
    <div v-for="item in arr1.list" :key="item">
      {{ item }}
    </div>
    <el-button @click="change1">change1</el-button>
    <hr />
    <div v-for="item in arr2" :key="item">
      {{ item }}
    </div>

    <el-button @click="change2">change2</el-button>
    <hr />
    <div>
      <el-form
        ref="formRef"
        :model="form"
        label-width="120px"
        class="demo-dynamic"
      >
        <el-form-item prop="email" label="Email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item prop="name" label="name">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">Submit</el-button>
          <el-button type="warning" @click="clearForm">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs } from "vue";
let arr1 = reactive({
  list: [],
});
//一般这样使用
let state = reactive({
  form: {
    name: "yzq",
    email: "1@qq.com",
  },
  num: 45,
});
let { form, num } = toRefs(state);
let arr2 = ref([]);
function change1() {
  console.log("change...");
  let newArr = [1, 2, 3];
  arr1.list = newArr;
}
function change2() {
  console.log("change...");
  let newArr = [1, 2, 3];
  arr2.value = newArr;
}
function submitForm() {
  state.form = { name: "anderson", email: "bill@outlook.com" };
  state.num = 99;
}
function clearForm() {
  form.value = {
    name: "yzq",
    email: "1@qq.com",
  };
  num.value = 45;
}
<\/script>
`)],-1),m=t("h2",{id:"创建一个响应式对象-对象的属性是数组",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#创建一个响应式对象-对象的属性是数组"},[t("span",null,"创建一个响应式对象，对象的属性是数组")])],-1),d=t("pre",null,[t("code",{class:"language-vue"},`<template>
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
<\/script>
`)],-1),f=n(`<h2 id="vue3使用ts" tabindex="-1"><a class="header-anchor" href="#vue3使用ts"><span>vue3使用ts</span></a></h2><ul><li>scripts</li></ul><pre><code class="language-json">{
   &quot;preview&quot;: &quot;vite preview&quot;,
    &quot;test:unit&quot;: &quot;vitest&quot;,
    &quot;build-only&quot;: &quot;vite build&quot;,
    &quot;type-check&quot;: &quot;vue-tsc --noEmit -p tsconfig.vitest.json --composite false&quot;,
    &quot;lint&quot;: &quot;eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore&quot;,
    &quot;format&quot;: &quot;prettier --write src/&quot;
}
</code></pre><ul><li>dev dependencies</li></ul><pre><code class="language-json">{
 &quot;devDependencies&quot;: {
    &quot;@tsconfig/node18&quot;: &quot;^18.2.0&quot;,
    &quot;@types/jsdom&quot;: &quot;^21.1.1&quot;,
    &quot;@types/lodash-es&quot;: &quot;^4.17.9&quot;,
    &quot;@types/node&quot;: &quot;^18.17.0&quot;,
    &quot;@vitejs/plugin-vue&quot;: &quot;^4.2.3&quot;,
    &quot;@vue/test-utils&quot;: &quot;^2.4.1&quot;,
    &quot;@vue/tsconfig&quot;: &quot;^0.4.0&quot;,
    &quot;autoprefixer&quot;: &quot;^10.4.14&quot;,
    &quot;postcss&quot;: &quot;^8.4.27&quot;,
    &quot;prettier&quot;: &quot;^3.0.1&quot;,
    &quot;sass&quot;: &quot;^1.65.1&quot;,
    &quot;tailwindcss&quot;: &quot;^3.3.3&quot;,
    &quot;tslib&quot;: &quot;^2.6.1&quot;,
    &quot;typescript&quot;: &quot;^5.1.6&quot;,
    &quot;vite&quot;: &quot;^4.4.9&quot;,
    &quot;vitest&quot;: &quot;^0.33.0&quot;,
    &quot;vue-tsc&quot;: &quot;^1.8.8&quot;
  }
}
</code></pre><ul><li>tsconfig.json</li></ul><pre><code class="language-json">{
  &quot;files&quot;: [],
  &quot;references&quot;: [
    {
      &quot;path&quot;: &quot;./tsconfig.node.json&quot;
    },
    {
      &quot;path&quot;: &quot;./tsconfig.app.json&quot;
    },
    {
      &quot;path&quot;: &quot;./tsconfig.vitest.json&quot;
    }
  ]
}
</code></pre><ul><li>tsconfig.app.json</li></ul><pre><code class="language-json"> 
{
  &quot;extends&quot;: &quot;@vue/tsconfig/tsconfig.dom.json&quot;,
  &quot;include&quot;: [&quot;env.d.ts&quot;, &quot;src/**/*&quot;, &quot;src/**/*.vue&quot;],
  &quot;exclude&quot;: [&quot;src/**/__tests__/*&quot;],
  &quot;compilerOptions&quot;: {
    &quot;composite&quot;: true,
    &quot;baseUrl&quot;: &quot;.&quot;,
    &quot;paths&quot;: {
      &quot;@/*&quot;: [&quot;./src/*&quot;]
    }
  }
}
</code></pre><ul><li>tsconfig.node.json</li></ul><pre><code class="language-json">{
  &quot;extends&quot;: &quot;@tsconfig/node18/tsconfig.json&quot;,
  &quot;include&quot;: [
    &quot;vite.config.*&quot;,
    &quot;vitest.config.*&quot;,
    &quot;cypress.config.*&quot;,
    &quot;nightwatch.conf.*&quot;,
    &quot;playwright.config.*&quot;,
    &quot;plugins/**/*&quot;,
  ],
  &quot;compilerOptions&quot;: {
    &quot;composite&quot;: true,
    &quot;module&quot;: &quot;ESNext&quot;,
    &quot;moduleResolution&quot;: &quot;Bundler&quot;,
    &quot;types&quot;: [&quot;node&quot;]
  }
}
</code></pre><ul><li>tsconfig.vitest.json</li></ul><pre><code class="language-json">{
  &quot;extends&quot;: &quot;./tsconfig.app.json&quot;,
  &quot;exclude&quot;: [],
  &quot;compilerOptions&quot;: {
    &quot;composite&quot;: true,
    &quot;lib&quot;: [],
    &quot;types&quot;: [&quot;node&quot;, &quot;jsdom&quot;]
  }
}
</code></pre><ul><li>vitest.config.ts</li></ul><pre><code class="language-ts">import { fileURLToPath } from &#39;node:url&#39;
import { mergeConfig, defineConfig } from &#39;vite&#39;
import { configDefaults } from &#39;vitest/config&#39;
import viteConfig from &#39;./vite.config&#39;
  
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: &#39;jsdom&#39;,
      exclude: [...configDefaults.exclude, &#39;e2e/*&#39;],
      root: fileURLToPath(new URL(&#39;./&#39;, import.meta.url)),
      transformMode: {
        web: [/\\.[jt]sx$/]
      }
    }
  })
)
</code></pre>`,15);function v(g,h){const u=e("code-sample"),i=e("CodeDemo");return a(),r("div",null,[q,o(u),p,m,o(i,{id:"code-demo-20",type:"vue",code:"eJxNUUFugzAQ/MrKJyJRUNsbhapV/9BLyIGSJbXi2JZZaCrE37vYhnJiYGZ2ZpdJjAOKQpSEN6sawtdaA5RnOXoQIIwPnXFVLSSrQGponMuU7KkWUFzxNzK1iB6AaQKvnec4Jd9N/BqIjIa3Vsn2yt72u9EXZHcAZR4EoUk0lvmuYNm3Tlpi1BrdE0xwxk5q/DA3azRqSsFh05IccUEdzADV54Avtca7NY4WfTMo/9z7kmnJ7JEGm1hnbJ8CJxDe6QCeAlBIy/pQbRHB5Dk+SQHHUxo+zAcOXEA3aFbyymHBZBsGy/jeKMyUuSTrJbIsq8XqDYkaf9596PExhacUnk8bvf4LJoMqMvHyjpdx+j+Q5bEeh/u4ta33zfzme5f5dmQx/wHZVbBC"},{default:l(()=>[d]),_:1}),f])}const b=s(c,[["render",v],["__file","vue3-tips.html.vue"]]),x=JSON.parse('{"path":"/frontend/framework/vue/vue3-tips.html","title":"vue3教程","lang":"zh-CN","frontmatter":{"description":"vue3教程 使用vite出现错误 删掉html里面的 setup样例","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/framework/vue/vue3-tips.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"vue3教程"}],["meta",{"property":"og:description","content":"vue3教程 使用vite出现错误 删掉html里面的 setup样例"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-19T03:14:18.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-11-19T03:14:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vue3教程\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-11-19T03:14:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"使用vite出现错误","slug":"使用vite出现错误","link":"#使用vite出现错误","children":[]},{"level":2,"title":"setup样例","slug":"setup样例","link":"#setup样例","children":[]},{"level":2,"title":"创建一个响应式对象，对象的属性是数组","slug":"创建一个响应式对象-对象的属性是数组","link":"#创建一个响应式对象-对象的属性是数组","children":[]},{"level":2,"title":"vue3使用ts","slug":"vue3使用ts","link":"#vue3使用ts","children":[]}],"git":{"createdTime":1647861419000,"updatedTime":1700363658000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":1.02,"words":306},"filePathRelative":"frontend/framework/vue/vue3-tips.md","localizedDate":"2022年3月21日","autoDesc":true}');export{b as comp,x as data};
