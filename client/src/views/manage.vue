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
              <i class="el-icon-document"></i>数据管理
            </template>
            <el-menu-item index="userList">用户列表</el-menu-item>
            <el-menu-item index="foodList">美食列表</el-menu-item>
            <el-menu-item index="hotelList">酒店列表</el-menu-item>
            <el-menu-item index="spotList">景点列表</el-menu-item>
            <el-menu-item index="planList">方案列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-plus"></i>添加数据
            </template>
            <el-menu-item index="addFood">添加美食</el-menu-item>
            <el-menu-item index="addHotel">添加酒店</el-menu-item>
            <el-menu-item index="addSpot">添加景点</el-menu-item>
            <el-menu-item index="addPlan">添加方案</el-menu-item>
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
    return {

    };
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
