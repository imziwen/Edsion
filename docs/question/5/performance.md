# 前端性能优化测试工具

::: t

性能优化，万岁万岁

:::

## PageSpeed Insights

> `PageSpeed Insights` 能够针对移动设备和桌面设备生成网页的实际性能报告，并能够提供关于如何改进相应网页的建议。。是 `Google` 的，需要科学上网，这里是[地址](https://developers.google.com/speed/pagespeed/insights/)

![google-speed](/img/pfmc/goosped.png)

#### 拿我自己博客演示一波

![google-speed](/img/pfmc/gospd1.png)

#### 会给出相对不错的优化建议，点开就是详情，具体到哪个资源文件

## lighthouse

> 这位大佬直接集成在我们的 chrome 开发工具中的，位于`Audits`下。

![google-speed](/img/pfmc/lighthouse.png)

#### 点击 Generate report

![google-speed](/img/pfmc/lighthose1.png)

### lighthouse(Node Cli)

> `lighthouse` 依赖 `node 8` 或者更高的 `node` 版本

#### - 首先全局安装 lighthouse:

```js
npm install -g lighthouse
```

- 然后终端输入命令，我依然用的我自己博客地址：

```js
lighthouse https://ufojs.com
```

- 稍等片刻，会在我们本地生成一个 html 文件，打开即是报告页(与 `Audits` 里的报告一致)
  ![google-speed](/img/pfmc/lncli.png)

**接下来按照分析报告开始优化**
