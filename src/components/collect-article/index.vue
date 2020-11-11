<template>
  <van-icon
    :class="{ collected: value }"
    :name="value ? 'star' : 'star-o'"
    @click="onCollect"
    :loading="loading"
  ></van-icon>
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'collectArticle',
  // model:{
  // },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Object, Number, String],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect() {
      // 开始请求
      this.loading = true
      try {
        // 是否收藏
        if (this.value) {
          // 父组件 传递articleId
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        // 更新视图
        this.$emit('input', !this.value)
        this.$toast.success(this.value ? '取消收藏' : '收藏成功')
      } catch (err) {
        this.$toast('操作失败，请重试')
      }
      // 请求结束
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.collected {
  color: #ffa500 !important;
}
</style>
