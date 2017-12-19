// 组件中公用的部分放到mixin中
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}
// 播放列表中的播放模式与歌手列表中的播放模式有相同部分
export const playerMixin = {
  computed: {
    // 共享播放模式
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'playlist',
      'mode',
      'favoriteList'
    ])

  },
  methods: {
    // 切换收藏样式方法
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    // 切换收藏方法
    toggleFavorite(song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song)
      } else {
        this.saveFavoriteList(song)
      }
    },
    // 是否为收藏歌曲
    isFavorite(song) {
      const index = this.favoriteList.findIndex((item) => {
        return item.id === song.id
      })
      return index > -1
    },
    // 共享点击事件
    resetCurrentIndex(list, song) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    // 点击播放模式事件
    changeMode() {
      // 修改播放模式
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    }),
    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList'
    ])
  }
}
// 共享搜索模块相关代码search与add-song
export const searchMixin = {
  data() {
    return {
      query: '',
      refreshDelay: 100
    }
  },
  computed: {
    // 公用搜索历史模块
    ...mapGetters([
      'searchHistory'
    ])
  },
  // 公用一些方法
  methods: {
    // 通过子组件suggest发送过来的@select事件，定义saveSearch方法，保存历史信息
    saveSearch() {
      // 通过mapActions调用saveSearchHistory()来对state进行修改，完成存储
      this.saveSearchHistory(this.query)
    },
    // 将search-box中的input给blur(失去焦点事件)，隐藏输入框
    blurInput() {
      // 父组件通过$refs调用子组件searchBox的blur()方法
      this.$refs.searchBox.blur()
    },
    // 用来监听子组件search-box传来的query并赋值给当前query
    onQueryChange(query) {
      this.query = query
    },
    addQuery(query) {
      // 点击热门词汇将绑定的query通过($refs.searchBox)调用子组件的setQuery(query)方法将数据传递子组件
      this.$refs.searchBox.setQuery(query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
