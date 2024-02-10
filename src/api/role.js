import { postRequest } from '@/utils/request'

// 获取所有角色
export const getRoleList = data => postRequest('/role/list', data)
