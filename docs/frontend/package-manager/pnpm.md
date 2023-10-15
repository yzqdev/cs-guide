# pnpm教程

:::tip
注意,建议不要配置store-dir,这样他会在每个磁盘的根目录创建.pnpm-store文件夹来存储缓存

原因:包存储应与安装的位置处于同一驱动器和文件系统上，否则，包将被复制，而不是被链接。 这是由于硬链接的工作方式带来的一个限制，因为一个文件系统上的文件无法寻址另一个文件系统中的位置
:::

```bash
pnpm config set store-dir /path/to/.pnpm-store

并且设置自动安装peerdependencies
pnpm config set auto-install-peers true
```

## 介绍

全称performant npm(高性能的npm)，见名知意，就是一个npm的替代品，至于为什么高性能，用什么样的方式解决了依赖包体积趋近于黑洞的问题,解决了什么问题呢?可以参考大佬的说明[掘金](https://juejin.cn/post/6932046455733485575),[官网](https://pnpm.io/zh/motivation)
:::tip
注意: pnpm在固态硬盘上性能最好,机械硬盘上安装时间可能需要半小时,
推荐在固态硬盘使用pnpm,在机械硬盘使用yarn

:::
## 安装

:::warning

推荐使用corepack

建议直接`npm i -g pnpm`
:::
nodejs v16.13.0之后的版本内置了实验性的工具corepack，就是nodejs内置的一个管理包管理器的一个东西,[文档](https://github.com/nodejs/corepack/blob/main/README.md)

这个corepack就是版本之后默认自带的一个工具，专门用来管理这些安装依赖的这些个工具，自带npm,yarn,pnpm,不用我们手动安装

切换到指定版本，接着按照pnpm官网的文档，先把实验性的corepack开启

```shell
corepack enable
```

通常corepack中的包管理器版本都不是最新的所以我们要升级到最新，关于最新的pnpm版本号，[![npm version](https://img.shields.io/npm/v/pnpm.svg)](https://www.npmjs.com/package/pnpm)可以去npmjs官网去看

yarn版本[![npm version](https://img.shields.io/npm/v/yarn.svg)](https://www.npmjs.com/package/yarn)

```shell

corepack prepare pnpm@x.x.x --activate
```

或者使用npm安装

```bash
npm i -g pnpm


pnpm安装包
pnpm install

```

### 安装全局包

```shell
pnpm add -g serve
```

workspace用于lerna项目,不需要在子项目做install的操作
pnpm-workspace.yaml

```bash
packages:
  # all packages in subdirs of packages/ and components/
  - 'packages/**'
  - 'components/**'
  # exclude packages that are inside test directories
  - '!**/test/**'
```

硬链接的优点：

- 兼容性好
- 盘符被更改也不会受影响
- 无需管理员的权限  

硬链接的缺点：

- 必须在同一个分区
- 仅支持本地驱动器
- 不支持为文件夹创建硬链接
:::tip
全局安装的包

```json
{
  "dependencies": {
    "@antfu/ni": "^0.17.2",
    "@nestjs/cli": "^9.0.0",
    "@neutralinojs/neu": "^9.3.1",
    "@quasar/cli": "^1.3.2",
    "@vue/cli": "^5.0.8",
    "@vue/devtools": "^6.1.4",
    "create-quasar": "^1.0.28",
    "create-vite": "^3.0.0",
    "electron": "^19.0.7",
    "esno": "^0.16.3",
    "fkill-cli": "^7.1.0",
    "gulp-cli": "^2.3.0",
    "hexo-cli": "^4.3.0",
    "hugo-installer": "^3.1.0",
    "increase-memory-limit-fixbug": "^1.0.0",
    "iroiro": "^0.2.0",
    "json-server": "^0.17.0",
    "lerna": "^5.1.6",
    "less": "^4.1.2",
    "local-web-server": "^5.2.0",
    "nativefier": "^47.2.0",
    "npkill": "^0.8.3",
    "npm-check-updates": "^14.0.1",
    "npm-home": "^2.0.0",
    "nrm": "^1.2.5",
    "pkg": "^5.7.0",
    "pm2": "^5.2.0",
    "pm2-windows-service": "^0.2.1",
    "pnpm": "^7.5.2",
    "prettier": "^2.7.1",
    "pug-cli": "^1.0.0-alpha6",
    "rimraf": "^3.0.2",
    "rollup": "^2.70.2",
    "sass": "^1.51.0",
    "stylus": "^0.57.0",
    "taze": "^0.7.6",
    "typeorm": "^0.3.6",
    "typescript": "^4.6.3",
    "vercel": "^27.0.2"
  }
}

```

:::
