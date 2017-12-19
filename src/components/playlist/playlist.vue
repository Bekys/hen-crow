// 播放列表模块
// transition是 特效组件 name动画名称 tag="ul"渲染成ul transition-group的子元素需要一个key
<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
        <scroll class="list-content" :refreshDelay="refreshDelay" ref="listContent" :data="sequenceList">
          <transition-group name="list" tag="ul">
            <li class="item" :key="item.id" ref="listItem" v-for="(item,index) in sequenceList" @click="selectItem(item,index)">
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span class="like" @click.stop="toggleFavorite(item)">
                <i :class="getFavoriteIcon(item)"></i>
              </span>
              <span class="delete" @click.stop="deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add" @click="addSong">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></confirm>
      <add-song ref="addSong"></add-song>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import {mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import Scroll from 'base/scroll/scroll'
// 引入confirm组件，当点击清空列表时，进行弹框提示
import Confirm from 'base/confirm/confirm'
// 进入player模块公用部分
import {playerMixin} from 'common/js/mixin'
import AddSong from 'components/add-song/add-song'
export default {
  mixins: [playerMixin],
  data() {
    return {
      showFlag: false,
      refreshDelay: 100
    }
  },
  computed: {
    // 播放模式后面文案
    modeText() {
      return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
    }
    // 引入'mode'：播放模式，歌曲信息都用vuex来管理，因为多出用到，通过mapGetters调用即可
    // 已提取到mixin
    // ...mapGetters([
    //   'sequenceList',
    //   'currentSong',
    //   'playlist',
    //   'mode'
    // ])
  },
  methods: {
    // 添加函数到队列方法
    addSong() {
      // 调用子组件show()
      this.$refs.addSong.show()
    },
    // 由confirm组件发射出来的confirm事件的confirmClear方法，由它确认删除所有
    confirmClear() {
      // 调用清空action
      this.deleteSongList()
      this.hide()
    },
    // 点击清空按钮时调用confirm弹框
    showConfirm() {
      this.$refs.confirm.show()
    },
    // 从列表中删除歌曲,通过改变actions来改变列表信息
    deleteOne(item) {
      this.deleteSong(item)
      // 当列表为空时，隐藏
      if (!this.playlist.length) {
        this.hide()
      }
    },
    // 播放歌曲滚动到头部
    scrollToCurrent(current) {
      const index = this.sequenceList.findIndex((song) => {
        return current.id === song.id
      })
      // 调用scroll组件中的scrollToElement方法,滚动到第几个li，this.$refs.listItem[index]：找到第几个li
      this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300)
    },
    // 点击歌曲实现歌曲播放，并指定当前正在播放歌曲样式
    selectItem(item, index) {
      // index = this.playlist.findIndex((song) => {return song.id === item.id}) findIndex括号中传递的是个回调函数当song.的id=item.id时返回这首歌的索引,song就是对playlist中的每个歌曲进行遍历找到与item相同的id并返回
      if (this.mode === playMode.random) {
        index = this.playlist.findIndex((song) => {
          return song.id === item.id
        })
      }
      this.setCurrentIndex(index)
      this.setPlayingState(true)
    },
    // 绑定当前播放歌曲样式方法
    getCurrentIcon(item) {
      if (this.currentSong.id === item.id) {
        return 'icon-play'
      }
      return ''
    },
    show() {
      this.showFlag = true
      setTimeout(() => {
        this.$refs.listContent.refresh()
        // 列表显示时也要调用scrollToCurrent
        this.scrollToCurrent(this.currentSong)
      }, 20)
    },
    hide() {
      this.showFlag = false
    },
    // 已提取到mixin
    // ...mapMutations({
    //   setCurrentIndex: 'SET_CURRENT_INDEX',
    //   setPlayingState: 'SET_PLAYING_STATE'
    // }),
    ...mapActions([
      'deleteSong',
      'deleteSongList'
    ])
  },
  watch: {
    // 监听currentSong
    currentSong(newSong, oldSong) {
      // 如果不显示或者新老歌曲id一样直接返回
      if (!this.showFlag || newSong.id === oldSong.id) {
        return
      }
      // 调用scrollToCurrent，滚动
      this.scrollToCurrent(newSong)
    }
  },
  components: {
    Scroll,
    Confirm,
    AddSong
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: 20px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>
