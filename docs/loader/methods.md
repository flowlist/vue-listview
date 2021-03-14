### Ref Methods

<Phone page="method" />

:::tip
All of following methods called through $refs
:::

#### initData(\<object\>)
- The data initialization method called manually
- Manual triggering is generally not required
- The parameters assigned into the request query

#### loadMore(\<object\>)
- Manually get the data for the next page
- When in infinite scrolling mode, no need to call
- The parameters assigned into the request query

#### loadBefore(\<object\>)
- Manually get the data from the previous page
- The parameters assigned into the request query

#### refresh(\<boolean\>)
- Refresh the list
- When the parameter is false, loading state will not be displayed at refreshing
- default `true`

#### retry(\<boolean\>)
- When the API request rejected，called to retry
- When the parameter is false, loading state will not be displayed at refreshing
- default `true`

#### jump(\<number\>)
- When the `ListType` is `jump`, called to jump to the page

#### push(\<object|array\>)
- Appends one or more data to the **end** of the list

#### unshift(\<object|array\>)
- Appends one or more data to the **head** of the list

#### insertBefore(id, value)
- Insert an item **before** a certain item

#### insertAfter(id, value)
- Insert an item **after** a certain item

#### delete(id)
- delete item by `id`，The index is `unique-key`

#### search(id)
- search item by `id`, return result value，The index is `unique-key`

#### reset(key, value)
- Override any field in the data store
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
- Patch the data in the list
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
- Update a field of an item. eg:
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
- Merge a object to field of item. eg:
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
