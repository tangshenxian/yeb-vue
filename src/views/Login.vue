<template>
  <div>
    <el-form ref="loginForm"
             :model="loginForm"
             :rules="rules"
             v-loading="loading"
             element-loading-text="正在登录"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
             class="loginContainer">
      <h3 class="loginTitle">系统登陆</h3>
      <el-form-item prop="username">
        <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码"
                  class="loginCaptcha"></el-input>
        <img :src="captchaUrl" @click="updateCaptcha">
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked">记住我</el-checkbox>
      </el-form-item>
      <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>
<script>
import {login} from "@/api/login";

export default {
  name: "Login",
  data() {
    return {
      captchaUrl: '/captcha?time=' + new Date(),
      checked: true,
      loading: false,
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      rules: {
        username: [{required: true, message: "请输入用户名", trigger: 'blur'}],
        password: [{required: true, message: "请输入密码", trigger: 'blur'}],
        code: [{required: true, message: "请输入验证码", trigger: 'blur'}],
      },
    }
  },
  created() {

  },
  methods: {
    updateCaptcha() {
      this.captchaUrl = '/captcha?time=' + new Date()
    },
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          login(this.loginForm).then(res => {
            this.loading = false
            if (res) {
              const token = res.data.tokenHead + res.data.token
              window.sessionStorage.setItem("token", token)
              this.$router.replace('/home')
            }
            console.log(res);
          }).catch(error => {
            this.loading = false
            this.$message.error(error.message)
          })
        } else {
          this.$message.error('请输入完整的登陆信息');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 0 auto 30px auto;
  text-align: center;
}

.loginCaptcha {
  width: 250px;
  margin-right: 5px;
}

/deep/.el-form-item__content {
  display: flex;
  align-items: center;
}
</style>
