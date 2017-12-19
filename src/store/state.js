import {playMode} from 'common/js/config'
// 读取本地存储
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}
export default state
// 组件中需要多出公用的组件放到vuex中
// searchHistory搜索历史
