<template>
  <el-row>
    <el-col :span="16" :offset="4">
      <el-breadcrumb separator="/">
        <div class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/home/userPlanList' }">计划列表</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </div>
      </el-breadcrumb>
    </el-col>
    <el-col :span="16" :offset="4">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>
  
<script>
export default {
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  }
};
</script>
<style lang="less" scope>
@import "../style/mixin";
.form {
  width: 100%;
  position: relative;
  min-width: 400px;
  padding: 10px;
  margin-bottom: 30px;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border-radius: 6px;
    transition: all 400ms;
  }
}
.logoImg {
  height: 200px;
  width: 300px;
}
.title {
  left: 320px;
  top: 10px;
  position: absolute;
}
.desc {
  top: 60px;
  left: 320px;
  position: absolute;
}
.price {
  bottom: 20px;
  left: 320px;
  position: absolute;
  color: #ad0711;
}
.breadcrumb {
  margin-top: 20px;
  height: 30px;
}
</style>