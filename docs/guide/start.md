### 快速上手

#### 引入
```sh
npm install @bilibili/sakura
```

#### 全局使用
```javascript
import Vue from 'vue'
import SakuraUI from '@bilibili/sakura'
import '@bilibili/sakura/lib/theme-sakura/index.css'

Vue.use(SakuraUI)
```

#### 按需加载
1. 首先，安装 [babel-plugin-component](https://github.com/ElementUI/babel-plugin-component)

> PS：需要 Node 版本 >= 10
   
```sh
npm install babel-plugin-component -D
```

2. 然后，将`.babelrc`修改为：
```json
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "@bilibili/sakura",
        "styleLibraryName": "theme-sakura"
      }
    ]
  ]
}
```

3. 引入组件：
```javascript
import { VButton } from '@bilibili/sakura'
```

4. 暗色模式：
```html
<body class="night-mode">
</body>
```
