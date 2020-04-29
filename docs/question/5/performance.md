# 前端性能优化测试工具

::: t

性能优化，万岁万岁

:::

## PageSpeed Insights

> `PageSpeed Insights` 能够针对移动设备和桌面设备生成网页的实际性能报告，并能够提供关于如何改进相应网页的建议。。是 `Google` 的，需要科学上网，这里是[地址](https://developers.google.com/speed/pagespeed/insights/)


<img src="/img/pfmc/goosped.png" alt="google-speed" title="google-speed" class="zoom-custom-imgs">


#### 拿我自己博客演示一波
<img src="/img/pfmc/gospd1.png" alt="google-speed" title="google-speed" class="zoom-custom-imgs">


#### 会给出相对不错的优化建议，点开就是详情，具体到哪个资源文件

## lighthouse

> 这位大佬直接集成在我们的 `chrome` 开发工具中的，位于`Audits`下。<br>
>我们需要在 `Chrome` 的隐身模式下工作，这样可以确保我们安装的扩展、浏览器缓存、`Cookie` 等数据不会影响到检测结果

<img src="/img/pfmc/lighthouse.png" alt="google-speed" title="google-speed" class="zoom-custom-imgs">


#### 点击 Generate report
<img src="/img/pfmc/lighthose1.png" alt="google-speed" title="google-speed" class="zoom-custom-imgs">


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
<img src="/img/pfmc/lncli.png" alt="google-speed" title="google-speed" class="zoom-custom-imgs">


**接下来按照分析报告开始优化**
