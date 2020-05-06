<template>
	<el-container>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="公司名称">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="行业">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="地址">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="法人">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="注册资本">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="联系方式">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="其他介绍">
				<el-input type="textarea" v-model="form.desc" resize="none" rows="4"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">确定</el-button>
			</el-form-item>
		</el-form>
	</el-container>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
				},
				username: ''
      }
		},
		created() {
      this.username = this.$cookies.get('username')
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style lang="scss" scoped>
	.el-container {
		margin-top: 30px;
		
		.el-form {
			padding-left: 20px;;

			.el-button {
				display: inline-block;
				width: 189px;
			}
		}
	}
</style>