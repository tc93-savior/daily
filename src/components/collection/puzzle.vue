<template>
  <div>
    {{ a() }}<button @click="change">test</button
    ><button @click="changeRevert">test2</button>
  </div>
</template>

<script>
export default {
  name: 'puzzle',
  data() {
    return {
      type: 1
    };
  },
  computed: {
    a: function () {
      let tmp;
      if (this.type === 1) {
        tmp = () => {
          return 2222;
        };
      }

      if (this.type === 2) {
        tmp = () => {
          return 2343;
        };
      }

      return tmp;
    }
  },
  methods: {
    change() {
      this.type = 2;
    },
    changeRevert() {
      this.type = 1;
    }
  }
};
</script>

<style scoped>
</style>
