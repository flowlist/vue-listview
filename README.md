# vue-listview [![npm package](https://badge.fury.io/js/%40flowlist%2Fvue-listview.svg)](https://www.npmjs.com/package/@flowlist/vue-listview)  [![License](https://gitlicense.com/badge/flowlist/vue-listview)](https://github.com/flowlist/vue-listview/blob/master/LICENSE)

> todo

---

## Installation

```bash
npm install @flowlist/vue-listview
# or
yarn add @flowlist/vue-listview
```

## Why?

todo

### display a basic listview

```vue
<template>
  <div>
    <ul>
      <li v-for="user in users">{{ user.name }}</li>
    </ul>
    <button @click="fetchUsers">click load next page</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    users: [],
    page: 1
  }),

  methods: {
    fetchUsers() {
      getUsers({ page: this.page })
        .then(users => {
          this.users = this.users.concat(users)
          this.page++
        })
    },
  },

  created() {
    this.fetchUsers()
  }
}
</script>
```

### display the listview state

```vue
<template>
  <div>
    <p v-if="error">Error: {{ error.message }}</p>
    <p v-else-if="loading">Loading...</p>
    <p v-else-if="nothing">Nothing...</p>
    <ul v-else>
      <li v-for="user in users">{{ user.name }}</li>
    </ul>
    <p v-if="noMore">End...</p>
    <button @click="fetchUsers" v-else>click load next page</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    nothing: false,
    error: null,
    noMore: false,
    users: [],
    page: 1
  }),

  methods: {
    fetchUsers() {
      if (this.loading) {
        return
      }
      this.error = null
      this.loading = true
      getUsers({ page: this.page })
        .then(users => {
          this.users = this.users.concat(users)
          this.nothing = !this.users.length
          this.noMore = this.users.length && !user.length
          this.page++
        })
        .catch(error => {
          this.error = error
        })
        .finally(() => {
          this.loading = false
        })
    },
  },

  created() {
    this.fetchUsers()
  }
}
</script>
```

### one page display multiple listview

```vue
<template>
  <tab-container>
    <template #tab-1>
      <p v-if="state1.error">Error: {{ state1.error.message }}</p>
      <p v-else-if="state1.loading">Loading...</p>
      <p v-else-if="state1.nothing">Nothing...</p>
      <ul v-else>
        <li v-for="user in state1.users">{{ user.name }}</li>
      </ul>
      <p v-if="state1.noMore">End...</p>
      <button @click="fetchList1" v-else>click load next page</button>
    </template>

    <template #tab-2>
      <p v-if="state2.error">Error: {{ state2.error.message }}</p>
      <p v-else-if="state2.loading">Loading...</p>
      <p v-else-if="state2.nothing">Nothing...</p>
      <ul v-else>
        <li v-for="user in state2.users">{{ user.name }}</li>
      </ul>
      <p v-if="state2.noMore">End...</p>
      <button @click="fetchList2" v-else>click load next page</button>
    </template>
  </tab-container>
</template>

<script>
export default {
  data: () => ({
    state1: {
      loading: false,
      nothing: false,
      error: null,
      noMore: false,
      data: [],
      page: 1
    },
    state2: {
      loading: false,
      nothing: false,
      error: null,
      noMore: false,
      data: [],
      page: 1
    }
  }),

  methods: {
    fetchList1() {
      if (this.state1.loading) {
        return
      }
      this.state1.error = null
      this.state1.loading = true
      getList1Data({ page: this.state1.page })
        .then(users => {
          this.state1.data = this.state1.data.concat(users)
          this.state1.nothing = !this.state1.data.length
          this.state1.noMore = this.state1.data.length && !user.length
          this.state1.page++
        })
        .catch(error => {
          this.state1.error = error
        })
        .finally(() => {
          this.state1.loading = false
        })
    },
    fetchList2() {
      if (this.state2.loading) {
        return
      }
      this.state2.error = null
      this.state2.loading = true
      getList2Data({ page: this.state2.page })
        .then(users => {
          this.state2.data = this.state2.data.concat(users)
          this.state2.nothing = !this.state2.data.length
          this.state2.noMore = this.state2.data.length && !user.length
          this.state2.page++
        })
        .catch(error => {
          this.state2.error = error
        })
        .finally(() => {
          this.state2.loading = false
        })
    },
  },

  created() {
    this.fetchList1()
  }
}
</script>
```

### one app has many page

> You want repeat the same code again and again?

## Usage

```vue
<template>
  <tab-container>

    <template #tab-1>
      <ListView
        func="fetchList1"
        type="page"
      >
        <ul slot-scope="{ list }">
          <li v-for="user in list">{{ user.name }}</li>
        </ul>
      </ListView>
    </template>

    <template #tab-2>
      <ListView
        func="fetchList2"
        type="page"
      >
        <ul slot-scope="{ list }">
          <li v-for="user in list">{{ user.name }}</li>
        </ul>
      </ListView>
    </template>

  </tab-container>
</template>

<script>
export default {
  data: () => ({
    // no data...
  }),
  methods: {
    // no code...
  }
}
</script>
```

[document](https://flowlist.github.io/vue-listview/guide/install.html)

## API Reference

[props document](https://flowlist.github.io/vue-listview/loader/props.html)

[slots document](https://flowlist.github.io/vue-listview/loader/slots.html)

## License

[MIT](https://github.com/flowlist/vue-listview/blob/master/LICENSE)
