webpackJsonp([5],{BRgg:function(n,t,i){"use strict";t.b=function(){var n=o()({},s.b,{uin:0,needNewCode:1,platform:"h5"});return Object(a.a)("https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg",n,s.c)},t.a=function(n){var t=o()({},s.b,{topid:n,page:"detail",type:"top",tpl:3,platform:"h5",needNewCode:1});return Object(a.a)("https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg",t,s.c)};var e=i("woOf"),o=i.n(e),a=i("Gak4"),s=i("T452")},Kjo5:function(n,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=i("Dd8w"),o=i.n(e),a=i("BRgg"),s=i("T452"),A=i("qwAB"),c=i("y/jF"),l=i("F4+m"),r=i("NYxO"),p={mixins:[l.b],created:function(){this._getTopList()},data:function(){return{topList:[]}},methods:o()({handlePlaylist:function(n){var t=n.length?"60px":"";this.$refs.rank.style.bottom=t,this.$refs.toplist.refresh()},selectItem:function(n){this.$router.push({path:"/rank/"+n.id}),this.setTopList(n)},_getTopList:function(){var n=this;Object(a.b)().then(function(t){t.code===s.a&&(n.topList=t.data.topList)})}},Object(r.d)({setTopList:"SET_TOP_LIST"})),watch:{topList:function(){var n=this;setTimeout(function(){n.$Lazyload.lazyLoadHandler()},20)}},components:{Scroll:A.a,Loading:c.a}},d={render:function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("div",{ref:"rank",staticClass:"rank"},[i("scroll",{ref:"toplist",staticClass:"toplist",attrs:{data:n.topList}},[i("ul",n._l(n.topList,function(t){return i("li",{staticClass:"item",on:{click:function(i){n.selectItem(t)}}},[i("div",{staticClass:"icon"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.picUrl,expression:"item.picUrl"}],attrs:{width:"100",height:"100"}})]),n._v(" "),i("ul",{staticClass:"songlist"},n._l(t.songList,function(t,e){return i("li",{staticClass:"song"},[i("span",[n._v(n._s(e+1))]),n._v(" "),i("span",[n._v(n._s(t.songname)+"-"+n._s(t.singername))])])}))])})),n._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!n.topList.length,expression:"!topList.length"}],staticClass:"loading-container"},[i("loading")],1)]),n._v(" "),i("router-view")],1)},staticRenderFns:[]},B=i("VU/8")(p,d,!1,function(n){i("fvUl")},"data-v-3a753c4c",null);t.default=B.exports},fvUl:function(n,t,i){var e=i("snh4");"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);i("rjj0")("908fc3c6",e,!0)},snh4:function(n,t,i){(n.exports=i("FZ+f")(!0)).push([n.i,"\n.rank[data-v-3a753c4c] {\n  position: fixed;\n  width: 100%;\n  top: 88px;\n  bottom: 0;\n}\n.rank .toplist[data-v-3a753c4c] {\n  height: 100%;\n  overflow: hidden;\n}\n.rank .toplist .item[data-v-3a753c4c] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin: 0 20px;\n  padding-top: 20px;\n  height: 100px;\n}\n.rank .toplist .item[data-v-3a753c4c]:last-child {\n  padding-bottom: 20px;\n}\n.rank .toplist .item .icon[data-v-3a753c4c] {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 100px;\n          flex: 0 0 100px;\n  width: 100px;\n  height: 100px;\n}\n.rank .toplist .item .songlist[data-v-3a753c4c] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 0 20px;\n  height: 100px;\n  overflow: hidden;\n  background: #333;\n  color: rgba(255,255,255,0.3);\n  font-size: 12px;\n}\n.rank .toplist .item .songlist .song[data-v-3a753c4c] {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  line-height: 26px;\n}\n.rank .toplist .loading-container[data-v-3a753c4c] {\n  position: absolute;\n  width: 100%;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}","",{version:3,sources:["E:/imooc/vue-music/src/components/rank/rank.vue"],names:[],mappings:";AACA;EACE,gBAAgB;EAChB,YAAY;EACZ,UAAU;EACV,UAAU;CACX;AACD;EACE,aAAa;EACb,iBAAiB;CAClB;AACD;EACE,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,eAAe;EACf,kBAAkB;EAClB,cAAc;CACf;AACD;EACE,qBAAqB;CACtB;AACD;EACE,oBAAoB;MAChB,oBAAoB;UAChB,gBAAgB;EACxB,aAAa;EACb,cAAc;CACf;AACD;EACE,oBAAoB;MAChB,YAAY;UACR,QAAQ;EAChB,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,6BAA6B;EAC7B,8BAA8B;MAC1B,2BAA2B;UACvB,uBAAuB;EAC/B,yBAAyB;MACrB,sBAAsB;UAClB,wBAAwB;EAChC,gBAAgB;EAChB,cAAc;EACd,iBAAiB;EACjB,iBAAiB;EACjB,6BAA6B;EAC7B,gBAAgB;CACjB;AACD;EACE,wBAAwB;EACxB,iBAAiB;EACjB,oBAAoB;EACpB,kBAAkB;CACnB;AACD;EACE,mBAAmB;EACnB,YAAY;EACZ,SAAS;EACT,oCAAoC;UAC5B,4BAA4B;CACrC",file:"rank.vue",sourcesContent:["\n.rank[data-v-3a753c4c] {\n  position: fixed;\n  width: 100%;\n  top: 88px;\n  bottom: 0;\n}\n.rank .toplist[data-v-3a753c4c] {\n  height: 100%;\n  overflow: hidden;\n}\n.rank .toplist .item[data-v-3a753c4c] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin: 0 20px;\n  padding-top: 20px;\n  height: 100px;\n}\n.rank .toplist .item[data-v-3a753c4c]:last-child {\n  padding-bottom: 20px;\n}\n.rank .toplist .item .icon[data-v-3a753c4c] {\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 100px;\n          flex: 0 0 100px;\n  width: 100px;\n  height: 100px;\n}\n.rank .toplist .item .songlist[data-v-3a753c4c] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 0 20px;\n  height: 100px;\n  overflow: hidden;\n  background: #333;\n  color: rgba(255,255,255,0.3);\n  font-size: 12px;\n}\n.rank .toplist .item .songlist .song[data-v-3a753c4c] {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  line-height: 26px;\n}\n.rank .toplist .loading-container[data-v-3a753c4c] {\n  position: absolute;\n  width: 100%;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}"],sourceRoot:""}])}});
//# sourceMappingURL=5.d7eab315ed1ed149d8f9.js.map