<template>
  <div v-loading="loading">
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
        <header class="form_header">选择旅游方案</header>
        <el-form label-width="110px" class="form">
          <el-row class="category_select">
            <el-form-item label="选择旅游方案" prop="type">
              <el-select v-model="planType" placeholder="旅游方案">
                <el-option label="一天" value="一天"></el-option>
                <el-option label="两天" value="两天"></el-option>
                <el-option label="三天" value="三天"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </el-form>
        <template v-if="ruleForm.list.length">
          <el-form :model="ruleForm" ref="ruleForm" :rules="rules" class="form food_form">
            <div v-for="(item, index) in ruleForm.list" :key="index">
              <header class="form_header">第{{index+1}}天</header>
              <el-form-item label="选择早餐" required>
                <el-select v-model="item.breakfast" placeholder="请选择早餐">
                  <el-option
                    v-for="(food, index) in breakfastList"
                    :key="index"
                    :label="food.name"
                    :value="food.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择上午景点" required>
                <el-select v-model="item.morningspot" placeholder="请选择上午景点">
                  <el-option
                    v-for="(spot, index) in spotList"
                    :key="index"
                    :label="spot.name"
                    :value="spot.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择午餐" required>
                <el-select v-model="item.lunch" placeholder="请选择午餐">
                  <el-option
                    v-for="(food, index) in lunchlist"
                    :key="index"
                    :label="food.name"
                    :value="food.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择下午景点" required>
                <el-select v-model="item.afternoonspot" placeholder="请选择下午景点">
                  <el-option
                    v-for="(spot, index) in spotList"
                    :key="index"
                    :label="spot.name"
                    :value="spot.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择晚餐" required>
                <el-select v-model="item.dinner" placeholder="请选择晚餐">
                  <el-option
                    v-for="(food, index) in dinnerlist"
                    :key="index"
                    :label="food.name"
                    :value="food.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择当天酒店" required>
                <el-select v-model="item.hotel" placeholder="请选择当天酒店">
                  <el-option
                    v-for="(item, index) in hotelList"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-form-item label="旅游计划名称" prop="name">
              <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
              <el-input v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-row type="flex" justify="center">
                <el-button type="primary" @click="onSubmit('ruleForm')">创建旅游计划</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </template>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    var validateList = (rule, value, callback) => {};
    return {
      loading: true,
      planType: "",
      dinnerlist: [],
      lunchlist: [],
      spotList: [],
      hotelList: [],
      breakfastList: [],
      ruleForm: {
        type: "",
        list: [],
        name: "",
        desc: "",
        price: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入旅游计划名称", trigger: "blur" }
        ],
        desc: [
          { required: true, message: "请输入旅游计划描述", trigger: "blur" }
        ],
        price: [
          { required: true, message: "价格不能为空", trigger: "blur" },
          { type: "number", message: "价格必须为数字值" }
        ],
        list: [{ validator: validateList, trigger: "blur" }],
        breakfast: [{ required: true, message: "请选择早餐", trigger: "blur" }],
        morningspot: [
          { required: true, message: "请选择早上景点", trigger: "blur" }
        ],
        lunch: [{ required: true, message: "请选择午餐", trigger: "blur" }],
        afternoonspot: [
          { required: true, message: "请选择下午景点", trigger: "blur" }
        ],
        dinner: [{ required: true, message: "请选择晚餐", trigger: "blur" }],
        hotel: [{ required: true, message: "请选择酒店", trigger: "blur" }]
      }
    };
  },
  watch: {
    planType: function(val) {
      this.ruleForm.type = val;
      const plan = {
        breakfast: "",
        morningspot: "",
        lunch: "",
        afternoonspot: "",
        dinner: "",
        hotel: ""
      };
      switch (val) {
        case "一天":
          this.ruleForm.list = [plan];
          break;
        case "两天":
          this.ruleForm.list = [plan, plan];
          break;
        case "三天":
          this.ruleForm.list = [plan, plan, plan];
          break;
      }
    }
  },
  created() {
    this.initData();
  },
  computed: {},
  methods: {
    async initData() {
      this.loading = true;
      let food = await this.$fetch("food/foodlist");
      let hotel = await this.$fetch("hotel/hotellist");
      let spot = await this.$fetch("spot/list");
      this.dinnerlist = food.data.filter(item => item.type === "晚餐");
      this.breakfastList = food.data.filter(item => item.type === "早餐");
      this.lunchlist = food.data.filter(item => item.type === "午餐");
      this.hotelList = hotel.data;
      this.spotList = spot.data;
      this.loading = false;
    },
    validateForm() {
      let flag = true;
      this.ruleForm.list.forEach(item => {
        for (let val in item) {
          if (item[val] === "") {
            flag = false;
            break;
          }
        }
      });
      return flag;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          if (!this.validateForm()) {
            this.$message({
              showClose: true,
              message: "请完善表格内容",
              type: "error"
            });
          } else {
            this.createPlan();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async createPlan() {
      let data = await this.$fetch("plan/create", {
        method: "POST",
        body: JSON.stringify(this.ruleForm)
      });
      if (data.err) {
        this.$message({
          showClose: true,
          message: data.msg,
          type: "error"
        });
      } else {
        this.$message({
          showClose: true,
          message: "创建旅游计划成功",
          type: "success"
        });
        this.resetForm("ruleForm");
        this.$router.push({ path: "/planList" });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
@import "../style/mixin";
.form {
  min-width: 400px;
  margin-bottom: 30px;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border-radius: 6px;
    transition: all 400ms;
  }
}
.food_form {
  border: 1px solid #eaeefb;
  padding: 10px 10px 0;
}
.form_header {
  text-align: center;
  margin-bottom: 10px;
}
.category_select {
  border: 1px solid #eaeefb;
  padding: 10px 30px 10px 10px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
}
</style>
