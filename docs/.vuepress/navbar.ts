import { navbar } from "vuepress-theme-hope";

export default navbar([
  // { text: "文章", icon: "home", link: "/article/" },

  { text: "前端教程", icon: "html", link: "/frontend/" },

  { text: "go教程", icon: "go", link: "/go-tutor/" },
  { text: "java教程", icon: "java", link: "/java-tutor/" },

  { text: "linux教程", icon: "linux", link: "/linux-tutor/" },
  { text: "python教程", icon: "python", link: "/python-tutor/" },
  { text: "c#教程", icon: "csharp", link: "/csharp-tutor/" },
  { text: "windows", icon: "windows", link: "/windows-tutor/" },
  {
    text: "mc教程",
    icon: "game",
    link: "/mc-tutor/",
  },
  {
    text: "其他",
    icon: "note",
    children: [
      {
        text: "git教程",
        icon: "git",
        link: "https://yzqdev.github.io/git-tutor",
      },
      {
        text: "安卓教程",
        icon: "android",
        link: "https://yzqdev.github.io/android-docs",
      },

      {
        text: "node教程",
        icon: "node",
        link: "https://yzqdev.github.io/node-tutor",
      },
      {
        text: "wandoc",
        icon: "read",
        link: "https://yzqbooks.github.io/wangdoc",
      },
      {
        text: "cg教程",
        icon: "blender",
        link: "https://yzqdev.github.io/cg-tutor",
      },
    ],
  },
]);
