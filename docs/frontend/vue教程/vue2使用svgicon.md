# vue2使用svgicon

随着技术的进步,svg和iconfont成了前端图标的趋势,如何在vue中使用svgicon呢,这篇文章告诉你

1. 配置svg-sprite-loader
在`vue.config.js`中写入以下内容

```javascript
chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, "./src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
    const fileRule = config.module.rule("file");
    fileRule.uses.clear();//这里不使用fileloader防止被多个loader处理
    fileRule
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, "./src/icons"))
      .end()
      .use("file-loader")
      .loader("file-loader");
  },
```

2. 首先要写一个svg通用组件,通过图标的id来引用图标
_代码如下_

```html
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "icon-svg",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
  },
};
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```

这里需要注意,className是svg的样式,iconName是icon的文件名(需要您自己配置)
3. 引入svg图标
在main.js里面引入您的svg图标,比如我的图标在src下的icons目录

```javascript
// requires and returns all modules that match
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./icons', true, /\.svg$/);
requireAll(req);
//引入svg组件
import IconSvg from '@/components/IconSvg'
//全局注册icon-svg
Vue.component('icon-svg', IconSvg)
```
