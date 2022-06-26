# node命令行工具

> 注意事项

- `tsconfig.json`设置`"module": "CommonJS",`
- `package.json`一般不建议设置`"type":"module"`不然编译出来的js文件需要加上后缀名`import help from './help.js'`,然而ts编译出来的并没有后缀

 [https://www.jsdocs.io/](https://www.jsdocs.io/)

## cli依赖库

- meow：一个简单的命令行助手工具
- yargs：一个命令行参数解析工具
- pkg：将你的 Node.js 程序包装在一个可执行文件中。
- node-portfinder 自动寻找没被占用的端口
- cac Command And Conquer is a JavaScript library for building CLI apps.
- [json-server](https://github.com/typicode/json-server)支持restfulapi增删改查
- execa
- chalk
- picocolors
- fs-extra
- fast-glob
- globby
- lodash
- minimatch
- ohmyfetch
- find-up
- filesize
- enquirer 类似 inquirer
- **prompts**
- **inquirer**
- **yargs**
- **commander**
- **cross-env**
- **consola**
- defu Assign default properties, recursively. Lightweight and Fast!
- cheerio
- shelljs
- tslib
- terminal-kit
- destr  A faster, secure and convenient alternative for`JSON.parse`
- ufo url 工具
- pathe 路径工具类似nodejs的path
- terser
- ora  一个spinner
- open
- ini
- dotenv
- minimist
- yaml
- toml
- update-notifier
- pacote Fetches package manifests and tarballs from the npm registry.
- cli-progress
- cli-table
- boxen
- semver
- chokidar
- rimraf
- isomorphic-git git相关操作
- svgo
- string-width
- terminal-link
- npm-run-path
- http-server
- serve-static
- prettyjson
- wait-on
- ink
- which
- tasuku 一个taskrunner类似gulp
- simple-git
- node-ssh
- get-port
- cp-file
- http-proxy
- http-proxy-middleware
- resolve
- got类似ohmyfetch,node-fetch
- superagent
- socket.io

### 数据库

- lowdb
- pg
- mysql2
- mongoose

### 其他

- config
- dotenv
- cross-env
- env-cmd
- dotenv-cli
推荐使用env-cmd+dotenv
然后在`main.ts`写

> 第一种使用cross-env

```ts
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

```

在package.json写下script

```
"start":"cross-env NODE_ENV=dev esno main.ts"
```

> 第二种使用env-cmd

```
"start":"env-cmd -f .env esno main.ts"
```

> 第三种 使用dotenv-cli

```
"start":"dotenv -e .env esno main.ts"
```

## 一些好用的cli

### 打包工具

- webpack
- Vite
- pm2
- forever
- yo (yeoman)
- Parcel
- tsup
- unbuild
- nativefier
- esno
- nodemon
- ts-node
- nexe 和pkg类似
- pkg 把nodejs打包为一个单文件,不需要安装nodejs就可以执行

:::tip
首次使用会出现下载基础包时间过长的问题，如：

```txt
> Targets not specified. Assuming:
  node14-linux-x64, node14-macos-x64, node14-win-x64
> Fetching base Node.js binaries to PKG_CACHE_PATH
  fetched-v14.4.0-linux-x64    [                    ] 0%
 
```

这种情况下可以手动下载，进入页面手动下载对应的基础包：
  [地址](https://github.com/vercel/pkg-fetch/releases )
然后拷贝到全局目录PKG_CACHE_PATH 内，PKG_CACHE_PATH 可以通过设置系统变量来设置：

```shell
 
export PKG_CACHE_PATH=/usr/local/node/pkg_cache_path
```

运行完毕后把这行命令建议放到 /etc/profile文件尾部实现长久生效。
运行过 pkg命令后，PKG_CACHE_PATH 目录下有个以版本号命名的目录，将刚才下载的文件重命名为所需文件拷贝到这个目录即可。例如上面命令提示的文件名是 fetched-v16.15.0-win-x64 ，则拷贝时重命名为该名称。
再次运行pkg命令就不会下载了，打包速度很快！

:::

## 其他工具

- taze
- concurrent
- npm-check&npm-check-updates
- zx
- gulp
- tiged 类似gitclone
- grunt
- iroiro 显示一些推荐的颜色
- **pm2**
- nrm
- npkill
- nitropack
- serve
- local-web-server
- ipx High performance, secure and easy to use image proxy
- docute 一个文档生成器

## esm注意事项

> 注意chalk版本必须是4
[https://github.com/raineorshine/npm-check-updates/blob/main/package.json](https://github.com/raineorshine/npm-check-updates/blob/main/package.json)
使用esmpackage [https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

```shell
#查看依赖树
npm ls --depth=1
#查看glob这个包被谁引用了
npm explain glob

```

原因[https://github.com/chalk/chalk/releases/tag/v5.0.0](https://github.com/chalk/chalk/releases/tag/v5.0.0)

### 替代旧的语法

> 旧的

```js
var re = /([0-9])([0-9])([0-9])/;
re.test("345");
var three = RegExp.$1;
var four = RegExp.$2;
var five = RegExp.$3;
```

> 新的

```js
var re = /([0-9])([0-9])([0-9])/;
var [, three, four, five] = "345".match(re);
```

编译为esm的语法见[https://github.com/antfu/taze](https://github.com/antfu/taze)

## unbuild

```ts
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/"],//也可以不写,会打包为一个单文件
  rollup: {
    inlineDependencies: true,
  },
  clean: true,
  declaration: true,
});

```

## 关于不生成.mjs文件名的问题

见issue[https://github.com/unjs/unbuild/issues/83](https://github.com/unjs/unbuild/issues/83)  

需要在.prettierrc写下  
`"printWidth": 1000`

```json

{
  "htmlWhitespaceSensitivity": "ignore",
  "useTabs": false,
  "endOfLine": "auto",
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "embeddedLanguageFormatting": "off",
  "insertPragma": false,
  "printWidth": 1000
}

```
