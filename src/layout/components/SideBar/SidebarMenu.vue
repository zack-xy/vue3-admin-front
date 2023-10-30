<template>
  <el-menu
    :unique-opened="true"
    default-active="2"
    background-color="545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!-- <el-sub-menu index="1">
      <template #title>
        <el-icon><Location /></el-icon>
        <span>导航一</span>
      </template>
      <el-menu-item index="1-1">选项一</el-menu-item>
      <el-menu-item index="1-2">选项二</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><Location /></el-icon>
      <template #title>导航四</template>
    </el-menu-item> -->
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item">
    </sidebar-item>
  </el-menu>
</template>

<script setup>
// import { Location } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { filterRoutes, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()

const routes = computed(() => {
  const filteredRoutes = filterRoutes(router.getRoutes())
  return generateMenus(filteredRoutes)
})

console.log(routes.value)

</script>

<style lang="scss" scoped>

</style>
