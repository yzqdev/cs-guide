import { defineClientAppEnhance } from "@vuepress/client";
import RegTest from "./components/RegTest.vue";
import naive from "naive-ui";
export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component("RegTest", RegTest);
  app.use(naive);
  // ...
});
