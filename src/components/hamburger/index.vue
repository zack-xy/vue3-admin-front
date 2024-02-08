
<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon id="guide-hamurger" class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const icon = computed(() => {
  return store.getters.sidebarOpened ? 'hambuger-opened' : 'hambuger-closed'
})

const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    font-size: 30px;
    display: inline-block;
    vertical-align: middle;
    width: 30px;
    height: 46px;
  }
}
</style>
