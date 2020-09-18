### API definition


#### Export API
```javascript
// api.js
export const getListByPage = ({ page, count }) => {
  return new Promise((resolve, reject) => {
    // use axios or fetch send request
  })
}

export const getListBySinceId = ({ since_id, count }) => {
  return new Promise((resolve, reject) => {
    // use axios or fetch send request
  })
}

export const getListBySeenIds = ({ seen_ids, count }) => {
  return new Promise((resolve, reject) => {
    // use axios or fetch send request
  })
}
```


#### API Schema
```javascript
export const getListByPage = ({ extra, page, count }) => {
  return new Promise((resolve, reject) => {
    axios.get('...', { params: { page, count } })
      .then(data => {
        resolve({
          result: data.list,
          no_more: data.noMoreKey,
          total: data.total_count,
          extra: {
            key: data.otherValue
          }
        })
      })
      .catch(reject)
  })
}
```

| Name | Type | Description |
| --- | --- | --- |
| `*`result | Array | Response list data |
| no_more | Boolean | Is there a next page |
| total | Number | Total number of lists |
| extra | Any | Additional data, will append to next request params |
