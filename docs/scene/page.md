### Static Scroll List

<Phone page="page" />

:::tip
TODO
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
