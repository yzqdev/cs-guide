# 自己的axios配置

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

## 根据ip地址获取相应的api

```javascript
export const getApiUrl = (str) => {
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

```
