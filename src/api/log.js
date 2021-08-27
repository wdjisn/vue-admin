import request from '../utils/request';

// 获取登录日志
export function loginLog(data) { return request({ url: '/login/logs', method: 'get', params: data })}

// 获取错误日志
export function errorLog(data) { return request({ url: '/error/logs', method: 'get', params: data })}

// 编辑错误日志
export function editLog(data) { return request({ url: '/error/log', method: 'put', data })}

// 获取访问日志
export function requestLog(data) { return request({ url: '/request/logs', method: 'get', params: data })}