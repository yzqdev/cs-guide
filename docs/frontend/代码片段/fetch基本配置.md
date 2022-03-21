# fetchapi配置

[https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html](https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)

```javascript
import qs from "qs";
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

```
