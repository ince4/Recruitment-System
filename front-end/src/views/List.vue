<template>
    <el-container>
      <el-header>  
        <el-input
          placeholder="请输入名称"
          prefix-icon="el-icon-search"
          v-model="searchStr"
          @input="search(searchStr, 2000)">
        </el-input>
    </el-header>
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
        username: '',
        searchStr: ''
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
      },
      
      async search (keyword) {
        let fieldname
        
        if (this.tablename === 'candidate') {
          fieldname = '姓名'
        } else if (this.tablename === 'company') {
          fieldname = '名称'
        } else if (this.tablename === 'job') {
          fieldname = '职位名称'
        }

        let res = await this.$axios.get(`/api/list/search?tablename=${this.tablename}&fieldname=${fieldname}&keyword=${keyword}`)
        if (res.data.length !== 0) {
          this.tableData = res.data
        } else {
          this.tableData = []
        }
      },
    },
    components: {
      ListItems
    }
  };
</script>

<style lang="scss" scoped>
  .el-container {
    height: calc(100vh - 60px);
    .el-header {
      // height: 40px!important;
      .el-input {
        // width: 200px;
        margin: 10px ;
      }
    }
  }
</style>