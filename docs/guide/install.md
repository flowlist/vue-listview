### 依赖项

#### 引入包
```shell script
yarn add @flowlist/vue-listview
// or
npm i @flowlist/vue-listview
```

#### 引入容器
```javascript
// entry.js
import Vue from 'vue'
import { ListView } from '@flowlist/vue-listview'

Vue.component(ListView.name, ListView)
```

#### 引入数据源
```javascript
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import { ListStore } from '@fliwlist/vue-listview'
import * as api from '~/api'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false, // required
  modules: {
    list: ListStore({ api })
  }
})
```

1. `strict`必须设为`false`，因为这个包在`action`里调用了`commit`
2. `list`是命名空间，可搭配`ListView`的`props：namespace`自定义

#### 如果你使用了`nuxt`
`store --> index.js`
```javascript
export const strict = false
```
`store --> list.js`
```javascript
import { ListStore } from '@fliwlist/vue-listview'
import * as api from '~/api'

const list = ListStore({ api })

export const state = list.state

export const mutations = list.mutations

export const actions = list.actions

export const getters = list.getters
```
