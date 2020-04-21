# 跨域
 > 处于安全考虑，浏览器实行同源策略。协议、域名、端口有一个不同就是跨域。
 ## JSONP
 
 ::: t
利用 `<script>` 标签没有跨域限制的漏洞。通过 `<script>`标签指向一个需要访问的地址并提供一个回调函数来接收数据。
 ```html
<script src="http://ufojs.com/api?param1=a&param2=b&callback=jsonp"></script>
<script>
    function jsonp(data) {
    	console.log(data)
	}
</script>  

```
**仅限于get请求**<br>
为了方便使用，建议自己封装，简单来一个：

```javascript
function jsonp(url,jsonpCallback,sucess) {
  let script = document.createElement('script')
  script.src = url
  script.async = true
  script.type = 'text/javascript'
  window[jsonpCallback] = function (data) {
    sucess && sucess(data)
  } 
  document.body.appendChild(script) 
}



jsonp('http://ufojs.com','jp',function(value) {
  console.log(values)
})
```
 :::

## CORS

> 需要服务端设置 `Access-Control-Allow-Origin : xxx.com` 表示哪些域名可以访问。
