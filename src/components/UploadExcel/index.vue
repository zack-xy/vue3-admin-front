<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" size="large" type="primary" @click="handleUpload">
      {{$t('msg.uploadExcel.upload')}}</el-button>
    </div>
    <input ref="excelUploadInput" type="file" class="excel-upload-input" accept=".xlsx,.xls" @change="handleChange"/>

    <div class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragOver"
      @dragenter.stop.prevent="handleDragOver">
      <UploadFilled  style="width: 4em; height: 4em;"/>
      <span>{{$t('msg.uploadExcel.drop')}}</span>
    </div>
  </div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { ref, defineProps } from 'vue'
import XLSX from 'xlsx'
import { getHeaderRow, isExcel } from './utils'
import { showMessage } from '@/utils/tools'

const props = defineProps({
  // 上传之前的回调
  beforeUpload: Function,
  // 上传之后的回调
  onSuccess: Function
})

const loading = ref(false)
const excelUploadInput = ref(null)
const handleUpload = () => {
  excelUploadInput.value.click()
}
const handleChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return false
  upload(rawFile)
}

// 拖拽上传
// 拖拽放置时触发
const handleDrop = e => {
  if (loading.value) return false
  const files = e.dataTransfer.files
  if (files.length !== 1) return showMessage('请选择文件', 'warning')
  const rawFile = files[0]
  if (!isExcel(rawFile)) return showMessage('只支持Excel文件上传', 'warning')
  upload(rawFile)
}

// 拖拽到目标区域触发
const handleDragOver = e => {
  e.dataTransfer.dropEffect = 'copy' // 视觉反馈
}

// 触发上传事件
const upload = rawFile => {
  excelUploadInput.value.value = null
  if (!props.beforeUpload) {
    readerData(rawFile)
    return false
  }
  const before = props.beforeUpload(rawFile)
  if (before) readerData(rawFile)
}

// 读取数据
const readerData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = e => {
      // 获取到解析的数据
      const data = e.target.result
      // 利用XLSX对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 获取第一张表格名称
      const firstSheetName = workbook.SheetNames[0]
      // 获取sheet的数据
      const workSheet = workbook.Sheets[firstSheetName]
      // 解析数据的表头
      const header = getHeaderRow(workSheet)
      // 解析数据体
      const results = XLSX.utils.sheet_to_json(workSheet)
      // 传入解析后的数据
      generateData({ header, results })
      // 处理loading
      loading.value = false
      // 成功回调
      resolve()
    }

    reader.readAsArrayBuffer(rawFile)
  })
}

// 根据导入内容，生成数据
const generateData = excelData => {
  props.onSuccess && props.onSuccess(excelData)
}

</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,.drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #bbb;
  }
}
</style>
