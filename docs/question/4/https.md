# Https

> HTTPS 全称：Hyper Text Transfer Protocol over Secure Socket Layer
>
> HTTP 的增强版。在 http 的基础上增加 SSL 加密协议。

请看下图，简单理解 https 的加密原理:

<img src="/img/question/network/https.png" alt="https" title="https" class="zoom-custom-imgs">

- 客户端向服务器端索要并验证公钥。这一阶段使用的是非对称加密传输(RSA),服务端将数字证书发给客户端.其中数字证书包括:公钥和数字签名.客户端在拿到后对两者进行校验.
- 在非对称加密传输中,两端协商生成"对话密钥"。
- 双方采用"对话密钥"进行对称加密通信。

## http 主要作用

- 对数据进行加密，并建立一个信息安全通道，来保证传输过程中的数据安全。
- 对网站进行真实身份认证。

## http 与 https 的区别

- http 是明文传输，https 通过 SSL\TLS 进行了加密，是介于 TCP 和 HTTP 之间的一层安全协议，不影响原有的 TCP 协议和 HTTP 协议，所以使用 HTTPS 基本上不需要对 HTTP 页面进行太多的改造。
- http 的端口号是 80，https 是 443.
- https 需要到 CA 申请证书，付费免费的都有。
- http 连接是无状态的；https 协议是由 SLL+http 协议构建的可进行加密传输、身份认证的网络协议，比 http 协议安全。
