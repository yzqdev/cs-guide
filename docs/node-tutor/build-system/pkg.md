# 打包工具

- esbuild
- rollup
- unbuild
- tsup
- webpack
- parcel
- vite
- tsc
- father
- [bunchee](https://github.com/huozhi/bunchee)
- [pkgroll](https://github.com/privatenumber/pkgroll)
- [microbundle](https://github.com/developit/microbundle)
<https://antfu.me/posts/publish-esm-and-cjs>
- [pure esm](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)
- <https://publint.dev/>
- <https://arethetypeswrong.github.io/>
:::tip
external的意思是dependencies里面的依赖不会打包进去,而是需要自己手动安装,inlineDependencies就是把devDependencies里面你用到的依赖的源码打包进去,会导致包很大
:::
## 自动化工具

- <https://github.com/jakejs/jake>
- gulp
- grunt
## rollup

默认**不会**把dependencies里面的依赖源码全部打包,但是会出现warning,所以一般需要设置`external:['lodash']`之类的,如果实在想把dependency里面的依赖打包进你的库,需要用[@rollup/plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve)
如下
https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency

## 打包既支持esm又支持cjs的包

### tsc

**cjs**(tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "commonjs",
    "outDir": "./dist/cjs",
    "esModuleInterop": true,
    "moduleResolution": "node"
  }
}
```

esm (tsconfig-esm.json)

```json
{
  "extends": "./tsconfig.json",

  "compilerOptions": {
    "target": "es2015",
    "module": "es2015",
    "outDir": "./dist/esm",
    "moduleResolution": "node"
  }
}

```

package.json

```json
{
  "main": "./dist/cjs/index.js",
  "module": "./dist/esm/index.js",
  "scripts": {
    "build": "rm -rf dist && tsc -p tsconfig.json && tsc -p tsconfig-esm.json"
  },
}
```

### rollup

rollup.config.ts

```ts
export default [
  {
    input: "src/index.js",
    output: [
      { file: "dist/index.cjs.js", format: "cjs" },
      { file: "dist/index.esm.js", format: "es" },
    ],
  },
];

```

package.json

```json
{
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js",
  "scripts": {
    "build": "rollup -c",
  },
}

```

### webpack

```ts
const path = require("path");

module.exports = {
  mode: 'none',
  entry: {
    "index.cjs": {
      import: './src/index.js',
      library: {
        type: 'commonjs2',
      },

    },
    "index.esm": {
      import: './src/index.js',
      library: {
        type: 'module',
      },
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js",
    clean: true,
  },
  experiments: {
    outputModule: true
  }
};

```

package.json

```json
{
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js",
  "scripts": {
    "build": "webpack",
  },
  "devDependencies": {
    "webpack": "^5",
    "webpack-cli": "^4"
  }
}

```

### esbuild

package.json

```json
{
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js",
  "scripts": {
    "esbuild:cjs": "esbuild ./src/index.js --bundle --outfile=dist/index.cjs.js --format=cjs",
    "esbuild:esm": "esbuild ./src/index.js --bundle --outfile=dist/index.esm.js --format=esm",
    "build": "npm run esbuild:cjs && npm run esbuild:esm"
  },
  "devDependencies": {
    "esbuild": "^0.14.49"
  },
}
```

### tsup

tsup.config.ts

```ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/"],
  splitting: false,
  sourcemap: false,
  minify: false,
  dts: true,
  format: ["esm", "cjs"],
  clean: true,
});

```

### unbuild

build.config.ts

```ts
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/index", ],
   // entries: ["src/"],
  rollup: {
    emitCJS:true,
    inlineDependencies:false,
  },
  clean: true,
  declaration: true,

});

```
默认会把dependencies和peerdependencies放进external,所以要想像[@rollup/plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve).一样吧node_modules里面的依赖打包进去,需要把`lodash-es`放进 devDependencies,然后`inlineDependencies:true`,不过这样是不推荐的, 因为如果用户安装了lodash-es,那么就会在你的库里和用户依赖都出现lodash-es