import { navbar } from 'vuepress-theme-hope'

export default navbar([
  { text: '前端教程', icon: 'html', link: '/frontend/' },

  { text: 'go教程', icon: 'my-go', link: '/go-tutor/' },
  { text: 'java教程', icon: 'java', link: '/java-tutor/' },

  { text: 'linux教程', icon: 'linux', link: '/linux-tutor/' },
  { text: 'python教程', icon: 'python', link: '/python-tutor/' },
  { text: 'c#教程', icon: 'csharp', link: '/csharp-tutor/' },
  { text: 'windows', icon: 'windows', link: '/windows-tutor/' },
  { text: '安卓', icon: 'android', link: '/android-tutor/' },
  {
    text: 'mc教程',
    icon: 'game-mc',
    link: '/mc-tutor/',
  },{
    text: '技巧',
    icon: 'hot',
    link: '/cs-tips/',
  },
  {
    text: '其他',
    icon: 'note',
    children: [
      {
        text: 'java编程思想',
        icon: 'java',
        link: 'https://yzqbooks.github.io/think-in-java/',
      },
      {
        text: 'git教程',
        icon: 'git',
        link: 'https://yzqdev.github.io/git-tutor',
      },
   

      {
        text: 'node教程',
        icon: 'node',
        link: 'https://yzqdev.github.io/node-docs',
      },
      {
        text: 'css教程',
        icon: 'css',
        link: 'https://yzqdev.github.io/html-tutor',
      },
      {
        text: 'wandoc',
        icon: 'read',
        link: 'https://yzqbooks.github.io/wangdoc',
      },
      {
        text: 'cg教程',
        icon: 'blender',
        link: 'https://yzqdev.github.io/cg-tutor',
      },
    ],
  },
])
