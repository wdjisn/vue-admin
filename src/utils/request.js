import Vue from 'vue';
import axios from 'axios';
import router from '../router';
import { Base64 } from 'js-base64'

const service = axios.create({
    baseURL:'admin',
    timeout: 5000
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 设置请求头
        let data = {
            appname: 'LaravelStyle',
            token: localStorage.getItem('token'),
            timestamp: Math.round(new Date() / 1000)
        }
        config.headers.token = Base64.encode(JSON.stringify(data));
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            // 拦截登录失效、无权限操作
            if (response.data.code === 1001) {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('error_count');
                localStorage.removeItem('permission');
                Vue.prototype.$alert(response.data.msg, {
                    confirmButtonText: '确定',
                    showClose: false,
                    callback: action => {
                        router.push('/login');
                    }
                });
            }
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;