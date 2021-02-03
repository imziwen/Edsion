# ✨ Response Header

## `Content-Disposition`

::: t
用来`激活浏览器的下载`，同时可以设置默认的下载的文件名。

服务端向客户端浏览器发送文件时，如果是浏览器支持的文件类型，如 `TXT`、`JPG` 等类型，会默认直接使用浏览器打开，如果需要提示用户保存，则可以通过配置 `Content-Disposition` 字段覆盖浏览器默认行为。

常用的配置如下：
`Content-Disposition：attachment;filename=FileName.txt`
:::

## Access-Control-Allow-Origin

::: t
用于解决资源的跨域权限问题，域值定义了允许访问该资源的域，支持配置最多`10`个域，若来源请求 `Host` 在域名配置列表之内，则直接填充对应值在返回头部中。

也可以设置通配符 “`*`”，允许被所有域请求。更多说明请见 `Access-Control-Allow-Origin` 匹配模式介绍。

支持输入`“*”` ，或多个域名 /` IP `/ 域名与 `IP`混填（必须包含 `http://` 或 `https://`，填写示例：`http://ufojs.com`,`http://1.1.1.1`， 逗号隔开，至多`66`个）
:::

## Access-Control-Allow-Methods

::: t
用于设置跨域允许的 `HTTP` 请求方法，可同时设置多个方法，如下：
`Access-Control-Allow-Methods`: `POST`, `GET`, `OPTIONS`。
:::

## Access-Control-Max-Age

::: t
用于指定预请求的有效时间，单位为`秒`。
非简单的跨域请求，在正式通信之前，需要增加一次 `HTTP` 查询请求，称为“`预请求`”，用来查明这个跨域请求是不是安全可以接受的，如下请求会被视为非简单的跨域请求：

以 `GET`、`HEAD` 或者 `POST` 以外的方式发起，或者使用 `POST`，但是请求数据类型为 `application / x-www-form-urlencoded`、 `multipart / form-data`、`text / plain` 以外的数据类型，如 `application / xml` 或者 `text / xml`。

使用自定义请求头为：`Access-Control-Max-Age:1728000`，表明在`1728000`秒（20天）内，对该资源的跨域访问不再发送另外一条预请求。
:::

# Access-Control-Expose-Headers

::: t
用于指定哪些头部可以作为响应的一部分暴露给客户端。
默认情况下，只有`6`种头部可以暴露给客户端：`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`、`Pragma`。
如果想让客户端访问到其他的头部信息，可以进行如下设置，当输入多个头部时，需用 “`,`” 隔开，如：`Access-Control-Expose-Headers: Content-Length,X-My-Header`，表明客户端可以访问到 `Content-Length` 和 `X-My-Header` 这两个头部信息。
:::


## Content-Language	

::: t
用于定义页面所使用的语言代码。常用配置如下：
`Content-Language: zh-CN`
`Content-Language: en-US`
:::

## 自定义

::: t
支持添加自定义 `Header`，自定义 `key-value` 设置。

自定义头部参数：由大小写字母、数字及 - 组成，长度支持`1` - `100`个字符。

自定义头部取值：长度为`1` - `1000`个字符，`不支持中文`。
:::