<template>
    <el-container>
      <el-main>
        <el-table :data="tableData" size="medium">
          <el-table-column width="auto" type="expand">
            <template slot-scope="props">
              <el-form label-position="left" class="table-expand">
                <el-form-item v-for="item of fieldname.slice(2)" :key="item" :label="item">
                  <span>{{props.row[item]}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column
            v-for="item of fieldname.slice(2, 7)"
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
      getListData (tablename) {
        this.$axios.get(`/api/list?tablename=${tablename}`)
					.then(res => {
            if (res.data.length > 0) {
              this.tableData = res.data
              for (let index in this.tableData) {
                let values = Object.values(this.tableData[index])
                values.some((v) => v == null) ? this.tableData.splice(index, 1) 
                : this.fieldname = Object.keys(res.data[0])
              }
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

    .el-table {
      ::v-deep .el-table__empty-block {
        width: auto !important;
      }
      .table-expand {
        ::v-deep label {
          width: 90px;
          color: #99a9bf;
        }
        .el-form-item {
          margin-right: 0;
          margin-bottom: 0;
          width: 50%;
        }
      }
    }

  }
</style>