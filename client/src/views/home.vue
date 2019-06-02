<template>
  <div>
    <headTop/>
    <section class="data_section">
      <header class="section_title">数据统计</header>
      <el-row :gutter="20" style="margin-bottom: 10px;">
        <el-col :span="6">
          <div class="data_list today_head">
            <span class="data_num head">当日数据：</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="data_list">
            <span class="data_num">{{todayUserCount}}</span> 新增用户
          </div>
        </el-col>
        <el-col :span="6">
          <div class="data_list">
            <span class="data_num">{{todayCommentCount}}</span> 新增评论
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="data_list all_head">
            <span class="data_num head">总数据：</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="data_list">
            <span class="data_num">{{userList.length}}</span> 注册用户
          </div>
        </el-col>
        <el-col :span="6">
          <div class="data_list">
            <span class="data_num">{{commentList.length}}</span> 评论
          </div>
        </el-col>
      </el-row>
    </section>
    <div class="line1">
      <div id="line1" class style="width: 90%;height:450px;"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import dtime from "time-formater";
import moment from "moment";
moment.locale("zh-cn");
export default {
  data() {
    return {
      userList: [],
      commentList: []
    };
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("line1"));
    this.drawLine();
  },
  watch: {
    commentList(val) {
      this.drawLine();
    }
  },
  computed: {
    todayUserCount() {
      const start = new Date(
        new Date(new Date().toLocaleDateString()).getTime()
      );
      let arr = this.userList.filter(item => {
        if (item.createTime) {
          return item.createTime > start;
        } else {
          return false;
        }
      });
      return arr.length;
    },
    todayCommentCount() {
      const start = new Date(
        new Date(new Date().toLocaleDateString()).getTime()
      );
      let arr = this.commentList.filter(item => {
        if (item.createTime) {
          return item.createTime > start;
        } else {
          return false;
        }
      });
      return arr.length;
    }
  },
  activated() {
    this.initData();
  },
  methods: {
    async initData() {
      let user = await this.$fetch("user/list");
      let comment = await this.$fetch("comment/list");
      console.log(user);
      this.userList = user.data;
      this.commentList = comment.data;
    },
    formatTime(time) {
      return moment(time).format("LL");
    },
    drawLine() {
      const sevenDay = [];
      const sevenCommentData = [];
      const sevenUserData = [];
      for (let i = 6; i > -1; i--) {
        const date = dtime(new Date().getTime() - 86400000 * i).format(
          "YYYY-MM-DD"
        );
        sevenDay.push(date);
      }

      const start = new Date(new Date().toLocaleDateString()).getTime();

      for (let i = 6; i > -1; i--) {
        // const date = (new Date().getTime() - 86400000 * i).format("YYYY-MM-DD");
        let commentArr = this.commentList.filter(item => {
          if (item.createTime) {
            let begin = start - 86400000 * i;
            // console.log(begin < item.createTime, item.createTime < begin + 86400000);
            return (
              item.createTime > begin && item.createTime < begin + 86400000
            );
          } else {
            return false;
          }
        });
        let userArr = this.userList.filter(item => {
          if (item.createTime) {
            let begin = start - 86400000 * i;
            return (
              item.createTime > begin && item.createTime < begin + 86400000
            );
          } else {
            return false;
          }
        });
        sevenCommentData.push(commentArr.length);
        sevenUserData.push(userArr.length);
      }

      let option = {
        title: {
          text: "数据走势图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["新增评论", "新增用户"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          // feature: {
          //   saveAsImage: {}
          // }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          // data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          data: sevenDay
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "新增评论",
            type: "line",
            stack: "总量",
            data: sevenCommentData
          },
          {
            name: "新增用户",
            type: "line",
            stack: "总量",
            data: sevenUserData
          }
        ]
      };
      this.myChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../style/mixin";
.data_section {
  padding: 20px;
  margin-bottom: 40px;
  .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }
  .data_list {
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #e5e9f2;
    .data_num {
      color: #333;
      font-size: 26px;
    }
    .head {
      border-radius: 6px;
      font-size: 22px;
      padding: 4px 0;
      color: #fff;
      display: inline-block;
    }
  }
  .today_head {
    background: #ff9800;
  }
  .all_head {
    background: #20a0ff;
  }
}
.wan {
  .sc(16px, #333);
}

.line1 {
  display: flex;
  justify-content: center;
}
</style>
