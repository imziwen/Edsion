# JS 基础小记


<test/>

::: zimg
https://cn.vuejs.org/images/logo.png
:::

## 啥是执行上下文（也叫执行环境）
::: t
执行上下文就是当前`JavaScript`代码被解析和执行时所在环境(锅里炒 JS？)的抽象概念。

### 执行上下文有三种类型：

:one: **全局执行上下文**：是默认的，最外围的执行上下文。在 Web 浏览器中全局执行环境是`window`对象，所有全局变量和函数都是`window`对象属性的和方法创建的。

:two: **函数执行上下文**：每个函数都有自己的执行上下文，_每次调用函数时_，都会为此函数创建一个执行上下文。可以有任意数量个。

:three: **Eval 函数执行上下文**：运行在`eval`函数中的执行上下文，这家伙总会惹事，尽量少使用为妙。

:::

## 啥是执行栈
::: t
它在其它编程语言中叫做调用栈，具有 `LIFO`（后进先出）结构，用于存贮在代码执行期间创建的所有执行上下文。

当 `JS` 引擎首次拿到代码的时候，会创建一个全局执行上下文并将其推到当前的执行栈。每当一个函数调用，引擎都会为该函数创建一个新的执行上下文并将其推到当前执行栈的顶端。

引擎会运行执行上下文在执行栈顶端的函数，当次函数运行完成后，其对应的执行上下文将会从执行栈中弹出，上下文控制权将移交到当前执行栈的下一个执行上下文。

```javascript
let a = "你好啊";

function first() {
  console.log("Inside first function");
  second();
  console.log("Again inside first function");
}
function second() {
  console.log("Inside second function");
}

first();
console.log("Inside Global Execution Context");
// Inside first function
// Inside second function
// Again inside first function
// Inside Global Execution Context
```

![执行上下文](/img/notes/1/zxsxw.jpg)
::: 

## 执行上下文是如何被创建的？

::: t
它分两个阶段：:one:创建阶段 :two:执行阶段

### 创建阶段

- :one: 确定 this 的值，称为 This Binding。
- :two: LexicalEnvironment（词法环境） 组件被创建。
- :three: VariableEnvironment（变量环境） 组件被创建。

#### This Binding

- 全局执行上下文中，this 的值指向全局对象 window（浏览器中）
- 函数执行上下文中，this 的值取决于函数的调用方式。如果被一个对象调用，那么 this 的值就被设置为此对象，否则 this 的值被设置为全局对象或 undefined(严格模式下)

```javascript
let person = {
  name: "ziwen",
  birthYear: 1999,
  calcAge: function() {
    console.log(2019 - this.birthYear);
  }
};

person.calcAge(); // 20
// 'this' 指向 'person', 因为 'calcAge' 是被 'person' 对象引用调用的。

let calculateAge = person.calcAge;
calculateAge(); // NaN
// 'this' 指向全局 window 对象,因为没有给出任何对象引用
```

#### 词法环境（Lexical Environment）

> 词法环境是一种规范类型，基于`ECMAScript`代码的词法嵌套结构来定义标识符与特定变量和函数的关联关系。词法环境由环境记录（`environment record`）和可能为空引用（`null`）的外部词法环境组成。

**词法环境一个包含标识符与变量映射的结构**。（标识符表示变量/函数的名称，变量是实际对象或原始值的引用）。

在词法环境中有两个组成部分：:one: 环境记录 :two: 对外部环境的引用

- 环境记录是存储变量和函数声明的实际位置。
- 对外部环境的引用意味着它可以访问其外部词法环境。

词法环境由两种类型：

:one: **全局环境**(在全局执行上下文中)是一个没有外部环境的词法环境。全局环境的外部引用为`null`。它拥有一个全局对象（`window`对象）及其关联的方法和属性以及任何用户自定义的变量，this 指向这个全局对象。

:two: **函数环境** 用户在函数中定义的变量被存储在环境记录中，环境记录中包含着`arguments`对象。对外部环境的引用可以是全局环境，也可以是包换内部函数的外部环境。

#### 变量环境

变量环境也是一个词法环境，因此它具有上边定义的词法环境的所有属性。

在 ES6 中，词法环境和变量环境的区别在于前者用于存储函数声明和变量（`let`和`const`）绑定，而后者仅用于存储变量（`var`）绑定

来吧，上代码瞧瞧：

```js
let a = 20;
const b = 30;
var c;

function multiply(e, f) {
  var g = 20;
  return e * f * g;
}

c = multiply(20, 30);
```

执行上下文如下所示：

```javascript
GlobalExectionContext = {

  ThisBinding: <Global Object>,

  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 标识符绑定在这里
      a: < uninitialized >,
      b: < uninitialized >,
      multiply: < func >
    }
    outer: <null>
  },

  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 标识符绑定在这里
      c: undefined,
    }
    outer: <null>
  }
}

FunctionExectionContext = {

  ThisBinding: <Global Object>,

  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 标识符绑定在这里
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>
  },

  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 标识符绑定在这里
      g: undefined
    },
    outer: <GlobalLexicalEnvironment>
  }
}

```

**变量提升的原因**：在创建时，函数声明存储在环境中，而变量会被设置为 `undefined`(`var` 声明的情况下)或者保持未初始化(在 `let` 和 `const` 定义的情况下)。所以 `var` 定义的变量在声明之前可以访问(尽管是 `unddefined`),如果在声明之前访问 `let` 和 `const` 定义的变量就会提示引用错误的原因。这就是所谓的变量提升。

#### 执行阶段

此阶段完成对所有变量的分配，最后执行代码。

<br>

[参考文章](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)
[官方 ES6](http://ecma-international.org/ecma-262/6.0/)
::: 
## 箭头函数this?
::: t
> 1. 没有自己的`this`、`super`、`arguments`和`new.target`绑定
> 2. 不能使用`new`来调用
> 3. 没有原型对象
> 4. 不可以改变`this`的绑定
> 5. 形参名称不能重复
>

箭头函数其实并没有自己的`this`,它需要通过查找作用域链来决定其值。

该箭头函数绑定上层非箭头函数的`this`,否则this将被设置为全局对象`window`。

```javascript
var name = '全局对象window';
var student = {
    name: 'ziwen',
    doSth: function(){
        // var self = this;
        var DoSth = () => {
            // console.log(self.name);
            console.log(this.name);
        }
        DoSth();
    },
    DoSth2: () => {
        console.log(this.name);
    }
}

// 箭头函数DoSth的上层非箭头函数普通函数为doSth
student.doSth(); // 'ziwen'
// 箭头函数DoSth2上层没有非箭头函数的普通函数，则绑定全局对象window
student.DoSth2(); // '全局对象window'

```
:::



## 原型链类
::: t
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
::: t
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
::: t
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
::: t

- 组合继承

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

- **☆寄生组合继承（目前最优雅）**

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
Child.prototype = Object.create(Parent.prototype,{
// 重新指定constructor
// 添加到新创建对象的不可枚举（默认）属性
// （即其自身定义的属性，而不是其原型链上的枚举属性）
// 对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。
    constructor: {
        value: Child
// 详见MDN  Object.create()
    }
});
// 另一种写法
// Child.prototype = Object.create(Parent.prototype)
// 重新指定constructor
// Child.prototype.constructor = Child;

var child = new Child("ziwen");

child.say(); // 'ziwen'
child instanceof Parent; // true
```

**优点：优化掉了继承父类函数时调用构造函数问题；解决了无用父类属性问题，正确找到子类的构造函数。**

- Class 继承

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
## EventLoop
::: t
```javascript
console.log('1');
async function async1(){
  console.log('2');
  await console.log('3');
  console.log('4');
}

setTimeout(function(){
  console.log('5');
  }, 0);
async1();
new Promise(function(resolve){
  console.log('6');
  resolve();
})
  .then(function(){
    console.log('7');
  });
console.log('8');
// 12368475
```

```javascript
setTimeout(function(){
  console.log(1);
})
Promise.resolve(function(){
  console.log(2)
})
new Promise(function(resolve){
  console.log(3);
  resolve();
})
  .then(function(){
    console.log(4)
  })
// console.log(5) // 3541
```
::: 
## 闭包？
::: t

简单理解就是：函数 `A` 中包含函数 `B`，且函数`B`中使用了函数`A`的变量，`return` 出函数 `B` 后，函数 `B` 还能访问函数 `A` 中的变量。

**在 `JavaScript` 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。**

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
::: t

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

## 数组去重的简单几种方法
::: t

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

## 简洁版 Promise
::: t

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

[扩展 0](https://juejin.im/post/5b2f02cd5188252b937548ab)

[扩展 1](https://promisesaplus.com/)
::: 

## forEach、map 和 filter 的区别
::: t
`forEach`遍历数组，参数是一个回调函数，回调函数接收三个参数：当前元素、元素索引、整个数组。

`map`遍历数组，但其回调函数的返回值组成一个新数组，数组的索引结构和原数组一致，原数组不变。

`filter`会返回原数组的一个子集，回调函数用于逻辑判断，返回`true`则将当前元素添加到返回数组中，否则排除当前元素，原数组不变。
::: 

## delete 数组的一项，数组的 length 是否会减 1
::: t
```js
var a = ["a", "b", "c"];
delete a[0];
console.log(a.length); // 3
console.log(a); // ['b','c']
```

`length`不变，此时`a[0]`为`undefined`，原数组的索引也保持不变。可以理解为：**萝卜拔掉了 坑还在**。
::: 

## call 和 apply 的异同点是什么？哪个性能更好一些？
::: t
- **作用是相同的，传入的第一个参数也都是相同的，都是函数体内`this`的指向；**
- **区别在于第二个传入参数的不同**。`call`从第二个参数开始都是不固定的，`apply`第二个参数是传入带下标的集合，数组或者类数组，`apply`把这个数组当做一整个参数;
- `call`的性能要好于`apply`，`call`少了一次给第二个参数解构或者判断的操作。根据业务场景灵活使用，存在即合理。

::: 
## 数组 filter
::: t
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

## 数组 flat
::: t
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

## 防抖、节流？
::: t
**防抖**：触发高频事件后 n 秒内函数只执行一次，如果 n 秒内高频事件再次触发，则重新计算时间。<br  >
**即短时间内大量触发同一事件，只会执行一次函数，实现原理为设置一个定时器，约定在xx毫秒后再触发事件处理，每次触发事件都会重新设置计时器，直到xx毫秒内无二次操作，防抖常用于搜索框/滚动条的监听事件处理，如果不做防抖，每输入一个字/滚动屏幕，都会触发事件处理，造成性能浪费。**


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

**节流**：高频事件触发，但在 n 秒内只会执行一次，稀释函数的执行频率。<br>

**函数节流即每隔一段时间就执行一次，实现原理为设置一个定时器，约定xx毫秒后执行事件，如果时间到了，那么执行函数并重置定时器，和防抖的区别在于，防抖每次触发事件都重置定时器，而节流在定时器到时间后再清空定时器**<br>
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

## Set、Map？

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

## 判断数据类型的方法
::: t
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
## var、let、const 的区别
::: t
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

## 定义函数的方法
::: t

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
::: t

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
## 深拷贝
::: t
> **乞丐版**
```js
//定义检测数据类型的功能函数
function chekType(target) {
  return Object.prototype.toString.call(target).slice(8, -1);
}
//实现深度克隆---对象/数组
function clone(target) {
  //初始化变量result 成为最终克隆的数据
  let result;
  //判断拷贝的数据类型
  let targetType = chekType(target);
  if (targetType === "Object") {
    result = {};
  } else if (targetType === "Array") {
    result = [];
  } else {
    return target;
  }
  //遍历目标数据
  for (let i in target) {
    //获取遍历数据结构的每一项值。
    let value = target[i];
    if (chekType(value) === "Object" || chekType(value) === "Array") {
      //如果是对象或者数组，递归遍历
      result[i] = clone(value);
    } else {
      result[i] = value;
    }
  }
  return result;
}
```
> **优雅版**
```javascript
    const isComplexDataType = obj => (typeof obj === 'object' || 
        typeof obj === 'function') && (obj !== null)

    const deepClone = function (obj, hash = new WeakMap()) {
      if(hash.has(obj)) return hash.get(obj)
      let type = [Date,RegExp,Set,Map,WeakMap,WeakSet]
      if(type.includes(obj.constructor)) return new obj.constructor(obj)
      // 如果成环了，参数obj = obj.loop = 最初的obj 
      // 会在WeakMap中找到第一次放入的obj提前返回第一次
      // 放入WeakMap的cloneObj

      // 遍历传入参数所有键的特性  
      let allDesc = Object.getOwnPropertyDescriptors(obj) 
      // 继承原型
      let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc) 
      hash.set(obj,cloneObj)
      for (let key of Reflect.ownKeys(obj)) {
        //  Reflect.ownKeys(obj)可以拷贝不可枚举属性和符号类型
        // 如果值是引用类型(非函数)则递归调用deepClone
        cloneObj[key] =
          (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ?
            deepClone(obj[key],hash) : obj[key]
      }
      return cloneObj
    }
```
::: 
## 手写 new 操作符
::: t
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
## common.js 和 es6 中模块引入的区别？
::: t
`CommonJS` 是一种模块规范，最初被应用于 `Nodejs`，成为 `Nodejs` 的模块规范。运行在浏览器端的 `JavaScript` 由于也缺少类似的规范，在 `ES6` 出来之前，前端也实现了一套相同的模块规范 (例如: `AMD`)，用来对前端模块进行管理。自 `ES6` 起，引入了一套新的 `ES6 Module` 规范，在语言标准的层面上实现了模块功能，而且实现得相当简单，有望成为浏览器和服务器通用的模块解决方案。但目前浏览器对 `ES6 Module` 兼容还不太好，我们平时在 `Webpack` 中使用的 `export` 和 `import`，会经过 `Babel` 转换为 `CommonJS` 规范。在使用上的差别主要有：

- `CommonJS` 模块输出的是一个值的拷贝，`ES6` 模块输出的是值的引用。
- `CommonJS` 模块是运行时加载，`ES6` 模块是编译时输出接口。
- `CommonJs` 是单个值导出，`ES6 Module` 可以导出多个。
- `CommonJs` 是动态语法可以写在判断里，`ES6 Module` 静态语法只能写在顶层。
- `CommonJs` 的 `this` 是当前模块，`ES6 Module` 的 `this` 是 `undefined`。
::: 
