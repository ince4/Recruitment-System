<template>
  <el-container>
    <el-form :model="jobData" label-width="80px">
      
      <el-form-item label="职位名称">
        <el-input v-model="jobData['职位名称']"></el-input>
      </el-form-item>

      <el-form-item label="人数">
        <el-input v-model="jobData['人数']" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
      </el-form-item>

      <!-- <el-form-item label="发布时间">
        <el-input v-model="jobData['发布时间']"></el-input>
      </el-form-item> -->

      <el-form-item label="任职要求">
        <el-input v-model="jobData['任职要求']"></el-input>
      </el-form-item>

      <el-form-item label="待遇">
        <el-input v-model="jobData['待遇']"></el-input>
      </el-form-item>

      <el-form-item label="是否补助">
        <el-radio-group v-model="jobData['是否补助']">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="联系方式">
        <el-input v-model="jobData['联系方式']"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即发布</el-button>
      </el-form-item>

    </el-form>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        jobData: {
          '职位名称': undefined,
          '人数': undefined,
          '发布时间': undefined,
          '任职要求': undefined,
          '待遇': undefined,
          '是否补助': undefined,
          '联系方式': undefined
        },
        username: ''
      }
    },
    created () {
      this.username = this.$cookies.get('username')
    },
    methods: {
      onSubmit() {
        let currentDate = new Date()
        currentDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
        this.jobData['发布时间'] = currentDate
        console.log(currentDate)

        let hasEmpty = false
				Object.values(this.jobData).forEach((item) => {
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

        // this.$axios.get(`/api/list?tablename=job`)
				// 	.then(res => {
        //     console.log(res)
        //     let job = res.data.find(item => item.username === this.username)
        //     console.log(a)
        // })

        const data = {
          username: this.username,
          jobData: this.jobData
        }

        this.$axios.post('/api/company/jobpublish', data)
					.then(res => {
						if (res.data.ok) {
							this.$alert('', '提交成功', {
								confirmButtonText: '确定',
							})
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