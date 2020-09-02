### 动态无序列表

<Phone page="seen_ids" />

```vue
<template>
  <ListView
    ref="loader"
    func="getListBySeenIds"
    type="seenIds"
    :query="requestParams"
    unique-key="data.number_id"
  >
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
