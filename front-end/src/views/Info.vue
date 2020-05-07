<template>
	<el-container>
		<el-form :model="companyForm" label-width="80px" v-if="usertype === 'company'">
			<el-form-item label="公司名称">
				<el-input v-model="companyForm.name"></el-input>
			</el-form-item>
			<el-form-item label="行业">
				<el-input v-model="companyForm.profession"></el-input>
			</el-form-item>
			<el-form-item label="地址">
				<el-input v-model="companyForm.address"></el-input>
			</el-form-item>
			<el-form-item label="法人">
				<el-input v-model="companyForm.artificial"></el-input>
			</el-form-item>
			<el-form-item label="注册资本">
				<el-input v-model="companyForm.capital"></el-input>
			</el-form-item>
			<el-form-item label="联系方式">
				<el-input v-model="companyForm.contact"></el-input>
			</el-form-item>
			<el-form-item label="其他介绍">
				<el-input type="textarea" v-model="companyForm.intro" resize="none" rows="4"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">确定</el-button>
			</el-form-item>
		</el-form>

		<el-form :model="candidateForm" label-width="80px" v-if="usertype === 'candidate'">
			<el-form-item label="姓名">
				<el-input v-model="candidateForm.name"></el-input>
			</el-form-item>
			<el-form-item label="年龄">
				<el-input v-model="candidateForm.age" maxlength="3" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
			</el-form-item>
			<el-form-item label="籍贯">
				<el-input v-model="candidateForm.nativePlace"></el-input>
			</el-form-item>
			<el-form-item label="求职类型">
				<el-input v-model="candidateForm.type"></el-input>
			</el-form-item>
			<el-form-item label="学历">
				<el-input v-model="candidateForm.educationalBackground"></el-input>
			</el-form-item>
			<el-form-item label="联系方式">
				<el-input v-model="candidateForm.contact"></el-input>
			</el-form-item>
			<el-form-item label="简介">
				<el-input type="textarea" v-model="candidateForm.intro" resize="none" rows="4"></el-input>
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
        companyForm: {
          name: '',
          profession: '',
          address: '',
          artificial: '',
          capital: '',
          contact: '',
          intro: '',
				},
        candidateForm: {
          name: '',
          type: '',
          age: '',
          nativePlace: '',
          educationalBackground: '',
          intro: '',
          contact: '',
				},
				username: '',
				usertype: ''
      }
		},
		created() {
      this.username = this.$cookies.get('username')
			this.usertype = this.$cookies.get('usertype')
    },
    methods: {
      onSubmit() {
        if (this.usertype === 'company') {
					const data = {
						username: this.username,
						formData: this.companyForm
					}
					this.$axios.post('/api/company/info', data)
						.then(res => {console.log(res)})
				} else if (this.usertype === 'candidate') {
					const data = {
						username: this.username,
						formData: this.candidateForm
					}
					this.$axios.post('/api/candidate/info', data)
						.then(res => {console.log(res)})
				}
      }
    }
  }
</script>

<style lang="scss" scoped>
	.el-container {
		margin-top: 30px;
		
		.el-form {
			padding-left: 20px;

			.el-button {
				display: inline-block;
				width: 189px;
			}
		}
	}
</style>