import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  // { text: "文章", icon: "home", link: "/article/" },
  { text: "cg教程", icon: "software", link: "/cg-tutor/" },
  { text: "前端教程", icon: "html", link: "/frontend/" },
  { text: "游戏教程", icon: "game", link: "/game-tutor/" },

  { text: "java教程", icon: "java", link: "/java-tutor/" },
  { text: "linux教程", icon: "linux", link: "/linux-tutor/" },
  { text: "python教程", icon: "python", link: "/python-tutor/" },
  { text: "c#教程", icon: "csharp", link: "/csharp-tutor/" },
  { text: "windows教程", icon: "windows", link: "/windows-tutor/" },
  {
    text: "其他",
    icon: "note",
    children: [
      {
        text: "安卓教程",
        icon: "android",
        link: "https://yzqdev.github.io/android-docs",
      },
      {
        text: "linux基础教程",
        icon: "computer",
        link: "https://yzqbooks.github.io/Linux-Tutorial/",
      },
      {
        text: "git教程",
        icon: "git",
        link: "https://yzqdev.github.io/git-tutor",
      },

      {
        text: "node教程",
        icon: "nodeJS",
        link: "https://yzqdev.github.io/node-tutor",
      },
    ],
  },
]);
