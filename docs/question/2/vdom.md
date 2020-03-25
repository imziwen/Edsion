# Vdom(Virtual DOM)

::: t

众所周知 `DOM` 操作是非常消耗性能的，可我们的 `JavaScript` 在 `V8` 引擎的加持下执行速度就非常快。

用 `JavaScript` 来模拟 `DOM` 结构，`DOM` 变化的对比放在 `JavaScript` 层来做，提高效率。

如何对比变化？**`diff` 算法就是核心**。(`diff`即对比，是一个广泛的概念，如`linux diff`命令、`git diff`等)

- **只比较同一层级，不跨级比较**
- **tag 不相同，则直接删掉重建，不再深度比较**
- **tag 和 key，两者都相同，则认为是相同节点，不再深度比较**

:::

## snabbdom
