<template>
  <van-icon
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="onLike"
    :class="{ liked: value === 1 }"
    @loading="loading"
  />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name: 'LikeArticle',
  data() {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Number,
      require: true
    },
    articleId: {
      type: [Number, String, Object],
      require: true
    }
  },
  created() {
    this.onLike()
  },
  methods: {
    async onLike() {
      this.loading = true
      let status = -1
      try {
        if (this.value === 1) {
          // 说明需要取消点赞
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
          status = 1
        }
      } catch (err) {
        console.log(err)
      }
      // 更新视图
      this.$emit('input', status)
      this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.liked {
  color: #e5645f !important;
}
</style>
