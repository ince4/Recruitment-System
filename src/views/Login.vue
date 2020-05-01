<template>
  <el-container>
    <div class="login-container">
      <div class="title">人才招聘平台</div>

      <div class="action" @click="changeAction">
        <span id="login" :class="{'selected' : action === 'login', 'admin-login' : userType === 'admin'}" v-html="userType === 'user' ? '登陆' : '管理员登陆'"></span>
        <span id="register" :class="{'selected' : action === 'register'}" v-if="userType === 'user'">注册</span>
      </div>

      <div class="subtitle">用户名</div>
      <el-input id="user-name" placeholder="输入用户名" v-model="userName"></el-input>

      <div class="subtitle">密码</div>
      <el-input id="password" placeholder="输入密码" v-model="password" show-password></el-input>

      <div v-if="action ==='register'" class="subtitle">密码确认</div>
      <el-input id="password-confirm" v-model="passwordConfirm" v-if="action ==='register'" placeholder="重复输入密码" show-password></el-input>
      
      <div class="change-user-type">
        <span v-html="userType === 'user' ? '管理员入口>' : '用户入口>'"
          v-if="action ==='login'"
          @click="changeUser">
        </span>
      </div>
      <el-button type="danger" v-if="action ==='login'">登陆</el-button>
      <el-button type="danger" v-else>注册</el-button>
    </div>
  </el-container>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        userType: 'user',
        action: 'login',
        userName: '',
        password: undefined,
        passwordConfirm: undefined
      }
    },
    methods: {
      changeAction (e) {
        if(e.target.tagName === 'SPAN') {
          this.action = e.target.id
          if (this.userType === 'user') {
            this.userName =''
            this.password = undefined
            this.passwordConfirm = undefined
          }
        }
      },
      changeUser () {
        if (this.userType === 'user') {
          this.userType = 'admin'
          this.userName ='admin'
          this.password = 'admin'
        } else {
          this.userType = 'user'
          this.userName =''
          this.password = undefined
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

        +.el-input {
          display: block;
          width: 400px;
          margin-bottom: 20px;
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