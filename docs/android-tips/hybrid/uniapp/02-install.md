---
order: 2
---

# uni-app 安装

## 方式一：HBuilderX（推荐）

1. 下载 [HBuilderX](https://www.dcloud.io/hbuilderx.html)
2. 文件 → 新建 → 项目 → 选择 uni-app 模板
3. 选择 Vue2 或 Vue3 版本

## 方式二：CLI 创建

```bash
# 全局安装 Vue CLI
npm install -g @vue/cli

# 创建 uni-app 项目
vue create -p dcloudio/uni-preset-vue my-project

# 或使用 npx
npx @dcloudio/uvm@latest create my-project

# 进入目录
cd my-project

# 安装依赖
npm install

# 运行到浏览器
npm run dev:h5
```

## 方式三：从模板创建

```bash
# 使用官方模板
git clone https://github.com/dcloudio/uni-app-quickstart.git
cd uni-app-quickstart
npm install
```

## 环境要求

| 工具 | 版本要求 |
|------|---------|
| Node.js | 16+ |
| npm | 7+ |
| HBuilderX | 最新版 |
| Java | 8+ (Android 打包需要) |
| Android Studio | 最新版 (Android 打包需要) |

## App 真机运行

1. 手机连接电脑，开启 USB 调试
2. HBuilderX 中点击运行 → 运行到手机
3. 或使用 CLI：`npm run dev:app`

## 常见问题

- 确保 HBuilderX 版本与编译器版本一致
- 如遇白屏，检查 manifest.json 中的应用配置
- 真机运行需安装对应手机驱动