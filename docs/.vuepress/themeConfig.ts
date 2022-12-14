import { hopeTheme } from 'vuepress-theme-hope'
import navbar from './navbar'
import sidebar from './sidebar'

export default hopeTheme({
  hostname: 'https://yzqdev.github.io/cs-guide',

  author: {
    name: 'yzqdev',
    url: 'http://www.yzqdev.top',
  },
  iconAssets: 'iconfont',
  iconPrefix: 'iconfont icon-',

  logo: '/ayaka.webp',

  repo: 'https://github.com/yzqdev/cs-guide',

  docsDir: 'docs',

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: `powered by <a href='https://vuepress-theme-hope.github.io/v2/'>vuepress-theme-hope</a>`,

  displayFooter: true,

  pageInfo: ['Author', 'Original', 'Date', 'Category', 'Tag', 'ReadingTime'],

  // blog: {
  //   description: "一个前端开发者",
  //   intro: "/intro.html",
  //   medias: {
  //     Baidu: "https://example.com",
  //     Bitbucket: "https://example.com",
  //     Dingding: "https://example.com",
  //     Discord: "https://example.com",
  //     Dribbble: "https://example.com",
  //     Email: "https://example.com",
  //     Evernote: "https://example.com",
  //     Facebook: "https://example.com",
  //     Flipboard: "https://example.com",
  //     Gitee: "https://example.com",
  //     GitHub: "https://example.com",
  //     Gitlab: "https://example.com",
  //     Gmail: "https://example.com",
  //     Instagram: "https://example.com",
  //     Lines: "https://example.com",
  //     Linkedin: "https://example.com",
  //     Pinterest: "https://example.com",
  //     Pocket: "https://example.com",
  //     QQ: "https://example.com",
  //     Qzone: "https://example.com",
  //     Reddit: "https://example.com",
  //     Rss: "https://example.com",
  //     Steam: "https://example.com",
  //     Twitter: "https://example.com",
  //     Wechat: "https://example.com",
  //     Weibo: "https://example.com",
  //     Whatsapp: "https://example.com",
  //     Youtube: "https://example.com",
  //     Zhihu: "https://example.com",
  //   },
  // },

  // encrypt: {
  //   global:true,
  //  admin:'123456'
  // },

  plugins: {
    blog: false,
    pwa: {
      update: 'hint',
      favicon: '/favicon.ico',
      showInstall: true,
      themeColor: '#46bd87',
      appendBase: true,
      apple: {
        icon: '/assets/icon/apple-icon-152.png',
        statusBarColor: 'black',
      },
      msTile: {
        image: '/assets/icon/ms-icon-144.png',
        color: '#ffffff',
      },
      manifest: {
        icons: [
          {
            src: '/assets/icon/chrome-mask-512.png',
            sizes: '512x512',
            purpose: 'maskable',
            type: 'image/png',
          },
          {
            src: '/assets/icon/chrome-mask-192.png',
            sizes: '192x192',
            purpose: 'maskable',
            type: 'image/png',
          },
          {
            src: '/assets/icon/chrome-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/assets/icon/chrome-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    },
    // 你也可以使用 Waline
    comment: {
      provider: 'Giscus',
      repo: 'yzqdev/blog-issues',
      repoId: 'MDEwOlJlcG9zaXRvcnkzODI2NTY1MTY=',
      category: 'General',
      categoryId: 'DIC_kwDOFs7gBM4COKgn',
    },
    components: ['BiliBili', 'PDF', 'StackBlitz'],
    mdEnhance: {
      tabs: true,
      codetabs: true,
      lazyLoad: true,
      demo: true,
      sub: true,
      sup: true,
      footnote: true,
      mark: true,
      vuePlayground: true,

      //start playground 配置
      playground: {
        presets: [
          'ts',
          'vue',
          {
            name: 'playground#language',
            component: 'PlaygroundComponent',
            propsGetter: (playgroundData): Record<string, string> => ({
              // playground props
            }),
          },
        ],
        config: {
          ts: {
            // ...
          },
          vue: {
            // ...
          },
        },
      },
      //end playground 配置
    },
  },
})
