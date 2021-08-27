import request from '../utils/request';

// 登录
export function login(data) { return request({ url: '/login', method: 'post', data })}

// 获取权限
export function permission(data) { return request({ url: '/permission', method: 'get', params: data })}

// 修改密码
export function changePassword(data) { return request({ url: '/change/password', method: 'put', data })}