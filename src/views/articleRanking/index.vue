<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox v-for="(item, index) in dynamicData" :label="item.label" :key="index">
            {{item.label}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
        <template v-if="item.prop === 'publishDate'" #default="{row}">
          {{$filters.relativeTime(row.publishDate)}}
        </template>
        <template v-else-if="item.prop === 'action'" #default="{row}">
          <el-button type="primary" @click="handleShow(row)">{{$t('msg.article.show')}}</el-button>
          <el-button type="danger" @click="handleDelete(row)">{{$t('msg.article.delete')}}</el-button>
        </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="size" :page-sizes="[5, 10, 30, 100, 200]" layout="total, sizes, pager, prev, next, jumper" :total="total"></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated } from 'vue'
import { getArticleList } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { dynamicData, selectDynamicLabel, tableColumns } from './dynamic'

const tableData = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)

const getListData = async () => {
  const { list, total: resTotal } = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = list
  total.value = resTotal
}

const handleShow = row => {

}

const handleDelete = row => {

}

const handleSizeChange = currentSize => {
  size.value = currentSize
  getListData()
}
const handleCurrentChange = currentPage => {
  page.value = currentPage
  getListData()
}

getListData()
watchSwitchLang(getListData)
onActivated(getListData)
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  ::v-deep .el-table__row {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    justify-content: center;
  }
}
</style>
