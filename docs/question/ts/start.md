# 快速入门TypeScript

## 前期准备

> TS的强大与妙处不过多描述，我们直接开始。

::: t
**TypeScript官网地址**: [官网](https://www.typescriptlang.org/zh/)

**强烈Nvm来安装并管理本地node版本** [官网](https://github.com/nvm-sh/nvm)
:::

### 全局安装TypeScript

```sh
npm install -g typescript
```

### 使用`tsc`全局命令来查看版本或编译ts文件

```sh
// 查看版本
tsc -v
// 编译 ts 文件
tsc xxx.ts
```

## 原始数据类型

`TypeScript`文档地址：[basic-types](https://www.typescriptlang.org/docs/handbook/basic-types.html)

`JavaScript`原始数据类型`primitive values`：
- `String`
- `Number`
- `Boolean`
- `BigInt`
- `Symbol`
- `Null`
- `Undefined`

```ts
// Boolean
let isDone: boolean = true

// Number 支持2进制和8进制哦
let age: number = 18
let binaryNumber: number = 0b1111

// String
let myName: string = 'ziwen'
let sayMessage: string = `你好，我是${myName}，今年${age}岁了`

// Undefined 与 null
let u: undefined = undefined
let n: null = null

// Undefined 与 null是所有类型的子类型
// Undefined 与 nulll类型可以赋值给 Number String等类型的变量
let num: number = undefined
let str: string = 'xxxx'
```
### [Any类型](https://www.typescriptlang.org/docs/handbook/basic-types.html#any)

```ts
let anyType: any = 88
anyType = '888'
anyType = false
// 定义了any类型，可以赋值和访问任何属性
```

## [Array 和 Tuple元祖](https://www.typescriptlang.org/docs/handbook/basic-types.html#array)

```ts
// 类型 + 方括号 来表示数组是最简单的使用方法
let theNumberArray: number[] = [1,2,3,4]
// 这样定义后，数组的每一项不允许出现其它的数据类型
theNumberArray.push(18)
theNumberArray.push('18') // error

// 元祖与数组类似，对每一项都起到限定作用
let theTuple = [number, string] = [18, 'ziwen']
// 少一项，多一项，类型不一致统统不通过
theTuple = ['ziwen', 18, 'yeah'] // error

```
**友好的错误提示**
<img src="/img/question/ts/ts-arrayTuple.png" alt="子文" title="子文" class="zoom-custom-imgs">

## [interface接口](https://www.typescriptlang.org/docs/handbook/interfaces.html)

**`Duck Typeing`** 概念：
> 如果某个东西长的像鸭子🦆，像鸭子一样游泳，像鸭子一样嘎嘎叫，那它就可以被看成一只鸭子🦆

```ts
// 定义一个接口 Person
interface Person {
    name: string;
    age: number;
}
// 我们定义一个变量 ziwen, 他的类型是Person
// 约束ziwen的格式必须跟接口Person一致

let ziwen: Person = {
    name: 'ziwen',
    age: 18
}

// 如果要求并不是那么严格，无需完全匹配，可用可选属性：

interface Person {
    name: string;
    age?: number; // 加上这个小问号即表示可选属性
}

let ziwen: Person = {
    name: 'ziwen'
}

// 只读属性，希望某个字段只能在创建的时候赋值
// 用readonly来定义

interface Person {
    readonly id: number
    name: string;
    age?: number; // 加上这个小问号即表示可选属性
}

let ziwen: Person = {
    id: 1,
    name: 'ziwen'
}

ziwen.id = 2 // error  无法分配到 "id" ，因为它是只读属性。
```

## [函数](https://www.typescriptlang.org/docs/handbook/functions.html)

```ts
// 约定输入与输出  括号后边的: number 定义函数的返回类型
function add(x: number, y: number): number {
    return x + y
}
// 可选参数
function add1(x: number, y: number, z?: number): number {
    if(typeof z === 'number') {
        return x + y + z
    } else {
        return x + y
    }
}

// 函数本身的类型
const add2: (x: number, y: number, z?: number) => number = add

// interface 描述函数类型
const sum = (x: number, y: number) => {
    return x + y
}

interface ISum {
    (x: number, y: number): number
}

const sum2: ISum = sum
```

## [类型推论](https://www.typescriptlang.org/docs/handbook/type-inference.html),联合类型,类型断言

### [联合类型](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#union-types)
> 类型不确定时，可用竖线来分割两个类型
> 我们只能访问此联合类型里共有的属性或方法

```ts
let numberOrString: number | string

// 类型“string | number”上不存在属性“length”。类型“number”上不存在属性“length”。
// 书写完numberOrString.的时候，编辑器会提示此联合属性共有的属性和方法
numberOrString.length // 此处会给出警告⚠️

numberOrString.toString()
```
### [类型断言](https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions)

```ts
// 用 as 关键字告诉ts，我的代码我做主，你无法判断我的代码
// 我就要把它看作是一个string

function getLength(input: string | number) {
    const str = input as string
    if(str.length) {
        return str.length
    } else {
        const num = input as number
        return num.toString().length
    }
}
```

## Class类
> 未完待续......

## 类与接口
> 未完待续......

## 枚举Enums
> 未完待续......

## 泛型Generics
> 未完待续......

## 声明文件
> 未完待续......

## 内置类型
> 未完待续......
