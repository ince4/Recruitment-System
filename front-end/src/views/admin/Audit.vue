<template>
    <el-container>
    </el-container>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        tablename: '',
      }
    },
    created() {
      this.tablename = this.$route.query.table
			this.getList(this.tablename)
			
    },
    watch: {
      $route() {
        this.tablename = this.$route.query.table
        this.getList(this.tablename)
      }
    },
    methods: {
      async getList (tablename) {
        let res = await this.$axios.get(`/api/admin/application?tablename=${tablename}`)
        if (res.data.length !== 0) {
					this.tableData = res.data
				} else {
          this.tableData = []
        }
			}
		}
  }
</script>

<style lang="scss" scoped>

</style>