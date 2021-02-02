# IOS毛玻璃效果
> 从IOS7开始，那种背景模糊的毛玻璃效果就深得我心。


- 如今，`backdrop-filter`如愿以偿，详见[张鑫旭老师](https://www.zhangxinxu.com/wordpress/2019/11/css-backdrop-filter/)的博客
- 个人感觉，站点加点这种毛玻璃或者透明元素，能”增大“用户的视野，更具辽阔感，观感更佳😄
## 具体可以滑动本站,看顶部`navBar`效果
```css
backdrop-filter: blur(6px) // 关键css
```

## `backdrop-filter`和`filter`区别

`backdrop-filter`是让当前元素所在区域后面的内容模糊灰度或高亮之类，要想看到效果，需要元素本身半透明或者完全透明，喜欢这种。
而`filter`是让当前元素自身模糊灰度或高亮之类。

<img src="/img/question/htmlcss/maoboli.jpg" alt="子文" title="子文" class="zoom-custom-imgs">


