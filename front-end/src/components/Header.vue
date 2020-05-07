<template>
	<el-container>
		<el-header>
      <span class="title">{{pageTitle}}</span>
			<span class="username">{{username}}</span>
		</el-header>
	</el-container>
</template>
<script>
  export default {
    data() {
      return {
        pageTitle: '',
				username: ''
      }
		},
		created() {
      this.username = this.$cookies.get('username')
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

    .username {
      float: right;
      font-size: 12px
    }
  }
</style>