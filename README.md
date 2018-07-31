
### vue 格式

```
    data() {
       return {
       }
    },
     watch:{

        },
        props: {},
        beforeRouteEnter (to, from, next) {
            next(vm=> {
            });
        },
        mounted(){

        },
        methods: {

        },
        components: {

        },

```
###目录结构
```
├─App.vue
├─main.js
│
├─api
│      api.js                   api接口
├─assets
├─components                    公用组件
│
│
├─filters
│      index.js                 过滤器
├─libs
│  │  utils.js                  工具类
│
├─miins                         ?
│      emitter.js
│
├─routes
│      index.js                 路由
│
├─store
│      csConst.js               常量
│      index.js                 vuex
│      user.js                  用户
│
└─views
    ├─login                     登陆
    │
    ├─menu                      菜单


```
