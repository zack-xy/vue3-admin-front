<template>
  <div class="header-search" :class="{show: isShow}">
    <svg-icon class-name="search-icon" icon="search" @click.stop="onShowClick">
    </svg-icon>
    <el-select
    ref="headerSearchSelectRef"
    class="header-search-select"
    v-model="search"
    filterable
    default-first-option
    remote
    :remote-method="querySearch"
    placeholder="search"
    @change="onSelectChange"
    >
    <el-option
      v-for="option in searchOptions"
      :key="option.item.path"
      :value="option.item"
      :label="option.item.title.join(' >  ')"></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { filterRoutes } from '@/utils/route'
import { generateRoutes } from './FuseData'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { watchSwitchLang } from '@/utils/i18n'

const isShow = ref(false)
const search = ref('')

const router = useRouter()

let searchPool = computed(() => {
  const filterRouters = filterRoutes(router.getRoutes())
  return generateRoutes(filterRouters)
})

// 模糊搜索
let fuse

const initFuse = searchPool => {
  fuse = new Fuse(searchPool, {
  // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过该值认为是匹配的
    minMatchCharLength: 1,
    // 搜索的键列表
    // name: 键
    // weight: 权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}

initFuse(searchPool.value)

const onShowClick = () => {
  isShow.value = !isShow.value
}

const searchOptions = ref([])
const querySearch = query => {
  if (query) {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}

watch(isShow, val => {
  if (val) {
    headerSearchSelectRef.value.focus()
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

const headerSearchSelectRef = ref(null)
const onClose = () => {
  headerSearchSelectRef.value.blur()
}

const onSelectChange = val => {
  router.push(val.path)
  isShow.value = false
  searchOptions.value = []
}

watchSwitchLang(() => {
  searchPool = computed(() => {
    const filterRouters = filterRoutes(router.getRoutes())
    return generateRoutes(filterRouters)
  })
  initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  div:first-child {
    display: inline-block;
  }
  ::v-deep .search-icon {
    cursor: pointer;
    font-size: 24px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
