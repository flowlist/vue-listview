### 动态有序列表

<Phone page="since_id" />

```vue
<template>
  <FlowLader
    ref="loader"
    func="getListBySeenIds"
    type="sinceId"
    :query="requestParams"
    unique-key="data.number_id"
  >
  </FlowLader>
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
