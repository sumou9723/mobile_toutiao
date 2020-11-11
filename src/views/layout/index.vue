<template >
  <div class="layout-container">
    <router-view />
    <!-- 下面的菜单 -->
    <van-tabbar class="layout-tabbar" v-model="active" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="news news-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="news news-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="news news-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="news news-wode"></i>
        <span class="text">{{ flag ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { getItem } from '@/utils/storage.js'
export default {
  data() {
    return {
      active: 0,
      flag: false
    }
  },
  methods: {
    my() {
      const myy = getItem('TOUTIAO_USER')
      if (myy) {
        this.flag = true
      } else {
        this.flag = false
      }
    }
  },
  created() {
    this.my()
  }
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    .news {
      font-size: 40px;
    }
    .text {
      font-size: 20px;
    }
  }
}
</style>
