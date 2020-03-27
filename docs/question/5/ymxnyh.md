# 页面性能

> 关于提升页面性能的方法

- 资源压缩合并，减少 HTTP 请求
- 非核心代码异步加载 ===> 异步加载方式 ===> 异步加载的区别

::: t

- 异步加载的方式

  - 动态脚本加载
  - `defer`
  - `async`

- 异步加载的区别

  - `defer` 是在`HTML`解析完后(`DOMContentLoaded`)才执行，如果是多个，按照加载的顺序依次执行
  - `async` 是在请求代码加载完后立即执行(可能在`DOMContentLoaded`之前运行)，如果是多个，执行顺序和加载顺序无关（适合那些没有任何依赖的 js 代码）

:::

- 利用浏览器缓存 ===> [缓存的分类](https://ufojs.com/question/4/browsercache.html) ===> 缓存的原理
- 利用 CDN
- 预解析 DNS

::: t

```html
<meta http-equive="x-dns-prefetch-control" content="on" />
<link rel="dns-prefetch" href="xxxxxx.com" />
```

:::
