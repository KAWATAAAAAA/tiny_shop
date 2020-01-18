# tiny_shop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 毕业项目相关事宜稳定编写
## 开发环境：

|      工具      |  版本 |
|:-----------:|:-----------:|
|   webstrom    |   2019.3  |
|   Vue-cli     |  4.0.5    |
|  Vue          |   v2.6.10 |

Server version: 8.0.13 MySQL Community Server - GPL

# 接下来要完成的工作
> 登录后在主界面刷新要判断本地是否有token，如果没有就需要跳转登录路由
> 在用户状态栏获取用户信息的时候，应该先判断是否有 token，如果有才发送
> getUserBaseInfo的 请求
>具体去 `UserStatusBar` 组件中处理
