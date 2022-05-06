import { path } from "@vuepress/utils";

import theme  from "./themeConfig";
import  {prismjsPlugin} from '@vuepress/plugin-prismjs'
import {defineUserConfig} from "vuepress-vite";
export default defineUserConfig({
  base: "/cs-guide/",

  dest: "./dist",

  head: [
    [
      "link",
      {
        rel: "icon",

        href: `/cs-guide/images/cs-guide.webp`,
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
    ["meta", { name: "referrer", content: "no-referrer" }],
    [
      "link",
      //我的vscodeiconfont库
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_3267094_0pfgirl8r8qg.css",
      },
    ],
  ],

  locales: {
    "/": {
      lang: "zh-CN",
      title: "cs-guide",
      description: "计算机科学教程",
    },
  },
  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str.replace(/^@/, path.resolve(__dirname, "./")),
    },
  },
  theme,
  plugins: [
    prismjsPlugin({
      preloadLanguages: ["autohotkey", "go", "xml"],
    })
  ],
});
