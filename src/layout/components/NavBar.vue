<template>
  <div class="navbar">
    <Hamburger />
    <Breadcrumb id="guide-breadcrumb" class="bread-container"/>
    <div class="right-menu">
      <!-- 指引 -->
      <guide class="right-menu-item hover-effect" />
      <!-- 搜索功能 -->
      <header-search id="guide-search" class="right-menu-item hover-effect" />
      <!-- 全屏切换 -->
      <screen-full class="right-menu-item hover-effect" />
      <!-- 主题颜色切换 -->
      <theme-select class="right-menu-item hover-effect" />
      <!-- 语言切换 -->
      <lang-select class="right-menu-item hover-effect" />
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40" :src="$store.getters.userInfo.avatar">
          </el-avatar>
          <el-icon :size="20">
            <Tools />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{$t('msg.navBar.home')}}</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://zack-xy.github.io/knownNet/">
              <el-dropdown-item>{{$t('msg.navBar.website')}}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">{{$t('msg.navBar.logout')}}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { Tools } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import Hamburger from '@/components/hamburger/index'
import Breadcrumb from '@/components/Breadcrumb/index'
import LangSelect from '@/components/LangSelect/index'
import ThemeSelect from '@/components/ThemeSelect/index'
import ScreenFull from '@/components/ScreenFull/index'
import HeaderSearch from '@/components/HeaderSearch/index'
import Guide from '@/components/Guide/index'
const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.5s;

  &:hover {
    background: rgba(0,0,0,0.1);
  }
}

.right-menu {
  display: flex;
  align-items: center;
  float: right;
  padding-right: 16px;

  ::v-deep .right-menu-item {
    display: inline-block;
    padding: 0 18px 0 0;
    font-size: 24px;
    color: #5a5e66;
    vertical-align: text-bottom;
    &.hover-effect {
      cursor: pointer;
    }
  }

  ::v-deep .avatar-container {
    cursor: pointer;
    .avatar-wrapper {
      margin-top: 5px;
      position: relative;
      .el-avatar {
        --el-avatar-background-color: none;
        margin-right: 12px ;
      }
    }
  }
}

.bread-container {
  float: left;
}
</style>
