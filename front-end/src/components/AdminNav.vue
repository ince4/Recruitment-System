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
        <i class="el-icon-s-check"></i>后台管理
      </template>
        <el-menu-item index="/admin/audit?table=company">企业管理</el-menu-item>
        <el-menu-item index="/admin/audit?table=job">职位管理</el-menu-item>
        <el-menu-item index="/admin/audit?table=candidate">人才管理</el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name: 'AdminNav',
}
</script>

<style>
</style>
