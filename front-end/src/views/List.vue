<template>
    <el-container>
      <list-items :initTableData = tableData></list-items>
    </el-container>
</template>

<script>
  import ListItems from '../components/ListItems'
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
      this.getListData(this.tablename)
    },
    watch: {
      $route() {
        this.tablename = this.$route.query.table
        this.getListData(this.tablename)
      }
    },
    methods: {
      async getListData (tablename) {
        let res = await this.$axios.get(`/api/list?tablename=${tablename}`)
        if (res.data.length !== 0) {
          this.tableData = res.data
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