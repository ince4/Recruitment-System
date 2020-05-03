<template>
  <el-menu :default-openeds="['1']" unique-opened>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-tickets"></i>内容管理
      </template>
        <el-menu-item index="1-1">文章列表</el-menu-item>
        <el-menu-item index="1-2">发布文章</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'SideNav',
}
</script>

<style>
</style>
