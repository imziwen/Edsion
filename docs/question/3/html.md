# HTML 小记

## src 与 href 的区别是？

::: tip src 与 href 的区别是？
::: cd
href 标识超文本引用，用在 link 和 a 等元素上，href 是引用和页面关联，是在当前元素和引用资源之间建立联系。

src 表示引用资源，表示替换当前元素，用在 img，script，iframe 上，src 是页面内容不可缺少的一部分。

src 是 source 的缩写，是指向外部资源的位置，指向的内部会迁入到文档中当前标签所在的位置；在请求 src 资源时会将其指向的资源下载并应用到当前文档中，例如 js 脚本，img 图片和 frame 等元素。

当浏览器解析到这一句的时候会暂停其他资源的下载和处理，直至将该资源加载，编译，执行完毕，图片和框架等元素也是如此，类似于该元素所指向的资源嵌套如当前标签内，这也是为什么要把 js 饭再底部而不是头部。