<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="110px"
      class="form food_form"
    >
      <el-form-item>
        <div class="comment-header">
          <div class="header">
            <h1>我要点评</h1>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="评分" prop="score">
        <el-rate v-model.number="ruleForm.score" show-text></el-rate>
      </el-form-item>
      <el-form-item label="人均消费" prop="average">
        <el-input v-model.number="ruleForm.average"></el-input>
      </el-form-item>
      <el-form-item label="评价" prop="content">
        <el-input v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- <el-button @click="onSubmit('ruleForm')">提交点评</el-button> -->
        <strong class="btn-type-b">
          <input
            class="form-btn"
            style="color: #fff;
    border-radius: 2px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    text-align: center;
    background-color: #ff8f1f;"
            type="button"
            value="提交点评"
            @click="onSubmit('ruleForm')"
          >
        </strong>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        score: 0,
        average: "",
        content: "",
        type: parseInt(this.type),
        itemid: this.id,
      },
      rules: {
        score: [
          { required: true, message: "请评分", trigger: "blur" },
          { type: "number", message: "分数必须为数字值" }
        ],
        average: [
          { required: true, message: "请填写人均消费", trigger: "blur" },
          { type: "number", message: "消费必须为数字值" }
        ],
        content: [{ required: true, message: "请填写评价", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createComment();
        } else {
          console.log("error submit!!");
          return false;
        }
      }); 
    },
    async createComment() {
      let data = await this.$fetch("comment/create", {
        method: "POST",
        body: JSON.stringify(this.ruleForm)
      });
      if (data.err) {
        if (data.msg === "请登录") {
          this.$router.replace("/home/login", "");
        }
        this.$message({
          showClose: true,
          message: data.msg,
          type: "error"
        });
      } else {
        this.$message({
          showClose: true,
          message: "评论成功，等待审核",
          type: "success"
        });
        this.resetForm("ruleForm");
        this.$router.push({ name: "itemDetail", params: { type: this.type, id: this.id } });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  props: {
    type: {
      required: true
    },
    id: {
      required: true
    }
  }
};
</script>
<style lang="less" scoped>
@import "../style/mixin";
.form {
  width: 800px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
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

.comment-header {
  margin-top: 9px;
}

.comment-header h1 {
  float: left;
  padding: 21px 0 0 7px;
  font-size: 16px;
  font-family: Microsoft YaHei;
}

.comment-header .header {
  margin-bottom: 0;
}
.header-bar .inner,
.header,
.breadcrumb,
.main,
.secondary,
.footer {
  width: 960px;
  margin: 0 auto 10px;
}

strong {
  margin-right: 10px;
}

.btn-type-b {
  display: inline-block;
  height: 34px;
  padding: 0 0 0 2px;
  font-size: 1.2em;
}
strong {
  font-weight: bold;
}

.btn-type-b .form-btn,
.btn-type-b .txt {
  float: left;
  height: 34px;
  margin: 0;
  padding: 0 15px 3px 13px;
  *padding: 0 9px 0 7px;
  font-weight: bold;
  line-height: 34px;
  border: 0;
}
.form-btn {
  cursor: pointer;
  color: #fff;
  border-radius: 2px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  text-align: center;
  background-color: #ff8f1f;
}
input,
button,
textarea {
  font-family: inherit;
  font-size: 100%;
}
</style>
