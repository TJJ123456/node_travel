<template>
  <div class="fillcontain">
    <headTop/>
    <div class="table_container">
      <el-table v-loading="loading" :data="showList" style="width: 100%">
        <el-table-column prop="shopname" label="商家名称"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="tableData.length"
        ></el-pagination>
      </div>
      <el-dialog title="评论详细信息" :visible.sync="dialogFormVisible">
        <el-form :model="dialogForm" ref="dialogForm">
          <div>
            <span>商家名称：{{dialogForm.shopname}}</span>
          </div>
          <div>
            <span>用户名：{{dialogForm.username}}</span>
          </div>
          <div>
            <span>评论内容：{{dialogForm.content}}</span>
          </div>
          <div>
            <span>评论时间：{{dialogForm.time}}</span>
          </div>
          <!-- <el-form-item>
            <el-row type="flex" justify="center">
              <el-button type="primary" @click="onSubmit('dialogForm')">提交修改</el-button>
            </el-row>
          </el-form-item>-->
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import moment from "moment";
moment.locale("zh-cn");
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
      dialogForm: {}
    };
  },
  // created() {
  //   this.initData();
  // },
  computed: {
    showList() {
      let list = this.tableData;
      return list.slice(this.offset, this.offset + 10);
    }
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
      let data = await this.$fetch("comment/list");
      this.tableData = data.data;
      this.tableData.forEach(item => {
        item.time = this.formatTime(item.createTime);
      });
    },
    formatTime(time) {
      return moment(time).format("LL");
    },
    handleEdit(index, row) {
      this.editIndex = index;
      this.dialogFormVisible = true;
      this.dialogForm = JSON.parse(JSON.stringify(this.tableData[index]));
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.changeFood();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
