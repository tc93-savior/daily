import Vue from 'vue'
import Router from 'vue-router'
import personInfo from '../components/person-info'
import { deepCopy, puzzle, vueReactive, cssAnimation, flexDemo, g2 } from '../components/collection'
import { closure } from '../components/js_the_good_part'
import { uiTest, markdownIt } from '../components/test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'personInfo',
    component: personInfo,
    meta: {
      title: '个人信息'
    }
  }, {
    path: '/deepCopy',
    name: 'deepCopy',
    component: deepCopy
  }, {
    path: '/puzzle',
    name: 'puzzle',
    component: puzzle
  }, {
    path: '/vueReactive',
    name: 'vueReactive',
    component: vueReactive
  }, {
    path: '/cssAnimation',
    name: 'cssAnimation',
    component: cssAnimation
  }, {
    path: '/closure',
    name: 'closure',
    component: closure
  }, {
    path: '/flexDemo',
    name: 'flexDemo',
    component: flexDemo
  }, {
    path: '/uiTest',
    name: 'uiTest',
    component: uiTest,
    meta: {
      title: 'element-ui开发测试'
    }
  }, {
    path: '/markdownIt',
    name: 'markdownIt',
    component: markdownIt,
    meta: {
      title: '解析markdown语法'
    }
  }, {
    path: '/g2',
    name: 'g2',
    component: g2,
    meta: {
      title: 'antv-g2测试'
    }
  }]
})
