### 静态分页列表

<Phone page="jump" />

:::tip
- 静态分页列表主要出现在PC端，用于显示不经常更改的数据，比如公司公告
- `type` 是 **jump**
:::

```vue
<template>
  <ListView
    ref="loader"
    func="getListByPage"
    type="jump"
    :query="requestParams"
  >
    <ul slot-scope="{ list }">
      <item v-for="item in list" :key="item.id" :item="item" />
    </ul>
    
    <template #footer>
       <Pagination @change="handlePaginationClick" />
    </template>
  </ListView>
</template>

<script>
export default {
  computed: {
    requestParams() {
      const { query } = this.$route
      return {
        id: query.id,
        page: query.page || 1,
        count: 10
      }
    }
  },
  methods: {
    handlePaginationClick(page) {
      this.$refs.loader.jump(page)
    }
  }
}
</script>
```
