# JS 基础小记

## 0. 原型链类

::: tip ⬇️⬇️⬇️⬇️⬇️⬇️
::: cd

- 创建对象的几种方法
  ```js
  // 第一种方式：字面量
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

:::

## 1. 数组去重的简单几种方法

::: tip ⬇️⬇️⬇️⬇️⬇️⬇️
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

## 2. Promise 异常捕获

:::tip ⬇️⬇️⬇️⬇️⬇️⬇️
:::cd
:::

## 3. forEach、map 和 filter 的区别

:::tip ⬇️⬇️⬇️⬇️⬇️⬇️
:::cd
`forEach`遍历数组，参数是一个回调函数，回调函数接收三个参数：当前元素、元素索引、整个数组。

`map`遍历数组，但其回调函数的返回值组成一个新数组，数组的索引结构和原数组一致，原数组不变。

`filter`会返回原数组的一个子集，回调函数用于逻辑判断，返回`true`则将当前元素添加到返回数组中，否则排除当前元素，原数组不变。
:::

## 4. delete 数组的一项，数组的 length 是否会减 1

::: tip ⬇️⬇️⬇️⬇️⬇️⬇️
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

::: tip ⬇️⬇️⬇️⬇️⬇️⬇️
::: cd

- **作用是相同的，传入的第一个参数也都是相同的，都是函数体内`this`的指向；**
- **区别在于第二个传入参数的不同**。`call`从第二个参数开始都是不固定的，`apply`第二个参数是传入带下标的集合，数组或者类数组，`apply`把这个数组当做一整个参数;
- `call`的性能要好于`apply`，`call`少了一次给第二个参数解构或者判断的操作。根据业务场景灵活使用，存在即合理。

:::

## 6. 数组 filter

::: tip ⬇️⬇️⬇️⬇️⬇️⬇️
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

:::tip ⬇️⬇️⬇️⬇️⬇️⬇️
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

::: tip ⬇️⬇️⬇️⬇️⬇️⬇️
:::cd
**防抖**：触发高频事件后 n 秒内函数只执行一次，如果 n 秒内高频事件再次触发，则重新计算时间。

思路：每次触发事件时取消之前的延时调用方法

```js
<input type="text" id="in">
function debounce(fn){
  let timeout = null;
  return function(){
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this,arguments);
    },500)
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
function throttle(fn) {
  let canRun = true;
  return function() {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, 500);
  };
}
function hello(e) {
  console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener("resize", throttle(hello)); // 309 331   节流成功
```

:::

## 9. Set、Map？

::: tip ⬇️⬇️⬇️⬇️⬇️⬇️
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

## 10. undefined 和 null 有什么区别

::: tip ⬇️⬇️⬇️⬇️⬇️⬇️
::: cd

`undefined` 是未指定值的变量的默认值，或者没有显式返回值的函数，对象中不存在的属性，这些 `JavaScript` 都会为其分配 `undefined` 值。

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

`null`是不代表任何值的值。`null`值表示一个空对象指针，而这也正是使用`typeof`操作符检测`null`值时会返回`object`的原因。

**如果定义的变量准备在将来保存对象，最好将该变量初始化为`null`。**

实际上，`undefined`值是派生自`null`值的，因此 ECMA-262 规定它们的相等性测试要返回`true`：

```js
null == undefined; // true
null === undefined; // false
```

:::

## 11. 判断数据类型的方法

::: tip ⬇️⬇️⬇️⬇️⬇️⬇️
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

::: tip ⬇️⬇️⬇️⬇️⬇️⬇️
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

::: tip ⬇️⬇️⬇️⬇️⬇️⬇️
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
