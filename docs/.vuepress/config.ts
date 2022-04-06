import { defineHopeConfig } from "vuepress-theme-hope";
import themeConfig from "./themeConfig";
export default defineHopeConfig({
  base: "/cs-guide/",

  dest: "./dist",

  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: `/images/logo.png`,
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
    [
      "link",
      //我的iconfont库
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_3267094_j92iwdcfcxp.css",
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

  themeConfig,
  plugins: [
    [
      "@vuepress/plugin-search",
      {
        locales: {
          "/": {
            placeholder: "搜索文档",
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                searchBox: {
                  resetButtonTitle: "清除查询条件",
                  resetButtonAriaLabel: "清除查询条件",
                  cancelButtonText: "取消",
                  cancelButtonAriaLabel: "取消",
                },
                startScreen: {
                  recentSearchesTitle: "搜索历史",
                  noRecentSearchesText: "没有搜索历史",
                  saveRecentSearchButtonTitle: "保存至搜索历史",
                  removeRecentSearchButtonTitle: "从搜索历史中移除",
                  favoriteSearchesTitle: "收藏",
                  removeFavoriteSearchButtonTitle: "从收藏中移除",
                },
                errorScreen: {
                  titleText: "无法获取结果",
                  helpText: "你可能需要检查你的网络连接",
                },
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                  searchByText: "搜索提供者",
                },
                noResultsScreen: {
                  noResultsText: "无法找到相关结果",
                  suggestedQueryText: "你可以尝试查询",
                  openIssueText: "你认为该查询应该有结果？",
                  openIssueLinkText: "点击反馈",
                },
              },
            },
          },
        },
      },
    ],
  ],
});
