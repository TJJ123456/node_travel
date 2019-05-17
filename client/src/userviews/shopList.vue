<template>
  <div>
    <div class="section Fix J-shop-search">
      <div class="navigation">
        <div class="nav-category J_filter_category">
          <h4>分类:</h4>
          <a class="def" :class="{cur: selectTypeIndex === -1}" @click="changeSelectType(-1)">
            <span>不限</span>
          </a>
          <div class="nc-contain" style="height:50px;">
            <div class="con">
              <div id="classfy" class="nc-items nc-more">
                <a
                  v-for="(item, index) in typelist"
                  :key="index"
                  :class="{cur: selectTypeIndex === index}"
                  @click="changeSelectType(index)"
                >
                  <span>{{item.name}}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-wrap">
        <div class="shop-wrap">
          <div class="content" style="overflow:hidden">
            <div class="filter-box J_filter_box" style="overflow:hidden">
              <div class="filt-service">
                <ul>
                  <li>
                    <a :class="{cur: sortType === 0}" @click="setSortType(0)">智能</a>
                    <em class="sep">|</em>
                  </li>
                  <li>
                    <a :class="{cur: sortType === 1}" @click="setSortType(1)">好评</a>
                    <em class="sep">|</em>
                  </li>
                  <li>
                    <a :class="{cur: sortType === 2}" @click="setSortType(2)">评论最多</a>
                    <em class="sep">|</em>
                  </li>
                  <li>
                    <a :class="{cur: sortType === 3}" @click="setSortType(3)">人均最少</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="shop-list J_shop-list shop-all-list" id="shop-all-list">
              <ul style="overflow:hidden">
                <li v-for="(item, index) in showList" :key="index">
                  <div class="pic">
                    <a @click="toDetail(0, item._id)">
                      <img src="http://localhost:3000/public/img/default.jpg" alt>
                    </a>
                  </div>
                  <div class="txt">
                    <div class="tit">
                      <a @click="toDetail(0, item._id)">
                        <h4>{{item.name}}</h4>
                      </a>
                    </div>
                    <div class="comment">
                      <el-rate v-model="item.score" disabled show-score text-color="#ff9900"></el-rate>
                      <a>{{getCommentNum(item._id)}}条点评</a>
                      <em class="sep">|</em>
                      <a>人均￥{{item.avg}}</a>
                    </div>
                    <div class="tag-addr">
                      <a>{{item.typename}}</a>
                      <em class="sep">|</em>
                      <a>{{item.address}}</a>
                    </div>
                  </div>
                  <div class="svr-info">
                    <a>{{item.desc}}</a>
                  </div>
                </li>
              </ul>
            </div>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="10"
              layout="total, prev, pager, next"
              :total="shoplist.length"
            ></el-pagination>
          </div>
        </div>
        <div class="aside">
          <div class="J_midas-3">
            <div class="midas-wrap midas-wrap-search">
              <div class="clearfix">
                <span class="tip fr">广告</span>
                <h4>你可能会喜欢</h4>
              </div>
              <div class="J_con">
                <div class="item">
                  <ul class="mn">
                    <li class="shop">
                      <a class="img-shop">
                        <img src="http://localhost:3000/public/img/default.jpg" alt>
                      </a>
                    </li>
                    <li class="tit">
                      <a href></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
import moment from "moment";
moment.locale("zh-cn");
const sortType = {};
sortType.default = 0; //默认
sortType.score = 1; //好评
sortType.comment = 2; //评论
sortType.avarage = 3; //人均
export default {
  data() {
    return {
      selectTypeIndex: -1,
      currentPage: 1,
      offset: 0,
      limit: 10,
      sortType: 0,
      value: 5,
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
    },
    showList() {
      let list = this.getshopList();
      return list.slice(this.offset, this.offset + 10);
    }
  },
  activated() {
    this.initData();
  },
  // created() {
  //   this.initData();
  // },
  methods: {
    getshopList() {
      let showlist = Array.from(this.shoplist);
      if (this.selectTypeIndex === -1) {
      } else {
        let typeid = this.typelist[this.selectTypeIndex]._id;
        showlist = this.shoplist.filter(item => item.type === typeid);
      }
      switch (this.sortType) {
        case sortType.default:
          return showlist;
          break;
        case sortType.score:
          return showlist.sort((a, b) => {
            return b.score - a.score;
          });
          break;
        case sortType.comment:
          return showlist.sort((a, b) => {
            return this.getCommentNum(b._id) - this.getCommentNum(a._id);
          });
          break;
        case sortType.avarage:
          return showlist.sort((a, b) => {
            return a.avg - b.avg;
          });
          break;
      }
      return showlist;
    },
    async initData() {
      let data = [];
      let type = [];
      data = await this.$fetch("data/list", {
        method: "POST",
        body: JSON.stringify({
          kind: parseInt(this.type)
        })
      });
      this.shoplist = data.data;
      type = await this.$fetch("data/typelist", {
        method: "POST",
        body: JSON.stringify({
          kind: parseInt(this.type)
        })
      });
      this.typelist = type.data;

      let list = await this.$fetch("comment/passlist");
      this.commentList = list.data;
      this.commentList.forEach(item => {
        item.time = this.formatTime(item.createTime);
      });
      this.shoplist.forEach(item => {
        item.score = parseFloat(this.getScore(item._id)) || 0;
        item.avg = parseFloat(this.getaverage(item._id)) || 0;
      });

      // this.getList();
      // this.GetListCount();
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
    getCommentNum(itemid) {
      let itemArr = this.commentList.filter(item => item.itemid === itemid);
      return itemArr.length;
    },
    formatTime(time) {
      return moment(time).format("LL");
    },
    changeSelectType(index) {
      this.selectTypeIndex = index;
    },
    setSortType(index) {
      this.sortType = index;
    },
    toDetail(type, id) {
      this.$router.push({ name: "itemDetail", params: { type: type, id: id } });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
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
  margin-top: 10px;
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

.content-wrap {
  margin-top: 10px;
}

.content-wrap .shop-wrap {
  width: 950px;
  float: left;
  margin-right: 10px;
}

.content-wrap .shop-wrap .content {
  border: 1px solid #f0f0f0;
  background-color: #fff;
  margin-bottom: 10px;
  border-bottom: none;
}

.filter-box {
  position: relative;
  z-index: 10;
  padding: 0 45px 0 19px;
  border-bottom: solid 1px #eee;
  line-height: 44px;
}

.filter-box .filt-service {
  float: right;
  line-height: 44px;
}

.filter-box .filt-service li {
  position: relative;
  float: left;
  z-index: 1;
  _width: 64px;
  text-align: center;
}

.filter-box .filt-service .cur {
  color: #f63;
}
.filter-box .filt-service a {
  display: block;
  padding: 0 15px;
  _padding-top: 14px;
  _line-height: 20px;
  _height: 20px;
  &:hover {
    cursor: pointer;
  }
}

.filter-box .filt-service em {
  position: absolute;
  top: 0;
  right: -1px;
  color: #e0e0e0;
}

i,
em {
  font-style: normal;
}

.content-wrap .shop-wrap .shop-all-list {
  position: relative;
  z-index: 9;
}

.content-wrap .shop-wrap .shop-list {
  padding-top: 0;
}
.content-wrap .shop-wrap .shop-list {
  margin-bottom: -1px;
  // padding-top: 10px;
  position: relative;
  *z-index: 5;
}

.content-wrap .shop-wrap .shop-all-list li:hover {
  background: #f8f8f8;
}
.content-wrap .shop-wrap .shop-all-list li {
  position: relative;
  float: left;
  zoom: 1;
  padding-left: 210px;
  width: 723px;
  min-height: 118px;
}
.content-wrap .shop-wrap .shop-list li {
  padding: 15px 15px 38px 210px;
  border-bottom: 1px solid #f0f0f0;
  display: block;
}

.content-wrap .shop-wrap .shop-all-list li .pic {
  position: absolute;
  left: 20px;
  top: 20px;
}

.content-wrap .shop-wrap .shop-list li .pic {
  float: left;
  margin-right: 14px;
}

.content-wrap .shop-wrap .shop-list li img {
  width: 170px;
  height: 127px;
  border: 1px solid #f0f0f0;
  &:hover {
    cursor: pointer;
  }
}
.content-wrap .shop-wrap .shop-all-list li .txt {
  position: relative;
  min-height: 88px;
  line-height: 26px;
}

.content-wrap .shop-wrap .shop-all-list li .tit a {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  white-space: nowrap;
  word-wrap: normal;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: middle;
  &:hover {
    cursor: pointer;
  }
}

.content-wrap .shop-wrap .shop-all-list li .tit h4 {
  float: left;
  margin-right: 5px;
  font-size: 16px;
  max-width: 380px;
  _width: 295px;
  color: #333;
}

.content-wrap .shop-wrap .shop-all-list li .comment a {
  color: #999;
}

.content-wrap .shop-wrap .shop-all-list li .tag-addr {
  line-height: 24px;
  color: #999;
}

.content-wrap .shop-wrap .shop-all-list li .tag-addr a {
  color: #999;
}

.content-wrap .shop-wrap .shop-all-list li .svr-info {
  border-top: dashed 1px #f0f0f0;
  margin-bottom: -22px;
}

.content-wrap .shop-wrap .shop-all-list li .svr-info a {
  display: block;
  padding-top: 4px;
  width: 85%;
  line-height: 28px;
  display: block;
  color: #999;
}
.J_midas-3 .midas-wrap-search {
  width: 188px;
  padding: 15px 20px 0 20px;
}
.midas-wrap-search {
  width: 148px;
  overflow: hidden;
  margin-bottom: 10px;
  padding: 15px 15px 0;
  border: 1px solid #e9e9e9;
}
.midas-wrap {
  background: #fff;
  line-height: 1;
}
.J_midas-3 .midas-wrap-search .title .tip {
  color: #e5e5e5;
  border: 1px solid #e5e5e5;
  padding: 1px 3px;
}
.midas-wrap .title .tip {
  color: #999;
}
.midas-wrap .fr {
  float: right;
}
.midas-wrap .title h4 {
  color: #333;
  font-size: 14px;
}
.J_midas-3 .midas-wrap-search .J_con {
  width: 100%;
}
.J_midas-3 .midas-wrap-search .J_con .item {
  padding-bottom: 10px;
  margin-bottom: 6px;
  padding-left: 10px;
  margin-top: 20px;
}
.midas-wrap-search .item {
  padding-bottom: 20px;
}
.midas-wrap-search .mn .shop {
  margin-top: 0;
}
.J_midas-3 .midas-wrap-search .J_con .item .mn .shop .img-shop {
  width: 172px;
  height: auto;
}

.midas-wrap-search .mn .img-shop {
  display: block;
  position: relative;
  width: 148px;
  height: 84px;
  overflow: hidden;
}
.J_midas-3 .midas-wrap-search .J_con .item .mn .shop .img-shop img {
  width: 170px;
  height: 127px;
  border: 1px solid #f0f0f0;
}
</style>
