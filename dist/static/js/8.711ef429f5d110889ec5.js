webpackJsonp([8],{"/2l7":function(t,e,r){(t.exports=r("FZ+f")(!0)).push([t.i,"\n.search .search-box-wrapper[data-v-2546fcba] {\n  margin: 20px;\n}\n.search .shortcut-wrapper[data-v-2546fcba] {\n  position: fixed;\n  top: 178px;\n  bottom: 0;\n  width: 100%;\n}\n.search .shortcut-wrapper .shortcut[data-v-2546fcba] {\n  height: 100%;\n  overflow: hidden;\n}\n.search .shortcut-wrapper .shortcut .hot-key[data-v-2546fcba] {\n  margin: 0 20px 20px 20px;\n}\n.search .shortcut-wrapper .shortcut .hot-key .title[data-v-2546fcba] {\n  margin-bottom: 20px;\n  font-size: 14px;\n  color: rgba(255,255,255,0.5);\n}\n.search .shortcut-wrapper .shortcut .hot-key .item[data-v-2546fcba] {\n  display: inline-block;\n  padding: 5px 10px;\n  margin: 0 20px 10px 0;\n  border-radius: 6px;\n  background: #333;\n  font-size: 14px;\n  color: rgba(255,255,255,0.3);\n}\n.search .shortcut-wrapper .shortcut .search-history[data-v-2546fcba] {\n  position: relative;\n  margin: 0 20px;\n}\n.search .shortcut-wrapper .shortcut .search-history .title[data-v-2546fcba] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 40px;\n  font-size: 14px;\n  color: rgba(255,255,255,0.5);\n}\n.search .shortcut-wrapper .shortcut .search-history .title .text[data-v-2546fcba] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.search .shortcut-wrapper .shortcut .search-history .title .clear[data-v-2546fcba] {\n  position: relative;\n}\n.search .shortcut-wrapper .shortcut .search-history .title .clear[data-v-2546fcba]:before {\n  content: '';\n  position: absolute;\n  top: -10px;\n  left: -10px;\n  right: -10px;\n  bottom: -10px;\n}\n.search .shortcut-wrapper .shortcut .search-history .title .clear .icon-clear[data-v-2546fcba] {\n  font-size: 14px;\n  color: rgba(255,255,255,0.3);\n}\n.search .search-result[data-v-2546fcba] {\n  position: fixed;\n  width: 100%;\n  top: 178px;\n  bottom: 0;\n}","",{version:3,sources:["E:/imooc/vue-music/src/components/search/search.vue"],names:[],mappings:";AACA;EACE,aAAa;CACd;AACD;EACE,gBAAgB;EAChB,WAAW;EACX,UAAU;EACV,YAAY;CACb;AACD;EACE,aAAa;EACb,iBAAiB;CAClB;AACD;EACE,yBAAyB;CAC1B;AACD;EACE,oBAAoB;EACpB,gBAAgB;EAChB,6BAA6B;CAC9B;AACD;EACE,sBAAsB;EACtB,kBAAkB;EAClB,sBAAsB;EACtB,mBAAmB;EACnB,iBAAiB;EACjB,gBAAgB;EAChB,6BAA6B;CAC9B;AACD;EACE,mBAAmB;EACnB,eAAe;CAChB;AACD;EACE,qBAAqB;EACrB,qBAAqB;EACrB,cAAc;EACd,0BAA0B;MACtB,uBAAuB;UACnB,oBAAoB;EAC5B,aAAa;EACb,gBAAgB;EAChB,6BAA6B;CAC9B;AACD;EACE,oBAAoB;MAChB,YAAY;UACR,QAAQ;CACjB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,YAAY;EACZ,mBAAmB;EACnB,WAAW;EACX,YAAY;EACZ,aAAa;EACb,cAAc;CACf;AACD;EACE,gBAAgB;EAChB,6BAA6B;CAC9B;AACD;EACE,gBAAgB;EAChB,YAAY;EACZ,WAAW;EACX,UAAU;CACX",file:"search.vue",sourcesContent:["\n.search .search-box-wrapper[data-v-2546fcba] {\n  margin: 20px;\n}\n.search .shortcut-wrapper[data-v-2546fcba] {\n  position: fixed;\n  top: 178px;\n  bottom: 0;\n  width: 100%;\n}\n.search .shortcut-wrapper .shortcut[data-v-2546fcba] {\n  height: 100%;\n  overflow: hidden;\n}\n.search .shortcut-wrapper .shortcut .hot-key[data-v-2546fcba] {\n  margin: 0 20px 20px 20px;\n}\n.search .shortcut-wrapper .shortcut .hot-key .title[data-v-2546fcba] {\n  margin-bottom: 20px;\n  font-size: 14px;\n  color: rgba(255,255,255,0.5);\n}\n.search .shortcut-wrapper .shortcut .hot-key .item[data-v-2546fcba] {\n  display: inline-block;\n  padding: 5px 10px;\n  margin: 0 20px 10px 0;\n  border-radius: 6px;\n  background: #333;\n  font-size: 14px;\n  color: rgba(255,255,255,0.3);\n}\n.search .shortcut-wrapper .shortcut .search-history[data-v-2546fcba] {\n  position: relative;\n  margin: 0 20px;\n}\n.search .shortcut-wrapper .shortcut .search-history .title[data-v-2546fcba] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 40px;\n  font-size: 14px;\n  color: rgba(255,255,255,0.5);\n}\n.search .shortcut-wrapper .shortcut .search-history .title .text[data-v-2546fcba] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.search .shortcut-wrapper .shortcut .search-history .title .clear[data-v-2546fcba] {\n  position: relative;\n}\n.search .shortcut-wrapper .shortcut .search-history .title .clear[data-v-2546fcba]:before {\n  content: '';\n  position: absolute;\n  top: -10px;\n  left: -10px;\n  right: -10px;\n  bottom: -10px;\n}\n.search .shortcut-wrapper .shortcut .search-history .title .clear .icon-clear[data-v-2546fcba] {\n  font-size: 14px;\n  color: rgba(255,255,255,0.3);\n}\n.search .search-result[data-v-2546fcba] {\n  position: fixed;\n  width: 100%;\n  top: 178px;\n  bottom: 0;\n}"],sourceRoot:""}])},ELdY:function(t,e,r){var a=r("/2l7");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);r("rjj0")("8427b212",a,!0)},YOyO:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("Dd8w"),s=r.n(a),n=r("2X+S"),o=r("8stH"),c=r("T452"),i=r("6Xyt"),h=r("vhoT"),A=r("XEAW"),p=r("qwAB"),l=r("F4+m"),u=r("NYxO"),f={mixins:[l.b,l.c],data:function(){return{hotKey:[]}},computed:{shortcut:function(){return this.hotKey.concat(this.searchHistory)}},created:function(){this._getHotKey()},methods:s()({handlePlaylist:function(t){var e=t.length>0?"60px":"";this.$refs.searchResult.style.bottom=e,this.$refs.suggest.refresh(),this.$refs.shortcutWrapper.style.bottom=e,this.$refs.shortcut.refresh()},showConfirm:function(){this.$refs.confirm.show()},_getHotKey:function(){var t=this;Object(o.a)().then(function(e){e.code===c.a&&(t.hotKey=e.data.hotkey.slice(0,10))})}},Object(u.b)(["clearSearchHistory"])),watch:{query:function(t){var e=this;t||setTimeout(function(){e.$refs.shortcut.refresh()},20)}},components:{searchBox:n.a,Suggest:i.a,SearchList:h.a,Confirm:A.a,Scroll:p.a}},C={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"search"},[r("div",{staticClass:"search-box-wrapper"},[r("search-box",{ref:"searchBox",on:{query:t.onQueryChange}})],1),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.query,expression:"!query"}],ref:"shortcutWrapper",staticClass:"shortcut-wrapper"},[r("scroll",{ref:"shortcut",staticClass:"shortcut",attrs:{data:t.shortcut,refreshDelay:t.refreshDelay}},[r("div",[r("div",{staticClass:"hot-key"},[r("h1",{staticClass:"title"},[t._v("热门搜索")]),t._v(" "),r("ul",t._l(t.hotKey,function(e){return r("li",{staticClass:"item",on:{click:function(r){t.addQuery(e.k)}}},[r("span",[t._v(t._s(e.k))])])}))]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.searchHistory.length,expression:"searchHistory.length"}],staticClass:"search-history"},[r("h1",{staticClass:"title"},[r("span",{staticClass:"text"},[t._v("搜索历史")]),t._v(" "),r("span",{staticClass:"clear",on:{click:t.showConfirm}},[r("i",{staticClass:"icon-clear"})])]),t._v(" "),r("search-list",{attrs:{searches:t.searchHistory},on:{select:t.addQuery,delete:t.deleteSearchHistory}})],1)])])],1),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.query,expression:"query"}],ref:"searchResult",staticClass:"search-result"},[r("suggest",{ref:"suggest",attrs:{query:t.query},on:{select:t.saveSearch,listScroll:t.blurInput}})],1),t._v(" "),r("confirm",{ref:"confirm",attrs:{text:"是否清空所有搜索历史",confirmBtnText:"清空"},on:{confirm:t.clearSearchHistory}}),t._v(" "),r("router-view")],1)},staticRenderFns:[]},d=r("VU/8")(f,C,!1,function(t){r("ELdY")},"data-v-2546fcba",null);e.default=d.exports}});
//# sourceMappingURL=8.711ef429f5d110889ec5.js.map