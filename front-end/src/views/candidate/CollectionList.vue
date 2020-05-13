<template>
    <el-container>
      <list-items @updateData="getListData()" :initTableData = tableData></list-items>
    </el-container>
</template>

<script>
  import ListItems from '../../components/ListItems'
  export default {
    data() {
      return {
        tableData: [],
        tablename: '',
        username: ''
      }
    },
    created() {
      this.username = this.$cookies.get('username')
      this.tablename = this.$route.query.table
      this.getListData()
    },
    watch: {
      $route() {
        this.tablename = this.$route.query.table
        this.getListData()
      }
    },
    methods: {
      async getListData () {
        let res = await this.$axios.get(`/api/collection/list?username=${this.username}&collectiontype=${this.tablename}`)
				if (res.data.ok) {
					this.tableData = res.data.data
				} else {
					this.tableData = []
				}
      }
    },
    components: {
      ListItems
    }
  };
</script>

<style lang="scss" scoped>
</style>