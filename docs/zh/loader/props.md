### Props

```vue
<template>
  <ListView
    func="required.call.function.name.string"
    type="required.list.type.string"
    namespace="list"
    unique-key="id"
    lazy-mode="observe"
    :query="{}"
    :auto="-1"
    :preload="200"
    :cache-timeout="0"
    :error-client-retry="true"
    :scroll-x="false"
    :success-callback="null"
    :error-callback="null"
  >
    <!--  slot  -->
  </ListView>
</template>
```


| Name | Type | Default | Description |
| --- | --- | --- | ---- |
| `*`func | string | - | 从 `vuex` 注入的 API 列表中的某个函数名 |
| `*`type | string | - | `场景`值中的 type：`jump`、`page`、`sinceId`、`seenIds` |
| query | object | - | 需要透传到 API 层的数据 |
| uniqueKey | string | id | 每个元素在 v-for 的时候都需要一个 key，这个参数是 key 的键名 |
| auto | number | -1 | 是否当列表滚动到底部时自动加载下一页，`-1` 代表无限加载 |
| preload | number | 200 | 列表底部距离可视窗口多少`px`时就触发网络请求 |
| cacheTimeout | number | 0 | 你可以设置一个`秒`数把数据存储到`LocalStorage` |
| errorClickRetry | boolean | true | 当接口报错时，点击`error`或`first-error`插槽是否自动重试 |
| scrollX | boolean | false | 如果列表是横向滚动，设为`true`能够正确的做数据懒加载  |
| successCallback | function | - | 当数据请求成功时，可传入该函数来回调（`SSR`时将在`mounted`里自动调用一次） |
| errorCallback | function | - | 当数据请求失败时，可传入该函数来回调（仅客户端发请求时生效） |

#### uniqueKey
支持嵌套数据查找，如：
```json
[
  {
    "type": "xxx",
    "data": {
      "id": 1,
      "name": "test"
    }
  },
  {
    "type": "xxx",
    "data": {
      "id": 2,
      "name": "test"
    }
  }
]
```
`uniqueKey` is `data.id`

#### successCallback
```json
{
  "params": "<object> | 本次发请求的参数",
  "data": "<object> | 接口的响应数据",
  "refresh": "<boolean> | 是否下拉刷新"
}
```

#### errorCallback
params：
```json
{
  "error": "接口返回的 error 对象"
}
```
