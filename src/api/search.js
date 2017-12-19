import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
// 获取搜索热门词汇
export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({}, commonParams, {
    plateform: 'h5',
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
// 获取搜索列表
export function search(query, page, zhida, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    perpage,
    n: perpage,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uid: 0,
    needNewCode: 1,
    plateform: 'h5'
  })
  return jsonp(url, data, options)
}
