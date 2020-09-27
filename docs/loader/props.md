### Props

```vue
<template>
  <ListView
    func="required.call.function.name.string"
    type="auto"
    unique-key="id"
    :query="{}"
    :autoload="-1"
    :preload="200"
    :cache-timeout="0"
    :scroll-x="false"
  >
    <!--  slot  -->
  </ListView>
</template>
```


| Name | Type | Default | Description |
| --- | --- | --- | ---- |
| `*`func | string \ function | - | A defined function name, injected from `vuex`, or function\<Promise\> |
| type | string | auto | `ListType`：`jump`、`page`、`sinceId`、`seenIds` |
| query | object | - | The parameters here will be passed to the API |
| uniqueKey | string | id | Each item of the list has a unique key（value），Fill in the key name |
| autoload | number | -1 | The number of pages automatically sent for the request, -1 for infinite scrolling |
| preload | number | 200 | How many pixels from the bottom begins loading the next page of data |
| cacheTimeout | number | 0 | You can set a number(seconds) value to cache data at client side `LocalStorage` |
| scrollX | boolean | false | Horizontal list view set true  |

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

### Events

| Name | Type | Default | Description |
| --- | --- | --- | ---- |
| success | function | - | Called at a client side, when request is resolved |
| error | function | - | Called when a client side request is rejected |

#### success
Will only be invoked on the client side， if it's SSR it will be called in the `mounted`，params：
```json
{
  "params": "<object> | Request params",
  "data": "<object> | API response",
  "refresh": "<boolean> | Whether or not to refresh"
}
```

#### error
params：
```json
{
  "error": "API response error"
}
```
