// 搜索框模块
<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" class="box" v-model="query" :placeholder="placeholder"/>
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>
<script type="text/ecmascript-6">
  // 调用延迟函数
  import {debounce} from 'common/js/util'
  export default {
    // props用于接收来自父组件的数据
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data() {
      return {
        // 通过v-model实现双向绑定
        query: ''
      }
    },
    methods: {
      // 失去焦点事件
      blur() {
        // input失去焦点事件
        this.$refs.query.blur()
      },
      clear() {
        // 清空搜索框
        this.query = ''
      },
      setQuery(query) {
        // 将热门词汇通过setQuery方法传递给query
        this.query = query
      }
    },

    created() {
      // 监听query变化并返回值 debounce()延迟函数(newQuery) => {}：回调函数
      // newQuery是回调函数返回值 $emit:将newQuery用query方法派发出去
      // 通过v-model实现数据的双向绑定当watch监听到query变化时(传递给newQuery)并会派发一个query事件到search模板中
      // (@query="onQueryChange")通过@query事件来接收数据快递并定义事件名为onQueryChange
      // onQueryChange(query) { this.query = query }
      // data() {return {query：''}
      //  在earch模板中的methods：中定义onQueryChange方法并用参数query来接收newQuery传递过来的值并复制给data中的query，从而完成子到父的数据传递
      // <suggest :query="query"></suggest>
      // 将data中定义的query(类型是function)通过数据绑定形式：query传递给子组件
      // props: { query: ''}
      // 子组件通过props来接收父组件传过来的query，从而完成父到子的数据传递
      // watch: {query() {this.search()}}
      // 在sugge组建中调用watch方法来监听query变化并发送请求，完成时时的数据请求
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 300))
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>
