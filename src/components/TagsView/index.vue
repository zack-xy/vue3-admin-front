
<template>
  <div class="tags-view-container">
    <router-link
      v-for="(tag, index) in $store.getters.tagsViewList"
      :key="tag.fullPath"
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      :to="{path: tag.fullPath}"
      :style="{
        backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
        borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
      }">
      {{tag.title}}
      <svg-icon
        v-show="!isActive(tag)"
        class-name="close-icon"
        icon="close"
        @click.prevent.stop="onCloseClick(index)">
      </svg-icon>
    </router-link>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const isActive = (tag) => {
  return tag.path === route.path
}

const onCloseClick = () => {

}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    text-decoration: none;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    div:first-child {
      display: inline-block;
    }
    ::v-deep .close-icon {
      font-size: 16px;
      vertical-align: -0.25em;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      &:hover {
        transform: rotate(90deg) scale(1.1);
      }
    }
  }
}
</style>
