# webpack 优化之构建速度

::: t
如何纵享丝滑
:::

## 可用于生产环境：

### 优化 bable-loader

```js
{
    test: /\.js$/,
    use: ['babel-loader?cacheDirectory'], // 开启缓存
    include: path.resolve(__dirname,'src'), // 明确范围
    // 排除范围，两者选一即可
    // exclude: path.resolve(__dirname,'node_modules')
}

```

### IgnorePlugin

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

### noParse

> 如果一些第三方模块没有`AMD/CommonJS`规范版本，可以使用 `noParse` 来标识这个模块，这样 `Webpack` 会引入这些模块，但是不进行转化和解析，从而提升 `Webpack` 的构建性能 ，例如：`jquery` 、`lodash`。

```js
//webpack.config.js
module.exports = {
  //...
  module: {
    noParse: /jquery|lodash/
  }
};
```

只引入 `jquery` 和 `loadsh`，然后配置 `noParse`，能大大减少构建时间。

### happyPack

> `HappyPack` 能让 `Webpack` 同一时刻处理多个任务，发挥多核 `CPU` 电脑的威力，以提升构建速度。(`JS` 单线程，开启多进程打包)

- 首先需要安装 happyPack:

```js
npm install happypack -D
```

- 修改配置文件：

```js
const Happypack = require("happypack");
module.exports = {
  // 大项目效果比较明显
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: "Happypack/loader?id=js",
        include: [path.resolve(__dirname, "src")]
      },
      {
        test: /\.css$/,
        use: "Happypack/loader?id=css",
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules", "bootstrap", "dist")
        ]
      }
    ]
  },
  plugins: [
    new Happypack({
      id: "js", // 和rule中的id=js对应
      // 将之前 rule 中的 loader 在此配置
      use: ["babel-loader"] //必须是数组
    }),
    new Happypack({
      id: "css", // 和rule中的id=css对应
      use: ["style-loader", "css-loader", "postcss-loader"]
    })
  ]
};
```

注意：当 `postcss-loader` 配置在 `Happypack` 中，必须要在项目中创建 `postcss.config.js`。否则，会抛出错误: `Error: No PostCSS Config found`

```js
//postcss.config.js
module.exports = {
  plugins: [require("autoprefixer")()]
};
```

项目如果不是很大，建议不用配置`happyPack`，因为进程的分配和管理也需要时间，并不能有效提升构建速度，甚至会变慢。

## 不可用于生产环境：

### 自动刷新

> 借助自动化的手段，在监听到本地源码文件发生变化时，自动重新构建出可运行的代码后再控制浏览器刷新。`Webpack` 将这些功能都内置了，并且提供了多种方案供我们选择。

```js
devServer: {
  watchOptions: {
    // 不监听的文件或文件夹，支持正则匹配
    ignored: /node_modules/,
    // 监听到变化后等300ms再去执行动作
    aggregateTimeout: 300,
    // 默认每秒询问1000次
    poll: 1000
  }
}
```

### 热更新

> ​ `DevServer` 还支持一种叫做模块热替换`（ Hot Module Replacement ）`的技术可在不刷新整个网页的情况下做到超灵敏实时预览。原理是在一个源码发生变化时，只需重新编译发生变化的模块，再用新输出的模块替换掉浏览器中对应的老模块 。模块热替换技术在很大程度上提升了开发效率和体验 。

```js
devServer: {
  hot: true,
},
plugins: [
  new webpack.HotModuleReplacementPlugin(),
// 显示被替换模块的名称
  new webpack.NamedModulesPlugin(), // HMR shows correct file names
]
```

### DllPlugin（内置） 动态链接库

> 前端框架如 `Vue` `React` 体积大，构建慢
>
> 较稳定，不经常升级版本
>
> 同一个版本只构建一次即可，无需每次重新构建
>
> `DllPlugin` 打包出`dll`文件
>
> `DllReferencePlugin` 使用`dll`文件

- 安装相关插件：

```js
npm i add-asset-html-webpack-plugin clean-webpack-plugin -D
```

- 编写配置文件 webpack.dll.conf.js

```js
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
// "clean-webpack-plugin": "^3.0.0"
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// dll文件存放的目录
const dllPath = "public/vendor";

module.exports = {
  entry: {
    // 需要提取的库文件
    vendor: ["vue", "vue-router", "vuex", "axios", "element-ui"]
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: "[name].dll.js",
    // vendor.dll.js中暴露出的全局变量名
    // 保持与 webpack.DllPlugin 中名称一致
    library: "[name]_[hash]"
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin(["*.*"], {
      root: path.join(__dirname, dllPath)
    }),
    // "clean-webpack-plugin": "^3.0.0"
    // new CleanWebpackPlugin(),
    // 设置环境变量
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: "production"
      }
    }),
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, "[name]-manifest.json"),
      // 保持与 output.library 中名称一致
      name: "[name]_[hash]",
      context: process.cwd()
    })
  ]
};
```

- 生成 dll 文件

```js
//在 package.json 中加入如下命令
"scripts": {
    ...
    "dll": "webpack -p --progress --config ./webpack.dll.conf.js"
},
```

控制台运行：

```js
npm run dll
```

- 忽略已编译文件

为了节约编译的时间，这时间我们需要告诉 `webpack` 公共库文件已经编译好了，减少 `webpack` 对公共库的编译时间。在项目根目录下找到 `vue.config.js` ( 没有则新建 )，配置如下:

```js
const webpack = require('webpack')

module.exports = {
    ...
    configureWebpack: {
        plugins: [
          new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require('./public/vendor/vendor-manifest.json')
          })
        ]
    }
}
```

- `index.html` 中加载生成的 `dll` 文件

经过上面的配置，公共库提取出来了，编译速度快了，但如果不引用生成的 `dll`文件，网页是不能正常工作的。

打开 `vue.config.js` 在 `configureWebpack.plugins` 节点下，配置 `add-asset-html-webpack-plugin`

```js
const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
    ...
    configureWebpack: {
        plugins: [
          new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require('./public/vendor/vendor-manifest.json')
          }),
          // 将 dll 注入到 生成的 html 模板中
          new AddAssetHtmlPlugin({
            // dll文件位置
            filepath: path.resolve(__dirname, './public/vendor/*.js'),
            // dll 引用路径
            publicPath: './vendor',
            // dll最终输出的目录
            outputPath: './vendor'
          })
        ]
    }
}
```

**至此，打包速度纵享丝滑**
