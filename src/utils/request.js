import Vue from 'vue';
import axios from 'axios';
import router from '../router';
import { Base64 } from 'js-base64'
import md5 from 'js-md5';

const service = axios.create({
    baseURL: 'admin',
    timeout: 5000
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        let time = Math.round(new Date() / 1000);
        let sign = md5("appname=LaravelAdmin&appsecret=Sl7qkF2DKglAdlk4397qdKCUf3&timestamp=" + time);
        // 设置请求头
        let data = {
            sign: sign,
            timestamp: time,
            token: localStorage.getItem('token')
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
            if (response.data.code === 401) {
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