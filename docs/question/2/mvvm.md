# vue 小记

## vue 双向绑定

:::tip vue 双向绑定 1
:::cd

双向绑定是通过**数据劫持**`Object.defineproperty()`结合**发布者-订阅者模式**的方式来实现的。

注：此处讨论的是 `vue2.x` 版本，`vue3.x` 版本以从 `Object.defineproperty()`升级为 `Proxy()`

我们先看一段伪代码

```js
var vm = new Vue({
  data() {
    return {
      people: {
        name: "ziwen"
      }
    };
  },
  created() {
    console.log(this.people);
  }
});
```

我们可以看一下通过控制台输出一个定义在 vue 初始化数据上的对象长啥样。

![图片](/img/question/vue/qv1.png)
属性 `name` 对应着 `get` 和 `set` 方法，哪来的呢？`Object.defineproperty()`赋予的。

`Object.defineproperty()`到底是何方神圣？详细用法请看[**这里**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

#### 思路分析

其实就是数据劫持。接下来我们通过其原理实现一个简易版的 `mvvm` 双向绑定代码。
主要包含两大重点：**数据(`data`)驱动视图(`view`)**，**视图(`view`)更新数据(`data`)**

![双向绑定原理](/img/question/vue/sxbdyl.jpg)

`view` 更新 `data` 可以通过事件监听（比如监听 `input` 事件）
`data` 更新 `view` 呢？重点是如何知道数据变了。其实不难发现上边的例子中可以看到 `Object.defineProperty()`**给属性设置一个 `set` 函数**，当数据改变了就会触发这个函数，所以我们只要将一些更新 `view` 的方法添加到 `set` 函数里就可以更新 `view` 了。

![图片](/img/question/vue/qv2.jpg)

#### 实现双向绑定

- 设置一个 `Observer`，用来劫持并监听所有 `data` 对象属性，如果有变化就通知订阅者。
- 设置一个 `Warcher`，可以收到属性的变化通知并执行响应的函数，来更新视图。
- 设置一个 `Dep`，用来收集订阅者，然后在 `Observer` 和 `Watcher` 之间进行统一管理。
- 设置一个 `Compile`，用来扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。

#### 1. 设置一个 Observer

用来劫持并监听所有 `data` 对象属性。可以通过递归方法遍历所有属性，并用 `Object.defineProperty()`处理。
另外需要一个 `Dep` 订阅器负责收集订阅者，然后在属性变化时执行对应订阅者的更新函数。

```js
```

:::
