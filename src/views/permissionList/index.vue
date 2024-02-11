<template>
  <el-card>
    <el-table
    :data="allPermission"
    style="width:100%"
    border
    row-key="id"
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
    <el-table-column
      prop="permissionName"
      :label="$t('msg.permission.name')"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="permissionMark"
      :label="$t('msg.permission.mark')"
      width="200"
    >
    </el-table-column>
    <el-table-column
      prop="permissionDesc"
      :label="$t('msg.permission.desc')"
    >
    </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'

const allPermission = ref([])
const getPermisssonList = async () => {
  allPermission.value = await permissionList()
  console.log('allPermission', allPermission.value)
}
getPermisssonList()
watchSwitchLang(getPermisssonList)
</script>

<style lang="scss" scoped>

</style>
