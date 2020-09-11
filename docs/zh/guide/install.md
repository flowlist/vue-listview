### 安装

#### 下载包
```shell script
yarn add @flowlist/vue-listview
// or
npm i @flowlist/vue-listview
```

#### 引入组件
```javascript
// entry.js
import Vue from 'vue'
import { ListView } from '@flowlist/vue-listview'

Vue.component(ListView.name, ListView)
```

#### 连接Vuex
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

1. `strict = false` 是必选项
2. `list` 是命名空间，你可以配合 `ListView` 的 props `namespace` 来自定义它

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
