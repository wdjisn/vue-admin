import request from '../utils/request';

// 获取管理员列表
export function adminList(data) { return request({ url: '/admins', method: 'get', params: data })}

// 添加管理员
export function createAdmin(data) { return request({ url: '/admin', method: 'post', data })}

// 编辑管理员
export function editAdmin(data) { return request({ url: '/admin', method: 'put', data })}

// 快捷修改管理员
export function quickEditAdmin(data) { return request({ url: '/admin', method: 'patch', data })}

// 删除管理员
export function delAdmin(data) { return request({ url: '/admin', method: 'delete', data })}