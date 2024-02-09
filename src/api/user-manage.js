import { postRequest } from '@/utils/request'

export const getUserManageList = data => {
  return postRequest('/user-manage/list', data)
}

// Excel批量上传
export const userBatchImport = data => postRequest('/user-manage/batch/import', data)
