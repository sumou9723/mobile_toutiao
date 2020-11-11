<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button
        class="van_btn"
        size="mini"
        round
        type="danger"
        plain
        @click="ChangeEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(channelItem, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channelItem, index)"
      >
        <span class="text" :class="{ active: active === index }" slot="text"
          >{{ channelItem.name }}
        </span>
        <van-icon
          v-show="isEdit && !fiexdChannels.includes(channelItem.id)"
          name="close"
          slot="icon"
        />
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(channle, index) in recommendChannels"
        :key="index"
        icon="plus"
        @click="onAddChannle(channle)"
      >
        <span slot="text" class="text">{{ channle.name }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/article'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
      fiexdChannels: [0] // 固定频道，不允许删除
    }
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
        // console.log(this.recommendChannels)
      } catch (err) {
        this.$toast('请求数据失败，请刷新重试')
      }
    },
    async onAddChannle(channle) {
      this.myChannels.push(channle)
      if (this.user) {
        // 已登录
        try {
          await addUserChannel({
            id: channle.id,
            seq: this.myChannels.length
          })
          this.$toast('添加成功')
        } catch (err) {
          this.$toast('添加失败')
          console.log(err)
        }
      } else {
        // 未登陆
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    ChangeEdit() {
      this.isEdit = !this.isEdit
    },
    onMyChannelClick(channelItem, index) {
      if (this.isEdit) {
        // 执行删除操作
        if (index === 0) return
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.myChannels.splice(index, 1)
        this.deleteChannel(channelItem)
      } else {
        // 执行跳转操作
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel(channel) {
      try {
        if (this.user) {
          // 已登录，将数据存储到线上
          await deleteUserChannel(channel.id)
        } else {
          // 未登录，将数据存储到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        // console.log(err)
        this.$toast('删除频道失败，请稍后重试')
      }
    }
  },
  created() {
    this.loadAllChannels()
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((channle) => {
        const lastChannel = this.myChannels.find((myChannle) => {
          return myChannle.id === channle.id
        })
        return !lastChannel
      })
    },
    // 获取user
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  .channel-item {
    height: 86px;
    width: 90px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 28px;
        white-space: nowrap;
      }

      .active {
        color: red;
      }
    }
    /deep/ .van-icon-close {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 36px;
      color: #ccc;
    }
    /deep/ .van-grid-item__icon-wrapper {
      position: unset;
    }
  }
  /deep/ .van_btn {
    width: 100px !important;
  }
  /deep/ .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      color: #222;
      .van-icon {
        font-size: 24px;
      }

      .van-grid-item__text {
        font-size: 28px;
        margin-top: 0;
      }
    }
  }
}
</style>
