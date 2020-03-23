# margin 塌陷问题

::: t

当两个盒子在垂直方向上设置 margin 值时，会出现一个塌陷现象。
父级与子级对于顶部的 margin，取父级和子级的最大值。

解决方法：

- 为父元素添加 `border`(有点不高级 😄)
- 为父元素添加 `overflow:hidden;` BFC

:::
