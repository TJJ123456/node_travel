<template>
  <div class="full">
    <div class="wrapper">
      <div class="header-box">
        <div class="home-header">
          <div class="header-nav">
            <div class="pic-txt head-user">
              <div class="pic">
                <a>
                  <img src="http://localhost:3000/public/img/logo.png" alt>
                </a>
              </div>
              <div class="txt">
                <div class="tit">
                  <h2 class="name">光仔</h2>
                  <div class="vip"></div>
                </div>
                <div class="nav">
                  <ul style="overflow:hidden">
                    <li class="cur">
                      <a>点评</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-box pages p-reviews" style="margin-top:20px">
        <div class="container" style="overflow:hidden">
          <div class="main">
            <div class="modebox p-tabs-box">
              <div class="tabs">
                <a class="cur">商户点评</a>
              </div>
            </div>
            <div class="modebox comm-list">
              <div class="pic-txt">
                <ul>
                  <li v-for="(item, index) in commentList" :key="index">
                    <div class="txt J_rptlist">
                      <div class="tit">
                        <h6>
                          <a>{{item.shopname}}</a>
                        </h6>
                      </div>
                      <div class="txt-c">
                        <div class="mode-tc addres">
                          <p class="col-exp">{{item.shopaddress}}</p>
                        </div>
                        <el-rate v-model="item.score" disabled show-score text-color="#ff9900"></el-rate>
                        <div class="mode-tc comm-entry">{{item.content}}</div>
                        <div class="mode-tc info">
                          <span class="col-exp">发表于{{item.time}}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
moment.locale("zh-cn");
export default {
  data() {
    return {
      value: 5,
      commentList: []
    };
  },
  activated() {
    this.initData();
  },
  methods: {
    async initData() {
      let data = await this.$fetch("comment/userlist");
      this.commentList = data.data;
      this.commentList.forEach(item => {
        item.time = this.formatTime(item.createTime);
      });
      if (data.err) {
        if (data.msg === "请登录") {
          this.$router.replace("/home/login", "");
        }
      }
    },
    formatTime(time) {
      return moment(time).format("LL");
    }
  }
};
</script>
<style lang="less" scoped>
html body {
  height: 100%;
}
.full {
  height: 1000px;
  background: #fdfbef url(http://localhost:3000/public/img/myview.jpg) no-repeat
    50% 30px;
  color: #555;
  width: 100%;
  display: block;
  position: absolute;
}

.wrapper {
  margin-top: 100px;
  // position: absolute;
  // top: 100px;
}

.home-header {
  background: url(http://localhost:3000/public/img/header-bg.png) no-repeat;
  _background: none #fff;
  box-shadow: 0 1px 0 0 #faf5d9;
  -webkit-box-shadow: 0 1px 0 0 #faf5d9;
  -moz-box-shadow: 0 1px 0 0 #bce8fa;
}
.home-header {
  position: relative;
  width: 950px;
  height: 120px;
  margin-top: 75px;
  padding: 10px 0 10px 10px;
  margin-bottom: 10px;
}
.home-header,
.container {
  width: 960px;
  margin: 0 auto;
}

.pic-txt li,
.pic-txt {
  zoom: 1;
}
.head-user .pic {
  position: relative;
  zoom: 1;
}
.pic-txt li .pic,
.pic-txt .pic {
  float: left;
  margin-right: 10px;
  _display: inline;
}
a {
  color: #2595b7;
}
a {
  text-decoration: none;
  color: #39c;
  outline: 0 none;
}
.head-user .pic img {
  width: 120px;
  height: 120px;
}
.pic-txt li .pic img,
.pic-txt .pic img {
  display: block;
  webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
img {
  vertical-align: middle;
}

.pic-txt li .txt,
.pic-txt .txt {
  display: table-cell;
  *display: inline-block;
  width: 2000px;
  *width: auto;
  table-layout: fixed;
  word-wrap: break-word;
  word-break: break-all;
}

.head-user .tit {
  padding: 5px 0 0 10px;
}

.head-user .tit .name {
  font-size: 20px;
  font-family: "Microsoft YaHei";
  float: left;
  margin-right: 5px;
}
.head-user .tit .vip {
  float: left;
}

.home-header .nav {
  position: absolute;
  width: 820px;
  _width: 815px;
  _height: 57px;
  bottom: 0;
  background-color: #fff;
}
.home-header .nav ul {
  width: 820px;
  _width: 815px;
  _height: 37px;
  padding: 10px 0 10px;
  zoom: 1;
}
.home-header .nav li {
  float: left;
  margin-right: 5px;
}
li {
  position: relative;
}

.pic-txt li,
.pic-txt {
  zoom: 1;
}
ul,
ol,
li {
  list-style: none outside;
}
.home-header .nav li a:hover,
.home-header .nav li.cur a {
  background-color: #ff8400;
  border-color: #ff8400;
  color: #fff;
}

.home-header .nav li a:hover,
.home-header .nav li.cur a {
  font-weight: bold;
  text-decoration: none;
}
.home-header .nav li a {
  border-color: #ffddb0;
  background-color: #fdfbef;
  color: #ff8400;
}
.home-header .nav li a {
  width: 90px;
  height: 21px;
  text-align: center;
  padding: 7px 9px 7px 10px;
  border: 1px solid #eaeaea;
  font-size: 14px;
  float: left;
  vertical-align: middle;
  webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.col-link,
a.col-link,
a .col-link {
  color: #555;
}
a:hover {
  cursor: pointer;
}

.container {
  filter: none;
}

.container {
  background-color: rgba(255, 255, 255, 0.5);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#80ffffff,endColorstr=#80ffffff,gradientType=0);
  _background-color: #fdfcf6;
}

.main {
  box-shadow: rgba(225, 246, 254, 0.9) 1px 0 1px;
}
.main {
  float: left;
  width: 710px;
  padding-bottom: 50px;
  min-height: 625px;
  _height: 625px;
}
.main {
  background-color: #fff;
}
.main-w .modebox,
.pages .main .modebox {
  padding: 10px 25px;
}
.p-tabs-box,
.p-crumb-box {
  position: relative;
  font-size: 14px;
}
.modebox {
  padding: 15px 20px;
}
.p-tabs-box .tabs {
  border-bottom-color: #e0eef6;
}

.p-tabs-box .tabs,
.p-crumb-box .crumb {
  border-bottom: 1px solid #e0eef6;
}
.p-tabs-box .cur {
  border-bottom-color: #2595b7;
  color: #424242;
}
.p-tabs-box .cur {
  font-weight: bold;
  border-bottom: 2px solid #2595b7;
}
.p-tabs-box a {
  color: #2595b7;
}
.home-header,
.container {
  width: 960px;
  margin: 0 auto;
}
.pages .main-w .modebox,
.pages .main .modebox {
  padding: 10px 25px;
}
.pages .main .modebox .tit {
  position: relative;
  margin-bottom: 10px;
}
.comm-list .pic-txt li .tit {
  background-color: #f4f4f4;
}
.comm-list .pic-txt li .tit {
  padding: 10px 20px 8px;
}
.pages .main .modebox h6 {
  font-size: 14px;
}
.comm-list .pic-txt li h6 {
  font-size: 14px;
}
.comm-list h6 {
  margin-right: 7px;
  display: inline-block;
  *display: inline;
  overflow: hidden;
  zoom: 1;
  vertical-align: middle;
}
.comm-list .pic-txt li .txt-c {
  display: table;
  width: 97%;
  padding: 0 0 15px 20px;
  table-layout: fixed;
  line-height: 1.8;
}
.pages .main .comm-list .addres {
  padding-bottom: 0;
  line-height: 2;
}
.pages .main .mode-tc {
  padding-bottom: 5px;
}
.col-exp {
  color: #999;
  font-size: 12px;
}
.pages .main .mode-tc {
  padding-bottom: 5px;
  font-size: 12px;
}
.comm-list .comm-entry {
  word-wrap: break-word;
  word-break: break-all;
}
</style>

