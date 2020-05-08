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
        <i class="el-icon-postcard"></i>个人资料
      </template>
        <el-menu-item index="/userinfo">资料编辑</el-menu-item>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-collection-tag"></i>收藏记录
      </template>
        <el-menu-item index="3-1">收藏职位</el-menu-item>
        <el-menu-item index="3-2">收藏企业</el-menu-item>
        <el-menu-item index="3-3">应聘记录</el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name: 'CandidateNav',
}
</script>

<style>
</style>
