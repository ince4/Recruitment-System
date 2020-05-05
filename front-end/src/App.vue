<template>
  <el-container style="height: 100vh">
    <el-aside v-if="!$route.meta.hideSideBar" width="200px" style="background-color: rgb(238, 241, 246)">
      <!-- <candidate-nav></candidate-nav> -->
      <company-nav></company-nav>
      <!-- <component :is="componentId"></component> -->
    </el-aside>
    <el-main style="padding: 0">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  // import CandidateNav from './components/CandidateNav'
  import CompanyNav from './components/CompanyNav'
  export default {
    data() {
      return {
        usertype: ''
      }
    },
    components: {
      // CandidateNav,
      CompanyNav
    },
    watch: {
      $route() {
        this.usertype = this.$route.query.usertype
        console.log(this.usertype)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .el-header {
    background-color: #B3C0D1;
    /* color: #333; */
    line-height: 60px;
  }

</style>
