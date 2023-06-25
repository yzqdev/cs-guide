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
<https://antfu.me/posts/publish-esm-and-cjs>
- [pure esm](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)
- <https://publint.dev/>
- <https://arethetypeswrong.github.io/>
:::tip
external的意思是dependencies里面的依赖不会打包进去,而是需要自己手动安装,inlineDependencies就是把devDependencies里面你用到的依赖的源码打包进去,会导致包很大
:::

## rollup

默认会把dependencies里面的依赖源码全部打包,所以一般需要设置`external:['lodash']`之类的
