<template>
  <div>
    <el-card>
      <el-table :data="allRoles" border style="width: 100%;">
        <el-table-column type="index" :label="$t('msg.role.index')" width="120"></el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="name"></el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="describe"></el-table-column>
        <el-table-column :label="$t('msg.role.action')" width="200" #default="{row}">
          <el-button type="primary" size="mini" @click="handleAssignPermission(row)">
            {{$t('msg.role.assignPermissions')}}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission v-model="dialogVisible" :roleId="roleId" @updatePermission="getAllRoleList"></distribute-permission>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getRoleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import DistributePermission from './components/DistributePermission'

const allRoles = ref([])
const getAllRoleList = async () => {
  allRoles.value = await getRoleList()
}
getAllRoleList()
watchSwitchLang(getAllRoleList)

const dialogVisible = ref(false)
const roleId = ref('')
const handleAssignPermission = (row) => {
  dialogVisible.value = true
  roleId.value = row.id
}
</script>

<style lang="scss" scoped>

</style>
