<template>
  <el-dialog
  :title="$t('msg.excel.roleDialogTitle')"
  :model-value="modelValue"
  @close="handleClosed"
  >
  <el-tree
    ref="treeRef"
    :data="allPermissions"
    :props="defaultProps"
    node-key="id"
    show-checkbox
    check-strictly
    default-expand-all
    >

  </el-tree>
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
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'
import { showMessage } from '@/utils/tools'
import { useI18n } from 'vue-i18n'
import { rolePermission } from '@/api/role'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})

const treeRef = ref(null)
const emits = defineEmits(['update:modelValue', 'updatePermission'])
const handleClosed = () => {
  emits('update:modelValue', false)
}

const i18n = useI18n()
const handleConfirm = async () => {
  showMessage(i18n.t('msg.role.updatePermissionSuccess'))
  emits('updatePermission')
  handleClosed()
}

const allPermissions = ref([])
const getPermissionList = async () => {
  allPermissions.value = await permissionList()
}
getPermissionList()
watchSwitchLang(getPermissionList)

const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  treeRef.value.setCheckedKeys(checkedKeys)
}
watch(() => props.roleId, val => {
  if (val) getRolePermission()
})

const defaultProps = {
  children: 'children',
  label: 'permissionName'
}
</script>

<style lang="scss" scoped>

</style>
