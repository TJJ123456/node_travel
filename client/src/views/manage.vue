<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%; background-color: #324057;">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
          <el-menu-item index="manager">
            <i class="el-icon-menu"></i>首页
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>美食管理
            </template>
            <el-menu-item index="foodList">美食列表</el-menu-item>
            <el-menu-item index="foodTypeList">美食分类列表</el-menu-item>
            <el-menu-item index="addFood">添加美食</el-menu-item>
            <el-menu-item index="addFoodType">添加美食分类</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>评论管理
            </template>
            <el-menu-item index="checkList">审核列表</el-menu-item>
            <el-menu-item index="commentList">评论列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {},
  methods: {}
};
</script>


<style lang="less" scoped>
@import "../style/mixin";
</style>
