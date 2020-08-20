### 依赖项

#### 引入包
```shell script
yarn add @flowlist/vue-vuex
// or
npm i @flowlist/vue-vuex
```

#### 引入模板容器
```javascript
// entry.js
import Vue from 'vue'
import { flowLoader } from '@flowlist/vue-vuex'

Vue.component(flowLoader.name, flowLoader)
```

#### 引入数据源
```javascript
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import { flowStore } from '@fliwlist/vue-vuex'
import * as api from '~/api'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false, // required
  modules: {
    flow: flowStore({ api })
  }
})
```

1. `strict`必须设为`false`，因为这个包在`action`里调用了`commit`
2. `flow`是命名空间，可搭配`flowLoader`的`props：namespace`自定义

#### 如果你使用了`nuxt`
`store --> index.js`
```javascript
export const strict = false
```
`store --> flow.js`
```javascript
import { flowStore } from '@fliwlist/vue-vuex'
import * as api from '~/api'

const flow = flowStore({ api })

export const state = flow.state

export const mutations = flow.mutations

export const actions = flow.actions

export const getters = flow.getters
```
