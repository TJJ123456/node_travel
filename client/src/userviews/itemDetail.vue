<template>
  <div class="body shop-body" style="margin-top:30px;height:100%; width: 100%;">
    <div class="body-content clearfix">
      <div class="main">
        <div class="basic-info default nug_shop_ab_pv-a">
          <h1 class="shop-name">{{item.name}}</h1>
          <div class="brief-info">
            <el-rate v-model="item.score" disabled show-score text-color="#ff9900"></el-rate>
            <span class="item">44条评论</span>
            <span class="item">人均100元</span>
          </div>
          <div class="expand-info address">
            <span class="info-name">描述：</span>
            <span class="item">{{item.desc}}</span>
          </div>
          <div class="expand-info address">
            <span class="info-name">地址：</span>
            <span class="item">{{item.address}}</span>
          </div>
          <div class="expand-info tel">
            <span class="info-name">电话：</span>
            <span class="item">{{item.phone}}</span>
          </div>
          <div class="action">
            <a class="write left-action" @click="toComment()">
              <i class="icon el-icon-edit"></i>
              <span @click="toComment()" class="dpReviewBtn">写点评</span>
            </a>
          </div>
        </div>
        <div class="mod comment">
          <h2 class="mod-title J-tab">
            网友点评
            <span class="sub-title">({{commentList.length}})</span>
          </h2>
          <template v-if="commentList.length > 0">
            <ul class="comment-list J-list">
              <li class="comment-item" v-for="(item, index) in commentList" :key="index">
                <p class="user-info">{{item.username}}</p>
                <div class="content">
                  <p class="shop-info">
                    <el-rate
                      v-model="item.score"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                    ></el-rate>
                    <span class="average">人均 {{item.average}} 元</span>
                  </p>
                  <div class="info J-info-short clearfix">
                    <p class="desc">{{item.content}}</p>
                  </div>
                  <div class="misc-info">
                    <div class="actions"></div>
                    <span class="time">{{item.time}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </template>
          <h2 v-else>暂无评论</h2>
        </div>
        <div id="addreview-wrapper" style="overflow:hidden" v-if="$state.user">
          <div class="comment-write" id="comment-write">
            <h3 class="title1">去过{{item.name}}?给大家分享体验</h3>
            <div class="content">
              <a class="avatar">
                <img src="http://localhost:3000/public/img/logo.png" alt>
              </a>
              <p class="user-info">{{$state.user.username}}</p>
              <el-rate v-model.number="myComment.score" show-text></el-rate>
              <textarea minlength="1" v-model="myComment.content" name id cols="30" rows="10"></textarea>
              <input class="avg" v-model="myComment.average" placeholder="人均消费" type="number">
              <a @click="createComment()" class="submit J-submit">发表</a>
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
      item: {},
      commentList: [],
      myComment: {
        score: null,
        average: null,
        content: null,
        type: parseInt(this.type),
        itemid: this.id
      }
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
          this.item = (await this.$fetch("food/getfood", {
            method: "POST",
            body: JSON.stringify({
              id: this.id
            })
          })).data;
          break;
        case 1:
          this.item = (await this.$fetch("entertainment/get", {
            method: "POST",
            body: JSON.stringify({
              id: this.id
            })
          })).data;
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
      this.item.score = parseFloat(this.getScore(this.id)) || 0;

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
    },
    toComment() {
      this.$router.push({
        name: "comment",
        params: { type: this.type, id: this.id }
      });
    },
    async createComment() {
      if(!this.myComment.average){
        this.$message({
          showClose: true,
          message: '请填写人均消费',
          type: "error"
        });
        return;
      }
      if(!this.myComment.content){
        this.$message({
          showClose: true,
          message: '请填写评论内容',
          type: "error"
        });
        return;
      }
      if(!this.myComment.score){
        this.$message({
          showClose: true,
          message: '请选择评分',
          type: "error"
        });
        return;
      }
      if(!this.myComment.average){
        this.$message({
          showClose: true,
          message: '请填写人均消费',
          type: "error"
        });
        return;
      }
      let data = await this.$fetch("comment/create", {
        method: "POST",
        body: JSON.stringify(this.myComment)
      });
      if (data.err) {
        if (data.msg === "请登录") {
          this.$router.replace("/home/login", "");
        }
        this.$message({
          showClose: true,
          message: data.msg,
          type: "error"
        });
      } else {
        this.$message({
          showClose: true,
          message: "评论成功，等待审核",
          type: "success"
        });
        this.resetForm("ruleForm");
        this.$router.push({
          name: "itemDetail",
          params: { type: this.type, id: this.id }
        });
      }
    },
  },
  props: {
    type: {
      required: true
    },
    id: {
      required: true
    }
  }
};
</script>
<style lang="less" scoped>
.shop-body {
  background: 0 0;
}
.body .body-content {
  position: relative;
  width: 1190px;
  margin: 0 auto;
}
.clearfix {
  zoom: 1;
}
.body .main {
  float: left;
  width: 870px;
  padding-right: 0;
  _overflow: hidden;
}
.basic-info {
  padding: 18px 20px 50px;
  height: auto;
  height: initial;
}
.shop-owner {
  border: 1px solid #f0f0f0;
  box-shadow: none;
  -webkit-box-shadow: none;
}
.basic-info.default {
  border-right: none;
  margin-right: 0;
  min-height: 187px;
}
.basic-info {
  position: relative;
  margin: 0;
  padding: 15px 20px 53px 20px;
  width: 829px;
  background-color: #fff;
  border: 1px solid #ebebeb;
  -webkit-box-shadow: 0 2px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.03);
  _zoom: 1;
  _margin: 0;
}

.shop-name {
  color: #333;
  font-weight: 700;
}
.basic-info .shop-name {
  font-size: 22px;
  line-height: 33px;
  margin-top: -7.5px;
}

.basic-info .brief-info {
  margin-top: 6px;
  font-size: 14px;
  color: #ebebeb;
}
.brief-info .item {
  color: #666;
}
.basic-info .brief-info .item {
  margin: 0 10px;
  vertical-align: middle;
  color: #999;
}

.basic-info .expand-info.address {
  margin-top: 7px;
  height: 28px;
  line-height: 28px;
}
.basic-info .expand-info {
  font-size: 14px;
  // color: #282828;
  color: #999;
  margin-top: 9px;
}
.address {
  font-family: "Microsoft YaHei";
}

.basic-info .expand-info.address .item {
  max-width: 700px;
  overflow: hidden;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  display: inline-block;
  vertical-align: top;
  _vertical-align: middle;
  color: #999;
}

.basic-info .expand-info.tel {
  margin-top: 6px;
  color: #999;
}
.action {
  left: 20px;
}
.action {
  position: absolute;
  left: 15px;
  bottom: 15px;
  right: 15px;
  height: 36px;
}
.action .write {
  width: 120px;
  height: 34px;
  line-height: 34px;
  background: #ff794d;
  border-radius: 1px;
  padding: 0;
  font-size: 0;
  text-align: center;
  margin-right: 8px;
}
.action .write {
  padding: 0 15px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  color: #fff;
  background-color: #ff7200;
  -webkit-border-radius: 3px;
  border-radius: 3px;
}
.action .left-action {
  float: left;
}

a {
  color: #282828;
  cursor: pointer;
}

.action .write .dpReviewBtn {
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
}

.icon {
  width: 16px;
  height: 16px;
  background-size: contain;
  padding-right: 3px;
  margin-right: 0;
}

.mod {
  margin-top: 10px;
}

.comment {
  border: 1px solid #f0f0f0;
  box-shadow: none;
  -webkit-box-shadow: none;
  user-select: none;
}

.mod {
  margin-top: 20px;
  background: #fff;
  width: 830px;
  padding: 15px 20px;
}

.mod-title {
  padding-bottom: 8px;
  border-bottom: none;
}

.mod-title .item {
  font-size: 16px;
  color: #333;
  padding-bottom: 5px;
  font-weight: 700;
}
.body .mod .mod-title .item {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  margin-right: 15px;
  text-decoration: none;
}
h2 {
  font-weight: 400;
  font-size: 100%;
}

.body .mod .mod-title .sub-title {
  color: #999;
}
.comment-item {
  position: relative;
  padding-left: 0px;
  margin-top: 15px;
}

.comment-item .user-info {
  font-size: 14px;
}

.comment-item .content,
.comment-item .content {
  border-bottom: 1px solid #f0f0f0;
}
.comment-item .content {
  padding-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 10px;
}
.comment-item .shop-info {
  color: #8c8c8c;
  margin-top: 4px;
}

.shop-info {
  display: inline-block;
  vertical-align: middle;
  font-size: 13px;
  margin-left: 10px;
}

.comment-item .desc {
  font-size: 14px;
  line-height: 24px;
  margin-top: 10px;
  position: static;
  word-break: break-all;
  word-wrap: break-word;
}

.comment-item .misc-info {
  color: #8c8c8c;
  margin-top: 12px;
}

.comment-item .misc-info .actions {
  float: left;
}

.comment-item .misc-info span {
  margin-right: 15px;
}
.time {
  font-size: 12px;
}

#addreview-wrapper {
  margin-top: 10px;
  background: #fff;
}

#addreview-wrapper .comment-write {
  border: 1px solid #f0f0f0;
  padding-left: 25px;
  padding-bottom: 25px;
}
.comment-write {
  padding-top: 25px;
}
.comment-write,
.friends-comment .qq-friends {
  border-top: 1px solid #e0e0e0;
}

.comment-write .title1 {
  font-size: 14px;
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
.comment-write .content {
  position: relative;
  padding-left: 80px;
  margin-top: 20px;
}

.comment-friend-card .avatar,
.comment-friend-card-simple .avatar,
.comment-item .avatar,
.comment-user-card .info .avatar,
.comment-write .content .avatar {
  position: absolute;
  left: 0;
  top: 0;
  width: 60px;
  height: 60px;
}
a {
  color: #282828;
  cursor: pointer;
}
.comment-friend-card .avatar img,
.comment-friend-card-simple .avatar img,
.comment-item .avatar img,
.comment-user-card .info .avatar img,
.comment-write .content .avatar img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.comment-write .content .user-info {
  font-size: 14px;
  margin-bottom: 5px;
}

#addreview-wrapper .comment-write .content textarea {
  width: 710px;
}

.comment-write .content textarea {
  width: 578px;
  height: 36px;
  line-height: 18px;
  padding: 7px 10px;
  border: 1px solid #e0e0e0;
  margin-top: 15px;
}
body,
button,
input,
select,
textarea {
  font: 12px/1.5 "Microsoft YaHei", "Hiragino Sans GB";
}
.avg {
  width: 150px;
  height: 20px;
  line-height: 18px;
  padding: 7px 10px;
  border: 1px solid #e0e0e0;
  margin-top: 15px;
}
.comment-write .submit {
  display: block;
  height: 30px;
  width: 38px;
  line-height: 30px;
  padding: 0 30px;
  font-size: 14px;
  background-color: #ff7200;
  color: #fff;
  margin-top: 25px;
  border-radius: 2px;
  text-decoration: none;
  cursor: pointer;
}
</style>
