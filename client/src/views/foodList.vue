<template>
  <div class="fillcontain">
    <headTop/>
    <div class="table_container">
      <el-table border v-loading="loading" :data="showList" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺介绍">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{ props.row.score }}</span>
              </el-form-item>
              <el-form-item label="人均消费">
                <span>{{ props.row.avg }}</span>
              </el-form-item>
              <el-form-item label="分类">
                <span>{{ props.row.typename }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="typename" label="类型"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      <el-dialog title="修改美食信息" :visible.sync="dialogFormVisible">
        <el-form :rules="dialogFormrules" :model="dialogForm" ref="dialogForm">
          <el-form-item label="名称" prop="name">
            <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc" type="textarea">
            <el-input v-model="dialogForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="dialogForm.address"></el-input>
          </el-form-item>
          <el-form-item label="食品分类" prop="type">
            <el-select v-model="dialogForm.type" placeholder="请选择食品分类">
              <el-option
                v-for="(item, index) in typelist"
                :key="index"
                :value="item._id"
                :label="item.name"
              >{{item.name}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model.number="dialogForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="修改美食图片" prop="filepath">
            <el-upload
              class="avatar-uploader"
              ref="upload"
              action="http://localhost:3000/posts/img"
              :before-upload="beforeUpload"
              :on-success="uploadSuccess"
              :limit="1"
            >
              <img
                v-if="dialogForm.filepath"
                :src="'http://localhost:3000' + dialogForm.filepath"
                class="avatar"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10m</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center">
              <el-button type="primary" @click="onSubmit('dialogForm')">提交修改</el-button>
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
      typelist: [],
      commentList: [],
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
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        desc: [{ required: true, message: "请输入描述", trigger: "blur" }],
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
    this.GetListCount();
  },
  
  computed: {
    showList() {
      let list = this.tableData;
      return list.slice(this.offset, this.offset + 10);
    }
  },
  watch: {},
  methods: {
    async initData() {
      this.GetListCount();

      let data = await this.$fetch("data/typelist", {});
      let comment = await this.$fetch("comment/passlist");
      this.commentList = comment.data;
      this.typelist = data.data;
      this.tableData.forEach(item => {
        item.score = parseFloat(this.getScore(item._id)) || 0;
        item.avg = parseFloat(this.getaverage(item._id)) || 0;
      });
      // this.getList();
    },
    getaverage(itemid) {
      let itemArr = this.commentList.filter(item => item.itemid === itemid);
      let sum = 0;
      itemArr.forEach(item => {
        sum += item.average;
      });
      return (sum / itemArr.length).toFixed(1);
    },
    getScore(itemid) {
      let itemArr = this.commentList.filter(item => item.itemid === itemid);
      let sum = 0;
      itemArr.forEach(item => {
        sum += item.score;
      });
      return (sum / itemArr.length).toFixed(1);
    },
    getTypeName(id) {
      return this.typelist.find(item => item._id === id).name;
    },
    async GetListCount() {
      let data = await this.$fetch("data/count");
      if (data.data !== this.count) {
        this.getList();
        this.count = data.data;
      }
    },
    async getList() {
      let data = await this.$fetch("data/list", {
        method: "POST",
        body: JSON.stringify({
          kind: 0
        })
      });
      this.tableData = data.data;
    },
    handleEdit(index, row) {
      this.editIndex = index;
      this.dialogFormVisible = true;
      this.dialogForm = JSON.parse(JSON.stringify(this.tableData[index]));
    },
    async handleDelete(index, row) {
      let data = await this.$fetch("data/delete", {
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
          message: "删除成功",
          type: "success"
        });
        this.tableData.splice(index, 1);
      }
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
    async changeFood() {
      let data = await this.$fetch("data/change", {
        method: "POST",
        body: JSON.stringify(this.dialogForm)
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
          message: "修改信息成功",
          type: "success"
        });
        this.tableData[this.editIndex] = JSON.parse(
          JSON.stringify(this.dialogForm)
        );
        this.dialogFormVisible = false;
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getList();
    },
    beforeUpload(file) {
      console.log(file.type);
      const isJPGorPng =
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/jpeg";
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isJPGorPng) {
        this.$message.error("上传图片只能是 JPG/jpeg/png 格式!");
      }
      if (!isLt10M) {
        this.$message.error("上传图片大小不能超过 10MB!");
      }
      return isJPGorPng && isLt10M;

      return false;
    },
    uploadSuccess(res, file) {
      this.ruleForm.filepath = res.filepath;
      //   console.log(res, file);
    },
    submitUpload() {
      this.$refs.upload.submit();
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
