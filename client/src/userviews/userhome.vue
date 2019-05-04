<template>
  <div class="cata-detail">
    <div class="cata-part cata-part-one cata-part-double cata-poi">
      <div class="cata-index cata-food-index">
        <div class="cata-title">
          <div class="title-dec">
            <i class="el-icon-tickets" style="color:#f63;"></i> 美食
          </div>
          <a class="view-more">
            <span>全部</span>
            <span class="arrow-right el-icon-arrow-right"></span>
          </a>
        </div>
        <div class="cata-con">
          <div class="cata-shop-item">
            <div class="shop-item">
              <a class="shop-img shop-item-pic">
                <img
                  src="https://img.meituan.net/msmerchant/07776b2b4260d93bb983ea8f95fc03ca415523.jpg%40340w_192h_1e_1l%7Cwatermark%3D0"
                  alt
                >
              </a>
              <div class="shop-info tag-single">
                <a class="shop-name">
                  <span class="name-desc">刘三姐腋窝米粉</span>
                </a>
                <div class="star-info">
                  <span class="comment">100条点评</span>
                </div>
                <div class="area-info">
                  <span class="region-name">地址</span>
                  <span class="maincate-name">本地菜</span>
                </div>
                <div class="avg">
                  <span>￥100/人</span>
                </div>
              </div>
            </div>
          </div>
          <div class="cata-shop-item">
            <div class="shop-item">
              <a class="shop-img shop-item-pic">
                <img
                  src="https://img.meituan.net/msmerchant/07776b2b4260d93bb983ea8f95fc03ca415523.jpg%40340w_192h_1e_1l%7Cwatermark%3D0"
                  alt
                >
              </a>
              <div class="shop-info tag-single">
                <a class="shop-name">
                  <span class="name-desc">刘三姐腋窝米粉</span>
                </a>
                <div class="star-info">
                  <span class="comment">100条点评</span>
                </div>
                <div class="area-info">
                  <span class="region-name">地址</span>
                  <span class="maincate-name">本地菜</span>
                </div>
                <div class="avg">
                  <span>￥100/人</span>
                </div>
              </div>
            </div>
          </div>
          <div class="cata-shop-item">
            <div class="shop-item">
              <a class="shop-img shop-item-pic">
                <img
                  src="https://img.meituan.net/msmerchant/07776b2b4260d93bb983ea8f95fc03ca415523.jpg%40340w_192h_1e_1l%7Cwatermark%3D0"
                  alt
                >
              </a>
              <div class="shop-info tag-single">
                <a class="shop-name">
                  <span class="name-desc">刘三姐腋窝米粉</span>
                </a>
                <div class="star-info">
                  <span class="comment">100条点评</span>
                </div>
                <div class="area-info">
                  <span class="region-name">地址</span>
                  <span class="maincate-name">本地菜</span>
                </div>
                <div class="avg">
                  <span>￥100/人</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cata-index cata-entertainment-index">
        <div class="cata-title">
          <div class="title-dec">
            <i class="el-icon-tickets" style="color:#f63;"></i> 休闲娱乐
          </div>
          <a class="view-more">
            <span>全部</span>
            <span class="arrow-right el-icon-arrow-right"></span>
          </a>
        </div>
        <div class="cata-con">
          <div class="cata-shop-item">
            <div class="shop-item">
              <a class="shop-img shop-item-pic">
                <img
                  src="https://img.meituan.net/msmerchant/07776b2b4260d93bb983ea8f95fc03ca415523.jpg%40340w_192h_1e_1l%7Cwatermark%3D0"
                  alt
                >
              </a>
              <div class="shop-info tag-single">
                <a class="shop-name">
                  <span class="name-desc">刘三姐腋窝米粉</span>
                </a>
                <div class="star-info">
                  <span class="comment">100条点评</span>
                </div>
                <div class="area-info">
                  <span class="region-name">地址</span>
                  <span class="maincate-name">本地菜</span>
                </div>
                <div class="avg">
                  <span>￥100/人</span>
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
export default {};
</script>
<style lang="less" scoped>
.cata-detail {
  margin: 10px auto;
  width: 1190px;
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
