<template>
  <van-button
    v-if="value"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    :loading="isFollowLoading"
    >已关注</van-button
  >
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    v-else
    @click="onFollow"
    :loading="isFollowLoading"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'FollowUser',
  data() {
    return {
      isFollowLoading: false
    }
  },
  //   model: {
  //     prop: 'value', // 默认是 value
  //     event: 'update-is_followed' // 默认是 input
  //   },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  created() {
    this.onFollow()
  },
  methods: {
    async onFollow() {
      this.isFollowLoading = true
      try {
        // 是ture 点击取消关注
        const authoeId = this.userId
        if (this.value) {
          await deleteFollow(authoeId)
        } else {
          // 点击关注
          await addFollow(authoeId)
        }
        // 更新视图
        // this.value = !this.value
        this.$emit('input', !this.value)
      } catch (err) {
        console.log(err)
        let message = '操作失败，请重试！'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己！'
        }
        this.$toast(message)
      }
      this.isFollowLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
