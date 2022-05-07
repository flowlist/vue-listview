### Static Scroll List

<Phone page="page" />

:::tip
Static scroll list appear primarily on the mobile side to show data that doesn't change frequently, such as my follow list

- The parameter automatically carries **`page`**, start from `1`
:::

```vue
<template>
  <ListView
    ref="loader"
    func="getListByPage"
    type="page"
    :autoload="3"
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
