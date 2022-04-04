import { defineClientAppEnhance } from "@vuepress/client";
import RegTest from "./components/RegTest.vue";
import {
  // create naive ui

  // component
  NButton,
  NInput,
} from "naive-ui";
export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component("RegTest", RegTest);
  app.component("NInput", NInput);
  // ...
});
