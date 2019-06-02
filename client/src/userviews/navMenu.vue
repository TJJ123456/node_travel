<template>
  <div>
    <div class="top-nav">
      <div class="top-nav-container clearfix">
        <template v-if="$state.user">
          <div class="group quick-menu">
            <a class="item" @click="logout()">登出</a>
          </div>
          <div class="group quick-menu">
            <a class="item" @click="toMyview()">{{$state.user.username}}</a>
            <span class="seprate">|</span>
          </div>
        </template>
        <div v-else class="group quick-menu">
          <a class="item" @click="login()">未登录</a>
        </div>
        <div class="group quick-menu">
          <a class="item" @click="toIndex()">首页</a>
          <span class="seprate">|</span>
        </div>
      </div>
    </div>
    <div class="logo-input" v-if="checkRoute()">
      <div class="logo-input-container clearfix">
        <div class="search-box">
          <div class="search-bar">
            <span class="search-container clearfix">
              <i class="el-icon-search i-search"></i>
              <span>
                <input v-model="keyword" type="text">
              </span>
              <span class="search-bnt-panel">
                <a @click="toSearch()" class="search-btn">搜索</a>
              </span>
            </span>
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
      keyword: ""
    };
  },
  computed: {
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  },
  methods: {
    async logout() {
      await this.$fetch("user/logout");
      this.$state.user = false;
      localStorage.removeItem("user");
      this.$router.replace("/");
      this.$message({
        showClose: true,
        message: "退出成功",
        type: "success"
      });
    },
    login() {
      this.$router.replace("/home/login");
    },
    toIndex() {
      this.$router.replace("/");
    },
    toMyview() {
      this.$router.push({ path: "/home/myview" });
    },
    checkRoute() {
      console.log("/home/myview" !== this.$route.path, this.$route.params.path);
      return (
        "/home/myview" !== this.$route.path &&
        "/home/login" !== this.$route.path &&
        "/home/fortgetpassword" !== this.$route.path
      );
    },
    toSearch() {
      if (this.keyword === "") {
        return;
      }
      if (this.$route.name === "search") {
        console.log("111111", this.keyword);
        this.$router.replace({
          name: "search",
          params: { keyword: this.keyword }
        });
      } else
        this.$router.push({
          name: "search",
          params: { keyword: this.keyword }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.nav {
  border-bottom: solid 1px #e6e6e6;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}

* {
  margin: 0;
  padding: 0;
  outline: 0;
}

.top-nav {
  width: 100%;
  min-width: 1190px;
  height: 35px;
  background-color: #f6f6f6;
  font-family: PingFangSC-Regular, Microsoft YaHei, sans-serif;
  font-size: 12px;
}

.top-nav .top-nav-container {
  width: 1190px;
  margin: 0 auto;
}
.top-nav .clearfix {
  content: "";
  display: block;
  overflow: hidden;
  clear: both;
  position: static;
}

.top-nav .top-nav-container .quick-menu {
  float: right;
}

.top-nav .top-nav-container .group .item {
  float: left;
  padding: 0 17px;
  line-height: 17px;
  cursor: pointer;
  vertical-align: middle;
  margin: 10px 0;
  border-left: 1px solid #f6f6f6;
  border-right: 1px solid #f6f6f6;
}
.top-nav a {
  text-decoration: none;
  color: #333;
  &:hover {
    cursor: pointer;
    color: #f63;
  }
}
.logo-input {
  width: 100%;
  min-width: 1190px;
  padding: 20px 0 5px;
  height: 68px;
  background-color: #fff;
  font-size: 12px;
}
.logo-input .logo-input-container {
  width: 1190px;
  margin: 0 auto;
}
.logo-input .clearfix {
  content: "";
  display: block;
  overflow: hidden;
  clear: both;
}
.logo-input .logo-input-container .search-bar {
  position: relative;
  // float: left;
  margin-left: 385px;
  height: 75px;
}

.logo-input .logo-input-container .search-bar .search-container {
  position: relative;
}
.logo-input .logo-input-container .search-bar .search-container span {
  float: left;
}

.logo-input .logo-input-container .search-bar .search-container input {
  width: 380px;
  height: 14px;
  padding: 9px;
  border: 2px solid #f63;
  text-indent: 22px;
  font-size: 12px;
  outline: 0;
  box-sizing: content-box;
}

.logo-input .logo-input-container .search-bar .search-container .i-search {
  display: inline-block;
  width: 20px;
  height: 20px;
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 20px;
  color: #ccc;
}

.search-box {
  margin: auto auto;
}

.logo-input
  .logo-input-container
  .search-bar
  .search-container
  .search-bnt-panel {
  display: inline-block;
  position: relative;
  left: -2px;
  width: 250px;
}

.logo-input .logo-input-container .search-bar .search-container span {
  float: left;
}

.logo-input
  .logo-input-container
  .search-bar
  .search-container
  .search-bnt-panel
  .search-btn {
  display: inline-block;
  padding: 10px;
  height: 16px;
  line-height: 16px;
  width: 100px;
  background-color: #f63;
  cursor: pointer;
  text-align: center;
  color: #fff;
  font-size: 16px;
}
.logo-input a {
  text-decoration: none;
}

.top-nav .top-nav-container .group .seprate {
  float: left;
  line-height: 35px;
  color: #c7c7c7;
}
</style>
