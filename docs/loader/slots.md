### Slots

#### 头部
| 名称 | 参数 |
| --- | --- |
| header | source |
```vue
<ListView>
  <header slot="header" slot-scope="{ source }" />
</ListView>
```

#### 列表
| 名称 | 参数 |
| --- | --- |
| default | flow, total, count, extra |
```vue
<ListView>
  <ul slot-scope="{ flow, total, count, extra }" />
</ListView>
```

#### 底部
| 名称 | 参数 |
| --- | --- |
| footer | source |
```vue
<ListView>
  <footer slot="footer" slot-scope="{ source }" />
</ListView>
```

#### 首次接口返回错误
| 名称 | 参数 |
| --- | --- |
| first-error | error |

#### 接口返回错误
| 名称 | 参数 |
| --- | --- |
| error | error |

#### 首次正在加载
| 名称 | 参数 |
| --- | --- |
| first-loading | - |

#### 正在加载
| 名称 | 参数 |
| --- | --- |
| loading | - |

#### 列表为空
| 名称 | 参数 |
| --- | --- |
| nothing | - |

#### 没有更多数据了
| 名称 | 参数 |
| --- | --- |
| no-more | - |

#### 点击加载模块
| 名称 | 参数 |
| --- | --- |
| load | - |
