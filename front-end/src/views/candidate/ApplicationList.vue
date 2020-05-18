<template>
<el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="职位名称">
            <span>{{ props.row['职位名称'] }}</span>
          </el-form-item>
          <el-form-item label="人数">
            <span>{{ props.row['人数'] }}</span>
          </el-form-item>
          <el-form-item label="发布时间">
            <span>{{ props.row['发布时间'] }}</span>
          </el-form-item>
          <el-form-item label="任职要求">
            <span>{{ props.row['任职要求'] }}</span>
          </el-form-item>
          <el-form-item label="待遇">
            <span>{{ props.row['待遇'] }}</span>
          </el-form-item>
          <el-form-item label="是否补助">
            <span>{{ props.row['是否补助'] == false ? '否' : '是' }}</span>
          </el-form-item>
          <el-form-item label="联系方式">
            <span>{{ props.row['联系方式'] }}</span>
          </el-form-item>
          <el-form-item label="状态">
            <span>{{ props.row['status'] }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="职位名称"
      prop="职位名称">
    </el-table-column>
    <el-table-column
      label="人数"
      prop="人数">
    </el-table-column>
    <el-table-column
      label="是否补助"
      prop="是否补助">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="status">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tablename: '',
        usertype: '',
        fieldname: [],
        username: '',
        tableData: []
			}
    },
    created () {
      this.username = this.$cookies.get('username')
      this.getListData()
    },
    methods: {
      async getListData () {
        let res = await this.$axios.get(`/api/job/applicationlist?candidatename=${this.username}`)
        if (res.data.ok) {
          this.tableData = res.data.data
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .el-container{
    height: calc(100vh - 60px);

    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand 
    ::v-deep label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
</style>