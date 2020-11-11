<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar
      class="reply-bar"
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('reply-cross')" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <article-item :comment="comment" />
      <!-- /当前评论项 -->

      <!-- 评论的回复列表 -->
      <van-cell title="全部回复" />
      <comment-list :list="commentList" :source="comment.com_id" type="c" />
      <!-- /评论的回复列表 -->
    </div>
    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部区域 -->
    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">123 </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import articleItem from './article-item'
import CommentList from './article-commit'
export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      require: true
    }
  },
  components: {
    articleItem,
    CommentList
  },
  data() {
    return {
      commentList: [],
      isPostShow: false
    }
  },
  methods: {
    onPostSuccess() {
      // 更新回复的数量
      this.comment.reply_count++

      // 关闭弹层
      this.isPostShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.comment-reply {
  z-index: 3 !important;
}
.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
