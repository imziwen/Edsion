# vue 核心之双向绑定

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

## 思路分析

::: t
其实就是数据劫持。接下来我们通过其原理实现一个简易版的 `mvvm` 双向绑定代码。
主要包含两大重点：**数据(`data`)驱动视图(`view`)**，**视图(`view`)更新数据(`data`)**
:::

![双向绑定原理](/img/question/vue/sxbdyl.jpg)

`view` 更新 `data` 可以通过事件监听（比如监听 `input` 事件）
`data` 更新 `view` 呢？重点是如何知道数据变了。其实不难发现上边的例子中可以看到 `Object.defineProperty()`**给属性设置一个 `set` 函数**，当数据改变了就会触发这个函数，所以我们只要将一些更新 `view` 的方法添加到 `set` 函数里就可以更新 `view` 了。

![图片](/img/question/vue/qv2.jpg)

#### 实现双向绑定

- 设置一个 `Observer`，用来劫持并监听所有 `data` 对象属性，如果有变化就通知订阅者。
- 设置一个 `Watcher`，可以收到属性的变化通知并执行响应的函数，来更新视图。
- 设置一个 `Dep`，用来收集订阅者，然后在 `Observer` 和 `Watcher` 之间进行统一管理。
- 设置一个 `Compile`，用来扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。

## 1. 设置一个 Observer

::: t
用来劫持并监听所有 `data` 对象属性。可以通过递归方法遍历所有属性，并用 `Object.defineProperty()`处理。
另外需要一个 `Dep` 订阅器负责收集订阅者，然后在属性变化时执行对应订阅者的更新函数。
:::

```js
// 循环遍历数据对象的每个属性
function observe(data) {
  if (!data || typeof data !== "object") {
    return;
  }
  Object.keys(data).forEach(function(key) {
    defineReactive(data, key, data[key]);
  });
  return data;
}
// 劫持对象的get和set
function defineReactive(data, key, val) {
  observe(data);
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log(`${key}属性被读取了...`);
      return val;
    },
    set: function(newVal) {
      console.log(`${key}属性被修改了...`);
      val = newVal;
    }
  });

```

## 2. 实现一个 Dep 订阅器（发布-订阅模式）

::: t
我们需要创建一个依赖收集容器，也就是消息订阅器 Dep，用来容纳所有的`订阅者`。然后当数据变化的时候后执行对应订阅者的更新函数。
:::

订阅器 Dep:

```js
function Dep() {
  this.subs = []; //一个数组列表,收集订阅者
}
Dep.prototype = {
  addSub: function(sub) {
    // 往订阅器数组中添加订阅者
    this.subs.push(sub);
  },
  notify: function() {
    // 通知订阅者们执行更新函数
    this.subs.forEach(function(sub) {
      sub.update();
    });
  }
};
Dep.target = null;
```

此时我们需要把订阅器植入到 defineReactive 中

```js
function defineReactive(data, key, val) {
  var dep = new Dep(); // 植入订阅器
  Object.defineProperty(data, key, {
    enumerbal: true,
    configurable: true,
    get: function() {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return val;
    },
    set: function() {
      if (newVal === val) {
        return;
      }
      val = newVal;
      dep.notify();
    }
  });
}
```

`Dep.target` 是一个全局唯一的 `watcher`，同一时间只能有一个全局的 `watcher` 被计算。

## 3. 实现 Watcher 订阅者

::: t
`Watcher` 订阅者在初始化的时候需要将自己添加进订阅器 `Dep` 中，只要在此时获取对应的属性值，触发对应的 `get` 函数添加订阅者 `Watcher` 操作即可。
:::

```js
function Watcher(vm, exp, cb) {
  this.vm = vm; // Vue的实例对象
  this.exp = exp; // node 节点的 v-model 等指令的属性值 或者插值符号中的属性。如 v-model="name"，exp 就是name;
  this.cb = cb; // Watcher 绑定的更新函数;
  this.value = this.get(); // 把自己添加到Dep订阅器
}

Watcher.prototype = {
  get: function() {
    Dep.target = this; // 将自己赋值为全局的订阅者
    var value = this.vm.data[this.exp]; // 执行Observer监听器里的get函数
    Dep.target = null; // 释放订阅者
    return value;
  }
};
```

- **当我们实例化一个 watcher 的时候，首先会执行 `this.get()`方法**
- **然后执行`Dep.target = this`将自己赋值为当前的`watcher`**,
- **然后执行`var value = this.vm.data[this.exp]`,就是为了触发数据对象的 `getter`。每个对象值的 `getter` 都持有一个 `dep`，在触发 `getter` 的时候会调用 `dep.depend()` 方法，也就会执行 `this.addSub(Dep.target)`，即把当前的 `watcher` 订阅到这个数据持有的 `dep` 的 `watchers` 中，这个目的是为后续数据变化时候能通知到哪些 `watchers` 做准备。**
- **已经完成了一个依赖收集的过程。完成依赖收集后，还需要把 `Dep.target` 恢复成上一个状态，即：`Dep.target = null;`**
- **而 `update()` 函数是用来当数据发生变化时调用 Watcher 自身的更新函数进行更新的操作。先通过 `var value = this.vm.data[this.exp]`; 获取到最新的数据,然后将其与之前 `get()` 获得的旧数据进行比较，如果不一样，则调用更新函数 `cb` 进行更新。**

## 4.[模板编译](https://ufojs.com/question/2/%E6%A8%A1%E6%9D%BF%E7%BC%96%E8%AF%91.html)
