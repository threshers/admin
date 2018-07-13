import Vue from 'vue';
import Router from 'vue-router';
// import footer from '@/components/footer'
import pager from '@/components/paging';
import index from '@/pages/system/index';
import login from '@/pages/member/login';
import wxlogin from '@/pages/member/wxlogin';
import sysindex from '@/pages/subsystem/system/index.vue'
import sysfunc from '@/pages/subsystem/func/index.vue'

import userindex from '@/pages/user/index/index';
import changepassword from '@/pages/user/index/changepassword';
import roleindex from '@/pages/user/role/index';
import roleauth from '@/pages/user/role/auth';

Vue.use(Router);
Vue.component("paging", pager);

export default new Router({
    mode: "history",
    routes: [{
            path: '/',
            name: 'index',
            component: index,
            children: [{
                path: 'user/index',
                name: 'userindex',
                component: userindex
            }, {
              path: "sys/index",
              name: "sysindex",
              component: sysindex
            }, {
              path: "sys/func",
              name: "sysfunc",
              component: sysfunc
            },{
              path: 'change_passwd',
              name: 'change_passwd',
              component: changepassword
            },{
              path: 'user/role',
              name: 'userrole',
              component: roleindex
            }
            ,{
              path: 'role/auth',
              name: 'roleauth',
              component: roleauth
            }]
        },
        {
            path: '/member/login',
            name: 'login',
            component: login,
            meta: {
                title: '用户登录'
            }
        },
        {
            path: '/member/wxlogin',
            name: 'wxlogin',
            component: wxlogin
        },

    ]
})
