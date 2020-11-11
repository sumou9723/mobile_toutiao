<template>
  <div class="search-container">
    <form action="/" class="search">
      <van-search
        background="#3296fa"
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
      <search-result v-if="isResultShow" :searchText="searchText" />
      <search-suggestion
        @search="searchRes"
        :searchText="searchText"
        v-else-if="searchText"
      />
      <search-history
        @clear-search-history="clearSearch"
        :searchHistories="searchHistories"
        @search="searchRes"
        v-else
      />
    </form>
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('serach-histories') || []
    }
  },
  methods: {
    onSearch(val) {
      this.searchText = val
      // this.searchHistories = val
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // console.log(this.searchHistories)
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    },
    searchRes(value) {
      // console.log(value)
      this.searchText = value
      this.isResultShow = true
    },
    clearSearch() {
      this.searchHistories = []
    },
    searchResultText(item) {
      console.log(item)
      this.searchText = item
      this.$router.push('/article')
    }
  },
  watch: {
    searchHistories(val) {
      // 同步到本地存储
      setItem('serach-histories', val)
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  /deep/ .search {
    padding-top: 106px;
    .van-search {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
    }
    .van-search__action {
      color: #fff;
    }
  }
}
</style>
