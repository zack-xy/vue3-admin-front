<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card class="project-card" :features="featureData"></project-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature-card :features="featureData"></feature-card>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter-card></chapter-card>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author-card></author-card>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
import FeatureCard from './components/FeatrueCard.vue'
import ChapterCard from './components/ChapterCard.vue'
import AuthorCard from './components/AuthorCard.vue'
import { feature } from '@/api/user'
import { ref } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'

const activeName = ref('feature')

const featureData = ref([])
const getFeatureData = async () => {
  featureData.value = await feature()
}
getFeatureData()
watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped>
.project-card {
  margin-right: 20px;
}
</style>
