# 好用的打包工具

原文：[https://transitivebullsh.it/javascript-dev-tools-in-2022](https://transitivebullsh.it/javascript-dev-tools-in-2022)

> 在2022年，每一位 **JS / TS** 开发者都应该知道的最重要的开发工具的分类，包括最相关的权衡，以及一些个人建议。

在软件工程的世界中，对所使用的工具有一个明确的了解非常重要。

但是 **JS** 工具总是在快速的变化着，2022年也不例外。

因此，我想把你在2022年应该知道的最重要的工具分解开来，它们最相关的权衡是什么，并提供一些个人建议。

我们将从最低级别的工具开始，然后从那里逐步升级到更高级别的工具。让我们开始💪。

## 开发工具

### 编译器

编译器负责将输入代码转换为某种目标输出格式。出于我们的目的，我们关注的是那些支持将现代 **JavaScript** 和**TypeScript** 转换成特定版本的 **ECMAscript** 的编译器，这些 **ECMAscript** 兼容浏览器和最新版本的 **Node.js**。

| 名称                                                                      | 描述                | 星数   | 语言 | 速度 | 成熟度   | 许可       |
| ------------------------------------------------------------------------- | ------------------- | ------ | ---- | ---- | -------- | ---------- |
| [tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html) | TS官方编译器        | 79,300 | TS   | slow | 非常成熟 | Apache 2.0 |
| [esbuild](https://esbuild.github.io/)                                     | 快速JS/TS编译器     | 31,200 | Go   | fast | 可以     | MIT        |
| [swc](https://swc.rs/)                                                    | 快速JS/TS编译器     | 21,300 | Rust | fast | 可以     | Apache 2.0 |
| [babel](https://babeljs.io/)                                              | JS编译器（TS 插件） | 40,700 | JS   | slow | 非常成熟 | MIT        |

关于这个领域最重要的一点是，它正在经历一个巨大的转变，从用高级解释语言编写的编译器 **tsc** 和 **babel**，到用更快的编译语言编写的编译器 **swc** 和 **esbuild**。

这种转变导致编译时间缩短了10-100倍，如下图所示：
![1](https://segmentfault.com/img/remote/1460000041651443)
如果你正在更新你的开发工具技术栈，或者在2022年开始一个新项目，那么你会想要考虑在底层使用这些下一代编译器之一。它们可能不像 **TypeScript** 官方编译器 **tsc** 和 **babel** 那样成熟，但构建速度快100倍的好处是不能低估的。

请注意，**swc**和**esbuild**都不进行类型检查。他们只是尽可能快速和有效地将代码转换成所需的输出格式。目前，如果你正在使用**TypeScript**，你几乎总是需要将官方的**TypeScript**编译器作为你的工具链的一部分，以保证你能最大限度地利用**TypeScript**的静态类型检查。值得一提的是，**swc**的作者 **kdy1dev** 正致力于将 [tsc移植到Go中](https://kdy1.dev/posts/2022/1/tsc-go)，以消除在许多情况下对**tsc**的需求，因为**tsc**的编译速度往往是大多数工具链中的瓶颈。

### SWC vs esbuild

**swc**和**esbuild**都是非常优秀的、非常快的开源 **JS / TS** 编译器。它们的性能相当([参考性能比较](https://datastation.multiprocess.io/blog/2021-11-13-benchmarking-esbuild-swc-typescript-babel.html))，并被一些世界上最大的公司经常用于生产环境。

在这两个编译器之间做出选择，更多地取决于构建在这些编译器之上的高级工具，而不是直接在它们之间做出选择。

使用 **swc** 值得注意的项目：

- [Vercel and Next.js](https://nextjs.org/docs/advanced-features/compiler)
- [Deno’s linter, formatter, and docs](https://github.com/denoland/deno_lint)
- [Parcel](https://parceljs.org/)

使用 **esbuild** 值得注意的项目：

- [Vite](https://vitejs.dev/)

- [Nuxt.js](https://nuxtjs.org/)

- [tsup](https://tsup.egoist.sh/)

  > 在软件工程中，诸如“技术A比技术B更好”这样的简单叙述很少有太大的价值。相反，应该根据项目情况来决定使用哪个工具。在很多情况下，你最好使用官方的TypeScript编译器或babel。

> 要成为一名更好的软件工程师，通常需要彻底理解这些类型的决策所涉及的权衡，并根据项目、团队和业务需求的特定约束来平衡这些权衡。

### 打包器(Bundlers)

![ title=](https://segmentfault.com/img/remote/1460000041651444)
打包器负责将所有的输入源文件打包成易于使用的输出格式。打包程序最常见的两个用例是为web应用打包资源和打包成库文件。

| 名称                                     | 描述              | 星数   | 优化了      | 许可 |
| ---------------------------------------- | ----------------- | ------ | ----------- | ---- |
| [Webpack](https://webpack.js.org/)       | 行业标准打包器    | 60,100 | web应用、库 | MIT  |
| [Rollup](https://rollupjs.org/guide/en/) | 针对库打包器      | 21,400 | 库          | MIT  |
| [Parcel](https://parceljs.org/)          | 零配置web构建工具 | 41,000 | web应用、库 | MIT  |

像 **webpack** 和 **rollup** 这样的打包工具是现代 **JS** 工具链的 “瑞士军刀”。 它们都具有极强的可扩展性，具有维护良好的插件，覆盖了大多数主要用例。 例如，使用上面列出的任何一个流行的编译器，通过 **webpack** 或 **rollup** 转译 **TS** 代码，都是相对简单的。

另一方面，**Parcel** 提供了一种几乎为零配置的打包方法。它关注的是简单性而不是可扩展性，并在底层使用 **esbuild** 作为编译器。

请注意，**swc** 和**esbuild**也都提供了基本的打包功能，与这些打包器相比，它们的功能还不够全，不能包括在这个列表中。

要了解这些打包器的更详细的比较，请查看 [tooling.report](https://bundlers.tooling.report/)。

### 开发库

这些工具旨在帮助库作者打包和发布现代的**NPM**包。

| 名称                                                         | 描述                              | 星数    | 编译器  | 打包器 | 许可 |
| ------------------------------------------------------------ | --------------------------------- | ------- | ------- | ------ | ---- |
| [tsup](https://tsup.egoist.sh/)                              | 由esbuild支持的快速TS库打包器     | 1,800   | esbuild | rollup | MIT  |
| [tsdx](https://tsdx.io/)                                     | 用于TS包开发的零配置CLI           | 9,500   | babel   | rollup | MIT  |
| [microbundle](https://github.com/developit/microbundle)      | 用于微小模块的零配置打包器        | 6,800   | babel   | rollup | MIT  |
| [Vite](https://vitejs.dev)                                   | 40,000                            | esbuild | rollup  | MIT    |
| [preconstruct](https://github.com/preconstruct/preconstruct) | 在 monorepos 中轻松开发和构建代码 | 720     | babel   | rollup | MIT  |
| [unbuild](https://github.com/unjs/unbuild)                   | 统一的javascript构建系统          | 440     | esbuild | rollup | MIT  |

如果你在2022年开发一个新的库，你可能会想使用这些更高级的工具来简化你的工作流程。

- 如果你有一个TS包，并且想利用 **esbuild** 提供的极快的构建速度，那么 **tsupp** 是一个很好的选择。
- 如果您有一个TS包，并且需要一些额外的功能，那么 **tsdx** 是一个很好的选择。
- 如果你有一个TS或JS包，那么**microbundle**也是一个不错的选择。
- **Vite**主要是一个构建前端web应用程序的工具，但它也是一个可靠的全方位选择，还包括对输出库的支持。

我个人倾向于对所有新的TS包使用**tsup**，主要是因为一旦你体验了100倍的快速构建，就很难再考虑切换回其他版本了。

#### 更多资讯

这些工具中的大多数目前没有为利用 [composite project references](https://www.typescriptlang.org/docs/handbook/project-references.html) 的 **TS monorepos** 提供很好的支持。 目前，我对这种情况的建议是使用 **tsc** 进行类型检查和生成 **.d.ts** 类型（使用 **emitDeclarationOnly: true**）和 **tsup** 来编译每个子包中的代码。 有关此方法的示例，请查看 [react-notion-x](https://github.com/NotionX/react-notion-x) monorepo项目（我的 OSS 项目之一）。

发布现代 **NPM** 包是一个微妙的话题，远远超出了本文的范围。 有关 ESM、commonjs、导出等的更多信息，请参阅：

- [要支持 Node.js ESM 需要什么？](https://www.the-guild.dev/blog/support-nodejs-esm)
- [发布](https://github.com/sindresorhus/meta/discussions/15)和[使用](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)点击预览 ESM 包

### Web app 开发

这些高级工具和框架旨在帮助开发人员构建现代web应用程序，而无需担心所有细节。

| 名称                                              | 描述                           | 星数   | 编译器  | 打包器  | 框架             |
| ------------------------------------------------- | ------------------------------ | ------ | ------- | ------- | ---------------- |
| [Next.js](https://nextjs.org/)                    | 用于生产的 React 框架          | 84,000 | swc     | webpack | react            |
| [Nuxt.js](https://nuxtjs.org/)                    | 直观的 Vue 框架                | 39,000 | esbuild | rollup  | vue              |
| [Parcel](https://parceljs.org/)                   | 零配置web构建工具              | 41,000 | swc     | custom  | react vue        |
| [Vite](https://vitejs.dev/)                       | 下一代前端工具                 | 40,000 | esbuild | rollup  | react vue svelte |
| [Snowpack](https://www.snowpack.dev/)             | ESM 驱动的前端构建工具         | 20,000 | esbuild | custom  | react vue svelte |
| [Create React App](https://create-react-app.dev/) | 通过命令设置现代 Web 应用程序  | 94,000 | babel   | webpack | react            |
| [SvelteKit](https://kit.svelte.dev/)              | 构建 Svelte 应用程序的最快方法 | 7,700  | esbuild | rollup  | svelte           |

使用**swc**和**esbuild**构建的项目数量大致相同。**webpack**和**rollup**的情况也是如此。

如果你打算在2022年使用**React**开发一个新的网页应用，那么我强烈推荐使用[**Next.js**](https://nextjs.org/)。它拥有最好的支持，最活跃的社区，并与世界领先的现代web应用部署平台[Vercel](https://vercel.com/login?next=%2Fdashboard)紧密集成。

如果你正在使用**Vue**开发一个新的web应用程序，那么[nuxt.js](https://nuxtjs.org/)和Vite都是很好的选择。

如果你想要更轻的东西，那就试一试 [Parcel](https://parceljs.org/)。🤗

## 总结

在过去的10年里，现代web开发已经有了显著的发展。今天的开发人员很幸运，能够拥有如此广泛的令人惊叹的、维护良好的工具可供选择。

希望这篇文章能够帮助您分析当前 **JS/TS** 开发工具领域中最重要的方面，并帮助您做出更明智的决策。
