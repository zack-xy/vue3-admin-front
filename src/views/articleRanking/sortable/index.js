import Sortable from 'sortablejs'
import { ref } from 'vue'

export const tableRef = ref(null)

export const initSortable = () => {
  const el = tableRef.value.$el.querySelector('.el-table__body-wrapper table tbody')

  el && Sortable.create(el, {
    // 拖拽时类名
    ghostClass: 'sortable-ghost',
    // 拖拽完成回调
    onEnd (event) {
      const { newIndex, oldIndex } = event
      console.log(newIndex, oldIndex)
    }
  })
}
