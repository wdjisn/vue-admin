import request from '../utils/request';

// 获取管理员列表
export const adminList = query => { return request({ url: '/admins', method: 'get', params: query }) };

// 添加管理员
export const createAdmin = query => { return request({ url: '/admin', method: 'post', params: query }) };

// 编辑管理员
export const editAdmin = query => { return request({ url: '/admin', method: 'put', params: query }) };

// 快捷修改管理员
export const quickEditAdmin = query => { return request({ url: '/admin', method: 'patch', params: query }) };

// 删除管理员
export const delAdmin = query => { return request({ url: '/admin', method: 'delete', params: query }) };