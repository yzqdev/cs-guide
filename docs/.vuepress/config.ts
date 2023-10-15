import { autoCatalogPlugin } from 'vuepress-plugin-auto-catalog'
import { path } from '@vuepress/utils'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import theme from './themeConfig'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { defineUserConfig } from 'vuepress-vite'
export default defineUserConfig({
  base: '/cs-guide/',
  // base: "/",
  dest: './dist',

  head: [
    [
      'link',
      {
        rel: 'icon',

        href: `/cs-guide/images/cs-guide.webp`,
      },
    ],
  
    ['meta', { name: 'referrer', content: 'no-referrer' }],
 
  ],

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'cs-guide',
      description: '计算机科学教程',
    },
  },
  markdown: {
    headers: {
      level: [2,3,4, 5],
    },

    importCode: {
      handleImportPath: (str) => str.replace(/^@/, path.resolve(__dirname, './')),
    },
  },
  theme,
  plugins: [
    prismjsPlugin({
      preloadLanguages: ['autohotkey', 'go', 'xml'],
    }),
    autoCatalogPlugin(),
    docsearchPlugin({
      // ...
      appId: '34G1OD781X',
      apiKey: '0f5b0bfed83ee7c842f9b2e366c5a30a',
      indexName: 'yzq',
      locales: {
        '/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档',
            },
            modal: {
              searchBox: {
                resetButtonTitle: '清除查询条件',
                resetButtonAriaLabel: '清除查询条件',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消',
              },
              startScreen: {
                recentSearchesTitle: '搜索历史',
                noRecentSearchesText: '没有搜索历史',
                saveRecentSearchButtonTitle: '保存至搜索历史',
                removeRecentSearchButtonTitle: '从搜索历史中移除',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '从收藏中移除',
              },
              errorScreen: {
                titleText: '无法获取结果',
                helpText: '你可能需要检查你的网络连接',
              },
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
                searchByText: '搜索提供者',
              },
              noResultsScreen: {
                noResultsText: '无法找到相关结果',
                suggestedQueryText: '你可以尝试查询',
                reportMissingResultsText: '你认为该查询应该有结果？',
                reportMissingResultsLinkText: '点击反馈',
              },
            },
          },
        },
      },
    }),
  ],
  shouldPrefetch: false,
})
