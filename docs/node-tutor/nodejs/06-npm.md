---
order: 6
---

# npm 包管理

npm（Node Package Manager）是 Node.js 默认的包管理工具，用于安装、管理和发布 JavaScript 包。

## 一、package.json

`package.json` 是项目的配置文件，记录项目信息和依赖。

### 1. 初始化

```bash
# 交互式创建
npm init

# 使用默认值快速创建
npm init -y
```

生成的 `package.json`：

```json
{
    "name": "my-project",
    "version": "1.0.0",
    "description": "项目描述",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
}
```

### 2. 常用字段说明

```json
{
    "name": "my-app",           // 包名（必填，小写、无空格）
    "version": "1.0.0",         // 版本号（必填，遵循 semver）
    "description": "一个示例项目",
    "main": "src/index.js",     // 入口文件
    "scripts": {                // 可执行的脚本命令
        "start": "node src/index.js",
        "dev": "node --watch src/index.js",
        "build": "node build.js"
    },
    "dependencies": {           // 生产环境依赖
        "express": "^4.18.0"
    },
    "devDependencies": {        // 开发环境依赖
        "nodemon": "^3.0.0"
    },
    "peerDependencies": {       // 对等依赖
        "react": "^18.0.0"
    },
    "engines": {                // 引擎版本要求
        "node": ">=18.0.0"
    },
    "type": "module",           // 使用 ES Modules
    "private": true             // 防止误发布
}
```

## 二、安装包

### 1. 安装命令

```bash
# 安装到 dependencies（生产环境）
npm install express
npm i express          # 简写

# 安装指定版本
npm install express@4.18.2

# 安装到 devDependencies（开发环境）
npm install --save-dev nodemon
npm install -D nodemon  # 简写

# 全局安装
npm install -g nodemon

# 根据 package.json 安装所有依赖
npm install
npm i  # 简写
```

### 2. 版本号语义（SemVer）

```text
主版本号.次版本号.补丁号
  ^1.2.3  → 兼容 1.x.x（主版本不变即可更新）
  ~1.2.3  → 兼容 1.2.x（只更新补丁号）
  1.2.3   → 锁定精确版本
  *       → 任意版本（不推荐）
  >=1.2.3 → 大于等于指定版本
```

```bash
# 查看包的版本信息
npm view express versions   # 所有可用版本
npm view express version    # 最新版本
npm outdated                # 查看过期依赖
```

## 三、node_modules 与锁文件

### node_modules 目录

`node_modules` 存放所有已安装的包，**不应提交到版本控制**。

### package-lock.json

`package-lock.json` 自动生成，锁定每个依赖的精确版本号，确保团队和部署环境安装一致的依赖。

```bash
# 应该提交 package-lock.json 到 Git
git add package-lock.json

# 忽略 node_modules
echo "node_modules/" >> .gitignore
```

## 四、npm scripts

```json
{
    "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js",
        "test": "jest",
        "build": "webpack --mode production",
        "lint": "eslint src/",
        "format": "prettier --write src/",
        "preview": "vite preview",
        "deploy": "npm run build && rsync -avz dist/ user@server:/app/"
    }
}
```

```bash
# 运行脚本
npm start          # start/test 可以省略 run
npm run dev
npm run build
npm run lint

# 生命周期钩子
# prestart → start → poststart（自动运行）
npm run lint:fix   # 自定义脚本名
```

## 五、更新与卸载

```bash
# 更新包
npm update express          # 按 semver 更新
npm install express@latest  # 更新到最新版
npm outdated                # 查看可更新的包

# 卸载包
npm uninstall express
npm un express         # 简写

# 从 devDependencies 卸载
npm uninstall -D nodemon

# 全局卸载
npm uninstall -g nodemon
```

## 六、npx —— 直接运行包

```bash
# 无需安装，直接运行
npx create-react-app my-app
npx cowsay "Hello Node.js"
npx http-server

# 运行项目本地安装的包
npx eslint src/
npx prettier --write .
```

## 七、常用 npm 命令速查

| 命令 | 作用 |
|------|------|
| `npm init -y` | 快速初始化项目 |
| `npm install` | 安装所有依赖 |
| `npm i express` | 安装包到 dependencies |
| `npm i -D nodemon` | 安装包到 devDependencies |
| `npm un express` | 卸载包 |
| `npm update` | 更新所有包 |
| `npm outdated` | 查看可更新包 |
| `npm ls --depth=0` | 查看顶层依赖 |
| `npm cache clean --force` | 清除缓存 |
| `npm audit` | 安全审计 |
| `npm audit fix` | 自动修复安全漏洞 |
| `npm run` | 列出所有可用脚本 |
| `npx cowsay hi` | 直接运行命令 |

## 八、package.json 完整示例

```json
{
    "name": "node-api-server",
    "version": "1.0.0",
    "description": "Node.js RESTful API 服务",
    "main": "src/index.js",
    "type": "module",
    "scripts": {
        "start": "node src/index.js",
        "dev": "node --watch src/index.js",
        "test": "node --experimental-vm-modules node_modules/.bin/jest",
        "lint": "eslint src/",
        "format": "prettier --write 'src/**/*.js'"
    },
    "dependencies": {
        "express": "^4.18.2",
        "cors": "^2.8.5",
        "helmet": "^7.0.0",
        "morgan": "^1.10.0"
    },
    "devDependencies": {
        "nodemon": "^3.0.0",
        "eslint": "^8.50.0",
        "prettier": "^3.0.0",
        "jest": "^29.0.0"
    },
    "engines": {
        "node": ">=18.0.0"
    },
    "private": true
}
```

## 九、使用 `.npmrc` 配置

`.npmrc` 文件可以配置 npm 的行为：

```ini
# 设置镜像源（国内加速）
registry=https://registry.npmmirror.com

# 或者使用淘宝镜像
# registry=https://registry.npm.taobao.org

# 保存精确版本号
save-exact=true

# 禁止运行 install 脚本（安全性）
ignore-scripts=false
```

也可以在命令行临时切换源：

```bash
# 查看当前源
npm config get registry

# 设置镜像源
npm config set registry https://registry.npmmirror.com

# 临时使用不同源安装
npm install express --registry=https://registry.npmjs.org

# 使用 nrm 管理源
npx nrm use taobao
npx nrm ls
```

## 十、yarn 与 pnpm 对比

```bash
# Yarn（Facebook）
npm install -g yarn
yarn init
yarn add express
yarn remove express

# pnpm（磁盘效率更高）
npm install -g pnpm
pnpm init
pnpm add express
pnpm remove express
```

## 十一、发布自己的包

```bash
# 1. 登录 npm
npm login

# 2. 准备包
#    确保 package.json 有 name、version、main 字段

# 3. 发布
npm publish

# 4. 更新版本
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0
npm publish

# 5. 取消发布（72小时内）
npm unpublish my-package@1.0.0
```

## 十二、常见问题

### 1. 权限错误（Mac/Linux）

```bash
# 不要使用 sudo npm install
# 推荐配置前缀
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
```

### 2. 依赖冲突

```bash
# 使用 --legacy-peer-deps 解决冲突
npm install --legacy-peer-deps

# 或者清除重装
rm -rf node_modules package-lock.json
npm install
```

### 3. 安全审计

```bash
# 检查安全漏洞
npm audit

# 自动修复
npm audit fix

# 查看详细报告
npm audit --json
```
