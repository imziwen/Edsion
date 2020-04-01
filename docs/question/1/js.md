# JS 基础小记

[挑战一轮大厂后的面试总结 (含六个方向) - javascript 篇(万字长文)](https://juejin.im/post/5e523e726fb9a07c9a195a95)

[「硬核 JS」一次搞懂 JS 运行机制](https://juejin.im/post/5e22b391f265da3e204d8c14#heading-21)

[看完这几道 JavaScript 面试题，让你与考官对答如流（上）](https://juejin.im/post/5e166cc5f265da5d57543102)

[看完这几道 JavaScript 面试题，让你与考官对答如流（中）](https://juejin.im/post/5e1bb37a5188254dbc25de92#heading-18)

[看完这几道 JavaScript 面试题，让你与考官对答如流（下）](https://juejin.im/post/5e1faa3d51882520a167df0e)s

## 0. 原型链类

::: cd

- 创建对象的几种方法
  ```js
  // 第一种方式：字面量创建
  var n1 = { name: "ziwen" };
  var n2 = new Object({ name: "ziwen" }); // {name: 'ziwen'}
  // 第二种方式：通过构造函数
  var Z = function(name) {
    this.name = name;
  };
  var n3 = new Z("ziwen"); // {name: 'ziwen'}
  // 第三种方式：Object.create
  var W = { name: "ziwen" };
  var n4 = Object.create(W); // {}
  n4.name; // 'ziwen'
  ```
- 原型、构造函数、实例、原型链

  ![原型链](/img/question/js/yuanxing.png)

通过`[[__proto__]]`这个属性组成的链，就叫做原型链。原型链的顶端是 null，往下是 Object 对象，只要是对象或函数类型都会有`[[__proto__]]`这个属性，大家都是 js-family 的一员。

**[理解 constructor、prototype、**proto**和原型链](https://juejin.im/post/5cc99fdfe51d453b440236c3)**
:::

## typeof 与 instanceof 有什么区别

::: cd

`JavaScript` 中的数据类型分为两类：基本数据类型、对象类型。

基本数据类型：`Number String Boolean Null Undefined Symbol BigInt`

对象类型：Object（引用类型）

- typeof x 返回值的类型：

```js
typeof 1; // Number
typeof "1"; // String
typeof true; // Boolean
typeof null; // Object
typeof undefined; // undefined
typeof function() {}; // function
typeof {}; // Object
```

- instanceof 用于判断该对象是否在目标实例的原型链上。

语法：`object instanceof constructor`(某个实例对象 instanceof 某个构造函数)

可以判断一个实例对象是否是其父类型或者祖先类型的实例。

```js
function A(a) {
  this.a = a;
}
let b = new A(1);
console.log(b instanceof A); // true
console.log(b instanceof Object); // true
```

:::

## NaN 与 undefined 与 null

::: cd

- **NaN 是一个全局对象的属性。代表非数字的特殊值，用于表示某个值不是数字。**

NaN 是 Number 对象中的静态属性

```js
typeof NaN; // Number
NaN === NaN; // false
isNaN(NaN); // true    ES6中新增
isNaN(Number.NaN); // true
```

请注意 `isNaN()`和 `Number.isNaN()`之间的区别：如果当前值是 `NaN`，或者将其强制转换为数字后将是 `NaN`，则前者将返回 `true`。而后者仅当值当前为 `NaN` 时才为 `true`：

```JS
isNaN('ziwen'); // true
Number.isNaN('ziwen'); // false
```

- **`undefined` 是未指定值的变量的默认值，或者没有显式返回值的函数，对象中不存在的属性，这些 `JavaScript` 都会为其分配 `undefined` 值。**

```js
let name;
const say = () => {};
const person = {
  name: "ziwen",
  age: "18"
};
console.log(name); // undefined
console.log(say()); // undefined
console.log(person["company"]); // undefined
```

- **`null`是不代表任何值的值。`null`值表示一个空对象指针，而这也正是使用`typeof`操作符检测`null`值时会返回`object`的原因。**

**如果定义的变量准备在将来保存对象，最好将该变量初始化为`null`。**

实际上，`undefined`值是派生自`null`值的，因此 ECMA-262 规定它们的相等性测试要返回`true`：

```js
null == undefined; // true
null === undefined; // false
```

**一句话总结：`undefined`表示值不存在，`null`表示值存在但是为空，没有意义。**

:::

## 原型继承与 class 继承

::: cd

### 组合继承

```js
// 父类
function Parent(n) {
  this.name = n;
}
Parent.prototype.say = function() {
  console.log(this.name);
};

// 子类
function Child(n) {
  // 继承父类属性
  Parent.call(this, n);
}
// 改变子类的原型为 new Parent()来继承父类的函数
Child.prototype = new Parent();

var child = new Child("ziwen");

child.say(); // ziwen
child instanceof Parent; // true
```

**优点：构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数。**

**缺点：继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类属性，存在内存上的浪费。**

### 寄生组合继承

```js
// 寄生组合继承
function Parent(n) {
  this.name = n;
}
Parent.prototype.say = function() {
  console.log(this.name);
};

function Child(n) {
  // 继承父类属性
  Parent.call(this, n);
}
// 子类原型等于一个原型为父类原型的新对象，实现继承
Child.prototype = Object.create(Parent.prototype);
// 重新指定constructor
Child.prototype.constructor = Child;

var child = new Child("ziwen");

child.say(); // 'ziwen'
child instanceof Parent; // true
```

**优点：优化掉了继承父类函数时调用构造函数问题；解决了无用父类属性问题，正确找到子类的构造函数。**

### Class 继承

```js
class Parent {
  constructor(n) {
    this.name = n;
  }

  say() {
    console.log(this.name);
  }
}
// 核心部分
class Child extends Parent {
  constructor(n, a) {
    super(n, a);
    this.age = a;
  }
}

let child = new Child("ziwen", 18);

child.say(); // ziwen

child instanceof Parent; // true
```

**class 实现继承的核心在于使用 extends 表明继承自哪个父类，并且在子类构造函数中必须调用 super，因为这段代码可以看成 Parent.call(this,n,a)。**

:::

## 闭包？

::: cd

简单理解就是：函数 `A` 中包含函数 `B`，`return` 出函数 `B` 后，函数 `B` 还能访问函数 `A` 中的变量。

```js
function A() {
  var n = 66;
  function B() {
    console.log(n);
  }
  return B;
}

var result = A();
result(); // 66
```

:::

## 数组 Array 的常用 API

:::cd

**迭代相关**

- **map()**

`对数组每一项运行给定函数，返回每次函数调用的结果组成的数组`

- **forEach()**

`对数组每一项运行给定函数，没有返回值`

- **filter()**

`对数组每一项运行给定函数，返回该函数会返回true的项`

- **every()**

`对数组每一项运行给定函数，全true则返回true`

- **some()**

`对数组每一项运行给定函数，任意一项返回true，则返回true`

**其它**

- **push()和 pop()**

`数组尾部推入和弹出，改变原数组，返回操作项`

- **unshift()和 shift()**

`数组头部推入和弹出，改变原数组，返回操作项`

- **slice(start,end)**

`截断数组，返回截断后的新数组，不改变原数组`

- **splice(start,number,arg...)**

`从下标start开始，删除number个元素，并插入arg，返回所删除元素组成的数组，改变原数组`

- **indexOf(value,fromIndex[可选])**

`查找数组元素，返回下标索引，没有则返回 -1`

- **reduce(fn(total,currentValue,currentIndex[可选],arr[可选]),initialValue[可选])**

`reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终为一个值`

- **join('连接符')**

`通过指定连接符，生成字符串`
:::

## 1. 数组去重的简单几种方法

::: cd
简单整理以下几种：

```js
let originalArray = [1, 2, 3, 4, 5, 3, 2, 4, 1];

// 方式1
const result = Array.from(new Set(originalArray));
console.log(result); // -> [1, 2, 3, 4, 5]

// 方式2
const result = [];
const map = new Map();
for (let v of originalArray) {
  if (!map.has(v)) {
    map.set(v, true);
    result.push(v);
  }
}
console.log(result); // -> [1, 2, 3, 4, 5]

// 方式3
const result = [];
for (let v of originalArray) {
  if (!result.includes(v)) {
    result.push(v);
  }
}
console.log(result); // -> [1, 2, 3, 4, 5]

// 方式4
for (let i = 0; i < originalArray.length; i++) {
  for (let j = i + 1; j < originalArray.length; j++) {
    if (originalArray[i] === originalArray[j]) {
      originalArray.splice(j, 1);
      j--;
    }
  }
}
console.log(originalArray); // -> [1, 2, 3, 4, 5]

// 方式5
const obj = {};
const result = originalArray.filter(item =>
  obj.hasOwnProperty(typeof item + item)
    ? false
    : (obj[typeof item + item] = true)
);
console.log(result); // -> [1, 2, 3, 4, 5]
```

:::

## 2. 简洁版 Promise

:::cd

众所周知，Promise 需要 new，构造函数无疑。

关键点：

- 三个状态：`pending`、`fulfilled`、`rejected` (等待态、成功态、失败态)
- 结果分为两种：`pending => fulfilled` 和 `pending => rejected` 能且只能朝着其中一个方向进行。到达`fulfilled`或者`rejected`时不能转变，且必须有一个不可改变的值或者原因。
- 有一个`then`方法，里边有两个参数：`onFulfilled`和`onRejected`。当状态`state`为`fulfilled`，则执行`onFulfilled`，传入`this.value`。当状态`state`为`rejected`，则执行`onRejected`，传入`this.reason`

```js
class Promise {
  constructor(executor){
    // 初始化等待态
    this.state = 'pending';
    // 定义成功的值
    this.value = undefined;
    // 定义失败的原因
    this.reason = undefined;
    // 成功态存放的数组
    this.onResolvedCallbacks = [];
    // 失败态存放的数组
    this.onRejectedCallbacks = [];
    // 定义resolve函数
    let resolve = value => {
      // 如果state改变了，resolve就会调用失败
      if(this.state === 'pending'){
        // state状态转变为成功态
        this.state = 'fulfilled';
        // 存储成功的值
        this.value = value;
        // 对应执行异步任务时，resolve执行时调用成功数组的函数
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    let rejected = reason => {
      if(this.state === 'pending'){
        this.state = 'rejected';
        this.reason = reason;
        // 对应执行异步任务时，reject执行时调用成功数组的函数
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    // 如果executor执行报错，直接执行reject
    try{
      executor(resolve,reject);
    }catch(error){
      reject(error);
    }

    // then方法传入两个参数onFulfilled,onRejected
    then(onFulfilled,onRejected){
      // 判断状态为fulfilled，执行onFulfilled，传入成功的值
      if(this.state === 'fulfilled'){
        onFulfilled(this.value);
      };
      // 判断状态为rejected，执行onRejected，传入失败的原因
      if(this.state === 'rejected'){
        onRejected(this.reason);
      };
      // 以上基本可以实现简单的同步代码，但是当resolve在异步任务内执行时，then的时候状态还是pending等待状态，我们就要在then调用的时候，将成功和失败存到各自的数组，一旦resolve或者reject就调用它们

      if(this.state === 'pending'){
        this.onResolvedCallbacks.push(() => {
          onFulfilled(this.value);
        })

        this.onRejectedCallbacks.push(() => {
          onRejected(this.reason);
        })
      }
    }
  }
}

```

[参考 0](https://juejin.im/post/5b2f02cd5188252b937548ab)

[参考 1](https://promisesaplus.com/)
:::

## 3. forEach、map 和 filter 的区别

:::cd
`forEach`遍历数组，参数是一个回调函数，回调函数接收三个参数：当前元素、元素索引、整个数组。

`map`遍历数组，但其回调函数的返回值组成一个新数组，数组的索引结构和原数组一致，原数组不变。

`filter`会返回原数组的一个子集，回调函数用于逻辑判断，返回`true`则将当前元素添加到返回数组中，否则排除当前元素，原数组不变。
:::

## 4. delete 数组的一项，数组的 length 是否会减 1

::: cd

```js
var a = ["a", "b", "c"];
delete a[0];
console.log(a.length); // 3
console.log(a); // ['b','c']
```

`length`不变，此时`a[0]`为`undefined`，原数组的索引也保持不变。可以理解为：**萝卜拔掉了 坑还在**。

:::

## 5. call 和 apply 的异同点是什么？哪个性能更好一些？

::: cd

- **作用是相同的，传入的第一个参数也都是相同的，都是函数体内`this`的指向；**
- **区别在于第二个传入参数的不同**。`call`从第二个参数开始都是不固定的，`apply`第二个参数是传入带下标的集合，数组或者类数组，`apply`把这个数组当做一整个参数;
- `call`的性能要好于`apply`，`call`少了一次给第二个参数解构或者判断的操作。根据业务场景灵活使用，存在即合理。

:::

## 6. 数组 filter

::: cd
对数组进行过滤。创建一个新数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。（不会检测空数组，不会改变原数组）

filter 接收的参数依次为：数组当前元素、数组 index、整个数组。并返回结果为 true 的元素。

```js
Array.filter(function(currentValue,index,arr),thisValue) // 语法

let arr = [1,2,3,4,5,6,7,8,9,10];
let result = arr.filter(function(num){
  return num < 5;
})
console.log(result); // [1,2,3,4]
```

:::

## 7. 数组 flat

:::cd
此为 ES6 新增特性，可以将多维数组平为低纬数组。如果不传参数默认拍平一层，传入参数可以规定需要拍平的层级。

```js
var newArr = arr.flat([depth]); // depth可选，默认值为1，返回一个包含数组与子数组所有元素的新数组。

var arr1 = [1, 2, [4, 5]];
arr1.flat(); // [1,2,4,5]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat(); // [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2); // [1, 2, 3, 4, 5, 6]
```

:::

## 8. 防抖、节流？

:::cd
**防抖**：触发高频事件后 n 秒内函数只执行一次，如果 n 秒内高频事件再次触发，则重新计算时间。

思路：每次触发事件时取消之前的延时调用方法

```js
<input type="text" id="in">
function debounce(fn, delay){
  let timeout = null;
  return function(){
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this,arguments);
    },delay)
  };
}
function hello(){
  console.log('hello 成功防抖');
}
var inp = document.getElementById('in');
inp.addEventListener('input',debounce(hello));//hello 成功防抖
```

**节流**：高频事件触发，但在 n 秒内只会执行一次，稀释函数的执行频率。

思路：每次触发事件时都判断当前是否有等待执行的延时函数。

```js
function throttle(fn, delay) {
  let canRun = true;
  return function() {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, delay);
  };
}
function hello(e) {
  console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener("resize", throttle(hello)); // 309 331   节流成功
```

:::

## 9. Set、Map？

::: cd
`Set` 和 `Map` 主要的应用场景在于 数据重组 和 数据储存。

**Set**是一种集合数据结构，**Map**是一种字典的数据结构。

`Set` 数据结构类似于数组，但成员是唯一且无需的，没有重复的值。

`Set` 是一种构造函数，用来生成 `Set` 数据结构。

```js
const a = new Set();
[1, 2, 3, 3, 4, 5, 5].forEach(i => a.add(i));
for (let i of a) {
  // 成员唯一
  console.log(i); // 1,2,3,4,5
}

// 去除数组中的重复值
let arr = [1, 2, 3, 3, 4, 4, 5, 5, 5];
[...new Set(arr)]; //[1,2,3,4,5]
```

Set 实例属性

size: 元素数量

```js
let s = new Set([1, 2, 3, 3]);
console.log(s.length); // undefined
console.log(s.size); // 3
```

Set 实例方法

操作方法：

- `add(value)`:新增，相当于数组的 `push`
- `delete(value)`:如果存在即删除集合中的 `value`
- `has(value)`:判断集合中是否存在 `value`
- `clear()`:清空集合

遍历方法：

- `keys()`:返回一个包含集合中所有键的迭代器
- `values()`:返回一个包含集合中所有值的迭代器
- `entries()`:返回一个包含 `Set` 中所有元素键值对的迭代器

Set 的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。

```js
let set1 = new Set([4, 5, 6]);
console.log(set1.keys()); // SetIterator {4, 5, 6}
console.log(set1.values()); // SetIterator {4, 5, 6}
console.log(set1.entries()); // SetIterator {4 => 4, 5 => 5, 6 => 6}

for (let i of set1.keys()) {
  console.log(i); // 4   5   6
}
for (let i of set1.entries()) {
  console.log(i); // [4:4]  [5:5]  [6:6]
}
console.log([...set1]); // [4,5,6]
```

`Set` 可默认遍历，默认迭代器生成函数是 `values()`方法

可以直接用 `for...of` 循环遍历 `Set`。

```js
Set.prototype[Symbol.iterator] === Set.prototype.values; // true
```

因此，`Set` 可以使用 `map`、`filter` 方法

```js
let s = new Set([4, 5, 6]);
s = new Set([...s].map(item => item * 2));
console.log([...s]); // [8,10,12]

s = new Set([...s].filter(item => item >= 10));
console.log([...s]); // [10,12]
```

因此，实现交集，并集，差集变的易如反掌：

```js
let s1 = new Set([1, 2, 3]);
let s2 = new Set([2, 3, 4]);

let intersect = new Set([...s1].filter(i => s2.has(i))); // 求交集
let union = new Set([...s1, ...s2]); // 求并集
let difference = new Set([...s1].filter(i => !s2.has(i))); // 求差集

console.log(intersect); // set {2,3}
console.log(union); // set {1,2,3,4}
console.log(difference); // set {1}
```

**Map**字典

集合与字典都可以储存不重复的值。

集合是以[value,value,value]的形式来储存元素。字典是以[key,value]的形式来储存元素。

```js
const m = new Map();
const v = { name: "ziwen" };
m.set(a, "yes");
m.get(a); // yes

m.has(a); // true
m.delete(a); // true
m.has(a); // false
```

**任何具有 Iterator 接口，且每个成员都是一个双元素的数组的数据结构都可以当作 Map 构造函数的参数。**

```js
const set = new Set([
  ["a", 1],
  ["b", 2]
]);
const m1 = new Map(set);

m1.get("a"); // 1
const m2 = new Map([["c", 2]]);
const m3 = new Map(m2);
m3.get("c"); // 2
```

:::

## 11. 判断数据类型的方法

::: cd

#### typeof

```js
typeof 9; // number
typeof true; // boolean
typeof "ziwen"; // string
typeof undefined; // undefined
typeof []; // object
typeof {}; // object
typeof function() {}; // function
typeof null; // object
```

**优点：能够快速区分基本数据类型；缺点：不能区分 Object、Array 和 Null 区分，都返回 object**

#### instanceof

```js
6 instanceof Number; // false
true instanceof Boolean; // false
'ziwen' instanceof String; // false
[] instanceof Array; // true
function(){} instanceof Function; // true
{} instanceof Object; // true
```

**优点：能够区分 Array、Object 和 Function；缺点：Number、Boolean、String 基本数据类型无法判断**

#### Object.prototype.toString.call()

```js
let toString = Object.prototype.toString;

toString.call(6); // [object Number]
toString.call("ziwen"); // [object String]
toString.call(true); // [object Boolean]
toString.call([]); // [object Array]
toString.call({}); // [object object]
toString.call(function() {}); // [object Function]
toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]
```

**优点：精准判断数据类型；缺点：写法繁琐，推荐封装后使用**

:::

## 12. var、let、const 的区别

::: cd
`let` 与 `const` 为 `ES6` 新增

- `var` 声明的变量会挂载在`window`上
- `var` 声明的变量存在变量提升，`let`和`const`不会
- `let`和`const` 形成块作用域
- 同一作用域下`let`和`const` 不能声明同名变量，`var`可以
- **暂时性死区(Temporal Dead Zone, TDZ)**，在代码块内，使用`let`声明变量之前，该变量都是不可用的。

  ```js
  console.log(a);
  let a; // ReferenceError
  ```

- const 一旦声明必须赋值，不能使用 null 占位。声明后不能再修改，如果声明的是复合类型的数据，可以修改其属性。
  :::

## 13. 定义函数的方法

::: cd
函数声明：

```js
// ES5
function say(){}
function (){} // 匿名函数
// ES6
() => {}
```

函数表达式：

```js
// ES5
var say = function() {};
// ES6
let say = () => {};
```

构造函数：

```js
const say = new Function("a", "b");
```

:::

## [].slice.call(arguments)

::: cd

实现的功能：把类数组对象转为数组对象

```js
[].slice.call(arguments);
// 等效于
Array.prototype.slice.call(arguments);
```

slice()方法可以从已有数组中返回选定的元素，不会改变原来的数组，而是返回一个子数组。

那么问题来了，`arguments` 不是数组对象啊，不能调用数组的方法，那....如何转为数组对象？
大哥们来了：`call()`函数和 `apply()`函数，这俩大哥都可以改变 `this` 的指向，函数运行时的作用域。区别就是传参不一样，第一个参数都是一个对象 `this`，`apply` 第二个参数是一个数组，`call` 可以有 `N`个参数。

slice 的原理就是根据传入的原数组或者类数组进行遍历获取，赋给新数组然后返回。如果没有参数便复制整个原数组或者类数组，赋值给新数组并返回。

当`[].slice.call()`传入 `arguments` 对象的时候，通过 `call` 方法改变原来 `slice` 方法的 `this` 指向，使其指向 `arguments`，并对 `arguments` 进行复制操作，返回一个新数组，以完成 `arguments` 类数组转为数组的目的。

**可以理解为让类数组调用数组的方法**。

`[].slice.call(arguments)`
:::

## 简易深拷贝

::: t

```js
//定义检测数据类型的功能函数
function chekType(target){
  return Object.prototype.toString.call(target).slice(8,-1)
}
//实现深度克隆---对象/数组
function clone(target){
  //初始化变量result 成为最终克隆的数据
  let result;
  //判断拷贝的数据类型
  let targetType = chekType(target);
  if(targetType === 'Object'){
    result = {}
  }else if(targetType === 'Array'){
    result = []
  }else{
    return target
  };
  //遍历目标数据
  for(let i in target){
    //获取遍历数据结构的每一项值。
    let value = target[i];
    if(chekType(value) === 'Object' || chekType(value) === 'Array'){
      //如果是对象或者数组，递归遍历
      result[i] = clone(value);
    }else{
      result[i] = value;
    }
  }
  return result;
}

```

:::