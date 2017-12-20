// hack for global nextTick 在微信端、Safari浏览器不能播放，vue2.5+升级所造成的
// 这样的话 Vue.js 在初始化 nextTick的时候，发现全局的setImmediate
// 和MessageChannel被改写了，就自动降级为setTimeout 0的实现，可以在一个tick中执行
function noop() {

}

window.MessageChannel = noop
window.setImmediate = noop
