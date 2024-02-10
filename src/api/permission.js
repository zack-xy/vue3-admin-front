import { postRequest } from '@/utils/request'

// 获取所有权限
export const permissionList = data => postRequest('/permission/list', data)
