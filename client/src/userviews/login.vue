<template>
  <div>
    <el-row style="margin-top: 80px;">
      <el-col :span="10" :offset="6">
        <header class="form_header">{{title}}</header>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="110px"
          class="form food_form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item v-if="mode==='signup'" label="确认密码" prop="checkpassword">
            <el-input type="password" v-model="ruleForm.checkpassword"></el-input>
          </el-form-item>
          <el-form-item v-if="mode==='signup'" label="密保问题" prop="question">
            <el-select v-model="ruleForm.question" placeholder="请选择密保问题" style="width: 100%;">
              <el-option
                v-for="(item, index) in questionList"
                :key="index"
                :value="index"
                :label="item"
              >{{item}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="mode==='signup'" label="密保答案" prop="answer">
            <el-input type="text" v-model="ruleForm.answer"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center">
              <el-button type="primary" @click="onSubmit('ruleForm')">{{title}}</el-button>
              <a class="forgetpassword" @click="forgetPassword()" v-if="mode==='login'">忘记密码？</a>
              <!-- <el-button type="success" @click="mode = 'signup'">注册</el-button> -->
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center">
              <el-button v-if="mode==='login'" @click="mode = 'signup'" type="text">注册</el-button>
              <el-button v-else-if="mode==='signup'" @click="mode = 'login'" type="text">登录</el-button>
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
    var validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (this.ruleForm.checkpassword !== this.ruleForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        if (this.ruleForm.checkpassword !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      mode: "login",
      questionList: [],
      ruleForm: {
        username: "",
        password: "",
        question: 0,
        answer: "",
        checkpassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkpassword: [
          { required: true, validator: validateCheckPass, trigger: "blur" }
        ],
        answer: [{ required: true, message: "请输入密保答案", trigger: "blur" }]
      }
    };
  },
  created() {
    this.initData();
  },
  computed: {
    title() {
      switch (this.mode) {
        case "login":
          return "登录";
        case "signup":
          return "注册";
      }
    }
  },
  methods: {
    async initData() {
      this.loading = true;
      let question = await this.$fetch("user/question");
      this.questionList = question.data;
      this.loading = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.operation();
          //   alert("sumit");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async operation() {
      await this[this.mode]();
    },
    async login() {
      const data = await this.$fetch("user/login", {
        method: "POST",
        body: JSON.stringify({
          username: this.ruleForm.username,
          password: this.ruleForm.password
        })
      });
      console.log(data);
      if (data.err) {
        this.$message({
          showClose: true,
          message: data.msg,
          type: "error"
        });
      } else {
        this.$message({
          showClose: true,
          message: "登录成功",
          type: "success"
        });
        this.$state.user = data;
        localStorage.setItem("user", JSON.stringify(data));
        if (this.$route.params.wantedRoute) {
          this.$router.replace(this.$route.params.wantedRoute);
        } else {
          this.$router.replace("/");
        }
      }
    },
    async signup() {
      const data = await this.$fetch("user/signup", {
        method: "POST",
        body: JSON.stringify({
          username: this.ruleForm.username,
          password: this.ruleForm.password,
          question: this.ruleForm.question,
          answer: this.ruleForm.answer
        })
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
          message: "注册账号成功",
          type: "success"
        });
        this.resetForm("ruleForm");
        this.mode = "login";
      }
    },
    forgetPassword() {
      this.$router.push({ path: "/home/fortgetpassword" });
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
.forgetpassword {
  margin-left: 10px;
  font-size: 12px;
  color: gray;
  &:hover {
    cursor: pointer;
  }
}
</style>