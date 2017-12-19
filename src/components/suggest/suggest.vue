// 模糊搜索列表模块
// :data="result"为了时时刷新将数据传入
// :pullup="pullup"将pullup传给scroll
// @scrollToEnd监听scroll中派发的scrollToEnd事件，并触发searchMore事件
<template>
  <scroll ref="suggest"
          class="suggest"
          :data="result"
          :pullup="pullup"
          @scrollToEnd="searchMore"
          :beforeScroll="beforeScroll"
          @beforeScroll="listScroll"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" titile=""></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>
<script type="text/ecmascript-6">
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import Singer from 'common/js/singer'
  import {mapMutations, mapActions} from 'vuex'
  import NoResult from 'base/no-result/no-result'
  const TYPE_SINGER = 'singer'
  const perpage = 20
  export default {
    props: {
      // 接收外部的检索词query
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        // 请求页数
        page: 1,
        // 用于存储接收数据
        result: [],
        // 设置下拉刷新为true
        pullup: true,
        // 是否有更多数据
        hasMore: true,
        // 是否滑动
        beforeScroll: true
      }
    },
    methods: {
      // scroll刷新代理,调用scroll的refresh方法传给suggest，父组件search就可以调用此方法刷新scroll
      refresh() {
        this.$refs.suggest.refresh()
      },
      // 监听@listScroll列表滑动事件触发listScroll()方法
      listScroll() {
        // 派发新的listScroll给父组件search
        this.$emit('listScroll')
      },
      // 点击列表中歌手或歌曲事件
      selectItem(item) {
        // 如果是歌手则跳转到歌手页面
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/search/${singer.id}`
          })
          // 调用setSinger方法传递singer给mutation
          this.setSinger(singer)
        } else {
          // 如果是歌曲，调用insertSong方法将歌曲传给actions
          this.insertSong(item)
        }
        // 当点击列表时发送给search一个select事件用于留下历史记录
        this.$emit('select')
      },
      // 根据type类型去判断返回歌手名还是歌曲名并显示到列表中
      getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      // 根据type类型去控制class类型，然后返回不同类型图标
      getIconCls(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      search() {
        // 第一次搜索设为true
        this.hasMore = true
        // 优化在输出的基础上再次输入情况
        this.page = 1
        this.$refs.suggest.scrollTo(0, 0)
        // 调用模块search中search方法请求数据
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            // 将数据存储到result数组中
            this.result = this._genResult(res.data)
            // 调用_checkMore方法检查原数据是否有多余的，可通过console.log(res.data)查看curnum*curpage与totalnum值的大小
            this._checkMore(res.data)
          }
        })
      },
      // 搜索更多事件
      searchMore() {
        if (!this.hasMore) {
          return
        }
        this.page++
        // 再次请求搜索
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            // 将请求的数据拼接到原数组中
            this.result = this.result.concat(this._genResult(res.data))
            this._checkMore(res.data)
          }
        })
      },
      // 检查更多方法
      _checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
          this.hasMore = false
        }
      },
      // 处理数据
      _genResult(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSong(data.song.list))
        }
        return ret
      },
      // 处理数据
      _normalizeSong(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      // setSinger: 'SET_SINGER'将歌手数据提交给mutatuin
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      // 'insertSong':监听actions中insertSong方法,然后actions将数据提交给mutation-types
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
      // 监听query变化,并调用搜索函数
      query() {
        this.search()
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
