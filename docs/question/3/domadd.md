# DOM 操作：'增删改查'

::: t

## 添加：

```js
父节点.appendChild(子节点);
父节点.insertBefore(newChild, refChild);
```

## 删除：

```js
节点.remove();
父节点.removeChild(子节点);
```

## 创建：

```js
document.createElement(标签名);
document.createTextNode(文本内容);
```

## 获取父节点：

```js
子节点.parentNode;
子节点.offsetParent;
```

## 获取子节点：

```js
父节点.children;
父节点.chilNodes;
```

## 复制：

```js
被复制节点.cloneNode(true);
```

## 替换：

```js
父节点.replaceChild(newChild, refChild);
```

:::
