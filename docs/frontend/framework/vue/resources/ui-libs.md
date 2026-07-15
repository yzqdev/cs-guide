# UI 组件库推荐

## Vue 组件库

| 库名 | 版本 | 特点 | 推荐指数 |
|------|------|------|:--------:|
| [Element Plus](https://element-plus.org/) | Vue 3 | 企业级，组件丰富，文档完善，中文友好 | ⭐⭐⭐⭐⭐ |
| [Element UI](http://element-cn.eleme.io/) | Vue 2 | Element Plus 的 Vue 2 版本 | ⭐⭐⭐⭐ |
| [Ant Design Vue](https://antdv.com/) | Vue 3 | 遵循 Ant Design 设计规范 | ⭐⭐⭐⭐⭐ |
| [Naive UI](https://www.naiveui.com/) | Vue 3 | 轻量，TypeScript 支持好，按需加载 | ⭐⭐⭐⭐⭐ |
| [Vuetify](https://vuetifyjs.com/) | Vue 3 | Material Design 风格，功能丰富 | ⭐⭐⭐⭐ |
| [Quasar](https://quasar.dev/) | Vue 3 | 跨平台（Web/移动端/桌面），含 CLI | ⭐⭐⭐⭐⭐ |
| [Arco Design](https://arco.design/) | Vue 3 | 字节跳动出品，设计规范 | ⭐⭐⭐⭐ |
| [PrimeVue](https://primevue.org/) | Vue 3 | 功能丰富，主题系统强大 | ⭐⭐⭐⭐ |
| [Radix Vue](https://www.radix-vue.com/) | Vue 3 | 无样式，可定制性强 | ⭐⭐⭐⭐ |
| [Varlet](https://varlet.gitee.io/) | Vue 3 | Material Design 风格，轻量 | ⭐⭐⭐ |
| [NutUI](https://nutui.jd.com/) | Vue 3 | 京东出品，移动端优先 | ⭐⭐⭐ |
| [Vant](https://vant-ui.github.io/) | Vue 3 | 移动端 UI 库，轻量高效 | ⭐⭐⭐⭐ |
| [IDUX](https://github.com/IDuxFE/idux) | Vue 3 | 企业级中后台组件库 | ⭐⭐⭐ |
| [Vue DevUI](https://vue-devui.github.io/) | Vue 3 | 华为开源，基于 DevUI 设计 | ⭐⭐⭐ |
| [Keen UI](https://josephuspaye.github.io/Keen-UI/) | Vue 2 | 轻量级 UI 组件 | ⭐⭐ |

## React 组件库

| 库名 | 特点 | 推荐指数 |
|------|------|:--------:|
| [Ant Design](https://ant.design/) | 企业级，组件最全，中文友好 | ⭐⭐⭐⭐⭐ |
| [MUI (Material UI)](https://mui.com/) | Material Design 风格，生态完善 | ⭐⭐⭐⭐⭐ |
| [Mantine](https://mantine.dev/) | 现代，Hooks 丰富，可定制性强 | ⭐⭐⭐⭐⭐ |
| [shadcn/ui](https://ui.shadcn.com/) | 基于 Radix，非组件库而是代码集合 | ⭐⭐⭐⭐⭐ |
| [Radix UI](https://www.radix-ui.com/) | 无样式，无障碍，可定制 | ⭐⭐⭐⭐ |
| [Chakra UI](https://chakra-ui.com/) | 简洁，主题系统完善 | ⭐⭐⭐⭐ |
| [NextUI](https://nextui.org/) | 现代，美观，基于 Tailwind | ⭐⭐⭐⭐ |
| [PrimeReact](https://primereact.org/) | 功能丰富，主题多样 | ⭐⭐⭐⭐ |
| [Arco Design](https://arco.design/) | 字节跳动出品，设计规范 | ⭐⭐⭐⭐ |
| [RSuite](https://rsuitejs.com/) | 企业级中后台 | ⭐⭐⭐ |
| [React Bootstrap](https://react-bootstrap.github.io/) | Bootstrap 风格 | ⭐⭐⭐ |
| [Evergreen](https://evergreen.segment.com/) | Segment 出品，简洁 | ⭐⭐⭐ |
| [Fluent UI](https://github.com/microsoft/fluentui) | 微软出品，Office 风格 | ⭐⭐⭐ |
| [Geist UI](https://geist-ui.dev/) | Vercel 风格，极简 | ⭐⭐⭐ |
| [Grommet](https://v2.grommet.io/) | 可访问性优先 | ⭐⭐ |
| [Elastic UI](https://elastic.github.io/eui/) | Elastic 出品 | ⭐⭐ |

## 移动端组件库

- [Vant](https://vant-ui.github.io/) - 有赞出品，Vue 移动端（推荐）
- [Ant Design Mobile](https://github.com/ant-design/ant-design-mobile) - Ant Design 移动版
- [NutUI React](https://github.com/jdf2e/nutui-react) - 京东移动端 React 版
- [React Vant](https://react-vant.3lang.dev/) - Vant 的 React 实现
- [TDesign](https://github.com/Tencent/tdesign-react) - 腾讯出品，移动端/桌面端
- [Taro UI](https://github.com/NervJS/taro-ui) - 多端统一 UI（Taro 框架）

## Web Components

- [xy-ui](https://xy-ui.codelabo.cn/) - 原生 Web Components 组件库

## 组件库使用技巧

### Ant Design Vue - Select 占位符不显示

```javascript
// ❌ 空字符串或 null 时 placeholder 不显示
initialValue: ''

// ✅ 使用 undefined
initialValue: undefined
```

### Element UI - Checkbox 传递额外参数

```vue
<el-checkbox
  :disabled="scope.row.disable"
  v-model="scope.row.cashStatus"
  @change="checked => checkRow(checked, scope.row)"
/>

<script>
methods: {
  checkRow(checked, row) {
    console.log(`checked: ${checked}`);
    console.log(`row: ${JSON.stringify(row)}`);
  },
},
</script>
```

### Emotion + Ant Design 覆盖样式

```tsx
import styled from '@emotion/styled';

const DarkHoverStyle = styled(Icon)`
  color: gray;
  :hover {
    color: palevioletred;
  }
`;

const GlobalStyle = createGlobalStyle`
  .ant-tooltip-inner {
    background-color: palevioletred;
    color: black;
  }
`;
```

## 播放器组件

- [ArtPlayer](https://github.com/zhw2590582/ArtPlayer) - 现代化视频播放器
- [DPlayer](https://github.com/DIYgod/DPlayer) - 弹幕视频播放器
- [Plyr](https://github.com/sampotts/plyr) - 简洁视频/音频播放器
- [hls.js](https://github.com/video-dev/hls.js) - HLS 协议播放

## 其他工具

- [console-feed](https://www.npmjs.com/package/console-feed) - 在页面中显示 console 输出
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - VS Code 编辑器内核