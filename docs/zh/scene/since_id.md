### 动态有序列表

<Phone page="since_id" />

:::tip
动态有序列表的内容会不断变化，但会使用升序或降序索引(id或created_at)，比如按时间排序的注释列表

- 组件会自动维护 **`since_id`**、**`is_up`** 两个字段
- 当你请求下一页时, `since_id`是列表尾部元素的`id`， `is_up`是`0`
- 当你请求上一页时, `since_id`是列表头部元素的`id`， `is_up`是`1`
- `type` 是 **sinceId**
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
