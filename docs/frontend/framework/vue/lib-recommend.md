# ui库列表

## vue 的ui库

- [elementui (vue2)](http://element-cn.eleme.io/#/zh-CN)
- [element-plus(vue3)](https://element-plus.org/)
- https://www.radix-vue.com/
- [antdv](https://antdv.com/)
- [vuetify](https://vuetifyjs.com/) vite
- [quasar](https://quasar.dev/)
- [keenui](https://josephuspaye.github.io/Keen-UI/#/ui-alert)
- [naive ui](https://www.naiveui.com/) vite
- [vant](https://vant-ui.github.io/vant/)
- [arco](https://arco.design/)  vite
- [varilet]( https://github.com/varletjs/varlet) vite
- [nutui](https://nutui.jd.com/#/)  vite
- [idux](https://github.com/IDuxFE/idux) vite
- [https://primevue.org/](https://primevue.org/)   vite
- [https://vue-devui.github.io/quick-start/](https://vue-devui.github.io/quick-start/) esbuild

## react的ui库

- [antdesign](https://ant.design/)
- [materialui](https://mui.com/material-ui/)
- [mantine](https://mantine.dev/)
- https://www.radix-ui.com/
- [rsuit](https://rsuitejs.com/)
- https://primereact.org/
- [roit](https://riot.js.org/)
- [iconic](https://github.com/ionic-team/ionic-framework)
- [react-bootstrap](https://react-bootstrap.github.io)
- [reactstrap](http://reactstrap.github.io)
- [ever-green](https://evergreen.segment.com/)
- [elasticui](https://elastic.github.io/eui/)
- [@jetbrains/ring-ui](https://github.com/JetBrains/ring-ui)
- [geist](https://geist-ui.dev/zh-cn)
- [arco design](https://arco.design/)
- [chakara](https://github.com/chakra-ui/chakra-ui)
- [fluent ui](https://github.com/microsoft/fluentui)
- <https://rebassjs.org/>
- [nextui](https://nextui.org/)
- [https://zagjs.com/](https://zagjs.com/)
- [https://www.radix-ui.com/](https://www.radix-ui.com/)
- [shandui](https://ui.shadcn.com/)

## 手机端

- <https://github.com/NervJS/taro-ui>
- <https://github.com/ant-design/ant-design-mobile>
- <https://github.com/Tencent/tdesign-react>
- <https://github.com/jdf2e/nutui-react>
- <https://github.com/youzan/vant>
- <https://react-vant.3lang.dev/>

## webcomponents

[xy-ui.codelabo.cn](https://xy-ui.codelabo.cn/docs/#/)

## antdv

```javascript
在antd中 使用form去回显或者新增表单数据时，select的placeholder不显示

如下例子：新增的时候，默认地址是空 “” 或者 null, 都不好使
这就要主要了，form中的select初始值为空时 要用 undefined
换成如下这样就OK了
```js
initialValue: this.props.isTrue ? this.props.data.bank.id : undefined,
```

注意，form中的日期datePicker相关的日期的空，初始值要用 null

el-checkbox的change事件传入你想要的字段

```js
@change="checked=>方法名(checked,你想传的额外参数...)"
```

实例

```html
<el-checkbox :disabled="scope.row.disable" v-model="scope.row.cashStatus"
                       @change="checked=>checkRow(checked, scope.row)"></el-checkbox>
                       
checkRow(checked,row) {
    console.log(`checked:${checked}`)
    console.log(`row:${JSON.stringify(row)}`)
  },
```

## 一些好玩的库

[https://www.npmjs.com/package/console-feed](https://www.npmjs.com/package/console-feed)

### 播放器

- [https://github.com/zhw2590582/ArtPlayer](https://github.com/zhw2590582/ArtPlayer)
- [https://github.com/DIYgod/DPlayer](https://github.com/DIYgod/DPlayer)
- [https://github.com/video-dev/hls.js](https://github.com/video-dev/hls.js)
- [https://github.com/sampotts/plyr](https://github.com/sampotts/plyr)
