### Slots

#### 头部
| Name | Scope |
| --- | --- |
| header | source |
```vue
<ListView>
  <header slot="header" slot-scope="{ source }" />
</ListView>
```

#### 列表
| Name | Scope |
| --- | --- |
| default | list, total, count, extra |
```vue
<ListView>
  <ul slot-scope="{ list, total, count, extra }" />
</ListView>
```

#### 底部
| Name | Scope |
| --- | --- |
| footer | source |
```vue
<ListView>
  <footer slot="footer" slot-scope="{ source }" />
</ListView>
```

#### 首次接口返回错误
| Name | Scope |
| --- | --- |
| first-error | error |

#### 接口返回错误
| Name | Scope |
| --- | --- |
| error | error |

#### 首次正在加载
| Name | Scope |
| --- | --- |
| first-loading | - |

#### 正在加载
| Name | Scope |
| --- | --- |
| loading | - |

#### 列表为空
| Name | Scope |
| --- | --- |
| nothing | - |

#### 没有更多数据了
| Name | Scope |
| --- | --- |
| no-more | - |

#### 点击加载模块
| Name | Scope |
| --- | --- |
| load | - |
