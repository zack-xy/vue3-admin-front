<template>
  <div class="app-wrapper" :class="[$store.getters.sidebarOpened ? 'open-sidebar':'hidden-sidebar']">
    <!--左侧menu-->
    <SideBar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
      />
    <div class="main-container">
      <div class="fixed-header">
        <!--顶部navbar-->
        <NavBar />
        <tags-view id="guide-tags"/>
      </div>
      <!--内容区-->
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar'
import AppMain from './components/AppMain.vue'
import TagsView from '@/components/TagsView'
import variables from '@/style/variables.module.scss'

console.log(variables)
console.log(variables.menuBg)
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
@import '@/style/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hidden-sidebar {
  .fixed-header {
    width: calc(100% - #{$hideSideBarWidth});
  }
}

</style>
