import { navbar } from 'vuepress-theme-hope'

export default navbar([
  { text: '前端教程', icon: 'vscode-icons:file-type-html', link: '/frontend/' },
  { text: 'node教程', icon: 'vscode-icons:file-type-node', link: '/node-tutor/' },

  { text: 'go教程', icon: 'vscode-icons:file-type-go', link: '/go-tutor/' },
  { text: 'java教程', icon: 'vscode-icons:file-type-java', link: '/java-tutor/' },

  {
    text: '系统教程',
    icon: 'logos:linux-tux',
    children: [
      {
        text: 'linux',
        icon: 'logos:linux-tux',
        link: '/linux-tutor/',
      },
      { text: 'windows', icon: 'logos:microsoft-windows-icon', link: '/windows-tutor/' },
      { text: 'git教程', icon: 'vscode-icons:file-type-git', link: '/git-tutor/' },
    ],
  },
  { text: 'python教程', icon: 'vscode-icons:file-type-python', link: '/python-tutor/' },

  { text: 'c#教程', icon: 'vscode-icons:file-type-csharp', link: '/csharp-tutor/' },

  {
    text: '安卓',
    icon: 'devicon:android',
    children: [
      { text: '安卓基础', icon: 'ph:android-logo-bold', link: '/android-tutor/' },
      { text: '安卓tips', icon: 'mdi:robot-excited-outline', link: '/android-tips/' },
      { text: 'flutter', icon: 'vscode-icons:file-type-flutter', link: '/flutter-tutor/' },
      { text: 'kotlin', icon: 'logos:kotlin-icon', link: '/kotlin-tutor/' },
    ],
  },
 
  {
    text: '技巧',
    icon: 'emojione:fire',
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
