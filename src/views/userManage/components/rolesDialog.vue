<template>
  <el-dialog
  :title="$t('msg.excel.roleDialogTitle')"
  :model-value="modelValue"
  @close="handleClosed"
  >
  <el-checkbox-group v-model="userRoleTitleList">
    <el-checkbox
      v-for="item in allRoles"
      :key="item.id"
      :label="item.name"
    ></el-checkbox>
  </el-checkbox-group>
  <template #footer>
    <div class="dialog-footer">
      <el-button @click="handleClosed">{{$t('msg.universal.cancel')}}</el-button>
      <el-button type="primary" @click="handleConfirm">{{$t('msg.universal.confirm')}}</el-button>
    </div>
  </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { getRoleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { userRoles, updateRole } from '@/api/user-manage'
import { showMessage } from '@/utils/tools'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue', 'updateRole'])
const handleClosed = () => {
  emits('update:modelValue', false)
}

const i18n = useI18n()
const handleConfirm = async () => {
  const roles = userRoleTitleList.value.map(name => {
    return allRoles.value.find(role => role.name === name)
  })

  await updateRole({
    userId: props.userId,
    roles
  })
  showMessage(i18n.t('msg.role.updateRoleSuccess'))
  emits('updateRole')
  handleClosed()
}

const allRoles = ref([])
const getAllRoleList = async () => {
  allRoles.value = await getRoleList()
}
getAllRoleList()
watchSwitchLang(getAllRoleList)

const userRoleTitleList = ref([])
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res
}
watch(() => props.userId, val => {
  if (val) getUserRoles()
})
</script>

<style lang="scss" scoped>

</style>
