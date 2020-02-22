# this 笔记

::: tip
`this` 是在**运行时进行绑定**的，并不是在编译时绑定。它的上下文取决于函数调用时的各种条件。`this` 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。
:::

## 调用位置

调用位置就是函数在代码中被调用的位置，不是声明的位置。最重要的是分析调用栈（为了到达当前执行位置所调用的所有函数）。调用位置就在**当前正在执行的函数的前一个调用中**。

```js
function baz() {
  // 当前调用栈是baz
  // 当前调用位置就是全局作用域
  console.log("baz");
  bar(); // <-- bar的调用位置
}
function bar() {
  // 当前调用栈是baz -> bar
  // 当前调用位置在baz中
  console.log("bar");
  foo(); // <-- foo的调用位置
}
function foo() {
  // 当前调用栈是baz -> bar -> foo
  // 当前调用位置在bar中
  console.log("foo");
}
baz(); // <-- baz的调用位置
```

**可以把调用栈想象成一个函数调用链。**

## 如何决定 this 绑定对象（绑定规则）？

有如下几条绑定规则:

- 默认绑定
- 隐式绑定
- 显式绑定
- new 绑定

### 默认绑定

**可以把这条规则看作是无法应用其它规则时的默认规则**。

```js
function foo() {
  console.log(this.a);
}
var a = 2; // 全局对象的一个同名属性
foo(); // 2
```

声明在全局作用域中的变量`（var a = 2）`就是全局对象的一个同名属性。他们本质上是同一个东西，并不是通过复制得到的。函数调用时应用了 `this` 的**默认绑定**，因此 `this` 指向全局对象。在代码中，`foo()`是直接使用不带任何修饰的函数引用进行调用的，因为只能使用**默认绑定**，无法应用其它规则。

如果使用了严格模式`(strict mode)`，则不能将全局对象用于默认绑定，因此 `this` 会绑定到 `undefined`:

```js
function foo() {
  "use strict";
  console.log(this.a);
}
var a = 2;
foo(); // Uncaught TypeError: Cannot read property 'a' of undefined
```

还有一种情况：在**严格模式下调用** `foo()`则不影响默认绑定。

```js
function foo() {
  console.log(this.a);
}
var a = 2;
(function() {
  "use strict";
  foo(); // 2
})();
```

### 隐式绑定

当函数引用有**上下文对象**时，**隐式绑定**规则则会把函数中的 `this` 绑定到这个上下文对象。对象属性引用链中只有上一层或者最后一层在调用位置中起作用。

```js
function foo() {
  console.log(this.a);
}
var obj2 = {
  a: 42,
  foo: foo
};
var obj1 = {
  a: 2,
  obj2: obj2
};
obj1.obj2.foo(); // 42
```

#### 隐式丢失

被隐式绑定的函数特定情况下会丢失绑定对象，应用默认绑定，把`this` 绑定到全局对象或者 `undefined` 上。

```js
// 虽然bar是obj.foo的一个引用，但是实际上，它引用的是foo函数本身。
// bar()是一个不带任何修饰的函数调用，应用默认绑定。
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo
};

var bar = obj.foo; // 函数别名

var a = "oops, global"; // a是全局对象的属性

bar(); // "oops, global"
```

参数传递就是一种隐式赋值，传入函数时也会被隐式赋值。回调函数丢失 `this` 绑定是非常常见的。

```js
function foo() {
  console.log(this.a);
}

function doFoo(fn) {
  // fn其实引用的是foo

  fn(); // <-- 调用位置！
}

var obj = {
  a: 2,
  foo: foo
};

var a = "oops, global"; // a是全局对象的属性

doFoo(obj.foo); // "oops, global"

// JS环境中内置的setTimeout()函数实现和下面的伪代码类似：
function setTimeout(fn, delay) {
  // 等待delay毫秒
  fn(); // <-- 调用位置！
}
```

### 显式绑定

通过 `call(..)` 或者 `apply(..)`方法。第一个参数是一个对象，在调用函数时将这个对象绑定到 `this`。因为直接指定 `this` 的绑定对象，称之为显示绑定。

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2
};

foo.call(obj); // 2  调用foo时强制把foo的this绑定到obj上
```

显示绑定无法解决丢失绑定问题。

解决方案：

- 1.硬绑定
  创建函数 `bar()`，并在它的内部手动调用 `foo.call(obj)`，强制把 `foo` 的 `this` 绑定到了 `obj`。

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2
};

var bar = function() {
  foo.call(obj);
};

bar(); // 2
setTimeout(bar, 100); // 2

// 硬绑定的bar不可能再修改它的this
bar.call(window); // 2
```

典型应用场景是创建一个包裹函数，负责接收参数并返回值。

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

var obj = {
  a: 2
};

var bar = function() {
  return foo.apply(obj, arguments);
};

var b = bar(3); // 2 3
console.log(b); // 5
```

创建一个可以重复使用的辅助函数。

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

// 简单的辅助绑定函数
function bind(fn, obj) {
  return function() {
    return fn.apply(obj, arguments);
  };
}

var obj = {
  a: 2
};

var bar = bind(foo, obj);

var b = bar(3); // 2 3
console.log(b); // 5
```

`ES5` 内置了 `Function.prototype.bind`，`bind` 会返回一个硬绑定的新函数，用法如下。

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

var obj = {
  a: 2
};

var bar = foo.bind(obj);

var b = bar(3); // 2 3
console.log(b); // 5
```

- 2.API 调用的“上下文”
  `JavaScript ES5` 许多内置函数提供了一个可选参数，被称之为“上下文”（`context`），其作用和 `bind(..)`一样，确保回调函数使用指定的 this。这些函数实际上通过 `call(..)`和 `apply(..)`实现了显式绑定。

```js
function foo(el) {
  console.log(el, this.id);
}

var obj = {
  id: "ziwen"
};

var myArray = [1, 2, 3];
// 调用foo(..)时把this绑定到obj
myArray.forEach(foo, obj);
// 1 ziwen 2 ziwen 3 ziwen
```

### new 绑定

`JavaScript` 中 `new` 的机制实际上和面向类的语言完全不同。

- 构造函数只是使用 `new` 操作符时被调用的普通函数，他们不属于某个类，也不会实例化一个类。
- 包括内置对象函数（比如 `Number(..)`，`String(..)`）在内的所有函数都可以用 `new` 来调用，这种函数调用被称为构造函数调用。
- 实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”。
  使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

1. 创建（或者说构造）一个新对象。
2. 这个新对象会被执行`[[Prototype]]`连接。
3. 这个新对象会绑定到函数调用的 `this`。
4. 如果函数没有返回其他对象，那么 `new` 表达式中的函数调用会自动返回这个新对象。
   使用 `new` 来调用 `foo(..)`时，会构造一个新对象并把它`(bar)`绑定到 `foo(..)`调用中的 `this`。

```js
function foo(a) {
  this.a = a;
}

var bar = new foo(2); // bar和foo(..)调用中的this进行绑定
console.log(bar.a); // 2
```

手写一个 new 实现

```js
function create() {
  // 创建一个空的对象
  var obj = new Object(),
    // 获得构造函数，arguments中去除第一个参数
    Con = [].shift.call(arguments);
  // 链接到原型，obj 可以访问到构造函数原型中的属性
  obj.__proto__ = Con.prototype;
  // 绑定 this 实现继承，obj 可以访问到构造函数中的属性
  var ret = Con.apply(obj, arguments);
  // 优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj;
}
```

使用这个手写的 new

```js
function Person() {...}

// 使用内置函数new
var person = new Person(...)

// 使用手写的new，即create
var person = create(Person, ...)
```

代码原理解析：

1. 用 `new Object()`的方式新建了一个对象 obj。
2. 取出第一个参数，就是我们要传入的构造函数。此外因为 `shift` 会修改原数组，所以 `arguments` 会被去除第一个参数。
3. 将 `obj` 的原型指向构造函数，这样 `obj` 就可以访问到构造函数原型中的属性。
4. 使用 `apply`，改变构造函数 `this` 的指向到新建的对象，这样 `obj` 就可以访问到构造函数中的属性。
5. 返回 `obj`。

### 优先级

- **显式绑定 > 隐式绑定**
- **new 绑定 > 隐式绑定**

#### 判断 this

我们可以根据优先级来判断函数在某个调用位置应用的是哪条规则：

1. 函数是否在 `new`中调用(`new` 绑定)？如果是的话 `this` 绑定的是指定的对象。

```js
var bar = new foo();
```

2. 函数是否通过 `call`、`apply`(显示绑定)或者硬绑定调用？如果是的话，`this` 绑定的是指定的对象。

```js
var bar = foo.call(obj);
```

3. 函数是否在某个上下文对象中调用(隐式绑定)？如果是的话，`this` 绑定的是那个上下文对象。

```js
var bar = obj.foo();
```

4. 如果都不是话，使用默认绑定。如果在严格模式下，就绑定到 `undefined`，否则绑定到全局对象。

```js
var bar = foo();
```

### 绑定例外（凡是总有例外）

#### 被忽略的 this

把 `null` 或者 `undefined` 作为 `this` 的绑定对象传入 `call`、`apply` 或者 `bind`，这些值在调用时会被忽略，实际应用的是默认规则。

### this 词法

`ES6` 中介绍了一种无法使用这些规则的特殊函数类型：**箭头函数**。
箭头函数不使用 `this` 的四种标准规则，而是根据外层（函数或者全局）作用域来决定 this。

- `foo()`内部创建的箭头函数会捕获调用时 `foo()`的 `this`。由于 `foo()`的 `this` 绑定到 `obj1`，bar(引用箭头函数)的 `this` 也会绑定到 `obj1`，箭头函数的绑定无法被修改(new 也不行)。

```js
function foo() {
  // 返回一个箭头函数
  return a => {
    // this继承自foo()
    console.log(this.a);
  };
}

var obj1 = {
  a: 2
};

var obj2 = {
  a: 3
};

var bar = foo.call(obj1);
bar.call(obj2); // 2，不是3！
```

ES6 之前和箭头函数类似的模式，采用的是词法作用域取代了传统的 `this` 机制。

```js
function foo() {
  var self = this; // lexical capture of this
  setTimeout(function() {
    console.log(self.a); // self只是继承了foo()函数的this绑定
  }, 100);
}

var obj = {
  a: 2
};

foo.call(obj); // 2
```

代码风格统一问题：如果既有 `this` 风格的代码，还会使用 `self = this` 或者箭头函数来否定 this 机制。

- 只使用词法作用域并完全抛弃错误 `this` 风格的代码。
- 完全采用 `this` 风格，在必要时使用 `bind(..)`，尽量避免使用 `self = this` 和箭头函数。
