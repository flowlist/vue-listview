### 动态无序列表

<Phone page="seen_ids" />

:::tip
动态无序列表经常出现在按热度排序的列表中，比如`HackerNews`

- 组件会自动维护 **`seen_ids`** 这个参数，代表列表已加载的所有元素的`id`拼接成的字符串，如：`1,2,3,4,5`
- `type` 是 **seenIds**
:::

```vue
<template>
  <ListView
    ref="loader"
    func="getListBySeenIds"
    type="seenIds"
    :query="requestParams"
    display-no-more
    unique-key="data.number_id"
  >
    <ul slot-scope="{ list }">
      <item v-for="item in list" :key="item.data.number_id" :item="item" />
    </ul>
    
    <template #no-more>
      custom no more text
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
        count: 10
      }
    }
  }
}
</script>
```
