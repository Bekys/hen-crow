// 搜索主页面
<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" ref="shortcutWrapper" v-show="!query">
      <scroll class="shortcut" ref="shortcut" :data="shortcut" :refreshDelay="refreshDelay">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" class="item" v-for="item in hotKey">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list@select="addQuery" @delete="deleteSearchHistory" :searches="searchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" ref="searchResult" v-show="query">
      <suggest ref="suggest" @select="saveSearch" @listScroll="blurInput" :query="query"></suggest>
    </div>
    <confirm @confirm="clearSearchHistory" ref="confirm" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  // 引入搜索框模块
  import searchBox from 'base/search-box/search-box'
  // 引入搜索热词请求方法
  import {getHotKey} from 'api/search'
  import {ERR_OK} from 'api/config'
  // 引入搜索列表模块
  import Suggest from 'components/suggest/suggest'
  // 进入搜索历史列表
  import SearchList from 'base/search-list/search-list'
  // 引用弹窗组件
  import Confirm from 'base/confirm/confirm'
  // 引入滚动组件
  import Scroll from 'base/scroll/scroll'
  // 引入mixin中playlistMixin
  import {playlistMixin, searchMixin} from 'common/js/mixin'
  import {mapActions} from 'vuex'
  export default {
    // 将playlistMixin传入mixins组件中
    mixins: [playlistMixin, searchMixin],
    data() {
      return {
        // 创建hotkey数组用来接收获取的数据
        hotKey: []
        // 提取到了mixin
        // 创建query用来接收子组件传来的数据
        // query: ''
      }
    },
    computed: {
      // 通过计算属性来计算hotKey和searchHistory总高度,然后通过绑定事件:data传递给子组件scroll
      shortcut() {
        return this.hotKey.concat(this.searchHistory)
      }
      // 提取到了mixin
      // ...mapGetters([
      //   'searchHistory'
      // ])
    },
    created() {
      // 调用_getHotKey()
      this._getHotKey()
    },
    methods: {
      // 使用handlePlaylist处理有mini播放时列表滚动
      handlePlaylist(playlist) {
        // 根据playlist长度来确定距离底边的高度bottom
        const bottom = playlist.length > 0 ? '60px' : ''
        // 设置历史记录列表距离底边的高度
        this.$refs.searchResult.style.bottom = bottom
        // 调用suggest中的refresh方法刷新scroll
        this.$refs.suggest.refresh()
        // 设置搜索列表距离底边的高度，并手动刷新scroll
        this.$refs.shortcutWrapper.style.bottom = bottom
        this.$refs.shortcut.refresh()
      },
      // 控制清空历史记录方法
      showConfirm() {
        // 调用子组件中的show()方法调用弹框
        this.$refs.confirm.show()
      },
      // 提取到mixin
      // // 通过子组件suggest发送过来的@select事件，定义saveSearch方法，保存历史信息
      // saveSearch() {
      //   // 通过mapActions调用saveSearchHistory()来对state进行修改，完成存储
      //   this.saveSearchHistory(this.query)
      // },
      // // 将search-box中的input给blur(失去焦点事件)，隐藏输入框
      // blurInput() {
      //   // 父组件通过$refs调用子组件searchBox的blur()方法
      //   this.$refs.searchBox.blur()
      // },
      // // 用来监听子组件search-box传来的query并赋值给当前query
      // onQueryChange(query) {
      //   this.query = query
      // },
      // addQuery(query) {
      //   // 点击热门词汇将绑定的query通过($refs.searchBox)调用子组件的setQuery(query)方法将数据传递子组件
      //   this.$refs.searchBox.setQuery(query)
      // },
      _getHotKey() {
        // 调用getHotKey()发送请求,并将获取的数据存储到hotKey数组中
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            this.hotKey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      // 删除所有数据clearSearchHistory 从历史记录中删除deleteSearchHistory
      ...mapActions([
        // 提取到mixin
        // 'saveSearchHistory',
        // 'deleteSearchHistory',
        'clearSearchHistory'
      ])
    },
    watch: {
      // 监听query变化,当没有值变化时手动刷新scroll组件
      query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    },
    components: {
      searchBox,
      Suggest,
      SearchList,
      Confirm,
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
