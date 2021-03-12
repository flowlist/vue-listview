### Getters

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
  computed: {
    field() {
      return this.$store.getters['list/get']({
        func: 'funcNameA',
        type: 'page',
        query: {
          count: 10
        }
      })
    }
  }
}
</script>
```
