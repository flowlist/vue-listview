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
| `*`func | string | - | A defined function name, injected from `vuex` |
| `*`type | string | - | `ListType` |
| query | object | - | The parameters here will be passed to the API |
| namespace | string | list | If you want to have multiple data store |
| uniqueKey | string | id | Each item of the list has a unique key（value），Fill in the key name |
| lazyMode | String | observe | use IntersectionObserver or getBoundingClientRect to lazy load，opt: `observe`、`scroll` |
| auto | number | -1 | The number of pages automatically sent for the request, -1 for infinite scrolling |
| preload | number | 200 | How many pixels from the bottom begins loading the next page of data |
| cacheTimeout | number | 0 | You can set a number(seconds) value to cache data at client side `LocalStorage` |
| errorClickRetry | boolean | true | When request is rejected <br> set true click `error` or `first-error` slot to retry |
| scrollX | boolean | false | Horizontal list view set true  |
| successCallback | function | - | Called at a client side, when request is resolved |
| errorCallback | function | - | Called when a client side request is rejected |

#### uniqueKey
Support for nested key names，eg：
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
Will only be invoked on the client side， if it's SSR it will be called in the `mounted`，params：
```json
{
  "params": "<object> | Request params",
  "data": "<object> | API response",
  "refresh": "<boolean> | Whether or not to refresh"
}
```

#### errorCallback
params：
```json
{
  "error": "API response error"
}
```
