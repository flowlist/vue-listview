### SSR

```vue
<template>
  <FlowLoader
    func="funcNameA"
    type="page"
    query="{ count: 10 }"
  >
    <-- data -->
  </FlowLoader>
</template>

<script>
export default {
  async asyncData({ store }) {
    await store.dispatch('flow/initData', {
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
