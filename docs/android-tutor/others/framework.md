# 架构

<https://capacitorjs.com/>
<https://nativescript.org/>

## 关于capacitor

热加载

```shell
ionic capacitor run android -l --external
```

- <https://capacitorjs.com/docs/guides/live-reload>
- <https://ionicframework.com/docs/cli/livereload>
:::tip
有eslint错误的话无法自动部署apk到手机上
<https://github.com/ionic-team/ionic-cli/issues/4807>
:::

### 打包

第一种

```shell
npx cap run android 
```

第二种

1. `npm run build`生产dist文件夹
2. `​npx cap sync​`复制dist到安卓的assets文件夹
3. `​npx cap open android​`打开android studio 生产apk
