### SSR

```vue
<template>
  <ListView
    func="funcNameA"
    type="page"
    query="{ count: 10 }"
  >
    <!--  data  -->
  </ListView>
</template>

<script>
export default {
  async asyncData({ store }) {
    await store.dispatch('list/initData', {
      func: 'funcNameA',
      type: 'page',
      query: {
        count: 10
      }
    })
  }
}
</script>
```
