### 安装

#### 下载包（Vue2.x）
```shell script
yarn add @flowlist/vue-listview@2
```

#### 下载包（Vue3.x）
```shell script
yarn add @flowlist/vue-listview@3
```

#### 引入组件
```javascript
// entry.js
import Vue from 'vue'
import { ListView } from '@flowlist/vue-listview'

Vue.component(ListView.name, ListView)
```

#### 连接（Vuex - Vue2.x）
```javascript
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import { ListStore } from '@flowlist/vue-listview'
import * as api from '~/api'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false, // required
  modules: {
    list: ListStore({ api })
  }
})
```

#### 连接（Vuex - Vue3.x）
```javascript
import { createStore } from 'vuex'
import { ListStore } from '@flowlist/vue-listview'
import * as api from '~/api'

export default createStore({
  strict: false, // required
  modules: {
    list: ListStore({ api })
  }
})

```

1. `strict = false` 是必选项
2. `list` 是命名空间，不能修改

#### 如果你使用了 `nuxt`
`store --> index.js`
```javascript
export const strict = false
```
`store --> list.js`
```javascript
import { ListStore } from '@flowlist/vue-listview'
import * as api from '~/api'

const list = ListStore({ api })

export const state = list.state

export const mutations = list.mutations

export const actions = list.actions

export const getters = list.getters
```
