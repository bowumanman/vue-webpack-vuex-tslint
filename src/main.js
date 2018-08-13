// Import System requirements
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import routes from './routes';
import store from './store';
import 'moment/locale/zh-cn';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import filters from './filters';
import app from './App.vue';
import localStorage from 'localStorage';
import { LOCAL_USER } from './store/user';

// 注册过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
// Resource logic
Vue.use(VueRouter);
Vue.use(ElementUI);

window.$Vue = Vue;

let baseURL = '';

/*global process:true*/
/*eslint no-undef: "error"*/
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    baseURL = '';
} else {
    baseURL = '';
}

Vue.prototype.baseURL = axios.defaults.baseURL = baseURL;
//添加拦截器注入 token
axios.interceptors.request.use(function (config) {
    if (store.state.user.token) {
        config.headers['X-Token'] = store.state.user.token.toString();
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Routing logic
const router = new VueRouter({
    routes: routes,
    mode: process.env.NODE_ENV === 'development' ? 'history' : 'hash',
    scrollBehavior: function (to, from, savedPosition) {
        return savedPosition || {
                x: 0,
                y: 0
            };
    }
});
window.$router = router;
let myTime = null;
router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    if (to.name === 'login' || to.path === '/login') {
        store.dispatch('singOut');
        clearInterval(myTime);
        next();
        return;
    } else {
        //查找 token
        if (to.meta.auth === true && store.state.user.token) {
            //判定内存和local 是否一致 不一直说明,登录了新用户,强制登出
             if (!isLocalStorageUser()) {
                     next({
                         path: 'login'
                     });
             }
            if (to.params.openWindow && process.env.NODE_ENV !== 'development') {
                let openUrl = to.fullPath;
                if (router.mode === 'hash') {
                    openUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + to.fullPath;
                }
                // console.log(openUrl);
                window.open(openUrl, '_blank');
            } else {
                next();
            }
        } else {
            store.dispatch('refreshUser').then(
                retUser => {
                    if (retUser === null) {
                        next({
                            path: 'login'
                        });
                    } else {
                        store.commit('SIGN_IN', retUser);
                        next();
                    }
                },
                () => {
                    next({
                        name: 'login'
                    });
                }
            );
        }
    }
});

var appVue = new Vue({
    el: '#root',
    data: function () {
        return {
            Dot: new Vue()
        };
    },
    methods: {
    },
    router,
    store,
    render: h => h(app)
}).
    //系统异常
    $on('netError', function (msg = '系统异常') {
        this.$message.error(msg);
    });

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.status === 200 && response.data.resCode && response.data.resCode !== '0') {
        appVue.$emit('netError', '系统异常');
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});
// 判定内存和local 是否一致
function isLocalStorageUser() {
    let user = localStorage.getItem(LOCAL_USER);
    return user === null ? true : (store.state.user.token === JSON.parse(user).token);
}
