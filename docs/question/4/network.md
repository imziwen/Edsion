# ☆ 从输入 URL 到看到页面发生的全过程

## ##最新修改##
> 最近看了李兵老师讲解浏览器的文章，对从输入 URL 到看到页面发生的全过程这个问题有了更深层次的认知，总结如下：
>
>
<img src="/img/question/network/urltoview.png" alt="从输入 URL 到看到页面发生的全过程" title="从输入 URL 到看到页面发生的全过程" class="zoom-custom-imgs">



<!-- ## 总体大致分为以下过程： -->

> 以前的浅显认知
1. 浏览器查找当前 URL 是否存在缓存，并比较缓存是否过期。
2. DNS 解析 URL 对应的 IP。
3. 根据 IP 建立 TCP 连接（三次握手）。
4. HTTP 发起请求。
5. 服务器处理请求，浏览器接收 HTTP 响应。
6. 浏览器解析渲染页面。
7. 关闭 TCP 连接（四次挥手）。

## 1. 浏览器查找当前 URL 是否存在缓存。

::: cd
浏览器首先查询当前 URL 是否有缓存,有的话,再查询是否过期,没过期则读缓存.过期了则访问 web 服务器。

**[重点：浏览器缓存](https://ufojs.com/question/4/browsercache.html)**
:::

## 2. 解析 URL 对应的 IP 地址

::: cd

1. 浏览器查看自己的 DNS 缓存是否存在。
2. 如果没找到 DNS 缓存，浏览器会接着查找本地的 hosts 文件中是否有这个网址与某个 IP 的映射关系，如果有就调用这个映射 IP，完成域名解析。
3. 如果 hosts 也没有找到，则会在操作系统缓存中查找本地的 DNS 解析器缓存，如果找到则返回。
4. 如果操作系统本地没找到，则会在路由器缓存中进行查找，如果找到则返回。
5. 如果还是没找到，则会通过运营商的 DNS 域名解析服务拿到 IP 地址。

:::

## 3. TCP 建立连接（三次握手）

:::cd

如下图所示，tcp 建立连接的过程：
<img src="/img/question/network/tcp3.png" alt="tcp" title="tcp" class="zoom-custom-imgs">

- 第一次握手

  - `SYN = 1`， `seq(client) = x`
    客户端向服务端发送连接请求报文段。该报文段中包含自身的数据通讯初始序号。请求发送后，客户端便进入 `SYN-SENT` 状态。

- 第二次握手

  - `SYN = 1`，`ACK = x + 1`，`seq(server) = y`服务端收到连接请求报文段后，如果同意连接，则会发送一个应答，该应答中也会包含自身的数据通讯初始序号，发送完成后便进入`SYN-RECEIVED` 状态

- 第三次握手

  - `ACK = y + 1`，s `seq(client) = y + 1`
    客户端收到连接同意的应答后，还要向服务端发送一个确认报文。客户端发完这个报文段后便进入 `ESTABLISHED` 状态，服务端收到这个应答后也进入 `ESTABLISHED` 状态，此时连接建立成功。

#### 为什么是三次握手？二次，四次不行？

- 第一次：

  > Client 什么都不能确认
  >
  > Server 确认了对方发送正常

- 第二次

  > Client 确认：自己发送/接收正常，对方发送/接收正常
  >
  > Server 确认：自己接收正常 ，对方发送正常

- 第三次

  > Client 确认：自己发送/接收正常， 对方发送/接收正常
  >
  > Server 确认：自己发送/接收正常，对方发送/接收正常

**所以通过三次握手确认双方收发功能都正常，二次无法确认，四次也可以但是显得比较多余。**

:::

## 4. HTTP 发起请求、服务器处理请求、浏览器接收 HTTP 响应

::: cd

### HTTP 请求

- 完整的 HTTP 请求包含请求行、请求头、请求体三部分。

<img src="/img/question/network/http1.png" alt="http" title="http" class="zoom-custom-imgs">

- 服务器收到浏览器发送的 HTTP 请求之后，会将收到的 HTTP 报文封装成 HTTP 的 Request 对象，并通过不同的 web 服务器进行处理，处理完的结果以 HTTP 的 Response 对象返回，主要包括状态码、响应头、响应报文三个部分。
- 完整的 HTTP 请求报文一般包括：通用头部、请求/响应头部、请求/响应体

#### 通用头部

```js
//General

Request Url: 请求的web服务器地址

Request Method: 请求方式
（GET、POST、OPTIONS、PUT、HEAD、DELETE、CONNECT、TRACE）

Status Code: 请求的返回状态码，如200代表成功

Remote Address: 请求的远程服务器地址（会转为IP）

Referrer Policy: (引用策略) 用来监管哪些访问来源信息 (IE暂不支持)

```

#### 请求/响应头部

**常用的请求头部分：**

```js

Accept: 接收类型，表示浏览器支持的MIME类型
（对标服务端返回的Content-Type）

Accept-Encoding: 浏览器支持的压缩类型,如gzip等,超出类型不能接收

Content-Type：客户端发送出去实体内容的类型

Cache-Control: 指定请求和响应遵循的缓存机制，如no-cache

If-Modified-Since：对应服务端的Last-Modified，用来匹配看文件是否变动，只能精确到1s之内，http1.0中

Expires：缓存控制，在这个时间内不会请求，直接使用缓存，http1.0，而且是服务端时间

Max-age：代表资源在本地缓存多少秒，有效时间内不会请求，而是使用缓存，http1.1中

If-None-Match：对应服务端的ETag，用来匹配文件内容是否改变（非常精确），http1.1中

Cookie: 有cookie并且同域访问时会自动带上

Connection: 当浏览器与服务器通信时对于长连接如何进行处理,如keep-alive

Host：请求的服务器URL

Origin：最初的请求是从哪里发起的（只会精确到端口）,Origin比Referer更尊重隐私

Referer：该页面的来源URL(适用于所有类型的请求，会精确到详细页面地址，csrf拦截常用到这个字段)

User-Agent：用户客户端的一些必要信息，如UA头部等

```

**常用的响应头部分：**

```js
Access-Control-Allow-Headers: 服务器端允许的请求Headers

Access-Control-Allow-Methods: 服务器端允许的请求方法

Access-Control-Allow-Origin: 服务器端允许的请求Origin头部（譬如为*）

Content-Type：服务端返回的实体内容的类型

Date：数据从服务器发送的时间

Cache-Control：告诉浏览器或其他客户，什么环境可以安全的缓存文档

Last-Modified：请求资源的最后修改时间

Expires：应该在什么时候认为文档已经过期,从而不再缓存它

Max-age：客户端的本地资源应该缓存多少秒，开启了Cache-Control后有效

ETag：请求变量的实体标签的当前值

Set-Cookie：设置和页面关联的cookie，服务器通过这个头部把cookie传给客户端

Keep-Alive：如果客户端有keep-alive，服务端也会有响应（如timeout=500）

Server：服务器的一些相关信息

```

- 一般来说，请求头部和响应头部是匹配分析的。<br>
- 比如，请求头部的`Accept`要和响应头部的`Content-Type`匹配，否则会报错。<br>
- 比如，跨域请求时，请求头部的`Origin`要匹配响应头部的`Access-Control-Allow-Origin`，否则会报跨域错误。<br>
- 比如，在使用缓存时，请求头部的`If-Modified-Since`、`If-None-Match`分别和响应头部的`Last-Modified`、`ETag`对应。

### 请求/响应实体

请求实体中会将一些需要的参数都放入进入（用于 post 请求）。

譬如实体中可以放参数的序列化形式（a=1&b=2 这种），或者直接放表单对象（Form Data 对象，上传时可以夹杂参数以及文件），等等。

一般响应实体中，就是放服务端需要传给客户端的内容。

一般现在的接口请求时，实体中就是对于的信息的 json 格式，而像页面请求这种，里面就是直接放了一个 html 字符串，然后浏览器自己解析并渲染。

<img src="/img/question/network/httpstatus.png" alt="https" title="https" class="zoom-custom-imgs">


:::

## 5. 浏览器解析渲染页面

::: cd
浏览器内核拿到内容后，渲染步骤大致可以分为以下几步：

> 1.  解析 HTML，构建 DOM 树
> 2.  解析 CSS，生成 CSS 规则树
> 3.  合并 DOM 树和 CSS 规则，生成 render 树
> 4.  布局 render 树（Layout/reflow），负责各元素尺寸、位置的计算
> 5.  绘制 render 树（paint），绘制页面像素信息
> 6.  浏览器会将各层的信息发送给 GPU，GPU 会将各层合成（composite），显示在屏幕上

reflow：也称作 layout，中文叫回流，一般意味着元素的内容、结构、位置或尺寸发生了变化，需要重新计算样式和渲染树，这个过程称为 reflow。

repaint：中文重绘，意味着元素发生的改变只是影响了元素的一些外观之类的时候(例如：背景色，边框颜色，文字颜色等)，此时只需要应用新样式绘制这个元素就可以了。

1. 根据 HTML 解析 DOM 树
   - 根据 HTML 的内容，将标签按照结构解析成为 DOM 树，DOM 树解析的过程是一个深度优先遍历。即先构建当前节点的所有子节点，再构建下一个兄弟节点。
   - 在读取 HTML 文档，构建 DOM 树的过程中，若遇到 script 标签，则 DOM 树的构建会暂停，直至脚本执行完毕。
2. 根据 CSS 解析生成 CSS 规则树
   - 解析 CSS 规则树时 js 执行将暂停，直至 CSS 规则树就绪。
   - 浏览器在 CSS 规则树生成之前不会进行渲染。
3. 结合 DOM 树和 CSS 规则树，生成渲染树
   - DOM 树和 CSS 规则树全部准备好了以后，浏览器才会开始构建渲染树。
   - 精简 CSS 并可以加快 CSS 规则树的构建，从而加快页面相应速度。
4. 根据渲染树计算每一个节点的信息（布局）
   - 布局：通过渲染树中渲染对象的信息，计算出每一个渲染对象的位置和尺寸。
   - 回流：在布局完成后，发现了某个部分发生了变化影响了布局，那就需要倒回去重新渲染。
5. 根据计算好的信息绘制页面

   - 绘制阶段，系统会遍历呈现树，并调用呈现器的“paint”方法，将呈现器的内容显示在屏幕上。
   - 重绘 `repaint`：某个元素的背景颜色，文字颜色等，不影响元素周围或内部布局的属性，将只会引起浏览器的重绘。
   - 回流 `reflow`：某个元素的尺寸发生了变化，则需重新计算渲染树，重新渲染。
    <img src="/img/question/network/domrender.png" alt="domrender" title="domrender" class="zoom-custom-imgs">

:::

## 6. TCP 关闭连接（四次挥手）

:::cd
    <img src="/img/question/network/tcp4.png" alt="tcp" title="tcp" class="zoom-custom-imgs">

- 第一次挥手：
  - Client 发送一个 FIN，用来关闭 Client 到 Server 的数据传送，Client 进入 FIN_WAIT_1 状态。(第一次挥手：由浏览器发起的，发送给服务器，我请求报文发送完了，你准备关闭吧)
- 第二次挥手：
  - Server 收到 FIN 后，发送一个 ACK 给 Client，确认序号为收到序号+1（与 SYN 相同，一个 FIN 占用一个序号），Server 进入 CLOSE_WAIT 状态。(第二次挥手：由服务器发起的，告诉浏览器，我请求报文接受完了，我准备关闭了，你也准备吧)
- 第三次挥手：
  - Server 发送一个 FIN，用来关闭 Server 到 Client 的数据传送，Server 进入 LAST_ACK 状态。(第三次挥手：由服务器发起，告诉浏览器，我响应报文发送完了，你准备关闭吧)
- 第四次挥手：
  - Client 收到 FIN 后，Client 进入 TIME_WAIT 状态，接着发送一个 ACK 给 Server，确认序号为收到序号+1，Server 进入 CLOSED 状态，完成四次挥手。(第四次挥手：由浏览器发起，告诉服务器，我响应报文接受完了，我准备关闭了，你也准备吧)

:::

## 端口

::: cd
用来标识同一个主机上通信的不同应用程序

一个端口只能分配给一个应用程序，如果服务器有两个程序 A 和 B，分别启动了 A 服务 B 服务，它们监听同一个端口，那有数据来的时候，将无法判断这个数据分给 A 还是 B。

:::
