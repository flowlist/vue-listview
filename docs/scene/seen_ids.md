### Dynamic Unordered List

<Phone page="seen_ids" />

:::tip
TODO
:::

```vue
<template>
  <ListView
    ref="loader"
    func="getListBySeenIds"
    type="seenIds"
    :query="requestParams"
    unique-key="data.number_id"
  >
    <ul slot-scope="{ list }">
      <item v-for="item in list" :key="item.data.number_id" :item="item" />
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
  }
}
</script>
```
