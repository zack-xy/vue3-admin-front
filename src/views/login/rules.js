export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('密码至少6位以上'))
    } else {
      callback()
    }
  }
}
