# express配置跨域

```javascript
const allowCrossDomain = function (req, res, next) {
    const allowedOrigins = ['http://localhost:3401', 'http://localhost:3402', 'http://127.0.0.1:9000', 'http://localhost:9000'];
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};

app.use(allowCrossDomain) 
```

或者直接

```javascript
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","http://localhost:9080");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});
```

# 根据域名获取后端接口(注意这个vite不适用)

```javascript
/**
 * get api url on the basis of domain url
 * @param str
 * @returns {string}
 */
export const getApiUrl = str => {
  const devArr = ["devapi.com", "localhost"];
  const apiArr = ["api.com"];
  let localUrl = "192.168.";
  let isDev =
    devArr.includes(document.domain) || document.domain.includes(localUrl);
  let isProd = apiArr.includes(document.domain);
  // 需要后端接   线上环境的域名组

  if (str === "socket") {
    if (isDev) {
      return "wss://devapi.com/ws";
    }
    if (isProd) {
      return "wss://api.com/ws";
    }
  }
  if (isDev) {
    return "https://devapi.com";
  }
  if (isProd) {
    return "https://api.com";
  }
  return "https://api.com";
};
```

# css美化滚动条

```css
         ::-webkit-scrollbar {
            /*滚动条整体样式*/
            width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
            height: 10px;
        }
         ::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 10px;
            box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
            background   : rgba(144,147,153,.3);
        }
        ::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            background   : #ededed;
        }
```
