// Routes
const routes = [
    {
        path: '/login', //登陆
        name: 'login',
        meta: { auth: false },
        component: (resolve) => {
            require(['__views/login/login.vue'], resolve);
        }
    }, {
        path: '/index',
        name: 'index',
        meta: { auth: true },
        component: (resolve) => {
            require(['__views/menu'], resolve);
        },

        children: [
            {
                path: 'home-page',
                name: 'home-page',
                meta: { auth: true },
                component: (resolve) => {
                    require(['__views/home-page'], resolve);
                }
            },
        ]
    }, {
        // not found handler
        path: '*',
        meta: {
            auth: false
        },
        component: (resolve) => {
            require(['__views/login/login.vue'], resolve);
        }
    }];


export default routes;
