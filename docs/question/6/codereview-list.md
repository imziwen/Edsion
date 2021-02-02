# 代码评审 Checklist 清单

::: t
辅助整个团队提高代码质量、统一代码规范。
:::

## 代码静态检查工具

### 使用 `eslint` 工具对 `javascript` [代码进行检查](https://cn.eslint.org/docs/rules/)

### 使用 stylelint 工具对 css 样式[代码进行检查](https://www.npmjs.com/package/stylelint-config-standard)

## 注释

::: t
 类、方法务必加上`jsDoc`注释。`jsDoc`的好处不必多说。（TypeScript自带魔法）.
 
 写完方法后在方法上方`/**` 然后回车自动生成（视编辑器而定，大部分新版 `vscode` 与 `webstorm`都支持）
 
 尽量减少 `//` 此类的注释
 
 加上jsDoc注释后：
 - 方便后期维护，减少后期不必要的麻烦，减少后人骂代码作者的风险🐩
 - 最最重要的是，调用此方法的时候编辑器给你的提示，不比你回去翻代码香吗？
:::

```javascript
/**
* @description 功能：将时间戳格式化为指定格式的字符串
* @param {Number} milliSec - 要转换的时间，可以为秒、毫秒、微秒、或Date类型
* @param {String} [formatStr] - 目标格式字符串 可选 默认为：'yyyy-MM-dd hh:mm:ss'
* @returns {String} - 根据目标时间格式，将时间数值（或Date）转换成的时间字符串
* @author ziwen
*/
export function formatTime({ milliSec, formatStr = DEFAULT_FORMAT_STR }) {
    // code
}

```

## 命名

### 变量 采用 `Camel Case` 小驼峰式命名

```js
let userInfo;
```

### 常量 采用 全`大写`或加`_`分割命名

```js
const ERROR_CODE = 200;
```

### 避免名称冗余

`bad：`

```js
const Car = {
  make: "Honda",
  model: "Accord",
  color: "Blue"
};
```

`good:`

```js
const Car = {
  carMake: "Honda",
  carModel: "Accord",
  carColor: "Blue"
};
```

`CSS` 类名采用 `BEM` 命名规范
  
`good:`

```css
.block__element {}
.block--modifier {}
```

### 命名符合语义化

命名需要符合语义化，如果函数命名，可以采用加上动词前缀：

| 动词 | 含义                   |
| ---- | ---------------------- |
| can  | 判断是否可执行某个动作 |
| has  | 判断是否含有某个值     |
| is   | 判断是否为某个值       |
| get  | 获取某个值             |
| set  | 设置某个值             |

`good:`

```js
//是否可查看
function canLook(){
   return true;
}
//获取姓名
function getName{
   return this.name
}
```

## JS 推荐写法

### 每个常量应该命名，不然看代码的人不知道这个常量表示什么意思。

`bad:`

```js
let row = Math.ceil(num / 10);
```

`good:`

```js
const COL_NUM = 10;
let row = Math.ceil(num / COL_NUM);
```

### 推荐使用字面量

创建对象和数组推荐使用字面量，因为这不仅是性能最优也有助于节省代码量。

`bad:`

```js
let obj = {};
obj.name = "ziwen";
obj.age = 18;
obj.sex = "男";
```

`good:`

```js
let obj = {
  name: "ziwen",
  age: 18,
  sex: "男"
};
```

### 对象设置默认属性的推荐写法

`good:`

```js
const menuConfig = {
  title: "Order",
  // User did not include 'body' key
  buttonText: "Send",
  cancellable: true
};

function createMenu(config) {
  config = Object.assign(
    {
      title: "Foo",
      body: "Bar",
      buttonText: "Baz",
      cancellable: true
    },
    config
  );

  // config now equals: {title: "Order", body: "Bar",
  // buttonText: "Send", cancellable: true}
  // ...
}

createMenu(menuConfig);
```

`bad:`

```js
const menuConfig = {
  title: null,
  body: "Bar",
  buttonText: null,
  cancellable: true
};

function createMenu(config) {
  config.title = config.title || "Foo";
  config.body = config.body || "Bar";
  config.buttonText = config.buttonText || "Baz";
  config.cancellable =
    config.cancellable !== undefined ? config.cancellable : true;
}

createMenu(menuConfig);
```

### 将对象的属性值保存为局部变量

对象成员嵌套越深，读取速度也就越慢。所以好的经验法则是：如果在函数中需要多次读取一个对象属性，最佳做法是将该属性值保存在局部变量中，避免多次查找带来的性能开销。

`good:`

```js
let person = {
  info: {
    sex: "男"
  }
};
function getMaleSex() {
  let sex = person.info.sex;
  if (sex === "男") {
    console.log(sex);
  }
}
```

`bad:`

```js
let person = {
  info: {
    sex: "男"
  }
};
function getMaleSex() {
  if (person.info.sex === "男") {
    console.log(person.info.sex);
  }
}
```

### 字符串转为整型

当需要将浮点数转换成整型时，应该使用 Math.floor()或者 Math.round()，而不是使用 parseInt()将字符串转换成数字。Math 是内部对象，所以 Math.floor()`其实并没有多少查询方法和调用时间，速度是最快的。

`good:`

```js
let num = Math.floor("1.9");
```

`bad:`

```js
let num = parseInt("1.9");
```

### 函数参数

函数参数越少越好，如果参数超过两个，要使用 ES6 的解构语法，不用考虑参数的顺序。

`good:`

```js
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}

createMenu({
  title: "Foo",
  body: "Bar",
  buttonText: "Baz",
  cancellable: true
});
```

`bad:`

```js
function createMenu(title, body, buttonText, cancellable) {
  // ...
}
```

### 使用参数默认值

使用参数默认值 替代 使用条件语句进行赋值。

`good:`

```js
function createMicrobrewery(name = "Hipster Brew Co.") {
  // ...
}
```

`bad:`

```js
function createMicrobrewery(name) {
  const breweryName = name || "Hipster Brew Co.";
  // ...
}
```

### 尽量不要写全局方法

> 在 `JavaScrip`t 中，永远不要污染全局，会在生产环境中产生难以预料的 `bug`。
>
> 举个例子，比如你在 `Array.prototype` 上新增一个 `diff` 方法来判断两个数组的不同。而你同事也打算做类似的事情，不过他的 `diff` 方法是用来判断两个数组首位元素的不同。很明显你们方法会产生冲突，遇到这类问题我们可以用 `ES2015/ES6` 的语法来对 `Array` 进行扩展。

`good:`

```js
class SuperArray extends Array {
  diff(comparisonArray) {
    const hash = new Set(comparisonArray);
    return this.filter(elem => !hash.has(elem));
  }
}
```

`bad:`

```js
Array.prototype.diff = function diff(comparisonArray) {
  const hash = new Set(comparisonArray);
  return this.filter(elem => !hash.has(elem));
};
```

### 推荐函数式编程

> 函数式变编程可以让代码的逻辑更清晰更优雅，方便测试。

`good:`

```js
const programmerOutput = [
  {
    name: "Uncle Bobby",
    linesOfCode: 500
  },
  {
    name: "Suzie Q",
    linesOfCode: 1500
  },
  {
    name: "Jimmy Gosling",
    linesOfCode: 150
  },
  {
    name: "Gracie Hopper",
    linesOfCode: 1000
  }
];
let totalOutput = programmerOutput
  .map(output => output.linesOfCode)
  .reduce((totalLines, lines) => totalLines + lines, 0);
```

`bad:`

```js
const programmerOutput = [
  {
    name: "Uncle Bobby",
    linesOfCode: 500
  },
  {
    name: "Suzie Q",
    linesOfCode: 1500
  },
  {
    name: "Jimmy Gosling",
    linesOfCode: 150
  },
  {
    name: "Gracie Hopper",
    linesOfCode: 1000
  }
];

let totalOutput = 0;

for (let i = 0; i < programmerOutput.length; i++) {
  totalOutput += programmerOutput[i].linesOfCode;
}
```

### 使用多态替换条件语句

> 为了让代码更简洁易读，如果你的函数中出现了条件判断，那么说明你的函数不止干了一件事情，违反了函数单一原则 ；并且绝大数场景可以使用多态替代

`good:`

```js
class Airplane {
  // ...
}
// 波音777
class Boeing777 extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getPassengerCount();
  }
}
// 空军一号
class AirForceOne extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude();
  }
}
// 赛纳斯飞机
class Cessna extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getFuelExpenditure();
  }
}
```

`bad:`

```js
class Airplane {
  // ...

  // 获取巡航高度
  getCruisingAltitude() {
    switch (this.type) {
      case "777":
        return this.getMaxAltitude() - this.getPassengerCount();
      case "Air Force One":
        return this.getMaxAltitude();
      case "Cessna":
        return this.getMaxAltitude() - this.getFuelExpenditure();
    }
  }
}
```

### 定时器是否清除

> 代码中使用了定时器 setTimeout 和 setInterval，需要在不使用时进行清除。

## Vue 推荐写法

### 组件名为多个单词

> 我们开发过程中自定义的组件的名称需要为多个单词，这样做可以避免跟现有的以及未来的 `HTML` 元素相冲突，因为所有的 `HTML` 元素名称都是单个单词的。

`good:`

```js
Vue.component("todo-item", {
  // ...
});

export default {
  name: "TodoItem"
  // ...
};
```

`bad:`

```js
Vue.component("todo", {
  // ...
});

export default {
  name: "Todo"
  // ...
};
```

### 组件的 data 必须是一个函数

> 当在组件中使用 data 属性的时候 (除了 new Vue 外的任何地方)，它的值必须是返回一个对象的函数。 因为如果直接是一个对象的话，子组件之间的属性值会互相影响。
> good:

```js
export default {
  data() {
    return {
      foo: "bar"
    };
  }
};
```

`bad:`

```js
export default {
  data: {
    foo: "bar"
  }
};
```

### Prop 定义应该尽量详细

> prop 的定义应该尽量详细，至少需要指定其类型。

`good:`

```js
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```

`bad:`

```js
props: {
  status: String;
}
```

### 为 v-for 设置键值

> v-for 中总是有设置 key 值。在组件上总是必须用 key 配合 v-for，以便维护内部组件及其子树的状态。

`good:`

```js
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

`bad:`

```js
<ul>
  <li v-for="todo in todos">
    {{ todo.text }}
  </li>
</ul>
```

### 完整单词的组件名

> 组件名应该倾向于完整单词而不是缩写，编辑器中的自动补全已经让书写长命名的代价非常之低了，而其带来的明确性却是非常宝贵的。不常用的缩写尤其应该避免。

`good:`

```js
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

`bad:`

```js
components/
|- SdSettings.vue
|- UProfOpts.vue
```

### 多个特性元素的每个特性分行

> 在 JavaScript 中，用多行分隔对象的多个属性是很常见的最佳实践，因为这样更易读。

`good:`

```js
<MyComponent 
    foo="a" 
    bar="b" 
    baz="c" 
    />
```

`bad:`

```js
<MyComponent foo="a" bar="b" baz="c" />
```

### 模板中简单的表达式

> 组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。复杂表达式会让你的模板变得不那么声明式。我们应该尽量描述应该出现的是什么，而非如何计算那个值。而且计算属性和方法使得代码可以重用。

`good:`

```js
<!-- 在模板中 -->
{{ normalizedFullName }}

// 复杂表达式已经移入一个计算属性
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```

`bad:`
```js
{
  {
    fullName
      .split(" ")
      .map(function(word) {
        return word[0].toUpperCase() + word.slice(1);
      })
      .join(" ");
  }
}
```

### 简单的计算属性

> 应该把复杂计算属性分割为尽可能多的更简单的属性。

` good:`

```js
computed: {
  basePrice: function () {
    return this.manufactureCost / (1 - this.profitMargin)
  },
  discount: function () {
    return this.basePrice * (this.discountPercent || 0)
  },
  finalPrice: function () {
    return this.basePrice - this.discount
  }
}
```
`bad:`

```js
computed: {
  price: function () {
    var basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}
```
### 标签顺序保持一致
> 单文件组件应该总是让标签顺序保持为 `<template>`、`<script>`、 `<style>` 。

`good:`
```js
<!-- ComponentA.vue -->

<template>...</template>
<script>/* ... */</script>
<style>/* ... */</style>
```

`bad:`
```js
<!-- ComponentA.vue -->

<template>...</template>
<style>/* ... */</style>
<script>/* ... */</script>
```

### 组件之间通信

> 父子组件的通信推荐使用 `prop`和 `emit` ，而不是`this.$parent`或改变 `prop`；
>
> 兄弟组件之间的通信推荐使用 `EventBus（$emit　/ $on）`
> 
> 其它情况合理使用`Vuex`

### 页面跳转数据传递
> 页面跳转，例如 `A` 页面跳转到 `B` 页面，需要将 `A` 页面的数据传递到 `B` 页面，推荐使用 路由参数进行传参，而不是将需要传递的数据保存 `vuex`，然后在 `B` 页面取出 `vuex`的数据，因为如果在 `B` 页面刷新会导致 `vuex` 数据丢失，导致 `B` 页面无法正常显示数据。

`good:`

```js
let id = ' 123';
this.$router.push({name: 'homeworkinfo', query: {id:id}}); 
```
### 推荐 script 标签内部声明顺序

> `data` > `prop` > `components` > `filter` > `computed` > `watch` > `钩子函数（钩子函数按其执行顺序`） > `methods`

### 计算属性 VS 方法 VS 侦听器

- 推荐使用计算属性：计算属性基于响应式依赖进行缓存，只在相关响应式依赖发生改变时它们才会重新求值；相比之下，每次调用方法都会再次执行方法；
- 推荐使用计算属性：而不是根据 Watch 侦听属性，进行回调； 但是有计算属性做不到的：当需要在数据变化时执行异步或开销较大的操作时，侦听器是最有用的。

### v-if VS v-show
- `v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。 `v-if` 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
- 相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 `CSS` 的属性 `display` 进行切换。
## CSS 预处理器推荐写法

> `SCSS` 为例

### 变量 `$` 使用

> 利用 `scss` 中的变量配置，可以进行项目的颜色、字体大小统一更改（换肤），有利于后期项目的维护。

`good:`

```css
$--color-success: #67c23a;
$--color-warning: #e6a23c;
$--color-danger: #f56c6c;
$--color-info: #909399;
```

### @import 导入样式文件

> `scss` 中的`@import` 规则在生成 `css` 文件时就把相关文件导入进来。这意味着所有相关的样式被归纳到了同一个 `css` 文件中，而无需发起额外的下载请求，在构建我们自己的组件库时推荐使用。

```css
@import "./base.scss";
@import "./pagination.scss";
@import "./dialog.scss";
@import "./autocomplete.scss";
@import "./dropdown.scss";
@import "./dropdown-menu.scss";
```

### 局部文件命名的使用

> `scss` 局部文件的文件名以下划线开头。这样，`scss` 就不会在编译时单独编译这个文件输出 `css`，而只把这个文件用作导入。

### 父选择器标识符 & 实现 BEM 命令规范

> `scss`的嵌套和父选择器标识符&能解决`BEM`命名的冗长，且使样式可读性更高。

`good:`

```css
.el-input {
  display: block;
  &__inner {
    text-align: center;
  }
}
```

### @mixin 混合器的使用

> `mixin` 混合器用来实现大段样式的重用，减少代码的冗余，且支持传参。

```css
@mixin button-size(
  $padding-vertical,
  $padding-horizontal,
  $font-size,
  $border-radius
) {
  padding: $padding-vertical $padding-horizontal;
  font-size: $font-size;
  border-radius: $border-radius;
  &.is-round {
    padding: $padding-vertical $padding-horizontal;
  }
}

@include m(medium) {
  @include button-size(
    $--button-medium-padding-vertical,
    $--button-medium-padding-horizontal,
    $--button-medium-font-size,
    $--button-medium-border-radius
  );
}

@include m(small) {
  @include button-size(
    $--button-small-padding-vertical,
    $--button-small-padding-horizontal,
    $--button-small-font-size,
    $--button-small-border-radius
  );
}
```
