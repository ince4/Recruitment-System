<template>
  <el-container style="height: 100vh">
    <el-aside v-if="!$route.meta.hideSideBar" width="200px" style="background-color: rgb(238, 241, 246)">
      <!-- <candidate-nav></candidate-nav> -->
      <!-- <company-nav></company-nav> -->
      <component :is="navType"></component>
    </el-aside>
    <el-main style="padding: 0">
      <Header v-if="this.$route.path !== '/login'"></Header>
      <router-view v-cloak></router-view>
    </el-main>
  </el-container>
</template>

<script>
  import CandidateNav from './components/CandidateNav'
  import CompanyNav from './components/CompanyNav'
  import AdminNav from './components/AdminNav'
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
      AdminNav,
      Header
    },
    watch: {
      $route() {
        let usertype = this.$route.query.usertype
        if (usertype === 'candidate') {
          this.navType = 'CandidateNav'
        } else if (usertype === 'company') {
          this.navType = 'CompanyNav'
        } else if (usertype === 'admin') {
          this.navType = 'AdminNav'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .fade-enter {
  opacity: 0; 
  }

  .fade-enter-active {
    transition: opacity .5s;
  }

  .fade-leave {
    opacity: 1;
  }
  
  .fade-enter-leave-active {
    transition: opacity .5s;
  }
</style>
