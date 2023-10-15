import { navbar } from 'vuepress-theme-hope'

export default navbar([
  { text: '前端教程', icon: 'mdi:language-html5', link: '/frontend/' },
  { text: 'node教程', icon: 'tabler:brand-nodejs', link: '/node-tutor/' },

  { text: 'go教程', icon: 'fa6-brands:golang', link: '/go-tutor/' },
  { text: 'java教程', icon: 'fa6-brands:java', link: '/java-tutor/' },

  {
    text: '系统教程',
    icon: 'simple-icons:linux',
    children: [
      {
        text: 'linux',
        icon: 'simple-icons:linux',
        link: '/linux-tutor/',
      },
      { text: 'windows', icon: 'gg:windows', link: '/windows-tutor/' },
      { text: 'git教程', icon: 'bi:git', link: '/git-tutor/' },
    ],
  },
  { text: 'python教程', icon: 'carbon:logo-python', link: '/python-tutor/' },

  { text: 'c#教程', icon: 'mdi:language-csharp', link: '/csharp-tutor/' },

  {
    text: '安卓',
    icon: 'ant-design:android-filled',
    children: [
      { text: '安卓基础', link: '/android-tutor/' },
      { text: '安卓tips', link: '/android-tips/' },
      { text: 'flutter', link: '/flutter-tutor/' },
      { text: 'kotlin', link: '/kotlin-tutor/' },
    ],
  },
  {
    text: 'mc教程',
    icon: 'solar:gamepad-no-charge-bold',
    link: '/mc-tutor/',
  },
  {
    text: '技巧',
    icon: 'ic:sharp-whatshot',
    link: '/cs-tips/',
  },
  {
    text: '其他',
    icon: 'material-symbols:event-note',
    children: [
      {
        text: 'java编程思想',
        icon: 'fa6-brands:java',
        link: 'https://yzqbooks.github.io/think-in-java/',
      },
      {
        text: 'git教程',
        icon: 'bi:git',
        link: 'https://yzqdev.github.io/git-tutor',
      },

      {
        text: 'node教程',
        icon: 'tabler:brand-nodejs',
        link: 'https://yzqdev.github.io/node-docs',
      },
      {
        text: 'css教程',
        icon: 'ion:logo-css3',
        link: 'https://yzqdev.github.io/html-tutor',
      },
      {
        text: 'wandoc',
        icon: 'material-symbols:chrome-reader-mode',
        link: 'https://yzqbooks.github.io/wangdoc',
      },
      {
        text: 'cg教程',
        icon: 'mdi:blender-software',
        link: 'https://yzqdev.github.io/cg-tutor',
      },
    ],
  },
])
