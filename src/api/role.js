import { postRequest } from '@/utils/request'

// 获取所有角色
export const getRoleList = data => postRequest('/role/list', data)

// 获取当前角色对应的权限
export const rolePermission = roleId => postRequest('/role/permission', { roleId })
