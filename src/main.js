import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './assets/js/i18n';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/icon.css';
import './assets/js/directives';
import 'babel-polyfill'
import VueClipboard from 'vue-clipboard2'


let echarts = require('echarts/echarts.all')
Vue.use(VueClipboard)
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});
Vue.prototype.$echarts = echarts


// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    // 权限验证
    var permission = localStorage.getItem('permission');
    if (to.path == '/login') {
        next();
    } else if (!permission && to.path !== '/login') {
        next('/login');
    } else if (permission) {
        var lock = false;
        var per = JSON.parse(permission);
        per.forEach(function (item, index) {
            if (to.path == '/' + item.alias) {
                lock = true;
                return false;
            }
        })
        if (to.path == '/403') {
            lock = true;
        }
        lock == true ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});


new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
