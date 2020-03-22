# 组件通信相关

## 组件间的通信方式有哪些

### 父子组件间通信：

- `props` 与 `event`【常用】
- `v-model`
- `.sync`【已弃用】
- `ref`
- `$parent` 与`$children`

#### props 和 events

> 组件通过 属性 props 向下传递数据给子组件，子组件通过 事件 events 给父组件发送消息。

```js
//父组件-->
<template>
  <header v-on:getchild="updatepdata($event)"></header>
  <h1>{{title}}</h1>
  <child v-bind:pro="chil"></child>
</template>
<script>
export default {
    data(){
        chil: 626,
        title: ''
    },
    methods:{
        updatepdata:function(el) {
            this.title = el
        }
    }
}
</script>

//子组件-->
<template>
    <p>{{pro}}</p>
    <h1 v-on:click="toparent()"></h1>
</template>
<script>
export default {
    props:{
        pro:{
            default: 0 //指定一个默认值
            type: Number, // 校验类型
            required: true, // 是否为必填项
            validator: function(val){ // 将值作为唯一参数传入
                return value >= 0
            }
        }
    },
    methods: {
        toparent() {
            this.$emit('getchild','我是子组件来的')
        }

    }
}
</script>
```

<hr>

#### v-model

> `v-model` 是用来在表单控件或者组件上创建双向绑定的，他的本质是 `v-bind` 和 `v-on` 的语法糖，在一个组件上使用 `v-model`，默认会为组件绑定名为 `value` 的 `prop` 和名为 `input` 的事件。

```js
// 父组件
<template>
  <div>
    <h2>{{ inputData }}</h2>
    <chil v-model="inputData" />
  </div>
</template>

<script>
import chil from "@/components/child";
export default {
  components: {
    chil
  },
  data() {
    return {
      inputData: ""
    };
  }
};
</script>


// 子组件
<template>
  <div>
    <p>我是子组件</p>
    <input type="text" :value="currentV" @input="handleInput" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentV:
        this.value === undefined || this.value === null ? "" : this.value
    };
  },
  props: {
    value: ""
  },
  methods: {
    handleInput(e) {
      const v = e.target.value;
      this.$emit("input", v);
    }
  }
};
</script>

```

#### ref

> ref 特性可以为子组件赋予一个 `ID` 引用，通过这个 `ID` 引用可以直接访问这个子组件的实例。当父组件中需要主动获取子组件中的数据或者方法时，可以使用 `this.$refs` 来获取。

```js

// 父组件
<template>
    <base-input ref="baseInput"></base-input>
</template>
<script>
    export default {
        methods: {
        focusInput: function () {
            this.$refs.usernameInput.focus()
        }
    }
}
</script>

// 子组件

<template>
    <input ref="input">
</template>
<script>
    export default {
    methods: {
        focus: function () {
            this.$refs.input.focus()
        }
    }
}
</script>
```

#### $parent 和 $children

> `$parent` 属性可以用来从一个子组件访问父组件的实例，`$children` 属性可以获取当前实例的直接子组件。
>
> 看起来使用 `$parent` 比使用 `prop` 传值更加简单灵活，可以随时获取父组件的数据或方法，又不像使用 `prop` 那样需要提前定义好。但使用 `$parent`会导致父组件数据变更后，很难去定位这个变更是从哪里发起的，所以在绝大多数情况下，**不推荐使用**。
>
> 在有些场景下，两个组件之间可能是父子关系，也可能是更多层嵌套的祖孙关系,这时就可以使用 `$parent`。

### 非父子组件通信

- `$attr` 与 `$listeners`
- `provide` 与 `inject`
- `eventBus`【常用】
- 通过根实例`$root`访问
- `vuex`【常用】
- `dispatch` 与 `brodcast`【vue2.x 已弃用】

#### $attrs 和 $listeners

> 当要和一个嵌套很深的组件进行通信时，如果使用 `prop` 和 `events` 就会显的十分繁琐
>
> 要传递的数据很多时，就需要在中间的每个组件都重复写很多遍，反过来从后代组件向祖先组件使用 `events` 传递也会有同样的问题。使用 `$attrs` 和 `$listeners` 就可以简化这样的写法。
>
> `$attrs` 会包含父组件中没有被 `prop` 接收的所有属性（不包含 `class` 和 `style`属性），可以通过 `v-bind="$attrs"` 直接将这些属性传入内部组件。
>
> `$listeners` 会包含所有父组件中的 `v-on` 事件监听器 (不包含 `.native` 修饰器的) ，可以通过 `v-on="$listeners"` 传入内部组件。

```js
// 父组件
<template>
    <child :name="name" :message="message" @sayHello="sayHello"></child>
</template>
<script>
export default {
    inheritAttrs: false,
    data() {
        return {
            name: '通信',
            message: 'Hi',
        }
    },
    methods: {
        sayHello(mes) {
            console.log('mes', mes) // => "hello"
        },
    },
}
</script>
// 子组件
<template>
    <grandchild v-bind="$attrs" v-on="$listeners"></grandchild>
</template>
<script>
export default {
    data() {
        return {}
    },
    props: {
        name,
    },
}
</script>

// 孙子组件
<template>
</template>
<script>
export default {
    created() {
        this.$emit('sayHello', 'hello')
    },
}
</script>

```

#### provide 和 inject

> provide 和 inject 需要在一起使用，它可以使一个祖先组件向其所有子孙后代注入一个依赖，可以指定想要提供给后代组件的数据/方法，不论组件层次有多深，都能够使用。

```js
// 祖先组件

<script>
export default {
    provide: {
        author: 'yushihu',
    },
    data() {},
}
</script>

// 子孙组件
<script>
export default {
    inject: ['author'],
    created() {
        console.log('author', this.author) // => yushihu
    },
}
</script>

```

`provide` 和 `inject` 绑定不是响应的，它被设计是为组件库和高阶组件服务的，平常业务中的代码不建议使用。

#### eventBus

> 对于比较小型的项目，没有必要引入 `vuex` 的情况下，可以使用 `eventBus`。相比我们上面说的所有通信方式，`eventBus` 可以实现任意两个组件间的通信。
>
> 它的实现思想也很好理解，在要相互通信的两个组件中，都引入同一个新的 `vue` 实例，然后在两个组件中通过分别调用这个实例的事件触发和监听来实现通信。

```js
// eventBus.js
import Vue from "vue";
export default new Vue();
// 组件A
<script>
import Bus from 'eventBus.js';
export default {
    methods: {
        sayHello() {
            Bus.$emit('sayHello', 'hello ziwen');
        }
    }
}
</script>

//组件B
<script>
import Bus from 'eventBus.js';
export default {
    created() {
        Bus.$on('sayHello', target => {
            console.log(target);  // => 'hello ziwen'
        });
    }
}
</script>
```

#### 通过 `$root` 访问根实例

> 通过 `$root`，任何组件都可以获取当前组件树的根 `Vue` 实例，通过维护根实例上的 `data`，就可以实现组件间的数据共享。

```js
//main.js 根实例
new Vue({
  el: "#app",
  store,
  router,
  // 根实例的 data 属性，维护通用的数据
  data: function() {
    return {
      author: ""
    };
  },
  components: { App },
  template: "<App/>"
});

// 组件A
<script>
export default {
    created() {
        this.$root.author = 'you'
    }
}
</script>

//组件B
<template>
    <div><span>作者</span>{{ $root.author }}</div>
</template>
```

通过这种方式，虽然可以实现通信，但在应用的任何部分，任何时间发生的任何数据变化，都不会留下变更的记录，这对于稍复杂的应用来说，调试是致命的，**不建议在实际应用中使用**。

#### Vuex

> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。对一个中大型单页应用来说是不二之选。
