import { articleCreate } from '@/api/article'
import { showMessage } from '@/utils/tools'
import i18n from '@/i18n'

const t = i18n.global.t

export const commitArticle = async data => {
  const res = await articleCreate(data)
  showMessage(t('msg.article.createSuccess'), 'success')
  return res
}
