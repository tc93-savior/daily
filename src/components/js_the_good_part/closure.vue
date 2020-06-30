<template>
  <div class="closure" id="closure">
    <button style="text-align: center" @click="doFade()">开始</button>
  </div>
</template>

<script>
// 闭包
export default {
  name: 'closure',
  methods: {
    doFade () {
      let fade = (node) => {
        let level = 1
        let step = () => {
          let hex = level.toString(16)
          node.style.backgroundColor = '#FFFF' + hex + hex
          if (level < 15) {
            level++
            setTimeout(step, 100)
          }
        }
        setTimeout(step, 100)
      }
      fade(document.getElementById('closure'))
    }
  },
  mounted () {
    console.log( `测试ssh`)
  }
}
</script>

<style scoped>
  .closure {
    margin: auto;
    text-align: center;
    height: 100px;
    width: 100px;
  }
</style>
