import request from '../utils/request';

// 登录
export const login = query => { return request({ url: '/login', method: 'post', params: query }) };

// 获取权限
export const permission = query => { return request({ url: '/permission', method: 'get', params: query }) };

// 修改密码
export const changePassword = query => { return request({ url: '/change/password', method: 'put', params: query }) };