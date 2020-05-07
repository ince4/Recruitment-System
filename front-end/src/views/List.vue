<template>
    <el-container>
      <el-main>
        <el-table :data="tableData" size="medium">
          <el-table-column width="auto" type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline>
                <el-form-item v-for="item of fieldname.slice(2)" :key="item" :label="item">
                  <span>{{props.row[item]}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column
            v-for="item of fieldname.slice(2, 6)"
            :key="item"
            :label="item"
            :prop="item">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        tablename: '',
        fieldname: []
      }
    },
    created() {
      this.usertype = this.$cookies.get('usertype')
      this.getListData(this.tablename)
    },
    watch: {
      $route() {
        this.tablename = this.$route.query.table
        this.getListData(this.tablename)
      }
    },
    methods: {
      getListData (tablename) {
        this.$axios.post('/api/list', {tablename})
					.then(res => {
            if (res.data.length > 0) {
              this.tableData = res.data
              this.fieldname = Object.keys(res.data[0])
              // console.log(this.tableData)
              console.log(this.fieldname)
            } else {
              this.tableData = []
              this.fieldname = []
            }
          })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .el-container{
    height: calc(100vh - 60px);
    .el-aside {
      color: #333;
    }
  }
</style>