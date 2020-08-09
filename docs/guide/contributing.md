### 贡献组件

1. clone 项目到本地
```sh
git clone git@git.bilibili.co:crayon/sakura.git
```

2. 下载依赖（建议 yarn）
```sh
yarn
```

3. 启动文档的 server
```sh
npm run doc:dev
```

4. 启动预览的 server
```sh
npm run pkg:dev
```

5. 在`src/components`目录下新建一个你组件的目录（仿照其他组件即可）

6. 在`demo/pages`目录下新建一个你组件的预览页面（仿照其他组件即可）

7. 在`docs/components`目录下新建一个你组件的文档页面（仿照其他组件文档引入`Phone`预览组件）

8. 开始开发
