# 手写代码系列

## 手写 new 操作符

::: tip ⬇️⬇️⬇️⬇️⬇️⬇️
::: cd

new 的过程中做了哪些事：

- 因为`new`的结果是一个新对象，创建了一个全新的对象;
- 被创建的对象\_\_proto\_\_链接到构造函数的`prototype`对象上;
- 被创建的对象绑定到函数调用的`this`;
- 如果函数没有返回其它对象，那么`new`表达式中的函数调用会自动返回这个创建的新对象。

```js
function New(f) {
  var res = Object.create(null);
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
