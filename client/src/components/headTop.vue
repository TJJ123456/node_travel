<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manager' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <a @click="logout">退出</a>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    async logout() {
      const result = await this.$fetch("managerlogout");
      if (result.status === "ok") {
        this.$state.manager = false;
        localStorage.removeItem("manager");
        this.$router.replace("/managerlogin");
      }
    }
  }
};
</script>
<style lang="less">
@import "../style/mixin";
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
</style>
<style scoped>
a {
  line-height: 60px;
  color: white;
  text-decoration: none;
}
</style>
