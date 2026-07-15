# 前端构建工具概览

## 编译器

编译器负责将现代 JS/TS 代码转换为目标输出格式。

| 名称 | 语言 | 速度 | 特点 |
|------|:----:|:----:|------|
| [TypeScript (tsc)](https://www.typescriptlang.org/) | TS | 慢 | 官方编译器，类型检查 + 编译 |
| [esbuild](https://esbuild.github.io/) | Go | 极快 | 轻量级，常用于 Vite 底层 |
| [swc](https://swc.rs/) | Rust | 极快 | 兼容 Babel 插件，Next.js 使用 |
| [Babel](https://babeljs.io/) | JS | 慢 | 生态最丰富，插件最多 |

**趋势**：从 `tsc`/`babel` 向 `swc`/`esbuild` 迁移，编译速度提升 10-100 倍。

## 打包器

| 名称 | 优化方向 | 特点 |
|------|:--------:|------|
| [Webpack](https://webpack.js.org/) | Web 应用、库 | 生态最丰富，配置灵活 |
| [Rollup](https://rollupjs.org/) | 库 | Tree-shaking 优秀，Vite 底层 |
| [Parcel](https://parceljs.org/) | Web 应用 | 零配置，内置热更新 |
| [Rspack](https://rspack.dev/) | Web 应用 | Rust 编写，兼容 Webpack 配置 |
| [Vite](https://vitejs.dev/) | Web 应用 | 基于 ESM，开发极速 |

## 库打包工具

| 名称 | 编译器 | 打包器 | 特点 |
|------|:------:|:------:|------|
| [tsup](https://tsup.egoist.sh/) | esbuild | Rollup | 极快的 TS 库打包 |
| [tsdx](https://tsdx.io/) | Babel | Rollup | 零配置 TS 包开发 |
| [microbundle](https://github.com/developit/microbundle) | Babel | Rollup | 零配置微模块打包 |
| [unbuild](https://github.com/unjs/unbuild) | esbuild | Rollup | 统一的 JS 构建系统 |

## Web 应用框架

| 名称 | 编译器 | 打包器 | 框架 |
|------|:------:|:------:|:----:|
| [Next.js](https://nextjs.org/) | swc | Webpack | React |
| [Nuxt](https://nuxtjs.org/) | esbuild | Rollup | Vue |
| [SvelteKit](https://kit.svelte.dev/) | esbuild | Rollup | Svelte |
| [Vite](https://vitejs.dev/) | esbuild | Rollup | 框架无关 |

## 选择建议

- **新 React 项目** → [Next.js](https://nextjs.org/)
- **新 Vue 项目** → [Vite](https://vitejs.dev/) + Vue 或 [Nuxt](https://nuxtjs.org/)
- **新 Svelte 项目** → [SvelteKit](https://kit.svelte.dev/)
- **TS 库** → [tsup](https://tsup.egoist.sh/)
- **需要兼容 Webpack 配置** → [Rspack](https://rspack.dev/)
- **零配置构建** → [Vite](https://vitejs.dev/) 或 [Parcel](https://parceljs.org/)

## 参考

- [bundlers.tooling.report](https://bundlers.tooling.report/) - 打包器对比
- [Awesome Vite](https://github.com/vitejs/awesome-vite)