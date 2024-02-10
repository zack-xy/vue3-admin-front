<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="handleClosed"
    width="30%"
  >
  <el-input v-model="excelName" :placeholder="$t('msg.excel.placeholder')"></el-input>
  <template #footer>
    <div class="dialog-footer">
      <el-button @click="handleClosed">{{$t('msg.excel.close')}}</el-button>
      <el-button type="primary" @click="handleConfirm" :loading="loading">{{$t('msg.excel.confirm')}}</el-button>
    </div>
  </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { USER_RELATIONS } from './Export2ExcelConstants'
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

const loading = ref(false)
const handleConfirm = async () => {
  loading.value = true
  const { list: allUser } = await getUserManageAllList()

  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, allUser)
  excel.export_json_to_excel({
    // excel表头
    header: Object.keys(USER_RELATIONS),
    // excel数据
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName
    // 是否自动列宽
    // 文件类型

  })
  console.log(data)
  handleClosed()
}

const formatJson = (headers, rows) => {
  return rows.map(item => {
    return Object.keys(headers).map(key => {
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map(role => role.title))
      }
      return item[headers[key]]
    })
  })
}

const handleClosed = () => {
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped>

</style>
