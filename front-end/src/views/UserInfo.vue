<template>
	<el-container>
		<el-form :model="tableData" label-width="80px" v-if="usertype === 'company'">
			<el-form-item label="公司名称">
				<el-input v-model="tableData['名称']"></el-input>
			</el-form-item>
			<el-form-item label="行业">
				<el-input v-model="tableData['行业']"></el-input>
			</el-form-item>
			<el-form-item label="地址">
				<el-input v-model="tableData['地址']"></el-input>
			</el-form-item>
			<el-form-item label="法人">
				<el-input v-model="tableData['法人']"></el-input>
			</el-form-item>
			<el-form-item label="注册资本">
				<el-input v-model="tableData['注册资本']"></el-input>
			</el-form-item>
			<el-form-item label="联系方式">
				<el-input v-model="tableData['联系方式']"></el-input>
			</el-form-item>
			<el-form-item label="其他介绍">
				<el-input type="textarea" v-model="tableData['其他介绍']" resize="none" rows="4"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">确定</el-button>
			</el-form-item>
		</el-form>

		<el-form :model="tableData" label-width="80px" v-if="usertype === 'candidate'">
			<el-form-item label="姓名">
				<el-input v-model="tableData['姓名']"></el-input>
			</el-form-item>
			<el-form-item label="年龄">
				<el-input v-model="tableData['年龄']" maxlength="3" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
			</el-form-item>
			<el-form-item label="籍贯">
				<el-input v-model="tableData['籍贯']"></el-input>
			</el-form-item>
			<el-form-item label="求职类型">
				<el-input v-model="tableData['求职类型']"></el-input>
			</el-form-item>
			<el-form-item label="学历">
				<el-input v-model="tableData['学历']"></el-input>
			</el-form-item>
			<el-form-item label="联系方式">
				<el-input v-model="tableData['联系方式']"></el-input>
			</el-form-item>
			<el-form-item label="简介">
				<el-input type="textarea" v-model="tableData['简介']" resize="none" rows="4"></el-input>
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
				username: '',
				usertype: '',
				tableData: {}
      }
		},
		created() {
      this.username = this.$cookies.get('username')
			this.usertype = this.$cookies.get('usertype')
			this.getListData(this.usertype)
    },
    methods: {
      onSubmit() {
				let hasEmpty = false
				Object.values(this.tableData).forEach((item) => {
					if (item === '' || item == null) {
						hasEmpty = true
						this.$alert('输入不能为空', '提交失败', {
							confirmButtonText: '确定',
						})
					}
				})
				
				if (hasEmpty) {
					return
				}

				let data = {
					username: this.username,
					formData: this.tableData
				}

        if (this.usertype === 'company') {
					this.$axios.post('/api/company/userinfo', data)
						.then(res => {
							if (res.data.ok) {
								this.$alert('', '提交成功', {
									confirmButtonText: '确定',
								})
							}
					})
				} else if (this.usertype === 'candidate') {
					this.$axios.post('/api/candidate/userinfo', data)
						.then(res => {
							if (res.data.ok) {
								this.$alert('', '提交成功', {
									confirmButtonText: '确定',
								})
							}
					})
				}
			},
			
			getListData (tablename) {
        this.$axios.get(`/api/list?tablename=${tablename}`)
					.then(res => {
            if (res.data.length > 0) {
							this.tableData = res.data.find(item => item.username === this.username)
            } else {
              this.tableData = {}
            }
        })
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
				width: 300px;
			}
		}
	}
</style>