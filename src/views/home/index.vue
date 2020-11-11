<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        icon="search"
        class="search-btn"
        type="info"
        round
        to="/search"
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- tabs -->
    <van-tabs v-model="active" swipeable animated>
      <van-tab
        :key="index"
        v-for="(item, index) in channelList"
        :title="item.name"
      >
        <article-list :channel="item"></article-list>
      </van-tab>

      <!-- 占位置 -->
      <div slot="nav-right" class="zhanwei"></div>
      <div @click="handlePop" slot="nav-right" class="hamburger-btn">
        <i class="news news-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      class="edit-channel-popup"
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
    >
      <channel-edit
        @update-active="onUpdateActive"
        :active="active"
        :myChannels="channelList"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'

export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      active: 0,
      channelList: [],
      isChannelEditShow: false
    }
  },
  methods: {
    async getChannels() {
      try {
        // const res = await getUserChannels()
        // this.channelList = res.data.data.channels
        // console.log(this.channelList)
        let channels = []
        if (this.user) {
          // 已登录，请求获取线上的频道数据
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            // 有本地频道数据，则使用
            channels = localChannels
          } else {
            // 没有本地频道数据，则请求获取默认推荐的频道列表
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }

        // 将数据更新到组件中
        this.channelList = channels
      } catch (err) {
        // console.log(err)
        this.$toast('数据获取失败')
      }
    },
    handlePop() {
      this.isChannelEditShow = true
    },
    onUpdateActive(index, isChannelEditShow) {
      this.active = index
      this.isChannelEditShow = isChannelEditShow
    }
  },
  created() {
    this.getChannels()
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;
    margin-top: 10px;
  }
  /deep/ .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon-search {
      font-size: 36px;
      color: white;
    }
  }

  /deep/.van-tabs__nav {
    padding-bottom: none;
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;

      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }
    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      // bottom: 8px;
    }
  }
  /deep/ .zhanwei {
    // display: block;
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    .news {
      font-size: 33px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 2px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 2;
    width: 100%;
  }
  .edit-channel-popup {
    padding-top: 100px;
    box-sizing: border-box;
  }
}
</style>
