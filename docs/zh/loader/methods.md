### 方法

<Phone page="method" />

:::tip
下面所有的函数都需要通过`$refs`来调用
:::

#### initData(\<object\>)
- 手动请求第一页数据，一般不需要手动
- 参数会透传给 API 层

#### loadMore(\<object\>)
- 请求下一页的数据，当无限滚动时无需调用
- T参数会透传给 API 层

#### loadBefore(\<object\>)
- 请求上一页的数据
- 参数会透传给 API 层

#### refresh(\<boolean\>)
- 刷新整个列表
- 当参数设置为`false`，在刷新时就不会展示`loading`
- 默认是 `true`

#### retry(\<boolean\>)
- 当接口异常返回时，手动调用来重试
- 当参数设置为`false`，在重试时就不会展示`loading`
- 默认是 `true`

#### jump(\<number\>)
- 当`type`是`jump`时, 手动调用来跳转至指定页面

#### push(\<object|array\>)
- 在列表尾部追加数据

#### unshift(\<object|array\>)
- 在列表顶部追加数据

#### insertBefore(id, value)
- 在某个元素之前插入一条数据

#### insertAfter(id, value)
- 在某个元素之后插入一条数据

#### delete(id)
- 删除某个元素，索引是 `unique-key`

#### search(id)
- 搜索某个元素, 返回值是结果或`null`，索引是 `unique-key`

#### reset(key, value)
- 重写列表的任意一个字段
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
```javascript
this.$refs.loader.reset('total', 1)
```

#### patch(\<object|array\>)
- 给数据打补丁
```json
[
  {
    "type": "user",
    "data": {
      "id": 1,
      "count_followers": 0,
      "count_following": 0
    }
  },
  {
    "type": "user",
    "data": {
      "id": 2,
      "count_followers": 0,
      "count_following": 0
    }
  }
]
```
```javascript
// array
this.$refs.loader.patch([
  {
    id: 1,
    count_followers: 233
  },
  {
    id: 2,
    count_followers: 666
  }
])
// object
this.$refs.loader.patch({
  1: {
    count_following: 486
  },
  2: {
    count_following: 996
  }
})
```

#### update(id, key, value)
- 更新某个元素的值. 如:
```json
[
  {
    "type": "xxx",
    "data": {
      "id": 1,
      "followed": false
    }
  },
  {
    "type": "xxx",
    "data": {
      "id": 2,
      "followed": true
    }
  }
]
```
```javascript
// unique-key：data.id
this.$refs.loader.update(2, 'data.followed', false)
```

#### merge(id, value)
- 合并对象到某个元素中. 如：
```json
[
  {
    "type": "xxx",
    "data": {
      "id": 1,
      "followed": false
    }
  },
  {
    "type": "xxx",
    "data": {
      "id": 2,
      "followed": true
    }
  }
]
```
```javascript
// unique-key：data.id
this.$refs.loader.merge(2, {
  followed: false
})
```
