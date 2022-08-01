# 工作区使用

## yarn工作区

Yarn Workspaces（工作区）是Yarn提供的`monorepo`的依赖管理机制，从Yarn 1.0开始默认支持，用于在代码仓库的根目录下管理多个package的依赖。

## **Monorepo**

假如你是一个npm工具的维护者，管理着多个功能相近的包，或者这些包之间存在依赖关系。如果将这些包拆分在不同仓库里，那么面临要跨多个包进行更改时，工作会非常繁琐和复杂。

为了简化流程，很多大型项目采用了menorepo的做法，即把所有的包放在一个仓库中管理。Babel、React、Vue、Jest等都使用了menorepo的管理方式。

Menorepo的优点是可以在一个仓库里维护多个package，可统一构建，跨package调试、依赖管理、版本发布都十分方便，搭配工具还能统一生成CHANGELOG；

缺点是代码仓库体积会变大，只开发其中一个package也需要安装整个项目的依赖。

来看一下**[Babel](https://github.com/babel/babel/tree/master)**的仓库目录（简化）：

```text
babel/
|--package.json
|--yarn.lock
|--packages/
|  |--babel-cli/
|  |  |--package.json
|  |--babel-core/
|  |  |--package.json
|  |--babel-parser/
|  |  |--package.json
```

## **Why Yarn Workspace?**

- 开发多个互相依赖的package时，workspace会自动对package的引用设置软链接（symlink），比yarn link更加方便，且链接仅局限在当前workspace中，不会对整个系统造成影响
- 所有package的依赖会安装在最根目录的node_modules下，节省磁盘空间，且给了yarn更大的依赖优化空间
- 所有package使用同一个yarn.lock，更少造成冲突且易于审查

## **如何使用Workspace**

根目录的package.json设置：

```text
{
  "name": "mono-demo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
}
```

`private`：

根目录一般是项目的脚手架，无需发布，`"private": true`会确保根目录不被发布出去。

`workspaces`:

声明workspace中package的路径。值是一个字符串数组，支持Glob通配符。

其中`"packages/*"`是社区的常见写法，也可以枚举所有package： `"workspaces": ["package-a", "package-b"]`。

## **命令和示例**

> PS：以下命令基于yarn@1.x

假设项目中有foo和bar两个package：

```text
mono-demo/
|--package.json
|--packages/
|  |--foo/
|  |  |--package.json
|  |--bar/
|  |  |--package.json
```

### **`yarn workspace <workspace_name> <command>`**

在指定的package中运行指定的命令。

```text
# 在foo中添加react，react-dom作为devDependencies
yarn workspace foo add react react-dom --dev

# 移除bar中的lodash依赖
yarn workspace bar remove lodash

# 运行bar中package.json的 scripts.test 命令
yarn workspace bar run test
```

### **`yarn workspaces run <command>`**

在所有package中运行指定的命令，若某个package中没有对应的命令则会报错。

```text
# 运行所有package（foo、bar）中package.json的 scripts.build 命令
yarn workspaces run build
```

### **`yarn workspaces info [--json]`**

查看项目中的workspace依赖树。

例如我的bar依赖了foo，如下：

```text
// bar/package.json
{
  "name": "bar",
  "version": "1.0.0",
  "dependencies": {
    "foo": "^1.0.0"
  }
}
```

在项目中的依赖结构是这样的（假设foo/package.json的版本匹配bar的依赖版本，否则会另外安装一个匹配的foo）：

```text
/package.json
/yarn.lock

/node_modules
/node_modules/foo -> /packages/foo

/packages/foo/package.json
/packages/bar/package.json
```

那么运行`yarn workspaces info`会得到如下输出：

```text
yarn workspaces v1.22.4
{
  "bar": {
    "location": "packages/bar",
    "workspaceDependencies": [
      "foo"
    ],
    "mismatchedWorkspaceDependencies": []
  },
  "foo": {
    "location": "packages/foo",
    "workspaceDependencies": [],
    "mismatchedWorkspaceDependencies": []
  }
}
```

### `yarn <add|remove> <package> -W`

- -W: --ignore-workspace-root-check ，允许依赖被安装在workspace的根目录

管理根目录的依赖。

```text
# 安装eslint作为根目录的devDependencies
yarn add eslint -D -W
```

## Yarn Workspace与Lerna

[Lerna](https://github.com/lerna/lerna#readme)是社区主流的monorepo管理工具之一，集成了依赖管理、版本发布管理等功能。

使用Learn管理的项目的目录结构和yarn workspace类似。

Lerna的依赖管理是也基于`yarn/npm`，但是安装依赖的方式和yarn workspace有些差异：

Yarn workspace只会在根目录安装一个node_modules，这有利于提升依赖的安装效率和不同package间的版本复用。而Lerna默认会进到每一个package中运行`yarn/npm install`，并在每个package中创建一个node_modules。

目前社区中最主流的方案，也是yarn官方推荐的方案，是集成yarn workspace和lerna。使用yarn workspace来管理依赖，使用lerna来管理npm包的版本发布。
:::tip
本项目就是使用yarn workspace+lerna管理的
:::

```json
// package.json
{
  "name": "root",
  "private": true,
  "workspaces": [
    "android-docs",
    "cs-guide" 
  ],
  "devDependencies": {
    "lerna": "latest",
    "cpx2": "latest"
  },
  "scripts": {
    "build": "lerna run docs:build --parallel",
    "dev": "lerna run docs:dev --parallel",
    "cs-guide": "yarn workspace cs-guide docs:dev",
    "android": "yarn workspace android-docs docs:dev" 
  
  }
}

```

lerna.json

```json
{
  "npmClient": "yarn",
  "useWorkspaces": true,
  "packages": [
    "android-docs",
    "cs-guide" 
  ],
  "version": "0.0.0",
  "command": {
    "run": {
      "npmClient": "yarn"
    }
  }
}

```

## pnpm工作区

新建一个pnpm-workspace.yaml

```yaml
packages:
  - 'android-docs'
  - "cs-guide"
  - 'packages/*'
```

然后在package.json里面添加

```
"cs-guide" :"pnpm -C cs-guide dev"
```
