# webpack 优化之产出代码

::: t

- 体积更小
- 合理分包，不重复加载
- 速度更快，内存使用更少
  :::

## 小图片 base64 编码

```js
{
    test:/\.(png|jpg|jpeg|gif)$/,
    use:{
        loader:'url-loader',
        options:{
            // 小于5kb的图片用base64格式产出
            limit:5 * 1024,
            // 打包到img目录下
            outputPath: '/img/',
            // 设置图片的CDN地址
            publicPath:'http://cdn.xxx.com/img'

        }
    }
}
```

## bundle 加 hash

```js
output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  }
```

## 懒加载 - 异步加载 js

```js
// 模拟异步加载js

//test.js
export default {
  message: "hello"
};
// main.js
setTimeout(function() {
  import("./test.js").then(res => {
    console.log(res.default.message);
  });
}, 2000);

//项目中路由按需加载（懒加载）的配置：

const Foo = () => import("./Foo.vue");
const router = new VueRouter({
  routes: [{ path: "/foo", component: Foo }]
});
```

## 提取公共代码和第三方代码

> [官方说明](https://webpack.js.org/plugins/split-chunks-plugin/)

```js
optimization: {
  // 分割代码块
  splitChunks: {
    // all 全部chunk，一般情况下all就可以。还有另外两个可选值 async initial
    chunks: "all",
    // 缓存分组
    cacheGroups:{
        // 第三方模块
        vendor:{
            name:'vendor', // chunk名称
            priority: 1, // 权限更高，优先抽离
            test: /node_modules/,
            minSize:10,// 大小限制，根据实际需求调整
            minChunks:1 // 最少复用过多少次
        },
        // 公共模块
        common:{
            name:'common', // chunk名称
            priority: 1, // 优先级
            minSize: 10, // 大小限制，同样根据实际需求调整
            minChunks: 2 // 公共模块最少复用过几次
        }
    }
  }

}
```

## IgnorePlugin

> `webpack` 的内置插件，作用是忽略第三方包指定目录。
> 例如: `moment` (2.24.0 版本) 会将所有本地化内容和核心功能一起打包，我们就可以使用 `IgnorePlugin` 在打包时忽略本地化内容。

```js
//webpack.config.js
module.exports = {
  //...
  plugins: [
    //忽略 moment 下的 ./locale 目录
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
```

在使用的时候，如果我们需要指定语言，那么需要我们手动的去引入语言包，例如，引入中文语言包:

```js
import moment from "moment";
import "moment/locale/zh-cn"; // 手动引入
```

**`index.js` 中只引入 `moment`，打包出来的 `bundle.js` 大小为 `263KB`，如果配置了 `IgnorePlugin`，单独引入 `moment/locale/zh-cn`，构建出来的包大小为 `55KB`。**

## 使用 CDN 加速

> 打包出的静态文件的 url 前缀添加自己的 CDN 地址

```js
output:{
    filename: 'xxx',
    path: 'xxx',
    publicPath: 'http://cdd.xxx.com'

}
```

## 使用 production

> 会自动开启代码压缩

## Scope Hosting

> 过去 `webpack` 打包时的一个取舍是将 `bundle` 中各个模块单独打包成闭包。这些打包函数使你的 `JavaScript` 在浏览器中处理的更慢。相比之下，一些工具像 `Closure Compiler` 和 `RollupJS` 可以提升(`hoist`)或者预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度。

> 这个插件会在 `webpack` 中实现以上的预编译功能。引自[官网](https://www.webpackjs.com/plugins/module-concatenation-plugin/)

核心就是合并作用域，减少作用域数量（适合大型项目多 js 文件项目）

- 代码体积更小
- 创建函数作用域更少
- 代码可读性更好

例如：

```js
// a.js
export default "ziwen";

// main.js
import name from "./a.js";
console.log(str)[
  // 开启Scope Hosting打包后  减少作用域数量
  function(xxxx, xxxxx, xxxx) {
    var str = "ziwen";
    console.log(str);
  }
];
```

**仅适用于由 webpack 直接处理的 ES6 模块**

```js
const ModuleConcatenationPlugin = require('xxxx/ModuleConcatenationPlugin')

module.exports = {

    // 针对Npm中第三方模块优先采用jsnext:main中指向ES6模块化语法的文件
    resolve:{
        mainFields:['jsnext:main','browser','main']
    }

    // 开启Scope Hosting
    plugins:[
        new ModuleConcatenationPlugin()
    ]

}

```
