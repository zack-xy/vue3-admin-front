import { postRequest } from '@/utils/request'

// 获取所有文章
export const getArticleList = data => postRequest('/article/list', data)

// 文章详情
export const articleDetail = data => postRequest('/article/detail', data)
