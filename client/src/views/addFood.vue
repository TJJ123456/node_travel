<template>
  <div>
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
        <header class="form_header">添加美食</header>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="110px"
          class="form food_form"
        >
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
          <el-form-item label="食品分类" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择食品分类">
              <el-option
                v-for="(item, index) in typelist"
                :key="index"
                :value="item._id"
                :label="item.name"
              >{{item.name}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model.number="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center">
              <el-button type="primary" @click="onSubmit('ruleForm')">创建美食</el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      typelist: [],
      ruleForm: {
        name: "",
        desc: "",
        address: "",
        type: "",
        phone: ""
      },
      rules: {
        name: [{ required: true, message: "请输入食品名称", trigger: "blur" }],
        desc: [{ required: true, message: "请输入食品描述", trigger: "blur" }],
        type: [{ required: true, message: "类型不能为空", trigger: "blur" }],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        phone: [
          { required: true, message: "电话不能为空", trigger: "blur" },
          { type: "number", message: "电话必须为数字值" }
        ]
      }
    };
  },
  created() {
    this.initData();
  },
  activated() {
    this.initData();
  },
  methods: {
    async initData() {
      let data = await this.$fetch("food/foodtypelist");
      this.typelist = data.data;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          this.createFood();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async createFood() {
      let data = await this.$fetch("food/create", {
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
          message: "创建美食成功",
          type: "success"
        });
        this.resetForm("ruleForm");
        this.$router.push({ path: "/foodList" });
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
</style>
