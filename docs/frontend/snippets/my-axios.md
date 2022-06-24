# 自己的axios配置

## axios封装

## 根据public文件夹的config.json获取api地址

```json
// config.json
{
  "url": "http://localhost:2801",
  "uploadUrl": "http://localhost:2801"
}


```

js写法

```ts
// http.ts
import { useUserStore } from "@/store/user";
import qs from "qs";
import axios, { AxiosRequestConfig } from "axios";
import { Result } from "@/interface/result";

export const baseConfig = (await axios.get("/config.json")).data;
const instance = axios.create({
  baseURL: baseConfig.url  ,
  timeout: 6000
});

instance.defaults.withCredentials = true;
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log("requestUrl==", config.url);

    // if (process.client) {
    config.headers["version"] = "1.0";
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    let userStore = useUserStore();
    if (userStore.token) {
      config.headers.token = userStore.token;
    }

    console.log(config);
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 添加响应拦截器

instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    console.log("进入response");
    let data: Result = response.data;
    return data;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
// @ts-ignore
instance.postForm = (url: string, data: any) => {
  return instance.post(url, qs.stringify(data), {
    headers: { "content-type": "application/x-www-form-urlencoded" }
  });
};
export default instance;

```

### 根据域名获取api地址

```javascript
import { getApiUrl } from '@/plugins/utils'

import axios from 'axios'
axios.interceptors.request.use((config) => {
  console.log('requestUrl==',config.url)
  console.log('requestData==', config.data)
  return config
},(error) => {
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log('responseData==',response.data)
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
axios.defaults.baseURL=getApiUrl()
export default axios

```

> 根据ip地址获取相应的api

```typescript
export const getApiUrl = (str:string) => {
    const devArr = ["dev.yzqdev.top", "localhost"];
    const apiArr = ["www.yzqdev.top"];
    let localUrl = "192.168.";
    let isDev =
        devArr.includes(document.domain) || document.domain.includes(localUrl);
    let isProd = apiArr.includes(document.domain);
    // 需要后端接   线上环境的域名组

    if (str === "socket") {
        if (isDev) {
            return "wss://dev.yzqdev.top";
        }

        if (isProd) {
            return "wss://www.yzqdev.top";
        }
    }

    if (isDev) {
        return "https://yzqdev.top";
    }

    if (isProd) {
        return "https://www.yzqdev.top";
    }
};

export const getDomainApi=(port:string,url=document.domain, ) => {
  return `http://${url}:${port}`
}
```

-------
下面是项目的axios

```javascript
/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from "axios";
import QS from "qs";
import { Toast } from "vant";
import store from "../store/index";
import {getApiUrl} from "@/utils/getApiUrl";
// 环境的切换
axios.defaults.baseURL=getApiUrl()
// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);
// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath },
          });
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Toast({
            message: "登录过期，请重新登录",
            duration: 1000,
            forbidClick: true,
          });
          // 清除token
          localStorage.removeItem("token");
          store.commit("loginSuccess", null);
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath,
              },
            });
          }, 1000);
          break;
        // 404请求不存在
        case 404:
          Toast({
            message: "网络请求不存在",
            duration: 1500,
            forbidClick: true,
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          Toast({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true,
          });
      }
      return Promise.reject(error.response);
    }
  }
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

```
