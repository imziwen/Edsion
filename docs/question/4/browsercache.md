# 浏览器缓存

> 浏览器缓存就是浏览器请求网站留下的资源副本，保存资源副本并在下次请求时直接使用该副本的技术。
> 当浏览器缓存发现请求的资源已经被存储，会拦截请求，返回资源的拷贝，不去服务器重新下载。 前端性能优化一大杀器。

## 浏览器缓存的好处

- 缓解了服务器压力，不需要每次 P 大点静态资源都去服务器请求。
- 提升页面性能，打开本地的缓存速度远超从服务器请求来数据。
- 减少带宽的消耗。

## 浏览器的缓存策略

浏览器对于缓存的处理是根据第一次请求资源时返回的响应头来确定的。

根据响应头,浏览器缓存策略一般分为三种：**强缓存**,**协商缓存**和**启发式缓存**。

### 常见的字段和指令

```js
expires: 告知客户端资源缓存失效的绝对时间
last-modified:资源最后一次修改的时间
Etag:文件的特殊标识
cache-control:告诉客户端或是服务器如何处理缓存。
cache-control:{
    private:表示客户端可以缓存
    public:表示客户端和代理服务器都可缓存.如果没有明确指定private，则默认为public
    no-cache:表示需要可以缓存，但每次用应该去向服务器验证缓存是否可用
    no-store:表示所有内容都不会缓存，强制缓存，对比缓存都不会触发
    max-age=xxx:表示缓存的内容将在 xxx 秒后失效
}
```

### 强缓存

给浏览器缓存设置过期时间，超过这个时间之后缓存就是过期,浏览器需要重新请求。

**强缓存主要是通过 http 请求头中的 `Cache-Control` 和 `Expires` 两个字段控制。**

**expires**

- expires 是一个 HTTP/1.0 的字段,它给浏览器设置了一个绝对时间，当浏览器时间超过这个绝对时间之后，重新向服务器发送请求。

```js
//它描述的是一个绝对时间,用GMT格式的字符串表示
Expires: Wed Feb 26 2018 08:34:17 GMT
```

```html
<!--可以在html中使用-->
<meta http-equiv="expires" content="Wed Feb 26 2018 08:34:17 GMT" />
```

**缺点**

- Expires 返回的是服务器的时间，判断时却用客户端的时间 ，由于用户可能改变客户端的时间，导致判断出错，为此引入了 Cache-Contril:max-age。

**Cache-Control:max-age=2000**

- http1.1 中提出了 `Cache-Control:max-age=2000`，与 `Expires` 思路相同，都设置了过期时间。
- 与 `Expires` 不同的是，`max-age`设置的是相对缓存时间开始往后多少秒，所以不会再受日期不准确的情况影响。
- `max-age` > `Expires`，前者优先级大于后者，同时出现时，前后将覆盖后者。

```js
// 表示资源会在2000秒后过期，过期后需再次请求。
Cache-Control:max-age = 2000
```

- 强缓存的优先级高，如果在设置的过期时间内，缓存的那个资源在服务器上已经更新了，客户端不能及时拿到最新的资源。 => 协商缓存来了

### 协商缓存

解决无法及时更新资源问题，利用（`Last-Modified`、`If-Modified-Since`）和（`Etag`、`If-None-Match`）这两对 `header` 来对资源做标识，然后由服务器做分析，如果资源未更新，则返回 `304` 状态码，浏览器会从缓存中读取资源，否则重新请求资源。

**Last-Modified(最后一次修改时间) 与 If-Modified-Since(某某时刻修改的，取前者的值)**

- 1. 浏览器第一次向服务器请求资源，服务器在返回这个资源的同时，在 `response` 的 `header` 中加上 `Last-Modified` 的 `header`，表示这个资源文件在服务器上的最后修改时间`Last-Modified:Wed Feb 26 2018 08:34:17 GMT`

- 2. 浏览器之后再向服务器请求这个资源时，会在`request`的`header`中加上`If-Modified-Since`的`header`,值为上次请求这个资源时返回的`Last-Modified`的值：`Wed Feb 26 2018 08:34:17 GMT`
- 3. 服务器再次收到这个资源请求时，**会根据浏览器传过来的 `request` `header` 中 `If-Modified-Since` 的修改时间判断资源是否有变化。** 如果无变化，则 **返回 `304 Not Modified`,不返回资源内容** ；如有变化，正常返回 200 码资源内容。

  - 当服务器返回 `304 Not Modified` 响应时，`response` 中 `header` 不会再添加 `Last-Modified`。

- 4. 浏览器收到 `304` 的响应后，知道本地资源还没过期，就从缓存中加载资源。
- 5. 浏览器收到 `200` 的响应后，则从服务器重新加载资源，同时，`Last-Modified` 的 `header` 值会更新。下次请求时，`If-Modified-Since` 会启用上次返回的 `Last-Modified`。

#### 缺点

`Last-Modified`、`If-Modified-Since`都是根据服务器时间返回的`header`，一般来说，在没有调整服务器时间和篡改客户端缓存的情况下，这两个`header`配合起来管理协商缓存是非常可靠的，但是它们是以秒为单位进行更新，如果小于该单位高频进行更新的话，则不适合采用该方法。 这时候协商缓就不那么的可靠了。所以就有了另外一对`header`来管理协商缓存，这对`header`就是`ETag`、`If-None-Match`。

**Etag(标签)、If-None-Match(如果不匹配)**

- 1. 浏览器第一次跟服务器请求一个资源，服务器在返回这个资源的同时，在 `response` 的 `header` 加上 `ETag`，**这个 `header` 是服务器根据当前请求的资源生成的一个唯一标识**，这个唯一标识是一个字符串，`ETag: 5e705774-1396` 只要资源有变化这个串就不同，跟最后修改时间没有关系，所以能很好的补充 `Last-Modified` 的问题.
- 2. 浏览器再次跟服务器请求这个资源时，在 `request` 的 `header` 上加上 `If-None-Match` 的 `header`，这个 `header` 的值就是上一次请求时返回的 `ETag` 的值 `If-None-Match: 5e705774-1396`。
- 3. 服务器再次收到这个带`If-None-Match` 的请求时，会根据资源再生成一次 `ETag`，如果新生成的 `ETag` 与 `If-None-Match` 的值相同的话，说明资源没有修改并返回 `304 Not Modified`【由于 `ETag` 重新生成过，`response header` 中还会把这个 `ETag` 返回，即使跟之前没有变化】，反之则被修改过并返回 `200` 以及资源内容。

**`ETag` 相对于 `Last-Modified` 也有其优势，可以更加准确的判断文件内容是否被修改， 从而在实际操作中实用程度也更高,但缺点也很明显,由于需要对资源进行生成标识，性能方面就势必有所牺牲。**


<img src="/img/question/network/cache304.png" alt="cache" title="cache" class="zoom-custom-imgs">


**`ETag` 与 `If-None-Match` > `Last-Modified` 与 `If-Modified-Since`, 同时存在时, 前者覆盖后者.**

### 优先级总结

`Cache-Control` > `Expires` > `ETag` > `Last-Modified`
