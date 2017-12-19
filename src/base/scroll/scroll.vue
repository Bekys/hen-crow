<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascrpit-6">
  import BScroll from 'better-scroll'
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      // 是否有下拉刷新
      pullup: {
        type: Boolean,
        default: false
      },
      // 用于在搜索时过后滑动列表时隐藏键盘表
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      },20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
        if (this.listenScroll) {
          let me =this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
        // 如果有下拉刷新
        if (this.pullup) {
          // 监听scrollEnd事件
          this.scroll.on('scrollEnd', () => {
            if(this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              // 派发scrollToEnd事件，可以在suggest中监听到

              this.$emit('scrollToEnd')
            }
          })
        }
        // 如果有滚动
        if (this.beforeScroll) {
          // 触发beforeScrollStart事件，并在回调函数中向父组件发送beforeScroll事件
          this.scroll.on('beforeScrollStart', () =>{
            this.$emit('beforeScroll')
          })
        }
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments) //apply在scrollTo中加参数
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
