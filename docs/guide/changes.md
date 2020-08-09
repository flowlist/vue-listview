### 更新日志

# v2.8.3
### Features
- `v-scroller`
    - 增加`fixedScroll`这个`props`，当设为 true 的时候才去修复 iOS 锁屏的 bug

### Bug Fixes
- `v-render`
    - 修复`column` > 1 时初始渲染节点不对齐的 bug
- `v-collapse`
    - 修复当`animate`为 true 时快速展开收起列表有概率丢失高度的 bug
    
### Breaking Change
- `v-scroller`
    - 默认不再去处理 iOS 的滚动锁屏问题
    
### Dependencies
- `css-loader`升级：`4.2.0`-->`4.2.1`
- `sass-loader`升级：`9.0.2`-->`9.0.3`
- `async-validator`升级：`3.3.0`-->`3.4.0`

# v2.8.2
### Features
- `v-scroller`
    - 支持自定义下拉刷新和上拉加载更多
    
### Bug Fixes
- `v-scroller`
    - 修复上拉/下拉无法流控的 bug
- `v-render`
    - 修复`column` >1 时的流程 bug
- `slide.js`
    - 删除对`touch-action`的控制

### Dependencies
- `webpack`升级：`4.44.0`-->`4.44.1`
- `babel/core`升级：`7.10.5`-->`7.11.1`
- `css-loader`升级：`4.1.0`-->`4.2.0`
- `terser-webpack-plugin`升级：`3.0.8`-->`4.0.0`

# v2.8.1
### Bug Fixes
- `v-checkbox`
    - 修复文字样式

# v2.8.0
### Features
- `v-checkbox`
    - 复选框

### Dependencies
- `webpack`升级：`4.43.0`-->`4.44.0`
- `css-loader`升级：`3.6.0`-->`4.1.0`
- `terser-webpack-plugin`升级：`3.0.7`-->`3.0.8`

# v2.7.4

### Bug Fixes
- `v-field`
    - 修复`v-model.number`时自动`props`校验报错的 bug

# v2.7.3

### Bug Fixes
- `v-field`
    - 修复`v-model.number`时自动`value.trim`的 bug

# v2.7.1

### Breaking Change
- `v-refresh`
    - 移除该组件，请在`v-scroller`里使用

# v2.7.0

### Breaking Change
- `v-img`
    - DOM 结构从`<picture class="v-img"><source/><img/></picture>`改为`<img class="v-img" />`
    - `resizeImage` 回调里去掉 `webP` 这个参数
    - `SSR`的时候，只渲染`data-src`，不渲染`src`

### Bug Fixes
- `v-scroller`
    - 优化 DOM 结构，根据`props`做判断来渲染上下加载模块
- `Array.fill`
    - 移除项目中所有的这个 API 调用，解决兼容性问题
    
### Features
- `v-datetime`
    - 更新样式
- `v-picker`
    - 支持二维数组的数据源
    
### Dependencies
- `@babel/core`升级：`7.10.4`-->`7.10.5`
- `eslint`升级：`7.4.0`-->`7.5.0`
- `terser-webpack-plugin`升级：`3.0.6`-->`3.0.7`

# v2.6.18

### Bug Fixes
- `lazyload.js`
    - 修复`scroll`情况下，`bind` 时父节点是`null`的 bug
- `v-img`
    - 修复`resizeImage`在宽高都不传时会拼接`.webp`的 bug

# v2.6.17

### Bug Fixes
- `slide.js`
    - 修复`HTMLCollection`解构在低端机上的实现问题：[#6ebc001c](https://git.bilibili.co/crayon/sakura/commit/6ebc001c82633d0866a496da782e69070c4fc6ee)

# v2.6.16

### Bug Fixes
- `v-collapse`
    - 修复`array.fill`在低端机上的实现问题：[#e33e1321](https://git.bilibili.co/crayon/sakura/commit/e33e1321e2f45eec9814d157830bc423f38ff0d9)
