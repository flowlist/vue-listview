# vue-listview

[![npm package](https://badge.fury.io/js/%40flowlist%2Fvue-listview.svg)](https://www.npmjs.com/package/@flowlist/vue-listview)

[![License](https://gitlicense.com/badge/flowlist/vue-listview)](https://github.com/flowlist/vue-listview/blob/master/LICENSE)

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

### simple listview

```vue
<template>
  <div>
    <ul>
      <li v-for="user in users">{{ user.name }}</li>
    </ul>
    <button @click="fetchUsers" v-else>click load next page</button>
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

## Usage

todo
