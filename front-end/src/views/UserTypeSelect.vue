<template>
	<el-container>
		<div class="container" @click="userSelect">
			<div class="title">初次登陆请选择用户类型</div>
			<div class="input-container">
				<input id = "candidate" type="radio" name="usertype" value="candidate">
				<label for="candidate">人才</label>
				<input id = "company" type="radio" name="usertype" value="company">
				<label for="company">公司</label>
			</div>
			<div class="btn">
				<el-button type="primary" @click="confirm">确认</el-button>
			</div>
		</div>
	</el-container>
</template>

<script>
export default {
	data () {
		return {
			userType: 'unregistered'
		}
	},
	methods: {
		userSelect (e) {
			if (e.target.tagName === 'INPUT') {
				this.userType = e.target.value
			}
		},
		confirm () {
			if (this.userType !== 'unregistered') {
				this.$cookies.set('usertype', this.userType, '0')
				let username = this.$cookies.get('username')
				this.$axios.post('/api/usertype', {username, usertype: this.userType})
				if (this.userType === 'company') {
          this.$router.push({ path: '/index', query: {usertype: this.userType} })
        } else if (this.userType === 'candidate') {
          this.$router.push({ path: '/index', query: {usertype: this.userType} })
        }
			}
		}
	}
}
</script>

<style lang="scss" scoped>
    .container {
      background-color: white;
      // height: 300px;
			width: 300px;
      border-radius: 8px;
      padding: 20px;
      position: absolute;
      box-shadow: 0 12px 24px 0 rgba(28,31,33,.1);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

			.title {
				color: #606266;
				font-size: 18px;
				text-align: center;
				margin-bottom: 30px;
			}

			.input-container {
				display: flex;
				justify-content: space-around;
				input {
					display: none;

					& + label {
						display: inline-block;
						color: #909399;
						font-size: 22px;
					}

					&:checked + label {
						color: #409EFF;
					}
				}
			}

			.btn {
				margin-top: 20px;
				text-align: center;
			}
		}
</style>