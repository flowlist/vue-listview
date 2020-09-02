### Slots

```vue
<template>
  <ListView
    func="fetchData"
    type="page"
  >
    <header slot="header" slot-scope="{ source }">
      <!--   you can render list header at here. eg：title、total   -->
    </header>

    <ul slot-scope="{ list, total, count, extra }">
      <!--   you can use v-for list to render items   -->
    </ul>

    <footer slot="footer" slot-scope="{ source }">
      <!--   you can render list footer at here. eg：Pagination  -->
    </footer>
    
    <template #first-error="{ error }">
      <!--   
      when you set props use-first-error is true
      and
      first request rejected
      -->
    </template>

    <template #error="{ error }">
      <!--   when request rejected and not display first error   -->
    </template>

    <template #first-loading>
      <!--
      when you set props use-first-loading is true
      and
      first request pending
      -->
    </template>

    <template #loading>
      <!--   when request pending and not display first loading   -->
    </template>
  
    <template #nothing>
      <!--   when first request resolved but no data response  -->
    </template>

    <template #no-more>
      <!--   when not first request resolved but no data response  -->
    </template>
    
    <template #load>
      <!--
      when you want custom load next page btn text
      and
      not auto load mode
      and
      props type not jump
      -->
    </template>
  </ListView>
</template>
```

#### default source schema
```json
{
  "result": [],
  "noMore": false,
  "nothing": false,
  "loading": false,
  "error": null,
  "extra": null,
  "fetched": false,
  "page": 0,
  "total": 0
}
```

