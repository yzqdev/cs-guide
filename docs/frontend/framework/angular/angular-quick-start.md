# Angular 快速开始

## 环境搭建

### 安装 Angular CLI

```bash
npm install -g @angular/cli
# 或使用 yarn
yarn global add @angular/cli
```

### 创建项目

```bash
ng new my-app
# 创建时选择：
# - 是否添加 Angular routing
# - 样式格式（CSS/SCSS/Sass/Less）
```

### 启动开发服务器

```bash
cd my-app
ng serve
# 或指定端口
ng serve --port 4200 --open
```

## 项目结构

```
my-app/
├── src/
│   ├── app/                # 应用主代码
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   └── app.module.ts
│   ├── assets/             # 静态资源
│   ├── environments/       # 环境配置
│   ├── index.html
│   ├── main.ts             # 入口文件
│   └── styles.css
├── angular.json            # Angular 配置
├── tsconfig.json
├── package.json
└── ...
```

## 常用命令

```bash
ng serve                    # 启动开发服务器
ng serve --port 4201 --open # 指定端口
ng build                    # 构建生产版本
ng build --prod
ng generate component foo   # 生成组件
ng generate service foo     # 生成服务
ng generate module foo      # 生成模块
ng test                     # 运行测试
ng e2e                      # 端到端测试
```

## 模块 (NgModule)

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],      // 组件、指令、管道
  imports: [BrowserModule, FormsModule, HttpClientModule], // 引入模块
  providers: [],                      // 服务
  bootstrap: [AppComponent],          // 启动组件
})
export class AppModule {}
```

## 参考

- [Angular CLI 文档](https://angular.io/cli)
- [Angular 官方文档](https://angular.io/docs)