<template>
  <div style="background-color: #f6f6f6;height:100%; width: 100%;">
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
      entertainmentList: []
    };
  },
  created() {
    this.initData();
  },
  activated() {
    this.initData();
  },
  methods: {
    async initData() {
      let data = await this.$fetch("food/foodlist");
      let comment = await this.$fetch("comment/passlist");
      let entertainment = await this.$fetch("entertainment/list");
      this.foodlist = data.data;
      this.commentList = comment.data;
      this.entertainmentList = entertainment.data;
      this.foodlist.forEach(item => {
        item.score = parseFloat(this.getScore(item._id)) || 0;
        item.avg = parseFloat(this.getaverage(item._id)) || 0;
      });
      this.entertainmentList.forEach(item => {
        item.score = parseFloat(this.getScore(item._id)) || 0;
        item.avg = parseFloat(this.getaverage(item._id)) || 0;
      });
    },
    showlist(type) {
      if (type === 0) {
        return this.foodlist.slice(0, 6);
      } else if (type === 1) {
        return this.entertainmentList.slice(0, 6);
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
</style>
