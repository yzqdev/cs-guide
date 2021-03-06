---
order: 1
---
# Vue -渐进式JavaScript框架

## 介绍

- [vue2官网](https://cn.vuejs.org/) ([vue3在这里](https://vuejs.org/))
- [vue-rotuer官网](https://router.vuejs.org/zh/)
- [vuex官网](https://vuex.vuejs.org/zh/)
- [vue调试工具(必装,需要科学上网)](https://devtools.vuejs.org/)
- [vue组件大全](https://github.com/vuejs/awesome-vue)
- [vue-cli开发工具](https://cli.vuejs.org/zh/)
- [vite开发工具](https://cn.vitejs.dev/)
- [vue-ssr官网](https://ssr.vuejs.org/zh/)
- [nuxtjs官网](https://nuxtjs.org/)(实现vuessr,快速搭建平台)
- Vue.js 是一套构建用户界面(UI)的渐进式JavaScript框架

### 学习Vue要转化思想

- 不要在想着怎么操作DOM(jquery思想)，而是想着如何操作数据！！！

## 起步 - Hello Vue

### 使用vue-cli工具

- 安装：`npm i -g @vue/cli`

> vue-cli是什么?
> Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统，提供：

 通过 @vue/cli 搭建交互式的项目脚手架。
  通过 @vue/cli + @vue/cli-service-global 快速开始零配置原型开发。
一个运行时依赖 (@vue/cli-service)，该依赖：

- 可升级；
- 基于 webpack 构建，并带有合理的默认配置；
- 可以通过项目内的配置文件进行配置；
- 可以通过插件进行扩展。
- 一个丰富的官方插件集合，集成了前端生态中最好的工具。
- 一套完全图形化的创建和管理 Vue.js 项目的用户界面。

-
> 如何使用?

```bash
//创建一个项目
vue create your-app
//之后按照提示来就可以

vue ui  //使用可视化界面配置项目
```

#### 添加webpack插件

比如...

### 使用vite开发

[Vite](https://github.com/vitejs/vite) 是一个 web 开发构建工具，由于其原生 ES 模块导入方式，可以实现闪电般的冷服务器启动。
通过在终端中运行以下命令，可以使用 Vite 快速构建 Vue 项目。
使用 npm：

```bash
npm create vite <project-name>
cd <project-name>
npm install
npm run dev
```

或者 yarn：

```bash
yarn create vite <project-name>
cd <project-name>
yarn
yarn dev
```

:::tip
推荐使用vue官网的sfc工具 ,[链接](https://sfc.vuejs.org/#eNo9j71uwzAMhF+F5eIWqCV0NZQA3foGXbikjpw40B9EOR0EvXspp8imu9N9OFb8TEndN4sTGp7zmgqwLVs6Ulh9irlAhWwXaLDk6GGQrwMFCnMMXMDzBQ49fx2+rHMRvmN255fhjYLRD5yARBTrkzsVKwrAXD+Ote7l1owWtbtrSFuB++jj2boDoeSEEhn9bOM7PlaN/pTUjWOQ3bW36T9gwgl2p3uytmvCaymJJ615mfu1N1YxX7S8VN5CWb1Vlv34k+Mv2yxgwo5oFBq2P3/sZE8=)
:::
创建一个hellowold程序
:::vue-demo

```vue
<template>
  <div class="box">
    <div>{{msg}}</div>
  </div>
</template>
<script>
export default {
  data: () => ({ msg:'hello world' }),
  
};
</script>
<style>
.box span {
  color: red;
}
</style>
 
```

:::

### Vue实例

- 注意 1：**先在data中声明数据，再使用数据**
- 注意 2：可以通过 `vm.$data` 访问到data中的所有属性，或者 `vm.msg`

```js
let vm = new Vue({
  data: {
    msg: '大家好，...'
  }
})

vm.$data.msg === vm.msg // true
```

### 数据绑定

- 最常用的方式：`Mustache(插值语法)`，也就是 `{{}}` 语法
- 解释：`{{}}`从数据对象`data`中获取数据
- 说明：数据对象的属性值发生了改变，插值处的内容都会更新
- 说明：`{{}}`中只能出现JavaScript表达式 而不能解析js语句
- 注意：**Mustache 语法不能作用在 HTML 元素的属性上**

```html
<h1>Hello, {{ msg }}.</h1>
<p>{{ 1 + 2 }}</p>
<p>{{ isOk ? 'yes': 'no' }}</p>

<!-- ！！！错误示范！！！ -->
<h1 title="{{ err }}"></h1>
```

## 双向数据绑定 Vue two way data binding

- 双向数据绑定：将DOM与Vue实例的data数据绑定到一起，彼此之间相互影响
  - 数据的改变会引起DOM的改变
  - DOM的改变也会引起数据的变化
- 原理：`Object.defineProperty`中的`get`和`set`方法
  - `getter`和`setter`：访问器
  - 作用：指定`读取或设置`对象属性值的时候，执行的操作
- [Vue - 深入响应式原理](https://vuejs.org/guide/extras/reactivity-in-depth.html)
- [MDN - Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

```javascript
/*  defineProperty语法 介绍 */
let obj = {}
Object.defineProperty(obj, 'msg', {
  // 设置 obj.msg = "1" 时set方法会被系统调用 参数分别是设置后和设置前的值
  set: function (newVal, oldVal) {  },
  // 读取 obj.msg 时get方法会被系统调用
  get: function ( newVal, oldVal ) {}
})
```

### Vue双向绑定的极简实现

- [剖析Vue原理&实现双向绑定MVVM](https://segmentfault.com/a/1190000006599500)

```html
<!-- 示例 -->
<input type="text" id="txt" />
<span id="sp"></span>

<script>
let txt = document.getElementById('txt'),
    sp = document.getElementById('sp'),
    obj = {}

// 给对象obj添加msg属性，并设置setter访问器
Object.defineProperty(obj, 'msg', {
  // 设置 obj.msg  当obj.msg反生改变时set方法将会被调用  
  set: function (newVal) {
    // 当obj.msg被赋值时 同时设置给 input/span
    txt.value = newVal
    sp.innerText = newVal
  }
})

// 监听文本框的改变 当文本框输入内容时 改变obj.msg
txt.addEventListener('keyup', function (event) {
  obj.msg = event.target.value
})
</script>
```

### 动态添加数据的注意点

- 注意：只有`data`中的数据才是响应式的，动态添加进来的数据默认为非响应式
- 可以通过以下方式实现动态添加数据的响应式
  - 1 `Vue.set(object, key, value)` - 适用于添加单个属性
  - 2 `Object.assign()` - 适用于添加多个属性

```javascript
let vm = new Vue({
  data: {
    stu: {
      name: 'jack',
      age: 19
    }
  }
})

/* Vue.set */
Vue.set(vm.stu, 'gender', 'male')

/* Object.assign 将参数中的所有对象属性和值 合并到第一个参数 并返回合并后的对象*/
vm.stu = Object.assign({}, vm.stu, { gender: 'female', height: 180 })
```

### 异步DOM更新

- 说明：Vue 异步执行 DOM 更新，监视所有数据改变，一次性更新DOM
- 优势：可以去除重复数据，对于避免不必要的计算和 避免重复 DOM 操作上，非常重要
- 如果需要那到更新后dom中的数据 则需要通过 `Vue.nextTick(callback)`：在DOM更新后，执行某个操作（属于DOM操作）
  - 实例调用`vm.$nextTick(function () {})`

```
methods: {
  fn() {
    this.msg = 'change'
    this.$nextTick(function () {
      console.log('$nextTick中打印：', this.$el.children[0].innerText);
    })
    console.log('直接打印：', this.$el.children[0].innerText);
  }
}
```

## 指令

- 解释：指令 (Directives) 是带有 `v-` 前缀的特殊属性
- 作用：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM

### v-text

- 解释：更新DOM对象的 textContent

```
<h1 v-text="msg"></h1>
```

### v-html

- 解释：更新DOM对象的 innerHTML

```
<h1 v-html="msg"></h1>
```

### v-bind

- 作用：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM
- 语法：`v-bind:title="msg"`
- 简写：`:title="msg"`

```
<!-- 完整语法 -->
<a v-bind:href="url"></a>
<!-- 缩写 -->
<a :href="url"></a>
```

### v-on

- 作用：绑定事件
- 语法：`v-on:click="say"` or `v-on:click="say('参数', $event)"`
- 简写：`@click="say"`
- 说明：绑定的事件定义在`methods`

```
<!-- 完整语法 -->
<a v-on:click="doSomething"></a>
<!-- 缩写 -->
<a @click="doSomething"></a>
```

### 事件修饰符

- `.stop` 阻止冒泡，调用 event.stopPropagation()
- `.prevent` 阻止默认行为，调用 event.preventDefault()
- `.capture` 添加事件侦听器时使用事件`捕获`模式
- `.self` 只当事件在该元素本身（比如不是子元素）触发时，才会触发事件
- `.once` 事件只触发一次

### v-model

- 作用：在表单元素上创建双向数据绑定
- 说明：监听用户的输入事件以更新数据
- 案例：计算器

```
<input type="text" v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

### v-for

- 作用：基于源数据多次渲染元素或模板块

```html
<!-- 1 基础用法 -->
<div v-for="item in items">
  {{ item.text }}
</div>

<!-- item 为当前项，index 为索引 -->
<p v-for="(item, index) in list">{{item}} -- {{index}}</p>
<!-- item 为值，key 为键，index 为索引 -->
<p v-for="(item, key, index) in obj">{{item}} -- {{key}}</p>
<p v-for="item in 10">{{item}}</p>
```

### key属性

- 推荐：使用 `v-for` 的时候提供 `key` 属性，以获得性能提升。
- 说明：使用 key，VUE会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
- [vue key](https://cn.vuejs.org/v2/guide/list.html#key)
- [vue key属性的说明](https://www.zhihu.com/question/61064119/answer/183717717)

```
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

## 样式处理 -class和style

- 使用方式：`v-bind:class="expression"` or `:class="expression"`
- 表达式的类型：字符串、数组、对象（重点）
- 语法：

```html
<!-- 1 -->
<div v-bind:class="{ active: true }"></div> ===> 解析后
<div class="active"></div>

<!-- 2 -->
<div :class="['active', 'text-danger']"></div> ===>解析后
<div class="active text-danger"></div>

<!-- 3 -->
<div v-bind:class="[{ active: true }, errorClass]"></div> ===>解析后
<div class="active text-danger"></div>


--- style ---
<!-- 1 -->
<div v-bind:style="{ color: activeColor, 'font-size': fontSize + 'px' }"></div>
<!-- 2 将多个 样式对象 应用到一个元素上-->
<!-- baseStyles 和 overridingStyles 都是data中定义的对象 -->
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

### v-if 和 v-show

- [条件渲染](https://cn.vuejs.org/v2/guide/conditional.html)
- `v-if`：根据表达式的值的真假条件，销毁或重建元素
- `v-show`：根据表达式之真假值，切换元素的 display CSS 属性

```
<p v-show="isShow">这个元素展示出来了吗？？？</p>
<p v-if="isShow">这个元素，在HTML结构中吗？？？</p>
```

### 提升性能：v-pre

- 说明：vue会跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

```
<span v-pre>{{ this will not be compiled }}</span>
```

### 提升性能：v-once

- 说明：vue只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

```
<span v-once>This will never change: {{msg}}</span>
```

## 过滤器 filter(不建议用,可以用计算属性和函数方法替代)

- 作用：文本数据格式化
- 过滤器可以用在两个地方：`{{}}`和 v-bind 表达式
- 两种过滤器：1 全局过滤器 2 局部过滤器

### 全局过滤器

- 说明：通过全局方式创建的过滤器，在任何一个vue实例中都可以使用
- 注意：使用全局过滤器的时候，需要先创建全局过滤器，再创建Vue实例
- 显示的内容由过滤器的返回值决定

```
Vue.filter('filterName', function (value) {
  // value 表示要过滤的内容
})
```

- 示例：

```
<div>{{ dateStr | date }}</div>
<div>{{ dateStr | date('YYYY-MM-DD hh:mm:ss') }}</div>

<script>
  Vue.filter('date', function(value, format) {
    // value 要过滤的字符串内容，比如：dateStr
    // format 过滤器的参数，比如：'YYYY-MM-DD hh:mm:ss'
  })
</script>
```

### 局部过滤器

- 说明：局部过滤器是在某一个vue实例的内容创建的，只在当前实例中起作用

```
{
  data: {},
  // 通过 filters 属性创建局部过滤器
  // 注意：此处为 filters
  filters: {
    filterName: function(value, format) {}
  }
}
```

## 按键值修饰符

- 说明：在监听键盘事件时，Vue 允许为 `v-on` 在监听键盘事件时添加关键修饰符
- [键盘事件 - 键值修饰符](https://cn.vuejs.org/v2/guide/events.html#)
- 其他：修饰键（.ctrl等）、鼠标按键修饰符（.left等）

```
// 只有在 keyCode 是 13 时调用 vm.submit()
@keyup.13="submit"
// 使用全局按键别名
@keyup.enter="add"

---

// 通过全局 config.keyCodes 对象自定义键值修饰符别名
Vue.config.keyCodes.f2 = 113
// 使用自定义键值修饰符
@keyup.enter.f2="add"
```

## 监视数据变化 - watch

- 概述：`watch`是一个对象，键是需要观察的表达式，值是对应回调函数
- 作用：当表达式的值发生变化后，会调用对应的回调函数完成响应的监视操作
- [VUE $watch](https://cn.vuejs.org/v2/api/#vm-watch)

```
new Vue({
  data: { a: 1, b: { age: 10 } },
  watch: {
    a: function(val, oldVal) {
      // val 表示当前值
      // oldVal 表示旧值
      console.log('当前值为：' + val, '旧值为：' + oldVal)
    },

    // 监听对象属性的变化
    b: {
      handler: function (val, oldVal) { /* ... */ },
      // deep : true表示是否监听对象内部属性值的变化 
      deep: true
    },

    // 只监视user对象中age属性的变化
    'user.age': function (val, oldVal) {
    },
  }
})
```

## 计算属性

- 说明：计算属性是基于它们的依赖进行缓存的，只有在它的依赖发生改变时才会重新求值
- 注意：Mustache语法（{{}}）中不要放入太多的逻辑，否则会让模板过重、难以理解和维护
- 注意：**computed中的属性不能与data中的属性同名，否则会报错**
- [Vue computed属性原理](http://www.cnblogs.com/kidney/p/7384835.html?utm_source=debugrun&utm_medium=referral)

```
let vm = new Vue({
  el: '#app',
  data: {
    firstname: 'jack',
    lastname: 'rose'
  },
  computed: {
    fullname() {
      return this.firstname + '.' + this.lastname
    }
  }
})
```

## 实例生命周期

- 所有的 Vue 组件都是 Vue 实例，并且接受相同的选项对象即可 (一些根实例特有的选项除外)。
- 实例生命周期也叫做：组件生命周期

### 生命周期介绍

- [vue生命周期钩子函数](https://cn.vuejs.org/v2/api/#)
- 简单说：**一个组件从开始到最后消亡所经历的各种状态，就是一个组件的生命周期**

生命周期钩子函数的定义：从组件被创建，到组件挂载到页面上运行，再到页面关闭组件被卸载，这三个阶段总是伴随着组件各种各样的事件，这些事件，统称为组件的生命周期函数！

- 注意：Vue在执行过程中会自动调用`生命周期钩子函数`，我们只需要提供这些钩子函数即可
- 注意：钩子函数的名称都是Vue中规定好的！

### 钩子函数 - beforeCreate()

- 说明：在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
- 注意：此时，无法获取 data中的数据、methods中的方法

### 钩子函数 - **created()**

- 注意：这是一个常用的生命周期，可以调用methods中的方法、改变data中的数据
- [vue实例生命周期 参考1](https://segmentfault.com/a/1190000008879966)
- [vue实例生命周期 参考2](https://segmentfault.com/a/1190000008010666)
- 使用场景：发送请求获取数据

### 钩子函数 - beforeMounted()

- 说明：在挂载开始之前被调用

### 钩子函数 - **mounted()**

- 说明：此时，vue实例已经挂载到页面中，可以获取到el中的DOM元素，进行DOM操作

### 钩子函数 - beforeUpdated()

- 说明：数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
- 注意：此处获取的数据是更新后的数据，但是获取页面中的DOM元素是更新之前的

### 钩子函数 - updated()

- 说明：组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。

### 钩子函数 - beforeDestroy()

- 说明：实例销毁之前调用。在这一步，实例仍然完全可用。
- 使用场景：实例销毁之前，执行清理任务，比如：清除定时器等

### 钩子函数 - destroyed()

- 说明：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

## 自定义指令

- 作用：进行DOM操作
- 使用场景：对纯 DOM 元素进行底层操作，比如：文本框获得焦点
- [vue 自定义指令用法实例](https://juejin.im/entry/58b7c5d8ac502e006cfee34a)
- 两种指令：1 全局指令 2 局部指令

### 全局自定义指令

```javascript
// 第一个参数：指令名称
// 第二个参数：配置对象，指定指令的钩子函数
Vue.directive('directiveName', {
  // bind中只能对元素自身进行DOM操作，而无法对父级元素操作
  // 只调用一次 指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  bind( el，binding, vnode ) {
    // 参数详解
    // el：指令所绑定的元素，可以用来直接操作 DOM 。
    // binding：一个对象，包含以下属性：
      // name：指令名，不包括 v- 前缀。
      // value：指令的绑定值，等号后面的值 。
      // oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
      // expression：字符串形式的指令表达式 等号后面的字符串 形式
      // arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
      // modifiers：指令修饰符。例如：v-directive.foo.bar中，修饰符对象为 { foo: true, bar: true }。
    // vnode：Vue 编译生成的虚拟节点。。
    // oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
  },
  // inserted这个钩子函数调用的时候，当前元素已经插入页面中了，也就是说可以获取到父级节点了
  inserted (  el，binding, vnode ) {},
  //  DOM重新渲染前
  update(el，binding, vnode,oldVnode) {},
  // DOM重新渲染后
  componentUpdated ( el，binding, vnode,oldVnode ) {},
  // 只调用一次，指令与元素解绑时调用
  unbind ( el ) {
    // 指令所在的元素在页面中消失，触发
  }
})
// 简写 如果你想在 bind 和 update 时触发相同行为，而不关心其它的钩子:
Vue.directive('自定义指令名', function( el, binding ) {})
// 例：
Vue.directive('color', function(el, binding) {
  el.style.color = binging.value
})
// 使用 注意直接些会被i成data中的数据“red” 需要字符串则嵌套引号"'red'"
<p v-color="'red'"></p>
```

### 局部自定义指令

```
let vm = new Vue({
  el : "#app",
  directives: {
    directiveName: { }
  }
})
```

- [vue 剖析Vue原理&实现双向绑定MVVM](https://segmentfault.com/a/1190000006599500)

## 组件

> 组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树

- 创建组件的两种方式：1 全局组件 2 局部组件

### 全局组件

- 说明：全局组件在所有的vue实例中都可以使用
- 注意：**先注册组件，再初始化根实例**

```
// 1 注册全局组件  
Vue.component('my-component', {
  // template 只能有一个根元素
  template: '<p>A custom component!</p>',
  // 组件中的 `data` 必须是函数 并且函数的返回值必须是对象
  data() {
    return {
      msg: '注意：组件的data必须是一个函数！！！'
    }
  }
})

// 2 使用：以自定义元素的方式
<div id="example">
  <my-component></my-component>
</div>

// =====> 渲染结果
<div id="example">
  <p>A custom component!</p>
</div>


// 3 template属性的值可以是：
  - 1 模板字符串
  - 2 模板id  template: '#tpl'
<script type="text/x-template" id="tpl">
  <p>A custom component!</p>
</script>
```

- `extend`：使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

```
// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
Vue.component('my-component', { /* ... */ })

let Home = Vue.extend({
  template: '',
  data() {}
})
Vue.component('home', Home)
```

### 局部组件

- 说明：局部组件，是在某一个具体的vue实例中定义的，只能在这个vue实例中使用

```
let Child = {
  template: '<div>A custom component!</div>'
}

new Vue({
  // 注意：此处为 components
  components: {
    // <my-component> 将只在当前vue实例中使用
    // my-component 为组件名 值为配置对象 
    'my-component': {
      template: ``,
      data () { return { } },
      props : []
    }
  }
})
```

### is特性

> 在某些特定的标签中只能存在指定表恰 如ul > li 如果要浏览器正常解析则需要使用is

```
<!-- 案例 -->
<ul id="app">
  <!-- 不能识别 -->
  <my-li></my-li> 
  正常识别
  <li is="my-li"></li>
</ul>

<script>
  let vm = new Vue({
    el: "#app",
    components : {
      myLi : {
        template : `<li>内容</li>`
      }
    }
  })
</script>
```

## 组件通讯

### 父组件到子组件(props)

- 方式：通过子组件`props`属性来传递数据 props是一个数组
- 注意：属性的值必须在组件中通过`props`属性显示指定，否则，不会生效
- 说明：传递过来的`props`属性的用法与`data`属性的用法相同

```
<div id="app">
  <!-- 如果需要往子组件总传递父组件data中的数据 需要加v-bind="数据名称" -->
  <hello v-bind:msg="info"></hello>
  <!-- 如果传递的是字面量 那么直接写-->
  <hello my-msg="abc"></hello>
</div>

<!-- js -->
<script>
  new Vue({
    el: "#app",
    data : {
      info : 15
    },
    components: {
      hello: {
        // 创建props及其传递过来的属性
        props: ['msg', 'myMsg'],
        template: '<h1>这是 hello 组件，这是消息：{{msg}} --- {{myMsg}}</h1>'
      }
    }
  })
</script>
```

### 子组件到父组件(emit)

方式：父组件给子组件传递一个函数，由子组件调用这个函数

- 说明：借助vue中的自定义事件（v-on:cunstomFn="fn"）

步骤:

- 1、在父组件中定义方法 parentFn
- 2、在子组件 组件引入标签 中绑定自定义事件 v-on:自定义事件名="父组件中的方法" ==> @pfn="parentFn"
- 3、子组件中通过`$emit()`触发自定义事件事件 this.$emit(pfn,参数列表。。。)

```
<hello @pfn="parentFn"></hello>

<script>
  Vue.component('hello', {
    template: '<button @click="fn">按钮</button>',
    methods: {
      // 子组件：通过$emit调用
      fn() {
        this.$emit('pfn', '这是子组件传递给父组件的数据')
      }
    }
  })
  new Vue({
    methods: {
      // 父组件：提供方法
      parentFn(data) {
        console.log('父组件：', data)
      }
    }
  })
</script>
```

### 非父子组件通讯

#### eventbus(不建议使用,之后会弃用)

> 在简单的场景下，可以使用一个空的 Vue 实例作为事件总线

- `$on()`：绑定自定义事件(不建议使用,之后会弃用)

```
let bus = new Vue()

// 在组件 B 绑定自定义事件
bus.$on('id-selected', function (id) {
  // ...
})
// 触发组件 A 中的事件
bus.$emit('id-selected', 1)
```

- 示例：组件A ---> 组件B

```
<!-- 组件A： -->
<com-a></com-a>
<!-- 组件B： -->
<com-b></com-b>

<script>
  // 中间组件
  let bus = new Vue()
  // 通信组件
  let vm = new Vue({
    el: '#app',
    components: {
      comB: {
        template: '<p>组件A告诉我：{{msg}}</p>',
        data() {
          return {
            msg: ''
          }
        },
        created() {
          // 给中间组件绑定自定义事件 注意:如果用到this 需要用箭头函数
          bus.$on('tellComB', (msg) => {
            this.msg = msg
          })
        }
      },
      comA: {
        template: '<button @click="emitFn">告诉B</button>',
        methods: {
          emitFn() {
            // 触发中间组件中的自定义事件
            bus.$emit('tellComB', '土豆土豆我是南瓜')
          }
        }
      }
    }
  })
</script>
```

#### `ref和refs`

`ref`：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例，可以通过实例直接调用组件的方法或访问数据， 我们看一个`ref` 来访问组件的例子:

```
// 子组件 A.vue

export default {
  data () {
    return {
      name: 'Vue.js'
    }
  },
  methods: {
    sayHello () {
      console.log('hello')
    }
  }
}
复制代码
// 父组件 app.vue

<template>
  <component-a ref="comA"></component-a>
</template>
<script>
  export default {
    mounted () {
      const comA = this.$refs.comA;
      console.log(comA.name);  // Vue.js
      comA.sayHello();  // hello
    }
  }
</script>
```

#### `localStorage` / `sessionStorage`

这种通信比较简单,缺点是数据和状态比较混乱,不太容易维护。 通过`window.localStorage.getItem(key)`获取数据 通过`window.localStorage.setItem(key,value)`存储数据

> 注意用`JSON.parse()` / `JSON.stringify()` 做数据格式转换 `localStorage` / `sessionStorage`可以结合`vuex`, 实现数据的持久保存,同时使用vuex解决数据和状态混乱问题.

#### 三、`provide`/ `inject`

> 概念:

`provide`/ `inject` 是`vue2.2.0`新增的api, 简单来说就是父组件中通过`provide`来提供变量, 然后再子组件中通过`inject`来注入变量。

> 注意: 这里不论子组件嵌套有多深, 只要调用了`inject` 那么就可以注入`provide`中的数据，而不局限于只能从当前父组件的props属性中回去数据

> 举例验证

接下来就用一个例子来验证上面的描述: 假设有三个组件: A.vue、B.vue、C.vue 其中 C是B的子组件，B是A的子组件

```
// A.vue

<template>
  <div>
 <comB></comB>
  </div>
</template>

<script>
  import comB from '../components/test/comB.vue'
  export default {
    name: "A",
    provide: {
      for: "demo"
    },
    components:{
      comB
    }
  }
</script>
复制代码
// B.vue

<template>
  <div>
    {{demo}}
    <comC></comC>
  </div>
</template>

<script>
  import comC from '../components/test/comC.vue'
  export default {
    name: "B",
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    },
    components: {
      comC
    }
  }
</script>
复制代码
// C.vue
<template>
  <div>
    {{demo}}
  </div>
</template>

<script>
  export default {
    name: "C",
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    }
  }
</script>
```

#### vuex状态管理

一般全局的数据处理可以使用,不再赘述

### 内容分发(插槽)

这个比较复杂,建议直接看文档 [插槽使用](https://cn.vuejs.org/v2/guide/components-slots.html)
案例：

```
<!-- html代码 -->
<div id="app">
  <hello>
    <!-- 如果只有一个slot插槽 那么不需要指定名称 -->
    <p slot="插槽名称">我是额外的内容</p>
  </hello>
</div>
// js代码
new vue({
  el : "#app",
  components : {
    hello : {
      template : `
          <div>
            <p>我是子组件中的内容</p>
            <slot name="名称"></slot>
          </div>
        `
    }
  }
})
```

### 获取组件（或元素） - refs

- 说明：`vm.$refs` 一个对象，持有已注册过 ref 的所有子组件（或HTML元素）
- 使用：在 HTML元素 中，添加`ref`属性，然后在JS中通过`vm.$refs.属性`来获取
- 注意：如果获取的是一个子组件，那么通过ref就能获取到子组件中的data和methods

```
<div id="app">
  <div ref="dv"></div>
  <my res="my"></my>
</div>

<!-- js -->
<script>
  new Vue({
    el : "#app",
    mounted() {
      this.$refs.dv //获取到元素
      this.$refs.my //获取到组件
    },
    components : {
      my : {
        template: `<a>sss</a>`
      }
    }
  })
</script>
```

## 路由

详细内容和案例见    [链接](<https://www.yuque.com/docs/share/2fcfcf69-9fab-4877-966d-50c5740e9226>?# 《vue-router教程》)

- 路由即：浏览器中的哈希值（# hash）与展示视图内容（template）之间的对应规则
- vue中的路由是：hash 和 component的对应关系
在 Web app 中，通过一个页面来展示和管理整个应用的功能。
SPA往往是功能复杂的应用，为了有效管理所有视图内容，前端路由 应运而生！
简单来说，路由就是一套映射规则（一对一的对应规则），由开发人员制定规则。
当URL中的哈希值（# hash）发生改变后，路由会根据制定好的规则，展示对应的视图内容

### 基本使用

- 安装：npm i -S vue-router

```
    <div id="app">
      <!-- 5 路由入口 指定跳转到只定入口 -->
      <router-link to="/home">首页</router-link>
      <router-link to="/login">登录</router-link>
    
      <!-- 7 路由出口：用来展示匹配路由视图内容 -->
      <router-view></router-view>
    </div>
    
    <!-- 1 导入 vue.js -->
    <script src="./vue.js"></script>
    <!-- 2 导入 路由文件 -->
    <script src="./node_modules/vue-router/dist/vue-router.js"></script>
    <script>
      // 3 创建两个组件
      const Home = Vue.component('home', {
        template: '<h1>这是 Home 组件</h1>'
      })
      const Login = Vue.component('login', {
        template: '<h1>这是 Login 组件</h1>'
      })
    
      // 4 创建路由对象
      const router = new VueRouter({
        routes: [
          // 路径和组件一一对应
          { path: '/home', component: Home },
          { path: '/login', component: Login }
        ]
      })
    
      let vm = new Vue({
        el: '#app',
        // 6 将路由实例挂载到vue实例
        router
      })
    </script>
```

### 重定向

```
//  将path 重定向到 redirect
{ path: '/', redirect: '/home' }
```

### 路由其他配置

- 路由导航高亮
  - 说明：当前匹配的导航链接，会自动添加router-link-exact-active router-link-active类
  - 配置：linkActiveClass
- 匹配路由模式
  - 配置：mode

```
new Router({
  routers:[],
  mode: "hash", //默认hash | history 可以达到隐藏地址栏hash值 | abstract，如果发现没有浏览器的 API 则强制进入
  linkActiveClass : "now" //当前匹配的导航链接将被自动添加now类
})
```

### 路由参数

- 说明：我们经常需要把某种模式匹配到的所有路由，全都映射到同一个组件，此时，可以通过路由参数来处理
- 语法：/user/:id
- 使用：当匹配到一个路由时，参数值会被设置到 this.$route.params
- 其他：可以通过 $route.query 获取到 URL 中的查询参数 等

```
    // 方式一
    <router-link to="/user/1001">如果你需要在模版中使用路由参数 可以这样 {{$router.params.id}}</router-link>
    // 方式二
    <router-link :to="{path:'/user',query:{name:'jack',age:18}}">用户 Rose</router-link>


    <script>
    // 路由
    let router = new Router({
      routers : [
        // 方式一 注意 只有/user/1001这种形式能被匹配 /user | /user/ | /user/1001/ 都不能被匹配
        // 将来通过$router.params获取参数返回 {id:1001}
        { path: '/user/:id', component: User }, 
        // 方式二
        { path: "user" , component: User}
      ]
    })
    
    // User组件：
    const User = {
      template: `<div>User {{ $route.params.id }}</div>`
    }
    </script>  
    <!-- 如果要子啊vue实例中获取路由参数 则使用this.$router.params 获取路由参数对象 -->
    <!--  {{$router.query}} 获取路由中的查询字符串 返回对象 -->
```

### 嵌套路由 - 子路由

- 路由是可以嵌套的，即：路由中又包含子路由
- 规则：父组件中包含 router-view，在路由规则中使用 children 配置

```
    // 父组件：
    const User = Vue.component('user', {
      template: `
        <div class="user">
          <h2>User Center</h2>
          <router-link to="/user/profile">个人资料</router-link>
          <router-link to="/user/posts">岗位</router-link>
          <!-- 子路由展示在此处 -->
          <router-view></router-view>
        </div>
        `
    })
    
    // 子组件[简写]
    const UserProfile = {
      template: '<h3>个人资料：张三</h3>'
    }
    const UserPosts = {
      template: '<h3>岗位：FE</h3>'
    }
    
    // 路由
    let router =new Router({
      routers : [

        { path: '/user', component: User,
          // 子路由配置：
          children: [
            {
              // 当 /user/profile 匹配成功，
              // UserProfile 会被渲染在 User 的 <router-view> 中
              path: 'profile',
              component: UserProfile
            },
            {
              // 当 /user/posts 匹配成功
              // UserPosts 会被渲染在 User 的 <router-view> 中
              path: 'posts',
              component: UserPosts
            }
          ]
        }
      ]
    })
```

## vuex状态管理

这个一般非专业前端也用不到,跳过

详细见[vuex官网](https://vuex.vuejs.org/zh/)

## SPA -单页应用程序

### SPA： Single Page Application

```
单页Web应用（single page application，SPA），就是只有一个Web页面的应用，
是加载单个HTML页面，并在用户与应用程序交互时动态更新该页面的Web应用程序。
```

- 单页面应用程序：
  - 只有第一次会加载页面, 以后的每次请求, 仅仅是获取必要的数据.然后, 由页面中js解析获取的数据, 展示在页面中
- 传统多页面应用程序：
  - 对于传统的多页面应用程序来说, 每次请求服务器返回的都是一个完整的页面

优势

- 1 减少了请求体积，加快页面响应速度，降低了对服务器的压力
- 2 更好的用户体验，让用户在web app感受native app的流畅

实现思路和技术点

- 1 ajax
- 2 锚点的使用（window.location.hash #）
- 3 hashchange 事件 window.addEventListener("hashchange",function () {})
- 4 监听锚点值变化的事件，根据不同的锚点值，请求相应的数据
- 5 原本用作页面内部进行跳转，定位并展示相应的内容

## 前端模块化

> 为什么需要模块化

- 1 最开始的js就是为了实现客户端验证以及一些简单的效果
- 2 后来，js得到重视，应用越来越广泛，前端开发的复杂度越来越高
- 3 旧版本的js中没有提供与模块（module）相关的内容

### 模块的概念

- 在js中，一个模块就是实现特定功能的文件（js文件）
- 遵循模块的机制，想要什么功能就加载什么模块
- 模块化开发需要遵循规范

### 模块化解决的问题

- 1 命名冲突
- 2 文件依赖（加载文件）
- 3 模块的复用
- 4 统一规范和开发方式

### JS实现模块化的规范

- AMD 浏览器端
  - requirejs
- CommonJS nodejs
  - 加载模块：require()
  - 导出模块：module.exports = {} / exports = {}
- ES6 中的 import / export
- CMD 浏览器端
  - 玉伯（阿里前端大神） -> seajs
- UMD 通用模块化规范，可以兼容 AMD、CommonJS、浏览器中没有模块化规范 等这些语法

AMD 的使用

> Asynchronous Module Definition：异步模块定义，浏览器端模块开发的规范 代表：require.js 特点：模块被异步加载，模块加载不影响后面语句的运行

1、定义模块

```
    // 语法:define(name, dependencies?, factory);
    // name表示：当前模块的名称，是一个字符串 可有可无
    // dependencies表示：当前模块的依赖项，是一个数组无论依赖一项还是多项 无则不写
    // factory表示：当前模块要完成的一些功能，是一个函数
    
    // 定义对象模块
    define({})
    // 定义方法模块
    define(function() {
      return {}
    })
    // 定义带有依赖项的模块
    define(['js/a'], function() {})
```

2、加载模块

```
// - 注意：require的第一个参数必须是数组

    // 参数必须是数组 表示模块路径 以当前文件为基准,通过回调函数中的参数获取加载模块中的变量 参数与模块按照顺序一一对应
    require(['a', 'js/b'], function(a, b) {
      // 使用模块a 和 模块b 中的代码
    })
```

3、路径查找配置

- requirejs 默认使用 baseUrl+paths 的路径解析方式
- 可以使用以下方式避开此设置：
  - 1 以.js结尾
  - 2 以 / 开始
  - 3 包含协议：https:// 或 http://

```
// 配置示例
    // 注意配置应当在使用之前
    require.config({
      baseUrl: './js' // 配置基础路径为：当前目录下的js目录
    })
    require(['a'])    // 查找 基础路径下的 ./js/a.js

// 简化加载模块路径
    require.config({
      baseUrl: './js',
      // 配置一次即可，直接通过路径名称（template || jquery）加载模块
      paths: {
        template: 'assets/artTemplate/template-native',
        jquery: 'assets/jquery/jquery.min'
      }
    })
    // 加载jquery template模块
    require(['jquery', 'template'])
```

4、非模块化和依赖项支持

- 1 添加模块的依赖模块，保证加载顺序（deps）
- 2 将非模块化模块，转化为模块化（exports）

```
// 示例
    require.config({
      baseUrl: './js',
      paths: {
        // 配置路径
        noModule: 'assets/demo/noModule'
      },
      // 配置不符合规范的模块项
      shim: {
        // 模块名称
        noModule: {
          deps: [],         // 依赖项
          exports: 'sayHi'  // 导出模块中存在的函数或变量
        }
      }
    });

// 注意点  如果定义模块的时候，指定了模块名称，需要使用该名称来引用模块
    // 定义 这个模块名称与paths中的名称相同
    define('moduleA', function() {})
    // 导入
    require.config({
      paths: {
        // 此处的模块名：moduleA
        moduleA: 'assets/demo/moduleA'
      }
    })
```

5、路径加载规则

- 路径配置的优先级：
  - 1 通过 config 配置规则查找
  - 2 通过 data-main 指定的路径查找
  - 3 以引入 requirejs 的页面所在路径为准查找

```
    <!-- 
      设置data-main属性
      1 data-main属性指定的文件也会同时被加载
      2 用于指定查找其他模块的基础路径
    -->
    <script src="js/require.js" data-main="js/main"></script>
```

## axios

- Promise based HTTP client for the browser and node.js
  - 以Promise为基础的HTTP客户端，适用于：浏览器和node.js
  - 封装ajax，用来发送请求，异步获取数据
- 安装：`yarn add axios`
- [axios](https://github.com/axios/axios)

```javascript
// 在浏览器中使用，直接引入js文件使用下面的GET/POST请求方式即可
// 1 引入 axios.js
// 2 直接调用axios提供的API发送请求
created() {
  axios.get(url)
    .then(function(resp) {})
}

---
// 配合 webpack 使用方式如下：
import Vue from 'vue'
import axios from 'axios'
// 将 axios 添加到 Vue.prototype 中
Vue.prototype.$axios = axios

---
// 在组件中使用：
methods: {
  getData() {
    this.$axios.get('url')
      .then(res => {})
      .catch(err => {})
  }
}

---
// API使用方式：

axios.get(url[, config])
axios.post(url[, data[, config]])
axios(url[, config])
axios(config)
```

### Get 请求

```javascript
const url = 'http://vue.studyit.io/api/getnewslist'

// url中带有query参数
axios.get('/user?id=89')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// url和参数分离，使用对象
axios.get('/user', {
  params: {
    id: 12345
  }
})
```

### Post 请求

- [不同环境中处理 POST请求](https://github.com/axios/axios#using-applicationx-www-form-urlencoded-format)
- 默认情况下，axios 会将JS对象序列化为JSON对象。为了使用 `application/x-www-form-urlencoded` 格式发送请求，我们可以这样：

```javascript
// 使用 qs 包，处理将对象序列化为字符串
// npm i -S qs
// let qs = require('qs')
import qs from 'qs'
qs.stringify({ 'bar': 123 }) ===> "bar=123"
axios.post('/foo', qs.stringify({ 'bar': 123 }))

// 或者：
axios.post('/foo', 'bar=123&age=19')
const url = 'http://vue.studyit.io/api/postcomment/17'
axios.post(url, 'content=点个赞不过份')

axios.post('/user', qs.stringify({
    firstName: 'Fred',
    lastName: 'Flintstone'
  }))
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### 全局配置

```
// 设置请求公共路径：
axios.defaults.baseURL = 'http://vue.studyit.io'
```

### 拦截器

- 拦截器会拦截发送的每一个请求，请求发送之前执行`request`中的函数，请求发送完成之后执行`response`中的函数

```javascript
// 请求拦截器
axios.interceptors.request.use(function (config) {
    // 所有请求之前都要执行的操作

    return config;
  }, function (error) {
    // 错误处理

    return Promise.reject(error);
  });

// 响应拦截器
axios.interceptors.response.use(function (response) {
    // 所有请求完成后都要执行的操作

    return response;
  }, function (error) {
    // 错误处理
    return Promise.reject(error);
  });
```
