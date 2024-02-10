<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="handleImportExcel">{{$t('msg.excel.importExcel')}}</el-button>
        <el-button type="success" @click="handleExportExcel">{{$t('msg.excel.exportExcel')}}</el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%;">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column :label="$t('msg.excel.name')" prop="userName"></el-table-column>
        <el-table-column :label="$t('msg.excel.mobile')" prop="mobile"></el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" prop="avatar" align="center">
          <template v-slot="{ row }">
            <el-image class="avatar" :src="row.avatar " :preview-src-list="[row.avatar]" :preview-teleported="true"></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{row}">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">
                {{item.title}}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{$t('msg.excel.defaultRole')}}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="openTime" :label="$t('msg.excel.openTime')" width="180"></el-table-column>
        <el-table-column prop="nowTime" :label="$t('msg.excel.nowTime')" width="180">
          <template #default="{row}">
            {{$filters.dateFilter(row.nowTime)}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.action')" fixed="right" width="250">
          <template #default="{row}">
            <el-button type="primary" size="small" @click="handleShow(row)">{{$t('msg.excel.show')}}</el-button>
            <el-button type="info" size="small">{{$t('msg.excel.showRole')}}</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">{{$t('msg.excel.remove')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="size" :page-sizes="[5, 10, 30, 100, 200]" layout="total, sizes, pager, prev, next, jumper" :total="total"></el-pagination>
    </el-card>

    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>
  </div>
</template>

<script setup>
import { ref, onActivated } from 'vue'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { showMessage } from '@/utils/tools'
import ExportToExcel from './components/Export2Excel'

const i18n = useI18n()

const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(5)

const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}

const handleShow = (row) => {
  router.push(`/user/info/${row.id}`)
}

const handleDelete = row => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') + row.userName + '?',
    'Warning',
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteUser(row.id)
    showMessage('已删除', 'success')
    getListData()
  })
}

const handleSizeChange = currentSize => {
  size.value = currentSize
  getListData()
}
const handleCurrentChange = currentPage => {
  page.value = currentPage
  getListData()
}

// Excel导入
const router = useRouter()
const handleImportExcel = () => {
  router.push('/user/import')
}

// Excel导出
const exportToExcelVisible = ref(false)
const handleExportExcel = () => {
  exportToExcelVisible.value = true
}

getListData()
watchSwitchLang(getListData)
onActivated(getListData) // 导入Excel文件后，页面keep-alive重新激活
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }

  ::v-deep .avatar{
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
