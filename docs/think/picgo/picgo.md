# 写文章没有床？PicGo图床（腾讯云COS）

> 写个`.md`文章 ，其中没有图片还好，有图片且`md`在本地使用也还好，可总不能自己捂着吧😄
>
> 调研一番，并成功上车。本想用七牛云的，可一想，自己的域名和服务器都在腾讯云，还是选择了腾讯云🤦‍♂️

## 开源免费PicGo

![](https://czw-1256685712.cos.ap-beijing.myqcloud.com/img/picgo-2.0.gif)

![](https://czw-1256685712.cos.ap-beijing.myqcloud.com/img/34242310-b5056510-e655-11e7-8568-60ffd4f71910.gif)

**借用下作者的GIF** 🤦‍♂️

![](https://czw-1256685712.cos.ap-beijing.myqcloud.com/img/picgo1.png)

   **首次体验图床的魅力 -- 上图**

​	附上下载[链接](https://github.com/Molunerfinn/PicGo)

​	直接拖动图片到工具栏，马上返回线上地址（贴心的是直接`md`链接写法，直接黏贴到文件中就ok）

## 配置腾讯云COS v5

- 先去腾讯云弄个 [`bucket`桶](https://console.cloud.tencent.com/cos5/bucket)

- 找到你的`桶名称`和`存储区域代码`

  ![](https://czw-1256685712.cos.ap-beijing.myqcloud.com/img/picgo02.png)

- **[获取你的APPID、SecretId和SecretKey](https://console.cloud.tencent.com/cam/capi)**

  ![](https://czw-1256685712.cos.ap-beijing.myqcloud.com/img/picgo03.png)

- 设置PicGo，记得选V5

  ![](https://czw-1256685712.cos.ap-beijing.myqcloud.com/img/picgo04.png)

- 配置存储桶的访问权限（此步在创建桶的时候就有勾选项）

  ![](https://czw-1256685712.cos.ap-beijing.myqcloud.com/img/picgo05.png)

  

- 综上，可以开心愉快的开始`markDown`生活了。（其它`床`🛏同理）