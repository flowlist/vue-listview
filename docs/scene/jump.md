### Static Pagination List

<Phone page="jump" />

:::tip
TODO
:::

```vue
<template>
  <ListView
    ref="loader"
    func="getListByPage"
    type="jump"
    :query="requestParams"
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
        count: 10,
        page: query.page || 1 // 设置请求第一页
      }
    }
  },
  methods: {
    handlePaginationClick(page) {
      // 后续只需要传入 page 就行了，id 等其他参数不需要再传
      this.$refs.loader.jump(page)
    }
  }
}
</script>
```
