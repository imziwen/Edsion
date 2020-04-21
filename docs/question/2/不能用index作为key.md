# 不能用index作为key

> 无论是vue还是react其内部都用VDom机制来更新浏览器中真实的Dom。Diff算法找出新旧Dom的差异。
>
::: t
模拟一下新旧节点（方便展示的伪代码，真正的VDom是js对象）

```html
<!-- newVDom -->
<ul>
    <li>b</li>  <!-- key==0 -->
    <li>c</li>  <!-- key==1 -->
    <li>d</li>  <!-- key==2 -->
    <li>e</li>  <!-- key==3 -->
</ul>
<!--  oldVDom -->
<ul>
    <li>a</li>  <!-- key==0 -->
    <li>b</li>  <!-- key==1 -->
    <li>c</li>  <!-- key==2 -->
    <li>d</li>  <!-- key==3 -->
    <li>e</li>  <!-- key==4 -->
</ul>

```
diff算法将newVDom与改变前的Dom结构(oldVDom)进行比较，我们找到key值相同的li标签，并进行自上至下逐一对比。对比发现:

- key为0的li标签文本由原先的a变为了b
- key为1的li标签文本由原先的b变为了c
- key为2的li标签文本由原先的c变为了d
- key为3的li标签文本由原先的d变为了e
- v最后key为4的标签被移除

**修改前：用index下标**
![vdom1](/img/question/vue/vdom1.gif)
**修改后：不用index下标**
![vdom2](/img/question/vue/vdom2.gif)


一眼明了！

**每点击一次，生成相对应的`newVDom`就会少一个节点，进入diff算法进行新旧`VDom`的比较时就会得出结果：仅仅是删除了一个节点。再由`newVDom`映射到真实的`Dom`，只做了一个删除dom的操作，并没有重新渲染其他li，极大提升了性能。**
:::

[引自](https://juejin.im/post/5e9d83436fb9a03c917fe728)
