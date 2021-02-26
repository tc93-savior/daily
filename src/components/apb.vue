<template>
  <div class="test">
    <div>{{ a }}</div>
    <div>{{ b }}</div>
    <button @click="() => a++">+a</button>
    <button @click="() => b++">+b</button>
    <!-- {{ apb }} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 23,
      b: 234
    };
  },
  computed: {
    apb: function () {
      console.log('apb执行');
      return this.a + this.b;
    }
  }
};
</script>

<style lang="scss" scoped>
.test {
  height: 100vh;
}
</style>
