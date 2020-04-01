# 点击穿透问题

::: t

年少时经常遇到的小怪物：点击穿透
:::

## 产生原因

> 浏览器等待约 `300ms` 的原因，判断用户是否是双击`（double tap）`行为，双击过程中就不适合触发 `click` 事件了

- PC上的一次`click`事件：`mousedown` -> `mouseup` -> `click` 三步。
- 移动端的`click`事件：`touchstart` -> `touchmove` -> `touchend` -> `click`。


## 场景还原

> 我们经常看到的`弹窗` `遮罩层`这种东西【整个容器里有一个底层元素的div，和一个弹出层div，还有一个遮罩层】
> 
> 点击关闭按钮，`touchend`首先触发`tap`，弹出层和遮罩就被隐藏了。`touchend`后继续等待300ms发现没有其他行为了，则继续触发`click`，由于这时弹出层已经消失，所以当前`click`事件的`target`就在底层元素上，于是就`alert`内容。整个事件触发过程为 `touchend` -> `tap` -> `click`。

![弹出层](/img/question/htmlcss/popu.jpeg)

```html
<div class="container">
    <div id="underLayer">底层元素</div>

    <div id="popupLayer">
        <div class="layer-title">弹出层</div>
        <div class="layer-action">
            <button class="btn" id="closePopup">关闭</button>
        </div>
    </div>
</div>
<div id="bgMask"></div>
```

```js
$('#closePopup').on('tap', function(e){
    $('#popupLayer').hide();
    $('#bgMask').hide();
});

$('#underLayer').on('click', function(){
    alert('underLayer clicked');
});
```

而由于`click`事件的滞后性（`300ms`），在这300ms内上层元素隐藏或消失了，下层同样位置的DOM元素触发了`click`事件（如果是`input`框则会触发`focus`事件），看起来就像点击的`target`“穿透”到下层去了。

**因此，点击穿透的现象就容易理解了，在这 `300ms` 以内，因为上层元素隐藏或消失了，由于 `click` 事件的滞后性，同样位置的 `DOM` 元素触发了 `click` 事件（如果是 `input`则触发了 `focus` 事件）。在代码中，给我们的感觉就是 `target` 发生了飘移。**

### 解决它
- 触摸结束时 `touchend` 事件触发时，`preventDefault()`。看上去好像没有什么问题，但是，很遗憾的是不是所有的浏览器都支持。
- 禁止页面缩放 通过设置meta标签，可以禁止页面缩放，部分浏览器不再需要等待 `300ms`，导致点击穿透。点击事件仍然会触发，但相对较快，所以 `click` 事件从某种意义上来说可以取代点击事件， 而代价是牺牲少数用户（`click` 事件触发仍然较慢）的体验。
```html
<meta name="viewport" content="width=device-width, user-scalable=no">
```
- **CSS3 的方法** 虽然主要讲的是事件，但是有必要介绍一个 `CSS3` 的属性 —— `pointer-events`。

```css
pointer-events: auto /*默认值，鼠标或触屏事件不会穿透当前层*/
```
-  fastclick
使用`fastclick`库,其实现思路是，取消 `click` 事件，用 `touchend` 模拟快速点击行为
```js
FastClick.attach(document.body);
```

[参考](https://segmentfault.com/a/1190000003848737)