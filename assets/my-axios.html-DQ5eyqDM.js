import{_ as e,c as n,o as t,d as o}from"./app-CbULZrmi.js";const r={},s=o(`<h1 id="自己的axios配置" tabindex="-1"><a class="header-anchor" href="#自己的axios配置"><span>自己的axios配置</span></a></h1><h2 id="axios封装" tabindex="-1"><a class="header-anchor" href="#axios封装"><span>axios封装</span></a></h2><h2 id="根据public文件夹的config-json获取api地址" tabindex="-1"><a class="header-anchor" href="#根据public文件夹的config-json获取api地址"><span>根据public文件夹的config.json获取api地址</span></a></h2><pre><code class="language-json">// config.json
{
  &quot;url&quot;: &quot;http://localhost:2801&quot;,
  &quot;uploadUrl&quot;: &quot;http://localhost:2801&quot;
}


</code></pre><p>js写法</p><pre><code class="language-ts">// http.ts
import { useUserStore } from &quot;@/store/user&quot;;
import qs from &quot;qs&quot;;
import axios, { AxiosRequestConfig } from &quot;axios&quot;;
import { Result } from &quot;@/interface/result&quot;;

export const baseConfig = (await axios.get(&quot;/config.json&quot;)).data;
const instance = axios.create({
  baseURL: baseConfig.url  ,
  timeout: 6000
});

instance.defaults.withCredentials = true;
instance.interceptors.request.use(
  (config: AxiosRequestConfig) =&gt; {
    console.log(&quot;requestUrl==&quot;, config.url);

    // if (process.client) {
    config.headers[&quot;version&quot;] = &quot;1.0&quot;;
    config.headers[&quot;Content-Type&quot;] = &quot;application/json;charset=UTF-8&quot;;
    let userStore = useUserStore();
    if (userStore.token) {
      config.headers.token = userStore.token;
    }

    console.log(config);
    // }
    return config;
  },
  (error) =&gt; {
    return Promise.reject(error);
  }
);
// 添加响应拦截器

instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    console.log(&quot;进入response&quot;);
    let data: Result = response.data;
    return data;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
// @ts-ignore
instance.postForm = (url: string, data: any) =&gt; {
  return instance.post(url, qs.stringify(data), {
    headers: { &quot;content-type&quot;: &quot;application/x-www-form-urlencoded&quot; }
  });
};
export default instance;

</code></pre><h3 id="根据域名获取api地址" tabindex="-1"><a class="header-anchor" href="#根据域名获取api地址"><span>根据域名获取api地址</span></a></h3><pre><code class="language-javascript">import { getApiUrl } from &#39;@/plugins/utils&#39;

import axios from &#39;axios&#39;
axios.interceptors.request.use((config) =&gt; {
  console.log(&#39;requestUrl==&#39;,config.url)
  console.log(&#39;requestData==&#39;, config.data)
  return config
},(error) =&gt; {
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(&#39;responseData==&#39;,response.data)
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
axios.defaults.baseURL=getApiUrl()
export default axios

</code></pre><blockquote><p>根据ip地址获取相应的api</p></blockquote><pre><code class="language-typescript">export const getApiUrl = (str:string) =&gt; {
    const devArr = [&quot;dev.yzqdev.top&quot;, &quot;localhost&quot;];
    const apiArr = [&quot;www.yzqdev.top&quot;];
    let localUrl = &quot;192.168.&quot;;
    let isDev =
        devArr.includes(document.domain) || document.domain.includes(localUrl);
    let isProd = apiArr.includes(document.domain);
    // 需要后端接   线上环境的域名组

    if (str === &quot;socket&quot;) {
        if (isDev) {
            return &quot;wss://dev.yzqdev.top&quot;;
        }

        if (isProd) {
            return &quot;wss://www.yzqdev.top&quot;;
        }
    }

    if (isDev) {
        return &quot;https://yzqdev.top&quot;;
    }

    if (isProd) {
        return &quot;https://www.yzqdev.top&quot;;
    }
};

export const getDomainApi=(port:string,url=document.domain, ) =&gt; {
  return \`http://\${url}:\${port}\`
}
</code></pre><hr><p>下面是项目的axios</p><pre><code class="language-javascript">/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from &quot;axios&quot;;
import QS from &quot;qs&quot;;
import { Toast } from &quot;vant&quot;;
import store from &quot;../store/index&quot;;
import {getApiUrl} from &quot;@/utils/getApiUrl&quot;;
// 环境的切换
axios.defaults.baseURL=getApiUrl()
// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post[&quot;Content-Type&quot;] =
  &quot;application/x-www-form-urlencoded;charset=UTF-8&quot;;
// 请求拦截器
axios.interceptors.request.use(
  (config) =&gt; {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token;
    token &amp;&amp; (config.headers.Authorization = token);
    return config;
  },
  (error) =&gt; {
    return Promise.error(error);
  }
);
// 响应拦截器
axios.interceptors.response.use(
  (response) =&gt; {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  (error) =&gt; {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: &quot;/login&quot;,
            query: { redirect: router.currentRoute.fullPath },
          });
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Toast({
            message: &quot;登录过期，请重新登录&quot;,
            duration: 1000,
            forbidClick: true,
          });
          // 清除token
          localStorage.removeItem(&quot;token&quot;);
          store.commit(&quot;loginSuccess&quot;, null);
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() =&gt; {
            router.replace({
              path: &quot;/login&quot;,
              query: {
                redirect: router.currentRoute.fullPath,
              },
            });
          }, 1000);
          break;
        // 404请求不存在
        case 404:
          Toast({
            message: &quot;网络请求不存在&quot;,
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
  return new Promise((resolve, reject) =&gt; {
    axios
      .get(url, {
        params: params,
      })
      .then((res) =&gt; {
        resolve(res.data);
      })
      .catch((err) =&gt; {
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
  return new Promise((resolve, reject) =&gt; {
    axios
      .post(url, QS.stringify(params))
      .then((res) =&gt; {
        resolve(res.data);
      })
      .catch((err) =&gt; {
        reject(err.data);
      });
  });
}

</code></pre>`,13),a=[s];function i(u,p){return t(),n("div",null,a)}const l=e(r,[["render",i],["__file","my-axios.html.vue"]]),d=JSON.parse('{"path":"/cs-tips/frontend/snippets/my-axios.html","title":"自己的axios配置","lang":"zh-CN","frontmatter":{"description":"自己的axios配置 axios封装 根据public文件夹的config.json获取api地址 js写法 根据域名获取api地址 根据ip地址获取相应的api 下面是项目的axios","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/cs-tips/frontend/snippets/my-axios.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"自己的axios配置"}],["meta",{"property":"og:description","content":"自己的axios配置 axios封装 根据public文件夹的config.json获取api地址 js写法 根据域名获取api地址 根据ip地址获取相应的api 下面是项目的axios"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T04:34:06.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2023-05-25T04:34:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"自己的axios配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T04:34:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[{"level":2,"title":"axios封装","slug":"axios封装","link":"#axios封装","children":[]},{"level":2,"title":"根据public文件夹的config.json获取api地址","slug":"根据public文件夹的config-json获取api地址","link":"#根据public文件夹的config-json获取api地址","children":[{"level":3,"title":"根据域名获取api地址","slug":"根据域名获取api地址","link":"#根据域名获取api地址","children":[]}]}],"git":{"createdTime":1684989246000,"updatedTime":1684989246000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":2.91,"words":874},"filePathRelative":"cs-tips/frontend/snippets/my-axios.md","localizedDate":"2023年5月25日","autoDesc":true}');export{l as comp,d as data};
