import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'
export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSidebarOpened (state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage (state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    addTagsViewList (state, tag) {
      const isFind = state.tagsViewList.find(item => item.path === tag.path)
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    changeTagsView (state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    removeTagsView (state, payload) {
      const { type } = payload
      if (type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
      } else if (type === 'other') {
        state.tagsViewList = [state.tagsViewList[payload.index]]
      } else if (type === 'right') {
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1)
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  }
}
