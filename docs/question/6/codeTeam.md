# Vue 项目使用 vscode + vetur + eslint + prettier 统一代码规范

::: t
### 彻底删除 vscode （win 环境下）此步能保证大家的起点相同，视情况而定，可忽略。
-   右键`vscode`图标打开文件所在位置，双击`unins000.exe`文件卸载或控制面板卸载
-   `win + r` 打开运行
-   `%appdata%`  回车
-   删除  `Code`  和  `Visual Studio Code`  文件夹（关键步骤）
-   地址栏输入  `%userprofile%`  回车
-   删除`.vscode`  文件夹（关键步骤）
::: 

::: t
### 安装 vscode 插件

-   `Vetur`
-   `ESlint`
-   `Prettier - Code formatter`
::: 

::: t
### 修改 vscode 配置

-   `文件` => `首选项` => `设置` 右上角 打开设置 JSON 添加如下配置

```js
{
  //.vue文件template格式化支持，并使用js-beautify-html插件
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  //js-beautify-html格式化配置，属性强制换行
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "force-aligned"
    },
    "prettier": {
      "semi": false
    }
  },
  //根据文件后缀名定义vue文件类型
  "files.associations": {
    "*.vue": "vue"
  },
  //配置 ESLint 检查的文件类型
  "eslint.validate": ["javascript", "javascriptreact", "html", "vue"],
  //保存时eslint自动修复错误
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

> 以上修改的用户区的设置，可将以上配置复制到工作区的配置文件（项目更目录`.vscode`目录中的`settings.json`文件既是，将此文件与项目文件一同提交到代码仓库，各自下载后，`vscode`就会默认使用工作区的这个配置文件）
::: 

::: t
### 项目根目录增加.eslintrc.js 与.prettierrc.json 文件

> 主要是解决`ESlint`与`Prettier`的冲突并修复。`Prettier`默认是双引号的而 eslint 如果定义的是单引号的话格式化后就不符合`eslint`规则了。所以在`.eslintrc.js`与`.prettierrc.json`配置并覆盖。

#### 以下为.eslintrc.js 文件

```js
module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', //强制使用单引号
        quotes: ['error', 'single'], //强制不使用分号结尾
        semi: ['error', 'never'], //其它规则请参考官网  https://eslint.org/docs/rules/
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
}
```

#### 以下为.prettierrc.json 文件

```js

{
  "eslintIntegration": true,
  "tabWidth": 2,
  "singleQuote": true,
  "semi": false
}

```

> **至此已实现 vue 团队项目中实现代码规范统一**
:::


::: t

### 推荐安装明星级插件（让开发速度提升 300%）

#### 功能增强类

-   **`CSS peek`（追踪至样式表中 CSS 类和 ids 定义的地方。）**
-   **`vue-helper`认准作者'shenjiaolong' 别下载错了（click 函数与变量直接跳转以及其它好用的辅助功能。）**
-   `JavaScript Booster` （推荐给你更好的语法，助你写出高质量的代码同时提升能力。）
-   `Path Intellisense`（自动路径补全。）
-   `Npm Intellisense`（用于在 import 语句中自动填充模块。）
-   `IntelliSense for CSS class names`（智能提示 css 的 class 名。）
-   `HTML CSS Support`（让 html 标签上写 class 智能提示当前项目所支持的样式。）
-   `Import Cost`（在编辑器中显示引入包的大小。）
-   `filesize`（在底部状态栏显示当前文件大小，点击后还可以看到详细创建、修改时间。）
-   `JavaScript (ES6) code snippets`（更好的 ES6 语法支持。）
-   `vue peek` (vue 文件中引入的组件，可以直接右键选择跳转过去)
-   `Auto Rename Tag` （修改标签中任意一侧，相反侧都会随之修改。）

#### GIT 相关

-   `GitLens` （多人协作项目中，每行代码都显示 git 相关信息，省下其它查看步骤的时间。）

#### 外观类

-   `Material Icon Theme` （让项目各目录与文件拥有漂亮并且高辨识度的图标。）
-   `Bracket Pair Colorizer`（让括号拥有独立的颜色，易于区分。可以配合任意主题使用。）
-   `Guides`（指导线，当前所在的级别缩进线会变红，当前在哪一级一目了然。）
-   `Vibrancy` （编辑器实现毛玻璃效果，美哭了！）
::: 