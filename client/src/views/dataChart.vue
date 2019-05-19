<template>
  <div>
    <headTop/>
    <section class="data_section">
      <header class="section_title">{{title}}</header>
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
  props: {
    type: {
      require: true
    }
  },
  data() {
    return {
      foodList: [],
      foodTypeList: []
    };
  },
  mounted() {
    this.myChart1 = echarts.init(document.getElementById("line1"));
    this.myChart2 = echarts.init(document.getElementById("line2"));
    // this.drawLine();
  },
  watch: {
    foodTypeList(val) {
      this.drawLine1();
    }
  },
  computed: {
    title() {
      switch (this.type) {
        case 0:
          return "美食数据图表";
          break;
        case 1:
          return "娱乐数据图表";
          break;
        case 2:
          return "景点数据图表";
          break;
        default:
          break;
      }
    }
  },
  activated() {
    this.initData();
  },
  methods: {
    async initData() {
      let food = await this.$fetch("data/list", {
        method: "POST",
        body: JSON.stringify({
          kind: this.type
        })
      });
      let type = await this.$fetch("data/typelist", {
        method: "POST",
        body: JSON.stringify({
          kind: this.type
        })
      });
      this.foodList = food.data;
      this.foodTypeList = type.data;
      this.drawLine2();
    },
    formatTime(time) {
      return moment(time).format("LL");
    },
    drawLine1() {
      let typenameArr = [];
      let typecountArr = [];
      for (let i = 0; i < this.foodTypeList.length; ++i) {
        let item = this.foodTypeList[i];
        typenameArr.push(item.name);
        typecountArr.push(item.count);
      }
      let option = {
        title: {
          text: "各分类数量"
        },
        xAxis: {
          type: "category",
          data: typenameArr
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: typecountArr,
            type: "bar"
          }
        ]
      };
      this.myChart1.setOption(option);
    },
    drawLine2() {
      let tmpArr = this.foodList.sort((a, b) => {
        return b.commentCount - a.commentCount;
      });
      let arr = tmpArr.slice(0, 10);
      let nameArr = [];
      let countArr = [];
      let text = "";
      switch (this.type) {
        case 0:
          text = "评论最多的美食店家(前10)";
          break;
        case 1:
          text = "评论最多的娱乐店家(前10)";
          break;
        case 2:
          text = "评论最多的景点(前10)";
          break;
        default:
          break;
      }
      for (let i = 0; i < arr.length; ++i) {
        let item = arr[i];
        nameArr.push(item.name);
        countArr.push(item.commentCount);
      }
      let option = {
        title: {
          text: text
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
      this.myChart2.setOption(option);
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
