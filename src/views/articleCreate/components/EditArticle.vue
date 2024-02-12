<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="handleCommit">{{$t('msg.article.commit')}}</el-button>
    </div>
  </div>
</template>

<script setup>
import E from 'wangeditor'
import { onMounted, defineProps, defineEmits } from 'vue'
import i18next from 'i18next'
import { useStore } from 'vuex'
import { commitArticle } from './commit'
const store = useStore()

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['onSuccess'])

// 初始化Editor实例
let editor
// 获取到dom
let el

onMounted(() => {
  el = document.querySelector('#editor-box')
  initEditor()
})

const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  // 国际化处理
  editor.config.lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  editor.create()
}

const handleCommit = async () => {
  await commitArticle({
    title: props.title,
    content: editor.txt.html()
  })
  editor.txt.html('')
  emits('onSuccess')
}
</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
