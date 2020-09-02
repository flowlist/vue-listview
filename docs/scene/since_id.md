### Dynamic Ordered List

<Phone page="since_id" />

```vue
<template>
  <ListView
    ref="loader"
    func="getListBySeenIds"
    type="sinceId"
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
