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
