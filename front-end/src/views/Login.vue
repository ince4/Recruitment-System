<template>
  <el-container>
    <div class="login-container">
      <div class="title">人才招聘平台</div>

      <div class="action" @click="changeAction">
        <span id="login" :class="{'selected' : action === 'login', 'admin-login' : isAdmin}" v-html="isAdmin ? '管理员登录' : '登录' "></span>
        <span id="register" :class="{'selected' : action === 'register'}" v-if="!isAdmin">注册</span>
      </div>

      <div class="subtitle">用户名</div>
      <el-input id="user-name" :placeholder="username.placeholder" v-model="username.value" maxlength="20" minlength="3" :class="{'inputWarn': username.warn}"></el-input>

      <div class="subtitle">密码</div>
      <el-input id="password" :placeholder="password.placeholder" v-model="password.value" maxlength="20" minlength="3" :class="{'inputWarn': password.warn}" show-password></el-input>

      <div v-if="action ==='register'" class="subtitle">密码确认</div>
      <el-input id="password-confirm" v-model="passwordConfirm.value" v-if="action ==='register'" :placeholder="passwordConfirm.placeholder" maxlength="20" minlength="3" :class="{'inputWarn': passwordConfirm.warn}" show-password></el-input>
      
      <div class="change-user-type">
        <span v-html="isAdmin ? '用户入口>' : '管理员入口>'"
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
        isAdmin: false,
        action: 'login',
        userType: 'unregistered',
        username: {
          value: '',
          placeholder: '输入用户名',
          warn: false
        },
        password: {
          value: '',
          placeholder: '输入密码',
          warn: false
        },
        passwordConfirm: {
          value: '',
          placeholder: '确认密码',
          warn: false
        },
      }
    },
    mounted () {
    },
    components: {
      // CandidateNav
    },
    methods: {
      changeAction (e) {
        if (!this.isAdmin) {
          this.inputBoxInit()
        }
        
        if(e.target.tagName === 'SPAN') {
          this.action = e.target.id
          if (!this.isAdmin) {
            this.username.value =''
            this.password.value = ''
            this.passwordConfirm.value = ''
          }
        }
      },

      changeUser () {
        
        if (!this.isAdmin) {
          this.isAdmin = true
          this.username.value ='admin1'
          this.password.value = 'admin1'
        } else {
          this.inputBoxInit()
          this.isAdmin = false
        }
      },

      inputBoxInit () {
        this.username = {
          value: '',
          placeholder: '输入用户名',
          warn: false
        }
        this.password = {
          value: '',
          placeholder: '输入密码',
          warn: false
        }
        this.passwordConfirm = {
          value: '',
          placeholder: '确认密码',
          warn: false
        }
      },

      inputFormat (inputBox) {
        const pattern = /^[\w_-]{6,20}$/
        let result = pattern.test(inputBox.value)
        if (!result) {
          inputBox.placeholder = '格式不正确'
          inputBox.warn = true
        }
        return result
      },

      async login () {
        this.username.warn = false
        this.password.warn = false
        this.passwordConfirm.warn = false

        if (!this.inputFormat(this.username) || !this.inputFormat(this.password)) {
          return
        }

        const data = {
          username: this.username.value,
          password: this.password.value
        }

        this.username.warn = false
        this.password.warn = false

        if (!this.isAdmin) {
          let res = await this.$axios.post('/api/login', data)
          if (res.data.ok) {
            // session
            this.$cookies.set('loginStatus', 'logged', '0')
            this.$cookies.set('username', res.data.username, '0')
            this.$cookies.set('usertype', res.data.usertype, '0')

            this.$alert('页面即将跳转', '登录成功', {
              confirmButtonText: '确定',
              callback: () => {
                if (res.data.usertype === 'unregistered') {
                  this.$router.push('/usertypeselect')
                } else if (res.data.usertype === 'company') {
                  this.$router.push({ path: '/index', query: {usertype: 'company'} })
                } else if (res.data.usertype === 'candidate') {
                  this.$router.push({ path: '/index', query: {usertype: 'candidate'} })
                }
              }
          })
          } else {
            this.password.value = ''
            this.username.placeholder = '用户名或密码错误'
            this.password.placeholder = '用户名或密码错误'
            this.username.warn = true
            this.password.warn = true
          }
        }
      },

      async register () {
        this.username.warn = false
        this.password.warn = false
        this.passwordConfirm.warn = false

        if (!this.inputFormat(this.username) || !this.inputFormat(this.password) || !this.inputFormat(this.passwordConfirm)) {
          return
        }

        if (this.password.value !== this.passwordConfirm.value) {
          
            this.password.value = ''
            this.passwordConfirm.value = ''
            this.passwordConfirm.placeholder = '密码不一致'
            this.password.placeholder = '密码不一致'
            this.passwordConfirm.warn = true
            this.password.warn = true
            return 
        }
        
        const data = {
          username: this.username.value,
          password: this.password.value
        }
        
        let res = await this.$axios.post('/api/register', data)
        if (res.data.ok) {
          this.$alert('', '注册成功', {
            confirmButtonText: '确定',
            callback: () => {
              this.action = 'login'
              this.inputBoxInit()
            }
          })
        } else {
          this.$alert('用户名已被注册', '注册失败', {
            confirmButtonText: '确定'
          })
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