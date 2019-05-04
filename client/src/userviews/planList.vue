<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="form" @click="detail(plan)" v-for="(plan, index) in planlist" :key="index">
          <img src="http://localhost:3000/public/img/default.jpg" class="logoImg">
          <h2 class="title">{{plan.name}}</h2>
          <span class="desc">{{plan.desc}}</span>
          <span class="price">{{plan.price || 0}} 元</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      planlist: [],
      count: 0
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      this.GetListCount();
    },
    async GetListCount() {
      let data = await this.$fetch("plan/count");
      if (data.data !== this.count) {
        this.getList();
        this.count = data.data;
      }
    },
    async getList() {
      let data = await this.$fetch("plan/list", {
        method: "POST",
        body: JSON.stringify({
          limit: this.limit,
          offset: this.offset
        })
      });
      this.planlist = data.data;
    },
    detail(plan) {
      this.$router.push({
        name: "planDetail",
        params: { id: plan.name, plan: plan }
      });
    }
  }
};
</script>