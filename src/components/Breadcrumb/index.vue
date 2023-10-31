<template>
  <el-breadcrumb class="bread-crumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadCrumbData" :key="item.path">
        <span v-if="index === breadCrumbData.length-1" class="no-redirect">{{item.meta.title}}</span>
        <span v-else class="redirect" @click="handleLinkClick(item)">{{item.meta.title}}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const route = useRoute()
const router = useRouter()

const linkHoverColor = ref(store.getters.cssVar.menuBg)
const breadCrumbData = ref([])
const getBreadCrumbData = () => {
  breadCrumbData.value = route.matched.filter(item => item.meta && item.meta.title)
}

const handleLinkClick = (item) => {
  router.push(item.path)
}

watch(route, () => {
  getBreadCrumbData()
}, { immediate: true })
</script>

<style lang="scss" scoped>
.bread-crumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .redirect {
    color: #666;
    font-weight: 600;
    &:hover {
      cursor: pointer;
      color: v-bind(linkHoverColor);
    }
  }

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
