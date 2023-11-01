<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme-select"
    @command="handleSetTheme">
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <svg-icon icon="change-theme"></svg-icon>
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
</template>

<script setup>
const handleSetTheme = command => {

}
</script>

<style lang="scss" scoped>

</style>
