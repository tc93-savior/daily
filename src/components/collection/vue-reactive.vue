<template>
  <div class="vue-demo">
    <el-radio-group @change="change" v-model="data">
      <el-radio :label="1">1</el-radio>
      <el-radio :label="2">2</el-radio>
    </el-radio-group>

    <span>{{ data }}</span>
  </div>
</template>

<script>
export default {
  name: 'vue-reactive',
  data() {
    return {
      data: 3
    };
  },
  methods: {
    change(val) {
      console.log(val);
    }
  },
  watch: {
    data: function (val) {
      console.log(val);
    }
  }
};
/**
 *  响应式数据 与 virtual dom
 *
 *  @author      jiangtao
 *  @date        2020-01-10 10:55
 */
// -------------------------------------------响应式数据--------------------------------------------
// let data = {a: 1}
// // 数据响应性
// observe(data)
//
// // 初始化观察者
// new Watcher(data, 'name', updateComponent)
// data.a = 2
//
// // 简单表示用于数据更新后的操作
// function updateComponent () {
//   vm._update() // patchs
// }
//
// // 监视对象
// function observe (obj) {
//   // 遍历对象，使用 get/set 重新定义对象的每个属性值
//   Object.keys(obj).map(key => {
//     defineReactive(obj, key, obj[key])
//   })
// }
//
// function defineReactive (obj, k, v) {
//   // 递归子属性
//   if (type(v) == 'object') observe(v)
//
//   // 新建依赖收集器
//   let dep = new Dep()
//   // 定义get/set
//   Object.defineProperty(obj, k, {
//     enumerable: true,
//     configurable: true,
//     get: function reactiveGetter () {
//       // 当有获取该属性时，证明依赖于该对象，因此被添加进收集器中
//       if (Dep.target) {
//         dep.addSub(Dep.target)
//       }
//       return v
//     },
//     // 重新设置值时，触发收集器的通知机制
//     set: function reactiveSetter (nV) {
//       v = nV
//       dep.nofify()
//     },
//   })
// }
//
// // 依赖收集器
// class Dep {
//   constructor () {
//     this.subs = []
//   }
//
//   addSub (sub) {
//     this.subs.push(sub)
//   }
//
//   notify () {
//     this.subs.map(sub => {
//       sub.update()
//     })
//   }
// }
//
// Dep.target = null
//
// // 观察者
// class Watcher {
//   constructor (obj, key, cb) {
//     Dep.target = this
//     this.cb = cb
//     this.obj = obj
//     this.key = key
//     this.value = obj[key]
//     Dep.target = null
//   }
//
//   addDep (Dep) {
//     Dep.addSub(this)
//   }
//
//   update () {
//     this.value = this.obj[this.key]
//     this.cb(this.value)
//   }
//
//   before () {
//     callHook('beforeUpdate')
//   }
// }
// ---------------------------------virtual dom -----------------------------------
// // diff算法的实现
// function diff (oldTree, newTree) {
//   // 差异收集
//   let pathchs = {}
//   dfs(oldTree, newTree, 0, pathchs)
//   return pathchs
// }
//
// function dfs (oldNode, newNode, index, pathchs) {
//   let curPathchs = []
//   if (newNode) {
//     // 当新旧节点的 tagName 和 key 值完全一致时
//     if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
//       // 继续比对属性差异
//       let props = diffProps(oldNode.props, newNode.props)
//       curPathchs.push({type: 'changeProps', props})
//       // 递归进入下一层级的比较
//       diffChildrens(oldNode.children, newNode.children, index, pathchs)
//     } else {
//       // 当 tagName 或者 key 修改了后，表示已经是全新节点，无需再比
//       curPathchs.push({type: 'replaceNode', node: newNode})
//     }
//   }
//
//   // 构建出整颗差异树
//   if (curPathchs.length) {
//     if (pathchs[index]) {
//       pathchs[index] = pathchs[index].concat(curPathchs)
//     } else {
//       pathchs[index] = curPathchs
//     }
//   }
// }
//
// // 属性对比实现
// function diffProps (oldProps, newProps) {
//   let propsPathchs = []
//   // 遍历新旧属性列表
//   // 查找删除项
//   // 查找修改项
//   // 查找新增项
//   forin(olaProps, (k, v) => {
//     if (!newProps.hasOwnProperty(k)) {
//       propsPathchs.push({type: 'remove', prop: k})
//     } else {
//       if (v !== newProps[k]) {
//         propsPathchs.push({type: 'change', prop: k, value: newProps[k]})
//       }
//     }
//   })
//   forin(newProps, (k, v) => {
//     if (!oldProps.hasOwnProperty(k)) {
//       propsPathchs.push({type: 'add', prop: k, value: v})
//     }
//   })
//   return propsPathchs
// }
//
// // 对比子级差异
// function diffChildrens (oldChild, newChild, index, pathchs) {
//   // 标记子级的删除/新增/移动
//   let {change, list} = diffList(oldChild, newChild, index, pathchs)
//   if (change.length) {
//     if (pathchs[index]) {
//       pathchs[index] = pathchs[index].concat(change)
//     } else {
//       pathchs[index] = change
//     }
//   }
//
//   // 根据 key 获取原本匹配的节点，进一步递归从头开始对比
//   oldChild.map((item, i) => {
//     let keyIndex = list.indexOf(item.key)
//     if (keyIndex) {
//       let node = newChild[keyIndex]
//       // 进一步递归对比
//       dfs(item, node, index, pathchs)
//     }
//   })
// }
//
// // 列表对比，主要也是根据 key 值查找匹配项
// // 对比出新旧列表的新增/删除/移动
// function diffList (oldList, newList, index, pathchs) {
//   let change = []
//   let list = []
//   const newKeys = getKey(newList)
//   oldList.map(v => {
//     if (newKeys.indexOf(v.key) > -1) {
//       list.push(v.key)
//     } else {
//       list.push(null)
//     }
//   })
//
//   // 标记删除
//   for (let i = list.length - 1; i >= 0; i--) {
//     if (!list[i]) {
//       list.splice(i, 1)
//       change.push({type: 'remove', index: i})
//     }
//   }
//
//   // 标记新增和移动
//   newList.map((item, i) => {
//     const key = item.key
//     const index = list.indexOf(key)
//     if (index === -1 || key == null) {
//       // 新增
//       change.push({type: 'add', node: item, index: i})
//       list.splice(i, 0, key)
//     } else {
//       // 移动
//       if (index !== i) {
//         change.push({
//           type: 'move',
//           form: index,
//           to: i,
//         })
//         move(list, index, i)
//       }
//     }
//   })
//
//   return {change, list}
// }
</script>

<style lang="scss" scoped>
.vue-demo {
  font-size: 12px;
}
</style>
