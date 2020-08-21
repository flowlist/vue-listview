### Slots

#### 头部
| 名称 | 参数 |
| --- | --- |
| header | source |
```vue
<FlowLoader>
  <header slot="header" slot-scope="{ source }" />
</FlowLoader>
```

#### 列表
| 名称 | 参数 |
| --- | --- |
| default | flow, total, count, extra |
```vue
<FlowLoader>
  <ul slot-scope="{ flow, total, count, extra }" />
</FlowLoader>
```

#### 底部
| 名称 | 参数 |
| --- | --- |
| footer | source |
```vue
<FlowLoader>
  <footer slot="footer" slot-scope="{ source }" />
</FlowLoader>
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
