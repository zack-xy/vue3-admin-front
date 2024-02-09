<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'
import { userBatchImport } from '@/api/user-manage'
import { USER_RELATIONS } from './utils'
import { useI18n } from 'vue-i18n'
import { showMessage } from '@/utils/tools'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const router = useRouter()

const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  console.log('updateData', updateData)
  await userBatchImport(updateData)
  showMessage(results.length + i18n.t('msg.excel.importSuccess'))
  router.push('/user/manage')
}

const generateData = results => {
  const arr = []
  results.forEach(item => {
    const userInfo = {}

    Object.keys(item).forEach(key => {
      userInfo[USER_RELATIONS[key]] = item[key]
    })

    arr.push(userInfo)
  })
  return arr
}
</script>

<style lang="scss" scoped>

</style>
