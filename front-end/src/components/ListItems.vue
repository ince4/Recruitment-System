<template>
    <el-container>
      <el-main>
        <el-table :data="tableData" size="medium">
          <el-table-column width="auto" type="expand">
            <template slot-scope="props">
              <el-form label-position="left" class="table-expand">
                <el-form-item v-for="item of fieldname.slice(2, fieldname.length - 1)" :key="item" :label="item">
                  <span>{{props.row[item]}}</span>
                </el-form-item>
                <div class="candidate-button" v-if="usertype === 'candidate'">
                  <el-button
                  v-if="tablename === 'job'"
                  size="small"
                  @click="jobApply(props.row)">
                    应聘
                  </el-button>

                  <el-button
                  v-if="tablename !== 'candidate'"
                  v-html="props.row.isCollected == true ? '取消收藏' : '收藏'" 
                  size="small"
                  @click="collect(props.row)">
                  </el-button>
                </div>
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
    props: {
			initTableData: Array
		},
    data() {
      return {
        tablename: '',
        usertype: '',
        fieldname: [],
        username: '',
        tableData: this.initTableData
			}
		},
    created() {
      this.usertype = this.$cookies.get('usertype')
      this.username = this.$cookies.get('username')
      this.tablename = this.$route.query.table
      this.getFieldName()
      this.findCollectionItem()
    },
    watch: {
      initTableData (newValue) {
        console.log(newValue)
        this.tableData = newValue
        this.tablename = this.$route.query.table
        this.getFieldName()
        this.findCollectionItem()
      }
    },
    methods: {
      async getFieldName () {
        for (let index in this.tableData) {
          let values = Object.values(this.tableData[index])
          values.some((v) => v == null) ? this.tableData.splice(index, 1) 
          : this.fieldname = Object.keys(this.tableData[0])
        }
      },

      async findCollectionItem () {
        let res = await this.$axios.get(`/api/collection/list?username=${this.username}&collectiontype=${this.tablename}`)
        if (res.data.ok) {
          const collection = res.data.data
          collection.forEach(obj => {
           let collectedId = this.tableData.findIndex(item => obj.id === item.id)
           this.tableData[collectedId]['isCollected'] = true
          });
        }
      },

      async collect (item) {
        if (!item.isCollected) {
          const res = await this.$axios.post(`/api/collection/add`, {
            username: this.username,
            collectionid: item.id,
            collectiontype: this.tablename
          })

          res.data.ok && this.$alert('', '收藏成功', {
            confirmButtonText: '确定',
            callback: () => {
              this.$set(item, 'isCollected', true)
            }
					})
        } else {
          const res = await this.$axios.post(`/api/collection/remove`, {
            username: this.username,
            collectionid: item.id,
          })

          res.data.ok && this.$alert('', '已取消收藏', {
            confirmButtonText: '确定',
            callback: () => {
              this.$delete(item, 'isCollected', false)
              this.$emit('updateData')
            }
					})
        }
      },
      
      jobApply (item) {
        this.$axios.post('/api/job/apply', {jobid: item.id, candidatename: this.username})
					.then(res => {
						if (res.data.ok) {
							this.$alert('已发送应聘申请', '提交成功', {
								confirmButtonText: '确定',
							})
						} else {
              this.$alert('已提交过申请，不能重复提交', '提交失败', {
								confirmButtonText: '确定',
							})
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

        .candidate-button {
          margin-top: 10px;

        }
      }
    }

  }
</style>