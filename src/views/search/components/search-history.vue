<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <template v-if="isDeleteShow">
        <span @click="$emit('clear-search-history')">全部删除 </span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false"> 完成</span>
      </template>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="onHistoryClick(item, index)"
    >
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onHistoryClick(item, value) {
      // 如果是删除状态，则执行删除操作
      if (this.isDeleteShow) {
        this.searchHistories.splice(value, 1)
      } else {
        // 否则执行搜索操作
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
