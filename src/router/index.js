import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            meta: { title: '登录' },
            component: () => import('../components/common/Login.vue'),
        },
        {
            path: '/403',
            meta: { title: '403' },
            component: () => import('../components/common/403.vue'),
        },
        {
            path: '/',
            redirect: '/login',
            component: () => import('../components/common/Home.vue'),
            children: [
                {
                    path: '/dashboard',
                    meta: { title: '系统首页' },
                    component: () => import('../components/common/Dashboard.vue'),
                },
                {
                    path: '/admin',
                    meta: { title: '管理员' },
                    component: () => import('../components/admin/Index.vue'),
                },
                {
                    path: '/role',
                    meta: { title: '角色管理' },
                    component: () => import('../components/role/Index.vue'),
                },
                {
                    path: '/menus',
                    meta: { title: '菜单管理' },
                    component: () => import('../components/menu/Index.vue'),
                },
                {
                    path: '/loginLog',
                    meta: { title: '登录日志' },
                    component: () => import('../components/log/Login.vue'),
                },
                {
                    path: '/requestLog',
                    meta: { title: '访问日志' },
                    component: () => import('../components/log/Request.vue'),
                },
                {
                    path: '/errorLog',
                    meta: { title: '错误日志' },
                    component: () => import('../components/log/Error.vue'),
                },
                {
                    path: '/upload',
                    meta: { title: '文件上传' },
                    component: () => import('../components/component/Upload.vue'),
                },
                {
                    path: '/clipboard',
                    meta: { title: '复制粘贴' },
                    component: () => import('../components/component/Clipboard.vue'),
                },
                {
                    path: '/drawer',
                    meta: { title: '抽屉组件' },
                    component: () => import('../components/component/Drawer.vue'),
                }
            ]
        }
    ]
});