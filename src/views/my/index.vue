<template>
  <div class="my-container">
    <!-- 已经登录的 -->
    <div v-if="user" class="header userInfo">
      <!-- 基本信息 -->
      <div class="base">
        <div class="left">
          <van-image fit="cover" :src="users.photo" class="avatar" round />
          <span class="name">{{ users.name }}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <!-- 粉丝、关注 -->
      <div class="data">
        <div class="data-item">
          <span>{{ users.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{ users.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{ users.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{ users.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登陆的 -->
    <div v-else class="header login_off">
      <div class="zhuce">
        <img
          class="mobile-img"
          src="~@/assets/mobile.png"
          @click="$router.push('/login')"
        />
        <span class="text" @click="$router.push('/login')">登录 / 注册</span>
      </div>
    </div>

    <!-- 宫格 -->
    <van-grid :column-num="2" clickable>
      <van-grid-item text="收藏">
        <i slot="icon" class="news news-shoucang"></i>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item text="历史">
        <i slot="icon" class="news news-lishi"></i>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 下面的cell -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      v-if="user"
      @click="LoginOut"
      class="logout-cell"
      title="退出登录"
    />
    <!-- 退出提示框 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserList } from '@/api/user'
export default {
  data() {
    return {
      users: {}
    }
  },
  methods: {
    // 退出
    LoginOut() {
      this.$dialog
        .confirm({
          title: '确认退出吗？'
        })
        .then(() => {
          this.$store.commit('setUser', null)
        })
    },
    //  获取用户信息
    async userList() {
      try {
        const res = await getUserList()
        console.log(res)
        this.users = res.data.data
      } catch (err) {
        this.$toast('获取用户信息失败')
      }
    }
  },
  created() {
    if (this.user) {
      this.userList()
    }
    // console.log(...mapState(['user']))
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .login_off {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /deep/ .header {
    width: 100%;
    height: 361px;
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
    .zhuce {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        color: white;
        font-size: 30px !important;
      }
    }
  }
  // 已经登陆的背景设置
  .userInfo {
    .base {
      width: 100%;
      height: 231px;
      padding: 76px 32px 23px;
      // background: #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
        }
        .name {
          font-size: 29px;
          margin-left: 22px;
        }
      }
      .van-button--default {
        width: 150px;
      }
    }
    .data {
      display: flex;
      justify-content: space-around;
      .data-item {
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;
        span:nth-child(1) {
          font-size: 36px;
          margin-bottom: 15px;
        }
        span:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
  // 宫格
  /deep/ .van-grid {
    background: #fff;
    .news {
      font-size: 45px;
    }
    .news-shoucang {
      color: #eb5253 !important;
    }
    .news-lishi {
      color: #ff9d1d;
    }
    .text {
      color: #000;
      margin-top: 8px;
      font-size: 28px;
    }
  }
  .logout-cell {
    margin-top: 15px;
    text-align: center;
    color: #eb5253;
  }
}
</style>
