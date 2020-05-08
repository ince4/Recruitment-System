<template>
	<el-container>
		<el-header>
      <span class="title">{{pageTitle}}</span>
      <span class="username">{{username}}</span>
			<span class="usertype">{{usertype}}</span>
		</el-header>
	</el-container>
</template>
<script>
  export default {
    data() {
      return {
        pageTitle: '',
				username: '',
				usertype: ''
      }
		},
		created() {
      this.username = this.$cookies.get('username')
       
      if (this.$cookies.get('usertype') === 'company') {
        this.usertype = '公司'
      } else if (this.$cookies.get('usertype') === 'candidate') {
        this.usertype = '求职'
      }
    },
    watch: {
      $route() {
        this.pageTitle = this.$route.name
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;

    .title {
      font-size: 16px;
    }

    .usertype {
      float: right;
      font-size: 12px;
      margin-right: 10px;
    }

    .username {
      float: right;
      font-size: 12px;
    }
  }
</style>