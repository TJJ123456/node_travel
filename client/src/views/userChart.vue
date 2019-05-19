<template>
  <div>
    <headTop/>
    <section class="data_section">
      <header class="section_title">用户数据图表</header>
    </section>
    <div class="line1">
      <div id="line1" class style="width: 100%;height:450px;"></div>
      <div id="line2" class style="width: 100%;height:450px;"></div>
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
      userList: []
    };
  },
  mounted() {
    this.myChart1 = echarts.init(document.getElementById("line1"));
    // this.drawLine1();
  },
  watch: {
    userList(val) {
      this.drawLine1();
    }
  },
  computed: {
    title() {}
  },
  activated() {
    this.initData();
  },
  methods: {
    async initData() {
      let user = await this.$fetch("user/list");
      // });
      // let type = await this.$fetch("data/typelist", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     kind: this.type
      //   })
      // });
      this.userList = user.data;
      this.userList.sort((a, b) => {
        return b.commentCount - a.commentCount;
      });
      // this.foodTypeList = type.data;
      // this.drawLine2();
    },
    formatTime(time) {
      return moment(time).format("LL");
    },
    drawLine1() {
      console.log('当前数据', this.userList);
      let nameArr = [];
      let countArr = [];
      let arr = this.userList.slice(0, 10);
      for (let i = 0; i < arr.length; ++i) {
        let item = arr[i];
        nameArr.push(item.username);
        countArr.push(item.commentCount);
      }
      console.log('名字数组', nameArr);

      let option = {
        title: {
          text: '评论最多的用户'
        },
        xAxis: {
          type: "value"
        },
        yAxis: {
          type: "category",
          data: nameArr,
          z: 10
        },
        series: [
          {
            data: countArr,
            type: "bar"
          }
        ]
      };
      this.myChart1.setOption(option);
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
  display: block;
  justify-content: center;
}
</style>
