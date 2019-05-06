<template>
  <div class="fillcontain">
    <headTop/>
    <div class="table_container">
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="shopname" label="商家名称"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">审核</el-button>
            <el-button size="mini" type="danger" @click="handleNoPass(scope.$index, scope.row)">不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="count"
        ></el-pagination>
      </div>
      <el-dialog title="审核评论" :visible.sync="dialogFormVisible">
        <el-form :rules="dialogFormrules" :model="dialogForm" ref="dialogForm">
          <div>
            <span>商家名称：{{dialogForm.shopname}}</span>
          </div>
          <div>
            <span>用户名：{{dialogForm.username}}</span>
          </div>
          <div>
            <span>评论内容：{{dialogForm.content}}</span>
          </div>
          <el-form-item>
            <el-row type="flex" justify="center">
              <el-button type="success" @click="onSubmit('dialogForm')">通过审核</el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editIndex: 0,
      currentPage: 1,
      offset: 0,
      limit: 10,
      count: 0,
      tableData: [],
      dialogFormVisible: false,
      loading: false,
      dialogForm: {},
      dialogFormrules: {
        name: [{ required: true, message: "请输入食品名称", trigger: "blur" }],
        desc: [{ required: true, message: "请输入食品描述", trigger: "blur" }],
        type: [{ required: true, message: "类型不能为空", trigger: "blur" }],
        price: [
          { required: true, message: "价格不能为空", trigger: "blur" },
          { type: "number", message: "价格必须为数字值" }
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
  watch: {},
  methods: {
    async initData() {
      this.getList();
    },
    async getList() {
      let data = await this.$fetch("comment/checklist");
      this.tableData = data.data;
    },
    handleEdit(index, row) {
      this.editIndex = index;
      this.dialogFormVisible = true;
      this.dialogForm = JSON.parse(JSON.stringify(this.tableData[index]));
    },
    async handleNoPass(index, row) {
      let data = await this.$fetch("comment/nopass", {
        method: "POST",
        body: JSON.stringify({
          id: this.tableData[index]._id
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
          message: "操作成功",
          type: "success"
        });
        this.tableData.splice(index, 1);
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.passCheck();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async passCheck() {
      let data = await this.$fetch("comment/pass", {
        method: "POST",
        body: JSON.stringify({
          id: this.dialogForm._id
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
          message: "操作成功",
          type: "success"
        });
        this.tableData.splice(this.editIndex, 1);
        this.dialogFormVisible = false;
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getList();
    }
  }
};
</script>
<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}
.el-form-item {
  margin-right: 0;
  margin-bottom: 20px;
}
</style>
