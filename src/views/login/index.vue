<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">{{$t('msg.login.title')}}</h3>
        <lang-select class="lang-select" />
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <!-- <svg-icon icon="https://res.lgdsunday.club/user.svg"/> -->
          <svg-icon icon="profile"/>
        </span>
        <el-input v-model="loginForm.username" placeholder="请输入用户名" name="username" type="text"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
            <svg-icon icon="password"/>
        </span>
        <el-input v-model="loginForm.password " placeholder="请输入密码" name="password" :type="passwordType"></el-input>
        <span class="show-pwd" @click="onChangePwdType">
          <svg-icon :icon="passwordType === 'password'? 'close-eye': 'open-eye'"/>
        </span>
      </el-form-item>
      <el-button class="login-btn" type="primary" :loading="loading" @click="handleLogin">{{$t('msg.login.loginBtn')}}</el-button>

      <div class="tips" v-html="$t('msg.login.desc')">

      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { validatePassword } from './rules'
import { useStore } from 'vuex'
import LangSelect from '@/components/LangSelect/index'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
const loginRules = ref({
  username: [
    { required: true, trigger: 'blur', message: i18n.t('msg.login.usernameRule') }
  ],
  password: [
    { required: true, trigger: 'blur', validator: validatePassword() }
  ]
})

const passwordType = ref('password')

const onChangePwdType = () => {
  if (passwordType.value === 'password') passwordType.value = 'text'
  else passwordType.value = 'password'
}

const loading = ref(false)
const store = useStore()
const loginFormRef = ref(null)
const handleLogin = () => {
  loginFormRef.value.validate(async valid => {
    if (!valid) return
    loading.value = true
    try {
      const res = await store.dispatch('user/login', loginForm.value)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
    loading.value = false
  })
}
</script>

<style lang="scss" scoped>
$bg: #5a5e87;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255,255,255,0.1 );
      background-color: rgba(0,0,0,0.1 );
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      .el-input__wrapper {
        width: 100%;
        background-color: transparent;
        box-shadow: none;
      }

      input {
        height: 47px ;
        background: transparent;
        border: none;
        border-radius: 0;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
      }
    }

    .login-btn {
      width: 100%;
      margin-bottom: 30px;
    }
    .tips {
      font-size: 16px;
      color: white;
      line-height: 24px;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold  ;
    }
  }

  .show-pwd {
     position: absolute;
     right: 10px;
     top: 7px;
     font-size: 16px;
     color: $dark_gray;
     cursor: pointer;
     user-select: none;
  }
  .lang-select {
    position: absolute;
    top: 4px;
    right: 0;
    background-color: #fff;
    font-size: 22px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
