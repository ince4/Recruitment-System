<template>
    <el-container>
      <el-table :data="tableData" size="medium">
          <el-table-column width="auto" type="expand">
            <template slot-scope="props">
              <el-form label-position="left" class="table-expand">
                <el-form-item v-for="item of fieldname.slice(2, fieldname.length - 1)" :key="item" :label="item">
                  <span>{{props.row[item]}}</span>
                </el-form-item>

                <el-button @click="approve(props.row)">
                  通过
                </el-button>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column
            v-for="item of fieldname.slice(3, 7)"
            :key="item"
            :label="item"
            :prop="item">
          </el-table-column>
        </el-table>
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
      this.tablename = this.$route.query.table
			this.getList(this.tablename)
    },
    watch: {
      $route() {
        this.tablename = this.$route.query.table
        this.getList(this.tablename)
        // console.log(this.tableData)
      }
    },
    methods: {
      async getList (tablename) {
        let res = await this.$axios.get(`/api/admin/application?tablename=${tablename}`)
        if (res.data.length !== 0) {
          this.tableData = res.data
          this.getFieldName()
				} else {
          this.tableData = []
        }
      },

      async getFieldName () {
        for (let index in this.tableData) {
          let hasOwnProperty = Object.prototype.hasOwnProperty.call(this.tableData[index], 'isapprove')
          if (hasOwnProperty && this.tableData[index]['isapprove'] == true) {
            this.tableData.splice(index, 1)
          } else {
            this.fieldname = Object.keys(this.tableData[0])
          }
        }
      },

      async approve (item) {
        let res = await this.$axios.post(`/api/admin/approve`, {
          tablename: this.tablename,
          id: item.id
        })

        if (res.data.ok) {
          this.$alert('申请已通过！', '操作成功', {
            confirmButtonText: '确定',
            callback: () => {
              this.tableData.splice(item.index, 1)
            }
          })
        }
      }
		}
  }
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

        .candidate-button {
          margin-top: 10px;

        }
      }
    }

  }
</style>