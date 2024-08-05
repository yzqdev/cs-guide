import{_ as t,c as n,o as r,a as e}from"./app-CbULZrmi.js";const a={},o=e("h1",{id:"fetchapi配置",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#fetchapi配置"},[e("span",null,"fetchapi配置")])],-1),s=e("p",null,[e("a",{href:"https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html",target:"_blank",rel:"noopener noreferrer"},"https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html")],-1),c=e("pre",null,[e("code",{class:"language-javascript"},`import qs from "qs";
import { getApiUrl } from "@/utils/getApiUrl";
// import { Message } from "element-ui";
//
// const errorMessage = msg => {
//   Message({
//     showClose: true,
//     message: msg,
//     type: "error",
//     center: true
//   });
// };
// 环境的切换

let baseURL = getApiUrl();
let HttpMethodMap = {
  get: "GET",
  post: "POST",
  put: "PUT",
  patch: "PATCH",
  delete: "DELETE",
};
class FetchApi {
  constructor() {}
  static get(url) {
    return new Promise((resolve, reject) => {
      url = baseURL + url;
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
  static post(url, data) {
    return new Promise((resolve, reject) => {
      url = baseURL + url;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
  static put(url, data) {
    return new Promise((resolve, reject) => {
      url = baseURL + url;
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
  static delete(url, data) {
    return new Promise((resolve, reject) => {
      url = baseURL + url;
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => resolve("删除成功"))
        .catch((err) => reject(err));
    });
  }

  /**
   * 默认的fetch配置
   * @param url api地址
   * @param RequestInit requestinit对象
   * @returns {Promise<unknown>}
   */
  static default(url, RequestInit) {
    return new Promise((resolve, reject) => {
      url = baseURL + url;
      fetch(url, RequestInit)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}
export default FetchApi;

`)],-1),i=[o,s,c];function l(p,h){return r(),n("div",null,i)}const u=t(a,[["render",l],["__file","my-fetch.html.vue"]]),m=JSON.parse('{"path":"/cs-tips/frontend/snippets/my-fetch.html","title":"fetchapi配置","lang":"zh-CN","frontmatter":{"description":"fetchapi配置 https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/snippets/my-fetch.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"fetchapi配置"}],["meta",{"property":"og:description","content":"fetchapi配置 https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"fetchapi配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.83,"words":248},"filePathRelative":"cs-tips/frontend/snippets/my-fetch.md","localizedDate":"2023年5月25日","autoDesc":true}');export{u as comp,m as data};
