import request from '../utils/request';

// 获取登录日志
export const loginLog = query => { return request({ url: '/login/logs', method: 'get', params: query }) };

// 获取错误日志
export const errorLog = query => { return request({ url: '/error/logs', method: 'get', params: query }) };

// 编辑错误日志
export const editLog = query => { return request({ url: '/error/log', method: 'put', params: query }) };

// 获取访问日志
export const requestLog = query => { return request({ url: '/request/logs', method: 'get', params: query }) };