### Slots

```vue
<template>
  <ListView
    func="funcName"
    type="listType"
  >
    <header slot="header" slot-scope="{ source }">
      <!--   你可以在这里渲染列表的头部. 如：标题、总数   -->
    </header>

    <ul slot-scope="{ list, total, count, extra }">
      <!--   你可以通过 v-for="item in list" 来渲染列表   -->
    </ul>

    <footer slot="footer" slot-scope="{ source }">
      <!--   你可以在这里渲染列表的地步. 如：分页器组件  -->
    </footer>
    
    <template #first-error="{ error }">
      <!--   当你想为首屏的接口异常设置特殊提示时  -->
    </template>

    <template #error="{ error }">
      <!--   当接口响应错误时   -->
    </template>

    <template #first-loading>
      <!--    当你想为首屏的接口等待设置特殊提示时  -->
    </template>

    <template #loading>
      <!--   当列表正在等待接口响应时   -->
    </template>
  
    <template #nothing>
      <!--   当列表为空列表时  -->
    </template>

    <template #no-more>
      <!--   当列表已经完全加载没有更多数据时  -->
    </template>
    
    <template #load>
      <!--    当你想自定义加载下一页的文案时（自动加载模式下无效） -->
    </template>
  </ListView>
</template>
```

#### 默认`source`的格式
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

