<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box">

    </div>
    <div class="bottom">
      <el-button type="primary" @click="handleCommit">{{$t('msg.article.commit')}}</el-button>
    </div>
  </div>
</template>

<script setup>
import MKEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { useStore } from 'vuex'
import { onMounted, defineProps, defineEmits } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle } from './commit'

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['onSuccess'])

const store = useStore()

let mkEditor
let el

onMounted(() => {
  el = document.querySelector('#markdown-box ')
  initEditor()
})
const initEditor = () => {
  mkEditor = new MKEditor({
    el,
    // 高度
    height: '500px',
    // 样式
    previewStyle: 'vertical',
    // 国际化
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  mkEditor.getMarkdown()
}

const handleCommit = async () => {
  await commitArticle({
    title: props.title,
    content: mkEditor.getHTML()
  })
  mkEditor.reset()
  emits('onSuccess')
}

watchSwitchLang(() => {
  if (!el) return false
  const htmlStr = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
