import request from '../utils/request';

// 获取菜单列表
export function menuList(data) { return request({ url: '/menus', method: 'get', params: data })}

// 获取树形菜单
export function menuTree(data) { return request({ url: '/menu/tree', method: 'get', params: data })}

// 添加菜单
export function createMenu(data) { return request({ url: '/menu', method: 'post', data })}

// 编辑菜单
export function editMenu(data) { return request({ url: '/menu', method: 'put', data })}

// 快捷修改菜单
export function quickEditMenu(data) { return request({ url: '/menu', method: 'patch', data })}

// 删除菜单
export function delMenu(data) { return request({ url: '/menu', method: 'delete', data })}