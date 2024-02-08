import { postRequest } from '@/utils/request'

export const getUserManageList = data => {
  return postRequest('/user-manage/list', data)
}
