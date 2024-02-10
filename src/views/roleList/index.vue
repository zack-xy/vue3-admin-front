<template>
  <div>
    <el-card>
      <el-table :data="allRoles" border style="width: 100%;">
        <el-table-column type="index" :label="$t('msg.role.index')" width="120"></el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="name"></el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="describe"></el-table-column>
        <el-table-column :label="$t('msg.role.action')" width="200">
          <el-button type="primary" size="mini">
            {{$t('msg.role.assignPermissions')}}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getRoleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'

const allRoles = ref([])
const getAllRoleList = async () => {
  allRoles.value = await getRoleList()
}
getAllRoleList()
watchSwitchLang(getAllRoleList)
</script>

<style lang="scss" scoped>

</style>
