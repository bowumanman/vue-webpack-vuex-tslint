import { api } from '__service/api'
import { apiHttp, STATUS_HTTP_SUCCESS } from '__service/csHttp'
import localStorage from 'localStorage'
import store from '../store';
export const LOCAL_USER = 'BASE_VUE_USER';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
//cv 用户状态管理
export default {
    state: {
        userInfo: {
            token: null
        }
    },
    mutations: {
        /**
         * 登录成功
         * @param {Object} state
         * @param {Object} user
         */
        [SIGN_IN](state, user) {
            state = Object.assign(state, user)
        },

        /**
         * 退出登录
         * @param {Object} state 全局状态
         */
         [SIGN_OUT](state) {
            for (let key of Object.keys(state)) {
                delete state[key]
            }
        }
    },

    actions: {
        signIn({commit,state}, user) {
            commit(SIGN_IN, user);
            const promise = new Promise(function (retResolve) {
                localStorage.setItem(LOCAL_USER, JSON.stringify(user));
                retResolve();
            });
            return promise;
        },
        singOut({commit}) {
            commit(SIGN_OUT);
            const promise = new Promise(function (retResolve) {
                localStorage.removeItem(LOCAL_USER);
                retResolve();
            });
            return promise;
        },
        refreshUser() {
            const promise = new Promise(function (retResolve) {
                let user = localStorage.getItem(LOCAL_USER);
                retResolve(JSON.parse(user));
            });
            return promise;
        },
        async refreshFieldList({commit}) {
            if (Object.keys(store.state.user).length > 0) {
                let resData = await apiHttp(api.REFRESH_FIELD_LIST);
                if (resData.resCode === STATUS_HTTP_SUCCESS) {
                    commit(SIGN_IN, resData.data);
                    // return resData.data;
                }
            }
        }
    }
}
