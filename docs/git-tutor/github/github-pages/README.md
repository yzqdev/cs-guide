# GitHub Pages 使用指南

GitHub Pages 是 GitHub 提供的静态网站托管服务，可以直接从仓库部署网站。

## 快速开始

### 创建 Pages

1. 在仓库中创建 `gh-pages` 分支，或将代码放在 `main` 分支
2. 进入仓库 → Settings → Pages
3. 选择部署分支和目录
4. 保存后等待部署完成

### 两种类型

| 类型 | 说明 |
|------|------|
| 用户/组织站点 | 仓库名必须是 `用户名.github.io` |
| 项目站点 | 部署在 `用户名.github.io/仓库名` |

## 常用配置

### 使用 Jekyll

Jekyll 是 GitHub Pages 默认支持的静态网站生成器：

```bash
# 创建 _config.yml
title: My Site
description: A awesome site

# 创建 index.md
---
layout: home
---
Welcome to my site!
```

### 禁用 Jekyll

在仓库根目录创建 `.nojekyll` 文件：

```bash
touch .nojekyll
```

## 自定义域名

1. 在仓库根目录创建 `CNAME` 文件
2. 添加你的域名，例如：`example.com`
3. 在域名服务商配置 DNS 指向 GitHub Pages IP

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| 资源 404 | 添加 `.nojekyll` 文件 |
| 部署失败 | 检查分支名和目录路径 |
| 样式丢失 | 检查 CSS 路径是否正确 |
| 自定义域名不生效 | 等待 DNS 生效（最多 24 小时） |

## 推荐工具

| 工具 | 说明 |
|------|------|
| [GitHub Actions](../github-actions/README.md) | 自动化部署 |
| [VitePress](https://vitepress.vuejs.org/) | Vue 驱动的静态站点生成器 |
| [Docusaurus](https://docusaurus.io/) | Facebook 出品的文档站点工具 |
