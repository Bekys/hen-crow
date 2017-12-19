import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite} from 'common/js/cache'

// actions就是对mnutation做封装
function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
// 全部随机播放模式
export const randomPlay = function({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
// 插入歌曲commit是提交state用来修改playlist,currentindex,sequencelist进行操作
export const insertSong = function({commit, state}, song) {
  // 复制state的playlist对其进行修改最后提交给mutation-types
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  // 查找当前列表中是否有待插入的歌曲并返回其索引
  let currentSong = playlist[currentIndex]
  // 查找列表中是否有此歌曲
  let fpIndx = findIndex(playlist, song)
  // 因为是插入歌曲，所以索引+1
  currentIndex++
  // splice currentIndex:插入位置 0：删除0各元素 song:插入元素
  // 插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)
  // 如果已经包含了这首歌
  if (fpIndx > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndx) {
      playlist.splice(fpIndx, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndx + 1, 1)
    }
  }
  // 修改sequenceList
  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  let fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
// 保存历史记录,saveSearch(query)调用数据保存方法并返回一个新的数组递给SET_SEARCH_HISTORY
export const saveSearchHistory = function({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}
// 删除一个搜索历史
export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}
// 删除全部历史数据
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
// 从歌曲列表中删除歌曲
export const deleteSong = function ({commit, state}, song) {
  // 先通过state获取列表信息，再对其进行修改，提交给mutation-types
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 找到索引，然后删除
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  // 删除元素后列表长度发生变化在当前播放歌曲之前删除，当前歌曲索引-1
  // currentIndex === playlist.length 删除最后一首歌
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }
  // 提交修改后信息
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  // 如果列表删空了
  const playingState = playlist.length > 0
  commit(types.SET_PLAYING_STATE, playingState)
}
// 清空列表所有歌曲
export const deleteSongList = function ({commit}) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}
// 保存歌曲播放历史信息的方法
export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}
// 点击收藏
export const saveFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}
// 点击取消收藏
export const deleteFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}
