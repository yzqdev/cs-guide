import { defineClientAppEnhance } from "@vuepress/client";
import RegTest from "./components/RegTest.vue";
import SvgList from "./components/SvgList.vue";
import CreateSvg from "./components/CreateSvg.vue";
import SvgClock from "./components/SvgClock.vue";
import CanvasVSSvg from "./components/CanvasVSSvg.vue";
import CanvasSample from "./components/CanvasSample.vue";
import Gobang from "./components/Gobang.vue";
import IconDisplay from "./components/IconDisplay";
import Econ from "./components/Econ.vue";
import CodeSample from "./components/CodeSample.vue";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import hope from "vuepress-theme-hope/package.json";
import vuePkg from "vue/package.json";
import ElementPkg from "element-plus/package.json";
import vp from "vuepress/package.json";
function showBadge(name, version, nameStyle, versionStyle) {
  console.log(
    "%c ".concat(name, " %c ").concat(version, " "),
    "padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: ".concat(
      nameStyle,
      ";"
    ),
    "padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: ".concat(
      versionStyle,
      ";"
    )
  );
}
showBadge("vue", vuePkg.version, "#606060", "RGB(20,117,178)");
showBadge("vuepress", vp.version, "#606060", "RGB(20,117,178)");
showBadge("vuepress-theme-hope", hope.version, "#606060", "RGB(20,117,178)");
showBadge("element-plus", ElementPkg.version, "#606060", "RGB(20,117,178)");

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.use(ElementPlus);
  app.component("RegTest", RegTest);
  app.component("SvgList", SvgList);
  app.component("CreateSvg", CreateSvg);
  app.component("SvgClock", SvgClock);
  app.component("CanvasVSSvg", CanvasVSSvg);
  app.component("CanvasSample", CanvasSample);
  app.component("Gobang", Gobang);
  app.component("IconDisplay", IconDisplay);
  app.component("Econ", Econ);
  app.component("CodeSample", CodeSample);
});
