### Slots

```vue
<template>
  <ListView
    func="funcName"
    type="listType"
  >
    <header slot="header" slot-scope="{ source }">
      <!--   You can render list header at here. eg：title、total   -->
    </header>

    <ul slot-scope="{ list, total, count, extra }">
      <!--   You can use v-for list to render items   -->
    </ul>

    <footer slot="footer" slot-scope="{ source }">
      <!--   You can render list footer at here. eg：Pagination  -->
    </footer>
    
    <template #first-error="{ error }">
      <!--   
      When you set props use-first-error is true
      and
      first request rejected
      -->
    </template>

    <template #error="{ error }">
      <!--   When request rejected and not display first error   -->
    </template>

    <template #first-loading>
      <!--
      When you set props use-first-loading is true
      and
      first request pending
      -->
    </template>

    <template #loading>
      <!--   When request pending and not display first loading   -->
    </template>
  
    <template #nothing>
      <!--   When first request resolved but no data response  -->
    </template>

    <template #no-more>
      <!--   When not first request resolved but no data response  -->
    </template>
    
    <template #load>
      <!--
      When you want custom load next page btn text
      and
      not auto load mode
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

