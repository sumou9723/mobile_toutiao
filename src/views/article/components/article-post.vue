<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="inputComment"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button class="post-btn" @click="onAddComment">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'ArticlePost',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      require: true
    }
  },
  data() {
    return {
      inputComment: ''
    }
  },
  methods: {
    async onAddComment() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
      })
      const inputComment = this.inputComment.trim()
      if (!inputComment.length) {
        return
      }
      try {
        const { data } = await addComment({
          target: this.target,
          content: inputComment,
          art_id: null
        })
        console.log(data.data)
        this.inputComment = ''
        this.$emit('post-success', data.data)
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
