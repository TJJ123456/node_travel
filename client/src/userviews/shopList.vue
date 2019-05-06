<template>
  <div class="section Fix J-shop-search">
    <div class="navigation">
      <div class="nav-category J_filter_category">
        <h4>分类:</h4>
        <a class="def cur">
          <span>不限</span>
        </a>
        <div class="nc-contain" style="height:50px;">
          <div class="con">
            <div id="classfy" class="nc-items nc-more">
              <a>
                <span>小吃快餐</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-wrap">
      <div class="shop-wrap">
        <div class="content">
          <div class="filter-box J_filter_box"></div>
          <div class="shop-list J_shop-list shop-all-list" id="shop-all-list"></div>
        </div>
      </div>
      <div class="aside"></div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
moment.locale("zh-cn");
export default {
  data() {
    return {
      shoplist: {},
      typelist: {},
      commentList: []
    };
  },
  computed: {
    getAverage() {
      let sum = 0;
      this.commentList.forEach(item => {
        sum += item.average;
      });
      return Math.floor(sum / this.commentList.length);
    }
  },
  activated() {
    this.initData();
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      switch (parseInt(this.type)) {
        case 0:
          let data = await this.$fetch("food/foodlist");
          this.shoplist = data.data;
          let type = await this.$fetch("food/foodtypelist");
          this.typelist = type.data;
          break;
        case 1:
          break;
        case 2:
          break;
      }
      let list = await this.$fetch("comment/itemlist", {
        method: "POST",
        body: JSON.stringify({
          id: this.id,
          type: parseInt(this.type)
        })
      });
      this.commentList = list.data;
      this.commentList.forEach(item => {
        item.time = this.formatTime(item.createTime);
      });
      this.shoplist.forEach(item => {
        item.shoplist = parseFloat(this.getScore(item._id)) || 0;
      });

      // this.getList();
      // this.GetListCount();
    },
    getScore(itemid) {
      let itemArr = this.commentList.filter(item => item.itemid === itemid);
      let sum = 0;
      itemArr.forEach(item => {
        sum += item.score;
      });
      return (sum / itemArr.length).toFixed(1);
    },
    formatTime(time) {
      return moment(time).format("LL");
    }
  },
  props: {
    type: {
      required: true
    }
  }
};
</script>
<style lang="less" scoped>
.section {
  font: 12px/1.5 "Microsoft YaHei", "Hiragino Sans GB";
  width: 1190px;
  margin: 0 auto;
  color: #999;
}
.navigation {
  border: 1px solid #f0f0f0;
  padding: 18px 0 0 19px;
  background: #fff;
  zoom: 1;
}
.nav-category {
  position: relative;
  padding: 0 0 10px 155px;
  line-height: 20px;
}

.nav-category h4 {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 12px;
  color: #999;
}

h1,
h2,
h3,
h4,
h5,
h6,
strong {
  font-weight: 400;
}

.nav-category .def {
  position: absolute;
  left: 85px;
}

.nav-category a {
  color: #666;
}

.nav-category .cur span {
  background-color: #f63;
  color: #fff;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  padding: 0 8px;
  height: 20px;
  line-height: 20px;
}

.nav-category a span {
  color: #666;
  cursor: pointer;
}

.nav-category span {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  *display: inline;
  *zoom: 1;
  margin-left: -4px;
  padding: 0 4px;
  max-width: 85px;
}

a {
  color: #333;
  text-decoration: none;
}
.nav-category .con .nc-more {
  *width: 720px;
}

.nav-category .nc-more {
  *position: relative;
  *zoom: 1;
  padding-right: 50px;
  height: auto;
  *width: 720px;
  *padding-bottom: 10px;
  zoom: 1;
}
.nav-category .nc-items {
  position: relative;
}
.nav-category .nc-items a {
  float: left;
  width: 97px;
  *height: 20px;
  margin-bottom: 5px;
}

.nav-category a {
  color: #666;
}

.nav-category a span {
  color: #666;
  cursor: pointer;
}

.nav-category span {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  *display: inline;
  *zoom: 1;
  margin-left: -4px;
  padding: 0 4px;
  max-width: 85px;
}

div {
  display: block;
}
</style>
