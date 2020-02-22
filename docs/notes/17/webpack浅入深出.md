# webpack 深入浅出

::: tip
`webpack` 是啥?官方如是说：本质上，`webpack` 是一个现代 `JavaScript` 应用程序的静态模块打包器(`module bundler`)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(`dependency graph`)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 `bundle`。
:::

具体的安装阶段就不做阐述啦，详见官方[这里](https://www.webpackjs.com/guides/)

## 浅入须知

### 关于 loader

`webpack` 将一切文件看做模块，比如 `css` 文件,图片文件等等。可 `webpack` 原生并不支持解析这些非 `js` 文件，要支持非 `js` 类型的文件的话，则需要使用 `webpack` 的 `loader` 机制，可以把 `loader` 看做是一个具有文件转换功能的翻译员。

```javascript
```
