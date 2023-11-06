<template>
  <el-dialog
    :title="$t('msg.universal.title')"
    :model-value="modelValue"
    @close="closed"
    width="22%">
    <div class="content">
      <p class="title">{{$t('msg.navBar.themeColorChange')}}</p>
      <el-color-picker v-model="color" :predefine="predefineColors"/>
    </div>
    <template #footer>
      <el-button @click="closed">{{$t('msg.universal.cancel')}}</el-button>
      <el-button type="primary" @click="confirm">{{$t('msg.universal.confirm')}}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])
const store = useStore()

const color = ref(store.getters.mainColor)
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255,69,0,0.68)',
  'rgba(255,120,0)',
  'rgba(51,100,98)',
  'rgba(120,40,94,0.5)',
  'rgba(181,100%,37%)',
  'rgba(209,100%,56%,0.73)',
  '#c7158577'
]

const closed = () => {
  emits('update:modelValue', false)
}
const confirm = async () => {
  const newStyle = await generateNewStyle(color.value)
  writeNewStyle(newStyle)
  closed()
  store.commit('theme/setMainColor', color.value)
}
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
