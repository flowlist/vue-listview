### 静态分页列表

<Phone page="jump" />

:::tip
静态分页列表常见于 PC 端
:::

```vue
<template>
  <FlowLader
    ref="loader"
    func="getListByPage"
    type="jump"
    :query="requestParams"
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
