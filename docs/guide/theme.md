### 定制主题

1. 修改`.babelrc`文件：
```json
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "@bilibili/sakura",
        "style": false
      }
    ]
  ]
}
```

2. 新建一个`theme.scss`文件（只支持 .scss 文件）
```scss
$--font-path: '~@bilibili/sakura/src/theme/fonts'; // 必须

$--color-primary: red;

@import '~@bilibili/sakura/src/theme/index';  // 必须
```

3. 在你的入口文件里引入`theme.scss`
