import { postRequest } from '@/utils/request'

// 查询用户数据
export const getUserManageList = data => {
  return postRequest('/user-manage/list', data)
}

// 查询所有用户数据
export const getUserManageAllList = () => postRequest('/user-manage/all-list', {})

// Excel批量上传
export const userBatchImport = data => postRequest('/user-manage/batch/import', data)

// 删除用户
export const deleteUser = id => postRequest('/user-manage/delete', { id })

// 获取用户详情
export const getUserDetail = id => postRequest('/user-manage/detail', { id })

// 获取指定用户的角色
export const userRoles = id => postRequest('/user-manage/role', { id })

// 用户分配角色
export const updateRole = data => postRequest('/user-manage/role/change', data)
