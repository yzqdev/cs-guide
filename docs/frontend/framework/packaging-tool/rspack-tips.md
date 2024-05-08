# rspack的技巧


## 使用style-loader和css-loader时,打包出奇怪的css

set expreiments.css = false, style-loader and experiments.css can't be used together
```json
{
 experiments: {
   css:false
}
}
```