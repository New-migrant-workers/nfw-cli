##### 建立项目的坑：一开始，建立这个项目的时候，我没按webpack指南一步一步走的，我自己在devDependencies上添加了很多之后会用的东西，就像下面这些：

```js
{
  "name": "wp5",
  "version": "1.0.0",
  "private": true,
  "license": "MIT",
  "scripts": {
    "build": "webpack --config webpack.config.js"
  },
  "dependencies": {},
  "devDependencies": {
    "babel-loader": "^8.2.2",
    "css-loader": "^6.2.0",
    "html-webpack-plugin": "^5.3.2",
    "less-loader": "^10.0.1",
    "style-loader": "^3.2.1",
    "ts-loader": "^9.2.4",
    "typescript": "^4.3.5",
    "webpack": "^5.46.0",
    "webpack-cli": "^4.7.2",
    "webpack-dev-server": "^3.11.2"
  }
}
```

后来在引css那

>  import './style.css';

一直报这个错：

>  ERROR in ./src/style.css 1:0 Module parse failed: Unexpected token (1:0)

我看网上有人是这么解决的

> import'style-loader!css-loader!./style.css'``;

但我感觉不应该，那这样我岂不是引入都得加这些了？一点都不正常，所以我没使用，但也没找到什么解决方法，最后我重新建立了整个项目，跟着步骤走，完全没问题。。。



> 配置Eslint && Prettier
https://bbs.huaweicloud.com/blogs/detail/207615
https://zhuanlan.zhihu.com/p/68026905
https://segmentfault.com/a/1190000019661168