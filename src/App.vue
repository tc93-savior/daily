<template>
  <div id="app">
    <div class="title">
      res
      <div class="right-title-content">
        <weather></weather>
        <clock></clock>
      </div>
    </div>
    <div class="content">
      <ul class="menu">
        <li @click="turnTo('deepCopy')">1</li>
        <li @click="turnTo('puzzle')">2</li>
        <li @click="turnTo('cssAnimation')">3</li>
        <li @click="turnTo('closure')">二级菜单</li>
        <li @click="turnTo('flexDemo')">flex</li>
        <li @click="turnTo('uiTest')">测试组件</li>
      </ul>
      <router-view class="right"/>
    </div>
  </div>
</template>

<script>
/*
  这里出现过一个关于缩进的问题，
  idea默认美化代码将<script>标签下的内容，
  可以在codeStyle中修改，具体看收藏/掘金
*/
import Clock from './components/collection/clock'
import Weather from './components/collection/weather'
export default {
  name: 'App',
  components: {Weather, Clock},
  methods: {
    /**
     *  跳转
     *
     *  @author      jiangtao
     *  @date        2019-11-19 16:13
     */
    turnTo (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    .title {
      height: 100px;
      line-height: 100px;
      font-size: 28px;
      padding-left: 10px;
      font-weight: bolder;
      /*float: left;*/
      text-align: left;
      background-color: white;
      border: lightgray solid 1px;
      color: black;

      .right-title-content {
        float: right;
        padding-right: 20px;
        display: flex;
        justify-content: space-between;
      }
    }

    .content {
      height: calc(100vh - 110px);
      display: flex;

      .menu {
        flex: 0 0 200px;
        height: 100%;
        padding: 0;
        margin: 20px 0;
        list-style: none;
        // background-color: lightgray;
        border-right: lightgray solid 1px;
      }

      .menu > li {
        color: black;
        list-style: none;
        padding: 5px 0;
        margin: 0;
        /*background-color: #191f31;*/
      }

      li:nth-child(even) {
        /*background-color: #353D52;*/
      }

      .right{
        flex: 1;
        padding: 20px 10px
      }
    }
  }
</style>
