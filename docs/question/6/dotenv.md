# 按需加载不同的环境变量文件

::: t
由于项目不同需求，需要配置不同环境变量，按需加载不同的环境变量文件，使用`dotenv`，可以完美解决这一问题。

具体用法在[这里](https://www.npmjs.com/package/dotenv)

```js
const fs = require('fs')
const dotenv = require('dotenv')
const envConfig = dotenv.parse(fs.readFileSync('.env.override'))

...
```

:::