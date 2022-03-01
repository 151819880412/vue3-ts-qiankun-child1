<template>
  <div class="login-weaper animated bounceInDown">
    <div class="login-border">
      <div class="login-main">
        <el-form ref="loginForms" :model="loginForm" class="login-form" status-icon label-width="0">
          <el-form-item prop="userAccount">
            <el-input v-model="loginForm.userAccount" size="small" auto-complete="new-userPwd" :maxlength="18"
              @keyup.enter="handleLogin">
            </el-input>
          </el-form-item>
          <el-form-item prop="userPwd">
            <el-input type="userPwd" v-model="loginForm.userPwd" size="small" auto-complete="new-userPwd" show-userPwd
              :maxlength="18" @keyup.enter="handleLogin">
            </el-input>
          </el-form-item>
          <el-button type="primary" size="small" class="login-submit" @click.prevent="handleLogin">
            登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    reactive,
    toRefs,
    onBeforeMount,
    onMounted,
    getCurrentInstance,
  } from 'vue'

  import {
    iniLogin,
    iniLogin2,
    roleMenuLists
  } from '@/api/login/login'
  import {
    router
  } from "@/router/index.ts";
  import {
    useStore
  } from 'vuex';
  import {
    UserActionTypes
  } from '@/store/modules/user/action-types'

  export default {
    name: '',
    props: [],
    setup() {
      let store = useStore()

      //  获取当前实例
      const ctx = getCurrentInstance()
      // console.log('1-开始创建组件-setup')

      const loginForm = reactive({
        tenantId: 3,
        userAccount: 'superadmin',
        userPwd: "oD02CTiX3oUYYLiFOYlsPsM770PDfyID",
      })
      const state = reactive({
        loginForm: {
          tenantId: 3,
          userAccount: 'superadmin',
          userPwd: 'oD02CTiX3oUYYLiFOYlsPsM770PDfyID',
        }
      })

      onBeforeMount(() => {
        // console.log('2.组件挂载页面之前执行----onBeforeMount')
      })
      onMounted(() => {
        // console.log('3.-组件挂载到页面之后执行-------onMounted')
      })
      const handleLogin = async () => {
        // let data = await iniLogin(state.loginForm)
        let data = await iniLogin2(state.loginForm)
        console.log(data)
        store.dispatch(UserActionTypes.ACTION_LOGIN, data.token)

        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);

        let roleResData = await roleMenuLists(data.user.userId);
        localStorage.setItem('getRoutesLists', JSON.stringify(roleResData.data));
        router.replace('/personnelManagement/departmentInformation');

      }
      const showPassword = () => {

      }
      return {
        ...toRefs(state),
        // loginForm,
        handleLogin,
        showPassword,
        loginRules: {
          userAccount: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          userPwd: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          tenantId: [{
            required: true,
            message: '请选择租户',
            trigger: 'blur'
          }]
        }
      }
    },
  }
</script>
<style scoped>
</style>