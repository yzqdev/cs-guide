# 一些小技巧

## 网站

- [官网](https://deno.land/)

## 命令行

```shell
deno init #创建项目
deno cache --reload my_app.ts #下载依赖
deno upgrade #更新deno
deno fmt #格式化
deno test # https://deno.land/manual@v1.35.2/basics/testing
deno install -n awesome_cli https://example.com/awesome/cli.ts
deno uninstall file_server
```

## deno.jsonc

```json
{
  "lock": false,
  "tasks": {
    "init:stripe": "deno run --allow-read --allow-env --allow-net tools/init_stripe.ts",
    "db:dump": "deno run --allow-read --allow-env --unstable tools/dump_kv.ts",
    "db:seed": "deno run --allow-read --allow-env --allow-net --unstable tools/seed_submissions.ts",
    "db:reset": "deno run --allow-read --allow-env --unstable tools/reset_kv.ts",
    "start": "deno run --unstable -A --watch=static/,routes/ dev.ts",
    "test": "KV_PATH=:memory: deno test -A --unstable --parallel --coverage=./cov",
    "check:license": "deno run --allow-read --allow-write tools/check_license.ts",
    "ok": "deno fmt --check && deno lint && deno task check:license --check && deno check main.ts && deno task test",
    "cov": "deno coverage ./cov/ --lcov --exclude='test.ts' > cov.lcov",
    "update": "deno run -A -r https://fresh.deno.dev/update ."
  },
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  },
  "imports": {
    "@/": "./",
    "$fresh/": "https://deno.land/x/fresh@1.3.0/",
    "$gfm": "https://deno.land/x/gfm@0.2.4/mod.ts",
    "preact": "https://esm.sh/preact@10.15.1",
    "preact/": "https://esm.sh/preact@10.15.1/",
    "preact-render-to-string": "https://esm.sh/*preact-render-to-string@6.2.0",
    "@preact/signals": "https://esm.sh/*@preact/signals@1.1.3",
    "@preact/signals-core": "https://esm.sh/*@preact/signals-core@1.2.3",
    "twind-preset-tailwind/": "https://esm.sh/@twind/preset-tailwind@1.1.4/",
    "twind-preset-ext": "https://esm.sh/@twind/preset-ext@1.0.7/",
    "std/": "https://deno.land/std@0.195.0/",
    "stripe": "./stripe.ts",
    "feed": "https://esm.sh/feed@4.2.2",
    "kv_oauth": "https://deno.land/x/deno_kv_oauth@v0.2.5/mod.ts",
    "@twind/core": "https://esm.sh/@twind/core@1.1.3",
    "fresh_charts/": "https://deno.land/x/fresh_charts@0.3.1/"
  },
  "exclude": [
    "cov/"
  ],
  "lint": {
    "rules": {
      "tags": [
        "fresh",
        "recommended"
      ]
    }
  }
}

```

## deno内部npm镜像

<https://github.com/denoland/deno/issues/16105>

配置环境变量`NPM_CONFIG_REGISTRY`即可

## deno 使用npm包

```ts
// @deno-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";
```

## 添加types

```ts
在主文件添加
 
/// <reference types="./foo.d.ts" />
或者在需要的文件添加
// @deno-types="npm:@types/express@4.17.17"
```
