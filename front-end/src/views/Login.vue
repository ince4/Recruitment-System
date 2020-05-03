<template>
  <el-container>
    <div class="login-container">
      <div class="title">人才招聘平台</div>

      <div class="action" @click="changeAction">
        <span id="login" :class="{'selected' : action === 'login', 'admin-login' : userType === 'admin'}" v-html="userType === 'user' ? '登录' : '管理员登录'"></span>
        <span id="register" :class="{'selected' : action === 'register'}" v-if="userType === 'user'">注册</span>
      </div>

      <div class="subtitle">用户名</div>
      <el-input id="user-name" :placeholder="username.placeholder" v-model="username.value" maxlength="20" minlength="3" :class="{'inputWarn': username.warn}"></el-input>

      <div class="subtitle">密码</div>
      <el-input id="password" :placeholder="password.placeholder" v-model="password.value" maxlength="20" minlength="3" :class="{'inputWarn': password.warn}" show-password></el-input>

      <div v-if="action ==='register'" class="subtitle">密码确认</div>
      <el-input id="password-confirm" v-model="passwordConfirm.value" v-if="action ==='register'" :placeholder="passwordConfirm.placeholder" maxlength="20" minlength="3" :class="{'inputWarn': passwordConfirm.warn}" show-password></el-input>
      
      <div class="change-user-type">
        <span v-html="userType === 'user' ? '管理员入口>' : '用户入口>'"
          v-if="action ==='login'"
          @click="changeUser">
        </span>
      </div>
      <el-button type="danger" v-if="action ==='login'" @click="login">登录</el-button>
      <el-button type="danger" v-else @click="register">注册</el-button>
    </div>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        userType: 'user',
        action: 'login',
        username: {
          "value": undefined,
          "placeholder": '输入用户名',
          "warn": false
        },
        password: {
          "value": undefined,
          "placeholder": '输入密码',
          "warn": false
        },
        passwordConfirm: {
          "value": undefined,
          "placeholder": '确认密码',
          "warn": false
        },
      }
    },
    methods: {
      changeAction (e) {
        this.inputBoxInit()
        if(e.target.tagName === 'SPAN') {
          this.action = e.target.id
          if (this.userType === 'user') {
            this.username.value =''
            this.password.value = undefined
            this.passwordConfirm.value = undefined
          }
        }
      },

      changeUser () {
        this.inputBoxInit()
        if (this.userType === 'user') {
          this.userType = 'admin'
          this.username.value ='admin'
          this.password.value = 'admin'
        } else {
          this.userType = 'user'
          this.inputBoxInit()
        }
      },

      inputBoxInit () {
        this.username = {
          value: undefined,
          placeholder: '输入用户名',
          warn: false
        }
        this.password = {
          value: undefined,
          placeholder: '输入密码',
          warn: false
        }
        this.passwordConfirm = {
          value: undefined,
          placeholder: '确认密码',
          warn: false
        }
      },

      async login () {
        this.inputBoxInit()
        console.log(this.password.value)
        if (this.username.value == null) {
          this.username.placeholder = '用户名不能为空'
          this.username.warn = true
          return
        }

        if (this.password.value == null) {
          this.password.placeholder = '密码不能为空'
          this.password.warn = true
          return
        }

        const data = {
          username: this.username.value,
          password: this.password.value
        }
        
        if (this.userType === 'user') {
          let res = await this.$axios.post('/api/login', data)
          if (res.data.ok) {
            console.log(res.data.msg)
          } else {
            this.username.placeholder = '用户名或密码错误'
            this.password.placeholder = '用户名或密码错误'
            this.username.warn = true
            this.password.warn = true
          }
        }
      },

      async register () {
        this.inputBoxInit()
        // if (this.password.value !== this.password.valueConfirm) {

        // }
        
        const data = {
          username: this.username.value,
          password: this.password.value
        }
        
        let res = await this.$axios.post('/api/register', data)
        if (res.data.ok) {
          console.log(res.data.msg)
        } else {
          console.log(res.data.msg)
        }       
      }
    }
  };
</script>

<style lang="scss" scoped>
  .el-container {
    // background: url('../../public/49565477_p2_master1200.jpg');
    background-size: cover;
    height: 100vh;
    user-select: none;

    .title {
      color: #1c1f21;
      text-align: center;
      position: absolute;
      width: 100%;
      top: -50px;
      left: 0px;
    }

    .login-container {
      background-color: white;
      // height: 300px;
      border-radius: 8px;
      padding: 20px;
      position: absolute;
      box-shadow: 0 12px 24px 0 rgba(28,31,33,.1);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .action {
        margin-bottom: 20px;
        font-size: 16px;
        
        span{
          color:#909399;
          padding-right: 10px;
          display: inline-block;

          &.selected{
            color: rgb(238, 92, 92);
            font-weight: bold;

            &:after {
              content: '';
              display: block;
              width: 32px;
              height: 2px;
              background: rgb(238, 92, 92);
            }
          }

          &.admin-login:after {
              content: '';
              display: block;
              width: 81px;
              height: 2px;
              background: rgb(238, 92, 92);
          }
        }
      }

      .title {
        text-align: center;
        margin-bottom: 20px;
        font-weight: bold;
        font-size: 20px;
        color: #414142;
      }
      
      .subtitle {
        color: #606266;
        font-size: 14px;
        margin-bottom: 2px;

        +.el-input {
          display: block;
          width: 400px;
          margin-bottom: 20px;

          // &.inputWarn 
          &.inputWarn {
            ::v-deep .el-input__inner {
            border-radius: 4px;
            border: 1px solid rgb(247, 123, 123);
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            &::placeholder {
              color: rgb(250, 192, 192);
            }
          }
          }

        }
      }

      .change-user-type {
        text-align: right;
        font-size: 14px;
        color: #909399;
        margin-bottom: 10px;
        span {
          cursor: pointer;
        }
      }
      .el-button {
        width: 400px;
        margin-bottom: 10px;
      }
    }
  }
</style>