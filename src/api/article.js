import { postRequest } from '@/utils/request'

// 获取所有文章
export const getArticleList = data => postRequest('/article/list', data)
