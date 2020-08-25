### 方法

:::tip
这些方法都通过 $refs 调用
:::

#### initData(\<object\>)
- 手动初始化数据，参数会透传到 API 层

#### loadMore(\<object\>)
- 手动加载下一页数据，参数会透传到 API 层
- query 中的 `is_up` 是 0

#### loadBefore(\<object\>)
- 手动加载上一页数据，参数会透传到 API 层
- query 中的 `is_up` 是 1

#### refresh(\<boolean\>)
- 刷新列表，从第一页开始请求接口
- 参数为`boolean`，默认为`true`，在刷新的时候就展示`loading`
- 如果你想在刷新后直接覆盖原始数据，则设为`false`

#### retry(\<boolean\>)
- 当接口 error 的时候可以手动调用该方法重试
- 参数为`boolean`，默认为`true`，在刷新的时候就展示`loading`
- 如果你想在刷新后直接覆盖原始数据，则设为`false`

#### jump(\<number\>)
- 当你使用分页器时，使用 jump 方法手动拉取数据，参数为`page`

#### push(\<object|array\>)
- 向列表的尾部追加元素

#### unshift(\<object|array\>)
- 向列表的头部追加元素

#### reset(value, key)
- 重写数据源中的任意字段

#### insertBefore(id, value, key)
- 在某个元素之前插入内容
- key 默认为 props 里的 `uniqueKey`

#### insertAfter(id, value, key)
- 在某个元素之后插入内容
- key 默认为 props 里的 `uniqueKey`

#### patch(value, key)
- 给数据打补丁
- key 默认为 props 里的 `uniqueKey`

#### delete(id, key)
- 删除某一条数据
- key 默认为 props 里的 `uniqueKey`

#### update(id, key, value)
- 以`key-value`的形式去更新某一条数据里的值
- `key`支持`.`分隔符深层查找
