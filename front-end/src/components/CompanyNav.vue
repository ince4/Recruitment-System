<template>
  <el-menu :default-openeds="['1']" :router="true" unique-opened>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-office-building"></i>信息一览
      </template>
        <el-menu-item index="/list?table=company">企业列表</el-menu-item>
        <el-menu-item index="/list?table=job">职位列表</el-menu-item>
        <el-menu-item index="/list?table=candidate">人才列表</el-menu-item>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-postcard"></i>企业信息
      </template>
        <el-menu-item index="/userinfo">资料编辑</el-menu-item>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-collection-tag"></i>招聘管理
      </template>
        <el-menu-item index="/company/job/publish">招聘发布</el-menu-item>
        <el-menu-item index="/company/job/management">职位管理</el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name: 'CompanyNav',
  
}
</script>

<style>
</style>
