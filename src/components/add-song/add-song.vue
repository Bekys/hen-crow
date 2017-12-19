// addSong模块
// @click.stop禁止子组件的点击事件冒泡到父元素中
<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box ref="searchBox" @query="onQueryChange" placeholder="搜索歌曲"></search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
        <div class="list-wrapper">
          <scroll class="list-scroll" ref="songList" v-if="currentIndex===0" :data="playHistory" :refreshDelay="refreshDelay">
            <div class="list-inner">
              <song-list :songs="playHistory" @select="selectSong"></song-list>
            </div>
          </scroll>
          <scroll class="list-scroll" ref="searchList" v-if="currentIndex===1":data="searchHistory">
            <div class="list-inner">
              <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest :query="query" :showSinger="showSinger" @select="selectSuggest" @listScroll="blurInput"></suggest>
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌曲已经添加到播放队列</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  // 引入搜索框组件
  import SearchBox from 'base/search-box/search-box'
  // 引入搜索列表组件
  import Suggest from 'components/suggest/suggest'
  import {searchMixin} from 'common/js/mixin'
  import Switches from 'base/switches/switches'
  import Scroll from 'base/scroll/scroll'
  import {mapGetters, mapActions} from 'vuex'
  import SongList from 'base/song-list/song-list'
  import Song from 'common/js/song'
  import SearchList from 'base/search-list/search-list'
  import TopTip from 'base/top-tip/top-tip'
  export default {
    mixins: [searchMixin],
    data() {
      // showSinger: false 是否搜索歌手
      return {
        showFlag: false,
        // 提取到mixin
        // query: '',
        showSinger: false,
        currentIndex: 0,
        switches: [
          {name: '最近播放'},
          {name: '最近搜索'}
        ]
      }
    },
    computed: {
      ...mapGetters([
        'playHistory'
      ])
    },
    methods: {
      // 监听Songlist列表选歌函数
      selectSong(song, index) {
        if (index !== 0) {
          // 此处song是从缓存中读取出来的，不是对象需要实例化也就是new
          this.insertSong(new Song(song))
          this.$refs.topTip.show()
        }
      },
      // 将索引付给currentIndex并传给子组件
      switchItem(index) {
        this.currentIndex = index
      },
      // 选择搜索列表中歌曲
      selectSuggest() {
        // 调用mixin中公用方法，保存搜索历史到历史记录
        this.saveSearch()
        this.$refs.topTip.show()
      },
      // 提取到mixin
      // // 由search-box发送的query事件，定义方法search
      // search(query) {
      //   // 接收传递过来的query,由query控制模块search-result、shortcut显示隐藏
      //   this.query = query
      // },
      show() {
        this.showFlag = true
        // 点开页面时刷新页面，这样scroll重新计算，可以滚动
        setTimeout(() => {
          if (this.currentIndex === 0) {
            this.$refs.songList.refresh()
          } else {
            this.$refs.searchList.refresh()
          }
        }, 20)
      },
      hide() {
        this.showFlag = false
      },
      ...mapActions([
        'insertSong'
      ])
    },
    components: {
      SearchBox,
      Suggest,
      Switches,
      Scroll,
      SongList,
      SearchList,
      TopTip
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>
