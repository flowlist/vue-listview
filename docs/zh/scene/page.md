### 静态滚动列表

<Phone page="page" />

:::tip
静态滚动列表主要出现在移动端，用于显示不经常更改的数据，比如我的关注列表

- 组件会在接口的传参时自动维护 **`page`** 字段, 页码从 `1` 开始
- `type` 是 **page**
:::

```vue
<template>
  <ListView
    ref="loader"
    func="getListByPage"
    type="page"
    :auto="3"
    :query="requestParams"
  >
    <ul slot-scope="{ list }">
      <item v-for="item in list" :key="item.id" :item="item" />
    </ul>

    <template #loading>
      custom loading text
    </template>
    
    <template #load>
      click load next page
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
