### 接口定义


#### 接口层
```javascript
// api.js
export const getListByPage = ({ page, count }) => {
  return new Promise((resolve, reject) => {
    // 这层 promise 可以使用 axios 或 fetch 等
  })
}

export const getListByLastId = ({ last_id, count }) => {
  return new Promise((resolve, reject) => {
    // 这层 promise 可以使用 axios 或 fetch 等
  })
}

export const getListBySeenIds = ({ seen_ids, count }) => {
  return new Promise((resolve, reject) => {
    // 这层 promise 可以使用 axios 或 fetch 等
  })
}
```


#### 数据格式
```javascript
export const getListByPage = ({ page, count }) => {
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

- 接口请求的参数会由组件自动维护，你只需要确定不同的请求`场景`即可
- 返回值中的`result`和`no_more`是必须的，`total`用于计数展示，`extra`会作为额外数据存储在`store`中，会在下一次请求的`_extra`参数中携带
