# 😍快速入门TypeScript   
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
```ts
class Person {
  // 私有变量
  private name: string;
  
  // 构造函数
  constructor(name: string) {
    this.name = name;
  }
  
  // 获取名字
  getName(): string {
    return this.name;
  }
  
  // 设置名字
  setName(name: string): void  {
    this.name = name;
  }
}

let per = new Person("子文");
per.setName("文子");
console.log(per);
```
## 继承
- `public` 在当前类里面，子类，类外面都可以访问
- `protected` 在当前类和子类内部可以访问，类外部无法访问
- `private` 在当前类内部可访问，子类，类外部都无法访问。
- 属性不加修饰符,默认就是公有的 (`public`)
```ts
class Son extends Person {
 // 静态属性
  public static age: number = 18;
  // 学校
  public school: string;
  //构造方法
  constructor(name: string, school: string) {
    // 访问派生类的构造函数中的 "this" 前，必须调用 "super",初始化父类构造函数 --并把参数传给父类
    super(name); 
    //把传进来的school赋值给全局变量
    this.school = school;
  }
  //静态方法
  static run(name: string): string {
    return `${name}在跑步,他的年龄才${this.age}`;
  }
}

let son = new Son("王五", "xx小学");
son.setName("子文"); // 私有类也不能在子类的外部访问,但可通过公开的方法中进行赋值和访问
console.log(son);
console.log(Son.run("Edsion"));
console.log(Son.age);
```
## 多态
> 通过抽象方法/方法重载--实现多态--多态的作用是用来定义标准

- 抽象类无法`实例化`。
- 非抽象类继承抽象父类时`不会自动实现`来自父类的抽象成员,必须`手动定义`父类中的抽象成员，否则报错。
- 抽象成员包括`属性`和`方法`。
```ts
// 抽象父类
abstract class Animal {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  //抽象成员--方法
  abstract eat(): any;
  //抽象成员--属性
  protected abstract ages: Number;
  sleep(): void {
    console.log("睡觉");
  }
}

class cat extends Animal {
  ages: Number = 2;
  constructor(name: string) {
    super(name);
  }
  //非抽象类“cat”不会自动实现继承自“Animal”类的抽象成员“eat”,  必须手动定义父类中的抽象方法--多态
  eat(): string {
    return "猫吃鱼";
  }

  //多态
  sleep(): string {
    return "猫在睡觉";
  }
}

console.log(new cat("12").sleep());
```
## 接口
> 在`面向对象`的编程中，接口是一种`规范`的定义，它定义了行为和动作的规范，

> 在程序设计里面，接口起到一种`限制和规范`的作用。

> 接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些>方法，提供这些方法的类就可以满足实际需要。`ts`中的接口类似于`java`，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。
### 属性接口
> 用个变量来存储传入的变量,这样可以传入定义的接口以外的值，否则如果直接传入对象中`无接口定义的值会报错`，所以建议接口定义了哪些值就传哪些值。
```ts
interface InterfaceName {
  first: string;
  second?: string; //加个问号，接口属性就可以变成可传可不传了，不传默认是undefined。
}
//打印变量
function logParam(name: InterfaceName): void {
  console.log(name.first, name.second, 11);
}
//定义参数
const obj = { first: "1", second: "fff", three: 1 };
//logParam({ first: "1", second: "1", three: 1 }); //报错,只能传接口定义的值
logParam(obj);
```

### 函数类型接口
> 对方法传入的`参数类型`,以及返回值类型进行约束,可批量进行约束。
> 接口只对传入的参数的`类型和参数的个数`进行约束，`不对参数名称`进行约束。
``` ts
interface keyMap {
  (key: string, value: string): string;
}
let logKeyMap: keyMap = function (key1: string, value: string): string {
  return key1 + value;
};
console.log(logKeyMap("key1", "value"));
```

### 可索引接口

> 对数组进行约束,`index`后必须跟着`number`类型。
> 对对象进行约束,`index`后必须跟着`string`类型
> 索引签名参数类型必须为 `string` 或 `number`

```ts
// 约束数组
interface Arr {
  [index: number]: string;
}
let ss: Arr = ["2121"];

// 约束对象

interface Obj {
  [index: string]: string;
}

let interfaceArr: Obj = { aa: "1" };
```

### 类类型接口
> 类接口会对类的`属性`和`方法`进行约束，类似非抽象类继承抽象类时必须实现某些方法和属性，但对属性和方法的类型的约束更加严格，除了方法`void`类型可被重新定义外，其他属性或方法的类型定义需要和接口`保持一致`。

- 对`类`进行约束,类似`抽象类`的实现。

```ts
interface Animals {
  name: string;
  eat(): void;
}

class Dogs implements Animals {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat() {}
}
```
- 接口继承--接口可以继承接口
```ts
interface Dog {
  eat(): void;
}

interface Persons extends Dog {
  work(): void;
}

class Cat {
  code() {
    console.log("猫在敲代码");
  }
}

//可继承类后再实现接口
class SuperMan extends Cat implements Persons {
  eat(): void {
    console.log(1);
  }
  work(): void {
    console.log(2);
  }
}
let superMan = new SuperMan();
superMan.code();
```

## 枚举Enums
> 如果未赋值的上一个值是数字那么这个未赋值的值的是上一个值的值`+1`
> 
> 如果未赋值的上一个值未赋值那么输出的就是它的`下标`
> 
> 如果未赋值的上一个值的值是`非数字`,那么`必须赋值`

```ts
enum error {
  blue = 3,
  "orange",
}
const f: error = error.orange;
console.log(f); //输出4
```

## 泛型Generics
> 软件工程中，我们不仅要创建一致的定义良好的`api`，同时也要考虑`可重用性`。
组件不仅能够支持当前的数据类型，同时也能支持`未来的数据类型`，这在创建大型系统时为你提供了十分灵活的功能
泛型就是解决`类`、`接口`、`方法`的`复用性`，以及对`不特定数据类型的支持`。

> **要求:传入的参数和返回的参数一致**

### 函数的泛型
> 这里的`T`可改成其他任意值但定义的值，和传入的参数以及返回的参数是一样的,一般默认写法是`T`，也是业内规范的选择。
```ts
function getDate<T>(value: T): T {
  return value;
}
console.log(getDate<number>(123));
```

### 类的泛型

```ts
class MinClass<T> {
  public list: T[] = [];
  //添加
  add(value: T): void {
    this.list.push(value);
  }
  
  //求最小值
  min(): T {
    //假设这个值最小
    let minNum = this.list[0];
    for (let i = 0; i < this.list.length; i++) {
    //比较并获取最小值
    minNum = minNum < this.list[i] ? minNum : this.list[i];
    }
    return minNum;
  }
}
//实例化类 并且指定了类的T的类型是number
let minClass = new MinClass<number>(); 
minClass.add(23);
minClass.add(5);
minClass.add(2);
console.log(minClass.min());
 //实例化类 并且指定了类的T的类型是string，则其方法的传参和返回都是string类型
let minClass2 = new MinClass<string>();
minClass2.add("23");
minClass2.add("5");
minClass2.add("2");
console.log(minClass2.min());
```

### 接口泛型
> 接口的泛型只针`对函数类型的接口`
- 第一种写法

```ts
interface ConfigFn {
  //规范参数类型,返回值类型
  <T>(value: T): T;
}

let getData: ConfigFn = function <T>(value: T): T {
  return value;
};

console.log(getData<string>("z11"));
```

- 第二种写法

```ts
interface ConfigFn<T> {
  //参数类型 ，返回值类型
  (value: T): T;
}

//接口方法
function getData<T>(value: T): T {
  return value;
}

//使用接口
let myGetDate: ConfigFn<string> = getData;
console.log(myGetDate("3"));
```

### 类当做参数传入泛型类
>  类的`参数名`和`类型`都做了约束。
```ts
//用户类--和数据库表字段进行映射
class User {
  username: string | undefined;
  password: string | undefined;
  //构造函数-初始化参数
  constructor(param: {
    username: string | undefined;
    password?: string | undefined;
  }) {
    this.username = param.username;
    this.password = param.password;
  }
}


//数据库类
class Db<T> {
  add(user: T): boolean {
    console.log(user);
    return true;
  }
  updated(user: T, id: number): boolean {
    console.log(user, id);
    return true;
  }
}

let u = new User({
  username: "张三",
});

//u.username = "李四";
u.password = "111111";
let db = new Db<User>();
db.add(u);
db.updated(u, 1);
```

## 装饰器
- 类装饰器：类装饰器在类申明之前被申明(`紧靠着类申明`)，类装饰器应用于`类构造函数`，可以用于`监视`，`修改`或者`替换`类定义。
> 装饰器会`覆盖`被装饰的类中的方法。
```ts
function logClass(params: any) {
  console.log(params);
  //params 就是指代当前类--HttpClient
  params.prototype.apiUrl = "动态扩展属性";
  params.prototype.run = function () {
    console.log("动态扩展方法");
  };
  params.prototype.getDate = function () {
    console.log("动态扩展方法2");
  };
}

@logClass
class HttpClient {
  constructor() {}
  getDate() {
    console.log(1);
  }
}

let http: any = new HttpClient();
console.log(http.apiUrl);
http.run();
http.getDate();
```

- 装饰器工厂🏭
> 可传参的装饰器

```ts
function logClassB(param: string) {
  return function (target: any) {
    console.log(target, "装饰器以下的类");
    console.log(param, "装饰器传进来的属性");
  };
}

@logClassB("小慧")
class HttpClients {
  constructor() {}
  getDate() {}
}

let https: any = new HttpClients();
console.log(https);
```

- 构造函数装饰器

```ts
function logClassC(target: any) {
  console.log(target, 1111);
  //用在这里继承目标类并重载方法和属性
  return class extends target {
    a: any = "我是修改后的属性";
    getDate() {
      console.log(this.a + "--装饰器中的方法输出的");
    }
  };
}

@logClassC
class HttpClient2 {
  public a: string | undefined;
  constructor() {
    this.a = "我是构造函数里面的a";
  }
  getDate() {
    console.log(this.a);
  }
}
const https2 = new HttpClient2();
https2.getDate();
```
## 声明文件
> 未完待续......

## 内置类型
> 未完待续......
