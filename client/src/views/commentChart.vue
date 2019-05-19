<template>
  <div>
    <headTop/>
    <section class="data_section">
      <header class="section_title">评论数据图表</header>
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
      commentList: [],
      foodTypeList: []
    };
  },
  mounted() {
    this.myChart1 = echarts.init(document.getElementById("line1"));
    this.drawLine1();
  },
  watch: {
    commentList(val) {
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
      let comment = await this.$fetch("comment/list");
      // });
      // let type = await this.$fetch("data/typelist", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     kind: this.type
      //   })
      // });
      this.commentList = comment.data;
      // this.foodTypeList = type.data;
      // this.drawLine2();
    },
    formatTime(time) {
      return moment(time).format("LL");
    },
    drawLine1() {
      let foodArr = this.commentList.filter(item => item.kind === 0);
      let enArr = this.commentList.filter(item => item.kind === 1);
      let spotArr = this.commentList.filter(item => item.kind === 2);

      let option = {
        title: {
          text: "评论分布",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["美食评论", "娱乐评论", "景点评论"]
        },
        series: [
          {
            name: "评论来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: foodArr.length, name: "美食评论" },
              { value: enArr.length, name: "娱乐评论" },
              { value: spotArr.length, name: "景点评论" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
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
