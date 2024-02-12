<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      ></el-input>

      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <markdown-article :title="title" @onSuccess="onSuccess"></markdown-article>
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <edit-article :title="title" @onSuccess="onSuccess"></edit-article>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import EditArticle from './components/EditArticle'
import MarkdownArticle from './components/MarkdownArticle'
import { ref } from 'vue'

const title = ref('')
const activeName = ref('markdown')

const onSuccess = () => {
  title.value = ''
}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
