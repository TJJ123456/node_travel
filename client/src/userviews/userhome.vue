<template>
  <div style="background-color: #f6f6f6;height:100%; width: 100%;">
    <div class="mainpage">
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="item in 6" :key="item">
          <img style="width:100%;height:100%" :src="getCarousel(item)" alt>
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="cata-detail">
      <div class="cata-part cata-part-one cata-part-double cata-poi">
        <div class="cata-index cata-food-index" style="height:480px;">
          <div class="cata-title">
            <div class="title-dec">
              <i class="el-icon-food" style="color:#f63;"></i> 美食
            </div>
            <a class="view-more" @click="toShoplist(0)">
              <span>全部</span>
              <span class="arrow-right el-icon-arrow-right"></span>
            </a>
          </div>
          <div class="cata-con">
            <div class="cata-shop-item" v-for="(item, index) in showlist(0)" :key="index">
              <div class="shop-item">
                <a class="shop-img shop-item-pic" @click="toDetail(0, item._id)">
                  <img :src="getImgPath(item.filepath)" alt>
                </a>
                <div class="shop-info tag-single">
                  <a class="shop-name" @click="toDetail(0, item._id)">
                    <span class="name-desc">{{item.name}}</span>
                  </a>
                  <div class="star-info">
                    <el-rate v-model="item.score" disabled show-score text-color="#ff9900"></el-rate>
                    <span class="comment">{{getCommentNum(item._id)}}条点评</span>
                  </div>
                  <div class="area-info">
                    <span class="maincate-name">{{item.typename}}</span>
                  </div>
                  <div class="avg">
                    <span>￥{{item.avg}}/人</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cata-index cata-entertainment-index" style="height:480px;">
          <div class="cata-title">
            <div class="title-dec">
              <i class="el-icon-star-off" style="color:#f63;"></i> 休闲娱乐
            </div>
            <a class="view-more" @click="toShoplist(1)">
              <span>全部</span>
              <span class="arrow-right el-icon-arrow-right"></span>
            </a>
          </div>
          <div class="cata-con">
            <div class="cata-shop-item" v-for="(item, index) in showlist(1)" :key="index">
              <div class="shop-item">
                <a class="shop-img shop-item-pic" @click="toDetail(1, item._id)">
                  <img :src="getImgPath(item.filepath)" alt>
                </a>
                <div class="shop-info tag-single">
                  <a class="shop-name" @click="toDetail(1, item._id)">
                    <span class="name-desc">{{item.name}}</span>
                  </a>
                  <div class="star-info">
                    <el-rate v-model="item.score" disabled show-score text-color="#ff9900"></el-rate>
                    <span class="comment">{{getCommentNum(item._id)}}条点评</span>
                  </div>
                  <div class="area-info">
                    <span class="maincate-name">{{item.typename}}</span>
                  </div>
                  <div class="avg">
                    <span>￥{{item.avg}}/人</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="travel-scene-cata" class="last-four-cata cata-poi">
          <div class="top-bar clearfix">
            <div class="title-text">旅游景点</div>
            <div class="operation">
              <a class="all">全部</a>
            </div>
          </div>
          <div class="bottom-list scene-list">
            <ul class="clearfix">
              <li class="list-item" v-for="(item, index) in showlist(2)" :key="index">
                <div class="item">
                  <a class="shop-item-pic" @click="toDetail(2, item._id)">
                    <img :src="getImgPath(item.filepath)">
                    <div class="pic-overlay"></div>
                  </a>
                  <div class="scene_desc">
                    <a class="shop-name" @click="toDetail(2, item._id)">{{item.name}}</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      foodlist: [],
      commentList: [],
      entertainmentList: [],
      spotList: [],
      dataList: []
    };
  },
  computed: {},
  // created() {
  //   this.initData();
  // },
  activated() {
    this.initData();
  },
  methods: {
    async initData() {
      let data = await this.$fetch("data/list");
      let comment = await this.$fetch("comment/passlist");
      this.dataList = data.data;
      this.commentList = comment.data;
      this.dataList.forEach(item => {
        item.score = parseFloat(this.getScore(item._id)) || 0;
        item.avg = parseFloat(this.getaverage(item._id)) || 0;
      });
      this.foodlist = this.dataList.filter(item => item.kind === 0);
      this.entertainmentList = this.dataList.filter(item => item.kind === 1);
      this.spotList = this.dataList.filter(item => item.kind === 2);
    },
    showlist(type) {
      if (type === 0) {
        return this.foodlist.slice(0, 6);
      } else if (type === 1) {
        return this.entertainmentList.slice(0, 6);
      } else if (type === 2) {
        return this.spotList.slice(0, 6);
      }
    },
    toDetail(type, id) {
      this.$router.push({ name: "itemDetail", params: { type: type, id: id } });
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
    toShoplist(type) {
      this.$router.push({ name: "shoplist", params: { type: type } });
    },
    getImgPath(path) {
      if (path && path !== "") return "http://localhost:3000" + path;
      return "http://localhost:3000/public/img/default.jpg";
    },
    getCarousel(index) {
      return `http://localhost:3000/public/carousel/carousel${index}.jpg`;
    }
  }
};
</script>
<style lang="less" scoped>
.cata-detail {
  margin: 10px auto;
  width: 1190px;
  // background-color: #f6f6f6;
}
.cata-detail .cata-part-one {
  display: inline-block;
}
.cata-detail .cata-part {
  margin-top: 29px;
  width: 100%;
  font-size: 0;
}
.cata-part-double .cata-beauty-index,
.cata-part-double .cata-food-index {
  margin-right: 10px;
}
.cata-part-double .cata-beauty-index,
.cata-part-double .cata-child-index,
.cata-part-double .cata-entertainment-index,
.cata-part-double .cata-food-index {
  width: 590px;
}
.cata-index {
  background: #fff;
  display: inline-block;
  font-size: 0;
}

.cata-index .cata-title {
  height: 30px;
  padding-left: 20px;
  position: relative;
  padding-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.cata-index .cata-title .cata-index-pic {
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-size: 30px;
  display: inline-block;
  position: absolute;
  top: 0;
}

.cata-index .cata-title .cata-tag,
.cata-index .cata-title .title-dec {
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  word-wrap: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: middle;
}
.cata-index .cata-title .title-dec {
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  margin-left: 40px;
}

.cata-index .cata-title .view-more {
  position: absolute;
  right: 19px;
  top: 9px;
  color: #333;
  font-size: 12px;
  cursor: pointer;
  height: 14px;
  line-height: 14px;
  display: inline-block;
  width: 37px;
}
a {
  text-decoration: none;
}

.cata-index .cata-title .view-more .arrow-right {
  width: 6px;
  height: 11px;
  display: inline-block;
  position: absolute;
  top: 1px;
  right: 0;
}

.cata-index .cata-con {
  padding: 0 10px 10px;
}
.cata-index .cata-con .cata-shop-item {
  height: 190px;
  padding: 0 10px;
  display: inline-block;
  position: relative;
  margin-bottom: 10px;
}

.cata-index .cata-con .cata-shop-item .shop-item {
  display: block;
  color: #333;
}

.cata-index .cata-con .cata-shop-item .shop-item .shop-img {
  width: 170px;
  height: 96px;
  display: block;
  cursor: pointer;
}
.shop-item-pic {
  position: relative;
}

a {
  text-decoration: none;
}

.cata-index .cata-con .cata-shop-item .shop-item .shop-img img {
  width: 100%;
  height: 100%;
}
img {
  border: 0;
}

.cata-index .cata-con .cata-shop-item .shop-item .shop-info {
  margin-top: 12px;
  max-width: 170px;
  white-space: nowrap;
  word-wrap: normal;
  text-overflow: ellipsis;
  overflow: hidden;
}

.cata-index .cata-con .cata-shop-item .shop-item .shop-info .shop-name {
  max-width: 170px;
  white-space: nowrap;
  word-wrap: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: middle;
  line-height: 18px;
  display: inline-table;
  cursor: pointer;
}

.cata-index
  .cata-con
  .cata-shop-item
  .shop-item
  .tag-single
  .shop-name
  .name-desc {
  max-width: 145px;
}
.cata-index
  .cata-con
  .cata-shop-item
  .shop-item
  .shop-info
  .shop-name
  .name-desc {
  display: inline-block;
  font-size: 16px;
  color: #333;
  max-width: 118px;
  white-space: nowrap;
  word-wrap: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 5px;
  vertical-align: middle;
  line-height: 19px;
  padding-top: 1px;
  &:hover {
    cursor: pointer;
    color: #f63;
  }
}

.cata-index .cata-con .cata-shop-item .shop-item .shop-info .star-info {
  font-size: 11px;
  color: #999;
  margin-top: 6px;
  line-height: 11px;
  height: 12px;
}

.cata-index
  .cata-con
  .cata-shop-item
  .shop-item
  .shop-info
  .star-info
  .comment {
  display: inline-block;
  margin-left: 4px;
  vertical-align: middle;
  line-height: 13px;
  white-space: nowrap;
  word-wrap: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 12px;
  float: right;
}

.cata-index .cata-con .cata-shop-item .shop-item .shop-info .area-info {
  font-size: 11px;
  color: #999;
  margin-top: 7px;
  height: 12px;
  line-height: 12px;
}

.cata-index
  .cata-con
  .cata-shop-item
  .shop-item
  .shop-info
  .area-info
  .region-name {
  float: right;
}
.cata-index .cata-con .cata-shop-item .shop-item .shop-info .area-info span {
  display: inline-block;
  line-height: 13px;
  max-width: 50%;
  white-space: nowrap;
  word-wrap: normal;
  text-overflow: ellipsis;
  overflow: hidden;
}
.cata-index .cata-con .cata-shop-item .shop-item .shop-info .avg {
  font-size: 11px;
  color: #999;
  margin-top: 5px;
  display: inline-block;
}

.last-four-cata {
  position: relative;
  margin: 30px auto 0;
  width: 1190px;
  background-color: #fff;
  overflow: hidden;
}

.last-four-cata .top-bar {
  height: 30px;
  padding-left: 20px;
  position: relative;
  padding-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 0;
}
.last-four-cata .top-bar .cata-tag,
.last-four-cata .top-bar .title-text {
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  white-space: nowrap;
  word-wrap: normal;
  text-overflow: ellipsis;
  overflow: hidden;
}
.last-four-cata .top-bar .title-text {
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  margin-left: 40px;
}

.last-four-cata .top-bar .operation {
  position: absolute;
  right: 19px;
  top: 9px;
  font-size: 14px;
  cursor: pointer;
  width: 37px;
}
.last-four-cata .top-bar .operation,
.last-four-cata .top-bar .operation .all .more-desc {
  height: 14px;
  line-height: 14px;
  display: inline-block;
}
.last-four-cata .top-bar .operation .all {
  font-size: 12px;
  color: #333;
  display: inline-block;
  width: 100%;
  position: relative;
}
.last-four-cata .scene-list {
  max-height: 548px;
  font-size: 0;
}
.last-four-cata .bottom-list {
  width: 100%;
  margin: 0;
  overflow: hidden;
}
.last-four-cata .scene-list .list-item {
  width: 370px;
  height: 240px;
  float: left;
  margin: 0 0 34px 20px;
}
.last-four-cata .scene-list .list-item a:hover {
  cursor: pointer;
  color: #f63;
}
.last-four-cata .scene-list .list-item .item {
  display: block;
  width: 100%;
  height: 100%;
}
.last-four-cata .scene-list .list-item .item .shop-item-pic {
  width: 100%;
  height: 208px;
  display: block;
}
.shop-item-pic {
  position: relative;
}
.last-four-cata .scene-list .list-item .item .shop-item-pic > img {
  width: 100%;
  height: 100%;
}
.shop-item-pic .pic-overlay {
  display: none;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: hsla(0, 0%, 100%, 0.2);
}
.last-four-cata .scene-list .list-item .item .scene_desc {
  width: 100%;
  margin: 10px 0 0;
  font-size: 16px;
  color: #222;
  text-align: left;
  max-width: 100%;
  white-space: nowrap;
  word-wrap: normal;
  text-overflow: ellipsis;
  overflow: hidden;
}
.last-four-cata .scene-list .list-item .item .scene_desc a {
  width: 100%;
  height: 100%;
  color: #222;
  max-width: 100%;
  white-space: nowrap;
  word-wrap: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  &:hover {
    color: #f63;
  }
}

.mainpage {
  width: 100%;
  padding: 10px;
  background-color: #fff;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
