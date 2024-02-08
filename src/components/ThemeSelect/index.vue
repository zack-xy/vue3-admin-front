<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme-select"
    @command="handleSetTheme">
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <svg-icon id="guide-theme" icon="change-theme"></svg-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{$t('msg.navBar.themeColorChange')}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <div>
    <color-select v-model="selectColorVisible"></color-select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ColorSelect from './components/ColorSelect.vue'

const selectColorVisible = ref(false)

const handleSetTheme = command => {
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped>

</style>
