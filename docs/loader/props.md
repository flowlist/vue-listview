### Props

```vue
<template>
  <ListView
    func="required.call.function.name.string"
    type="required.list.type.string"
    namespace="list"
    unique-key="id"
    :query="{}"
    :auto="-1"
    :preload="200"
    :cache-timeout="0"
    :display-no-more="false"
    :use-first-error="false"
    :use-first-loading="false"
    :error-client-retry="true"
    :scroll-x="false"
    :success-callback="null"
    :error-callback="null"
  >
    <!-- slot  -->
  </ListView>
</template>
```


| Name | Type | Default | Description |
| --- | --- | --- | ---- |
| *func | string | - | A defined function name, injected from `vuex` |
| *type | string | - | ListType |
| namespace | string | list | If you want to have multiple data store |
| uniqueKey | string | id | Each item of the list has a unique key（value），Fill in the key name |
| query | object | - | 透传给 API 层的参数 |
| auto | number | -1 | The number of pages automatically sent for the request, -1 for infinite scrolling |
| preload | number | 200 | How many pixels from the bottom begins loading the next page of data |
| cacheTimeout | number | 0 | You can set a number(seconds) value to cache data at client side `LocalStorage` |
| displayNoMore | boolean | false | When all data fetched, can show a bottom tips <br> set true `no-more` slot can display |
| useFirstError | boolean | false | When you want display special tips on first screen rejected <br> set true `first-error` slot can display | 
| useFirstLoading | boolean | false | When you want display special tips on first screen loading <br> set true `first-loading` slot can display |
| errorClickRetry | boolean | true | When request is rejected <br> set true click `error` or `first-error` slot to retry |
| scrollX | boolean | false | Horizontal list view set true  |
| successCallback | function | - | Request is resolved call at client side |
| errorCallback | function | - | Client side request is rejected |

#### query
最终透传给 API 的参数包括 query 以及 listview 自己维护的参数
- 当 type 为 jump 时，无额外参数
- 当 type 为 page 的时候，会自动维护 `page` 参数
- 当 type 为 seenIds 时，自动维护 `seen_ids` 参数
- 当 type 为 sinceId 时，自动维护 `since_id` 和 `is_up` 参数

#### uniqueKey
支持内层字段作为 key，如：
```json
[
  {
    "type": "xxx",
    "data": {
      "id": 1,
      "name": "test"
    }
  }
]
```
此时`uniqueKey`为`data.id`

#### cacheTimeout
缓存是通过`localStorage`实现的，因此不会在`server side`生效

#### successCallback
回调不会在`server side`执行，但如果是`SSR`则会在`mounted`里去执行，参数如下：
```json
{
  "params": "<object> | 本次请求携带的参数",
  "data": "<object> | API 层 resolve 的数据",
  "refresh": "<boolean> | 是否是下拉刷刷新"
}
```

#### errorCallback
当在`client side`发起接口请求时执行到`reject`的回调，参数如下：
```json
{
  "error": "接口返回的 error"
}
```
