### Props


| Name | Type | Default | Required? | Description |
| --- | --- | --- | --- | ---- |
| func | string | - | Y | API 列表中的某个函数名，将会被调用 |
| type | string | - | Y | 场景值的类型 |
| query | object | - | N | 透传给 API 层的参数 |
| auto | number | -1 | N | 触底自动请求的次数，-1 代表无限请求 |
| preload | number | 200 | N | 距离底部多少 px 触发预加载 |
| namespace | string | list | N | store 模块的命名空间 |
| uniqueKey | string | id | N | item 的 key |
| cacheTimeout | number | 0 | N | 数据缓存的秒数，0 默认不缓存 |
| displayNoMore | boolean | false | N | 当已经加载了所有数据后，是否展示文案提示 |
| useFirstError | boolean | false | N | 第一屏数据返回 error 后，是否展示特殊提示 | 
| useFirstLoading | boolean | false | N | 第一屏数据 loading 时，是否展示特殊提示 |
| errorClickRetry | boolean | true | N | 当接口返回异常后，是否点击提示区域就自动重试 |
| scrollX | boolean | false | N | 默认列表为纵向滚动 |
| successCallback | function | - | N | 请求成功后的 callback |
| errorCallback | function | - | N | 请求失败后的 callback |

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
  "refresh": "<boolean> | 是否是下拉刷洗"
}
```

#### errorCallback
当在`client side`发起接口请求时执行到`reject`的回调，参数如下：
```json
{
  "error": "接口返回的 error"
}
```
