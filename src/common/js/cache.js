// 引用一个storage插件
import storage from 'good-storage'
// 定义一个storage中的key,_search_项目内部写法
const SEARCH_KEY = '_search_'
// 定义一个最大存储空间
const SEARCH_MAX_LENGTH = 15
// storage存储方法
const PLAY_KEY = '_play_'
const PLAY_MAX_LENGTH = 200
// 收藏歌曲的本地存储方法
const FAVORITE_KEY = '_favorite_'
const FAVORITE_KEY_LENGTH = 200
// 插入方法, arr:数组，val:插入值，compare：比较函数，maxlen:最大长度
function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    // 删除
    arr.splice(index, 1)
  }
  // 向数组第一位插入，并返回数组长度
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    // 删除并返回最后一个数组元素
    arr.pop()
  }
}
// 设计一个能保存到localstorage方法
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}
// 获取本地存储
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}
// 从数组和本地中删除方法
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
// 删除历史记录
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  // 保存数组到本地并返回
  storage.set(SEARCH_KEY, searches)
  return searches
}
// 清除所有数据
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}
// 存储播放历史的方法，写
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH)
  // 缓存到本地
  storage.set(PLAY_KEY, songs)
  return songs
}
// 读取歌曲历史信息
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}
// 喜欢歌曲保存方法
export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_KEY_LENGTH)
  storage.set(FAVORITE_KEY, songs)
  return songs
}
// 删除不喜欢歌曲
export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return song.id === item.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}
// 初始化的时候加载
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
