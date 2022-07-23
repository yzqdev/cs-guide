# node命令行工具

> 注意事项
<https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c>

- `tsconfig.json`设置`"module": "CommonJS",`
- `package.json`一般不建议设置`"type":"module"`不然编译出来的js文件需要加上后缀名`import help from './help.js'`,然而ts编译出来的并没有后缀

 [https://www.jsdocs.io/](https://www.jsdocs.io/)

## cli依赖库

- [pkg](https://github.com/vercel/pkg) 将你的 Node.js 程序包装在一个可执行文件中。
- [portfinder](https://github.com/http-party/node-portfinder) 自动寻找没被占用的端口

- [json-server](https://github.com/typicode/json-server)支持restfulapi增删改查
- [execa](https://github.com/sindresorhus/execa)
- chalk
- [node-notifier](https://github.com/mikaelbr/node-notifier)
- [regedit](https://github.com/ironSource/node-regedit)
- [picocolors](https://github.com/alexeyraspopov/picocolors)
- [fs-extra](https://github.com/jprichardson/node-fs-extra)
- [fs-jetpack](https://github.com/szwacz/fs-jetpack) Better file system API for Node.js
- [fast-glob](https://github.com/mrmlnc/fast-glob)
- [rc-config-loader](https://github.com/azu/rc-config-loader) 获取配置文件
- [globby](https://github.com/sindresorhus/globby)
- [pretty-bytes](https://github.com/sindresorhus/pretty-bytes)
- [node-windows](https://github.com/coreybutler/node-windows) Windows support for Node.JS scripts (daemons, eventlog, UAC, etc).
- [lodash](https://github.com/lodash/lodash)
- [minimatch](https://github.com/isaacs/minimatch)
- [milly](https://github.com/unjs/mlly)
- [nodemailer](https://github.com/nodemailer/nodemailer)
- [ohmyfetch](https://github.com/unjs/ohmyfetch) A better fetch API. Works on node, browser and workers.
- [find-up](https://github.com/sindresorhus/find-up)
- [filesize](https://github.com/avoidwork/filesize.js)
- enquirer 类似 inquirer
- [meow](https://github.com/sindresorhus/meow)  命令行工具
- [**prompts**](https://github.com/terkelg/prompts)
- [**inquirer**](https://github.com/SBoudrias/Inquirer.js) A collection of common interactive command line user interfaces
- [cac](https://github.com/cacjs/cac) Command And Conquer is a JavaScript library for building CLI apps.
- [**yargs**](https://github.com/yargs/yargs) 一个命令行参数解析工具
- [**commander**](https://github.com/tj/commander.js)
- [**cross-env**](https://github.com/kentcdodds/cross-env)
- [**consola**](https://github.com/unjs/consola)
- [file-type](https://github.com/sindresorhus/file-type)
- [defu](https://github.com/unjs/defu) Assign default properties, recursively. Lightweight and Fast!
- [cheerio](https://github.com/cheeriojs/cheerio) nodejs爬虫
- [crawler](https://github.com/bda-research/node-crawler)
- [shelljs](https://github.com/shelljs/shelljs)  跨平台 Unix shell 命令 的 node 封装
- [blessed](https://github.com/chjj/blessed) blessed-contrib
- [tslib](https://github.com/Microsoft/tslib)
- [terminal-kit](https://github.com/cronvel/terminal-kit)
- [destr](https://github.com/unjs/destr)  A faster, secure and convenient alternative for`JSON.parse`
- [ufo](https://github.com/unjs/ufo) url工具
- [pathe](https://github.com/unjs/pathe) 路径工具类似nodejs的path
- [terser](https://github.com/terser/terser)
- [ora](https://github.com/sindresorhus/ora)  命令行加载中图标
- [open](https://github.com/sindresorhus/open)
- [ini](https://github.com/npm/ini)
- [dotenv](https://github.com/motdotla/dotenv)
- [minimist](https://github.com/substack/minimist) 命令行解析
- yaml [js-yaml](https://github.com/nodeca/js-yaml)
- [toml](https://github.com/BinaryMuse/toml-node)
- [update-notifier](https://github.com/yeoman/update-notifier)
- [pacote](https://github.com/npm/pacote) Fetches package manifests and tarballs from the npm registry.
- [cli-progress](https://github.com/npkgz/cli-progress) 命令行进度条
- [cli-table](https://github.com/Automattic/cli-table)
- [boxen](https://github.com/sindresorhus/boxen)
- [semver](https://github.com/npm/node-semver)
- [chokidar](https://github.com/paulmillr/chokidar)
- [rimraf](https://github.com/isaacs/rimraf)
- [isomorphic-git](https://github.com/isomorphic-git/isomorphic-git) git相关操作
- [svgo](https://github.com/svg/svgo)
- [string-width](https://github.com/sindresorhus/string-width)
- [terminal-link](https://github.com/sindresorhus/terminal-link)
- [npm-run-path](https://github.com/sindresorhus/npm-run-path) Get your PATH prepended with locally installed binaries
- [http-server](https://github.com/http-party/http-server)
- [prettyjson](https://github.com/rafeca/prettyjson)
- [wait-on](https://github.com/jeffbski/wait-on) wait for files, ports, sockets, and http(s) resources to become available
- [Cliffy](https://github.com/drew-y/cliffy) - A Framework For Interactive CLIs
- [ink](https://github.com/vadimdemedes/ink)
- [which](https://github.com/npm/node-which)
- [tasuku](https://github.com/privatenumber/tasuku) 一个taskrunner类似gulp
- [simple-git](https://github.com/steveukx/git-js) git客户端
- node-ssh
- [get-port](https://github.com/sindresorhus/get-port)
- [cp-file](https://github.com/sindresorhus/cp-file)
- [ws](https://github.com/websockets/ws)
- http-proxy
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)
- [resolve](https://github.com/browserify/resolve)
- [got](https://github.com/sindresorhus/got) 类似ohmyfetch,node-fetch
- [superagent](https://github.com/visionmedia/superagent) Ajax for Node.js and browsers (JS HTTP client)
- [socket.io](https://github.com/socketio/socket.io) Realtime application framework (Node.JS server)
- [tap](https://github.com/tapjs/node-tap) test framework
- [nock](https://github.com/nock/nock)

### Web frameworks

- [Fastify](https://github.com/fastify/fastify) - Fast and low overhead web framework.
- [Next.js](https://github.com/vercel/next.js) - Minimalistic framework for server-rendered universal JavaScript web apps.
- [Nuxt.js](https://github.com/nuxt/nuxt.js) - Minimalistic framework for server-rendered Vue.js apps.
- [Hapi](https://github.com/hapijs/hapi) - Framework for building applications and services.
- [Micro](https://github.com/vercel/micro) - Minimalistic microservice framework with an async approach.
- [Koa](https://github.com/koajs/koa) - Framework designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs.
- [Express](https://github.com/expressjs/express) - Web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications.
- [Feathers](https://github.com/feathersjs/feathers) - Microservice framework built in the spirit of Express.
- [LoopBack](https://github.com/loopbackio/loopback-next) - Powerful framework for creating REST APIs and easily connecting to backend data sources.
- [Meteor](https://github.com/meteor/meteor) - An ultra-simple, database-everywhere, data-on-the-wire, pure-Javascript web framework. *(You might like [awesome-meteor](https://github.com/Urigo/awesome-meteor))*
- [Restify](https://github.com/restify/node-restify) - Enables you to build correct REST web services.
- [ThinkJS](https://github.com/thinkjs/thinkjs) - Framework with ES2015+ support, WebSockets, REST API.
- [ActionHero](https://github.com/actionhero/actionhero) - Framework for making reusable & scalable APIs for TCP sockets, WebSockets, and HTTP clients.
- [seneca](https://github.com/senecajs/seneca) - Toolkit for writing microservices.
- [AdonisJs](https://github.com/adonisjs/core) - A true MVC framework for Node.js built on solid foundations of Dependency Injection and IoC container.
- [Moleculer](https://github.com/moleculerjs/moleculer) - Fast & powerful microservices framework.
- [Nest](https://github.com/nestjs/nest) - Angular-inspired framework for building efficient and scalable server-side apps.
- [TypeGraphQL](https://github.com/MichalLytek/type-graphql) - Modern framework for creating GraphQL APIs with TypeScript, using classes and decorators.
- [Tinyhttp](https://github.com/tinyhttp/tinyhttp) - Modern and fast Express-like web framework.
- [Marble.js](https://github.com/marblejs/marble) - Functional reactive framework for building server-side apps, based on TypeScript and RxJS.
- [Lad](https://github.com/ladjs/lad) - Framework made by a former Express TC and Koa member that bundles web, API, job, and proxy servers.
- [Ts.ED](https://github.com/tsedio/tsed) - Intituive TypeScript framework for building server-side apps on top of Express.js or Koa.js.

### 数据库

- Drivers
  - [PostgreSQL](https://github.com/brianc/node-postgres) - PostgreSQL client. Pure JavaScript and native libpq bindings.
  - [Redis](https://github.com/luin/ioredis) - Redis client.
  - [LevelUP](https://github.com/Level/levelup) - LevelDB.
  - [MySQL](https://github.com/mysqljs/mysql) - MySQL client.
  - [couchdb-nano](https://github.com/apache/couchdb-nano) - CouchDB client.
  - [Aerospike](https://github.com/aerospike/aerospike-client-nodejs) - Aerospike client.
  - [Couchbase](https://github.com/couchbase/couchnode) - Couchbase client.
  - [MongoDB](https://github.com/mongodb/node-mongodb-native) - MongoDB driver.
- ODM / ORM
  - [Sequelize](https://github.com/sequelize/sequelize) - Multi-dialect ORM. Supports PostgreSQL, SQLite, MySQL, and more.
  - [Bookshelf](https://github.com/bookshelf/bookshelf) - ORM for PostgreSQL, MySQL and SQLite3 in the style of Backbone.js.
  - [Mongoose](https://github.com/Automattic/mongoose) - Elegant MongoDB object modeling.
  - [Waterline](https://github.com/balderdashy/waterline) - Datastore-agnostic tool that dramatically simplifies interaction with one or more databases.
  - [OpenRecord](https://github.com/PhilWaldmann/openrecord) - ORM for PostgreSQL, MySQL, SQLite3 and RESTful datastores. Similar to ActiveRecord.
  - [pg-promise](https://github.com/vitaly-t/pg-promise) - PostgreSQL framework for native SQL using promises.
  - [slonik](https://github.com/gajus/slonik) - PostgreSQL client with strict types, detailed logging and assertions.
  - [Objection.js](https://github.com/Vincit/objection.js) - Lightweight ORM built on the SQL query builder Knex.
  - [TypeORM](https://github.com/typeorm/typeorm) - ORM for PostgreSQL, MariaDB, MySQL, SQLite, and more.
  - [MikroORM](https://github.com/mikro-orm/mikro-orm) - TypeScript ORM based on Data Mapper, Unit of Work and Identity Map patterns. Supports MongoDB, PostgreSQL, MySQL and SQLite.
  - [Prisma](https://github.com/prisma/prisma) - Modern database access (ORM alternative). Auto-generated and type-safe query builder in TypeScript. Supports PostgreSQL, MySQL & SQLite.
- Query builder
  - [Knex](https://github.com/knex/knex) - Query builder for PostgreSQL, MySQL and SQLite3, designed to be flexible, portable, and fun to use.
- Other
  - [NeDB](https://github.com/louischatriot/nedb) - Embedded persistent database written in JavaScript.
  - [Lowdb](https://github.com/typicode/lowdb) - Small JavaScript database powered by Lodash.
  - [Keyv](https://github.com/jaredwray/keyv) - Simple key-value storage with support for multiple backends.
  - [Finale](https://github.com/tommybananas/finale) - RESTful endpoint generator for your Sequelize models.
  - [database-js](https://github.com/mlaanderson/database-js) - Wrapper for multiple databases with a JDBC-like connection.
  - [Mongo Seeding](https://github.com/pkosiec/mongo-seeding) - Populate MongoDB databases with JavaScript and JSON files.
  - [@databases](https://github.com/ForbesLindesay/atdatabases) - Query PostgreSQL, MySQL and SQLite3 with plain SQL without risking SQL injection.
  - [pg-mem](https://github.com/oguimbal/pg-mem) - In-memory PostgreSQL instance for your tests.

### 其他

- config
- dotenv
- cross-env
- [env-cmd](https://github.com/toddbluhm/env-cmd)
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

## 全局安装的工具

- [taze](https://github.com/antfu/taze)  更新你的依赖
- [concurrently](https://github.com/open-cli-tools/concurrently ) Run commands concurrently. Like `npm run watch-js & npm run watch-less` but better.
- npm-check&npm-check-updates
- zx
- npm-home
- [fkill-cli](https://github.com/sindresorhus/fkill-cli)  Fabulously kill processes. Cross-platform.
- gulp
- [tiged](https://github.com/tiged/tiged) 类似gitclone
- [grunt](https://github.com/gruntjs/grunt)
- iroiro 显示一些推荐的颜色
- **pm2**
- nrm
- [npkill](https://github.com/voidcosmos/npkill) delete nodemodules
- nitropack
- serve
- local-web-server
- ipx High performance, secure and easy to use image proxy
- docute 一个文档生成器

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

## node 开发命令行

```shell
node link
```

npm link 是将当前目录包链接到全局
npm remove -g pka-name 是将全局的链接的 pkg-name 包移除
npm unlink pka-name 是将当前项目中软链接的包移除

删除全局包

```shell
 npm rm -g <name>
```

## 对于pnpm

> 要先设置 pnpm_home  

然后安装全局包

```shell
pnpm link -g 
```

卸载的话

```shell
pnpm un -g 
```
