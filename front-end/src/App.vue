<template>
  <el-container style="height: 100vh">
    <el-aside v-if="!$route.meta.hideSideBar" width="200px" style="background-color: rgb(238, 241, 246)">
      <!-- <candidate-nav></candidate-nav> -->
      <!-- <company-nav></company-nav> -->
      <component :is="navType"></component>
    </el-aside>
    <el-main style="padding: 0">
      <Header v-if="this.$route.path !== '/login'"></Header>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  import CandidateNav from './components/CandidateNav'
  import CompanyNav from './components/CompanyNav'
  import Header from './components/Header'
  export default {
    data() {
      return {
        navType: ''
      }
    },
    components: {
      CandidateNav,
      CompanyNav,
      Header
    },
    watch: {
      $route() {
        let usertype = this.$route.query.usertype
        if (usertype === 'candidate') {
          this.navType = 'CandidateNav'
        } else if (usertype === 'company') {
          this.navType = 'CompanyNav'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
