# CSS 小记

## CSS 选择符有哪些？

::: tip CSS 选择符有哪些？
::: cd

- **类型选择符**与**后代选择符**是最基本的选择符

```css
p {
  /*类型选择符*/
  color: red;
}
div p {
  /*后代选择符*/
  font-size: 12px;
}
```

- 子选择符与同辈选择符

```css
#id > li {
  /*子选择符只选择一个元素的直接后代,li元素的嵌套元素不受影响*/
  ...;
}
#id + h2 {
  /*相邻同辈选择符*/
  /*可以选择某个元素后边，并与该元素拥有共同父元素的元素，选择的是id后边的第一个h2*/
  ...;
}
#id ~ h2 {
  /*一般同辈选择符*/
  /*可以选择某个元素后边，并与该元素拥有共同父元素的元素，选择的是id后边的所有h2*/
  ...;
}
```

- 通用选择符

```css
* {
  /*粗暴的小星星，匹配任何元素*/
  ...;
}
```

- 属性选择符

```css
input[type="submit"] {
  /*基于元素是否有某个属性是否有某个值来选择元素*/
  ...;
}
a[href^="http:"] {
  /*匹配以某些字符开头的属性值*/
}
img[src$=".jpg"] {
  /*匹配以某些字符结尾的属性值*/
}
a[href*="/ziwen/"] {
  /*匹配包含某些字符的属性值*/
}
a[rel~="next"] {
  /*匹配以空格分隔的字符串中的属性值（rel的属性值）*/
}
```

- 伪元素

```css
p::first-letter {
  /*选择文本的第一个字符*/
  ...;
}
p::first-line {
  /*选择一段文本的第一行*/
}
p::before {
  /*适合开头插入小图标或者版面装饰符号。给伪元素添加跟其它元素添加一样，背景、边框等都可*/
  content: " ";
}
p::after {
  /*适合末尾插入小图标或者版面装饰符号。给伪元素添加跟其它元素添加一样，背景、边框等都可*/
  content: " ";
}
```

- 伪类

  冒号开头，用于选择元素的特定状态或关系。

```css
a:link {
  /*未访问过的链接为蓝色*/
  color: blue;
}
a:visited {
  /*访问过的链接为绿色*/
  color: green;
}
a:hover,
a:focus {
  /*链接在鼠标悬停及获取键盘焦点时为红色*/
  color: red;
}
a:active {
  /*活动状态时为紫色*/
  color: purple;
}
/*先后次序很重要。:link 和 :visited 应该排在前边，然后才是与用于交互相关。*/
```

- 结构化伪类

css3 新增

```css
tr:nth-child(odd) {
  /*从表格第一行开始，每隔一行的背景色变成黄色  odd为奇数  even为偶数*/
  background: yellow;
}
tr:nth-child(8) {
  /*从表格第八行的背景色变成黄色*/
  background: yellow;
}
tr:nth-child(3n + 4) {
  /*4表示表格的第四行，3表示第一个目标元素后边元素的序数位置。假如表格一共10行即选中4、7、10行背景色为黄色*/
  background: yellow;
}
li:nth-last-child(3) {
  /*li元素的倒序第三个*/
}
li:first-child() {
  /*相当于直观版的nth-child(1)*/
}
```

- 表单伪类

专门用于选择表单元素。根据用户与表单控件的交互方式，来反应表单控件的某种状态。

```css
input:required {
  /*想高亮某个必填控件可以使用:required伪类来选择带有required属性的表单元素，并给边框设置颜色*/
  outline: 2px solid red;
}
input[type="email"]:valid {
  /*如果输入框中含有有效的电子邮件地址，则边框显示绿色*/
  border-color: green;
}
input[type="email"]:invalid {
  /*如果输入框中不包含有效的电子邮件地址，则边框显示红色*/
  border-color: red;
}
```

:::

## margin 塌陷问题

::: tip ⬇️⬇️⬇️⬇️⬇️⬇️
::: cd

当两个盒子在垂直方向上设置 margin 值时，会出现一个塌陷现象。
父级与子级对于顶部的 margin，取父级和子级的最大值。

解决方法：

- 为父元素添加 `border`(有点不高级 😄)
- 为父元素添加 `overflow:hidden;` BFC
