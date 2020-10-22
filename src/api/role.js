import request from '../utils/request';

// 获取角色列表
export const roleList = query => { return request({ url: '/roles', method: 'get', params: query }) };

// 获取角色详情
export const roleInfo = query => { return request({ url: '/role', method: 'get', params: query }) };

// 添加角色
export const createRole = query => { return request({ url: '/role', method: 'post', params: query }) };

// 编辑角色
export const editRole = query => { return request({ url: '/role', method: 'put', params: query }) };

// 快捷修改角色
export const quickEditRole = query => { return request({ url: '/role', method: 'patch', params: query }) };

// 删除角色
export const delRole = query => { return request({ url: '/role', method: 'delete', params: query }) };