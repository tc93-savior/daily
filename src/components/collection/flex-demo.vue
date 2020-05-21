<template>
  <div class="flex-demo-box">
    <div class="d6 flex-content"
         style="display: flex;flex-wrap: wrap;justify-content: flex-end;align-content: space-between;">
      <div class="d6-item" style=""></div>
      <div class="d6-item" style=""></div>
      <div class="d6-item" style=""></div>
      <div class="d6-item" style=""></div>
    </div>
    <div class="right-auto flex-content" style="display: flex">
      <div class="flex-item" style="flex: 1 1 100%"></div>
      <div class="flex-item" style="flex:1 0%"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'flex-demo'
  }
</script>

<style scoped>
  .flex-demo-box {
    height: 200px;
    display: flex;
  }

  .flex-content {
    width: 200px;
    height: 200px;
    background-color: black;
    margin: 5px;
  }

  .d6-item {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: white;
  }

  .flex-item {
    margin: 5px;
    height: 100px;
    background-color: white;
  }
</style>
