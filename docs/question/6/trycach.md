# 错误监控类

## 前端错误的分类

::: t

- 即时运行错误：代码错误
- 资源加载错误

:::

## 错误的捕获方式

::: t

- 即时运行的捕获方式
  - `try...catch`
  - `window.onerror`
- 资源加载错误

  - `object.onerror`

    ```js
    //Object.onerror定义指定对象资源加载错误时的回调函数

    var imgObj = document.getElementById("img");

    imgObj.onerror = function(e) {
      console.log("obj.onerror 捕获网络请求错误", e); // 捕获错误
      console.log("tagname", e.srcElement.tagName);
      console.log("src", e.srcElement.src);
    };
    ```

- `window.performance.getEntries()`

  > 浏览器获取网页时，会对网页中每一个对象（脚本文件、样式表、图片文件等等）发出一个 HTTP 请求。而通过 window.performance.getEntries 方法，则可以以数组形式，返回这些请求的时间统计信息，每个数组成员均是一个 PerformanceResourceTiming 对象:

  ```js
  (function() {
    // 看看浏览器支不支持
    if (!window.performance && !window.performance.getEntries) {
      return false;
    }

    var result = [];
    // 获取当前页面所有请求对应的PerformanceResourceTiming对象进行分析
    window.performance.getEntries().forEach(item => {
      result.push({
        url: item.name,
        entryType: item.entryType,
        type: item.initiatorType,
        "duration(ms)": item.duration
      });
    });

    // 控制台输出统计结果
    console.table(result);
  })();
  ```

- `Error`事件捕获

  ```js
  // 必须放在文档载入之前
  <head>
  <script>

  //addEventListener 捕获网络请求错误
  window.addEventListener("error",
      e => {
          e.stopImmediatePropagation();
          const srcElement = e.srcElement;
      if (srcElement === window) {
          // 全局错误
          console.log("全局错误");
          console.log("message", e.message);
      } else {
      // 元素错误，比如引用资源报错
          console.log("元素错误");
          console.log("tagname", srcElement.tagName);
          console.log("src", srcElement.src);
      }
          console.log("onerror 捕获网络请求错误", e); // 捕获错误
      },true //网络错误，在捕获阶段获取，第三个参数为 true
  );

  </script>
  </head>
  <script src"//xxx.com/xxx.js"></script>
  ```

:::

## 上报错误的基本原理

```js
<script>(new Image()).src = 'http://ufojs.com/abc?error=ohno';</script>
```
