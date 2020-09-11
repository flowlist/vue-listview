### 定义 API 层


#### 导出 API
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


#### API 范式
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

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `*`result | Array | 接口返回的列表数据 |
| no_more | Boolean | 是否还有下一页 |
| total | Number | 列表的总数 |
| extra | Any | 需要存储的额外信息 |
