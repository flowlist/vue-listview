### Static Pagination List

<Phone page="jump" />

:::tip
Static paging lists appear primarily on the PC side to show data that doesn't change frequently, such as company announcements
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
