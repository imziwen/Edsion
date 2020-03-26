# webpack优化之产出代码

::: t
- 体积更小
- 合理分包，不重复加载
- 速度更快，内存使用更少
:::

## 小图片base64编码

## bundle加hash

## 懒加载

## 提取公共代码

## IgnorePlugin

## 使用CDN加速

## 使用production

> 会自动开启代码压缩



## Scope Hosting

> 过去 `webpack` 打包时的一个取舍是将 `bundle` 中各个模块单独打包成闭包。这些打包函数使你的 `JavaScript` 在浏览器中处理的更慢。相比之下，一些工具像 `Closure Compiler` 和 `RollupJS` 可以提升(`hoist`)或者预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度。

> 这个插件会在 `webpack` 中实现以上的预编译功能。引自[官网](https://www.webpackjs.com/plugins/module-concatenation-plugin/)

核心就是合并作用域，减少作用域数量（适合大型项目多js文件项目）
- 代码体积更小
- 创建函数作用域更少
- 代码可读性更好 


例如：

```js
// a.js
export default 'ziwen'

// main.js
import name from './a.js'
console.log(str)


// 开启Scope Hosting打包后  减少作用域数量
[(function(xxxx,xxxxx,xxxx){
    var str = 'ziwen';
    console.log(str)
})]
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