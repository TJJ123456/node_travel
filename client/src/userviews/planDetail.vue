<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="detail">
          <img src="http://localhost:3000/public/img/default.jpg" alt>
          <h1>{{plan.name}}</h1>
          <h3>{{plan.desc}}</h3>
          <h1>计划内容</h1>
          <div class="list" v-for="(item, index) in plan.list" :key="index">
            <span>第{{index + 1}}天</span>
            <div>早餐：{{item.breakfast.name}}</div>
            <div>上午景点：{{item.morningspot.name}}</div>
            <div>午餐：{{item.lunch.name}}</div>
            <div>下午景点：{{item.afternoonspot.name}}</div>
            <div>晚餐：{{item.dinner.name}}</div>
            <div>酒店：{{item.hotel.name}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  props: {
    id: {
      type: String,
      required: true
    },
    plan: {
      required: true
    }
  }
};
</script>
<style lang="less" scoped>
</style>
