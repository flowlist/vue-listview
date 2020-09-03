### Dynamic Ordered List

<Phone page="since_id" />

:::tip
The contents of a dynamic ordered list change constantly, but with an ascending or descending index (id or created_at), such as a list of comments sorted by time

- The parameter automatically carries **`since_id`**
- When you get the next page（`loadMore`）, it represents the id of the last item
- When you get the previous page（`loadBefore`）, it represents the id of the first item
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
