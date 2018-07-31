import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import csConst from './csConst';
Vue.use(Vuex);
/*global process:true*/
/*eslint no-undef: "error"*/
export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
    modules: {
        user,           // 用户信息
        csConst,        // 常量类
    }
});
