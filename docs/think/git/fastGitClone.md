# 一个让`git clone` 提速百倍的小技巧

::: t
有没有遇到git clone时候慢成狗的时候，或者等了半天最后来了个失败的时候？

```gitexclude
git clone https://github.com/xxxxx/xxxx.git --depth=1
```
后边加上 `--depth` 会只下载一个 `commit`，所以内容少了很多，基本瞬间就完事了。

缺点就是不能切换到历史 `commit` 和历史分支。

可以指定 `--depth` 的数值来下载近几个 `commit`。
:::