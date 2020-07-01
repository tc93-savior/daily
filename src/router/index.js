import Vue from 'vue'
import Router from 'vue-router'
import personInfo from '../components/person-info'
import {deepCopy, puzzle, vueReactive, cssAnimation, flexDemo} from '../components/collection'
import {closure} from '../components/js_the_good_part'
// import deepCopy from '../components/collection/deep-copy'
// import puzzle from '../components/collection/puzzle'
// import vueReactive from '../components/collection/vue-reactive'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'personInfo',
    component: personInfo
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
  }]
})
