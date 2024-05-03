# 技巧

## 使用webpack.config.mts配置文件

两种方式,一种使用ts-node的esm loader,一种是使用tsx的esm-loader


```
{  
  "name": "wp-simple",  
  "packageManager": "yarn@4.1.1",  
  "scripts": {  
    "dev": "dotenv -v NODE_OPTIONS='--loader=ts-node/esm' --  webpack --config webpack.config.mts",  
    "build": "webpack --config webpack.config.ts",  
    "build:tsx": "dotenv -v NODE_OPTIONS='--import=tsx/esm' --  webpack --config webpack.config.mts"  
  },  
  "devDependencies": {  
    "@types/node": "^20.12.7",  
    "esno": "^4.7.0",  
    "prettier": "^3.2.5",  
    "ts-node": "^10.9.2",  
    "tslib": "^2.6.2",  
    "tsx": "^4.7.3",  
    "typescript": "^5.4.5",  
    "webpack": "^5.91.0",  
    "webpack-cli": "^5.1.4"  
  }  
}
```


:::
node --import  //只导入esm

node --require // 只导入cjs用

node --loader   //弃用

:::