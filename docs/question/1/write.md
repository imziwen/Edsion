# 手写代码系列

## 手写 new 操作符

::: tip ⬇️⬇️⬇️⬇️⬇️⬇️
::: cd

new 的过程中做了哪些事：

- 因为new的结果是一个新对象，创建了一个全新的对象;
- 被创建的对象\_\_proto\_\_链接到构造函数的`prototype`对象上;
- 使 this 指向新创建的对象;
- 除非构造函数返回

```js
function New(f) {
  var res = {};
  if (f.prototype !== null) {
    res.__proto__ = f.prototype;
  }
  var ret = f.apply(res, Array.prototype.slice.call(arguments, 1));
  if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
    return ret;
  }
  return res;
}
var obj = New();
```

:::
