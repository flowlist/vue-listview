### Dependencies

#### Import package
```shell script
yarn add @flowlist/vue-listview
// or
npm i @flowlist/vue-listview
```

#### Import component
```javascript
// entry.js
import Vue from 'vue'
import { ListView } from '@flowlist/vue-listview'

Vue.component(ListView.name, ListView)
```

#### Import vuex
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

1. `strict = false` is required
2. `list` is `namespace`，you can custom it with `ListView props namespace`

#### if you use `nuxt`
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
