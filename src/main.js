// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'
// import '@/utils/hack'
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App'
import fastclick from 'fastclick'
import mmToast from 'base/mm-toast'
import Icon from 'base/mm-icon/mm-icon'
import VueLazyload from 'vue-lazyload'
import { VERSION } from './config'

import '@/styles/index.less'

// 优化移动端300ms点击延迟
fastclick.attach(document.body)

// 弹出层
Vue.use(mmToast)

// icon 组件
Vue.component(Icon.name, Icon)

// 懒加载
Vue.use(VueLazyload, {
  preLoad: 1,
  loading: require('assets/img/default.png')
})

// 访问版本统计
window._hmt && window._hmt.push(['_setCustomVar', 1, 'version', VERSION, 1])

const redirectList = ['/music/details', '/music/comment']
router.beforeEach((to, from, next) => {
  window._hmt &&
    to.path &&
    window._hmt.push(['_trackPageview', '/#' + to.fullPath])
  if (redirectList.includes(to.path)) {
    next()
  } else {
    document.title =
      (to.meta.title && `${to.meta.title} - young1Music在线音乐播放器`) ||
      'young1Music在线音乐播放器'
    next()
  }
})

// 版权信息
window.young1Music = window.young1Music = `欢迎使用 young1Music!
当前版本为：V${VERSION}
作者：茂茂
Github：https://github.com/sharefuture1/musicYoung1
歌曲来源于网易云音乐 (https://music.163.com)`
// eslint-disable-next-line no-console
console.info(`%c${window.young1Music}`, `color:blue`)

// eslint-disable-next-line no-new
new Vue({
  el: '#young1Music',
  store,
  router,
  render: h => h(App)
})
