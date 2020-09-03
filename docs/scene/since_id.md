### Dynamic Ordered List

<Phone page="since_id" />

:::tip
TODO
:::

```vue
<template>
  <ListView
    ref="loader"
    func="getListBySeenIds"
    type="sinceId"
    :query="requestParams"
  >
    <template #header>
      <button @click="fetchUp">向上获取</button>
      <button @click="refresh">刷新页面</button>
    </template>

    <ul slot-scope="{ list }">
      <item v-for="item in list" :key="item.id" :item="item" />
    </ul>
  </ListView>
</template>

<script>
export default {
  computed: {
    requestParams() {
      const { query } = this.$route
      return {
        id: query.id,
        count: 10
      }
    }
  },
  methods: {
    fetchUp() {
      this.$refs.loader.loadBefore()
    },
    refresh() {
      this.$refs.loader.refresh()
    }
  }
}
</script>
```
