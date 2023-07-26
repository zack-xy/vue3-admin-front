import { ElMessage } from 'element-plus'

export const showMessage = (message = '', type = 'info') => {
  ElMessage.closeAll()
  ElMessage({
    showClose: true,
    message,
    type
  })
}
