import request from '../utils/request';

// 获取菜单列表
export const menuList = query => { return request({ url: '/menus', method: 'get', params: query }) };

// 获取树形菜单
export const menuTree = query => { return request({ url: '/menu/tree', method: 'get', params: query }) };

// 添加菜单
export const createMenu = query => { return request({ url: '/menu', method: 'post', params: query }); };

// 编辑菜单
export const editMenu = query => { return request({ url: '/menu', method: 'put', params: query }) };

// 快捷修改菜单
export const quickEditMenu = query => { return request({ url: '/menu', method: 'patch', params: query }) };

// 删除菜单
export const delMenu = query => { return request({ url: '/menu', method: 'delete', params: query }) };