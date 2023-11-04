# yarn4用法

## 安装

需要用到corepack,先启用corepack

```
corepack enable
# 然后安装yarn
corepack prepare yarn@stable --activate
# 看一下yarn版本

yarn -v

```

安装完成后,因为yarn默认使用pnp模式,没有node_modules,所以需要更改nodeLinker
在`~/.yarnrc.yml`中添加

```yml
npmRegistryServer: "https://registry.npmmirror.com/"
nodeLinker: "node-modules"
```

这样就是全局生效的了

## 常用命令

```powershell
yarn dlx create-vite


# yarn global 命令被移除了,所以推荐 使用pnpm安装全局包,开发cli命令行


```

全局包

```json
{
 "dependencies": {
 
  "pm2": "^5.3.0",
  "taze": "^0.12.0",
  "@ant-design/pro-cli": "^3.1.0",
    "@antfu/ni": "^0.21.8",
    "@ionic/cli": "^7.1.1",
    "@nestjs/cli": "^10.1.18",
    "@nestjs/schematics": "^10.0.2",
    "@quasar/cli": "^2.3.0",
    "@tarojs/cli": "^3.6.17",
    "@vue/cli": "^5.0.8",
   
    "@zhinjs/cli": "^0.2.33",
    "alloy": "^2.0.2",
    "arco-cli": "^1.27.5",
     
    "create-ant-design-pro": "^0.4.1",
    "create-astro": "^4.2.1",
    "create-docusaurus": "^3.0.0-rc.1",
    "create-electron-app": "^6.4.2",
    "create-electron-vite": "^0.4.0",
    "create-father": "^4.3.5",
    "create-ice": "^1.9.1",
    "create-ink-app": "^3.0.2",
    "create-midway": "^1.2.3",
    "create-monkey": "^1.35.0",
    "create-next-app": "^14.0.0",
    "create-preact": "^0.2.2",
    "create-quasar": "^1.4.4",
    "create-remix": "^2.0.1",
    "create-solid": "^0.3.6",
    "create-storybook": "^1.0.0",
    "create-strapi-app": "^4.14.4",
    "create-svelte": "^5.1.1",
    "create-t3-app": "^7.21.0",
    "create-tauri-app": "^3.9.0",
    "create-umi": "^4.0.86",
    "create-vite": "^4.4.1",
    "create-vite-extra": "^1.1.0",
    "create-vuepress-theme-hope": "^2.0.0-beta.239",
    "dotenv-cli": "^7.3.0",
    "fastify-cli": "^5.8.0",
    "hexo-cli": "^4.3.1",
    "native-run": "^1.7.3",
    "node-gyp": "^9.4.1",
    "npkill": "^0.11.3",
    "npm-home": "^3.0.1",
    
    "prettier": "^3.0.3",
    "pug": "^3.0.2",
   
    "react-native": "^0.72.6",
    "rimraf": "^5.0.5",
    "sass-migrator": "^1.7.3",
    "serve": "^14.2.1",
    "stylus": "^0.60.0",
    
    "titanium": "^6.1.1",
    "typescript": "^5.2.2",
    "verdaccio": "^5.27.0",
    "yrm": "^1.0.6"
 }
}

```
