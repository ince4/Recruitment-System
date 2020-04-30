<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <side-nav></side-nav>
    </el-aside>
    
    <el-main style="padding: 0">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  import SideNav from './components/SideNav'
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }
      return {
        tableData: Array(20).fill(item)
      }
    },
    components: {
      SideNav
    },

  }
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    /* color: #333; */
    line-height: 60px;
  }

</style>
